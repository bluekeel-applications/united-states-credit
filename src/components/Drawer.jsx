import React, { useContext } from 'react';
import { AppContext } from '../context';
import { LinkContainer } from "react-router-bootstrap";
import { Container, Row, Col, Nav, NavItem } from "react-bootstrap";

const Drawer = () => {
    const { appState, dispatchApp } = useContext(AppContext);

    const backdropStyle = {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        left: '0',
        top: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    };

    const closeDrawer = () => {
        dispatchApp({ type: 'HIDE_DRAWER' });
    };

    return (        
        appState.showDrawer ? (
            <Container style={backdropStyle} fluid>
                <Row>
                    <Col onClick={closeDrawer} />
                    <Col xs={12} md={2} className='drawer-container'>                            
                        <Nav className='flex-column'>
                            <LinkContainer to='/'>
                                <NavItem>Start your visual credit search</NavItem>
                            </LinkContainer>
                            <LinkContainer to='/'>
                                <NavItem>Find a Loan</NavItem>
                            </LinkContainer>
                            <LinkContainer to='/'>
                                <NavItem>Find a Credit Card</NavItem>
                            </LinkContainer>
                            <LinkContainer to='/'>
                                <NavItem>Customer Reviews</NavItem>
                            </LinkContainer>
                            <LinkContainer to='/'>
                                <NavItem>Our Credit Blog</NavItem>
                            </LinkContainer>
                            <LinkContainer to='/'>
                                <NavItem>Contact Us</NavItem>
                            </LinkContainer>                                
                        </Nav>                                
                    </Col>
                </Row>
            </Container>
        ) : null        
    )
};

export default Drawer;