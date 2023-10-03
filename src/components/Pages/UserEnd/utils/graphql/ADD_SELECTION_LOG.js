import gql from 'graphql-tag';

const ADD_SELECTION_LOG = gql `
	mutation AddSelectionLog($selection: NewSelectionLog) {
		addSelectionLog(selection: $selection) {
			success
			status
			message
		}
	}
`;

export default ADD_SELECTION_LOG;