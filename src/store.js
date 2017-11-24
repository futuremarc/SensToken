import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers/reducers';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import rootSagas from './sagas/rootSagas';
import contractMiddleware from './middleware/contract';
import web3Middleware from './middleware/web3';

const composeSetup = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const sagaMiddleware = createSagaMiddleware()
const logger = createLogger();

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
  txConfirmation: {
    isSuccess: null,
    msg : ''
  },
  appInitialized: false
};

const store = createStore(rootReducer, defaultState,
  composeSetup(applyMiddleware(sagaMiddleware, web3Middleware, contractMiddleware, logger)
));
sagaMiddleware.run(rootSagas);

export default store;
