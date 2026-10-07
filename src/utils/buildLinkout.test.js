import buildLinkout from './buildLinkout';

const tracking = {
    pid: '1234', sid: '7572', eid: 'camp1', hsid: '555', uid: 'u1', fbid: null, gclid: null
};
const params = (url) => new URL(url).searchParams;
const lander = 'https://abouttopic.com/lander/choosing-a-local-roofing-contractor';

describe('buildLinkout — offerbucks', () => {
    test('forwards the inbound network params, encoding spaces as +, plus eid and hsid', () => {
        const t = { ...tracking, utm_source: 'facebook', adcreative: 'Compare Local Roofers', utm_term: 'feed', channelid: '37150', fbclid: 'fb.1.abc' };
        const url = buildLinkout(lander, 'offerbucks', t, { offerbucks: null });
        expect(url).toContain('adcreative=Compare+Local+Roofers');
        expect(url.split('?').length).toBe(2);
        const p = params(url);
        expect(p.get('utm_source')).toBe('facebook');
        expect(p.get('channelid')).toBe('37150');
        expect(p.get('utm_term')).toBe('feed');
        expect(p.get('fbclid')).toBe('fb.1.abc');
        expect(p.get('eid')).toBe('1234-7572-camp1');
        expect(p.get('hsid')).toBe('555');
        expect(p.has('subid2')).toBe(false);
    });

    test('falls back to the base offer config, then to sid for utm_term', () => {
        const config = { channelid: '37103', utm_source: 'taboola', adcreative: 'Fallback Ad', utm_term: 'site-a', kw: 'roof repair,roof cost', rs: 6 };
        const p = params(buildLinkout(lander, 'offerbucks', tracking, { offerbucks: config }));
        expect(p.get('utm_source')).toBe('taboola');
        expect(p.get('channelid')).toBe('37103');
        expect(p.get('adcreative')).toBe('Fallback Ad');
        expect(p.get('utm_term')).toBe('site-a');
        expect(p.get('kw')).toBe('roof repair,roof cost');
        expect(p.get('rs')).toBe('6');

        const noTerm = params(buildLinkout(lander, 'offerbucks', tracking, { offerbucks: { channelid: '37103' } }));
        expect(noTerm.get('utm_term')).toBe('7572');
        expect(noTerm.has('kw')).toBe(false);
        expect(noTerm.has('rs')).toBe(false);
    });

    test('inbound beats config, and channelid is passed through verbatim as a string', () => {
        const t = { ...tracking, channelid: 'camp1-37150', adcreative: 'Inbound Ad', utm_content: 'ignored when adcreative is present' };
        const p = params(buildLinkout(lander, 'offerbucks', t, { offerbucks: { channelid: '37103', adcreative: 'Config Ad' } }));
        expect(p.get('channelid')).toBe('camp1-37150');
        expect(p.get('adcreative')).toBe('Inbound Ad');
    });

    test('utm_content stands in for adcreative and placement for utm_term', () => {
        const p = params(buildLinkout(lander, 'offerbucks', { ...tracking, utm_content: 'Creative B', placement: 'pub-99' }));
        expect(p.get('adcreative')).toBe('Creative B');
        expect(p.get('utm_term')).toBe('pub-99');
    });

    test('normalizes utm_source, infers it from click ids, and omits it when unknown', () => {
        const source = (t, offer) => params(buildLinkout(lander, 'offerbucks', { ...tracking, ...t }, offer)).get('utm_source');
        expect(source({ utm_source: 'FB' })).toBe('facebook');
        expect(source({ utm_source: 'loan-7572', fbclid: 'x' })).toBe('facebook');
        expect(source({ tblci: 'tb1' })).toBe('taboola');
        expect(source({ ttclid: 'tt1' })).toBe('tiktok');
        expect(source({ ob_click_id: 'ob1' })).toBe('outbrain');
        expect(source({ gclid: 'g1' })).toBe('gdn');
        expect(source({ utm_source: 'loan-7572' }, { offerbucks: { utm_source: 'outbrain' } })).toBe('outbrain');
        expect(source({ utm_source: 'loan-7572' })).toBeNull();
    });

    test('every present click id rides along', () => {
        const p = params(buildLinkout(lander, 'offerbucks', { ...tracking, gclid: 'g1', ttclid: 'tt1', ob_click_id: 'ob1', tblci: 'tb1' }));
        expect(p.get('gclid')).toBe('g1');
        expect(p.get('ttclid')).toBe('tt1');
        expect(p.get('ob_click_id')).toBe('ob1');
        expect(p.get('tblci')).toBe('tb1');
    });

    test('drops an out-of-range rs and tolerates a missing 4th argument', () => {
        expect(params(buildLinkout(lander, 'offerbucks', tracking, { offerbucks: { rs: 25 } })).has('rs')).toBe(false);
        expect(() => buildLinkout(lander, 'offerbucks', tracking)).not.toThrow();
        expect(params(buildLinkout(lander, 'offerbucks', tracking)).get('eid')).toBe('1234-7572-camp1');
    });
});

describe('buildLinkout — existing shapes are unchanged', () => {
    test('peak', () => {
        expect(buildLinkout('https://peak.example.com/go', 'peak', tracking))
            .toBe('https://peak.example.com/go?eid=1234-7572-camp1&s1=7572&s2=camp1&s3=555&pclid=u1&subid2=555');
    });
    test('default and unknown shapes', () => {
        expect(buildLinkout('https://s1.example.com/go?x=1', 'default', tracking))
            .toBe('https://s1.example.com/go?x=1&eid=1234-7572-camp1&subid2=555');
        expect(buildLinkout('https://s1.example.com/go', 'base', tracking))
            .toBe('https://s1.example.com/go?eid=1234-7572-camp1&subid2=555');
    });
    test('gclid rides along in the base step', () => {
        expect(buildLinkout('https://s1.example.com/go', 'default', { ...tracking, gclid: 'g1' }))
            .toBe('https://s1.example.com/go?eid=1234-7572-camp1&gclid=g1&subid2=555');
    });
});
