import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../context';
import Routes from '../Routes';
import LoadingRedirect from '@bit/bluekeel.component-library.loading-redirect';
import Drawer from './Layout/Drawer';
import Navbar from '@bit/bluekeel.component-library.navbar';
import UscFullLogo from '@bit/bluekeel.assets.usc_full_logo';
import UscBlogLogo from '@bit/bluekeel.assets.usc_blog_logo';
import UscLogoGray from '@bit/bluekeel.assets.usc_logo_gray';
import Footer from '@bit/bluekeel.component-library.footer';
import Feed from '../components/Layout/Feed';
import { useHistory } from 'react-router-dom';
import * as Helpers from '@bit/bluekeel.utilities.helpers';
import UseSetNewSession from '@bit/bluekeel.hookz.use-set-new-session';
import Radium from 'radium';
import Styles from './Styles.css.js';

const App = () => {
	let history = useHistory();
	const componentIsMounted = useRef(true);
	const myURL = new URL(window.location.href);
	const [ showDrawer, toggleDrawer ] = useState(false);
	const [ showLoading, setLoading ] = useState(false);
	const [ animationComplete, setAnimationComplete ] = useState(false);
	const { appState, dispatchApp, dispatchTracking } = useContext(AppContext);
	
	UseSetNewSession({
        HSID: myURL.searchParams.get('hsid') || 0,
        PID: myURL.searchParams.get('pid') || Helpers.getCookie('pid') || 1234,
        SID: myURL.searchParams.get('sid') || Helpers.getCookie('sid') || 7572,
        OID: myURL.searchParams.get('oid') || Helpers.getCookie('oid') || 50,
        UID: myURL.searchParams.get('uid') || Helpers.getCookie('uid') || null,
        EID: myURL.searchParams.get('eid') || Helpers.getCookie('eid') || 'organic',
        SE: myURL.searchParams.get('se') || Helpers.getCookie('se') || null,
        KWD: myURL.searchParams.get('kwd') || Helpers.getCookie('kwd') || null,
        PACID: myURL.searchParams.get('pacid') || Helpers.getCookie('pacid') || null,
        PT1: myURL.searchParams.get('pt1') || Helpers.getCookie('pt1') || null,
        PT2: myURL.searchParams.get('pt2') || Helpers.getCookie('pt2') || null,
        GCLID: myURL.searchParams.get('gclid') || Helpers.getCookie('gclid') || null,
        EMAIL: myURL.searchParams.get('email') || Helpers.getCookie('email') || null,
        FNAME: myURL.searchParams.get('fname') || Helpers.getCookie('fname') || null,
        LNAME: myURL.searchParams.get('lname') || Helpers.getCookie('lname') || null,
        ADDRESS: myURL.searchParams.get('address') || Helpers.getCookie('address') || null,
        CITY: myURL.searchParams.get('city') || Helpers.getCookie('city') || null,
        STATE: myURL.searchParams.get('state') || Helpers.getCookie('state') || null,
        ZIP: myURL.searchParams.get('zip') || Helpers.getCookie('zip') || null,
        VERTICAL: myURL.searchParams.get('vertical') || 'N/A',
        TYPE: myURL.searchParams.get('type') || 'N/A'
    }, dispatchTracking, dispatchApp, history, showLoading, animationComplete);

    useEffect(() => {
        if(componentIsMounted.current) {
            const locationParts = window.location.hostname.split('.');
            const subDomain = locationParts.shift();
            if (subDomain === 'pch') {
                setLoading(true);
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

	const handleAnimationCompleted = () => {
		setAnimationComplete(true);
		console.log('Animation complete.');
	};

	if(showLoading && !animationComplete) {
		return <LoadingRedirect setComplete={handleAnimationCompleted}/>
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
				<Routes key='usc-routes'/>
				<Feed key='usc-feed'/>
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