import { useEffect, useContext, useRef, useState } from 'react';
import { AppContext } from '../context';
import axios from 'axios';

const getUserLocation = async() => {
    let geoLink = 'https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572' ;
    try{
        const res = await axios({
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: geoLink
        });
        if(res.status !== 200) {
            throw new Error('Error getting user location.');
        }
        return res.data;
    } catch(err) {
        return {status: 'failed', message: err};
    }
};

const useGeoLocation = () => {
    const componentIsMounted = useRef(true);
    const [error, setError] = useState(false);
    const [ip_address, set_ip_address] = useState('');
    const { dispatchTracking } = useContext(AppContext);
    const retry_count = useRef(3);

    const getLocation = async () => {
        const res = await getUserLocation();
        if(res.status === 'failed' && retry_count.current > 0) {
            retry_count.current--;
            getLocation();
            return;
        }
        if(res.status === 'failed' && retry_count.current === 0){
            setError(true);
            return;
        };
        set_ip_address(res.IPv4);
        dispatchTracking({ type: 'LOCATION_FOUND', payload: { state: res.state, ip_address: res.IPv4 }});
    };

    useEffect(() => {
        if(componentIsMounted.current) {getLocation();}
        // Clean-up Function
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
    }, []);
    return [ip_address, error]
};

export default useGeoLocation;