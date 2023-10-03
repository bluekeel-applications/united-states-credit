const fireBingPixel = (vertical) => {
	try{
		window.uetq = window.uetq || [];
		window.uetq.push({ec: 'USC_search', ea: 'search', el: vertical || 'unknown', ev: .7});
		console.log('Bing pixel fired for vertical: ', window.uetq);
		return;
	} catch (e){
		console.warn('Failed to fire Bing conversion:', e.stack);
		return;
	}	
};

export default fireBingPixel;