import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    pickUscButtonColor, 
    pickPcmButtonColor,
    pickWikiButtonColor,
    flattenLongString 
} from '@bit/bluekeel.controllers.helpers';
import GET_OFFER_BY_GROUP from '../utils/graphql/GET_OFFER_BY_GROUP';
import Radium from 'radium';
import GoogleButton from './GoogleButton';
import { useQuery } from '@apollo/client';
import useClickSubmit from '../utils/useClickSubmit';
import useInsightSubmit from '../utils/useInsightSubmit';
import styles from './UserSelection.css.js';
import { buildKeywordLink } from '../utils/helpers';

const flattenSystem1String = (string) => {
    const stringCleaned = string.replace(/\s/g, '+');
    return stringCleaned.toLowerCase();
};

const LinkButton = ({ program_id, link, tracking, email, idx, theme, setOfferGroup }) => {
    let history = useHistory();
    const [ isHovering, setHovering ] = useState(false);
    const [ shouldExecute, setExecute ] = useState(false);
    const [ offerGroupFound, setOffer ] = useState(null);

    useInsightSubmit(link.text, tracking, shouldExecute);
    useClickSubmit(tracking, email, shouldExecute);

    const handleOfferFound = (data, error) => {
        if(data) {
            const offer = data.fetchOfferByGroup.body;
            setOffer(offer);
		};
        if(error) {
			console.error('ERROR fetching Offer from group:', error);
		};
    };

    const  { loading } = useQuery(GET_OFFER_BY_GROUP, {
        variables: {
            offer_group: link.offer_group,
            program_id,
            user: { location: tracking['location'], clickId: Number(tracking['hsid']) }
        },
        skip: !link.offer_group || link.offer_group === 'N/A',
        onCompleted: handleOfferFound
    });

    const handleClickSubmit = () => {
        if(!!offerGroupFound) {
            const data = {...offerGroupFound, kwd: flattenSystem1String(link.text), link_id: link.id, link_text: link.text, program_id };
            setOfferGroup(data);
            return;
        };
        setExecute(true);
        const linkout = buildKeywordLink(link.url, tracking, flattenLongString(link.text));
        const jumpBehind = buildKeywordLink(link.jump, tracking, flattenLongString(link.text));
        let newTab = window.open();
        newTab.location = linkout;
        if (jumpBehind && jumpBehind !== 'N/A') {
            window.location.href = jumpBehind;
        } else {
            history.push('/verticals');
        };
    };

    const hoverStyle = Object.assign({},
            styles['linkContainer'],
            styles['hover']
        );

    const buildButtonStyle = (idx) => {
        const buttonTheme = () => {
            switch(theme) {
                case 'usc':
                    return pickUscButtonColor(idx);
                case 'pcm':
                    return pickPcmButtonColor(idx);
                case 'wiki':
                    return pickWikiButtonColor(idx);

                default:
                    console.log('theme not recognized in link button...defaulting to USC');
                    return pickUscButtonColor(idx);
            };
        };
        const color = link.button_color || 'FFFFFF';
        const textColor = link.text_color || 'black';

        return Object.assign({},
            styles['linkContainer'],
            styles[buttonTheme()],
            color !== 'FFFFFF' && {color: textColor, backgroundColor: `#${color}`}
        );
    };

    if(loading) {
        return <div>Loading...</div>
    };
    return (
        offerGroupFound?.google ?
        <GoogleButton link={link} idx={idx} handleClick={handleClickSubmit}/> :
        <button
            key={`user-selection-link__${idx}`}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            style={isHovering ? hoverStyle : buildButtonStyle(idx)}
            onClick={handleClickSubmit}
        >
            {/* {link.text}         */}
            <div style={styles.buttonContainer}>
                <div style={styles.buttonTextContainer}>
                    <div style={styles.linkText}>{link.text}</div>
                </div>
                <div> </div>
            </div>            
        </button>
    )
};

export default Radium(LinkButton);