import gql from 'graphql-tag';

const ADD_SERVICE_LOG = gql `
	mutation AddServiceLog($service: ServiceLog) {
		addServiceLog(service: $service) {
			success
			status
			message
		}
	}
`;

export default ADD_SERVICE_LOG;