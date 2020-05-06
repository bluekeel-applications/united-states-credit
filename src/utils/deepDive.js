const handleTypeChoice = (type, history, dispatchApp) => {
	switch(type) {
		// Credit Cards
		case 'low_interest':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Low Interest' } });
			history.push('/checking_optin');
			return;
		case 'cash_back':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Cash Back' } });
			history.push('/checking_optin');
			return;
		case 'reward':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Reward' } });
			history.push('/checking_optin');
			return;
		case 'student':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Student' } });
			history.push('/checking_optin');
			return;
		case 'travel':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Travel' } });
			history.push('/checking_optin');
			return;
		case 'credit_building':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Credit Building' } });
			history.push('/checking_optin');
			return;
		case 'business':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Business' } });
			history.push('/checking_optin');
			return;
		case 'balance_transfer':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Balance Transfer' } });
			history.push('/checking_optin');
			return;
		case 'prepaid':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Prepaid' } });
			history.push('/checking_optin');
			return;
		// Auto Loans
		case 'car':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Car' } });
			history.push('/email_optin');
			return;
		case 'truck':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Truck' } });
			history.push('/email_optin');
			return;
		case 'suv':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'SUV' } });
			history.push('/email_optin');
			return;
		case 'van':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Van/Minivan' } });
			history.push('/email_optin');
			return;
		case 'not_sure':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Not Sure' } });
			history.push('/email_optin');
			return;
		// Personal Loans
		case 'debt_consolidation':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Debt Condolidation' } });
			history.push('/debt_types');
			return;
		case 'pay_bills':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Paying Bills' } });
			history.push('/debt_optin');
			return;
		case 'make_purchase':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Making a Purchase' } });
			history.push('/debt_optin');
			return;
		case 'emergency':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Emergency Cash' } });
			history.push('/debt_optin');
			return;
		case 'taxes':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Paying Taxes' } });
			history.push('/email_optin');
			return;
		case 'other':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Other' } });
			history.push('/debt_optin');
			return;
		// Home Loans
		case 'refinance':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Refinancing' } });
			history.push('/email_optin');
			return;
		case 'heloc':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'HELOC' } });
			history.push('/email_optin');
			return;
		case 'lease':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Lease-To-Own' } });
			history.push('/email_optin');
			return;
		case 'purchase':
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Purchasing a Home' } });
			history.push('/email_optin');
			return;

		default:
			return;
	}
};

export const checkForDeepDive = (vertical, type, history, dispatchApp) => {
	switch(vertical) {
		case 'credit_cards':
			dispatchApp({ type: 'VERTICAL_PICKED', payload: { value:vertical, crumb: 'Credit Cards'}});
			if(type) { 
				handleTypeChoice(type, history, dispatchApp) 
			} else { history.push(`/${vertical}`)};
			return;

		case 'auto_loans':
			dispatchApp({ type: 'VERTICAL_PICKED', payload: { value:vertical, crumb: 'Auto Loans'}});
			if(type) { 
				handleTypeChoice(type, history, dispatchApp) 
			} else { history.push(`/${vertical}`)};
			return;

		case 'personal_loans':
			dispatchApp({ type: 'VERTICAL_PICKED', payload: { value:vertical, crumb: 'Personal Loans'}});
			if(type) { 
				handleTypeChoice(type, history, dispatchApp) 
			} else { history.push(`/${vertical}`)};
			return;

		case 'home_loans':
			dispatchApp({ type: 'VERTICAL_PICKED', payload: { value:vertical, crumb: 'Home Loans'}})
			if(type) { 
				handleTypeChoice(type, history, dispatchApp) 
			} else { history.push(`/${vertical}`)};
			return;

		default:
			return;
	}
}