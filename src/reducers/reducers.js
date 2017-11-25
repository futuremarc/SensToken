import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';

import {INITIALIZE_APP, GET_WEB3_DONE} from '../constants';
import {GET_ACCOUNT_DONE, GET_TOKENS_DONE, GET_CONTRACT_DONE, GET_CONTRACT_FAILED} from '../constants';
import {BUY_TOKENS, BUY_TOKENS_DONE, BUY_TOKENS_FAILED} from '../constants';

const account = (state = {}, action) => {
  switch (action.type){
    case GET_ACCOUNT_DONE:
      return {
        ...state,
        ...action.payload /*id balance*/
      };
    case BUY_TOKENS_DONE:
      return {
        ...state,
        ...action.payload /*balance*/
      };
    default:
      return state;
  }
}

const tokens = (state = {}, action) => {
  switch (action.type){
    case GET_TOKENS_DONE:
      return {
        ...state,
        ...action.payload /*totalsupply maxsupply rate*/
      };
    case BUY_TOKENS_DONE:
      return {
        ...state,
        ...action.payload /*totalsupply*/
      };
    default:
      return state;
  }
}

const contract = (state = {}, action) => {
  switch (action.type){
    case GET_CONTRACT_DONE:
      return action.payload.contract;
    case GET_CONTRACT_FAILED:
      return action.payload.contract;
    default:
      return state;
  }
}

const web3 = (state = {}, action) => {
  switch (action.type){
    case GET_WEB3_DONE:
      return action.payload.web3;
    default:
      return state;
  }
}

const appInitialized = (state = false, action) => {
  switch (action.type){
    case INITIALIZE_APP:
      return true;
    default:
      return state;
  }
}

const txStatus = (state = {}, action) => {
  switch (action.type){
    case BUY_TOKENS_DONE:
      return {
        isSuccess: true,
        pending: false,
        amount: action.payload.amount,
        msg: 'transaction succeeded!'
      };
    case BUY_TOKENS_FAILED:
    return {
      isSuccess: false,
      pending: false,
      msg: 'transaction failed'
    };
    case BUY_TOKENS:
    return {
      isSuccess: null,
      pending: true,
      msg: 'transaction pending'
    };
    default:
      return state;
  }
}

const rootReducer = combineReducers({form, tokens, account, contract, web3, txStatus, appInitialized});

export default rootReducer;
