import { InMemoryCache, ApolloClient, ApolloLink } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http'
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';

const useApolloClient = (uri) => {
    const httpLink = createHttpLink({ uri });

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
    
    const retryLink = new RetryLink({
        delay: {
            initial: 100,
            max: 2000,
            jitter: true,
        },
        attempts: {
            max: 5,
            retryIf: (error, operation) => {
                console.log('error occurred:', error);
                console.log('error operation:', operation);
                // const doNotRetryCodes = [500, 400];
                // return !!error && !doNotRetryCodes.includes(error.statusCode);
                return !!error
            },
        }
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) =>{
                console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
            });

        if (networkError) console.log(`[Network error]: ${networkError}`);
    });

    const links = ApolloLink.from([
		loggerLink,
		retryLink,
		errorLink,
		httpLink
	]);

    const client = new ApolloClient({
		link: links,
		cache: new InMemoryCache(),
		// connect to your application's Apollo Client in production
		connectToDevTools: true,
	});

    return client;
}

export default useApolloClient;