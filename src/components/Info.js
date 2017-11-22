import React from 'react';
import Aux from 'react-aux';

const Info = (props)=>(
  <Aux>
    <div>Max Amount of Tokens: {props.tokens.maxSupply}</div>
    <div>Tokens purchased: {props.tokens.purchased}</div>
    <div>Price per Token: {props.tokens.rate}</div>

  </Aux>

)

export default Info;
