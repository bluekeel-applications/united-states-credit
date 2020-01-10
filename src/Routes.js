import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import GetStarted from './components/GetStarted';
import Verticals from './components/Verticals';
import CreditCards from './components/CreditCards';
import AutoLoans from './components/AutoLoans';
import HomeLoans from './components/HomeLoans';
import PersonalLoans from './components/PersonalLoans';
import DebtAmounts from './components/DebtAmounts';
import DebtTypes from './components/DebtTypes';
import CheckingOptin from './components/CheckingOptin';

import { FlowLayout } from './context/Layouts';

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
      {/* <Route path='/' exact component={GetStarted} /> */}
      <Route path='/' exact component={CheckingOptin} />
      <RouteWrapper path='/verticals' layout={FlowLayout} component={Verticals} />
      <RouteWrapper path='/credit_cards' layout={FlowLayout} component={CreditCards} />
      <RouteWrapper path='/auto_loans' layout={FlowLayout} component={AutoLoans} />
      <RouteWrapper path='/auto_loans' layout={FlowLayout} component={AutoLoans} />
      <RouteWrapper path='/personal_loans' layout={FlowLayout} component={PersonalLoans} />
      <RouteWrapper path='/home_loans' layout={FlowLayout} component={HomeLoans} />
      <RouteWrapper path='/debt_types' layout={FlowLayout} component={DebtTypes} />
      <RouteWrapper path='/debt_amounts' layout={FlowLayout} component={DebtAmounts} />
      <RouteWrapper path='/checking_optin' layout={FlowLayout} component={CheckingOptin} />
    </Switch>
  );
};

export default Routes;