import React from 'react';
import Routes from '../Routes';
import Drawer from './Drawer';
import NavbarTop from './NavbarTop';
import ContentTop from './ContentTop';
import { Container, Row, Col } from 'react-bootstrap';
// import { useParams } from "react-router-dom";

import flagLeft from '../assets/images/flag_left.png';
import flagRight from '../assets/images/flag_right.png';

const App = () => {
  return (
    <Container className='App' fluid style={{padding: '0px'}}>
      <NavbarTop />
      <Row noGutters>
        <Col className={'d-sm-none d-md-block flag-col'} >
          <img src={flagLeft} alt='flagLeft' height='auto' />
        </Col>
        <Col lg='8' md='10'>
          <Routes />
          <ContentTop className='content-container' />
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