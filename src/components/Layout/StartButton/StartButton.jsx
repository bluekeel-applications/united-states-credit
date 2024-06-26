import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './StartButton.css.js';
import Radium from 'radium';

const StartButton = ({ showNav }) => {
    // let navigate = useNavigate();
    const [ isHovering, setHovering ] = useState(false);

    const posStyle = Object.assign({}, 
        styles[`uscBase`],
        styles[showNav ? 'nav' : 'start']
    );
        
    const buttStyle = Object.assign({}, 
        styles['button'],
        styles[showNav ? 'navButton' : 'startButton'],
        styles[isHovering ? 'hover': 'usc'],
    );

    const handleStartClick = () => {
        window.scrollTo(0, 0);
        window.location.href = 'https://www.bkoffers.com/hitstreet/redirect_one_step.cfm?oid=40&sid=9659&pid=3415&eid=yourEID&uid=yourUID&email=omit';
        // navigate('https://www.bkoffers.com/hitstreet/redirect_one_step.cfm?oid=40&sid=9659&pid=3415&eid=yourEID&uid=yourUID&email=omit');
        return;
    };
    
    return (
        <div style={posStyle}>
            <button
                key='start-button-el'
                onClick={handleStartClick}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                style={buttStyle}
            >
                Get Started
                <FontAwesomeIcon
                    icon={['fal', 'arrow-alt-right']}
                    style={styles['icon']}
                />
            </button>
        </div>
    );
};

export default Radium(StartButton);