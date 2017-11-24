import {fork, all} from 'redux-saga/effects';
import {getAccountSaga} from './account';
import {getWeb3Saga} from './web3';
import {getContractSaga} from './contract';
import {buyTokensSaga, getTokensSaga} from './tokens';

const rootSagas = function* root() {
  yield all([
    fork(getWeb3Saga),
    fork(getContractSaga),
    fork(getAccountSaga),
    fork(getTokensSaga),
    fork(buyTokensSaga)
  ]);
}

export default rootSagas;
