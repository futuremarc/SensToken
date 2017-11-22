import {combineReducers} from 'redux';

import {EDIT_ID, EDIT_BALANCE, EDIT_TOKENS} from '../constants';

const account = (state = {}, action) =>{
  switch (action.type){
    case EDIT_ID:
      return {
        ...state,
        id: action.payload
      };
    case EDIT_BALANCE:
      return {
        ...state,
        balance: action.payload
      }

    default:
      return state;
  }
}

const tokens = (state = {}, action) =>{
  switch (action.type){
    case EDIT_TOKENS:
      return {
        ...state,
        rate: action.payload.rate,
        purchased: action.payload.purchased,
        maxSupply: action.payload.maxSupply
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({tokens, account});

export default rootReducer;
