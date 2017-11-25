import React from 'react';
import PropTypes from 'prop-types';
import {numberWithCommas} from '../helpers';
import Aux from 'react-aux';
import FaCheckCircle from 'react-icons/lib/fa/check-circle';
import FaExclamationCircle from 'react-icons/lib/fa/exclamation-circle';
import FaClockO from 'react-icons/lib/fa/clock-o';

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
    } else if (this.props.txStatus.isSuccess === true) {
      return (
        <div className="success-color msg"><FaCheckCircle/>{this.props.txStatus.msg}</div>
      )
    } else if (this.props.txStatus.pending === true) {
      return (
        <div className="msg"><FaClockO/>{this.props.txStatus.msg}</div>
      )
    } else if (this.props.txStatus.isSuccess === false) {
      return (
        <div className="error-color msg"><FaExclamationCircle/>{this.props.txStatus.msg}</div>
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
