const styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        maxWidth: '100vw'
    },
    loadingContainer: {
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    adContainer: {
        minHeight: '500px',
        height: '100%',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        maxWidth: '100vw',
        padding: '25px 50px',
    },
    mobileAdContainer: {
        padding: '0 0 50px 0'
    },
    formCard: {
        margin: '50px',
        maxWidth: '600px',
        padding: '25px 50px',
        borderRadius: '10px',
        boxShadow: '0 0 25px 0 #888',
        backgroundColor: '#ffffff',
        '@media (max-width: 767px)': {
            margin: '60px 0 30px 0',
            boxShadow: 'none',
            padding: '30px 10px',
        },
    },
    titleText: {
        fontSize: '1.75rem',
        paddingBottom: '20px',
        '@media (max-width: 767px)': {
            fontSize: '1.5rem'
        },
    },
    formContainer: {
        minWidth: '280px'
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0 30%',
        '@media (max-width: 767px)': {
            padding: '0',
        },
    },
    inputContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '80%',
        minWidth: '300px',
        marginTop: '20px',
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
        }
    },
    uscButton: { backgroundColor: '#2670C5' },
    pcmButton: { backgroundColor: '#d667cd' },
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
        fontSize: '1.4rem'
    },
    buttonIcon: {
        fontSize: '1.75rem',
        marginLeft: '10%',
    },
    linksContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    scrollBox: {
        maxHeight: '450px',
        overflowY: 'scroll',
    },
    linkContainer: {
        padding: '15px',
        fontSize: '1.5rem',
        margin: '5px 20px',
        fontWeight: '300',
        borderRadius: '25px',
    },
    // USC
    lightBlue: { color: 'white', backgroundColor: '#64c3e4' },
    blue: { color: 'white', backgroundColor: '#2670c5' },
    darkBlue: { color: 'white', backgroundColor: '#092c7e' },
    red: { color: 'white', backgroundColor: '#f80000' },
    // PCM
    blueish: { color: 'black', backgroundColor: 'rgb(140, 191, 250)' },
    green: { color: 'black', backgroundColor: 'rgb(81, 210, 194)' },
    purple: { color: 'black', backgroundColor: 'rgb(214, 102, 205)' },
    orange: { color: 'black', backgroundColor: 'rgb(252, 171, 82)' },
    lime: { color: 'black', backgroundColor: 'rgb(126, 211, 33)' },
    yellow: { color: 'black', backgroundColor: 'rgb(248, 232, 27)' },
    // Wiki
    b1: { color: 'white', backgroundColor: 'rgb(99,195,227)' },
    b2: { color: 'white', backgroundColor: 'rgb(39,112,197)' },
    b3: { color: 'white', backgroundColor: 'rgb(47,138,181)' },
    b4: { color: 'white', backgroundColor: 'rgb(9,44,126)' },

    legalTerms: {
        width: '75%',
        fontSize: '0.8rem',
        margin: '15px auto',
        textAlign: 'center',
        '@media (max-width: 767px)': {
            width: '100%',
            margin: '15px 0',
        },
    },
    termsText: {
        display: 'inline',
        fontWeight: '400',
    },
    termsLink: {
        textDecoration: 'underline',
    },
    hover: {
        cursor: 'pointer',
        WebkitBoxShadow: '0px 5px 40px -10px rgba(0,0,0,0.57)',
        MozBoxShadow: '0px 5px 40px -10px rgba(0,0,0,0.57)',
        boxShadow: '5px 40px -10px rgba(0,0,0,0.57)',
        transition: 'all 0.7s ease',
        fontSize: '1.6rem',
    },
    buttonContainer: {
        width: '100%',
        display: 'inline-flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '45px',
        maxHeight: '45px'
    },
    pointerContainer: {
        width: '100%',
        minHeight: '80px',
        position: 'relative',
        background: 'red',
        padding: '0',
        top: '-15px',
    },
    buttonTextContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: '10px',
    },
    sponsored: {
        fontSize: '0.8rem',
        padding: '5px 0 0 0',
        opacity: '0.5'
    },
    buttonGlow: {
        // WebkitBoxShadow: '0px 5px 40px -10px rgba(0,0,0,0.57)',
        // MozBoxShadow: '0px 5px 40px -10px rgba(0,0,0,0.57)',
        // boxShadow: '1px 2px 5px 2px rgba(0,0,0)',
        borderBottomRightRadius: '15px',
        borderTopRightRadius: '15px',
        // marginRight: '40px'
    },
    corner: {
        position: 'relative',
        transformOrigin: 'center',
        transform: 'rotate(45deg)',
        // border: '1px solid red',
        minWidth: '50px',
        height: '50px',
        marginRight: '-34px'
    },
    button1: {
        backgroundColor: 'rgb(47,138,181)'
    },
    button2: {
        backgroundColor: 'rgb(39,112,197)'
    }
};
export default styles;