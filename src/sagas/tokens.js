import {takeEvery, call, put, select} from 'redux-saga/effects';
import BNtoString from 'bignumber-to-string';
import {GET_TOKENS, GET_TOKENS_DONE, BUY_TOKENS, BUY_TOKENS_DONE, BUY_TOKENS_FAILED} from '../constants';

const getRate = (web3, contract) => {
  return contract.RATE().then(result => result.toNumber()); /*convert from bignumber instead?*/
};
const getTotalSupply= (web3, contract) => {
  return contract.totalSupply().then(result => web3.utils.fromWei(BNtoString(result), "ether")).catch((error) => error.message);
};
const getMaxSupply = (web3, contract) => {
  return contract.MAX_TOKENS().then(result => web3.utils.fromWei(BNtoString(result), "ether")).catch((error) => error.message);
};
const getName = (contract) => {
  return contract.NAME().then(result => result).catch((error) => error.message);
};
const getSymbol = (contract) => {
  return contract.SYMBOL().then(result => result).catch((error) => error.message);
};

const buyTokens = (web3, contract, id, rate, amount) => {
  const value = amount/rate;
  return contract.createTokens({value:web3.utils.toWei(String(value), "ether"), from:id})
  .then((result)=> {
    for (var i = 0; i < result.logs.length; i++) {
      var log = result.logs[i];
      if (log.event === "CreatedTokens") {
        return log;
      }
    }
  }).catch((error) => error.message);
};

function* callGetTokens() {
  const web3 = yield select(web3Selector);
  const contract = yield select(contractSelector);
  const rate = yield call(getRate, web3, contract);
  const totalSupply = yield call(getTotalSupply, web3, contract);
  const maxSupply = yield call(getMaxSupply, web3, contract);
  const name = yield call(getName, contract);
  const symbol = yield call(getSymbol, contract);
  const tokens = {rate, totalSupply, maxSupply, name, symbol};
  yield put({ type: GET_TOKENS_DONE, payload : tokens });
};

function* callBuyTokens({payload}) {
  const {amount, resolve, reject} = payload;
  const web3 = yield select(web3Selector);
  const contract = yield select(contractSelector);
  const tokens = yield select(tokensSelector);
  const wallet = yield select(walletSelector);
  const result = yield call(buyTokens, web3, contract, wallet.id, tokens.rate, amount);
  if (result.transactionHash) {
    yield call(resolve);
    const totalSupply = result.args.totalSupply;
    const balance = result.args.balance;
    const payload = {
      totalSupply : web3.utils.fromWei(BNtoString(totalSupply), "ether"),
      balance : web3.utils.fromWei(BNtoString(balance), "ether"),
      amount: amount
    };
    yield put({ type: BUY_TOKENS_DONE, payload });
  }else {
    yield call(reject);
    yield put({ type: BUY_TOKENS_FAILED, payload }); /*contains error object*/
  }
};

function* getTokensSaga() {
  yield takeEvery(GET_TOKENS, callGetTokens);
};

function* buyTokensSaga() {
  yield takeEvery(BUY_TOKENS, callBuyTokens);
};

export const web3Selector = (state) => state.web3;
export const contractSelector = (state) => state.contract;
export const tokensSelector = (state) => state.tokens;
export const walletSelector = (state) => state.wallet;

export {getTokensSaga};
export {buyTokensSaga};
