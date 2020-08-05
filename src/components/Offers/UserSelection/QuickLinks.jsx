import React, { useContext } from 'react';
import { AppContext } from '../../../context';
import { handleQuickLink, pickButtonColor } from './selection-utils';
import Loading from '../../Shared/Loading';
import { useQuery } from '@apollo/react-hooks';
import { QUICK_LINKS } from '../../../utils/queries';
import { capitalizeValue } from '../../../utils/helpers';

const QuickLinks = ({ processClick, setInterest }) => {
    const { appState, trackingState } = useContext(AppContext);

    const { loading, error, data } = useQuery(QUICK_LINKS, {
        variables: { 
            quick_link_ids: appState.offer.quick_links,
            url: appState.offer.url,
            jump: appState.offer.jump
        }
    });

    const handleClick = (e, link) => {
        handleQuickLink(e, link, processClick, setInterest, trackingState)
    };

    const SelectionLink = ({ link, color }) => (
        <div className={`selection-link bg__${color}`} onClick={(e) => handleClick(e, link)}>
            {capitalizeValue(link.text)}
        </div>
    );

    if(loading) {
        return (
            <div className='selection-links-container'>
                <div className='selection-links-title'>Quick Links</div>
                <div className='selection-links'>
                    <Loading />
                </div>
            </div>
        )
    };

    if (error) {
        console.log('error:', error);
        window.location.pathname = '/error';
        return;
    };

    const quickLinks = data.fetchQuickLinks.body;

    return (
        <div className={`selection-links-container ${quickLinks.length > 6 && 'scroll-box'}`}>
            <div className='selection-links'>
                {quickLinks.map((link, idx) => (
                    <SelectionLink key={`${idx}`} link={link} color={pickButtonColor(idx)} />)
                )}
            </div>
        </div>
    )
};

export default QuickLinks;