import React, { useEffect, useContext, useState, useRef } from 'react';
import { AppContext } from '../../../context';
import { useLazyQuery, useMutation } from '@apollo/client';
import { FETCH_ARTICLE_BY_KEY } from '../../../utils/GraphQL/queries';
import { ADD_USER_EMAIL } from '../../../utils/GraphQL/mutations';
import Loading from '../../Shared/Loading';
import ActivePage from './ActivePage';

const AdArticle = () => {
    const emailSent = useRef(false);
    const { trackingState, dispatchApp } = useContext(AppContext);
    const [ pageReady, setPageReady ] = useState(false);

    // Since there is no "end" click, post email to mongo for use later with search_track url param
    const [ addUserEmail ] = useMutation(ADD_USER_EMAIL, { 
        onCompleted: (data) => {
            const submittedEmail = data.addUserEmail.body.email
            console.log('Email posted to Mongo:', submittedEmail);
        }
    });

    const postEmailToMongo = () => {
        const sendEmail = trackingState['email'] === '' ? 'missing' : trackingState['email'];
        console.log('Sending email to Mongo:', sendEmail);
        addUserEmail({
            variables: {
                clickId: Number(trackingState['hsid']),
                email: sendEmail
            }
        });
    };
    
    useEffect(() => {
        if(!emailSent.current) {
            postEmailToMongo();
            emailSent.current = true;
        };
        // eslint-disable-next-line
    },[emailSent.current]);

    const handleInboundData = (data) => {
        dispatchApp({ type: 'SET_SYSTEM_1', payload: data.fetchArticleByKey.body });
        setPageReady(true);
    };

    const [fetchArticle, { called, loading }] = useLazyQuery(
        FETCH_ARTICLE_BY_KEY, { 
            variables: { key: trackingState.article },
            errorPolicy: 'ignore',
            onCompleted: handleInboundData
        }
    );


    useEffect(() => {
        if(called || pageReady) {
            return;
        };
        fetchArticle();
// eslint-disable-next-line
    },[pageReady]);

    if (loading || !pageReady) return <Loading/>;

    return <ActivePage/>;
};

export default AdArticle;