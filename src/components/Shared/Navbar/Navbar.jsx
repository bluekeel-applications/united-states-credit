// import React, { cloneElement } from 'react';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Navbar.css.js';
// import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Radium from 'radium';
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

const Navbar = ({  
    goHome, 
    brand,
    children
}) => {
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

    return (
        <>
        {/* <ElevationScroll {...props}> */}
            <AppBar position='fixed' key='navbar_key' style={styles.navbar}>
                <Toolbar style={styles.toolbar}>
                    <div key='brand_key' style={styles.navContent}>
                        <img 
                            src={brand} 
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
        {children}
        </>
    );
};

export default Radium(Navbar);