import React, { useContext } from 'react';
import { AppContext } from '../../../context';
import { pickButtonColor } from './selection-utils';
// import Loading from '../../Shared/Loading';
// import { useQuery } from '@apollo/react-hooks';
// import { QUICK_LINKS } from '../../../utils/queries';
import { capitalizeValue } from '../../../utils/helpers';

const QuickLinks = ({ quickLinkClick, setInterest }) => {
    const { appState } = useContext(AppContext);

    // const { loading, error, data } = useQuery(QUICK_LINKS, {
    //     variables: { 
    //         quick_link_ids: appState.offer.quick_link,
    //         url: appState.offer.url,
    //         jump: appState.offer.jump
    //     }
    // });

    const handleClick = (e, link) => {
        e.preventDefault();
        setInterest(link.text);
        quickLinkClick(link);
    };

    // if(loading) {
    //     return (
    //         <div className='selection-links-container'>
    //             <div className='selection-links-title'>Quick Links</div>
    //             <div className='selection-links'>
    //                 <Loading />
    //             </div>
    //         </div>
    //     )
    // };

    // if (error) {
    //     console.log('error:', error);
    //     window.location.pathname = '/error';
    //     return;
    // };

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