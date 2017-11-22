import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';

import {GET_ACCOUNT_DONE, GET_TOKENS_DONE, BUY_TOKENS_DONE, GET_CONTRACT_DONE} from '../constants';

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
        balance: action.payload.args.balance.c[0],
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
        purchased: action.payload.purchased,
        maxSupply: action.payload.maxSupply
      };
    case BUY_TOKENS_DONE:
    console.log('ACTION BITCH!!!', action)
      return {
        ...state,
        purchased: action.payload.args.totalSupply.c[0],
      };
    default:
      return state;
  }
}

const contract = (state = {}, action) =>{
  switch (action.type){
    case GET_CONTRACT_DONE:
      return action.payload;
    default:
      return state;
  }
}

const rootReducer = combineReducers({tokens, account, contract, form});

export default rootReducer;
