import { COLORS, SHADOW, container, DESKTOP } from '../theme';

const Styles = {
    container: {
        ...container,
    },

    // ---- hero ----
    hero: {
        background: 'radial-gradient(circle at 15% 5%,rgba(0,158,218,.12),transparent 32%),linear-gradient(180deg,#fbfdff,#f1f7fb)',
        borderBottom: `1px solid ${COLORS.line}`,
    },
    heroGrid: {
        ...container,
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 20,
        padding: '24px 0 34px',
        [DESKTOP]: {
            gridTemplateColumns: 'minmax(0,.9fr) minmax(420px,1.1fr)',
            alignItems: 'start',
            gap: 48,
            padding: '54px 0 64px',
        },
    },
    heroCopy: {
        textAlign: 'center',
        [DESKTOP]: { textAlign: 'left' },
    },
    eyebrow: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        color: COLORS.blue,
        fontWeight: 900,
        fontSize: 12,
        letterSpacing: '.09em',
        textTransform: 'uppercase',
        marginBottom: 12,
        justifyContent: 'center',
        [DESKTOP]: { justifyContent: 'flex-start' },
    },
    // replaces .eyebrow:before (content:"")
    eyebrowBar: {
        width: 24,
        height: 3,
        borderRadius: 9,
        background: COLORS.red,
    },
    heroH1: {
        fontSize: 'clamp(38px, 11vw, 68px)',
        lineHeight: 1,
        letterSpacing: '-.055em',
        color: COLORS.navy2,
        marginTop: 0,
        marginBottom: 17,
    },
    headlineSpan: {
        display: 'block',
        [DESKTOP]: { display: 'inline' },
    },
    heroLede: {
        fontSize: 17,
        color: COLORS.muted,
        marginTop: 0,
        marginBottom: 20,
        maxWidth: 520,
        marginLeft: 'auto',
        marginRight: 'auto',
        [DESKTOP]: { fontSize: 20, marginLeft: 0, marginRight: 0 },
    },
    benefits: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'grid',
        gap: 10,
        width: 'max-content',
        maxWidth: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'left',
        [DESKTOP]: { marginLeft: 0, marginRight: 0 },
    },
    benefitsLi: {
        display: 'flex',
        gap: 10,
        fontWeight: 700,
        fontSize: 14,
        color: '#334b61',
        [DESKTOP]: { fontSize: 16 },
    },
    benefitsLiDesktop: {
        display: 'none',
        gap: 10,
        fontWeight: 700,
        fontSize: 14,
        color: '#334b61',
        [DESKTOP]: { display: 'flex', fontSize: 16 },
    },
    check: {
        width: 21,
        height: 21,
        display: 'grid',
        placeItems: 'center',
        borderRadius: '50%',
        background: '#e8f5f1',
        color: COLORS.green,
        flex: 'none',
    },

    // ---- form shell ----
    formShell: {
        background: '#fff',
        border: '1px solid #d6e1e9',
        borderRadius: 20,
        boxShadow: SHADOW,
        overflow: 'hidden',
    },
    brandRule: {
        height: 5,
        background: `linear-gradient(90deg,${COLORS.blue} 0 58%,#fff 58% 65%,${COLORS.red} 65%)`,
    },
    formHead: {
        padding: '20px 18px 16px',
        background: COLORS.navy2,
        color: '#fff',
    },
    formHeadH2: {
        fontSize: 24,
        lineHeight: 1.12,
        marginTop: 0,
        marginBottom: 5,
    },
    // .form-head p beats .hero p by source order at base width (13px), but the
    // desktop-media .hero p{font-size:20px} comes later and wins there
    formHeadP: {
        margin: 0,
        color: 'rgba(255,255,255,.75)',
        fontSize: 13,
        [DESKTOP]: { fontSize: 20 },
    },
    mockForm: {
        padding: 18,
        [DESKTOP]: { padding: 24 },
    },
    stepsMini: {
        display: 'flex',
        gap: 6,
        marginBottom: 20,
    },
    stepsMiniSpan: {
        height: 5,
        flex: 1,
        borderRadius: 9,
        background: '#dfe7ed',
    },
    stepsMiniSpanActive: {
        height: 5,
        flex: 1,
        borderRadius: 9,
        background: COLORS.blue,
    },
    fieldLabel: {
        fontSize: 14,
        fontWeight: 850,
        color: COLORS.navy2,
        marginBottom: 8,
    },
    amountBox: {
        border: `1px solid ${COLORS.line}`,
        borderRadius: 13,
        padding: '14px 16px',
        marginBottom: 16,
        fontSize: 24,
        fontWeight: 900,
        color: COLORS.navy,
    },
    fakeRange: {
        height: 7,
        borderRadius: 9,
        background: `linear-gradient(90deg,${COLORS.blue} 0 34%,#dbe6ed 34%)`,
        position: 'relative',
        margin: '8px 3px 9px',
    },
    // replaces .fake-range:after — content-box is load-bearing (20px + 5px border = 30px)
    fakeRangeThumb: {
        boxSizing: 'content-box',
        position: 'absolute',
        left: '34%',
        top: '50%',
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: '#fff',
        border: `5px solid ${COLORS.blue}`,
        transform: 'translate(-50%,-50%)',
    },
    rangeLabels: {
        display: 'flex',
        justifyContent: 'space-between',
        color: COLORS.muted,
        fontSize: 11,
        marginBottom: 20,
    },
    fakeSelect: {
        border: `1px solid ${COLORS.line}`,
        borderRadius: 13,
        padding: '14px 16px',
        marginBottom: 15,
        color: '#516577',
        display: 'flex',
        justifyContent: 'space-between',
    },
    primaryBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: 54,
        border: 0,
        borderRadius: 12,
        background: COLORS.red,
        color: '#fff',
        fontWeight: 900,
        textDecoration: 'none',
        fontSize: 17,
    },
    // .hero p (specificity 0,1,1) overrides .consent-preview's own font-size,
    // color, and margin-bottom (0,1,0) — the card lives inside section.hero
    consentPreview: {
        fontSize: 17,
        color: COLORS.muted,
        textAlign: 'center',
        lineHeight: 1.5,
        margin: '13px 2px 20px',
        [DESKTOP]: { fontSize: 20 },
    },
    formNote: {
        padding: '13px 18px',
        background: COLORS.soft,
        borderTop: `1px solid ${COLORS.line}`,
        fontSize: 11,
        color: COLORS.muted,
        textAlign: 'center',
    },
    // vendor embed container gets the mock-form's padding so the live form
    // sits inside the card like the mock did
    rFormLive: {
        padding: 18,
        [DESKTOP]: { padding: 24 },
    },

    // ---- trust strip ----
    trust: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        borderBottom: `1px solid ${COLORS.line}`,
        [DESKTOP]: { gridTemplateColumns: 'repeat(4, 1fr)' },
    },
    trustCell: {
        padding: '18px 10px',
        textAlign: 'center',
        borderRight: `1px solid ${COLORS.line}`,
        borderTop: `1px solid ${COLORS.line}`,
    },
    trustStrong: {
        display: 'block',
        color: COLORS.navy,
        fontSize: 13,
    },
    trustSpan: {
        fontSize: 11,
        color: COLORS.muted,
    },

    // ---- sections ----
    section: {
        padding: '54px 0',
    },
    sectionSoft: {
        padding: '54px 0',
        background: COLORS.soft,
    },
    sectionTitleCenter: {
        maxWidth: 740,
        marginBottom: 28,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
    },
    sectionTitleH2: {
        fontSize: 'clamp(31px, 8vw, 46px)',
        lineHeight: 1.08,
        letterSpacing: '-.045em',
        color: COLORS.navy2,
        marginTop: 0,
        marginBottom: 12,
    },
    sectionTitleP: {
        color: COLORS.muted,
        margin: 0,
    },
    cards: {
        display: 'grid',
        gap: 14,
        [DESKTOP]: { gridTemplateColumns: 'repeat(3, 1fr)' },
    },
    card: {
        background: '#fff',
        border: `1px solid ${COLORS.line}`,
        borderRadius: 15,
        padding: 22,
    },
    cardNumber: {
        width: 40,
        height: 40,
        display: 'grid',
        placeItems: 'center',
        borderRadius: 11,
        background: COLORS.navy,
        color: '#fff',
        fontWeight: 900,
        marginBottom: 25,
    },
    cardH3: {
        color: COLORS.navy,
        fontSize: 20,
        marginTop: 0,
        marginBottom: 7,
    },
    cardP: {
        color: COLORS.muted,
        margin: 0,
    },
    notice: {
        background: '#fff8e6',
        border: '1px solid #ecd89d',
        borderRadius: 15,
        padding: 20,
    },
    // .notice h3 has no font rules in the reference — UA h3 defaults stated
    // explicitly so app globals can't leak in
    noticeH3: {
        color: '#604915',
        fontSize: '1.17em',
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 8,
    },
    noticeP: {
        color: '#705d27',
        margin: 0,
        fontSize: 14,
    },

    // ---- FAQ ----
    faq: {
        maxWidth: 850,
        margin: 'auto',
        borderTop: `1px solid ${COLORS.line}`,
    },
    details: {
        borderBottom: `1px solid ${COLORS.line}`,
    },
    summary: {
        padding: '20px 36px 20px 0',
        listStyle: 'none',
        cursor: 'pointer',
        fontWeight: 850,
        color: COLORS.navy,
        position: 'relative',
    },
    // replaces summary:after content:"+" / details[open] summary:after content:"−"
    summaryMark: {
        position: 'absolute',
        right: 2,
        fontSize: 24,
        color: COLORS.red,
    },
    detailsP: {
        color: COLORS.muted,
        padding: '0 28px 20px 0',
        margin: 0,
    },

    // ---- legal center CTA ----
    legalCenterCta: {
        padding: '28px 0',
        background: '#f7fafc',
        borderTop: `1px solid ${COLORS.line}`,
        borderBottom: `1px solid ${COLORS.line}`,
    },
    legalCenterCtaInner: {
        ...container,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        alignItems: 'flex-start',
        [DESKTOP]: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
    },
    legalCenterCtaH2: {
        margin: 0,
        color: COLORS.navy2,
        fontSize: 24,
        letterSpacing: '-.03em',
        [DESKTOP]: { fontSize: 27 },
    },
    legalCenterCtaP: {
        margin: '4px 0 0',
        color: COLORS.muted,
        fontSize: 14,
        maxWidth: 700,
    },
    legalCenterButton: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 46,
        padding: '0 18px',
        borderRadius: 11,
        background: '#fff',
        border: '1px solid #cfdbe4',
        color: COLORS.navy,
        fontWeight: 850,
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        ':hover': { borderColor: COLORS.blue, color: COLORS.blue },
    },
};

export default Styles;
