import React from 'react';
import { useHistory } from 'react-router-dom';
import { vertical_buttons } from './BUTTONS';
import Question from '@bit/bluekeel.component-library.question';
import Radium from 'radium';

const Verticals = () => {
    let history = useHistory();

    const handleButtonClick = (e, choice) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        history.push('/' + choice);
    };

    return (
        <Question 
            page={{
                buttonData: vertical_buttons,
                handleClick: handleButtonClick,
                text: 'Select one of the options below:'
            }}
            wrapper={{
                theme: 'usc',
                isEnd: false
            }}
        />
    )
};

export default Radium(Verticals);