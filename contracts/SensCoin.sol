pragma solidity ^0.4.4;

import 'zeppelin-solidity/contracts/token/StandardToken.sol';

contract SensCoin is StandardToken {
  string public name = 'SensCoin';
  string public symbol = 'SENS';
  uint public decimals = 18;
  uint public INITIAL_SUPPLY = 0;
  uint public something = 1;
  address public owner = msg.sender;
  uint public RATE = 500;

  function createTokens() payable{
      require(msg.value > 0);
      uint256 tokens = msg.value.mul(RATE);
      balances[msg.sender] = balances[msg.sender].add(tokens);
      totalSupply = totalSupply.add(tokens);
      owner.transfer(msg.value);
  }

  function() payable {
      createTokens();
  }

  function SensCoin() {
    totalSupply = INITIAL_SUPPLY;
  }

}
