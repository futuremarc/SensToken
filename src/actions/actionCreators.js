import {NEW_ACCOUNT, NEW_CONTRACT, NEW_BALANCE} from '../constants';

export const newAccount = (account) =>{
  return{
    type: NEW_ACCOUNT,
    payload: account
  }
}

export const newContract = (contract) =>{
  return{
    type: NEW_CONTRACT,
    payload: contract
  }
}

export const newBalance = (balance) =>{
  return{
    type: NEW_BALANCE,
    payload: balance
  }
}
