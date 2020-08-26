import gql from 'graphql-tag.macro';

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
	query FetchEndpointOffer($queryData: OfferQuery, $user: UserLog) {
		fetchEndpointOffer(queryData: $queryData, user: $user) {
			success
			status
			message
			body {
				id
				name
				url
				jump
				offer_page
				four_button
				restricted
				states
				offers {
					id
					title
				}
				quick_link_group
				program_id
				group_id
			}
		}
	}
`;
const DIRECT_OFFER = gql`
	query FetchDirectOffer($pid: Int) {
		fetchDirectOffer(pid: $pid) {
			success
			status
			message
			body {
				id
				name
				url
				jump
				offer_page
				four_button
				restricted
				states
				offers {
					id
					title
				}
				quick_link_group {
					text
					url
					jump
				}
				program_id
				group_id
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

const LIST_OFFER = gql`
	query FetchOfferById($id: ID) {
		fetchOfferById(id: $id) {
			success
			status
			message
			body {
				id
				title
				subtitle
				description
				link
				bullets
				offer_image
				image_title
			}
		}
	}
`;

const PCH_USER = gql`
	query FetchUserInfo($pat: String, $gmt: String) {
		fetchUserInfo(pat: $pat, gmt: $gmt) {
			success
			status
			message
			body {
				EmailAddress
				Title
				FirstName
				LastName
				Address1
				City
				State
				ZipCode
			}
		}
	}
`;

const QUICK_LINKS = gql `
	query FetchQuickLinks($quick_link_ids: [String], $url: String, $jump: String) {
		fetchQuickLinks(quick_link_ids: $quick_link_ids, url: $url, jump: $jump) {
			success
			status
			message
			body {
				id
				text
				url
				jump
			}
		}
	}
`;

export {
	FETCH_FEED,
	ENDPOINT_OFFER,
	DIRECT_OFFER,
	OPTIN_OFFER,
	LIST_OFFER,
	PCH_USER,
	QUICK_LINKS
};