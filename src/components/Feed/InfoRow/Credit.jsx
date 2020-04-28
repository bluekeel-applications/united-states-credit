import React from 'react';
import { getSrcFromHtml } from '../../../utils/feedTools';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_FEED } from '../../../utils/queries';
import Loading from '../../Shared/Loading';

const Credit = () => {
	const handleLinkClick = (linkout, e) => {
        e.preventDefault();
        window.open(linkout, '_blank');
	};
	
	const { loading, error, data } = useQuery(FETCH_FEED, { variables: { type: 'credit' }});

    if(error) {
        return <div className='feed_loader'>Error occurred fetching Find Credit Article Feed!...please reload</div>
    };

    if(loading) {
        return <div className='feed_loader'><Loading /></div>
    };
	const creditList = data.fetchFeed.body.items;

	return (
		<>
		<div className='row-column-item'>
			<img src={getSrcFromHtml(creditList[2].content)} className='row-column-item-image' alt='img' />
			<div className='row-column-item-content'>
				<div className='row-column-item-title title-hover' onClick={(e) => handleLinkClick(creditList[2].link, e)}>{creditList[2].title}</div>
				<div className='keyword-link-container small-column-categories'>
					{creditList[2].categories.map((category, j) => (
						<div className='keyword-link' key={`category-item-${j}`}>
							<a className='category-item' href={creditList[2].link}>
								<span>{category}</span>
							</a>
						</div>
					))}
				</div>
			</div>
		</div>
		<div className='row-column-item'>
			<img src={getSrcFromHtml(creditList[3].content)} className='row-column-item-image' alt='img' />
			<div className='row-column-item-content'>
				<div className='row-column-item-title title-hover' onClick={(e) => handleLinkClick(creditList[3].link, e)}>{creditList[3].title}</div>
				<div className='keyword-link-container small-column-categories'>
					{creditList[3].categories.map((category, j) => (
						<div className='keyword-link' key={`category-item-${j}`}>
							<a className='category-item' href={creditList[3].link}>
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


export default Credit;