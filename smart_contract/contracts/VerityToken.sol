// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

// The contract inherits three other contracts: ERC20, Ownable, and ERC20Permit. 
// Therefore, our contract will be an ERC20 token owned by a single owner (specified by Ownable) and 
// will add the permit functionality with ERC20Permit.
// The contract allows the owner to mint new tokens and add them to the token supply.
// The contract mints 1000 tokens to the sender of the contract during its deployment.
// The function to mint new tokens is restricted to the owner of the contract.
contract VerityToken is ERC20, Ownable, ERC20Permit {
  constructor() ERC20("VerityToken", "VTK") ERC20Permit("VerityToken") {
    _mint(msg.sender, 1000 * 10 ** decimals());
  }

  function mint(address to, uint256 amount) public onlyOwner {
    _mint(to, amount);
  }
}