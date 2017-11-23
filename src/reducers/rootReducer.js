import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';

import {INITILIZE_APP} from '../constants';
import {GET_ACCOUNT_DONE, GET_TOKENS_DONE, GET_CONTRACT_DONE} from '../constants';
import {BUY_TOKENS_DONE} from '../constants';

const account = (state = {}, action) =>{
  switch (action.type){
    case GET_ACCOUNT_DONE:
      return {
        ...state,
        id: action.payload.id,
        balance: action.payload.balance
      };
    case BUY_TOKENS_DONE:
      return {
        ...state,
        balance: action.payload.balance,
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
        rate: action.payload.rate,
        totalSupply: action.payload.totalSupply,
        maxSupply: action.payload.maxSupply
      };
    case BUY_TOKENS_DONE:
      return {
        ...state,
        totalSupply: action.payload.totalSupply,
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

const initialized = (state = false, action) =>{
  switch (action.type){
    case INITILIZE_APP:
      return true;
    default:
      return state;
  }
}

const rootReducer = combineReducers({tokens, account, contract, form, initialized});

export default rootReducer;
