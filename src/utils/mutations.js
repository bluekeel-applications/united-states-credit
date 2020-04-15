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

export {
	ADD_NEW_USER
};