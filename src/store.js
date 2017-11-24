import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers/reducers';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import rootSagas from './sagas/rootSagas';
import contractMiddleware from './middleware/contract';
import web3Middleware from './middleware/web3';

const sagaMiddleware = createSagaMiddleware()
const logger = createLogger();
const isDev = process.env.NODE_ENV !== 'production';
const composeSetup = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;


const defaultState = {
  tokens: {
    rate: 0,
    totalSupply: 0,
    maxSupply: 0
  },
  account: {
    balance:0,
    id:''
  },
  contract: {},
  web3: {},
  form: '',
  txStatus: {
    isSuccess: null,
    pending: false,
    msg : ''
  },
  appInitialized: false
};

let store;

if (isDev){
  store = createStore(rootReducer, defaultState, composeSetup(applyMiddleware(sagaMiddleware, web3Middleware, contractMiddleware, logger)));
}else{
  store = createStore(rootReducer, defaultState, applyMiddleware(sagaMiddleware, web3Middleware, contractMiddleware));
}

sagaMiddleware.run(rootSagas);

export default store;
