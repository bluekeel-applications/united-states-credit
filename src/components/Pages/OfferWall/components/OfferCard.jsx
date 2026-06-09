import React from 'react';
import styles from '../OfferWall.module.css';
import RecommendationBadge from './RecommendationBadge';
import { getOfferPills } from '../../Offers/offerConfig';

// A single offer card. Whole card is clickable (mobile shows an arrow icon,
// desktop a "View Offer" button). onSelect receives the offer; Phase 2 wires
// it to the redirect modal + click tracking.
const OfferCard = ({ offer, badge, rank, onSelect }) => {
    const pills = getOfferPills(offer.id);
    const select = () => onSelect && onSelect(offer, { rank, badge: badge ? badge.label : null });
    const onKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); }
    };

    return (
        <div
            className={styles.card}
            role="button"
            tabIndex={0}
            aria-label={`View offer: ${offer.title}`}
            onClick={select}
            onKeyDown={onKeyDown}
        >
            <div className={styles.desktopCard}>
                <div>
                    <RecommendationBadge badge={badge} />
                    <h3>{offer.title}</h3>
                    <p>{offer.description}</p>
                    <div className={styles.pills}>
                        {pills.map((pill, i) => (
                            <span key={i} className={styles[pill.color]}>{pill.label}</span>
                        ))}
                    </div>
                </div>
                <button className={styles.btn} type="button" tabIndex={-1} aria-hidden="true">View Offer</button>
            </div>
            <div className={styles.arrow} aria-hidden="true">→</div>
        </div>
    );
};

export default OfferCard;
