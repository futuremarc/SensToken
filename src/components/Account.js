import React from 'react';
import Aux from 'react-aux';
import PropTypes from 'prop-types';


class Account extends React.Component{

  render(){
    return (
      <Aux>
        {this.props.account.id ? <Aux>
          <div>Wallet: {this.props.account.id}</div>
          <div>Account balance: {this.props.account.balance}</div>
        </Aux> : <a href="http://metamask.io" rel="noopener noreferrer" target="_blank">{this.props.altText}</a>}
      </Aux>
    )
  }
}

Account.defaultProps = {
  altText: "Sign in with MetaMask!"
};

export default Account;
