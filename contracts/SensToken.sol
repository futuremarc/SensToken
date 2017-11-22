pragma solidity ^0.4.4;

import 'zeppelin-solidity/contracts/token/StandardToken.sol';

contract SensToken is StandardToken {
  address public constant owner = msg.sender;
  string public constant name = 'SensToken';
  string public constant symbol = 'SENS';
  uint32 public constant decimals = 18;
  uint256 public constant MAX_SUPPLY = 1000000000;
  uint32 public constant RATE = 500;
  uint32 public INITIAL_SUPPLY = 0;

  modifier hasValue(){
     require(msg.value > 0);
     _;
  }

  modifier areTokensLeft(){
    uint256 tokens = msg.value.mul(RATE);
    uint256 newTotal = totalSupply.add(tokens);
    require(newTotal <= MAX_SUPPLY);
    _;
  }

  function createTokens() payable hasValue {
      uint256 tokens = msg.value.mul(RATE);
      balances[msg.sender] = balances[msg.sender].add(tokens);
      totalSupply = totalSupply.add(tokens);
      owner.transfer(msg.value);
  }

  function() payable {
      createTokens();
  }

  function SensToken() {
    totalSupply = INITIAL_SUPPLY;
  }

}
