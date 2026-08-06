import React from 'react';
import { P, Ul, Li, A, Callout } from '../components/Copy';

// Verbatim port of reference/california-privacy(1).html — do not edit copy.
const californiaPrivacy = {
    effectiveDate: 'August 4, 2026',
    intro: <Callout><Callout.Strong>A functional “Do Not Sell or Share My Personal Information” mechanism—not only a policy page—may be required depending on BlueKeel’s thresholds and data practices.</Callout.Strong></Callout>,
    sections: [
        {
            id: 's1',
            heading: 'Applicability',
            body: <P>This notice supplements the Privacy Policy for California residents. Rights depend on whether BlueKeel is subject to the CCPA for the relevant processing and whether an exception applies.</P>,
        },
        {
            id: 's2',
            heading: 'Categories collected',
            body: <P>In the preceding 12 months, categories may include identifiers; customer-record information; protected classification information voluntarily provided; commercial information; internet or network activity; geolocation derived from IP address; professional or employment information; inferences; and sensitive personal information such as account credentials, precise financial information, government identifiers, or information used for identity and application processing.</P>,
        },
        {
            id: 's3',
            heading: 'Sources and purposes',
            body: <P>Sources may include you, your device, publishers, affiliates, form and technology providers, participating providers, data vendors, and fraud-prevention services. Purposes include operating and securing the site, processing and routing requests, advertising attribution, analytics, fraud prevention, compliance, and communicating as authorized.</P>,
        },
        {
            id: 's4',
            heading: 'Disclosure, sale, and sharing',
            body: <P>Categories may be disclosed to service providers, contractors, participating providers, lender networks, lead purchasers, analytics and advertising partners, and legal authorities. Some lead distribution or advertising activity may be considered a sale or sharing under California law. We do not knowingly sell or share personal information of consumers under 16.</P>,
        },
        {
            id: 's5',
            heading: 'California rights',
            body: (
                <Ul>
                    <Li>Know/access categories and specific pieces of personal information.</Li>
                    <Li>Delete personal information, subject to exceptions.</Li>
                    <Li>Correct inaccurate personal information.</Li>
                    <Li>Opt out of sale or sharing.</Li>
                    <Li>Limit certain uses or disclosures of sensitive personal information where the right applies.</Li>
                    <Li>Receive equal service and price without unlawful discrimination for exercising rights.</Li>
                </Ul>
            ),
        },
        {
            id: 's6',
            heading: 'How to exercise rights',
            body: <P>Email <A href='mailto:info@bluekeel.com'>info@bluekeel.com</A> with the subject “California Privacy Request.” State the right you wish to exercise and provide information reasonably necessary to verify the request. You may use an authorized agent; we may request proof of authorization and identity verification.</P>,
        },
        {
            id: 's7',
            heading: 'Opt-out preference signals',
            body: <P>Where legally required and technically supported, we will process recognized opt-out preference signals, such as Global Privacy Control, as a request to opt out for the browser or device sending the signal.</P>,
        },
        {
            id: 's8',
            heading: 'Retention',
            body: <P>Retention periods vary by category and are based on transaction and consent records, legal obligations, fraud prevention, dispute resolution, business needs, and the sensitivity of the information.</P>,
        },
        {
            id: 's9',
            heading: 'Metrics and updates',
            body: <P>If required by law, we will publish request metrics. We may update this notice to reflect changes in law or processing.</P>,
        },
    ],
};

export default californiaPrivacy;
