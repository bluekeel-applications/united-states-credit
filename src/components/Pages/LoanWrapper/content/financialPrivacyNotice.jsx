import React from 'react';
import { P, Ul, Li, A, CopyLink, Callout, ContactBlock } from '../components/Copy';
import { pathFor, LEGAL_EFFECTIVE_DATE, LEGAL_LAST_UPDATED } from '../loanPages';

// Verbatim port of reference/usc-legal-center-deploy/financial-privacy-notice.html — do not edit copy.
// Revised by reference/USC_Legal_Center_Final_Updates_Claude.md (revision 2.0) — the spec's PUBLIC COPY is verbatim too.
const financialPrivacyNotice = {
    effectiveDate: LEGAL_EFFECTIVE_DATE,
    lastUpdated: LEGAL_LAST_UPDATED,
    intro: <Callout><Callout.Strong>Financial privacy:</Callout.Strong> Information supplied in connection with a loan request can be treated as nonpublic personal information under financial-privacy laws even when the information—such as a name, email address, or telephone number—would not ordinarily seem financial.</Callout>,
    sections: [
        {
            id: 's1',
            heading: '1. Scope',
            body: <P>This Financial Privacy Notice supplements our Privacy Policy and explains how UnitedStatesCredit handles information collected in connection with a consumer's request for a financial product or service. We provide this notice to describe our practices under applicable federal and state financial-privacy laws.</P>,
        },
        {
            id: 's2',
            heading: '2. Information We Collect',
            body: (
                <>
                    <P>Depending on the service, financial information may include:</P>
                    <Ul>
                        <Li>name, address, email address, and telephone or mobile number;</Li>
                        <Li>loan amount and purpose, income, employment, housing, and other application information;</Li>
                        <Li>Social Security number, bank-account or routing information, or similar identifiers when needed for lender transmission;</Li>
                        <Li>transaction, routing, fraud-prevention, and request-status information; and</Li>
                        <Li>the fact that an individual sought or obtained a financial service through UnitedStatesCredit.</Li>
                    </Ul>
                </>
            ),
        },
        {
            id: 's3',
            heading: '3. Sensitive Information Handling',
            body: <P>UnitedStatesCredit processes Social Security numbers and bank-account information only as needed to transmit your requested loan application to participating lenders and financial-service providers involved in that request. We do not persistently retain those identifiers after transmission. We may retain limited contact, transaction, routing, consent, security, and suppression records for the purposes described in our notices, but those retained records do not include your Social Security number or bank-account information.</P>,
        },
        {
            id: 's4',
            heading: '4. Sharing to Process a Consumer-Requested Transaction',
            body: <P>We may disclose application information to participating lenders or financial-service providers as necessary to effect, administer, process, or service the financial transaction the consumer requested. The recipient lender is independently responsible for its underwriting, credit reporting, final disclosures, loan agreement, and privacy practices.</P>,
        },
        {
            id: 's5',
            heading: '5. Service Providers',
            body: <P>We may provide information to companies that perform hosting, security, fraud prevention, communications, data processing, analytics, compliance, mailing, or other services for us. Where required, our agreements restrict the provider's use and disclosure of the information to authorized purposes.</P>,
        },
        {
            id: 's6',
            heading: '6. Marketing and List Management',
            body: (
                <>
                    <P>UnitedStatesCredit may retain limited first-party contact information collected directly from consumers for marketing activities permitted by law.</P>
                    <P>We may provide limited first-party contact records to contracted list-management and marketing companies. These companies may store the records in their own systems, actively manage the UnitedStatesCredit audience, select and deploy offers from multiple advertisers, administer authorized email or SMS campaigns, and measure campaign performance. Under our revenue-sharing arrangements, a manager may deduct agreed mailing or campaign expenses and pay UnitedStatesCredit a contractual share of the resulting revenue.</P>
                    <P>Under our list-management agreements, UnitedStatesCredit retains ownership or control of its underlying first-party marketing records. Our list managers are prohibited from selling, transferring, or independently using those records outside the services authorized by their agreements with UnitedStatesCredit and applicable law. A permitted subcontractor may process records only under applicable contractual restrictions. These arrangements do not limit consumers' privacy rights.</P>
                    <P>Our marketing and list-management records do not include Social Security numbers, bank-account or routing numbers, driver's-license numbers, consumer-report information, or other sensitive lender-application identifiers. We do not provide those fields to list managers, advertisers, email marketers, or SMS marketers for marketing purposes.</P>
                    <P>We provide records for these activities only where permitted by law and after obtaining any required authorization and honoring applicable privacy choices. Disclosing our marketing practices in this notice does not itself supply a consent that must be obtained separately.</P>
                    <P>Where federal or state financial-privacy law requires notice, an opt-out opportunity, or affirmative authorization before a particular disclosure, UnitedStatesCredit will apply the legally required process before making that disclosure.</P>
                </>
            ),
        },
        {
            id: 's7',
            heading: '7. Other Permitted Disclosures',
            body: <P>We may disclose information where permitted or required by law, including for fraud prevention, security, legal process, regulatory examination, professional services, dispute resolution, audits, a business transfer, or other lawful purposes.</P>,
        },
        {
            id: 's8',
            heading: '8. Former Consumers',
            body: <P>Financial-privacy protections that apply to information do not necessarily end simply because a consumer is no longer actively using our service. We continue to protect retained information as required by applicable law and our policies.</P>,
        },
        {
            id: 's9',
            heading: '9. Privacy Choices',
            body: (
                <>
                    <P>Federal financial-privacy law gives consumers the right to limit certain disclosures of nonpublic personal information to nonaffiliated third parties. Before making a disclosure for which that law requires an opt-out opportunity, we will provide the required privacy and opt-out notices and a reasonable opportunity to opt out.</P>
                    <P>Different rules may apply to disclosures necessary to process a transaction you request, disclosures under a qualifying service-provider arrangement, and disclosures made with your valid consent or at your direction. We rely on an exception only when its requirements are satisfied. A service-provider label alone does not eliminate your rights.</P>
                    <P>You may exercise an available financial-privacy choice or revoke an applicable authorization using the instructions in the notice or authorization, through <CopyLink to={`${pathFor('privacy-choices')}#privacy-request`}>Your Privacy Choices</CopyLink>, or by emailing <A href='mailto:info@bluekeel.com'>info@bluekeel.com</A>. We apply the request as required by law and explain any applicable limitation. California residents may have additional rights described in our <CopyLink to={pathFor('california-financial-privacy')}>California Financial Privacy Notice</CopyLink>.</P>
                </>
            ),
        },
        {
            id: 's10',
            heading: '10. California Consumers',
            body: <P>California financial privacy law may impose additional restrictions on disclosures of nonpublic personal information. Review our <CopyLink to={pathFor('california-financial-privacy')}>California Financial Privacy Notice</CopyLink>. Any California consent acknowledgment required for a disclosure to a nonaffiliated third party will be presented as a separate authorization and is not replaced by this notice.</P>,
        },
        {
            id: 's11',
            heading: '11. Security and Retention',
            body: <P>We use administrative, technical, and physical safeguards designed to protect financial information and require appropriate safeguards from service providers where required by law. Information is retained only as reasonably necessary for the purposes described in this notice, applicable recordkeeping, consent evidence, fraud prevention, security, and legal obligations.</P>,
        },
        {
            id: 's12',
            heading: '12. Contact',
            body: <ContactBlock />,
        },
    ],
};

export default financialPrivacyNotice;
