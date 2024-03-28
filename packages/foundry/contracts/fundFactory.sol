// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./FundingRound.sol";

contract FundFactory is Ownable {
    address[] private fundingRounds;
    // Assuming the mUSDC address is constant and known at compile time
    address private immutable mUSDCAddress;

    constructor(address _mUSDCAddress) {
        mUSDCAddress = _mUSDCAddress;
    }

    event FundingRoundCreated(address indexed fundingRoundAddress);

    function createFundingRound() external onlyOwner {
        FundingRound newRound = new FundingRound(mUSDCAddress);
        fundingRounds.push(address(newRound));
        emit FundingRoundCreated(address(newRound));
    }

    function getFundingRounds() external view returns (address[] memory) {
        return fundingRounds;
    }
}
