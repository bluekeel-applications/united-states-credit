import React from 'react';
import { P } from '../components/Copy';

// Verbatim port of reference/advertiser-disclosure.html — do not edit copy.
const advertiserDisclosure = {
    effectiveDate: 'August 4, 2026',
    sections: [
        {
            id: 's1',
            heading: 'Compensation',
            body: <P>BlueKeel LLC may receive compensation from providers, networks, advertisers, publishers, and other commercial partners for leads, referrals, clicks, applications, funded transactions, advertising placement, or other consumer actions.</P>,
        },
        {
            id: 's2',
            heading: 'Effect on presentation',
            body: <P>Compensation may affect whether a provider or offer appears, where it appears, and whether it is available through the site. The site does not necessarily include every lender or product available to you.</P>,
        },
        {
            id: 's3',
            heading: 'No endorsement or guarantee',
            body: <P>Appearance on the site is not a guarantee, endorsement, recommendation, or representation that a provider or product is best for you. Providers control their own products, decisions, disclosures, and service.</P>,
        },
        {
            id: 's4',
            heading: 'Editorial and educational content',
            body: <P>Educational content is intended to help consumers understand financial concepts. Commercial relationships may exist with companies mentioned in content. Where practical, material relationships will be disclosed near the relevant content.</P>,
        },
        {
            id: 's5',
            heading: 'Consumer cost',
            body: <P>BlueKeel does not charge consumers a fee to use the referral service. A provider may charge interest and fees under its agreement. Compensation paid to BlueKeel does not necessarily mean your cost is higher or lower than it would be elsewhere.</P>,
        },
    ],
};

export default advertiserDisclosure;
