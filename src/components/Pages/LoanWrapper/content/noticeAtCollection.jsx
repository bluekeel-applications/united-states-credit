import React from 'react';
import { P, Ul, Li, H3, CopyLink, Callout, ContactBlock } from '../components/Copy';
import { pathFor, LOAN_FORM_DOCS_EFFECTIVE_DATE } from '../loanPages';

// DRAFTED, not verbatim: reference/USC_Loan_Form_Final_Compliance_Patch_Claude.md
// § 14 lists what this notice must cover but supplies no copy. Built from that
// list, the published Privacy Policy / Cookie Notice statements, and the
// owner's facts (retention criteria confirmed 2026-09-18; SSN, driver's-license
// and bank numbers not retained after transmission). Flagged for counsel in
// LOAN_FORM_COMPLIANCE_CHANGE_REPORT.md. The loan form links here from its
// first step.
const noticeAtCollection = {
    effectiveDate: LOAN_FORM_DOCS_EFFECTIVE_DATE,
    intro: <Callout><Callout.Strong>Read this before you start a loan request.</Callout.Strong> This notice tells you what personal information the UnitedStatesCredit loan request form collects, why, how long it is kept, and the choices you have. It supplements our <CopyLink to={pathFor('privacy-policy')}>Privacy Policy</CopyLink>, which applies in full.</Callout>,
    sections: [
        {
            id: 's1',
            heading: '1. Who Is Collecting',
            body: <P>UnitedStatesCredit.com is owned and operated by Bluekeel LLC. UnitedStatesCredit is a loan-matching service, not a lender: it collects your information to submit a loan request to participating lenders and Marketplace Partners, who make their own decisions.</P>,
        },
        {
            id: 's2',
            heading: '2. Categories of Personal Information Collected',
            body: (
                <>
                    <P>Depending on how far you go in the form, we collect:</P>
                    <Ul>
                        <Li><strong>Identifiers and contact information:</strong> name, date of birth, street address, email address, home phone number, mobile phone number, and IP address, browser, and device identifiers.</Li>
                        <Li><strong>Government identifiers (sensitive personal information):</strong> Social Security number and driver's-license number, used to verify your identity and evaluate your request.</Li>
                        <Li><strong>Loan-request information:</strong> requested amount and purpose, total unsecured debt, estimated credit range, and housing status.</Li>
                        <Li><strong>Income and employment information:</strong> income source, amount, and pay schedule; employer name, phone, and address; and length of employment.</Li>
                        <Li><strong>Military status:</strong> whether you, your spouse, or a parent is an active-duty service member, where collected.</Li>
                        <Li><strong>Marital status:</strong> where collected, only in states where a lender may ask.</Li>
                        <Li><strong>Bank account information (sensitive personal information):</strong> account type, routing number, account number, and length of the banking relationship, used to arrange funding if you accept a loan.</Li>
                        <Li><strong>Vehicle ownership:</strong> where collected.</Li>
                        <Li><strong>Technical, source, consent, fraud, and routing information:</strong> how you reached the form, the consents you gave and when, fraud-prevention signals, and how your request was routed.</Li>
                    </Ul>
                </>
            ),
        },
        {
            id: 's3',
            heading: '3. Why We Collect It',
            body: (
                <Ul>
                    <Li>To submit and route the loan request you asked us to make.</Li>
                    <Li>To verify your identity and prevent fraud and abuse.</Li>
                    <Li>To let participating lenders and Marketplace Partners assess eligibility and respond.</Li>
                    <Li>To communicate with you about your request.</Li>
                    <Li>To keep the records that law and our compliance obligations require, including records of the consents you gave.</Li>
                    <Li>For marketing only as permitted by law and by the choices and authorizations you give on the form. Marketing is optional; declining it does not affect your loan request.</Li>
                </Ul>
            ),
        },
        {
            id: 's4',
            heading: '4. What We Do Not Keep',
            body: <P>UnitedStatesCredit transmits your Social Security number, driver's-license number, and bank routing and account numbers securely to the lenders and Marketplace Partners involved in your request and does not retain them after transmission. A lender that receives them keeps its own records under its own privacy notice.</P>,
        },
        {
            id: 's5',
            heading: '5. Marketing Records Are Limited',
            body: <P>The records used for marketing or shared with contracted list-management companies never include your Social Security number, driver's-license number, bank routing or account numbers, consumer-report information, income, employer information, military status, or other lender-application details. They are limited to your name, postal address, email address, telephone numbers, and the source, consent, preference, and suppression information needed to honor your choices. See our <CopyLink to={pathFor('marketing-communications')}>Marketing & Communications Privacy Notice</CopyLink>.</P>,
        },
        {
            id: 's6',
            heading: '6. Sale, Sharing, and Your Choices',
            body: (
                <>
                    <P>Some of our advertising, analytics, and contracted marketing or list-management activity may be treated as a "sale," "sharing," or targeted advertising under California and other state privacy laws, even where no money changes hands for a specific disclosure. Where an opt-out right applies, you can exercise it at <CopyLink to={`${pathFor('privacy-choices')}#sale-sharing`}>Your Privacy Choices</CopyLink>, and we process qualifying browser opt-out preference signals such as Global Privacy Control as described there.</P>
                    <P>Information needed to process the loan request you asked for is disclosed to the lenders and Marketplace Partners involved in that request; that is the service itself, not marketing. California consumers should also read our <CopyLink to={pathFor('california-financial-privacy')}>California Financial Privacy Notice</CopyLink>.</P>
                </>
            ),
        },
        {
            id: 's7',
            heading: '7. How Long We Keep Information',
            body: (
                <>
                    <P>We keep each kind of information only as long as its purpose requires:</P>
                    <Ul>
                        <Li><strong>Contact and marketing records</strong> are maintained while lawfully used for the disclosed relationship and marketing purposes, subject to your withdrawal and deletion choices; limited suppression and compliance records may remain afterward so that an opt-out stays in force.</Li>
                        <Li><strong>Loan-request and routing records</strong> are retained as necessary for processing, fraud prevention, reconciliation, and applicable recordkeeping and dispute obligations, and exclude the sensitive identifiers described above.</Li>
                        <Li><strong>Social Security numbers, driver's-license numbers, and bank account information</strong> are processed only long enough to transmit your request and are not retained afterward.</Li>
                        <Li><strong>Technical and advertising records</strong> are retained for the specific security, attribution, or measurement period their purpose requires, not indefinitely.</Li>
                        <Li><strong>Consent, privacy-request, and suppression records</strong> are retained as the limited evidence needed to demonstrate permissions, handle requests, and prevent reactivation, for the period the applicable requirement sets.</Li>
                    </Ul>
                </>
            ),
        },
        {
            id: 's8',
            heading: '8. More Information',
            body: (
                <>
                    <H3>Related notices</H3>
                    <Ul>
                        <Li><CopyLink to={pathFor('privacy-policy')}>Privacy Policy</CopyLink> — our full privacy practices and your rights.</Li>
                        <Li><CopyLink to={pathFor('financial-privacy-notice')}>Financial Privacy Notice</CopyLink> — how financial information is handled.</Li>
                        <Li><CopyLink to={pathFor('fcra-authorization')}>FCRA Authorization & Disclosure</CopyLink> — the consumer-report authorization on the form.</Li>
                        <Li><CopyLink to={pathFor('marketplace-partners')}>Marketplace Partners</CopyLink> and <CopyLink to={pathFor('marketing-partners')}>Marketing Partners</CopyLink> — who may receive a request and who may send marketing.</Li>
                        <Li><CopyLink to={pathFor('privacy-choices')}>Your Privacy Choices</CopyLink> — access, deletion, correction, opt-outs, and appeals.</Li>
                    </Ul>
                    <ContactBlock />
                </>
            ),
        },
    ],
};

export default noticeAtCollection;
