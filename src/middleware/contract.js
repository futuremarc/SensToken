import {GET_CONTRACT_DONE, BUY_TOKENS_DONE} from '../constants';
import {getAccount, getTokens, getContract} from '../actions/actionCreators';

const contractMiddleware = store => next => action => {
  switch(action.type){
    case GET_CONTRACT_DONE:
      store.dispatch(getAccount());
      store.dispatch(getTokens());
      next(action)
      break;
    // case BUY_TOKENS_DONE:
    //   store.dispatch(getAccount());
    //   store.dispatch(getTokens());
    //   next(action);
    //   break;
    default:
      next(action);
  }
}

export default contractMiddleware;
