import React, { useEffect, useRef, useState } from 'react';
import Radium from 'radium';
import LatestArticle from './LatestArticle';

const LatestList = ({ data, styleVariants }) => {
    const [ componentList, setList ] = useState(null);
    const componentIsMounted = useRef(true);

    useEffect(() => {
        if (componentIsMounted.current) {
            let componentArray = [];
            data.forEach((article, idx) => {
                if (idx >= 4) return;
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
        componentList ? (componentList.map((article, i) => (
            <LatestArticle
                key={`latest-article_${i}`} 
                article={article}
                styleVariants={styleVariants}
            />
        ))) : null
    )
};

export default Radium(LatestList);