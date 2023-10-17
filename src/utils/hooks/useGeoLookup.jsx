import { useState, useRef, useEffect, useContext } from 'react';
import { AppContext } from '../../context';
import axios from 'axios';
import { checkCookie, getCookie } from '@bit/bluekeel.controllers.helpers';
const cancelToken = axios.CancelToken;
const source = cancelToken.source();

const getUserLocation = async() => {
    let geoLink = 'https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572' ;
    try{
        const res = await axios({
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: geoLink,
            cancelToken: source.token
        });
        if(res.status !== 200) {
            return {status: 'failed', message: 'Error getting user location.'};
        }
        return res.data;
    } catch(err) {
        if (axios.isCancel(err)) {
            return {status: 'failed', message: 'axios request cancelled'};
        }
        return {status: 'failed', message: err};
    }
};

const useGeoLookup = () => {
    const { dispatchTracking } = useContext(AppContext);
    const retry_count = useRef(3);
	const [ ip_address, set_ip_address ] = useState(checkCookie('ip') ? getCookie('ip') : null);

    const getLocation = async () => {
        const res = await getUserLocation();
        if(res.status === 'failed' && retry_count.current > 0) {
            retry_count.current--;
            getLocation();
            return;
        }
        if(res.status === 'failed' && retry_count.current === 0){
            set_ip_address('N/A');
            return;
        };
        set_ip_address(res.IPv4);
        dispatchTracking({ type: 'LOCATION_FOUND', payload: {
            city: res.city,
            state: res.state,
            country: res.country_code,
            zip: res.postal,
            ip_address: res.IPv4 
        }});
    };

	useEffect(() => {
        if(!ip_address) {
            getLocation();
		};
        return () => { source.cancel('axios request cancelled'); };
		// eslint-disable-next-line
	}, [ip_address]);

	return ip_address;
};

export default useGeoLookup;