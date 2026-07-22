import React, { useEffect, useRef, useState } from 'react';
import styles from './Featured.css.js';
import Radium from 'radium';

const FeaturedList = ({ data, styleVariants, handleClick }) => {
    const [ componentList, setList ] = useState(null);
    const componentIsMounted = useRef(true);

    useEffect(() => {
        if (componentIsMounted.current) {
            let componentArray = [];
            data.forEach((article, idx) => {
                if (idx === 0 || idx > 5) return;
                let currentObj = {
                    title: article.title,
                    categories: article.categories,
                    link: article.link,
                    content: article.contentSnippet
                }
                componentArray.push(currentObj);
                return;
            });
            setList(componentArray);
        };

        return () => { componentIsMounted.current = false };
        // eslint-disable-next-line
    }, []);
    

    const fullTitleStyle = Object.assign({}, 
        styles['itemTitle'],
        styleVariants['itemTitle']
    );

    return (
        componentList ? (componentList.map((article, i) => (
            <div
                style={styles['listItem']}
                onClick={(e) => handleClick(article.link, e)}
                key={`featured-article-list-item-${i}`}
            >
                <div key={`featured-item-title-${i}`} style={fullTitleStyle}>
                    {article.title}
                </div>
                <div key={`featured-item-keywords-${i}`} style={styles.keywordContainer}>
                    {article.categories.map((category, j) => (
                        <div 
                            style={styles.keyword} 
                            key={`keywords-${i}-category-item-${j}`}
                        >
                            <a
                                key={`keywords-${i}-category-link-${j}`}
                                style={styles.category}
                                href={article.link}
                            >
                                <span>{category}</span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        ))) : null
    )
};

export default Radium(FeaturedList);