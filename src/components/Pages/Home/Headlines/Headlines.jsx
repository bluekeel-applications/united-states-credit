import React from 'react';
import Carousel from './Carousel';
import TitleSection from '../TitleSection';
import styles from './Headlines.css.js';

const Headlines = ({ headlines }) => {
    return (
        <div style={{backgroundColor: 'white', width: '100%'}}>
            <div style={styles.headlinesContainer}>
                <TitleSection title="Headlines" />
                <Carousel headlines={headlines} />
            </div>
        </div>
    );
};

export default Headlines;