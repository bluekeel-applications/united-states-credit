import React from 'react';
import OfferButton from '../Shared/OfferButton';

const OneButton = ({ offer }) => {
    const handleButtonClick = () => {
        console.log('Button clicked with offer:', offer);
    };

    return(
        <div className='offer-page__main-1'>
            <span className='offer-header-text'>
                Multiple sponsored results could be available that suit your needs.
            </span>
            <OfferButton isSingle handleClick={handleButtonClick} />
        </div>
    )
};

export default OneButton;