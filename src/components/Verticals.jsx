import React, { useContext } from 'react';
import { AppContext } from '../context';

import FlowPage from './FlowPage';

const Verticals = () => {
    const { dispatchApp } = useContext(AppContext);
    const handleFlowClick = (choice) => {
        dispatchApp({ type: 'VERTICAL_PICKED', payload: choice });
    };

    return (
        <div className='vertical-container'>
            <FlowPage 
                page={'verticals'}
                handleClick={handleFlowClick}
            />
        </div>
    )
};

export default Verticals;