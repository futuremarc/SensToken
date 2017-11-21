import {combineReducers} from 'redux';

import {NEW_ACCOUNT, NEW_CONTRACT, NEW_BALANCE} from '../constants';

const account = (state = {}, action) =>{
  switch (action.type){
    case NEW_ACCOUNT:
      return action.payload;
    default:
      return state;
  }
}

const contract = (state = {}, action) =>{
  switch (action.type){
    case NEW_CONTRACT:
      return action.payload;
    default:
      return state;
  }
}

const balance = (state = {}, action) =>{
  switch (action.type){
    case NEW_BALANCE:
      return action.payload;
    default:
      return state;
  }
}


const rootReducer = combineReducers({contract, account, balance});

export default rootReducer;
