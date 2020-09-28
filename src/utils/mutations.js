import gql from 'graphql-tag.macro';

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

const ADD_USER_PCH = gql`
	mutation AddUserPCH($clickId: Int, $pch: AddPCHData) {
		addUserPCH(clickId: $clickId, pch: $pch) {
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
	ADD_NEW_USER,
	ADD_USER_PCH,
};