import React from 'react';
import { P, CopyLink } from '../components/Copy';
import { pathFor, LOAN_FORM_DOCS_EFFECTIVE_DATE } from '../loanPages';

// Verbatim: reference/USC_Loan_Form_Final_Compliance_Patch_Claude.md § S09 — do not edit copy.
// The loan form's FCRA checkbox (step 6) links here as "FCRA Authorization &
// Disclosure". "Soft inquiry" is the owner's stated fact about the initial
// matching process; a later lender-site inquiry is not represented as soft.
const fcraAuthorization = {
    effectiveDate: LOAN_FORM_DOCS_EFFECTIVE_DATE,
    sections: [
        {
            id: 's1',
            heading: 'FCRA Authorization & Disclosure',
            body: (
                <>
                    <P>You are requesting that UnitedStatesCredit seek potential loan matches from participating lenders and Marketplace Partners.</P>
                    <P>You authorize lenders and Marketplace Partners involved in evaluating your request to obtain and use consumer reports about you and to verify information you provided when permitted by the Fair Credit Reporting Act and other applicable law.</P>
                    <P>Any consumer-report inquiry initiated as part of UnitedStatesCredit's initial matching process is a soft inquiry and does not affect your credit score.</P>
                    <P>UnitedStatesCredit does not itself obtain your consumer report.</P>
                    <P>If you later choose to continue with a lender, that lender may request separate authorization for additional credit-report access, including a hard inquiry. A hard inquiry may affect your credit score.</P>
                    <P>The Marketplace Partners that may participate in the matching process are available here: <CopyLink to={pathFor('marketplace-partners')}>Marketplace Partners</CopyLink>.</P>
                </>
            ),
        },
    ],
};

export default fcraAuthorization;
