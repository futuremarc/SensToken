import React from 'react';
import PropTypes from 'prop-types';
import {numberWithCommas} from '../helpers';
import Aux from 'react-aux';
import FaCheckCircle from 'react-icons/lib/fa/check-circle';
import FaExclamationCircle from 'react-icons/lib/fa/exclamation-circle';


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
      <div className="brand-color medium-font">{numberWithCommas(props.account.balance)} SENS</div>
    </Aux>
  )
}

class Account extends React.Component{

  txConfirmation() {
    if (!this.props.txConfirmation.msg) {
      return (
        <div></div>
      )
    } else if (this.props.txConfirmation.isSuccess) {
      return (
        <div className="success-color Account-msg"><FaCheckCircle/>{this.props.txConfirmation.msg}</div>
      )
    } else {
      return (
        <div className="error-color Account-msg"><FaExclamationCircle/>{this.props.txConfirmation.msg}</div>
      )
    }
  }

  render() {
    return (
      <div className="Account card">
        <Wallet {...this.props}/>
        <br/>
        <Balance {...this.props}/>
        {this.txConfirmation()}
      </div>
    )
  }
}

Account.propTypes = {
  classList: PropTypes.string
};

export default Account;
