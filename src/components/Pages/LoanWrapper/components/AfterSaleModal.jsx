import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { useMediaQuery } from 'react-responsive';
import styles from './AfterSaleModal.module.css';
import { AppContext } from '../../../../context/AppContext';
import { FETCH_ARTICLE_BY_KEY } from '../../../../utils/GraphQL/queries';
import buildLinkout from '../../../../utils/buildLinkout';
import { buttonGroupOf, selectButtons, usableButtons } from '../../../../utils/buttonGroup';

// The offers shown on /loans after an applicant's request is sold.
//
// bkform (>= 1.20.0) opens the lender in a new tab and leaves this page where
// it is; its `bkform:redirect` event then says `newTab` and names the article
// the operator set in the Bluekeel console (Websites › After-sale offers).
// This modal shows that article's button group — the same data, the same
// per-button choice and the same link-out as the /rsoc button-group page
// (utils/buttonGroup.js, utils/buildLinkout.js).
//
// What it deliberately does NOT do, unlike the /rsoc page's click:
//  - fire the HitStreet conversion pixel, the ad-platform conversions or the
//    common-info writes (useClickSubmit). The sale already fired the engine's
//    conversion pixel and Google Ads conversion for this visitor; a second
//    pixel on the same hsid could pay the traffic source twice;
//  - rewrite the page URL (System1.jsx does, and would wipe the ids the form
//    put there).
//
// It never opens a window by itself and never navigates this page: an offer
// opens in a new tab on the applicant's own click. No article, a failed fetch
// or an article without buttons shows nothing at all.
const AfterSaleModal = ({ article, onClose, track }) => {
    const { trackingState } = useContext(AppContext);
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const closeRef = useRef(null);
    const shownFor = useRef(null);

    const { data } = useQuery(FETCH_ARTICLE_BY_KEY, { variables: { key: article }, skip: !article });
    const body = data?.fetchArticleByKey?.success ? data.fetchArticleByKey.body : null;
    // Rolled once per article load, like the /rsoc page: a re-render must not
    // re-roll a button the applicant is about to click.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const buttons = useMemo(() => (body ? usableButtons(selectButtons(buttonGroupOf(body, isMobile))) : []), [body]);
    const open = !!article && buttons.length > 0;

    useEffect(() => {
        if (!open || shownFor.current === article) return;
        shownFor.current = article;
        track('lender_form_offers_shown', { article, button_count: buttons.length });
        closeRef.current?.focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, article]);

    useEffect(() => {
        if (!open) return undefined;
        const onKey = (e) => { if (e.key === 'Escape') onClose('escape'); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    if (!open) return null;

    const follow = (button, index) => {
        let url = null;
        try { url = buildLinkout(button.url, button.linkShape, trackingState, { offerbucks: button.offerbucks }); } catch (e) { url = null; }
        track('lender_form_offer_click', { article, button_index: index, link_shape: button.linkShape || 'default', opened: !!url });
        if (url) window.open(url, '_blank', 'noopener');
    };

    return (
        <div className={styles.backdrop} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose('backdrop'); }} data-after-sale-modal={article}>
            <div className={styles.box} role="dialog" aria-modal="true" aria-labelledby="after-sale-title">
                <button type="button" className={styles.close} ref={closeRef} onClick={() => onClose('close')} aria-label="Close">×</button>
                <h3 id="after-sale-title" className={styles.title}>Your lender opened in a new tab</h3>
                <p className={styles.lede}>Finish your request with them there. While you are here, these may also help.</p>
                <p className={styles.heading}>More offers</p>
                <ul className={styles.list}>
                    {buttons.map((button, index) => (
                        <li key={`after-sale-offer-${index}`}>
                            <button type="button" className={styles.offer} onClick={() => follow(button, index)}>{button.text}</button>
                        </li>
                    ))}
                </ul>
                <button type="button" className={styles.dismiss} onClick={() => onClose('dismiss')}>No thanks</button>
                <p className={styles.note}>Each offer opens in a new tab. These are advertisements from our partners.</p>
            </div>
        </div>
    );
};

export default AfterSaleModal;
