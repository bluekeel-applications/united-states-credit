import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import FlowPage from '../Layout/FlowPage';
import { personal_loan_buttons } from './BUTTONS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';

const PersonalLoans = () => {
    const { dispatchApp } = useContext(AppContext);
    let history = useHistory();

    const componentIsMounted = useRef(true);

    useEffect(() => {
        if (componentIsMounted.current) {
            dispatchApp({ type: 'VERTICAL_PICKED', payload: { value: 'personal_loans', crumb: 'Personal Loans' }});                
        };
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
    }, []);

    const handleFlowClick = (e, choice, texts) => {
        e.preventDefault();
        dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: choice, crumb: texts } });
        window.scrollTo(0, 0);
        switch(choice) {
            case 'debt_consolidation':
                history.push('/debt_types');
                break;

            case 'pay_taxes':
                history.push('/email_optin');
                break;
            
            default:
                history.push('/debt_optin');
        }
    };

    return (
        <FlowPage>
            <div className='flow-content'>
                <span className='flow-title-text'>Select Loan Purpose:</span>
                <div className='flow-page__button-group'>
                    {personal_loan_buttons.map((button, idx) => (
                        <Button
                            onClick={(e) => handleFlowClick(e, button.value, button.text)} 
                            variant='contained' 
                            className={`flow-button bg__${button.color}`}
                            key={`personal_loans-page_button-${idx}`}
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

export default PersonalLoans;