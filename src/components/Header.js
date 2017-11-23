import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'semantic-ui-react';

const Subtitle = (props)=>(
  <p className="App-subtitle">
    {props.text}
  </p>
)

const Header = (props)=>(
  <header className="App-header">
    <h1 className="App-title brand-color">{props.title}</h1>
    <Subtitle text="Make Sens of the World"/>
    { !props.account.id && <Button className="App-login" size="big" onClick={() => window.open('https://metamask.io', '_blank')}>Sign in with MetaMask!</Button>}
  </header>
)

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
