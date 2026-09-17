import React from 'react';
import { P, CopyLink, Callout, ContactBlock } from '../components/Copy';
import { pathFor, LEGAL_EFFECTIVE_DATE } from '../loanPages';

// Verbatim port of reference/usc-legal-center-deploy/lending-policy.html — do not edit copy.
const lendingPolicy = {
    effectiveDate: LEGAL_EFFECTIVE_DATE,
    intro: <Callout><Callout.Strong>How the service works:</Callout.Strong> UnitedStatesCredit receives a consumer's request and may route it through a network of participating lenders using eligibility rules, geography, application information, lender criteria, fraud controls, and commercial terms. The lender—not UnitedStatesCredit—decides whether to offer credit.</Callout>,
    sections: [
        {
            id: 's1',
            heading: '1. Our Role',
            body: <P>UnitedStatesCredit is a loan-matching and information service. We are not a lender, do not fund loans, and do not make credit decisions.</P>,
        },
        {
            id: 's2',
            heading: '2. Submitting a Loan Request',
            body: <P>When you submit a loan request, you are asking UnitedStatesCredit to attempt to identify participating lenders or financial-service providers that may be willing to consider your request. The request may be transmitted to one or more participating providers as reasonably necessary to perform the requested matching service and as authorized by the consent presented with the form.</P>,
        },
        {
            id: 's3',
            heading: '3. Automated Routing and Matching',
            body: (
                <>
                    <P>Our systems may automatically route requests based on factors such as state, loan amount, income, employment, product availability, lender criteria, prior activity or duplication indicators, fraud-prevention signals, technical availability, expected lender response, and commercial terms.</P>
                    <P>Routing is not underwriting and is not a determination of creditworthiness. A lender applies its own underwriting and verification standards.</P>
                </>
            ),
        },
        {
            id: 's4',
            heading: '4. Ping/Post and Lender Selection',
            body: (
                <>
                    <P>Where supported by the participating lender network, our systems may exchange limited information or eligibility signals before transmitting a more complete application. Participating providers may respond with availability, pricing, or other routing information. UnitedStatesCredit may use those responses and commercial considerations to select where a request is sent.</P>
                    <P>This process is designed to facilitate a consumer-requested transaction; it does not guarantee that the receiving lender will approve the consumer or offer the amount requested.</P>
                </>
            ),
        },
        {
            id: 's5',
            heading: '5. Compensation Can Affect Routing',
            body: (
                <>
                    <P>UnitedStatesCredit may be paid differently by different participating lenders or partners. Compensation, anticipated value, or commercial terms may affect which lender receives a request, the sequence in which lenders are considered, or which offers or providers are displayed. We do not represent that our service searches every lender or identifies the lowest-cost loan available in the market.</P>
                    <P>See the <CopyLink to={pathFor('advertiser-disclosure')}>Advertiser & Compensation Disclosure</CopyLink>.</P>
                </>
            ),
        },
        {
            id: 's6',
            heading: '6. Lender Decisions',
            body: <P>Each lender is independently responsible for its decision to approve, deny, verify, or request additional information. UnitedStatesCredit does not control a lender's underwriting, pricing, documentation requirements, credit inquiry, funding, servicing, or collection practices.</P>,
        },
        {
            id: 's7',
            heading: '7. Credit Reports',
            body: <P>UnitedStatesCredit does not itself obtain consumer reports for this loan-matching service. A participating lender may obtain a consumer report where permitted by law and may require a separate authorization or disclosure.</P>,
        },
        {
            id: 's8',
            heading: '8. Fraud Prevention and Verification',
            body: <P>We may use automated and manual measures to detect suspected fraud, duplicate submissions, identity inconsistencies, abusive traffic, invalid contact information, or other security risks. A request may be blocked, delayed, or not routed if our systems identify a material fraud or security concern.</P>,
        },
        {
            id: 's9',
            heading: '9. State Availability and Licensing',
            body: <P>Not all lenders or loan products are available in every state. Participating providers are responsible for operating under the licenses, registrations, exemptions, or other authority applicable to their lending activities. UnitedStatesCredit may restrict or discontinue matching activity in a jurisdiction where required by law or business policy.</P>,
        },
        {
            id: 's10',
            heading: '10. Responsible Borrowing',
            body: <P>Borrow only an amount you can reasonably repay. Review the lender's APR, finance charge, payment schedule, fees, and consequences of default before accepting an offer. If you do not understand an offer, ask the lender to explain it before agreeing.</P>,
        },
        {
            id: 's11',
            heading: '11. Complaints About a Lender',
            body: <P>Questions about a lender's underwriting, loan agreement, payment processing, servicing, collections, or account should generally be directed to that lender. If your concern involves UnitedStatesCredit's matching service or data practices, contact us using the information below.</P>,
        },
        {
            id: 's12',
            heading: '12. Contact',
            body: <ContactBlock />,
        },
    ],
};

export default lendingPolicy;
