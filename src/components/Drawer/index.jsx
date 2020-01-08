import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { Container, Row, Col, Collapse } from 'react-bootstrap';
import './drawer.scss';

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
            <Collapse in={appState.showDrawer}>
                <Container style={backdropStyle} fluid>
                    <Row>
                        <Col onClick={closeDrawer} />
                        <Col xs={12} md={2} className='drawer-container'>
                            Drawer
                        </Col>
                    </Row>
                </Container>
            </Collapse>
        ) : null        
    )
};

export default Drawer;