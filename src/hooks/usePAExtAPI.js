import { useEffect, useRef } from 'react';
// import { AppContext } from '../context';
import axios from 'axios';

const getNewToken = async() => {
	const api_url = 'https://externalapi-stg.pch.com/paextapi/api/consumerauthtoken/create';
	const api_consumer = process.env.API_CONSUMER_NAME;
	const api_password = process.env.API_PASSWORD_TEST;

	try{
        const res = await axios({
            method: 'POST',
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Api-Consumer-Name': api_consumer
            },
			url: api_url,
			body: { password: api_password }
        });
        
        return res;
    } catch(err) {
        return {status: 'failed', message: err};
    }
};

const usePAExtAPI = () => {
    const componentIsMounted = useRef(true);

	const getUserProfile = async() => {
		const api_token = await getNewToken();
		console.log('api_token:', api_token);
	};

    useEffect(() => {
        if(componentIsMounted.current) { 
			getUserProfile();
		};
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
    }, []);
};

export default usePAExtAPI;