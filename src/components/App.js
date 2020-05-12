import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context';
import Routes from '../Routes';
import LoadingPCH from './Shared/LoadingPCH';
import Drawer from './Layout/Drawer';
import Navbar from './Layout/Navbar';
import Expansion from './Layout/Expansion';
import Feed from './Feed';
import { sendHitStreetHSID } from '../utils/middleware';
import { getCookie } from '../utils/helpers';
import useGeoLocation from '../hooks/useGeoLocation';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { ADD_NEW_USER } from '../utils/mutations';
// import usePCH from '../hooks/usePCH';
import useSetProvider from '../hooks/useSetProvider';
import useSetDeepDive from '../hooks/useSetDeepDive';

const App = () => {
	const [geoError] = useGeoLocation();
	// usePCH();
	useSetProvider();
	let history = useHistory();
	const myURL = new URL(window.location.href);
	const [showDrawer, toggleDrawer] = useState(false);
	const inboundVertical = myURL.searchParams.get('vertical') || 'N/A';
	const inboundType = myURL.searchParams.get('type') || 'N/A';
	const redirect = useSetDeepDive(inboundVertical, inboundType);
	const { dispatchTracking, trackingState, appState } = useContext(AppContext);
	const [clickId, setClickId] = useState(null);

	

	const [addNewUser] = useMutation(ADD_NEW_USER);
	const createNewUser = async(clickId) => {
		const obj = {
			clickId: Number(clickId),
			ip_address: trackingState.ip_address || 'N/A',
			program: {
				pid: Number(trackingState.pid),
				oid: Number(trackingState.oid),
				eid: trackingState.eid,
				sid: Number(trackingState.sid),
				uid: trackingState.uid
			}
		}
		addNewUser( { variables: { visitor: obj } } );
	};

	const buildNewUser = async() => {
		const tracking = {
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
		};
		const clickId = await sendHitStreetHSID(tracking);
		setClickId(clickId);
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
			gclid: tracking.GCLID
		};
		dispatchTracking({ type: 'USER_ARRIVED', payload });
	};

	useEffect(() => {
		buildNewUser();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		const { vertical, loan_type } = appState.flowState;
		if(vertical || loan_type) {
			history.push(redirect);
			return;
		};
		// eslint-disable-next-line
	}, [redirect]);

	useEffect(() => {
		if (trackingState.ip_address && clickId) {
			createNewUser(clickId, trackingState);
		};
		if(geoError) {
			console.log('Error in geo lookup:', geoError);
			createNewUser(clickId, trackingState);
		}
		// eslint-disable-next-line
	}, [trackingState.ip_address, geoError, clickId]);

return (
	<div className='App app-bg_container'>
		{
			appState.provider === 'pch' && !appState.animationPlayed ? (
				<LoadingPCH redirect={redirect} />
			) : (
				<>
					<Navbar toggleDrawer={toggleDrawer}/> 
					<Expansion /> 
					<Routes />
					<Feed />
					<Drawer show={showDrawer} toggle={toggleDrawer}/>
				</>
			)
		}
	</div>
);
}

export default App;