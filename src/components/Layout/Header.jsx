import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';

import logoText from '../../assets/icons/logo_text.png';
import logo from '../../assets/icons/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({ toggleDrawer }) => {
    let history = useHistory();
    const { dispatchApp } = useContext(AppContext);
    const [scrollTop, setScrollTop] = useState(0);
    const [showLogoText, setShowLogoText] = useState(true);
    const [mobile] = useState(window.innerWidth < 500);

    const goHome = () => {
        dispatchApp({ type: 'RESTART_SEARCH' });
        window.scrollTo(0, 0);
        setScrollTop(0);
        setShowLogoText(true);
        history.push('/');
    };

    useEffect(() => {
		const onScroll = e => {
			setScrollTop(e.target.documentElement.scrollTop);
		};
		window.addEventListener('scroll', onScroll);

		return () => window.removeEventListener('scroll', onScroll);
    }, [scrollTop]);
    
    useEffect(() => {
		if(mobile && scrollTop > 200) {
			setShowLogoText(false);
			return;
		};

		return () => setShowLogoText(true);
    }, [scrollTop, mobile]);

    return (
        <>
            <div className='header-logo-group' onClick={goHome}>
                <img src={logo} alt='text-logo' height={40} className='header-logo-icon'/>
                {showLogoText && (<img src={logoText} alt='text-logo' height={40} className='header-text-logo'/>)}
            </div>
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