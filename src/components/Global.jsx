import React from 'react';
import { AppContextProvider } from '../context';
import { BrowserRouter } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import App from './App';
import useApolloClient from '../utils/hooks/useApolloClient';
import { ApolloProvider } from '@apollo/client';
import Radium, { StyleRoot } from 'radium';
// fontawesome
import initFontAwesome from '../utils/initFontAwesome';
initFontAwesome();

// const history = createBrowserHistory();

const Global = () => {
	// Prod now is running
	// const apolloUri = 'https://28ohcsi2ph.execute-api.us-east-1.amazonaws.com/running/graphql';
	// const apolloUri = 'https://99cdyp4f29.execute-api.us-east-1.amazonaws.com/preprod/graphql';
	// const apolloUri = 'https://n01g6wwfaf.execute-api.us-east-1.amazonaws.com/active/graphql';
	const apolloUri = 'https://f8fjn5bgw2.execute-api.us-east-1.amazonaws.com/prod/graphql';
	// const apolloUri = 'https://uqwaw9keg3.execute-api.us-east-1.amazonaws.com/services/graphql';
	// const apolloUri = 'https://cypmxq177b.execute-api.us-east-1.amazonaws.com/test/graphql';
	// const apolloUri = 'https://y0fskvo9th.execute-api.us-east-1.amazonaws.com/staging/graphql';
	// const apolloUri = 'http://localhost:4000/dev/graphql';

	const client = useApolloClient(apolloUri);

	const WrappedApp = Radium(App);

	return (
		<BrowserRouter>
			<AppContextProvider>
				<ApolloProvider client={ client }>
					<StyleRoot>
						<WrappedApp />
					</StyleRoot>
				</ApolloProvider>
			</AppContextProvider>		
		</BrowserRouter>
	);
};

export default Global;
