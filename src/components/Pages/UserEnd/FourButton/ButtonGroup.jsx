import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useClickSubmit from '../utils/useClickSubmit';
import { flattenLongString } from '@bit/bluekeel.controllers.helpers';
import { buildKeywordLink } from '../../../../utils/helpers';
import styles from './FourButton.css.js';
import Loading from '../../../Shared/Loading';
import Radium from 'radium';

const ButtonGroup = ({ buttons, tracking, email }) => {
    let history = useHistory();
    const [ shouldExecute, setExecute ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    useClickSubmit(tracking, email, shouldExecute);

    const handleOfferClick = (button) => {
        const linkout = buildKeywordLink(button.url, tracking, flattenLongString(button.text));
        const jumpBehind = buildKeywordLink(button.jump, tracking, flattenLongString(button.text));
        setLoading(true);
        setExecute(true);
        let newTab = window.open();
        newTab.location = linkout;
        if (jumpBehind && jumpBehind !== 'N/A') {
            window.location.href = jumpBehind;
        } else {
            history.push('/verticals');
        };
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <Loading />
            </div>
        )
    };

    return(
        <div style={styles.buttonGroup}>
            {buttons.map((button, idx) => (
                <button
                    style={{...styles['button'], ...styles[`button_${idx}`]}}
                    onClick={() => handleOfferClick(button)}  
                    key={`four_button-item-${idx}`}
                >
                    <div style={styles.iconContainer}>
                        <FontAwesomeIcon
                            icon={['fal', 'angle-double-right']}
                            style={styles.icon}
                        />
                    </div>
                    <div style={styles.textContainer}>
                        {button.text}
                    </div>
                </button>
            ))}
        </div>
    )
};

export default Radium(ButtonGroup);