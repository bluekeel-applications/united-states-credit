import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context';
import Routes from '../Routes';
import Drawer from './Layout/Drawer';
import Navbar from './Layout/Navbar';
import Expansion from './Layout/Expansion';
import Feed from './Feed';
import { checkForDeepDive } from '../utils/deepDive';
import { sendHitStreetHSID } from '../utils/middleware';
import { getCookie } from '../utils/helpers';
import useGeoLocation from '../hooks/useGeoLocation';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { ADD_NEW_USER } from '../utils/mutations';
// import usePCH from '../hooks/usePCH';
import useSetProvider from '../hooks/useSetProvider';

const App = () => {
	useGeoLocation();
	// usePCH();
	useSetProvider();
	let history = useHistory();
	const myURL = new URL(window.location.href);
	const [showDrawer, toggleDrawer] = useState(false);
	const { dispatchTracking, dispatchApp, trackingState } = useContext(AppContext);

	let tracking = {
		HSID: myURL.searchParams.get('hsid') || getCookie('hsid') || 0,
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
		// DeepDive Checks
		VERTICAL: myURL.searchParams.get('vertical') || null,
		TYPE: myURL.searchParams.get('type') || null,
	};

	const [addNewUser] = useMutation(ADD_NEW_USER);
	const createNewUser = async(clickId) => {
		const obj = {
			clickId: Number(clickId),
			ip_address: trackingState.ip_address,
			program: {
				pid: Number(tracking.PID),
				oid: Number(tracking.OID),
				eid: tracking.EID,
				sid: Number(tracking.SID),
				uid: tracking.UID
			}
		}
		addNewUser( { variables: { visitor: obj } } );
	};

	useEffect(() => {
		checkForDeepDive(tracking.VERTICAL, tracking.TYPE, history, dispatchApp);
		const setAsyncTracking = async () => {
			if (trackingState.ip_address) {
				const clickId = await sendHitStreetHSID(tracking);
				const payload = {
					hsid: clickId,
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
				createNewUser(clickId);
			};
		};
		setAsyncTracking();
		// eslint-disable-next-line
	}, [trackingState.ip_address]);

return (
	<div className='App app-bg_container'>
		<Navbar toggleDrawer={toggleDrawer}/> 
		<Expansion /> 
		<Routes />
		<Feed />
		<Drawer show={showDrawer} toggle={toggleDrawer}/>
	</div>
);
}

export default App;