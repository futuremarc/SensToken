import React from 'react';
import injectSheet from 'react-jss';
import Wallet from './Wallet';
import Token from './Token';

const Body = (props) => (
  <div className={props.classes.body}>
    <Token {...props}/>
    <Wallet {...props}/>
  </div>
);

const styles = {
  body: {
    marginLeft: '5%',
    marginRight: '5%'
  }
};

export default injectSheet(styles)(Body);
