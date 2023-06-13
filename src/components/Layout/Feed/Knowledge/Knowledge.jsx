import React from 'react';
import styles from './Knowledge.css.js';
import TypeColumn from './TypeColumn';
import ColumnItem from './ColumnItem';
import Radium from 'radium';

const Knowledge = ({ data, styleVariants }) => {
    const { credit_feed, reviews_feed, tips_feed } = data;

    const fullRowTitleStyle = Object.assign({}, 
        styles['contentTitleSpan'],
        styleVariants['contentTitleSpan']
    );

    return (
        <div key='info-blogfeed-component' style={styles.component}>
            <div style={styles.componentContent}>
                <div style={styles.contentTitle}>
                    <span style={fullRowTitleStyle}>Knowledge Base</span>
                </div>
                <div style={styles.contentContainer}>
                    <TypeColumn title='Reviews' styleOverride={styleVariants}>
                        <ColumnItem
                            itemIdx={0}
                            styleOverride={styleVariants}
                            item_data={reviews_feed[2]} 
                        />
                        <ColumnItem
                            itemIdx={1}
                            styleOverride={styleVariants}
                            item_data={reviews_feed[3]} 
                        />
                    </TypeColumn>
                    <TypeColumn title='Find Credit' styleOverride={styleVariants}>
                        <ColumnItem
                            itemIdx={2}
                            styleOverride={styleVariants}
                            item_data={credit_feed[2]} 
                        />
                        <ColumnItem
                            itemIdx={3}
                            styleOverride={styleVariants}
                            item_data={credit_feed[3]} 
                        />
                    </TypeColumn>
                    <TypeColumn title='Credit Tips' styleOverride={styleVariants}>
                        <ColumnItem
                            itemIdx={4}
                            styleOverride={styleVariants}
                            item_data={tips_feed[2]} 
                        />
                        <ColumnItem
                            itemIdx={5}
                            styleOverride={styleVariants}
                            item_data={tips_feed[3]} 
                        />
                    </TypeColumn>
                </div>
            </div>
        </div>
    );
}

export default Radium(Knowledge);