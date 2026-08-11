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
        // /loans is opt-in: ads only load there when ads=yes (URL param or
        // its 3-day cookie), default off. Everywhere else stays opt-out
        // (ads=no suppresses). Decided once per document load — /loans
        // internal links stay in-tree and its footer links open new tabs,
        // so there is no cross-navigation leakage.
        const onLoansPage = window.location.pathname === '/loans'
            || window.location.pathname.startsWith('/loans/');
        const adsAllowed = onLoansPage ? ADS === 'yes' : ADS !== 'no';
        if(!!sid && sid !== 'undefined' && !badSids.includes(sid) && !badPids.includes(pid) && adsAllowed) {
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