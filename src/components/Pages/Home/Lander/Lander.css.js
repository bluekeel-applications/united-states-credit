const styles = {
    landerContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#2F8DFA',
        padding: '40px 0 100px 0',
    },
    landerTitle: {
        fontSize: '2rem',
        fontWeight: '400',
        color: 'white',
        width: '100%',
        height: '100%',
        textAlign: 'center',
    },
    landerTitleHighlight: {
        color: '#203EB7',
    },
    landerSubtitle: {
        fontSize: '1.2rem',
        fontWeight: '400',
        color: 'white',
        width: '100%',
        textAlign: 'center',
        '@media (max-width: 767px)': {
            fontSize: '1rem',
            padding: '0 20px',
        },
    },
    popularCategoriesContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popularCategoriesTitle: {
        fontSize: '0.8rem',
        marginBottom: '10px',
        color: 'white',
        width: '100%',
        textAlign: 'center',
    },
    popularCategoriesGrid: {
        width: '100%',
        maxWidth: '100vw',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    popularCategoryCard: {
        width: '120px',
        height: '90px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#4A9EFF',
        borderRadius: '10px',
        padding: '10px',
        margin: '5px',
    },
    popularCategoryCardTitle: {
        fontSize: '0.8rem',
        color: 'white',
        width: '100%',
        textAlign: 'center',
        lineHeight: '1',
    },
    popularCategoryCardIcon: {
        fontSize: '1.5rem',
        color: 'white',
        height: '25px',
        textAlign: 'center',
        margin: '5px 0 10px 0'
    }
};

export default styles;