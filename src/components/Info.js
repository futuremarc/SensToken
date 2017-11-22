import React from 'react';
import Aux from 'react-aux';

const Info = (props)=>(
  <Aux>
    <div>Price: {props.tokens.rate} SENS / 1 ETH</div>
    <div>Max Amount of Tokens: {props.tokens.maxSupply}</div>
    <div>Total Tokens purchased: {props.tokens.purchased}</div>
  </Aux>

)

export default Info;
