import React from 'react';
import styles from './Articles.css.js';

const SectionTitle = ({text}) => (
    <div style={styles.sectionTitle}>
        {text}
    </div>
);

export default SectionTitle;