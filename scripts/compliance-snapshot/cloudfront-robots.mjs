#!/usr/bin/env node
// One-time, idempotent CloudFront change for the compliance snapshot: a
// response-headers policy that adds X-Robots-Tag (and Cache-Control as a
// fallback), attached to a new cache behavior for /loans/compliance-snapshot*
// with caching disabled, so reviewers always see the current build and no
// stray redirect can be cached at the edge. The origin is the S3 website
// endpoint, which cannot send X-Robots-Tag itself.
//
//   cloudfront-robots.mjs [--distribution ENT3GX44KR3US] [--profile bluekeel]
//                         [--policy-name usc-compliance-snapshot-robots]
//                         [--path-pattern "/loans/compliance-snapshot*"]
//                         [--cache-policy disabled|optimized] [--dry-run] [--wait]
//
// Re-running prints "up to date" and changes nothing. A PreconditionFailed
// (someone edited the distribution meanwhile) is safe to retry.
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const args = Object.fromEntries(process.argv.slice(2).map((a, i, all) => (a.startsWith('--') ? [a.slice(2), all[i + 1] && !all[i + 1].startsWith('--') ? all[i + 1] : true] : null)).filter(Boolean));
const DIST = args.distribution || 'ENT3GX44KR3US';
const PROFILE = args.profile || 'bluekeel';
const POLICY_NAME = args['policy-name'] || 'usc-compliance-snapshot-robots';
const PATH_PATTERN = args['path-pattern'] || '/loans/compliance-snapshot*';
const CACHE_POLICIES = { disabled: '4135ea2d-6df8-44a3-9df3-4b5a84be39ad', optimized: '658327ea-f89d-4fab-a63d-7e88639e58f6' };
const CACHE_POLICY = CACHE_POLICIES[args['cache-policy'] || 'disabled'];
const DRY = !!args['dry-run'];

const aws = (params, input) => JSON.parse(execFileSync('aws', ['cloudfront', ...params, '--profile', PROFILE, '--output', 'json'], { encoding: 'utf8', input, maxBuffer: 16 * 1024 * 1024 }) || '{}');
const say = (s) => console.log(`[cloudfront-robots] ${s}`);

const desiredPolicy = {
    Name: POLICY_NAME,
    Comment: 'USC compliance snapshot (staging): noindex, nofollow, noarchive; revalidate every request',
    CustomHeadersConfig: {
        Quantity: 2,
        Items: [
            { Header: 'X-Robots-Tag', Value: 'noindex, nofollow, noarchive', Override: true },
            { Header: 'Cache-Control', Value: 'no-cache', Override: false },
        ],
    },
};

// 1. The response-headers policy.
const listed = aws(['list-response-headers-policies', '--type', 'custom']);
let policy = (listed.ResponseHeadersPolicyList?.Items || []).map((i) => i.ResponseHeadersPolicy).find((p) => p.ResponseHeadersPolicyConfig?.Name === POLICY_NAME) || null;
let policyId = policy?.Id || null;
if (!policy) {
    say(`policy ${POLICY_NAME}: absent → ${DRY ? 'would create' : 'creating'}`);
    if (!DRY) {
        const created = aws(['create-response-headers-policy', '--response-headers-policy-config', JSON.stringify(desiredPolicy)]);
        policyId = created.ResponseHeadersPolicy.Id;
        say(`created ${policyId}`);
    }
} else {
    const current = policy.ResponseHeadersPolicyConfig.CustomHeadersConfig;
    const same = JSON.stringify(current) === JSON.stringify(desiredPolicy.CustomHeadersConfig);
    if (same) say(`policy ${POLICY_NAME} (${policyId}): up to date`);
    else {
        say(`policy ${POLICY_NAME} (${policyId}): headers differ → ${DRY ? 'would update' : 'updating'}`);
        if (!DRY) {
            const got = aws(['get-response-headers-policy', '--id', policyId]);
            aws(['update-response-headers-policy', '--id', policyId, '--if-match', got.ETag, '--response-headers-policy-config', JSON.stringify({ ...got.ResponseHeadersPolicy.ResponseHeadersPolicyConfig, ...desiredPolicy })]);
            say('updated');
        }
    }
}

// 2. The cache behavior on the distribution.
const got = aws(['get-distribution-config', '--id', DIST]);
const config = got.DistributionConfig;
const etag = got.ETag;
const base = JSON.parse(JSON.stringify(config.DefaultCacheBehavior));
for (const legacy of ['ForwardedValues', 'MinTTL', 'DefaultTTL', 'MaxTTL']) delete base[legacy];
const desired = { ...base, PathPattern: PATH_PATTERN, CachePolicyId: CACHE_POLICY, ResponseHeadersPolicyId: policyId || '(new policy id)' };
delete desired.OriginRequestPolicyId;
const behaviors = config.CacheBehaviors?.Items || [];
const idx = behaviors.findIndex((b) => b.PathPattern === PATH_PATTERN);
const existing = idx >= 0 ? behaviors[idx] : null;
const orderedKeys = (o) => Object.keys(o).sort();
const same = existing && JSON.stringify(orderedKeys(existing).map((k) => [k, existing[k]])) === JSON.stringify(orderedKeys(desired).map((k) => [k, desired[k]]));
if (same) say(`behavior ${PATH_PATTERN}: up to date (cache policy ${CACHE_POLICY}, headers policy ${policyId})`);
else {
    say(`behavior ${PATH_PATTERN}: ${existing ? 'differs → replacing' : 'absent → inserting first'}`);
    if (existing) say(`  before: ${JSON.stringify(existing)}`);
    say(`  after:  ${JSON.stringify(desired)}`);
    if (DRY) say('dry run: distribution not updated');
    else {
        if (!policyId) throw new Error('no policy id');
        const items = existing ? behaviors.map((b, i) => (i === idx ? desired : b)) : [desired, ...behaviors];
        const next = { ...config, CacheBehaviors: { Quantity: items.length, Items: items } };
        const file = join(tmpdir(), `usc-cf-${DIST}-${Date.now()}.json`);
        writeFileSync(file, JSON.stringify(next));
        const updated = aws(['update-distribution', '--id', DIST, '--if-match', etag, '--distribution-config', `file://${file}`]);
        say(`updated: status ${updated.Distribution?.Status}, new ETag ${updated.ETag}`);
        if (args.wait) {
            say('waiting for the distribution to deploy (2–5 minutes)…');
            execFileSync('aws', ['cloudfront', 'wait', 'distribution-deployed', '--id', DIST, '--profile', PROFILE], { stdio: 'inherit' });
            say('deployed');
        }
    }
}
say(`verify: curl -sI https://staging.unitedstatescredit.com/loans/compliance-snapshot.json | grep -i -e x-robots-tag -e cache-control`);
