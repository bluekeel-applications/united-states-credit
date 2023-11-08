import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../context';
import { Honeybadger } from '@honeybadger-io/react';
import useInsertUser from './useInsertUser';
import useSetDeepDive from './useSetDeepDive';
import usePchLookup from './usePchLookup';
import useHitStreet from './useHitStreet';
import useGeoLookup from './useGeoLookup';

const useSetNewSession = ({ tracking, turnOffLoading, animationComplete }) => {
	const { dispatchTracking } = useContext(AppContext);
	const [ shouldExecute, setShouldExecutePost ] = useState(false);
	const [ userContext, setUserContext ] = useState(null);
	const [ redirectTo, setRedirection ] = useState(null);

	const topProps = {
		hsid: Number(tracking.HSID),
		pid: Number(tracking.PID),
		sid: Number(tracking.SID),
		oid: Number(tracking.OID),
		uid: tracking.UID,
		eid: tracking.EID,
	};

	const hsid = useHitStreet(topProps);
	const ip_address = useGeoLookup();
	useInsertUser(topProps, hsid, ip_address, shouldExecute);
	const pchComplete = usePchLookup(tracking['PT1'], tracking['PT2'], hsid);
	const redirect = useSetDeepDive(tracking['VERTICAL'], tracking['TYPE'], tracking['RECORD']);

	const setNewUserContext = () => {
		const payload = {
			...topProps,
			hsid,
			se: tracking.SE,
			kwd: tracking.KWD,
			pacid: tracking.PACID,
			pt1: tracking.PT1,
			pt2: tracking.PT2,
			gclid: tracking.GCLID,
			email: tracking.EMAIL,
			article: tracking.ARTICLE,
			record: tracking.RECORD
		};
		dispatchTracking({ type: 'USER_ARRIVED', payload });
		setUserContext(payload);
		Honeybadger.setContext({
			user_id: hsid,
			user_email: tracking.EMAIL
		});
	};
// Final step check before returning user to page
	useEffect(() => {
		if(animationComplete && pchComplete && shouldExecute) {
			if(redirect) {
				// Wait until now to set the redirect variable because it triggers route change
				setRedirection(redirect);
			};
			turnOffLoading();
		};
		
		// eslint-disable-next-line
	}, [animationComplete, redirect, pchComplete, shouldExecute]);

// Once we have the hsid from hitstreet, set the user tracking context
	useEffect(() => {
		if(hsid && !userContext) {
			setNewUserContext();
		};
		// eslint-disable-next-line
	}, [hsid, userContext]);

// Once we have the ip_address(even if it is 'N/A'), and the hsid from hitstreet, post them to Mongo.
	useEffect(() => {
		if(ip_address && userContext) {
			setShouldExecutePost(true);
		};
		// eslint-disable-next-line
	}, [ip_address, userContext]);
	
	return redirectTo;
};

export default useSetNewSession;