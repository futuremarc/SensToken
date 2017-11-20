pragma solidity ^0.4.17;

import './IERC20.sol';

contract SensysToken is IERC20{

    uint public _totalSupply = 1000000;
    mapping (address => uint256) public balances;
    mapping (address => mapping(address =>uint256)) internal allowed;
    string public constant symbol = "SEN";
    string public constant name = "SensysToken";
    uint8 public constant decimals = 5;

    function SensysToken() public{
        balances[msg.sender] = _totalSupply;
    }

    function totalSupply() public constant returns (uint256 total){
        return _totalSupply;
    }

    function balanceOf(address _owner) public constant returns (uint256 balance){
        return balances[_owner];
    }

    function transfer(address _to, uint256 _value) public returns (bool success){
        require(balances[msg.sender] >= _value && _value > 0);
        balances[_to] += _value;
        Transfer(msg.sender, _to, _value);
        return true;

    }
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        require(
            allowed[_from][msg.sender] >= _value
            && balances[_from] >= _value
            && _value > 0
        );
        balances[_from] -= _value;
        balances[_to] += _value;
        allowed[_from][msg.sender] -= _value;
        Transfer(_from,_to,_value);
        return true;
    }
    function approve(address _spender, uint256 _value) public returns (bool success){
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender,_spender,_value);
        return true;
    }

    function allowance(address _owner, address _spender) public constant returns (uint256 remaining){
        return allowed[_owner][_spender];
    }
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}
