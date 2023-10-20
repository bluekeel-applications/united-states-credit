import React, { useState, useRef, useContext, useEffect, useLayoutEffect } from 'react';
import { AppContext } from '../../context';
import { useLocation } from 'react-router-dom';
import styles from './FlowWrapper.css.js';
import Radium from 'radium';
import { useSpring, config, animated } from 'react-spring';
import { ResizeObserver as Polyfill } from '@juggle/resize-observer';
// Uses native or polyfill, depending on browser support.
const ResizeObserver = window.ResizeObserver || Polyfill;

const useHeight = ({ on = true /* no value means on */ } = {}) => {
    const ref = useRef();
    const [ height, set ] = useState(0);
    const heightRef = useRef(height);
    
    const observerCallback = (entries) => {
        window.requestAnimationFrame(() => {
            if (!Array.isArray(entries) || !entries.length) {
              return;
            };
            if(ref.current && heightRef.current !== ref.current.offsetHeight) {
                heightRef.current = ref.current.offsetHeight;
                set(ref.current.offsetHeight);
            };
        });
    };

    const [ro] = useState(() => new ResizeObserver(observerCallback));

    useLayoutEffect(() => {
        if(on && ref.current) {
            set(ref.current.offsetHeight);
            ro.observe(ref.current, {});
        };

        return () => ro.disconnect();

    }, [on, ro]);

    return [ref, height];
};

const FlowWrapper = ({ children }) => {
    let location = useLocation();
	const { appState } = useContext(AppContext);
    const [ isStart, setStart ] = useState(location.pathname === '/');
    const [ heightOn, setHeightOn ] = useState(false);
    const [ sizingRef, contentHeight ] = useHeight({ on: heightOn });
    const uiReady = useRef(false);

    useEffect(() => {
		if (location.pathname !== '/') {
			setStart(false);
		} else {
			setStart(true);
		};

        // eslint-disable-next-line
    }, [location.pathname]);

    const activateRef = ref => {
        sizingRef.current = ref;
        if (!heightOn) {
            setHeightOn(true);
        }
    };

    const heightStyles = useSpring({
        immediate: !uiReady.current,
        config: { ...config.stiff },
        from: { height: 0 },
        to: { height: contentHeight },
        onRest: () => (uiReady.current = true)
    });

    const questionStyle = Object.assign({},
        styles.questionBox,
        appState.vertical === 'lincx' && styles.fullPage
    );
    const wrapperStyle = Object.assign({},
        styles.wrapper,
        isStart ? styles.uscStart : styles.usc
    );

    return (
        <animated.div style={{ overflow: 'hidden', ...heightStyles }}>
            <div key='flow-wrapper' ref={activateRef} style={wrapperStyle}>
                <div key='flow-question-box' style={questionStyle}>
                    {children}
                </div>
            </div>
        </animated.div>
    );
};

export default Radium(FlowWrapper);