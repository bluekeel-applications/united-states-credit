import React, { useContext } from 'react';
import { AppContext } from '../context';
import Crumb from './Crumb';

const Breadcrumbs = () => {
    const { appState } = useContext(AppContext);
    const { vertical, loan_type, debt_type, debt_amount} = appState.breadcrumbs;

    const renderVertical = () => (
        <div className='crumb-box'>
            I am looking for 
            <Crumb text={vertical} path='verticals' />
        </div>
    );
    
    const renderType = () => {
        const vertical = appState.flowState.vertical;
        switch(vertical) {

            case 'auto_loans':
                return (
                    <div className='crumb-box'>
                        for a  
                        <Crumb text={loan_type} path={appState.flowState.vertical} />
                    </div>
                )

            case 'credit_cards':
                return (
                    <div className='crumb-box'>
                        with   
                        <Crumb text={loan_type} path={appState.flowState.vertical} />
                        benefits.
                    </div>
                )

            case 'personal_loans':
                return (
                    <div className='crumb-box'>
                        to help with 
                        <Crumb text={loan_type} path={appState.flowState.vertical} />
                    </div>
                )

            case 'home_loans':
                return (
                    <div className='crumb-box'>
                        to  
                        <Crumb text={loan_type} path={appState.flowState.vertical} />
                    </div>
                )

            default:
                return null;
        }
        return (
            <div className='crumb-box'>
                with 
                <Crumb text={loan_type} path={appState.flowState.vertical} />
                benefits.
            </div>
        )
    }

    return (
        appState.flowState.vertical && (
            <div className='breadcrumb-container'>
                {renderVertical()}
                {appState.flowState.loan_type && renderType()}
            </div>
        )
    )
};

export default Breadcrumbs;