import React from 'react';
import { P, Ul, Li, Callout } from '../components/Copy';

// Verbatim port of reference/rates-and-fees(1).html — do not edit copy.
const ratesAndFees = {
    effectiveDate: 'August 4, 2026',
    intro: <Callout><Callout.Strong>The final page should include the lender network’s approved APR range and representative example if your partner contract or applicable advertising rules require them.</Callout.Strong></Callout>,
    sections: [
        {
            id: 's1',
            heading: 'United States Credit does not set loan terms',
            body: <P>BlueKeel LLC and UnitedStatesCredit.com are not lenders. We do not establish APRs, interest rates, finance charges, fees, payment amounts, repayment schedules, or eligibility requirements.</P>,
        },
        {
            id: 's2',
            heading: 'APR and interest rate',
            body: <P>An interest rate generally reflects the charge for borrowing principal. APR is a broader annualized measure that may include interest and certain fees. Use APR—not just the payment amount—to compare the cost of different offers.</P>,
        },
        {
            id: 's3',
            heading: 'Possible fees',
            body: <P>Depending on the provider and product, costs may include origination, documentation, late-payment, returned-payment, insufficient-funds, optional product, or other lawful fees. Review the Truth in Lending and other provider disclosures.</P>,
        },
        {
            id: 's4',
            heading: 'Loan amount and term',
            body: <P>The site may permit requests from $500 to $25,000, but the amount offered may be different or no offer may be made. Terms may range from months to years depending on provider, product, state law, and qualifications.</P>,
        },
        {
            id: 's5',
            heading: 'Illustrative example',
            body: <P><strong>Example only:</strong> A $5,000 loan with a 24-month term and 24.99% APR would have an estimated payment of approximately $266.72 and estimated total payments of approximately $6,401.28, assuming no additional fees. This example is not an offer and may not reflect any available product.</P>,
        },
        {
            id: 's6',
            heading: 'Late payment, default, and collections',
            body: <P>Late or missed payments can result in fees, collection activity, and possible reporting to consumer reporting agencies. Contact the provider promptly if you anticipate difficulty making a payment.</P>,
        },
        {
            id: 's7',
            heading: 'Prepayment and refinancing',
            body: <P>Ask whether prepayment penalties apply and whether additional payments reduce principal. Refinancing or renewing a loan can increase total cost. Never assume a renewal is available.</P>,
        },
        {
            id: 's8',
            heading: 'Compare the complete offer',
            body: (
                <Ul>
                    <Li>APR and finance charge</Li>
                    <Li>Amount financed and amount received after fees</Li>
                    <Li>Payment amount and frequency</Li>
                    <Li>Number of payments and total of payments</Li>
                    <Li>Origination and other fees</Li>
                    <Li>Late, returned-payment, and default provisions</Li>
                    <Li>Automatic-payment authorization and cancellation</Li>
                </Ul>
            ),
        },
    ],
};

export default ratesAndFees;
