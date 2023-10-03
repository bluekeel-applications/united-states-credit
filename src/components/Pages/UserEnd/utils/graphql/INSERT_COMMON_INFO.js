import gql from 'graphql-tag';

const INSERT_COMMON_INFO = gql `
	mutation InsertCommonInfo($visitor: CommonInfo) {
		insertCommonInfo(visitor: $visitor){
			success
			status
			message
		}
	}
`;

export default INSERT_COMMON_INFO;