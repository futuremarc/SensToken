import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import {appInitializedSelector} from '../selectors/selectors';
import injectSheet, {ThemeProvider} from 'react-jss';
import theme from '../theme';

import Loader from './Loader';
import Header from './Header';
import Body from './Body';
import Aux from 'react-aux';

import {TOKEN_TAGLINE} from '../constants';

class App extends Component {
  constructor(props) {
  	super();
  }
  componentWillMount() {
    window.addEventListener('load', this.props.getWeb3);
  }

  render() {
    const {app} = this.props.classes;
    const {token, appInitialized} = this.props;
    const {props} = this;
    const headerProps = {
      title: token.name,
      subTitle: token.tagline || TOKEN_TAGLINE
    };
    return (
      <ThemeProvider theme={theme}>
        <div className={app}>
          {
            !appInitialized ?
              <Loader/>
            :
            <Aux>
              <Header {...props} {...headerProps}/>
              <Body {...props}/>
            </Aux>
          }
        </div>
      </ThemeProvider>
    );
  }
};

const styles = {
  app: {
    color: '#333',
    backgroundColor: '#f2f2f2',
    fontSize: '.95em',
    fontWeight: '300',
    fontFamily: '"Montserrat", sans-serif',
    height: '100%'
  }
};

const mapStateToProps = (state) => {
  const {wallet, token, form, contract, web3, txStatus} = state;
  return {
    wallet, /*wallet id, balance, network*/
    token, /*token info (rate, totalsupply, maxsupply, symbol, name)*/
    form, /*redux form*/
    contract, /*contract instance*/
    web3, /*web3 object*/
    txStatus, /*transaction success, fail, pending, msg*/
    appInitialized: appInitializedSelector(state) /*is app initialized*/
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
};

export default injectSheet(styles)(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
