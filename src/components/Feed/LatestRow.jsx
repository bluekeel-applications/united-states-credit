import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { getSrcFromHtml, trimSnippet } from '../../utils/feedTools';

const LatestRow = () => {
    const { feedState } = useContext(AppContext);
    const articles = feedState.feed;
    let latestList = [];

    const handleLinkClick = (linkout, e) => {
        e.preventDefault();
        window.open(linkout, '_blank');
    };

    const buildArticleList = () => {
        for(let i = 7; i < 13; i++) {
            let currentObj = {
                title: articles[i].title,
                categories: articles[i].categories,
                link: articles[i].link,
                text: articles[i].contentSnippet,
                html: articles[i].content
            }
            latestList.push(currentObj);
        }

        return (
            latestList.map((article, i) => (
                <div key={`latest-article-${i}`} className='latest-article-row bottom-border'>
                    <div className='latest-item-column' onClick={(e) => handleLinkClick(article.link, e)}>
                        <div className='article-title title-hover'>{article.title}</div>
                        <div className='keyword-link-container tags-left bottom-border'>
                            {article.categories.map((category, j) => (
                                <div className='keyword-link' key={`category-item-${j}`}>
                                    <a className='category-item' href={`https://unitedstatescredit.blog/2018/11/06/earn-100s-by-opening-up-an-online-checking-account-3/`}>
                                        <span>{category}</span>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='latest-item-column text-column'>{trimSnippet(article.text)}</div>
                    <div className='latest-item-column image-column'><img  className='latest-image' src={getSrcFromHtml(article.html)} alt={`list-${i}`} /></div>
                </div>
            ))
        )
    };

    return (
        <div className='feed-row latest-row-container'>
            <div className='bottom-border row-title'>The Latest</div>
            <div className='row-content-column'>
                {!!articles && buildArticleList()}
            </div>
        </div>
    )
};

export default LatestRow;