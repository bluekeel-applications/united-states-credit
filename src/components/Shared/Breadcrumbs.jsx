import React, { useContext } from 'react';
import { AppContext } from '../../context';
import Crumb from './Crumb';

const Breadcrumbs = ({ final }) => {
    const { appState } = useContext(AppContext);
    const { vertical, loan_type } = appState.flowState;
    const verticalCrumb = appState.breadcrumbs.vertical;
    const loanTypeCrumb = appState.breadcrumbs.loan_type;
    const debtTypeCrumb = appState.breadcrumbs.debt_type;
    const debtAmountCrumb = appState.breadcrumbs.debt_amount;
    const debtOptinCrumb = appState.flowState.debt_optin;

    const renderVertical = () => (
        <div className='crumb-box'>
            <b className='mobile-breadcrumb-key'>{final ? 'I\'m interested in ' : 'Search:'}</b>
            <Crumb text={verticalCrumb} path='verticals' />
        </div>
    );
    
    const renderType = () => {
        switch(vertical) {
            case 'auto_loans':
                return (
                    <div className='crumb-box'>
                        for a  
                        <Crumb text={loanTypeCrumb} path={vertical} />
                    </div>
                )
            case 'credit_cards':
                return (
                    <div className='crumb-box'>
                        with   
                        <Crumb text={loanTypeCrumb} path={vertical} />
                        benefits
                    </div>
                )
            case 'personal_loans':
                return (
                    <div className='crumb-box'>
                        to help with 
                        <Crumb text={loanTypeCrumb} path={vertical} />
                    </div>
                )
            case 'home_loans':
                return (
                    <div className='crumb-box'>
                        to  
                        <Crumb text={loanTypeCrumb} path={vertical} />
                    </div>
                )
            default:
                return null;
        }
    };

    const renderDebtType = () => (
        <div className='crumb-box'>
            of your  
            <Crumb text={debtTypeCrumb} path='debt_types' />
        </div>
    );

    const renderDebtAmount = () => (
        <div className='crumb-box'>
            totaling  
            <Crumb text={debtAmountCrumb} path='debt_amount' />
        </div>
    );

    const renderDebtOptin = () => (
        <div className='crumb-box'>
            , and <Crumb text='Consolidate Debt' path='debt_optin' />.
        </div>
    );

    return (
        vertical && (
            <div className='breadcrumb-container'>
                <div className='breadcrumb-row'>
                    {renderVertical()}
                    {loan_type && loan_type !== 'N/A' && renderType()}
                    {debtOptinCrumb && renderDebtOptin()}
                </div>
                {debtTypeCrumb && (
                    <div className='breadcrumb-row'>                   
                        {renderDebtType()}
                        {debtAmountCrumb && renderDebtAmount()}
                    </div>                
                )}                
            </div>
        )
    )
};

export default Breadcrumbs;