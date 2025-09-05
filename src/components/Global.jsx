import React from 'react';
import { AppContextProvider } from '../context';
import { BrowserRouter } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import App from './App';
import useApolloClient from '../utils/hooks/useApolloClient';
import { ApolloProvider } from '@apollo/client';
import { StyleRoot } from 'radium';
// fontawesome
import initFontAwesome from '../utils/initFontAwesome';
initFontAwesome();

// const history = createBrowserHistory();

const Global = () => {
	// Master now is running
	const baseUri = 'https://k7yusdyjka.execute-api.us-east-1.amazonaws.com/master';
	// const baseUri = 'https://28ohcsi2ph.execute-api.us-east-1.amazonaws.com/running';
	// const baseUri = 'https://f8fjn5bgw2.execute-api.us-east-1.amazonaws.com/prod';
	// const baseUri = 'https://y0fskvo9th.execute-api.us-east-1.amazonaws.com/staging';
	// const baseUri = 'http://localhost:4000/dev';

	const apolloUri = `${baseUri}/graphql`
	const client = useApolloClient(apolloUri);

	return (
		<BrowserRouter>
			<AppContextProvider>
				<ApolloProvider client={ client }>
					<StyleRoot>
						<App uri={baseUri}/>
					</StyleRoot>
				</ApolloProvider>
			</AppContextProvider>		
		</BrowserRouter>
	);
};

export default Global;
