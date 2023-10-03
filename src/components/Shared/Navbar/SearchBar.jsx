import React, { useState } from 'react';
import Radium from 'radium';
import styles from './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBar = () => {
    const [ isHovering, setHovering ] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const handleSubmission = () => {
        if(searchInput === '') return;
        const linkout = `https://search.unitedstatescredit.com/serp?q=${encodeURIComponent(searchInput)}`
        let newTab = window.open();
        newTab.location = linkout;
    };

    const handleClick = () => {
        handleSubmission();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmission();
        };
    };

    const hoverStyle = Object.assign({},
        styles['searchButton'],
        isHovering && styles['hover']
    );

    return(
        <div style={styles.searchBarContainer}>
            <input
                type='search'
                placeholder='Search'
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={searchInput}
                style={styles.inputContainer}
            />
            <div 
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                style={hoverStyle}
                onClick={handleClick}
            >
                <FontAwesomeIcon
                    icon={['fal', 'search']}
                    style={styles.buttonIcon}
                />
            </div>
        </div>
    )
};

export default Radium(SearchBar);