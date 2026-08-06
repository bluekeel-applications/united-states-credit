import React, { useEffect, useRef, useState } from 'react';
import Radium from 'radium';
import Styles from './LoanLanding.css';
import MockFormBody from './MockFormBody';
import { COLORS } from '../theme';
import useLoanTrack from '../useLoanTrack';

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

// The hero form card. In production the mbjsform vendor form renders into
// #r-form; while it loads the card shows only its chrome (no mock flash),
// with the form area's height reserved so content below doesn't jump. The
// reference's static mock renders only with ?mockform=1 (snapshot
// verification) or as a fallback when the vendor script fails to load.
const LenderFormEmbed = ({ mockOnly = false }) => {
    const containerRef = useRef(null);
    const [formReady, setFormReady] = useState(false);
    const [failed, setFailed] = useState(false);

    // Latest-ref pattern: the embed effect must not re-run when track's
    // identity changes (that would re-inject the vendor script), but events
    // should always carry the current sid/pid/eid/page.
    const track = useLoanTrack();
    const trackRef = useRef(track);
    trackRef.current = track;

    useEffect(() => {
        if (mockOnly) return undefined;
        const container = containerRef.current;

        // Vendor DOM readers. Selectors verified against the live wizard;
        // every read degrades to '' if the vendor markup drifts. Labels and
        // headings only — NEVER read input values (PII).
        const readProgress = () =>
            container.querySelector('.f-wizard-progressbar--value')?.textContent?.trim() ?? '';
        const readStepTitle = () => {
            const heading = container.querySelector('h1, h2, h3, h4, [role="heading"]')
                ?? container.querySelector('[class*="title" i], [class*="question" i]');
            return heading?.textContent?.replace(/\s+/g, ' ').trim().slice(0, 100) ?? '';
        };

        let ready = false;      // one-shot: unlock reserved height + form_loaded
        let lastStepKey = null; // (progress|title) pair — dedupes mutation noise
        let frame = null;       // single pending rAF coalesces mutation batches

        const readStep = () => {
            frame = null;
            const progress = readProgress();
            const stepTitle = readStepTitle();
            if (!stepTitle) return; // vendor mid-render (paints a bare 0% bar before the step content)
            const key = `${progress}|${stepTitle}`;
            if (key === lastStepKey) return;
            lastStepKey = key;
            trackRef.current('lender_form_step_viewed', { progress, step_title: stepTitle });
        };

        // Persistent observer: flips formReady once, then tracks wizard step
        // changes for the form funnel. No `attributes` (the progress fill
        // animates via style attrs — that would be an event storm); typing in
        // inputs mutates no text nodes, so keystrokes generate zero mutations.
        const observer = new MutationObserver(() => {
            if (!ready && container.childElementCount > 0) {
                ready = true;
                setFormReady(true);
                trackRef.current('lender_form_loaded', {});
            }
            if (ready && frame === null) frame = window.requestAnimationFrame(readStep);
        });
        observer.observe(container, { childList: true, subtree: true, characterData: true });

        // Delegated capture-phase clicks: vendor handlers can't stopPropagation
        // past us. Buttons only.
        const onClickCapture = (event) => {
            const target = event.target instanceof Element ? event.target : null;
            const button = target?.closest('button, .f-button');
            if (!button || !container.contains(button)) return;
            // strip decorative icon glyphs the vendor appends (e.g. '›')
            let label = button.textContent.replace(/\s+/g, ' ').replace(/[›‹»«><]+\s*$/, '').trim();
            if (!label) {
                label = button.getAttribute('aria-label')?.trim()
                    || (/back/i.test(button.className) ? 'back' : 'unlabeled');
            }
            trackRef.current('lender_form_button_clicked', { label, progress: readProgress() });
        };
        container.addEventListener('click', onClickCapture, true);

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
        script.onerror = () => {
            setFailed(true);
            trackRef.current('lender_form_failed', {});
        };
        script.src = VENDOR_SRC;
        document.body.appendChild(script);

        return () => {
            observer.disconnect();
            container.removeEventListener('click', onClickCapture, true);
            if (frame !== null) window.cancelAnimationFrame(frame);
            script.remove();
            style.remove();
        };
    }, [mockOnly]);

    const showMock = mockOnly || failed;

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
            {!mockOnly && !failed && (
                <div id='r-form' ref={containerRef} style={formReady ? Styles.rFormLive : Styles.rFormLoading} />
            )}
            {showMock && <MockFormBody />}
            {showMock && <div className='form-note' style={Styles.formNote}>Visualization only — no external script or data collection is active on this preview.</div>}
        </section>
    );
};

export default Radium(LenderFormEmbed);
