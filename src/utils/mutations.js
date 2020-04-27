import gql from 'graphql-tag';

const ADD_NEW_USER = gql`
	mutation AddNewUser($visitor: NewUser) {
		addNewUser(visitor: $visitor) {
			success
			status
			message
			body {
				id
			}
		}
	}
`;

const ADD_USER_FLOW = gql`
	mutation AddUserFlow($clickId: Int, $flow: NewUserFlow) {
		addUserFlow(clickId: $clickId, flow: $flow){
			success
			status
			message
			body {
				id
			}
		}
	}
`;

const ADD_USER_EMAIL = gql`
	mutation AddUserEmail($clickId: Int, $email: String) {
		addUserEmail(clickId: $clickId, email: $email){
			success
			status
			message
			body {
				id
			}
		}
	}
`;

const INSERT_COMMON_INFO = gql`
	mutation InsertCommonInfo($visitor: CommonInfo) {
		insertCommonInfo(visitor: $visitor){
			success
			status
			message
		}
	}
`;

export {
	ADD_NEW_USER,
	ADD_USER_FLOW,
	ADD_USER_EMAIL,
	INSERT_COMMON_INFO
};