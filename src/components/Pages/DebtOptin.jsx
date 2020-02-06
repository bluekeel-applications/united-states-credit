import React, { useContext } from 'react';
import { AppContext } from '../../context';
import OptinButton from '../OptinButton';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Zoom from 'react-reveal/Zoom';
import Breadcrumbs from '../Breadcrumbs';

const DebtOptin = () => {
    const { dispatchApp } = useContext(AppContext);    
    let history = useHistory();

    const opt_IN = () => {
        dispatchApp({ type: 'DEBT_OPT_IN' });
        history.push('/email_optin');
    };

    const opt_OUT = () => {
        dispatchApp({ type: 'DEBT_OPT_OUT' });
        history.push('/checking_optin');
    };

    return (
        <>
        <Breadcrumbs />
        <Zoom>
            <Container className='optin-container' fluid>
                <Row className='optin-row row1'>
                    <Col className='optin-header-text'>
                        Would you like a loan to consolidate debt <b><em>and</em></b> Pay Taxes?
                    </Col>
                </Row>
                <Row className='optin-row row2'>
                    <OptinButton 
                        color='blue' 
                        value='Yes' 
                        handleClick={opt_IN}
                    />
                    <OptinButton 
                        color='light_blue' 
                        value='No' 
                        handleClick={opt_OUT}
                    />
                </Row>
                <Row className='optin-row  row3'>
                    <div className='debt-article-heading'>{`Debt Consolidation & Debt Settlement`}</div>
                    <div className='article-content sub'>
                        <div className='article-content-item'>
                            Debt consolidation is simply bundling all your high interest debt into one easy and manageable payment at a reduced interest rate. It won’t have a negative impact your credit score but it also will not reduce the amount that you owe. In addition, you will usually need to have good credit to qualify for this type of program. This is a great solution for those with healthy credit who want simplify their payments and reduce the interest they are currently paying on their debts.
                        </div>
                        <div className='article-content-item'>
                            Debt settlement, also referred to as debt negotiation or debt resolution, is when you negotiate with creditors to pay less than what you owe on your outstanding debt. This type of serviced is designed for people who cannot make required minimum payments and/or are considering bankruptcy. Debt Settlement will have a negative impact on your credit score but chances are your credit has already been tarnished at this point in the game. It may help people resolve debts relatively quickly.
                        </div>
                    </div>

                    <div className='debt-article-heading'>Types of Debt that Qualify</div>
                    <div className='article-content sub'>
                        <div className='article-content-item'>The types of debt that qualify are unsecured debts of $10,000 or more.</div>
                        <div className='article-content-item'>This includes: <b>Credit Card Debt, Personal Loan Debt, Medical Debt</b></div>
                        <div className='article-content-item'>This Does Not include: Auto Loans, Home Loans</div>
                    </div>
                </Row>
            </Container>
        </Zoom>
        </>
    )
};

export default DebtOptin;