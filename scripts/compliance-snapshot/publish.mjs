#!/usr/bin/env node
// Puts the snapshot objects in the bucket the way `aws s3 sync` cannot: with
// Cache-Control: no-cache (reviewers see the current build), an explicit
// text/html for the three EXTENSIONLESS objects — /loans/compliance-snapshot,
// /loans/compliance-snapshot/legal-center, /loans/compliance-snapshot/form —
// so the S3 website endpoint serves the page instead of redirecting a
// slash-less request to its own hostname over http, and the JSON's own type.
// Runs after the sync (which deletes the extensionless objects, having no
// local file for them) and before the CloudFront invalidation.
//
//   publish.mjs --bucket staging-united-states-credit [--profile bluekeel] [--dir build] [--dry-run]
//
// Refuses to run when any of the four local files is missing: a deploy
// without a snapshot must not quietly remove the one that is live.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '../..');
const args = Object.fromEntries(process.argv.slice(2).map((a, i, all) => (a.startsWith('--') ? [a.slice(2), all[i + 1] && !all[i + 1].startsWith('--') ? all[i + 1] : true] : null)).filter(Boolean));
if (!args.bucket) { console.error('usage: publish.mjs --bucket <bucket> [--profile bluekeel] [--dir build] [--dry-run]'); process.exit(2); }

const dir = resolve(ROOT, args.dir || 'build');
const profile = args.profile || 'bluekeel';
const HTML = 'text/html; charset=utf-8';
const JSON_TYPE = 'application/json; charset=utf-8';
const NO_CACHE = 'no-cache';

const objects = [
    ['loans/compliance-snapshot/index.html', 'loans/compliance-snapshot/index.html', HTML],
    ['loans/compliance-snapshot/legal-center/index.html', 'loans/compliance-snapshot/legal-center/index.html', HTML],
    ['loans/compliance-snapshot/form/index.html', 'loans/compliance-snapshot/form/index.html', HTML],
    ['loans/compliance-snapshot.json', 'loans/compliance-snapshot.json', JSON_TYPE],
    // The extensionless keys the spec's URLs name.
    ['loans/compliance-snapshot/index.html', 'loans/compliance-snapshot', HTML],
    ['loans/compliance-snapshot/legal-center/index.html', 'loans/compliance-snapshot/legal-center', HTML],
    ['loans/compliance-snapshot/form/index.html', 'loans/compliance-snapshot/form', HTML],
];

const missing = [...new Set(objects.map(([local]) => local))].filter((f) => !existsSync(resolve(dir, f)));
if (missing.length) {
    console.error(`[publish] refusing: missing under ${dir}: ${missing.join(', ')} — run \`yarn build:compliance-snapshot\` first`);
    process.exit(1);
}

for (const [local, key, type] of objects) {
    const cmd = ['s3', 'cp', resolve(dir, local), `s3://${args.bucket}/${key}`, '--profile', profile, '--acl', 'public-read', '--content-type', type, '--cache-control', NO_CACHE, '--only-show-errors'];
    console.log(`[publish] aws ${cmd.join(' ')}`);
    if (!args['dry-run']) execFileSync('aws', cmd, { stdio: 'inherit' });
}
console.log(`[publish] ${objects.length} objects ${args['dry-run'] ? 'would be ' : ''}put to s3://${args.bucket}/loans/compliance-snapshot* with Cache-Control: ${NO_CACHE}`);
