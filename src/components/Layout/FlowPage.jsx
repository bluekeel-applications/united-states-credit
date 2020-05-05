import React from 'react';
// import { AppContext } from '../../context';
import BreadCrumbs from '../Shared/BreadCrumbs';

const FlowPage = ({children, showCrumbs = false, showFinalCrumbs = false}) => {
    // const { appState } = useContext(AppContext);
    // const [mobile] = useState(window.innerWidth < 500);

    return (
        <div className='flow-content__container'>
            {showCrumbs && (<BreadCrumbs final={showFinalCrumbs}/>)}
            {children}
        </div>
    );
};

export default FlowPage;