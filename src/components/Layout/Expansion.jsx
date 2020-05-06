import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Expansion = () => {
    const { appState, dispatchApp } = useContext(AppContext);

    const closePanel = () => dispatchApp({ type: 'HIDE_EXPANSION' });

    return (
        <div className={`expansion-panel__container${appState.showExpansion ? '-expanded' : ''}`} onClick={closePanel}>
            <div className='expansion-close'>
                <FontAwesomeIcon
                    icon={['fal', 'times']}
                    fixedWidth
                    className='exit-flow-icon'
                />
            </div>
            <div className='expansion-header'>Welcome, Friends Of PCH!</div>
            <div className='expansion-text'>Your entry has been confirmed!</div>
        </div>
    )
};

export default Expansion;