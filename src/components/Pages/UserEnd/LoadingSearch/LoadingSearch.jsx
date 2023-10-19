import React, { memo } from 'react';
import Lottie from 'react-lottie';
import animationData from './searching.json';
import styles from './LoadingSearch.css.js';
import Radium from 'radium';

const LoadingSearch = Radium(({ onComplete }) => {

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div key='loading-search' style={styles.loadingContainer}>
            <div style={styles.loader}>
                <Lottie
                    options={defaultOptions}
                    eventListeners={[{ 
                        eventName: 'complete',
                        callback: () => onComplete(),
                    }]}
                />
            </div>
        </div>
    );
})

export default memo(LoadingSearch);