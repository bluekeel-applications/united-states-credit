import React, { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from '../../../context';
import styles from './System1.css';
import LoanArticle from './Articles/LoanArticle';
import CreditCardTitle from './Articles/CreditCardArticle';
import { useMediaQuery } from 'react-responsive';
import Loading from '../../Shared/Loading';
import { useMutation } from '@apollo/react-hooks';
import ADD_LOAD_TIME from './ADD_LOAD_TIME';
import axios from 'axios';

const LegalTerms = ({email}) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const legalStyle = Object.assign({},
        styles.legalTerms,
        isMobile && styles.legalTermsMobile
    );

    return (
        <div style={legalStyle}>
            <div style={styles.termsText}>
                {`By clicking any of the links above, I agree with the `}
                <a 
                    key='terms-privacy-policy-1'
                    style={styles.termsLink}
                    href='https://unitedstatescredit.com/privacy' 
                    rel='noopener noreferrer' 
                    target='_blank'
                >
                    Privacy Policy
                </a>
                {` and `}
                <a 
                    key='terms-policy'
                    style={styles.termsLink} 
                    href='https://unitedstatescredit.com/terms' 
                    rel='noopener noreferrer' 
                    target='_blank'
                >
                    Terms &amp; Conditions</a>.
                    {` In addition, I consent to receive emails ${email && email !== 'omit' ? `to ${email}` : ''}
                    in accordance with the `}
                <a 
                    key='terms-privacy-policy-2'
                    style={styles.termsLink} 
                    href='https://unitedstatescredit.com/privacy' 
                    rel='noopener noreferrer' 
                    target='_blank'
                >
                    Privacy Policy
                </a>.
            </div>
        </div>
    );
}

const handleFormSubmit = () => {
    console.log('Clicked on a button!')
};

const System1 = () => {
    const start = useRef(new Date());
    const end = useRef(null);
    const timerDone = useRef(false);
    const [ ip, setIP ] = useState('');
    const [ isLoading, setLoading ] = useState(true);
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const { trackingState } = useContext(AppContext);

    const cardStyle = Object.assign({},
        styles.formCard,
        isMobile && styles.formCardMobile
    );
    const titleStyle = Object.assign({},
        styles.titleText,
        isMobile && styles.titleTextMobile
    );

    const [ addLoadTime ] = useMutation(ADD_LOAD_TIME, { 
		onCompleted: (data) => console.log(data.addLoadTime.message) 
	});

    const getIpData = async () => {
        const res = await axios.get('https://api.ipify.org/?format=json');
        setIP(res.data.ip);
    };
    
    useEffect(() => {
    //passing getData method to the lifecycle method
        getIpData();
    }, []);

    useEffect(() => {
        window.fbq('init', '531202445442265');
        // window.fbq('track', 'Search', {
        //     value: 0.00,
        //     currency: 'USD'
        // });
        
        console.log('Initialized FB Pixel');
    },[]);

    const DEFAULT_OPTIONS = {
        config: { 
            attributes: true, 
            childList: true, 
            subtree: false 
        },
    };
    function useMutationObservable(targetEl, cb, options = DEFAULT_OPTIONS) {
        const [observer, setObserver] = useState(null);

        useEffect(() => {
            const obs = new MutationObserver(cb);
            setObserver(obs);
        }, [cb, options, setObserver]);
        
        useEffect(() => {
            if (!observer) return;
            const { config } = options;
            observer.observe(targetEl, config);
            return () => {
                if (observer) {
                    observer.disconnect();
                }
            };
        }, [observer, targetEl, options]);
    };

    const findDelta = () => {
        const diffTime = Math.abs(end.current - start.current);
        addLoadTime({
            variables: {
                user_ip: ip,
                delta: diffTime
            }
        })
        timerDone.current = true;
    };

    const callbackWhenReady = () => {
        if(!timerDone.current) {
            end.current = new Date();
            findDelta();
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };
    const parent = document.querySelector('#rampjs_slot1');
    useMutationObservable(parent, () => callbackWhenReady());

    return(
        <div style={styles.mainContainer}>
            <div style={cardStyle}>
                <div style={titleStyle}>What are you interested in?</div>
                <form style={styles.formContainer} onSubmit={handleFormSubmit}>
                    <div style={styles.buttonContainer}>
                        <div id="rampjs_slot1"></div>
                        {isLoading && <Loading />}
                    </div>
                    <LegalTerms email={trackingState['email']}/>
                </form>
            </div>
            {trackingState.article === 'loan' ? <LoanArticle /> : <CreditCardTitle />}
        </div>
    );
};

export default System1;