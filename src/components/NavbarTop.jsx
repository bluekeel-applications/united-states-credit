import React from 'react';
import Header from './Header';
// import { Row, Col } from 'react-bootstrap';

const NavbarTop = () => {
  return (
      <div className='fixed-topbar header-container' >
        <Header className='header-content' />
      </div>    
  );
}

export default NavbarTop;