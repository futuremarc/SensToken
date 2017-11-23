import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

import Title from './Title';
import Account from './Account';
import Info from './Info';
import Purchase from './Purchase';

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
        <Title title="Sens Token"/>
        <div className="Account-info">
          <Account {...this.props}/>
        </div>
        <div className="Main-info">
          <Info {...this.props}/>
        </div>
        <Purchase {...this.props} form="''"/> {/* override form w/empty string for redux-form*/}
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
