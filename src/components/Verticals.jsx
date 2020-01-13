import React, { useContext } from 'react';
import { AppContext } from '../context';
import { useHistory } from 'react-router-dom';
import FlowPage from './FlowPage';

const Verticals = () => {
    const { dispatchApp } = useContext(AppContext);
    let history = useHistory();

    const handleVerticalClick = (e, choice) => {
        e.preventDefault();
        dispatchApp({ type: 'VERTICAL_PICKED', payload: choice });
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