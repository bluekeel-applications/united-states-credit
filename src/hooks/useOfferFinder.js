import { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../context';
import { getOfferList } from '../utils/middleware';

const useOfferFinder = () => {
	const componentIsMounted = useRef(true);
	const retry_count = useRef(3);
	const [clicks, setClicks] = useState(0);
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
	// Create an array of the range values set by their usage percentage...
		let usageArray = endpoints.map((endpoint, ix) => {
			let endpointRange;
			if (ix === 0) { 
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
	// Then, find the index of the array item that contains the count value within its range
		usageArray.forEach((array, inx) => {
		// If offer usage is equal to 0%...
			if(array.length === 0) {
				return;
			}
		// If offer usage is equal to 100%...
			if(array.length === 100) {
				let hasRestrictions = endpoints[inx].restricted || endpoints[inx].states.length > 0 || false;
				// If there are NO restrictions, use the offer...
				if(!hasRestrictions) {
					activeIndex = inx;
					return;
				};
				// If restrictions apply to the user...
				if(!!trackingState.location && endpoints[inx].states.includes(trackingState.location)) {
					// Use the fallback
					activeIndex = inx + 1;
					return;
				}
			}
		// Otherwise, define the index of the active endpoint offer
			if(array.includes(count)) {
				activeIndex = inx;
			}
		});

		return endpoints[activeIndex];
	};

	const handleOfferChoice = (response) => {
	// Quick check to make sure that offers exist...
		if(response.endpoints && response.endpoints.length > 0) {
		// Set the program click_count locally for use later
			setClicks(response.click_count);
		// Cut off the last two digits of click count --> we only care about position out of 100
			let num = clicks.toString();        
			let digitLength = num.length;
		// If there are more than 2 digits in click_count, go ahead and clip the head
			if(digitLength > 2) {
				setClicks(num.substring(digitLength - 2, digitLength));
			}
			
		// If a single offer is returned, use it...
			if(response.endpoints.length === 1){
				const data = {
					link: response.endpoints[0].url,
					offer_page: response.endpoints[0].offer_page || 'wall',
					four_button: response.endpoints[0].four_button || [],
					jump: response.endpoints[0].jump || null
				};				
				return data;
			}

		// If more than one, lets do some work to find the correct offer...
			const activeOffer = selectFromMultiple(clicks, response.endpoints);
			if(!!activeOffer) {
				const data = {
				  link: activeOffer.url,
				  offer_page: activeOffer.offer_page || 'wall',
				  four_button: activeOffer.four_button || [],
				  jump: activeOffer.jump || null
				};				
				return data;
			};
		}
	};
	
// This is a great place to put a fallback like this example if somehow everything breaks...
	const fetchOfferList = async () => {
		const raw = await getOfferList(reqBody);
		if (raw[0].status === 'failed' && retry_count.current > 0) {
			retry_count.current--;
			fetchOfferList();
			return;
		};
		if(raw[0].status === 'failed' && retry_count.current === 0){
			dispatchApp({ type: 'FAILED_OFFER_SELECTION' });
			return;
		};
		let offer_obj = handleOfferChoice(raw[0]);
		dispatchApp({ type: 'SELECTED_OFFER', payload: offer_obj });
	};

  	useEffect(() => {		  	
			if(componentIsMounted.current && isEnd) { 
				fetchOfferList();
			};
			// Clean-up Function
			return () => {componentIsMounted.current = false;};
			// eslint-disable-next-line
		},[]
	);
}

export default useOfferFinder;