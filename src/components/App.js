import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context';
import Routes from '../Routes';
import LoadingPCH from './Shared/LoadingPCH';
import Drawer from './Layout/Drawer';
import Navbar from './Layout/Navbar';
import Footer from './Layout/Footer';
import Expansion from './Layout/Expansion';
import BlogFeed from '@bit/bluekeel.feed.blog-feed';
import { useHistory } from 'react-router-dom';
import useSetProvider from '../hooks/useSetProvider';
import useSetNewUser from '../hooks/useSetNewUser';
import useInsertNewUser from '../hooks/useInsertNewUser';
import usePchAPI from '../hooks/usePchAPI';

const App = () => {
	useSetProvider();
	const [redirect] = useSetNewUser();
	useInsertNewUser();
	usePchAPI();
	let history = useHistory();
	const [showDrawer, toggleDrawer] = useState(false);
	const { appState } = useContext(AppContext);

	useEffect(() => {
		if(redirect) {
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
					<BlogFeed host='united_states_credit' />
					<Footer />
					<Drawer show={showDrawer} toggle={toggleDrawer}/>
				</>
			)
		}
	</div>
);
}

export default App;