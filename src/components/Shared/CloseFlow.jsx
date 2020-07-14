import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CloseFlow = () => {
    let history = useHistory();
	const { dispatchApp } = useContext(AppContext);
	
    const goHome = () => {
        dispatchApp({ type: 'RESTART_SEARCH' });
        window.scrollTo(0, 0);
        history.push('/');
	};
	
    return (
		<div className='exit-flow-container'>
			<FontAwesomeIcon
				icon={['fal', 'times']}
				fixedWidth
				onClick={goHome}
				className='exit-flow-icon'
			/>
		</div>
    )
};

export default CloseFlow;