import React, { useEffect } from 'react';
import styles from './CBiframe.css';

const CBiframe = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.cbiframe.com/r-form.js';
        script.setAttribute('data-input-type', 'box');
        script.setAttribute('defer', true);
        script.setAttribute('data-container-id', 'r-form');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('data-k', 'unitedstatescredit.com');
        script.setAttribute('data-mode', 'rounded');
        script.src = 'https://mbjsform.com/lib/main?k=unitedstatescredit.com';
        document.body.appendChild(script);
    }, []);

    return (
        <div style={styles.mainPage}>
            <div id='r-form' style={styles.iframe}></div>
        </div>
    );
};

export default CBiframe;