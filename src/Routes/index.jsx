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
const OptInESP = lazy(() => import('../components/Pages/OptInESP'));
const DuplicateCheck = lazy(() => import('../components/Pages/DuplicateCheck'));
const System1 = lazy(() => import('../components/Pages/System1'));

const SelectVertical = lazy(() => import('../components/Pages/SelectVertical'));
const SelectAutoType = lazy(() => import('../components/Pages/SelectAutoType'));
const SelectCardType = lazy(() => import('../components/Pages/SelectCardType'));
const SelectLoanType = lazy(() => import('../components/Pages/SelectLoanType'));
const SelectHomeType = lazy(() => import('../components/Pages/SelectHomeType'));
const SelectDebtType = lazy(() => import('../components/Pages/SelectDebtType'));
const SelectDebtAmount = lazy(() => import('../components/Pages/SelectDebtAmount'));
const SelectOptin = lazy(() => import('../components/Pages/SelectOptin'));

const Routes = () => (

        <Suspense fallback={<Loading />}>
            <RouteWrapper>
                <Switch>
                    <Route path='/' exact ><Welcome /></Route>
                    <Route path='/privacy'><PrivacyPolicy domain='UnitedStatesCredit.com' logo={UscFullLogo}/></Route>
                    <Route path='/terms'><TermConditions domain='UnitedStatesCredit.com' logo={UscFullLogo}/></Route>
                    <Route path='/join'><OptInESP /></Route>
                    <Route path='/verticals'><SelectVertical/></Route>
                    <Route path='/credit_cards'><SelectCardType/></Route>
                    <Route path='/auto_loans'><SelectAutoType/></Route>
                    <Route path='/home_loans'><SelectHomeType/></Route>
                    <Route path='/personal_loans'><SelectLoanType/></Route>
                    <Route path='/debt_types'><SelectDebtType/></Route>
                    <Route path='/debt_amount'><SelectDebtAmount/></Route>
                    <Route path='/debt_optin'><SelectOptin type='debt'/></Route>
                    <Route path='/checking'><SelectOptin type='checking'/></Route>
                    <Route path='/email_optin'><EndUserFlow /></Route>
                    <Route path='/duplicate_check'><DuplicateCheck /></Route>
                    <Route path='/rsoc'><System1 /></Route>
                </Switch>
            </RouteWrapper>
        </Suspense>
);

export default Radium(Routes);