import React, { useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { AppContext } from '../../../context';
import Loading from '../../Shared/Loading';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER_EMAIL, INSERT_SEARCH_INFO, ADD_QUERY_INSIGHT, ADD_USER_FLOW, INSERT_COMMON_INFO } from '../../../utils/mutations';
import { firePixelBlueKeel } from '../../../utils/pixels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import QuickLinks from './QuickLinks';
import EmailTerms from './EmailTerms';
import { flattenLongString, capitalizeValue, buildQueryLink } from '../../../utils/helpers';
import { useHistory } from 'react-router-dom';

const UserSelection = () => {
    let history = useHistory();
    const { appState, trackingState } = useContext(AppContext);
    const [ disabled, setDisabledState ] = useState(true);
    const [ emailValue ] = useState(trackingState.email ? trackingState.email : '');
    const [ interest, setInterest ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [addUserFlow] = useMutation(ADD_USER_FLOW);
    const [insertCommonInfo] = useMutation(INSERT_COMMON_INFO);
    const [insertSearchInfo] = useMutation(INSERT_SEARCH_INFO);
    const [addQueryInsight] = useMutation(ADD_QUERY_INSIGHT);
    const [addUserEmail] = useMutation(ADD_USER_EMAIL);

    const handleInputChange = (event) => {
        let interestValue = event.target.value;
        const query = flattenLongString(interestValue);
        setInterest(query);
        if (interestValue !== '') {
            setDisabledState(false);
            return;
        };
        setDisabledState(true);
    };

    if (loading) {
        return <div className='loading-select'><Loading /></div>
    };

    const handleSubmit = async( e, quick_link = {} ) => {
        e.preventDefault();
        setLoading(true);
        const { 
            hsid, pid, oid, eid, sid, uid, 
            email, ip_address,
            fname, lname, address, city, state, zip
        } = trackingState;
        const query = quick_link.text ? quick_link.text : interest;
        const offer_url = quick_link.url ? quick_link.url : appState.offer.url;
        const offer_jump = quick_link.jump && quick_link.jump !== 'N/A' ? quick_link.jump : appState.offer.jump;
    
        addUserEmail({
            variables: {
                clickId: Number(hsid),
                email: email
            }
        });

        insertSearchInfo({
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
        })
        addQueryInsight({ variables: { clickId: Number(hsid), query } })
        firePixelBlueKeel(hsid)
        // firePixelBing(appState.flowState.vertical);
        // firePixelGoogle();
        insertCommonInfo({
            variables: {
                visitor: {
                    'hsid': Number(hsid),
                    'oid': Number(oid),
                    'eid': eid,
                    'sid': Number(sid),
                    'uid': uid,
                    'ip_address': ip_address,
                    'email': email || appState.email || appState.pch.email || '',
                    'fname': fname,
                    'lname': lname,
                    'address': address,
                    'city': city,
                    'state': state,
                    'zip': zip,
                }
            }
        })
        addUserFlow({
            variables: {
                clickId: Number(hsid),
                flow: {
                    'pid': Number(pid),
                    'vertical': appState.flowState.vertical,
                    'loan_type': appState.flowState.loan_type,
                    'debt_type': appState.flowState.debt_type,
                    'debt_amount': appState.flowState.debt_amount
                }
            }
        })

        setLoading(false);
        const linkout = buildQueryLink(offer_url, sid, eid, hsid, email, appState.pch, query);
        window.open(linkout);
        if (offer_jump && offer_jump !== 'N/A') {
            const jumpBehind = buildQueryLink(offer_jump, sid, eid, hsid, email, appState.pch, query);
            window.location.href = jumpBehind;
        } else {
            history.push('/verticals');
        };
    };
    
    const handleClickSubmit = async(e, value) => {
        setInterest(value.text);
        handleSubmit(e, value);
    };

    return (
        <div className='user-selection-container'>
            <div className='email-optin-card'>
                <div className='select-text-title'>What are you interested in?</div>
                <form className='email-form-container' onSubmit={(e) => handleSubmit(e)}>
                    <QuickLinks quickLinkClick={handleClickSubmit}/>
                    <TextField
                        id='search-query-input'
                        label='Search'
                        variant='outlined'
                        InputProps={{
                            autoFocus: false,
                            onChange: handleInputChange,
                            value: capitalizeValue(interest)
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