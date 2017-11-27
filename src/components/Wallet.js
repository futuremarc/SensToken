import React from 'react';
import PropTypes from 'prop-types';
import {numberWithCommas} from '../helpers';
import Aux from 'react-aux';
import Message from './Message';
import injectSheet from 'react-jss';

const Wallet = (props) => {
  const {id} = props.wallet;
  const {errorColor} = props.classes;
  return (
    <Aux>
      <div>Your MetaMask Wallet</div>
      {
        id  ?
        id : <div className={errorColor}>Please install MetaMask to sign in.</div> }
    </Aux>
  )
};

const Balance = ({tokens, wallet, classes}) => {
  const {brandColor, mediumFont} = classes;
  return (
    <Aux>
      <br/>
      <div>Your Token Balance</div>
      <div className=
        {`${brandColor} ${mediumFont}`}>
        {numberWithCommas(wallet.balance)} {tokens.symbol}
      </div>
    </Aux>
  )
};

const txStatus = ({txStatus, tokens, classes}) => {
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
  const {wallet, card} = props.classes;
  return (
    <div className={`${wallet} ${card}`}>
      <Wallet {...props}/>
      <br/>
      <br/>
      <Balance {...props}/>
      {txStatus(props)}
    </div>
  )
};

const styles = theme => ({
  amount: {
    marginTop:'7px'
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
