import * as Helpers from '@bit/bluekeel.utilities.helpers';

const initialTrackingState = {
    oid: Helpers.checkCookie('oid') ? Helpers.getCookie('oid') : null,
    pid: Helpers.checkCookie('pid') ? Helpers.getCookie('pid') : null,
    eid: Helpers.checkCookie('eid') ? Helpers.getCookie('eid') : null,
    sid: Helpers.checkCookie('sid') ? Helpers.getCookie('sid') : null,
    uid: Helpers.checkCookie('uid') ? Helpers.getCookie('uid') : null,
    hsid: Helpers.checkCookie('hsid') ? Helpers.getCookie('hsid') : null,
    ip_address: Helpers.checkCookie('ip') ? Helpers.getCookie('ip') : null,
    kwd: Helpers.checkCookie('kwd') ? Helpers.getCookie('kwd') : null,
    se: Helpers.checkCookie('se') ? Helpers.getCookie('se') : null,
    pacid: Helpers.checkCookie('pacid') ? Helpers.getCookie('pacid') : null,
    pt1: Helpers.checkCookie('pt1') ? Helpers.getCookie('pt1') : null,
    pt2: Helpers.checkCookie('pt2') ? Helpers.getCookie('pt2') : null,
    gclid: Helpers.checkCookie('gclid') ? Helpers.getCookie('gclid') : null,
    email: Helpers.checkCookie('email') ? Helpers.getCookie('email') : '',
    fname: Helpers.checkCookie('fname') ? Helpers.getCookie('fname') : '',
    lname: Helpers.checkCookie('lname') ? Helpers.getCookie('lname') : '',
    address: Helpers.checkCookie('address') ? Helpers.getCookie('address') : '',
    city: Helpers.checkCookie('city') ? Helpers.getCookie('city') : '',
    state: Helpers.checkCookie('state') ? Helpers.getCookie('state') : '',
    country: Helpers.checkCookie('country') ? Helpers.getCookie('country') : null,
    zip: Helpers.checkCookie('zip') ? Helpers.getCookie('zip') : '',
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
            Helpers.setCookies(tracking);
            return {
                ...state,
                ...tracking
            };

        case 'SET_PCH_USER':
            console.log('pch reducer:', action.payload);
            Helpers.setPchCookies(action.payload);
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
            Helpers.setCookie('hsid', action.payload, 3);
            return {
                ...state,
                hsid: action.payload
            };

        case 'SET_EMAIL':
            return {
                ...state,
                email: action.payload
            };
            
        case 'LOCATION_FOUND':
            Helpers.setCookie('city', action.payload.city, 3);
            Helpers.setCookie('state', action.payload.state, 3);
            Helpers.setCookie('country', action.payload.country, 3);
            Helpers.setCookie('zip', action.payload.zip, 3);
            Helpers.setCookie('ip', action.payload.ip_address, 3);
            return {
                ...state,
                city: action.payload.city,
                state: action.payload.state,
                country: action.payload.country,
                zip: action.payload.zip,
                ip_address: action.payload.ip_address,
            };          
        
        case 'KEYWORD_SELECTED':
            Helpers.setCookie('kwd', action.payload, 3);
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