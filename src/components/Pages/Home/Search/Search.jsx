import React from 'react';
import styles from './Search.css.js';
import SearchBar from '../SearchBar';
const Search = () => {
    return (
        <div style={styles.searchContainer}>
            <div style={styles.searchTitle}>A Smarter Way to Credit Freedom</div>
            <SearchBar />
        </div>
    );
};

export default Search;