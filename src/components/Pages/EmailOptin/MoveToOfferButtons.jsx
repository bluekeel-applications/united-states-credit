import React, { useContext } from 'react';
import { AppContext } from '../../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER_EMAIL } from '../../../utils/mutations';

const MoveToOfferButtons = ({ disabledState, email }) => {
    let history = useHistory();
    const { trackingState, dispatchTracking, dispatchApp } = useContext(AppContext);
    const [ addUserEmail ] = useMutation(ADD_USER_EMAIL);

    const sendEmail = async() => {
        dispatchTracking({ type: 'SET_EMAIL', payload: email });
        dispatchApp({ type: 'SET_EMAIL', payload: email });
        addUserEmail({
            variables: {
                clickId: Number(trackingState.hsid),
                email: email
            }
        });
    };

    const handleSubmitClick = () => {
        sendEmail();
        history.push('/offers');
        return;
    };

    const handleOptOutClick = () => {
        history.push('/offers');
        return;
    };

    return (
        <div className='email-button-group'>
            <Button
                className='email_submit-button'
                variant='contained' color='primary'
                onClick={handleSubmitClick}
                disabled={disabledState}
            >
                <span className='button-text' >Next</span>
                <FontAwesomeIcon
                    icon={['fal', 'angle-double-right']}
                    className='next-button-icon'
                />
            </Button>
            <Button className='no-thanks' onClick={handleOptOutClick}>
                No Thanks
			</Button>
        </div>
    );
}

export default MoveToOfferButtons;