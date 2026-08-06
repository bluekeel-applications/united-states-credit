// Single source of truth for the /loans page set: routes, document titles,
// legal-center cards, and footer navigation all derive from this registry.
// Order matters — it is the reference site's card and footer order.
export const LOANS_HOME = '/loans';
export const pathFor = (slug) => `${LOANS_HOME}/${slug}`;

export const HOME_META = {
    documentTitle: 'Personal Loans from $500 to $35,000 | United States Credit',
    metaDescription: 'Explore personal loan options through United States Credit.',
};

export const LEGAL_CENTER_META = {
    slug: 'legal-center',
    h1: 'Legal Center',
    documentTitle: 'Legal Center | United States Credit',
    metaDescription: 'Legal policies, disclosures, and consumer information for UnitedStatesCredit.com.',
    lede: 'Understand how UnitedStatesCredit.com works, how personal information may be handled, and what to consider before using a participating provider.',
};

export const LEGAL_PAGES = [
    {
        slug: 'privacy-policy',
        h1: 'Privacy Policy',
        documentTitle: 'Privacy Policy | United States Credit',
        metaDescription: 'How United States Credit collects, uses, discloses, and protects information.',
        lede: 'How United States Credit collects, uses, discloses, and protects information.',
        card: { kicker: 'Privacy', title: 'Privacy Policy', blurb: 'Information collection, use, sharing, security, retention, and privacy rights.' },
        footer: { column: 'legal', label: 'Privacy Policy' },
    },
    {
        slug: 'terms',
        h1: 'Terms & Conditions',
        documentTitle: 'Terms & Conditions | United States Credit',
        metaDescription: 'Terms governing access to and use of UnitedStatesCredit.com.',
        lede: 'Terms governing access to and use of UnitedStatesCredit.com.',
        card: { kicker: 'Legal', title: 'Terms & Conditions', blurb: 'Rules governing access to and use of UnitedStatesCredit.com.' },
        footer: { column: 'legal', label: 'Terms & Conditions' },
    },
    {
        slug: 'e-consent',
        h1: 'E-Consent',
        documentTitle: 'E-Consent | United States Credit',
        metaDescription: 'Consent to electronic records, communications, and signatures.',
        lede: 'Consent to electronic records, communications, and signatures.',
        card: { kicker: 'Electronic records', title: 'E-Consent', blurb: 'Consent to receive records, notices, and disclosures electronically.' },
        footer: { column: 'legal', label: 'E-Consent' },
    },
    {
        slug: 'rates-and-fees',
        h1: 'Rates & Fees',
        documentTitle: 'Rates & Fees | United States Credit',
        metaDescription: 'General information about APRs, fees, repayment terms, and loan costs.',
        lede: 'General information about APRs, fees, repayment terms, and loan costs.',
        card: { kicker: 'Loan costs', title: 'Rates & Fees', blurb: 'How APR, finance charges, fees, repayment terms, and examples should be evaluated.' },
        footer: { column: 'legal', label: 'Rates & Fees' },
    },
    {
        slug: 'lending-policy',
        h1: 'Lending Policy',
        documentTitle: 'Lending Policy | United States Credit',
        metaDescription: 'How United States Credit participates in the loan-matching process.',
        lede: 'How United States Credit participates in the loan-matching process.',
        card: { kicker: 'Our role', title: 'Lending Policy', blurb: 'What United States Credit does—and does not do—in the provider-matching process.' },
        footer: { column: 'legal', label: 'Lending Policy' },
    },
    {
        slug: 'advertiser-disclosure',
        h1: 'Advertiser Disclosure',
        documentTitle: 'Advertiser Disclosure | United States Credit',
        metaDescription: 'How United States Credit may be compensated and how commercial relationships affect the site.',
        lede: 'How United States Credit may be compensated and how commercial relationships affect the site.',
        card: { kicker: 'Compensation', title: 'Advertiser Disclosure', blurb: 'How compensation and commercial relationships may affect the site.' },
        footer: { column: 'transparency', label: 'Advertiser Disclosure' },
    },
    {
        slug: 'california-privacy',
        h1: 'California Privacy Notice',
        documentTitle: 'California Privacy Notice | United States Credit',
        metaDescription: 'California Consumer Privacy Act and California Privacy Rights Act disclosures.',
        lede: 'California Consumer Privacy Act and California Privacy Rights Act disclosures.',
        card: { kicker: 'California', title: 'California Privacy Notice', blurb: 'CCPA/CPRA disclosures and instructions for exercising California rights.' },
        footer: { column: 'transparency', label: 'California Privacy' },
    },
    {
        slug: 'responsible-borrowing',
        h1: 'Responsible Borrowing',
        documentTitle: 'Responsible Borrowing | United States Credit',
        metaDescription: 'Practical information for evaluating a personal loan and avoiding unnecessary cost.',
        lede: 'Practical information for evaluating a personal loan and avoiding unnecessary cost.',
        card: { kicker: 'Education', title: 'Responsible Borrowing', blurb: 'Questions to ask, costs to compare, and alternatives to consider.' },
        footer: { column: 'transparency', label: 'Responsible Borrowing' },
    },
    {
        slug: 'how-it-works',
        h1: 'How United States Credit Works',
        documentTitle: 'How United States Credit Works | United States Credit',
        metaDescription: 'A plain-English explanation of the UnitedStatesCredit.com referral process.',
        lede: 'A plain-English explanation of the UnitedStatesCredit.com referral process.',
        card: { kicker: 'Process', title: 'How United States Credit Works', blurb: 'A plain-English overview of submission, matching, provider review, and offers.' },
        footer: { column: 'transparency', label: 'How It Works' },
    },
];

export const footerColumn = (column) => LEGAL_PAGES.filter((page) => page.footer.column === column);

export const CONTACT_EMAIL = 'info@bluekeel.com';
