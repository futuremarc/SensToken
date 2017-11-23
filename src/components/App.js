import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import store from '../store';
import * as actionCreators from '../actions/actionCreators';

import '../styles/App.css';

import Header from './Header';
import Account from './Account';
import Token from './Token';


class App extends React.Component {

  constructor(props){
  	super();
  }

  componentWillMount() {
    window.addEventListener('load', this.props.getContract);
  }

  render() {

    const headerProps = {
      title: "SensToken"
    };
    const tokenProps = {
      classList: "Token card"
    }
    const accountProps = {
      classList: "Account card"
    }

    return (
      <div className="App">
        <Header {...headerProps} {...this.props}/>
        <div className="App-body">
          <Token {...tokenProps} {...this.props}/>
          <Account {...accountProps} {...this.props}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    account: state.account, /*wallet address*/
    contract: state.contract, /*contract instance*/
    tokens: state.tokens, /*wallet address*/
    form: state.form, /*redux form*/
    initialized: state.initialized /*is app initialized, used to set metamask account change polling*/
  }
}

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
