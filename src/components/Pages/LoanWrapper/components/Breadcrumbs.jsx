import React from 'react';
import Radium from 'radium';
import RouteLink from './RouteLink';
import Styles from './LegalPageLayout.css';
import { LOANS_HOME, pathFor } from '../loanPages';

// Home / Legal Center / {current} — on the Legal Center page itself (no
// `current`), the trail ends at plain-text "Legal Center".
const Breadcrumbs = ({ current }) => (
    <div className='breadcrumbs' style={Styles.breadcrumbs}>
        <RouteLink style={Styles.breadcrumbLink} to={LOANS_HOME}>Home</RouteLink>
        {' / '}
        {current ? (
            <>
                <RouteLink style={Styles.breadcrumbLink} to={pathFor('legal-center')}>Legal Center</RouteLink>
                {' / '}
                {current}
            </>
        ) : 'Legal Center'}
    </div>
);

export default Radium(Breadcrumbs);
