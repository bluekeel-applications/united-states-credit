import React from 'react';
import { getSrcFromHtml, trimSnippet } from '../../../utils/feedTools';
import FadeIn from 'react-fade-in';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_FEED } from '../../../utils/queries';
import Loading from '../../Shared/Loading';

const LatestRow = () => {

    const handleLinkClick = (linkout, e) => {
        e.preventDefault();
        window.open(linkout, '_blank');
    };

    const { loading, error, data } = useQuery(FETCH_FEED, { variables: { type: 'latest' }});

    if(error) {
        return <div className='feed_loader'>Error occurred fetching Latest Article Feed!...please reload</div>
    };

    if(loading) {
        return <div className='feed_loader'><Loading /></div>
    };


    const latest = data.fetchFeed.body.items;

    const buildArticleList = () => {
        let latestList = [];
        latest.map((article, idx) => {
            if(idx >= 4) return null;
            let currentObj = {
                title: article.title,
                categories: article.categories,
                link: article.link,
                content: article.contentSnippet,
                html: article.content
            }
            latestList.push(currentObj);
            return null;
        });
        
        return (
            latestList.length > 0 && (
                latestList.map((article, i) => (
                    <div key={`latest-article-${i}`} className='latest-article-row bottom-border'>
                        <div className='latest-item-column' onClick={(e) => handleLinkClick(article.link, e)}>
                            <div className='article-title title-hover'>{article.title}</div>
                            <div className='keyword-link-container tags-left'>
                                {article.categories.map((category, j) => (
                                    <div className='keyword-link' key={`category-item-${j}`}>
                                        <a className='category-item' href={`https://unitedstatescredit.blog/2018/11/06/earn-100s-by-opening-up-an-online-checking-account-3/`}>
                                            <span>{category}</span>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='latest-item-column text-column'>{trimSnippet(article.content)}</div>
                        <div className='latest-item-column image-column'><img  className='latest-image' src={getSrcFromHtml(article.html)} alt={`list-${i}`} /></div>
                    </div>
                ))
            )
        )
    };

    return (
        <FadeIn className='feed-row latest-row-container'>
            <div className='bottom-border row-title'>The Latest</div>
            {data && (
                <div className='row-content-column'>
                    {buildArticleList()}
                </div>
            )}
        </FadeIn>
    )
};

export default LatestRow;