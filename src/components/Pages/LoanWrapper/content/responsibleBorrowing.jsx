import React from 'react';
import { P, Ul, Li } from '../components/Copy';

// Verbatim port of reference/responsible-borrowing.html — do not edit copy.
const responsibleBorrowing = {
    effectiveDate: 'August 4, 2026',
    sections: [
        {
            id: 's1',
            heading: 'Borrow only what you can repay',
            body: <P>Start with the smallest amount that solves the need. Build the payment into a realistic budget that includes housing, food, insurance, taxes, and other debts.</P>,
        },
        {
            id: 's2',
            heading: 'Compare APR and total cost',
            body: <P>APR helps compare the annualized cost of credit. Also compare the finance charge, amount received after fees, monthly payment, total of payments, and repayment term. A lower payment over a longer period can cost more overall.</P>,
        },
        {
            id: 's3',
            heading: 'Read every disclosure',
            body: <P>Review the Truth in Lending disclosure, promissory note, payment authorization, privacy notice, and any optional-product disclosures. Save copies before accepting.</P>,
        },
        {
            id: 's4',
            heading: 'Watch for warning signs',
            body: (
                <Ul>
                    <Li>Pressure to act immediately</Li>
                    <Li>Requests for gift cards, cryptocurrency, or an upfront payment to “release” funds</Li>
                    <Li>Guaranteed approval claims</Li>
                    <Li>Contact from an unverified company or domain</Li>
                    <Li>Terms that differ from the written agreement</Li>
                </Ul>
            ),
        },
        {
            id: 's5',
            heading: 'Consider alternatives',
            body: <P>Depending on the need, alternatives may include negotiating a bill, requesting a payment plan, using savings, seeking help from family, contacting a nonprofit credit counselor, exploring a credit-union product, or postponing a discretionary expense.</P>,
        },
        {
            id: 's6',
            heading: 'If you may miss a payment',
            body: <P>Contact the provider before the due date. Ask about hardship options, payment plans, deferment, or other available assistance. Do not ignore collection communications.</P>,
        },
        {
            id: 's7',
            heading: 'Credit and privacy',
            body: <P>Understand whether a provider will make a soft or hard credit inquiry and how information will be used. Use secure devices and verify the site before entering sensitive data.</P>,
        },
    ],
};

export default responsibleBorrowing;
