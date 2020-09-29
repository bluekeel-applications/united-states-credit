import React from 'react';
import Radium from 'radium';

const QuestionTitle = ({ text }) => (
    <div style={styles.container}>
        <span style={styles.text}>{text}</span>
    </div>
);

const styles = {
    container: {
        margin: '6vh 0 20px 0',
        '@media (max-width: 767px)': {
            margin: '3vh 50px 20px 50px',
        }
    },
    text: {
        fontSize: '26px',
        fontWeight: '400',
    }
}
export default Radium(QuestionTitle);