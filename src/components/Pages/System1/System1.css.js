const styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        maxWidth: '100vw'
    },
    formCard: {
        margin: '50px',
        maxWidth: '600px',
        padding: '25px 50px',
        borderRadius: '10px',
        boxShadow: '0 0 25px 0 #888',
        backgroundColor: '#ffffff'
    },
    formCardMobile: {
        margin: '60px 0 30px 0',
        boxShadow: 'none',
        padding: '30px 25px',
    },
    titleText: {
        fontSize: '1.75rem',
        paddingBottom: '20px'
    },
    titleTextMobile: {
        fontSize: '1.5rem'
    },
    formContainer: {
        minWidth: '280px'
    },
    buttonContainer: {
        minHeight: '200px'
    },
    legalTerms: {
        width: '75%',
        fontSize: '0.8rem',
        margin: '15px auto',
        textAlign: 'center'
    },
    legalTermsMobile: {
        width: '100%',
        margin: '15px 0',
    },
    termsText: {
        display: 'inline',
        fontWeight: '400',
    },
    termsLink: {
        textDecoration: 'underline',
    },
};

export default styles;