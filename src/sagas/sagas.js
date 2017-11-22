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

  //truffle-contract bug, issue #57 work around
  if (typeof contract.currentProvider.sendAsync !== "function") {
  contract.currentProvider.sendAsync = function() {
    return contract.currentProvider.send.apply(
      contract.currentProvider, arguments
    );
  };
}

  return contract.deployed().then(instance => instance)
  //let contract = new web3.eth.Contract(config.contractAbi, config.contractAddress)
  }

const buyTokens = (contract, id, rate, amount) => {
  const value = amount/rate;
  return contract.createTokens({value:web3.toWei(value,"ether"), gas:200000,from:id})
  .then((result)=>{
    for (var i = 0; i < result.logs.length; i++) {
      var log = result.logs[i];
      if (log.event === "CreatedTokens") {
        return log;
      }
    }
  }).catch((err) => err.message);
}

const getRate = (contract) => {
  return contract.RATE().then(res =>res.c[0]);
}
const getPurchased = (contract) => {
  return contract.totalSupply().then(res => res.c[0])
}
const getMaxSupply = (contract) => {
  return contract.MAX_SUPPLY().then(res => res.c[0])
}

const getBalance = (contract, id) => {
  console.log('BALANCE!', id)
  return contract.balanceOf(id).then(result=> result.c[0]).catch((err) => err.message);
}

const getId = (contract) => {
  return window.web3.eth.getAccounts((err, accounts) => {
    console.log('ACCOUNTS', accounts)
    if (err) throw err;
    return accounts[0];
  });
}

function* callGetContract() {
  const contract = yield call(getContract);
  // console.log('ABI', JSON.stringify(contract.abi))
  // console.log('address', contract.address);
  console.log('CONTRACT',contract)
  yield put({ type: GET_CONTRACT_DONE, payload : contract });
}

function* callGetTokens() {
  const contract = yield select(selectContract);
  const rate = yield call(getRate, contract);
  const purchased = yield call(getPurchased, contract);
  const maxSupply = yield call(getMaxSupply, contract);
  const tokens = {rate, purchased, maxSupply};
  yield put({ type: GET_TOKENS_DONE, payload : tokens });
}

function* callGetAccount() {
  const contract = yield select(selectContract);
  const id = yield call(getId, contract);
  const balance = yield call(getBalance, contract, id);
  const account = {balance, id};
  if (isNaN(Number(balance))){
    yield put({ type: GET_ACCOUNT_FAILED, payload : balance }); //err message
  }else{
    yield put({ type: GET_ACCOUNT_DONE, payload : account });
  }
}

function* callBuyTokens({amount, resolve, reject}) {
  const tokens = yield select(selectTokens);
  const contract = yield select(selectContract);
  const account = yield select(selectAccount);
  const newTokens = yield call(buyTokens, contract, account.id[0], tokens.rate, amount);

  if (newTokens.transactionHash){
    yield call(resolve);
    yield put({ type: BUY_TOKENS_DONE, payload : newTokens });
  }else{
    yield call(reject);
    yield put({ type: BUY_TOKENS_FAILED, payload : newTokens });
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
