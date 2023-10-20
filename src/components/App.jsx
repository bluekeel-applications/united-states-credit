import React, { useContext, useState, useEffect, useCallback } from 'react';
import { AppContext } from '../context';
import RouteContainer from '../RouteContainer';
import usePushProviders from '../utils/hooks/usePushProviders';
import LoadingRedirect from '../components/Shared/LoadingRedirect';
import Loading from './Shared/Loading';
import DrawerMenu from './Layout/DrawerMenu';
import Navbar from '../components/Shared/Navbar';
import UscFullLogo from '@bit/bluekeel.assets.usc_full_logo';
// import UscBlogLogo from '@bit/bluekeel.assets.usc_blog_logo';
import UscLogoGray from '@bit/bluekeel.assets.usc_logo_gray';
import Footer from './Layout/Footer';
import Feed from './Layout/Feed';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCookie, isPch } from '../utils/helpers';
// import UseSetNewSession from '@bit/bluekeel.controllers.use-set-new-session';
import useSetNewSession from '../utils/hooks/useSetNewSession';
import Radium from 'radium';
import Styles from './Styles.css.js';
import { useMediaQuery } from 'react-responsive';

const App = () => {
	const isMobile = useMediaQuery({ maxWidth: 1000 });
	let navigate = useNavigate();
	const location = useLocation();
	const [ myURL ] = useState(new URL(window.location.href));
	// const [ showDrawer, toggleDrawer ] = useState(false);
	const [ showLoading, setLoading ] = useState(true);
    const [ showLoadingPch ] = useState(isPch());
	const [ animationComplete, setAnimationComplete ] = useState(!showLoadingPch);
	const { dispatchTracking } = useContext(AppContext);
	
	usePushProviders();
	
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
		RECORD: myURL.searchParams.get('record') || '',
    };

	useEffect(() => {
		if(tracking.AUTH_GROUP !== 'bk') {
			dispatchTracking({ type: 'SET_GROUP', payload: tracking.AUTH_GROUP });
		};
		// eslint-disable-next-line
	}, [tracking]);

	const turnOffLoading = useCallback(() => {setLoading(false)},[]);
	const redirectTo = useSetNewSession({ tracking, turnOffLoading, animationComplete });

	useEffect(() => {
		const isSplit = tracking.SPLIT === 'dynamic';
		// If we want it to be dynamic, and is desktop - send to rsoc with params
		if(isSplit && !isMobile) {
			const rsocRedirect = `/rsoc${myURL.search}`;
			navigate(rsocRedirect);
			return;
		};
        if(!!redirectTo && !showLoading) {
            navigate(redirectTo);
        };
        // eslint-disable-next-line
	}, [redirectTo, showLoading]);

	const handleFinishedAnimation = useCallback(() => {setAnimationComplete(true)}, []);

	if(showLoadingPch && !animationComplete) {
		return <LoadingRedirect setComplete={handleFinishedAnimation}/>;
	};
	
	if(showLoading) {
		return (
			<div style={Styles.loadingContainer}>
				<Loading />
			</div>
		)
	};

	return (
		<div key='app-key' style={Styles.app}>
			<Navbar key='usc-navbar' brand={UscFullLogo}>
				<RouteContainer />
				{location.pathname !== '/rsoc' && <Feed />}
				<Footer key='usc-footer' domain='UnitedStatesCredit' logo={UscLogoGray}/>
			</Navbar>
			<DrawerMenu />
		</div>
	);
};

export default Radium(App);