import React, { useState, memo } from 'react';
import styles from './GoogleButtons.css.js';

const GoogleButtons = ({ link, idx, handleClick }) => {
    const [ isHovering, setHovering ] = useState(false);
    const color = link.button_color || 'FFFFFF';
    const textColor = link.text_color || 'black';

    const buildButtonStyle = Object.assign({},
        styles['linkContainer'],
        isHovering && styles['hover'],
        color !== 'FFFFFF' && {color: textColor, backgroundColor: `#${color}`}
    );
    
    return (
        <button
            key={`user-selection-link__${idx}`}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            style={buildButtonStyle}
            onClick={handleClick}
        >
            <div style={styles.buttonTextContainer}>
                <div style={styles.linkText}>{link.text}</div>
                <div style={styles.sponsored}>Sponsored Listings</div>
            </div>          
        </button>
    )
};

export default memo(GoogleButtons);