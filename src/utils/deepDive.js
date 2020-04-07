export const handleTypeChoice = (type, history, tracking, dispatchApp) => {
	switch(type) {
		// Credit Cards
		case 'low_interest':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'Low Interest' } });
			history.push('/checking_optin');
			return;
		case 'cash_back':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'Cash Back' } });
			history.push('/checking_optin');
			return;
		case 'reward':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'Reward' } });
			history.push('/checking_optin');
			return;
		case 'student':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'Student' } });
			history.push('/checking_optin');
			return;
		case 'travel':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'Travel' } });
			history.push('/checking_optin');
			return;
		case 'credit_building':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'Credit Building' } });
			history.push('/checking_optin');
			return;
		case 'business':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'Business' } });
			history.push('/checking_optin');
			return;
		case 'balance_transfer':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'Balance Transfer' } });
			history.push('/checking_optin');
			return;
		case 'prepaid':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'Prepaid' } });
			history.push('/checking_optin');
			return;
		// Auto Loans
		case 'car':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'Car' } });
			history.push('/email_optin');
			return;
		case 'truck':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'Truck' } });
			history.push('/email_optin');
			return;
		case 'suv':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'SUV' } });
			history.push('/email_optin');
			return;
		case 'van':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'Van/Minivan' } });
			history.push('/email_optin');
			return;
		case 'not_sure':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'Not Sure' } });
			history.push('/email_optin');
			return;
		// Personal Loans
		case 'debt_consolidation':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'Debt Condolidation' } });
			history.push('/debt_types');
			return;
		case 'pay_bills':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'Paying Bills' } });
			history.push('/debt_optin');
			return;
		case 'make_purchase':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'Make a Purchase' } });
			history.push('/debt_optin');
			return;
		case 'emergency':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'Emergency Cash' } });
			history.push('/debt_optin');
			return;
		case 'taxes':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'Paying Taxes' } });
			history.push('/email_optin');
			return;
		case 'other':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'Other' } });
			history.push('/debt_optin');
			return;
		// Home Loans
		case 'refinance':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'Refinancing' } });
			history.push('/email_optin');
			return;
		case 'heloc':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'HELOC' } });
			history.push('/email_optin');
			return;
		case 'lease':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'Lease-To-Own' } });
			history.push('/email_optin');
			return;
		case 'purchase':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: tracking.TYPE, crumb: 'Purchasing a Home' } });
			history.push('/email_optin');
			return;

		default:
			return;
	}
};