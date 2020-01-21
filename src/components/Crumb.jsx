import React from 'react';
import { useHistory } from 'react-router-dom';

const Crumb = ({ text, path }) => {
    let history = useHistory();

    const handleCrumbClick = (e) => {
        e.preventDefault();
        history.push('/' + path);
    };

    return (
        <div className='crumb-container' onClick={(e) => handleCrumbClick(e)}>
            {text}
        </div>
    )
};

export default Crumb;