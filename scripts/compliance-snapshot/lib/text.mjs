// One text normalization and one hash, shared by the prerender (which stamps
// hashes into the pages and the JSON) and the verifier (which recomputes
// them from the built files). Change NORMALIZATION when the rule changes so
// old hashes are never compared with new ones.
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { JSDOM } = require('jsdom');

export const NORMALIZATION = 'usc-text-v1';

// The words as read: no scripts, no styles, nothing aria-hidden (the FAQ's
// decorative +/− glyphs), Unicode composed, NBSP a space, whitespace one
// space, trimmed. Applied to the element's textContent, so markup never
// changes a hash — only the words do.
export const normalizeText = (html) => {
    const dom = new JSDOM(`<body>${html}</body>`);
    const { body } = dom.window.document;
    for (const el of body.querySelectorAll('script, style, [aria-hidden="true"]')) el.remove();
    return normalizeString(body.textContent);
};

export const normalizeString = (text) => String(text ?? '')
    .normalize('NFC')
    .replace(/ /g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const sha256 = (text) => createHash('sha256').update(String(text), 'utf8').digest('hex');

export const hashHtml = (html) => sha256(normalizeText(html));

export const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const dom = (html) => new JSDOM(html);
