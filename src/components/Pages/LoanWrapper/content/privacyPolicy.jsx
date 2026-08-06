import React from 'react';
import { P, Ul, Li, A, CopyLink } from '../components/Copy';
import { pathFor } from '../loanPages';

// Verbatim port of reference/privacy-policy(1).html — do not edit copy.
const privacyPolicy = {
    effectiveDate: 'August 4, 2026',
    intro: <P>UnitedStatesCredit.com helps consumers explore potential personal loan options through participating third parties.</P>,
    sections: [
        {
            id: 's1',
            heading: 'Scope and operator',
            body: <P>This Privacy Policy applies to UnitedStatesCredit.com and related landing pages and services operated by BlueKeel LLC (“BlueKeel,” “we,” “our,” or “us”). It does not govern a lender or other third party after you leave our site or your information is provided to that party.</P>,
        },
        {
            id: 's2',
            heading: 'Information we collect',
            body: (
                <>
                    <P>Depending on how you use the site and the fields presented by a participating form provider, information may include:</P>
                    <Ul>
                        <Li>Identifiers such as name, address, email address, phone number, date of birth, and IP address.</Li>
                        <Li>Financial and application information such as requested loan amount, income, employment, housing, bank-account-related information, and credit profile indicators.</Li>
                        <Li>Device, browser, cookie, advertising, referral, click, and interaction data.</Li>
                        <Li>Consent records, timestamps, form interactions, and source information.</Li>
                        <Li>Information received from service providers, publishers, affiliates, providers, and fraud-prevention partners.</Li>
                    </Ul>
                </>
            ),
        },
        {
            id: 's3',
            heading: 'How we use information',
            body: (
                <Ul>
                    <Li>Operate, secure, maintain, and improve the site and forms.</Li>
                    <Li>Process a request and connect or attempt to connect you with participating providers.</Li>
                    <Li>Validate, route, measure, and report leads and applications.</Li>
                    <Li>Prevent fraud, abuse, and security incidents.</Li>
                    <Li>Comply with law, enforce agreements, and maintain consent and transaction records.</Li>
                    <Li>Communicate with you as authorized by the consent language presented when information is submitted.</Li>
                </Ul>
            ),
        },
        {
            id: 's4',
            heading: 'How information may be disclosed',
            body: (
                <>
                    <P>Information may be disclosed to participating lenders, lending platforms, networks, brokers, lead purchasers, service providers, analytics and advertising vendors, fraud-prevention vendors, legal authorities, and parties involved in a business transfer. A recipient may independently use information under its own privacy policy and legal obligations.</P>
                    <P>Where applicable, disclosure for cross-context behavioral advertising, lead distribution, or other commercial purposes may be considered a “sale” or “sharing” under certain state privacy laws.</P>
                </>
            ),
        },
        {
            id: 's5',
            heading: 'Consumer reports and verification',
            body: <P>BlueKeel does not make credit decisions. A participating provider may request authorization to obtain a consumer report, alternative consumer report, bank-transaction data, employment or income verification, identity verification, or other information. Any authorization should appear in the live form or provider process and is governed by the party requesting it.</P>,
        },
        {
            id: 's6',
            heading: 'Cookies and analytics',
            body: <P>We and our vendors may use cookies, pixels, local storage, and similar technologies to operate the site, remember settings, measure performance, attribute advertising, detect fraud, and understand interactions. Browser controls may allow you to block certain technologies, though parts of the site may not work correctly.</P>,
        },
        {
            id: 's7',
            heading: 'Communications and choices',
            body: <P>Calls, texts, or emails will be made only as described in the specific consent language associated with a submission. Consent is not a condition of purchasing a product or service unless expressly stated by applicable law. You may follow unsubscribe instructions, reply STOP to eligible texts, or ask a caller to place you on its internal do-not-call list. Opting out from BlueKeel does not automatically opt you out from third parties that previously received your information.</P>,
        },
        {
            id: 's8',
            heading: 'Data retention and security',
            body: <P>We retain information for legitimate business, compliance, fraud-prevention, dispute, and recordkeeping purposes. We use commercially reasonable administrative, technical, and physical safeguards, but no transmission or storage system is guaranteed to be completely secure.</P>,
        },
        {
            id: 's9',
            heading: 'Privacy rights',
            body: <P>Depending on where you live, you may have rights to request access, correction, deletion, portability, or information about disclosure, and to opt out of certain sale, sharing, targeted advertising, or profiling. We may need to verify your identity. Submit requests to <A href='mailto:info@bluekeel.com'>info@bluekeel.com</A>. California residents should also review the <CopyLink to={pathFor('california-privacy')}>California Privacy Notice</CopyLink>.</P>,
        },
        {
            id: 's10',
            heading: 'Children and U.S. audience',
            body: <P>The site is intended for adults age 18 or older and for use in the United States. We do not knowingly collect personal information from children under 13.</P>,
        },
        {
            id: 's11',
            heading: 'Changes and contact',
            body: <P>We may update this policy by posting a revised version and effective date. Contact: BlueKeel LLC, 899 Skokie Blvd, Suite 340, Northbrook, IL 60062; <A href='mailto:info@bluekeel.com'>info@bluekeel.com</A>.</P>,
        },
    ],
};

export default privacyPolicy;
