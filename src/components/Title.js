import React from 'react';
import PropTypes from 'prop-types';
import Slogan from './Slogan';

const Title = (props)=>(
  <header className="App-header">
    <h1 className="App-title">{props.title}</h1>
    <Slogan text="Make Sens of the World"/>
  </header>
)
Title.propTypes = {
  logo: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default Title;
