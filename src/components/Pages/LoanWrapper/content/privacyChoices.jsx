import React from 'react';
import { P, Callout, ContactBlock } from '../components/Copy';
import { PrivacySignalStatus, BrowserOptOut, ContactRecordsRoute, ChoiceGrid, Choice, PrivacyRequest, CaliforniaAuthorizationRoute } from '../components/PrivacyChoices';
import { LEGAL_EFFECTIVE_DATE, LEGAL_LAST_UPDATED } from '../loanPages';

// Copy: reference/usc-legal-center-deploy/privacy-choices.html as revised by
// reference/USC_Legal_Center_Final_Updates_Claude.md (C01, C02.3) — do not edit copy.
// Section ids `sale-sharing` and `privacy-request` are linked from the footer
// and from other documents; keep them.
const privacyChoices = {
    effectiveDate: LEGAL_EFFECTIVE_DATE,
    lastUpdated: LEGAL_LAST_UPDATED,
    intro: <Callout><Callout.Strong>This page is the consumer privacy hub.</Callout.Strong> Use the choices below to submit privacy requests, manage marketing preferences, and exercise sale/share or targeted-advertising rights where applicable. A separate California financial-privacy authorization, if you gave one, can also be revoked using the method stated in that authorization.</Callout>,
    sections: [
        {
            id: 's1',
            heading: 'Browser Privacy Signal',
            body: (
                <>
                    <PrivacySignalStatus />
                    <P>Where applicable law requires, we process a qualifying opt-out preference signal, such as Global Privacy Control, as a request to opt out of the sale or sharing of personal information and applicable targeted advertising. The preference applies to this browser or device and, when we can associate the signal with you, to the related personal information as required by law. You do not need to create an account or provide additional information for us to process the browser signal.</P>
                </>
            ),
        },
        {
            id: 'sale-sharing',
            heading: 'Do Not Sell or Share My Personal Information',
            body: (
                <>
                    <P>Use the button below to opt out of covered sale, sharing, and targeted advertising for this browser or device. No name, email address, account, or identity verification is required for this browser choice.</P>
                    <BrowserOptOut />
                    <ContactRecordsRoute />
                </>
            ),
        },
        {
            id: 's3',
            heading: 'Common Privacy Choices',
            body: (
                <ChoiceGrid>
                    <Choice primary title='Do Not Sell or Share / Targeted Advertising' requestType='opt_out_sale_share'>Opt out of covered sale, sharing, or targeted advertising where state law gives you that right.</Choice>
                    <Choice title='Access / Know' requestType='access'>Request information about personal information we maintain about you, subject to applicable law.</Choice>
                    <Choice title='Correct' requestType='correct'>Ask us to correct inaccurate personal information where the right applies.</Choice>
                    <Choice title='Delete' requestType='delete'>Ask us to delete personal information, subject to legal, fraud, security, transaction, and recordkeeping exceptions.</Choice>
                    <Choice title='Marketing Email' requestType='marketing_email'>Use the unsubscribe link in the email or submit a request here. We may retain a suppression record after opt-out.</Choice>
                    <Choice title='SMS / Telephone Marketing' requestType='marketing_sms_phone'>Reply STOP to supported text campaigns, tell a caller to stop, or submit a request here.</Choice>
                </ChoiceGrid>
            ),
        },
        {
            id: 'privacy-request',
            heading: 'Submit a Privacy Request',
            body: <PrivacyRequest />,
        },
        {
            id: 's5',
            heading: 'California Financial Privacy Authorization',
            body: <CaliforniaAuthorizationRoute />,
        },
        {
            id: 's6',
            heading: 'What Happens After a Request',
            body: <P>We will process your request within the time required by applicable law. Where verification is appropriate, we will request only information reasonably needed for that purpose. We will explain a denial or limitation and provide any applicable appeal instructions. Certain information may be retained where permitted or required for security, fraud prevention, legal compliance, transaction administration, dispute resolution, or maintaining an effective suppression record. A request to stop covered sale, sharing, or marketing is not delayed merely because a separate request to access information requires verification.</P>,
        },
        {
            id: 's7',
            heading: 'Contact',
            body: <ContactBlock />,
        },
    ],
};

export default privacyChoices;
