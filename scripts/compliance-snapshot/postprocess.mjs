// What makes a rendered block safe to publish as a static page: no script, no
// live form, no control that could act, no image, no inline style from the
// live design, every id unique across the page. Applied per block, before
// hashing, so the hash is of the words the published page carries; a final
// page-level pass asserts nothing slipped through.
import { dom } from './lib/text.mjs';

const ID_REFS = ['aria-labelledby', 'aria-describedby', 'aria-controls', 'for'];

export const sanitizeBlock = (html, { prefix }) => {
    const { document } = dom(`<body>${html}</body>`).window;
    const { body } = document;

    for (const el of body.querySelectorAll('script, style, link, iframe, object, embed, video, audio, noscript')) el.remove();

    // A form becomes a group: nothing to submit, nothing to post to.
    for (const form of [...body.querySelectorAll('form')]) {
        const group = document.createElement('div');
        group.setAttribute('role', 'group');
        group.setAttribute('data-snapshot-was', 'form');
        if (form.id) group.id = form.id;
        if (form.className) group.className = form.className;
        while (form.firstChild) group.appendChild(form.firstChild);
        form.replaceWith(group);
    }
    for (const el of body.querySelectorAll('input[type="hidden"]')) el.remove();
    for (const el of body.querySelectorAll('input, select, textarea, button')) {
        if (el.hasAttribute('checked')) throw new Error(`snapshot: a control renders checked (${el.outerHTML.slice(0, 120)})`);
        el.setAttribute('disabled', '');
        el.setAttribute('aria-disabled', 'true');
        for (const attr of ['name', 'required', 'autocomplete', 'formaction', 'form']) el.removeAttribute(attr);
        if (el.tagName === 'BUTTON' && (el.getAttribute('type') || 'submit') === 'submit') el.setAttribute('type', 'button');
    }

    // The live design's inline styles and Radium's per-render classes go; the
    // snapshot brings its own stylesheet.
    for (const el of body.querySelectorAll('*')) {
        for (const attr of [...el.attributes]) {
            if (/^on/i.test(attr.name) || attr.name === 'style' || attr.name === 'data-radium') el.removeAttribute(attr.name);
        }
        if (el.classList.length) {
            for (const cls of [...el.classList]) if (/^rmq-/.test(cls)) el.classList.remove(cls);
            if (!el.classList.length) el.removeAttribute('class');
        }
    }

    for (const a of body.querySelectorAll('a[href]')) {
        const href = a.getAttribute('href') || '';
        if (a.getAttribute('target') === '_blank' || /^https?:\/\//i.test(href)) {
            const rel = new Set((a.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
            rel.add('noopener'); rel.add('noreferrer');
            a.setAttribute('rel', [...rel].join(' '));
        }
    }

    for (const d of body.querySelectorAll('details')) d.setAttribute('open', '');

    for (const img of [...body.querySelectorAll('img')]) {
        const span = document.createElement('span');
        span.className = 'snap-img';
        span.textContent = `[image: ${img.getAttribute('alt') || 'no alt text'}]`;
        img.replaceWith(span);
    }

    // Ids are unique inside a block; across a page that repeats the same
    // section ids for every document they are not, so they carry the block's
    // prefix, and every in-block reference follows.
    if (prefix) {
        const ids = new Set([...body.querySelectorAll('[id]')].map((el) => el.id));
        const renamed = (id) => `${prefix}--${id}`;
        for (const el of body.querySelectorAll('[id]')) el.id = renamed(el.id);
        for (const a of body.querySelectorAll('a[href^="#"]')) {
            const frag = a.getAttribute('href').slice(1);
            if (ids.has(frag)) a.setAttribute('href', `#${renamed(frag)}`);
        }
        for (const attr of ID_REFS) {
            for (const el of body.querySelectorAll(`[${attr}]`)) {
                const value = el.getAttribute(attr).split(/\s+/).map((ref) => (ids.has(ref) ? renamed(ref) : ref)).join(' ');
                el.setAttribute(attr, value);
            }
        }
    }

    return body.innerHTML;
};

// The published page, checked once more as a whole.
export const assertPageSafe = (html, name) => {
    const { document } = dom(html).window;
    const problems = [];
    const count = (sel) => document.querySelectorAll(sel).length;
    if (count('script')) problems.push('script');
    if (count('iframe, object, embed, video, audio')) problems.push('embedded media');
    if (count('form')) problems.push('form');
    if (count('img')) problems.push('img');
    if (count('link[rel="stylesheet"]')) problems.push('external stylesheet');
    if (count('style') !== 1) problems.push(`${count('style')} style elements (expected the snapshot stylesheet only)`);
    if (count('[checked]')) problems.push('a checked control');
    for (const el of document.querySelectorAll('*')) {
        for (const attr of el.attributes) if (/^on/i.test(attr.name)) { problems.push(`${attr.name} handler`); break; }
    }
    if (!document.querySelector('meta[name="robots"][content="noindex,nofollow,noarchive"]')) problems.push('robots meta');
    const ids = [...document.querySelectorAll('[id]')].map((el) => el.id);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (dupes.length) problems.push(`duplicate ids: ${[...new Set(dupes)].slice(0, 8).join(', ')}`);
    if (problems.length) throw new Error(`snapshot page ${name} is not safe to publish: ${problems.join('; ')}`);
};
