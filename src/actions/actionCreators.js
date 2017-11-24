import {GET_WEB3} from '../constants';
import {GET_ACCOUNT} from '../constants';
import {GET_CONTRACT} from '../constants';
import {GET_TOKENS, BUY_TOKENS, BUY_TOKENS_DONE, BUY_TOKENS_FAILED} from '../constants';


export const getAccount = () => {
  return {
    type: GET_ACCOUNT
  }
};

export const getTokens = () => {
  return {
    type: GET_TOKENS
  }
};

export const buyTokens = (amount, resolve, reject) => {
  return {
    type: BUY_TOKENS,
    payload: {
      amount,
      resolve,
      reject
    }
  }
};


export const getContract = () => {
  return {
    type: GET_CONTRACT
  }
};

export const getWeb3 = () => {
  return {
    type: GET_WEB3
  }
};

export const setBuySuccess = () => {
  return {
    type: BUY_TOKENS_DONE,
    payload: 'transaction succeeded!'
  }
};

export const setBuyFail = () => {
  return {
    type: BUY_TOKENS_FAILED,
    payload: 'transaction failed'
  }
};
