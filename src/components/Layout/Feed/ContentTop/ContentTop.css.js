const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100vw',
        margin: '20px 0 5vh 0',
        '@media (max-width: 767px)': {
            flexDirection: 'row',
        },
    },
    contentTop: {
        color: '#777',
        textAlign: 'justify',
        fontWeight: '300',
        lineHeight: '1.1',
        fontSize: '1.5rem',
        width: '100%',
        maxWidth: '1200px',
        padding: '0 15px'
    }
};
export default styles;