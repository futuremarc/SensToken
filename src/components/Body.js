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
    paddingLeft: '5%',
    paddingRight: '5%',
    height: '68%',
    position: 'relative',
    top: '0',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    '@media only screen and (max-width: 915px)': {
      display: 'block'
    }
  }
};

export default injectSheet(styles)(Body);
