import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import ContentWrapper from '@bit/bluekeel.component-library.content-wrapper';
import Radium from 'radium';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import { debt_amount_buttons } from './BUTTONS';
import QuestionTitle from '../Shared/QuestionTitle';

const DebtAmounts = () => {
    const { appState, dispatchApp } = useContext(AppContext);
    let history = useHistory();

    const handleFlowClick = (e, choice, texts) => {
        e.preventDefault();
        dispatchApp({ type: 'DEBT_AMOUNT_PICKED', payload: { value: choice, crumb: texts } });
        window.scrollTo(0, 0);
        dispatchApp({ type: 'HIDE_EXPANSION' });
        history.push('/email_optin');
    };

    return (
        <ContentWrapper
            key='debt-amount'
            crumbs={{
                verticalCrumb: appState.breadcrumbs.vertical,
                loanTypeCrumb: appState.breadcrumbs.loan_type,
                debtTypeCrumb: appState.breadcrumbs.debt_type,
            }}
            flow={{ vertical: appState.vertical, loan_type: appState.loan_type }}
            theme='usc'
        >
            <QuestionTitle text={'Your total Amount of Debt is:'} />
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
        </ContentWrapper>
    )
};

export default Radium(DebtAmounts);