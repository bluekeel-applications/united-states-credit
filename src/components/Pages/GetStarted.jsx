import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import StartButton from '@bit/bluekeel.component-library.start-button';
import FlowPage from '../Layout/FlowPage';

const GetStarted = () => {
    let history = useHistory();
    const { appState } = useContext(AppContext);

    const handleStartClick = () => {
        history.push('/verticals');
        window.scrollTo(0, 0);
    };
    
    return (
        <FlowPage showCrumbs={false}>
            <span className='start-title-text'>FIND THE RIGHT CREDIT FOR YOU</span>
            <StartButton 
                showNav={appState.showNavStart}
                colorScheme='usc'
                handleClick={handleStartClick}
            />
        </FlowPage>
    );
};


export default GetStarted;