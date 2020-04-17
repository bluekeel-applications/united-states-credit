import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import FadeIn from 'react-fade-in';

const EditorialRow = () => {
    const { feedState } = useContext(AppContext);
    let history = useHistory();
    const articles = feedState.feed;

    const handleLinkClick = (linkout, e) => {
        e.preventDefault();
        window.open(linkout, '_blank');
    };

    const handleVisualSearch = (e) => {
        e.preventDefault();
        history.push('/verticals');
        window.scrollTo(0, 0);
    };

    const renderArticleList = () => {
        let editorialList = [];
        for(let i = 15; i < 19; i++) {
            let currentObj = {
                title: articles[i].title,
                categories: articles[i].categories,
                link: articles[i].link,
                text: articles[i].contentSnippet,
                html: articles[i].content
            }
            editorialList.push(currentObj);
        }

        return(
            editorialList.map((article, i) => (
                <div 
                    className='featured-article-list-item editorial-article-list-item' 
                    onClick={(e) => handleLinkClick(article.link, e)}
                    key={`featured-article-list-item-${i}`}
                >
                    <div className='article-title title-hover'>{article.title}</div>
                    <div className='keyword-link-container bottom-border'>
                        {article.categories.map((category, j) => (
                            <div className='keyword-link' key={`category-item-${j}`}>
                                <a className='category-item' href={`https://unitedstatescredit.blog/2018/11/06/earn-100s-by-opening-up-an-online-checking-account-3/`}>
                                    <span>{category}</span>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            ))
        )
    }

    return (
            <FadeIn className='feed-row editorial-row-container'>
                <div className='bottom-border row-title'>Editorial</div>
                <div className='row-content'>
                    <div className='editorial-article-container' onClick={(e) => handleVisualSearch(e)}>
                        <div className='editorial-article-title'>Find Credit Using our Visual Search Tool</div>
                        <img className='editorial-article-img' src={`https://unitedstatescredit.com/images/visualSearch/search_bar.jpg`} alt='editorial-article-img' />
                    </div>
                    <div className='editorial-article-list'>
                        {!!articles && articles.length > 0 && renderArticleList()}
                    </div>
                </div>
            </FadeIn>
    )
};

export default EditorialRow;