import React from 'react';
import { flattenLongString } from '../../utils/helpers';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FourButton = ({ offer }) => {

    const handleOfferClick = (keywords, e) => {
        e.preventDefault();
        console.log('keyword click:', flattenLongString(keywords));
    };

    const RenderIcon = () => (
        <FontAwesomeIcon
            icon={['fal', 'chevron-double-right']}
            className='4_button-icon'
        />
    );

    const test = ['1', '2', '3', '4'];
    const render4ButtonGroup = () => (
        <div className='4-button-group'>
            {test.map((button_text, idx) => (
                <Button
                    onClick={handleOfferClick} 
                    variant='contained' 
                    className={`4_button-item button-bg__${idx}`}
                    key={`4_button-item-${idx}`}
                    startIcon={<RenderIcon />}
                    size='large'
                >
                    {button_text}
                </Button>
            ))}
        </div>
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