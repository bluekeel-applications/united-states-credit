import React from 'react';
import { useHistory } from 'react-router-dom';
import FlowPage from '../Layout/FlowPage';
import { vertical_buttons } from './BUTTONS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';

const Verticals = () => {
    let history = useHistory();

    const handleVerticalClick = (e, choice) => {
        e.preventDefault();
        history.push('/' + choice);
        window.scrollTo(0, 0);
    };

    return (
        <FlowPage>
            <div className='flow-content'>
                <span className='flow-title-text'>Select one of the options below:</span>            
                <div className='flow-page__button-group'>
                    {vertical_buttons.map((button, idx) => (
                        <Button
                            onClick={(e) => handleVerticalClick(e, button.value)} 
                            variant='contained' 
                            className={`flow-button bg__${button.color}`}
                            key={`vertical-page_button-${idx}`}
                        >
                            {button.icon.length > 0 && (<FontAwesomeIcon
                                icon={[button.icon[1], button.icon[2]]}
                                className='flow-button-icon'
                            />)}
                            {button.text}
                        </Button>
                    ))}
                </div>
            </div>
        </FlowPage>
    )
};

export default Verticals;