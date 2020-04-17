import React from 'react';
import Header from './Header';

const NavbarTop = ({ toggleDrawer }) => {
  return (
      <div className='fixed-topbar header-container' >
        <Header className='header-content' toggleDrawer={toggleDrawer}/>
      </div>    
  );
}

export default NavbarTop;