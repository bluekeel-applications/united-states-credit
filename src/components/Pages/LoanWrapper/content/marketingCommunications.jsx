import React from 'react';
import { P, Ul, Li, A, CopyLink, Callout, ContactBlock } from '../components/Copy';
import { pathFor, LEGAL_EFFECTIVE_DATE, LEGAL_LAST_UPDATED } from '../loanPages';

// Verbatim port of reference/usc-legal-center-deploy/marketing-communications.html — do not edit copy.
// Revised by reference/USC_Legal_Center_Final_Updates_Claude.md (revision 2.0) — the spec's PUBLIC COPY is verbatim too.
// This notice explains the practice. The operative TCPA / SMS / telephone
// consent language belongs at the point of collection, not here.
const marketingCommunications = {
    effectiveDate: LEGAL_EFFECTIVE_DATE,
    lastUpdated: LEGAL_LAST_UPDATED,
    intro: <Callout><Callout.Strong>Our marketing model:</Callout.Strong> UnitedStatesCredit collects the underlying records directly from consumers. Contracted list managers may store and actively manage those UnitedStatesCredit records, select and deploy offers, and share campaign revenue with UnitedStatesCredit. Under our list-management agreements, UnitedStatesCredit retains ownership or control of those records, and list managers are prohibited from selling, transferring, or independently using them outside the services authorized by their agreements and applicable law.</Callout>,
    sections: [
        {
            id: 's1',
            heading: '1. Information Used for Marketing',
            body: (
                <>
                    <P>Our marketing database may include first name, last name, postal address, email address, telephone or mobile number, source information, communication preferences, consent records, and suppression or opt-out status.</P>
                    <P>Our marketing and list-management records do not include Social Security numbers, bank-account or routing numbers, driver's-license numbers, consumer-report information, or other sensitive lender-application identifiers. We do not provide those fields to list managers, advertisers, email marketers, or SMS marketers for marketing purposes.</P>
                    <P>UnitedStatesCredit does not purchase consumer records or third-party consumer lists for inclusion in our loan-matching or first-party marketing databases. The underlying marketing contact records described in this notice are collected directly from consumers interacting with UnitedStatesCredit.</P>
                </>
            ),
        },
        {
            id: 's2',
            heading: '2. List Managers',
            body: (
                <>
                    <P>We may provide limited first-party contact records to contracted list-management and marketing companies. These companies may store the records in their own systems, actively manage the UnitedStatesCredit audience, select and deploy offers from multiple advertisers, administer authorized email or SMS campaigns, and measure campaign performance. Under our revenue-sharing arrangements, a manager may deduct agreed mailing or campaign expenses and pay UnitedStatesCredit a contractual share of the resulting revenue.</P>
                    <P>Under our list-management agreements, UnitedStatesCredit retains ownership or control of its underlying first-party marketing records. Our list managers are prohibited from selling, transferring, or independently using those records outside the services authorized by their agreements with UnitedStatesCredit and applicable law. A permitted subcontractor may process records only under applicable contractual restrictions. These arrangements do not limit consumers' privacy rights.</P>
                    <P>We provide records for these activities only where permitted by law and after obtaining any required authorization and honoring applicable privacy choices. Disclosing our marketing practices in this notice does not itself supply a consent that must be obtained separately.</P>
                </>
            ),
        },
        {
            id: 's3',
            heading: '3. Third-Party Offers',
            body: <P>A communication sent to a UnitedStatesCredit audience may promote a product or service supplied by a third party. The advertiser does not automatically receive the entire underlying UnitedStatesCredit list merely because its offer is promoted. If you click, respond, apply, or provide information directly to an advertiser, that advertiser may then collect information from you subject to its own terms and privacy policy.</P>,
        },
        {
            id: 's4',
            heading: '4. Email Marketing',
            body: <P>Commercial email sent by or on behalf of UnitedStatesCredit uses accurate sender and routing information, avoids deceptive subject lines, includes a valid physical postal address and any required advertising identification, and provides a functioning unsubscribe method. We honor applicable unsubscribe requests within 10 business days, or sooner where required, and retain only the suppression information needed to continue honoring the request. We monitor marketing conducted on our behalf.</P>,
        },
        {
            id: 's5',
            heading: '5. SMS and Text Messaging',
            body: (
                <>
                    <P>Where required by law, UnitedStatesCredit will obtain the applicable consent before sending or causing marketing text messages to be sent to a mobile number. Consent to unrelated marketing texts is not a condition of receiving the core loan-matching service where the marketing is not necessary to provide that service.</P>
                    <P>Message frequency may vary. Message and data rates may apply. For supported campaigns, reply <strong>STOP</strong> to stop future marketing messages from that sender or campaign and <strong>HELP</strong> for help. We will honor legally valid revocation requests using methods required by applicable law.</P>
                </>
            ),
        },
        {
            id: 's6',
            heading: '6. Telephone Marketing',
            body: <P>Where required by law, we will obtain the applicable consent before initiating or causing telemarketing calls using regulated automated dialing, artificial voice, prerecorded voice, or other technology subject to specific consent requirements. A consumer may ask that marketing calls stop.</P>,
        },
        {
            id: 's7',
            heading: '7. Direct Mail',
            body: <P>Where permitted by law, UnitedStatesCredit or a provider acting on our behalf may use a mailing address for direct-mail marketing. You may request that UnitedStatesCredit suppress future direct-mail marketing to your address by contacting us.</P>,
        },
        {
            id: 's8',
            heading: '8. Consent and Evidence',
            body: <P>We may retain evidence associated with marketing permission, including the contact information provided, date and time, IP or session data, source page, version of the consent language, consent status, revocation date and method, and suppression status. These records may be retained for compliance, auditing, dispute resolution, and enforcement of consumer preferences.</P>,
        },
        {
            id: 's9',
            heading: '9. Revocation and Opt-Out',
            body: (
                <Ul>
                    <Li><strong>Email:</strong> use the unsubscribe link in the marketing email.</Li>
                    <Li><strong>SMS:</strong> reply STOP where supported or use another reasonable revocation method recognized by law.</Li>
                    <Li><strong>Telephone:</strong> ask the caller to place the number on the applicable do-not-call list.</Li>
                    <Li><strong>Other privacy choices:</strong> visit <CopyLink to={pathFor('privacy-choices')}>Your Privacy Choices</CopyLink> or email <A href='mailto:info@bluekeel.com'>info@bluekeel.com</A>.</Li>
                </Ul>
            ),
        },
        {
            id: 's10',
            heading: '10. California Consumers',
            body: <P>California financial-privacy law may require explicit prior authorization before covered nonpublic personal information is disclosed to a nonaffiliated third party for certain marketing activities. Where that requirement applies, the authorization will be obtained separately before the disclosure. See our <CopyLink to={pathFor('california-financial-privacy')}>California Financial Privacy Notice</CopyLink>.</P>,
        },
        {
            id: 's11',
            heading: '11. State Privacy Opt-Outs',
            body: <P>Depending on the applicable state law, certain disclosures or advertising activities may be treated as a sale, sharing, or targeted advertising. Eligible consumers may exercise applicable opt-out rights through <CopyLink to={pathFor('privacy-choices')}>Your Privacy Choices</CopyLink>.</P>,
        },
        {
            id: 's12',
            heading: '12. Contact',
            body: <ContactBlock />,
        },
    ],
};

export default marketingCommunications;
