import React from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers/rootReducer';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';

// const sagaMiddleware = createSagaMiddleware()
const composeSetup = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const logger = createLogger();

const defaultState = {
  tokens: {
    rate: 0,
    purchased: 0,
    maxSupply: 0
  },
  account: {
    balance:0,
    id:''
  }
};

const store = createStore(rootReducer, defaultState, composeSetup(applyMiddleware(logger)));
//sagaMiddleware.run(IndexSagas);

export default store;
