const styles = {
    searchContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30px',
        marginBottom: '30px',
        padding: '0 20px'
    },
    searchWrapper: {
        position: 'relative',
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        alignItems: 'center',
    },
    searchInput: {
        width: '100%',
        height: '50px',
        padding: '0 70px 0 20px',
        fontSize: '1.1rem',
        border: 'none',
        borderRadius: '25px',
        backgroundColor: 'white',
        color: '#333',
        outline: 'none',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        '&::placeholder': {
            color: '#999',
        },
        '@media (max-width: 767px)': {
            height: '50px',
            fontSize: '1rem',
            padding: '0 60px 0 15px',
        },
    },
    searchButton: {
        position: 'absolute',
        right: '8px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '44px',
        height: '44px',
        border: 'none',
        borderRadius: '22px',
        backgroundColor: 'rgb(32, 62, 183)',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-color 0.2s ease',
        '&:hover': {
            backgroundColor: '#1E7AE6',
        },
        '@media (max-width: 767px)': {
            width: '38px',
            height: '38px',
        },
    },
    searchIcon: {
        width: '20px',
        height: '20px',
        '@media (max-width: 767px)': {
            width: '18px',
            height: '18px',
        },
    },
};

export default styles; 