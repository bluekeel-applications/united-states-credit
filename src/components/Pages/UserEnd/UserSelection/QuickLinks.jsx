import React, { memo } from 'react';
import styles from './UserSelection.css.js';
import Radium from 'radium';
import LinkButton from './LinkButton';

const QuickLinks = Radium(({ program_id, tracking, email, quickLinks, theme, setOfferGroup }) => {

    // const longListStyle = Object.assign({},
    //     styles['linksContainer'],
    //     styles['scrollBox']
    // );

    return (
        // <div style={quickLinks.length > 6 ? longListStyle : styles['linksContainer']}>
        <div style={styles['linksContainer']}>
            {quickLinks.length > 0 && (quickLinks.map((link, idx) => (
                <LinkButton
                    idx={idx}
                    key={`quick-link-${idx}`}
                    link={link}
                    theme={theme}
                    tracking={tracking}
                    email={email}
                    setOfferGroup={setOfferGroup}
                    program_id={program_id}
                />
            )))}
        </div>
    )
});

export default memo(QuickLinks);