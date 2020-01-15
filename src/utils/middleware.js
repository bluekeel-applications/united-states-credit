import axios from 'axios';
import { setCookie } from './helpers';
const apiBaseUrl = 'https://programs.bluekeel-api.com/prod/api/';
const corsProxy = 'https://cors-anywhere.herokuapp.com/';

export const getOfferList = async(req) => {
    try {
        const res = await axios({
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: apiBaseUrl + 'program/offers',
            data: req
        });

        if (res.status !== 200) {
            throw new Error('Error fetching offers.');
        };

        if (res.data && res.data.length > 0) {
            return res.data;
        };

        return [{
            click_count: 0,
            endpoints: []
        }];
        
    } catch (e) {
        console.error('Error:', e);
        return e;
    }
};

export const addToClickCount = async(id) => {
    try {
        const res = await axios({
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: apiBaseUrl + 'program/add_click/' + id
        });

        if (res.status !== 200) {
            throw new Error('Error adding to click count.');
        };
        return res.data;
        
    } catch (e) {
        console.error('Error:', e);
        return e;
    }
};

const buildHitStreetLink = (payload) => {
    const { OID, PID, EID, SID, UID } = payload;
    const hitStreetLink = 'http://bkoffers.com/hitstreet/hit_count_hsid.cfm?' +
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
            url: corsProxy + fetchLink
        });
        if (res.status !== 200) {
            throw new Error('Error getting organic hsid.');
        };
        setCookie('hsid', res.data, 3);
        return res.data;
    } catch(err) {
        console.error('Error:', err);
        return err;
    }
};