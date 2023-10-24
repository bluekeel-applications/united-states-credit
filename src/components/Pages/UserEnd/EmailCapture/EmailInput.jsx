import React, { useState, memo } from 'react';
import TextField from '@mui/material/TextField';
import Radium from 'radium';

const EmailInput = Radium(({ email, setEmail, setEmailReady }) => {
    const [ showInputError, toggleError ] = useState(false);

    const checkValidity = (email) => {
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            toggleError(false);
            setEmailReady(true);
        } else { 
            setEmailReady(false);
            toggleError(true);
        };
    };

    const handleInputChange = (event) => {
        let email = event.target.value;
        setEmail(email);
        checkValidity(email);
    };

    return (        
        <TextField
            id='email-optin-input'
            label='Email Address'
            variant='outlined'
            InputProps={{
                autoFocus: true,
                onChange: handleInputChange,
                value: email,
                error: showInputError,
                type: 'email'
            }}
            inputProps={{ 'aria-label': 'email-optin-input' }}
            fullWidth
        />
    )
});

export default memo(EmailInput);