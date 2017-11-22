import React from 'react';
import Aux from 'react-aux'


class Account extends React.Component{

  render(){
    return (
      <Aux>
        <div>Account: {this.props.account.id}</div>
        <div>SensToken balance: {this.props.account.balance}</div>
      </Aux>
    )
  }
}

export default Account;
