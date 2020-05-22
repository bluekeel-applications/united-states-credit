import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context';
import Routes from '../Routes';
import LoadingPCH from './Shared/LoadingPCH';
import Drawer from './Layout/Drawer';
import Navbar from './Layout/Navbar';
import Expansion from './Layout/Expansion';
import Feed from './Feed';
import { useHistory } from 'react-router-dom';
import useSetProvider from '../hooks/useSetProvider';
import useSetNewUser from '../hooks/useSetNewUser';
import useInsertNewUser from '../hooks/useInsertNewUser';

const App = () => {
	useSetProvider();
	const [redirect] = useSetNewUser();
	useInsertNewUser();
	let history = useHistory();
	const [showDrawer, toggleDrawer] = useState(false);
	const { appState } = useContext(AppContext);

	useEffect(() => {
		const { vertical, loan_type } = appState.flowState;
		if(vertical || loan_type) {
			history.push(redirect);
			return;
		};
		// eslint-disable-next-line
	}, [redirect]);

return (
	<div className='App app-bg_container'>
		{
			appState.provider === 'pch' && !appState.animationPlayed ? (
				<LoadingPCH redirect={redirect} />
			) : (
				<>
					<Navbar toggleDrawer={toggleDrawer}/> 
					<Expansion /> 
					<Routes />
					<Feed />
					<Drawer show={showDrawer} toggle={toggleDrawer}/>
				</>
			)
		}
	</div>
);
}

export default App;