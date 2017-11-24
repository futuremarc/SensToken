import {GET_WEB3_DONE} from '../constants';
import {getContract} from '../actions/actionCreators';

const web3Middleware = store => next => action => {
  switch(action.type){
    case GET_WEB3_DONE:
      store.dispatch(getContract());
      next(action)
      break;
    default:
      next(action);
  }
}

export default web3Middleware;
