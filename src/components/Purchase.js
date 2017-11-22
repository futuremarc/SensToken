import React from 'react';
import {Input, Button, Message} from 'semantic-ui-react';
import Aux from 'react-aux';

const Purchase = (props)=>(
  <Aux>
    <div>Buy Tokens</div>
    <Input placeholder="Enter Amount"/>
    <Button>Purchase</Button>
    <Message></Message>
  </Aux>
)

export default Purchase;
