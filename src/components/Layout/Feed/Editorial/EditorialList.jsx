import React, { useEffect, useRef, useState } from 'react';
import EditorialItem from './EditorialItem';
import Radium from 'radium';

const EditorialList = ({ data, styleVariants }) => {
    const [ componentList, setList ] = useState(null);
    const componentIsMounted = useRef(true);

    useEffect(() => {
        if (componentIsMounted.current) {
            let componentArray = [];
            data.forEach((article, idx) => {
                if (idx <= 5 || idx >= 10) return;
                let currentObj = {
                    title: article.title,
                    categories: article.categories,
                    link: article.link,
                    content: article.contentSnippet
                };
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
            <EditorialItem
                key={`editorial-article_${i}`} 
                article={article}
                styleVariants={styleVariants}
            />
        ))) : null
    )
};

export default Radium(EditorialList);