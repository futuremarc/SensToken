import {GET_ACCOUNT, GET_TOKENS, GET_CONTRACT} from '../constants';

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
