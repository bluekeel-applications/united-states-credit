import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context';
import Routes from '../Routes';
import Drawer from './Drawer';
import NavbarTop from './NavbarTop';
import Feed from './Feed';
import Footer from './Footer';
import { checkForDeepDive } from '../utils/deepDive';
import { getOrganicHSID } from '../utils/middleware';
import { getCookie } from '../utils/helpers';
import useGeoLocation from '../hooks/useGeoLocation';
import { useHistory } from 'react-router-dom';

const App = () => {
	const { dispatchTracking, dispatchApp, trackingState } = useContext(AppContext);
	let history = useHistory();
	useGeoLocation();

	const myURL = new URL(window.location.href);
	let tracking = {
		HSID: myURL.searchParams.get('hsid') || getCookie('hsid') || 123456,
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
	checkForDeepDive(tracking.VERTICAL, tracking.TYPE, history, dispatchApp);

	const saveTrackingLocally = async() => {
		const clickId = tracking.HSID !== 123456 ? tracking.HSID : await getOrganicHSID(tracking);
		const payload = {
			hsid: Number(clickId),
			pid: Number(tracking.PID),
			sid: Number(tracking.SID),
			oid: Number(tracking.OID),
			uid: tracking.UID,
			eid: tracking.EID,
			se: tracking.SE,
			kwd: tracking.KWD,
			pacid: tracking.PACID,
			pt1: tracking.PT1,
			pt2: tracking.PT2,
			gclid: tracking.GCLID,
			vertical: tracking.VERTICAL,
			type: tracking.TYPE
		};
		dispatchTracking({ type: 'USER_ARRIVED', payload });
	};

	// const [addNewUser] = useMutation(ADD_NEW_USER);
	// const createNewUser = async(clickId) => {
	// 	const obj = {
	// 		visitor: {
	// 			clickId: Number(clickId),
	// 			ip_address: appState.ip_address,
	// 			program: {
	// 				pid: Number(tracking.PID),
	// 				oid: Number(tracking.OID),
	// 				eid: tracking.EID,
	// 				sid: Number(tracking.SID),
	// 				uid: tracking.UID
	// 			}
	// 		}
	// 	}
	// 	addNewUser( { variables: obj } );
	// };
useEffect(() => {
	saveTrackingLocally();
	// Clean-up Function
	return () => {console.log('cleanup')};
	// eslint-disable-next-line
}, [trackingState.ip_address]);

return (
	<div className='App app-bg_container' style={{padding: '0px'}}>
		<NavbarTop />      
		<Routes />
		<Feed />
		<Footer />
		<Drawer />
	</div>
);
}

export default App;