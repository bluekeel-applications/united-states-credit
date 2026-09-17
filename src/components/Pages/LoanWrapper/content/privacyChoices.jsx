import React from 'react';
import { P, Ul, Li, A, Callout, ContactBlock } from '../components/Copy';
import { GpcStatus, ChoiceGrid, Choice } from '../components/PrivacyChoices';
import { CONTACT_EMAIL, LEGAL_EFFECTIVE_DATE } from '../loanPages';

// Port of reference/usc-legal-center-deploy/privacy-choices.html — do not edit copy.
//
// EMAIL-ONLY (user decision, 2026-09-17): the package's request form posts to
// /api/privacy-request, which does not exist — this site is static. Until it
// does, every request goes to CONTACT_EMAIL with a prefilled subject, so no
// request can be silently dropped. Two passages therefore differ from the
// package and are marked DEVIATION below; everything else is verbatim. When
// the endpoint exists, restore the package's form (spec:
// reference/usc-legal-center-deploy/privacy-request-api-spec.md) and wording.

// The package form's request types, labels verbatim.
const REQUEST_TYPES = [
    'Do Not Sell or Share / Targeted Advertising',
    'Access / Know',
    'Correct',
    'Delete',
    'Portable Copy',
    'Stop Marketing Email',
    'Stop SMS / Telephone Marketing',
    'Withdraw Marketing Consent',
    'California Financial Privacy Authorization — Revoke/Modify',
    'Appeal a Privacy Decision',
    'Other Privacy Request',
];

const requestMailto = (requestType) =>
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Privacy Request: ${requestType}`)}`;

const privacyChoices = {
    effectiveDate: LEGAL_EFFECTIVE_DATE,
    intro: <Callout><Callout.Strong>This page is the consumer privacy hub.</Callout.Strong> Use the choices below to submit privacy requests, manage marketing preferences, and exercise sale/share or targeted-advertising rights where applicable. A separate California financial-privacy authorization, if you gave one, can also be revoked using the method stated in that authorization.</Callout>,
    sections: [
        {
            id: 's1',
            heading: 'Browser Privacy Signal',
            body: (
                <>
                    <GpcStatus />
                    <P>If your browser transmits a legally recognized opt-out preference signal, UnitedStatesCredit will treat that signal as an opt-out request where required by applicable law. The production advertising and analytics configuration must be connected to this preference so covered sale/sharing activity is suppressed.</P>
                </>
            ),
        },
        {
            id: 's2',
            heading: 'Common Privacy Choices',
            body: (
                <ChoiceGrid>
                    <Choice primary title='Do Not Sell or Share / Targeted Advertising' requestType={REQUEST_TYPES[0]} href={requestMailto(REQUEST_TYPES[0])}>Opt out of covered sale, sharing, or targeted advertising where state law gives you that right.</Choice>
                    <Choice title='Access / Know' requestType={REQUEST_TYPES[1]} href={requestMailto(REQUEST_TYPES[1])}>Request information about personal information we maintain about you, subject to applicable law.</Choice>
                    <Choice title='Correct' requestType={REQUEST_TYPES[2]} href={requestMailto(REQUEST_TYPES[2])}>Ask us to correct inaccurate personal information where the right applies.</Choice>
                    <Choice title='Delete' requestType={REQUEST_TYPES[3]} href={requestMailto(REQUEST_TYPES[3])}>Ask us to delete personal information, subject to legal, fraud, security, transaction, and recordkeeping exceptions.</Choice>
                    <Choice title='Marketing Email' requestType={REQUEST_TYPES[5]} href={requestMailto(REQUEST_TYPES[5])}>Use the unsubscribe link in the email or submit a request here. We may retain a suppression record after opt-out.</Choice>
                    <Choice title='SMS / Telephone Marketing' requestType={REQUEST_TYPES[6]} href={requestMailto(REQUEST_TYPES[6])}>Reply STOP to supported text campaigns, tell a caller to stop, or submit a request here.</Choice>
                </ChoiceGrid>
            ),
        },
        {
            // the package's anchor id — its tiles and other documents point here
            id: 'privacy-request',
            heading: 'Submit a Privacy Request',
            body: (
                <>
                    {/* DEVIATION — package: "The preferred production method is this web form. You may also email …" + <form>. */}
                    <P>To submit a privacy request, email <A href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</A> using one of the request links below, or tell us in your own words which request you are making. Do not include a Social Security number, bank-account number, password, or other sensitive credential in a privacy request.</P>
                    <Ul>
                        {REQUEST_TYPES.map((requestType) => (
                            <Li key={requestType}><A href={requestMailto(requestType)}>{requestType}</A></Li>
                        ))}
                    </Ul>
                    <P>Please include the email address you used with UnitedStatesCredit, your full name, and your state of residence. For security, we may request additional information reasonably necessary to verify identity or authority after receiving the request.</P>
                </>
            ),
        },
        {
            id: 's4',
            heading: 'California Financial Privacy Authorization',
            // DEVIATION — package: "You may also select the California financial-privacy option in the request form above."
            body: <P>If you previously provided a separate California financial-privacy authorization, the authorization itself explains how to revoke or modify it. You may also use the California Financial Privacy Authorization request link above. This Legal Center page is not a substitute for the separate consent acknowledgment required when California law requires one.</P>,
        },
        {
            id: 's5',
            heading: 'What Happens After a Request',
            body: <P>We may verify your identity or authority as permitted by law. We will process the request within the period required by applicable law and will explain any material denial or limitation. Certain information may need to be retained for fraud prevention, security, transaction administration, legal compliance, dispute resolution, or to keep an opt-out or suppression request effective.</P>,
        },
        {
            id: 's6',
            heading: 'Contact',
            body: <ContactBlock />,
        },
    ],
};

export default privacyChoices;
