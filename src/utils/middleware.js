import axios from 'axios';
import { setCookie } from './helpers';
// const apiBaseUrl = 'https://programs.bluekeel-api.com/prod/api/';
// const corsProxy = 'https://cors-anywhere.herokuapp.com/';

const buildHitStreetLink = (payload) => {
    const { OID, PID, EID, SID, UID } = payload;
    const hitStreetLink = 'https://bkoffers.com/hitstreet/hit_count_hsid2.cfm?' +
        'offer_id=' + OID + '&' +
        'program_id=' + PID + '&' +
        'hsid=0&' +
        'eid=' + EID + '&' +
        'oid=' + OID + '&' +
        'pid=' + PID + '&' +
        'sid=' + SID + '&' +
        'uid=' + UID;
    return hitStreetLink;
};

export const getOrganicHSID = async(payload) => {
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
        setCookie('hsid', res.data, 3);
        return res.data;
    } catch(err) {
        return {status: 'failed', message: err};
    }
};