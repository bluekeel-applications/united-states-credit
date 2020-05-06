import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const DirectLink = ({ link, jump }) => {
	let history = useHistory();
    const componentIsMounted = useRef(true);

    useEffect(() => {
        if(componentIsMounted.current && link) {
			if(link !== 'N/A') {
				window.open(link);
			};
			if(jump && jump !== 'N/A') {
				window.location.href = jump;
			} else { 
				history.goBack();
				history.goBack();
			};
        };
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
	  }, []);
	  
	  return <div>Direct to offer...</div>;
};

export default DirectLink;