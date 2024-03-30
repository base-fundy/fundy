pragma solidity =0.8.19;

import "forge-std/Script.sol";
import "../contracts/FundFactory.sol";

contract FactoryDeploy is Script {
    function run() external {
        uint256 deployer = vm.envUint("DEPLOYER_PRIVATE_KEY");
        vm.startBroadcast(deployer);
        new FundFactory();
        vm.stopBroadcast();
    }
}
