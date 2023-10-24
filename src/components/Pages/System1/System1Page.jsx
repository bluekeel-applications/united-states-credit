import React, { useEffect, useContext, useState, useRef } from 'react';
import { AppContext } from '../../../context';
import styles from './System1.css';
import { useMediaQuery } from 'react-responsive';
import ButtonContainer from './ButtonContainer';
import MainTitle from './MainTitle';
import { useMutation } from '@apollo/client';
import { ADD_USER_EMAIL } from '../../../utils/GraphQL/mutations';
import { setPageComponent } from './utils/helpers';

const System1Page = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const emailSent = useRef(false);
    const { trackingState, appState } = useContext(AppContext);
    const { header, sub_text, button_title } = appState.system1;
    const [ useArticle, setArticle ] = useState(null);

    useEffect(() => {
        console.log('On Dynamic Page!');
        setPageComponent(trackingState.article, setArticle);
    },[trackingState.article]);

    const [ addUserEmail ] = useMutation(ADD_USER_EMAIL, { 
        onCompleted: (data) => {
            const submittedEmail = data.addUserEmail.body.email
            console.log('Email posted to Mongo:', submittedEmail);
        }
    });

    const postEmailToMongo = emailProp => {
        if(emailProp && emailProp !== '' && emailProp !== 'omit') {
            addUserEmail({
                variables: {
                    clickId: Number(trackingState['hsid']),
                    email: emailProp
                }
            })
        }
    };

    useEffect(() => {
        if(!emailSent.current) {
            postEmailToMongo(trackingState['email']);
            emailSent.current = true;
        };
        // eslint-disable-next-line
    },[emailSent.current]);
    
    useEffect(() => {
        window.fbq('init', '531202445442265');
        console.log('Initialized FB Pixel');
    },[]);

    const headerStyle = Object.assign({},
        styles.headerContainer,
        isMobile && styles.headerContainerMobile
    );
    const headerSubStyle = Object.assign({},
        styles.headerText,
        isMobile && styles.headerTextMobile
    );

    return(
        <div style={styles.mainContainer}>
            <div style={headerStyle}>
                {!!header && <MainTitle text={header} />}
                {!!sub_text && <div style={headerSubStyle}>{sub_text}</div>}
            </div>
            <ButtonContainer containerId='rampjs_slot1' email={trackingState['email']} title={button_title}/>
            {useArticle}
        </div>
    );
};

export default System1Page;