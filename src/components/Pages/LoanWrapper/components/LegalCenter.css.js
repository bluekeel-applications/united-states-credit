import { COLORS, container, DESKTOP } from '../theme';

const Styles = {
    container: {
        ...container,
    },
    section: {
        padding: '54px 0',
    },
    legalGrid: {
        display: 'grid',
        gap: 14,
        [DESKTOP]: { gridTemplateColumns: 'repeat(2, 1fr)' },
    },
    legalCard: {
        display: 'block',
        color: 'inherit',
        background: '#fff',
        border: `1px solid ${COLORS.line}`,
        borderRadius: 15,
        padding: 21,
        textDecoration: 'none',
        transition: '.15s',
        ':hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 26px rgba(17,54,91,.09)',
        },
    },
    // fontSize 'smaller' restores the UA default the app's normalize (80%) breaks
    cardKicker: {
        fontSize: 'smaller',
        color: COLORS.red,
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '.07em',
    },
    cardTitle: {
        fontSize: 21,
        margin: '7px 0',
        color: COLORS.navy,
    },
    cardBlurb: {
        color: COLORS.muted,
        fontSize: 14,
        margin: 0,
    },
};

export default Styles;
