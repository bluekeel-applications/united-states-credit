import React from 'react';
import { P, CopyLink } from '../components/Copy';
import { pathFor } from '../loanPages';

// Verbatim port of reference/how-it-works.html — do not edit copy.
const howItWorksPage = {
    effectiveDate: 'August 4, 2026',
    sections: [
        {
            id: 's1',
            heading: '1. You visit UnitedStatesCredit.com',
            body: <P>The page explains the referral service and displays a form provided or controlled by a third-party platform or provider.</P>,
        },
        {
            id: 's2',
            heading: '2. You complete the form',
            body: <P>You enter the requested information and review the consent, authorization, privacy, and electronic-record language displayed with the form.</P>,
        },
        {
            id: 's3',
            heading: '3. Information is processed',
            body: <P>The form provider may validate and route information to one or more participating providers or networks, as described in the form and Privacy Policy.</P>,
        },
        {
            id: 's4',
            heading: '4. A provider evaluates the request',
            body: <P>A provider uses its own criteria and may request additional information or authorization. United States Credit does not participate in the credit decision.</P>,
        },
        {
            id: 's5',
            heading: '5. You may receive a response',
            body: <P>A response may be an offer, a request for more information, a redirect, a notice that no option is available, or contact from a provider. A response is not guaranteed.</P>,
        },
        {
            id: 's6',
            heading: '6. You review the provider’s terms',
            body: <P>Before accepting, review the provider’s identity, APR, fees, amount financed, payment amount, payment schedule, total cost, privacy policy, and other disclosures.</P>,
        },
        {
            id: 's7',
            heading: '7. The provider handles the transaction',
            body: <P>If you accept and satisfy final requirements, the provider—not United States Credit—handles documentation, funding, servicing, payments, and support.</P>,
        },
        {
            id: 's8',
            heading: 'Compensation',
            body: <P>BlueKeel may receive compensation for referrals or other consumer actions. See the <CopyLink to={pathFor('advertiser-disclosure')}>Advertiser Disclosure</CopyLink>.</P>,
        },
    ],
};

export default howItWorksPage;
