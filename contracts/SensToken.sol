pragma solidity ^0.4.4;

import 'zeppelin-solidity/contracts/token/StandardToken.sol';

contract SensToken is StandardToken {

  address public owner = msg.sender;
  string public constant NAME = 'SensToken';
  string public constant SYMBOL = 'SENS';
  uint32 public constant DECIMALS = 18;
  uint256 public constant ETHER_CAP = 1000000 ether;
  uint32 public constant RATE = 500;
  uint256 public MAX_TOKENS = ETHER_CAP.mul(RATE);
  uint32 public constant INITIAL_SUPPLY = 0;

  event CreatedTokens(address sender, uint256 balance, uint256 totalSupply);

  modifier hasValue(){
     require(msg.value > 0);
     _;
  }

  modifier areTokensLeft(){
    uint256 tokens = msg.value.mul(RATE);
    uint256 newTotal = totalSupply.add(tokens);
    require(newTotal <= MAX_TOKENS);
    _;
  }

  function createTokens() public payable hasValue areTokensLeft {
      uint256 tokens = msg.value.mul(RATE);
      balances[msg.sender] = balances[msg.sender].add(tokens);
      totalSupply = totalSupply.add(tokens);
      CreatedTokens(msg.sender, balances[msg.sender], totalSupply);
      owner.transfer(msg.value);
  }

  function() public payable {
      createTokens();
  }

  function SensToken() public {
    totalSupply = INITIAL_SUPPLY;
  }

}
