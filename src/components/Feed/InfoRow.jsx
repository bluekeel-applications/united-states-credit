import React from 'react';
import { Zoom, Fade } from 'react-reveal';
const mockReviews = [
    {
        title: '2019 Top Loans for Less Than Perfect Credit',
        categories: [],
        link: 'https://unitedstatescredit.blog/2018/11/06/earn-100s-by-opening-up-an-online-checking-account-3/',
        image: 'https://i1.wp.com/unitedstatescredit.blog/wp-content/uploads/2018/06/USA-Loan.jpg?fit=1200%2C676&ssl=1'
    },
    {
        title: 'Common Credit Terms Defined',
        categories: [ "Best of", "Credit Level", "Find a Loan", "Find Credit", "Our Favorites" ],
        link: 'https://unitedstatescredit.blog/2018/11/06/earn-100s-by-opening-up-an-online-checking-account-3/',
        image: 'https://i2.wp.com/unitedstatescredit.blog/wp-content/uploads/2018/07/credit-card-smaller.jpg?fit=1200%2C1036&ssl=1'
    }
];
const mockCredit = [
    
    {
        title: '2019 Top Loans for Less Than Perfect Credit',
        categories: [ "Credit Basics", "Credit Level", "Find a Loan", "Find Credit", "Our Favorites" ],
        link: 'https://unitedstatescredit.blog/2018/11/06/earn-100s-by-opening-up-an-online-checking-account-3/',
        image: 'https://i1.wp.com/unitedstatescredit.blog/wp-content/uploads/2018/06/USA-Loan.jpg?fit=1200%2C676&ssl=1'
    },
    {
        title: '2019 Top Loans for Less Than Perfect Credit',
        categories: [],
        link: 'https://unitedstatescredit.blog/2018/11/06/earn-100s-by-opening-up-an-online-checking-account-3/',
        image: 'https://i1.wp.com/unitedstatescredit.blog/wp-content/uploads/2018/09/did_you_know.jpg?fit=1200%2C800&ssl=1'
    }
];
const mockTips = [
    {
        title: 'Common Credit Terms Defined',
        categories: [ "Best of", "Credit Level", "Find a Loan", "Find Credit", "Our Favorites" ],
        link: 'https://unitedstatescredit.blog/2018/11/06/earn-100s-by-opening-up-an-online-checking-account-3/',
        image: 'https://i0.wp.com/unitedstatescredit.blog/wp-content/uploads/2018/06/credit_maze.jpg?fit=1200%2C900&ssl=1'
    },
    {
        title: '2019 Top Loans for Less Than Perfect Credit',
        categories: [ "Credit Basics", "Credit Level", "Find a Loan", "Find Credit", "Our Favorites" ],
        link: 'https://unitedstatescredit.blog/2018/11/06/earn-100s-by-opening-up-an-online-checking-account-3/',
        image: 'https://i1.wp.com/unitedstatescredit.blog/wp-content/uploads/2018/06/USA-Loan.jpg?fit=1200%2C676&ssl=1'
    }
];
const InfoRow = () => (
    <Fade bottom>
        <div className='feed-row info-row-container'>
            <div className='bottom-border row-title'>Knowledge Base</div>
            <div className='row-column-container'>
                <div className='row-column'>
                    <div className='row-column-title'>Reviews</div>
                    <div className='right-border row-column-item-container'>
                        {mockReviews.map((review, i) => (
                            <Zoom key={`row-column-item-${i}`}>
                                <div className='row-column-item'>
                                    <img src={review.image} className='row-column-item-image' alt='img' />
                                    <div className='row-column-item-content'>
                                        <div className='row-column-item-title'>{review.title}</div>
                                        <div className='row-column-item-categories'>
                                            {review.categories.map((category, j) => (
                                                <a key={`category-item-${j}`} className='category-item' href={review.link}>
                                                    <span>{category}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                        ))}
                    </div>
                </div>
                <div className='row-column'>
                    <div className='row-column-title'>Find Credit</div>
                    <div className='right-border row-column-item-container'>
                        {mockCredit.map((review, k) => (
                            <Zoom key={`row-column-item-${k}`}>
                                <div className='row-column-item'>
                                    <img src={review.image} className='row-column-item-image' alt='img' />
                                    <div className='row-column-item-content'>
                                        <div className='row-column-item-title'>{review.title}</div>
                                        <div className='row-column-item-categories'>
                                            {review.categories.map((category, l) => (
                                                <a className='category-item' href={review.link}>
                                                    <span key={`category-item-${l}`}>{category}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                            ))}
                    </div>
                </div>
                <div className='row-column'>
                    <div className='row-column-title'>Credit Tips</div>
                    <div className='row-column-item-container'>
                        {mockTips.map((review, m) => (
                            <Zoom key={`row-column-item-${m}`}>
                                <div className='row-column-item'>
                                    <img src={review.image} className='row-column-item-image' alt='img' />
                                    <div className='row-column-item-content'>
                                        <div className='row-column-item-title'>{review.title}</div>
                                        <div className='row-column-item-categories'>
                                            {review.categories.map((category, n) => (
                                                <a className='category-item' href={review.link}>
                                                    <span key={`category-item-${n}`}>{category}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    </Fade>
);

export default InfoRow;