import React from 'react';

const mockFeatured = [
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

const FeaturedRow = () => (
    <div className='feed-row featured-row-container'>
        <div className='featured-article-container'>
            <div className='featured-article-title'>Earn $100s by Opening up an Online Checking Account</div>
            <img className='featured-article-img' src={`https://i2.wp.com/unitedstatescredit.blog/wp-content/uploads/2018/06/online_banking.jpg?fit=1200%2C736&amp;ssl=1`} alt='featured-article-img' />
        </div>
        <div className='featured-article-list'>
            {mockFeatured.map((article, i) => (
                <div key={`featured-article-list-item-${i}`} className='featured-article-list-item'>
                    <div className='article-title'>{article.title}</div>
                    <div className='keyword-link-container bottom-border'>
                        {article.categories.map((category, j) => (
                            <a className='category-item' href={`https://unitedstatescredit.blog/2018/11/06/earn-100s-by-opening-up-an-online-checking-account-3/`}>
                                <span key={`category-item-${j}`}>{category}</span>
                            </a>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default FeaturedRow;