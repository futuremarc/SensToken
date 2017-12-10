import {fork, all} from 'redux-saga/effects';
import {getWalletSaga} from './wallet';
import {getWeb3Saga} from './web3';
import {getContractSaga} from './contract';
import {buyTokenSaga, getTokenSaga} from './token';

const rootSagas = function* root() {
  yield all([
    fork(getWeb3Saga),
    fork(getContractSaga),
    fork(getWalletSaga),
    fork(getTokenSaga),
    fork(buyTokenSaga)
  ]);
}

export default rootSagas;
