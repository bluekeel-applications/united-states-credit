import React from 'react';
import styles from './Categories.css.js';
import Radium from 'radium';
import TitleSection from '../TitleSection';

const Categories = () => {
    const categories = [
        'Credit Building',
        'Credit Cards',
        'Credit Scores',
        'Secured Credit Cards',
        'Credit Monitoring',
        'Authorized User Strategies',
        'Myths About Credit',
        'Personal Loans',
        'Credit Builder Loans',
        'Home Loans & Mortgages',
        'Auto Loans & Financing',
        'Student Loans',
        'Online Lending Platforms',
        'Loan Application Tips',
        'Debt Management',
        'Debt Consolidation',
        'Balance Transfer Cards',
        'Bankruptcy Recovery',
        'Collections & Charge-Offs',
        'Credit & Repair Services',
        'High-Yield Savings Accounts',
        'Checking Accounts',
        'Emergency Funds',
        'Neobanks & Digital Banking',
        'Automated Savings Tools',
        'Overdraft Protection & Fees',
        'Budgeting Methods & Tools',
        'Financial Apps & Automation',
        'Buy Now, Pay Later (BNPL)',
        'Behavioral Finance & Psychology',
        'Young Adult & Student Finance',
        'Side Hustles & Income Tracking',
        'AI in Personal Finance',
        'Credit & Lending News',
        'Consumer Scams & Fraud Alerts',
        'U.S. Credit Trends & Reports',
        'Regulatory & Legal Updates',
        'Financial Literacy & Education'
    ];

    const handleCategoryClick = (category) => {
        const searchQuery = category.replace(/\s+/g, '%20');
        // window.open(`https://blogs.unitedstatescredit.com/search?q=${searchQuery}`, '_blank');
        window.location.href = 'https://blogs.unitedstatescredit.com/search?q=' + searchQuery;
    };

    return (
        <div style={styles.mainContainer}>
            <div style={styles.categoriesContainer}>
                <TitleSection title="More Topics" />
                <div style={styles.categoriesList}>
                    {categories.map((category, index) => (
                        <div key={index} onClick={() => handleCategoryClick(category)} style={styles.categoryItem}>
                            {category}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Radium(Categories);