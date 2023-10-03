import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import UscFullLogo from '@bit/bluekeel.assets.usc_full_logo';
import Radium from 'radium';
import Loading from '../components/Shared/Loading';

const Welcome = lazy(() => import('../components/Pages/Welcome'));
const PrivacyPolicy = lazy(() => import('@bit/bluekeel.component-library.privacy-policy'));
const TermConditions = lazy(() => import('@bit/bluekeel.component-library.term-conditions'));
const EndUserFlow = lazy(() => import('../components/Pages/EndUserFlow'));
const RouteWrapper = lazy(() => import('./RouteWrapper'));
const DuplicateCheck = lazy(() => import('../components/Pages/DuplicateCheck'));
const System1 = lazy(() => import('../components/Pages/System1'));

const Routes = () => (

        <Suspense fallback={<Loading />}>
            <RouteWrapper>
                <Switch>
                    <Route path='/' exact ><Welcome /></Route>
                    <Route path='/privacy'><PrivacyPolicy domain='UnitedStatesCredit.com' logo={UscFullLogo}/></Route>
                    <Route path='/terms'><TermConditions domain='UnitedStatesCredit.com' logo={UscFullLogo}/></Route>
                    <Route path='/email_optin'><EndUserFlow /></Route>
                    <Route path='/duplicate_check'><DuplicateCheck /></Route>
                    <Route path='/rsoc'><System1 /></Route>
                </Switch>
            </RouteWrapper>
        </Suspense>
);

export default Radium(Routes);