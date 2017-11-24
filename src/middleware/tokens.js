import {BUY_TOKENS_DONE, BUY_TOKENS_FAILED} from '../constants';
import {setBuySuccess, setBuyFail} from '../actions/actionCreators';

const tokensMiddleware = store => next => action => {
  switch(action.type){
    case BUY_TOKENS_DONE:
    console.log('MIDDLEWARE SUCCED')
      store.dispatch(setBuySuccess());
      next(action)
      break;
    case BUY_TOKENS_FAILED:
      store.dispatch(setBuyFail());
      next(action)
      break;
    default:
      next(action);
  }
}

export default tokensMiddleware;
