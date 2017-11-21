import React from 'react';
import Aux from 'react-aux'



class Account extends React.Component{

  render(){
    return (
      <Aux>
        <div>account: {this.props.account}</div>
        <div>SensToken balance: {this.props.balance}</div>
      </Aux>
    )
  }
}

export default Account;
