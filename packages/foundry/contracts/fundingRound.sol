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

    Project[] private projects;
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

    function addFunds(uint256 _amount) private {
        require(_amount > 0, "Amount must be greater than 0");
        mUSDC.transferFrom(msg.sender, address(this), _amount);
    }

    // This function can remain internal as it's used internally
    function addPoints(uint256 _projectId, uint256 _points) internal {
        require(_projectId < projects.length, "Project does not exist");
        projects[_projectId].votingPoints += _points;
    }

    // Contribute to a project and vote
    function contributeAndVote(uint256 _projectId, uint256 _amount) external {
        addFunds(_amount);
        uint256 points = sqrt(_amount);
        addPoints(_projectId, points);
    }

    // Distribute funds based on voting points
    function distributeFunds() external {
        // Logic remains the same as your implementation
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
