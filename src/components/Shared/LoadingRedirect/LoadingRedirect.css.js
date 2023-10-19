export default {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '50px',
        '@media (max-width: 767px)': {
            width: '100%',
            padding: '0',
        },
    },
    title: {
        fontSize: '1.75rem',
        fontWeight: '500',
        color: '#092c7e',
        '@media (max-width: 767px)': {
            width: '100%',
            padding: '20px 40px',
        },
    },
    message: {
        color: '#092c7e',
        fontSize: '2rem',
        fontWeight: '300',
        '@media (max-width: 767px)': {
            width: '100%',
            padding: '20px 40px',
            fontSize: '1.8rem',
        },
    },
    lottie: {
        minWidth: '100vw'
    }
}