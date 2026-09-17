import React from 'react';
import { P, A, CopyLink, Callout, ContactBlock } from '../components/Copy';
import { pathFor, LEGAL_EFFECTIVE_DATE, LEGAL_LAST_UPDATED } from '../loanPages';

// Verbatim port of reference/usc-legal-center-deploy/california-financial-privacy.html — do not edit copy.
// Revised by reference/USC_Legal_Center_Final_Updates_Claude.md (revision 2.0) — the spec's PUBLIC COPY is verbatim too.
// This page is a notice. The California consent acknowledgment itself is a
// separate point-of-collection document and must not be folded into it.
const californiaFinancialPrivacy = {
    effectiveDate: LEGAL_EFFECTIVE_DATE,
    lastUpdated: LEGAL_LAST_UPDATED,
    intro: <Callout><Callout.Strong>This page explains California financial privacy; it is not a consent form.</Callout.Strong> This supplemental notice does not replace any Important Privacy Choices for Consumers notice or separate consent acknowledgment that applicable California law requires us to provide directly to you. Where your affirmative authorization is required, we will obtain it before making the covered disclosure. Reading this page, submitting a loan request, or accepting general website terms does not by itself provide that separate authorization.</Callout>,
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
                    <P>Our marketing and list-management records do not include Social Security numbers, bank-account or routing numbers, driver's-license numbers, consumer-report information, or other sensitive lender-application identifiers. We do not provide those fields to list managers, advertisers, email marketers, or SMS marketers for marketing purposes.</P>
                </>
            ),
        },
        {
            id: 's4',
            heading: '4. Contracted List Managers and Revenue Sharing',
            body: (
                <>
                    <P>We may provide limited first-party contact records to contracted list-management and marketing companies. These companies may store the records in their own systems, actively manage the UnitedStatesCredit audience, select and deploy offers from multiple advertisers, administer authorized email or SMS campaigns, and measure campaign performance. Under our revenue-sharing arrangements, a manager may deduct agreed mailing or campaign expenses and pay UnitedStatesCredit a contractual share of the resulting revenue.</P>
                    <P>Under our list-management agreements, UnitedStatesCredit retains ownership or control of its underlying first-party marketing records. Our list managers are prohibited from selling, transferring, or independently using those records outside the services authorized by their agreements with UnitedStatesCredit and applicable law. A permitted subcontractor may process records only under applicable contractual restrictions. These arrangements do not limit consumers' privacy rights.</P>
                    <P>We provide records for these activities only where permitted by law and after obtaining any required authorization and honoring applicable privacy choices. Disclosing our marketing practices in this notice does not itself supply a consent that must be obtained separately.</P>
                </>
            ),
        },
        {
            id: 's5',
            heading: '5. Separate Authorization Where Required',
            body: (
                <>
                    <P>Where California financial-privacy law requires your consent before we disclose nonpublic personal information to a nonaffiliated third party, we will obtain a separate authorization before the disclosure. The authorization will identify the information and purpose of the disclosure and explain how to revoke or modify your permission.</P>
                    <P>When the consent acknowledgment required by California Financial Code Section 4053(a) applies, it will be a separate document, dated and signed by you, including by a legally valid electronic signature where permitted. It will clearly explain that you are authorizing disclosure to nonaffiliated third parties, that your consent remains effective until revoked or modified, and how you may revoke it at any time. We will maintain the acknowledgment or a true and correct copy, provide a copy on request, and advise you to keep a copy for your records.</P>
                    <P>Where California law requires a separate Important Privacy Choices for Consumers notice concerning applicable affiliate or joint-marketing disclosures, we will provide that notice and the required opportunity to exercise the relevant choices. This page does not replace that notice.</P>
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
            body: <P>If you have provided a California financial-privacy authorization, you may revoke or modify it for future disclosures using the method specified in that authorization. You may also submit the request through <CopyLink to={`${pathFor('privacy-choices')}#privacy-request`}>Your Privacy Choices</CopyLink> or contact <A href='mailto:info@bluekeel.com'>info@bluekeel.com</A> for assistance. A revocation does not retroactively invalidate disclosures lawfully made before the revocation became effective.</P>,
        },
        {
            id: 's8',
            heading: '8. Marketing Without Transfer of the Underlying Record',
            body: (
                <>
                    <P>Where permitted by law, UnitedStatesCredit may market its own products or the products or services of nonaffiliated third parties to its consumers without giving the advertiser the underlying UnitedStatesCredit record. If you choose to respond to an advertiser and provide information directly to that advertiser, the advertiser's own privacy practices apply.</P>
                    <P>Promoting an advertiser's offer does not give the advertiser unrestricted access to our underlying marketing records. Any disclosure we make remains subject to the applicable privacy requirements and your choices. A click or response does not by itself authorize us to disclose all information from your loan request.</P>
                </>
            ),
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
