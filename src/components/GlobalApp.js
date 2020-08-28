import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App';
import { AppContextProvider } from '../context';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import { ApolloProvider } from '@apollo/react-hooks';
import usePushPros from '../hooks/usePushPros';

// fontawesome
import initFontAwesome from '../utils/initFontAwesome';
initFontAwesome();

const history = createBrowserHistory();
// Sentry Monitoring
Sentry.init({
	dsn: 'https://e7b6d13933254ee29da1019e52d8447c@o440028.ingest.sentry.io/5407883',
	integrations: [new Integrations.BrowserTracing({
		routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
	})],
	tracesSampleRate: 1.0,
	release: 'united-states-credit@' + process.env.npm_package_version,
});

const loggerLink = new ApolloLink((operation, forward) => {
	console.log(`GraphQL Request: ${operation.operationName}`);
	operation.setContext({
		start: new Date()
	});
	return forward(operation).map((response) => {
		// const responseTime = new Date() - operation.getContext().start;
		// console.log(`GraphQL Response took: ${responseTime}`);
		return response;
	});
});

const retryIf = (error, operation) => {
	console.log('error occurred:', error);
	console.log('error operation:', operation);
	// const doNotRetryCodes = [500, 400];
	// return !!error && !doNotRetryCodes.includes(error.statusCode);
	return !!error
};

const retryLink = new RetryLink({
	delay: {
		initial: 100,
		max: 2000,
		jitter: true,
	},
	attempts: {
		max: 5,
		retryIf,
	}
});

const GlobalApp = () => {
	usePushPros();
	const links = ApolloLink.from([
		loggerLink,
		retryLink,
		onError(({
			graphQLErrors,
			networkError
		}) => {
			if (graphQLErrors)
				graphQLErrors.forEach(({
						message,
						locations,
						path
					}) =>
					console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
				);

			if (networkError) console.log(`[Network error]: ${networkError}`);
		}),
		new HttpLink({
			// Production
			uri: 'https://cbvb02ezl4.execute-api.us-east-1.amazonaws.com/prod/graphql',
			// Test
			// uri: 'https://cypmxq177b.execute-api.us-east-1.amazonaws.com/test/graphql'
			// Services
			// uri: 'https://uqwaw9keg3.execute-api.us-east-1.amazonaws.com/services/graphql'
			// Local
			// uri: 'http://localhost:4000/graphql'
		})
	]);

	const client = new ApolloClient({
		link: links,
		cache: new InMemoryCache(),
		// connect to your application's Apollo Client in production
		connectToDevTools: true,
	});
	
	return (
		<ApolloProvider client={client}>
			<AppContextProvider>
				<Router history={history}>
					<App />
				</Router>
			</AppContextProvider>
		</ApolloProvider>
	);
}


export default Sentry.withProfiler(GlobalApp, { name: 'AppContainer' });
