import React from 'react';
import { useHistory } from 'react-router-dom';
import FlowPage from '@bit/bluekeel.component-library.flow-page';
import buttons from './verticals';

const SelectVertical = () => {
    let history = useHistory();

    const handleButtonClick = (e, choice) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        history.push('/' + choice);
    };

    return (
        <FlowPage
            page={{
                buttonData: buttons,
                handleClick: handleButtonClick,
                text: 'Select one of the options below:'
            }}
        />
    )
};

export default SelectVertical;