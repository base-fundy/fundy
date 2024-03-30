// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ud2x18} from "@prb/math/src/UD2x18.sol";
import {ud60x18} from "@prb/math/src/UD60x18.sol";
import {ISablierV2LockupDynamic} from "@sablier/v2-core/src/interfaces/ISablierV2LockupDynamic.sol";
import {Broker, LockupDynamic, LockupLinear} from "@sablier/v2-core/src/types/DataTypes.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ISablierV2LockupLinear} from "@sablier/v2-core/src/interfaces/ISablierV2LockupLinear.sol";

/// @notice Interface of the VRF Gateway contract. Must be imported.
interface ISecretVRF {
    function requestRandomness(
        uint32 _numWords,
        uint32 _callbackGasLimit
    ) external payable returns (uint256 requestId);
}
/**
 * @title FundingRound
 * @dev Manages funding rounds with quadratic funding for projects.
 */
contract FundingRound is Ownable {
    // Structs
    struct Project {
        uint256 id;
        uint256 votingPoints;
        string name;
        address recipient;
        address[] shitcoins;
        uint256[] amounts;
    }

    // State variables
    Project[] public projects;
    uint256 private _nextProjectId = 0;

    mapping(address shitCoin => bool approved) public shitCoins;
    address[] public shitCoinList;

    /// @notice VRFGateway stores address to the Gateway contract to call for VRF
    address public VRFGateway;

    // Sablier variables
    ISablierV2LockupDynamic public constant LOCKUP_DYNAMIC =
        ISablierV2LockupDynamic(0xF46d5fA9bFC964E8d06846c8739AEc69BC06344d);
    ISablierV2LockupLinear public constant LOCKUP_LINEAR =
        ISablierV2LockupLinear(0xbd7AAA2984c0a887E93c66baae222749883763d3);

    constructor(address newOwner) {
        _transferOwnership(newOwner);
    }

    function createProject(string calldata name, address recipient) external {
        projects.push(
            Project(
                _nextProjectId++,
                0,
                name,
                recipient,
                new address[](0),
                new uint256[](0)
            )
        );
        emit ProjectCreated(_nextProjectId - 1, name, recipient);
    }

    function fund(address shitCoin, uint256 amount) external {
        if (!shitCoins[shitCoin]) {
            revert ShitCoinNotApproved();
        }

        IERC20(shitCoin).transferFrom(msg.sender, address(this), amount);

        emit Funded(shitCoin, amount);
    }

    function endFoundingRound(uint32 _callbackGasLimit) external payable {
        // Get the VRFGateway contract interface
        ISecretVRF vrfContract = ISecretVRF(VRFGateway);

        // Call the VRF contract to request random numbers.
        // Returns requestId of the VRF request. A  contract can track a VRF call that way.
        uint256 requestId = vrfContract.requestRandomness{value: msg.value}(
            uint32(shitCoinList.length),
            _callbackGasLimit
        );

        // Emit the event
        emit requestedRandomness(requestId);
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] calldata randomWords
    ) external {
        // Do your custom stuff here, for example:

        Project[] memory localProjects = projects;
        uint256 length = randomWords.length > shitCoinList.length
            ? shitCoinList.length
            : randomWords.length;

        for (uint256 i; i < length; ++i) {
            uint256 balance = IERC20(shitCoinList[i]).balanceOf(address(this));
            if (balance > 0) {
                uint256 projectid = randomWords[i] % localProjects.length;
                projects[projectid].shitcoins.push(shitCoinList[i]);
                projects[projectid].amounts.push(balance);

                createStream(
                    projects[projectid].recipient,
                    shitCoinList[i],
                    randomWords[i]
                );
            }
        }

        emit fulfilledRandomWords(requestId, randomWords);
    }

    function createStream(
        address projectAddress,
        address shitCoin,
        uint256 randomWord
    ) public {
        if (randomWord % 3 == 0) {
            _createLiniarStream(projectAddress, shitCoin);
        } else if (randomWord % 3 == 1) {
            _createExponentialStream(projectAddress, shitCoin);
        } else if (randomWord % 3 == 2) {
            _createDynamicStream(projectAddress, shitCoin);
        }
    }
    function _createLiniarStream(
        address projectAddress,
        address shitCoin
    ) private returns (uint256 streamId) {
        uint256 totalAmount = IERC20(shitCoin).balanceOf(address(this));
        IERC20(shitCoin).approve(address(LOCKUP_LINEAR), totalAmount);

        // Declare the params struct
        LockupLinear.CreateWithDurations memory params;

        // Declare the function parameters
        params.sender = address(this);
        params.recipient = projectAddress;
        params.totalAmount = uint128(totalAmount);
        params.asset = IERC20(shitCoin);
        params.cancelable = true;
        params.durations = LockupLinear.Durations({cliff: 20, total: 80});

        streamId = LOCKUP_LINEAR.createWithDurations(params);

        emit LinearStream(shitCoin, totalAmount, projectAddress);
    }

    event LinearStream(
        address indexed shitCoin,
        uint256 totalAmount,
        address projectAddress
    );

    event ExponentialStream(
        address indexed shitCoin,
        uint256 totalAmount,
        address projectAddress
    );

    event DynamicStream(
        address indexed shitCoin,
        uint256 totalAmount,
        address projectAddress
    );

    function _createExponentialStream(
        address projectAddress,
        address shitCoin
    ) private returns (uint256 streamId) {
        uint256 totalAmount = IERC20(shitCoin).balanceOf(address(this));
        IERC20(shitCoin).approve(address(LOCKUP_DYNAMIC), totalAmount);

        // Declare the params struct
        LockupDynamic.CreateWithDeltas memory params;

        // Declare the function parameters
        params.sender = address(this);
        params.recipient = projectAddress;
        params.totalAmount = uint128(totalAmount);
        params.asset = IERC20(shitCoin);
        params.cancelable = true;

        params.segments = new LockupDynamic.SegmentWithDelta[](1);
        params.segments[0] = LockupDynamic.SegmentWithDelta({
            amount: uint128(totalAmount),
            delta: 20,
            exponent: ud2x18(6e18)
        });

        streamId = LOCKUP_DYNAMIC.createWithDeltas(params);
        emit ExponentialStream(shitCoin, totalAmount, projectAddress);
    }

    function _createDynamicStream(
        address projectAddress,
        address shitCoin
    ) private returns (uint256 streamId) {
        uint256 totalAmount = IERC20(shitCoin).balanceOf(address(this));
        IERC20(shitCoin).approve(address(LOCKUP_DYNAMIC), totalAmount);

        LockupDynamic.CreateWithMilestones memory params;

        // Declare the function parameters
        params.sender = address(this);
        params.recipient = projectAddress;
        params.totalAmount = uint128(totalAmount);
        params.asset = IERC20(shitCoin);
        params.cancelable = true;
        params.startTime = uint40(block.timestamp + 1 seconds);

        params.segments = new LockupDynamic.Segment[](2);

        params.segments[0] = LockupDynamic.Segment({
            amount: uint128(totalAmount) / 2,
            exponent: ud2x18(1e18),
            milestone: uint40(block.timestamp + 10)
        });
        params.segments[1] = (
            LockupDynamic.Segment({
                amount: uint128(totalAmount) / 2,
                exponent: ud2x18(3.14e18),
                milestone: uint40(block.timestamp + 120)
            })
        );

        // Create the LockupDynamic stream
        streamId = LOCKUP_DYNAMIC.createWithMilestones(params);

        emit DynamicStream(shitCoin, totalAmount, projectAddress);
    }

    // SETTERS

    function setShitCoin(address newShitCoin) external {
        if (shitCoins[newShitCoin]) {
            revert ShitCoinAlreadyExists();
        }
        shitCoinList.push(newShitCoin);
        shitCoins[newShitCoin] = true;

        emit ShitCoinAdded(newShitCoin);
    }

    /// @notice Sets the address to the Gateway contract
    /// @param _VRFGateway address of the gateway
    function setGatewayAddress(address _VRFGateway) external onlyOwner {
        VRFGateway = _VRFGateway;
    }

    function getProjects() public view returns (Project[] memory) {
        return projects;
    }

    error ShitCoinAlreadyExists();

    error ShitCoinNotApproved();

    event Funded(address indexed shitCoin, uint256 amount);
    // Events
    event ProjectCreated(
        uint256 indexed projectId,
        string name,
        address recipient
    );
    event FundsContributed(
        address indexed contributor,
        uint256[] projectIds,
        uint256 totalAmount
    );
    event FundsDistributed();
    event ShitCoinAdded(address newShitCoin);
    event requestedRandomness(uint256 requestId);
    event fulfilledRandomWords(uint256 requestId, uint256[] randomWords);
}
