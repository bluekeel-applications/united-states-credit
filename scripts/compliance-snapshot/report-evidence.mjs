#!/usr/bin/env node
// Collects the evidence the change report cites into
// reference/compliance-snapshot-report/<sha>/ (private, untracked): the
// spec's own curl output for the four URLs, the hash table, the manifest and
// partner list as currently published, production's build stamp, the
// CloudFront behavior, the link inventory with live status, both verifier
// runs, and — with --screenshots — a headless-Chrome screenshot of each route
// and the list of network requests the page made (the read-only proof: the
// document and nothing else).
//
//   report-evidence.mjs --origin https://staging.unitedstatescredit.com [--out reference/compliance-snapshot-report] [--screenshots]
import { execFileSync, spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sha256 } from './lib/text.mjs';

const require = createRequire(import.meta.url);
const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '../..');
const args = Object.fromEntries(process.argv.slice(2).map((a, i, all) => (a.startsWith('--') ? [a.slice(2), all[i + 1] && !all[i + 1].startsWith('--') ? all[i + 1] : true] : null)).filter(Boolean));
const ORIGIN = String(args.origin || 'https://staging.unitedstatescredit.com').replace(/\/+$/, '');
const ROUTES = ['/loans/compliance-snapshot', '/loans/compliance-snapshot/legal-center', '/loans/compliance-snapshot/form', '/loans/compliance-snapshot.json'];
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const index = [];
const put = (name, content, how) => { writeFileSync(join(OUT, name), content); index.push({ name, sha256: sha256(content), how }); console.log(`  ${name} (${(Buffer.byteLength(content) / 1024).toFixed(0)} KB)`); };
const curl = (url, extra = []) => execFileSync('curl', ['-sSL', '-D', '-', '-o', '-', ...extra, url], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

// The deployed snapshot names the sha the folder is named after.
const liveJsonText = curl(`${ORIGIN}/loans/compliance-snapshot.json`);
const liveJson = JSON.parse(liveJsonText.slice(liveJsonText.indexOf('\r\n\r\n') + 4));
const sha = String(liveJson.build?.git_sha || 'unknown').slice(0, 12);
const OUT = resolve(ROOT, args.out || 'reference/compliance-snapshot-report', sha);
mkdirSync(OUT, { recursive: true });
console.log(`evidence for ${ORIGIN} build ${sha} → ${OUT}`);

for (const route of ROUTES) {
    const name = `curl-${route.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')}${route.endsWith('.json') ? '.json' : '.html'}`;
    const cmd = `curl -sSL -D - -o - -w '\\n%{http_code} %{content_type} %{num_redirects} %{url_effective}' ${ORIGIN}${route}`;
    put(name, execFileSync('curl', ['-sSL', '-D', '-', '-o', '-', '-w', '\n__CURL__ %{http_code} %{content_type} %{num_redirects} %{url_effective}\n', `${ORIGIN}${route}`], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }), cmd);
}
put('hashes.tsv', `key\tlabel\tsha256\n${Object.entries(liveJson.hashes.items).map(([k, v]) => `${k}\t${liveJson.hashes.labels[k]}\t${v}`).join('\n')}\n`, 'from the live compliance-snapshot.json hashes');
{
    const url = liveJson.environment === 'production' ? 'https://form-sdk.unitedstatescredit.com/v1/compliance-manifest.json' : 'https://bkform-dev.s3.amazonaws.com/v1/compliance-manifest.json';
    const text = curl(url);
    const body = text.slice(text.indexOf('\r\n\r\n') + 4);
    const verdict = sha256(body) === liveJson.form.manifest.sha256 ? 'MATCHES the manifest the snapshot was built from' : `DIFFERS from the manifest the snapshot was built from (${sha256(body).slice(0, 12)} vs ${liveJson.form.manifest.sha256.slice(0, 12)}) — snapshot stale`;
    put('manifest-current.json', body, `curl ${url}`);
    put('manifest-current.verdict.txt', `${verdict}\n`, 'sha256 of the file above vs form.manifest.sha256 in the live JSON');
}
{
    const url = liveJson.environment === 'production' ? 'https://luyu5pvptg.execute-api.us-east-1.amazonaws.com/prod/marketplace-partners' : 'https://b35i57ojg0.execute-api.us-east-1.amazonaws.com/dev/marketplace-partners';
    const text = curl(url, ['-H', 'Accept: application/json']);
    put('marketplace-partners-current.json', text.slice(text.indexOf('\r\n\r\n') + 4), `curl -H 'Accept: application/json' ${url} (snapshot version ${liveJson.partner_lists.marketplace.version})`);
}
put('prod-meta.txt', `${execFileSync('curl', ['-sSL', 'https://unitedstatescredit.com/index.html'], { encoding: 'utf8' }).match(/<meta name=['"]usc-build['"][^>]*>/)?.[0] || '(no usc-build meta on production)'}\nsnapshot says: ${JSON.stringify(liveJson.production)}\n`, 'curl https://unitedstatescredit.com/index.html | grep usc-build');
try {
    const cfg = JSON.parse(execFileSync('aws', ['cloudfront', 'get-distribution-config', '--id', 'ENT3GX44KR3US', '--profile', 'bluekeel', '--output', 'json'], { encoding: 'utf8' }));
    const behavior = (cfg.DistributionConfig.CacheBehaviors?.Items || []).find((b) => /compliance-snapshot/.test(b.PathPattern)) || null;
    let headersPolicy = null;
    if (behavior?.ResponseHeadersPolicyId) headersPolicy = JSON.parse(execFileSync('aws', ['cloudfront', 'get-response-headers-policy', '--id', behavior.ResponseHeadersPolicyId, '--profile', 'bluekeel', '--output', 'json'], { encoding: 'utf8' })).ResponseHeadersPolicy;
    put('cloudfront-behavior.json', `${JSON.stringify({ behavior, headersPolicy }, null, 2)}\n`, 'aws cloudfront get-distribution-config --id ENT3GX44KR3US (the /loans/compliance-snapshot* behavior) + get-response-headers-policy');
} catch (e) { put('cloudfront-behavior.json', `{"error":${JSON.stringify(e.message)}}\n`, 'aws cloudfront get-distribution-config (failed)'); }
{
    const rows = [];
    for (const l of liveJson.links) {
        let status = '';
        if (l.href.startsWith('/')) { try { const r = await fetch(`${ORIGIN}${l.href.split('#')[0]}`, { redirect: 'follow', signal: AbortSignal.timeout(15000) }); status = `${r.status} ${r.headers.get('content-type') || ''}`; } catch (e) { status = e.message; } }
        rows.push([l.source, l.text, l.href, l.resolves, status].join('\t'));
    }
    put('link-inventory.tsv', `source\ttext\thref\tresolves\tlive status\n${rows.join('\n')}\n`, 'links from the live JSON; live status = GET on this origin (an SPA answers 200 to any path)');
}
for (const mode of ['build', 'live']) {
    const a = mode === 'build' ? ['--build', '--environment', liveJson.environment] : ['--live', ORIGIN, '--expect-sha', liveJson.build.git_sha];
    let out = '';
    try { out = execFileSync('node', [resolve(ROOT, 'scripts/compliance-snapshot/verify.mjs'), ...a], { encoding: 'utf8', env: { ...process.env, TZ: 'UTC' } }); } catch (e) { out = `${e.stdout || ''}\n${e.stderr || ''}\n(exit ${e.status})`; }
    put(`verify-${mode}.log`, out, `node scripts/compliance-snapshot/verify.mjs ${a.join(' ')}`);
}
put('robots.txt', curl(`${ORIGIN}/robots.txt`), `curl ${ORIGIN}/robots.txt`);

if (args.screenshots && existsSync(CHROME)) {
    const WebSocket = require('ws');
    const profile = mkdtempSync(join(tmpdir(), 'usc-snap-'));
    const port = 9333;
    const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--window-size=1100,1400', 'about:blank'], { stdio: 'ignore' });
    try {
        await new Promise((r) => setTimeout(r, 1500));
        const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
        const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
        await new Promise((r) => ws.once('open', r));
        let id = 0; const pending = new Map(); const requests = [];
        ws.on('message', (raw) => { const m = JSON.parse(raw); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } if (m.method === 'Network.requestWillBeSent') requests.push(m.params.request.url); });
        const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
        await send('Network.enable'); await send('Page.enable');
        for (const route of ROUTES.slice(0, 3)) {
            requests.length = 0;
            await send('Page.navigate', { url: `${ORIGIN}${route}` });
            await new Promise((r) => setTimeout(r, 4000));
            const shot = await send('Page.captureScreenshot', { format: 'png' });
            const name = route.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
            put(`screenshot-${name}.png`, Buffer.from(shot.result.data, 'base64'), `headless Chrome, 1100px wide, ${ORIGIN}${route}`);
            put(`network-${name}.txt`, `${requests.join('\n')}\n`, `every request the page made while loading (CDP Network.requestWillBeSent) — expected: the document only`);
        }
        ws.close();
    } finally { chrome.kill(); rmSync(profile, { recursive: true, force: true }); }
}

writeFileSync(join(OUT, 'INDEX.md'), `# Compliance snapshot evidence — ${ORIGIN} — build ${liveJson.build.git_sha}\n\nCollected ${new Date().toISOString()} by scripts/compliance-snapshot/report-evidence.mjs.\n\n| File | sha256 | Produced by |\n|---|---|---|\n${index.map((i) => `| ${i.name} | ${i.sha256} | \`${i.how.replace(/\|/g, '\\|')}\` |`).join('\n')}\n`);
console.log(`INDEX.md written (${index.length} files)`);
