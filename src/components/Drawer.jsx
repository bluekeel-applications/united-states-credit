import React, { useContext } from 'react';
import { AppContext } from '../context';
import { LinkContainer } from "react-router-bootstrap";
import { Container, Row, Col, Nav, NavItem } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

const Drawer = () => {
    const { appState, dispatchApp } = useContext(AppContext);
    let history = useHistory();

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
    
    const jumpToVertical = (vertical) => {
        history.push('/'+ vertical);
    };

    return (        
        appState.showDrawer ? (
            <Container style={backdropStyle} fluid>
                <Row>
                    <Col onClick={closeDrawer} />
                    <Col xs={12} md={2} className='drawer-container'>                            
                        <Nav className='flex-column'>
                            <LinkContainer 
                                to='/verticals' 
                                className='drawer-list-item'
                            >
                                <NavItem>Start Visual Credit Search</NavItem>
                            </LinkContainer>
                            <LinkContainer 
                                to='/personal_loans' 
                                className='drawer-list-item' 
                                onClick={() => jumpToVertical('personal_loans')}
                            >
                                <NavItem>Find a Loan</NavItem>
                            </LinkContainer>
                            <LinkContainer 
                                to='/credit_cards' 
                                className='drawer-list-item'
                                onClick={() => jumpToVertical('credit_cards')}
                            >
                                <NavItem>Find a Credit Card</NavItem>
                            </LinkContainer>
                            <a 
                                href='https://unitedstatescredit.blog/category/reviews/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='drawer-list-item'
                            >
                                <NavItem>Customer Reviews</NavItem>
                            </a>
                            <a 
                                href='https://unitedstatescredit.blog/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='drawer-list-item'
                            >
                                <NavItem>Blog</NavItem>
                            </a>
                            {/* <LinkContainer 
                                to='/' 
                                className='drawer-list-item'
                            >
                                <NavItem>Contact Us</NavItem>
                            </LinkContainer>                                 */}
                        </Nav>                                
                    </Col>
                </Row>
            </Container>
        ) : null        
    )
};

export default Drawer;