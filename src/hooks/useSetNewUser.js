import { useEffect, useContext } from 'react';
import { AppContext } from '../context';
import { sendHitStreetHSID } from '../utils/middleware';
import { getCookie } from '../utils/helpers';
import useSetDeepDive from './useSetDeepDive';

const useSetNewUser = () => {
	const myURL = new URL(window.location.href);
	const { dispatchTracking } = useContext(AppContext);	
	const inboundVertical = myURL.searchParams.get('vertical') || 'N/A';
	const inboundType = myURL.searchParams.get('type') || 'N/A';
	const [redirect] = useSetDeepDive(inboundVertical, inboundType);

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

	return [redirect];
};

export default useSetNewUser;