import gql from 'graphql-tag';

const ADD_USER_EMAIL = gql `
	mutation AddUserEmail($clickId: Int, $email: String) {
		addUserEmail(clickId: $clickId, email: $email){
			success
			status
			message
			body {
				email
			}
		}
	}
`;

export default ADD_USER_EMAIL;