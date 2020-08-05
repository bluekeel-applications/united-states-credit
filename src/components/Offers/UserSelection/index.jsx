import React, { useContext, useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { AppContext } from '../../../context';
import Loading from '../../Shared/Loading';
import { useMutation } from '@apollo/react-hooks';
import {
    ADD_USER_EMAIL,
    INSERT_COMMON_INFO,
    INSERT_SEARCH_INFO,
    ADD_QUERY_INSIGHT
} from '../../../utils/mutations';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import QuickLinks from './QuickLinks';
import EmailTerms from './EmailTerms';
import useTrackingLayer from '../../../hooks/useTrackingLayer';
import { firePixelBlueKeel } from '../../../utils/pixels';
import { handleUserSubmit } from './selection-utils';

const UserSelection = () => {
    const { appState, trackingState } = useContext(AppContext);
    useTrackingLayer();
    let history = useHistory();
    const [disabled, setDisabledState] = useState(true);
    const [emailValue] = useState(trackingState.email ? trackingState.email : null);
    const [interest, setInterest] = useState('');
    const [loading, setLoading] = useState(false);
    const hasSent = useRef(false);

    const handleInputChange = (event) => {
        let interestValue = event.target.value;
        setInterest(interestValue);
        if (interestValue !== '') {
            setDisabledState(false);
            return;
        };
        setDisabledState(true);
    };

    const [addUserEmail] = useMutation(ADD_USER_EMAIL);
    const [insertSearchInfo] = useMutation(INSERT_SEARCH_INFO);
    const [insertCommonInfo] = useMutation(INSERT_COMMON_INFO);
    const [addQueryInsight] = useMutation(ADD_QUERY_INSIGHT);

    const processClick = async (link, jump, query) => {
        setLoading(true);
        const commonInsert = {
            'hsid': Number(trackingState.hsid),
            'oid': Number(trackingState.oid),
            'eid': trackingState.eid,
            'sid': Number(trackingState.sid),
            'uid': trackingState.uid,
            'ip_address': trackingState.ip_address,
            'email': emailValue,
            'fname': trackingState.fname,
            'lname': trackingState.lname,
            'address': trackingState.address,
            'city': trackingState.city,
            'state': trackingState.state,
            'zip': trackingState.zip,
        };

        const searchInsert = {
            'hsid': Number(trackingState.hsid),
            'oid': Number(trackingState.oid),
            'eid': trackingState.eid,
            'sid': Number(trackingState.sid),
            'uid': trackingState.uid,
            'ip_address': trackingState.ip_address,
            'query': query
        };

        if (!hasSent.current) {
            firePixelBlueKeel(trackingState.hsid);
            await insertCommonInfo({ variables: { visitor: commonInsert } });
            await insertSearchInfo({ variables: { visitor: searchInsert } });
            await addQueryInsight({ variables: { clickId: Number(trackingState.hsid), query } });
            await addUserEmail({ variables: { clickId: Number(trackingState.hsid), email: emailValue } });
            hasSent.current = true;
            window.open(link);
            if(jump && jump !== 'N/A') {
                window.location.href = jump;
                return;
            };
            history.push('/verticals');
            return;
        };
    };

    if (loading) {
        return <div className='loading-select'><Loading /></div>
    };

    const handleSubmit = (e) => {
        const offer_url = appState.offer.url;
        const offer_jump = appState.offer.jump;
        handleUserSubmit(e, offer_url, offer_jump, processClick, interest, trackingState);
    };

    return (
        <div className='user-selection-container'>
            <div className='email-optin-card'>
                <div className='select-text-title'>What are you interested in?</div>
                <form className='email-form-container' onSubmit={handleSubmit}>
                    <QuickLinks processClick={processClick} setInterest={setInterest}/>
                    <TextField
                        id='search-query-input'
                        label='Search'
                        variant='outlined'
                        InputProps={{
                            autoFocus: false,
                            onChange: handleInputChange,
                            value: interest
                        }}
                        inputProps={{ 'aria-label': 'search-query-input' }}
                        fullWidth
                        className='search-input'
                    />
                    <EmailTerms email={emailValue} />
                    <div className='email-button-group'>
                        <Button className={`email_submit-button ${disabled && 'disabled'}`} variant='contained' color='primary' type='submit' disabled={disabled}>
                            <span className='button-text' >Next</span>
                            <FontAwesomeIcon
                                icon={['fal', 'angle-double-right']}
                                className='next-button-icon'
                            />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default UserSelection;