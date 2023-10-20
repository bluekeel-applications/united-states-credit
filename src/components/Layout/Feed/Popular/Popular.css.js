const styles = {
    component: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '100vw',
        maxWidth: '100vw',
        justifyContent: 'center',
        alignItems: 'center'
    },
    componentContent: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '1200px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        display: 'inline-flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1200px',
        margin: '25px 0',
        '@media (max-width: 767px)': {
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            margin: '0',
        },
    },
    contentTitle: {
        width: '100%',
        margin: '2vh 0',
        padding: '0 15px',
        borderBottom: '2px solid rgba(126,124,124,0.25)',
        textAlign: 'left'
    },
    contentTitleSpan: {
        fontWeight: '800',
        fontSize: '1.6rem',
        padding: '0 10px',
    },
    articleCard: {
        margin: '20px',
        width: '30%',
        '@media (max-width: 767px)': {
            width: 'calc(100vw - 30px)'
        }
    },
    cardBody: {
        padding: '10px 0',
        boxShadow: `0 1px 1px rgba(0, 0, 0, 0.12),
                    0 2px 2px rgba(0, 0, 0, 0.12),
                    0 4px 4px rgba(0, 0, 0, 0.12),
                    0 8px 8px rgba(0, 0, 0, 0.12),
                    0 16px 16px rgba(0, 0, 0, 0.12)`,
        minHeight: '450px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '10px',
        backgroundColor: 'rgba(0,0,0,0.05)',
        ':hover': {
            opacity: '0.6',
            cursor: 'pointer',
        },
    },
    cardTitle: {
        fontSize: '1.6rem',
        // lineHeight: '1',
        letterSpacing: '-1px',
        padding: '0 20px',
    },
    cardText: {
        padding: '0 10px',
        color: '#777',
        fontWeight: '300',
        fontSize: '1.2rem',
        lineHeight: '1.25em',
        '@media (max-width: 767px)': {
            fontSize: '1.2rem'
        },
    },
    cardImageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '250px'
    },
    cardImage: {
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: '100%',
        height: '100%'
    }
};
export default styles;