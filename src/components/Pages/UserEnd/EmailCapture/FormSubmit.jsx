import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Radium from 'radium';
import styles from './EmailCapture.css.js';

const FormSubmit = Radium(({ disabledState, onSubmit, onOptOut, theme }) => {

    const handleDisabledClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('enter email to submit!');
        return;
    };

    const themedButton = Object.assign({},
        styles['submitButton'],
        styles[`${theme}Button`]
    );

    return (
        <div key='email-submit-buttons' style={styles.formButtons}>
            <button
                key='submit-button-el'
                style={disabledState ? styles['disabledButton'] : themedButton}
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
})

export default memo(FormSubmit);