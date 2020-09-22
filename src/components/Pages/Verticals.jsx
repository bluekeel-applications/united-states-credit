import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import ContentWrapper from '@bit/bluekeel.component-library.content-wrapper';
import { vertical_buttons } from './BUTTONS';
import QuestionButtons from '@bit/bluekeel.component-library.question-buttons';
import Radium from 'radium';
import QuestionTitle from '../Shared/QuestionTitle';

const Verticals = () => {
    let history = useHistory();
    const { dispatchApp } = useContext(AppContext);

    const handleButtonClick = (e, choice) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        dispatchApp({ type: 'HIDE_EXPANSION' });
        history.push('/' + choice);
    };

    return (
        <ContentWrapper theme='usc'>
            <div style={{ padding: '20px 0' }}>
                <QuestionTitle text={'Select one of the options below:'} />           
                <QuestionButtons 
                    buttonData={vertical_buttons}
                    handleClick={handleButtonClick}
                />
            </div>
        </ContentWrapper>
    )
};

export default Radium(Verticals);