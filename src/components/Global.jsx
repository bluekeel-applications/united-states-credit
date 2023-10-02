import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App';
import { AppContextProvider } from '../context';
import useApolloClient from '../utils/useApolloClient';
import { ApolloProvider } from '@apollo/react-hooks';
import useSentry from '@bit/bluekeel.hookz.use-sentry';
import * as Sentry from '@sentry/react';
import Radium, { StyleRoot } from 'radium';
// fontawesome
import initFontAwesome from '../utils/initFontAwesome';
initFontAwesome();

const history = createBrowserHistory();

const Global = () => {
	useSentry({
		history,
		dsn: 'https://e7b6d13933254ee29da1019e52d8447c@o440028.ingest.sentry.io/5407883',
		page: 'united-states-credit',
		version: '1.0.0'
	});
	// Prod now is running
	// const apolloUri = 'https://28ohcsi2ph.execute-api.us-east-1.amazonaws.com/running/graphql';
	const apolloUri = 'https://99cdyp4f29.execute-api.us-east-1.amazonaws.com/preprod/graphql';
	// const apolloUri = 'https://n01g6wwfaf.execute-api.us-east-1.amazonaws.com/active/graphql';
	// const apolloUri = 'https://cbvb02ezl4.execute-api.us-east-1.amazonaws.com/prod/graphql';
	// const apolloUri = 'https://uqwaw9keg3.execute-api.us-east-1.amazonaws.com/services/graphql';
	// const apolloUri = 'https://cypmxq177b.execute-api.us-east-1.amazonaws.com/test/graphql';
	// const apolloUri = 'http://localhost:4000/dev/graphql';

	const client = useApolloClient(apolloUri);

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
