import React from 'react';
import { P, Ul, Li, A, Callout, ContactBlock } from '../components/Copy';
import { LEGAL_EFFECTIVE_DATE } from '../loanPages';

// Verbatim port of reference/usc-legal-center-deploy/e-consent.html — do not edit copy.
const eConsent = {
    effectiveDate: LEGAL_EFFECTIVE_DATE,
    intro: <Callout><Callout.Strong>Purpose of this consent:</Callout.Strong> This disclosure explains how records related to your interaction with UnitedStatesCredit may be provided electronically. A lender may provide its own separate electronic-consent disclosure for records it is legally required to provide.</Callout>,
    sections: [
        {
            id: 's1',
            heading: '1. Consent to Electronic Records',
            body: (
                <>
                    <P>By affirmatively agreeing to this Electronic Communications & E-SIGN Consent where it is presented, you consent to receive electronically the records, disclosures, notices, agreements, privacy notices, confirmations, and other communications that UnitedStatesCredit is legally permitted or required to provide electronically in connection with your use of our services.</P>
                    <P>Your consent applies to the transaction in which you provide it and, where clearly disclosed at the time of consent, to related categories of records during your relationship with us.</P>
                </>
            ),
        },
        {
            id: 's2',
            heading: '2. Right to Paper Records',
            body: <P>You may request a paper copy of an electronic record that we maintain and are legally required to provide to you. Contact <A href='mailto:info@bluekeel.com'>info@bluekeel.com</A> and identify the record requested. UnitedStatesCredit does not charge a fee for a paper copy unless a fee is permitted by law and disclosed before the request is completed.</P>,
        },
        {
            id: 's3',
            heading: '3. Right to Withdraw Electronic Consent',
            body: (
                <>
                    <P>You may withdraw your consent to receive future records electronically by contacting <A href='mailto:info@bluekeel.com'>info@bluekeel.com</A>. Withdrawal will not affect the legal validity of electronic records provided before the withdrawal became effective.</P>
                    <P>Because the UnitedStatesCredit service is primarily online, withdrawal may limit our ability to provide certain features electronically. It will not, by itself, cancel an agreement you have separately entered with a lender.</P>
                </>
            ),
        },
        {
            id: 's4',
            heading: '4. Updating Your Contact Information',
            body: <P>You are responsible for providing a current email address and for notifying us if it changes. You may update your electronic contact information by contacting <A href='mailto:info@bluekeel.com'>info@bluekeel.com</A> or by using any account or preference tool we make available.</P>,
        },
        {
            id: 's5',
            heading: '5. Hardware and Software Requirements',
            body: (
                <>
                    <P>To access and retain electronic records from UnitedStatesCredit, you need:</P>
                    <Ul>
                        <Li>a device capable of connecting to the Internet;</Li>
                        <Li>a current web browser that supports standard HTML and secure HTTPS connections;</Li>
                        <Li>a valid email account where email delivery is used;</Li>
                        <Li>sufficient electronic storage or the ability to print or save records; and</Li>
                        <Li>software capable of opening PDF files if a particular record is provided as a PDF.</Li>
                    </Ul>
                    <P>If a material change to these requirements creates a material risk that you will no longer be able to access records subject to your consent, we will provide the notice and renewed consent required by applicable law.</P>
                </>
            ),
        },
        {
            id: 's6',
            heading: '6. Demonstrating Ability to Access Records',
            body: <P>When you provide consent electronically through our website, your completion of the electronic-consent process through a compatible browser and device is intended to demonstrate that you can access the electronic information presented in that format.</P>,
        },
        {
            id: 's7',
            heading: '7. Electronic Signatures',
            body: <P>Where a signature is required, an electronic action that applicable law recognizes as an electronic signature may have the same legal effect as a handwritten signature. This may include checking a box, clicking a button, typing your name, or another electronic act associated with the record, when used with appropriate intent and records.</P>,
        },
        {
            id: 's8',
            heading: '8. Lender Records',
            body: <P>Participating lenders are separate companies. A lender may require its own E-SIGN consent or provide disclosures using its own systems. UnitedStatesCredit's E-SIGN consent does not replace a lender's legally required disclosure or consent process.</P>,
        },
        {
            id: 's9',
            heading: '9. Contact',
            body: <ContactBlock />,
        },
    ],
};

export default eConsent;
