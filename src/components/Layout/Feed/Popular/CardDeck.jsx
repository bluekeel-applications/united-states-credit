import React, { useEffect, useRef, useState } from 'react';
import styles from './Popular.css.js';
import Radium from 'radium';
import CardItem from './CardItem';

const CardDeck = ({ data, styleVariants }) => {
    const [ componentList, setList ] = useState(null);
    const componentIsMounted = useRef(true);

    useEffect(() => {
        if (componentIsMounted.current) {
            let componentArray = [];
            data.forEach((article, idx) => {
                if (idx >= 9) return;
                let currentObj = {
                    title: article.title,
                    categories: article.categories,
                    link: article.link,
                    content: article.contentSnippet,
                    html: article.content
                }
                componentArray.push(currentObj);
                return;
            });
            setList(componentArray);
        };

        return () => { componentIsMounted.current = false };
        // eslint-disable-next-line
    }, []);

    return (
        <div style={styles.contentContainer}>
            {componentList ? (componentList.map((article, i) => (
                <CardItem
                    key={`popular-article_${i}`} 
                    article={article}
                    styleVariants={styleVariants}
                />
            ))) : null}
        </div>
    )
};

export default Radium(CardDeck);