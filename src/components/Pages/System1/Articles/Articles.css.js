const styles = {
    mainConatiner: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100vw',
        margin: '20px 0 5vh 0',
        maxWidth: '100vw'
    },
    contentContainer: {
        color: '#777',
        textAlign: 'justify',
        fontWeight: '300',
        lineHeight: '1.3',
        fontSize: '1.5rem',
        width: '100%',
        maxWidth: '1200px',
        padding: '15px'
    },
    recOfferContainer: {
        color: '#777',
        textAlign: 'justify',
        fontWeight: '300',
        lineHeight: '1.3',
        fontSize: '1.5rem',
        width: '90%',
        maxWidth: '1200px',
        padding: '15px 30px',
        margin: '20px',
        backgroundColor: 'aliceblue'
    },
    boldText: {
        fontWeight: '700'
    },
    title: {
        fontWeight: '700',
        fontSize: '1.8rem',
        paddingBottom: '15px'
    },
    sectionTitle: {
        fontWeight: '700',
        fontSize: '2.2rem',
        paddingBottom: '15px'
    },
    contentText: {
        fontSize: '1.3rem',
        padding: '15px 0'
    },
    contentHeading: {
        fontWeight: '500'
    },
    exampleTable: {
        width: '100%',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        marginTop: '20px'
    },
    exampleTableMobile: {
        display: 'block',
    },
    tableHeader: {
        fontSize: '1.1rem'
    },
    tableData: {
        border: '1px solid #dddddd',
        textAlign: 'left',
        padding: '8px',
        fontSize: '1.1rem',
        backgroundColor: '#dddddd'
    },
    tableData2: {
        textAlign: 'left',
        padding: '8px',
        fontSize: '1.1rem',
    },
    offerButtonContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    offerButton: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: '75px',
        WebkitTransition: '.5s all',
        transition: '.5s all',
        whiteSpace: 'nowrap',
        border: 'none',
        fontSize: '1.5rem',
        width: '200px',
        height: '50px',
        backgroundColor: '#2670C5',
        color: '#fff',
    },
    offerHover: {
        backgroundColor: '#f5f5f5',
        color: 'black',
        cursor: 'pointer',
        WebkitBoxShadow: '0px 5px 40px -10px rgba(0,0,0,0.57)',
        MozBoxShadow: '0px 5px 40px -10px rgba(0,0,0,0.57)',
        boxShadow: '5px 40px -10px rgba(0,0,0,0.57)',
        transition: 'all 0.7s ease',
        fontSize: '1.6rem',
    },
    recTitleContainer: {
        width: '100%',
        display: 'inline-flex',
        justifyContent: 'flex-start',
        textAlign: 'left',
        alignItems: 'baseline',
    },
    recIcon: {
        fontSize: '1.5rem',
        marginRight: '10px'
    }
};

export default styles;