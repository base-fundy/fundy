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

        FundingRound fundingRound = new FundingRound(
            address(0x8AD9aD7A3c31fB0c38EC884F520eC8155fD33246)
        );
        console.log("FundFactory deployed at:", address(fundingRound));

        vm.stopBroadcast();
        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        // exportDeployments();
    }
    function test() public {}
}
