import React from 'react';
import styles from './Knowledge.css.js';
import Radium from 'radium';

const TypeColumn = ({ title, children, styleOverride }) => {

    const fullColumnTitleStyle = Object.assign({}, 
        styles['typeColumnTitle'],
        styleOverride['typeColumnTitle']
    );

    return (
        <div key={`${title}-info-column`} style={styles.typeColumn}>
            <div style={fullColumnTitleStyle}>{title}</div>
            <div style={styles.typeColumnContent}>
                {children}
            </div>
        </div>
    );
}

export default Radium(TypeColumn);