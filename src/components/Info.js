import React from 'react';
import Aux from 'react-aux';

const Info = (props)=>(
  <Aux>
    <div>Price: {props.tokens.rate} SENS / 1 ETH</div>
    <div>Max amount of tokens: {props.tokens.maxSupply}</div>
    <div>Total tokens purchased: {props.tokens.purchased}</div>
  </Aux>

)

export default Info;
