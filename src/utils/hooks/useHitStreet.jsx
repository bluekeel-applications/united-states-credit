import { useState, useEffect } from 'react';
import axios from 'axios';
import { setCookie } from '@bit/bluekeel.controllers.helpers';
const cancelToken = axios.CancelToken;
const source = cancelToken.source();

const buildHitStreetLink = (payload) => (
    'https://bkoffers.com/hitstreet/hit_count_hsid2.cfm?' +
        'offer_id=' + payload.oid + '&' +
        'program_id=' + payload.pid + '&' +
        'hsid=' + payload.hsid + '&' +
        'eid=' + payload.eid + '&' +
        'oid=' + payload.oid + '&' +
        'pid=' + payload.pid + '&' +
        'sid=' + payload.sid + '&' +
        'uid=' + payload.uid
);

const useHitStreet = (payload) => {
    const [ hsid, setHsid ] = useState(null);
    
    const pingHitStreet = async() => {
        try{
            const fetchLink = buildHitStreetLink(payload);
            const res = await axios({
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: fetchLink,
                cancelToken: source.token
            });
            if (res.status !== 200) {
                const backup = Date.now();
                console.log('Error occured on HitStreet; Fallback ClickID created:', backup);
                setCookie('hsid', backup, 3);
                setHsid(backup);
                return;
            };
            if(typeof res.data === 'number') {
                console.log('New HSID fetched:', res.data);
                setCookie('hsid', res.data, 3);
                setHsid(res.data);
                return;
            };
            console.log('HSID passed in URL:', payload.hsid);
            setCookie('hsid', payload.hsid, 3);
            setHsid(payload.hsid);
            return;
            
        } catch(err) {
            if (axios.isCancel(err)) {
                return {status: 'failed', message: 'axios hitstreet request cancelled'};
            }
            return {status: 'failed', message: err};
        }
    };

    useEffect(() => {
        if(!hsid) {
            pingHitStreet();
		};
        return () => { source.cancel('axios request cancelled'); };
		// eslint-disable-next-line
    }, [hsid]);
    
    return hsid;
};

export default useHitStreet;