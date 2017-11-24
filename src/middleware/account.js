import {GET_ACCOUNT_DONE} from '../constants';
import {initializeApp, getId} from '../actions/actionCreators';

const accountMiddleware = store => next => action => {
  switch(action.type){
    case GET_ACCOUNT_DONE:
      if (!store.getState().appInitialized){
        /*initialize polling for metamask account changes*/
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

export default accountMiddleware;
