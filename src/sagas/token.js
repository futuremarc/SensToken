import {takeEvery, call, put, select} from 'redux-saga/effects';
import BNtoString from 'bignumber-to-string';
import {GET_TOKEN, GET_TOKEN_DONE} from '../constants';
import {BUY_TOKEN, BUY_TOKEN_DONE, BUY_TOKEN_FAILED} from '../constants';

const getRate = (web3, contract) => {
  return contract.RATE().then(result => result.toNumber());
};
const getTotalSupply= (web3, contract) => {
  return contract.totalSupply().then(result => web3.utils.fromWei(BNtoString(result), 'ether')).catch((error) => error.message);
};
const getMaxSupply = (web3, contract) => {
  return contract.MAX_TOKENS().then(result => web3.utils.fromWei(BNtoString(result), 'ether')).catch((error) => error.message);
};
const getName = (contract) => {
  return contract.NAME().then(result => result).catch((error) => error.message);
};
const getSymbol = (contract) => {
  return contract.SYMBOL().then(result => result).catch((error) => error.message);
};
const getTagline = (contract) => {
  return contract.TAGLINE().then(result => result).catch((error) => error.message);
};


const buyToken = (web3, contract, id, rate, amount) => {
  const value = amount/rate;
  return contract.createTokens({value:web3.utils.toWei(String(value), 'ether'), from:id})
  .then((result)=> {
    for (var i = 0; i < result.logs.length; i++) {
      var log = result.logs[i];
      if (log.event === 'CreatedTokens') {
        return log;
      }
    }
  }).catch((error) => error.message);
};

function* callGetToken() {
  const web3 = yield select(web3Selector);
  const contract = yield select(contractSelector);
  const rate = yield call(getRate, web3, contract);
  const totalSupply = yield call(getTotalSupply, web3, contract);
  const maxSupply = yield call(getMaxSupply, web3, contract);
  const name = yield call(getName, contract);
  const symbol = yield call(getSymbol, contract);
  const tagline = yield call(getTagline, contract);
  const token = {rate, totalSupply, maxSupply, name, symbol, tagline};
  yield put({ type: GET_TOKEN_DONE, payload : token });
};

function* callBuyToken({payload}) {
  const {amount, resolve, reject} = payload;
  const web3 = yield select(web3Selector);
  const contract = yield select(contractSelector);
  const token = yield select(tokenSelector);
  const wallet = yield select(walletSelector);
  const result = yield call(buyToken, web3, contract, wallet.id, token.rate, amount);
  if (result.transactionHash) {
    yield call(resolve);
    const totalSupply = result.args.totalSupply;
    const balance = result.args.balance;
    const payload = {
      totalSupply : web3.utils.fromWei(BNtoString(totalSupply), 'ether'),
      balance : web3.utils.fromWei(BNtoString(balance), 'ether'),
      amount: amount
    };
    yield put({ type: BUY_TOKEN_DONE, payload });
  }
  else {
    yield call(reject);
    yield put({ type: BUY_TOKEN_FAILED, payload }); /*contains error object*/
  }
};

function* getTokenSaga() {
  yield takeEvery(GET_TOKEN, callGetToken);
};

function* buyTokenSaga() {
  yield takeEvery(BUY_TOKEN, callBuyToken);
};

const web3Selector = (state) => state.web3;
const contractSelector = (state) => state.contract;
const tokenSelector = (state) => state.token;
const walletSelector = (state) => state.wallet;

export {getTokenSaga};
export {buyTokenSaga};
