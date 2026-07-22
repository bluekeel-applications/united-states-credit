import React, { memo } from 'react';
import ButtonGroup from './ButtonGroup';
import styles from './FourButton.css.js';
import Radium from 'radium';

const FourButton = Radium(({ offer, tracking, email }) => (
    <div style={styles.main}>
        <div style={styles.header}>
            Multiple sponsored results could be available that suit your needs.
        </div>
        <div style={styles.sponsored}>View Sponsored Offers</div>
        <ButtonGroup 
            buttons={offer.four_button}
            tracking={tracking}
            email={email}
        />
    </div>
));

export default memo(FourButton);