import gql from 'graphql-tag';

const PUSH_PROVIDERS = gql`
	query FetchPushProviders {
		fetchPushProviders {
			success
			status
			message
			body {
				push_pros
                pushnami
			}
		}
	}
`;

export {
    PUSH_PROVIDERS
};