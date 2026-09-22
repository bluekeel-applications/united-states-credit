# The compliance snapshot

`/loans/compliance-snapshot` on **staging** — a read-only, statically prerendered mirror of
everything a consumer can read on `/loans`: the complete Legal Center, every loan-form step
with its consents, tooltips and conditional variants, the partner lists, the site chrome and
the landing disclosures — plus a link inventory, a consent-state inventory, build metadata
and sha256 hashes for change detection. Three pages and a JSON:

```
/loans/compliance-snapshot                 everything
/loans/compliance-snapshot/legal-center    the Legal Center only
/loans/compliance-snapshot/form            the loan form only
/loans/compliance-snapshot.json            the same model, machine-readable
```

Spec: `reference/USC_Compliance_Snapshot_Route_Spec.md` (private). Report:
`reference/COMPLIANCE_SNAPSHOT_CHANGE_REPORT.md`.

## The one rule: no second copy of any word

The snapshot never carries its own copy of legal, consent, tooltip or disclosure text.

| What | Live page renders it from | The snapshot renders it from |
|---|---|---|
| Legal Center pages | `src/components/Pages/LoanWrapper/content/*.jsx` through `components/LegalArticle.jsx` | the same modules through the same `LegalArticle` (`site-entry.jsx`) |
| Legal Center hub | `components/LegalCenterBody.jsx` | the same component |
| Header, footer, landing disclosures | `components/SiteHeader`, `SiteFooter`, `Hero`, `TrustStrip`, `HowItWorks`, `Notice`, `Faq`, `LegalCenterCta` | the same components |
| Your Privacy Choices variants | `components/PrivacyChoices.jsx` (`SIGNAL_COPY`, `signalMessage`, `hasForm`/`endpoint` props) | the same components, one render per state |
| Marketplace Partners list | `components/MarketplacePartnersList.jsx` `PartnersListView`, fed by `services.config.js` `marketplacePartnersEndpoint()` | the same view, fed by the same endpoint fetched at build |
| Marketing Partners list | `loanPages.js` `MARKETING_PARTNERS` | the same constant |
| Page registry, routes, versions, dates | `loanPages.js` | the same module |
| The loan form: steps, fields, help, tooltips, consents, assent lines, the California authorization, the visibility rules, modal copy | bkform's `src/form/*`, `src/consent/*`, `src/app/modalCopy.js` → `form.js` | bkform's `dist/compliance-manifest.json`, generated at bkform's build from those same modules and published beside `form.js` (`APIS/bluekeel-tools/bkform/scripts/compliance-manifest.mjs`) |

`site-entry.jsx` is the only file that imports `src/`; `manifest.mjs` only lays the manifest's
words out. `grep -r "Drift-test" scripts/compliance-snapshot` should always find nothing: the
CS20 drift test edits one word in bkform's registry (or one content module) and expects both
the live artifact and the snapshot to change with no edit here.

## Building

```
yarn build                                                     # the site (sets up build/)
SNAPSHOT_HOST=staging.unitedstatescredit.com yarn build:compliance-snapshot
yarn verify:compliance-snapshot --build --environment staging
node /path/to/a-static-server build 8123 && open http://localhost:8123/loans/compliance-snapshot/
```

`SNAPSHOT_HOST` is required: it chooses the same service endpoints and bkform build the live
page would use on that host (`services.config.js`, `bkform.config.js`), never guessed.

| Variable | Meaning |
|---|---|
| `SNAPSHOT_HOST` | the host to describe — `staging.unitedstatescredit.com`, `localhost` |
| `SNAPSHOT_BKFORM_MANIFEST_URL` | override the manifest URL (the drift test: a locally served bkform `dist/`) |
| `SNAPSHOT_PROD_ORIGIN` | where production's `<meta name="usc-build">` is read (default `https://unitedstatescredit.com`) |
| `SNAPSHOT_OUT_DIR` | defaults to `build/` |
| `SNAPSHOT_STRICT_PARTNERS=1` | exit non-zero when the partner list is unavailable (default: render the live page's unavailable notice and warn) |
| `SNAPSHOT_REACT_ENV=development` | React's development warnings while rendering |
| `SNAPSHOT_REQUIRE_ROBOTS_HEADER=1` | the live verifier fails, not warns, without `X-Robots-Tag` |

## Files

| File | Does |
|---|---|
| `build.mjs` | orchestrates: bundle `src/` → fetch the manifest, the partner list, production's stamp → one model → three pages + JSON → safety assertions |
| `esbuild.config.mjs` | bundles `site-entry.jsx` for Node (JSX, `.css.js`, empty image/style loaders) |
| `site-entry.jsx` | the only importer of `src/`: providers (`StaticRouter`, `AppContext`, Radium `StyleRoot`, `MarketplacePartnersContext`) and one renderer per live component |
| `model.mjs` | the model: blocks (render → extract links → sanitize → hash), the form from the manifest, partner lists, the link inventory, the hashes; `toJson` |
| `manifest.mjs` | fetches and validates bkform's manifest (its `contentHash` must recompute), builds the form section, resolves every legal slug through the site's registry |
| `postprocess.mjs` | makes a block safe to publish: no script/style/form/image/handler/inline style, every control disabled, ids namespaced per block; page-level assertions |
| `render-html.mjs` | the three pages from the model; one inline stylesheet; the `data-*` contract the verifier reads |
| `links.mjs` | anchors with their source, classified against the registry (`registered`, `legacy-redirect`, `anchor-ok`, `mailto`, `external`, `UNRESOLVED`) |
| `partners.mjs`, `metadata.mjs` | the build-time fetches |
| `lib/text.mjs` | the one normalization + sha256 the prerender and the verifier share (`usc-text-v1`) |
| `verify.mjs` | `--build` (B01–B17) before the sync, `--live <origin>` (L01–L13) after the invalidation |
| `diff.mjs` | what changed vs the snapshot currently live, into the run summary; never blocks |
| `publish.mjs` | `Cache-Control: no-cache` and the extensionless keys, after the sync, before the invalidation |
| `cloudfront-robots.mjs` | one-time: the `/loans/compliance-snapshot*` behavior with the `X-Robots-Tag` response-headers policy (applied to `ENT3GX44KR3US` 2026-09-21) |
| `report-evidence.mjs` | collects the evidence the change report cites into `reference/compliance-snapshot-report/<sha>/` |

## Deploy

`deploy-staging.yml`: build → **build snapshot** → **verify (build)** → change detection →
`yarn sync-staging` → `yarn publish:compliance-snapshot` → invalidate and wait → **verify
(live)** → upload artifacts. A verification failure blocks the deploy before anything reaches
S3; `workflow_dispatch` with `snapshot_gate=warn` is the emergency lever. Locally
`yarn deploy-staging` does the same three deploy steps and refuses (`predeploy-staging`)
when no snapshot was built — the sync's `--delete` would otherwise remove the live one.
`deploy-prod`, `deploy-pch` and `deploy-hsw` exclude `loans/compliance-snapshot*`.

Why the extensionless objects: CloudFront sends the S3 *website* origin its own hostname, so
S3's folder redirect for `/loans/compliance-snapshot` would point off CloudFront over http.
An object at the exact key is served before any redirect is considered.

## Known limits

- The snapshot is as fresh as the last staging build: a bkform publish alone does not
  regenerate it. `verify --live` L10 warns "snapshot stale — rebuild site"; re-run the
  staging workflow (`workflow_dispatch`).
- The site answers 200 to any path (SPA fallback), so a live HTTP status cannot show a broken
  legal link; registry resolution (B08) is the check.
- Production parity needs production's `index.html` to carry `<meta name="usc-build">`,
  which arrives with the next production deploy from this branch.
- The Marketplace Partners list refreshes daily; the snapshot records the version it saw.
