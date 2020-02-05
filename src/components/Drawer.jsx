import React, { useContext } from 'react';
import { AppContext } from '../context';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Row, Col, Nav, NavItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

    const handleLinkOutClick = (url, e) => {
        e.preventDefault();
        window.open(url, '_blank');
        dispatchApp({ type: 'HIDE_DRAWER' });
    };

    const closeDrawer = () => {
        dispatchApp({ type: 'HIDE_DRAWER' });
    };

    return (        
        appState.showDrawer ? (
            <Container style={backdropStyle} fluid>
                <Row>
                    <Col onClick={closeDrawer} />
                    <Col xs={10} md={3} className='drawer-container'>                            
                        <Nav className='flex-column'>
                            <LinkContainer 
                                to='/verticals' 
                                className='drawer-list-item'
                                onClick={closeDrawer}
                            >
                                <NavItem>
                                <FontAwesomeIcon
                                    icon={['fal', 'search-dollar']}
                                    className='drawer-button-icon'
                                />
                                    Start a Visual Credit Search
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer 
                                to='/personal_loans' 
                                className='drawer-list-item' 
                                onClick={closeDrawer}
                            >
                                <NavItem>
                                <FontAwesomeIcon
                                    icon={['fal', 'hand-holding-usd']}
                                    className='drawer-button-icon'
                                />   
                                    Find a Loan
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer 
                                to='/credit_cards' 
                                className='drawer-list-item'
                                onClick={closeDrawer}
                            >
                                <NavItem>
                                <FontAwesomeIcon
                                    icon={['fal', 'credit-card']}
                                    className='drawer-button-icon'
                                />
                                    Find a Credit Card
                                </NavItem>
                            </LinkContainer>
                            
                            <NavItem 
                                onClick={(e) => handleLinkOutClick('https://unitedstatescredit.blog/category/reviews/', e)} 
                                className='drawer-list-item'
                            >
                                <FontAwesomeIcon
                                    icon={['fal', 'thumbs-up']}
                                    className='drawer-button-icon'
                                />
                                Customer Reviews
                            </NavItem>
                            <NavItem 
                                onClick={(e) => handleLinkOutClick('https://unitedstatescredit.blog/', e)}
                                className='drawer-list-item'
                            >
                                <FontAwesomeIcon
                                    icon={['fal', 'blog']}
                                    className='drawer-button-icon'
                                />
                                Blog
                            </NavItem>                            
                        </Nav>                                
                    </Col>
                </Row>
            </Container>
        ) : null        
    )
};

export default Drawer;