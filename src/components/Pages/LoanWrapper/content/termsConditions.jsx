import React from 'react';
import { P, Ul, Li, A, CopyLink, Callout, ContactBlock } from '../components/Copy';
import { pathFor, LEGAL_EFFECTIVE_DATE } from '../loanPages';

// Verbatim port of reference/usc-legal-center-deploy/terms-of-use.html — do not edit copy.
const termsConditions = {
    effectiveDate: LEGAL_EFFECTIVE_DATE,
    intro: <Callout><Callout.Strong>UnitedStatesCredit is not a lender.</Callout.Strong> We provide a loan-matching and financial-information service. We do not make credit decisions, set lender terms, fund loans, or guarantee that any lender will approve or fund a request.</Callout>,
    sections: [
        {
            id: 's1',
            heading: '1. Acceptance of Terms',
            body: (
                <>
                    <P>These Terms of Use ("Terms") govern your access to and use of UnitedStatesCredit.com and services that link to these Terms. By using the site or submitting information through the service, you agree to these Terms and the policies incorporated by reference, including our Privacy Policy and applicable electronic-consent disclosures.</P>
                    <P>If you do not agree, do not use the service.</P>
                </>
            ),
        },
        {
            id: 's2',
            heading: '2. Eligibility',
            body: <P>You must be at least 18 years old, or the age of legal majority in your jurisdiction if higher, and legally able to enter into contracts to use the loan-matching service. The service is intended for residents of the United States where the service is legally available.</P>,
        },
        {
            id: 's3',
            heading: '3. Our Service',
            body: (
                <>
                    <P>UnitedStatesCredit receives consumer loan requests and may use automated routing, eligibility criteria, geography, participating-lender requirements, application information, commercial terms, fraud-prevention signals, and other factors to determine which participating lender or financial-service provider may receive a request.</P>
                    <P>Submitting a request:</P>
                    <Ul>
                        <Li>is not an application for credit with UnitedStatesCredit;</Li>
                        <Li>does not guarantee that you will be matched with a lender;</Li>
                        <Li>does not guarantee approval, any particular loan amount, APR, payment, term, fee, or funding time; and</Li>
                        <Li>does not obligate you to accept an offer from a lender.</Li>
                    </Ul>
                </>
            ),
        },
        {
            id: 's4',
            heading: '4. UnitedStatesCredit Is Not a Lender',
            body: (
                <>
                    <P>UnitedStatesCredit does not originate, underwrite, approve, deny, service, or collect loans. A participating lender is solely responsible for its credit decisions, disclosures, underwriting, loan agreement, interest rate, fees, payment schedule, funding, servicing, and collection activities.</P>
                    <P>Any lender offer is subject to that lender's terms, eligibility standards, verification, state availability, and applicable law.</P>
                </>
            ),
        },
        {
            id: 's5',
            heading: '5. Credit Reports and Credit Inquiries',
            body: <P>UnitedStatesCredit does not itself obtain a consumer report or conduct a hard or soft credit inquiry for the loan-matching service. A participating lender may obtain a consumer report if it has a permissible purpose and any authorization required by law. Review the lender's disclosures before proceeding.</P>,
        },
        {
            id: 's6',
            heading: '6. Accuracy of Information',
            body: (
                <>
                    <P>You agree to provide information that is accurate, current, complete, and your own. You may not impersonate another person, submit information without authority, provide false financial information, manipulate attribution or routing identifiers, or use the service for fraud or unlawful activity.</P>
                    <P>You are responsible for reviewing information before submission and promptly correcting material errors where correction is available.</P>
                </>
            ),
        },
        {
            id: 's7',
            heading: '7. Electronic Communications',
            body: <P>Our services are primarily electronic. Where legally required, your agreement to receive records electronically is governed by the <CopyLink to={pathFor('e-consent')}>Electronic Communications & E-SIGN Consent</CopyLink>. Marketing communications are governed separately by applicable consent language and our <CopyLink to={pathFor('marketing-communications')}>Marketing & Communications Privacy Notice</CopyLink>.</P>,
        },
        {
            id: 's8',
            heading: '8. Fees and Loan Costs',
            body: (
                <>
                    <P>UnitedStatesCredit generally does not charge consumers a fee simply to submit a loan request through the matching service unless a fee is clearly disclosed before it is incurred. Participating lenders may charge interest, origination fees, late fees, returned-payment fees, or other charges as permitted by law and disclosed by that lender.</P>
                    <P>Review <CopyLink to={pathFor('rates-and-fees')}>Rates & Fees</CopyLink> and the lender's final disclosures and agreement before accepting credit.</P>
                </>
            ),
        },
        {
            id: 's9',
            heading: '9. Compensation and Advertising Relationships',
            body: (
                <>
                    <P>UnitedStatesCredit may receive compensation from lenders, advertisers, affiliates, list-management companies, or other partners. Compensation may be based on clicks, leads, applications, funded loans, advertising activity, campaign revenue, or other commercial arrangements and may affect routing, placement, or which providers are presented.</P>
                    <P>See our <CopyLink to={pathFor('advertiser-disclosure')}>Advertiser & Compensation Disclosure</CopyLink>.</P>
                </>
            ),
        },
        {
            id: 's10',
            heading: '10. Third-Party Services and Websites',
            body: <P>The site may link or redirect to third-party websites and services. We do not control the security, availability, content, underwriting, products, or privacy practices of third parties. Your dealings with a third party are governed by that third party's terms and policies.</P>,
        },
        {
            id: 's11',
            heading: '11. Intellectual Property',
            body: <P>The site, its original text, design, software, graphics, trademarks, logos, compilation, and other content are owned by or licensed to UnitedStatesCredit or its operator and are protected by applicable intellectual-property laws. You may use the site for personal, lawful purposes but may not copy, scrape, reproduce, distribute, reverse engineer, interfere with, or commercially exploit protected portions of the service except as permitted by law or written authorization.</P>,
        },
        {
            id: 's12',
            heading: '12. Prohibited Use',
            body: (
                <Ul>
                    <Li>Using automated systems to overload, scrape, probe, or disrupt the site without authorization.</Li>
                    <Li>Attempting to bypass security, fraud, routing, attribution, or access controls.</Li>
                    <Li>Submitting malicious code or attempting unauthorized access to systems or data.</Li>
                    <Li>Using the service for identity theft, fraud, unlawful marketing, or other illegal conduct.</Li>
                    <Li>Misrepresenting your identity or authority to submit information.</Li>
                </Ul>
            ),
        },
        {
            id: 's13',
            heading: '13. Disclaimer of Warranties',
            body: (
                <>
                    <P>To the maximum extent permitted by law, the site and services are provided on an "as is" and "as available" basis. We do not warrant that the site will be uninterrupted or error-free, that a lender will respond, that information from a third party is complete or accurate, or that a particular financial result will occur.</P>
                    <P>Nothing on UnitedStatesCredit is individualized legal, tax, investment, or financial advice. Educational content is general information.</P>
                </>
            ),
        },
        {
            id: 's14',
            heading: '14. Limitation of Liability',
            body: (
                <>
                    <P>To the maximum extent permitted by applicable law, UnitedStatesCredit, Bluekeel LLC, and their officers, employees, contractors, and agents will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages arising from use of the site, a third-party lender's decision or conduct, third-party products, or unauthorized conduct beyond our reasonable control.</P>
                    <P>Nothing in these Terms excludes liability that cannot legally be limited or waived under applicable law.</P>
                </>
            ),
        },
        {
            id: 's15',
            heading: '15. Indemnification',
            body: <P>To the extent permitted by law, you agree to be responsible for losses, claims, or expenses resulting from your unlawful use of the service, your material breach of these Terms, or information you submit without legal authority. This provision does not require a consumer to indemnify us for our own violation of law or misconduct where such a requirement would be prohibited.</P>,
        },
        {
            id: 's16',
            heading: '16. Governing Law and Disputes',
            body: (
                <>
                    <P>These Terms are governed by the laws of the State of Illinois, without regard to conflict-of-law principles, except to the extent non-waivable law of your home state or federal law applies. Any dispute that may lawfully be brought in court will be brought in an appropriate state or federal court having jurisdiction, subject to any mandatory consumer-protection or venue rights that cannot be waived.</P>
                    <P>Before filing a dispute, you are encouraged to contact us at <A href='mailto:info@bluekeel.com'>info@bluekeel.com</A> so we have an opportunity to address the issue informally.</P>
                </>
            ),
        },
        {
            id: 's17',
            heading: '17. Changes, Severability, and Entire Agreement',
            body: <P>We may update these Terms prospectively. If a provision is held unenforceable, the remaining provisions remain effective to the extent permitted by law. These Terms and documents expressly incorporated by reference constitute the agreement governing use of this site, subject to any separate agreement you enter directly with a lender or other third party.</P>,
        },
        {
            id: 's18',
            heading: '18. Contact',
            body: <ContactBlock />,
        },
    ],
};

export default termsConditions;
