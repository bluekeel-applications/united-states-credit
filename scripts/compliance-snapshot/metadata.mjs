// Build information: which environment, build and sources the snapshot
// describes, and — never assumed — what production is running.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fetchText } from './lib/http.mjs';
import { dom } from './lib/text.mjs';

const git = (args, root) => {
    try { return execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim(); } catch { return null; }
};

const SHA = /^[0-9a-f]{7,40}$/;

export const buildMetaFromIndex = (root) => {
    const file = resolve(root, 'build/index.html');
    if (!existsSync(file)) return { status: 'absent', sha: null };
    const { document } = dom(readFileSync(file, 'utf8')).window;
    const content = document.querySelector('meta[name="usc-build"]')?.getAttribute('content') || '';
    if (!content) return { status: 'absent', sha: null };
    if (/^%.*%$/.test(content)) return { status: 'unset-token', sha: null };
    return SHA.test(content) ? { status: 'ok', sha: content } : { status: 'invalid', sha: null };
};

export const collectBuild = ({ root, pkg }) => {
    const sha = process.env.GITHUB_SHA || git(['rev-parse', 'HEAD'], root);
    const branch = process.env.GITHUB_REF_NAME || git(['rev-parse', '--abbrev-ref', 'HEAD'], root);
    const dirty = process.env.CI ? false : (git(['status', '--porcelain', '--', 'src', 'public', 'scripts', 'package.json'], root) || '').length > 0;
    const bundle = buildMetaFromIndex(root);
    return {
        git_sha: sha,
        git_branch: branch,
        dirty,
        package_version: pkg.version,
        node: process.version,
        ci: !!process.env.CI,
        github_run_id: process.env.GITHUB_RUN_ID || null,
        bundle_sha_check: bundle.status === 'ok' ? (bundle.sha === sha ? 'ok' : 'mismatch') : bundle.status,
        bundle_sha: bundle.sha,
    };
};

// Production's own build stamp, read off its live index.html. Absent or
// unreadable is reported as exactly that.
export const fetchProductionBuild = async ({ origin, stagingSha }) => {
    const url = `${origin.replace(/\/+$/, '')}/index.html`;
    try {
        const { text, response } = await fetchText(url, { retries: 2, timeoutMs: 10000 });
        if (!response.ok) return { git_sha: null, status: 'unavailable', reason: `HTTP ${response.status}`, fetched_from: url, parity: 'unknown' };
        const { document } = dom(text).window;
        const content = document.querySelector('meta[name="usc-build"]')?.getAttribute('content') || '';
        if (!content) return { git_sha: null, status: 'unavailable', reason: 'production index.html carries no usc-build meta yet', fetched_from: url, parity: 'unknown' };
        if (!SHA.test(content)) return { git_sha: null, status: 'unavailable', reason: `usc-build meta is not a commit id (${content.slice(0, 24)})`, fetched_from: url, parity: 'unknown' };
        return { git_sha: content, status: 'ok', reason: null, fetched_from: url, parity: stagingSha && content === stagingSha ? 'same' : 'differs' };
    } catch (error) {
        return { git_sha: null, status: 'unavailable', reason: String(error?.message || error), fetched_from: url, parity: 'unknown' };
    }
};

export const environmentFor = ({ hostname, isDevHost }) => {
    if (hostname === 'localhost' || hostname === '127.0.0.1') return 'local';
    return isDevHost(hostname) ? 'staging' : 'production';
};
