import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Radium from 'radium';
import Loading from '../components/Shared/Loading';
import ErrorBoundary from '../components/Shared/ErrorBoundary';
import lazyWithRetry from '../utils/lazyWithRetry';

// import Welcome from '../components/Pages/Welcome';
// import PrivacyPolicy from '../components/Shared/PrivacyPolicy';
// import TermConditions from '../components/Shared/TermsConditions';
// import EndUserFlow from '../components/Pages/EndUserFlow';
import FlowWrapper from './FlowWrapper';
// import DuplicateCheck from '../components/Pages/DuplicateCheck';
// import System1 from '../components/Pages/System1';
const PrivacyPolicy = lazyWithRetry(() => import('../components/Shared/PrivacyPolicy'), 'PrivacyPolicy');
const TermConditions = lazyWithRetry(() => import('../components/Shared/TermsConditions'), 'TermConditions');
const EndUserFlow = lazyWithRetry(() => import('../components/Pages/EndUserFlow'), 'EndUserFlow');
const LoadingRedirect = lazyWithRetry(() => import('../components/Shared/LoadingRedirect'), 'LoadingRedirect');
const DuplicateCheck = lazyWithRetry(() => import('../components/Pages/DuplicateCheck'), 'DuplicateCheck');
const System1 = lazyWithRetry(() => import('../components/Pages/System1'), 'System1');
const AdArticle = lazyWithRetry(() => import('../components/Pages/AdArticle'), 'AdArticle');
const UserCapture = lazyWithRetry(() => import('../components/Pages/UserCapture'), 'UserCapture');
const Home = lazyWithRetry(() => import('../components/Pages/Home'), 'Home');
const CBiframe = lazyWithRetry(() => import('../components/Pages/CBiframe'), 'CBiframe');
const OfferFinder = lazyWithRetry(() => import('../components/Pages/OfferFinder'), 'OfferFinder');
const OfferWall = lazyWithRetry(() => import('../components/Pages/OfferWall'), 'OfferWall');
const LoanWrapper = lazyWithRetry(() => import('../components/Pages/LoanWrapper'), 'LoanWrapper');

const WrappedRoute = ({ element }) => (
    <FlowWrapper>{element}</FlowWrapper>
);

const RouteContainer = () => (

        <ErrorBoundary>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/finder' element={<OfferFinder />}/>
                    <Route path='/offers' element={<OfferWall />}/>
                    <Route path='/loans/*' element={<LoanWrapper />}/>
                    {/* <Route path='/' element={<Welcome />}/> */}
                    {/* <WrappedRoute path='/' element={<Home />}/>
                    <WrappedRoute path='/privacy' element={<PrivacyPolicy />}/>
                    <WrappedRoute path='/terms' element={<TermConditions />}/>
                    <WrappedRoute path='/email_optin' element={<EndUserFlow />}/>
                    <WrappedRoute path='/duplicate_check' element={<DuplicateCheck />}/>
                    <WrappedRoute path='/rsoc' element={<System1 />}/>
                    <WrappedRoute path='/gas' element={<AdArticle />}/> */}
                    <Route path='/privacy' element={<WrappedRoute element={<PrivacyPolicy />}/>}/>
                    <Route path='/terms' element={<WrappedRoute element={<TermConditions />}/>}/>
                    <Route path='/email_optin' element={<WrappedRoute element={<EndUserFlow />}/>}/>
                    <Route path='/duplicate_check' element={<WrappedRoute element={<DuplicateCheck />}/>}/>
                    <Route path='/rsoc' element={<WrappedRoute element={<System1 />}/>}/>
                    <Route path='/gas' element={<WrappedRoute element={<AdArticle />}/>}/>
                    <Route path='/loading' element={<WrappedRoute element={<LoadingRedirect />}/>}/>
                    <Route path='/new_user' element={<WrappedRoute element={<UserCapture />}/>}/>
                    <Route path='/cbiframe' element={<WrappedRoute element={<CBiframe />}/>}/>
                </Routes>
            </Suspense>
        </ErrorBoundary>
);

export default Radium(RouteContainer);