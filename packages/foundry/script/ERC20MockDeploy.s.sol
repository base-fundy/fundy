pragma solidity =0.8.19;

import "forge-std/Script.sol";
import "../contracts/ERC20Mock.sol";

contract ERC20MockDeploy is Script {
    function run() external {
        uint256 deployer = vm.envUint("DEPLOYER_PRIVATE_KEY");
        vm.startBroadcast(deployer);
        new ERC20Mock("Degen", "DEGEN");
        new ERC20Mock("toby", "toby");
        new ERC20Mock("WhyDidHeLeave", "WHY");
        new ERC20Mock("mfercoin", "mfer");
        new ERC20Mock("Brett", "BRETT");
        vm.stopBroadcast();
    }
}
