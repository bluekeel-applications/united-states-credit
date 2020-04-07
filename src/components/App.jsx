import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context';
import Routes from '../Routes';
import Drawer from './Drawer';
import NavbarTop from './NavbarTop';
import Feed from './Feed';
import Footer from './Footer';
import { handleTypeChoice } from '../utils/deepDive';
import { getOrganicHSID } from '../utils/middleware';
import { getCookie } from '../utils/helpers';
import useGeoLocation from '../hooks/useGeoLocation';
import { useHistory } from 'react-router-dom';

const App = () => {
const { dispatchTracking, dispatchApp } = useContext(AppContext);
const componentIsMounted = useRef(true);
let history = useHistory();
// Find the user's location onload
useGeoLocation();

useEffect(() => {
	const setTracking = async () => {
		if (componentIsMounted.current) {
			// Parse URL here and setup payload object
			const myURL = new URL(window.location.href);
			let tracking = {
				HSID: myURL.searchParams.get('hsid') || getCookie('hsid'),
				PID: myURL.searchParams.get('pid') || getCookie('pid') || 1793,
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
				// DeepDive Checks
				VERTICAL: myURL.searchParams.get('vertical') || null,
				TYPE: myURL.searchParams.get('type') || null,
			};

			dispatchTracking({ type: 'USER_ARRIVED', payload: {
				pid: tracking.PID,
				sid: tracking.SID,
				oid: tracking.OID,
				uid: tracking.UID,
				eid: tracking.EID,
				hsid: tracking.HSID || await getOrganicHSID(tracking),
				se: tracking.SE,
				kwd: tracking.KWD,
				pacid: tracking.PACID,
				pt1: tracking.PT1,
				pt2: tracking.PT2,
				gclid: tracking.GCLID
			}});
			// Set the context for vertical and type 
			switch(tracking.VERTICAL) {
				case 'credit_cards':
					dispatchApp({ type: 'VERTICAL_PICKED', payload: { value:tracking.VERTICAL, crumb: 'Credit Cards'}});
					if(tracking.TYPE) { 
						handleTypeChoice(tracking.TYPE, history, tracking, dispatchApp) 
					} else { history.push(`/${tracking.VERTICAL}`)};
					return;

				case 'auto_loans':
					dispatchApp({ type: 'VERTICAL_PICKED', payload: { value:tracking.VERTICAL, crumb: 'Auto Loans'}});
					if(tracking.TYPE) { 
						handleTypeChoice(tracking.TYPE, history, tracking, dispatchApp) 
					} else { history.push(`/${tracking.VERTICAL}`)};
					return;

				case 'personal_loans':
					dispatchApp({ type: 'VERTICAL_PICKED', payload: { value:tracking.VERTICAL, crumb: 'Personal Loans'}});
					if(tracking.TYPE) { 
						handleTypeChoice(tracking.TYPE, history, tracking, dispatchApp) 
					} else { history.push(`/${tracking.VERTICAL}`)};
					return;

				case 'home_loans':
					dispatchApp({ type: 'VERTICAL_PICKED', payload: { value:tracking.VERTICAL, crumb: 'Home Loans'}})
					if(tracking.TYPE) { 
						handleTypeChoice(tracking.TYPE, history, tracking, dispatchApp) 
					} else { history.push(`/${tracking.VERTICAL}`)};
					return;

				default:
					return;
			}

		};
	}
	setTracking();
	// Clean-up Function
	return () => {componentIsMounted.current = false};
	// eslint-disable-next-line
}, []);

return (
	<div className='App app-bg_container' fluid style={{padding: '0px'}}>
		<NavbarTop />      
		<Routes />
		<Feed />
		<Footer />
		<Drawer />
	</div>
);
}

export default App;