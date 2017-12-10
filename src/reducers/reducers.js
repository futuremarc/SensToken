import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';

import {INITIALIZE_APP, GET_WEB3_DONE} from '../constants';
import {GET_WALLET_DONE} from '../constants';
import {GET_TOKEN_DONE} from '../constants';
import {GET_CONTRACT_DONE, GET_CONTRACT_FAILED} from '../constants';
import {BUY_TOKEN, BUY_TOKEN_DONE, BUY_TOKEN_FAILED} from '../constants';


const token = (state = {}, {type, payload}) => {
  switch (type){
    case GET_TOKEN_DONE:
      return {
        ...state,
        ...payload /*totalsupply maxsupply rate symbol name tagline*/
      };
    case BUY_TOKEN_DONE:
      return {
        ...state,
        ...payload /*totalsupply*/
      };
    default:
      return state;
  }
};

const wallet = (state = {}, {type, payload}) => {
  switch (type){
    case GET_WALLET_DONE:
      return {
        ...state,
        ...payload /*id balance*/
      };
    case BUY_TOKEN_DONE:
      return {
        ...state,
        ...payload /*balance*/
      };
    default:
      return state;
  }
};

const contract = (state = {}, {type, payload}) => {
  switch (type){
    case GET_CONTRACT_DONE:
      return payload; /*contract object*/
    case GET_CONTRACT_FAILED:
      return payload; /*false*/
    default:
      return state;
  }
};

const web3 = (state = {}, {type, payload}) => {
  switch (type){
    case GET_WEB3_DONE:
      return payload; /*web3 object*/
    default:
      return state;
  }
};

const appInitialized = (state = false, {type}) => {
  switch (type){
    case INITIALIZE_APP:
      return true;
    default:
      return state;
  }
};

const txStatus = (state = {}, {type, payload}) => {
  switch (type){
    case BUY_TOKEN_DONE:
      return {
        success: true,
        pending: false,
        amount: payload.amount,
        msg: 'transaction succeeded!'
      };
    case BUY_TOKEN_FAILED:
    return {
      success: false,
      pending: false,
      msg: 'transaction failed'
    };
    case BUY_TOKEN:
    return {
      success: null,
      pending: true,
      msg: 'transaction pending'
    };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  form, token, wallet, contract, web3, txStatus, appInitialized
});

export default rootReducer;
