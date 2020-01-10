import React from 'react';
import Header from './Header';
import { Row, Col } from 'react-bootstrap';

const NavbarTop = () => {
  return (    
      <Row noGutters className='fixed-topbar'>
        <Col className={'d-sm-none d-md-block flag-col'} />
        <Col lg='8' md='10' className='header-container' >
          <Header className='header-content' />
        </Col>
        <Col className={'d-sm-none d-md-block flag-col'} />
      </Row>      
  );
}

export default NavbarTop;