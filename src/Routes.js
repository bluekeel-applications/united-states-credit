import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GetStarted from './components/Pages/GetStarted';
import Verticals from './components/Pages/Verticals';
import CreditCards from './components/Pages/CreditCards';
import AutoLoans from './components/Pages/AutoLoans';
import HomeLoans from './components/Pages/HomeLoans';
import PersonalLoans from './components/Pages/PersonalLoans';
import DebtAmounts from './components/Pages/DebtAmounts';
import DebtTypes from './components/Pages/DebtTypes';
import DebtLoan from './components/Pages/DebtLoan';
import FreeChecking from './components/Pages/FreeChecking';
import EndUserFlow from './components/Pages/EndUserFlow';
import Error from './components/Pages/Error';
import Radium from 'radium';

const Routes = () => {
	return (
		<Switch>
			<Route path='/' exact component={GetStarted} />
			<Route path='/verticals' component={Verticals} />
			<Route path='/credit_cards' component={CreditCards} />
			<Route path='/auto_loans' component={AutoLoans} />
			<Route path='/auto_loans' component={AutoLoans} />
			<Route path='/personal_loans' component={PersonalLoans} />
			<Route path='/home_loans' component={HomeLoans} />
			<Route path='/debt_types' component={DebtTypes} />
			<Route path='/debt_amount' component={DebtAmounts} />
			<Route path='/debt_optin' component={DebtLoan} />
			<Route path='/checking' component={FreeChecking} />
			<Route path='/email_optin' component={EndUserFlow} />
			<Route path='/error' component={Error} />
		</Switch>
	);
};

export default Radium(Routes);
