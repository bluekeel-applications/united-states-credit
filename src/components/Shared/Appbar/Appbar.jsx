// import React, { cloneElement } from 'react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Appbar.css.js';
import UscFullLogo from '../../../assets/Images/usc_full_logo.png';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
// import Container from '@mui/material/Container';
import Radium from 'radium';
// import { useNavigate } from 'react-router-dom';

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return children
      ? React.cloneElement(children, {
          elevation: trigger ? 4 : 0,
        })
      : null;
  }
  
  ElevationScroll.propTypes = {
    children: PropTypes.element,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    // window: PropTypes.func,
};
const Appbar = Radium((props) => {
    const { children } = props;
    return (
        <React.Fragment>
        <CssBaseline />
        <ElevationScroll {...props}>
            <AppBar style={styles.appbar}>
                <Toolbar variant="dense">
                    <img src={UscFullLogo} alt='USC Logo' style={styles.logo} />
                </Toolbar>
            </AppBar>
        </ElevationScroll>
        <Toolbar />
            {/* <Container> */}
                {children}
            {/* </Container> */}
        </React.Fragment>
    );
});

export default Appbar;