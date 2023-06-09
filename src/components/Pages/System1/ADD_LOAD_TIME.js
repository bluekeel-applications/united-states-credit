import gql from 'graphql-tag';

const ADD_LOAD_TIME = gql `
	mutation AddLoadTime($user_ip: String, $delta: Int) {
		addLoadTime(user_ip: $user_ip, delta: $delta){
			success
			status
			message
		}
	}
`;

export default ADD_LOAD_TIME;