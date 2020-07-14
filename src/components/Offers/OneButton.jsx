import React from 'react';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OneButton = ({ offer }) => {
    const handleButtonClick = () => {
        console.log('Button clicked with offer:', offer);
    };

    return(
        <div className='offer-page__main-1'>
            <span className='offer-header-text'>
                Multiple sponsored results could be available that suit your needs.
            </span>
            <Button 
                className='offer__button_single'
                onClick={handleButtonClick}
            >
                <FontAwesomeIcon
                    icon={['fal', 'search-dollar']}
                    className='offer-button-icon'
                />
                <div className='offer__button_single-text'>
                    <div className='offer__button_single-title'>View Offers</div>
                    <div className='offer__button_single-subtitle'>Sponsored Listings</div>
                </div>
            </Button>
        </div>
    )
};

export default OneButton;