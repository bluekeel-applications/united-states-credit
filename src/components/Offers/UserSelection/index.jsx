import React, { useContext, useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { AppContext } from '../../../context';
import Loading from '../../Shared/Loading';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER_EMAIL, INSERT_SEARCH_INFO, ADD_QUERY_INSIGHT } from '../../../utils/mutations';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import QuickLinks from './QuickLinks';
import EmailTerms from './EmailTerms';
import { flattenLongString, buildQueryLink } from '../../../utils/helpers';

const UserSelection = () => {
    let history = useHistory();
    const { appState, trackingState } = useContext(AppContext);
    const [ disabled, setDisabledState ] = useState(true);
    const [ emailValue ] = useState(trackingState.email ? trackingState.email : '');
    const [ interest, setInterest ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const hasSent = useRef(false);

    const [insertSearchInfo] = useMutation(INSERT_SEARCH_INFO);
    const [addQueryInsight] = useMutation(ADD_QUERY_INSIGHT);
    const [addUserEmail] = useMutation(ADD_USER_EMAIL);

    const handleInputChange = (event) => {
        let interestValue = event.target.value;
        setInterest(interestValue);
        if (interestValue !== '') {
            setDisabledState(false);
            return;
        };
        setDisabledState(true);
    };

    if (loading) {
        return <div className='loading-select'><Loading /></div>
    };

    const captureEmail = () => {
        addUserEmail({
            variables: {
                clickId: Number(trackingState.hsid),
                email: emailValue
            }
        });
    };

    const handleSubmit = async( quick_link = {} ) => {
        const { hsid, oid, eid, sid, uid, ip_address } = trackingState;
        const { url, jump } = quick_link;
        const offer_url = url ? url : appState.offer.url;
        const offer_jump = jump && jump !== 'N/A' ? jump : appState.offer.jump;
        const query = flattenLongString(interest);
        
        if (!hasSent.current) {
            setLoading(true);
            hasSent.current = true;
            captureEmail();
            await insertSearchInfo({
                variables: {
                    visitor: {
                        'hsid': Number(hsid),
                        'oid': Number(oid),
                        'eid': eid,
                        'sid': Number(sid),
                        'uid': uid,
                        'ip_address': ip_address,
                        'query': query
                    }
                }
            });

            await addQueryInsight({ variables: { clickId: Number(hsid), query } });
            window.open(buildQueryLink(offer_url, sid, eid, hsid, emailValue, appState.pch, query));

            if (offer_jump && offer_jump !== 'N/A') {
                window.location.href = buildQueryLink(offer_jump, sid, eid, hsid, emailValue, appState.pch, query);
                return;
            };
            history.push('/verticals');
            return;
        };
    };

    return (
        <div className='user-selection-container'>
            <div className='email-optin-card'>
                <div className='select-text-title'>What are you interested in?</div>
                <form className='email-form-container' onSubmit={handleSubmit}>
                    <QuickLinks quickLinkClick={handleSubmit} setInterest={setInterest}/>
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