import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context';
import Routes from '../Routes';
import usePushProviders from '@bit/bluekeel.hookz.use-push-providers';
import LoadingRedirect from '@bit/bluekeel.component-library.loading-redirect';
import LoadingBubbles from '@bit/bluekeel.component-library.loading-bubbles';
import Drawer from './Layout/Drawer';
import Navbar from '../components/Shared/Navbar';
import UscFullLogo from '@bit/bluekeel.assets.usc_full_logo';
// import UscBlogLogo from '@bit/bluekeel.assets.usc_blog_logo';
import UscLogoGray from '@bit/bluekeel.assets.usc_logo_gray';
import Footer from '@bit/bluekeel.component-library.footer';
import Feed from './Layout/Feed';
import { useHistory, useLocation } from 'react-router-dom';
import { getCookie, isPch } from '@bit/bluekeel.controllers.helpers';
import UseSetNewSession from '@bit/bluekeel.controllers.use-set-new-session';
import Radium from 'radium';
import Styles from './Styles.css.js';
import { useMediaQuery } from 'react-responsive';

const App = () => {
	const isMobile = useMediaQuery({ maxWidth: 1000 });
	let history = useHistory();
	const location = useLocation();
	const [ myURL ] = useState(new URL(window.location.href));
	const [ showDrawer, toggleDrawer ] = useState(false);
	const [ showLoading, setLoading ] = useState(true);
    const [ showLoadingPch ] = useState(isPch());
	const [ animationComplete, setAnimationComplete ] = useState(!showLoadingPch);
	const { dispatchApp, dispatchTracking } = useContext(AppContext);
	
	usePushProviders();
	
	const handleMenuClick = () => {
		toggleDrawer(!showDrawer);
	};

	const goHome = () => {
        dispatchApp({ type: 'RESTART_SEARCH' });
        window.scrollTo(0, 0);
		history.push('/');
	};
	
	const tracking = {
        HSID: myURL.searchParams.get('hsid') || 0,
        PID: myURL.searchParams.get('pid') || getCookie('pid') || 1234,
        SID: myURL.searchParams.get('sid') || getCookie('sid') || 7572,
        OID: myURL.searchParams.get('oid') || getCookie('oid') || 50,
        UID: myURL.searchParams.get('uid') || getCookie('uid') || null,
        EID: myURL.searchParams.get('eid') || getCookie('eid') || 'organic',
        SUBID: myURL.searchParams.get('subid') || getCookie('subid') || null,
        SEGMENT: myURL.searchParams.get('segment') || getCookie('segment') || null,
        SE: myURL.searchParams.get('se') || getCookie('se') || null,
        KWD: myURL.searchParams.get('kwd') || getCookie('kwd') || null,
        PACID: myURL.searchParams.get('pacid') || getCookie('pacid') || null,
        PT1: myURL.searchParams.get('pt1') || 'N/A',
        PT2: myURL.searchParams.get('pt2') || 'N/A',
        GCLID: myURL.searchParams.get('gclid') || getCookie('gclid') || null,
        EMAIL: myURL.searchParams.get('email') || getCookie('email') || '',
        VERTICAL: myURL.searchParams.get('vertical') || 'N/A',
        TYPE: myURL.searchParams.get('type') || 'N/A',
		AUTH_GROUP: myURL.searchParams.get('group') || 'bk',
		ARTICLE: myURL.searchParams.get('article') || 'loan',
		SPLIT: myURL.searchParams.get('split') || '',
    };

	useEffect(() => {
		if(tracking.AUTH_GROUP !== 'bk') {
			dispatchTracking({ type: 'SET_GROUP', payload: tracking.AUTH_GROUP });
		};
		// eslint-disable-next-line
	}, [tracking]);

	const redirectTo = UseSetNewSession({ 
		tracking, dispatchTracking, dispatchApp, 
		setLoading, animationComplete 
    });

	useEffect(() => {
		const isSplit = tracking.SPLIT === 'dynamic';
		// If we want it to be dynamic, and is desktop - send to rsoc with params
		if(isSplit && !isMobile) {
			const rsocRedirect = `/rsoc${myURL.search}`;
			history.push(rsocRedirect);
			return;
		};
        if(!!redirectTo && !showLoading) {
            history.push(redirectTo);
        };
        // eslint-disable-next-line
	}, [redirectTo, showLoading]);

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
				brand={UscFullLogo}
				styleVariant={navbarVariants}
			>
				<Routes />
				{location.pathname !== '/rsoc' && <Feed />}
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