import React, { useState, useEffect } from 'react';
import styles from './OptInESP.css.js';
import EmailInput from './EmailInput';
import NameInput from './NameInput';
import Terms1 from './Terms1';
import Terms2 from './Terms2';
import FormSubmit from './FormSubmit';

const OptInESP = () => {
    const [ showResult, setShowResult ] = useState(false);
    const [ disabled, setDisabledState ] = useState(true);
    const [ emailReady, setEmailReady ] = useState(false);
    const [ term1Checked, setTerm1Checked ] = useState(false);
    const [ term2Checked, setTerm2Checked ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ name, setName ] = useState('');

    useEffect(() => {
        if(term1Checked && term2Checked && emailReady && name !== '') {
            setDisabledState(false);
            return;
        };
        setDisabledState(true);
    },[term1Checked, term2Checked, emailReady, name]);

    const handleSubmitClick = (e) => {
        e.preventDefault();
        setShowResult(true);
    };
    
    const handleOptOutClick = (e) => {
        e.preventDefault();
        alert('Sorry to see you go. Come back for more offers whenever you like.')
    };

    return(
        <div style={styles.mainContainer}>
            {showResult ? (
                <div style={styles.formCard}>
                    <div key='result-form-header' style={styles.formText}>
                        Congratulations!
                    </div>  
                    <div key='result-form-text' style={styles.formSubText}>
                        You have been successfully added to our email list. Look out for daily offers in your inbox.
                    </div>  
                </div>
            ):
            (<div key='email-form' style={styles.formCard}>
                <div key='email-form-text' style={styles.formText}>
                    Join Us Today!
                </div>     
                <form style={styles.formEl}>                                
                    <NameInput
                        name={name}
                        setName={setName}
                    />
                    <EmailInput
                        email={email}
                        setEmail={setEmail}
                        setEmailReady={setEmailReady}
                    />
                    <Terms1 checked={term1Checked} setChecked={setTerm1Checked} />
                    <Terms2 checked={term2Checked} setChecked={setTerm2Checked} />
                    <FormSubmit
                        disabledState={disabled}
                        onSubmit={(e) => handleSubmitClick(e)}
                        onOptOut={(e) => handleOptOutClick(e)}
                    />
                </form>
            </div>)}
        </div>
    )
};

export default OptInESP;