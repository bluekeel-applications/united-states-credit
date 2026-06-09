import React from 'react';
import styles from '../OfferWall.module.css';

// Top-of-card badge (Editor's Choice / Trending / Best Overall). Renders nothing
// when no badge is assigned — badges are scarce by design (brief §6.3).
const RecommendationBadge = ({ badge }) => {
    if (!badge) return null;
    return <div className={`${styles.award} ${styles[badge.cls]}`}>{badge.label}</div>;
};

export default RecommendationBadge;
