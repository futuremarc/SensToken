import {takeEvery, call, put, select} from 'redux-saga/effects';
import TruffleContract from 'truffle-contract';
import TokenArtifact from '../SensToken.json';
import {GET_CONTRACT, GET_CONTRACT_DONE} from '../constants';


const web3Selector = (state) => state.web3;

const getContract = (web3) => {
  let contract = TruffleContract(TokenArtifact);
  contract.setProvider(web3.currentProvider);

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

function* callGetContract() {
  const web3 = yield select(web3Selector);
  const contract = yield call(getContract, web3);
  yield put({ type: GET_CONTRACT_DONE, payload : {contract} });
}


function* getContractSaga() {
  yield takeEvery(GET_CONTRACT, callGetContract);
}


export {getContractSaga};
