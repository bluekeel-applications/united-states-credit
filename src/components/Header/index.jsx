import React, { useContext } from 'react';
import { AppContext } from '../../context';
import logoText from '../../assets/icons/logo_text.png';
import logo from '../../assets/icons/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './header.scss';

const Header = () => {
    const { appState, dispatchApp } = useContext(AppContext);

    const toggleDrawer = () => {
        dispatchApp({ 
            type: appState.showDrawer ? 'HIDE_DRAWER' : 'SHOW_DRAWER'
        })
    };

    return (
        <>
            <div className='header-logo-group'>
                <img src={logo} alt='text-logo' height={40} className='header-logo-icon'/>
                <img src={logoText} alt='text-logo' height={40} className='header-text-logo'/>
            </div>
            <div className='header-menu-icon' onClick={toggleDrawer}>
                <FontAwesomeIcon
                    icon={['fal', 'bars']}
                    fixedWidth
                />
            </div>
        </>
    )
};

export default Header;