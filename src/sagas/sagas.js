import { takeEvery, fork, call, put, select, all} from 'redux-saga/effects';
import {GET_TOKENS, GET_TOKENS_DONE} from '../constants';
import {GET_ACCOUNT, GET_ACCOUNT_DONE} from '../constants';
import {GET_CONTRACT, GET_CONTRACT_DONE} from '../constants';

import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import SensArtifact from '../SensToken.json';
import config from '../config';

let web3 = window.web3 || null;

export const selectContract = (state) => state.contract;

// import request from 'superagent';

const getContract = () => {
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
    let contract = TruffleContract(SensArtifact);
    contract.setProvider(web3Provider);
    return contract.deployed().then(instance => {

        instance.createTokens({value:web3.toWei(.1,"ether"),gas:200000,from:"0x627306090abaB3A6e1400e9345bC60c78a8BEf57"})
        .then((result)=>{
          console.log(result);
        }).catch(function(err) {
          throw err.message;
        });
        return instance
      })

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
  return contract.balanceOf(id).then(result=> result.c[0]);
}

const getId = (contract) => {
  return window.web3.eth.getAccounts((err, accounts) => {
    if (err) throw err;
    return accounts[0];
  });
}

function* callGetContract() {
  const contract = yield call(getContract);
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
  yield put({ type: GET_ACCOUNT_DONE, payload : account });



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

export default function* root() {
  yield all([
    fork(getTokensSaga),
    fork(getAccountSaga),
    fork(getContractSaga)
  ]);
}
