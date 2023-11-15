import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
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
    const setAppHsid = useRef(false);
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
                setHsid(backup);
                setAppHsid.current = true;
                return;
            };
            if(typeof res.data === 'number') {
                console.log('New HSID fetched:', res.data);
                setHsid(res.data);
                setAppHsid.current = true;
                return;
            };
            console.log('Unknown result from Hitstreet:', res);
            return;
            
        } catch(err) {
            if (axios.isCancel(err)) {
                return {status: 'failed', message: 'axios hitstreet request cancelled'};
            }
            return {status: 'failed', message: err};
        }
    };

    useEffect(() => {
        if(!!payload.hsid && !setAppHsid.current && !hsid) {
            console.log('HSID passed in url:', payload.hsid);
            setHsid(payload.hsid);
            setAppHsid.current = true;
            return;
        };
        if(!payload.hsid && !setAppHsid.current && !hsid) {
            pingHitStreet();
		};

        return () => { source.cancel('axios request cancelled'); };
		// eslint-disable-next-line
    }, [payload.hsid, hsid]);
    
    return hsid;
};

export default useHitStreet;