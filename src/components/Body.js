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
    margin: '0 auto',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    width: '90%',
    '@media only screen and (max-width: 915px)': {
      width:'100%'
    }
  }
};

export default injectSheet(styles)(Body);
