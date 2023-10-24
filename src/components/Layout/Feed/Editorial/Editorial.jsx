import React from 'react';
import SearchPad from '../../../../assets/Images/search_pad.jpg';
import EditorialList from './EditorialList';
import styles from './Editorial.css.js';
import Radium from 'radium';

const Editorial = ({ feedData, styleVariants }) => {

    const handleVisualSearch = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
    };

    const fullRowTitleStyle = Object.assign({}, 
        styles['contentTitleSpan'],
        styleVariants['contentTitleSpan']
    );
    const fullEditorialTitleStyle = Object.assign({}, 
        styles['editorialTitle'],
        styleVariants['editorialTitle']
    );

    return (
        <div key='editorial-blogfeed-component' style={styles.component}>
            <div style={styles.componentContent}>
                <div style={styles.contentTitle}>
                    <span style={fullRowTitleStyle}>Editorial</span>
                </div>
                <div style={styles.articleRow}>
                    <div style={styles.mainArticleContainer} onClick={handleVisualSearch}>
                        <div style={fullEditorialTitleStyle}>Find Credit Using our Visual Search Tool</div>
                        <div style={styles.imageContainer}>
                            <div style={{...styles.articleImage, backgroundImage: `url(${SearchPad})`}}/>
                        </div>
                    </div>
                    <div style={styles.listContainer}>
                        <EditorialList
                            data={feedData}
                            styleVariants={styleVariants}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Radium(Editorial);