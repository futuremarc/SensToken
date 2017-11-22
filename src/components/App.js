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
window.contract = null;



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

    const {editBalance} = this.props;

    let tokenInstance;

    window.contract.deployed().then((instance) =>{
      tokenInstance = instance;

      tokenInstance.balanceOf(account)
      .then((result)=>{
        const tokens = result.c[0];
        editBalance(tokens);

        console.log('tokens', tokens);
        console.log('instance', tokenInstance);
        console.log('account ', account);

        tokenInstance
        .createTokens({value:web3.toWei(.1,"ether"),gas:200000,from:account})
        .then((result)=>{
          console.log(result);
        }).catch(function(err) {
          throw err.message;
        });

      });

    });
  }


  initAccount(){
    const {editId} = this.props;
    window.web3.eth.getAccounts((err, accounts) => {
      if (err) {
        throw err;
      }
      const id = accounts[0];
      editId(id);
      return this.initBalance(id)
    });
  }

  initTokens(){
    const {editTokens} = this.props;
    let tokenInstance, rate, totalSupply, maxSupply;

    window.contract.deployed().then((instance) =>{
      tokenInstance = instance;

      (async function() {
        rate = await tokenInstance.RATE().then(res => {
            return res.c[0];
          });
        totalSupply = await tokenInstance.totalSupply().then(res => {
          return res.c[0];
        })
        maxSupply = await tokenInstance.MAX_SUPPLY().then(res => {
          return res.c[0];
        })
        editTokens({maxSupply, totalSupply, rate})
      })()
    });
  }

  initContract(web3Provider){

        window.contract = TruffleContract(SensArtifact);
        window.contract.setProvider(web3Provider);
        this.initTokens();
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
    tokens: state.tokens
  }
}

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
