// The one file of the compliance snapshot that imports src/: it re-exports
// the /loans registry, content modules and configuration, and renders the
// live components to static markup with the providers they expect. Bundled
// by esbuild.config.mjs; build.mjs imports the bundle.
//
// Everything rendered here is the component the live page renders — the
// article of a legal page (LegalArticle, as LegalPageLayout renders it), the
// hub's body (LegalCenterBody), the header and footer, the landing sections,
// the privacy-choices variants and the partner list — so the snapshot cannot
// carry a second copy of any word.
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { StyleRoot } from 'radium';

import { AppContext } from '../../src/context/AppContext';
import { MarketplacePartnersContext } from '../../src/components/Pages/LoanWrapper/components/MarketplacePartnersContext';
import LegalArticle from '../../src/components/Pages/LoanWrapper/components/LegalArticle';
import LegalCenterBody from '../../src/components/Pages/LoanWrapper/components/LegalCenterBody';
import SiteHeader from '../../src/components/Pages/LoanWrapper/components/SiteHeader';
import SiteFooter from '../../src/components/Pages/LoanWrapper/components/SiteFooter';
import Hero from '../../src/components/Pages/LoanWrapper/components/Hero';
import TrustStrip from '../../src/components/Pages/LoanWrapper/components/TrustStrip';
import HowItWorks from '../../src/components/Pages/LoanWrapper/components/HowItWorks';
import Notice from '../../src/components/Pages/LoanWrapper/components/Notice';
import Faq from '../../src/components/Pages/LoanWrapper/components/Faq';
import LegalCenterCta from '../../src/components/Pages/LoanWrapper/components/LegalCenterCta';
import { PartnersListView, PartnersUnavailable } from '../../src/components/Pages/LoanWrapper/components/MarketplacePartnersList';
import {
    BrowserOptOut, CaliforniaAuthorizationRoute, ContactRecordsRoute, PrivacyRequest, PrivacySignalStatus,
} from '../../src/components/Pages/LoanWrapper/components/PrivacyChoices';
import { configureServicesHost, pathForHost } from './host-seam.js';

export * as registry from '../../src/components/Pages/LoanWrapper/loanPages';
export { CONTENT_BY_SLUG } from '../../src/components/Pages/LoanWrapper/content';
export { BKFORM_SITE_KEY, bkformTargets } from '../../src/components/Pages/LoanWrapper/bkform.config';
export { isDevHost, marketplacePartnersEndpoint, privacyRequestEndpoint } from '../../src/components/Pages/LoanWrapper/services.config';
export { REQUEST_TYPES, SIGNAL_COPY, STATUS_COPY, requestMailto, signalMessage } from '../../src/components/Pages/LoanWrapper/components/PrivacyChoices';
export { datesLine } from '../../src/components/Pages/LoanWrapper/components/LegalArticle';

const noop = () => {};

// What useLoanTrack and BkFormEmbed read from the app context. Nothing is
// tracked at build time: trackOfferEvent only runs on a click, and there are
// no clicks in a static render.
export const SNAPSHOT_CONTEXT = {
    appState: {},
    dispatchApp: noop,
    trackingState: { sid: null, pid: null, eid: null, hsid: null, gclid: null },
    dispatchTracking: noop,
};

// Which host this render is for: decides the service endpoints exactly as
// the browser's own hostname would (services.config.js).
export const configure = ({ hostname }) => configureServicesHost(hostname);

export const renderBlock = (element, { location = '/loans', partners } = {}) => renderToStaticMarkup(
    <StaticRouter location={location}>
        <AppContext.Provider value={SNAPSHOT_CONTEXT}>
            <StyleRoot>
                <MarketplacePartnersContext.Provider value={partners}>
                    {element}
                </MarketplacePartnersContext.Provider>
            </StyleRoot>
        </AppContext.Provider>
    </StaticRouter>,
);

// The live components, one renderer each. `partners` is the list fetched at
// build time ({ phase, list }) for the pages that show it.
export const render = {
    legalArticle: (page, content, { partners } = {}) =>
        renderBlock(<LegalArticle h1={page.h1} content={content} />, { location: pathForHost(page.slug), partners }),
    hub: () => renderBlock(<LegalCenterBody />, { location: pathForHost('legal-center') }),
    header: () => renderBlock(<SiteHeader variant='legal' />),
    footer: () => renderBlock(<SiteFooter />),
    hero: () => renderBlock(<Hero mockOnly />),
    trustStrip: () => renderBlock(<TrustStrip />),
    howItWorks: () => renderBlock(<HowItWorks />),
    notice: () => renderBlock(<Notice />),
    faq: () => renderBlock(<Faq />),
    legalCenterCta: () => renderBlock(<LegalCenterCta />),
    privacySignal: (state) => renderBlock(<PrivacySignalStatus state={state} />),
    browserOptOut: () => renderBlock(<BrowserOptOut />),
    privacyRequest: (endpoint) => renderBlock(<PrivacyRequest endpoint={endpoint} />),
    contactRecordsRoute: (hasForm) => renderBlock(<ContactRecordsRoute hasForm={hasForm} />),
    californiaAuthorizationRoute: (hasForm) => renderBlock(<CaliforniaAuthorizationRoute hasForm={hasForm} />),
    partnersList: (list) => renderBlock(<PartnersListView list={list} />, { partners: { phase: 'loaded', list } }),
    partnersUnavailable: () => renderBlock(<PartnersUnavailable />),
};
