// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FundingRound {
    struct Project {
        uint256 id;
        uint256 votingPoints;
        string name;
        address recipient;
    }

    Project[] public projects;
    IERC20 private immutable mUSDC;
    uint256 private nextProjectId = 0;

    constructor(address _mUSDCAddress) {
        mUSDC = IERC20(_mUSDCAddress);
    }

    function createProject(string calldata _name, address _recipient) external {
        projects.push(Project(nextProjectId++, 0, _name, _recipient));
    }

    // Getter for project details by ID
    function getProject(
        uint256 projectId
    ) external view returns (Project memory) {
        require(projectId < projects.length, "Project does not exist");
        return projects[projectId];
    }

    function addFunds(uint256 _amount) internal {
        require(_amount > 0, "Amount must be greater than 0");
        mUSDC.transferFrom(msg.sender, address(this), _amount);
    }

    // This function can remain internal as it's used internally
    function addPoints(uint256 _projectId, uint256 _points) internal {
        require(_projectId < projects.length, "Project does not exist");
        projects[_projectId].votingPoints += _points;
    }

    // Contribute to a project and vote
    function contributeAndVote(
        uint256[] calldata _projectIds,
        uint256 totalAmount
    ) external {
        uint256 fractionalPoints = sqrt(totalAmount) / _projectIds.length;

        addFunds(totalAmount);

        for (uint256 i = 0; i < _projectIds.length; i++) {
            addPoints(_projectIds[i], fractionalPoints);
        }
    }

    function distributeFunds() external {
        uint256 totalPoints = 0;
        for (uint i = 0; i < projects.length; i++) {
            totalPoints += projects[i].votingPoints;
        }

        require(totalPoints > 0, "No projects to distribute to");

        for (uint i = 0; i < projects.length; i++) {
            if (projects[i].votingPoints > 0) {
                uint256 projectShare = (mUSDC.balanceOf(address(this)) *
                    projects[i].votingPoints) / totalPoints;
                mUSDC.transfer(projects[i].recipient, projectShare);
            }
        }
    }

    function getUSDCBalance() external view returns (uint256) {
        return mUSDC.balanceOf(address(this));
    }

    function sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}
