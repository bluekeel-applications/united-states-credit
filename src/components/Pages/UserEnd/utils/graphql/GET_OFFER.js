import gql from 'graphql-tag';

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

export default GET_OFFER;
