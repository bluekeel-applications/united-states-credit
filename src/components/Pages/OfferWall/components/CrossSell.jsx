import React from 'react';
import styles from '../OfferWall.module.css';
import { getOfferPills } from '../../Offers/offerConfig';

// "Other Opportunities" cross-sell (brief §8) — fed live from the usc_other
// co-reg path (see useOtherOpportunities), or the static fallback. Generic
// icons are assigned by position since the backend offers carry no icon.
const ICONS = ['⭐', '✚', '✓'];

const CrossSell = ({ offers = [], onSelect }) => (
    <section className={styles.cross} id="other">
        <h2>Other Opportunities You May Like</h2>
        <p>High-performing partner offers our visitors frequently explore.</p>
        <div className={styles.crossgrid}>
            {offers.map((offer, idx) => {
                const pills = getOfferPills(offer.id);
                return (
                    <div className={styles.crosscard} key={offer.id != null ? offer.id : idx}>
                        <h3><span className={styles.genericIcon}>{ICONS[idx % ICONS.length]}</span> {offer.title}</h3>
                        <p>{offer.description}</p>
                        <div className={styles.pills}>
                            {pills.map((pill, i) => (
                                <span key={i} className={styles[pill.color]}>{pill.label}</span>
                            ))}
                        </div>
                        <button type="button" aria-label={`View offer: ${offer.title}`} onClick={() => onSelect && onSelect(offer)}>View Offer</button>
                    </div>
                );
            })}
        </div>
    </section>
);

export default CrossSell;
