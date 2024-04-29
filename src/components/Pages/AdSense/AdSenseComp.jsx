import React, { Component, useState } from 'react';
import styles from './adsense.css.js';
import { useMediaQuery } from 'react-responsive';

class GoogleAd extends Component {
    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    };

    render() {
        return (
            <ins
                className='adsbygoogle'
                data-ad-client='ca-pub-5105418052368941'
                data-ad-slot={this.props.isMobile ? '6011644859' : '9338029233'}
                style={{ 
                    display: 'inline-block', 
                    width: this.props.width, 
                    height: this.props.height 
                }}
                data-ad-format='auto'
                data-full-width-responsive='true'
            />
        );
    }
};

const AdSenseComp = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const [ adWidth ] = useState(() => {
        let windowWidth = window.innerWidth;
        if(windowWidth > 1800) { return 1800 };
        if(isMobile) { return (windowWidth - 40) };
        return windowWidth - 100;
    });
    const [ adHeight ] = useState(() => {
        let windowWidth = window.innerWidth;
        if(windowWidth > 1800) { return 720 };
        if(isMobile) { return (windowWidth - 40) };
        return ((windowWidth - 100)*0.8);
    });

    const mainStyle = Object.assign(
        styles.mainContainer,
        isMobile && styles.mobileContainer
    );

    return (
        <div style={mainStyle}>
            <GoogleAd 
                width={adWidth}
                height={adHeight}
                isMobile={isMobile}
            />
        </div>
    );

}

export default AdSenseComp;