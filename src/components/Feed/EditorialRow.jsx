import React from 'react';
import { Fade, Zoom } from 'react-reveal';
const mockEditorial = [
    {
        title: 'Earn $100s by Opening up an Online Checking Account',
        categories: [],
        link: 'https://unitedstatescredit.blog/2018/11/06/earn-100s-by-opening-up-an-online-checking-account-3/'
    },
    {
        title: '2019 Top Loans for Less Than Perfect Credit',
        categories: [],
        link: 'https://unitedstatescredit.blog/2018/11/06/earn-100s-by-opening-up-an-online-checking-account-3/'
    },
    {
        title: 'Common Credit Terms Defined',
        categories: [ "Best of", "Credit Level", "Find a Loan", "Find Credit", "Our Favorites" ],
        link: 'https://unitedstatescredit.blog/2018/11/06/earn-100s-by-opening-up-an-online-checking-account-3/'
    },
    {
        title: '2019 Top Loans for Less Than Perfect Credit',
        categories: [ "Credit Basics", "Credit Level", "Find a Loan", "Find Credit", "Our Favorites" ],
        link: 'https://unitedstatescredit.blog/2018/11/06/earn-100s-by-opening-up-an-online-checking-account-3/'
    },
];
const EditorialRow = () => (
    <Fade bottom>
        <div className='feed-row editorial-row-container'>
            <Fade bottom><div className='bottom-border row-title'>Editorial</div></Fade>
            <div className='row-content'>
                <Zoom>
                    <div className='editorial-article-container'>
                        <div className='editorial-article-title'>Find Credit Using our Visual Search Tool</div>
                        <img className='editorial-article-img' src={`https://unitedstatescredit.com/images/visualSearch/search_bar.jpg`} alt='editorial-article-img' />
                    </div>
                </Zoom>
                <div className='editorial-article-list'>
                    {mockEditorial.map((article, i) => (
                        <Fade right>
                            <div key={`featured-article-list-item-${i}`} className='editorial-article-list-item'>
                                <div className='article-title'>{article.title}</div>
                                <div className='keyword-link-container bottom-border'>
                                    {article.categories.map((category, j) => (
                                        <a className='category-item' href={`https://unitedstatescredit.blog/2018/11/06/earn-100s-by-opening-up-an-online-checking-account-3/`}>
                                            <span key={`category-item-${j}`}>{category}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </Fade>
                    ))}
                </div>
            </div>
        </div>
    </Fade>
);

export default EditorialRow;