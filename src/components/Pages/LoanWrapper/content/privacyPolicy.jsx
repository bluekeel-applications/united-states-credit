import React from 'react';
import { P, Ul, Li, A, H3, CopyLink, Callout, ContactBlock } from '../components/Copy';
import { pathFor, LEGAL_EFFECTIVE_DATE, LEGAL_LAST_UPDATED } from '../loanPages';

// Verbatim port of reference/usc-legal-center-deploy/privacy-policy.html — do not edit copy.
// Revised by reference/USC_Legal_Center_Final_Updates_Claude.md (revision 2.0) — the spec's PUBLIC COPY is verbatim too.
const privacyPolicy = {
    effectiveDate: LEGAL_EFFECTIVE_DATE,
    lastUpdated: LEGAL_LAST_UPDATED,
    intro: <Callout><Callout.Strong>Important:</Callout.Strong> UnitedStatesCredit is not a lender. We collect information directly from consumers to operate our loan-matching service. Certain sensitive application information may be processed for secure transmission to participating lenders, but UnitedStatesCredit does not persistently store Social Security numbers or bank-account information after transmission.</Callout>,
    sections: [
        {
            id: 's1',
            heading: '1. Scope and Who We Are',
            body: (
                <>
                    <P>This Privacy Policy describes the privacy practices of UnitedStatesCredit.com ("UnitedStatesCredit," "USC," "we," "us," or "our"). UnitedStatesCredit.com is owned and operated by Bluekeel LLC. This Policy applies to our websites, loan-matching services, communications, and related online services that link to this Policy.</P>
                    <P>It does not replace any privacy notice supplied by a lender, advertiser, or other third party. When you leave our service or provide information directly to another company, that company's terms and privacy practices apply.</P>
                </>
            ),
        },
        {
            id: 's2',
            heading: '2. Information We Collect',
            body: (
                <>
                    <H3>Information you provide directly</H3>
                    <Ul>
                        <Li><strong>Identification and contact information:</strong> first and last name, mailing address, email address, telephone or mobile number, and related contact details.</Li>
                        <Li><strong>Loan-request information:</strong> requested loan amount and purpose, employment and income information, housing information, date-of-birth or age-related information, and other information used to route or evaluate a loan request.</Li>
                        <Li><strong>Sensitive lender-application information:</strong> when required for the requested transaction, information may include Social Security number, bank-account or routing information, driver's-license information, or similar identifiers.</Li>
                        <Li><strong>Communications and preferences:</strong> questions, complaints, marketing preferences, privacy requests, consent records, and opt-out or suppression status.</Li>
                    </Ul>
                    <H3>Information collected automatically</H3>
                    <P>We may collect IP address, browser and device information, operating system, referring source, pages viewed, timestamps, campaign and affiliate identifiers, cookies or similar identifiers, fraud-prevention signals, and information about interactions with our website and advertising.</P>
                    <H3>Information from service providers and partners</H3>
                    <P>We may receive transaction status, fraud-prevention data, attribution data, lender-routing results, campaign information, and other information from companies that help us operate the service.</P>
                    <P>UnitedStatesCredit does not purchase consumer records or third-party consumer lists for inclusion in our loan-matching or first-party marketing databases. The underlying marketing contact records described in this notice are collected directly from consumers interacting with UnitedStatesCredit.</P>
                </>
            ),
        },
        {
            id: 's3',
            heading: '3. Sensitive Application Data',
            body: (
                <>
                    <P>UnitedStatesCredit processes Social Security numbers and bank-account information only as needed to transmit your requested loan application to participating lenders and financial-service providers involved in that request. We do not persistently retain those identifiers after transmission. We may retain limited contact, transaction, routing, consent, security, and suppression records for the purposes described in our notices, but those retained records do not include your Social Security number or bank-account information.</P>
                    <P>We do not use this sensitive information for unrelated marketing.</P>
                    <P>Our marketing and list-management records do not include Social Security numbers, bank-account or routing numbers, driver's-license numbers, consumer-report information, or other sensitive lender-application identifiers. We do not provide those fields to list managers, advertisers, email marketers, or SMS marketers for marketing purposes.</P>
                </>
            ),
        },
        {
            id: 's4',
            heading: '4. How We Use Information',
            body: (
                <Ul>
                    <Li>To receive, process, route, and administer a loan request.</Li>
                    <Li>To identify participating lenders or financial-service providers that may consider the request.</Li>
                    <Li>To securely transmit application information to participating lenders.</Li>
                    <Li>To operate routing, fraud-prevention, security, analytics, and compliance systems.</Li>
                    <Li>To communicate about the request and provide customer support.</Li>
                    <Li>To maintain records of consent, disclosures, privacy choices, and suppression requests.</Li>
                    <Li>To improve our services, user experience, and advertising attribution.</Li>
                    <Li>To conduct email, SMS, telephone, direct-mail, or other marketing where permitted by law and where any legally required consent has been obtained.</Li>
                    <Li>To comply with law, legal process, regulatory requests, and enforceable contractual obligations.</Li>
                </Ul>
            ),
        },
        {
            id: 's5',
            heading: '5. Loan-Matching Disclosures',
            body: (
                <>
                    <P>When you ask us to connect you with a lender, we may disclose the information necessary to process your request to participating lenders and financial-service providers. This may include sensitive application information if required for the requested transaction.</P>
                    <P>UnitedStatesCredit does not make the lender's credit decision and does not itself obtain a consumer credit report or conduct a hard or soft credit inquiry. A participating lender may obtain or use a consumer report where permitted by law and by the lender's applicable authorization and disclosures.</P>
                </>
            ),
        },
        {
            id: 's6',
            heading: '6. First-Party Marketing Records and List Management',
            body: (
                <>
                    <P>UnitedStatesCredit may retain limited first-party contact information collected directly from consumers, including name, mailing address, email address, mobile or telephone number, source information, communication preferences, and consent or suppression records.</P>
                    <P>We may provide limited first-party contact records to contracted list-management and marketing companies. These companies may store the records in their own systems, actively manage the UnitedStatesCredit audience, select and deploy offers from multiple advertisers, administer authorized email or SMS campaigns, and measure campaign performance. Under our revenue-sharing arrangements, a manager may deduct agreed mailing or campaign expenses and pay UnitedStatesCredit a contractual share of the resulting revenue.</P>
                    <P>Under our list-management agreements, UnitedStatesCredit retains ownership or control of its underlying first-party marketing records. Our list managers are prohibited from selling, transferring, or independently using those records outside the services authorized by their agreements with UnitedStatesCredit and applicable law. A permitted subcontractor may process records only under applicable contractual restrictions. These arrangements do not limit consumers' privacy rights.</P>
                    <P>Our marketing and list-management records do not include Social Security numbers, bank-account or routing numbers, driver's-license numbers, consumer-report information, or other sensitive lender-application identifiers. We do not provide those fields to list managers, advertisers, email marketers, or SMS marketers for marketing purposes.</P>
                    <P>We provide records for these activities only where permitted by law and after obtaining any required authorization and honoring applicable privacy choices. Disclosing our marketing practices in this notice does not itself supply a consent that must be obtained separately.</P>
                </>
            ),
        },
        {
            id: 's7',
            heading: '7. Other Service Providers',
            body: <P>We may provide information to hosting providers, security and fraud-prevention vendors, analytics providers, communications vendors, compliance vendors, data processors, professional advisers, and other companies that perform services for us. We require appropriate contractual, privacy, confidentiality, and security restrictions when required by law.</P>,
        },
        {
            id: 's8',
            heading: '8. Advertising, Analytics, and Cookies',
            body: (
                <>
                    <P>We and our providers may use cookies, pixels, tags, local storage, and similar technology to operate the site, remember preferences, measure traffic, prevent fraud, attribute advertising, and support advertising or analytics. Certain activities may be treated as a "sale," "sharing," or targeted advertising under some state privacy laws even where money is not paid for the specific disclosure.</P>
                    <P>See our <CopyLink to={pathFor('cookies-tracking')}>Cookie & Tracking Technologies Notice</CopyLink> and <CopyLink to={pathFor('privacy-choices')}>Your Privacy Choices</CopyLink> page for more information.</P>
                    <H3>Do Not Track and Other Browser Privacy Signals</H3>
                    <P>Some browsers offer a legacy Do Not Track, or DNT, setting. We do not currently treat a legacy DNT signal by itself as an opt-out request. We do process qualifying legally required opt-out preference signals, including Global Privacy Control, as described in <CopyLink to={`${pathFor('privacy-choices')}#sale-sharing`}>Your Privacy Choices</CopyLink>. DNT and Global Privacy Control are different signals.</P>
                    <P>Third-party advertising and analytics providers may collect information about your online activity over time and across different websites or online services when their technologies operate on our site, subject to applicable law and your privacy choices.</P>
                </>
            ),
        },
        {
            id: 's9',
            heading: '9. Other Disclosures',
            body: <P>We may disclose information as reasonably necessary to protect the security or integrity of our systems; prevent fraud, identity theft, abuse, or unauthorized transactions; respond to subpoenas, court orders, government or regulatory requests; protect our rights or the rights and safety of others; or complete a merger, acquisition, financing, restructuring, sale, or transfer of all or part of our business, subject to applicable law.</P>,
        },
        {
            id: 's10',
            heading: '10. Financial Privacy',
            body: <P>Information collected in connection with a request for a financial product or service may be subject to federal or state financial-privacy laws. Our <CopyLink to={pathFor('financial-privacy-notice')}>Financial Privacy Notice</CopyLink> describes these practices in more detail. California consumers should also review our <CopyLink to={pathFor('california-financial-privacy')}>California Financial Privacy Notice</CopyLink>.</P>,
        },
        {
            id: 's11',
            heading: '11. Your Privacy Rights',
            body: (
                <>
                    <P>Depending on where you live and the law that applies to the information, you may have rights to access, correct, delete, or obtain a copy of personal information; opt out of certain sales, sharing, targeted advertising, or profiling; limit certain uses of sensitive information; withdraw consent; or appeal a privacy-request decision.</P>
                    <P>See <CopyLink to={pathFor('state-privacy-rights')}>U.S. State Privacy Rights</CopyLink> and <CopyLink to={pathFor('privacy-choices')}>Your Privacy Choices</CopyLink>.</P>
                </>
            ),
        },
        {
            id: 's12',
            heading: '12. Marketing Choices',
            body: <P>You may unsubscribe from commercial email using the unsubscribe link in the message. For supported SMS campaigns, you may reply STOP to stop future marketing texts from that sender or campaign. You may also contact us at <A href='mailto:info@bluekeel.com'>info@bluekeel.com</A>. We may retain limited suppression information to ensure that an opt-out continues to be honored.</P>,
        },
        {
            id: 's13',
            heading: '13. Data Retention',
            body: (
                <>
                    <P>We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, including transaction administration, fraud prevention, security, legal compliance, dispute resolution, consent evidence, suppression records, and legitimate business operations. Different categories may have different retention periods.</P>
                    <P>Social Security numbers and bank-account information submitted for lender transmission are not persistently retained by UnitedStatesCredit after transmission of the request.</P>
                </>
            ),
        },
        {
            id: 's14',
            heading: '14. Security',
            body: <P>We maintain administrative, technical, and physical safeguards designed to protect personal information against unauthorized access, use, alteration, or disclosure. No system can be guaranteed to be completely secure, and consumers should use appropriate care when transmitting information online.</P>,
        },
        {
            id: 's15',
            heading: '15. Children',
            body: <P>Our loan-matching services are intended for adults who are legally able to enter into financial transactions. We do not knowingly offer the loan-matching service to children.</P>,
        },
        {
            id: 's16',
            heading: '16. Changes to this Policy',
            body: <P>We may update this Policy to reflect changes in our services, practices, technology, or legal obligations. The date at the top identifies the current version. Where required by law, we will provide additional notice or obtain additional consent before materially changing how previously collected information is used or disclosed.</P>,
        },
        {
            id: 's17',
            heading: '17. Contact',
            body: <ContactBlock />,
        },
    ],
};

export default privacyPolicy;
