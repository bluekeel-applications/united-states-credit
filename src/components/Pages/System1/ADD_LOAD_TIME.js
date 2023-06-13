import gql from 'graphql-tag';

const ADD_LOAD_TIME = gql `
	mutation AddLoadTime($user_ip: String, $delta: Int, $subid: String, $segment: String, $width: Int, $height: Int) {
		addLoadTime(user_ip: $user_ip, delta: $delta, subid: $subid, segment: $segment, width: $width, height: $height){
			success
			status
			message
		}
	}
`;

export default ADD_LOAD_TIME;