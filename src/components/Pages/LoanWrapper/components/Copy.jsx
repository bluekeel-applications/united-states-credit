import React from 'react';
import RouteLink from './RouteLink';
import Styles from './LegalPageLayout.css';
import useLoanTrack, { slugFromPathname } from '../useLoanTrack';
import { CONTACT_EMAIL } from '../loanPages';

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

export const H3 = ({ children, ...props }) => <h3 style={Styles.sectionH3} {...props}>{children}</h3>;

// The lead notice of a document (its `intro`): Callout is the package's green
// .usc-callout, Warning its amber .usc-warning.
export const Callout = ({ children }) => (
    <div className='callout' style={Styles.callout}>{children}</div>
);

Callout.Strong = (props) => <strong style={Styles.calloutStrong} {...props} />;

export const Warning = ({ children }) => (
    <div className='warning' style={Styles.warning}>{children}</div>
);

Warning.Strong = Callout.Strong;

// head: string[]; rows: string[][]. Scrolls sideways rather than squeezing.
export const Table = ({ head, rows }) => (
    <div className='table-wrap' style={Styles.tableWrap}>
        <table style={Styles.table}>
            <thead>
                <tr>{head.map((cell) => <th key={cell} style={Styles.tableHead}>{cell}</th>)}</tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row[0]}>{row.map((cell) => <td key={cell} style={Styles.tableCell}>{cell}</td>)}</tr>
                ))}
            </tbody>
        </table>
    </div>
);

// The closing contact block — identical in every document of the package.
// Do not add a phone number unless the business supplies one.
export const ContactBlock = () => (
    <div className='contact-block' style={Styles.contactBlock}>
        <strong style={Styles.contactStrong}>Contact UnitedStatesCredit</strong><br />
        UnitedStatesCredit.com is owned and operated by Bluekeel LLC.<br />
        899 Skokie Blvd, Ste 340, Northbrook, IL 60062<br />
        Email: <A href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</A>
    </div>
);
