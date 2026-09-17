import React, { useEffect, useState } from 'react';
import Radium from 'radium';
import Styles from './LegalPageLayout.css';
import useLoanTrack from '../useLoanTrack';

// Pieces of the Your Privacy Choices page that are more than copy.

// First-party opt-out marker from the legal package's legal-center.js. It is
// only a marker: nothing reads it yet, so the advertising / analytics tags
// still have to be wired to it (and to GPC itself) before it suppresses
// anything.
const OPT_OUT_MARKER = 'usc_privacy_optout';

// Reports whether this browser sends Global Privacy Control and, when it
// does, records the opt-out marker. Status strings are the package's.
export const GpcStatus = () => {
    const [detected, setDetected] = useState(null);

    useEffect(() => {
        const gpc = navigator.globalPrivacyControl === true;
        setDetected(gpc);
        if (!gpc) return;
        try {
            localStorage.setItem(OPT_OUT_MARKER, '1');
        } catch (e) {
            // storage blocked — the cookie below still carries the marker
        }
        document.cookie = `${OPT_OUT_MARKER}=1; Max-Age=31536000; Path=/; SameSite=Lax`;
    }, []);

    return (
        <div className='gpc-status' style={Styles.gpcStatus} data-detected={detected === null ? undefined : String(detected)}>
            {detected === null && 'Checking this browser for a Global Privacy Control signal…'}
            {detected === true && 'Global Privacy Control detected in this browser. Your browser is signaling an opt-out preference.'}
            {detected === false && 'No Global Privacy Control signal was detected in this browser.'}
        </div>
    );
};

export const ChoiceGrid = Radium(({ children }) => (
    <div className='choice-grid' style={Styles.choiceGrid}>{children}</div>
));

// One request tile. `href` is a prefilled mailto until a privacy-request
// endpoint exists; `requestType` labels the click in analytics.
export const Choice = Radium(({ title, href, requestType, primary, children }) => {
    const track = useLoanTrack();
    return (
        <div className='choice' style={Styles.choice}>
            <h3 style={Styles.choiceH3}>{title}</h3>
            <p style={Styles.copyText}>{children}</p>
            <a
                style={[Styles.choiceButton, primary && Styles.choiceButtonPrimary]}
                href={href}
                onClick={() => track('contact_clicked', { source: 'privacy-choices', request_type: requestType })}
            >
                Submit request
            </a>
        </div>
    );
});
