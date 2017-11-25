import React from 'react';
import PropTypes from 'prop-types';
import {numberWithCommas} from '../helpers';
import Aux from 'react-aux';
import Message from './Message';

const Wallet = (props) => {
  return (
    <Aux>
      <div>Your MetaMask Wallet</div>
      <div>{ props.account.id  ? props.account.id : <div className="error-color">Please install MetaMask to sign in.</div> }</div>
    </Aux>
  )
}

const Balance = (props) => {
  return (
    <Aux>
      <div>Your Token Balance</div>
      <div className="brand-color medium-font">{numberWithCommas(props.account.balance)} {props.tokens.symbol}</div>
    </Aux>
  )
}

class Account extends React.Component{

  txStatus() {
    if (!this.props.txStatus.msg) {
      return (
        <div></div>
      )
    } else {
      let type;
      if (this.props.txStatus.isSuccess === true) type = 'success';
      else if (this.props.txStatus.pending === true) type = 'pending';
      else if (this.props.txStatus.isSuccess === false) type = 'error';

      const messageProps = {
        text: this.props.txStatus.msg,
        type: type
      };
      const amountStyle = {
        marginTop: '10px'
      };
      return (
        <Aux>
          <Message {...messageProps}/>
          {
            this.props.txStatus.isSuccess &&
            <div style={amountStyle}>You recently purchased {numberWithCommas(this.props.txStatus.amount)} {this.props.tokens.symbol}.</div>
          }
        </Aux>
      )
    }
  }

  render() {
    return (
      <div className="Account card">
        <Wallet {...this.props}/>
        <br/>
        <Balance {...this.props}/>
        {this.txStatus()}
      </div>
    )
  }
}

Account.propTypes = {
  classList: PropTypes.string
};

export default Account;
