import React from 'react';
import styles from './Lander.css.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const CatArray = [
    {
        title: 'Credit & Credit Scores',
        url: 'https://blogs.unitedstatescredit.com/search?q=credit',
        icon: 'fa-credit-card'
    },
    {
        title: 'Loans & Lending',
        url: 'https://blogs.unitedstatescredit.com/search?q=loans',
        icon: 'hand-holding-usd'
    },
    {
        title: 'Debt & Recovery',
        url: 'https://blogs.unitedstatescredit.com/search?q=debt',
        icon: 'triangle-person-digging'
    },
    {
        title: 'Banking & Saving',
        url: 'https://blogs.unitedstatescredit.com/search?q=saving',
        icon: 'piggy-bank'
    },
    {
        title: 'Budgeting & Finance',
        url: 'https://blogs.unitedstatescredit.com/search?q=finance',
        icon: 'money-bill-trend-up'
    },
    {
        title: 'Trends & Technology',
        url: 'https://blogs.unitedstatescredit.com/search?q=tech',
        icon: 'computer'
    },
]
const PopularCategories = () => {
    return (
        <div style={styles.popularCategoriesContainer}>
            <div style={styles.popularCategoriesTitle}>Browse our popular categories</div>
            <div style={styles.popularCategoriesGrid}>
                {CatArray.map((cat, index) => (
                    <div style={styles.popularCategoryCard} key={index}>
                        <FontAwesomeIcon
                            icon={['fal', `${cat.icon}`]}
                            style={styles.popularCategoryCardIcon}
                        />
                        <div style={styles.popularCategoryCardTitle}>{cat.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularCategories;