import { container, DESKTOP, MOBILE } from '../theme';

const Styles = {
    siteFooter: {
        background: '#081f35',
        color: 'rgba(255,255,255,.74)',
        padding: '38px 0 28px',
        [MOBILE]: { paddingTop: 30 },
    },
    container: {
        ...container,
    },
    footerGrid: {
        display: 'grid',
        gap: 28,
        [DESKTOP]: { gridTemplateColumns: '1.5fr 1fr 1fr' },
    },
    // .footer-brand img — width rule beats the base img sizing
    brandImg: {
        width: 'min(300px, 90%)',
        maxWidth: '100%',
        display: 'block',
        marginBottom: 15,
    },
    // UA p margin-top is overridden by the reference's h1,h2,h3,p{margin-top:0}
    brandCopy: {
        fontSize: 13,
        maxWidth: 520,
        marginTop: 0,
        marginBottom: '1em',
    },
    colHeading: {
        color: '#fff',
        fontSize: 14,
        marginTop: 0,
        marginBottom: 11,
    },
    footerLinks: {
        display: 'grid',
        gap: 8,
    },
    footerLink: {
        color: 'inherit',
        fontSize: 13,
        textDecoration: 'none',
        ':hover': { color: '#fff', textDecoration: 'underline' },
    },
    footerBottom: {
        marginTop: 28,
        paddingTop: 20,
        borderTop: '1px solid rgba(255,255,255,.13)',
        fontSize: 11,
        lineHeight: 1.6,
    },
};

export default Styles;
