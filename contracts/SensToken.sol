pragma solidity ^0.4.4;

import 'zeppelin-solidity/contracts/token/StandardToken.sol';

contract SensToken is StandardToken {
  string public name = 'SensToken';
  string public symbol = 'SENS';
  uint public decimals = 18;
  uint public INITIAL_SUPPLY = 0;
  uint public MAX_SUPPLY = 1000000000;
  uint public RATE = 500;
  address public owner = msg.sender;

  function createTokens() payable{
      uint256 tokens = msg.value.mul(RATE);
      require(msg.value > 0 && totalSupply.add(tokens) <= MAX_SUPPLY);
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
