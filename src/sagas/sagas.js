import { takeEvery, fork, call, put, select, all} from 'redux-saga/effects';

import {GET_TOKENS, GET_TOKENS_DONE} from '../constants';
import {GET_ACCOUNT, GET_ACCOUNT_DONE, GET_ACCOUNT_FAILED} from '../constants';
import {GET_CONTRACT, GET_CONTRACT_DONE} from '../constants';
import {BUY_TOKENS, BUY_TOKENS_DONE, BUY_TOKENS_FAILED} from '../constants';

import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import TokenArtifact from '../SensToken.json';
import config from '../config';

let web3 = window.web3 || undefined;

/*selector functions*/
export const selectContract = (state) => state.contract;
export const selectTokens = (state) => state.tokens;
export const selectAccount = (state) => state.account;

const getContract = () => {
  let web3Provider = null;

  if (typeof web3 !== 'undefined') {
    console.log('web3 found');
    web3Provider = web3.currentProvider;
    window.web3 = new Web3(web3Provider);

  }else{
    console.log('web3 not found', config.rpcUrl)
    web3Provider = new Web3.providers.HttpProvider(config.rpcUrl);
    window.web3 = new Web3(web3Provider);
  }
  let contract = TruffleContract(TokenArtifact);
  contract.setProvider(web3Provider);

  /*truffle-contract bug, issue #57 work around*/
  if (typeof contract.currentProvider.sendAsync !== "function") {
    contract.currentProvider.sendAsync = function() {
      return contract.currentProvider.send.apply(
        contract.currentProvider, arguments
      );
    };
  }
  /*truffle-contract work around end*/
  return contract.deployed().then(instance => instance)
  }

const buyTokens = (contract, id, rate, amount) => {
  const value = amount/rate;
  return contract.createTokens({value:web3.toWei(value, "ether"), gas:200000,from:id})
  .then((result)=>{
    for (var i = 0; i < result.logs.length; i++) {
      var log = result.logs[i];
      if (log.event === "CreatedTokens") {
        return log;
      }
    }
  }).catch((error) => error.message);
}

const getRate = (contract) => {
  return contract.RATE().then(result => result.c[0]);
}
const getTotalSupply= (contract) => {
  return contract.totalSupply().then(result => web3.fromWei(result.toNumber(), "ether")).catch((error) => error.message);
}
const getMaxSupply = (contract) => {
  return contract.MAX_TOKENS().then(result => web3.fromWei(result.toNumber(), "ether")).catch((error) => error.message);
}

/*convert from bignumber then fromwei*/
const getBalance = (contract, id) => {
  return contract.balanceOf(id).then(result=> web3.fromWei(result.toNumber(), "ether")).catch((error) => error.message);
}

const getId = (contract) => {
  return window.web3.eth.getAccounts((error, accounts) => {
    if (error) throw error;
    return accounts[0];
  });
}

function* callGetContract() {
  const contract = yield call(getContract);
  yield put({ type: GET_CONTRACT_DONE, payload : {contract} });
}

function* callGetTokens() {
  const contract = yield select(selectContract);
  const rate = yield call(getRate, contract);
  const totalSupply = yield call(getTotalSupply, contract);
  const maxSupply = yield call(getMaxSupply, contract);
  const tokens = {rate, totalSupply, maxSupply};
  console.log('TOKENS',tokens)
  yield put({ type: GET_TOKENS_DONE, payload : tokens });
}

function* callGetAccount() {
  const contract = yield select(selectContract);
  const ids = yield call(getId, contract);
  const id = ids[0];
  const balance = yield call(getBalance, contract, id);

   /*balance contains error msg when no web3 injects*/
  if (isNaN(Number(balance))){
    yield put({ type: GET_ACCOUNT_FAILED, payload : balance });
  }else{
    const account = {balance, id};
    yield put({ type: GET_ACCOUNT_DONE, payload : account });
  }
}

function* callBuyTokens({amount, resolve, reject}) {
  const tokens = yield select(selectTokens);
  const contract = yield select(selectContract);
  const account = yield select(selectAccount);
  const boughtTokens = yield call(buyTokens, contract, account.id, tokens.rate, amount);

  if (boughtTokens.transactionHash){
    yield call(resolve);
    const totalSupply = boughtTokens.args.totalSupply;
    const balance = boughtTokens.args.balance;
    const payload = {
      totalSupply : web3.fromWei(totalSupply.toNumber(), "ether"),
      balance : web3.fromWei(balance.toNumber(), "ether")
    };
    yield put({ type: BUY_TOKENS_DONE, payload});
  }else{
    yield call(reject);
    yield put({ type: BUY_TOKENS_FAILED, payload : boughtTokens }); //contains error
  }
}

function* getTokensSaga() {
  yield takeEvery(GET_TOKENS, callGetTokens);
}

function* getAccountSaga() {
  yield takeEvery(GET_ACCOUNT, callGetAccount);
}

function* getContractSaga() {
  yield takeEvery(GET_CONTRACT, callGetContract);
}
function* buyTokensSaga() {
  yield takeEvery(BUY_TOKENS, callBuyTokens);
}

export default function* root() {
  yield all([
    fork(getTokensSaga),
    fork(getAccountSaga),
    fork(getContractSaga),
    fork(buyTokensSaga)
  ]);
}
