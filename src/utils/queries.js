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
	FETCH_FEED,
	ENDPOINT_OFFER
};