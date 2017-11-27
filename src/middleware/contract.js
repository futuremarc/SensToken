import {GET_CONTRACT_DONE, GET_CONTRACT_FAILED} from '../constants';
import {getWallet, getTokens} from '../actions/actionCreators';

const contractMiddleware = store => next => action => {
  switch(action.type){
    case GET_CONTRACT_DONE:
      store.dispatch(getWallet());
      store.dispatch(getTokens());
      next(action)
      break;
    default:
      next(action);
  }
}

export default contractMiddleware;
