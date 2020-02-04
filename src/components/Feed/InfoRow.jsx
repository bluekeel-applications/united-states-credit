import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { Zoom, Fade } from 'react-reveal';
import { getSrcFromHtml } from '../../utils/feedTools';

const InfoRow = () => {
    const { feedState } = useContext(AppContext);
    const reviews = feedState.reviews;
    const credits = feedState.credit;
    const tips = feedState.tips;

    const handleLinkClick = (linkout, e) => {
        e.preventDefault();
        window.open(linkout, '_blank');
    };

    const buildReviewList = () => {
        let reviewList = [];
        for(let i = 0; i < 2; i++) {
            let currentObj = {
                title: reviews[i].title,
                categories: reviews[i].categories,
                link: reviews[i].link,
                text: reviews[i].contentSnippet,
                html: reviews[i].content
            }
            reviewList.push(currentObj);
        }
        return reviewList;
    };

    const buildCreditList = () => {
        let creditList = [];
        for(let i = 6; i < 8; i++) {
            let currentObj = {
                title: credits[i].title,
                categories: credits[i].categories,
                link: credits[i].link,
                text: credits[i].contentSnippet,
                html: credits[i].content
            }
            creditList.push(currentObj);
        }
        return creditList;
    };

    const buildTipList = () => {
        let tipList = [];
        for(let i = 0; i < 2; i++) {
            let currentObj = {
                title: tips[i].title,
                categories: tips[i].categories,
                link: tips[i].link,
                text: tips[i].contentSnippet,
                html: tips[i].content
            }
            tipList.push(currentObj);
        }
        return tipList;
    };

    const renderReviews = () => {
        const reviewList = buildReviewList();
        return (
            reviewList.map((review, i) => (
                <Zoom key={`row-column-item-${i}`}>
                    <div className='row-column-item'>
                        <img src={getSrcFromHtml(review.html)} className='row-column-item-image' alt='img' />
                        <div className='row-column-item-content'>
                            <div className='row-column-item-title title-hover' onClick={(e) => handleLinkClick(review.link, e)}>{review.title}</div>
                            <div className='keyword-link-container small-column-categories'>
                                {review.categories.map((category, j) => (
                                    <div className='keyword-link' key={`category-item-${j}`}>
                                        <a className='category-item' href={review.link}>
                                            <span>{category}</span>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Zoom>
            ))
        )
    };

    const renderCredit = () => {
        const creditList = buildCreditList();
        return (
            creditList.map((credit, i) => (
                <Zoom key={`row-column-item-${i}`}>
                    <div className='row-column-item'>
                        <img src={getSrcFromHtml(credit.html)} className='row-column-item-image' alt='img' />
                        <div className='row-column-item-content'>
                            <div className='row-column-item-title title-hover' onClick={(e) => handleLinkClick(credit.link, e)}>{credit.title}</div>
                            <div className='keyword-link-container small-column-categories'>
                                {credit.categories.map((category, j) => (
                                    <div className='keyword-link' key={`category-item-${j}`}>
                                        <a className='category-item' href={credit.link}>
                                            <span>{category}</span>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Zoom>
            ))
        )
    };

    const renderTips = () => {
        const tipList = buildTipList();
        return (
            tipList.map((tip, i) => (
                <Zoom key={`row-column-item-${i}`}>
                    <div className='row-column-item'>
                        <img src={getSrcFromHtml(tip.html)} className='row-column-item-image' alt='img' />
                        <div className='row-column-item-content'>
                            <div className='row-column-item-title title-hover' onClick={(e) => handleLinkClick(tip.link, e)}>{tip.title}</div>
                            <div className='keyword-link-container small-column-categories'>
                                {tip.categories.map((category, j) => (
                                    <div className='keyword-link' key={`category-item-${j}`}>
                                        <a className='category-item' href={tip.link}>
                                            <span>{category}</span>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Zoom>
            ))
        )
    };


    return (
        <Fade bottom>
            <div className='feed-row info-row-container'>
                <div className='bottom-border row-title'>Knowledge Base</div>
                <div className='row-column-container'>
                    <div className='row-column'>
                        <div className='row-column-title'>Reviews</div>
                        <div className='right-border row-column-item-container'>
                            {renderReviews()}
                        </div>
                    </div>
                    <div className='row-column'>
                        <div className='row-column-title'>Find Credit</div>
                        <div className='right-border row-column-item-container'>
                            {renderCredit()}
                        </div>
                    </div>
                    <div className='row-column'>
                        <div className='row-column-title'>Credit Tips</div>
                        <div className='row-column-item-container'>
                            {renderTips()}
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    )
};

export default InfoRow;