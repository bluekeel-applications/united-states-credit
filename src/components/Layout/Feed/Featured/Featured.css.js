export default {
    component: {
        display: 'flex',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        display: 'inline-flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1200px',
        margin: '20px 0 5vh 0',
        '@media (max-width: 767px)': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    featuredContainer: {
        width: '60%',
        '@media (max-width: 767px)': {
            width: '100%',
        },
        ':hover': {
            cursor: 'pointer',
            opacity: '0.6',
            transition: 'opacity 0.5s',
            borderRadius: '10px'
        }
    },
    featuredImage: {
        width: '100%'
    },
    featuredTitle: {
        fontSize: '2.5rem',
        letterSpacing: '-2px',
        lineHeight: '1.1em',
        fontWeight: '800',
        textAlign: 'left',
        '@media (max-width: 767px)': {
            fontSize: '2rem',
            padding: '20px'
        },
        ':hover': {
            cursor: 'pointer',
            opacity: '0.3',
            textDecoration: 'underline'
        }
    },
    listContainer: {
        maxWidth: '40%',
        minHeight: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        '@media (max-width: 767px)': {
            width: '100%',
            maxWidth: '100vw',
            minHeight: 'unset',
            marginTop: '20px'
        },
    },
    listItem: {
        minHeight: 'max-content',
        minWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '10px 20px',
        '@media (max-width: 767px)': {
            minHeight: 'fit-content',
        },
        ':hover': {
            cursor: 'pointer',
            backgroundColor: 'rgba(0,0,0,0.1)',
            opacity: '0.6',
            transition: 'all 0.5s',
            borderRadius: '10px'
        }
    },
    itemTitle: {
        fontSize: '1.75rem',
        letterSpacing: '-1px',
        lineHeight: '1.1em',
        fontWeight: '700',
        textAlign: 'left',
        '@media (max-width: 767px)': {
            fontSize: '1.2rem'
        },
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
}