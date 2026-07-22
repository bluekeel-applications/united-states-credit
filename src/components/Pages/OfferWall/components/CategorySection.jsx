import React, { useState } from 'react';
import styles from '../OfferWall.module.css';
import OfferCard from './OfferCard';
import { assignBadge } from '../../Offers/offerConfig';
import trackOfferEvent from '../../../../utils/trackOfferEvent';

// One category section: header + top-3 offers, then a "Show More" button that
// expands the rest (brief §5.2). Only the top 3 get recommendation badges.
const CategorySection = ({ category, offers, onSelect }) => {
    const [ expanded, setExpanded ] = useState(false);

    const visible = offers.slice(0, 3);
    const hidden = offers.slice(3);
    const shown = expanded ? offers : visible;

    const handleShowMore = () => {
        trackOfferEvent('show_more_clicked', { category: category.key, hidden_count: hidden.length });
        setExpanded(true);
    };

    return (
        <section className={styles.section} id={category.key}>
            <div className={styles.sectionHead}>
                <div style={{ textAlign: 'left' }}>
                    <h2>{category.sectionTitle}</h2>
                    <p>{category.sectionSub}</p>
                </div>
                <div className={styles.count}>{offers.length} Offers</div>
            </div>

            {shown.map((offer, i) => (
                <OfferCard
                    key={offer.id}
                    offer={offer}
                    badge={assignBadge(i)}
                    rank={i}
                    onSelect={onSelect}
                />
            ))}

            {hidden.length > 0 && !expanded && (
                <button className={styles.more} type="button" onClick={handleShowMore}>
                    {category.ctaShowMore}
                </button>
            )}
        </section>
    );
};

export default CategorySection;
