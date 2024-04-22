import React from 'react';
import styles from '../Articles.css';

const ContentTitle = ({text}) => (
    <div style={styles.contentHeading}>
        {text}
    </div>
);

export default ContentTitle;