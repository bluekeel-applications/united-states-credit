import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { flattenLongString } from '../../utils/helpers';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { buildFullLink } from '../../utils/helpers';
import { useHistory } from 'react-router-dom';

const FourButton = ({ offer }) => {
    let history = useHistory();
    const { trackingState } = useContext(AppContext);

    const handleOfferClick = (keywords, e) => {
        e.preventDefault();
        const { sid, eid, hsid } = trackingState;
        const flat_keywords = flattenLongString(keywords);
        let builtLink = buildFullLink(offer.url, sid, eid, hsid);
        builtLink = builtLink + '&kwd=' + flat_keywords
        window.open(builtLink);
        if(offer && offer.jump !== 'N/A') {
            window.location.href = buildFullLink(offer.jump, sid, eid, hsid);
            return;
        };
        history.push('/verticals');
        return;
    };

    const RenderIcon = () => (
        <div className='button-icon-container'>
            <FontAwesomeIcon
                icon={['fal', 'chevron-double-right']}
                className='4_button-icon'
            />
        </div>
    );

    const RenderInnerButton = ({ text, idx }) => (
        <div className={`four_button-item button-bg__${idx}`}>
            <RenderIcon />
            <div className='button-text-container'>{text}</div>
        </div>
    );

    const render4ButtonGroup = () => (
        <div className='4-button-group'>
            {offer.four_button.map((button_text, idx) => (
                <Button
                    className='button-wrapper'
                    onClick={(e) => handleOfferClick(button_text, e)} 
                    variant='contained' 
                    key={`four_button-item-${idx}`}
                >
                    <RenderInnerButton text={button_text} idx={idx}/>
                </Button>
            ))}
        </div>
    );

    return(
        <div className='four-button'>
            <div className='offer-page__main-multi'>
                <span className='offer-header-text'>
                    Multiple sponsored results could be available that suit your needs.
                </span>
                <span className='offer-sponsored-text'>View Sponsored Offers</span>
                <div className='four-button_group'>
                    {render4ButtonGroup()}
                </div>
            </div>
        </div>
    )
};

export default FourButton;