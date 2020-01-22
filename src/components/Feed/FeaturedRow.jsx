import React, { useContext } from 'react';
import { AppContext } from '../../context';
import Fade from 'react-reveal/Fade';
import { getSrcFromHtml } from '../../utils/feedTools';

const FeaturedRow = () => {
    const { feedState } = useContext(AppContext);
    const feed = feedState.featured;
    const articles = feedState.feed;

    const handleLinkClick = (linkout, e) => {
        e.preventDefault();
        window.open(linkout, '_blank');
    };

    const buildArticleList = () => {
        let featuredList = [];
        for(let i = 10; i < 14; i++) {
            console.log('article:', articles[i])
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
                    <Fade right key={`featured-article-list-item-${i}`}>
                        <div className='featured-article-list-item' onClick={(e) => handleLinkClick(article.link, e)}>
                            <div className='article-title title-hover'>{article.title}</div>
                            <div className='keyword-link-container bottom-border'>
                                {article.categories.map((category, j) => (
                                    <div className='keyword-link'>
                                        <a 
                                            className='category-item' 
                                            href={article.link}
                                            key={`category-item-${j}`}
                                        >
                                            <span>{category}</span>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Fade>
                ))
            )
        )
    }

    return (
        !feedState.loadingFeed && feed && (
            <Fade bottom>
                <div className='feed-row featured-row-container'>
                    <Fade left>
                        <div className='featured-article-container' onClick={(e) => handleLinkClick(feed.link, e)}>
                            <div className='featured-article-title title-hover'>{feed.title}</div>
                            <img className='featured-article-img' src={getSrcFromHtml(feed.snippet)} alt='featured-article-img' />
                        </div>
                    </Fade>
                    <div className='featured-article-list'>
                        {articles.length > 0 && (buildArticleList())}
                    </div>
                </div>
            </Fade>
        )
    );
};

export default FeaturedRow;