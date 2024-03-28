/*// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract FundingRound {
    using SafeMath for uint256;

    struct Project {
        uint256 id;
        uint256 votingPoints;
        string name;
        address recipient;
    }

    Project[] public projects;
    IERC20 public mUSDC;
    address public owner;
    uint256 private nextProjectId = 0;

    constructor(address _owner, address _mUSDCContract) {
        owner = _owner;
        mUSDC = IERC20(_mUSDCContract);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function setMUSDCAddress(address _mUSDCAddress) external onlyOwner {
        mUSDC = IERC20(_mUSDCAddress);
    }

    function createProject(
        string calldata _name,
        address _recipient
    ) external onlyOwner {
        projects.push(Project(nextProjectId, 0, _name, _recipient));
        nextProjectId++;
    }

    function addFunds(uint256 _amount) public {
        require(_amount > 0, "Amount must be greater than 0");
        mUSDC.transferFrom(msg.sender, address(this), _amount);
    }

    function addPoints(uint256 _projectId, uint256 _points) internal {
        require(_projectId < projects.length, "Project does not exist");
        projects[_projectId].votingPoints = projects[_projectId]
            .votingPoints
            .add(_points);
    }

    function contributeAndVote(uint256 _projectId, uint256 _amount) external {
        addFunds(_amount);
        // Calculate points based on quadratic funding principles
        uint256 points = sqrt(_amount);
        addPoints(_projectId, points);
    }

    function distributeFunds() external onlyOwner {
        uint256 totalPoints = 0;
        for (uint i = 0; i < projects.length; i++) {
            totalPoints = totalPoints.add(projects[i].votingPoints);
        }

        require(totalPoints > 0, "No projects to distribute to");

        for (uint i = 0; i < projects.length; i++) {
            if (projects[i].votingPoints > 0) {
                uint256 projectShare = mUSDC
                    .balanceOf(address(this))
                    .mul(projects[i].votingPoints)
                    .div(totalPoints);
                mUSDC.transfer(projects[i].recipient, projectShare);
            }
        }

        // Optional: Reset projects' voting points after distribution
        for (uint i = 0; i < projects.length; i++) {
            projects[i].votingPoints = 0;
        }
    }

    function sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x.add(1)).div(2);
        y = x;
        while (z < y) {
            y = z;
            z = (x.div(z).add(z)).div(2);
        }
    }
}*/
