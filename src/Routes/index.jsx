import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Welcome from '../components/Pages/Welcome';
import PrivacyPolicy from '@bit/bluekeel.component-library.privacy-policy';
import TermConditions from '@bit/bluekeel.component-library.term-conditions';
import EndUserFlow from '../components/Pages/EndUserFlow';
import UscFullLogo from '@bit/bluekeel.assets.usc_full_logo';
import Radium from 'radium';
import RouteWrapper from './RouteWrapper';

const SelectVertical = lazy(() => import('../components/Pages/SelectVertical'));
const SelectAutoType = lazy(() => import('../components/Pages/SelectAutoType'));
const SelectCardType = lazy(() => import('../components/Pages/SelectCardType'));
const SelectLoanType = lazy(() => import('../components/Pages/SelectLoanType'));
const SelectHomeType = lazy(() => import('../components/Pages/SelectHomeType'));
const SelectDebtType = lazy(() => import('../components/Pages/SelectDebtType'));
const SelectDebtAmount = lazy(() => import('../components/Pages/SelectDebtAmount'));
const SelectOptin = lazy(() => import('../components/Pages/SelectOptin'));

const Policy = () => (<PrivacyPolicy domain='UnitedStatesCredit.com' logo={UscFullLogo}/>);
const Terms = () => (<TermConditions domain='UnitedStatesCredit.com' logo={UscFullLogo}/>);

// const CheckingOptin = () => (<SelectOptin type='checking'/>);
// const DebtOptin = () => (<SelectOptin type='debt'/>);

const Routes = () => (
    <RouteWrapper>
        <Switch>
            <Route path='/' exact component={Welcome} />
            <Route path='/privacy' component={Policy} />
            <Route path='/terms' component={Terms} />
            <Route path='/verticals' element={
                <Suspense fallback={<>...</>}>
                    <SelectVertical/>
                </Suspense>
            } />
            <Route path='/credit_cards' element={
                <Suspense fallback={<>...</>}>
                    <SelectCardType/>
                </Suspense>
            } />
            <Route path='/auto_loans' element={
                <Suspense fallback={<>...</>}>
                    <SelectAutoType/>
                </Suspense>
            } />
            <Route path='/home_loans' element={
                <Suspense fallback={<>...</>}>
                    <SelectHomeType/>
                </Suspense>
            } />
            <Route path='/personal_loans' element={
                <Suspense fallback={<>...</>}>
                    <SelectLoanType/>
                </Suspense>
            } />
            <Route path='/debt_types' element={
                <Suspense fallback={<>...</>}>
                    <SelectDebtType/>
                </Suspense>
            } />
            <Route path='/debt_amount' element={
                <Suspense fallback={<>...</>}>
                    <SelectDebtAmount/>
                </Suspense>
            } />
            <Route path='/debt_optin' element={
                <Suspense fallback={<>...</>}>
                    <SelectOptin type='debt'/>
                </Suspense>
            } />
            <Route path='/checking' element={
                <Suspense fallback={<>...</>}>
                    <SelectOptin type='checking'/>
                </Suspense>
            } />
            <Route path='/email_optin' component={EndUserFlow} />
        </Switch>
    </RouteWrapper>
);

export default Radium(Routes);