import { COLORS, container, DESKTOP, MOBILE } from '../theme';

const Styles = {
    container: {
        ...container,
    },
    legalHero: {
        background: 'linear-gradient(180deg,#f7fbfe,#eef5fa)',
        borderBottom: `1px solid ${COLORS.line}`,
        padding: '44px 0',
        [MOBILE]: { padding: '34px 0' },
    },
    // h1 base rule + .legal-hero h1 override, UA margins replaced explicitly
    heroH1: {
        fontSize: 'clamp(38px, 10vw, 60px)',
        lineHeight: 1,
        letterSpacing: '-.055em',
        color: COLORS.navy2,
        marginTop: 0,
        marginBottom: 13,
    },
    heroLede: {
        maxWidth: 760,
        color: COLORS.muted,
        fontSize: 17,
        marginTop: 0,
        marginBottom: '1em',
    },
    breadcrumbs: {
        fontSize: 12,
        color: COLORS.muted,
        marginBottom: 14,
    },
    breadcrumbLink: {
        color: COLORS.navy,
        fontWeight: 750,
        textDecoration: 'none',
    },
    legalLayout: {
        ...container,
        display: 'grid',
        gap: 30,
        padding: '42px 0 70px',
        [DESKTOP]: {
            gridTemplateColumns: '220px minmax(0, 760px)',
            justifyContent: 'center',
        },
    },
    toc: {
        background: COLORS.soft,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 15,
        padding: 18,
        height: 'max-content',
        [DESKTOP]: { position: 'sticky', top: 18 },
    },
    tocTitle: {
        display: 'block',
        color: COLORS.navy,
        marginBottom: 8,
    },
    tocLink: {
        display: 'block',
        color: COLORS.muted,
        textDecoration: 'none',
        fontSize: 13,
        padding: '6px 0',
        ':hover': { color: COLORS.navy },
    },
    legalCopy: {
        minWidth: 0,
    },
    effective: {
        display: 'inline-block',
        background: '#eaf4fa',
        color: COLORS.navy,
        borderRadius: 999,
        padding: '7px 11px',
        fontSize: 12,
        fontWeight: 800,
        marginBottom: 24,
    },
    sectionH2: {
        color: COLORS.navy2,
        fontSize: 25,
        letterSpacing: '-.025em',
        margin: '34px 0 10px',
        [MOBILE]: { fontSize: 23 },
    },
    sectionH3: {
        color: COLORS.navy,
        fontSize: 18,
        margin: '25px 0 8px',
    },
    // .legal-copy p — margin-top:0 from the reference, UA 1em bottom kept
    copyText: {
        color: '#445669',
        marginTop: 0,
        marginBottom: '1em',
    },
    // .legal-copy ul — reference padding, UA vertical margins kept
    copyList: {
        paddingLeft: 22,
        marginTop: '1em',
        marginBottom: '1em',
    },
    copyListItem: {
        color: '#445669',
        margin: '7px 0',
    },
    // unclassed links inside copy rely on UA underline + a{color:inherit}
    copyLink: {
        color: 'inherit',
        textDecoration: 'underline',
    },
    callout: {
        borderLeft: `4px solid ${COLORS.red}`,
        background: '#fff6f7',
        padding: '16px 18px',
        margin: '20px 0',
        borderRadius: '0 12px 12px 0',
    },
    calloutStrong: {
        color: COLORS.navy2,
    },
    reviewBanner: {
        background: '#eaf4fa',
        border: '1px solid #cfe2ee',
        borderRadius: 14,
        padding: '16px 18px',
        color: '#36546c',
        fontSize: 13,
        margin: '22px 0',
    },
};

export default Styles;
