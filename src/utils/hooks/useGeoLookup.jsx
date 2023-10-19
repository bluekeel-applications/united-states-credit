import { useState, useRef, useEffect, useContext } from 'react';
import { AppContext } from '../../context';
import axios from 'axios';
const cancelToken = axios.CancelToken;
const source = cancelToken.source();

const getUserIp = async() => {
    // let geoLink = 'https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572' ;
    let geoLink = 'https://api.ipify.org?format=json' ;
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
            throw new Error('Error getting user ip.');
        };
        return {status: 'success', ip: res.data.ip};
    } catch(err) {
        return {status: 'failed', message: err};
    }
};

const getUserLocation = async(ip_address) => {
    let geoLink = `https://pro.ip-api.com/json/${ip_address}?key=ek6U3MRfYcpZFr0&fields=57402` ;
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
            throw new Error('Error getting user location.');
        };
        return {status: 'success', data: res.data};
    } catch(err) {
        return {status: 'failed', message: err};
    }
};

const useGeoLookup = () => {
    const { dispatchTracking, trackingState } = useContext(AppContext);
    const { ip_address, zip } = trackingState;
    const retry_count = useRef(3);
	const [ IPaddress, set_ip_address ] = useState(ip_address);

    const getIp = async () => {
        const res = await getUserIp();
        if(res.status === 'failed' && retry_count.current > 0) {
            retry_count.current--;
            getUserIp();
            return;
        };
        if(res.status === 'failed' && retry_count.current === 0){
            set_ip_address(0);
            return;
        };
        set_ip_address(res.ip);
        retry_count.current = 3;
    };

    const getLocation = async () => {
        const res = await getUserLocation(ip_address);
        if(res.status !== 'success' && retry_count.current > 0) {
            retry_count.current--;
            getUserLocation(ip_address);
            return;
        };
        if(res.status !== 'success' && retry_count.current === 0){
            set_ip_address(0);
            dispatchTracking({ type: 'LOCATION_FOUND', payload: {
                city: null,
                state: null,
                country: null,
                zip: null,
                ip_address: IPaddress 
            }});
            return;
        };
        const payload = {
            city: res.data.city,
            state: res.data.regionName,
            country: res.data.countryCode,
            zip: res.data.zip,
            ip_address: IPaddress
        };
        dispatchTracking({ type: 'LOCATION_FOUND', payload });
    };

    useEffect(() => {
        if(!!IPaddress && !zip) {
            getLocation();
        };
        // Clean-up Function
        return;
        // eslint-disable-next-line
    }, [IPaddress, zip]);

	useEffect(() => {
        if(!IPaddress) {
            getIp();
		};
        return () => { source.cancel('axios request cancelled'); };
		// eslint-disable-next-line
	}, [IPaddress]);

	return IPaddress
};

export default useGeoLookup;