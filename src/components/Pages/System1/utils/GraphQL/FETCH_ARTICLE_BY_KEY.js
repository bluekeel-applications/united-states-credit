import gql from 'graphql-tag';

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
			}
		}
	}
`;

export default FETCH_ARTICLE_BY_KEY;