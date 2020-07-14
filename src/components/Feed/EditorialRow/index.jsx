import React from 'react';
import { useHistory } from 'react-router-dom';
import FadeIn from 'react-fade-in';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_FEED } from '../../../utils/queries';
import Loading from '../../Shared/Loading';

const EditorialRow = () => {
    let history = useHistory();

    const handleLinkClick = (linkout, e) => {
        e.preventDefault();
        window.open(linkout, '_blank');
    };
    const handleVisualSearch = (e) => {
        e.preventDefault();
        history.push('/verticals');
        window.scrollTo(0, 0);
    };

    const { loading, error, data } = useQuery(FETCH_FEED, { variables: { type: 'featured' }});

    if(error) {
        return <div className='feed_loader'>Error occurred fetching Featured Article Feed!...please reload</div>
    };

    if(loading) {
        return <div className='feed_loader'><Loading /></div>
    };


    const featured = data.fetchFeed.body.items;

    const buildArticleList = () => {
        let featuredList = [];
        featured.map((article, idx) => {
            if(idx <= 5 || idx >= 10) return null;
            let currentObj = {
                title: article.title,
                categories: article.categories,
                link: article.link,
                content: article.contentSnippet
            }
            featuredList.push(currentObj);
            return null;
        });

        return (
            featuredList.length > 0 && (
                featuredList.map((article, i) => (
                    <div 
                        className='featured-article-list-item' 
                        onClick={(e) => handleLinkClick(article.link, e)}
                        key={`featured-article-list-item-${i}`}
                    >
                        <div className='article-title title-hover'>{article.title}</div>
                        <div className='keyword-link-container bottom-border'>
                            {article.categories.map((category, j) => (
                                <div className='keyword-link' key={`category-item-${j}`}>
                                    <a 
                                        className='category-item' 
                                        href={article.link}
                                    >
                                        <span>{category}</span>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )
        )
    };

    return (
            <FadeIn className='feed-row editorial-row-container'>
                <div className='bottom-border row-title'>Editorial</div>
                {data && (
                    <div className='row-content'>
                        <div className='editorial-article-container' onClick={(e) => handleVisualSearch(e)}>
                            <div className='editorial-article-title'>Find Credit Using our Visual Search Tool</div>
                            <img className='editorial-article-img' src={`https://unitedstatescredit.com/images/visualSearch/search_bar.jpg`} alt='editorial-article-img' />
                        </div>
                        <div className='editorial-article-list'>
                            {buildArticleList()}
                        </div>
                    </div>
                )}
            </FadeIn>
    )
};

export default EditorialRow;