import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { Link } from 'react-router-dom';

import logoText from '../../assets/icons/logo_text.png';
import logo from '../../assets/icons/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({ toggleDrawer }) => {
    const { dispatchApp } = useContext(AppContext);

    const clearSearch = () => dispatchApp({ type: 'RESTART_SEARCH' });

    return (
        <>
            <Link className='header-logo-group' to='/' onClick={clearSearch}>
                <img src={logo} alt='text-logo' height={60} className='header-logo-icon'/>
                <img src={logoText} alt='text-logo' height={40} className='header-text-logo'/>
            </Link>
            <div className='header-menu-icon' onClick={() => toggleDrawer(true)}>
                <FontAwesomeIcon
                    icon={['fal', 'bars']}
                    fixedWidth
                />
            </div>
        </>
    )
};

export default Header;