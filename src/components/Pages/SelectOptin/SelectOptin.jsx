import React, { useContext } from 'react';
import { AppContext } from '../../../context';
import { useHistory } from 'react-router-dom';
import CheckingOptin from '@bit/bluekeel.component-library.checking-optin';
import DebtOptin from '@bit/bluekeel.component-library.debt-optin';

const SelectOptin = ({ type }) => {
    let history = useHistory();
    const { dispatchApp, appState } = useContext(AppContext);

    const handlerFunctions = {
        handleYes: () => {
            dispatchApp({ type: type === 'debt' ? 'DEBT_OPT_IN' : 'CHECKING_OPT_IN' });
            window.scrollTo(0, 0);
            history.push('/email_optin');
        },
        handleNo: () => {
            window.scrollTo(0, 0);
            history.push('/checking');
        }
    };

    return (
        type === 'checking' ? 
        <CheckingOptin handlers={handlerFunctions}/> :
        <DebtOptin handlers={handlerFunctions} loan_type={appState.breadcrumbs['loan_type']} />
    )
};

export default SelectOptin;