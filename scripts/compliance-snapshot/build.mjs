#!/usr/bin/env node
// Builds the read-only compliance snapshot into build/:
//
//   build/loans/compliance-snapshot/index.html
//   build/loans/compliance-snapshot/legal-center/index.html
//   build/loans/compliance-snapshot/form/index.html
//   build/loans/compliance-snapshot.json
//
// from the same source modules the live /loans pages render (bundled by
// esbuild from src/), bkform's compliance manifest (fetched from the base the
// embed loads form.js from), the marketplace-partners service (the endpoint
// the live page reads) and production's build stamp. One in-memory model
// (model.mjs) produces both the HTML and the JSON.
//
//   SNAPSHOT_HOST                 required — which host's targets to describe
//                                 (staging.unitedstatescredit.com | localhost | …)
//   SNAPSHOT_BKFORM_MANIFEST_URL  override the manifest URL (the drift test)
//   SNAPSHOT_PROD_ORIGIN          where to read production's build stamp
//   SNAPSHOT_OUT_DIR              defaults to build/
//   SNAPSHOT_STRICT_PARTNERS=1    exit non-zero when the partner list is unavailable
//   SNAPSHOT_REACT_ENV            development | production (React warnings)
//
// Exit codes: 0 built · 1 unresolved links or a failed safety assertion ·
// 2 usage · 3 partner list unavailable under SNAPSHOT_STRICT_PARTNERS.
process.env.TZ = 'UTC';

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT, bundleSite } from './esbuild.config.mjs';
import { buildModel, toJson } from './model.mjs';
import { assertPageSafe } from './postprocess.mjs';
import { renderPages } from './render-html.mjs';

const log = (message) => console.log(`[compliance-snapshot] ${message}`);
const HOST = process.env.SNAPSHOT_HOST;
if (!HOST) {
    console.error('[compliance-snapshot] SNAPSHOT_HOST is required, e.g. SNAPSHOT_HOST=staging.unitedstatescredit.com');
    process.exit(2);
}

const started = Date.now();
const pkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8'));
const outDir = resolve(ROOT, process.env.SNAPSHOT_OUT_DIR || 'build');

log(`bundling src/ for ${HOST}`);
const bundle = await bundleSite();
const site = await import(pathToFileURL(bundle).href);
site.configure({ hostname: HOST });

const model = await buildModel({
    root: ROOT,
    hostname: HOST,
    site,
    pkg,
    manifestUrl: process.env.SNAPSHOT_BKFORM_MANIFEST_URL || null,
    prodOrigin: process.env.SNAPSHOT_PROD_ORIGIN || 'https://unitedstatescredit.com',
    log,
});

const pages = renderPages(model);
for (const [name, html] of Object.entries(pages)) assertPageSafe(html, name);

const dir = resolve(outDir, 'loans/compliance-snapshot');
mkdirSync(resolve(dir, 'legal-center'), { recursive: true });
mkdirSync(resolve(dir, 'form'), { recursive: true });
writeFileSync(resolve(dir, 'index.html'), pages.index);
writeFileSync(resolve(dir, 'legal-center/index.html'), pages.legalCenter);
writeFileSync(resolve(dir, 'form/index.html'), pages.form);
const json = toJson(model);
writeFileSync(resolve(outDir, 'loans/compliance-snapshot.json'), `${JSON.stringify(json, null, 2)}\n`);

const kb = (s) => `${(Buffer.byteLength(s) / 1024).toFixed(0)} KB`;
log(`wrote ${dir}/index.html (${kb(pages.index)}), legal-center/index.html (${kb(pages.legalCenter)}), form/index.html (${kb(pages.form)}), compliance-snapshot.json (${kb(JSON.stringify(json))})`);
log(`${model.legal_center.pages.length} legal pages · ${model.form.steps.length} form steps · ${model.form.consents.length} consents · ${model.form.tooltips.length} tooltips · ${model.links.length} links (${model.unresolved_links.length} unresolved) · ${Object.keys(model.hashes.items).length} hashes · model sha256 ${json.hashes.model_sha256.slice(0, 12)} · ${Date.now() - started} ms`);

let exit = 0;
if (model.unresolved_links.length) {
    console.error(`[compliance-snapshot] UNRESOLVED links:\n${model.unresolved_links.map((l) => `  ${l.source}: "${l.text}" -> ${l.href} (${l.resolves}${l.reason ? `: ${l.reason}` : ''})`).join('\n')}`);
    exit = 1;
}
if (model.partner_lists.marketplace.status !== 'loaded') {
    console.warn(`[compliance-snapshot] WARNING: the Marketplace Partners list was unavailable at build (${model.partner_lists.marketplace.error}); the live page's unavailable notice was rendered and the JSON says unavailable_at_build.`);
    if (process.env.SNAPSHOT_STRICT_PARTNERS === '1') exit = 3;
}
process.exit(exit);
