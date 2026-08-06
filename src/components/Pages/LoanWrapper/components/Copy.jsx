import React from 'react';
import RouteLink from './RouteLink';
import Styles from './LegalPageLayout.css';

// Copy primitives for legal content bodies. Every element carries the exact
// inline styles of the reference cascade (including UA defaults the app's
// global stylesheets would otherwise override).
export const P = (props) => <p style={Styles.copyText} {...props} />;

export const Ul = (props) => <ul style={Styles.copyList} {...props} />;

export const Li = (props) => <li style={Styles.copyListItem} {...props} />;

// eslint-disable-next-line jsx-a11y/anchor-has-content -- children arrive via spread
export const A = (props) => <a style={Styles.copyLink} {...props} />;

export const CopyLink = (props) => <RouteLink style={Styles.copyLink} {...props} />;

export const Callout = ({ children }) => (
    <div className='callout' style={Styles.callout}>{children}</div>
);

Callout.Strong = (props) => <strong style={Styles.calloutStrong} {...props} />;
