const styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        maxWidth: '100vw'
    },
    headerContainer: {
        width: '70vw',
        maxWidth: '1200px',
        marginTop: '50px',
        padding: '15px'
    },
    headerContainerMobile: {
        width: '95vw',
        maxWidth: '95vw',
        // marginTop: '50px',
        padding: '0 10px'
    },
    headerText: {
        color: '#777',
        textAlign: 'justify',
        fontWeight: '300',
        lineHeight: '1.3',
        fontSize: '1.5rem',
        width: '100%',
        maxWidth: '1200px',
        padding: '15px'
    },
    headerTextMobile: {
        fontSize: '1.4rem',
        padding: '0 15px'
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
        margin: '0 0 30px 0',
        boxShadow: 'none',
        padding: '30px 25px',
    },
    title: {
        fontWeight: '700',
        fontSize: '2.5rem',
        paddingBottom: '15px'
    },
    titleMobile: {
        fontSize: '2rem',
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
    // legalTerms: {
    //     width: '75%',
    //     fontSize: '0.8rem',
    //     margin: '15px auto',
    //     textAlign: 'center'
    // },
    // legalTermsMobile: {
    //     width: '100%',
    //     margin: '15px 0',
    // },
    // termsText: {
    //     display: 'inline',
    //     fontWeight: '400',
    // },
    // termsLink: {
    //     textDecoration: 'underline',
    // },
    blockContainer: {
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '30px',
        border: '1px solid rgba(15, 64, 107, 0.5)',
        borderRadius: '10px',
        backgroundColor: 'rgb(239,248,255)',
        margin: '25px 5px 50px 5px'
    },
    buttonBlockContainer: {
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '30px',
        border: '1px solid rgba(15, 64, 107, 0.5)',
        borderRadius: '10px',
        backgroundColor: 'rgb(239,248,255)',
        margin: '25px 5px 50px 5px'
    },
    blockTitle: {
        width: '100%',
        textAlign: 'center',
        fontSize: '1.6rem',
        fontWeight: 'bold',
        marginBottom: '25px'
    },
    blockOffersListContainer: {
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    blockOfferContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    blockOfferButton: {
        width: '350px',
        height: '50px',
        backgroundColor: 'rgb(9,44,126)',
        color: 'rgb(255,255,255)',
        fontSize: '1.5rem',
        marginBottom: '10px',
        borderRadius: '75px',
        whiteSpace: 'nowrap'
    },
    offerHover: {
        backgroundColor: '#f5f5f5',
        color: 'black',
        cursor: 'pointer',
        WebkitBoxShadow: '0px 5px 40px -10px rgba(0,0,0,0.57)',
        MozBoxShadow: '0px 5px 40px -10px rgba(0,0,0,0.57)',
        boxShadow: '5px 40px -10px rgba(0,0,0,0.57)',
        transition: 'all 0.7s ease',
        fontSize: '1.6rem',
    },
};

export default styles;