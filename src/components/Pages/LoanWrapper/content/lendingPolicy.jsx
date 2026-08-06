import React from 'react';
import { P, Ul, Li } from '../components/Copy';

// Verbatim port of reference/lending-policy(1).html — do not edit copy.
const lendingPolicy = {
    effectiveDate: 'August 4, 2026',
    sections: [
        {
            id: 's1',
            heading: 'Our role',
            body: <P>UnitedStatesCredit.com provides marketing and referral services that may help a consumer reach a participating provider. We may transmit submitted information to a platform, network, lender, broker, or other provider for evaluation.</P>,
        },
        {
            id: 's2',
            heading: 'What we do not do',
            body: (
                <Ul>
                    <Li>We do not lend money or extend credit.</Li>
                    <Li>We do not make underwriting or approval decisions.</Li>
                    <Li>We do not determine APR, fees, loan amount, repayment term, or funding time.</Li>
                    <Li>We do not service loans or collect loan payments.</Li>
                    <Li>We do not guarantee a provider response or offer.</Li>
                </Ul>
            ),
        },
        {
            id: 's3',
            heading: 'Provider evaluation',
            body: <P>A provider may evaluate credit history, consumer reports, income, employment, debt, state of residence, requested amount, bank-transaction information, identity, and other lawful factors. Criteria vary by provider.</P>,
        },
        {
            id: 's4',
            heading: 'Credit inquiries',
            body: <P>The initial experience may involve no inquiry, a soft inquiry, or another form of data review. A provider may later request authorization for a hard inquiry that can affect a credit score. The live form and provider disclosures—not this general policy—control.</P>,
        },
        {
            id: 's5',
            heading: 'State availability',
            body: <P>Products are subject to federal and state law and may not be offered in all states. Loan amounts, rates, fees, and terms may differ by state. Providers are responsible for their licensing and product availability.</P>,
        },
        {
            id: 's6',
            heading: 'Funding',
            body: <P>Funding is never guaranteed. Even after a conditional approval, identity, income, bank, or other verification may be required. Timing depends on provider processing, bank processing, weekends, holidays, and completion of requirements.</P>,
        },
        {
            id: 's7',
            heading: 'Consumer responsibility',
            body: <P>Provide accurate information, review all documents, confirm the provider’s identity, understand payment obligations, and do not pay an upfront fee to obtain a personal loan unless it is clearly lawful and disclosed.</P>,
        },
    ],
};

export default lendingPolicy;
