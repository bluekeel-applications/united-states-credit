import React, { useState } from 'react';
import styles from './Lander.css.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const CatArray = [
    {
        title: 'Credit & Credit Scores',
        url: 'https://blogs.unitedstatescredit.com/search?q=Credit%20%26%20Credit%20Scores',
        icon: 'fa-credit-card'
    },
    {
        title: 'Loans & Lending',
        url: 'https://blogs.unitedstatescredit.com/search?q=Loans%20%26%20Lending',
        icon: 'hand-holding-usd'
    },
    {
        title: 'Debt & Recovery',
        url: 'https://blogs.unitedstatescredit.com/search?q=Debt%20%26%20Recovery',
        icon: 'triangle-person-digging'
    },
    {
        title: 'Banking & Saving',
        url: 'https://blogs.unitedstatescredit.com/search?q=Banking%20%26%20Saving',
        icon: 'piggy-bank'
    },
    {
        title: 'Budgeting & Finance',
        url: 'https://blogs.unitedstatescredit.com/search?q=Budgeting%20%26%20Personal%20Finance%20Tools',
        icon: 'money-bill-trend-up'
    },
    {
        title: 'Trends & Technology',
        url: 'https://blogs.unitedstatescredit.com/search?q=Trends%2C%20Tech%20%26%20Consumer%20Insights',
        icon: 'computer'
    },
]

const CategoryCard = ({ cat, index }) => {
    const [ isHovering, setHovering ] = useState(false);

    const cardStyle = Object.assign({}, 
        styles['popularCategoryCard'],
        isHovering && styles['cardHover'],
    );

    const iconStyle = Object.assign({}, 
        styles['popularCategoryCardIcon'],
        isHovering && styles['cardHoverIcon'],
    );

    const titleStyle = Object.assign({}, 
        styles['popularCategoryCardTitle'],
        isHovering && styles['cardHoverTitle'],
    );

    const handleClick = (url) => {
        // window.open(url, '_blank');
        window.location.href = url;
    };
    return (
        <div 
        style={cardStyle} 
        key={index}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onClick={() => handleClick(cat.url)}
        >
            <FontAwesomeIcon
                icon={['fal', `${cat.icon}`]}
                style={iconStyle}
            />
            <div style={titleStyle}>{cat.title}</div>
        </div>
    );
};
const PopularCategories = () => {

    return (
        <div style={styles.popularCategoriesContainer}>
            <div style={styles.popularCategoriesTitle}>Browse our popular categories</div>
            <div style={styles.popularCategoriesGrid}>
                {CatArray.map((cat, index) => (
                    <CategoryCard key={`${cat.title}-${index}`} cat={cat} index={index} />
                ))}
            </div>
        </div>
    );
};

export default PopularCategories;