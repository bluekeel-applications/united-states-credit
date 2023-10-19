import React, { useState, useRef, useEffect, memo } from 'react';
import { GET_OFFER, GET_OFFER_BY_RECORD } from '../../../utils/GraphQL/queries';
import { ADD_SERVICE_LOG, ADD_SERVICE_ENDPOINT_LOG }from '../../../utils/GraphQL/mutations';
import { useLazyQuery, useMutation } from '@apollo/client';
import LoadingSearch from './LoadingSearch';
import EmailCapture from './EmailCapture';
import Lincx from './Lincx';
import OfferPage from './OfferPage';
import { checkCookie } from '../../../utils/helpers';
import { useHistory } from 'react-router-dom';

const UserEnd = ({ onRender, theme, tracking }) => {
    let history = useHistory();
    const [ duplicateUser ] = useState(checkCookie('em_sub'));
    const [ pageView, setPageView ] = useState('email');
    const [ animationPlayed, setAnimationPlayed ] = useState(false);
    const [ isSubmission, setAsSubmission ] = useState(false);
    const [ isRedirect, setAsRedirection ] = useState(tracking['isRedirection']);
    const [ emailValue, setEmailValue ] = useState(tracking['email']);
    const [ offerFound, setStateOffer ] = useState(null);
    const hasFired = useRef(false);
    const hasFetched = useRef(false);

    const checkForDup = (page) => {
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

        if(page === 'selection' && emailValue !== '') {
            console.log('Email opt in handled by selection page...');
            setPageView('offer');
        };
    };

    const handleOfferFound = (data, error) => {
        if(data && !offerFound && !error) {
            const offer = data.fetchOfferFromFlow.body;
            console.log('offer:', offer);
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
            checkForDup(offer['offer_page']);
		};
		if(error) {
			console.error('ERROR fetching Offer:', error);
		};
    };

    const handleRecordFound = (data, error) => {
        if(data && !offerFound && !error) {
            const offer = data.fetchEndpointByRecord.body;
            console.log('record:', offer);
            // if(!hasFired.current) {
            //     addTagToServiceEndpointLog({ 
            //         variables: {
            //             service_endpoint: {
            //                 domain_key: offer.domain_key, 
            //                 record_name: tracking.record, 
            //                 endpoint_id: offer.id, 
            //                 clickId: Number(tracking['hsid'])
            //             }
            //         }
            //     });
            // };
            // setStateOffer(offer);
            // checkForDup(offer['offer_page']);
		};
		if(error) {
			console.error('ERROR fetching Record:', error);
		};
    };

    const [getOffer, { loading }] = useLazyQuery(GET_OFFER, {
        variables: {
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
        },
        skip: offerFound || tracking['vertical'] === 'lincx',
        onCompleted: handleOfferFound
    });

    const [getOfferFromRecord, { loadingRecord }] = useLazyQuery(GET_OFFER_BY_RECORD, {
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

    const [ addTagToServiceEndpointLog ] = useMutation(ADD_SERVICE_ENDPOINT_LOG, {
        onCompleted: (data) => {
            hasFired.current = true;
            console.log(data.addServiceEndpointLog.message);
        },
        onError: (error) => console.log(error)
    });

    useEffect(() => {
        if(!hasFetched.current) {
            console.log('Fetching offer...');
            hasFetched.current = true;
            if(!!tracking['record']) {
                console.log('...from Record');
                getOfferFromRecord();
                return;
            } ;
            if(!!tracking['loan_type']) {
                console.log('...from Flow');
                getOffer();
            };
        };
        // eslint-disable-next-line
    },[tracking['record'], tracking['loan_type'], hasFetched.current]);
    
    useEffect(() => {
        if(!tracking['record'] && !tracking['loan_type']) {
            console.log('No offer variables - going to start');
            history.push('/');
        };
        // eslint-disable-next-line
    },[tracking['record'], tracking['loan_type']]);

    if(loading || loadingRecord || !animationPlayed) {
        return  <LoadingSearch onComplete={() => setAnimationPlayed(true)} />;
    };
    
    if(tracking.vertical === 'lincx') {
        return <Lincx tracking={tracking} email={emailValue} />;
    };

    return (null
        // <>
        //     {pageView === 'email' && 
        //         <EmailCapture 
        //             email={emailValue}
        //             setEmail={setEmailValue}
        //             setPage={setPageView}
        //             setSubmission={setAsSubmission}
        //             theme={theme}
        //         />
        //     }
        //     {pageView === 'offer' && 
        //         <OfferPage
        //             email={emailValue} 
        //             offer={offerFound}
        //             tracking={tracking}
        //             isSubmission={isSubmission}
        //             isRedirect={isRedirect}
        //             theme={theme}
        //             onRender={onRender}
        //         />
        //     }
        // </>
    )
};

export default memo(UserEnd);