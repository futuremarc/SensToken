import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'semantic-ui-react';


const Title = (props) => {
  return (
    <h1 className="Title brand-color">{props.title}</h1>
  )
}

const Subtitle = (props) => (
  <span className="Subtitle">
    {props.subtitle}
  </span>
)

const Header = (props) => (
  <header className="Header">
    <Title {...props}/>
    <Subtitle {...props}/>
    {
      !props.account.id &&
      <Button
        className="Login"
        size="big"
        onClick={() => window.open('https://metamask.io', '_blank')}>
        Sign in with MetaMask!
      </Button>
    }
  </header>
)

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

export default Header;
