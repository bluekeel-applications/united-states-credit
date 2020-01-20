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
        <div className='flow-container'>
            <FlowPage 
                page={'verticals'}
                handleClick={handleVerticalClick}
            />
        </div>
    )
};

export default Verticals;