import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context';

const useSetDeepDive = (vertical, type) => {
	const [redirect, setRedirect] = useState('/');
	const { dispatchApp } = useContext(AppContext);
	
    const handleTypeChoice = () => {
		switch(type) {
			// Credit Cards
			case 'low_interest':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Low Interest' } });
				setRedirect('/checking_optin');
				return;
			case 'cash_back':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Cash Back' } });
				setRedirect('/checking_optin');
				return;
			case 'reward':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Reward' } });
				setRedirect('/checking_optin');
				return;
			case 'student':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Student' } });
				setRedirect('/checking_optin');
				return;
			case 'travel':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Travel' } });
				setRedirect('/checking_optin');
				return;
			case 'credit_building':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Credit Building' } });
				setRedirect('/checking_optin');
				return;
			case 'business':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Business' } });
				setRedirect('/checking_optin');
				return;
			case 'balance_transfer':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Balance Transfer' } });
				setRedirect('/checking_optin');
				return;
			case 'prepaid':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Prepaid' } });
				setRedirect('/checking_optin');
				return;
			// Auto Loans
			case 'car':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Car' } });
				setRedirect('/email_optin');
				return;
			case 'truck':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Truck' } });
				setRedirect('/email_optin');
				return;
			case 'suv':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'SUV' } });
				setRedirect('/email_optin');
				return;
			case 'van':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Van/Minivan' } });
				setRedirect('/email_optin');
				return;
			case 'not_sure':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Not Sure' } });
				setRedirect('/email_optin');
				return;
			// Personal Loans
			case 'debt_consolidation':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Debt Condolidation' } });
				setRedirect('/debt_types');
				return;
			case 'pay_bills':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Paying Bills' } });
				setRedirect('/debt_optin');
				return;
			case 'make_purchase':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Making a Purchase' } });
				setRedirect('/debt_optin');
				return;
			case 'emergency':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Emergency Cash' } });
				setRedirect('/debt_optin');
				return;
			case 'taxes':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Paying Taxes' } });
				setRedirect('/email_optin');
				return;
			case 'other':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Other' } });
				setRedirect('/debt_optin');
				return;
			// Home Loans
			case 'refinance':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Refinancing' } });
				setRedirect('/email_optin');
				return;
			case 'heloc':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'HELOC' } });
				setRedirect('/email_optin');
				return;
			case 'lease':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Lease-To-Own' } });
				setRedirect('/email_optin');
				return;
			case 'purchase':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Purchasing a Home' } });
				setRedirect('/email_optin');
				return;
	
			default:
				return;
		}
	};
	
	const checkForDeepDive = () => {
		switch(vertical) {
			case 'credit_cards':
				dispatchApp({ type: 'VERTICAL_PICKED', payload: { value:vertical, crumb: 'Credit Cards'}});
				if(type !== 'N/A') { 
					handleTypeChoice(type, dispatchApp);
					return
				};
				setRedirect('/credit_cards');
				return;
	
			case 'auto_loans':
				dispatchApp({ type: 'VERTICAL_PICKED', payload: { value:vertical, crumb: 'Auto Loans'}});
				if(type !== 'N/A') { 
					handleTypeChoice(type, dispatchApp);
					return
				};
				setRedirect('/auto_loans');
				return;
	
			case 'personal_loans':
				dispatchApp({ type: 'VERTICAL_PICKED', payload: { value:vertical, crumb: 'Personal Loans'}});
				if(type !== 'N/A') { 
					handleTypeChoice(type, dispatchApp);
					return
				};
				setRedirect('/personal_loans');
				return;
	
			case 'home_loans':
				dispatchApp({ type: 'VERTICAL_PICKED', payload: { value:vertical, crumb: 'Home Loans'}})
				if(type !== 'N/A') { 
					handleTypeChoice(type, dispatchApp);
					return
				};
				setRedirect('/home_loans');
				return;

			default:
				return;
		}
	}

	useEffect(() => {
		if(vertical === 'N/A' && type === 'N/A') return;
		checkForDeepDive();
		// eslint-disable-next-line
	}, []);

	return redirect;
};

export default useSetDeepDive;