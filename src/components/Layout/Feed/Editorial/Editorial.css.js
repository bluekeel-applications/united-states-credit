const styles = {
    component: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '100vw',
        maxWidth: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
    },
    componentContent: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1200px',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (max-width: 767px)': {
            maxWidth: '100vw'
        },
    },
    articleRow: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: '4vh 0',
        width: '100%',
        minHeight: 'max-content',
        '@media (max-width: 767px)': {
            padding: '0',
            margin: '10px 0 0 0',
        },
    },
    mainArticleContainer: {
        width: '60%',
        '@media (max-width: 767px)': {
            width: '100%'
        },
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: '100vw',
        height: '500px',
        '@media (max-width: 767px)': {
            height: '300px'
        },
    },
    articleImage: {
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: '100%',
        height: '100%',
        ':hover': {
            opacity: '0.25',
            cursor: 'pointer',
        }
    },
    listContainer: {
        width: '35%',
        minHeight: 'inherit',
        padding: '0 0 0 20px',
        '@media (max-width: 767px)': {
            width: '100%',
            padding: '0 15px',
        }
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
    editorialTitle: {
        fontSize: '2.5rem',
        letterSpacing: '-1px',
        lineHeight: '1.1em',
        fontWeight: '800',
        paddingBottom: '20px',
        '@media (max-width: 767px)': {
            fontSize: '2rem',
            padding: '10px',
        },
    },
    articleTitle: {
        fontSize: '1.75rem',
        letterSpacing: '-1px',
        lineHeight: '1.1em',
        fontWeight: '700',
        textAlign: 'left',
        '@media (max-width: 767px)': {
            fontSize: '1.3rem'
        },
        ':hover': {
            cursor: 'pointer',
            opacity: '0.3',
            textDecoration: 'underline'
        }
    },
    editorialItem: {
        minHeight: 'max-content',
        minWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'space-between',
        padding: '10px',
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
    keywordContainer: {
        display: 'flex',
        flexFlow: 'row wrap',
        width: '100%',
        maxWidth: '100vw',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '10px',
        bottomBorder: '1px solid rgba(126,124,124,0.25)',
        lineHeight: '1.4',
        '@media (max-width: 767px)': {
            padding: '0 10px'
        },
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
export default styles;