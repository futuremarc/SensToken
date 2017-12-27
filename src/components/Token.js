import React from 'react';
import Purchase from './Purchase';
import PropTypes from 'prop-types';
import {numberWithCommas} from '../helpers';
import injectSheet from 'react-jss';


const Rate = (props) => {
  const {cardItem, mediumFont} = props.classes;
  const {token} = props;
  return (
    <div className={cardItem}>
      <div>Tokens per 1 ETH</div>
      <div className={mediumFont}>
        {numberWithCommas(token.rate)} {token.symbol}
      </div>
    </div>
  )
}

const MaxSupply = (props) => {
  const {cardItem, mediumFont} = props.classes;
  const {token} = props;
  return (
    <div className={cardItem}>
      <div>Max amount of tokens</div>
      <div className={mediumFont}>
        {numberWithCommas(token.maxSupply)}
      </div>
    </div>
  )
}

const TotalSupply = (props) => {
  const {cardItem, mediumFont} = props.classes;
  const {token} = props;
  return (
    <div className={cardItem}>
      <div>Available amount of tokens</div>
      <div className={mediumFont}>
        {numberWithCommas(token.maxSupply - token.totalSupply)}
      </div>
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
    minHeight: '450px',
    height: '75%',
    marginRight: '15px',
    display: 'inline-block',
    wordWrap: 'break-word',
    verticalAlign: 'top',
    '@media only screen and (max-width: 915px)': {
      width: '100%',
      minWidth: '500px'
    }
  },
  cardItem: theme.cardItem,
  mediumFont: theme.mediumFont,
  card: theme.card
});

export default injectSheet(styles)(Token);
