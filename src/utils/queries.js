import gql from 'graphql-tag';

const ENDPOINT_OFFER = gql`
	query FetchEndpointOffer($queryData: OfferQuery) {
		fetchEndpointOffer(queryData: $queryData) {
			success
			status
			message
			body {
				id
				name
				url
				jump
				usage
				offer_page
				four_button
				restricted
				states
				offers {
					id
					title
				}
			}
		}
	}
`;

export {
	ENDPOINT_OFFER
};