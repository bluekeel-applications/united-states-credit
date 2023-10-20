const styles = {
    uscBase: {
        position: 'absolute',
        top: '200px',
        cursor: 'pointer',
    },
    pcmBase: {
        position: 'absolute',
        top: '35vh',
        cursor: 'pointer'
    },
    wikiBase: {
        position: 'absolute',
        top: '200px',
        cursor: 'pointer'
    },
    start: {
        transition: '1s all, 0.5s top'
    },
    nav: {
        position: 'fixed',
        top: '5px',
        zIndex: '10001'
    },
    button: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: '75px',
        WebkitTransition: '.5s all',
        transition: '.5s all',
        whiteSpace: 'nowrap',
        border: 'none'
    },
    navButton: {
        fontSize: '1.2rem',
        width: '200px',
        height: '50px',
    },
    startButton: {
        fontSize: '1.5rem',
        width: '275px',
        height: '75px',
    },
    usc: {
        backgroundColor: '#2670C5',
        color: '#fff',
    },
    pcm: {
        backgroundColor: '#d667cd',
        color: '#fff',
    },
    wiki: {
        backgroundColor: '#d667cd',
        color: '#fff',
    },
    hover: {
        backgroundColor: '#f5f5f5',
        color: 'black',
        cursor: 'pointer',
        WebkitBoxShadow: '0px 5px 40px -10px rgba(0,0,0,0.57)',
        MozBoxShadow: '0px 5px 40px -10px rgba(0,0,0,0.57)',
        boxShadow: '5px 40px -10px rgba(0,0,0,0.57)',
        transition: 'all 0.7s ease',
        fontSize: '1.6rem',
    },
    icon: {
        fontSize: '2rem',
        minWidth: '40px',
    }
};
export default styles;