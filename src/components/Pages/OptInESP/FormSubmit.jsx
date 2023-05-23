import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Radium from 'radium';
import styles from './OptInESP.css.js';

const FormSubmit = ({ disabledState, onSubmit, onOptOut }) => {

    const handleDisabledClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('enter email to submit!');
        return;
    };

    return (
        <div key='email-submit-buttons' style={styles.formButtons}>
            <button
                key='submit-button-el'
                style={disabledState ? styles['disabledButton'] : styles['submitButton']}
                onClick={disabledState ? handleDisabledClick : onSubmit}
            >
                <span key='submit-button-text' style={styles.buttonText}>Next</span>
                <FontAwesomeIcon
                    key='submit-button-icon'
                    icon={['fal', 'angle-double-right']}
                    style={styles.submitButtonIcon}
                />
            </button>
            <button key='no-submit-button' style={styles.noButton} onClick={onOptOut}>
                No Thanks
			</button>
        </div>
    );
}

export default Radium(FormSubmit);