import gql from 'graphql-tag';

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
// New
const GET_OFFER_BY_RECORD = gql`
	query fetchEndpointByRecord($pid: Int, $name: String) {
        fetchEndpointByRecord(pid: $pid, name: $name) {
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
                google
            }
        }
    }
`;

const FETCH_ARTICLE_BY_KEY = gql `
	query FetchArticleByKey($key: String) {
		fetchArticleByKey(key: $key){
			success
			status
			message
			body {
				id
                key
                header
                sub_text
                button_title
                buttons
                rsoc_desktop
                segment
                headline
                offer1 {
                    main_title
                    sub_title
                    sub_text
                    cta
                    offer_url
                }
                offer2 {
                    main_title
                    sub_title
                    sub_text
                    cta
                    offer_url
                }
                offer_block {
                    id
                    name
                    offers {
						display
						offer_url
                    }
                }
                mobile {
                    header
                    sub_text
                    button_title
                    buttons
                    segment
                    headline
                    offer1 {
                        main_title
                        sub_title
                        sub_text
                        cta
                        offer_url
                    }
                    offer2 {
                        main_title
                        sub_title
                        sub_text
                        cta
                        offer_url
                    }
                    offer_block {
                        id
                        name
                        offers {
                            display
                            offer_url
                        }
                    }
                }
			}
		}
	}
`;

export {
    PCH_USER,
    PUSH_PROVIDERS,
	GET_OFFER_BY_GROUP,
	GET_OFFER,
    GET_OFFER_BY_RECORD,
    FETCH_ARTICLE_BY_KEY
};