import React from 'react';
import { P, A, Callout } from '../components/Copy';

// Verbatim port of reference/e-consent.html — do not edit copy.
const eConsent = {
    effectiveDate: 'August 4, 2026',
    intro: <Callout><Callout.Strong>Do not publish this page as a substitute for the exact E-SIGN consent embedded by the lender or platform. The live transaction consent should be approved by the party delivering the records.</Callout.Strong></Callout>,
    sections: [
        {
            id: 's1',
            heading: 'Consent to electronic records',
            body: <P>By affirmatively agreeing where E-Consent is presented, you consent to receive agreements, notices, disclosures, authorizations, privacy notices, and other records electronically in connection with your use of the site and any request submitted through it.</P>,
        },
        {
            id: 's2',
            heading: 'Scope',
            body: <P>Your consent covers records from BlueKeel and, where identified in the consent or provider process, participating providers and their service providers. A provider may require a separate electronic-consent agreement.</P>,
        },
        {
            id: 's3',
            heading: 'Hardware and software requirements',
            body: <P>You need a device with internet access, a current web browser capable of displaying HTML and cookies, a valid email address, and software capable of viewing and retaining PDF files. You should be able to print or electronically save records.</P>,
        },
        {
            id: 's4',
            heading: 'Paper copies',
            body: <P>You may print or save records presented online. To request a paper copy of a BlueKeel record, contact <A href='mailto:info@bluekeel.com'>info@bluekeel.com</A>. A third party may have its own procedure and may charge a lawful copying or delivery fee.</P>,
        },
        {
            id: 's5',
            heading: 'Updating contact information',
            body: <P>Keep your email address and other contact information current. Contact BlueKeel for BlueKeel records and the applicable provider for provider records.</P>,
        },
        {
            id: 's6',
            heading: 'Withdrawal of consent',
            body: <P>You may withdraw consent for future BlueKeel electronic records by contacting us. Withdrawal does not affect the validity of records previously delivered or actions previously taken. A provider may explain whether withdrawal ends or limits its ability to complete a transaction.</P>,
        },
        {
            id: 's7',
            heading: 'Electronic signatures',
            body: <P>Clicking an agreement checkbox, pressing an acceptance button, typing your name, or taking another electronic action identified as consent may constitute your electronic signature and have the same legal effect as a handwritten signature.</P>,
        },
    ],
};

export default eConsent;
