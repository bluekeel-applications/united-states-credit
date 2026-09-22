import React, { useEffect, useRef, useState } from 'react';
import Radium from 'radium';
import Styles from './LegalPageLayout.css';
import { P, Ul, Li } from './Copy';
import { CONTACT_EMAIL } from '../loanPages';
import { privacyRequestEndpoint } from '../services.config';
import { privacyState, optOutThisBrowser } from '../../../../utils/privacy';

// The working parts of the Your Privacy Choices page. Nothing here is
// instrumented: a privacy request is not an analytics event.

// Request types the intake accepts, in the order the form lists them. `needs`
// is what identifies the records a request is about — a stop request needs the
// address or number it concerns and nothing else; only requests that disclose
// or change records ask for a name. The service applies the same rules.
export const REQUEST_TYPES = [
    { value: 'opt_out_sale_share', label: 'Do Not Sell or Share / Targeted Advertising', needs: 'emailOrPhone' },
    { value: 'access', label: 'Access / Know', needs: 'emailAndName' },
    { value: 'correct', label: 'Correct', needs: 'emailAndName' },
    { value: 'delete', label: 'Delete', needs: 'emailAndName' },
    { value: 'portability', label: 'Portable Copy', needs: 'emailAndName' },
    { value: 'marketing_email', label: 'Stop Marketing Email', needs: 'email' },
    { value: 'marketing_sms', label: 'Stop Marketing Text Messages (SMS)', needs: 'phone' },
    { value: 'marketing_phone', label: 'Stop Marketing Telephone Calls', needs: 'phone' },
    { value: 'marketing_sms_phone', label: 'Stop SMS / Telephone Marketing', needs: 'phone' },
    { value: 'withdraw_marketing_consent', label: 'Withdraw Marketing Consent', needs: 'emailOrPhone' },
    { value: 'ca_financial_revocation', label: 'California Financial Privacy Authorization — Revoke/Modify', needs: 'emailOrPhone' },
    { value: 'appeal', label: 'Appeal a Privacy Decision', needs: 'email' },
    { value: 'other', label: 'Other Privacy Request', needs: 'email' },
];

const REQUEST_FORM_ID = 'privacy-request-form';
const PRESELECT_EVENT = 'usc:privacy-request-type';

const SUCCESS = (requestId) => `Your privacy request has been received. Your reference number is ${requestId}.`;
const FAILURE = `We could not submit your request. Please try again or email ${CONTACT_EMAIL}. Do not include sensitive financial information.`;
const EITHER_NOTE = 'an email address or a phone number is required for this request';
const OPT_OUT_APPLIED ='Your opt-out preference is applied to this browser.';
const OPT_OUT_ERROR = `We could not confirm that your preference was applied. Please try again or contact ${CONTACT_EMAIL}.`;

// Every status line the page can show, so the compliance snapshot can list
// them all; the components below are what shows them.
export const STATUS_COPY = Object.freeze({
    success: SUCCESS,
    successExample: SUCCESS('[reference number]'),
    failure: FAILURE,
    eitherNote: EITHER_NOTE,
    optOutApplied: OPT_OUT_APPLIED,
    optOutError: OPT_OUT_ERROR,
});

// Untracked on purpose (Copy's <A> reports mailto clicks to analytics).
const A = ({ href, children }) => <a style={Styles.copyLink} href={href}>{children}</a>;

export const requestMailto = (label) =>
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Privacy Request: ${label}`)}`;

// The three things the signal line can say, by the state the page was loaded
// under — so "applied" is only ever said when it was.
export const SIGNAL_COPY = Object.freeze({
    none: 'No Global Privacy Control signal was detected. You can still use the privacy choices below.',
    optedOut: OPT_OUT_APPLIED,
    gpcOptedOut: `Global Privacy Control is on. ${OPT_OUT_APPLIED}`,
});

export const signalMessage = ({ gpc, optedOut }) => (optedOut ? (gpc ? SIGNAL_COPY.gpcOptedOut : SIGNAL_COPY.optedOut) : SIGNAL_COPY.none);

// What this browser's preference actually is. A render for a named state
// (the compliance snapshot's variants) passes it; the page reads its own.
export const PrivacySignalStatus = ({ state = privacyState() }) => (
    <div className='gpc-status' style={Styles.gpcStatus} role='status'>{signalMessage(state)}</div>
);

// The browser-level opt-out: no name, email or verification. The page reloads
// once the choice is stored, so it comes back with every covered tag never
// loaded and the line below reports a state that is already in force.
export const BrowserOptOut = Radium(() => {
    const [result, setResult] = useState(privacyState().optedOut ? 'applied' : '');

    const optOut = () => {
        if (privacyState().optedOut) { setResult('applied'); return; }
        if (!optOutThisBrowser()) { setResult('error'); return; }
        window.location.hash = 'sale-sharing';
        window.location.reload();
    };

    return (
        <>
            <button type='button' style={[Styles.choiceButton, Styles.choiceButtonPrimary, Styles.actionButton]} onClick={optOut} data-browser-privacy-optout>Opt Out for This Browser</button>
            <p style={[Styles.statusLine, result === 'applied' && Styles.statusApplied, result === 'error' && Styles.statusError]} role='status' aria-live='polite' data-browser-privacy-result>
                {result === 'applied' && OPT_OUT_APPLIED}
                {result === 'error' && OPT_OUT_ERROR}
            </p>
        </>
    );
});

export const ChoiceGrid = Radium(({ children }) => (
    <div className='choice-grid' style={Styles.choiceGrid}>{children}</div>
));

// One request tile. With the form on the page its button jumps there with the
// request type chosen (a plain anchor if scripting is off); without it, the
// button is the prefilled email. `hasForm` is this host's answer unless a
// render for a named variant (the compliance snapshot) says otherwise.
export const Choice = Radium(({ title, requestType, primary, children, hasForm = !!privacyRequestEndpoint() }) => {
    const type = REQUEST_TYPES.find((entry) => entry.value === requestType);
    const preselect = () => document.dispatchEvent(new CustomEvent(PRESELECT_EVENT, { detail: requestType }));

    return (
        <div className='choice' style={Styles.choice}>
            <h3 style={Styles.choiceH3}>{title}</h3>
            <p style={Styles.copyText}>{children}</p>
            <a
                style={[Styles.choiceButton, primary && Styles.choiceButtonPrimary]}
                href={hasForm ? '#privacy-request' : requestMailto(type.label)}
                onClick={hasForm ? preselect : undefined}
            >
                Submit request
            </a>
        </div>
    );
});

// `required` may be the note to show: requests that need an email OR a phone
// say so on both fields instead of marking each one required.
const Field = ({ label, required, children }) => (
    <label style={Styles.formLabel}>
        {label}{required && ` (${typeof required === 'string' ? required : 'required for this request'})`}
        {children}
    </label>
);

// Posts to the privacy-requests intake. "Received" is only shown with the
// reference number the service issued; any other outcome is a visible failure
// with the email alternative, and the entries stay in the form.
const RequestForm = Radium(({ endpoint }) => {
    const [values, setValues] = useState({ request_type: '', email: '', full_name: '', phone: '', state: '', details: '', is_agent: false, agent_name: '', agent_email: '', website: '' });
    const [status, setStatus] = useState({ phase: 'idle', requestId: null });
    const resultRef = useRef(null);

    useEffect(() => {
        const onPreselect = (event) => setValues((current) => ({ ...current, request_type: event.detail }));
        document.addEventListener(PRESELECT_EVENT, onPreselect);
        return () => document.removeEventListener(PRESELECT_EVENT, onPreselect);
    }, []);

    useEffect(() => {
        if (status.phase === 'received' || status.phase === 'failed') resultRef.current?.focus();
    }, [status.phase]);

    const needs = REQUEST_TYPES.find((entry) => entry.value === values.request_type)?.needs;
    const emailRequired = needs === 'email' || needs === 'emailAndName' || (needs === 'emailOrPhone' && !values.phone.trim());
    const phoneRequired = needs === 'phone' || (needs === 'emailOrPhone' && !values.email.trim());
    const nameRequired = needs === 'emailAndName';

    const set = (name) => (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setValues((current) => ({ ...current, [name]: value }));
    };

    const submit = async (event) => {
        event.preventDefault();
        setStatus({ phase: 'submitting', requestId: null });
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...values, is_agent: values.is_agent ? '1' : '', source: 'legal-center-privacy-choices' }),
            });
            const body = await response.json().catch(() => null);
            if (response.status === 202 && body?.accepted && body.request_id) {
                setStatus({ phase: 'received', requestId: body.request_id });
                return;
            }
            setStatus({ phase: 'failed', requestId: null });
        } catch (error) {
            setStatus({ phase: 'failed', requestId: null });
        }
    };

    if (status.phase === 'received') {
        return (
            <div style={Styles.formResult} role='status' aria-live='polite' tabIndex={-1} ref={resultRef} data-privacy-request-result='received'>
                <strong style={Styles.statusApplied}>{SUCCESS(status.requestId)}</strong>
            </div>
        );
    }

    const submitting = status.phase === 'submitting';

    return (
        <form id={REQUEST_FORM_ID} className='privacy-request-form' style={Styles.requestForm} action={endpoint} method='post' onSubmit={submit} data-privacy-request-form>
            {status.phase === 'failed' && (
                <div style={Styles.formResult} role='alert' tabIndex={-1} ref={resultRef} data-privacy-request-result='failed'>
                    <strong style={Styles.statusError}>{FAILURE}</strong>
                </div>
            )}
            <Field label='Request type' required>
                <select style={Styles.formControl} name='request_type' required value={values.request_type} onChange={set('request_type')}>
                    <option value=''>Select a request</option>
                    {REQUEST_TYPES.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
                </select>
            </Field>
            <Field label='Email address used with UnitedStatesCredit' required={needs === 'emailOrPhone' ? EITHER_NOTE : emailRequired}>
                <input style={Styles.formControl} type='email' name='email' autoComplete='email' required={emailRequired} value={values.email} onChange={set('email')} />
            </Field>
            <Field label='Phone number (only if relevant to the request)' required={needs === 'emailOrPhone' ? EITHER_NOTE : phoneRequired}>
                <input style={Styles.formControl} type='tel' name='phone' autoComplete='tel' required={phoneRequired} value={values.phone} onChange={set('phone')} />
            </Field>
            <Field label='Full name' required={nameRequired}>
                <input style={Styles.formControl} type='text' name='full_name' autoComplete='name' required={nameRequired} value={values.full_name} onChange={set('full_name')} />
            </Field>
            <Field label='State of residence'>
                <input style={Styles.formControl} type='text' name='state' autoComplete='address-level1' maxLength={64} value={values.state} onChange={set('state')} />
            </Field>
            <Field label='Details'>
                <textarea style={{ ...Styles.formControl, ...Styles.formTextarea }} name='details' maxLength={2000} placeholder='Describe the request. Do not include SSN, bank information, passwords, or other sensitive credentials.' value={values.details} onChange={set('details')} />
            </Field>
            <label style={Styles.formCheckRow}>
                <input type='checkbox' name='is_agent' value='1' checked={values.is_agent} onChange={set('is_agent')} />
                <span>I am an authorized agent submitting this request for someone else</span>
            </label>
            {values.is_agent && (
                <>
                    <Field label='Your name (authorized agent)' required>
                        <input style={Styles.formControl} type='text' name='agent_name' required value={values.agent_name} onChange={set('agent_name')} />
                    </Field>
                    <Field label='Your email address (authorized agent)' required>
                        <input style={Styles.formControl} type='email' name='agent_email' required value={values.agent_email} onChange={set('agent_email')} />
                    </Field>
                </>
            )}
            <div style={Styles.formTrap} aria-hidden='true'>
                <label>Website<input type='text' name='website' tabIndex={-1} autoComplete='off' value={values.website} onChange={set('website')} /></label>
            </div>
            <input type='hidden' name='source' value='legal-center-privacy-choices' />
            <div>
                <button type='submit' style={[Styles.choiceButton, Styles.choiceButtonPrimary, Styles.actionButton, submitting && Styles.actionButtonBusy]} disabled={submitting}>
                    {submitting ? 'Submitting…' : 'Submit Privacy Request'}
                </button>
            </div>
            <small style={Styles.formSmall}>For access, correction, deletion, or similar requests, we may need to verify your identity or an authorized agent's authority. A browser sale or sharing opt-out does not require identity verification. Information provided with a privacy request is used to handle the request and related compliance, not to enroll you in marketing.</small>
        </form>
    );
});

// "Submit a Privacy Request": the form where this host has an intake to post
// to, otherwise the same request types as prefilled emails. The endpoint is
// this host's unless a render for a named variant passes one (or none).
export const PrivacyRequest = ({ endpoint = privacyRequestEndpoint() }) => {
    if (endpoint) {
        return (
            <>
                <P>You may submit a privacy request using the form below or by emailing <A href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</A>. Provide only the information needed for your request. Do not include a Social Security number, bank-account number, password, or other sensitive credential.</P>
                <RequestForm endpoint={endpoint} />
            </>
        );
    }

    return (
        <>
            <P>You may submit a privacy request by emailing <A href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</A> using one of the request links below. Provide only the information needed for your request. Do not include a Social Security number, bank-account number, password, or other sensitive credential.</P>
            <Ul>
                {REQUEST_TYPES.map((type) => (
                    <Li key={type.value}><A href={requestMailto(type.label)}>{type.label}</A></Li>
                ))}
            </Ul>
            <P>For access, correction, deletion, or similar requests, we may need to verify your identity or an authorized agent's authority. A browser sale or sharing opt-out does not require identity verification. Information provided with a privacy request is used to handle the request and related compliance, not to enroll you in marketing.</P>
        </>
    );
};

// Under the browser opt-out: where to send an email address or number so the
// request also reaches contact records — the form, or the request links.
export const ContactRecordsRoute = ({ hasForm = !!privacyRequestEndpoint() }) => (
    <P>To help us apply a request to contact records associated with you, you may also submit the relevant email address or telephone number {hasForm ? 'in the form below' : 'using the request links below'}. Providing that information is not required for the browser opt-out.</P>
);

// The California authorization paragraph points at whichever request route
// this host offers.
export const CaliforniaAuthorizationRoute = ({ hasForm = !!privacyRequestEndpoint() }) => (
    <P>If you previously provided a separate California financial-privacy authorization, the authorization itself explains how to revoke or modify it. {hasForm
        ? 'You may also select the California financial-privacy option in the request form above.'
        : 'You may also use the California Financial Privacy Authorization request link above.'} This Legal Center page is not a substitute for the separate consent acknowledgment required when California law requires one.</P>
);
