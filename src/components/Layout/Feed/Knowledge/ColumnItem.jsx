import React from 'react';
import styles from './Knowledge.css.js';
import { getSrcFromHtml } from '../feed-toolz';
import Radium from 'radium';

const ColumnItem = ({ itemIdx, item_data, styleOverride }) => {
    const { content, link, title, categories } = item_data;

    const handleLinkClick = (e) => {
        e.preventDefault();
        window.open(link, '_blank');
    };

    const fullItemTitleStyle = Object.assign({}, 
        styles['columnItemTitle'],
        styleOverride['columnItemTitle']
    );

    return (
        <div key={`${title}-item-key`} style={styles.columnItem}>
            <img 
                src={getSrcFromHtml(content, true, 'sm')} 
                style={styles.columnItemImage} 
                alt='column-item-img' 
            />
            <div style={styles.columnItemContent}>
                <div 
                    style={fullItemTitleStyle} 
                    onClick={handleLinkClick}
                >
                    {title}
                </div>
                <div style={styles.keywordContainer}>
                    {categories.map((category, j) => (
                        <div 
                            style={styles.keyword} 
                            key={`${title}-category-item-${j}`}
                        >
                            <a
                                key={`keywords-${itemIdx}-category-link-${j}`}
                                style={styles.category} 
                                href={link}
                            >
                                <span>{category}</span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Radium(ColumnItem);