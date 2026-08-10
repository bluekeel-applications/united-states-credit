import { useEffect } from 'react';

const useAdSense = (tracking) => {

	const { SID, PID, ADS } = tracking;
    const sid = Number(SID);
    const pid = Number(PID);
    // const setLive = useRef(false);
    const badSids = [
        10007
    ];
    const badPids = [
        3655
    ];

	useEffect(() => {
        if(!!sid && sid !== 'undefined' && !badSids.includes(sid) && !badPids.includes(pid) && ADS !== 'no') {
            // Check if script already exists to avoid duplicates
            const existingScript = document.querySelector('script[src*="pagead2.googlesyndication.com"]');
            
            if (!existingScript) {
                const script = document.createElement('script');
                script.async = true;
                script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5105418052368941';
                script.crossOrigin = 'anonymous';
                
                document.head.appendChild(script);
            }
        };
		// eslint-disable-next-line
	}, []);

	return;
};

export default useAdSense;