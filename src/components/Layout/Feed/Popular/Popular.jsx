import React from 'react';
import styles from './Popular.css.js';
import Radium from 'radium';
import CardDeck from './CardDeck';

const Popular = ({ feedData, styleVariants }) => {

    const fullRowTitleStyle = Object.assign({}, 
        styles['contentTitleSpan'],
        styleVariants['contentTitleSpan']
    );

    return (
        <div key='popular-blogfeed-component' style={styles.component}>
            <div style={styles.componentContent}>
                <div style={styles.contentTitle}>
                    <span style={fullRowTitleStyle}>Popular</span>
                </div>
                <CardDeck 
                    data={feedData}
                    styleVariants={styleVariants}
                />
            </div>
        </div>
    )
};

export default Radium(Popular);