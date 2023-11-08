import React from 'react';
import ReactDOM from 'react-dom';
import Global from './components/Global';
import * as serviceWorker from './serviceWorkerRegistration';
import { Honeybadger, HoneybadgerErrorBoundary } from '@honeybadger-io/react';

import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './stylesheets/main.scss';

const config = {
    apiKey: 'hbp_B6qHtOQ2pVyMOwb0YyNzD9MURgTs4N0zlI04',
    environment: 'production'
};

const honeybadger = Honeybadger.configure(config)

ReactDOM.render(<HoneybadgerErrorBoundary honeybadger={honeybadger}><Global /></HoneybadgerErrorBoundary>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();