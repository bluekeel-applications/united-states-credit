import React from 'react';
import LatestList from './LatestList';
import styles from './Latest.css.js';
import Radium from 'radium';

const Latest = ({ feedData, styleVariants }) => {

    const fullRowTitleStyle = Object.assign({}, 
        styles['contentTitleSpan'],
        styleVariants['contentTitleSpan']
    );

    return (
        <div key='latest-blogfeed-component' style={styles.component}>
            <div style={styles.componentContent}>
                <div style={styles.contentTitle}>
                    <span style={fullRowTitleStyle}>The Latest</span>
                </div>
                <div style={styles.contentContainer}>
                    <LatestList 
                        key='latest-articles'
                        data={feedData} 
                        styleVariants={styleVariants}
                    />
                </div>
            </div>
        </div>
    )
};

export default Radium(Latest);