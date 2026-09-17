import { COLORS, container, DESKTOP, MOBILE, PRINT } from '../theme';

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
        [PRINT]: { display: 'none' },
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
        [PRINT]: { display: 'none' },
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
        [PRINT]: { display: 'none' },
    },
    // the print header: document, dates — shown on paper only
    printNote: {
        display: 'none',
        [PRINT]: { display: 'block', fontSize: 13, color: '#444', marginBottom: 18 },
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
    // the legal package's .usc-callout — the lead notice of most documents
    callout: {
        borderLeft: `4px solid ${COLORS.green}`,
        background: '#eef7f4',
        color: '#445669',
        padding: '16px 18px',
        margin: '20px 0',
        borderRadius: '0 12px 12px 0',
    },
    // .usc-warning — Rates & Fees, California Financial Privacy
    warning: {
        border: '1px solid #e7c86a',
        background: '#fff8e8',
        color: '#445669',
        padding: '16px 18px',
        margin: '20px 0',
        borderRadius: 12,
    },
    calloutStrong: {
        color: COLORS.navy2,
    },
    tableWrap: {
        overflowX: 'auto',
        margin: '20px 0',
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',
        fontSize: 15,
    },
    tableHead: {
        textAlign: 'left',
        verticalAlign: 'top',
        border: `1px solid ${COLORS.line}`,
        padding: '12px 13px',
        background: COLORS.soft,
        color: COLORS.navy,
    },
    tableCell: {
        textAlign: 'left',
        verticalAlign: 'top',
        border: `1px solid ${COLORS.line}`,
        padding: '12px 13px',
        color: '#445669',
    },
    contactBlock: {
        background: COLORS.soft,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 12,
        padding: 18,
        marginTop: 26,
        color: '#445669',
    },
    contactStrong: {
        color: COLORS.navy,
    },
    // Your Privacy Choices
    gpcStatus: {
        background: COLORS.soft,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 10,
        padding: '12px 14px',
        color: '#445669',
        fontSize: 15,
        marginBottom: '1em',
    },
    choiceGrid: {
        display: 'grid',
        gap: 14,
        margin: '20px 0',
        [DESKTOP]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
    },
    choice: {
        background: '#fff',
        border: `1px solid ${COLORS.line}`,
        borderRadius: 12,
        padding: 17,
    },
    choiceH3: {
        color: COLORS.navy,
        fontSize: 18,
        margin: '0 0 6px',
    },
    choiceButton: {
        display: 'inline-block',
        background: '#fff',
        // longhands: the primary variant and :hover override borderColor
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#cfdbe4',
        borderRadius: 9,
        padding: '10px 15px',
        color: COLORS.navy,
        fontWeight: 800,
        textDecoration: 'none',
        ':hover': { borderColor: COLORS.blue, color: COLORS.blue },
        [PRINT]: { display: 'none' },
    },
    choiceButtonPrimary: {
        background: COLORS.navy,
        borderColor: COLORS.navy,
        color: '#fff',
        ':hover': { background: COLORS.navy2, borderColor: COLORS.navy2, color: '#fff' },
    },
    // a real <button> wearing the choice-button look
    actionButton: {
        font: 'inherit',
        fontWeight: 800,
        cursor: 'pointer',
    },
    actionButtonBusy: {
        opacity: 0.6,
        cursor: 'default',
    },
    // status lines announced to assistive tech (role=status)
    statusLine: {
        color: '#445669',
        marginTop: 12,
        marginBottom: '1em',
        minHeight: '1.5em',
    },
    statusApplied: {
        color: COLORS.green,
        fontWeight: 700,
    },
    statusError: {
        color: '#a61b26',
        fontWeight: 700,
    },
    requestForm: {
        display: 'grid',
        gap: 14,
        margin: '18px 0',
        [PRINT]: { display: 'none' },
    },
    formLabel: {
        display: 'block',
        color: COLORS.navy,
        fontWeight: 700,
        fontSize: 14,
    },
    formControl: {
        display: 'block',
        boxSizing: 'border-box',
        width: '100%',
        marginTop: 5,
        padding: '11px 12px',
        border: '1px solid #c8d4da',
        borderRadius: 8,
        font: 'inherit',
        fontWeight: 400,
        background: '#fff',
        color: COLORS.ink,
    },
    formTextarea: {
        minHeight: 110,
        resize: 'vertical',
    },
    formCheckRow: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 9,
        color: COLORS.navy,
        fontWeight: 700,
        fontSize: 14,
    },
    formSmall: {
        display: 'block',
        color: COLORS.muted,
        fontSize: 13,
    },
    // kept out of sight and out of the tab order; a filled value marks a bot
    formTrap: {
        position: 'absolute',
        left: -9999,
        width: 1,
        height: 1,
        overflow: 'hidden',
    },
    formResult: {
        borderRadius: 10,
        padding: '14px 16px',
        margin: '18px 0',
        border: `1px solid ${COLORS.line}`,
        background: COLORS.soft,
        color: '#445669',
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
