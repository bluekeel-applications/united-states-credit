import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UscFullLogo from '@bit/bluekeel.assets.usc_full_logo';
import Radium from 'radium';
// import Loading from '../components/Shared/Loading';

import Welcome from '../components/Pages/Welcome';
import PrivacyPolicy from '../components/Shared/PrivacyPolicy';
import TermConditions from '../components/Shared/TermsConditions';
import EndUserFlow from '../components/Pages/EndUserFlow';
import FlowWrapper from './FlowWrapper';
import DuplicateCheck from '../components/Pages/DuplicateCheck';
import System1 from '../components/Pages/System1';
// const PrivacyPolicy = lazy(() => import('@bit/bluekeel.component-library.privacy-policy'));
// const TermConditions = lazy(() => import('@bit/bluekeel.component-library.term-conditions'));
// const EndUserFlow = lazy(() => import('../components/Pages/EndUserFlow'));
// const RouteWrapper = lazy(() => import('./RouteWrapper'));
// const DuplicateCheck = lazy(() => import('../components/Pages/DuplicateCheck'));
// const System1 = lazy(() => import('../components/Pages/System1'));

const RouteContainer = () => (

        // <Suspense fallback={<Loading />}>
            <FlowWrapper>
                <Routes>
                    <Route path='/' element={<Welcome />}/>
                    <Route path='/privacy' element={<PrivacyPolicy domain='UnitedStatesCredit.com' logo={UscFullLogo}/>}/>
                    <Route path='/terms' element={<TermConditions domain='UnitedStatesCredit.com' logo={UscFullLogo}/>}/>
                    <Route path='/email_optin' element={<EndUserFlow />}/>
                    <Route path='/duplicate_check' element={<DuplicateCheck />}/>
                    <Route path='/rsoc' element={<System1 />}/>
                </Routes>
            </FlowWrapper> 
        // </Suspense>
);

export default Radium(RouteContainer);