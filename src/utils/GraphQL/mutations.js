import gql from 'graphql-tag';

const ADD_QUERY_INSIGHT = gql `
	mutation AddUserSearchQuery($clickId: Int, $query: String) {
		addUserSearchQuery(clickId: $clickId, query: $query) {
			success
			status
			message
		}
	}
`;

const ADD_SELECTION_LOG = gql `
	mutation AddSelectionLog($selection: NewSelectionLog) {
		addSelectionLog(selection: $selection) {
			success
			status
			message
		}
	}
`;

const ADD_SERVICE_LOG = gql `
	mutation AddServiceLog($service: ServiceLog) {
		addServiceLog(service: $service) {
			success
			status
			message
		}
	}
`;

const ADD_SERVICE_ENDPOINT_LOG = gql `
	mutation addServiceEndpointLog($service_endpoint: ServiceEndpointLog) {
		addServiceEndpointLog(service_endpoint: $service_endpoint) {
			success
			status
			message
		}
	}
`;

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

const INSERT_COMMON_INFO = gql `
	mutation InsertCommonInfo($visitor: CommonInfo) {
		insertCommonInfo(visitor: $visitor){
			success
			status
			message
		}
	}
`;

const INSERT_SEARCH_INFO = gql `
	mutation InsertSearchInfo($visitor: CommonInfo) {
		insertSearchInfo(visitor: $visitor){
			success
			status
			message
		}
	}
`;

const ADD_NEW_USER = gql `
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
    ADD_QUERY_INSIGHT,
    ADD_SELECTION_LOG,
    ADD_SERVICE_LOG,
	ADD_SERVICE_ENDPOINT_LOG,
    ADD_USER_EMAIL,
    ADD_USER_FLOW,
    INSERT_COMMON_INFO,
    INSERT_SEARCH_INFO,
	ADD_NEW_USER,
	ADD_USER_PCH
}