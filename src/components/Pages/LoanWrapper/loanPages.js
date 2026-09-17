// Single source of truth for the /loans page set: routes, document titles,
// legal-center cards, and footer navigation all derive from this registry.
// Order matters — it is the card order of the legal package's index
// (reference/usc-legal-center-deploy/index.html), then the two info pages the
// package does not cover.
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
    metaDescription: 'Legal notices, privacy disclosures, lending policies, and consumer rights for UnitedStatesCredit.com.',
    lede: 'Important information about our loan-matching service, privacy practices, marketing practices, electronic communications, consumer rights, and advertising relationships.',
};

// Effective date of the legal package — shared by its 12 documents. The two
// info pages outside the package keep their own date.
export const LEGAL_EFFECTIVE_DATE = 'September 16, 2026';

// `footer` is optional: a page without one is reached from the Legal Center
// hub and from in-copy links only.
export const LEGAL_PAGES = [
    {
        slug: 'privacy-policy',
        h1: 'Privacy Policy',
        documentTitle: 'Privacy Policy | United States Credit Legal Center',
        metaDescription: 'How UnitedStatesCredit collects, uses, discloses, retains, and protects personal information.',
        lede: 'How UnitedStatesCredit collects, uses, discloses, retains, and protects personal information.',
        card: { kicker: 'Privacy', title: 'Privacy Policy', blurb: 'How UnitedStatesCredit collects, uses, discloses, retains, and protects personal information.' },
        footer: { column: 'legal', label: 'Privacy Policy' },
    },
    {
        slug: 'terms',
        h1: 'Terms of Use',
        documentTitle: 'Terms of Use | United States Credit Legal Center',
        metaDescription: 'Terms governing use of UnitedStatesCredit.com and the loan-matching service.',
        lede: 'Terms governing use of UnitedStatesCredit.com and the loan-matching service.',
        card: { kicker: 'Legal', title: 'Terms of Use', blurb: 'Terms governing use of UnitedStatesCredit.com and the loan-matching service.' },
        footer: { column: 'legal', label: 'Terms of Use' },
    },
    {
        slug: 'e-consent',
        h1: 'Electronic Communications & E-SIGN Consent',
        documentTitle: 'Electronic Communications & E-SIGN Consent | United States Credit Legal Center',
        metaDescription: 'Consent to receive records, notices, and disclosures electronically.',
        lede: 'Consent to receive records, notices, and disclosures electronically.',
        card: { kicker: 'Electronic records', title: 'Electronic Communications & E-SIGN Consent', blurb: 'Consent to receive records, notices, and disclosures electronically.' },
        footer: { column: 'legal', label: 'E-SIGN Consent' },
    },
    {
        slug: 'rates-and-fees',
        h1: 'Rates & Fees',
        documentTitle: 'Rates & Fees | United States Credit Legal Center',
        metaDescription: 'Important information about loan costs, APRs, fees, and lender disclosures.',
        lede: 'Important information about loan costs, APRs, fees, and lender disclosures.',
        card: { kicker: 'Loan costs', title: 'Rates & Fees', blurb: 'Important information about loan costs, APRs, fees, and lender disclosures.' },
        footer: { column: 'legal', label: 'Rates & Fees' },
    },
    {
        slug: 'lending-policy',
        h1: 'Lending & Matching Policy',
        documentTitle: 'Lending & Matching Policy | United States Credit Legal Center',
        metaDescription: 'How the loan-request and lender-matching process works.',
        lede: 'How the loan-request and lender-matching process works.',
        card: { kicker: 'Our role', title: 'Lending & Matching Policy', blurb: 'How the loan-request and lender-matching process works.' },
        footer: { column: 'legal', label: 'Lending & Matching Policy' },
    },
    {
        slug: 'advertiser-disclosure',
        h1: 'Advertiser & Compensation Disclosure',
        documentTitle: 'Advertiser & Compensation Disclosure | United States Credit Legal Center',
        metaDescription: 'How UnitedStatesCredit may be compensated by lenders, advertisers, and marketing partners.',
        lede: 'How UnitedStatesCredit may be compensated by lenders, advertisers, and marketing partners.',
        card: { kicker: 'Compensation', title: 'Advertiser & Compensation Disclosure', blurb: 'How UnitedStatesCredit may be compensated by lenders, advertisers, and marketing partners.' },
        footer: { column: 'transparency', label: 'Advertiser Disclosure' },
    },
    {
        slug: 'financial-privacy-notice',
        h1: 'Financial Privacy Notice',
        documentTitle: 'Financial Privacy Notice | United States Credit Legal Center',
        metaDescription: 'Financial-information practices and disclosures for loan applicants.',
        lede: 'Financial-information practices and disclosures for loan applicants.',
        card: { kicker: 'Financial privacy', title: 'Financial Privacy Notice', blurb: 'Financial-information practices and disclosures for loan applicants.' },
    },
    {
        slug: 'california-financial-privacy',
        h1: 'California Financial Privacy Notice',
        documentTitle: 'California Financial Privacy Notice | United States Credit Legal Center',
        metaDescription: 'Additional financial privacy protections for California consumers.',
        lede: 'Additional financial privacy protections for California consumers.',
        card: { kicker: 'California', title: 'California Financial Privacy Notice', blurb: 'Additional financial privacy protections for California consumers.' },
    },
    {
        slug: 'marketing-communications',
        h1: 'Marketing & Communications Privacy Notice',
        documentTitle: 'Marketing & Communications Privacy Notice | United States Credit Legal Center',
        metaDescription: 'How first-party contact records may be managed and used for email, SMS, telephone, and third-party offers.',
        lede: 'How first-party contact records may be managed and used for email, SMS, telephone, and third-party offers.',
        card: { kicker: 'Marketing', title: 'Marketing & Communications Privacy Notice', blurb: 'How first-party contact records may be managed and used for email, SMS, telephone, and third-party offers.' },
    },
    {
        slug: 'state-privacy-rights',
        h1: 'U.S. State Privacy Rights',
        documentTitle: 'U.S. State Privacy Rights | United States Credit Legal Center',
        metaDescription: 'Access, correction, deletion, opt-out, portability, appeal, and other state privacy rights.',
        lede: 'Access, correction, deletion, opt-out, portability, appeal, and other state privacy rights.',
        card: { kicker: 'State rights', title: 'U.S. State Privacy Rights', blurb: 'Access, correction, deletion, opt-out, portability, appeal, and other state privacy rights.' },
        footer: { column: 'transparency', label: 'U.S. State Privacy Rights' },
    },
    {
        slug: 'privacy-choices',
        h1: 'Your Privacy Choices',
        documentTitle: 'Your Privacy Choices | United States Credit Legal Center',
        metaDescription: 'Request access, deletion, correction, marketing opt-outs, or sale/share and targeted-advertising choices.',
        lede: 'Request access, deletion, correction, marketing opt-outs, or sale/share and targeted-advertising choices.',
        card: { kicker: 'Your choices', title: 'Your Privacy Choices', blurb: 'Request access, deletion, correction, marketing opt-outs, or sale/share and targeted-advertising choices.' },
        footer: { column: 'transparency', label: 'Your Privacy Choices' },
    },
    {
        slug: 'cookies-tracking',
        h1: 'Cookie & Tracking Technologies Notice',
        documentTitle: 'Cookie & Tracking Technologies Notice | United States Credit Legal Center',
        metaDescription: 'How cookies, analytics, advertising, and browser privacy signals are handled.',
        lede: 'How cookies, analytics, advertising, and browser privacy signals are handled.',
        card: { kicker: 'Cookies', title: 'Cookie & Tracking Technologies Notice', blurb: 'How cookies, analytics, advertising, and browser privacy signals are handled.' },
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

export const footerColumn = (column) => LEGAL_PAGES.filter((page) => page.footer?.column === column);

// Retired slugs and the legal package's own file slugs (its routes.json puts
// every document at /loans/legal-center/<slug>) → the slug the page lives at
// here. Anything absent maps to itself.
export const LEGACY_SLUGS = {
    'california-privacy': 'state-privacy-rights',
    'terms-of-use': 'terms',
    'rates-fees': 'rates-and-fees',
};

export const CONTACT_EMAIL = 'info@bluekeel.com';
