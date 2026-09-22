// Tiny indirection so site-entry.jsx reads as a list of what it renders: the
// services seam and the route helper come from the site's own modules.
export { configureServicesHost } from '../../src/components/Pages/LoanWrapper/services.config';
export { pathFor as pathForHost } from '../../src/components/Pages/LoanWrapper/loanPages';
