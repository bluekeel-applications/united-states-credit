import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FlowButton = ({
    icon = [],
    text = 'fart',
    color
}) => (
    <button className={`flow-button icon__${icon.length > 0 ? icon[0] : 'hidden'} bg__${color}`}>
        {icon.length > 0 && (<FontAwesomeIcon
            icon={[icon[1], icon[2]]}
            className='flow-button-icon'
        />)}
        {text}
    </button>
);

export default FlowButton;