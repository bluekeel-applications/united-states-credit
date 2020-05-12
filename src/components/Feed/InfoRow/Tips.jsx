import React from 'react';
import { getSrcFromHtml } from '../../../utils/feedTools';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_FEED } from '../../../utils/queries';
import Loading from '../../Shared/Loading';

const Tips = () => {
	const handleLinkClick = (linkout, e) => {
        e.preventDefault();
        window.open(linkout, '_blank');
	};
	
	const { loading, error, data } = useQuery(FETCH_FEED, { variables: { type: 'tips' }});

    if(error) {
        return <div className='feed_loader'>Error occurred fetching Credit Tips Article Feed!...please reload</div>
    };

    if(loading) {
        return <div className='feed_loader'><Loading /></div>
    };
	const tipList = data.fetchFeed.body.items;

	return (
		<>
		<div className='row-column-item'>
			<img src={getSrcFromHtml(tipList[2].content, true, 'sm')} className='row-column-item-image' alt='img' />
			<div className='row-column-item-content'>
				<div className='row-column-item-title title-hover' onClick={(e) => handleLinkClick(tipList[2].link, e)}>{tipList[2].title}</div>
				<div className='keyword-link-container small-column-categories'>
					{tipList[2].categories.map((category, j) => (
						<div className='keyword-link' key={`category-item-${j}`}>
							<a className='category-item' href={tipList[2].link}>
								<span>{category}</span>
							</a>
						</div>
					))}
				</div>
			</div>
		</div>
		<div className='row-column-item'>
			<img src={getSrcFromHtml(tipList[3].content, true, 'sm')} className='row-column-item-image' alt='img' />
			<div className='row-column-item-content'>
				<div className='row-column-item-title title-hover' onClick={(e) => handleLinkClick(tipList[3].link, e)}>{tipList[3].title}</div>
				<div className='keyword-link-container small-column-categories'>
					{tipList[3].categories.map((category, j) => (
						<div className='keyword-link' key={`category-item-${j}`}>
							<a className='category-item' href={tipList[3].link}>
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


export default Tips;