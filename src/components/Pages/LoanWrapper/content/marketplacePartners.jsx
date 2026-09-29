import React from 'react';
import { P, CopyLink, ContactBlock } from '../components/Copy';
import MarketplacePartnersList from '../components/MarketplacePartnersList';
import { pathFor, LOAN_FORM_DOCS_EFFECTIVE_DATE, LEGAL_LAST_UPDATED_2_2 } from '../loanPages';

// Intro verbatim from reference/USC_Loan_Form_Final_Compliance_Patch_Claude.md
// § G05 — do not edit copy. The list is live (MarketplacePartnersList).
// "About this list", first paragraph: verbatim from
// reference/USC_Final_Compliance_Cleanup_Claude_2026-09-29.md § 3.6 — the
// separate directory of promotional senders was retired; marketing and
// list-management practices are described in the Marketing & Communications
// Privacy Notice.
const marketplacePartners = {
    effectiveDate: LOAN_FORM_DOCS_EFFECTIVE_DATE,
    lastUpdated: LEGAL_LAST_UPDATED_2_2,
    intro: <P>These companies may participate in evaluating, matching, or responding to a loan request submitted through UnitedStatesCredit. The companies involved in a particular request may vary based on the information provided, eligibility criteria, availability, and routing.</P>,
    sections: [
        {
            id: 's1',
            heading: 'Current list',
            body: <MarketplacePartnersList />,
        },
        {
            id: 's2',
            heading: 'About this list',
            body: (
                <>
                    <P>This list is limited to companies involved in the requested financial transaction: direct lenders, lending platforms, aggregators, matching providers, and downstream buyers that may receive the application or obtain or use a consumer report for the requested credit transaction. Separate marketing and list-management practices are described in our <CopyLink to={pathFor('marketing-communications')}>Marketing & Communications Privacy Notice</CopyLink>.</P>
                    <P>The version in force when you submit a request is recorded with your authorization. Your consumer-report authorization is described in the <CopyLink to={pathFor('fcra-authorization')}>FCRA Authorization & Disclosure</CopyLink>; how requests are routed is described in our <CopyLink to={pathFor('lending-policy')}>Lending & Matching Policy</CopyLink>.</P>
                </>
            ),
        },
        {
            id: 's3',
            heading: 'Contact',
            body: <ContactBlock />,
        },
    ],
};

export default marketplacePartners;
