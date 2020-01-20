import { getCookie, checkCookie, setCookies } from '../../utils/helpers';

const initialTrackingState = {
    oid: checkCookie('oid') ? getCookie('oid') : null,
    pid: checkCookie('pid') ? getCookie('pid') : null,
    eid: checkCookie('eid') ? getCookie('eid') : null,
    sid: checkCookie('sid') ? getCookie('sid') : null,
    uid: checkCookie('uid') ? getCookie('uid') : null,
    hsid: checkCookie('hsid') ? getCookie('hsid') : null
};

const trackingStateReducer = (state, action) => {
    switch (action.type) {
        case 'USER_ARRIVED':
            let tracking = {
                oid: action.payload.oid || initialTrackingState.oid,
                pid: action.payload.pid || initialTrackingState.pid,
                eid: action.payload.eid || initialTrackingState.eid,
                sid: action.payload.sid || initialTrackingState.sid,
                uid: action.payload.uid || initialTrackingState.uid,
                hsid: action.payload.hsid || initialTrackingState.hsid
            };
            setCookies(tracking)
            return {
                ...state,
                ...tracking
            };        

        case 'RESET':
            return initialTrackingState;        

        default:
            throw new Error(`Not supported action ${action.type}`);
    }
};

export {
    initialTrackingState,
    trackingStateReducer
};