import React from 'react';
import Loading from 'react-loading-animation';
import injectSheet from 'react-jss';

const Loader = (props) => (
  <div className={props.classes.loader}><Loading/></div>
);

const styles = {
  'loader': {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width:'50px',
    height:'50px',
    transform: 'translate(-50%, -50%)'
  }
};

export default injectSheet(styles)(Loader)
