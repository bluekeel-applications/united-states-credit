const styles = {
    loadingContainer: {
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        width: '100vw',
        maxWidth: '1000px',
        padding: '50px 0',
    },
    header: {
        fontSize: '2.2rem',
        padding: '20px 0',
        '@media (max-width: 767px)': {
            fontSize: '1.45rem',
            padding: '10px 10px 0 10px',
        },
    },
    sponsored: {
        width: '50%',
        padding: '5px 0',
        fontWeight: '200',
        '@media (max-width: 767px)': {
            width: '100%',
            paddingTop: '20px'
        },
    },
    buttonGroup: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        color: '#fff',
        width: '48%',
        margin: '1%',
        padding: '0',
        borderRadius: '10px',
        WebkitBoxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)',
        MozBoxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)',
        border: 'none',
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        height: '65px',
        '@media (max-width: 767px)': {
            width: '92%',
            margin: '2% 4%',
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
    button_0: { backgroundColor: '#189fe5' },
    button_1: { backgroundColor: '#16bc55' },
    button_2: { backgroundColor: '#f79931' },
    button_3: { backgroundColor: '#e54393' },
    iconContainer: {
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
        width: '10%',
        height: '65px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    icon: {
        fontSize: '2rem'
    },
    textContainer: {
        width: '90%',
        height: '65px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.25rem',
        fontWeight: '400'
    }
};
export default styles;