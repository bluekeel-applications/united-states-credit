import React, { useContext } from 'react';
import { AppContext } from '../../../context';
import { pickButtonColor } from './selection-utils';
import { capitalizeValue } from '../../../utils/helpers';

const QuickLinks = ({ quickLinkClick }) => {
    const { appState } = useContext(AppContext);

    const handleClick = (e, link) => {
        e.preventDefault();
        quickLinkClick(link);
    };

    const quickLinks = appState.offer.quick_link_group;

    return (
        <div className={`selection-links-container ${quickLinks.length > 6 && 'scroll-box'}`}>
            <div className='selection-links'>
                {quickLinks.map((link, idx) => (
                    <div
                        key={`user-selection-link__${idx}`}
                        className={`selection-link bg__${pickButtonColor(idx)}`} 
                        onClick={(e) => handleClick(e, link)}
                    >
                        {capitalizeValue(link.text)}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default QuickLinks;