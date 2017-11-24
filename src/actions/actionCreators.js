import {GET_ACCOUNT, GET_TOKENS, GET_CONTRACT, INITILIZE_APP, GET_ID} from '../constants';
import {BUY_TOKENS_DONE, BUY_TOKENS_FAILED} from '../constants';

export const getId = () =>{
  return{
    type: GET_ID
  }
}

export const getAccount = () =>{
  return{
    type: GET_ACCOUNT
  }
}

export const getTokens = () =>{
  return{
    type: GET_TOKENS
  }
}

export const getContract = () =>{
  return{
    type: GET_CONTRACT
  }
}

export const setBuySuccess = () =>{
  return{
    type: BUY_TOKENS_DONE,
    payload: 'TRANSACTION SUCCEEDED!'
  }
}

export const setBuyFail = () =>{
  return{
    type: BUY_TOKENS_FAILED,
    payload: 'TRANSACTION FAILED'
  }
}

export const initializeApp = () =>{
  return{
    type: INITILIZE_APP
  }
}
