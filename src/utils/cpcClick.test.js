import { cpcClickFrom, browserId, reportCpcClick, cpcEndpoint } from './cpcClick';

const memory = () => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => { m.set(k, String(v)); }, _m: m }; };
const random = { getRandomValues: (a) => { for (let i = 0; i < a.length; i += 1) a[i] = (i * 37 + 11) % 256; return a; } };
const recorder = () => { const calls = []; return { calls, fetchImpl: async (url, init) => { calls.push({ url, init }); return { ok: true }; } }; };
const landing = (search, pathname = '/loans', hostname = 'www.unitedstatescredit.com') => ({ pathname, search, hostname });

describe('the cost-per-click landing post', () => {
    test('only a click id in the landing URL, only on /loans', () => {
        expect(cpcClickFrom({ pathname: '/loans', search: '?hsid=123456&sid=9113&eid=77&pid=3700' })).toEqual({ hsid: '123456', sid: '9113', eid: '77' });
        expect(cpcClickFrom({ pathname: '/loans/apply', search: '?hsid=5' })).toEqual({ hsid: '5', sid: '', eid: '' });
        expect(cpcClickFrom({ pathname: '/', search: '?hsid=123456&sid=9113' })).toBeNull();
        expect(cpcClickFrom({ pathname: '/loans', search: '?sid=9113' })).toBeNull();
        expect(cpcClickFrom({ pathname: '/loans', search: '?hsid=0' })).toBeNull();
        expect(cpcClickFrom({ pathname: '/loans', search: '?hsid=1763305200000' })).toBeNull();
        expect(cpcClickFrom({ pathname: '/loans', search: '?hsid=12;drop' })).toBeNull();
    });

    test('the endpoint follows the host like the loan form', () => {
        expect(cpcEndpoint('staging.unitedstatescredit.com')).toMatch(/\/dev\/cpc$/);
        expect(cpcEndpoint('www.unitedstatescredit.com')).toMatch(/\/prod\/cpc$/);
    });

    test('a browser id is made once and kept; never for an opted-out browser', () => {
        const storage = memory();
        const first = browserId({ storage, random });
        expect(first).toMatch(/^[a-f0-9]{32}$/);
        expect(browserId({ storage, random: null })).toBe(first);
        expect(browserId({ allow: false, storage, random })).toBe('');
        expect(browserId({ storage: null, random })).toBe('');
        expect(browserId({ storage: { getItem: () => { throw new Error('blocked'); } }, random })).toBe('');
    });

    test('one post per click id, text/plain, with the site key and nothing else', async () => {
        const session = memory(); const local = memory(); const rec = recorder();
        const args = { location: landing('?hsid=123456&sid=9113&eid=77&gclid=abc'), session, local, random, fetchImpl: rec.fetchImpl };
        expect(await reportCpcClick(args)).toBe(true);
        expect(rec.calls).toHaveLength(1);
        expect(rec.calls[0].url).toBe('https://16s3asw7j0.execute-api.us-east-1.amazonaws.com/prod/cpc');
        expect(rec.calls[0].init.method).toBe('POST');
        expect(rec.calls[0].init.headers['Content-Type']).toBe('text/plain');
        expect(rec.calls[0].init.credentials).toBe('omit');
        const body = JSON.parse(rec.calls[0].init.body);
        expect(Object.keys(body).sort()).toEqual(['bid', 'eid', 'hsid', 'sid', 'siteKey']);
        expect(body).toMatchObject({ siteKey: 'unitedstatescredit.com', hsid: '123456', sid: '9113', eid: '77' });
        expect(body.bid).toMatch(/^[a-f0-9]{32}$/);
        // A reload, or another /loans page in the same tab, posts nothing.
        expect(await reportCpcClick(args)).toBe(false);
        expect(rec.calls).toHaveLength(1);
        // A second click id is its own post, with the same browser id.
        expect(await reportCpcClick({ ...args, location: landing('?hsid=123457&sid=9113') })).toBe(true);
        expect(JSON.parse(rec.calls[1].init.body).bid).toBe(body.bid);
    });

    test('an opted-out browser posts its click id without a browser id, and none is stored', async () => {
        const local = memory(); const rec = recorder();
        expect(await reportCpcClick({ location: landing('?hsid=42&sid=9113'), privacySuppressed: true, session: memory(), local, random, fetchImpl: rec.fetchImpl })).toBe(true);
        expect(JSON.parse(rec.calls[0].init.body).bid).toBe('');
        expect(local._m.size).toBe(0);
    });

    test('no click id, or a failing network: nothing thrown', async () => {
        const rec = recorder();
        expect(await reportCpcClick({ location: landing('?sid=9113'), session: memory(), local: memory(), random, fetchImpl: rec.fetchImpl })).toBe(false);
        expect(rec.calls).toHaveLength(0);
        expect(await reportCpcClick({ location: landing('?hsid=7'), session: memory(), local: memory(), random, fetchImpl: async () => { throw new Error('offline'); } })).toBe(false);
        expect(await reportCpcClick({ location: landing('?hsid=8'), session: null, local: null, random, fetchImpl: rec.fetchImpl })).toBe(true);
    });
});
