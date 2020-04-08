import React from 'react';
import { useHistory } from 'react-router-dom';
import FlowPage from '../FlowPage';

const Verticals = () => {
    let history = useHistory();

    const handleVerticalClick = (e, choice) => {
        e.preventDefault();
        history.push('/' + choice)
    };

    return (
        <FlowPage 
            page={'verticals'}
            handleClick={handleVerticalClick}
        />
    )
};

export default Verticals;