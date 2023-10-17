import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context';

const useSetDeepDive = (vertical, type, record) => {
	const { dispatchApp } = useContext(AppContext);
	const [ redirect, setRedirect ] = useState(null);
	
    const handleTypeChoice = () => {
		switch(type) {
			// Credit Cards
			case 'low_interest':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Low Interest' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			case 'cash_back':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Cash Back' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			case 'reward':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: 'rewards', crumb: 'Reward' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			case 'student':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Student' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			case 'travel':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Travel' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			case 'credit_building':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Credit Building' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			case 'business':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Business' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			case 'balance_transfer':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Balance Transfer' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			case 'prepaid':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Prepaid' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			// Auto Loans
			case 'car':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Car' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			case 'truck':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Truck' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			case 'suv':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'SUV' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			case 'van':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Van/Minivan' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			case 'not_sure':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Not Sure' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			// Personal Loans
			case 'debt_consolidation':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Debt Condolidation' } });
				setRedirect('/debt_types');
				return;
			case 'pay_bills':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Paying Bills' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			case 'make_purchase':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Making a Purchase' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			case 'emergency':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: 'emergency_cash', crumb: 'Emergency Cash' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			case 'taxes':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: 'pay_taxes', crumb: 'Paying Taxes' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			case 'other':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: 'other_purpose', crumb: 'Other' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			// Home Loans
			case 'refinance':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Refinancing' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			case 'heloc':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'HELOC' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			case 'lease':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: 'lease_to_own', crumb: 'Lease-To-Own' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			case 'purchase':
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Purchasing a Home' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
	
			default:
				return;
		}
	};
	
	const checkForDeepDive = () => {
		if(!!record) {
			dispatchApp({ type: 'VERTICAL_PICKED', payload: { value: 'direct', crumb: 'Select Interest'}});
			dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: 'direct', crumb: 'Direct Offer' } });
			dispatchApp({ type: 'REDIRECTION' });
			setRedirect('/email_optin');
			return;
		};
		switch(vertical) {
			case 'credit_cards':
				dispatchApp({ type: 'VERTICAL_PICKED', payload: { value: vertical, crumb: 'Credit Cards'}});
				if(type !== 'N/A') { 
					handleTypeChoice();
					return
				};
				setRedirect('/credit_cards');
				return;
	
			case 'auto_loans':
				dispatchApp({ type: 'VERTICAL_PICKED', payload: { value: vertical, crumb: 'Auto Loans'}});
				if(type !== 'N/A') { 
					handleTypeChoice();
					return
				};
				setRedirect('/auto_loans');
				return;
	
			case 'personal_loans':
				dispatchApp({ type: 'VERTICAL_PICKED', payload: { value: vertical, crumb: 'Personal Loans'}});
				if(type !== 'N/A') { 
					handleTypeChoice();
					return
				};
				setRedirect('/personal_loans');
				return;
	
			case 'home_loans':
				dispatchApp({ type: 'VERTICAL_PICKED', payload: { value: vertical, crumb: 'Home Loans'}});
				if(type !== 'N/A') {
					handleTypeChoice();
					return
				};
				setRedirect('/home_loans');
				return;
			
			case 'direct':
				dispatchApp({ type: 'VERTICAL_PICKED', payload: { value: vertical, crumb: 'Select Interest'}});
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: 'Direct Offer' } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;
			
			case 'lincx':
				dispatchApp({ type: 'VERTICAL_PICKED', payload: { value: vertical, crumb: 'Personal Loans'}});
				dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: type, crumb: `Inter-Lincx-${type}` } });
				dispatchApp({ type: 'REDIRECTION' });
				setRedirect('/email_optin');
				return;

			default:
				return;
		}
	}

	useEffect(() => {
        checkForDeepDive();
		// eslint-disable-next-line
	}, []);

	return redirect;
};

export default useSetDeepDive;