import React, { useState, useEffect } from 'react';
// import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import HeadShake from 'react-reveal/HeadShake';
import Button from '@material-ui/core/Button';
import FlowPage from '../Layout/FlowPage';

const GetStarted = () => {
    // const { appState } = useContext(AppContext);
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
		if(scrollTop > 200) {
			setShowNavButton(true);
			return;
		};

		return () => setShowNavButton(false);
    }, [scrollTop]);
    
    return (
        // <div className={`flow-content__container ${appState.showExpansion ? 'expanded-panel-start' : 'panel-start'}`}>
            // <img src={flag__left} alt='american-flag' className='flow-content__flag flag__left'/>
        <FlowPage>
            <div className='get-started__container flow-content'>
                <span className='start-title-text'>FIND THE RIGHT CREDIT FOR YOU</span>
                {/* <HeadShake id={`${showNavButton? 'nav-button' : 'start'}`} className='start-search' forever timeout={2000} > */}
                <div id={`${showNavButton? 'nav-button' : 'start'}`} className='start-search'>
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
            // <img src={flag__right} alt='american-flag' className='flow-content__flag flag__right'/>
        // </div>
    );
}


export default GetStarted;