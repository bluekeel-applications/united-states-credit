import React from 'react';
import styles from './TitleSection.css.js';

const TitleSection = ({ title}) => {
    return (
        <div style={styles.titleSectionContainer}>
            <div style={styles.topNub}></div>
            <div style={styles.titleText}>{title}</div>
            <div style={styles.bottomBreak}></div>
        </div>
    );
};

export default TitleSection;