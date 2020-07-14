import React, { useContext } from 'react';
import { AppContext } from '../../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const MoveToOfferButtons = ({ disabledState, termsChecked, toggleError, sendEmail, processClick }) => {
	let history = useHistory();
	const { dispatchApp } = useContext(AppContext);

	const handleEmailSubmit = async() => {
        if(!disabledState) {
            sendEmail();
            processClick();
            history.push('/offers');
            return;
        };
        toggleError(true);
    };

	const handleOptOut = async() => {
        dispatchApp({ type: 'EMAIL_OPT_OUT' });
        processClick();
        history.push('/offers');
        return;
    };
	
	return (
		<div className='email-button-group'>
            <Button className={`email_submit-button ${!termsChecked && 'disabled'}`} variant='contained' color='primary' onClick={handleEmailSubmit} disabled={disabledState}>
                <span className='button-text' >Next</span>
                <FontAwesomeIcon
                    icon={['fal', 'angle-double-right']}
                    className='next-button-icon'
                />
            </Button>
            <Button className='no-thanks' onClick={handleOptOut}>
                No Thanks
            </Button>
        </div>
	);
}

export default MoveToOfferButtons;