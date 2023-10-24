import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Radium from 'radium';
import Loading from '../components/Shared/Loading';

import Welcome from '../components/Pages/Welcome';
// import PrivacyPolicy from '../components/Shared/PrivacyPolicy';
// import TermConditions from '../components/Shared/TermsConditions';
// import EndUserFlow from '../components/Pages/EndUserFlow';
import FlowWrapper from './FlowWrapper';
// import DuplicateCheck from '../components/Pages/DuplicateCheck';
// import System1 from '../components/Pages/System1';
const PrivacyPolicy = lazy(() => import('../components/Shared/PrivacyPolicy'));
const TermConditions = lazy(() => import('../components/Shared/TermsConditions'));
const EndUserFlow = lazy(() => import('../components/Pages/EndUserFlow'));
// const FlowWrapper = lazy(() => import('./FlowWrapper'));
const DuplicateCheck = lazy(() => import('../components/Pages/DuplicateCheck'));
const System1 = lazy(() => import('../components/Pages/System1'));

const RouteContainer = () => (

        <FlowWrapper>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path='/' element={<Welcome />}/>
                    <Route path='/privacy' element={<PrivacyPolicy />}/>
                    <Route path='/terms' element={<TermConditions />}/>
                    <Route path='/email_optin' element={<EndUserFlow />}/>
                    <Route path='/duplicate_check' element={<DuplicateCheck />}/>
                    <Route path='/rsoc' element={<System1 />}/>
                </Routes>
            </Suspense>
        </FlowWrapper> 
);

export default Radium(RouteContainer);