/* eslint-disable no-template-curly-in-string -- the ${name} placeholders under test are literal strings */
import { fillTrackingTemplate, hasTemplate, TEMPLATE_KEYS } from './fillTrackingTemplate';

const tracking = { pid: '1234', sid: '7572', eid: 'camp1', hsid: 555, email: 'person@example.com', fname: 'Pat', zip: '30301' };

describe('fillTrackingTemplate', () => {
    test('replaces ${name} with the tracking value', () => {
        expect(fillTrackingTemplate('${eid}-${sid}', tracking)).toBe('camp1-7572');
        expect(fillTrackingTemplate('${ eid }/37103', tracking)).toBe('camp1/37103');
        expect(fillTrackingTemplate('hs-${hsid}', tracking)).toBe('hs-555');
    });
    test('an unknown or empty placeholder becomes empty', () => {
        expect(fillTrackingTemplate('${nope}-${sid}', tracking)).toBe('-7572');
        expect(fillTrackingTemplate('${uid}', tracking)).toBe('');
        expect(fillTrackingTemplate('${placement}', { placement: null })).toBe('');
    });
    test('never substitutes visitor PII', () => {
        expect(fillTrackingTemplate('${email}|${fname}|${zip}', tracking)).toBe('||30301');
        ['email', 'fname', 'lname', 'address', 'ip_address'].forEach((k) => expect(TEMPLATE_KEYS).not.toContain(k));
    });
    test('leaves plain values and non-strings alone, one pass only', () => {
        expect(fillTrackingTemplate('37103', tracking)).toBe('37103');
        expect(fillTrackingTemplate(6, tracking)).toBe(6);
        expect(fillTrackingTemplate(null, tracking)).toBeNull();
        expect(fillTrackingTemplate('${channelid}', { channelid: '${eid}' })).toBe('${eid}');
        expect(hasTemplate('${eid}')).toBe(true);
        expect(hasTemplate('plain')).toBe(false);
    });
});
