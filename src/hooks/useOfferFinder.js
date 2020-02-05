import { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../context';
import { getOfferList } from '../utils/middleware';

const useOfferFinder = () => {
	const componentIsMounted = useRef(true);
	const retry_count = useRef(3);
	const [offer, setOffer] = useState(null);
	const [error, setError] = useState(false);
	const [clicks, setClicks] = useState(0);
	const [isLoading, setLoading] = useState(false);
	const { appState, trackingState, dispatchApp } = useContext(AppContext);
	const { pid } = trackingState;
	const flow = appState.flowState;

	let isEnd = appState.flowState.vertical && appState.flowState.loan_type;

	const reqBody = {
		pid,
		vertical: flow.vertical,
		loan_type: flow.loan_type,
		debt_type: flow.debt_type,
		debt_amount: flow.debt_amount,
	};
	// Endpoint selection tools
	const range = (start, end) => {
		return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
	};
	
	const selectFromMultiple = (count, endpoints) => {
		let usageTotal = 0;
		let activeIndex;
		
		let usageArray = endpoints.map((endpoint, i) => {
			let endpointRange;
			if (i === 0) { 
			  usageTotal += endpoint.usage;
			  endpointRange = range(1, endpoint.usage);
			} else {
			  let newStart = usageTotal +1;
			  let end = usageTotal + endpoint.usage;
			  endpointRange = range(newStart, end);
			  usageTotal += endpoint.usage;
			};
			return endpointRange;
		})
	
		usageArray.forEach((array, i) => {
		  if(array.includes(count)) {
			activeIndex = i;
		  }
		})
		
		return endpoints[activeIndex];
	};

	const handleOfferChoice = (response) => {
		if(response.endpoints && response.endpoints.length > 0) {
			setClicks(response.click_count);
			//cut off the last two digits of click count
			let num = clicks.toString();        
			let digitLength = num.length;
			if(digitLength > 2) {
				setClicks(num.substring(digitLength - 2, digitLength));
			}
			let amount = response.endpoints.length === 1 ? 'single' : 'multiple';
			//if single endpoint, use it...
			switch(amount) {
				case 'single':
					const data = {
					  link: response.endpoints[0].url,
					  offer_page: response.endpoints[0].offer_page || 'wall',
					  four_button: response.endpoints[0].four_button || []
					};
					dispatchApp({ type: 'SELECTED_OFFER', payload: data });
					return data;
			// If more than one, lets do some work to find the correct offer...
				case 'multiple':
					const activeOffer = selectFromMultiple(clicks, response.endpoints);
					if(!!activeOffer) {
					  const data = {
						link: activeOffer.url,
						offer_page: activeOffer.offer_page || 'wall',
						four_button: activeOffer.four_button || []
					  };
					  dispatchApp({ type: 'SELECTED_OFFER', payload: data});
					}
					return data;
				default:
					throw new Error(`Not supported action ${amount}`);
			}
			
		} else {
			let data = {
			  link: 'https://unitedstatescredit.blog/',
			  offer_page: 'wall',
			  four_button: []
			};
			dispatchApp({ type: 'SELECTED_OFFER', payload: data});
			return;
		}
	};

	const fetchOfferList = async () => {
		// Add a slight deplay so the user get feedback on what is happening
		setTimeout(async () => {
			const raw = await getOfferList(reqBody);
			if (raw[0].status === 'failed' && retry_count.current > 0) {
				retry_count.current--;
				fetchOfferList();
				return;
			};
			if(raw[0].status === 'failed' && retry_count.current === 0){
				setError(raw.message)
				return;
			};
			let offer_obj = handleOfferChoice(raw[0]);
			setOffer(offer_obj);
			setLoading(false);
		}, 1000);
	};

  	useEffect(() => {		  	
			if(componentIsMounted.current && isEnd) { 
				setLoading(true);
				fetchOfferList();
			};
			// Clean-up Function
			return () => {componentIsMounted.current = false};
			// eslint-disable-next-line
		},[reqBody, isEnd]
	);

  	return [offer, error, isLoading];
}

export default useOfferFinder;