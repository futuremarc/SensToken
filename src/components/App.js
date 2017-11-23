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
    account: state.account,
    contract: state.contract,
    tokens: state.tokens,
    form: state.form,
    initialized: state.initialized
  }
}

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
