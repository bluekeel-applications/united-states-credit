export default {
    component: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '100vw',
        maxWidth: '100vw',
        justifyContent: 'center',
        alignItems: 'center'
    },
    componentContent: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '1200px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        display: 'inline-flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        maxWidth: '1200px',
        margin: '25px 0',
        '@media (max-width: 767px)': {
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100vw',
        },
    },
    contentTitle: {
        width: '100%',
        margin: '2vh 0',
        padding: '0 15px',
        borderBottom: '2px solid rgba(126,124,124,0.25)',
        textAlign: 'left'
    },
    contentTitleSpan: {
        fontWeight: '800',
        fontSize: '1.6rem',
        padding: '0 10px',
    },
    typeColumn: {
        display: 'flex',
        width: '33%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: '0 10px',
        '@media (max-width: 767px)': {
            width: '100%',
            marginBottom: '25px'
        },
    },
    typeColumnTitle: {
        fontSize: '1.3rem',
        width: '100%',
        fontWeight: '800',
        textAlign: 'left'
    },
    typeColumnContent: {
        width: '100%',
        maxWidth: '100vw',
        minHeight: '350px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: '1px solid rgba(126, 124, 124, 0.25)',
        lineHeight: '1.4em',
        '@media (max-width: 767px)': {
            borderRight: 'none',
            minHeight: '250px',
        },
    },
    columnItem: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px',
        maxHeight: '170px',
        ':hover': {
            cursor: 'pointer',
            backgroundColor: 'rgba(0,0,0,0.1)',
            opacity: '0.6',
            transition: 'all 0.5s',
            borderRadius: '10px'
        }
    },
    columnItemImage: {
        width: '50%',
        height: '100%'
    },
    columnItemContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '150px',
        padding: '0 10px'
    },
    columnItemTitle: {
        fontSize: '1.1rem',
        lineHeight: '1',
        fontWeight: '800',
        textAlign: 'left',
        ':hover': {
            cursor: 'pointer',
            opacity: '0.3',
            textDecoration: 'underline'
        }
    },
    keywordContainer: {
        display: 'flex',
        flexFlow: 'row wrap',
        width: '100%',
        maxWidth: '100vw',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '10px',
        bottomBorder: '1px solid rgba(126,124,124,0.25)',
        lineHeight: '1.4'
    },
    keyword: {
        lineHeight: '1',
        padding: '0 10px 5px 0',
        display: 'flex',
        alignItems: 'center'
    },
    category: {
        fontSize: '0.8rem',
        fontWeight: '300',
        color: '#777',
        textDecoration: 'underline #a9a9a9',
        whiteSpace: 'nowrap',
        '@media (max-width: 767px)': {
            fontSize: '0.75rem'
        },
        ':hover': {
            cursor: 'pointer',
            color: '#a9a9a9',
            textDecoration: 'none'
        }
    }
};