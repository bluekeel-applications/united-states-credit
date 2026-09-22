#!/usr/bin/env node
// Change detection between the snapshot about to be deployed and the one
// currently deployed: which hashed items changed, appeared or went away.
// Writes a short report to the console, to a step summary (--summary) and to
// --out/diff.{md,json}. Never fails a deploy: it says what needs a human's
// review; it does not decide.
//
//   diff.mjs --previous-url https://staging.unitedstatescredit.com/loans/compliance-snapshot.json \
//            --next build/loans/compliance-snapshot.json [--summary $GITHUB_STEP_SUMMARY] [--out artifacts/compliance-snapshot]
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '../..');
const args = Object.fromEntries(process.argv.slice(2).map((a, i, all) => (a.startsWith('--') ? [a.slice(2), all[i + 1] && !all[i + 1].startsWith('--') ? all[i + 1] : true] : null)).filter(Boolean));

const lines = [];
const say = (s = '') => { lines.push(s); console.log(s); };

try {
    const next = JSON.parse(readFileSync(resolve(ROOT, args.next || 'build/loans/compliance-snapshot.json'), 'utf8'));
    let previous = null;
    let why = '';
    try {
        const r = await fetch(args['previous-url'], { redirect: 'follow', signal: AbortSignal.timeout(15000) });
        const type = r.headers.get('content-type') || '';
        if (!r.ok) why = `HTTP ${r.status}`;
        else if (/text\/html/.test(type)) why = 'the URL answered HTML (the SPA shell): no snapshot deployed yet';
        else previous = await r.json();
    } catch (e) { why = e.message; }

    say('## Compliance snapshot — change detection');
    say('');
    if (!previous || !previous.hashes?.items) {
        say(`No previous snapshot found at ${args['previous-url']} (${why || 'no hashes in it'}). Every item is new in this deploy.`);
        say('');
        say(`Next: ${next.build?.git_sha} (generated ${next.generated_at}) — ${Object.keys(next.hashes?.items || {}).length} hashed items.`);
    } else {
        const a = previous.hashes.items; const b = next.hashes.items;
        const labels = { ...(previous.hashes.labels || {}), ...(next.hashes.labels || {}) };
        const changed = Object.keys(b).filter((k) => k in a && a[k] !== b[k]);
        const added = Object.keys(b).filter((k) => !(k in a));
        const removed = Object.keys(a).filter((k) => !(k in b));
        const unchanged = Object.keys(b).filter((k) => k in a && a[k] === b[k]);
        say(`Previous: ${String(previous.build?.git_sha).slice(0, 12)} (generated ${previous.generated_at}) → Next: ${String(next.build?.git_sha).slice(0, 12)} (generated ${next.generated_at})`);
        say('');
        if (!changed.length && !added.length && !removed.length) say(`Compliance content unchanged (${unchanged.length} items identical).`);
        else {
            if (changed.length) { say('**Compliance content changed:**'); for (const k of changed) say(`- ${labels[k] || k} (${k})  ${a[k].slice(0, 12)}… → ${b[k].slice(0, 12)}…`); }
            if (added.length) { say(''); say('**Added:**'); for (const k of added) say(`- ${labels[k] || k} (${k})`); }
            if (removed.length) { say(''); say('**Removed:**'); for (const k of removed) say(`- ${labels[k] || k} (${k})`); }
            say(''); say(`Unchanged: ${unchanged.length}. This identifies what needs review; it does not replace it.`);
        }
        const mp = [previous.partner_lists?.marketplace?.version, next.partner_lists?.marketplace?.version];
        if (mp[0] !== mp[1]) say(`Marketplace Partners list version ${mp[0]} → ${mp[1]}.`);
        if (previous.form?.sdk_version !== next.form?.sdk_version) say(`bkform ${previous.form?.sdk_version} → ${next.form?.sdk_version}.`);
        if (args.out) writeFileSync(resolve(ROOT, args.out, 'previous.json'), JSON.stringify(previous, null, 2));
    }
    if (args.out) {
        mkdirSync(resolve(ROOT, args.out), { recursive: true });
        writeFileSync(resolve(ROOT, args.out, 'diff.md'), `${lines.join('\n')}\n`);
        writeFileSync(resolve(ROOT, args.out, 'diff.json'), `${JSON.stringify({ at: new Date().toISOString(), previousUrl: args['previous-url'], previous: previous ? { git_sha: previous.build?.git_sha, generated_at: previous.generated_at, hashes: previous.hashes.items } : null, next: { git_sha: next.build?.git_sha, generated_at: next.generated_at, hashes: next.hashes?.items } }, null, 2)}\n`);
    }
} catch (e) {
    say(`## Compliance snapshot — change detection\n\nCould not compare: ${e.message}`);
}
if (args.summary) writeFileSync(args.summary, `${lines.join('\n')}\n\n`, { flag: 'a' });
process.exit(0);
