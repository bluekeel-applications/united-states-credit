import React from 'react';

const OptinButton = ({color, value, handleClick, isEmail, disabled}) => (
    <button 
        className={`${isEmail ? 'optin__button_email' : 'optin__button'} bg__${color}`}
        onClick={(e) => handleClick(e)}
        disabled={disabled}
    >
        {value}
    </button>
);

export default OptinButton;