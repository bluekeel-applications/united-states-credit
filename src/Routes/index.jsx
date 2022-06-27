import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import Welcome from '../components/Pages/Welcome';
import AdSenseComp from '../components/Pages/AdSense';
import PrivacyPolicy from '@bit/bluekeel.component-library.privacy-policy';
import TermConditions from '@bit/bluekeel.component-library.term-conditions';
import SelectVertical from '../components/Pages/SelectVertical';
import SelectAutoType from '../components/Pages/SelectAutoType';
import SelectCardType from '../components/Pages/SelectCardType';
import SelectLoanType from '../components/Pages/SelectLoanType';
import SelectHomeType from '../components/Pages/SelectHomeType';
import SelectDebtType from '../components/Pages/SelectDebtType';
import SelectDebtAmount from '../components/Pages/SelectDebtAmount';
import SelectOptin from '../components/Pages/SelectOptin';
import EndUserFlow from '../components/Pages/EndUserFlow';
import UscFullLogo from '@bit/bluekeel.assets.usc_full_logo';
import Radium from 'radium';
import RouteWrapper from './RouteWrapper';

const Policy = () => (<PrivacyPolicy domain='UnitedStatesCredit.com' logo={UscFullLogo}/>);
const Terms = () => (<TermConditions domain='UnitedStatesCredit.com' logo={UscFullLogo}/>);

const CheckingOptin = () => (<SelectOptin type='checking'/>);
const DebtOptin = () => (<SelectOptin type='debt'/>);

const Routes = () => (
    <RouteWrapper>
        <Switch>
            <Route path='/' exact component={AdSenseComp} />
            <Route path='/privacy' component={Policy} />
            <Route path='/terms' component={Terms} />
            <Route path='/verticals' component={SelectVertical} />
            <Route path='/credit_cards' component={SelectCardType} />
            <Route path='/auto_loans' component={SelectAutoType} />
            <Route path='/home_loans' component={SelectHomeType} />
            <Route path='/personal_loans' component={SelectLoanType} />
            <Route path='/debt_types' component={SelectDebtType} />
            <Route path='/debt_amount' component={SelectDebtAmount} />
            <Route path='/debt_optin' component={DebtOptin} />
            <Route path='/checking' component={CheckingOptin} />
            <Route path='/email_optin' component={EndUserFlow} />
        </Switch>
    </RouteWrapper>
);

export default Radium(Routes);