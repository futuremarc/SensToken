import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';

import {INITILIZE_APP} from '../constants';
import {GET_ACCOUNT_DONE, GET_ID_DONE, GET_TOKENS_DONE, GET_CONTRACT_DONE} from '../constants';
import {BUY_TOKENS_DONE, BUY_TOKENS_FAILED} from '../constants';

const account = (state = {}, action) =>{
  switch (action.type){
    case GET_ACCOUNT_DONE:
      return {
        ...state,
        ...action.payload
      };
    case BUY_TOKENS_DONE:
      return {
        ...state,
        ...action.payload
      };
    case GET_ID_DONE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

const tokens = (state = {}, action) =>{
  switch (action.type){
    case GET_TOKENS_DONE:
      return {
        ...state,
        ...action.payload
      };
    case BUY_TOKENS_DONE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

const contract = (state = {}, action) =>{
  switch (action.type){
    case GET_CONTRACT_DONE:
      return action.payload.contract;
    default:
      return state;
  }
}

const appInitialized = (state = false, action) =>{
  switch (action.type){
    case INITILIZE_APP:
      return true;
    default:
      return state;
  }
}

const txConfirmation = (state = {}, action) =>{
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

const rootReducer = combineReducers({form, tokens, account, contract, txConfirmation, appInitialized});

export default rootReducer;
