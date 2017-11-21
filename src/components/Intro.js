import React from 'react';
import PropTypes from 'prop-types';

const Intro = (props)=>(
  <p className="App-intro">
    {props.text}
  </p>
)

Intro.propTypes = {
  text: PropTypes.string.isRequired
};

export default Intro;
