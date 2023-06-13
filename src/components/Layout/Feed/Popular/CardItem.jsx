import React from 'react';
import { getSrcFromHtml, trimSnippet } from '../feed-toolz';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Radium from 'radium';
import styles from './Popular.css.js';

const CardItem = ({ key, article, styleVariants }) => {
    const { title, link, content, html } = article;

    const handleLinkClick = (e) => {
        e.preventDefault();
        window.open(link, '_blank');
    };

    const fullCardTitleStyle = Object.assign({}, 
        styles['cardTitle'],
        styleVariants['cardTitle']
    );

    return (
        <div key={key} style={styles.articleCard}>
            <CardActionArea onClick={handleLinkClick}>
                <CardContent style={styles.cardBody}>
                    <h2 style={fullCardTitleStyle}>{title}</h2>
                    <div style={styles.cardImageContainer}>
                        <div style={{...styles.cardImage, backgroundImage: `url(${getSrcFromHtml(html)})`}}/>
                    </div>
                    <p style={styles.cardText}>{trimSnippet(content)}</p>
                </CardContent>
            </CardActionArea>
        </div>
    )
};

export default Radium(CardItem);