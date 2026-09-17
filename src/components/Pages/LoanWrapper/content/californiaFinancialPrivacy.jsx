import React from 'react';
import { P, Ul, Li, A, CopyLink, Warning, ContactBlock } from '../components/Copy';
import { pathFor, LEGAL_EFFECTIVE_DATE } from '../loanPages';

// Verbatim port of reference/usc-legal-center-deploy/california-financial-privacy.html — do not edit copy.
// This page is a notice. The California consent acknowledgment itself is a
// separate point-of-collection document and must not be folded into it.
const californiaFinancialPrivacy = {
    effectiveDate: LEGAL_EFFECTIVE_DATE,
    intro: <Warning><Warning.Strong>This page is a notice, not the separate California authorization.</Warning.Strong> If California law requires your explicit prior consent for a particular disclosure of nonpublic personal information, the consent acknowledgment will be presented separately at the point of collection or before that disclosure and will include the required signature/date and revocation information.</Warning>,
    sections: [
        {
            id: 's1',
            heading: '1. California Financial Privacy Protections',
            body: (
                <>
                    <P>For California consumers, UnitedStatesCredit applies the protections of the California Financial Information Privacy Act to covered nonpublic personal information to the extent required by law.</P>
                    <P>Under California financial-privacy law, personally identifiable information obtained in connection with providing a financial product or service can be nonpublic personal information, including information submitted on a loan request and the fact that a consumer sought a financial service.</P>
                </>
            ),
        },
        {
            id: 's2',
            heading: '2. Loan-Transaction Disclosures',
            body: <P>UnitedStatesCredit may release information necessary to effect, administer, process, or service a transaction requested or authorized by a consumer. This includes securely transmitting application information to participating lenders or financial-service providers that may consider the requested loan.</P>,
        },
        {
            id: 's3',
            heading: '3. California Marketing Records',
            body: (
                <>
                    <P>For marketing activities, UnitedStatesCredit limits the first-party record supplied to contracted list-management or marketing companies to information such as name, mailing address, email address, mobile or telephone number, source information, and consent or suppression information reasonably necessary for the authorized activity.</P>
                    <P>Social Security numbers, bank-account numbers, routing numbers, and similar sensitive lender-application information are not included in the marketing dataset.</P>
                </>
            ),
        },
        {
            id: 's4',
            heading: '4. Contracted List Managers and Revenue Sharing',
            body: (
                <>
                    <P>UnitedStatesCredit may contract with list-management companies that store and actively manage UnitedStatesCredit's first-party records, deploy marketing campaigns and third-party offers, and compensate UnitedStatesCredit under contractual revenue-sharing arrangements after agreed campaign or mailing costs.</P>
                    <P>Our agreements are intended to provide that the underlying UnitedStatesCredit records remain UnitedStatesCredit's records and are not available for unrestricted sale or independent use by the list manager.</P>
                </>
            ),
        },
        {
            id: 's5',
            heading: '5. Separate Authorization Where Required',
            body: (
                <>
                    <P>California law generally restricts disclosure of covered nonpublic personal information to nonaffiliated third parties unless an exception applies or the consumer has provided the legally required consent.</P>
                    <P>Where UnitedStatesCredit determines that explicit prior consent is required for a disclosure, the California consumer will receive a separate consent acknowledgment designed to:</P>
                    <Ul>
                        <Li>be separate from other documents or consents;</Li>
                        <Li>identify that the consumer is consenting to disclosure of nonpublic personal information to nonaffiliated third parties;</Li>
                        <Li>be dated and signed or electronically signed in a legally recognized manner;</Li>
                        <Li>state that the consent remains effective until revoked or modified;</Li>
                        <Li>explain how the consumer may revoke or modify the authorization; and</Li>
                        <Li>inform the consumer that a copy is available upon request and should be retained for the consumer's records.</Li>
                    </Ul>
                </>
            ),
        },
        {
            id: 's6',
            heading: '6. No Conditioning of Loan Matching on Unrelated Marketing Consent',
            body: <P>Where marketing disclosure is not necessary to provide the loan-matching service, UnitedStatesCredit will not deny an otherwise available loan-matching service solely because a California consumer declines consent to an unrelated third-party marketing disclosure.</P>,
        },
        {
            id: 's7',
            heading: '7. Revoking a California Financial Privacy Authorization',
            body: <P>If you have provided a California financial-privacy authorization, you may revoke or modify it for future disclosures using the method specified in that authorization. You may also contact <A href='mailto:info@bluekeel.com'>info@bluekeel.com</A> for assistance. A revocation does not retroactively invalidate disclosures lawfully made before the revocation became effective.</P>,
        },
        {
            id: 's8',
            heading: '8. Marketing Without Transfer of the Underlying Record',
            body: <P>Where permitted by law, UnitedStatesCredit may market its own products or the products or services of nonaffiliated third parties to its consumers without giving the advertiser the underlying UnitedStatesCredit record. If you choose to respond to an advertiser and provide information directly to that advertiser, the advertiser's own privacy practices apply.</P>,
        },
        {
            id: 's9',
            heading: '9. Other California Privacy Rights',
            body: <P>Some personal information may also be subject to the California Consumer Privacy Act. Financial information subject to federal or California financial-privacy laws may be exempt from some CCPA provisions, while other website, advertising, or technical information may remain subject to the CCPA. See <CopyLink to={pathFor('state-privacy-rights')}>U.S. State Privacy Rights</CopyLink> and <CopyLink to={pathFor('privacy-choices')}>Your Privacy Choices</CopyLink>.</P>,
        },
        {
            id: 's10',
            heading: '10. Contact',
            body: <ContactBlock />,
        },
    ],
};

export default californiaFinancialPrivacy;
