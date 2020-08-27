import React from 'react';
import ReactDOM from 'react-dom';
import GlobalApp from './components/GlobalApp';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import * as serviceWorker from './serviceWorker';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import './stylesheets/main.scss';

Sentry.init({
    dsn: 'https://e7b6d13933254ee29da1019e52d8447c@o440028.ingest.sentry.io/5407883',
    integrations: [ new Integrations.BrowserTracing() ],
    tracesSampleRate: 1.0,
    release: 'united-states-credit@' + process.env.npm_package_version,
});

ReactDOM.render(<GlobalApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();