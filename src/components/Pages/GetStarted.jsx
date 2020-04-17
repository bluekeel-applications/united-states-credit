import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadShake from 'react-reveal/HeadShake';
import flag__left from '../../assets/images/flag_left.png';
import flag__right from '../../assets/images/flag_right.png';
import Button from '@material-ui/core/Button';

const GetStarted = () => {
    const { appState } = useContext(AppContext);
    let history = useHistory();

    const handleStartClick = () => {
        history.push('/verticals');
    };

    return (
        <div className={`flow-content__container ${appState.showExpansion ? 'expanded-panel' : ''}`}>
            <img src={flag__left} alt='american-flag' className='flow-content__flag flag__left'/>
            <div className='get-started__container'>
                <span className='start-title-text'>FIND THE RIGHT CREDIT FOR YOU</span>
                <HeadShake forever timeout={2000} >
                    <Button 
                        onClick={handleStartClick} 
                        className={'flow-button icon__right bg__blue is_start'}
                        variant='contained'
                    >
                        <FontAwesomeIcon
                            icon={['fal', 'arrow-alt-right']}
                            className='flow-button-icon'
                        />
                        Get Started
                    </Button>
                </HeadShake>
            </div>
            <img src={flag__right} alt='american-flag' className='flow-content__flag flag__right'/>
        </div>
    );
}


export default GetStarted;