import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import FlowPage from '../Layout/FlowPage';

const GetStarted = () => {
    const { appState } = useContext(AppContext);
    let history = useHistory();
    const [scrollTop, setScrollTop] = useState(0);
    const [showNavButton, setShowNavButton] = useState(false);

    const handleStartClick = () => {
        history.push('/verticals');
        window.scrollTo(0, 0);
    };

    useEffect(() => {
		const onScroll = e => {
            setScrollTop(e.target.documentElement.scrollTop);
			// setScrolling(e.target.documentElement.scrollTop > scrollTop);       
		};
		window.addEventListener('scroll', onScroll);

		return () => window.removeEventListener('scroll', onScroll);
    }, [scrollTop]);
    
    useEffect(() => {
        if(scrollTop <= 100) setShowNavButton(false);
        
		if(scrollTop > 200) {
			setShowNavButton(true);
			return;
		};

		return () => setShowNavButton(false);
    }, [scrollTop]);
    
    return (
        <FlowPage showCrumbs={false}>
            <div className='get-started__container flow-content'>
                <span className='start-title-text'>FIND THE RIGHT CREDIT FOR YOU</span>
                <div id={`${showNavButton? 'nav-button' : 'start'}`} className={`${appState.showExpansion ? 'start-search-pch' : 'start-search'}`}>
                    <Button
                        onClick={handleStartClick} 
                        className={`${showNavButton? 'nav-button' : 'is_start'} flow-button bg__blue`}
                        variant='contained'
                    >
                        Get Started
                        {!showNavButton ? (
                        <FontAwesomeIcon
                            icon={['fal', 'arrow-alt-right']}
                            className='flow-button-icon'
                        />
                        ): (
                        <FontAwesomeIcon
                            icon={['fal', 'chevron-double-right']}
                            className='nav-start-button-icon'
                        />)}
                    </Button>
                </div>                
                
            </div>
        </FlowPage>
    );
}


export default GetStarted;