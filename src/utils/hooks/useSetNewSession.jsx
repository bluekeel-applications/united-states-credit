import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../context';
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
		gclid: tracking.GCLID,
		// Google's iOS click ids, kept beside gclid for the loan form's
		// conversion report (routing-engine ENGINE.md § Google Ads conversions).
		gbraid: tracking.GBRAID,
		wbraid: tracking.WBRAID
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
			gbraid: tracking.GBRAID,
			wbraid: tracking.WBRAID,
			email: tracking.EMAIL,
			article: tracking.ARTICLE,
			segment: tracking.SEGMENT,
			record: tracking.RECORD,
			ttid: tracking.TTID,
			ttclid: tracking.TTCLID,
			fbid: tracking.FBID,
			fbclickid: tracking.FBCLICKID,
			display: tracking.DISPLAY,
			ads: tracking.ADS,
			// Ad-network params + click ids for partner link-outs (Offerbucks). Every new
			// landing-URL param has to be mapped here or it never reaches trackingState.
			utm_source: tracking.UTM_SOURCE,
			utm_term: tracking.UTM_TERM,
			utm_content: tracking.UTM_CONTENT,
			adcreative: tracking.ADCREATIVE,
			placement: tracking.PLACEMENT,
			channelid: tracking.CHANNELID,
			fbclid: tracking.FBCLID,
			ob_click_id: tracking.OB_CLICK_ID,
			tblci: tracking.TBLCI
		};
		dispatchTracking({ type: 'USER_ARRIVED', payload });
		setUserContext(payload);
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