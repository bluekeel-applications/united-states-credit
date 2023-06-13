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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1200px',
        margin: '25px 0',
        '@media (max-width: 767px)': {
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
    articleRow: {
        display: 'inline-flex',
        maxHeight: '200px',
        marginTop: '20px',
        width: '85%',
        '@media (max-width: 767px)': {
            display: 'flex',
            flexFlow: 'row nowrap',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
        },
        ':hover': {
            cursor: 'pointer',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            opacity: '0.6',
            transition: 'opacity 0.5s, background-color 0.5s',
            borderRadius: '10px',
        }
    },
    titleColumn: {
        width: '30%',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '@media (max-width: 767px)': {
            width: '100%',
        }
    },
    articleTitle: {
        fontSize: '1.5rem',
        letterSpacing: '-1px',
        lineHeight: '1.1em',
        fontWeight: '800',
        textAlign: 'left'
    },
    keywordContainer: {
        display: 'flex',
        flexFlow: 'row wrap',
        width: '100%',
        maxWidth: '100vw',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '10px',
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
    },
    textColumn: {
        display: 'flex',
        textAlign: 'justify',
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#777',
        fontWeight: '300',
        fontSize: '1.2rem',
        lineHeight: '1.25em',
        padding: '10px 25px',
        '@media (max-width: 767px)': {
            display: 'none'
        },
    },
    imageColumn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '250px',
        height: '200px'
    },
    imageComponent: {
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: '10px'
    }
}