import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import store from '../store';
import * as actionCreators from '../actions/actionCreators';
import {appInitializedSelector} from '../selectors/selectors';

import '../styles/App.css';

import Header from './Header';
import Account from './Account';
import Token from './Token';
import Loading from 'react-loading-animation';
import Aux from 'react-aux';


class App extends React.Component {

  constructor(props) {
  	super();
  }

  componentWillMount() {
    window.addEventListener('load', this.props.getWeb3);
  }

  render() {

    const headerProps = {
      title: "SensToken",
      subtitle: "Make Sens of the World"
    };

    return (
      <div className="App">
        {
          !this.props.appInitialized ?
            <div className="Loading"><Loading/></div>
          :
          <Aux>
            <Header {...headerProps} {...this.props}/>
            <div className="App-body">
              <Token {...this.props}/>
              <Account {...this.props}/>
            </div>
          </Aux>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    account: state.account, /*wallet address*/
    tokens: state.tokens, /*token info (rate, totalsupply, maxsupply)*/
    form: state.form, /*redux form*/
    contract: state.contract, /*contract instance*/
    web3: state.web3, /*web3 object*/
    txConfirmation: state.txConfirmation, /*displays transaction success or fail*/
    appInitialized: appInitializedSelector(state) /*is app initialized, used for loader and polling metamask account changes*/
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
