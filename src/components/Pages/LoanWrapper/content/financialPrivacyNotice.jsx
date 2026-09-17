import React from 'react';
import { P, Ul, Li, A, CopyLink, Callout, ContactBlock } from '../components/Copy';
import { pathFor, LEGAL_EFFECTIVE_DATE } from '../loanPages';

// Verbatim port of reference/usc-legal-center-deploy/financial-privacy-notice.html — do not edit copy.
const financialPrivacyNotice = {
    effectiveDate: LEGAL_EFFECTIVE_DATE,
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
            body: <P>Social Security numbers and bank-account information may be processed to transmit a requested loan application to participating lenders. UnitedStatesCredit does not use those sensitive identifiers for marketing and does not persistently retain them after the loan request has been transmitted.</P>,
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
                    <P>UnitedStatesCredit may retain limited first-party contact information collected directly from consumers for marketing activities permitted by law. We may provide that limited information to contracted list-management companies that store and actively manage UnitedStatesCredit's records, deploy UnitedStatesCredit marketing or third-party offers to the audience, administer campaigns, and share campaign revenue with UnitedStatesCredit under contract.</P>
                    <P>The marketing dataset does not include Social Security numbers, bank-account numbers, routing numbers, or similar sensitive lender-application information.</P>
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
            body: <P>Where the law gives you a right to limit a financial-information disclosure, instructions will be provided in the applicable notice or authorization. You may also contact <A href='mailto:info@bluekeel.com'>info@bluekeel.com</A> or visit <CopyLink to={pathFor('privacy-choices')}>Your Privacy Choices</CopyLink>.</P>,
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
