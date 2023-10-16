import { useEffect} from 'react';
import { PUSH_PROVIDERS } from '../utils/GraphQL/queries';
import { useQuery } from '@apollo/client';

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const initPushnami = ppUrl => {
    console.log('Pushnami Initialization: STARTED');
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = ppUrl;
    script.onload = function() {
        window.Pushnami.update().prompt();
        console.log('Pushnami Initialization: SUCCESS');
    };
    document.getElementsByTagName('head')[0].appendChild(script);
};

const initPushPros = ppUrl => {
    console.log('PushPros Initialization: STARTED');
    window.fetch(ppUrl + window.location.hostname, {
        method: 'GET',
        redirect: 'follow',
        mode: 'cors'
    }).then(function (r) {
        r.json().then(function (response) {
            if (!response.success || !response.script) return;
            console.log('PushPros Initialization: ', response.success ? 'SUCCESS':'FAILED');
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.innerHTML = response.script;
            document.getElementsByTagName('head')[0].appendChild(s);
        });
    })
};

const usePushProviders = () => {
	const { loading, error, data } = useQuery(PUSH_PROVIDERS);

	useEffect(() => {
        if(window.location.host === 'localhost:3000') {
            console.log('In Development mode: Skip Push');
            return;
        };
        if(!!error) {
            console.error('Error fetching push providers...:', error);
            return;
        };
        if(!loading && !!data) {
            const providers = data.fetchPushProviders.body;
            const count = getRandomInt(1, 100);
            if(count <= providers['push_pros']) {
                initPushPros('https://pushpros.tech/GetPushScript?key=2Xa3N8H4tIMDq5DaLOjgimHq4HG8UhWO&domain=');
                return;
            };
            initPushnami('https://api.pushnami.com/scripts/v1/pushnami-adv/5dc01af91e6090001311fd72');
            return;
        };
		// eslint-disable-next-line
	}, [loading, error, data]);

	return;
};

export default usePushProviders;