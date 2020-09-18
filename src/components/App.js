import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context';
import Routes from '../Routes';
import LoadingPCH from './Shared/LoadingPCH';
import Drawer from './Layout/Drawer';
import Navbar from '@bit/bluekeel.component-library.navbar';
import UscFullLogo from '@bit/bluekeel.assets.usc_full_logo';
import UscBlogLogo from '@bit/bluekeel.assets.usc_blog_logo';
import Footer from './Layout/Footer';
import Feed from '../components/Layout/Feed';
import { useHistory } from 'react-router-dom';
import useSetProvider from '../hooks/useSetProvider';
import useSetNewUser from '../hooks/useSetNewUser';
import useInsertNewUser from '../hooks/useInsertNewUser';
import usePchAPI from '../hooks/usePchAPI';
import { useMediaQuery } from 'react-responsive';
import Radium from 'radium';
import Styles from './Styles';

const App = () => {
	useSetProvider();
	const [redirect] = useSetNewUser();
	useInsertNewUser();
	usePchAPI();
	let history = useHistory();
	const [ showDrawer, toggleDrawer ] = useState(false);
	const { appState, dispatchApp } = useContext(AppContext);
	const [ scrollTop, setScrollTop ] = useState(0);
    const [ showLogoText, setShowLogoText ] = useState(true);
	const isMobile = useMediaQuery({ maxWidth: 767 });
	
    useEffect(() => {
        const onScroll = e => {
            setScrollTop(e.target.documentElement.scrollTop);
        };
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, [scrollTop]);

    useEffect(() => {
        if (isMobile && scrollTop > 200 && window.location.pathname === '/') {
			setShowLogoText(false);
            return;
        };

		return () => setShowLogoText(true);
		
	}, [scrollTop, isMobile]);

	useEffect(() => {
		if (scrollTop <= 100) {
			dispatchApp({ type: 'TOGGLE_START_IN_NAV', payload: false});
			return;
		};

		if (scrollTop > 200) {
			dispatchApp({ type: 'TOGGLE_START_IN_NAV', payload: true })
			return;
		};

		return () => dispatchApp({ type: 'TOGGLE_START_IN_NAV', payload: false });
		// eslint-disable-next-line
	}, [scrollTop]);
	
	useEffect(() => {
		if(redirect) {
			history.push(redirect);
			return;
		};
		// eslint-disable-next-line
	}, [redirect]);

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
							drawerClick={() => toggleDrawer(true)} 
							goHome={goHome}
							brand={showLogoText ? UscFullLogo : UscBlogLogo}
							styleVariant={navbarVariants}
						>
							<Routes key='usc-routes'/>
							<Feed key='usc-feed'/>
							<Footer key='usc-footer'/>
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