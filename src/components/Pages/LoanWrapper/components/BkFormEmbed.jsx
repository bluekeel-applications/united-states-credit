import React, { useContext, useEffect, useRef, useState } from 'react';
import Radium from 'radium';
import Styles from './LoanLanding.css';
import FormShell from './FormShell';
import MockFormBody from './MockFormBody';
import { enrichUrlWithSession } from './sessionParams';
import { COLORS, FONT_STACK } from '../theme';
import useLoanTrack from '../useLoanTrack';
import { AppContext } from '../../../../context';
import { BKFORM_API_BASE, BKFORM_CONSOLE_BASE, BKFORM_CONTAINER_ID, BKFORM_SITE_KEY, BKFORM_SRC } from '../bkform.config';

const SCRIPT_ID = 'bkform-loader';

// bkform:error codes that mean the form will not render at all — fall back to
// the static mock. Everything else (a ZIP city lookup failing, a duplicate tag
// from a fast back/forward) is cosmetic and only worth an analytics event.
const FATAL_CODES = new Set(['missing-key', 'invalid-config', 'container-timeout']);
const IGNORED_CODES = new Set(['duplicate-mount', 'zip-lookup-failed', 'ip-fetch-failed']);

const pct = (p) => `${Math.round((Number(p) || 0) * 100)}%`;

// The hero form card with Bluekeel's own form (bkform) in it — rendered when
// the page URL carries ?form=bk on an allowed host (see ../bkform.config.js).
//
// Same shape as LenderFormEmbed, but the funnel analytics come from bkform's
// documented `bkform:*` CustomEvents (they bubble out of its shadow root with
// composed:true), not from watching the vendor's DOM. Event names match the
// third-party embed's so the GA4 funnel reads the same, plus `form_vendor`
// so the two can be compared; bkform's two-phase waterfall adds phase/result
// events the vendor never exposed. Payloads are structurally PII-free — bkform
// allow-lists its detail keys — and button labels are read from `.bkf-button`
// only, never from the segmented answer buttons.
const BkFormEmbed = ({ mockOnly = false }) => {
    const containerRef = useRef(null);
    const [formReady, setFormReady] = useState(false);
    const [failed, setFailed] = useState(false);

    // Session ids for the URL enrichment. hsid is committed before /loans can
    // render (App's loading gate) and is write-once.
    const { trackingState } = useContext(AppContext);
    const { hsid, sid, eid } = trackingState;

    // Latest-ref pattern: the embed effect must not re-run when track's
    // identity changes (that would re-inject the script), but events should
    // always carry the current sid/pid/eid/page.
    const track = useLoanTrack();
    const trackRef = useRef(track);
    trackRef.current = track;

    useEffect(() => {
        if (mockOnly) return undefined;
        const container = containerRef.current;
        // bkform's single-lender test mode (?test=<lender>) is read from the same
        // URL; tag those sessions so they can be excluded from funnel analytics.
        const testLender = new URLSearchParams(window.location.search).get('test') || null;
        const emit = (name, params = {}) => trackRef.current(name, { form_vendor: 'bk', ...(testLender ? { test_lender: testLender } : {}), ...params });

        // bkform reads cid1/sub1/sub2 from the URL when it mounts — before the
        // script tag goes in.
        enrichUrlWithSession({ hsid, sid, eid });

        // This card already draws the frame, so switch bkform's own border and
        // shadow off and hand it the page's font. Set imperatively (bkform's
        // mount sets its theme tokens on this same element the same way) so
        // React/Radium style diffs never touch them.
        container.style.setProperty('--bkform-shadow', 'none');
        container.style.setProperty('--bkform-card-border', '0');
        container.style.setProperty('--bkform-font', FONT_STACK);

        // A script from an earlier visit may still be waiting for a container
        // (removing its tag does not cancel it) and would grab this one first.
        window.__BKFORM__?.instances?.get(BKFORM_CONTAINER_ID)?.destroy?.();

        let lastStep = null;
        let progress = '';
        const onEvent = {
            'bkform:loaded': () => {
                setFormReady(true);
                emit('lender_form_loaded');
            },
            'bkform:step': (e) => {
                const d = e.detail || {};
                if (d.stepIndex === lastStep) return;
                lastStep = d.stepIndex;
                progress = pct(d.progress);
                emit('lender_form_step_viewed', { progress, step_title: d.stepTitle, step_id: d.stepId, step_index: d.stepIndex });
            },
            'bkform:phase': (e) => {
                const d = e.detail || {};
                emit('lender_form_phase_viewed', { phase_id: d.phaseId, phase_index: d.phaseIndex });
            },
            'bkform:ping-end': (e) => {
                const d = e.detail || {};
                emit('lender_form_phase_complete', { phase_id: d.phaseId, outcome: d.outcome, has_redirect: !!d.hasRedirect, duration_ms: d.durationMs });
            },
            'bkform:submit': (e) => {
                const d = e.detail || {};
                emit('lender_form_submitted', { valid: !!d.valid, error_count: (d.errorFields || []).length });
            },
            // These two fire moments before the applicant is sent to the buyer.
            'bkform:result': (e) => {
                const d = e.detail || {};
                emit('lender_form_result', { status: d.status, has_redirect: !!d.hasRedirect, offer_count: d.offerCount, transport_type: 'beacon' });
            },
            'bkform:redirect': (e) => {
                emit('lender_form_redirect', { market: (e.detail || {}).market, transport_type: 'beacon' });
            },
        };
        Object.entries(onEvent).forEach(([name, fn]) => container.addEventListener(name, fn));

        // Fatal configuration errors are dispatched on document (there is no
        // mounted container to dispatch on yet); container-level errors bubble
        // up to document too, so one listener sees them all.
        const onError = (e) => {
            const code = (e.detail && e.detail.code) || 'unknown';
            if (IGNORED_CODES.has(code)) return;
            emit('lender_form_failed', { code });
            if (FATAL_CODES.has(code)) setFailed(true);
        };
        document.addEventListener('bkform:error', onError);

        // Capture-phase clicks: the real target inside the open shadow root is
        // the first entry of composedPath(). Action buttons only — segmented
        // option buttons carry the applicant's answer as their label.
        const onClickCapture = (event) => {
            const origin = typeof event.composedPath === 'function' ? event.composedPath()[0] : event.target;
            const button = origin instanceof Element ? origin.closest('.bkf-button') : null;
            if (!button) return;
            const label = button.textContent.replace(/\s+/g, ' ').trim() || 'unlabeled';
            emit('lender_form_button_clicked', { label, progress });
        };
        container.addEventListener('click', onClickCapture, true);

        // Fresh tag on every mount, as with the vendor form: bkform mounts into
        // the container that exists now (fetch is browser-cached).
        document.getElementById(SCRIPT_ID)?.remove();
        const script = document.createElement('script');
        script.id = SCRIPT_ID;
        Object.entries({
            'data-k': BKFORM_SITE_KEY,
            'data-container-id': BKFORM_CONTAINER_ID,
            'data-posting': 'live',
            'data-api-base': BKFORM_API_BASE,
            'data-console-base': BKFORM_CONSOLE_BASE,
            'data-primary-color': COLORS.blue,
            'data-secondary-color': COLORS.navy2,
            'data-mode': 'rounded',
        }).forEach(([key, value]) => script.setAttribute(key, value));
        script.async = true;
        script.onerror = () => {
            setFailed(true);
            emit('lender_form_failed', { code: 'script-load' });
        };
        script.src = BKFORM_SRC;
        document.body.appendChild(script);

        return () => {
            Object.entries(onEvent).forEach(([name, fn]) => container.removeEventListener(name, fn));
            document.removeEventListener('bkform:error', onError);
            container.removeEventListener('click', onClickCapture, true);
            // Unmount the form (bkform sends its own abandonment beacon).
            window.__BKFORM__?.instances?.get(BKFORM_CONTAINER_ID)?.destroy?.();
            script.remove();
        };
        // hsid/sid/eid are read once, at injection time, on purpose: re-running
        // this effect would re-inject the script and restart the applicant.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mockOnly]);

    const showMock = mockOnly || failed;

    return (
        <FormShell showMock={showMock} clip>
            {!showMock && (
                <div id={BKFORM_CONTAINER_ID} ref={containerRef} style={formReady ? Styles.bkFormLive : Styles.bkFormLoading} />
            )}
            {showMock && <MockFormBody />}
        </FormShell>
    );
};

export default Radium(BkFormEmbed);
