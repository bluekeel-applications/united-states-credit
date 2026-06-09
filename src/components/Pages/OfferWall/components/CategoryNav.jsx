import React from 'react';
import styles from '../OfferWall.module.css';
import trackOfferEvent from '../../../../utils/trackOfferEvent';

// Category deep-link pills. Rendered inline under the hero and again inside the
// sticky shell on scroll. Smooth-scrolls to the matching section; "Other" link
// is hidden on mobile via CSS to avoid horizontal overflow (brief §4.5).
const CategoryNav = ({ categories, variant = 'inline' }) => {
    const navClass = variant === 'sticky' ? styles.stickyNav : styles.navInline;

    const jumpTo = (e, id) => {
        e.preventDefault();
        trackOfferEvent('category_nav_clicked', { category: id, variant });
        const el = document.getElementById(id);
        if (!el) return;
        const prefersReduced = typeof window !== 'undefined' && window.matchMedia
            && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    };

    return (
        <nav className={navClass} aria-label="Offer categories">
            {categories.map(cat => (
                <a key={cat.key} href={`#${cat.key}`} onClick={(e) => jumpTo(e, cat.key)}>
                    {cat.icon} {cat.navLabel}
                </a>
            ))}
            <a className={styles.otherNavLink} href="#other" onClick={(e) => jumpTo(e, 'other')}>
                ⭐ {variant === 'sticky' ? 'Other' : 'Other Opportunities'}
            </a>
        </nav>
    );
};

export default CategoryNav;
