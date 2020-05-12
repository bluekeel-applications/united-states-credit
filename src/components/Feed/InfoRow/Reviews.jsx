import React from 'react';
import { getSrcFromHtml } from '../../../utils/feedTools';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_FEED } from '../../../utils/queries';
import Loading from '../../Shared/Loading';

const Reviews = () => {
	const handleLinkClick = (linkout, e) => {
        e.preventDefault();
        window.open(linkout, '_blank');
	};
	
	const { loading, error, data } = useQuery(FETCH_FEED, { variables: { type: 'reviews' }});

    if(error) {
        return <div className='feed_loader'>Error occurred fetching Review Article Feed!...please reload</div>
    };

    if(loading) {
        return <div className='feed_loader'><Loading /></div>
    };
	const reviewList = data.fetchFeed.body.items;

	return (
		<>
		<div className='row-column-item'>
			<img src={getSrcFromHtml(reviewList[2].content, true, 'sm')} className='row-column-item-image' alt='img' />
			<div className='row-column-item-content'>
				<div className='row-column-item-title title-hover' onClick={(e) => handleLinkClick(reviewList[2].link, e)}>{reviewList[2].title}</div>
				<div className='keyword-link-container small-column-categories'>
					{reviewList[2].categories.map((category, j) => (
						<div className='keyword-link' key={`category-item-${j}`}>
							<a className='category-item' href={reviewList[2].link}>
								<span>{category}</span>
							</a>
						</div>
					))}
				</div>
			</div>
		</div>
		<div className='row-column-item'>
			<img src={getSrcFromHtml(reviewList[3].content, true, 'sm')} className='row-column-item-image' alt='img' />
			<div className='row-column-item-content'>
				<div className='row-column-item-title title-hover' onClick={(e) => handleLinkClick(reviewList[3].link, e)}>{reviewList[3].title}</div>
				<div className='keyword-link-container small-column-categories'>
					{reviewList[3].categories.map((category, j) => (
						<div className='keyword-link' key={`category-item-${j}`}>
							<a className='category-item' href={reviewList[3].link}>
								<span>{category}</span>
							</a>
						</div>
					))}
				</div>
			</div>
		</div>
		</>
	)
}


export default Reviews;