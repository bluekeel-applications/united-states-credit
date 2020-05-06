import axios from 'axios';
// export const firePixelFB = () => {
// 	window.fbq('init', '399511550764014');
// 	window.fbq('track', 'Purchase', {
// 		value: 0.00,
// 		currency: 'USD'
// 	});
	
// 	console.log('Fired FB Pixel');
// };
export const firePixelBlueKeel = async(hsid) => {
	let link = 'https://www.bkoffers.com/hitstreet/pixel_fire_dynamic_new2.cfm?hsid=' + hsid;
	try {
		await axios({
			method: 'GET',
			headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			url: link
		});
		console.log('BK pixel fired for hsid: ', hsid);
		return;
	} catch(err) {
		console.log('Failed to fire BK convrsion:', err.message);
		return;
	}
};

export const firePixelBing = (vertical) => {
	try{
		window.uetq = window.uetq || [];
		window.uetq.push({ec: 'USC_search', ea: 'search', el: vertical || 'unknown', ev: .7});
		console.log('Bing pixel fired for vertical: ', vertical);
		return;
	} catch (e){
		console.warn('Failed to fire Bing conversion:', e.stack);
		return;
	}	
};

export const firePixelGoogle = () => {
	window.dataLayer = window.dataLayer || [];
	function gtag(){window.dataLayer.push(arguments);}
	try{
		gtag('js', new Date());
		gtag('config', 'AW-1062401053');
		gtag('event', 'conversion', { 'send_to': 'AW-1062401053/vd4cCM_pqXsQnejL-gM' });
		console.log('Google conversion pixel fired.');
		return;
	} catch (e){
		console.warn('Failed to fire Google conversion:', e.stack);
		return;
	}	
};
