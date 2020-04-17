import React, { useContext } from 'react';
import { AppContext } from '../../context';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';

const Expansion = () => {
    const { appState, dispatchApp } = useContext(AppContext);

    return (
        <ExpansionPanel 
			expanded={appState.showExpansion}
			onChange={() => dispatchApp({ type: `${appState.showExpansion ? 'HIDE_EXPANSION' : 'SHOW_EXPANSION'}`})}
			className='expansion-panel__container'
		>
            <div className='expansion-panel-details'>Meat</div>
        </ExpansionPanel>
    )
};

export default Expansion;