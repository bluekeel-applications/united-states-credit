import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import FlowPage from '../Layout/FlowPage';
import { auto_loan_buttons } from './BUTTONS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';

const AutoLoans = () => {
    const { dispatchApp } = useContext(AppContext);
    let history = useHistory();
    const componentIsMounted = useRef(true);

    useEffect(() => {
        if (componentIsMounted.current) {
            dispatchApp({ type: 'VERTICAL_PICKED', payload: { value: 'auto_loans', crumb: 'Auto Loans' } });                
        };
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
    }, []);

    const handleFlowClick = (e, choice, texts) => {
        e.preventDefault();
        dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: choice, crumb: texts } });
        history.push('/offers');
    };

    return (
        <FlowPage>
            <span className='flow-title-text'>Select your desired type of Automobile:</span>
            <div className='flow-page__button-group'>
                {auto_loan_buttons.map((button, idx) => (
                    <Button
                        onClick={(e) => handleFlowClick(e, button.value, button.text)} 
                        variant='contained' 
                        className={`flow-button bg__${button.color}`}
                        key={`auto_loan-page_button-${idx}`}
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

export default AutoLoans;