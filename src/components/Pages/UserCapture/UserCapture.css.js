import { keyframes } from 'radium';

const bounceAnimation = keyframes({
    '0%': { transform: 'translateY(0)' },
    '20%': { transform: 'translateY(10px)' },
    '40%': { transform: 'translateY(0)' },
    '60%': { transform: 'translateY(10px)' },
    '80%': { transform: 'translateY(0)' },
    '100%': { transform: 'translateY(0)' }
}, 'bounce');

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
        backgroundColor: '#ffffff',
        '@media (max-width: 767px)': {
            margin: '10px 0 30px 0',
            boxShadow: 'none',
            padding: '0 10px 30px 10px',
        }
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '20px',
        '@media (max-width: 767px)': {
            marginBottom: '0',
        }
    },
    titleText: {
        fontSize: '1.5rem',
        padding: '10px 0',
        '@media (max-width: 767px)': {
            fontSize: '1.25rem'
        }
    },
    arrowIcon: {
        fontSize: '1.5rem',
        color: '#092c7e',
        animationName: bounceAnimation,
        animationDuration: '1.2s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out',
        marginTop: '2px'
    },
    formContainer: {
        minWidth: '280px'
    },
    input: {
        marginTop: '20px'
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '20px 30%',
        '@media (max-width: 767px)': {
            padding: '20px 0',
        }
    },
    submitButton: {
        backgroundColor: '#092c7e',
        color: 'white',
        padding: '12px 30px',
        borderRadius: '25px',
        border: 'none',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        ':hover': {
            backgroundColor: '#2670c5'
        }
    },
    disabledButton: {
        backgroundColor: '#cccccc',
        color: '#666666',
        padding: '12px 30px',
        borderRadius: '25px',
        border: 'none',
        fontSize: '1rem',
        cursor: 'not-allowed',
        transition: 'background-color 0.3s ease'
    },
    termsContainer: {
        width: '100%',
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
        fontWeight: '400',
        lineHeight: '1.4'
    },
    termsLinks: {
        textDecoration: 'underline',
        color: '#092c7e',
        ':hover': {
            color: '#2670c5'
        }
    },
    headline: {
        fontSize: '1.75rem',
        padding: '5vh 0 10px 0',
        '@media (max-width: 767px)': {
            fontSize: '1.75rem',
            padding: '8vh 0 10px 0'
        }
    }
};

export default styles; 