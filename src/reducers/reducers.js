import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';

import {INITILIZE_APP, GET_WEB3_DONE} from '../constants';
import {GET_ACCOUNT_DONE, GET_TOKENS_DONE, GET_CONTRACT_DONE} from '../constants';
import {BUY_TOKENS_DONE, BUY_TOKENS_FAILED} from '../constants';

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
    case INITILIZE_APP:
      return true;
    default:
      return state;
  }
}

const txConfirmation = (state = {}, action) => {
  switch (action.type){
    case BUY_TOKENS_DONE:
      return {
        isSuccess: true,
        msg: 'transaction succeeded!'
      };
    case BUY_TOKENS_FAILED:
    return {
      isSuccess: false,
      msg: 'transaction failed'
    };
    default:
      return state;
  }
}

const rootReducer = combineReducers({form, tokens, account, contract, web3, txConfirmation, appInitialized});

export default rootReducer;
