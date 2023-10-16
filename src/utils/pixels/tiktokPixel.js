const fireTiktokPixel = () => {
	try{
		window.ttq.track('ClickButton');
		console.log('Tiktok pixel fired');
		return;
	} catch (e){
		console.warn('Failed to fire Tiktok Pixel:', e.stack);
		return;
	}	
};

export default fireTiktokPixel;