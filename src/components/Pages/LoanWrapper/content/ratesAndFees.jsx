import React from 'react';
import { P, Ul, Li, Warning, ContactBlock } from '../components/Copy';
import { LEGAL_EFFECTIVE_DATE } from '../loanPages';

// Verbatim port of reference/usc-legal-center-deploy/rates-fees.html — do not edit copy.
const ratesAndFees = {
    effectiveDate: LEGAL_EFFECTIVE_DATE,
    intro: <Warning><Warning.Strong>Important loan-cost disclosure:</Warning.Strong> UnitedStatesCredit does not set loan rates or fees. Any actual APR, finance charge, payment amount, fee, and repayment term will be determined and disclosed by the lender that offers you credit.</Warning>,
    sections: [
        {
            id: 's1',
            heading: '1. UnitedStatesCredit Does Not Set Loan Terms',
            body: <P>UnitedStatesCredit is not a lender and does not determine APRs, finance charges, origination fees, late fees, repayment schedules, or other loan terms. We do not guarantee that a lender will offer credit or that a consumer will qualify for any advertised or illustrative term.</P>,
        },
        {
            id: 's2',
            heading: '2. Loan Amounts and Availability',
            body: <P>Loan amounts, products, and availability vary by lender, state, underwriting criteria, and consumer qualifications. A requested loan amount is not a promise that a lender will offer that amount.</P>,
        },
        {
            id: 's3',
            heading: '3. Annual Percentage Rate (APR)',
            body: (
                <>
                    <P>APR reflects the cost of credit as calculated under applicable law. If a participating lender makes an offer, the lender is responsible for providing the disclosures required by the Truth in Lending Act and other applicable law before you become obligated on the loan.</P>
                    <P>If UnitedStatesCredit advertising states a specific rate or other credit term, the term must be read together with the accompanying qualifications, ranges, examples, and disclosures. Actual terms depend on the lender and the consumer's circumstances.</P>
                </>
            ),
        },
        {
            id: 's4',
            heading: '4. Possible Lender Charges',
            body: (
                <>
                    <P>Depending on the lender and applicable law, a loan may include charges such as:</P>
                    <Ul>
                        <Li>interest;</Li>
                        <Li>origination or processing fees;</Li>
                        <Li>late-payment fees;</Li>
                        <Li>returned-payment or insufficient-funds fees; or</Li>
                        <Li>other charges specifically disclosed by the lender and permitted by law.</Li>
                    </Ul>
                    <P>Do not accept a loan unless you understand the total cost, payment schedule, due dates, and consequences of late or missed payments.</P>
                </>
            ),
        },
        {
            id: 's5',
            heading: '5. Representative Examples and Advertising',
            body: <P>Any example of a loan amount, APR, number of payments, payment amount, or total repayment shown on UnitedStatesCredit is illustrative unless expressly identified as an actual lender offer to you. Where an advertisement uses a credit term that triggers additional disclosures under applicable law, the required disclosures should be presented clearly and conspicuously with that advertisement.</P>,
        },
        {
            id: 's6',
            heading: '6. Credit Inquiries',
            body: <P>UnitedStatesCredit does not itself perform a hard or soft credit inquiry. A participating lender may obtain a consumer report where it has a permissible purpose and any required authorization. A hard inquiry may affect a credit score. A soft inquiry generally does not affect the score, but the lender controls which type of inquiry it uses and when.</P>,
        },
        {
            id: 's7',
            heading: '7. Funding Timing',
            body: <P>UnitedStatesCredit does not guarantee approval or funding timing. A lender may require identity, income, bank, employment, or other verification before funding. Bank processing times, weekends, holidays, verification issues, and lender procedures may affect when funds become available.</P>,
        },
        {
            id: 's8',
            heading: '8. State Law',
            body: <P>Interest rates, fees, loan amounts, terms, and product availability may be limited by the law of the consumer's state and the lender's licensing or authority. Participating lenders are responsible for complying with the laws applicable to their offers and loans.</P>,
        },
        {
            id: 's9',
            heading: '9. No Obligation to Accept',
            body: <P>Receiving a lender offer does not require you to accept it. Review the lender's final disclosures and agreement carefully before agreeing to any credit transaction.</P>,
        },
        {
            id: 's10',
            heading: '10. Questions',
            body: <ContactBlock />,
        },
    ],
};

export default ratesAndFees;
