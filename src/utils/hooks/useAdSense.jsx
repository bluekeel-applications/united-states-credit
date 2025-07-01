import { useEffect } from 'react';

const useAdSense = (tracking) => {

	const { SID } = tracking;
    const sid = Number(SID);

    const badSids = [
        9560,
        9992,
        9997,
        10007
    ];

	useEffect(() => {
        if(!!sid && sid !== 'undefined' && !badSids.includes(sid)) {
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
	}, [sid]);

	return;
};

export default useAdSense;