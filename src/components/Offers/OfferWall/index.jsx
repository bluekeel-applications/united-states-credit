import React from 'react';
import ListedOffer from './ListedOffer';

const OfferWall = ({ offer }) => {

    return(
		<div className='offer-wall__container'>
		<div className='offer-list-header-text'>Multiple sponsored results could be available that suit your needs.</div>
			<div className='offer-list-sponsored-text'>View Sponsored Offers</div>
			<div className='offer-list-list'>
				{offer && offer.offers.map((list_offer, idx) => (
					<ListedOffer key={`offer-wall-item__${idx}`} id={list_offer.id} />
				))}
			</div>
        </div>
    )
};

export default OfferWall;