import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App';
import { AppContextProvider } from '../context';
import UseApolloClient from '@bit/bluekeel.hookz.use-apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import usePushPros from '../hooks/usePushPros';
import useSentry from '../hooks/useSentry';
import Radium, { StyleRoot } from 'radium';
// fontawesome
import initFontAwesome from '../utils/initFontAwesome';
initFontAwesome();

const history = createBrowserHistory();

const GlobalApp = () => {
	usePushPros();
	useSentry(history);
	const client = UseApolloClient('https://cbvb02ezl4.execute-api.us-east-1.amazonaws.com/prod/graphql');
	// const client = UseApolloClient('http://localhost:4000/graphql');
    // const client = UseApolloClient('https://cypmxq177b.execute-api.us-east-1.amazonaws.com/test/graphql');

	const WrappedApp = Radium(App);

	return (
		<ApolloProvider client={client}>
			<AppContextProvider>
				<Router history={history}>
					<StyleRoot>
						<WrappedApp />
					</StyleRoot>
				</Router>
			</AppContextProvider>
		</ApolloProvider>
	);
}


export default GlobalApp;
