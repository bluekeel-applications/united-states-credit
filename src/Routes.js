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
import CheckingOptin from './components/Pages/CheckingOptin';
import DebtOptin from './components/Pages/DebtOptin';
import EmailOptin from './components/Pages/EmailOptin';
import Offers from './components/Offers';
import Error from './components/Pages/Error';

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
      <Route path='/checking_optin' component={CheckingOptin} />
      <Route path='/debt_optin' component={DebtOptin} />
      <Route path='/email_optin' component={EmailOptin} />
      <Route path='/offers' component={Offers} />
      <Route path='/error' component={Error} />
    </Switch>
  );
};

export default Routes;