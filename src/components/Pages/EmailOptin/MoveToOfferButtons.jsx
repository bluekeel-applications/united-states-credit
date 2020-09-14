import React, { useContext } from 'react';
import { AppContext } from '../../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER_EMAIL, INSERT_COMMON_INFO } from '../../../utils/mutations';
import { setCookie } from '../../../utils/helpers';

const MoveToOfferButtons = ({ disabledState, email }) => {
    let history = useHistory();
    const { trackingState, dispatchTracking, dispatchApp } = useContext(AppContext);
    const [ addUserEmail ] = useMutation(ADD_USER_EMAIL);
    const [ insertCommonInfo ] = useMutation(INSERT_COMMON_INFO);

    const sendEmail = async() => {
        dispatchTracking({ type: 'SET_EMAIL', payload: email });
        dispatchApp({ type: 'SET_EMAIL', payload: email });
        dispatchApp({ type: 'EMAIL_OPT_IN' });
        setCookie('em_sub', email, 30);
        addUserEmail({
            variables: {
                clickId: Number(trackingState.hsid),
                email: email
            }
        });
        insertCommonInfo({
            variables: {
                visitor: {
                    'hsid': Number(trackingState.hsid),
                    'oid': Number(trackingState.oid),
                    'eid': trackingState.eid,
                    'sid': Number(trackingState.sid),
                    'uid': trackingState.uid,
                    'ip_address': trackingState.ip_address,
                    'email': email,
                    'fname': trackingState.fname,
                    'lname': trackingState.lname,
                    'address': trackingState.address,
                    'city': trackingState.city,
                    'state': trackingState.state,
                    'zip': trackingState.zip,
                }
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