import UscFlagRight from '@bit/bluekeel.assets.usc-flag-right';
import UscFlagLeft from '@bit/bluekeel.assets.usc-flag-left';

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100vw',
        WebkitBoxShadow: 'inset 0px -4px 6px -6px rgba(0,0,0,1)',
        MozBoxShadow: 'inset 0px -4px 6px -6px rgba(0,0,0,1)',
        boxShadow: 'inset 0px -4px 6px -6px rgba(0,0,0,1)',
    },
    usc: {
        backgroundImage: `url(${UscFlagLeft}), url(${UscFlagRight})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '220px auto',
        backgroundPosition: 'left top, right top',
        minHeight: 'inherit',
        '@media (max-width: 767px)': {
            backgroundSize: '60px auto',
            padding: '0 0 30px 0',
        }
    },
    pcm: {
        backgroundColor: 'rgb(216,226,240)',
    },
    wiki: {
        backgroundColor: 'aliceblue',
    },
    wikiStart: {
        backgroundColor: '#ffffff',
        minHeight: '300px',
        '@media (max-width: 767px)': {
            minHeight: '35vh !important'
        }
    },
    pcmStart: {
        backgroundColor: '#ffffff',
        minHeight: '40vh'
    },
    uscStart: {
        backgroundImage: `url(${UscFlagLeft}), url(${UscFlagRight})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '220px auto',
        backgroundPosition: 'left top, right top',
        minHeight: '300px',
        '@media (max-width: 767px)': {
            backgroundSize: '60px auto',
            padding: '0 0 30px 0',
        }
    },
    questionBox: {
        maxWidth: '1000px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (max-width: 767px)': {
            maxWidth: '100vw',
            minWidth: '100vw',
            padding: '0'
        }
    },
    fullPage: {
        maxWidth: '100vw',
        minWidth: '100vw'
    }
};
export default styles;