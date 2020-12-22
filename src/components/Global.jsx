import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App';
import { AppContextProvider } from '../context';
import UseApolloClient from '@bit/bluekeel.hookz.use-apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import usePushProsScripts from '@bit/bluekeel.hookz.use-push-pros-scripts';
import useSentry from '@bit/bluekeel.hookz.use-sentry';
import * as Sentry from '@sentry/react';
import Radium, { StyleRoot } from 'radium';
// fontawesome
import initFontAwesome from '../utils/initFontAwesome';
initFontAwesome();

const history = createBrowserHistory();

const Global = () => {
	usePushProsScripts('https://pushpros.tech/GetPushScript?key=2Xa3N8H4tIMDq5DaLOjgimHq4HG8UhWO&domain=');
	useSentry({
		history,
		dsn: 'https://e7b6d13933254ee29da1019e52d8447c@o440028.ingest.sentry.io/5407883',
		page: 'united-states-credit',
		version: '1.0.0'
	});

	// const apolloUri = 'https://services.bluekeel-api.com/graphql';
	// const apolloUri = 'https://d-bkizqns6rk.execute-api.us-east-1.amazonaws.com/services/graphql';
	const apolloUri = 'https://cbvb02ezl4.execute-api.us-east-1.amazonaws.com/prod/graphql';
	// const apolloUri = 'https://d234ckldiolt4m.cloudfront.net/services/graphql';
	// const apolloUri = 'https://uqwaw9keg3.execute-api.us-east-1.amazonaws.com/services/graphql';
	// const apolloTest = 'https://cypmxq177b.execute-api.us-east-1.amazonaws.com/test/graphql';
	// const apolloUri = 'http://localhost:4000/graphql';

	const client = UseApolloClient(apolloUri);

	const WrappedApp = Radium(App);

	return (
		<ApolloProvider client={ client }>
			<AppContextProvider>
				<Router history={ history }>
					<StyleRoot>
						<WrappedApp />
					</StyleRoot>
				</Router>
			</AppContextProvider>
		</ApolloProvider>
	);
};


export default Sentry.withProfiler(Global, { name: 'UnitedStatesCredit', includeUpdates: false });
