import React from 'react';
import Radium from 'radium';
import styles from './Editorial.css.js';

const EditorialItem = ({ key, article, styleVariants }) => {
    const { title, link, categories } = article;

    const handleLinkClick = (e) => {
        e.preventDefault();
        window.open(link, '_blank');
    };

    const fullArticleTitleStyle = Object.assign({}, 
        styles['articleTitle'],
        styleVariants['articleTitle']
    );

    return (
        <div
            style={styles.editorialItem}
            onClick={handleLinkClick}
            key={`${key}-component`}
        >
            <div key={`${key}-title`} style={fullArticleTitleStyle}>{title}</div>
            <div key={`${key}-keywords`} style={styles.keywordContainer}>
                {categories.map((category, j) => (
                    <div key={`${key}-keyword-${j}`} style={styles.keyword}>
                        <a
                            key={`${key}-link-${j}`}
                            style={styles.category}
                            href={link}
                        >
                            <span key={`${key}-text-${j}`}>{category}</span>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Radium(EditorialItem);