import React from 'react';
import { P, Ul, Li, A, H3, CopyLink, Callout, ContactBlock } from '../components/Copy';
import { pathFor, LEGAL_EFFECTIVE_DATE } from '../loanPages';

// Verbatim port of reference/usc-legal-center-deploy/state-privacy-rights.html — do not edit copy.
// Replaces the CCPA-only California Privacy Notice; /loans/california-privacy
// redirects here (LEGACY_SLUGS).
const statePrivacyRights = {
    effectiveDate: LEGAL_EFFECTIVE_DATE,
    intro: <Callout><Callout.Strong>State privacy rights vary.</Callout.Strong> This notice provides a unified way to understand and exercise rights that may apply under U.S. state comprehensive privacy laws. Financial information may be governed by separate federal or state financial-privacy laws and may be exempt from some state comprehensive-privacy provisions.</Callout>,
    sections: [
        {
            id: 's1',
            heading: '1. Rights That May Be Available',
            body: (
                <>
                    <P>Depending on your state of residence, the type of information, and applicable exemptions, you may have the right to:</P>
                    <Ul>
                        <Li>confirm whether we process personal information about you;</Li>
                        <Li>access personal information or obtain specific pieces of information;</Li>
                        <Li>correct inaccurate personal information;</Li>
                        <Li>request deletion;</Li>
                        <Li>obtain a portable copy of certain information;</Li>
                        <Li>opt out of the sale of personal information;</Li>
                        <Li>opt out of sharing or processing for targeted advertising;</Li>
                        <Li>opt out of certain profiling or automated decision-making activities where applicable;</Li>
                        <Li>limit certain uses or disclosures of sensitive personal information where applicable;</Li>
                        <Li>withdraw consent for processing that relies on consent; and</Li>
                        <Li>appeal our decision on a privacy request where state law provides an appeal right.</Li>
                    </Ul>
                </>
            ),
        },
        {
            id: 's2',
            heading: '2. Categories of Personal Information',
            body: (
                <>
                    <P>Depending on your interaction with the service, we may collect identifiers and contact information; loan-request and financial information; commercial and transaction information; internet or electronic activity; approximate location inferred from technical information; employment or professional information; sensitive information used for lender transmission; and limited inferences, fraud-prevention signals, or routing information.</P>
                    <P>For details, see our <CopyLink to={pathFor('privacy-policy')}>Privacy Policy</CopyLink>.</P>
                </>
            ),
        },
        {
            id: 's3',
            heading: '3. Sources',
            body: <P>We collect information primarily directly from consumers. We also collect technical data automatically and may receive limited routing, transaction-status, attribution, analytics, or fraud-prevention information from lenders and service providers. We do not purchase third-party loan-application lists for resale through the loan-matching service described in our policies.</P>,
        },
        {
            id: 's4',
            heading: '4. Purposes',
            body: <P>We use personal information to provide and secure the loan-matching service; route requests to participating lenders; communicate with consumers; prevent fraud; maintain consent, privacy, and suppression records; improve services; attribute advertising; conduct marketing permitted by law; and comply with legal obligations.</P>,
        },
        {
            id: 's5',
            heading: '5. Categories of Recipients',
            body: <P>Recipients may include participating lenders and financial-service providers; hosting, security, fraud-prevention, analytics, compliance, communications, and data-processing providers; contracted list-management and marketing companies; advertising and analytics providers; professional advisers; regulators and law-enforcement agencies; and parties to a lawful corporate transaction.</P>,
        },
        {
            id: 's6',
            heading: '6. Sale, Sharing, and Targeted Advertising',
            body: (
                <>
                    <P>Some state laws define "sale" broadly to include certain transfers for valuable consideration and define "sharing" or targeted advertising to include certain advertising-related disclosures. Because UnitedStatesCredit uses advertising technology and contracted marketing/list-management arrangements, some activities may be treated as a sale, sharing, or targeted advertising under a particular state's law.</P>
                    <P>Where an opt-out right applies, you may exercise it through <CopyLink to={pathFor('privacy-choices')}>Your Privacy Choices</CopyLink>. Transfers to service providers or processors acting only on our behalf under legally compliant contracts may be excluded from these definitions under applicable law.</P>
                </>
            ),
        },
        {
            id: 's7',
            heading: '7. Sensitive Personal Information',
            body: (
                <>
                    <P>We may process sensitive lender-application information such as Social Security number or bank-account information solely as needed to transmit a requested loan application to participating lenders. UnitedStatesCredit does not use that information for unrelated marketing and does not persistently retain Social Security numbers or bank-account information after transmission.</P>
                    <P>Where a state law requires consent or provides a right to limit a sensitive-data use that is not otherwise exempt, we will provide the applicable choice.</P>
                </>
            ),
        },
        {
            id: 's8',
            heading: '8. California Residents',
            body: (
                <>
                    <P>California residents may have rights under the California Consumer Privacy Act (CCPA), including rights to know/access, delete, correct, opt out of sale or sharing, limit certain uses of sensitive personal information, and receive equal service and pricing when exercising CCPA rights, subject to statutory exceptions.</P>
                    <P>We honor qualifying browser-based opt-out preference signals, including Global Privacy Control, as required by California law. Financial information subject to the Gramm-Leach-Bliley Act or the California Financial Information Privacy Act may be exempt from some CCPA provisions, while other website, advertising, or technical information may remain subject to the CCPA.</P>
                    <P>California consumers should also review our <CopyLink to={pathFor('california-financial-privacy')}>California Financial Privacy Notice</CopyLink>.</P>
                    <H3>California direct-marketing disclosure requests</H3>
                    <P>California residents may also have rights to request certain information about disclosures of personal information for third-party direct-marketing purposes under California's direct-marketing law. Requests may be sent to <A href='mailto:info@bluekeel.com?subject=California%20Direct%20Marketing%20Request'>info@bluekeel.com</A> with the subject "California Direct Marketing Request."</P>
                </>
            ),
        },
        {
            id: 's9',
            heading: '9. Requests to Access, Correct, Delete, or Obtain a Copy',
            body: <P>Submit a request through <CopyLink to={pathFor('privacy-choices')}>Your Privacy Choices</CopyLink> or email <A href='mailto:info@bluekeel.com'>info@bluekeel.com</A>. We may ask for information reasonably necessary to verify identity and authority. We will not request more information than reasonably necessary for verification.</P>,
        },
        {
            id: 's10',
            heading: '10. Authorized Agents',
            body: <P>Where state law permits an authorized agent to submit a request, we may request evidence of the agent's authority and may ask the consumer to verify identity or confirm the authorization directly.</P>,
        },
        {
            id: 's11',
            heading: '11. Appeals',
            body: <P>If your state provides a right to appeal and we deny a privacy request, you may appeal by emailing <A href='mailto:info@bluekeel.com?subject=Privacy%20Request%20Appeal'>info@bluekeel.com</A> with the subject "Privacy Request Appeal" and identifying the original request. We will respond within the period required by applicable law.</P>,
        },
        {
            id: 's12',
            heading: '12. Non-Discrimination',
            body: <P>We will not unlawfully discriminate against a consumer for exercising a privacy right. This does not prevent differences permitted by law, including a bona fide financial incentive program that separately satisfies applicable requirements.</P>,
        },
        {
            id: 's13',
            heading: '13. Timing',
            body: <P>We respond to verified privacy requests within the time required by applicable law. California requests to know, delete, or correct are generally subject to a 45-day response period, with a legally permitted extension when reasonably necessary and with required notice.</P>,
        },
        {
            id: 's14',
            heading: '14. Retention',
            body: <P>We retain each category only as long as reasonably necessary and proportionate to the disclosed purpose, legal requirements, security, fraud prevention, dispute resolution, consent evidence, and suppression obligations. A suppression record may be retained after an opt-out so we can continue honoring the request.</P>,
        },
        {
            id: 's15',
            heading: '15. Contact',
            body: <ContactBlock />,
        },
    ],
};

export default statePrivacyRights;
