import { readAnswerRaise, writeAnswerRaise, levelWithRaise, raisePlan, isAnswerLevel, forcedAdLevel, isLoansPath, readCachedLevel, writeCachedLevel, fetchAdLevel, resolveAdLevel, AD_LEVEL_TTL_MS, adLevelEndpoint } from './adLevel';

const ok = (body) => ({ ok: true, json: async () => body });
const fetchWith = (body) => jest.fn(async () => ok(body));

beforeEach(() => { window.sessionStorage.clear(); });

describe('forcedAdLevel — the gates the page keeps whatever the engine says', () => {
    test('/loans asks the engine like every page (the owner, 2026-11-06); ads=no still wins there', () => {
        expect(forcedAdLevel({ pathname: '/loans' })).toBeNull();
        expect(forcedAdLevel({ pathname: '/loans/privacy-choices', ads: '' })).toBeNull();
        expect(forcedAdLevel({ pathname: '/loans', ads: 'yes' })).toBeNull();
        expect(forcedAdLevel({ pathname: '/loans', ads: 'no' })).toBe(0);
        expect(isLoansPath('/loans')).toBe(true);
        expect(isLoansPath('/loans/privacy-choices')).toBe(true);
        expect(isLoansPath('/loansx')).toBe(false);
        expect(isLoansPath('/finder')).toBe(false);
    });
    test('everywhere else ads=no is a manual off', () => {
        expect(forcedAdLevel({ pathname: '/rsoc', ads: 'no' })).toBe(0);
        expect(forcedAdLevel({ pathname: '/rsoc' })).toBeNull();
        expect(forcedAdLevel({ pathname: '/finder', ads: 'yes' })).toBeNull();
    });
    test('a privacy opt-out wins over everything', () => {
        expect(forcedAdLevel({ pathname: '/rsoc', ads: 'yes', privacySuppressed: true })).toBe(0);
    });
});

describe('the session cache', () => {
    test('round-trips a level and expires after the TTL', () => {
        writeCachedLevel('10337', 'GoogleNew', { level: 3, match: 'rule' }, 1000);
        expect(readCachedLevel('10337', 'GoogleNew', 1000 + AD_LEVEL_TTL_MS - 1)).toEqual({ level: 3, match: 'rule', cached: true });
        expect(readCachedLevel('10337', 'GoogleNew', 1000 + AD_LEVEL_TTL_MS + 1)).toBeNull();
    });
    test('keeps a "switched off" answer too', () => {
        writeCachedLevel('1', 'x', { level: null, match: 'disabled' }, 5);
        expect(readCachedLevel('1', 'x', 6)).toEqual({ level: null, match: 'disabled', cached: true });
    });
    test('ignores garbage', () => {
        window.sessionStorage.setItem('adlevel:1:x', '{nope');
        expect(readCachedLevel('1', 'x')).toBeNull();
    });
});

describe('fetchAdLevel — one bounded GET, never a throw', () => {
    test('asks the engine with the site key, sid and eid', async () => {
        const f = fetchWith({ enabled: true, level: 2, match: 'sid', version: 9 });
        const r = await fetchAdLevel({ sid: '10337', eid: 'Google New', fetchImpl: f, endpoint: 'https://engine.test/ad-level' });
        expect(r).toEqual({ level: 2, match: 'sid' });
        expect(f.mock.calls[0][0]).toBe('https://engine.test/ad-level?siteKey=unitedstatescredit.com&sid=10337&eid=Google%20New');
    });
    test('switched off reads as no level', async () => {
        expect(await fetchAdLevel({ sid: '1', eid: 'x', fetchImpl: fetchWith({ enabled: false, level: null, match: 'disabled' }) })).toEqual({ level: null, match: 'disabled' });
    });
    test('a bad status, bad JSON, a bad level or no fetch is null', async () => {
        expect(await fetchAdLevel({ sid: '1', eid: 'x', fetchImpl: jest.fn(async () => ({ ok: false, status: 400 })) })).toBeNull();
        expect(await fetchAdLevel({ sid: '1', eid: 'x', fetchImpl: jest.fn(async () => ({ ok: true, json: async () => { throw new Error('bad json'); } })) })).toBeNull();
        expect(await fetchAdLevel({ sid: '1', eid: 'x', fetchImpl: fetchWith({ enabled: true, level: 7 }) })).toBeNull();
        expect(await fetchAdLevel({ sid: '1', eid: 'x', fetchImpl: jest.fn(async () => { throw new Error('network'); }) })).toBeNull();
        expect(await fetchAdLevel({ sid: '1', eid: 'x', fetchImpl: undefined })).toBeNull();
    });
    test('gives up after the timeout', async () => {
        jest.useFakeTimers();
        const never = jest.fn((url, { signal }) => new Promise((_, reject) => { signal.addEventListener('abort', () => reject(new Error('aborted'))); }));
        const p = fetchAdLevel({ sid: '1', eid: 'x', fetchImpl: never, timeoutMs: 50 });
        jest.advanceTimersByTime(60);
        await expect(p).resolves.toBeNull();
        jest.useRealTimers();
    });
});

describe('resolveAdLevel — cache, then the engine', () => {
    test('caches a level and a switched-off answer, never a failure', async () => {
        const f = fetchWith({ enabled: true, level: 1, match: 'rule' });
        expect(await resolveAdLevel({ sid: '2', eid: 'y', fetchImpl: f })).toEqual({ level: 1, match: 'rule' });
        expect(await resolveAdLevel({ sid: '2', eid: 'y', fetchImpl: f })).toEqual({ level: 1, match: 'rule', cached: true });
        expect(f).toHaveBeenCalledTimes(1);
        const off = fetchWith({ enabled: false });
        await resolveAdLevel({ sid: '3', eid: 'z', fetchImpl: off });
        expect(await resolveAdLevel({ sid: '3', eid: 'z', fetchImpl: off })).toEqual({ level: null, match: 'disabled', cached: true });
        const down = jest.fn(async () => ({ ok: false }));
        expect(await resolveAdLevel({ sid: '4', eid: 'w', fetchImpl: down })).toBeNull();
        await resolveAdLevel({ sid: '4', eid: 'w', fetchImpl: down });
        expect(down).toHaveBeenCalledTimes(2);
    });
});

describe('adLevelEndpoint — the engine stage for the host', () => {
    test('staging and localhost read the dev stage, every other host production', () => {
        expect(adLevelEndpoint('staging.unitedstatescredit.com')).toBe('https://lq97621kpg.execute-api.us-east-1.amazonaws.com/dev/ad-level');
        expect(adLevelEndpoint('www.unitedstatescredit.com')).toBe('https://16s3asw7j0.execute-api.us-east-1.amazonaws.com/prod/ad-level');
    });
});

// The loan pages' visitor id (2026-11-10; routing-engine ENGINE.md § Visit assignment).
describe('the visitor id — /loans only', () => {
    const { visitorIdFor, reportAppliedLevel, writeLevelToUrl } = require('./adLevel');

    test('an hsid is a visitor id on the loan pages and nowhere else', () => {
        expect(visitorIdFor({ pathname: '/loans', hsid: '123456' })).toBe('123456');
        expect(visitorIdFor({ pathname: '/loans/privacy-choices', hsid: 123456 })).toBe('123456');
        expect(visitorIdFor({ pathname: '/rsoc', hsid: '123456' })).toBeNull();
        expect(visitorIdFor({ pathname: '/', hsid: '123456' })).toBeNull();
    });
    test('zero, nothing and anything malformed is no id', () => {
        for (const hsid of [0, '0', '', null, undefined, 'a b', 'x'.repeat(65), '<script>']) expect(visitorIdFor({ pathname: '/loans', hsid })).toBeNull();
    });
    test('without an id the request and the answer are exactly as before', async () => {
        const f = fetchWith({ enabled: true, level: 2, match: 'sid' });
        expect(await fetchAdLevel({ sid: '1', eid: 'x', fetchImpl: f, endpoint: 'https://e/ad-level' })).toEqual({ level: 2, match: 'sid' });
        expect(f.mock.calls[0][0]).not.toMatch(/vid=|applied=/);
    });
    test('with one, the id rides the question and the answer says why', async () => {
        const f = fetchWith({ enabled: true, level: 0, match: 'sid', reason: 'experiment', experiment_id: 'x1', arm: 0 });
        expect(await fetchAdLevel({ sid: '1', eid: 'x', vid: '777', fetchImpl: f, endpoint: 'https://e/ad-level' })).toEqual({ level: 0, match: 'sid', reason: 'experiment', experimentId: 'x1', arm: 0 });
        expect(f.mock.calls[0][0]).toMatch(/&vid=777$/);
    });
    test('an answer for one visitor is never served to another from the cache', async () => {
        const a = fetchWith({ enabled: true, level: 0, match: 'sid', reason: 'experiment', experiment_id: 'x1', arm: 0 });
        const b = fetchWith({ enabled: true, level: 2, match: 'sid', reason: 'experiment', experiment_id: 'x1', arm: 1 });
        expect((await resolveAdLevel({ sid: '1', eid: 'x', vid: 'a', fetchImpl: a })).level).toBe(0);
        expect((await resolveAdLevel({ sid: '1', eid: 'x', vid: 'b', fetchImpl: b })).level).toBe(2);
        expect((await resolveAdLevel({ sid: '1', eid: 'x', vid: 'a', fetchImpl: b }))).toEqual({ level: 0, match: 'sid', reason: 'experiment', experimentId: 'x1', arm: 0, cached: true });
        expect(b).toHaveBeenCalledTimes(1);
    });
    test('a level applied before the id existed is reported once', async () => {
        const f = fetchWith({ enabled: true, level: 2, match: 'sid' });
        expect(await reportAppliedLevel({ sid: '1', eid: 'x', vid: '888', level: 3, fetchImpl: f, endpoint: 'https://e/ad-level' })).toBe(true);
        expect(f.mock.calls[0][0]).toMatch(/&vid=888&applied=3$/);
        expect(await reportAppliedLevel({ sid: '1', eid: 'x', vid: '888', level: 3, fetchImpl: f })).toBe(false);
        expect(f).toHaveBeenCalledTimes(1);
        const g = fetchWith({ enabled: false });
        await reportAppliedLevel({ sid: '1', eid: 'x', vid: '889', level: null, fetchImpl: g, endpoint: 'https://e/ad-level' });
        expect(g.mock.calls[0][0]).toMatch(/&applied=legacy$/);
        expect(await reportAppliedLevel({ sid: '1', eid: 'x', vid: null, level: 1, fetchImpl: g })).toBe(false);
    });
    test('the level is written into the loan page URL, every other param kept', () => {
        window.history.replaceState({ k: 1 }, '', '/loans?sid=10337&eid=GoogleNew&cid1=55#top');
        expect(writeLevelToUrl({ level: 2, experimentId: 'x1', arm: 1 })).toBe(true);
        expect(window.location.search).toBe('?sid=10337&eid=GoogleNew&cid1=55&adl=2&axp=x1.1');
        expect(window.location.hash).toBe('#top');
        expect(window.history.state).toEqual({ k: 1 });
        writeLevelToUrl({ level: null });
        expect(window.location.search).toBe('?sid=10337&eid=GoogleNew&cid1=55&adl=legacy');
    });
    test('and never on another page', () => {
        window.history.replaceState(null, '', '/rsoc?sid=1');
        expect(writeLevelToUrl({ level: 3 })).toBe(false);
        expect(window.location.search).toBe('?sid=1');
    });
});

describe('answer rules — a raise the loan form earned', () => {
    test('only levels 2 and 3 can be granted', () => {
        expect([0, 1, 2, 3, 4, '2', null].map(isAnswerLevel)).toEqual([false, false, true, true, false, false, false]);
    });
    test('the raise is kept for the session and never lowered', () => {
        expect(readAnswerRaise()).toBeNull();
        expect(writeAnswerRaise(1)).toBe(false);
        expect(readAnswerRaise()).toBeNull();
        expect(writeAnswerRaise(3)).toBe(true);
        expect(readAnswerRaise()).toBe(3);
        writeAnswerRaise(2);
        expect(readAnswerRaise()).toBe(3);
        window.sessionStorage.setItem('adlevel-answer', 'x');
        expect(readAnswerRaise()).toBeNull();
    });
    test('at load a loan page lifts the engine\'s level to the raise', () => {
        expect(levelWithRaise({ level: 0, raise: 2, pathname: '/loans' })).toEqual({ level: 2, raised: true });
        expect(levelWithRaise({ level: 1, raise: 3, pathname: '/loans/request' })).toEqual({ level: 3, raised: true });
        expect(levelWithRaise({ level: 3, raise: 2, pathname: '/loans' })).toEqual({ level: 3, raised: false });
        expect(levelWithRaise({ level: 2, raise: 2, pathname: '/loans' })).toEqual({ level: 2, raised: false });
        expect(levelWithRaise({ level: 0, raise: null, pathname: '/loans' })).toEqual({ level: 0, raised: false });
    });
    test('never off the loan pages, never while the levels are switched off', () => {
        expect(levelWithRaise({ level: 0, raise: 3, pathname: '/finder' })).toEqual({ level: 0, raised: false });
        expect(levelWithRaise({ level: null, raise: 3, pathname: '/loans' })).toEqual({ level: null, raised: false });
    });
    test('what a raise does to a page that has decided', () => {
        expect(raisePlan({ target: 2, applied: '0', tag: null })).toBe('inject');
        expect(raisePlan({ target: 3, applied: '0', tag: null })).toBe('inject');
        expect(raisePlan({ target: 2, applied: '1', tag: 'plain' })).toBe('next-load');
        expect(raisePlan({ target: 3, applied: '2', tag: 'client' })).toBe('next-load');
        expect(raisePlan({ target: 2, applied: '2', tag: 'client' })).toBe('none');
        expect(raisePlan({ target: 2, applied: '3', tag: 'client' })).toBe('none');
    });
    test('ads=no and a privacy opt-out stop it; so do the legacy gates and a bad level', () => {
        expect(raisePlan({ target: 2, forced: true, applied: '0', tag: null })).toBe('blocked');
        expect(raisePlan({ target: 2, applied: 'legacy', tag: null })).toBe('ignored');
        expect(raisePlan({ target: 1, applied: '0', tag: null })).toBe('ignored');
        expect(raisePlan({ target: NaN, applied: '0', tag: null })).toBe('ignored');
    });
    test('the emergency switch reads 0 like any source: the raise still injects', () => {
        expect(raisePlan({ target: 2, applied: '0', tag: null })).toBe('inject');
    });
});
