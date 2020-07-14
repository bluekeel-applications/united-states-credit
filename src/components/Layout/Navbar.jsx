import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import icon_logo from '../../assets/icons/usc_blog_logo.png';
import full_logo from '../../assets/icons/usc_full_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = ({ toggleDrawer }) => {
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
		<div className='fixed-topbar header-container header-content' >
			<CardMedia
				component='img'
				className={showLogoText ? 'header-logo' : 'header-icon'}
				image={showLogoText ? full_logo : icon_logo}
				alt='header-logo'
				onClick={goHome}
			/>
			<div className='header-menu-icon' onClick={() => toggleDrawer(true)}>
				<FontAwesomeIcon
					icon={['fal', 'bars']}
					fixedWidth
				/>
			</div>
		</div>    
	);
}

export default Navbar;