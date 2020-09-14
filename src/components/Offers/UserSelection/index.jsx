import React, { useContext, useState, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { AppContext } from '../../../context';
import Loading from '../../Shared/Loading';
import { useMutation } from '@apollo/react-hooks';
import useCommonInsert from '../../../hooks/useCommonInsert';

import { 
    ADD_USER_EMAIL, 
    INSERT_SEARCH_INFO, 
    ADD_QUERY_INSIGHT, 
    ADD_USER_FLOW
} from '../../../utils/mutations';
import { firePixelBlueKeel } from '../../../utils/pixels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import QuickLinks from './QuickLinks';
import EmailTerms from './EmailTerms';
import { flattenLongString, capitalizeValue, buildQueryLink, checkCookie } from '../../../utils/helpers';
import { useHistory } from 'react-router-dom';

const UserSelection = () => {
    let history = useHistory();
    const { appState, trackingState } = useContext(AppContext);
    const [ disabled, setDisabledState ] = useState(true);
    const [ emailValue ] = useState(trackingState.email ? trackingState.email : '');
    const [ interest, setInterest ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ readyToMove, setReadyToMove ] = useState(false);
    const [ quickLink, setQuickLink ] = useState(null);
    const [addUserFlow] = useMutation(ADD_USER_FLOW);
    const [insertSearchInfo] = useMutation(INSERT_SEARCH_INFO);
    const [addQueryInsight] = useMutation(ADD_QUERY_INSIGHT);
    const [addUserEmail] = useMutation(ADD_USER_EMAIL);
    
    const shouldExecute = useRef(false);
    const { commonInfoError, commonInfoResult } = useCommonInsert(shouldExecute.current);

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

    const redirectUser = () => {
        const query = quickLink && quickLink.text ? 
                        quickLink.text : interest;

        const offer_url = quickLink && quickLink.url ? 
                            quickLink.url : appState.offer.url;

        const offer_jump = quickLink && quickLink.jump ? 
                            quickLink.jump : appState.offer.jump;

        const linkout = buildQueryLink(
            offer_url, 
            trackingState.sid, 
            trackingState.eid, 
            trackingState.hsid, 
            trackingState.email, 
            appState.pch, 
            query
        );
        window.open(linkout);
        if (offer_jump && offer_jump !== 'N/A') {
            const jumpBehind = buildQueryLink(
                offer_jump, 
                trackingState.sid, 
                trackingState.eid, 
                trackingState.hsid, 
                trackingState.email, 
                appState.pch, 
                query
            );
            window.location.href = jumpBehind;
        } else {
            history.push('/verticals');
        };
    };

    useEffect(() => {
        if (commonInfoResult) {
            setReadyToMove(true);
        };
        // eslint-disable-next-line
    }, [commonInfoResult]);

    useEffect(() => {
        if (loading && readyToMove) {
            setLoading(false);
            redirectUser();
        };
        // eslint-disable-next-line
    }, [readyToMove, loading]);

    const handleSubmit = async( e ) => {
        e.preventDefault();
        setLoading(true);
        shouldExecute.current = true;
        const query = quickLink && quickLink.text ? quickLink.text : interest;
        const isDuplicateEmail = checkCookie('em_sub');
        addUserEmail({
            variables: {
                clickId: Number(trackingState.hsid),
                email: trackingState.email
            },
            skip: isDuplicateEmail
        });

        insertSearchInfo({
            variables: {
                visitor: {
                    'hsid': Number(trackingState.hsid),
                    'oid': Number(trackingState.oid),
                    'eid': trackingState.eid,
                    'sid': Number(trackingState.sid),
                    'uid': trackingState.uid,
                    'ip_address': trackingState.ip_address,
                    'query': query
                }
            }
        });
        addQueryInsight({ variables: { clickId: Number(trackingState.hsid), query } });
        firePixelBlueKeel(trackingState.hsid);
        // firePixelBing(appState.flowState.vertical);
        // firePixelGoogle();
        addUserFlow({
            variables: {
                clickId: Number(trackingState.hsid),
                flow: {
                    'pid': Number(trackingState.pid),
                    'vertical': appState.flowState.vertical,
                    'loan_type': appState.flowState.loan_type,
                    'debt_type': appState.flowState.debt_type,
                    'debt_amount': appState.flowState.debt_amount
                }
            }
        });
    };

    const handleClickSubmit = async(e, value) => {
        setInterest(value.text);
        setQuickLink(value);
        handleSubmit(e);
    };

    if (loading) {
        return <div className='loading-select'><Loading /></div>
    };

    if(commonInfoError) {
        return <div className='loading-select'>{commonInfoError}</div>
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