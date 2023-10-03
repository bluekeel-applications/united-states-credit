import gql from 'graphql-tag';

const INSERT_SEARCH_INFO = gql `
	mutation InsertSearchInfo($visitor: CommonInfo) {
		insertSearchInfo(visitor: $visitor){
			success
			status
			message
		}
	}
`;

export default INSERT_SEARCH_INFO;