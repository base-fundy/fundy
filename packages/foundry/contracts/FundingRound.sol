// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ud2x18} from "@prb/math/src/UD2x18.sol";
import {ud60x18} from "@prb/math/src/UD60x18.sol";
import {ISablierV2LockupDynamic} from "@sablier/v2-core/src/interfaces/ISablierV2LockupDynamic.sol";
import {Broker, LockupDynamic} from "@sablier/v2-core/src/types/DataTypes.sol";

/**
 * @title FundingRound
 * @dev Manages funding rounds with quadratic funding for projects.
 */
contract FundingRound {
    // Structs
    struct Project {
        uint256 id;
        uint256 votingPoints;
        string name;
        address recipient;
    }

    // State variables
    Project[] private _projects;
    IERC20 private immutable _mUSDC;
    uint256 private _nextProjectId = 0;

    // Sablier variables
    ISablierV2LockupDynamic public constant LOCKUP_DYNAMIC =
        ISablierV2LockupDynamic(0xF46d5fA9bFC964E8d06846c8739AEc69BC06344d);

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

    /**
     * @dev Sets the Mock USDC contract address.
     * @param mUSDCAddress address of the Mock USDC contract
     */
    constructor(address mUSDCAddress) {
        _mUSDC = IERC20(mUSDCAddress);
    }

    /**
     * @dev Allows the owner to create a new project.
     * @param name Name of the project
     * @param recipient Recipient address for the project funds
     */
    function createProject(string calldata name, address recipient) external {
        _projects.push(Project(_nextProjectId++, 0, name, recipient));
        emit ProjectCreated(_nextProjectId - 1, name, recipient);
    }

    /**
     * @dev Allows contributors to fund and vote for selected projects using quadratic voting.
     * @param projectIds Array of project IDs to contribute and vote for
     * @param totalAmount Total amount to distribute among the selected projects
     */
    function contributeAndVote(
        uint256[] calldata projectIds,
        uint256 totalAmount
    ) external {
        _addFunds(totalAmount);
        uint256 fractionalPoints = _sqrt(totalAmount) / projectIds.length;

        for (uint256 i = 0; i < projectIds.length; i++) {
            _addPoints(projectIds[i], fractionalPoints);
        }

        emit FundsContributed(msg.sender, projectIds, totalAmount);
    }

    /**
     * @dev Distributes the collected funds to projects based on voting points.
     */
    function distributeFunds() external {
        uint256 totalPoints = _calculateTotalPoints();
        uint256 totalBalance = _mUSDC.balanceOf(address(this));
        require(totalPoints > 0, "No projects to distribute to");

        for (uint256 i = 0; i < _projects.length; i++) {
            if (_projects[i].votingPoints > 0) {
                uint256 projectShare = (totalBalance *
                    _projects[i].votingPoints) / totalPoints;
                //_mUSDC.transfer(_projects[i].recipient, projectShare);
                createStream(
                    uint128(projectShare * 1) / 4,
                    uint128(projectShare * 3) / 4,
                    _projects[i].recipient
                );
            }
        }

        emit FundsDistributed();
    }
    event Debug(uint256 number);

    function createStream(
        uint128 amount0,
        uint128 amount1,
        address projectAddress
    ) public returns (uint256 streamId) {
        uint256 totalAmount = amount0 + amount1;

        emit Debug(1);
        _mUSDC.approve(address(LOCKUP_DYNAMIC), totalAmount);
        emit Debug(2);
        LockupDynamic.CreateWithMilestones memory params;
        emit Debug(3);
        params.sender = address(this);
        params.recipient = projectAddress;
        params.totalAmount = uint128(totalAmount);
        params.asset = _mUSDC;
        params.cancelable = true;
        params.startTime = uint40(block.timestamp + 30 seconds);
        emit Debug(4);

        params.segments = new LockupDynamic.Segment[](2);
        emit Debug(5);

        params.segments[0] = LockupDynamic.Segment({
            amount: uint128(amount0),
            exponent: ud2x18(1e18),
            milestone: uint40(block.timestamp + 100)
        });
        emit Debug(6);

        params.segments[1] = LockupDynamic.Segment({
            amount: amount1,
            exponent: ud2x18(1e18),
            milestone: uint40(block.timestamp + 200)
        });

        streamId = LOCKUP_DYNAMIC.createWithMilestones(params);
    }

    /**
     * @dev Internal function to add funds to the contract.
     * @param amount Amount of funds to add
     */
    function _addFunds(uint256 amount) private {
        require(amount > 0, "Amount must be greater than 0");
        _mUSDC.transferFrom(msg.sender, address(this), amount);
    }

    /**
     * @dev Internal function to add voting points to a project.
     * @param projectId ID of the project
     * @param points Number of voting points to add
     */
    function _addPoints(uint256 projectId, uint256 points) private {
        require(projectId < _projects.length, "Project does not exist");
        _projects[projectId].votingPoints += points;
    }

    /**
     * @dev Internal function to calculate the total voting points.
     * @return totalPoints Total voting points
     */
    function _calculateTotalPoints()
        private
        view
        returns (uint256 totalPoints)
    {
        for (uint256 i = 0; i < _projects.length; i++) {
            totalPoints += _projects[i].votingPoints;
        }
    }

    /**
     * @dev Gets the details of a project by its ID.
     * @param projectId The ID of the project to retrieve.
     * @return The project details including id, votingPoints, name, and recipient address.
     */
    function getProjectDetails(
        uint256 projectId
    ) external view returns (uint256, uint256, string memory, address) {
        require(projectId < _projects.length, "Project does not exist");

        Project storage project = _projects[projectId];
        return (
            project.id,
            project.votingPoints,
            project.name,
            project.recipient
        );
    }

    /**
     * @dev Returns the total amount of USDC stored in the contract.
     * @return The total USDC balance.
     */
    function getTotalUSDCBalance() external view returns (uint256) {
        return _mUSDC.balanceOf(address(this));
    }

    /**
     * @dev Internal pure function to calculate the square root of a number.
     * @param x Number to calculate the square root of
     * @return y Square root of x
     */
    function _sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}
