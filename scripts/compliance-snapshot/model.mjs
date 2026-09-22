// The one in-memory model both the HTML pages and the JSON are produced
// from: every legal page, the hub, the site chrome and landing disclosures,
// the privacy-choices variants, the partner lists, the form (from bkform's
// manifest), the link inventory, the hashes and the build metadata. Nothing
// here is written by hand; every block is a live component rendered
// (site-entry.jsx) or the manifest's own data.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { classifyHref as classify, extractLinks, idsIn, inventory } from './links.mjs';
import { NORMALIZATION, hashHtml, normalizeText, sha256 } from './lib/text.mjs';
import { buildFormModel, loadManifest, manifestUrlFor, sourceLabelFor } from './manifest.mjs';
import { collectBuild, environmentFor, fetchProductionBuild } from './metadata.mjs';
import { loadPartners } from './partners.mjs';
import { sanitizeBlock } from './postprocess.mjs';

const SIGNAL_STATES = [
    { id: 'no-signal', label: 'No Global Privacy Control signal, no stored opt-out', state: { gpc: false, optedOut: false } },
    { id: 'opted-out', label: 'Opt-out stored in this browser (no GPC signal)', state: { gpc: false, optedOut: true } },
    { id: 'gpc', label: 'Global Privacy Control signal on', state: { gpc: true, optedOut: true } },
];

// A rendered block: the live HTML (sanitized), its words, its hash, its links.
const block = ({ id, source, title, html, prefix = id, route = null, extra = {} }) => {
    const links = extractLinks(html, source);
    const ids = idsIn(html);
    const clean = sanitizeBlock(html, { prefix });
    const text = normalizeText(clean);
    return { id, source, title, route, html: clean, text, sha256: sha256(text), links, ids, ...extra };
};

export const buildModel = async ({ root, hostname, site, pkg, manifestUrl, prodOrigin, log = () => {} }) => {
    const {
        registry, CONTENT_BY_SLUG, bkformTargets, marketplacePartnersEndpoint, privacyRequestEndpoint, isDevHost,
        REQUEST_TYPES, SIGNAL_COPY, STATUS_COPY, requestMailto, signalMessage, datesLine, render,
    } = site;
    const {
        LEGAL_PAGES, LEGAL_CENTER_META, HOME_META, LEGACY_SLUGS, LOANS_HOME, pathFor, LEGAL_CONTENT_VERSION,
        LEGAL_EFFECTIVE_DATE, LEGAL_LAST_UPDATED, LOAN_FORM_DOCS_EFFECTIVE_DATE, MARKETING_PARTNERS, CONTACT_EMAIL,
    } = registry;

    const environment = environmentFor({ hostname, isDevHost });
    const targets = bkformTargets(hostname);
    const generatedAt = new Date().toISOString();

    // ---- sources fetched at build time ----------------------------------
    const partners = await loadPartners({ endpoint: marketplacePartnersEndpoint(hostname) });
    log(`partners: ${partners.status}${partners.list ? ` version ${partners.list.version}, ${partners.list.count} partners` : ` (${partners.error})`}`);
    const url = manifestUrl || manifestUrlFor(targets);
    const { manifest, rawSha256 } = await loadManifest({ url });
    log(`manifest: bkform ${manifest.sdk.version}, content hash ${manifest.contentHash.slice(0, 12)}, from ${sourceLabelFor(targets)}`);
    const build = collectBuild({ root, pkg });
    const production = await fetchProductionBuild({ origin: prodOrigin, stagingSha: build.git_sha });
    log(`production: ${production.status}${production.git_sha ? ` ${production.git_sha.slice(0, 7)} (${production.parity})` : ` (${production.reason})`}`);

    const partnersCtx = { phase: partners.phase, list: partners.list };

    // ---- the Legal Center -----------------------------------------------
    const pages = LEGAL_PAGES.map((page) => {
        const content = CONTENT_BY_SLUG[page.slug];
        if (!content) throw new Error(`no content module for ${page.slug}`);
        const html = render.legalArticle(page, content, { partners: partnersCtx });
        const b = block({ id: `legal-${page.slug}`, source: `legal:${page.slug}`, title: page.h1, html, prefix: page.slug, route: pathFor(page.slug) });
        return {
            ...b,
            slug: page.slug,
            document_title: page.documentTitle,
            meta_description: page.metaDescription,
            lede: page.lede,
            card: page.card,
            footer_column: page.footer?.column || null,
            effective_date: content.effectiveDate || null,
            last_updated: content.lastUpdated || null,
            dates_line: content.effectiveDate ? datesLine(content) : null,
            content_version: LEGAL_CONTENT_VERSION,
            sections: content.sections.map((s) => ({ id: s.id, heading: s.heading })),
            dynamic_parts: dynamicPartsOf(page.slug),
        };
    });
    const hub = block({ id: 'legal-center-hub', source: 'legal:legal-center', title: LEGAL_CENTER_META.h1, html: render.hub(), prefix: 'legal-center', route: pathFor('legal-center') });

    // ---- site chrome and the landing page's disclosures -----------------
    const chrome = {
        header: block({ id: 'chrome-header', source: 'chrome:header', title: 'Site header (legal pages)', html: render.header() }),
        footer: block({ id: 'chrome-footer', source: 'chrome:footer', title: 'Site footer (every /loans page)', html: render.footer() }),
    };
    const landing = [
        ['hero', 'Landing hero (form card in its static visualization)', render.hero],
        ['trust-strip', 'Trust strip', render.trustStrip],
        ['how-it-works', 'How it works', render.howItWorks],
        ['notice', '"Know before you borrow" notice', render.notice],
        ['faq', 'FAQ (every answer expanded)', render.faq],
        ['legal-center-cta', 'Legal Center call to action', render.legalCenterCta],
    ].map(([id, title, fn]) => block({ id: `landing-${id}`, source: `landing:${id}`, title, html: fn(), route: LOANS_HOME }));

    // ---- privacy-choices variants ---------------------------------------
    const endpointHere = privacyRequestEndpoint(hostname);
    const privacy = {
        environment_has_request_form: !!endpointHere,
        signal: SIGNAL_STATES.map((s) => ({ ...s, text: signalMessage(s.state), ...pick(block({ id: `privacy-signal-${s.id}`, source: 'privacy-choices:signal', title: s.label, html: render.privacySignal(s.state) })) })),
        signal_copy: SIGNAL_COPY,
        request_route: [
            { id: 'form', label: 'Host with a privacy-request endpoint (this environment)', ...pick(block({ id: 'privacy-request-form', source: 'privacy-choices:request-route', title: 'Request route: the form', html: render.privacyRequest(endpointHere || 'https://example.invalid/privacy-request'), prefix: 'privacy-request-form' })) },
            { id: 'email', label: 'Host without a privacy-request endpoint', ...pick(block({ id: 'privacy-request-email', source: 'privacy-choices:request-route', title: 'Request route: the email links', html: render.privacyRequest(null), prefix: 'privacy-request-email' })) },
        ],
        contact_records_route: [true, false].map((hasForm) => ({ has_form: hasForm, ...pick(block({ id: `privacy-contact-records-${hasForm ? 'form' : 'email'}`, source: 'privacy-choices:contact-records', title: `Contact-records line (${hasForm ? 'form' : 'email links'})`, html: render.contactRecordsRoute(hasForm) })) })),
        california_route: [true, false].map((hasForm) => ({ has_form: hasForm, ...pick(block({ id: `privacy-california-${hasForm ? 'form' : 'email'}`, source: 'privacy-choices:california-route', title: `California authorization line (${hasForm ? 'form' : 'email links'})`, html: render.californiaAuthorizationRoute(hasForm) })) })),
        browser_opt_out: pick(block({ id: 'privacy-browser-opt-out', source: 'privacy-choices:browser-opt-out', title: 'Browser opt-out control (as first rendered)', html: render.browserOptOut() })),
        request_types: REQUEST_TYPES.map((t) => ({ value: t.value, label: t.label, needs: t.needs, email_link: requestMailto(t.label) })),
        status_copy: Object.fromEntries(Object.entries(STATUS_COPY).filter(([, v]) => typeof v === 'string')),
    };

    // ---- the form, from bkform's manifest ---------------------------------
    const legalSlugs = new Set(LEGAL_PAGES.map((p) => p.slug));
    const idsByPage = Object.fromEntries(pages.map((p) => [p.slug, p.ids]));
    idsByPage['legal-center'] = hub.ids;
    const linkCtx = { loansHome: LOANS_HOME, pathFor, legalSlugs, legacySlugs: LEGACY_SLUGS, idsByPage };
    const resolveSlug = (slug) => {
        if (/^mailto:/i.test(slug)) return { href: slug, resolves: 'mailto' };
        const href = pathFor(slug);
        const { resolves, ...rest } = classify(href, linkCtx);
        return { href, resolves, ...rest };
    };
    const form = buildFormModel(manifest, { resolveSlug, environmentMode: targets.firstOfferCheck, sourceLabel: sourceLabelFor(targets), rawSha256 });
    for (const v of form.variants) {
        if (v.printable_sample_html) { v.printable_sample_text = normalizeText(v.printable_sample_html); delete v.printable_sample_html; }
    }
    form.embed = {
        legal_base: LOANS_HOME,
        legal_version: LEGAL_CONTENT_VERSION,
        marketing_partners_version: MARKETING_PARTNERS.version,
        first_offer_check: targets.firstOfferCheck,
        site_key: site.BKFORM_SITE_KEY,
        source: 'src/components/Pages/LoanWrapper/components/BkFormEmbed.jsx (data-legal-base, data-legal-version, data-marketing-partners-version, data-first-offer-check)',
    };

    // ---- partner lists ----------------------------------------------------
    const referencedBy = (slug) => form.consents.filter((c) => c.links.some((l) => l.slug === slug)).map((c) => ({ key: c.key, step_number: c.step_number, required: c.required }));
    const mpPage = pages.find((p) => p.slug === 'marketplace-partners');
    const mkPage = pages.find((p) => p.slug === 'marketing-partners');
    const list = partners.list;
    const marketplaceHtml = list ? render.partnersList(list) : render.partnersUnavailable();
    const marketplaceBlock = block({ id: 'partners-marketplace', source: 'partners:marketplace', title: 'Marketplace Partners (current list)', html: marketplaceHtml, prefix: 'partners-marketplace' });
    const partnerLists = {
        marketplace: {
            title: mpPage.title,
            route: mpPage.route,
            document_title: mpPage.document_title,
            page_effective_date: mpPage.effective_date,
            source: 'marketplace-partners service (same endpoint the live page reads, per host)',
            status: partners.status,
            error: partners.error,
            version: list?.version ?? null,
            updated_at: list?.updated_at ?? null,
            last_confirmed_at: list?.last_confirmed_at ?? null,
            stale: list?.stale ?? null,
            count: list?.count ?? null,
            direct: list?.direct?.partners?.map((p) => ({ name: p.name, role: p.role })) ?? [],
            partners: list?.partners?.map((p) => ({ name: p.name, license: p.license || null })) ?? [],
            referenced_by: { fcra: referencedBy('marketplace-partners').filter((c) => c.key === 'consentFcra').length > 0, marketing: referencedBy('marketplace-partners').filter((c) => c.key !== 'consentFcra').length > 0, consents: referencedBy('marketplace-partners') },
            rendered: pick(marketplaceBlock),
            sha256: list ? sha256(`${list.version}\n${list.partners.map((p) => p.name).join('\n')}`) : marketplaceBlock.sha256,
            hash_rule: list ? 'sha256(version + names in API order)' : 'sha256(the unavailable notice as rendered)',
            direct_sha256: list?.direct ? sha256(`${list.direct.version || ''}\n${(list.direct.partners || []).map((p) => p.name).join('\n')}`) : null,
        },
        marketing: {
            title: mkPage.title,
            route: mkPage.route,
            document_title: mkPage.document_title,
            page_effective_date: mkPage.effective_date,
            source: 'src/components/Pages/LoanWrapper/loanPages.js MARKETING_PARTNERS',
            version: MARKETING_PARTNERS.version,
            updated: MARKETING_PARTNERS.updated,
            count: MARKETING_PARTNERS.partners.length,
            partners: MARKETING_PARTNERS.partners.map((p) => ({ name: p.name, role: p.role || null })),
            referenced_by: { fcra: referencedBy('marketing-partners').filter((c) => c.key === 'consentFcra').length > 0, marketing: referencedBy('marketing-partners').filter((c) => c.key !== 'consentFcra').length > 0, consents: referencedBy('marketing-partners') },
            rendered_page_sha256: mkPage.sha256,
            sha256: sha256(`${MARKETING_PARTNERS.version}\n${MARKETING_PARTNERS.updated}\n${MARKETING_PARTNERS.partners.map((p) => p.name).join('\n')}`),
            hash_rule: 'sha256(version + updated + names)',
        },
    };

    // ---- the link inventory ---------------------------------------------
    const blocks = [...pages, hub, chrome.header, chrome.footer, ...landing, marketplaceBlock];
    const idsBySource = Object.fromEntries(blocks.map((b) => [b.source, b.ids]));
    const siteLinks = inventory(blocks.flatMap((b) => b.links), { ...linkCtx, idsBySource });
    const links = [...siteLinks, ...form.links];
    const unresolved = links.filter((l) => l.resolves === 'UNRESOLVED' || l.resolves === 'anchor-missing');

    // ---- hashes ----------------------------------------------------------
    const hashes = {};
    const labels = {};
    const put = (key, label, hash) => { hashes[key] = hash; labels[key] = label; };
    for (const p of pages) put(`legal:${p.slug}`, `${p.title} (Legal Center page)`, p.sha256);
    put('legal:legal-center', 'Legal Center hub', hub.sha256);
    put('chrome:header', 'Site header', chrome.header.sha256);
    put('chrome:footer', 'Site footer', chrome.footer.sha256);
    for (const l of landing) put(`landing:${l.id.replace(/^landing-/, '')}`, l.title, l.sha256);
    for (const c of form.consents) put(`consent:${c.key}`, `Step ${c.step_number} ${c.key} consent text`, c.text_hash || c.template_hash);
    for (const t of form.tooltips) put(`tooltip:${t.step_id}:${t.field}`, `Step ${t.step_number} ${t.field} tooltip`, t.sha256);
    for (const s of form.steps) put(`form-step:${s.id}`, `Step ${s.index + 1} "${s.title}" copy`, sha256(stepText(s)));
    put('variant:california-financial-privacy-authorization', 'California Financial Privacy Authorization', form.variants[0].text_hash);
    for (const v of form.variants.slice(1)) put(`variant:${v.id}`, `Conditional rule ${v.id}`, sha256(JSON.stringify({ visible_in: v.visible_in, truth_table: v.truth_table, fields: v.fields?.map((f) => f.label) })));
    put('partners:marketplace', 'Marketplace Partners list', partnerLists.marketplace.sha256);
    put('partners:marketing', 'Marketing Partners list', partnerLists.marketing.sha256);
    for (const s of privacy.signal) put(`privacy-variant:signal:${s.id}`, `Privacy signal line (${s.label})`, s.sha256);
    for (const r of privacy.request_route) put(`privacy-variant:request-route:${r.id}`, `Privacy request route (${r.id})`, r.sha256);
    put('form:manifest', 'bkform compliance manifest (raw file)', rawSha256);
    put('form:manifest-content', 'bkform compliance manifest (content hash)', manifest.contentHash);

    const model = {
        snapshot_version: 1,
        environment,
        host: hostname,
        generated_at: generatedAt,
        build,
        production,
        legal: {
            content_version: LEGAL_CONTENT_VERSION,
            effective_date: LEGAL_EFFECTIVE_DATE,
            last_updated: LEGAL_LAST_UPDATED,
            loan_form_docs_effective_date: LOAN_FORM_DOCS_EFFECTIVE_DATE,
            contact_email: CONTACT_EMAIL,
            loans_home: LOANS_HOME,
            home_meta: HOME_META,
            legal_center_meta: LEGAL_CENTER_META,
            legacy_slugs: LEGACY_SLUGS,
        },
        legal_center: { hub, pages },
        site_chrome: { header: chrome.header, footer: chrome.footer, landing },
        privacy_choices: privacy,
        form,
        conditional_variants: form.variants,
        partner_lists: partnerLists,
        links,
        unresolved_links: unresolved,
        hashes: { normalization: NORMALIZATION, items: hashes, labels },
        _partners_ctx: partnersCtx,
    };
    return model;
};

const pick = (b) => ({ html: b.html, text: b.text, sha256: b.sha256, links: b.links });

const stepText = (s) => [s.title, s.blurb, s.note?.text, s.footer?.text, ...s.fieldEntries.map((f) => f.label.text), ...s.consentEntries.map((c) => c.label.text), s.perMode.on.assent?.text, s.perMode.off.assent?.text].filter(Boolean).join('\n');

const dynamicPartsOf = (slug) => ({
    'privacy-choices': ['PrivacySignalStatus (this build: no signal)', 'request route (this build: per the host\'s endpoint)'],
    'marketplace-partners': ['the current list, fetched at build time'],
}[slug] || []);

// The JSON is the model without the rendered HTML and the build-only context.
export const toJson = (model) => {
    const strip = (v) => {
        if (Array.isArray(v)) return v.map(strip);
        if (v instanceof Set) return [...v];
        if (v && typeof v === 'object') {
            const out = {};
            for (const [k, val] of Object.entries(v)) {
                if (k === 'html' || k === 'ids' || k.startsWith('_') || k === 'fieldEntries' || k === 'consentEntries') continue;
                if (typeof val === 'function') continue;
                out[k] = strip(val);
            }
            return out;
        }
        return v;
    };
    const json = strip(model);
    const { generated_at, ...rest } = json;
    json.hashes.model_sha256 = sha256(JSON.stringify(rest));
    return json;
};
