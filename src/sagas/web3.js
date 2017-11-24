import { takeEvery, fork, call, put, select} from 'redux-saga/effects';

import {GET_WEB3, GET_WEB3_DONE} from '../constants';

import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import TokenArtifact from '../SensToken.json';
import config from '../config';

const getWeb3 = () => {
  if (window.web3) {
    console.log('web3 found');
    window.web3 = new Web3(window.web3.currentProvider);
  }else {
    console.log('web3 not found', config.rpcUrl)
    window.web3 = new Web3(new Web3.providers.HttpProvider(config.rpcUrl));
  }
  return window.web3;
}

function* callGetWeb3() {
  const web3 = yield call(getWeb3);
  yield put({ type: GET_WEB3_DONE, payload : {web3} });
}

function* getWeb3Saga() {
  yield takeEvery(GET_WEB3, callGetWeb3);
}


export {getWeb3Saga};
