// import React, { cloneElement } from 'react';
import React, { useContext, useState, memo } from 'react';
import { AppContext } from '../../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Navbar.css.js';
import UscFullLogo from '../../../assets/Images/usc_full_logo.png';
// import useScrollTrigger from '@mui/material//useScrollTrigger';
import AppBar from '@mui/material//AppBar';
import Toolbar from '@mui/material//Toolbar';
import Radium from 'radium';
import { useNavigate } from 'react-router-dom';
// import SearchBar from './SearchBar.jsx';

// const ElevationScroll = (props) => {
//     const { children } = props;
//     const trigger = useScrollTrigger({
//         disableHysteresis: true,
//         threshold: 0,
//         target: window,
//     });

//     return cloneElement(children, {
//         elevation: trigger ? 4 : 0,
//     });
// };

const Navbar = Radium(() => {
    let navigate = useNavigate();
    const { dispatchApp } = useContext(AppContext);
    const [ isHovering, setHovering ] = useState(false);
    
    const handleMenuClick = () => {
        console.log('clicked drawer')
        dispatchApp({ type: 'TOGGLE_DRAWER', payload: true });
    };

    const fullMenuStyle = Object.assign({}, 
        styles.menuIcon, 
        isHovering && styles.hoverMenu
    );

    const goHome = () => {
        window.scrollTo(0, 0);
		navigate('/');
	};

    return (
        <>
        {/* <ElevationScroll {...props}> */}
            <AppBar position='fixed' key='navbar_key' style={styles.navbar}>
                <Toolbar style={styles.toolbar}>
                    <div key='brand_key' style={styles.navContent}>
                        <img 
                            src={UscFullLogo} 
                            alt='bluekeel_brand' 
                            onClick={goHome}
                            style={styles.brand}
                        />
                        {/* <SearchBar /> */}
                        <div 
                        key='icon_key' 
                        style={fullMenuStyle} 
                        onClick={handleMenuClick}
                        onMouseEnter={() => setHovering(true)}
                        onMouseLeave={() => setHovering(false)}
                        >
                            <FontAwesomeIcon
                                icon={['fal', 'bars']}
                                fixedWidth
                            />
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        {/* </ElevationScroll> */}
        <Toolbar style={{minHeight: '50px', height: '60px'}} />
        </>
    );
});

export default memo(Navbar);