// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./FundingRound.sol";

contract FundFactory is Ownable {
    address[] private _fundingRounds;

    event FundingRoundCreated(address indexed fundingRoundAddress);

    function createFundingRound() external onlyOwner {
        FundingRound newRound = new FundingRound(msg.sender);
        _fundingRounds.push(address(newRound));
        emit FundingRoundCreated(address(newRound));
    }

    function getFundingRounds() external view returns (address[] memory) {
        return _fundingRounds;
    }
}
