import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../context';
import Routes from '../Routes';
import LoadingRedirect from '@bit/bluekeel.component-library.loading-redirect';
import LoadingBubbles from '@bit/bluekeel.component-library.loading-bubbles';
import Drawer from './Layout/Drawer';
import Navbar from '@bit/bluekeel.component-library.navbar';
import UscFullLogo from '@bit/bluekeel.assets.usc_full_logo';
import UscBlogLogo from '@bit/bluekeel.assets.usc_blog_logo';
import UscLogoGray from '@bit/bluekeel.assets.usc_logo_gray';
import Footer from '@bit/bluekeel.component-library.footer';
import Feed from './Layout/Feed';
import { useHistory } from 'react-router-dom';
import { getCookie } from '@bit/bluekeel.controllers.helpers';
import UseSetNewSession from '@bit/bluekeel.controllers.use-set-new-session';
import Radium from 'radium';
import Styles from './Styles.css.js';

const App = () => {
	let history = useHistory();
	const componentIsMounted = useRef(true);
	const myURL = new URL(window.location.href);
	const [ showDrawer, toggleDrawer ] = useState(false);
	const [ showLoading, setLoading ] = useState(!!myURL.searchParams.get('vertical'));
	const [ showLoadingPch, setLoadingPch ] = useState(false);
	const [ animationComplete, setAnimationComplete ] = useState(false);
	const { appState, dispatchApp, dispatchTracking } = useContext(AppContext);
	
	const tracking = {
        HSID: myURL.searchParams.get('hsid') || 0,
        PID: myURL.searchParams.get('pid') || getCookie('pid') || 1234,
        SID: myURL.searchParams.get('sid') || getCookie('sid') || 7572,
        OID: myURL.searchParams.get('oid') || getCookie('oid') || 50,
        UID: myURL.searchParams.get('uid') || getCookie('uid') || null,
        EID: myURL.searchParams.get('eid') || getCookie('eid') || 'organic',
        SE: myURL.searchParams.get('se') || getCookie('se') || null,
        KWD: myURL.searchParams.get('kwd') || getCookie('kwd') || null,
        PACID: myURL.searchParams.get('pacid') || getCookie('pacid') || null,
        PT1: myURL.searchParams.get('pt1') || getCookie('pt1') || null,
        PT2: myURL.searchParams.get('pt2') || getCookie('pt2') || null,
        GCLID: myURL.searchParams.get('gclid') || getCookie('gclid') || null,
        EMAIL: myURL.searchParams.get('email') || getCookie('email') || null,
        FNAME: myURL.searchParams.get('fname') || getCookie('fname') || null,
        LNAME: myURL.searchParams.get('lname') || getCookie('lname') || null,
        ADDRESS: myURL.searchParams.get('address') || getCookie('address') || null,
        CITY: myURL.searchParams.get('city') || getCookie('city') || null,
        STATE: myURL.searchParams.get('state') || getCookie('state') || null,
        ZIP: myURL.searchParams.get('zip') || getCookie('zip') || null,
        VERTICAL: myURL.searchParams.get('vertical') || 'N/A',
        TYPE: myURL.searchParams.get('type') || 'N/A'
    };

	UseSetNewSession({ 
		tracking, dispatchTracking, dispatchApp, 
		history, setLoading, showLoadingPch, animationComplete 
	});

    useEffect(() => {
        if(componentIsMounted.current) {
            const locationParts = window.location.hostname.split('.');
            const subDomain = locationParts.shift();
            if (subDomain === 'pch') {
                setLoadingPch(true);
			};
		};
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
	}, []);
	
	const handleMenuClick = () => {
		toggleDrawer(!showDrawer);
	};

	const goHome = () => {
        dispatchApp({ type: 'RESTART_SEARCH' });
        window.scrollTo(0, 0);
		history.push('/');
    };

	if(showLoadingPch && !animationComplete) {
		return <LoadingRedirect setComplete={() => setAnimationComplete(true)}/>
	};
	
	if(showLoading) {
		return (
			<div style={Styles.loadingContainer}>
				<LoadingBubbles />
			</div>
		)
	};

	return (
		<div key='app-key' style={Styles.app}>
			<Navbar
				key='usc-navbar'
				drawerClick={handleMenuClick} 
				goHome={goHome}
				brand={appState['showFullLogo'] ? UscFullLogo : UscBlogLogo}
				styleVariant={navbarVariants}
			>
				<Routes />
				<Feed />
				<Footer key='usc-footer' domain='UnitedStatesCredit' logo={UscLogoGray}/>
				<Drawer key='usc-drawer' show={showDrawer} toggle={toggleDrawer}/>
			</Navbar>
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