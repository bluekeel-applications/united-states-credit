import React from 'react';
const mockLatest = [
    {
        title: 'Is credit a bad or a good thing?',
        categories: [ "Best of", "Credit Level", "Find a Loan", "Find Credit", "Our Favorites" ],
        text: 'Having worked in the financial space for many years and after having seen so many of the problems that credit has caused Americans, I often… ',
        image: 'https://i1.wp.com/unitedstatescredit.blog/wp-content/uploads/2018/04/good_evil.jpg?fit=1200%2C800&ssl=1'
    },
    {
        title: 'Featured Offer: RateMuse.com',
        categories: [ "Best of", "Credit Level", "Find a Loan" ],
        text: 'Yes…they Finally Made an Intelligent Insurance Website This review will be short and sweet.  RateMuse.com is a website with a brain.  You answer a few… ',
        image: 'https://i1.wp.com/unitedstatescredit.blog/wp-content/uploads/2018/04/car_insurance.jpg?fit=1200%2C1200&ssl=1'
    },
    {
        title: 'A Penny Saved is Penny Earned',
        categories: [ "Find Credit", "Our Favorites" ],
        text: 'Your grandfather said it, your father said it…and it’s true.  Saving a dollar is in all ways the same as earning a dollar.  In some… ',
        image: 'https://i1.wp.com/unitedstatescredit.blog/wp-content/uploads/2018/04/piggy_bank.jpg?fit=1200%2C651&ssl=1'
    },
    {
        title: 'Is credit a bad or a good thing?',
        categories: [ "Best of", "Credit Level", "Find a Loan", "Find Credit", "Our Favorites" ],
        text: 'Having worked in the financial space for many years and after having seen so many of the problems that credit has caused Americans, I often… ',
        image: 'https://i1.wp.com/unitedstatescredit.blog/wp-content/uploads/2018/04/good_evil.jpg?fit=1200%2C800&ssl=1'
    },
    {
        title: 'Featured Offer: RateMuse.com',
        categories: [ "Best of", "Credit Level", "Find a Loan" ],
        text: 'Yes…they Finally Made an Intelligent Insurance Website This review will be short and sweet.  RateMuse.com is a website with a brain.  You answer a few… ',
        image: 'https://i1.wp.com/unitedstatescredit.blog/wp-content/uploads/2018/04/car_insurance.jpg?fit=1200%2C1200&ssl=1'
    },
    {
        title: 'A Penny Saved is Penny Earned',
        categories: [ "Find Credit", "Our Favorites" ],
        text: 'Your grandfather said it, your father said it…and it’s true.  Saving a dollar is in all ways the same as earning a dollar.  In some… ',
        image: 'https://i1.wp.com/unitedstatescredit.blog/wp-content/uploads/2018/04/piggy_bank.jpg?fit=1200%2C651&ssl=1'
    },
]
const LatestRow = () => (
    <div className='feed-row latest-row-container'>
        <div className='bottom-border row-title'>The Latest</div>
        <div className='row-content-column'>
            {mockLatest.map((article, i) => (
                <div key={`latest-article-${i}`} className='latest-article-row bottom-border'>
                    <div className='latest-item-column'>
                        <div className='article-title'>{article.title}</div>
                        <div className='keyword-link-container tags-left'>
                            {article.categories.map((category, j) => (
                                <a className='category-item' href={`https://unitedstatescredit.blog/2018/11/06/earn-100s-by-opening-up-an-online-checking-account-3/`}>
                                    <span key={`category-item-${j}`}><u>{category}</u></span>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className='latest-item-column text-column'>{article.text}</div>
                    <div className='latest-item-column image-column'><img  src={article.image} alt={`list-${i}`} /></div>
                </div>
            ))}
        </div>
    </div>
);

export default LatestRow;