import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import FlowPage from '../Layout/FlowPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import { debt_amount_buttons } from './BUTTONS';
import CloseFlow from '../Shared/CloseFlow';

const DebtAmounts = () => {
    const { dispatchApp } = useContext(AppContext);
    let history = useHistory();

    const handleFlowClick = (e, choice, texts) => {
        e.preventDefault();
        dispatchApp({ type: 'DEBT_AMOUNT_PICKED', payload: { value: choice, crumb: texts } });
        window.scrollTo(0, 0);
        history.push('/email_optin');
    };

    return (
        <FlowPage>
            <div className='flow-content'>
                <CloseFlow />
                <span className='flow-title-text'>Your total Amount of Debt is:</span>
                <div className='flow-page__button-group'>
                    {debt_amount_buttons.map((button, idx) => (
                        <Button
                            onClick={(e) => handleFlowClick(e, button.value, button.text)} 
                            variant='contained' 
                            className={`flow-button bg__${button.color}`}
                            key={`debt_amount-page_button-${idx}`}
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

export default DebtAmounts;