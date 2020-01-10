import React from 'react';

const OptinButton = ({color, value, handleClick}) => (
    <button 
        className={`optin__button bg__${color}`}
        onClick={(e) => handleClick(e)}
    >
        {value}
    </button>
);

export default OptinButton;