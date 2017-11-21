import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import SensArtifact from './SensCoin.json';
import config from './config';
let web3 = window.web3 || null;

let AppData = {};

class App extends Component {

  componentWillMount() {

    if (typeof web3 !== 'undefined') {
        console.log('web3 found');
        window.web3 = new Web3(web3.currentProvider);
        AppData.web3Provider = web3.currentProvider;

      }else{
        console.log('no web3 found')
        AppData.web3Provider = new Web3.providers.HttpProvider(config.url);
        web3 = new Web3(AppData.web3Provider);
        window.web3 = web3;
      }

      let SensContract = TruffleContract(SensArtifact);
      SensContract.setProvider(AppData.web3Provider);

      let SensInstance;

      window.web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }
        var account = accounts[0];

        SensContract.deployed().then(function(instance) {
          SensInstance = instance;

          console.log('instance',SensInstance);
          console.log('account ', account);

          SensInstance.balanceOf(account).then(result=>console.log('tokens',result.c[0]));

          return SensInstance.createTokens({value:web3.toWei(.1,"ether"),gas:200000,from:account})
          .then((err,result)=>{
            if (err){
              console.log(err);
            }
            console.log(result);
          }).catch(function(err) {
            console.log(err.message);
          });
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Sens Coins</h1>
        </header>
        <p className="App-intro">
          Buy some Sens Coins
        </p>
      </div>
    );
  }
}

export default App;
