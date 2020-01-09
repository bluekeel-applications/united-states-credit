import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GetStarted from './components/GetStarted';
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
      <RouteWrapper path='/' layout={FlowLayout} component={GetStarted} />
    </Switch>
  );
};

export default Routes;