import {GET_CONTRACT_DONE} from '../constants';
import {getWallet, getToken} from '../actions/actionCreators';

const contractMiddleware = store => next => action => {
  switch(action.type){
    case GET_CONTRACT_DONE:
      store.dispatch(getWallet());
      store.dispatch(getToken());
      next(action)
      break;
    default:
      next(action);
  }
}

export default contractMiddleware;
