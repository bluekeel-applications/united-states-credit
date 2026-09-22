// The link inventory: every anchor in every rendered block, with where it
// came from, and whether the registry says its destination exists. The SPA
// fallback answers 200 to any path, so a live HTTP status can never say a
// legal link is broken; the registry can.
import { dom } from './lib/text.mjs';

// -> [{ source, section, text, href, target }]
export const extractLinks = (html, source) => {
    const { document } = dom(`<body>${html}</body>`).window;
    return [...document.querySelectorAll('a[href]')].map((a) => ({
        source,
        section: a.closest('section[id]')?.id || null,
        text: String(a.textContent || '').replace(/\s+/g, ' ').trim(),
        href: a.getAttribute('href'),
        target: a.getAttribute('target') || null,
    }));
};

// All the ids a block renders, so an in-page anchor can be checked.
export const idsIn = (html) => {
    const { document } = dom(`<body>${html}</body>`).window;
    return new Set([...document.querySelectorAll('[id]')].map((el) => el.id));
};

// ctx: { loansHome, pathFor, legalSlugs: Set, legacySlugs: {old: new}, idsByPage: {slug: Set}, ownIds: Set }
export const classifyHref = (href, ctx) => {
    const h = String(href || '').trim();
    if (/^mailto:/i.test(h)) return { resolves: 'mailto' };
    if (/^tel:/i.test(h)) return { resolves: 'tel' };
    if (/^https?:\/\//i.test(h)) {
        try {
            const u = new URL(h);
            return { resolves: 'external', host: u.host };
        } catch {
            return { resolves: 'UNRESOLVED', reason: 'malformed URL' };
        }
    }
    if (h.startsWith('#')) {
        const frag = h.slice(1);
        if (!frag) return { resolves: 'anchor-ok', note: 'top of page' };
        return ctx.ownIds?.has(frag) || frag === 'main' ? { resolves: 'anchor-ok' } : { resolves: 'anchor-missing', fragment: frag };
    }
    const [pathPart, frag = null] = h.split('#');
    const path = pathPart.replace(/\/+$/, '') || '/';
    if (path === ctx.loansHome) return frag ? anchorOn(ctx, 'home', frag, 'registered') : { resolves: 'registered', page: 'home' };
    if (!path.startsWith(`${ctx.loansHome}/`)) return { resolves: 'site-route', note: 'outside /loans; not in the registry' };
    const rest = path.slice(ctx.loansHome.length + 1);
    if (rest === 'legal-center') return frag ? anchorOn(ctx, 'legal-center', frag, 'registered') : { resolves: 'registered', page: 'legal-center' };
    if (ctx.legalSlugs.has(rest)) return frag ? anchorOn(ctx, rest, frag, 'registered') : { resolves: 'registered', page: rest };
    if (ctx.legacySlugs[rest]) return { resolves: 'legacy-redirect', page: ctx.legacySlugs[rest], note: `${rest} → ${ctx.legacySlugs[rest]}` };
    if (rest.startsWith('legal-center/')) {
        const requested = rest.slice('legal-center/'.length);
        const target = ctx.legacySlugs[requested] ?? requested;
        if (ctx.legalSlugs.has(target)) return { resolves: 'legacy-redirect', page: target, note: `legal-center/${requested} → ${target}` };
        return { resolves: 'legacy-redirect', page: 'legal-center', note: `legal-center/${requested} → legal-center (unknown slug lands on the hub)` };
    }
    return { resolves: 'UNRESOLVED', reason: `no page "${rest}" in the registry` };
};

const anchorOn = (ctx, page, frag, ok) => {
    const ids = ctx.idsByPage?.[page];
    if (ids && (ids.has(frag) || frag === 'main')) return { resolves: ok, page, fragment: frag };
    return { resolves: 'anchor-missing', page, fragment: frag };
};

export const inventory = (links, ctx) => links.map((link) => ({ ...link, ...classifyHref(link.href, { ...ctx, ownIds: ctx.idsBySource?.[link.source] }) }));
