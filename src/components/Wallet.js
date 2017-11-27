import React from 'react';
import PropTypes from 'prop-types';
import {numberWithCommas} from '../helpers';
import Aux from 'react-aux';
import Message from './Message';
import injectSheet from 'react-jss';
import {DEPLOYED_NETWORK_NAME} from '../constants';


const Wallet = (props) => {
  const {contract} = props;
  const {id} = props.wallet;
  const {walletItem, errorColor} = props.classes;
  return (
    <div className={walletItem}>
      <div>Your MetaMask Wallet</div>
      {getWalletStatus(id, contract, errorColor)}
    </div>
  )
};

const Balance = ({tokens, wallet, classes}) => {
  const {brandColor, mediumFont} = classes;
  return (
    <Aux>
      <div>Your Token Balance</div>
      <div className=
        {`${brandColor} ${mediumFont}`}>
        {numberWithCommas(wallet.balance)} {tokens.symbol}
      </div>
    </Aux>
  )
};

const getWalletStatus = (id, contract, errorColor) => {
  if (contract.stack){   /*wrong network*/
    return(
      <div
        className={errorColor}>
        {`Please use the ${DEPLOYED_NETWORK_NAME}.`}
      </div>
    )
  } else if (id){    /*all good*/
    return id
  } else {           /*no metamask*/
    return(
      <div
        className={errorColor}>
        Please install MetaMask to sign in.
      </div>
    )
  }
};

const getTxStatus = ({txStatus, tokens, classes}) => {
  const {amount} = classes;
  if (!txStatus.msg) return (<div></div>);
  let type;
  if (txStatus.isSuccess === true) type = 'success';
  else if (txStatus.pending === true) type = 'pending';
  else if (txStatus.isSuccess === false) type = 'error';
  const messageProps = {
    text: txStatus.msg,
    type: type
  };
  return (
    <Aux>
      <Message {...messageProps}/>
      {
        txStatus.isSuccess &&
        <div className=
          {amount}>
          You recently purchased {numberWithCommas(txStatus.amount)} {tokens.symbol}.
        </div>
      }
    </Aux>
  )
};

const Account = (props) => {
  const {wallet, walletItem, card} = props.classes;
  return (
    <div className={`${wallet} ${card}`}>
      <Wallet {...props}/>
      <Balance {...props}/>
      <div className={walletItem}>
        {getTxStatus(props)}
      </div>
    </div>
  )
};

const styles = theme => ({
  amount: {
    marginTop:'7px'
  },
  walletItem:{
    paddingBottom:'37px'
  },
  wallet: {
    width: '35%',
    height: '450px',
    display: 'inline-block',
    wordWrap: 'break-word',
    paddingTop: '65px',
    '@media only screen and (max-width: 915px)': {
      width:'100%',
      minWidth: '505px'
    }
  },
  card: theme.card,
  errorColor: theme.errorColor,
  brandColor: theme.brandColor,
  mediumFont: theme.mediumFont
});

export default injectSheet(styles)(Account);
