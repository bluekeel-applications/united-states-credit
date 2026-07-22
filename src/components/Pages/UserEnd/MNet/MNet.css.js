const styles = {
    main: {
        width: '100vw',
        maxWidth: '100vw',
        minHeight: '450px',
        fontSize: '38px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '0 20vw',
        '@media (max-width: 767px)': {
            padding: '5px 10px',
        },
    },
    header: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '5vh',
        '@media (max-width: 767px)': {
            paddingTop: '0',
        },
    },
    text: {
        fontSize: '75%',
        fontWeight: '300',
        color: '#3571C4',
        '@media (max-width: 767px)': {
            fontSize: '1rem',
        },
    },
    textLg: {
        fontSize: '38px',
        '@media (max-width: 767px)': {
            fontSize: '1.25rem',
        },
    }
};
export default styles;