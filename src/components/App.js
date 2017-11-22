import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

import Header from './Header';
import Intro from './Intro';
import Account from './Account';
import Info from './Info';
import Purchase from './Purchase';

import logo from '../logo.svg';
import './App.css';

class App extends React.Component {

  constructor(props){
  	super();
  }


  componentWillMount() {
    window.addEventListener('load', this.props.getContract);
  }

  render() {
    return (
      <div className="App">
        <Header logo={logo} title="SensToken"/>
        <Intro text="Make Sens of the World"/>

        <Account {...this.props}/>
        <div className="Main-info">
          <Info {...this.props}/>
        </div>
        <Purchase/>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    account: state.account,
    contract: state.contract,
    tokens: state.tokens,
    form: state.form
  }
}

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
