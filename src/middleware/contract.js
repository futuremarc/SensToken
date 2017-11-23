import {GET_CONTRACT_DONE} from '../constants';
import {getAccount, getTokens, initializeApp, getId} from '../actions/actionCreators';

const contractMiddleware = store => next => action => {
  switch(action.type){
    case GET_CONTRACT_DONE:
      store.dispatch(getAccount());
      store.dispatch(getTokens());

      if (!store.getState().initialized){
        /*initialize polling for metamask changing accounts*/
        store.dispatch(initializeApp());
        setInterval(() => {
          store.dispatch(getId());
        }, 1000);
      }
      next(action)
      break;
    default:
      next(action);
  }
}

export default contractMiddleware;
