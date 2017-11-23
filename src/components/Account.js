import React from 'react';
import {Button} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {numberWithCommas} from '../helpers';


class Account extends React.Component{

  render(){
    return (
      <div className={this.props.classList}>
        <div>Your MetaMask Wallet</div>
        <div>{ this.props.account.id ? this.props.account.id : <div className="error">Please install MetaMask to sign in</div> }</div>
        <br/>
        <div>Your Token Balance </div>
        <div className="brand-color medium-font">{numberWithCommas(this.props.account.balance)} SENS</div>
      </div>
    )
  }
}

Account.propTypes = {
  classList: PropTypes.string
};

export default Account;
