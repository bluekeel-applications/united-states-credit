import gql from 'graphql-tag';

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

export default ADD_USER_FLOW;