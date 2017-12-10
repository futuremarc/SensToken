import {GET_WEB3, GET_CONTRACT} from '../constants';
import {GET_TOKEN, BUY_TOKEN, BUY_TOKEN_DONE, BUY_TOKEN_FAILED} from '../constants';
import {GET_WALLET} from '../constants';


export const getWallet = () => {
  return {
    type: GET_WALLET
  }
};

export const getToken = () => {
  return {
    type: GET_TOKEN
  }
};

export const buyToken = (amount, resolve, reject) => {
  return {
    type: BUY_TOKEN,
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
    type: BUY_TOKEN_DONE
  }
};

export const setBuyFail = () => {
  return {
    type: BUY_TOKEN_FAILED
  }
};
