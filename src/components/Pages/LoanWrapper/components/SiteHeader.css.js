import { COLORS, container, MOBILE } from '../theme';

const Styles = {
    skip: {
        position: 'absolute',
        left: -999,
        ':focus': {
            left: 10,
            top: 10,
            background: '#fff',
            padding: 10,
            zIndex: 99,
        },
    },
    siteHeader: {
        background: '#fff',
        borderBottom: `1px solid ${COLORS.line}`,
    },
    headerInner: {
        ...container,
        minHeight: 66,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 18,
        [MOBILE]: { gap: 10 },
    },
    // .logo — the two 520px blocks cascade to a final width of 225px
    logo: {
        width: 'min(270px, 68vw)',
        height: 'auto',
        maxWidth: '100%',
        display: 'block',
        [MOBILE]: { width: 225 },
    },
    securityBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        whiteSpace: 'nowrap',
        color: COLORS.navy,
        padding: '7px 10px',
        border: '1px solid #d7e3ea',
        borderRadius: 12,
        background: '#f8fbfd',
        [MOBILE]: { gap: 7, padding: '6px 8px', borderRadius: 10 },
    },
    securityIcon: {
        width: 29,
        height: 29,
        display: 'grid',
        placeItems: 'center',
        flex: 'none',
        borderRadius: 9,
        background: '#e8f5f1',
        color: COLORS.green,
        [MOBILE]: { width: 27, height: 27 },
    },
    securityIconSvg: {
        width: 17,
        height: 17,
    },
    securityCopy: {
        display: 'grid',
        lineHeight: 1.08,
    },
    securityCopyStrong: {
        fontSize: 12,
        fontWeight: 900,
        letterSpacing: '-.01em',
        [MOBILE]: { fontSize: 11 },
    },
    securityCopySpan: {
        marginTop: 3,
        fontSize: 10,
        color: COLORS.muted,
        fontWeight: 700,
        [MOBILE]: { display: 'none' },
    },
    headerLink: {
        fontSize: 13,
        fontWeight: 800,
        color: COLORS.navy,
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        ':hover': { textDecoration: 'underline' },
        [MOBILE]: { fontSize: 12 },
    },
};

export default Styles;
