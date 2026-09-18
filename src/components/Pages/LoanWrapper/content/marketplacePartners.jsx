import React from 'react';
import { P, CopyLink, ContactBlock } from '../components/Copy';
import MarketplacePartnersList from '../components/MarketplacePartnersList';
import { pathFor, LOAN_FORM_DOCS_EFFECTIVE_DATE } from '../loanPages';

// Intro verbatim from reference/USC_Loan_Form_Final_Compliance_Patch_Claude.md
// § G05 — do not edit copy. The list is live (MarketplacePartnersList).
const marketplacePartners = {
    effectiveDate: LOAN_FORM_DOCS_EFFECTIVE_DATE,
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
                    <P>This list covers companies involved in the requested financial transaction: direct lenders, lending platforms, aggregators, matching providers, and downstream buyers that may receive the application or obtain or use a consumer report for the requested credit transaction. Companies that only send promotional communications are listed separately under <CopyLink to={pathFor('marketing-partners')}>Marketing Partners</CopyLink>.</P>
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
