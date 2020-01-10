// eslint-disable-next-line
import React, { useContext } from 'react';
// import { AppContext } from '../context';
import OptinButton from './OptinButton';
import { Container, Row, Col } from 'react-bootstrap';

const CheckingOptin = () => {
    // const { dispatchApp } = useContext(AppContext);    

    const opt_IN = () => {

    }

    const opt_OUT = () => {

    }

    return (
        <Container className='optin-container' fluid>
            <Row className='checking-optin-row row1'>
                <Col className='optin-header-text'>
                    <b>Banks are paying $100s</b> to new checking customers.<br />
                    Would you like to see free checking account options?
                </Col>
            </Row>
            <Row className='checking-optin-row row2'>
                {/* <Col > */}
                    <OptinButton 
                        color='blue' 
                        value='Yes' 
                        handleClick={opt_IN}
                    />
                {/* </Col>
                <Col > */}
                    <OptinButton 
                        color='light_blue' 
                        value='No' 
                        handleClick={opt_OUT}
                    />
                {/* </Col> */}
            </Row>
            <Row className='checking-optin-row  row3'>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>
        </Container>
    )
};

export default CheckingOptin;