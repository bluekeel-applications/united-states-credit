import React, { useEffect, useState } from 'react';
import styles from './System1.css.js';
import Loading from '../../Shared/Loading';
import { useMediaQuery } from 'react-responsive';
import LegalTerms from './Articles/components/LegalTerms';

const ButtonContainer = ({ containerId, email, title }) => {
    const [ isLoading, setLoading ] = useState(true);
    const isMobile = useMediaQuery({ maxWidth: 767 });

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

    const callbackWhenReady = () => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };
    const parent = document.querySelector(`#${containerId}`);
    useMutationObservable(parent, () => callbackWhenReady());

    const cardStyle = Object.assign({},
        styles.formCard,
        isMobile && styles.formCardMobile
    );
    const titleStyle = Object.assign({},
        styles.titleText,
        isMobile && styles.titleTextMobile
    );

    return(
        <div style={cardStyle}>
            <div style={titleStyle}>{title}</div>
            <div style={styles.formContainer}>
                <div style={styles.buttonContainer}>
                    <div id={containerId}></div>
                    {isLoading && <Loading />}
                </div>
                <LegalTerms email={email}/>
            </div>
        </div>
    )
};

export default ButtonContainer;