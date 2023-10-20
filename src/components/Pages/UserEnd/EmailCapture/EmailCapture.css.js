const styles = {
    contentContainer: {
        width: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
        minHeight: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        position: 'fixed',
        display: 'block',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: '#f5f5f5',
        zIndex: '2',
        cursor: 'pointer',
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
    },
    formCard: {
        margin: '50px',
        maxWidth: '600px',
        padding: '50px',
        borderRadius: '10px',
        boxShadow: '0 0 25px 0 #888',
        backgroundColor: '#f5f5f5',
        '@media (max-width: 767px)': {
            margin: '10px 0 50px 0',
            boxShadow: 'none',
            padding: '25px',
        }
    },
    formText: {
        textAlign: 'left',
        fontWeight: '300',
        fontSize: '1.75rem',
        marginBottom: '30px',
        lineHeight: '1.2',
        '@media (max-width: 767px)': {
            fontSize: '1.3rem',
            lineHeight: '1.1',
        }
    },
    formEl: {
        minWidth: '280px',
    },
    formButtons: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '10px 30px',
        minHeight: '10vh',
        '@media (max-width: 767px)': {
            padding: '0'
        }
    },
    submitButton: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '75px',
        width: '250px',
        minHeight: '50px',
        WebkitTransition: '.5s all',
        transition: '.5s all',
        whiteSpace: 'nowrap',
        border: 'none',
        fontSize: '2rem',
        color: '#fff',
        outline: 'none',
        '@media (max-width: 767px)': {
            fontSize: '1.4rem',
            width: '50vw',
            minHeight: '45px',
        },
        ':hover': {
            cursor: 'pointer',
            WebkitBoxShadow: '0px 5px 40px -10px rgba(0,0,0,0.57)',
            MozBoxShadow: '0px 5px 40px -10px rgba(0,0,0,0.57)',
            boxShadow: '5px 40px -10px rgba(0,0,0,0.57)',
            transition: 'all 0.7s ease',
            fontSize: '1.6rem',
        }
    },
    uscButton: { backgroundColor: '#2670C5' },
    pcmButton: { backgroundColor: '#d667cd' },
    wikiButton: { backgroundColor: 'rgb(43,157,197)' },
    disabledButton: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '75px',
        width: '250px',
        minHeight: '50px',
        whiteSpace: 'nowrap',
        border: 'none',
        fontSize: '2rem',
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.2)',
        outline: 'none',
    },
    buttonText: {
        fontSize: '1.5rem'
    },
    submitButtonIcon: {
        fontSize: '1.75rem',
        marginLeft: '10%',
    },
    noButton: {
        backgroundColor: 'transparent',
        color: '#929292',
        fontWeight: '400',
        fontSize: '0.8rem',
        margin: '15px 0 0 0',
        whiteSpace: 'nowrap',
        border: 'none',
        ':hover': {
            cursor: 'pointer',
            transition: 'all 0.7s ease',
            fontWeight: 'bold',
        }
    },
    termsContainer: {
        width: '75%',
        fontSize: '0.8rem',
        margin: '25px 0 10px 0',
        display: 'inline-flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        '@media (max-width: 767px)': {
            width: '100%',
            margin: '15px 0',
        }
    },
    termsBox: {
        display: 'inline-flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        margin: '5px 10px 0 0',
    },
    termsText: {
        textAlign: 'left',
        fontWeight: '400'
    },
    termsLinks: {
        textDecoration: 'underline'
    }
};
export default styles;