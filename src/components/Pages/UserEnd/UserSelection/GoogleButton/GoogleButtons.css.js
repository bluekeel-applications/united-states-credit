import './GoogleButton.css';

const styles = {
    pointerContainer: {
        margin: '5px 20px',
        padding: '15px',
        fontSize: '1.5rem',
        color: 'white'
    },
    buttonTextContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: '10px',
    },
    sponsored: {
        fontSize: '0.8rem',
        padding: '5px 0 0 0',
        opacity: '0.5'
    },
    button1: {
        backgroundColor: 'rgb(47,138,181)'
    },
    button2: {
        backgroundColor: 'rgb(39,112,197)'
    },
    linkContainer: {
        padding: '15px',
        fontSize: '1.5rem',
        margin: '5px 20px',
        fontWeight: '300',
        borderRadius: '25px',
        borderBottom: '1px solid red'
    },
    hover: {
        cursor: 'pointer',
        WebkitBoxShadow: '0px 5px 40px -10px rgba(0,0,0,0.57)',
        MozBoxShadow: '0px 5px 40px -10px rgba(0,0,0,0.57)',
        boxShadow: '5px 40px -10px rgba(0,0,0,0.57)',
        transition: 'all 0.7s ease',
        fontSize: '1.6rem',
    },
};
export default styles;