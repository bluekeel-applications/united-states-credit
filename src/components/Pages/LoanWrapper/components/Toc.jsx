import React from 'react';
import Radium from 'radium';
import Styles from './LegalPageLayout.css';
import useLoanTrack from '../useLoanTrack';

// "On this page" sidebar — sticky at >=760px. Plain anchors so fragment
// navigation stays native (smooth via the html scroll-behavior opt-in).
const Toc = ({ sections }) => {
    const track = useLoanTrack();

    return (
    <aside className='toc' style={Styles.toc}>
        <strong style={Styles.tocTitle}>On this page</strong>
        {sections.map((section) => (
            <a
                key={section.id}
                style={Styles.tocLink}
                href={`#${section.id}`}
                onClick={() => track('toc_link_clicked', { section: section.id, label: section.tocLabel ?? section.heading })}
            >
                {section.tocLabel ?? section.heading}
            </a>
        ))}
    </aside>
    );
};

export default Radium(Toc);
