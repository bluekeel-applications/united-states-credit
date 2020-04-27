import React, { useContext } from 'react';
import { AppContext } from '../../context';
// import FadeIn from 'react-fade-in';
// import Breadcrumbs from '../Shared/Breadcrumbs';

const FlowPage = ({children, showCrumbs = false}) => {
    const { appState } = useContext(AppContext);

    return (
        <div className={`flow-content__container ${appState.showExpansion ? 'expanded-panel' : ''}`}>
            {children}
        </div>
    );
};

export default FlowPage;