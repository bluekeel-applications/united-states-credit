import React from 'react';
import Radium from 'radium';
import RouteLink from './RouteLink';
import Styles from './LegalPageLayout.css';
import { LOANS_HOME, pathFor } from '../loanPages';
import useLoanTrack from '../useLoanTrack';

// Home / Legal Center / {current} — on the Legal Center page itself (no
// `current`), the trail ends at plain-text "Legal Center".
const Breadcrumbs = ({ current }) => {
    const track = useLoanTrack();

    return (
    <div className='breadcrumbs' style={Styles.breadcrumbs}>
        <RouteLink style={Styles.breadcrumbLink} to={LOANS_HOME} onClick={() => track('breadcrumb_clicked', { label: 'Home', to_slug: 'home' })}>Home</RouteLink>
        {' / '}
        {current ? (
            <>
                <RouteLink style={Styles.breadcrumbLink} to={pathFor('legal-center')} onClick={() => track('breadcrumb_clicked', { label: 'Legal Center', to_slug: 'legal-center' })}>Legal Center</RouteLink>
                {' / '}
                {current}
            </>
        ) : 'Legal Center'}
    </div>
    );
};

export default Radium(Breadcrumbs);
