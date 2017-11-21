import React from 'react';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import PropTypes from 'prop-types';
import Header from './Header';
import Intro from './Intro';
import Account from './Account';
import Info from './Info';
import Purchase from './Purchase';

import logo from '../logo.svg';
import './App.css';

import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import SensArtifact from '../SensToken.json';
import config from '../config';

let web3 = window.web3 || null;



class App extends React.Component {

  constructor(props){
  	super();

    this.initWeb3 = this.initWeb3.bind(this);
    this.initContract = this.initContract.bind(this);
    this.initAccount = this.initAccount.bind(this);
    this.initBalance = this.initBalance.bind(this);


  }

  initWeb3(){
    let web3Provider = null;

    if (typeof web3 !== 'undefined') {
        console.log('web3 found');
        web3Provider = web3.currentProvider;
        window.web3 = new Web3(web3Provider);
      }else{
        console.log('web3 not found')
        web3Provider = new Web3.providers.HttpProvider(config.url);
        window.web3 = new Web3(web3Provider);
      }
      return this.initContract(web3Provider);
  }


  initBalance(account){

    const {contract, newBalance} = this.props;

    let SensInstance;

    contract.deployed().then((instance) =>{
      SensInstance = instance;

      console.log('instance', SensInstance);
      console.log('account ', account);

      SensInstance.balanceOf(account)
      .then((result)=>{
        const tokens = result.c[0];
        console.log('tokens',tokens);
        newBalance(tokens);

        SensInstance.createTokens({value:web3.toWei(.1,"ether"),gas:200000,from:account})
        .then((result)=>{
          console.log(result);
        }).catch(function(err) {
          throw err.message;
        });

      });

    });
  }


  initAccount(){
    const {newAccount} = this.props;
    window.web3.eth.getAccounts((err, accounts) => {
      if (err) {
        throw err;
      }
      const account = accounts[0];
      newAccount(account);
      return this.initBalance(account)
    });
  }

  initContract(web3Provider){
        const {newAccount, newContract} = this.props;

        let contract = TruffleContract(SensArtifact);
        contract.setProvider(web3Provider);

        newContract(contract)

        return this.initAccount();
  }

  componentWillMount() {
    window.addEventListener('load', this.initWeb3);
  }


  render() {
    return (
      <div className="App">
        <Header logo={logo} title="SensToken"/>
        <Intro text="Make Sens of the World"/>
        <Account {...this.props}/>
        <Info/>
        <Purchase/>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    contract: state.contract,
    account: state.account,
    balance: state.balance

  }
}

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
