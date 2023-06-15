// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./VerityToken.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Faucet {
  // VerityToken instance
  VerityToken private vtkToken;
  // Address of Owner
  address owner;
  // For rate limiting
  mapping(address => uint256) userNextBuyTime;
  uint256 private buyTimeLimit; //in minutes
  // No.of tokens to send when requested
  uint256 faucetDripAmount;

  constructor(address _tokenAddress, address _owner, uint256 _buyTimeLimit, uint256 _faucetDripAmount) {
    vtkToken = VerityToken(_tokenAddress);
    owner = _owner;
    buyTimeLimit = _buyTimeLimit;
    faucetDripAmount = _faucetDripAmount;
  }

  // Verifies whether the caller is the owner 
  modifier onlyOwner{
    require(msg.sender == owner,"FaucetError: Caller not owner");
    _;
  }

  // Updates the underlying token address (only owner)
  function setTokenAddress(address _tokenAddr) external onlyOwner {
    vtkToken = VerityToken(_tokenAddr);
  }    
  
  // Updates the drip rate (only owner)
  function setFaucetDripAmount(uint256 _amount) external onlyOwner {
    faucetDripAmount = _amount;
  }

  // Allows the owner to withdraw tokens from the contract.
  function withdrawTokens(address _receiver, uint256 _amount) external onlyOwner {
    require(vtkToken.balanceOf(address(this)) >= _amount,"FaucetError: Insufficient funds");
    vtkToken.transfer(_receiver,_amount);
  }    

  function requestTokens() public {
    require(msg.sender != address(0), "Cannot send token zero address");
    require(vtkToken.balanceOf(address(this)) > 1,"FaucetError: Empty"); // Check for empty faucet balance
    require(block.timestamp > userNextBuyTime[msg.sender], "RateLimitError: Your next request time is not reached yet"); // check for user rate limit
    require(vtkToken.transfer(msg.sender, faucetDripAmount*10**vtkToken.decimals()), "requestTokens(): Failed to Transfer");

    //Update user's next allowed buy time
    userNextBuyTime[msg.sender] = block.timestamp + buyTimeLimit * 1 minutes;
  }
}