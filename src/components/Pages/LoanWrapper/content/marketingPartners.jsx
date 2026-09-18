import React from 'react';
import { P, Ul, Li, CopyLink, Callout, ContactBlock } from '../components/Copy';
import { pathFor, MARKETING_PARTNERS, LOAN_FORM_DOCS_EFFECTIVE_DATE } from '../loanPages';

// reference/USC_Loan_Form_Final_Compliance_Patch_Claude.md § G06. The list
// itself is MARKETING_PARTNERS in loanPages.js (versioned; the form records
// the version with each consent). This page is not an FCRA permissible-purpose
// list — that is Marketplace Partners.
const { version, updated, partners } = MARKETING_PARTNERS;

const marketingPartners = {
    effectiveDate: LOAN_FORM_DOCS_EFFECTIVE_DATE,
    intro: <Callout><Callout.Strong>This page is not a list of lenders.</Callout.Strong> It identifies the companies and brands that may send, or cause to be sent, promotional communications under the optional marketing consent on the loan request form. Companies that evaluate or respond to a loan request are listed separately under <CopyLink to={pathFor('marketplace-partners')}>Marketplace Partners</CopyLink>.</Callout>,
    sections: [
        {
            id: 's1',
            heading: 'Who may contact you under the optional marketing consent',
            body: (
                <>
                    <P>If you give the optional marketing consent, promotional calls, text messages, or emails may be sent by or on behalf of Bluekeel LLC d/b/a UnitedStatesCredit.com and by the companies listed here: contracted list-management or marketing companies, approved sender brands, and approved advertiser or seller brands that may originate or cause covered calls or texts. A brand that is not on this list is not authorized to contact you under that consent.</P>
                    <P><strong>List version {version} · Last updated {updated}.</strong></P>
                    {partners.length === 0
                        ? <P><strong>No list-management company or sender brand is currently authorized under this consent.</strong> When one is contracted, it will be added here with a new version and date before any communication is sent under the consent.</P>
                        : (
                            <Ul>
                                {partners.map((partner) => (
                                    <Li key={partner.name}><strong>{partner.name}</strong>{partner.role ? ` — ${partner.role}` : ''}</Li>
                                ))}
                            </Ul>
                        )}
                </>
            ),
        },
        {
            id: 's2',
            heading: 'How this list is used',
            body: (
                <>
                    <P>The version in force when you give consent is recorded with your consent. A company added later is not covered by an earlier consent.</P>
                    <P>You may withdraw marketing consent at any time: reply STOP to a supported text campaign, use the unsubscribe link in an email, tell a caller to stop, or use <CopyLink to={`${pathFor('privacy-choices')}#privacy-request`}>Your Privacy Choices</CopyLink>. How marketing communications are handled is described in our <CopyLink to={pathFor('marketing-communications')}>Marketing & Communications Privacy Notice</CopyLink>.</P>
                </>
            ),
        },
        {
            id: 's3',
            heading: 'Contact',
            body: <ContactBlock />,
        },
    ],
};

export default marketingPartners;
