import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import FlowPage from '../Layout/FlowPage';
import { vertical_buttons } from './BUTTONS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';

const Verticals = () => {
    let history = useHistory();
    const { dispatchApp } = useContext(AppContext);

    const handleVerticalClick = (e, choice) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        dispatchApp({ type: 'HIDE_EXPANSION' });
        history.push('/' + choice);
    };

    return (
        <FlowPage showCrumbs={false}>
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
        </FlowPage>
    )
};

export default Verticals;