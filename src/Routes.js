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

import { USCLayout } from './context/Layouts';

const RouteWrapper = ({
  component: Component,
  layout: Layout,
  ...rest
}) => (
  <Route {...rest} render={(props) => 
    <Layout {...props}>
      <Component {...props} />
    </Layout>
  } />
);

const Routes = () => {
  // let { path } = useRouteMatch();

  return (
    <Switch>
      <Route path='/' exact layout={USCLayout} component={GetStarted} />
      <RouteWrapper path='/verticals' layout={USCLayout} component={Verticals} />
      <RouteWrapper path='/credit_cards' layout={USCLayout} component={CreditCards} />
      <RouteWrapper path='/auto_loans' layout={USCLayout} component={AutoLoans} />
      <RouteWrapper path='/auto_loans' layout={USCLayout} component={AutoLoans} />
      <RouteWrapper path='/personal_loans' layout={USCLayout} component={PersonalLoans} />
      <RouteWrapper path='/home_loans' layout={USCLayout} component={HomeLoans} />
      <RouteWrapper path='/debt_types' layout={USCLayout} component={DebtTypes} />
      <RouteWrapper path='/debt_amount' layout={USCLayout} component={DebtAmounts} />
      <RouteWrapper path='/checking_optin' layout={USCLayout} component={CheckingOptin} />
      <RouteWrapper path='/debt_optin' layout={USCLayout} component={DebtOptin} />
      <RouteWrapper path='/email_optin' layout={USCLayout} component={EmailOptin} />
      <RouteWrapper path='/offers' layout={USCLayout} component={Offers} />
    </Switch>
  );
};

export default Routes;