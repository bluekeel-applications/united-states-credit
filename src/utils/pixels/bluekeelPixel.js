import axios from 'axios';

const firePixelBlueKeel = async(hsid) => {
	let link = 'https://www.bkoffers.com/hitstreet/pixel_fire_dynamic_ext.cfm?hsid=' + hsid;
	try {
		const res = await axios({
			method: 'GET',
			headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			url: link
		});
		console.log('BK pixel fire response: ', res);
		return;
	} catch(err) {
		console.log('Failed to fire BK convrsion:', err.message);
		return;
	}
};

export default firePixelBlueKeel;