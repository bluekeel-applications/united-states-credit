import React, { useState, useRef } from 'react';
import { GET_OFFER, GET_OFFER_BY_RECORD } from '../../../utils/GraphQL/queries';
import { ADD_SERVICE_LOG }from '../../../utils/GraphQL/mutations';
import { useQuery, useMutation } from '@apollo/client';
import LoadingSearch from './LoadingSearch';
import EmailCapture from './EmailCapture';
import Lincx from './Lincx';
import OfferPage from './OfferPage';
import { checkCookie } from '@bit/bluekeel.controllers.helpers';

const UserEnd = ({ theme, tracking }) => {
    const [ duplicateUser ] = useState(checkCookie('em_sub'));
    const [ pageView, setPageView ] = useState('email');
    const [ animationPlayed, setAnimationPlayed ] = useState(false);
    const [ isSubmission, setAsSubmission ] = useState(false);
    const [ isRedirect, setAsRedirection ] = useState(tracking['isRedirection']);
    const [ emailValue, setEmailValue ] = useState(tracking['email']);
    const [ offerFound, setStateOffer ] = useState(null);
    const hasFired = useRef(false);
    const queryVariables = {
        queryData: {
            pid: Number(tracking['pid']), 
            vertical: tracking['vertical'], 
            loan_type: tracking['loan_type'], 
            debt_type: tracking['debt_type'], 
            debt_amount: tracking['debt_amount'],
            debt_optin: tracking['debt_optin'],
            checking_optin: tracking['checking_optin'] 
        },
        user: { location: tracking['location'], clickId: Number(tracking['hsid']) }
    };

    const handleOfferFound = (data, error) => {
        if(data && !offerFound) {
            const offer = data.fetchOfferFromFlow.body;
            console.log('offer1:', offer);
            if(!hasFired.current) {
                addTagToServiceLog({ 
                    variables: {
                        service: {
                            program_id: offer['program_id'],
                            group_id: offer['group_id'],
                            offer_id: offer['id'],
                            clickId: Number(tracking['hsid'])
                        }
                    }
                });
            };
            setStateOffer(offer);
            if(duplicateUser && !isSubmission) {
                console.log('Duplicate User...sending to offer');
                // Because there has not been a click event yet...
                setAsRedirection(true);
                setPageView('offer');
            };

            if(tracking['email'] === 'omit') {
                console.log('Omitting email optin...sending to offer page');
                setEmailValue('');
                setPageView('offer');
            };

            if(offer['offer_page'] === 'selection' && emailValue !== '') {
                console.log('Email opt in handled by selection page...');
                setPageView('offer');
            };
		};
		if(error) {
			console.error('ERROR fetching Offer:', error);
		};
    };

    const handleRecordFound = (data, error) => {
        if(data && !offerFound) {
            const offer = data.fetchOfferFromFlow.body;
            console.log('offer1:', offer);
            if(!hasFired.current) {
                addTagToServiceLog({ 
                    variables: {
                        service: {
                            program_id: offer['program_id'],
                            group_id: offer['group_id'],
                            offer_id: offer['id'],
                            clickId: Number(tracking['hsid'])
                        }
                    }
                });
            };
            setStateOffer(offer);
            if(duplicateUser && !isSubmission) {
                console.log('Duplicate User...sending to offer');
                // Because there has not been a click event yet...
                setAsRedirection(true);
                setPageView('offer');
            };

            if(tracking['email'] === 'omit') {
                console.log('Omitting email optin...sending to offer page');
                setEmailValue('');
                setPageView('offer');
            };

            if(offer['offer_page'] === 'selection' && emailValue !== '') {
                console.log('Email opt in handled by selection page...');
                setPageView('offer');
            };
		};
		if(error) {
			console.error('ERROR fetching Offer:', error);
		};
    };

    const { loading } = useQuery(GET_OFFER, {
        variables: queryVariables,
        skip: offerFound || tracking['vertical'] === 'lincx' || !!tracking['record'],
        onCompleted: handleOfferFound
    });

    const { loadingRecord } = useQuery(GET_OFFER_BY_RECORD, {
        variables: {
            pid: Number(tracking['pid']), 
            name: tracking['record']
        },
        skip: offerFound || !tracking['record'],
        onCompleted: handleRecordFound
    });

    const [ addTagToServiceLog ] = useMutation(ADD_SERVICE_LOG, {
        onCompleted: (data) => {
            hasFired.current = true;
            console.log(data.addServiceLog.message);
        },
        onError: (error) => console.log(error)
    });

    if(loading || loadingRecord || !animationPlayed) {
        return  <LoadingSearch onComplete={() => setAnimationPlayed(true)} />;
    };
    
    if(tracking.vertical === 'lincx') {
        return <Lincx tracking={tracking} email={emailValue} />;
    };

    return (
        <>
            {pageView === 'email' && 
                <EmailCapture 
                    email={emailValue}
                    setEmail={setEmailValue}
                    setPage={setPageView}
                    setSubmission={setAsSubmission}
                    theme={theme}
                />
            }
            {pageView === 'offer' && 
                <OfferPage
                    email={emailValue} 
                    offer={offerFound}
                    tracking={tracking}
                    isSubmission={isSubmission}
                    isRedirect={isRedirect}
                    theme={theme}
                />
            }
        </>
    )
};

export default UserEnd;