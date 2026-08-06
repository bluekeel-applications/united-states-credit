import React, { useEffect, useRef, useState } from 'react';
import Radium from 'radium';
import Styles from './LoanLanding.css';
import MockFormBody from './MockFormBody';
import { COLORS } from '../theme';

const SCRIPT_ID = 'mbjs-lender-form-loader';
const STYLE_ID = 'mbjs-lender-form-overrides';
const VENDOR_SRC = 'https://mbjsform.com/lib/main?k=usacashcrew.com';
// Themed to the site palette: primary (the site's lighter blue) drives the
// vendor's buttons in all variants/states, secondary its dark accents. The
// spots the vendor paints with a dark-to-primary gradient (progress fill,
// solid buttons) are flattened to the lighter blue via the overrides below.
const VENDOR_ATTRS = {
    'data-input-type': 'box',
    'data-container-id': 'r-form',
    'data-k': 'usacashcrew.com',
    'data-secondary-color': COLORS.navy2,
    'data-primary-color': COLORS.blue,
    'data-mode': 'rounded',
    'type': 'text/javascript',
};

// Inline styles can't reach vendor-rendered DOM, and the vendor injects its
// theme via constructed stylesheets — a scoped !important override is the
// sanctioned lever ("you can put up css overwrites of our elements").
const VENDOR_OVERRIDE_CSS = `
#r-form .f-wizard-progressbar > span {
    background-color: ${COLORS.blue} !important;
    background-image: none !important; /* vendor paints a secondary->primary gradient over the fill */
}
#r-form .f-wizard-progressbar--value { color: ${COLORS.navy} !important; }
#r-form .f-button-primary:not(.f-button-outline) {
    background-color: ${COLORS.blue} !important;
    background-image: none !important; /* flat lighter blue, not the vendor's dark-to-primary gradient */
}
`;

// The hero form card. The reference ships a static mock in this slot; in
// production the mbjsform vendor form renders into #r-form. The mock stays
// visible until the vendor paints (and permanently if the script fails or
// mockOnly is set), so the card never appears empty.
const LenderFormEmbed = ({ mockOnly = false }) => {
    const containerRef = useRef(null);
    const [formReady, setFormReady] = useState(false);

    useEffect(() => {
        if (mockOnly) return undefined;
        const container = containerRef.current;

        // swap mock -> live the moment the vendor renders anything
        const observer = new MutationObserver(() => {
            if (container.childElementCount > 0) {
                setFormReady(true);
                observer.disconnect();
            }
        });
        observer.observe(container, { childList: true });

        document.getElementById(STYLE_ID)?.remove();
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = VENDOR_OVERRIDE_CSS;
        document.head.appendChild(style);

        // Fresh tag on every mount: the vendor lib scans for #r-form when it
        // executes, so re-executing after route-away/back re-renders the form
        // into the container that exists now (fetch is browser-cached).
        document.getElementById(SCRIPT_ID)?.remove();
        const script = document.createElement('script');
        script.id = SCRIPT_ID;
        Object.entries(VENDOR_ATTRS).forEach(([key, value]) => script.setAttribute(key, value));
        script.defer = true;
        script.src = VENDOR_SRC;
        document.body.appendChild(script);

        return () => {
            observer.disconnect();
            script.remove();
            style.remove();
        };
    }, [mockOnly]);

    const showMock = mockOnly || !formReady;

    return (
        <section
            className='form-shell'
            style={Styles.formShell}
            aria-label={showMock ? 'Static form visualization' : 'Loan request form'}
        >
            <div className='brand-rule' style={Styles.brandRule} />
            <div className='form-head' style={Styles.formHead}>
                <h2 style={Styles.formHeadH2}>See your available options</h2>
                {showMock && <p style={Styles.formHeadP}>Static preview of the lender-controlled form area</p>}
            </div>
            {!mockOnly && <div id='r-form' ref={containerRef} style={formReady ? Styles.rFormLive : undefined} />}
            {showMock && <MockFormBody />}
            {showMock && <div className='form-note' style={Styles.formNote}>Visualization only — no external script or data collection is active on this preview.</div>}
        </section>
    );
};

export default Radium(LenderFormEmbed);
