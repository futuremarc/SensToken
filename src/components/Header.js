import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'semantic-ui-react';
import injectSheet from 'react-jss';

const Title = (props) => {
  const {title, brandColor} = props.classes;
  return (
    <h1 className={`${title} ${brandColor}`}>{props.title}</h1>
  )
};

const Subtitle = ({subTitle, classes}) => (
  <span className={classes.subTitle}>
    {subTitle}
  </span>
);

const Header = (props) => {
  const {classes, wallet} = props;
  return(
    <header className={classes.header}>
      <Title {...props}/>
      <Subtitle {...props}/>
      {
        !wallet.id &&
        <Button
          className={classes.login}
          size="medium"
          onClick={() => window.open('https://metamask.io', '_blank')}>
          Sign in with MetaMask
        </Button>
      }
    </header>
  )
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string
};

const styles = theme => ({
  header: {
    height: '140px',
    minWidth: '600px'
  },
  title: {
    display: 'inline-block',
    fontSize: '3.5em',
    padding: '35px 5px 10px 45px'
  },
  subTitle: {
    display: 'inline',
    fontSize: '1.5em',
    fontWeight: '300',
    color: '#aeaeae'
  },
  login: {
    position: 'absolute',
    right: '40px',
    top: '43px',
    '@media only screen and (max-width: 915px)': {
      display: 'none !important' /*override sematic-ui*/
    }
  },
  brandColor: theme.brandColor
});

export default injectSheet(styles)(Header);
