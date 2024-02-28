import React, { useContext, useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { AppContext } from '../context';
import RouteContainer from '../RouteContainer';
import usePushProviders from '../utils/hooks/usePushProviders';
import LoadingRedirect from '../components/Shared/LoadingRedirect';
import Loading from './Shared/Loading';
import DrawerMenu from './Layout/DrawerMenu';
import Navbar from '../components/Shared/Navbar';
import Footer from './Layout/Footer';
// import Feed from './Layout/Feed';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCookie, isPch } from '../utils/helpers';
// import UseSetNewSession from '@bit/bluekeel.controllers.use-set-new-session';
import useSetNewSession from '../utils/hooks/useSetNewSession';
import Radium from 'radium';
import Styles from './Styles.css.js';
import { useMediaQuery } from 'react-responsive';
import { useLazyQuery } from '@apollo/client';
import FETCH_ARTICLE_BY_KEY from '../components/Pages/System1/utils/GraphQL/FETCH_ARTICLE_BY_KEY.js';

const Feed = lazy(() => import('./Layout/Feed'));

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

	const buildURLTail = (buttonArr) => {
		const keys = ['forceKeyA=', '&forceKeyB=', '&forceKeyC=', '&forceKeyD=', '&forceKeyE=', '&forceKeyF=', '&forceKeyG=']
		const encodeArr = buttonArr.map((button) => {
		return button.trim().replace(/ /g,"+").replace("$","%24");
		});
		const keyArr = encodeArr.map((item, idx) => {
		return `${keys[idx]}${item}`;
		});
		const forceKeys = keyArr.join("");
		const UTM = myURL.searchParams.get('utm_source') || '';
        const S1PAID = myURL.searchParams.get('s1paid') || '';
		const S1PCID = myURL.searchParams.get('s1pcid') || '';
        const S1PAGID = myURL.searchParams.get('s1pagid') || '';
        const S1PP = myURL.searchParams.get('s1pplacement') || '';
        const S1PADID = myURL.searchParams.get('s1padid') || '';
		
		const searchTrack = `search_track_url=https://f8fjn5bgw2.execute-api.us-east-1.amazonaws.com/prod/optin/${tracking.HSID}`;
		const clickTrack = `click_track_url=http://www.bkoffers.com/hitstreet/pixel_fire.cfm?hsid=${tracking.HSID}`;
		const subId = `subid=${tracking.SID}-${tracking.EID}`;
		const taboola = `tbid=1648456&tbclickid=${tracking.UID}&tbland=PageView&tbserp=add_to_wishlist&tbclick=Purchase`;
		const facebook = `fbid=202255056230822&fbclick=Search`;
		const google = `gamid=AW-11025885187&gclcid=AW-11025885187/kAMpCK_99IIYEIPQxokp`;
		const segment = `segment=${tracking.SEGMENT}`;
		return `${forceKeys}&utm_source=${UTM}&s1paid=${S1PAID}&s1pcid=${S1PCID}&s1pagid=${S1PAGID}&s1pplacement=${S1PP}&s1padid=${S1PADID}&${searchTrack}&${clickTrack}&${segment}&${subId}&${taboola}&${facebook}&${google}`;
	};

	const getArticleSlug = () => {
		switch(tracking.ARTICLE) {
			case 'loan':
				return 'general/personal-loans-your-key-to-financial-freedom/';
			case 'credit':
				return 'personal-finance/maximize-your-money-the-power-of-credit-cards/';
			case 'autoloan':
				return 'auto-buying-and-selling/affordable-auto-financing-your-dream-car-awaits/';
			case 'checking':
				return 'consumer-banking/maximize-your-money-the-power-of-a-zero-fee-checking-account/';
			case 'dental':
				return 'dental-health/affordable-dental-implants-radiant-smiles-fraction-of-the-cost/';
			case 'covid':
				return 'medical-health/no-cost-covid-tests-a-reality/';
			case 'checkingbonus':
				return 'personal-finance/cash-bonus-awaits-open-a-checking-account-now/';
			case 'seniorcci':
				return 'senior-health/affordable-luxury-the-new-age-of-senior-living/';
			case 'weight':
				return 'pharmaceutical-drugs/semaglutide-injections-your-weight-loss-ally/';
			case 'facelift':
				return 'cosmetic-medical-services/rediscover-youthful-radiance-affordable-facelift-treatments/';
			case 'prostate':
				return 'surgery/revolutionizing-prostate-cancer-treatment-affordable-effective-personalized/';
			case 'lasik':
				return 'medical-health/lasik-eye-surgery-your-ticket-to-crystal-clear-vision/';
			case 'sclerosis':
				return 'diseases-and-conditions/decoding-multiple-sclerosis-early-detection-treatment-and-support/';
			case 'copd':
				return 'diseases-and-conditions/breathe-freely-unveiling-advanced-copd-treatments/';

			default:
				return 'general/personal-loans-your-key-to-financial-freedom/';
		};
	};

	const handleRedirect = (data) => {
        // Set force keys and build full url
		const tail = buildURLTail(data.fetchArticleByKey.body.buttons);
		const articleSlug = getArticleSlug();
		const base = 'https://clickcraftedinsight.com/';
		window.location.href = `${base}${articleSlug}?${tail}`;
    };

    const [sendToBrainWave] = useLazyQuery(
        FETCH_ARTICLE_BY_KEY, { 
            variables: { key: tracking.ARTICLE },
            errorPolicy: 'ignore',
            onCompleted: handleRedirect
        }
    );

	useEffect(() => {
		if(tracking.AUTH_GROUP !== 'bk') {
			dispatchTracking({ type: 'SET_GROUP', payload: tracking.AUTH_GROUP });
		};
		// eslint-disable-next-line
	}, [tracking]);

	const turnOffLoading = useCallback(() => {setLoading(false)},[]);
	const redirectTo = useSetNewSession({ tracking, turnOffLoading, animationComplete });

	useEffect(() => {
		if(tracking.OID === '115') {
			setLoading(true);
			sendToBrainWave();
			return;
		};
        // eslint-disable-next-line
	}, [tracking]);

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
			{location.pathname !== '/rsoc' && <Suspense fallback={<Loading/>}><Feed /></Suspense>}
			<Footer />
			<DrawerMenu />
		</div>
	);
};

export default Radium(App);