import {
    getCookie,
    checkCookie,
    setCookies,
    setPchCookies,
    setCookie
} from '../../utils/helpers';

const initialTrackingState = {
    oid: checkCookie('oid') ? getCookie('oid') : null,
    pid: checkCookie('pid') ? getCookie('pid') : null,
    eid: checkCookie('eid') ? getCookie('eid') : null,
    sid: checkCookie('sid') ? getCookie('sid') : null,
    uid: checkCookie('uid') ? getCookie('uid') : null,
    hsid: checkCookie('hsid') ? getCookie('hsid') : null,
    location: checkCookie('state') ? getCookie('state') : null,
    ip_address: checkCookie('ip') ? getCookie('ip') : null,
    kwd: checkCookie('kwd') ? getCookie('kwd') : null,
    se: checkCookie('se') ? getCookie('se') : null,
    pacid: checkCookie('pacid') ? getCookie('pacid') : null,
    pt1: checkCookie('pt1') ? getCookie('pt1') : null,
    pt2: checkCookie('pt2') ? getCookie('pt2') : null,
    gclid: checkCookie('gclid') ? getCookie('gclid') : null,
    email: checkCookie('email') ? getCookie('email') : '',
    fname: checkCookie('fname') ? getCookie('fname') : '',
    lname: checkCookie('lname') ? getCookie('lname') : '',
    address: checkCookie('address') ? getCookie('address') : '',
    city: checkCookie('city') ? getCookie('city') : '',
    state: checkCookie('state') ? getCookie('state') : '',
    zip: checkCookie('zip') ? getCookie('zip') : '',
    // Resubmission catching
    em_sub: checkCookie('em_sub') ? getCookie('em_sub') : '',
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
                hsid: action.payload.hsid || initialTrackingState.hsid,
                se: action.payload.se || initialTrackingState.se,
                kwd: action.payload.kwd || initialTrackingState.kwd,
                pacid: action.payload.pacid || initialTrackingState.pacid,
                pt1: action.payload.pt1 || initialTrackingState.pt1,
                pt2: action.payload.pt2 || initialTrackingState.pt2,
                gclid: action.payload.gclid || initialTrackingState.gclid,
                email: action.payload.email || initialTrackingState.email,
                fname: action.payload.fname || initialTrackingState.fname,
                lname: action.payload.lname || initialTrackingState.lname,
                address: action.payload.address || initialTrackingState.address,
                city: action.payload.city || initialTrackingState.city,
                state: action.payload.state || initialTrackingState.state,
                zip: action.payload.zip || initialTrackingState.zip,
            };
            setCookies(tracking);
            return {
                ...state,
                ...tracking
            };

        case 'SET_PCH_USER':
            console.log('pch reducer:', action.payload);
            setPchCookies(action.payload);
            return {
                ...state,
                email: action.payload.EmailAddress || initialTrackingState.email,
                fname: action.payload.FirstName || initialTrackingState.fname,
                lname: action.payload.LastName || initialTrackingState.lname,
                address: action.payload.Address1 || initialTrackingState.address,
                city: action.payload.City || initialTrackingState.city,
                state: action.payload.State || initialTrackingState.state,
                zip: action.payload.ZipCode || initialTrackingState.zip
            };

        case 'HSID_FOUND':
            setCookie('hsid', action.payload, 3);
            return {
                ...state,
                hsid: action.payload
            };

        case 'SET_EMAIL':
            setCookie('email', action.payload, 3);
            return {
                ...state,
                email: action.payload
            };
            
        case 'LOCATION_FOUND':
            setCookie('state', action.payload.state, 3);
            setCookie('ip', action.payload.ip_address, 3);
            return {
                ...state,
                location: action.payload.state,
                ip_address: action.payload.ip_address,
            };        
        
        case 'KEYWORD_SELECTED':
            setCookie('kwd', action.payload, 3);
            return {
                ...state,
                kwd: action.payload
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