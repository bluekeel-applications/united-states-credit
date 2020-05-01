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
		const res = await axios({
			method: 'GET',
			headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			url: link
		});
		console.log('pixel fired for hsid: ', hsid);
		return res;
	} catch(err) {
		console.log('error occured in pixel fire', err.message);
		return
	}
};

export const firePixelBing = (vertical) => {
	try{
		window.uetq = window.uetq || [];
		window.uetq.push({ec: 'USC_search', ea: 'search', el: vertical || 'unknown', ev: .7});
		return;
	} catch (e){
		console.warn('Failed to fire Bing conversion:', e.stack);
		return
	}	
};
