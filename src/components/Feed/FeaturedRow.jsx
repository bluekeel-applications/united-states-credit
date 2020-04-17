import React, { useContext } from 'react';
import { AppContext } from '../../context';
import FadeIn from 'react-fade-in';
import { getSrcFromHtml } from '../../utils/feedTools';

const FeaturedRow = () => {
    const { feedState } = useContext(AppContext);
    const articles = feedState.feed;

    const handleLinkClick = (linkout, e) => {
        e.preventDefault();
        window.open(linkout, '_blank');
    };

    const buildArticleList = () => {
        let featuredList = [];
        for(let i = 10; i < 14; i++) {
            let currentObj = {
                title: articles[i].title,
                categories: articles[i].categories,
                link: articles[i].link,
                content: articles[i].contentSnippet
            }
            featuredList.push(currentObj);
        }

        return (
            articles.length > 0 && (
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
    }

    return ( 
        feedState.featured.map((feature, i) => (
                <FadeIn key={`featured_row-${i}`} className='feed-row featured-row-container'>
                    <div className='featured-article-container' onClick={(e) => handleLinkClick(feature.link, e)}>
                        <div className='featured-article-title title-hover'>{feature.title}</div>
                        <img className='featured-article-img' src={getSrcFromHtml(feature.snippet)} alt='featured-article-img' />
                    </div>
                    <div className='featured-article-list'>
                        {articles && articles.length > 0 && (buildArticleList())}
                    </div>
                </FadeIn>
        ))
    );
};

export default FeaturedRow;