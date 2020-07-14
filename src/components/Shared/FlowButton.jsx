import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';

const FlowButton = ({
    icon = [],
    text = 'fart',
    color,
    click
}) => (
    <Button onClick={click} variant='contained' className={`flow-button icon__${icon.length > 0 ? icon[0] : 'hidden'} bg__${color} ${text === 'Get Started' ? 'is_start' : null}`}>
        {icon.length > 0 && (<FontAwesomeIcon
            icon={[icon[1], icon[2]]}
            className='flow-button-icon'
        />)}
        {text}
    </Button>
);

export default FlowButton;