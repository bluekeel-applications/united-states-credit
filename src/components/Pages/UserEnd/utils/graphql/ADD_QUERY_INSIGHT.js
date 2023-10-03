import gql from 'graphql-tag';

const ADD_QUERY_INSIGHT = gql `
	mutation AddUserSearchQuery($clickId: Int, $query: String) {
		addUserSearchQuery(clickId: $clickId, query: $query) {
			success
			status
			message
		}
	}
`;

export default ADD_QUERY_INSIGHT;