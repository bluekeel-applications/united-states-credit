const styles = {
    navbar: {
        height: '60px',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        boxShadow: '0 4px 6px -6px black',
        backgroundColor: '#fff'
    },
    toolbar: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        minHeight: '50px',
        height: '60px'
    },
    navContent: {
        display: 'inline-flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1600px',
        height: '60px'
    },
    brand: {
        width: 'auto',
        maxHeight: '50px',
        paddingLeft: '30px',
        '@media (max-width: 1000px)': {
            paddingLeft: '0'
        },
        ':hover': {
            cursor: 'pointer'
        }
    },
    menuIcon: {
        fontSize: '24px',
        color: 'black',
        // width: '200px',
        marginRight: '50px',
        padding: '5px',
        borderRadius: '25px',
        '@media (max-width: 900px)': {
            // paddingRight: '20px',
            width: '40px',
            marginRight: '0px'
        },
    },
    hoverMenu: {
        cursor: 'pointer',
        WebkitBoxShadow: '0px 5px 40px -10px rgba(0,0,0,0.57)',
        MozBoxShadow: '0px 5px 40px -10px rgba(0,0,0,0.57)',
        boxShadow: '5px 40px -10px rgba(0,0,0,0.57)',
        transition: 'all 0.7s ease',
        color: 'white',
        backgroundColor: 'rgb(8,43,126)'
    },
    searchBarContainer: {
        border: '1px solid #092c7e',
        borderRadius: '25px',
        color: 'black',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '20px'
    },
    inputContainer: {
        borderRadius: '25px',
        width: '325px',
        height: '40px',
        border: 'none',
        fontFamily: 'Roboto',
        color: '#092c7e',
        '@media (max-width: 900px)': {
            padding: '0 20px 0 10px',
            width: '150px',
        },
    },
    searchButton: {
        height: '40px',
        width: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white', 
        backgroundColor: '#092c7e',
        borderTopRightRadius: '25px',
        borderBottomRightRadius: '25px',
        ':hover': {
            cursor: 'pointer',
            backgroundColor: '#2670c5'
        }
    },
    buttonIcon: {
        margin: '0 10px',
        fontSize: '1.5rem',
    }
};
export default styles;