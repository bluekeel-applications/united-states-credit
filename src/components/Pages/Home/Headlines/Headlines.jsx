import React from 'react';
import Carousel from './Carousel';
import TitleSection from '../TitleSection';
import styles from './Headlines.css.js';

const Headlines = ({ headlines }) => {
    return (
        <div style={styles.headlinesContainer}>
            <TitleSection title="Headlines" />
            <Carousel headlines={headlines} />
        </div>
    );
};

export default Headlines;