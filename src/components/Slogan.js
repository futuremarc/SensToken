import React from 'react';
import PropTypes from 'prop-types';

const Slogan = (props)=>(
  <p className="App-slogan">
    {props.text}
  </p>
)

Slogan.propTypes = {
  text: PropTypes.string.isRequired
};

export default Slogan;
