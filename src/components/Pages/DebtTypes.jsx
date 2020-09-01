import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import FlowPage from '../Layout/FlowPage';
import { debt_type_buttons } from './BUTTONS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';

const DebtTypes = () => {
    const { appState, dispatchApp } = useContext(AppContext);
    let history = useHistory();

    const handleFlowClick = (e, choice, texts) => {
        e.preventDefault();
        dispatchApp({ type: 'DEBT_TYPE_PICKED', payload: { value: choice, crumb: texts } });
        window.scrollTo(0, 0);
        dispatchApp({ type: 'HIDE_EXPANSION' });
        switch(choice) {
            case 'credit_card':
                history.push('/debt_amount');
                return;
            
            case 'personal_loan':
                history.push('/debt_amount');
                return;
            
            default:
                history.push('/email_optin');
                return;
        };        
    };

    return (
        <FlowPage showCrumbs={appState.showStory}>
            <span className='flow-title-text'>Your primary type of Debt is:</span>
            <div className='flow-page__button-group'>
                {debt_type_buttons.map((button, idx) => (
                    <Button
                        onClick={(e) => handleFlowClick(e, button.value, button.text)} 
                        variant='contained' 
                        className={`flow-button bg__${button.color}`}
                        key={`debt_type-page_button-${idx}`}
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

export default DebtTypes;