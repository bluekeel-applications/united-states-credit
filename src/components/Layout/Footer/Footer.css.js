const styles = {
    mainContainer: {
        maxWidth: '100vw',
        color: '$mid-grey',
        fontSize: '0.75rem',
        fontWeight: '400',
    },
    peopleContainer: {
        boxShadow: '0 3px 5px -2px rgba(0, 0, 0, .6)',
        padding: '0 20px',
        minWidth: '100vw',
    },
    peopleImage: {
        maxWidth: '1200px',
    },
    contentContainer: {
        padding: '1rem',
    },
    logo: {
        width: '75px',
        margin: 'auto',
        '@media (max-width: 767px)': {
            width: '45px',
        },
    },
    linkContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: '0 25%',
        '@media (max-width: 767px)': {
            margin: '0 5%',
            fontSize: '0.5rem',
        },
    },
    messageContainer: {
        margin: '10px 25%',
        '@media (max-width: 767px)': {
            margin: '10px 5%',
            fontSize: '0.5rem',
        },
    }
};
export default styles;