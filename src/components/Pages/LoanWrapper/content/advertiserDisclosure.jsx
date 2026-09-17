import React from 'react';
import { P, Callout, ContactBlock } from '../components/Copy';
import { LEGAL_EFFECTIVE_DATE, LEGAL_LAST_UPDATED } from '../loanPages';

// Verbatim port of reference/usc-legal-center-deploy/advertiser-disclosure.html — do not edit copy.
// Revised by reference/USC_Legal_Center_Final_Updates_Claude.md (revision 2.0) — the spec's PUBLIC COPY is verbatim too.
const advertiserDisclosure = {
    effectiveDate: LEGAL_EFFECTIVE_DATE,
    lastUpdated: LEGAL_LAST_UPDATED,
    intro: <Callout><Callout.Strong>Compensation disclosure:</Callout.Strong> UnitedStatesCredit is a commercial service. We may receive compensation from lenders, advertisers, affiliates, list managers, or other partners, and that compensation may affect routing, placement, or which products are shown.</Callout>,
    sections: [
        {
            id: 's1',
            heading: '1. How We Are Compensated',
            body: <P>UnitedStatesCredit may receive compensation in several ways, including payments based on clicks, leads, applications, accepted leads, funded loans, advertising impressions, advertising engagement, campaign performance, referrals, revenue-sharing arrangements, or other commercial agreements.</P>,
        },
        {
            id: 's2',
            heading: '2. Lender Compensation and Routing',
            body: (
                <>
                    <P>Participating lenders may pay different amounts or use different commercial structures. Those differences may influence the order in which lenders are considered, where an application is routed, whether a provider is displayed, or how prominently an offer is presented.</P>
                    <P>UnitedStatesCredit does not represent that it searches every lender, presents every available product, or identifies the lowest APR or lowest-cost option available to a consumer.</P>
                </>
            ),
        },
        {
            id: 's3',
            heading: '3. Sponsored and Affiliate Content',
            body: <P>Some links, offers, product placements, advertisements, or calls to action may be sponsored or may generate compensation if a consumer clicks, applies, purchases, or completes another action. Sponsored relationships do not change the terms ultimately offered by a third-party lender unless the lender expressly states otherwise.</P>,
        },
        {
            id: 's4',
            heading: '4. Display and Contextual Advertising',
            body: <P>Pages may contain advertising supplied by third-party advertising providers. Advertising providers may use cookies or similar technology subject to our Privacy Policy, Cookie & Tracking Technologies Notice, and applicable privacy choices.</P>,
        },
        {
            id: 's5',
            heading: '5. Marketing Through First-Party Lists',
            body: (
                <>
                    <P>We may provide limited first-party contact records to contracted list-management and marketing companies. These companies may store the records in their own systems, actively manage the UnitedStatesCredit audience, select and deploy offers from multiple advertisers, administer authorized email or SMS campaigns, and measure campaign performance. Under our revenue-sharing arrangements, a manager may deduct agreed mailing or campaign expenses and pay UnitedStatesCredit a contractual share of the resulting revenue.</P>
                    <P>Under our list-management agreements, UnitedStatesCredit retains ownership or control of its underlying first-party marketing records. Our list managers are prohibited from selling, transferring, or independently using those records outside the services authorized by their agreements with UnitedStatesCredit and applicable law. A permitted subcontractor may process records only under applicable contractual restrictions. These arrangements do not limit consumers' privacy rights.</P>
                    <P>Our marketing and list-management records do not include Social Security numbers, bank-account or routing numbers, driver's-license numbers, consumer-report information, or other sensitive lender-application identifiers. We do not provide those fields to list managers, advertisers, email marketers, or SMS marketers for marketing purposes.</P>
                    <P>We provide records for these activities only where permitted by law and after obtaining any required authorization and honoring applicable privacy choices. Disclosing our marketing practices in this notice does not itself supply a consent that must be obtained separately.</P>
                </>
            ),
        },
        {
            id: 's6',
            heading: '6. Advertisers Do Not Become Your Lender Merely by Advertising',
            body: <P>An advertiser shown in an email, text message, display advertisement, or website placement is not necessarily a lender participating in the loan request you submitted. If you voluntarily interact with a third-party advertiser, that advertiser's own terms, eligibility rules, and privacy practices apply.</P>,
        },
        {
            id: 's7',
            heading: '7. Editorial and Educational Content',
            body: <P>Educational articles and guides may discuss companies or financial products that have commercial relationships with UnitedStatesCredit. Content is general information and should not be treated as individualized financial advice or as a representation that a product is suitable for every consumer.</P>,
        },
        {
            id: 's8',
            heading: '8. Questions',
            body: <ContactBlock />,
        },
    ],
};

export default advertiserDisclosure;
