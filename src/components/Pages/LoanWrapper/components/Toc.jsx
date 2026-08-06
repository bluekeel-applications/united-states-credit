import React from 'react';
import Radium from 'radium';
import Styles from './LegalPageLayout.css';

// "On this page" sidebar — sticky at >=760px. Plain anchors so fragment
// navigation stays native (smooth via the html scroll-behavior opt-in).
const Toc = ({ sections }) => (
    <aside className='toc' style={Styles.toc}>
        <strong style={Styles.tocTitle}>On this page</strong>
        {sections.map((section) => (
            <a key={section.id} style={Styles.tocLink} href={`#${section.id}`}>
                {section.tocLabel ?? section.heading}
            </a>
        ))}
    </aside>
);

export default Radium(Toc);
