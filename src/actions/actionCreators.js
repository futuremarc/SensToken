import {GET_ACCOUNT, GET_TOKENS, GET_CONTRACT, INITILIZE_APP, GET_ID} from '../constants';

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

export const initializeApp = () =>{
  return{
    type: INITILIZE_APP
  }
}
