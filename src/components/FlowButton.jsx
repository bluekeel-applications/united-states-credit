import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Fade from 'react-reveal/Fade';

const FlowButton = ({
    icon = [],
    text = 'fart',
    color
}) => (
    <Fade big opposite>
        <button className={`flow-button icon__${icon.length > 0 ? icon[0] : 'hidden'} bg__${color}`}>
            {icon.length > 0 && (<FontAwesomeIcon
                icon={[icon[1], icon[2]]}
                className='flow-button-icon'
            />)}
            {text}
        </button>
    </Fade>
);

export default FlowButton;