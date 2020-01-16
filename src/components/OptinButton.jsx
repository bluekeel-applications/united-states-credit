import React from 'react';
import Zoom from 'react-reveal/Zoom';

const OptinButton = ({color, value, handleClick, isEmail, disabled}) => (
    <Zoom>
        <button 
            className={`${isEmail ? 'optin__button_email' : 'optin__button'} bg__${color}`}
            onClick={(e) => handleClick(e)}
            disabled={disabled}
        >
            {value}
        </button>
    </Zoom>
);

export default OptinButton;