import React, { useContext, useState, useEffect, useCallback, lazy, Suspense, useRef } from 'react';
import { AppContext } from '../context';
import RouteContainer from '../RouteContainer';
// import usePushProviders from '../utils/hooks/usePushProviders';
import LoadingRedirect from '../components/Shared/LoadingRedirect';
import Loading from './Shared/Loading';
import DrawerMenu from './Layout/DrawerMenu';
import Navbar from '../components/Shared/Navbar';
import Footer from './Layout/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCookie, isPch } from '../utils/helpers';
import useSetNewSession from '../utils/hooks/useSetNewSession';
import Radium from 'radium';
import Styles from './Styles.css.js';
import { useMediaQuery } from 'react-responsive';
import firePixelBlueKeel from '../utils/pixels/bluekeelPixel.js';
import { datadogRum } from '@datadog/browser-rum';

const Feed = lazy(() => import('./Layout/Feed'));

const App = ({ uri }) => {
	const isMobile = useMediaQuery({ maxWidth: 1000 });
	let navigate = useNavigate();
	const location = useLocation();
	const hasFiredPerClick = useRef(false);
	const [ myURL ] = useState(new URL(window.location.href));
	// const [ showDrawer, toggleDrawer ] = useState(false);
	const [ showLoading, setLoading ] = useState(true);
    const [ showLoadingPch ] = useState(isPch());
	const [ animationComplete, setAnimationComplete ] = useState(!showLoadingPch);
	const { dispatchTracking, dispatchApp, appState } = useContext(AppContext);
	
	// usePushProviders();
	
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
		TTID: myURL.searchParams.get('ttid') || 'CO5VQT3C77U2IBEA8QH0',
		TTCLID: myURL.searchParams.get('ttclid') || '',
		FBID: myURL.searchParams.get('fbid') || null,
		FBCLICKID: myURL.searchParams.get('fbclickid') || null,
		DISPLAY: myURL.searchParams.get('display') || 'rsoc'
    };

	useEffect(() => {
		if(!appState.uri) {
			console.log('setting uri:', uri);
			dispatchApp({ type: 'SET_URI', payload: uri });
		};
		// eslint-disable-next-line
	},[]);

	useEffect(() => {
		datadogRum.init({
			applicationId: '99b0fdda-b808-4506-ad53-7aa417661bdc',
			clientToken: 'pubcbe8b67a7273f6bbf184345029e031aa',
			// `site` refers to the Datadog site parameter of your organization
			// see https://docs.datadoghq.com/getting_started/site/
			site: 'us5.datadoghq.com',
			service: 'united-states-credit',
			env: 'prod',
			// Specify a version number to identify the deployed version of your application in Datadog
			// version: '1.0.0',
			forwardErrorsToLogs: true,
			sessionSampleRate: 100,
			sessionReplaySampleRate: 20,
			trackUserInteractions: true,
			trackResources: true,
			trackLongTasks: true,
			defaultPrivacyLevel: 'mask-user-input',
		});
		console.log('DataDog init');
	},[]);

	useEffect(() => {
		if(tracking.AUTH_GROUP !== 'bk') {
			dispatchTracking({ type: 'SET_GROUP', payload: tracking.AUTH_GROUP });
		};
		// eslint-disable-next-line
	}, [tracking]);

	const turnOffLoading = useCallback(() => {setLoading(false)},[]);
	const redirectTo = useSetNewSession({ tracking, turnOffLoading, animationComplete });
	
	useEffect(() => {
		// Fire a pixel for load event of these SIDs
		if(!hasFiredPerClick.current) {
			const sidList = [ 5102, 9113, 9371, 9419, 9474, 9560, 9568, 9879 ];
			const inboundSid = Number(tracking.SID);
			if(sidList.includes(inboundSid)) {
				console.log('BK pixel fire - per Click');
				firePixelBlueKeel(tracking.HSID);
			};
			hasFiredPerClick.current = true;
		};
        // eslint-disable-next-line
	}, [hasFiredPerClick.current]);

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
			<Navbar />
			<RouteContainer />
			{location.pathname !== '/rsoc' && location.pathname !== '/duplicate_check' && <Suspense fallback={<Loading/>}><Feed /></Suspense>}
			{location.pathname !== '/duplicate_check' && <Footer />}
			<DrawerMenu />
		</div>
	);
};

export default Radium(App);