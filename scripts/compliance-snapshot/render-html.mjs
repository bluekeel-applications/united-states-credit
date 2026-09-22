// The three pages, as HTML strings, from the model — headings, tables and
// labels around the rendered blocks and the manifest's words. No script, no
// external asset, one inline stylesheet, readable without CSS at all.
import { escapeHtml as esc } from './lib/text.mjs';

const CSS = `
:root{--ink:#17202a;--muted:#5b6770;--line:#d9dee3;--bg:#fff;--accent:#0b2f59;--flag:#b00020;--soft:#f4f6f8}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.55 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
.snap-masthead{background:var(--accent);color:#fff;padding:18px 24px}
.snap-masthead h1{margin:0 0 4px;font-size:22px}
.snap-masthead p{margin:0;font-size:14px;opacity:.9}
.snap-wrap{max-width:980px;margin:0 auto;padding:0 24px 64px}
.snap-toc{border:1px solid var(--line);border-radius:8px;padding:12px 18px;margin:24px 0;background:var(--soft)}
.snap-toc ol{margin:0;padding-left:20px;columns:2;column-gap:32px}
.snap-toc li{margin:2px 0}
.snap-section{margin:40px 0;padding-top:16px;border-top:2px solid var(--line)}
.snap-section>h2{font-size:24px;margin:0 0 12px}
.snap-block{border:1px solid var(--line);border-radius:8px;padding:16px 20px;margin:20px 0}
.snap-block>h3{margin:0 0 8px;font-size:19px}
.snap-block>h4{margin:18px 0 6px;font-size:16px;color:var(--muted);text-transform:uppercase;letter-spacing:.04em}
.snap-meta{font-size:14px;color:var(--muted);margin:6px 0 12px}
.snap-meta code{font-size:13px}
dl.snap-dl{display:grid;grid-template-columns:max-content 1fr;gap:4px 16px;margin:8px 0}
dl.snap-dl dt{font-weight:600;color:var(--muted)}
dl.snap-dl dd{margin:0;overflow-wrap:anywhere}
table.snap-table{border-collapse:collapse;width:100%;margin:10px 0;font-size:14px}
table.snap-table th,table.snap-table td{border:1px solid var(--line);padding:6px 8px;vertical-align:top;text-align:left;overflow-wrap:anywhere}
table.snap-table th{background:var(--soft)}
.snap-rendered{border-left:4px solid var(--accent);padding:4px 16px;margin:12px 0;background:#fbfcfd}
.snap-rendered table{border-collapse:collapse;font-size:14px}
.snap-rendered th,.snap-rendered td{border:1px solid var(--line);padding:4px 8px;text-align:left;vertical-align:top}
.snap-rendered .callout,.snap-rendered .warning,.snap-rendered .review-banner,.snap-rendered .contact-block,.snap-rendered .gpc-status{border:1px solid var(--line);border-radius:6px;padding:10px 14px;margin:12px 0;background:var(--soft)}
.snap-rendered .legal-card{display:block;border:1px solid var(--line);border-radius:6px;padding:10px 14px;margin:8px 0;text-decoration:none;color:inherit}
.snap-rendered .legal-card h2{font-size:17px;margin:2px 0}
.snap-rendered .legal-card small{color:var(--muted)}
.snap-rendered .effective{display:inline-block;font-size:13px;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:2px 10px;margin-bottom:12px}
.snap-rendered .print-note{font-size:13px;color:var(--muted);margin-bottom:12px}
.snap-rendered h2{font-size:20px;margin:22px 0 8px}
.snap-rendered h3{font-size:17px;margin:16px 0 6px}
.snap-rendered [role="group"][data-snapshot-was="form"]{border:1px dashed var(--line);padding:10px 14px;margin:10px 0}
.snap-rendered input,.snap-rendered select,.snap-rendered textarea,.snap-rendered button{font:inherit;border:1px solid var(--line);border-radius:4px;padding:4px 8px;background:#f2f2f2;color:#555;max-width:100%}
.snap-rendered label{display:block;margin:6px 0}
.snap-rendered details summary{cursor:default;font-weight:600}
.snap-img{display:inline-block;font-size:13px;color:var(--muted);border:1px dashed var(--line);padding:0 6px;border-radius:4px}
.snap-rendered a+a::before{content:" · ";color:var(--muted)}
.snap-rendered span+span{margin-left:.4em}
table.snap-fields td:nth-child(2),table.snap-fields td:nth-child(3),table.snap-fields td:nth-child(8){white-space:nowrap}
.snap-consent{border:1px solid var(--line);border-radius:6px;padding:10px 14px;margin:10px 0}
.snap-consent .snap-box{font-family:ui-monospace,Menlo,monospace;font-weight:700;margin-right:6px}
.snap-consent .snap-tag{display:inline-block;font-size:12px;font-weight:700;letter-spacing:.04em;padding:1px 8px;border-radius:999px;border:1px solid var(--line);margin-right:6px}
.snap-tag.required{background:#fde8e8;border-color:#f3b3b3}
.snap-tag.optional{background:#e8f4fd;border-color:#b3d7f3}
.snap-flag-unresolved{color:var(--flag);font-weight:700;border-bottom:2px solid var(--flag)}
.snap-note{font-size:14px;color:var(--muted)}
.snap-hash{font-family:ui-monospace,Menlo,monospace;font-size:12px;color:var(--muted);overflow-wrap:anywhere}
.snap-kv{margin:4px 0}
.snap-foot{border-top:1px solid var(--line);padding:16px 24px;font-size:13px;color:var(--muted);text-align:center}
.snap-warn{background:#fff7e6;border:1px solid #f0d9a8;border-radius:6px;padding:8px 12px;margin:8px 0}
@media (max-width:640px){.snap-toc ol{columns:1}dl.snap-dl{grid-template-columns:1fr}dl.snap-dl dt{margin-top:6px}}
@media print{.snap-toc{display:none}.snap-section{break-before:page}}
`;

const dl = (rows) => `<dl class="snap-dl">${rows.filter(([, v]) => v !== undefined && v !== null && v !== '').map(([k, v, raw]) => `<dt>${esc(k)}</dt><dd>${raw ? v : esc(v)}</dd>`).join('')}</dl>`;
const table = (head, rows, attrs = '') => `<table class="snap-table"${attrs ? ` ${attrs}` : ''}><thead><tr>${head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => (typeof r === 'string' ? r : `<tr>${r.map((c) => `<td>${c && c.raw ? c.raw : esc(c)}</td>`).join('')}</tr>`)).join('')}</tbody></table>`;
const hash = (h) => `<div class="snap-hash">sha256 ${esc(h || 'n/a')}</div>`;
const yesNo = (b) => (b ? 'yes' : 'no');
const list = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
const short = (h) => (h ? String(h).slice(0, 12) : 'n/a');

// bkform copy: [label](slug) parts, hrefs from the model's table.
const copyHtml = (block, hrefs) => {
    if (!block) return '';
    return block.parts.map((part) => {
        if (part.type === 'link') {
            const r = hrefs[part.slug] || { href: '#', resolves: 'UNRESOLVED' };
            const flag = r.resolves === 'UNRESOLVED' ? ' class="snap-flag-unresolved"' : '';
            return `<a href="${esc(r.href)}"${flag} target="_blank" rel="noopener noreferrer">${esc(part.label)}</a>`;
        }
        if (part.type === 'strong') return `<strong>${esc(part.text)}</strong>`;
        return esc(part.text);
    }).join('');
};

const rendered = (b, attrs = '') => `<div class="snap-rendered" data-hash-target ${attrs}>${b.html}</div>`;

// ---- sections ---------------------------------------------------------------

const buildInfo = (m) => {
    const f = m.form;
    const mp = m.partner_lists.marketplace;
    const prod = m.production.status === 'ok'
        ? `${m.production.git_sha} — ${m.production.parity === 'same' ? 'the same commit as this snapshot' : 'a different commit from this snapshot'}`
        : `unavailable (${m.production.reason}) — parity with production is not verified`;
    return `<section class="snap-section" id="build-information"><h2>Build information</h2>
${dl([
        ['Environment', `${m.environment} (${m.host})`],
        ['Generated', m.generated_at],
        ['Site build (git)', `${m.build.git_sha || 'unknown'} on ${m.build.git_branch || 'unknown'}${m.build.dirty ? ' (uncommitted changes)' : ''}`],
        ['Site package version', m.build.package_version],
        ['Build stamp in index.html', m.build.bundle_sha_check],
        ['Production currently reflects', prod],
        ['Legal Center content version', m.legal.content_version],
        ['Legal Center effective / last updated', `${m.legal.effective_date} / ${m.legal.last_updated}`],
        ['Loan-form documents effective', m.legal.loan_form_docs_effective_date],
        ['Loan form (bkform)', `${f.sdk_name} ${f.sdk_version}, manifest from ${f.manifest.source}, manifest content hash ${f.manifest.content_hash}, file sha256 ${f.manifest.sha256}, generated ${f.manifest.generated_at}`],
        ['Form evidence version', `${f.evidence_version} (consent versions: ${Object.entries(f.consent_versions).map(([k, v]) => `${k}=${v}`).join(', ')})`],
        ['First-offer check on this host', `${f.mode.environment} (${f.mode.meaning[f.mode.environment]})`],
        ['Marketplace Partners list', mp.status === 'loaded' ? `version ${mp.version} · updated ${mp.updated_at} · ${mp.count} partners${mp.stale ? ' · STALE per the service' : ''}` : `UNAVAILABLE AT BUILD (${mp.error})`],
        ['Marketing Partners list', `version ${m.partner_lists.marketing.version} · updated ${m.partner_lists.marketing.updated} · ${m.partner_lists.marketing.count} partners`],
        ['Text normalization for hashes', m.hashes.normalization],
        ['Machine-readable copy', '<a href="/loans/compliance-snapshot.json">/loans/compliance-snapshot.json</a>', true],
        ['Subroutes', '<a href="/loans/compliance-snapshot/legal-center">/loans/compliance-snapshot/legal-center</a> · <a href="/loans/compliance-snapshot/form">/loans/compliance-snapshot/form</a>', true],
    ])}
<p class="snap-note">This page is a read-only mirror generated at the site's build from the same source modules the live pages and the live form render. It sets no cookies, loads no script and submits nothing. Every control shown is disabled.</p>
${m.unresolved_links.length ? `<div class="snap-warn"><strong>${m.unresolved_links.length} link(s) could not be resolved against the page registry.</strong> See the link inventory.</div>` : ''}
</section>`;
};

const siteChrome = (m) => {
    const blk = (b) => `<div class="snap-block" id="${esc(b.id)}" data-snapshot-block="${esc(b.id)}" data-sha256="${esc(b.sha256)}"><h3>${esc(b.title)}</h3>${rendered(b)}${hash(b.sha256)}</div>`;
    return `<section class="snap-section" id="site-chrome"><h2>Site chrome and landing-page disclosures</h2>
<p class="snap-note">The header and footer every /loans page carries, and the landing page's own disclosures, rendered once from the live components. The hero shows the form card in its static visualization; the live form itself is documented in the Loan form section from bkform's manifest.</p>
${blk(m.site_chrome.header)}${blk(m.site_chrome.footer)}${m.site_chrome.landing.map(blk).join('')}
</section>`;
};

const hubBlock = (m) => {
    const h = m.legal_center.hub;
    return `<div class="snap-block" id="legal-page-legal-center" data-snapshot-page="legal-center" data-route="${esc(h.route)}" data-sha256="${esc(h.sha256)}"><h3>${esc(h.title)}</h3>
${dl([['Canonical route', `<a href="${esc(h.route)}">${esc(h.route)}</a>`, true], ['Document title', m.legal.legal_center_meta.documentTitle], ['Lede', m.legal.legal_center_meta.lede], ['Pages listed', String(m.legal_center.pages.length)]])}
${rendered(h)}${linksOn(h)}${hash(h.sha256)}</div>`;
};

const linksOn = (b) => (b.links.length ? `<h4>Links on this page</h4>${list(b.links.map((l) => `${esc(l.text || '(no text)')} → <code>${esc(l.href)}</code>`))}` : '<p class="snap-note">No links.</p>');

const legalPageBlock = (p) => `<div class="snap-block" id="legal-page-${esc(p.slug)}" data-snapshot-page="${esc(p.slug)}" data-route="${esc(p.route)}" data-sha256="${esc(p.sha256)}"><h3>${esc(p.title)}</h3>
${dl([
    ['Canonical route', `<a href="${esc(p.route)}">${esc(p.route)}</a>`, true],
    ['Document title', p.document_title],
    ['Meta description', p.meta_description],
    ['Dates line', p.dates_line || 'no dates line on this page'],
    ['Lede', p.lede],
    ['Content version', p.content_version],
    ['Sections', p.sections.map((s) => s.heading).join(' · ')],
    ['Parts that vary', p.dynamic_parts.length ? p.dynamic_parts.join('; ') : null],
])}
<h4>Current rendered content</h4>${rendered(p)}${linksOn(p)}${hash(p.sha256)}</div>`;

const legalCenter = (m, { heading = 'Legal Center' } = {}) => `<section class="snap-section" id="legal-center"><h2>${esc(heading)}</h2>
<p class="snap-note">The hub and all ${m.legal_center.pages.length} pages in registry order, each the live article rendered from its content module. Nothing is summarized.</p>
${hubBlock(m)}${m.legal_center.pages.map(legalPageBlock).join('')}
</section>`;

const consentBlock = (c, hrefs, mode) => {
    const tag = c.required ? '<span class="snap-tag required">REQUIRED</span>' : '<span class="snap-tag optional">OPTIONAL</span>';
    return `<div class="snap-consent" data-snapshot-consent="${esc(c.key)}" data-default="${c.defaultChecked ? 'checked' : 'unchecked'}" data-required="${c.required ? 'true' : 'false'}" data-sha256="${esc(c.textHash || c.templateHash || '')}">
<div><span class="snap-box">[${c.defaultChecked ? 'x' : ' '}]</span>${tag}<strong>${esc(c.key)}</strong> · version <code>${esc(c.version)}</code> · default ${c.defaultChecked ? 'checked' : 'unchecked'}${c.visibility ? ` · shown only when <code>${esc(c.visibility.predicate)}</code>` : ''}</div>
<p data-hash-target>${copyHtml(c.label, hrefs)}</p>
${c.label.placeholder ? `<p class="snap-note">${esc(c.label.placeholder.token)} stands for ${esc(c.label.placeholder.standsFor)} (${esc(c.label.placeholder.format)}).</p>` : ''}
${c.whenUnchecked ? `<p class="snap-note">Left unchecked, the form says: “${esc(c.whenUnchecked)}”</p>` : ''}
<p class="snap-note">Recorded as: ${esc(c.perMode[mode].recordedAs.join(' / '))} · carried on: ${esc(c.perMode[mode].carriedOnStages.join(', '))}${c.textHash ? '' : ` · hash rule: ${esc(c.textHashRule)}`}</p>
${hash(c.textHash || c.templateHash)}</div>`;
};

const fieldRow = (f, hrefs) => {
    const tooltip = f.explain ? `<strong>${esc(f.explain.accessibleLabel)}</strong> (${esc(f.explain.kind)}): ${copyHtml(f.explain.text, hrefs)}${f.explain.link ? ` <a href="${esc((hrefs[f.explain.link.slug] || {}).href || '#')}" target="_blank" rel="noopener noreferrer">${esc(f.explain.link.label)}</a>` : ''}` : '';
    const help = f.help ? (f.help.dynamic ? f.help.variants.map((v) => `<em>${esc(v.when)}:</em> ${copyHtml(v, hrefs)}`).join('<br>') : copyHtml(f.help, hrefs)) : '';
    const options = f.options ? f.options.map((o) => esc(o.label)).join(' / ') : (f.range ? `slider ${esc(f.range.display[0])}–${esc(f.range.display[1])}, starts at ${esc(f.range.initialDisplay)}` : '');
    const visibility = f.visibility ? `only when <code>${esc(f.visibility.predicate)}</code> (see variants)` : 'always';
    return `<tr data-snapshot-field="${esc(f.name)}"><td>${copyHtml(f.label, hrefs)}${f.sensitive ? ' <span class="snap-note">(sensitive)</span>' : ''}</td><td>${esc(f.input)}</td><td>${f.required ? 'Required' : `Optional${f.optionalMarker ? ` (“${esc(f.optionalMarker)}”)` : ''}`}</td><td>${esc(f.placeholder || '')}</td><td>${help}</td><td>${tooltip}</td><td>${options}</td><td>${visibility}</td></tr>`;
};

const stepBlock = (s, m) => {
    const f = m.form;
    const hrefs = f.slug_hrefs;
    const env = f.mode.environment; const other = f.mode.other;
    const modeLine = (mode) => {
        const pm = s.perMode[mode];
        return `<strong>${mode === env ? 'This host' : 'Other mode'} (first-offer check ${mode}):</strong> section “${esc(pm.section.label)}”, ${esc(pm.section.progressText)} · button “${esc(pm.primaryLabel)}”${pm.backAvailable ? ` · “${esc(f.ui.back)}” available` : ''} · ${pm.posts ? `<strong>submission: yes</strong> (stage ${esc(pm.stage)})` : 'submission: no'}`;
    };
    const consentEvents = s.consentEntries.length ? `<p class="snap-note">Consent events on this step: ${s.consentEntries.map((c) => `${esc(c.key)} recorded as “${esc(c.perMode[env].recordedAs.join('” / “'))}”`).join('; ')}.</p>` : '';
    return `<div class="snap-block" id="form-step-${s.index + 1}" data-snapshot-step="${esc(s.id)}" data-step-index="${s.index}"><h3>STEP ${s.index + 1} OF ${m.form.steps.length} — ${esc(s.title)}</h3>
<div class="snap-meta">id <code>${esc(s.id)}</code> · phase <code>${esc(s.phase)}</code></div>
${s.blurb ? `<p><em>${esc(s.blurb)}</em></p>` : ''}
${s.note ? `<p><strong>Note under the title:</strong> ${copyHtml(s.note, hrefs)}</p>` : ''}
<h4>Fields</h4>
${table(['Label', 'Input', 'Required', 'Placeholder', 'Help text', 'Tooltip (fully expanded)', 'Options / range', 'Shown'], s.fieldEntries.filter((x) => !x.isConsent).map((x) => fieldRow(x, hrefs)), 'class="snap-table snap-fields"')}
${s.consentEntries.length ? `<h4>Consents</h4>${s.consentEntries.map((c) => consentBlock(c, hrefs, env)).join('')}` : ''}
<h4>Buttons and submission behavior</h4>
<p>${modeLine(env)}</p><p>${modeLine(other)}</p>
${s.perMode[env].assent ? `<p><strong>Assent line above the button (${env}):</strong> ${copyHtml(s.perMode[env].assent, hrefs)}</p>` : ''}
${s.perMode[other].assent ? `<p><strong>Assent line (other mode, ${other}):</strong> ${copyHtml(s.perMode[other].assent, hrefs)}</p>` : ''}
${consentEvents}
${s.footer ? `<p><strong>Footer under the buttons:</strong> ${copyHtml(s.footer, hrefs)}</p>` : ''}
</div>`;
};

const formSection = (m, { heading = 'Loan form' } = {}) => {
    const f = m.form;
    return `<section class="snap-section" id="loan-form"><h2>${esc(heading)}</h2>
${dl([
        ['Source', `bkform ${f.sdk_version} — compliance manifest ${f.manifest.content_hash} (from ${f.manifest.source}, generated ${f.manifest.generated_at})`],
        ['Embedded with', `data-legal-base=${f.embed.legal_base} · data-legal-version=${f.embed.legal_version} · data-marketing-partners-version=${f.embed.marketing_partners_version} · data-first-offer-check=${f.embed.first_offer_check} · site key ${f.embed.site_key}`],
        ['Legal link rule', `${f.legal_url_rule.pattern} with legalBase ${f.embed.legal_base} (${f.legal_url_rule.source}); the site's own route for a slug is ${m.legal.loans_home}/<slug>`],
        ['This host\'s mode', `first-offer check ${f.mode.environment}: ${f.mode.meaning[f.mode.environment]}`],
        ['Other mode', `first-offer check ${f.mode.other}: ${f.mode.meaning[f.mode.other]}`],
        ['Submissions (this host)', f.submissions[f.mode.environment].map((s) => `step ${s.stepIndex + 1} “${s.button}” → ${s.stage}`).join('; ')],
        ['Submissions (other mode)', f.submissions[f.mode.other].map((s) => `step ${s.stepIndex + 1} “${s.button}” → ${s.stage}`).join('; ')],
        ['Search modal', `“${f.modal.search.title}” — “${f.modal.search.subtitle}”`],
    ])}
<p class="snap-note">Every word below is the manifest's, generated from the form's own modules at bkform's build; nothing is retyped here. Links resolve through the site's page registry; an unresolved slug is flagged in red.</p>
${f.steps.map((s) => stepBlock(s, m)).join('')}
</section>`;
};

const variantsSection = (m) => {
    const f = m.form; const hrefs = f.slug_hrefs;
    const ca = f.variants[0];
    const caHtml = `<div class="snap-block" id="variant-${esc(ca.id)}" data-snapshot-variant="california" data-hash-rule="paragraphs" data-sha256="${esc(ca.text_hash)}"><h3>California: ${esc(ca.title)}</h3>
${dl([
        ['Trigger condition', ca.condition],
        ['Result', ca.result],
        ['Decline path', `“${ca.buttons.decline}” records authorized=false with no name; ${ca.decline}`],
        ['Signature fields', `“${ca.signature.typedName.label}” (text) · “${ca.signature.agree.label}” (checkbox, default ${ca.signature.agree.defaultChecked ? 'checked' : 'unchecked'}) · authorize enabled when ${ca.signature.enabledWhen}`],
        ['Buttons', `“${ca.buttons.authorize}” · “${ca.buttons.decline}” · after signing: “${ca.labels.recorded}”, “${ca.buttons.print}”, “${ca.buttons.continue}”`],
        ['Intro line', ca.labels.intro],
        ['Date shown', `“${ca.labels.date} ${ca.date_format.example}” — ${ca.date_format.rule}`],
        ['Version', ca.version],
        ['Text hash verified', yesNo(ca.text_hash_verified)],
    ])}
<h4>Exact document text (title and paragraphs, as hashed into the consent ledger)</h4><div class="snap-rendered" data-hash-target><p><strong>${esc(ca.title)}</strong></p>${ca.paragraphs.map((p) => `<p>${copyHtml(p, hrefs)}</p>`).join('')}</div>
${table(['Applicant state', 'Contact/marketing consent', 'On step', 'Already answered', 'Shown'], ca.trigger.evaluated.map((r) => [r.state, yesNo(r.consentContact), r.onStep, yesNo(r.alreadyAnswered), r.shown ? 'SHOWN' : 'not shown']))}
<h4>Printable copy (text)</h4><p class="snap-note">${esc(ca.printable_sample_text)}</p>
${hash(ca.text_hash)}</div>`;
    const ruleHtml = (v) => {
        const vKey = v.id === 'marital-status' ? 'marital-status' : v.id === 'different-mobile-number-consent' ? 'mobile-consent' : v.id;
        return `<div class="snap-block" id="variant-${esc(v.id)}" data-snapshot-variant="${esc(vKey)}" data-hash-rule="json" data-sha256="${esc(m.hashes.items[`variant:${v.id}`] || '')}"><h3>${esc(v.id.replace(/-/g, ' '))}</h3>
${dl([
            ['Rule', `${v.predicate} (${v.source}), evaluated over ${v.evaluated_over}`],
            ['Fields', v.fields.map((x) => `“${x.label}” — step ${x.step_number} “${x.step_title}”, ${x.required ? 'required' : 'optional'}${x.placeholder ? `, placeholder “${x.placeholder}”` : ''}${x.options ? `, options: ${x.options.map((o) => o.label).join(' / ')}` : ''}`).join('; ')],
            ['Shown for', Array.isArray(v.visible_in) ? v.visible_in.join(', ') : null],
            ['Hidden for', Array.isArray(v.hidden_in) ? v.hidden_in.join(', ') : null],
            ['Constant', v.constant ? `${v.constant.name} = ${v.constant.values.join(', ')}` : null],
            ['Notes', v.notes.length ? v.notes.join(' ') : null],
        ])}
${v.truth_table ? table(Object.keys(v.truth_table[0]), v.truth_table.map((row) => Object.values(row).map((x) => (typeof x === 'boolean' ? (x ? 'yes' : 'no') : String(x))))) : ''}
${v.consent ? `<h4>Number-specific consent</h4>${consentBlock({ key: v.consent.key, version: v.consent.version, required: v.consent.required, defaultChecked: v.consent.default === 'checked', label: f.consents.find((c) => c.key === v.consent.key) && f.fields.find((x) => x.name === v.consent.key)?.label, visibility: { predicate: v.predicate }, whenUnchecked: null, perMode: { [f.mode.environment]: { recordedAs: ['toggle', 'See my options'], carriedOnStages: ['full_form'] } }, textHash: null, templateHash: v.consent.template_hash, textHashRule: v.consent.text_hash_rule }, hrefs, f.mode.environment)}<p class="snap-note">${esc(v.notes.join(' '))}</p>` : ''}
</div>`;
    };
    const p = m.privacy_choices;
    const privacyHtml = `<div class="snap-block" id="variant-privacy-choices"><h3>Your Privacy Choices: what changes with the browser signal and the host</h3>
<p class="snap-note">This host ${p.environment_has_request_form ? 'has' : 'does not have'} a privacy-request endpoint, so the page above shows the ${p.environment_has_request_form ? 'form' : 'email'} route; the other route is rendered here so both wordings are on record. The signal line depends on the visitor's browser; all three states are rendered.</p>
<h4>Signal line</h4>${p.signal.map((s) => `<div data-snapshot-block="privacy-signal-${esc(s.id)}" data-sha256="${esc(s.sha256)}"><p><strong>${esc(s.label)}:</strong></p><div class="snap-rendered" data-hash-target>${s.html}</div></div>`).join('')}
<h4>Browser opt-out control</h4><div class="snap-rendered" data-hash-target data-snapshot-block="privacy-browser-opt-out" data-sha256="${esc(p.browser_opt_out.sha256)}">${p.browser_opt_out.html}</div>
<h4>Request route</h4>${p.request_route.map((r) => `<div data-snapshot-block="privacy-request-${esc(r.id)}" data-sha256="${esc(r.sha256)}"><p><strong>${esc(r.label)}:</strong></p><div class="snap-rendered" data-hash-target>${r.html}</div>${hash(r.sha256)}</div>`).join('')}
<h4>Contact-records line</h4>${p.contact_records_route.map((r) => `<div class="snap-rendered" data-hash-target>${r.html}</div>`).join('')}
<h4>California authorization line</h4>${p.california_route.map((r) => `<div class="snap-rendered" data-hash-target>${r.html}</div>`).join('')}
<h4>Request types (and the email each becomes without the form)</h4>${table(['Value', 'Label', 'Needs', 'Email link'], p.request_types.map((t) => [t.value, t.label, t.needs, t.email_link]))}
<h4>Status lines</h4>${table(['Key', 'Text'], Object.entries(p.status_copy))}
</div>`;
    return `<section class="snap-section" id="conditional-variants"><h2>Conditional / State-Specific Variants</h2>
<p class="snap-note">Every rule below is the form's own predicate evaluated at bkform's build, never restated by hand; the site-side variants are the live components rendered for each state.</p>
${caHtml}${f.variants.slice(1).map(ruleHtml).join('')}${privacyHtml}
</section>`;
};

const partnersSection = (m) => {
    const mp = m.partner_lists.marketplace; const mk = m.partner_lists.marketing;
    const refs = (r) => `referenced by the FCRA authorization: ${yesNo(r.fcra)} · by the contact/marketing consent: ${yesNo(r.marketing)} (${r.consents.map((c) => `${c.key}, step ${c.step_number}`).join('; ') || 'none'})`;
    return `<section class="snap-section" id="partner-lists"><h2>Partner lists</h2>
<div class="snap-block" id="partners-marketplace-block" data-snapshot-partners="marketplace" data-version="${esc(mp.version || '')}" data-status="${esc(mp.status)}" data-hash-rule="${mp.status === 'loaded' ? 'marketplace-list' : 'text'}" data-sha256="${esc(mp.sha256)}"><h3>${esc(mp.title)}</h3>
${dl([['Canonical route', `<a href="${esc(mp.route)}">${esc(mp.route)}</a>`, true], ['Source', mp.source], ['Status at build', mp.status + (mp.error ? ` (${mp.error})` : '')], ['Version', mp.version], ['Updated', mp.updated_at], ['Last confirmed', mp.last_confirmed_at], ['Stale', mp.stale == null ? null : yesNo(mp.stale)], ['Count', mp.count == null ? null : String(mp.count)], ['Referenced by consents', refs(mp.referenced_by)], ['Hash rule', mp.hash_rule]])}
<h4>Exactly as displayed to consumers</h4>${rendered(mp.rendered)}${hash(mp.sha256)}</div>
<div class="snap-block" id="partners-marketing-block" data-snapshot-partners="marketing" data-version="${esc(mk.version)}" data-hash-rule="marketing-list" data-sha256="${esc(mk.sha256)}"><h3>${esc(mk.title)}</h3>
${dl([['Canonical route', `<a href="${esc(mk.route)}">${esc(mk.route)}</a>`, true], ['Source', mk.source], ['Version', mk.version], ['Updated', mk.updated], ['Count', String(mk.count)], ['Names', mk.count ? mk.partners.map((p) => p.name).join(', ') : 'none — the page states that no list-management company or sender brand is currently authorized'], ['Referenced by consents', refs(mk.referenced_by)], ['Rendered page', `see the Legal Center page “${mk.title}” above (sha256 ${mk.rendered_page_sha256})`], ['Hash rule', mk.hash_rule]])}
${hash(mk.sha256)}</div>
</section>`;
};

const tooltipsSection = (m) => `<section class="snap-section" id="tooltip-inventory"><h2>Tooltip inventory</h2>
<p class="snap-note">Every form tooltip, fully expanded, from the manifest.</p>
${m.form.tooltips.map((t) => `<div class="snap-block" data-snapshot-tooltip="${esc(`${t.step_id}:${t.field}`)}" data-sha256="${esc(t.sha256)}"><h3>Step ${t.step_number} — ${esc(t.field_label)}</h3><div class="snap-meta">${esc(t.accessible_label)} (${esc(t.kind)})</div><p data-hash-target>${esc(t.text)}</p>${t.link ? `<p class="snap-note">Links to: <a href="${esc(t.link.href)}">${esc(t.link.label)}</a></p>` : ''}${hash(t.sha256)}</div>`).join('')}
</section>`;

const consentsSection = (m) => `<section class="snap-section" id="consent-state-inventory"><h2>Consent-state inventory</h2>
<p class="snap-note">Derived from the manifest's consent entries (defaults from the form's initialValues); the California authorization is a separate signed document, listed for completeness.</p>
${table(['Consent', 'Step', 'Default', 'Required for matching?', 'Version', 'Shown', 'Text hash'], [
    ...m.form.consents.map((c) => [c.key, `${c.step_number} — ${c.step_title}`, c.default, c.required ? 'Yes' : 'No', c.version, c.conditional ? `only when ${c.visibility}` : 'always', c.text_hash || `${c.template_hash} (template; per-applicant hash)`]),
    [m.form.variants[0].title, 'Separate screen after step 6 (conditional)', 'unchecked', 'No', m.form.variants[0].version, 'CA + contact/marketing consent checked', m.form.variants[0].text_hash],
], 'data-snapshot-consents')}
</section>`;

const linksSection = (m) => `<section class="snap-section" id="link-inventory"><h2>Link inventory</h2>
<p class="snap-note">Every link in the rendered pages and the form's copy, with where it appears and whether the site's page registry resolves it. The site answers 200 to any path (single-page app), so a live status alone cannot show a broken legal link; registry resolution is the check, and the deploy's live check separately confirms each destination answers. Unresolved: <strong>${m.unresolved_links.length}</strong>.</p>
${table(['Source', 'Link text', 'Destination', 'Resolves'], m.links.map((l) => `<tr data-source="${esc(l.source)}" data-href="${esc(l.href)}" data-resolution="${esc(l.resolves)}"><td>${esc(l.source)}${l.section ? ` § ${esc(l.section)}` : ''}</td><td>${esc(l.text || '(no text)')}</td><td><code>${esc(l.href)}</code></td><td>${l.resolves === 'UNRESOLVED' || l.resolves === 'anchor-missing' ? `<span class="snap-flag-unresolved">${esc(l.resolves)}</span>` : esc(l.resolves)}${l.note ? ` <span class="snap-note">(${esc(l.note)})</span>` : ''}${l.reason ? ` <span class="snap-note">(${esc(l.reason)})</span>` : ''}</td></tr>`), 'data-snapshot-links')}
</section>`;

const metadataSection = (m) => `<section class="snap-section" id="compliance-metadata"><h2>Compliance metadata</h2>
<p class="snap-note">Deterministic hashes (${esc(m.hashes.normalization)}: text content, no markup, whitespace collapsed) for change detection. The consent and California hashes are the ones bkform's consent ledger records for these versions.</p>
${table(['Item', 'sha256'], Object.entries(m.hashes.items).map(([k, v]) => [`${m.hashes.labels[k]} (${k})`, v]), 'data-snapshot-hashes')}
</section>`;

const modalSection = (m) => {
    const f = m.form;
    return `<section class="snap-section" id="modal-and-screens"><h2>Modal, end-screen and guidance copy</h2>
${dl([['Search modal', `“${f.modal.search.title}” — “${f.modal.search.subtitle}”`], ['Progress lines', [f.modal.progress.idle, f.modal.progress.contacting, f.modal.progress.responded.one, f.modal.progress.responded.many].join(' · ')], ['Modal buttons', Object.values(f.modal.buttons).join(' · ')]])}
${table(['Outcome', 'Title', 'Body'], Object.entries(f.modal.outcomes).map(([k, v]) => [k, v.title, v.body]))}
${table(['Screen', 'Title', 'Body'], Object.entries(f.screens).map(([k, v]) => [k, v.title, v.body]))}
${table(['Guidance after an identity refusal', 'Text'], Object.entries(f.guidance).filter(([k]) => k !== 'shownAfter').map(([k, v]) => [k, v]))}
<p class="snap-note">${esc(f.guidance.shownAfter)}</p>
${table(['Word', 'Value'], [['Back button', f.ui.back], ['Optional marker', f.ui.optionalMarker], ['Select placeholder', f.ui.selectPlaceholder], ['Currency prefix', f.ui.currencyPrefix], ['Progress pattern', f.ui.progress.label]])}
<h4>Legal slugs the form links to</h4>${table(['Slug', 'Resolves to', 'Status'], f.legal_slugs.map((s) => [s.slug, s.href, s.resolves]))}
</section>`;
};

const toc = (items) => `<nav class="snap-toc" aria-label="Contents"><strong>Contents</strong><ol>${items.map(([id, label]) => `<li><a href="#${esc(id)}">${esc(label)}</a></li>`).join('')}</ol></nav>`;

const shell = ({ m, kind, title, subtitle, body, tocItems }) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow,noarchive">
<meta name="usc-build" content="${esc(m.build.git_sha || '')}">
<meta name="usc-snapshot" content="${esc(`${m.environment} ${m.generated_at}`)}">
<title>${esc(title)}</title>
<style id="snap-css">${CSS}</style>
</head>
<body>
<header class="snap-masthead"><h1>${esc(title)}</h1><p>${esc(subtitle)}</p></header>
<div class="snap-wrap">
${tocItems ? toc(tocItems) : ''}
<main id="main" data-snapshot="${esc(kind)}">
${body}
</main>
</div>
<footer class="snap-foot">Generated ${esc(m.generated_at)} · ${esc(m.environment)} · build ${esc(m.build.git_sha || 'unknown')} · noindex, nofollow, noarchive · read-only: no script, no form, no tracking</footer>
</body>
</html>
`;

export const renderPages = (m) => {
    const subtitle = `${m.environment} · build ${m.build.git_sha ? m.build.git_sha.slice(0, 12) : 'unknown'} · generated ${m.generated_at} · Legal Center ${m.legal.content_version} · bkform ${m.form.sdk_version}`;
    const index = shell({
        m, kind: 'index', title: 'UnitedStatesCredit Compliance Snapshot', subtitle,
        tocItems: [['build-information', 'Build information'], ['site-chrome', 'Site chrome and landing disclosures'], ['legal-center', 'Legal Center'], ['loan-form', 'Loan form'], ['conditional-variants', 'Conditional / state-specific variants'], ['partner-lists', 'Partner lists'], ['tooltip-inventory', 'Tooltip inventory'], ['consent-state-inventory', 'Consent-state inventory'], ['modal-and-screens', 'Modal and screen copy'], ['link-inventory', 'Link inventory'], ['compliance-metadata', 'Compliance metadata']],
        body: [buildInfo(m), siteChrome(m), legalCenter(m), formSection(m), variantsSection(m), partnersSection(m), tooltipsSection(m), consentsSection(m), modalSection(m), linksSection(m), metadataSection(m)].join('\n'),
    });
    const legalCenterPage = shell({
        m, kind: 'legal-center', title: 'Compliance Snapshot — Legal Center', subtitle,
        tocItems: [['build-information', 'Build information'], ['legal-center', 'Legal Center'], ['compliance-metadata', 'Hashes']],
        body: [buildInfo(m), legalCenter(m, { heading: 'Legal Center — every current page in full' }), metadataSection(m)].join('\n'),
    });
    const form = shell({
        m, kind: 'form', title: 'Compliance Snapshot — Loan Form', subtitle,
        tocItems: [['build-information', 'Build information'], ['loan-form', 'Loan form, step by step'], ['conditional-variants', 'Conditional / state-specific variants'], ['tooltip-inventory', 'Tooltip inventory'], ['consent-state-inventory', 'Consent-state inventory'], ['modal-and-screens', 'Modal and screen copy'], ['partner-lists', 'Partner lists'], ['link-inventory', 'Link inventory'], ['compliance-metadata', 'Hashes']],
        body: [buildInfo(m), formSection(m, { heading: 'Loan form, step by step' }), variantsSection(m), tooltipsSection(m), consentsSection(m), modalSection(m), partnersSection(m), linksSection(m), metadataSection(m)].join('\n'),
    });
    return { index, legalCenter: legalCenterPage, form };
};
