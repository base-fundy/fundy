// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Test.sol";
import "../contracts/FundingRound.sol";
import "../contracts/ERC20Mock.sol";

contract FundingRoundTest is Test {
    FundingRound public funding;
    ERC20Mock public degen;
    ERC20Mock public toby;
    address public owner;
    address vrf;
    function setUp() public {
        degen = ERC20Mock(0x07B8FF46Cc6e366Fe12e4d3D47825000d9948eCD);
        toby = ERC20Mock(0x030996ec60617Fe293B4A51c97bE0973C9ECDF33);
        owner = makeAddr("owner");
        vm.startPrank(owner);
        funding = new FundingRound(owner);

        funding.createProject(
            "Project 1",
            0x5a562294808c5470873831ff456e86369dc32dcB
        );
        funding.createProject(
            "Project 2",
            0x5a562294808c5470873831ff456e86369dc32dcB
        );
        funding.createProject(
            "Project 3",
            0x5a562294808c5470873831ff456e86369dc32dcB
        );

        funding.setShitCoin(address(degen));
        funding.setShitCoin(address(toby));
        vrf = 0xfaFCfceC4e29e9b4ECc8C0a3f7df1011580EEEf2;
        funding.setGatewayAddress(vrf);

        degen.mint(owner, 1000 ether);
        toby.mint(owner, 1000 ether);

        degen.approve(address(funding), 1000 ether);
        toby.approve(address(funding), 1000 ether);
        vm.stopPrank();
    }

    function testA() external {
        deal(owner, 1000 ether);
        vm.startPrank(owner);
        funding.fund(address(degen), 1 ether);
        funding.fund(address(toby), 1 ether);

        funding.endFoundingRound{value: 1 ether}(10_000_000);
        vm.stopPrank();

        vm.startPrank(vrf);
        uint256[] memory random = new uint256[](5);
        random[0] = 1;
        random[1] = 2;
        random[2] = 3;
        random[3] = 4;
        random[4] = 5;
        funding.fulfillRandomWords(1, random);
        vm.stopPrank();
    }
}
