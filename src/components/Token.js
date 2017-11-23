import React from 'react';
import Purchase from './Purchase';
import PropTypes from 'prop-types';
import {numberWithCommas} from '../helpers';

const Token = (props)=>(
  <div className={props.classList}>
    <div className="Token-item">
      <div>Tokens per 1 ETH</div> <div className="medium-font">{numberWithCommas(props.tokens.rate)} SENS</div>
    </div>
    <div className="Token-item">
      <div>Max amount of tokens</div> <div className="medium-font">{numberWithCommas(props.tokens.maxSupply)}</div>
    </div>
    <div className="Token-item">
      <div>Available amount of tokens</div> <div className="medium-font">{numberWithCommas(props.tokens.maxSupply - props.tokens.totalSupply)}</div>
    </div>
    <Purchase {...props} form="''"/> {/* override form state w/empty string per redux-form API*/}
  </div>
)

Token.propTypes = {
  classList: PropTypes.string
};

export default Token;
