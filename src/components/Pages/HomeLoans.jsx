import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import FlowPage from '../Layout/FlowPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import { home_loan_buttons } from './BUTTONS';
import CloseFlow from '../Shared/CloseFlow';

const HomeLoans = () => {
    const { dispatchApp } = useContext(AppContext);
    let history = useHistory();    
    const componentIsMounted = useRef(true);

    useEffect(() => {
            if (componentIsMounted.current) {
                dispatchApp({ type: 'VERTICAL_PICKED', payload: { value: 'home_loans', crumb: 'Home Loans' } });                
            };
        // Clean-up Function
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
    }, []);

    const handleFlowClick = (e, choice, texts) => {
        e.preventDefault();
        dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: choice, crumb: texts } });
        window.scrollTo(0, 0);
        history.push('/offers');
    };

    return (
        <FlowPage showCrumbs>
            <div className='flow-content'>
                <CloseFlow />
                <span className='flow-title-text'>Select Loan Type:</span>
                <div className='flow-page__button-group'>
                    {home_loan_buttons.map((button, idx) => (
                        <Button
                            onClick={(e) => handleFlowClick(e, button.value, button.text)} 
                            variant='contained' 
                            className={`flow-button bg__${button.color}`}
                            key={`home_loans-page_button-${idx}`}
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

export default HomeLoans;