import {EDIT_ID, EDIT_BALANCE, EDIT_TOKENS} from '../constants';

export const editId = (id) =>{
  return{
    type: EDIT_ID,
    payload: id
  }
}

export const editBalance = (balance) =>{
  return{
    type: EDIT_BALANCE,
    payload: balance
  }
}

export const editTokens = (info) =>{
  return{
    type: EDIT_TOKENS,
    payload: info
  }
}
