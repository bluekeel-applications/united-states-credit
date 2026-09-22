// bkform's compliance manifest (APIS/bluekeel-tools/bkform
// scripts/compliance-manifest.mjs): fetched from the same base the embed
// loads form.js from, checked against its own content hash, and turned into
// the form section of the snapshot. Every word in that section is the
// manifest's; this file only decides where it goes on the page and resolves
// each legal slug through the site's own registry.
import { fetchJson } from './lib/http.mjs';
import { escapeHtml, sha256 } from './lib/text.mjs';

export const manifestUrlFor = (targets) => new URL('compliance-manifest.json', targets.src).href;

export const sourceLabelFor = (targets) => (targets.dev ? 'bkform-dev' : 'bkform-prod');

// The generator hashes JSON.stringify of the manifest minus the two per-run
// fields; JSON.parse keeps key order, so the same string comes back here.
export const contentHashOf = (manifest) => {
    const { generatedAt, contentHash, ...rest } = manifest;
    return sha256(JSON.stringify(rest));
};

export const validateManifest = (m) => {
    const problems = [];
    if (m?.manifestVersion !== 1) problems.push(`manifestVersion ${m?.manifestVersion} (expected 1)`);
    if (!m?.sdk?.version) problems.push('sdk.version missing');
    for (const key of ['steps', 'fields', 'consents']) if (!Array.isArray(m?.[key]) || m[key].length === 0) problems.push(`${key} missing or empty`);
    if (!m?.california?.paragraphs?.length) problems.push('california.paragraphs missing');
    if (!m?.rules || typeof m.rules !== 'object') problems.push('rules missing');
    if (!m?.evidence?.consentVersions) problems.push('evidence.consentVersions missing');
    if (!Array.isArray(m?.legal?.slugs)) problems.push('legal.slugs missing');
    if (Array.isArray(m?.consents) && m.consents.some((c) => c.defaultChecked !== false)) problems.push('a consent does not default to unchecked');
    if (Array.isArray(m?.consents) && m.consents.some((c) => !c.step || !Array.isArray(m.steps) || !m.steps.some((s) => s.id === c.step))) problems.push('a consent names a step that does not exist');
    const expected = contentHashOf(m || {});
    if (m?.contentHash !== expected) problems.push(`contentHash ${String(m?.contentHash).slice(0, 12)} does not recompute (${expected.slice(0, 12)})`);
    return problems;
};

export const loadManifest = async ({ url }) => {
    const { json, text } = await fetchJson(url, { retries: 3, timeoutMs: 15000 });
    const problems = validateManifest(json);
    if (problems.length) throw new Error(`compliance manifest at ${url} is not usable: ${problems.join('; ')}`);
    return { manifest: json, rawSha256: sha256(text) };
};

// A copy block ({ markup, parts, text, links }) as HTML, links resolved by the
// site's registry (resolveSlug: slug -> { href, resolves }).
export const copyHtml = (block, resolveSlug) => {
    if (!block) return '';
    return block.parts.map((part) => {
        if (part.type === 'link') {
            const { href, resolves } = resolveSlug(part.slug);
            const flag = resolves === 'UNRESOLVED' ? ' class="snap-flag-unresolved" data-unresolved="1"' : '';
            return `<a href="${escapeHtml(href)}"${flag}>${escapeHtml(part.label)}</a>`;
        }
        if (part.type === 'strong') return `<strong>${escapeHtml(part.text)}</strong>`;
        return escapeHtml(part.text);
    }).join('');
};

// The link rows a copy block contributes to the inventory.
export const copyLinks = (block, source, resolveSlug) => (block?.links || []).map((l) => {
    const { href, resolves, ...rest } = resolveSlug(l.slug);
    return { source, section: null, text: l.label, href, target: '_blank', resolves, ...rest };
});

// The form section's model: what render-html.mjs lays out and the JSON
// carries. Text and hashes only; the manifest's own hashes are kept and
// re-verified.
export const buildFormModel = (manifest, { resolveSlug: resolveSlugRaw, environmentMode, sourceLabel, rawSha256 }) => {
    // Every slug resolved once; the table goes on the model so the renderer
    // turns the manifest's [label](slug) parts into the same hrefs.
    const slugHrefs = {};
    const resolveSlug = (slug) => (slugHrefs[slug] ||= resolveSlugRaw(slug));
    for (const slug of manifest.legal.slugs) resolveSlug(slug);
    const fieldsByName = new Map(manifest.fields.map((f) => [f.name, f]));
    const consentsByKey = new Map(manifest.consents.map((c) => [c.key, c]));
    const modes = ['on', 'off'];
    const otherMode = environmentMode === 'on' ? 'off' : 'on';

    const links = [];
    const addLinks = (block, source) => { links.push(...copyLinks(block, source, resolveSlug)); };

    const steps = manifest.steps.map((s) => {
        const source = `form:step-${s.index + 1}`;
        addLinks(s.note, source); addLinks(s.footer, source);
        const fields = s.fields.map((name) => fieldsByName.get(name)).filter(Boolean).map((f) => {
            addLinks(f.label, source);
            if (f.help && !f.help.dynamic) addLinks(f.help, source);
            if (f.help?.dynamic) f.help.variants.forEach((v) => addLinks(v, source));
            if (f.explain) {
                addLinks(f.explain.text, source);
                if (f.explain.link) {
                    const { href, resolves } = resolveSlug(f.explain.link.slug);
                    links.push({ source, section: null, text: f.explain.link.label, href, target: '_blank', resolves });
                }
            }
            return f;
        });
        const consents = s.consents.map((key) => consentsByKey.get(key)).filter(Boolean);
        for (const mode of modes) addLinks(s.perMode[mode].assent, source);
        return { ...s, fieldEntries: fields, consentEntries: consents, source };
    });

    const consentInventory = manifest.consents.map((c) => ({
        key: c.key,
        step: c.step,
        step_index: c.stepIndex,
        step_number: c.stepIndex + 1,
        step_title: manifest.steps[c.stepIndex]?.title || null,
        default: c.defaultChecked ? 'checked' : 'unchecked',
        required: c.required,
        required_for_matching: c.required,
        version: c.version,
        text: c.label.text,
        links: (c.label.links || []).map((l) => ({ label: l.label, slug: l.slug, ...resolveSlug(l.slug) })),
        text_hash: c.textHash,
        text_hash_rule: c.textHashRule,
        text_hash_verified: c.textHash ? sha256(c.label.text) === c.textHash : null,
        template_hash: c.templateHash || null,
        visibility: c.visibility ? c.visibility.predicate : null,
        conditional: !!c.visibility,
        when_unchecked: c.whenUnchecked || null,
    }));

    const tooltipInventory = manifest.fields.filter((f) => f.explain).map((f) => ({
        step_index: f.stepIndex,
        step_number: f.stepIndex + 1,
        step_id: f.step,
        step_title: manifest.steps[f.stepIndex]?.title || null,
        field: f.name,
        field_label: f.label.text,
        kind: f.explain.kind,
        accessible_label: f.explain.accessibleLabel,
        text: f.explain.rendered,
        link: f.explain.link ? { label: f.explain.link.label, slug: f.explain.link.slug, ...resolveSlug(f.explain.link.slug) } : null,
        sha256: sha256(f.explain.rendered),
    }));

    const ca = manifest.california;
    const caLinks = [];
    ca.paragraphs.forEach((p) => caLinks.push(...copyLinks(p, 'form:california-authorization', resolveSlug)));
    links.push(...caLinks);
    const caTextVerified = sha256(ca.documentText) === ca.textHash;

    const variants = [
        {
            id: 'california-financial-privacy-authorization',
            kind: 'separate-authorization',
            title: ca.title,
            version: ca.version,
            trigger: ca.trigger,
            condition: `On step "${manifest.steps[ca.trigger.stepIndex]?.title}" (step ${ca.trigger.stepIndex + 1}), applicant state = CA and the optional contact/marketing consent is checked, and the document has not been answered before (predicate ${ca.trigger.predicate}, ${ca.trigger.source})`,
            result: 'The California Financial Privacy Authorization is shown in place of leaving the step, once per application, in both first-offer-check modes.',
            decline: ca.answer.then,
            declined_record: ca.answer.declined,
            signed_record: ca.answer.signed,
            paragraphs: ca.paragraphs,
            labels: ca.labels,
            signature: ca.signature,
            buttons: ca.buttons,
            date_format: ca.dateFormat,
            text: ca.documentText,
            text_hash: ca.textHash,
            text_hash_rule: ca.textHashRule,
            text_hash_verified: caTextVerified,
            printable_sample_html: ca.printable.sampleHtml,
        },
        ruleVariant('marital-status', manifest.rules.maritalStatus, manifest, fieldsByName),
        ruleVariant('different-mobile-number-consent', manifest.rules.mobileConsent, manifest, fieldsByName, consentsByKey),
        ruleVariant('employer-address-and-zip', manifest.rules.employer, manifest, fieldsByName),
        ruleVariant('bank-name', manifest.rules.bankName, manifest, fieldsByName),
    ];

    return {
        sdk_version: manifest.sdk.version,
        sdk_name: manifest.sdk.name,
        manifest_version: manifest.manifestVersion,
        manifest: { source: sourceLabel, sha256: rawSha256, content_hash: manifest.contentHash, generated_at: manifest.generatedAt },
        evidence: manifest.evidence,
        consent_versions: manifest.evidence.consentVersions,
        evidence_version: manifest.evidence.version,
        mode: { environment: environmentMode, other: otherMode, attribute: manifest.modes.attribute, default: manifest.modes.default, meaning: manifest.modes.meaning },
        phases: manifest.phases,
        steps,
        fields: manifest.fields,
        submissions: manifest.submissions,
        assent: manifest.assent,
        consents: consentInventory,
        tooltips: tooltipInventory,
        variants,
        modal: manifest.modal,
        screens: manifest.screens,
        guidance: manifest.guidance,
        ui: manifest.ui,
        legal_slugs: manifest.legal.slugs.map((slug) => ({ slug, ...resolveSlug(slug) })),
        slug_hrefs: slugHrefs,
        legal_url_rule: manifest.legal.url,
        provenance: manifest.provenance,
        links,
    };
};

const ruleVariant = (id, rule, manifest, fieldsByName, consentsByKey) => {
    if (!rule) return { id, kind: 'rule', missing: true };
    const fieldNames = rule.fields || (rule.field ? [rule.field] : []);
    const fields = fieldNames.map((name) => fieldsByName.get(name)).filter(Boolean);
    const consent = consentsByKey?.get(rule.field) || null;
    return {
        id,
        kind: 'conditional-field',
        predicate: rule.predicate,
        source: rule.source,
        fields: fields.map((f) => ({ name: f.name, label: f.label.text, step_number: f.stepIndex + 1, step_title: manifest.steps[f.stepIndex]?.title, required: f.required, placeholder: f.placeholder, options: f.options })),
        evaluated_over: rule.evaluatedOver,
        visible_in: rule.visibleIn || rule.visibleFor || null,
        hidden_in: rule.hiddenIn || rule.hiddenFor || null,
        truth_table: rule.truthTable || null,
        constant: rule.constant || null,
        notes: [rule.hiddenMeans, rule.uncheckedMeans, rule.hiddenWithNoState === true ? 'Hidden until a state is entered.' : null, rule.noLookupState === true ? 'Shown as an ordinary input wherever no lookup exists.' : null].filter(Boolean),
        consent: consent ? { key: consent.key, version: consent.version, default: consent.defaultChecked ? 'checked' : 'unchecked', required: consent.required, text: consent.label.text, placeholder: consent.label.placeholder || null, template_hash: consent.templateHash, text_hash_rule: consent.textHashRule } : null,
    };
};
