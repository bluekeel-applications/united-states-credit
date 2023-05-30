import React, { cloneElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Navbar.css.js';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Radium from 'radium';
import SearchBar from './SearchBar.jsx';

const ElevationScroll = (props) => {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window,
    });

    return cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
};

const Navbar = ({ 
    drawerClick, 
    goHome, 
    brand, 
    styleVariant,
    children, ...props 
}) => {

    const fullNavStyle = Object.assign({}, styles.navbar, styleVariant.navbar);
    const fullToolStyle = Object.assign({}, styles.toolbar, styleVariant.toolbar);
    const fullNavContentStyle = Object.assign({}, styles.navContent, styleVariant.navContent);
    const fullBrandStyle = Object.assign({}, styles.brand, styleVariant.brand);
    const fullMenuStyle = Object.assign({}, styles.menuIcon, styleVariant.menuIcon);

    return (
        <>
        <ElevationScroll {...props}>
            <AppBar position='fixed' key='navbar_key' style={fullNavStyle}>
                <Toolbar style={fullToolStyle}>
                    <div key='brand_key' style={fullNavContentStyle}>
                        <img 
                            src={brand} 
                            alt='bluekeel_brand' 
                            onClick={goHome}
                            style={fullBrandStyle}
                        />
                        <SearchBar />
                        <div key='icon_key' style={fullMenuStyle} onClick={drawerClick}>
                            <FontAwesomeIcon
                                icon={['fal', 'bars']}
                                fixedWidth
                            />
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
        <Toolbar style={{minHeight: '50px', height: '60px'}} />
        {children}
        </>
    );
};

export default Radium(Navbar);