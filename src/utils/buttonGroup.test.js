import { pickOffer, selectButtons, buttonGroupOf, usableButtons, rollPercent } from './buttonGroup';

const offers = [
    { offer_url: 'https://a.example/x', usage: '50', link_shape: 'peak', offerbucks: null },
    { offer_url: 'https://b.example/x', usage: '30', link_shape: 'tapstone' },
    { offer_url: 'https://c.example/x', usage: '20', link_shape: 'offerbucks', offerbucks: { channelid: '1' } },
];

describe('pickOffer', () => {
    test('the roll lands on the offer whose running share reaches it', () => {
        expect(pickOffer(offers, 1).offerUrl).toBe('https://a.example/x');
        expect(pickOffer(offers, 50).offerUrl).toBe('https://a.example/x');
        expect(pickOffer(offers, 51).offerUrl).toBe('https://b.example/x');
        expect(pickOffer(offers, 80).offerUrl).toBe('https://b.example/x');
        expect(pickOffer(offers, 81).offerUrl).toBe('https://c.example/x');
        expect(pickOffer(offers, 100).offerUrl).toBe('https://c.example/x');
    });
    test('carries the link shape and the offerbucks config', () => {
        expect(pickOffer(offers, 10)).toEqual({ offerUrl: 'https://a.example/x', linkShape: 'peak', offerbucks: null });
        expect(pickOffer(offers, 60).offerbucks).toBe(null);
        expect(pickOffer(offers, 90)).toEqual({ offerUrl: 'https://c.example/x', linkShape: 'offerbucks', offerbucks: { channelid: '1' } });
    });
    test('shares that fall short of the roll give the last offer', () => {
        expect(pickOffer([{ offer_url: 'https://a.example/x', usage: '10' }, { offer_url: 'https://b.example/x', usage: '10' }], 95).offerUrl).toBe('https://b.example/x');
    });
    test('no offers is no offer, never a throw', () => {
        expect(pickOffer([], 5)).toEqual({ offerUrl: null, linkShape: null, offerbucks: null });
        expect(pickOffer(undefined, 5).offerUrl).toBe(null);
    });
    test('the roll is 1 to 100', () => {
        for (let i = 0; i < 500; i += 1) { const r = rollPercent(); expect(r >= 1 && r <= 100).toBe(true); }
    });
});

describe('selectButtons', () => {
    const group = [{ button_text: 'Personal Loans', offers }, { button_text: 'Credit Cards', offers: [offers[1]] }];
    test('one entry per button, each with its own roll', () => {
        const rolls = [90, 1];
        const out = selectButtons(group, () => rolls.shift());
        expect(out).toEqual([
            { text: 'Personal Loans', url: 'https://c.example/x', linkShape: 'offerbucks', offerbucks: { channelid: '1' } },
            { text: 'Credit Cards', url: 'https://b.example/x', linkShape: 'tapstone', offerbucks: null },
        ]);
    });
    test('no group is no buttons', () => { expect(selectButtons(undefined)).toEqual([]); });
});

describe('buttonGroupOf and usableButtons', () => {
    const article = { button_group: [{ button_text: 'Desktop' }], mobile: { button_group: [{ button_text: 'Mobile' }] } };
    test('the mobile set on a phone, the main set otherwise', () => {
        expect(buttonGroupOf(article, true)[0].button_text).toBe('Mobile');
        expect(buttonGroupOf(article, false)[0].button_text).toBe('Desktop');
        expect(buttonGroupOf({ button_group: [{ button_text: 'Only' }], mobile: {} }, true)[0].button_text).toBe('Only');
        expect(buttonGroupOf(null, true)).toBe(undefined);
    });
    test('a button needs a label and an http(s) link', () => {
        expect(usableButtons([
            { text: 'Ok', url: 'https://a.example/x' }, { text: '', url: 'https://a.example/x' }, { text: 'No link', url: null },
            { text: 'Script', url: 'javascript:alert(1)' }, null,
        ])).toEqual([{ text: 'Ok', url: 'https://a.example/x' }]);
    });
});
