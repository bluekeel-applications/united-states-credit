import React, { useContext } from 'react';
import { AppContext } from '../../context';
import OptinButton from '../OptinButton';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Zoom from 'react-reveal/Zoom';
import Breadcrumbs from '../Breadcrumbs';

const CheckingOptin = () => {
    const { appState, dispatchApp } = useContext(AppContext);    
    let history = useHistory();

    const renderNextPage = () => {
        let currently = appState.flowState.vertical;
        switch(currently) {
            case 'personal_loans':                
                history.push('/email_optin');
                break;            
            
            case 'credit_cards':                
                history.push('/email_optin');
                break;            
            
            default:
                history.push('/offers');
        }
    };

    const opt_IN = () => {
        dispatchApp({ type: 'CHECKING_OPT_IN' });
        renderNextPage();
    };

    const opt_OUT = () => {
        dispatchApp({ type: 'CHECKING_OPT_OUT' });
        renderNextPage();
    };

    return (
        <>
        <Breadcrumbs />
        <Zoom>
            <Container className='optin-container' fluid>
                <Row className='optin-row row1'>
                    <Col className='optin-header-text'>
                        <b>Banks are paying $100s</b> to new checking customers.<br />
                        Would you like to see free checking account options?
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
                    <Col sm='12' md='4'>
                        <div className='article-heading'>Why do you need a checking account?</div>
                        <div className='article-content'>
                            There are many benefits a checking account can provide.  As technology and security are changing everyday so are checking accounts.  The key is knowing exactly why having a checking account is so important.  Here are just a couple quick tips.
                        </div>
                    </Col>
                    <Col sm='12' md='4' className='article-content'>
                        <div className='article-sub-heading'>Convenience:</div>
                        <ul>
                            <li>Transfer and spend money without the inconvenience carrying cash</li>
                            <li>Accounts with a debit card make purchases easy or the ability to withdraw funds at an ATM</li>
                            <li>Your paycheck can be directly deposited into your account for faster access to your funds</li>
                            <li>Online banking makes it easy to pay your bills without having to write a check</li>
                        </ul>
                    </Col>
                    <Col sm='12' md='4' className='article-content'>
                        <div className='article-sub-heading'>Safety:</div>
                        <ul>
                            <li>Having a debit card or checks are much safer than carrying around cash</li>
                            <li>Showing a cancelled check is proof of payment on a bill</li>
                            <li>Funds in your checking account are insured up $250,000 per depositor by the FDIC</li>
                            <li>Finally, having a personal checking account is a great way to establish and maintain your credit. This is very important when you’re ready for a bigger purchase like an automobile or a home.</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </Zoom>
        </>
    )
};

export default CheckingOptin;