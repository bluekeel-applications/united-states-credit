import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context';
import Routes from '../Routes';
import LoadingPCH from './Shared/LoadingPCH';
import Drawer from './Layout/Drawer';
import Navbar from '@bit/bluekeel.component-library.navbar';
import UscFullLogo from '@bit/bluekeel.assets.usc_full_logo';
import UscBlogLogo from '@bit/bluekeel.assets.usc_blog_logo';
import UscLogoGray from '@bit/bluekeel.assets.usc_logo_gray';
import Footer from '@bit/bluekeel.component-library.footer';
import Feed from '../components/Layout/Feed';
import { useHistory } from 'react-router-dom';
import useSetProvider from '../hooks/useSetProvider';
import useSetNewUser from '../hooks/useSetNewUser';
import useInsertNewUser from '../hooks/useInsertNewUser';
import usePchAPI from '../hooks/usePchAPI';
import Radium from 'radium';
import Styles from './Styles';

const App = () => {
	useSetProvider();
	useInsertNewUser();
	usePchAPI();
	const [redirect] = useSetNewUser();
	let history = useHistory();
	const [ showDrawer, toggleDrawer ] = useState(false);
	const { appState, dispatchApp } = useContext(AppContext);
	
	useEffect(() => {
		if(redirect) {
			history.push(redirect);
			return;
		};
		// eslint-disable-next-line
	}, [redirect]);

	const handleMenuClick = () => {
		toggleDrawer(!showDrawer);
	};

	const goHome = () => {
        dispatchApp({ type: 'RESTART_SEARCH' });
        window.scrollTo(0, 0);
		history.push('/');
    };

	return (
		<div key='app-key' style={Styles.app}>
			{
				appState.provider === 'pch' && !appState.animationPlayed ? (
					<LoadingPCH redirect={redirect} />
				) : (
					<>
						<Navbar
							key='usc-navbar'
							drawerClick={handleMenuClick} 
							goHome={goHome}
							brand={appState['showFullLogo'] ? UscFullLogo : UscBlogLogo}
							styleVariant={navbarVariants}
						>
							<Routes key='usc-routes'/>
							<Feed key='usc-feed'/>
							<Footer key='usc-footer' domain='UnitedStatesCredit' logo={UscLogoGray}/>
							<Drawer key='usc-drawer' show={showDrawer} toggle={toggleDrawer}/>
						</Navbar>
					</>
				)
			}
		</div>
	);
};

const navbarVariants = {
	navbar: {},
	toolbar: {},
	navContent: {}, 
	brand: {}, 
	menuIcon: {}
};

export default Radium(App);