import React from 'react';
import Drawer from '../Drawer';
import Header from '../Header';
import { Container, Row, Col } from 'react-bootstrap';

import flagLeft from '../../assets/images/flag_left.png';
import flagRight from '../../assets/images/flag_right.png';

import './App.css';

function App() {
  return (
    <Container className='App' fluid style={{padding: '0px'}}>
      <Row noGutters className='fixed-topbar'>
        <Col className={'d-sm-none d-md-block flag-col'} />
        <Col lg='8' md='10' className='header-container' >
          <Header className='header-content' />
        </Col>
        <Col className={'d-sm-none d-md-block flag-col'} />
      </Row>
      <Row noGutters>
        <Col className={'d-sm-none d-md-block flag-col'} >
          <img src={flagLeft} alt='flagLeft' height='auto' />
        </Col>
        <Col lg='8' md='10'>
          Content
        </Col>
        <Col className={'d-sm-none d-md-block flag-col'} >
          <img src={flagRight} alt='flagRight' height='auto' />
        </Col>
      </Row>
      <Drawer />
    </Container>
  );
}

export default App;