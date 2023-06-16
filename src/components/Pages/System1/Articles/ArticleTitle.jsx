import React from 'react';
import styles from './Articles.css.js';

const ArticleTitle = ({text}) => (
    <div style={styles.title}>
        {text}
    </div>
);

export default ArticleTitle;