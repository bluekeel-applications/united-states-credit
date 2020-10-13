import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context';
import { useLocation } from 'react-router-dom';

import Radium from 'radium';
import FlowWrapper from '@bit/bluekeel.component-library.flow-wrapper';

const RouteWrapper = ({ children }) => {
	let location = useLocation();
	const { appState } = useContext(AppContext);
    const [ isStart, setStart ] = useState(location.pathname === '/');

	useEffect(() => {
		if (location.pathname !== '/') {
			setStart(false);
		} else {
			setStart(true);
		};

        // eslint-disable-next-line
    }, [location.pathname]);

	return (
		<FlowWrapper 
            theme={isStart ? 'uscStart' : 'usc'}
            appState={appState}
            location={location}
        >
			{children}
		</FlowWrapper>
	);
};

export default Radium(RouteWrapper);