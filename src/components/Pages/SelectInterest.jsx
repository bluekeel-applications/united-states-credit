import React, { useContext, useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { AppContext } from '../../context';
import Loading from '../Shared/Loading';
import FlowPage from '../Layout/FlowPage';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER_EMAIL, INSERT_COMMON_INFO, INSERT_SEARCH_INFO } from '../../utils/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import CloseFlow from '../Shared/CloseFlow';
import useTrackingLayer from '../../hooks/useTrackingLayer';
import { firePixelBlueKeel } from '../../utils/pixels';

const quickLinks1 = [
    'Free Coupons',
    'Free Home Security',
    'Free Insurance Quotes',
    'Unclaimed Money',
    'Online Gaming',
    'Buy Now Pay Later'
];
const quickLinks2 = [
    'Jobs for Seniors',
    'Online Education',
    'Work From Home',
    'All-Inclusive Vacations',
    'Luxury SUVs',
    'Diet & Nurition'
];

const SelectInterest = () => {
    const { trackingState, appState } = useContext(AppContext);
    useTrackingLayer();
    const [ disabled, setDisabledState ] = useState(true);
    const [ emailValue ] = useState(trackingState.email ? trackingState.email : null);
    const [ interest, setInterest ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const hasSent = useRef(false);

    const handleInputChange = (event) => {
        let interestValue = event.target.value;
        setInterest(interestValue);
        if(interestValue !== '') {
            setDisabledState(false);
            return;
        };
        setDisabledState(true);
    };

    const [addUserEmail] = useMutation(ADD_USER_EMAIL);
    const [insertSearchInfo] = useMutation(INSERT_SEARCH_INFO);
    const [insertCommonInfo] = useMutation(INSERT_COMMON_INFO);

    const processClick = async (link, query) => {
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
            await addUserEmail({ variables: { clickId: Number(trackingState.hsid), email: emailValue } });
            // Common info may be an overlap if 
            hasSent.current = true;
            window.location.href = link;
        };
    };
                
    const handleQuickLink = (e, value) => {
        e.preventDefault();
        setInterest(value); // eslint-disable-next-line
        let linkout = 'https://www.bkoffers.com/hitstreet/redirect_tp.cfm?oid=19&sid=9292&pid=3235&eid=${sid}&uid=${eid}&kwd=${kwd}&subid2=${hsid}'; // eslint-disable-next-line
        linkout = linkout.replace('${sid}', trackingState.sid); // eslint-disable-next-line
        linkout = linkout.replace('${eid}', trackingState.eid); // eslint-disable-next-line
        let keyword = encodeURIComponent(value); // eslint-disable-next-line
        linkout = linkout.replace('${kwd}', keyword); // eslint-disable-next-line
        linkout = linkout.replace('${hsid}', trackingState.hsid);
        processClick(linkout, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // eslint-disable-next-line
        let linkout = 'https://www.bkoffers.com/hitstreet/redirect_tp.cfm?oid=19&sid=9292&pid=3235&eid=${sid}&uid=${eid}&kwd=${kwd}&subid2=${hsid}'; // eslint-disable-next-line
        linkout = linkout.replace('${sid}', trackingState.sid); // eslint-disable-next-line
        linkout = linkout.replace('${eid}', trackingState.eid); // eslint-disable-next-line
        let keyword = encodeURIComponent(interest); // eslint-disable-next-line
        linkout = linkout.replace('${kwd}', keyword); // eslint-disable-next-line
        linkout = linkout.replace('${hsid}', trackingState.hsid);
        processClick(linkout, interest);
    };

    const QuickLink = ({text}) => {
        return (
            <div className='quick-link' onClick={(e) => handleQuickLink(e, text)}>
                {/* eslint-disable-next-line */}
                <u>{text}</u>
            </div>
        )
    };

    if(loading) {
        return <div className='loading-select'><Loading /></div>
    };

    return (
        <FlowPage showCrumbs={appState.showStory}>
            <div className={`${appState.showExpansion || !appState.showStory ? 'padded-top' : ''} email-content flow-content`}>
                {!appState.showExpansion && <CloseFlow />}
                <div className='email-optin-container'>
                    <div className='email-optin-card'>
                        <div className='select-text-title'>What are you interested in?</div>
                        <form className='email-form-container' onSubmit={handleSubmit}>
                            <TextField
                                id='email-optin-input'
                                label='Search'
                                variant='outlined'
                                InputProps={{
                                    autoFocus: true,
                                    onChange: handleInputChange,
                                    value: interest
                                }}
                                inputProps={{ 'aria-label': 'email-optin-input' }}
                                fullWidth
                            />
                            <div className='quick-links-title'>Quick Links</div>
                            <div className='quick-links'>
                                <div className='quick-links-left'>
                                    {quickLinks1.map((text, idx) => (<QuickLink key={`${idx}`} text={text} />))}
                                </div>
                                <div className='quick-links-right'>
                                    {quickLinks2.map((text, idx) => (<QuickLink key={`${idx}`} text={text} />))}
                                </div>
                            </div>
                            <div className='email-terms-container'>
                                <div className='email_terms_text'>
                                    {`By clicking “Next” button below or any of the links above, I agree with the `}
                                    <a className='email_terms_links' href='https://unitedstatescredit.com/privacy' rel='noopener noreferrer' target='_blank'>
                                    Privacy Policy
                                    </a>
                                    {` and `} 
                                    <a className='email_terms_links' href='https://unitedstatescredit.com/terms' rel='noopener noreferrer' target='_blank'>
                                    Terms &amp; Conditions</a>.
                                    {` In addition, I consent to receive emails ${emailValue ? `to ${emailValue}`: ''}
                                    in accordance with the `}
                                    <a className='email_terms_links' href='https://unitedstatescredit.com/privacy' rel='noopener noreferrer' target='_blank'>
                                    Privacy Policy
                                    </a>.
                                </div>
                            </div>
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
            </div>
        </FlowPage>
    )
};

export default SelectInterest;