import React from 'react';
import BreadCrumbs from '../Shared/Breadcrumbs';
import useContentHeight from '../../hooks/useContentHeight';
import { animated, useSpring, config } from 'react-spring';
import useCheckForIE from '../../hooks/useCheckForIE';

const FlowPage = ({children, showCrumbs, showFinalCrumbs = false}) => {
    const [ heightRef, height ] = useContentHeight();
    const [ isIE ] = useCheckForIE();

    const wrapper_styles = useSpring({
        config: config.default,
        from: { opacity: 0, height: 0 },
        to: { opacity: 1, height: height + 100 }
    });

    if(isIE) {
        return (
            <div className={`flow-content__${showFinalCrumbs ? 'container-final' : 'container'} flow-content__container`}>
                {showCrumbs && (<BreadCrumbs final={showFinalCrumbs} />)}
                <div className='flow-content question-container'>
                    {children}
                </div>
            </div>
        )
    };

    return (
        <div className={`flow-content__${showFinalCrumbs ? 'container-final' : 'container'} flow-content__container`}>
            <animated.div style={wrapper_styles} >
                {showCrumbs && (<BreadCrumbs final={showFinalCrumbs}/>)}
                <div className='flow-content question-container' ref={heightRef}>
                    {children}
                </div>
            </animated.div>
        </div>
    );
};

export default FlowPage;