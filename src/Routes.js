import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GetStarted from './components/GetStarted';
import Verticals from './components/Verticals';
import CreditCards from './components/CreditCards';
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
  return (
    <Switch>
      <Route path='/' exact component={GetStarted} />
      <RouteWrapper path='/verticals' layout={FlowLayout} component={Verticals} />
      <RouteWrapper path='/credit_cards' layout={FlowLayout} component={CreditCards} />
    </Switch>
  );
};

export default Routes;