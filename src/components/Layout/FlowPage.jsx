import React, { useContext } from 'react';
import { AppContext } from '../../context';
import BreadCrumbs from '../Shared/BreadCrumbs';
// import MobileCrumbs from '../Shared/MobileCrumbs';

const FlowPage = ({children, showCrumbs = false, showFinalCrumbs = false}) => {
    const { appState } = useContext(AppContext);
    // const [mobile] = useState(window.innerWidth < 500);

    return (
        <div className={`flow-content__container ${appState.showExpansion ? 'expanded-panel' : ''}`}>
            {/* {showCrumbs && mobile && (<MobileCrumbs final={showFinalCrumbs}/>)} */}
            {showCrumbs && (<BreadCrumbs final={showFinalCrumbs}/>)}
            {children}
        </div>
    );
};

export default FlowPage;