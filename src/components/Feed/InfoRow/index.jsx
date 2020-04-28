import React from 'react';
import FadeIn from 'react-fade-in';
import Reviews from './Reviews';
import Credit from './Credit';
import Tips from './Tips';

const InfoRow = () => (
    <FadeIn className='feed-row info-row-container'>
        <div className='bottom-border row-title'>Knowledge Base</div>
        <div className='row-column-container'>
            <div className='row-column'>
                <div className='row-column-title'>Reviews</div>
                <div className='right-border row-column-item-container'>
                    <Reviews />
                </div>
            </div>
            <div className='row-column'>
                <div className='row-column-title'>Find Credit</div>
                <div className='right-border row-column-item-container'>
                    <Credit />
                </div>
            </div>
            <div className='row-column'>
                <div className='row-column-title'>Credit Tips</div>
                <div className='row-column-item-container'>
                    <Tips />
                </div>
            </div>
        </div>
    </FadeIn>
);

export default InfoRow;