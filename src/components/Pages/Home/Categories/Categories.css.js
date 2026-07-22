const styles = {
    mainContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '30px',
        backgroundColor: 'white',
    },
    categoriesContainer: {
        maxWidth: '1200px',
        margin: '10px auto 20px',
        padding: '2.5rem 1rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    categoriesTitle: {
        width: '100%',
        textAlign: 'left',
        fontSize: '1.2rem',
        fontWeight: '400',
        color: 'black',
        marginBottom: '20px',
    },
    categoriesList: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        '@media (max-width: 767px)': {
            justifyContent: 'space-between',
        }
    },
    categoryItem: {
        fontSize: '0.85rem',
        color: '#2F8DFA',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'color 0.2s ease',
        lineHeight: '1.4',
        padding: '5px 0',
        textAlign: 'left',
        // width: 'calc(20% - 12px)',
        width: '230px',
        '&:hover': {
            color: '#1a5bb8',
        },
        '@media (max-width: 767px)': {
            width: '170px'
        }
    },
};

export default styles;