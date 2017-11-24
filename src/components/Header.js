import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'semantic-ui-react';

const Subtitle = (props)=>(
  <span className="Subtitle">
    {props.text}
  </span>
)

const Header = (props)=>(
  <header className="Header">
    <h1 className="Title brand-color">{props.title}</h1>
    <Subtitle text={props.subtitle}/>
    { !props.account.id &&
      <Button
        className="Login"
        size="big"
        onClick={() => window.open('https://metamask.io', '_blank')}>
        Sign in with MetaMask!
      </Button> }
  </header>
)

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

export default Header;
