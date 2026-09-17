import React from 'react';
import { P, H3, CopyLink, Callout, Table, ContactBlock } from '../components/Copy';
import { pathFor, LEGAL_EFFECTIVE_DATE, LEGAL_LAST_UPDATED } from '../loanPages';

// Verbatim port of reference/usc-legal-center-deploy/cookies-tracking.html — do not edit copy.
// Revised by reference/USC_Legal_Center_Final_Updates_Claude.md (revision 2.0) — the spec's PUBLIC COPY is verbatim too.
const cookiesTracking = {
    effectiveDate: LEGAL_EFFECTIVE_DATE,
    lastUpdated: LEGAL_LAST_UPDATED,
    intro: <Callout><Callout.Strong>Tracking technologies:</Callout.Strong> UnitedStatesCredit uses cookies and similar technologies for site operation, security, measurement, attribution, and advertising. Some advertising-related activity may be subject to state opt-out rights.</Callout>,
    sections: [
        {
            id: 's1',
            heading: '1. What Are Cookies and Similar Technologies?',
            body: <P>Cookies are small data files stored by a browser. Similar technologies include pixels, tags, local storage, software development kits, and other identifiers that can help recognize a browser, device, session, or interaction.</P>,
        },
        {
            id: 's2',
            heading: '2. Categories We May Use',
            body: (
                <Table
                    head={['Category', 'Typical purpose']}
                    rows={[
                        ['Strictly necessary / security', 'Operate the site, maintain sessions, prevent fraud, protect forms, and support security.'],
                        ['Functional', 'Remember preferences and improve site usability.'],
                        ['Analytics / measurement', 'Measure traffic, page performance, conversion, and user interaction.'],
                        ['Advertising / attribution', 'Measure campaign performance, attribute traffic, limit duplicate activity, and support advertising.'],
                    ]}
                />
            ),
        },
        {
            id: 's3',
            heading: '3. Information Involved',
            body: (
                <>
                    <P>Cookie and tracking information may include IP address, browser and device information, page and referrer data, campaign or affiliate identifiers, event timestamps, conversion events, and cookie or device identifiers.</P>
                    <P>We do not place Social Security numbers, bank-account information, or other sensitive application identifiers in advertising cookies, marketing pixels, or advertising-event payloads.</P>
                </>
            ),
        },
        {
            id: 's4',
            heading: '4. Advertising and State Privacy Law',
            body: <P>Some state laws may treat certain advertising-related disclosures as a sale, sharing, or targeted advertising even when data is exchanged for measurement or advertising rather than sold as a traditional list. Where an opt-out right applies, use <CopyLink to={pathFor('privacy-choices')}>Your Privacy Choices</CopyLink>.</P>,
        },
        {
            id: 's5',
            heading: '5. Global Privacy Control and Other Signals',
            body: (
                <>
                    <P>Where required by law, we process qualifying browser-based opt-out preference signals, including Global Privacy Control. We apply the preference to the browser or device sending the signal and to associated personal information when we can identify the consumer as required by law. You are not required to provide additional information to have the browser signal honored. You may provide contact information voluntarily to help us apply a request to additional records.</P>
                    <H3>Do Not Track and Other Browser Privacy Signals</H3>
                    <P>Some browsers offer a legacy Do Not Track, or DNT, setting. We do not currently treat a legacy DNT signal by itself as an opt-out request. We do process qualifying legally required opt-out preference signals, including Global Privacy Control, as described in <CopyLink to={`${pathFor('privacy-choices')}#sale-sharing`}>Your Privacy Choices</CopyLink>. DNT and Global Privacy Control are different signals.</P>
                    <P>Third-party advertising and analytics providers may collect information about your online activity over time and across different websites or online services when their technologies operate on our site, subject to applicable law and your privacy choices.</P>
                </>
            ),
        },
        {
            id: 's6',
            heading: '6. Browser Controls',
            body: <P>Most browsers allow users to delete or block cookies through browser settings. Blocking necessary cookies may cause parts of the site to stop working. Browser cookie controls are not always equivalent to a statutory request to opt out of sale or sharing; use our Privacy Choices page for those requests.</P>,
        },
        {
            id: 's7',
            heading: '7. Third-Party Technology',
            body: <P>Third-party analytics, advertising, fraud, and infrastructure providers may set or read technologies according to their roles and contractual terms. When a provider acts as our service provider or processor, we impose the restrictions required by applicable law. Third parties acting independently may have their own privacy practices.</P>,
        },
        {
            id: 's8',
            heading: '8. Changes',
            body: <P>We may update this notice when technologies, providers, or legal requirements change. The current effective date appears at the top of this page.</P>,
        },
        {
            id: 's9',
            heading: '9. Contact',
            body: <ContactBlock />,
        },
    ],
};

export default cookiesTracking;
