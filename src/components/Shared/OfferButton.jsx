import React from 'react';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OfferButton = ({isSingle, handleClick, text, index}) => {

    const setBackgroundColor = () => {
        switch(index) {
            case 0:
                return '#189FE5'                
            case 1:
                return '#18BC55'
            case 2:
                return '#F79931'
            case 3:
                return '#E54393'
            default:
                return '#189FE5'
        }
    };

    return isSingle ? (
        <Button 
            className='offer__button_single'
            onClick={(e) => handleClick(e)}
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
    ) : (
        <Button 
            className='offer__button_multi'
            onClick={(e) => handleClick(text, e)}
            style={{ backgroundColor: setBackgroundColor() }}
        >
            <div className='button_multi-left'>
                <FontAwesomeIcon
                    icon={['fal', 'chevron-double-right']}
                    className='offer-multi_button-icon'
                />
            </div>
            <div className='button_multi-right'>
                {text}
            </div>                
        </Button>
    )
};

export default OfferButton;