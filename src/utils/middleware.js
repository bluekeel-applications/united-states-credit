import axios from 'axios';
import { setCookie } from './helpers';
// const apiBaseUrl = 'https://programs.bluekeel-api.com/prod/api/';
// const corsProxy = 'https://cors-anywhere.herokuapp.com/';

const buildHitStreetLink = (payload) => {
    const hitStreetLink = 'https://bkoffers.com/hitstreet/hit_count_hsid2.cfm?' +
        'offer_id=' + payload.OID + '&' +
        'program_id=' + payload.PID + '&' +
        'hsid=0&' +
        'eid=' + payload.EID + '&' +
        'oid=' + payload.OID + '&' +
        'pid=' + payload.PID + '&' +
        'sid=' + payload.SID + '&' +
        'uid=' + payload.UID;
    return hitStreetLink;
};

export const sendHitStreetHSID = async(payload) => {
    let fetchLink = buildHitStreetLink(payload);
    if(payload.HSID !== 0) {
        console.log('HSID found in url params:', payload.HSID);
        setCookie('hsid', payload.HSID, 3);
        return payload.HSID;
    };
    try{
        const res = await axios({
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: fetchLink
        });
        if (res.status !== 200) {
            const backup = Date.now();
            console.log('Error occured on HitStreet; Fallback ClickID created:', backup);
            setCookie('hsid', backup, 3);
            return backup;
        };
        console.log('New HSID set:', res.data);
        setCookie('hsid', res.data, 3);
        return res.data;
        
    } catch(err) {
        return {status: 'failed', message: err};
    }
};