import React, { useContext } from 'react';
import { AppContext } from '../../context';
import Crumb from './Crumb';

const MobileCrumbs = ({ final }) => {
    const { appState } = useContext(AppContext);
    const { vertical, loan_type } = appState.flowState;
    const verticalCrumb = appState.breadcrumbs.vertical;
    const loanTypeCrumb = appState.breadcrumbs.loan_type;
    const debtTypeCrumb = appState.breadcrumbs.debt_type;
    const debtAmountCrumb = appState.breadcrumbs.debt_amount;
    
    const renderVertical = () => (
        <div className='mobile-crumb-box'>
            <b className='mobile-breadcrumb-key'>{final ? 'I\'m interested in ' : 'Search:'}</b>
            <Crumb text={verticalCrumb} path='verticals' />
        </div>
    );
    
    const renderType = () => {
        switch(vertical) {

            case 'auto_loans':
                return (
                    <div className='mobile-crumb-box'>
                        for a  
                        <Crumb text={loanTypeCrumb} path={vertical} />
                    </div>
                )

            case 'credit_cards':
                return (
                    <div className='mobile-crumb-box'>
                        with   
                        <Crumb text={loanTypeCrumb} path={vertical} />
                        benefits.
                    </div>
                )

            case 'personal_loans':
                return (
                    <div className='mobile-crumb-box'>
                        to help with 
                        <Crumb text={loanTypeCrumb} path={vertical} />
                    </div>
                )

            case 'home_loans':
                return (
                    <div className='mobile-crumb-box'>
                        to  
                        <Crumb text={loanTypeCrumb} path={vertical} />
                    </div>
                )

            default:
                return null;
        }
    };

    const renderDebtType = () => (
        <div className='mobile-crumb-box'>
            of your  
            <Crumb text={debtTypeCrumb} path='debt_types' />
        </div>
    );

    const renderDebtAmount = () => (
        <div className='mobile-crumb-box'>
            totaling  
            <Crumb text={debtAmountCrumb} path='debt_amount' />
        </div>
    );

    return (
        vertical && (
            <div className='mobile-breadcrumb-container'>
                <div className='mobile-breadcrumb-row'>
                    {renderVertical()}<br />
                    {loan_type && renderType()}
                </div>
                {debtTypeCrumb && (
                    <div className='mobile-breadcrumb-row'>                   
                        {renderDebtType()}
                        {debtAmountCrumb && renderDebtAmount()}
                    </div>                
                )}
            </div>
        )
    )
};

export default MobileCrumbs;