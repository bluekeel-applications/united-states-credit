import gql from 'graphql-tag';

const PUSH_PROVIDERS = gql`
	query FetchPushProviders {
		fetchPushProviders {
			success
			status
			message
			body {
				push_pros
                pushnami
			}
		}
	}
`;

const GET_OFFER_BY_GROUP = gql`
	query FetchOfferByGroup($offer_group: String, $program_id: String, $user: UserLog) {
        fetchOfferByGroup(offer_group: $offer_group, program_id: $program_id, user: $user) {
            success
            status
            message
            body {
                id
                name
                url
                jump
                offer_page
                four_button {
					text
					url
					jump
				}
                restricted
                states
                offers {
                    id
                    title
                }
                quick_link_group 
                selection_links {
                    id
                    qid
                    name
                    text
                    offer_group
                    url
                    jump
                    google
                    button_color
                    text_color
                }
                question_text
                program_id
                group_id
                google
                show_search
            }
        }
    }
`;

const GET_OFFER = gql`
	query FetchOfferFromFlow($queryData: OfferQuery, $user: UserLog) {
        fetchOfferFromFlow(queryData: $queryData, user: $user) {
            success
            status
            message
            body {
                id
                name
                url
                jump
                offer_page
                four_button {
					text
					url
					jump
				}
                restricted
                show_search
                states
                offers {
                    id
                    title
                }
                quick_link_group 
                selection_links {
                    id
                    qid
                    name
                    text
                    offer_group
                    url
                    jump
                    google
                    button_color
                    text_color
                }
                question_text
                program_id
                group_id
                google
            }
        }
    }
`;

export {
    PUSH_PROVIDERS,
	GET_OFFER_BY_GROUP,
	GET_OFFER
};