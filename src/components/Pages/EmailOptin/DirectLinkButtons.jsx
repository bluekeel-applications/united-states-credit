import React, { useContext } from 'react';
import { AppContext } from '../../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import { buildFullLink } from '../../../utils/helpers';
import { useHistory } from 'react-router-dom';

const DirectLinkButtons = ({ disabledState, termsChecked, toggleError, offer, sendEmail, processClick }) => {
	let history = useHistory();
	const { trackingState, dispatchApp, appState } = useContext(AppContext);

	const handleDirectLink = () => {
        const newWindowLink = buildFullLink(offer.url, trackingState.sid, trackingState.eid, trackingState.hsid, appState.pch);
        if(!disabledState) {
			window.open(newWindowLink);
			dispatchApp({ type: 'EMAIL_OPT_IN' });
            sendEmail();
            processClick();
            if(offer && offer.jump !== 'N/A') {
                window.location.href = buildFullLink(offer.jump, trackingState.sid, trackingState.eid, trackingState.hsid, appState.pch);
                return;
            };
            history.push('/verticals');
            return;
        };
        toggleError(true);
    };

	const handleOptOutDirectLink = () => {
        dispatchApp({ type: 'EMAIL_OPT_OUT' });
        const newWindowLink = buildFullLink(offer.url, trackingState.sid, trackingState.eid, trackingState.hsid, appState.pch);
        window.open(newWindowLink);
        processClick();
        if(offer && offer.jump !== 'N/A') {
            window.location.href = buildFullLink(offer.jump, trackingState.sid, trackingState.eid, trackingState.hsid, appState.pch);
            return;
        };
        history.push('/verticals');
        return;
	};
	
	return (
		<div className='email-button-group'>
			<Button className={`email_submit-button ${!termsChecked && 'disabled'}`} variant='contained' color='primary' onClick={handleDirectLink} disabled={disabledState}>
				<span className='button-text' >Next</span>
				<FontAwesomeIcon
					icon={['fal', 'angle-double-right']}
					className='next-button-icon'
				/>
			</Button>
			<Button className='no-thanks' onClick={handleOptOutDirectLink}>
				No Thanks
			</Button>
		</div>
	);
}

export default DirectLinkButtons;