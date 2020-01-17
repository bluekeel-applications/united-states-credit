import React from 'react';
import Zoom from 'react-reveal/Zoom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OfferButton = ({isSingle, handleClick}) => {
    return isSingle ? (
        <Zoom>
            <button 
                className='offer__button_single'
                onClick={(e) => handleClick(e)}
            >
                <FontAwesomeIcon
                    icon={['fal', 'search-dollar']}
                    className='offer-button-icon'
                />
                <div className='offer__button_single-text'>
                    <span className='offer__button_single-title'>View Offers</span>
                    <span className='offer__button_single-subtitle'>Sponsored Listings</span>
                </div>
            </button>
        </Zoom>
    ) : (
        //make four button group here
        null
    )
};

export default OfferButton;