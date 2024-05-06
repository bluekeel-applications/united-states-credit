import React, { useEffect, Component } from 'react';
import styles from './AdArticle.css';
import { useMediaQuery } from 'react-responsive';

class GoogleAd extends Component {
    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    };

    render() {
        return (
            <ins
                className='adsbygoogle'
                style={{display:'block', textAlign: 'center', width: '100%'}}
                data-ad-layout='in-article'
                data-ad-format='fluid'
                data-ad-client='ca-pub-5105418052368941'
                data-ad-slot='3890031470'
                data-full-width-responsive='true'
            />
        );
    }
};

const InArticleAd = props => {
    const { currentPath } = props;
    const isMobile = useMediaQuery({ maxWidth: 767 });

    // useEffect(() => {
    //     window.adsbygoogle = window.adsbygoogle || [];
    //     window.adsbygoogle.push({});
    // },[currentPath]);

    const mainStyle = Object.assign(
        styles.mainContainer,
        isMobile && styles.mobileContainer
    );

    return (
        <div key={currentPath} style={mainStyle}>
            <GoogleAd />
            {/* <ins
                // style="display:block; text-align:center;"
                className='adsbygoogle'
                style={{display:'block', textAlign: 'center'}}
                data-ad-layout='in-article'
                data-ad-format='fluid'
                data-ad-client='ca-pub-5105418052368941'
                data-ad-slot='3890031470'
                data-full-width-responsive='true'
            /> */}
        </div>
    );

}

export default InArticleAd;