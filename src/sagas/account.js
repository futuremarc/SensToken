import {takeEvery, call, put, select} from 'redux-saga/effects';
import BNtoString from 'bignumber-to-string';
import {GET_ACCOUNT, GET_ACCOUNT_DONE, GET_ACCOUNT_FAILED} from '../constants';


const web3Selector = (state) => state.web3;
const contractSelector = (state) => state.contract;

const getBalance = (web3, contract, id) => {
  return contract.balanceOf(id).then(result=> web3.utils.fromWei(BNtoString(result), "ether")).catch((error) => error.message);
};

const getId = (web3, contract) => {
  const web3Inject = !web3.currentProvider.host;
  if (web3Inject) return web3.eth.getAccounts().then((accounts) => accounts[0])
  else return false;
};

function* callGetAccount() {
  const web3 = yield select(web3Selector);
  const contract = yield select(contractSelector);
  const id = yield call(getId, web3, contract);
  const balance = yield call(getBalance, web3, contract, id);

   /*balance contains error msg on fail*/
  if (isNaN(Number(balance))) {
    yield put({ type: GET_ACCOUNT_FAILED, payload : balance });
  }else{
    const account = {balance, id};
    yield put({ type: GET_ACCOUNT_DONE, payload : account });
  }
}

function* getAccountSaga() {
  yield takeEvery(GET_ACCOUNT, callGetAccount);
}

export {getAccountSaga};
