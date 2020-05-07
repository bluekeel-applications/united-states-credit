import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from '../Shared/Loading';

const DirectLink = ({ jump }) => {
	let history = useHistory();
    const componentIsMounted = useRef(true);

    useEffect(() => {
        if(componentIsMounted.current) {
			if(jump !== 'N/A') {
				window.location.href = jump;
				return;
			} else { 
				history.push('/verticals');
				return
			};
        };
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
	  }, []);
	  
	  return <Loading />;
};

export default DirectLink;