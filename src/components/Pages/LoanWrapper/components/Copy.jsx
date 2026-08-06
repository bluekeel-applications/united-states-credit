import React from 'react';
import RouteLink from './RouteLink';
import Styles from './LegalPageLayout.css';
import useLoanTrack, { slugFromPathname } from '../useLoanTrack';

// Copy primitives for legal content bodies. Every element carries the exact
// inline styles of the reference cascade (including UA defaults the app's
// global stylesheets would otherwise override). Links are instrumented here
// so the content files stay analytics-free.
export const P = (props) => <p style={Styles.copyText} {...props} />;

export const Ul = (props) => <ul style={Styles.copyList} {...props} />;

export const Li = (props) => <li style={Styles.copyListItem} {...props} />;

export const A = ({ href, children, ...props }) => {
    const track = useLoanTrack();
    const handleClick = String(href).startsWith('mailto:')
        ? () => track('contact_clicked', { source: 'copy' })
        : undefined;
    return <a style={Styles.copyLink} href={href} onClick={handleClick} {...props}>{children}</a>;
};

export const CopyLink = ({ to, children, ...props }) => {
    const track = useLoanTrack();
    return (
        <RouteLink
            style={Styles.copyLink}
            to={to}
            onClick={() => track('copy_link_clicked', {
                label: typeof children === 'string' ? children : undefined,
                to_slug: slugFromPathname(to),
            })}
            {...props}
        >
            {children}
        </RouteLink>
    );
};

export const Callout = ({ children }) => (
    <div className='callout' style={Styles.callout}>{children}</div>
);

Callout.Strong = (props) => <strong style={Styles.calloutStrong} {...props} />;
