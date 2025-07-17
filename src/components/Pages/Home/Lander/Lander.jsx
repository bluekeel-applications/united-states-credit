import React from 'react';
import styles from './Lander.css.js';
import Radium from 'radium';
import PopularCategories from './PopularCategories';
import SearchBar from '../SearchBar';

const Lander = () => {
    return (
        <div style={styles.landerContainer}>
            <div style={styles.landerTitle}>
                Get Help With All Your <span style={styles.landerTitleHighlight}>Credit Needs</span>
            </div>
            <div style={styles.landerSubtitle}>
                Find the right loan, find the right credit card and find the right knowledge.
            </div>
            <SearchBar />
            <PopularCategories />
        </div>
    );
};

export default Radium(Lander);