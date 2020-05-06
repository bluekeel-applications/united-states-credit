import gql from 'graphql-tag';

// RSS Feed
const FETCH_FEED = gql`
	query FetchFeed($type: String) {
		fetchFeed(type: $type) {
			success
			status
			message
			body {
				feedUrl
				title
				description
				link
				language
				lastBuildDate
				image {
					link
					url
					title
					width
					height
				}
				items {
					creator
					title
					link
					pubDate
					comments
					content
					contentSnippet
					guid
					categories
					isoDate
				}
			}
		}
	}
`;
// Offer
const ENDPOINT_OFFER = gql`
	query FetchEndpointOffer($queryData: OfferQuery, $location: String) {
		fetchEndpointOffer(queryData: $queryData, location: $location) {
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
				optin {
					type
					title
					optin_id
				}
			}
		}
	}
`;

const OPTIN_OFFER = gql`
	query FetchOptinById($id: ID) {
		fetchOptinById(id: $id) {
			success
			status
			message
			body {
				id
				type
				title
				description
				link
				offer_page
				four_button
				offers {
					id
					title
				}
			}
		}
	}
`;

const PCH_USER = gql`
	query FetchUserInfo {
		fetchUserInfo {
			success
			status
			message
		}
	}
`;

export {
	FETCH_FEED,
	ENDPOINT_OFFER,
	OPTIN_OFFER,
	PCH_USER
};