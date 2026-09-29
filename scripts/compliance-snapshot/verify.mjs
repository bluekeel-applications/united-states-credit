#!/usr/bin/env node
// Verifies the compliance snapshot — the built files (--build) before a
// deploy, and the published pages (--live <origin>) after one. Every check
// has an id (B01–B20, L01–L13) and a result: PASS, WARN or FAIL. A FAIL
// exits 1 unless --gate warn; the deploy workflow runs --build ahead of the
// sync and --live after the invalidation.
//
//   verify.mjs --build [--dir build] [--expect-sha <sha>] [--environment staging] [--quick]
//   verify.mjs --live <origin> [--expect-sha <sha>] [--expect-json <path>] [--retries 6] [--retry-delay 15] [--allow-redirects]
//   both: [--gate fail|warn] [--summary <file>] [--out <dir>] [--manifest-url <url>]
process.env.TZ = 'UTC';

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { APPLICANT, CONSENT_WORDING, EMAIL, EMAIL_ALLOWED, RETIRED_DIRECTORY, TIER1, TIER2, UNFINISHED } from './lib/forbidden.mjs';
import { fetchWithRetry } from './lib/http.mjs';
import { SPEC_MINIMUM, readRegistry } from './lib/registry.mjs';
import { dom, normalizeString, normalizeText, sha256 } from './lib/text.mjs';

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '../..');
const args = parseArgs(process.argv.slice(2));
const mode = args.build ? 'build' : args.live ? 'live' : null;
if (!mode) { console.error('usage: verify.mjs --build | --live <origin>'); process.exit(2); }

const ROUTES = ['/loans/compliance-snapshot', '/loans/compliance-snapshot/legal-center', '/loans/compliance-snapshot/form', '/loans/compliance-snapshot.json'];
// Words every snapshot index carries, as plain text and in the raw markup alike (no character an entity would stand for).
const MARKERS = ['Privacy Policy', 'Verify your identity', 'FCRA', 'Marketplace Partners', 'Communications Privacy Notice'];
const results = [];
const record = (id, status, title, detail = '') => { results.push({ id, status, title, detail }); };
const pass = (id, title, detail) => record(id, 'PASS', title, detail);
const warn = (id, title, detail) => record(id, 'WARN', title, detail);
const fail = (id, title, detail) => record(id, 'FAIL', title, detail);
const expect = (id, title, cond, detail = '') => (cond ? pass(id, title, detail) : fail(id, title, detail));

if (mode === 'build') await verifyBuild(); else await verifyLive();
finish();

// ---------------------------------------------------------------- build ----

async function verifyBuild() {
    const dir = resolve(ROOT, args.dir || 'build');
    const files = {
        index: join(dir, 'loans/compliance-snapshot/index.html'),
        legalCenter: join(dir, 'loans/compliance-snapshot/legal-center/index.html'),
        form: join(dir, 'loans/compliance-snapshot/form/index.html'),
        json: join(dir, 'loans/compliance-snapshot.json'),
    };
    const missing = Object.entries(files).filter(([, f]) => !existsSync(f)).map(([k]) => k);
    if (missing.length) { fail('B01', 'snapshot files present', `missing: ${missing.join(', ')}`); return; }
    const html = { index: readFileSync(files.index, 'utf8'), legalCenter: readFileSync(files.legalCenter, 'utf8'), form: readFileSync(files.form, 'utf8') };
    const docs = Object.fromEntries(Object.entries(html).map(([k, v]) => [k, dom(v).window.document]));
    let json;
    try { json = JSON.parse(readFileSync(files.json, 'utf8')); } catch (e) { fail('B01', 'snapshot files present', `JSON does not parse: ${e.message}`); return; }
    const small = Object.entries(html).filter(([, v]) => v.length < 20000).map(([k]) => k);
    const noMain = Object.entries(docs).filter(([, d]) => !d.querySelector('main[data-snapshot]')).map(([k]) => k);
    expect('B01', 'four files present, substantive, JSON parses', !small.length && !noMain.length, [small.length ? `small: ${small}` : '', noMain.length ? `no <main data-snapshot>: ${noMain}` : ''].filter(Boolean).join('; '));

    const noRobots = Object.entries(docs).filter(([, d]) => !d.querySelector('meta[name="robots"][content="noindex,nofollow,noarchive"]')).map(([k]) => k);
    expect('B02', 'robots meta noindex,nofollow,noarchive on every page', !noRobots.length, noRobots.join(', '));

    const stamp = readBuildStamp(dir);
    if (args['expect-sha']) expect('B03', 'build/index.html carries the expected build stamp', stamp === args['expect-sha'], `index.html usc-build=${stamp}`);
    else if (stamp && /^[0-9a-f]{7,40}$/.test(stamp)) pass('B03', 'build/index.html carries a build stamp', stamp);
    else warn('B03', 'build/index.html build stamp', `usc-build=${stamp || '(absent)'} — set REACT_APP_GIT_SHA at build (the workflows do)`);

    const shaOk = !args['expect-sha'] || json.build?.git_sha === args['expect-sha'];
    const envOk = !args.environment || json.environment === args.environment;
    const metaOk = Object.values(docs).every((d) => d.querySelector('meta[name="usc-build"]')?.getAttribute('content') === (json.build?.git_sha || ''));
    expect('B04', 'JSON build sha / environment match, and every page carries the same sha', shaOk && envOk && metaOk, `json sha=${json.build?.git_sha} env=${json.environment}`);

    if (args.quick) return;

    const registry = readRegistry(ROOT);
    const wanted = [...new Set(['legal-center', ...registry.slugs, ...SPEC_MINIMUM])];
    const pagesIn = (d) => new Set([...d.querySelectorAll('[data-snapshot-page]')].map((el) => el.getAttribute('data-snapshot-page')));
    const jsonSlugs = new Set([...(json.legal_center?.pages || []).map((p) => p.slug), 'legal-center']);
    const absent = wanted.filter((s) => !pagesIn(docs.index).has(s) || !pagesIn(docs.legalCenter).has(s) || !jsonSlugs.has(s));
    expect('B05', `every registry page (${registry.slugs.length}) and the spec's minimum documents are rendered in full`, !absent.length, absent.length ? `absent: ${absent.join(', ')}` : `${wanted.length} pages`);

    const consentEls = [...docs.index.querySelectorAll('[data-snapshot-consent]')];
    const badDefault = consentEls.filter((el) => el.getAttribute('data-default') !== 'unchecked' || !['true', 'false'].includes(el.getAttribute('data-required')));
    const keys = new Set(consentEls.map((el) => el.getAttribute('data-snapshot-consent')));
    const jsonConsents = json.form?.consents || [];
    const jsonBad = jsonConsents.filter((c) => c.default !== 'unchecked');
    const required = jsonConsents.filter((c) => c.required).length;
    const optional = jsonConsents.filter((c) => !c.required).length;
    const jsonKeysCovered = jsonConsents.every((c) => keys.has(c.key));
    expect('B06', 'every consent defaults to unchecked; at least one required and one optional; JSON agrees with HTML', !badDefault.length && !jsonBad.length && required >= 1 && optional >= 1 && jsonKeysCovered, `${consentEls.length} consent blocks, ${required} required, ${optional} optional`);

    const texts = Object.fromEntries(Object.entries(docs).map(([k, d]) => [k, normalizeText(d.body.innerHTML)]));
    const unfinished = Object.entries(texts).filter(([, t]) => UNFINISHED.test(t)).map(([k, t]) => `${k}: "${t.match(UNFINISHED)[0]}"`);
    const retired = TIER1.find(([n]) => n === 'retired internal phrase')[1];
    const retiredHits = Object.entries(texts).filter(([, t]) => retired.test(t)).map(([k, t]) => `${k}: "${t.match(retired)[0]}"`);
    expect('B07', 'no unfinished placeholder text or retired internal phrases in the visible text', !unfinished.length && !retiredHits.length, [...unfinished, ...retiredHits].join('; '));

    const unresolvedRows = [...docs.index.querySelectorAll('table[data-snapshot-links] tr[data-resolution]')].filter((tr) => ['UNRESOLVED', 'anchor-missing'].includes(tr.getAttribute('data-resolution')));
    expect('B08', 'every link in the inventory resolves against the page registry', !unresolvedRows.length && !(json.unresolved_links || []).length, unresolvedRows.length ? unresolvedRows.slice(0, 5).map((tr) => tr.getAttribute('data-href')).join(', ') : `${(json.links || []).length} links`);

    const hashProblems = [];
    let hashChecked = 0;
    const jsonText = JSON.stringify(json);
    for (const [name, d] of Object.entries(docs)) {
        for (const el of d.querySelectorAll('[data-sha256]')) {
            const expected = el.getAttribute('data-sha256');
            if (!expected) continue;
            const rule = el.getAttribute('data-hash-rule') || 'text';
            const target = el.hasAttribute('data-hash-target') ? el : el.querySelector('[data-hash-target]');
            let actual = null;
            if (rule === 'text' && target) actual = sha256(normalizeText(target.innerHTML));
            else if (rule === 'paragraphs' && target) actual = sha256([...target.querySelectorAll(':scope > p')].map((p) => normalizeString(p.textContent)).join('\n\n'));
            else if (rule === 'marketplace-list') actual = sha256(`${json.partner_lists?.marketplace?.version}\n${(json.partner_lists?.marketplace?.partners || []).map((p) => p.name).join('\n')}`);
            else if (rule === 'json') actual = expected;
            if (actual !== null) { hashChecked++; if (actual !== expected) hashProblems.push(`${name}: ${el.id || el.getAttribute('data-snapshot-block') || el.getAttribute('data-snapshot-consent') || el.getAttribute('data-snapshot-tooltip') || rule} (${rule})`); }
            if (!jsonText.includes(expected)) hashProblems.push(`${name}: hash ${expected.slice(0, 12)} not in JSON`);
        }
    }
    const htmlHashTable = new Set([...docs.index.querySelectorAll('table[data-snapshot-hashes] td:nth-child(2)')].map((td) => td.textContent.trim()));
    const jsonHashesMissing = Object.entries(json.hashes?.items || {}).filter(([, v]) => !htmlHashTable.has(v)).map(([k]) => k);
    expect('B09', 'every stamped hash recomputes from the page and appears in the JSON; every JSON hash is in the page\'s metadata table', !hashProblems.length && !jsonHashesMissing.length, hashProblems.length || jsonHashesMissing.length ? [...hashProblems.slice(0, 6), ...jsonHashesMissing.slice(0, 6).map((k) => `json-only: ${k}`)].join('; ') : `${hashChecked} recomputed, ${htmlHashTable.size} in the table`);

    const raw = { ...html, json: readFileSync(files.json, 'utf8') };
    const tier1 = [];
    for (const [name, text] of Object.entries(raw)) for (const [label, re] of TIER1) { const m = text.match(re); if (m) tier1.push(`${name}: ${label} ("${m[0].slice(0, 40)}")`); }
    expect('B10', 'no secrets, internal hosts, API bases or source-map references', !tier1.length, tier1.join('; '));

    const tier2 = [];
    for (const [name, text] of Object.entries(texts)) for (const m of text.matchAll(new RegExp(TIER2.source, 'gi'))) tier2.push(`${name}: …${text.slice(Math.max(0, m.index - 50), m.index + m[0].length + 50).replace(/\s+/g, ' ')}…`);
    if (tier2.length) warn('B11', `${tier2.length} review-word hit(s) for a human glance`, [...new Set(tier2)].slice(0, 12).join('\n      '));
    else pass('B11', 'no review words', '');

    const applicantProblems = [];
    // Scanned as markup, not collapsed text: tags keep "info@bluekeel.com" and
    // the next word apart. Partner blocks are exempt (license numbers).
    const scrubbed = Object.fromEntries(Object.entries(docs).map(([k, d]) => { const c = d.body.cloneNode(true); for (const el of c.querySelectorAll('[data-snapshot-partners], [data-snapshot-page="marketplace-partners"], [data-sha256], .snap-hash')) { if (el.matches('[data-sha256]') && !el.matches('[data-snapshot-partners], [data-snapshot-page="marketplace-partners"]')) el.removeAttribute('data-sha256'); else el.remove(); } return [k, c.innerHTML]; }));
    // Build metadata (commit ids, the GitHub run id) and hashes are digit runs by nature; partner license numbers are public.
    const jsonScrub = JSON.parse(JSON.stringify(json)); delete jsonScrub.partner_lists; delete jsonScrub.build; delete jsonScrub.production; delete jsonScrub.hashes; if (jsonScrub.legal_center?.pages) jsonScrub.legal_center.pages = jsonScrub.legal_center.pages.filter((p) => p.slug !== 'marketplace-partners');
    scrubbed.json = JSON.stringify(jsonScrub);
    for (const [name, text] of Object.entries(scrubbed)) {
        for (const [label, re] of APPLICANT) { const m = text.match(re); if (m) applicantProblems.push(`${name}: ${label} "${m[0]}"`); }
        for (const m of text.matchAll(EMAIL)) if (!EMAIL_ALLOWED(m[0])) applicantProblems.push(`${name}: email ${m[0]}`);
    }
    expect('B12', 'no applicant-shaped data (SSN, phone, long digit runs, non-allowlisted emails)', !applicantProblems.length, [...new Set(applicantProblems)].slice(0, 6).join('; '));

    const markerMissing = MARKERS.filter((w) => !texts.index.includes(w));
    const variants = ['california', 'mobile-consent', 'marital-status'].filter((v) => !docs.index.querySelector(`[data-snapshot-variant="${v}"]`) || !docs.form.querySelector(`[data-snapshot-variant="${v}"]`));
    const stepIdx = [...docs.form.querySelectorAll('[data-step-index]')].map((el) => Number(el.getAttribute('data-step-index')));
    const ascending = stepIdx.length > 0 && stepIdx.every((n, i) => n === i);
    const tooltips = docs.index.querySelectorAll('[data-snapshot-tooltip]').length;
    const tooltipsOk = tooltips >= (json.form?.tooltips?.length || 0) && tooltips > 0;
    expect('B13', 'form markers, all three named variants, steps in order, every tooltip', !markerMissing.length && !variants.length && ascending && tooltipsOk, [markerMissing.length ? `markers missing: ${markerMissing}` : '', variants.length ? `variants missing: ${variants}` : '', ascending ? '' : `steps not in order: ${stepIdx}`, tooltipsOk ? `${stepIdx.length} steps, ${tooltips} tooltips` : `tooltips ${tooltips}`].filter(Boolean).join('; '));

    const manifestUrl = args['manifest-url'] || process.env.SNAPSHOT_BKFORM_MANIFEST_URL || defaultManifestUrl(json.environment);
    try {
        const r = await fetchWithRetry(manifestUrl, { retries: 2, timeoutMs: 10000 });
        if (r.status === 404 || r.status === 403) warn('B14', 'bkform manifest re-fetched', `not published at ${manifestUrl} (HTTP ${r.status})`);
        else {
            const live = sha256(await r.text());
            if (live === json.form?.manifest?.sha256) pass('B14', 'bkform manifest re-fetched matches the one the snapshot used', live.slice(0, 12));
            else warn('B14', 'bkform manifest re-fetched differs from the one the snapshot used', `${live.slice(0, 12)} vs ${String(json.form?.manifest?.sha256).slice(0, 12)} — a bkform publish happened in between; rebuild to refresh`);
        }
    } catch (e) { warn('B14', 'bkform manifest re-fetch', `could not fetch ${manifestUrl}: ${e.message}`); }

    const unsafe = [];
    for (const [name, d] of Object.entries(docs)) {
        const c = (sel) => d.querySelectorAll(sel).length;
        if (c('script')) unsafe.push(`${name}: script`);
        if (c('iframe, object, embed, video, audio')) unsafe.push(`${name}: embedded media`);
        if (c('form')) unsafe.push(`${name}: form`);
        if (c('img')) unsafe.push(`${name}: img`);
        if (c('link[rel="stylesheet"]')) unsafe.push(`${name}: external stylesheet`);
        if (c('style') !== 1) unsafe.push(`${name}: ${c('style')} style elements`);
        if (c('[checked]')) unsafe.push(`${name}: checked control`);
        if (/sourceMappingURL/.test(html[name])) unsafe.push(`${name}: sourceMappingURL`);
    }
    expect('B15', 'read-only: no script, form, image, embedded media or external asset', !unsafe.length, unsafe.join('; '));

    const mp = json.partner_lists?.marketplace || {};
    if (mp.status === 'loaded' && mp.count > 0) pass('B16', 'partner list: the Marketplace Partners list is loaded', `marketplace ${mp.version} (${mp.count})`);
    else if (mp.status !== 'loaded') (process.env.SNAPSHOT_STRICT_PARTNERS === '1' ? fail : warn)('B16', 'Marketplace Partners list unavailable at build; the live page\'s unavailable notice was rendered', mp.error || mp.status);
    else fail('B16', 'partner list', `marketplace status=${mp.status} count=${mp.count}`);

    const stray = walk(dir).map((f) => relative(dir, f)).filter((f) => /\.map$/.test(f) || /(^|\/)reference(\/|$)/.test(f));
    const dsStore = walk(dir).map((f) => relative(dir, f)).filter((f) => /(^|\/)\.DS_Store$/.test(f));
    if (stray.length) (process.env.CI || stray.some((f) => /reference/.test(f)) ? fail : warn)('B17', 'no source maps or reference material under build/', `${stray.slice(0, 5).join(', ')}${process.env.CI ? '' : ' (local build without GENERATE_SOURCEMAP=false; CI sets it)'}`);
    else if (dsStore.length) warn('B17', 'no source maps under build/; .DS_Store present (local only)', dsStore.join(', '));
    else pass('B17', 'no source maps, reference material or .DS_Store under build/', '');

    // ---- the final compliance cleanup (2026-09-29) ------------------------
    // B18: the separate directory of promotional senders is retired — no page,
    // no list, no version, no link; the old URL is a redirect and nothing else.
    const gone = [];
    const { slug: oldSlug, redirectsTo, name: oldName, field: oldField } = RETIRED_DIRECTORY;
    if (registry.slugs.includes(oldSlug)) gone.push('the registry still has the page');
    if ((json.legal_center?.pages || []).some((p) => p.slug === oldSlug)) gone.push('the snapshot still renders the page');
    if (registry.legacy[oldSlug] !== redirectsTo) gone.push(`the registry does not redirect ${oldSlug} to ${redirectsTo} (${registry.legacy[oldSlug] || 'no entry'})`);
    if (json.legal?.legacy_slugs?.[oldSlug] !== redirectsTo) gone.push('the snapshot does not record the redirect');
    const lists = Object.keys(json.partner_lists || {});
    if (lists.join() !== 'marketplace') gone.push(`partner lists: ${lists.join(', ') || 'none'} (expected marketplace only)`);
    const toRetired = (json.links || []).filter((l) => l.resolves === 'legacy-redirect');
    if (toRetired.length || (json.retired_links || []).length) gone.push(`${toRetired.length} link(s) to a retired URL: ${toRetired.slice(0, 4).map((l) => `${l.source} → ${l.href}`).join(', ')}`);
    const retiredRows = [...docs.index.querySelectorAll('table[data-snapshot-links] tr[data-resolution="legacy-redirect"]')];
    if (retiredRows.length) gone.push(`${retiredRows.length} link-table row(s) to a retired URL`);
    const slugInForm = (json.form?.legal_slugs || []).filter((l) => l.slug === oldSlug).length;
    if (slugInForm) gone.push('the form\'s manifest still lists the slug');
    // The words themselves, anywhere: the one place the old slug may be read is
    // the record of the redirect (the "Retired URLs" row; legal.legacy_slugs).
    for (const [name, d] of Object.entries(docs)) {
        const c = d.body.cloneNode(true);
        for (const el of c.querySelectorAll('[data-snapshot-retired-routes]')) el.remove();
        const markup = c.innerHTML;
        for (const [label, re] of [['the directory\'s name', oldName], ['its slug', new RegExp(oldSlug)], ['its version field', oldField]]) { const m = markup.match(re); if (m) gone.push(`${name}: ${label} ("${m[0]}")`); }
    }
    const jsonRest = JSON.parse(JSON.stringify(json)); if (jsonRest.legal) delete jsonRest.legal.legacy_slugs;
    for (const [label, re] of [['the directory\'s name', oldName], ['its slug', new RegExp(oldSlug)], ['its version field', oldField]]) { const m = JSON.stringify(jsonRest).match(re); if (m) gone.push(`json: ${label} ("${m[0]}")`); }
    expect('B18', 'the retired partner directory is gone: no page, list, version or link; its URL is a redirect', !gone.length, gone.length ? [...new Set(gone)].slice(0, 8).join('; ') : `${oldSlug} → ${redirectsTo}; partner lists: ${lists.join()}`);

    // B19: the two optional marketing consents say what counsel wrote — and
    // every consent wording in force carries the version this site expects.
    const wording = [];
    const byKey = Object.fromEntries((json.form?.consents || []).map((c) => [c.key, c]));
    for (const key of CONSENT_WORDING.marketingConsents) {
        const c = byKey[key];
        if (!c) { wording.push(`${key}: absent`); continue; }
        const shown = [...docs.form.querySelectorAll(`[data-snapshot-consent="${key}"]`)].map((el) => normalizeText(el.innerHTML));
        if (!shown.length) wording.push(`${key}: not rendered on the form page`);
        for (const text of [c.text, ...shown]) for (const re of CONSENT_WORDING.excluded) { const m = String(text).match(re); if (m) wording.push(`${key}: says "${m[0]}"`); }
        if (!String(c.text).includes(CONSENT_WORDING.identity)) wording.push(`${key}: does not name "${CONSENT_WORDING.identity}"`);
        const slugs = (c.links || []).map((l) => l.slug).join();
        if (slugs !== CONSENT_WORDING.links[key].join()) wording.push(`${key}: links ${slugs || 'none'} (expected ${CONSENT_WORDING.links[key].join()})`);
        if (c.required || c.default !== 'unchecked') wording.push(`${key}: required=${c.required} default=${c.default} (must be optional and unchecked)`);
    }
    const versions = { ...(json.form?.consent_versions || {}) };
    const versionDiffs = Object.entries(CONSENT_WORDING.versions).filter(([k, v]) => versions[k] !== v).map(([k, v]) => `${k}: ${versions[k]} (expected ${v})`);
    const perConsent = Object.values(byKey).filter((c) => c.version !== CONSENT_WORDING.versions[c.key]).map((c) => `${c.key}: ${c.version}`);
    expect('B19', 'the marketing consents carry counsel\'s wording (no artificial/prerecorded voice, no d/b/a, no retired directory), optional and unchecked; every consent version is the expected one',
        !wording.length && !versionDiffs.length && !perConsent.length,
        wording.length || versionDiffs.length || perConsent.length ? [...new Set([...wording, ...versionDiffs, ...perConsent])].slice(0, 8).join('; ') : Object.entries(versions).map(([k, v]) => `${k}=${v}`).join(', '));

    // B20: the identity wording, everywhere — the fail-tier phrase B10 scans
    // for, reported on its own line so the hand-back can cite it.
    const dba = TIER1.find(([n]) => /d\/b\/a/.test(n))[1];
    const dbaHits = Object.entries(raw).filter(([, text]) => dba.test(text)).map(([name, text]) => `${name}: "${text.match(dba)[0]}"`);
    expect('B20', 'no "d/b/a" anywhere in the snapshot; Bluekeel LLC is named as the operator', !dbaHits.length && texts.index.includes('Bluekeel LLC'), dbaHits.join('; '));
}

// ----------------------------------------------------------------- live ----

async function verifyLive() {
    const origin = String(args.live).replace(/\/+$/, '');
    const retries = Number(args.retries || 1);
    const delay = Number(args['retry-delay'] || 10) * 1000;
    const expectSha = args['expect-sha'] || null;

    // L01: the spec's own curl, literally.
    const curls = {};
    for (const route of ROUTES) {
        const url = `${origin}${route}`;
        let out = null;
        try {
            // Tab-separated: the content type carries a space ("text/html; charset=utf-8").
            out = execFileSync('curl', ['-sSL', '-D', '-', '-o', '-', '-w', '\n__CURLW__\t%{http_code}\t%{content_type}\t%{num_redirects}\t%{url_effective}', url], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, timeout: 60000 });
        } catch (e) { curls[route] = { error: e.message }; continue; }
        const m = out.match(/__CURLW__\t(\d+)\t([^\t]*)\t(\d+)\t(\S*)\s*$/);
        if (!m) { curls[route] = { error: `could not parse curl output: ${out.slice(-160).replace(/\s+/g, ' ')}` }; continue; }
        const headerEnd = out.indexOf('\r\n\r\n');
        curls[route] = { status: Number(m[1]), type: m[2], redirects: Number(m[3]), effective: m[4], headers: out.slice(0, headerEnd).toLowerCase(), body: out.slice(headerEnd + 4, out.lastIndexOf('__CURLW__')) };
    }
    const l01 = ROUTES.filter((r) => { const c = curls[r]; if (!c || c.error) return true; const typeOk = r.endsWith('.json') ? /application\/json/.test(c.type) : /text\/html/.test(c.type); const hostOk = c.effective.startsWith(origin); return !(c.status === 200 && typeOk && (args['allow-redirects'] || c.redirects === 0) && hostOk); });
    expect('L01', 'curl -L: 200, right content type, no redirect, same host, for all four routes', !l01.length, l01.map((r) => `${r}: ${JSON.stringify({ status: curls[r]?.status, type: curls[r]?.type, redirects: curls[r]?.redirects, effective: curls[r]?.effective, error: curls[r]?.error })}`).join('; ') || ROUTES.map((r) => `${r} ${curls[r].status}`).join(', '));

    const pages = ROUTES.slice(0, 3).map((r) => ({ route: r, body: curls[r]?.body || '' }));
    const shell = pages.filter((p) => /id="root"/.test(p.body) || !/<main[^>]*data-snapshot=/.test(p.body));
    const markers = pages.filter((p) => p.route === ROUTES[0] && MARKERS.some((w) => !p.body.includes(w)));
    expect('L02', 'the responses are the snapshot pages, not the SPA shell, with the markers in the raw HTML', !shell.length && !markers.length, [...shell.map((p) => `${p.route}: SPA shell or no <main data-snapshot>`), ...markers.map((p) => `${p.route}: markers missing`)].join('; '));

    expect('L03', 'robots meta on the live pages', pages.every((p) => /<meta name="robots" content="noindex,nofollow,noarchive">/.test(p.body)), '');

    const noHeader = ROUTES.filter((r) => !/x-robots-tag:\s*noindex,\s*nofollow,\s*noarchive/.test(curls[r]?.headers || ''));
    if (!noHeader.length) pass('L04', 'X-Robots-Tag header present on all four responses', '');
    else (process.env.SNAPSHOT_REQUIRE_ROBOTS_HEADER === '1' ? fail : warn)('L04', 'X-Robots-Tag header', `missing on ${noHeader.join(', ')} — apply scripts/compliance-snapshot/cloudfront-robots.mjs`);

    let liveJson = null;
    for (let attempt = 1; attempt <= retries; attempt++) {
        try { liveJson = JSON.parse(curls[ROUTES[3]]?.body || (await (await fetchWithRetry(`${origin}${ROUTES[3]}`, { retries: 1 })).text())); } catch { liveJson = null; }
        if (liveJson && (!expectSha || liveJson.build?.git_sha === expectSha)) break;
        if (attempt < retries) { await new Promise((r) => setTimeout(r, delay)); try { curls[ROUTES[3]].body = await (await fetchWithRetry(`${origin}${ROUTES[3]}`, { retries: 1 })).text(); } catch { /* retry */ } }
    }
    if (expectSha) expect('L05', 'live JSON reports the expected build sha', liveJson?.build?.git_sha === expectSha, `live=${liveJson?.build?.git_sha}`);
    else expect('L05', 'live JSON parses and reports a build sha', !!liveJson?.build?.git_sha, `live=${liveJson?.build?.git_sha}`);

    if (expectSha) {
        let idx = '';
        try { idx = await (await fetchWithRetry(`${origin}/`, { retries })).text(); } catch { /* reported below */ }
        const stamp = idx.match(/<meta name=['"]usc-build['"] content=['"]([^'"]*)['"]/)?.[1] || null;
        expect('L06', 'the live index.html carries the expected build stamp', stamp === expectSha, `stamp=${stamp}`);
    }

    if (args['expect-json']) {
        const built = JSON.parse(readFileSync(resolve(ROOT, args['expect-json']), 'utf8'));
        expect('L07', 'live JSON hashes equal the built JSON hashes', JSON.stringify(built.hashes?.items) === JSON.stringify(liveJson?.hashes?.items), liveJson ? `${Object.keys(liveJson.hashes?.items || {}).length} hashes` : 'no live JSON');
    }

    const hrefs = [...new Set((liveJson?.links || []).map((l) => l.href))];
    const internal = hrefs.filter((h) => h.startsWith('/'));
    const external = hrefs.filter((h) => /^https?:\/\//.test(h));
    const bad = []; const badExternal = [];
    for (const h of internal) {
        const path = h.split('#')[0];
        try { const r = await fetchWithRetry(`${origin}${path}`, { retries: 2, timeoutMs: 15000 }); if (!(r.status === 200 && /text\/html/.test(r.headers.get('content-type') || ''))) bad.push(`${path} ${r.status}`); } catch (e) { bad.push(`${path} ${e.message}`); }
    }
    for (const h of external) {
        try { const r = await fetch(h, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(15000) }); if (r.status >= 400) badExternal.push(`${h} ${r.status}`); } catch (e) { badExternal.push(`${h} ${e.message}`); }
    }
    expect('L08', `every internal inventory destination answers 200 text/html (${internal.length} paths)`, !bad.length, bad.slice(0, 8).join('; ') || 'SPA fallback note: a 200 here proves reachability, not that the page exists — registry resolution (B08) is the existence check');
    if (external.length) (badExternal.length ? warn : pass)('L08x', `external destinations answer (${external.length})`, badExternal.join('; '));

    const manifestUrl = args['manifest-url'] || process.env.SNAPSHOT_BKFORM_MANIFEST_URL || defaultManifestUrl(liveJson?.environment);
    try {
        const r = await fetchWithRetry(manifestUrl, { retries: 2 });
        if (r.status === 404 || r.status === 403) warn('L10', 'staleness guard: bkform manifest not published', `${manifestUrl} → HTTP ${r.status}`);
        else {
            const text = await r.text(); const live = sha256(text); const m = JSON.parse(text);
            if (live === liveJson?.form?.manifest?.sha256) pass('L10', 'staleness guard: the deployed snapshot describes the currently published bkform manifest', `${m.sdk?.version} ${live.slice(0, 12)}`);
            else warn('L10', 'snapshot stale — rebuild site', `published manifest ${m.sdk?.version} ${live.slice(0, 12)} (last-modified ${r.headers.get('last-modified')}) vs snapshot ${liveJson?.form?.sdk_version} ${String(liveJson?.form?.manifest?.sha256).slice(0, 12)}`);
        }
    } catch (e) { warn('L10', 'staleness guard', `could not fetch ${manifestUrl}: ${e.message}`); }

    const noCache = ROUTES.filter((r) => !/cache-control:\s*[^\r\n]*no-cache/.test(curls[r]?.headers || ''));
    expect('L11', 'Cache-Control: no-cache on all four responses', !noCache.length, noCache.join(', '));

    if (liveJson?.partner_lists?.marketplace?.status === 'loaded') {
        const endpoint = liveJson.environment === 'production' ? 'https://luyu5pvptg.execute-api.us-east-1.amazonaws.com/prod/marketplace-partners' : 'https://b35i57ojg0.execute-api.us-east-1.amazonaws.com/dev/marketplace-partners';
        try {
            const r = await fetchWithRetry(endpoint, { retries: 2, headers: { Accept: 'application/json' } });
            const list = await r.json();
            (list.version === liveJson.partner_lists.marketplace.version ? pass : warn)('L12', 'Marketplace Partners: service version vs snapshot version', `service ${list.version} (${list.count}) · snapshot ${liveJson.partner_lists.marketplace.version} (${liveJson.partner_lists.marketplace.count}) — the list refreshes daily`);
        } catch (e) { warn('L12', 'Marketplace Partners service check', e.message); }
    }

    record('L13', 'INFO', 'production parity as the snapshot reports it', liveJson?.production ? `${liveJson.production.status}${liveJson.production.git_sha ? ` ${liveJson.production.git_sha} (${liveJson.production.parity})` : ` (${liveJson.production.reason})`}` : 'no live JSON');

    if (args.out) {
        mkdirSync(resolve(ROOT, args.out), { recursive: true });
        for (const r of ROUTES) if (curls[r]?.body) writeFileSync(resolve(ROOT, args.out, `curl-${r.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')}${r.endsWith('.json') ? '.json' : '.html'}`), `${curls[r].headers}\n\n${curls[r].body}`);
    }
}

// -------------------------------------------------------------- helpers ----

function finish() {
    const gate = args.gate === 'warn' ? 'warn' : 'fail';
    const pad = (s, n) => String(s).padEnd(n);
    console.log(`\ncompliance snapshot — ${mode} verification (${mode === 'live' ? args.live : args.dir || 'build'})\n`);
    for (const r of results) console.log(`  ${pad(r.status, 5)} ${pad(r.id, 5)} ${r.title}${r.detail ? `\n             ${r.detail}` : ''}`);
    const fails = results.filter((r) => r.status === 'FAIL');
    const warns = results.filter((r) => r.status === 'WARN');
    console.log(`\n  ${fails.length} FAIL · ${warns.length} WARN · ${results.filter((r) => r.status === 'PASS').length} PASS${gate === 'warn' && fails.length ? ' · gate=warn: failures do not block' : ''}\n`);
    if (args.summary) {
        const md = [`## Compliance snapshot — ${mode} verification`, '', '| ID | Result | Check | Detail |', '|---|---|---|---|', ...results.map((r) => `| ${r.id} | ${r.status} | ${r.title.replace(/\|/g, '\\|')} | ${String(r.detail).replace(/\|/g, '\\|').replace(/\n/g, ' ')} |`), '', `**${fails.length} FAIL · ${warns.length} WARN**${gate === 'warn' && fails.length ? ' (gate=warn — failures did not block this deploy)' : ''}`, ''].join('\n');
        writeFileSync(args.summary, `${md}\n`, { flag: 'a' });
    }
    if (args.out) {
        mkdirSync(resolve(ROOT, args.out), { recursive: true });
        writeFileSync(resolve(ROOT, args.out, `verify-${mode}.json`), `${JSON.stringify({ mode, at: new Date().toISOString(), args, results }, null, 2)}\n`);
    }
    process.exit(fails.length && gate === 'fail' ? 1 : 0);
}

function readBuildStamp(dir) {
    const f = join(dir, 'index.html');
    if (!existsSync(f)) return null;
    return readFileSync(f, 'utf8').match(/<meta name=['"]usc-build['"] content=['"]([^'"]*)['"]/)?.[1] ?? null;
}

function defaultManifestUrl(environment) {
    return environment === 'production' ? 'https://form-sdk.unitedstatescredit.com/v1/compliance-manifest.json' : 'https://bkform-dev.s3.amazonaws.com/v1/compliance-manifest.json';
}

function walk(dir) {
    const out = [];
    for (const name of readdirSync(dir)) {
        const p = join(dir, name);
        if (statSync(p).isDirectory()) out.push(...walk(p)); else out.push(p);
    }
    return out;
}

function parseArgs(argv) {
    const out = {};
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        if (!a.startsWith('--')) continue;
        const key = a.slice(2);
        const next = argv[i + 1];
        if (next !== undefined && !next.startsWith('--')) { out[key] = next; i++; } else out[key] = true;
    }
    return out;
}
