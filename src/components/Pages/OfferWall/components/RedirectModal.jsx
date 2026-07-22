import React from 'react';
import styles from './RedirectModal.module.css';

// Brief §9: a short handoff modal shown for ~2s before the partner offer opens.
// Purely presentational — the parent owns the timer + the window.open redirect.
const RedirectModal = ({ open }) => {
    if (!open) return null;
    return (
        <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Opening your offer">
            <div className={styles.modalBox}>
                <div className={styles.motionWrap}>
                    <div className={styles.motionRing} />
                    <div className={styles.motionArrow} aria-hidden="true">→</div>
                </div>
                <h3>Opening Your Offer</h3>
                <p>Come back to compare more offers.</p>
                <div className={styles.progressTrack}>
                    <div className={styles.progressBar} />
                </div>
            </div>
        </div>
    );
};

export default RedirectModal;
