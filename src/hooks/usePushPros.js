import { useEffect } from 'react';
import 'whatwg-fetch';

const usePushPros = () => {
    useEffect(() => {
        (function () {
            window.fetch('https://pushpros.tech/GetPushScript?key=2Xa3N8H4tIMDq5DaLOjgimHq4HG8UhWO&domain=' + window.location.hostname, {
                method: 'GET',
                redirect: 'follow',
                mode: 'cors'
            }).then(function (r) {
                r.json().then(function (response) {
                    console.log('response pushpros', response);
                    if (!response.success || !response.script) return;
                    var s = document.createElement("script");
                    s.type = "text/javascript";
                    s.innerHTML = response.script;
                    document.getElementsByTagName('head')[0].appendChild(s);
                });
            })
        })()

        return;
        // eslint-disable-next-line
    }, []);
};

export default usePushPros;