import React from 'react';
import FadeIn from 'react-fade-in';
import { getSrcFromHtml } from '../../../utils/feedTools';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_FEED } from '../../../utils/queries';
import Loading from '../../Shared/Loading';

const FeaturedRow = () => {
    const handleLinkClick = (linkout, e) => {
        e.preventDefault();
        window.open(linkout, '_blank');
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
            if(idx === 0 || idx > 5) return null;
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
        <FadeIn className='feed-row featured-row-container'>
            {data && (
                <>
                    <div className='featured-article-container' onClick={(e) => handleLinkClick(featured[0].link, e)}>
                        <div className='featured-article-title title-hover'>{featured[0].title}</div>
                        <img className='featured-article-img' src={getSrcFromHtml(featured[0].content)} alt='featured-article-img' />
                    </div>
                    <div className='featured-article-list'>
                        {featured && featured.length > 0 && (buildArticleList())}
                    </div>
                </>              
            )}
        </FadeIn>
    );
};

export default FeaturedRow;