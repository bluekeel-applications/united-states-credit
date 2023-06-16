import React from 'react';
import styles from './System1.css.js';
import { useMediaQuery } from 'react-responsive';

const MainTitle = ({text}) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const titleStyle = Object.assign({},
        styles.title,
        isMobile && styles.titleMobile
    );

    return (
        <div style={titleStyle}>
            {text}
        </div>
    );
}

export default MainTitle;