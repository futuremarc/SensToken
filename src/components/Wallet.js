import React from 'react';
import {numberWithCommas} from '../helpers';
import Aux from 'react-aux';
import Message from './Message';
import injectSheet from 'react-jss';
import {DEPLOYED_NETWORK_NAME} from '../constants';


const Wallet = (props) => {
  const {contract} = props;
  const {id} = props.wallet;
  const {errorColor} = props.classes;
  return (
    <Aux>
      <div>Your MetaMask Wallet</div>
      {getWalletStatus(id, contract, errorColor)}
    </Aux>
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
  if (txStatus.success === true) type = 'success';
  else if (txStatus.pending === true) type = 'pending';
  else if (txStatus.success === false) type = 'error';
  const messageProps = {
    text: txStatus.msg,
    type: type
  };
  let notice;
  if (txStatus.success === true){
    notice = `You recently purchased ${numberWithCommas(txStatus.amount)} ${tokens.symbol}.`;
  }
  else if (txStatus.pending === true){
    notice = 'This may take up to a minute...';
  }
  return (
    <Aux>
      <Message {...messageProps}/>
      <div className={amount}>
        {notice}
      </div>
    </Aux>
  )
};


const Account = (props) => {
  const {wallet, cardItem, card} = props.classes;
  return (
    <div className={`${wallet} ${card}`}>
      <div className={cardItem}>
        <Wallet {...props}/>
      </div>
      <div className={cardItem}>
        <Balance {...props}/>
        {getTxStatus(props)}
      </div>
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
      minWidth: '500px'
    }
  },
  card: theme.card,
  cardItem: theme.cardItem,
  errorColor: theme.errorColor,
  brandColor: theme.brandColor,
  mediumFont: theme.mediumFont
});

export default injectSheet(styles)(Account);
