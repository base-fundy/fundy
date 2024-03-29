//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/MockUSDC.sol";
import "../contracts/FundFactory.sol";
import "../contracts/FundingRound.sol";
import "forge-std/Script.sol";
import "./DeployHelpers.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }
        vm.startBroadcast(deployerPrivateKey);
        MockUSDC mockUSDC = new MockUSDC();
        console.log("MockUSDC deployed at:", address(mockUSDC));

        FundFactory fundFactory = new FundFactory(address(mockUSDC));
        console.log("FundFactory deployed at:", address(fundFactory));

        fundFactory.createFundingRound();
        console.log("Funding round created through FundFactory");

        vm.stopBroadcast();
        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        exportDeployments();
    }
    function test() public {}
}