import React from 'react';
import styles from './Latest.css.js';
import Radium from 'radium';
import { getSrcFromHtml, trimSnippet } from '../feed-toolz';

const LatestArticle = ({ key, article, styleVariants }) => {
    const { title, categories, link, content, html } = article;

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
            key={key}
            style={styles.articleRow}
            onClick={handleLinkClick}
        >
            <div style={styles.titleColumn}>
                <div style={fullArticleTitleStyle}>{title}</div>
                <div style={styles.keywordContainer}>
                    {categories.map((category, j) => (
                        <div style={styles.keyword} key={`${title}-category-item-${j}`}>                            
                            <a
                                key={`category-link-${j}`}
                                style={styles.category}
                                href={link}
                            >
                                <span>{category}</span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <div style={styles.textColumn}>
                {trimSnippet(content)}
            </div>
            <div style={styles.imageColumn}>
                <div style={{...styles.imageComponent, backgroundImage: `url(${getSrcFromHtml(html)})`}}/>
            </div>
        </div>
    )
};

export default Radium(LatestArticle);