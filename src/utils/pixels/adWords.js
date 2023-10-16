const fireAdwordsEvent = (vertical) => {
	try{
        window.gtag('event', 'conversion', {
            'send_to': 'AW-11025885187/kAMpCK_99IIYEIPQxokp'
        });
		return;
	} catch (e){
		console.warn('Failed to fire Adwords conversion:', e.stack);
		return;
	}	
};

export default fireAdwordsEvent;
