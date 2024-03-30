// // SPDX-License-Identifier: MIT
// pragma solidity 0.8.19;

// import "forge-std/Test.sol";
// import "../contracts/FundingRound.sol";
// import "../contracts/MockUSDC.sol";

// contract FundingRoundTest is Test {
//     FundingRound public fundingRound;
//     MockUSDC public mockUSDC;


//     function setUp() public {
//         mockUSDC = MockUSDC(0x85E86cB0Be05fba27106877A90518275fe596388);
//         fundingRound = new FundingRound(address(mockUSDC));
//         mockUSDC.mint(address(this), 1000 ether);
//     }

//     function testCreateProject() public {
//         string memory projectName = "Test Project";
//         address projectRecipient = address(0x123);
//         mockUSDC.approve(address(fundingRound), 1000 ether);

//         vm.expectEmit(true, true, false, true);
//         emit ProjectCreated(0, projectName, projectRecipient);

//         fundingRound.createProject(projectName, projectRecipient);

//         // Further checks can include verifying the project details
//     }

//     function testContributeAndVote() public {
//         // Setup: Create two projects
//         string memory projectName1 = "Project One";
//         address projectRecipient1 = address(0x123);
//         fundingRound.createProject(projectName1, projectRecipient1);

//         string memory projectName2 = "Project Two";
//         address projectRecipient2 = address(0x456);
//         fundingRound.createProject(projectName2, projectRecipient2);

//         // Approve mUSDC spending
//         mockUSDC.approve(address(fundingRound), 1000 ether);

//         // Test contributing and voting
//         uint256[] memory projectIds = new uint256[](2);
//         projectIds[0] = 0;
//         projectIds[1] = 1;
//         uint256 totalAmount = 100 ether;

//         vm.expectEmit(true, true, false, true);
//         emit FundsContributed(address(this), projectIds, totalAmount);

//         fundingRound.contributeAndVote(projectIds, totalAmount);

//         // Verify project voting points are correctly updated
//         (, uint256 votingPoints1, , ) = fundingRound.projects(0);
//         (, uint256 votingPoints2, , ) = fundingRound.projects(1);
//         uint256 totalPointsExpected = _sqrt(100 ether);
//         uint256 individualPointExpected = totalPointsExpected / 2; // Since funds are equally divided

//         assertEq(
//             votingPoints1,
//             individualPointExpected,
//             "Project 1 did not receive correct voting points"
//         );
//         assertEq(
//             votingPoints2,
//             individualPointExpected,
//             "Project 2 did not receive correct voting points"
//         );
//     }

//     function xtestDtistribueFunds() public {
//         // Setup: Create two projects
//         string memory projectName1 = "Project One";
//         address projectRecipient1 = address(0x123);
//         fundingRound.createProject(projectName1, projectRecipient1);

//         string memory projectName2 = "Project Two";
//         address projectRecipient2 = address(0x456);
//         fundingRound.createProject(projectName2, projectRecipient2);

//         // Approve mUSDC spending and contribute to both projects
//         uint256[] memory projectIds = new uint256[](2);
//         projectIds[0] = 0; // ID of the first project
//         projectIds[1] = 1; // ID of the second project
//         uint256 totalAmount = 1000 ether; // Total amount to distribute among the projects

//         mockUSDC.approve(address(fundingRound), totalAmount);
//         fundingRound.contributeAndVote(projectIds, totalAmount);

//         // Store initial balances of the project recipients
//         uint256 initialBalanceRecipient1 = mockUSDC.balanceOf(
//             projectRecipient1
//         );
//         uint256 initialBalanceRecipient2 = mockUSDC.balanceOf(
//             projectRecipient2
//         );

//         // Call distributeFunds
//         vm.expectEmit(false, false, false, true);
//         emit FundsDistributed();
//         fundingRound.distributeFunds();

//         // Calculate expected share based on voting points
//         // For simplicity, assuming equal votes hence equal share
//         uint256 expectedSharePerProject = totalAmount / projectIds.length;

//         // Verify the funds were distributed correctly
//         uint256 finalBalanceRecipient1 = mockUSDC.balanceOf(projectRecipient1);
//         uint256 finalBalanceRecipient2 = mockUSDC.balanceOf(projectRecipient2);

//         // Check if the recipients received the correct amount
//         assertEq(
//             finalBalanceRecipient1,
//             initialBalanceRecipient1 + expectedSharePerProject,
//             "Project 1 recipient did not receive correct funds"
//         );
//         assertEq(
//             finalBalanceRecipient2,
//             initialBalanceRecipient2 + expectedSharePerProject,
//             "Project 2 recipient did not receive correct funds"
//         );
//     }

//     function testCreateStream() public {
//         mockUSDC.mint(address(fundingRound), 100000 ether);
//         string memory projectName1 = "Project One";
//         address projectRecipient1 = makeAddr("projectRecipient1");
//         fundingRound.createProject(projectName1, projectRecipient1);

//         string memory projectName2 = "Project Two";
//         address projectRecipient2 = makeAddr("projectRecipient2");
//         fundingRound.createProject(projectName2, projectRecipient2);

//         uint256[] memory projectIds = new uint256[](2);
//         projectIds[0] = 0; // ID of the first project
//         projectIds[1] = 1; // ID of the second project

//         uint128 project1Amount = 500 ether;

//         mockUSDC.balanceOf(address(fundingRound));
//         fundingRound.createStream(
//             project1Amount / 2,
//             project1Amount / 2,
//             projectRecipient1
//         );
//     }

//     function _sqrt(uint256 x) internal pure returns (uint256 y) {
//         uint256 z = (x + 1) / 2;
//         y = x;
//         while (z < y) {
//             y = z;
//             z = (x / z + z) / 2;
//         }
//     }
// }
