import axios from 'axios';

const firePixelBlueKeel = async(hsid) => {
	let link = 'https://bkroute.com/pixel_fire?hsid=' + hsid;
	try {
		await axios({
			method: 'GET',
			headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			url: link
		});
		return;
	} catch(err) {
		console.log('Failed to fire BK convrsion:', err.message);
		return;
	}
};

export default firePixelBlueKeel;