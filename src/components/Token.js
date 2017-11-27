import React from 'react';
import Purchase from './Purchase';
import PropTypes from 'prop-types';
import {numberWithCommas} from '../helpers';
import injectSheet from 'react-jss';


const Rate = (props) => {
  const {tokenItem, mediumFont} = props.classes;
  const {tokens} = props;
  return (
    <div className={tokenItem}>
      <div>Tokens per 1 ETH</div> <div className={mediumFont}>{numberWithCommas(tokens.rate)} {tokens.symbol}</div>
    </div>
  )
}

const MaxSupply = (props) => {
  const {tokenItem, mediumFont} = props.classes;
  const {tokens} = props;
  return (
    <div className={tokenItem}>
      <div>Max amount of tokens</div> <div className={mediumFont}>{numberWithCommas(tokens.maxSupply)}</div>
    </div>
  )
}

const TotalSupply = (props) => {
  const {tokenItem, mediumFont} = props.classes;
  const {tokens} = props;
  return (
    <div className={tokenItem}>
      <div>Available amount of tokens</div> <div className={mediumFont}>{numberWithCommas(tokens.maxSupply - tokens.totalSupply)}</div>
    </div>
  )
}

const purchaseProps = {
  form: "''" /*override form state w/empty string per redux-form API*/
}

const Token = (props)=>{
  const {token, card} = props.classes;
  return (
    <div className={`${token} ${card}`}>
      <Rate {...props}/>
      <MaxSupply {...props}/>
      <TotalSupply {...props}/>
      <Purchase {...props} {...purchaseProps}/>
    </div>
  )
}

Token.propTypes = {
  classList: PropTypes.string
};

const styles = theme => ({
  token: {
    lineHeight: '1.5em',
    width: '60%',
    height: '450px',
    marginRight: '15px',
    display: 'inline-block',
    wordWrap: 'break-word',
    verticalAlign: 'top',
    '@media only screen and (max-width: 915px)': {
      width:'100%',
      minWidth: '505px'
    }
  },
  tokenItem: {
    paddingBottom: '30px'
  },
  mediumFont: theme.mediumFont,
  card: theme.card
})

export default injectSheet(styles)(Token);
