import React from 'react';
import ReactDOM from 'react-dom';
import Global from './components/Global';
import * as serviceWorker from './serviceWorkerRegistration';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './stylesheets/main.scss';

ReactDOM.render(<Global />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();