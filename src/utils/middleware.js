import axios from 'axios';
import { setCookie } from './helpers';
// const apiBaseUrl = 'https://programs.bluekeel-api.com/prod/api/';
// const corsProxy = 'https://cors-anywhere.herokuapp.com/';

const buildHitStreetLink = (payload) => {
    const hitStreetLink = 'https://bkoffers.com/hitstreet/hit_count_hsid2.cfm?' +
        'offer_id=' + payload.OID + '&' +
        'program_id=' + payload.PID + '&' +
        'hsid=' + payload.HSID + '&' +
        'eid=' + payload.EID + '&' +
        'oid=' + payload.OID + '&' +
        'pid=' + payload.PID + '&' +
        'sid=' + payload.SID + '&' +
        'uid=' + payload.UID;
    return hitStreetLink;
};

export const sendHitStreetHSID = async(payload) => {
    let fetchLink = buildHitStreetLink(payload);
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
            setCookie('hsid', backup, 3);
            return backup;
        };
        if(typeof res.data === 'number') {
            setCookie('hsid', res.data, 3);
            return res.data;
        };
        setCookie('hsid', payload.HSID, 3);
        return payload.HSID;
    } catch(err) {
        return {status: 'failed', message: err};
    }
};