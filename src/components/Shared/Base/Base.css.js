const styles = {
    baseContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#203EB7',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '20px 0',
        color: 'white'
    },
    contentContainer: {
        width: '100%',
        height: '100%',
        maxWidth: '1200px',
        margin: '10px auto 20px',
        padding: '2.5rem 1rem 1.5rem',
        '@media (max-width: 767px)': {
            padding: '0 1rem 1.5rem',
        },
    },
    topContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 0',
        '@media (max-width: 767px)': {
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
    },
    logo: {
        width: '225px',
        height: 'auto',
        padding: '10px 0',
    },
    linkContainer: {
        width: '60vw',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '20px 0',
        '@media (max-width: 767px)': {
            width: '100%',
        },
    },
    break: {
        width: '100%',
        height: '4px',
        backgroundColor: 'transparent',
        borderRadius: '5px',
        border: '1px solid rgba(255, 255, 255, 1)',
    },
    bottomContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 0',
        '@media (max-width: 767px)': {
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
    },
    messageContainer: {
        width: '75%',
        height: '100%',
        textAlign: 'left',
        padding: '20px 10vw 20px 0',
        '@media (max-width: 767px)': {
            width: '100%',
            padding: '20px 0',
        },
    },
    rightContainer: {
        width: '25%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: '20px 0',
        '@media (max-width: 767px)': {
            width: '100%',
        },
    },
    sectionHeaderContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    sectionHeadNub: {
        width: '25px',
        height: '4px',
        backgroundColor: '#2F8DFA',
        borderRadius: '5px',
    },
    sectionHeadText: {
        width: '100%',
        textAlign: 'left',
        fontSize: '1.2rem',
        fontWeight: '400',
        color: 'white',
    },
    contactUsContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    contactUsText: {
        fontSize: '0.8rem',
        color: 'white',
        textAlign: 'left',
        margin: '0 0 20px 0'
    },
    contactUsLink: {
        color: 'white',
        textDecoration: 'underline',
        padding: '0 0 0 5px'
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '0.8rem',
    },
    delim: {
        color: 'white',
        padding: '0 10px'
    },
    followUsContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
};

export default styles;