import React from 'react';
import Radium from 'radium';
import styles from './ContentTop.css.js';

const ContentTop = ({ text }) => (
    <div style={styles.container}>
        <div style={styles.contentTop}>
            {text}
        </div>
    </div>
);

export default Radium(ContentTop);