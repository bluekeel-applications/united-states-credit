import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context';
import Routes from '../Routes';
import Drawer from './Drawer';
import NavbarTop from './NavbarTop';
import Feed from './Feed';
import { Container, Row, Col } from 'react-bootstrap';

import { getOrganicHSID } from '../utils/middleware';
import { getCookie } from '../utils/helpers';

import flagLeft from '../assets/images/flag_left.png';
import flagRight from '../assets/images/flag_right.png';
import Breadcrumbs from './Breadcrumbs';
const App = () => {
  const { dispatchTracking } = useContext(AppContext);
  const componentIsMounted = useRef(true);

  useEffect(() => {
    const setTracking = async () => {
        if (componentIsMounted.current) {
            // Parse URL here and setup payload object
            const myURL = new URL(window.location.href);
            let tracking = {
              HSID: myURL.searchParams.get('hsid') || getCookie('hsid'),
              PID: myURL.searchParams.get('pid') || getCookie('pid') || 1793,
              SID: myURL.searchParams.get('sid') || getCookie('sid') || 7572,
              OID: myURL.searchParams.get('oid') || getCookie('oid') || 50,
              UID: myURL.searchParams.get('uid') || getCookie('pid') || null,
              EID: myURL.searchParams.get('eid') || getCookie('eid') || 'organic'
            };
            
            dispatchTracking({ type: 'USER_ARRIVED', payload: {
              pid: tracking.PID,
              sid: tracking.SID,
              oid: tracking.OID,
              uid: tracking.UID,
              eid: tracking.EID,
              hsid: tracking.HSID || await getOrganicHSID(tracking)
            }})
        };
    }
    setTracking();
    // Clean-up Function
    return () => {componentIsMounted.current = false};
      // eslint-disable-next-line
  }, []);

  return (
    <Container className='App' fluid style={{padding: '0px'}}>
      <NavbarTop />
      <Row noGutters>
        <Col className={'d-sm-none d-md-block flag-col'} >
          <img src={flagLeft} alt='flagLeft' height='auto' />
        </Col>
        <Col lg='8' md='10'>
          <Breadcrumbs />
          <Routes />
          <Feed />
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