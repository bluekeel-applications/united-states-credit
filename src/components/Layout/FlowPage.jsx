import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../context';
import BreadCrumbs from '../Shared/BreadCrumbs';
import { useHistory } from 'react-router-dom';

const FlowPage = ({children, showCrumbs, showFinalCrumbs = false}) => {
    let history = useHistory();
    const { appState } = useContext(AppContext);
    const componentIsMounted = useRef(true);
    
    useEffect(() => {
        if(componentIsMounted.current && !appState.provider) {
            history.push('/');
            return;
        };
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
    }, []);
    
    return (
        <div className={`${showFinalCrumbs ? 'flow-content__container-final' : ''} flow-content__container`}>
            {showCrumbs && (<BreadCrumbs final={showFinalCrumbs}/>)}
            {children}
        </div>
    );
};

export default FlowPage;