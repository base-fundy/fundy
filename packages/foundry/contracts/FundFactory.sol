// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./FundingRound.sol";

contract FundFactory is Ownable {
    address[] private _fundingRounds;
    // Assuming the mUSDC address is constant and known at compile time
    address private immutable _i_mUSDCAddress;

    constructor(address _mUSDCAddress) {
        _i_mUSDCAddress = _mUSDCAddress;
    }

    event FundingRoundCreated(address indexed fundingRoundAddress);

    function createFundingRound() external onlyOwner {
        FundingRound newRound = new FundingRound(_i_mUSDCAddress);
        _fundingRounds.push(address(newRound));
        emit FundingRoundCreated(address(newRound));
    }

    function getFundingRounds() external view returns (address[] memory) {
        return _fundingRounds;
    }
}
