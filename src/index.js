import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';
import './styles/semantic-ui-overrides.css';
import './styles/index.css';
import App from './components/App';

registerServiceWorker(); /*might fail on github pages due to ssl mismatch*/

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
