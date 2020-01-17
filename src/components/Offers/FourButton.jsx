import React, { useContext } from 'react';
import { AppContext } from '../../context';
import OfferButton from '../OfferButton';

const FourButton = () => {
    const { appState } = useContext(AppContext);

    const handleButtonClick = (keywords, e) => {
        e.preventDefault();
        console.log('Button clicked:', keywords);
    };

    const render4ButtonGroup = () => (
        appState.four_button.map((button_text, i) => (
            <OfferButton 
                isSingle={false} 
                text={button_text}
                index={i}
                handleClick={handleButtonClick}
                className={`multi-button-${i}`}
                key={`multi-button-${i}`}
            />
        ))
    );

    return(
        <div className='offer-page__main-multi'>
            <span className='offer-header-text'>
                Multiple sponsored results could be available that suit your needs.
            </span>
            <div className='four-button_group'>
                {render4ButtonGroup()}
            </div>
        </div>
    )
};

export default FourButton;