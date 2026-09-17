import React from 'react';
import { P, Ul, Li, A, CopyLink, Callout, ContactBlock } from '../components/Copy';
import { pathFor, LEGAL_EFFECTIVE_DATE } from '../loanPages';

// Verbatim port of reference/usc-legal-center-deploy/marketing-communications.html — do not edit copy.
// This notice explains the practice. The operative TCPA / SMS / telephone
// consent language belongs at the point of collection, not here.
const marketingCommunications = {
    effectiveDate: LEGAL_EFFECTIVE_DATE,
    intro: <Callout><Callout.Strong>Our marketing model:</Callout.Strong> UnitedStatesCredit collects the underlying records directly from consumers. Contracted list managers may store and actively manage those UnitedStatesCredit records, select and deploy offers, and share campaign revenue with UnitedStatesCredit. The records are not intended to become unrestricted property of the list manager.</Callout>,
    sections: [
        {
            id: 's1',
            heading: '1. Information Used for Marketing',
            body: (
                <>
                    <P>Our marketing database may include first name, last name, postal address, email address, telephone or mobile number, source information, communication preferences, consent records, and suppression or opt-out status.</P>
                    <P>It does not include Social Security numbers, bank-account numbers, routing numbers, or similar sensitive lender-application information.</P>
                </>
            ),
        },
        {
            id: 's2',
            heading: '2. List Managers',
            body: (
                <>
                    <P>UnitedStatesCredit may provide limited first-party contact records to contracted list-management companies. The list manager may store the records in its own systems, actively manage the audience, select or deploy offers from multiple advertisers, administer email or SMS campaigns where authorized, measure campaign performance, deduct agreed campaign or mailing costs, and pay UnitedStatesCredit a contractual share of campaign revenue.</P>
                    <P>Our agreements are intended to preserve UnitedStatesCredit's ownership or control of the records and restrict the list manager from selling, transferring, or independently using the underlying records outside the services and permissions authorized by contract and law.</P>
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
            body: (
                <>
                    <P>Commercial email sent by or on behalf of UnitedStatesCredit will be managed in accordance with applicable law. Marketing email should use accurate routing and sender information, avoid deceptive subject lines, include required advertising identification, include a valid physical postal address, and provide a functioning method to unsubscribe.</P>
                    <P>We honor legally valid unsubscribe requests within the period required by law and may retain a limited suppression record so that the request continues to be honored. UnitedStatesCredit remains responsible for monitoring email marketing conducted on its behalf.</P>
                </>
            ),
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
