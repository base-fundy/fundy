pragma solidity =0.8.19;

import "forge-std/Script.sol";
import "../contracts/FundingRound.sol";

contract CustomDeploy is Script {
    function run() external {
        uint256 deployer = vm.envUint("DEPLOYER_PRIVATE_KEY");
        vm.startBroadcast(deployer);
        new FundingRound(0x8AD9aD7A3c31fB0c38EC884F520eC8155fD33246);
        vm.stopBroadcast();
    }
}
