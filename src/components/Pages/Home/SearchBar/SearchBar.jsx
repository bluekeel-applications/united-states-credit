import React, { useState } from 'react';
import styles from './SearchBar.css.js';
import Radium from 'radium';

const SearchBar = () => {
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(search);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div style={styles.searchContainer}>
            <div style={styles.searchWrapper}>
                <input 
                    type='text' 
                    placeholder='Search' 
                    style={styles.searchInput}
                    value={search}
                    onChange={handleSearch}
                    onKeyDown={handleKeyDown}
                />
                <button style={styles.searchButton} onClick={handleSubmit}>
                    <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        style={styles.searchIcon}
                    >
                        <path 
                            d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" 
                            stroke="white" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Radium(SearchBar);