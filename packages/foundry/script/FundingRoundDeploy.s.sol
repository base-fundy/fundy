pragma solidity =0.8.19;

import "forge-std/Script.sol";
import "../contracts/FundingRound.sol";

contract FundingRoundDeploy is Script {
    function run() external {
        uint256 deployer = vm.envUint("DEPLOYER_PRIVATE_KEY");
        vm.startBroadcast(deployer);
        FundingRound funding = new FundingRound(
            0x5a562294808c5470873831ff456e86369dc32dcB
        );

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

        funding.setShitCoin(0x07B8FF46Cc6e366Fe12e4d3D47825000d9948eCD);
        funding.setShitCoin(0x030996ec60617Fe293B4A51c97bE0973C9ECDF33);
        funding.setShitCoin(0x9080cFe04A99afeBF37EaA40441c4191B46c2cd1);
        funding.setShitCoin(0xf45b4dE5C02A7FD2cb137145fb52e7D6d5a9a32e);
        funding.setShitCoin(0xB77Ff06d00179F0811E9788B2cBA6A2b0011B165);

        funding.setGatewayAddress(0xfaFCfceC4e29e9b4ECc8C0a3f7df1011580EEEf2);
        vm.stopBroadcast();
    }
}
