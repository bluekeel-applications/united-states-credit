import React, { useContext } from 'react';
import { AppContext } from '../../context';

const Expansion = () => {
    const { appState } = useContext(AppContext);

    return (
        <div className={`expansion-panel__container${appState.showExpansion ? '-expanded' : ''}`}>Meat</div>
    )
};

export default Expansion;