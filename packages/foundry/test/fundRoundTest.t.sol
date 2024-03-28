// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../contracts/FundingRound.sol";
import "../contracts/MockUSDC.sol";

contract FundingRoundTest is Test {
    FundingRound public fundingRound;
    MockUSDC public mockUSDC;

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

    function setUp() public {
        mockUSDC = new MockUSDC();
        fundingRound = new FundingRound(address(mockUSDC));
        mockUSDC.mint(address(this), 1000 ether);
    }

    function testCreateProject() public {
        string memory projectName = "Test Project";
        address projectRecipient = address(0x123);
        mockUSDC.approve(address(fundingRound), 1000 ether);

        vm.expectEmit(true, true, false, true);
        emit ProjectCreated(0, projectName, projectRecipient);

        fundingRound.createProject(projectName, projectRecipient);

        // Further checks can include verifying the project details
    }

    function testContributeAndVote() public {
        // Setup: Create two projects
        string memory projectName1 = "Project One";
        address projectRecipient1 = address(0x123);
        fundingRound.createProject(projectName1, projectRecipient1);

        string memory projectName2 = "Project Two";
        address projectRecipient2 = address(0x456);
        fundingRound.createProject(projectName2, projectRecipient2);

        // Approve mUSDC spending
        mockUSDC.approve(address(fundingRound), 1000 ether);

        // Test contributing and voting
        uint256[] memory projectIds = new uint256[](2);
        projectIds[0] = 0;
        projectIds[1] = 1;
        uint256 totalAmount = 100 ether;

        vm.expectEmit(true, true, false, true);
        emit FundsContributed(address(this), projectIds, totalAmount);

        fundingRound.contributeAndVote(projectIds, totalAmount);

        // Further checks: Verify that the projects received the correct amount of voting points
    }

    function testDistributeFunds() public {
        // Assume projects are created and funded as in the previous tests

        // Approve mUSDC spending and contribute to projects
        // ...

        // Call distributeFunds
        vm.expectEmit(false, false, false, true);
        emit FundsDistributed();

        fundingRound.distributeFunds();

        // Further checks: Verify that funds were distributed correctly to each project's recipient
    }

    function testInsufficientAllowance() public {
        // Setup: Create a project
        // ...

        // Attempt to contribute without approving mUSDC spending
        uint256[] memory projectIds = new uint256[](1);
        projectIds[0] = 0;
        uint256 totalAmount = 100 ether;

        vm.expectRevert("ERC20: insufficient allowance");
        fundingRound.contributeAndVote(projectIds, totalAmount);
    }

    function testNonExistentProject() public {
        // Setup: No project is created

        // Attempt to contribute to a non-existent project
        uint256[] memory projectIds = new uint256[](1);
        projectIds[0] = 999; // Non-existent project ID
        uint256 totalAmount = 100 ether;
        mockUSDC.approve(address(fundingRound), totalAmount);

        vm.expectRevert("Project does not exist");
        fundingRound.contributeAndVote(projectIds, totalAmount);
    }
}
