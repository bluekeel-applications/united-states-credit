import React from 'react';
import Button from '@material-ui/core/Button';

const OptinButton = ({color, value, handleClick, isEmail, disabled}) => (
    <Button 
        className={`${isEmail ? 'optin__button_email' : 'optin__button'} bg__${color}`}
        onClick={(e) => handleClick(e)}
        disabled={disabled}
    >
        {value}
    </Button>
);

export default OptinButton;