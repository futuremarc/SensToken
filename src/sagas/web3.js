import {takeEvery, call, put} from 'redux-saga/effects';
import Web3 from 'web3';
import {GET_WEB3, GET_WEB3_DONE} from '../constants';
let rpcUrl;

process.env.NODE_ENV !== 'production' ?
  rpcUrl = 'http://localhost:9545' : rpcUrl = 'https://rinkeby.infura.io/';

const getWeb3 = () => {
  if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  }else {
    window.web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
  }
  return window.web3;
};

function* callGetWeb3() {
  const web3 = yield call(getWeb3);
  yield put({ type: GET_WEB3_DONE, payload : {web3} });
};

function* getWeb3Saga() {
  yield takeEvery(GET_WEB3, callGetWeb3);
};

export {getWeb3Saga};
