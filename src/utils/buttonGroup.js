// The button group of an article (GraphQL fetchArticleByKey → body.button_group,
// with a separate set under body.mobile): each button names several offers with
// a `usage` share, and one of them is chosen per button per page view.
//
// Extracted from ButtonGroupPage so the /rsoc button-group page and the /loans
// after-sale modal choose the same way.

// 1–100, as the page has always rolled it.
export const rollPercent = () => Math.floor(Math.random() * 100) + 1;

// The offer a roll lands on: walk the list adding up `usage`, take the first
// offer whose running total reaches the roll; a list whose shares fall short
// of the roll gives its last offer.
export const pickOffer = (offers, roll = rollPercent()) => {
    let count = 0;
    let picked = null;
    (offers || []).forEach((offer, idx) => {
        if (picked) return;
        count += Number(offer.usage);
        if (roll <= count || idx === offers.length - 1) picked = offer;
    });
    if (!picked) return { offerUrl: null, linkShape: null, offerbucks: null };
    return { offerUrl: picked.offer_url, linkShape: picked.link_shape, offerbucks: picked.offerbucks || null };
};

// One { text, url, linkShape, offerbucks } per button, each with its own roll.
export const selectButtons = (group, roll = rollPercent) => (group || []).map((button) => {
    const { offerUrl, linkShape, offerbucks } = pickOffer(button.offers, roll());
    return { text: button.button_text, url: offerUrl, linkShape, offerbucks };
});

// The set for this device: the mobile one on a phone when the article has it.
export const buttonGroupOf = (article, isMobile) => (
    isMobile && !!article?.mobile?.button_group ? article.mobile.button_group : article?.button_group
);

// Buttons that can actually be shown and followed: a label and an http(s) link.
export const usableButtons = (buttons) => (buttons || []).filter(
    (b) => !!b && typeof b.text === 'string' && b.text.trim() !== '' && /^https?:\/\//i.test(String(b.url || '')),
);
