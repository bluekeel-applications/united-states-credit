// Bundles scripts/compliance-snapshot/site-entry.jsx — and through it the
// same src/ modules the live /loans pages render — into one Node module, so
// the prerender can import the site's JSX, `.css.js` style objects and
// registry without Create React App's webpack pipeline.
//
// Loaders: JSX everywhere (some files omit `import React`, so the automatic
// runtime), images and stylesheets as empty modules (the snapshot carries no
// images and brings its own stylesheet; post-processing turns the logo <img>s
// into their alt text). `'./X.css'` imports resolve to `X.css.js` the way
// webpack's resolve.extensions does: esbuild tries the resolveExtensions
// after the full path.
import { build } from 'esbuild';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const OUTFILE = resolve(ROOT, 'node_modules/.cache/compliance-snapshot/site-entry.bundle.mjs');

export const bundleSite = async ({ nodeEnv = process.env.SNAPSHOT_REACT_ENV || 'production' } = {}) => {
    mkdirSync(dirname(OUTFILE), { recursive: true });
    await build({
        absWorkingDir: ROOT,
        entryPoints: [resolve(ROOT, 'scripts/compliance-snapshot/site-entry.jsx')],
        bundle: true,
        platform: 'node',
        target: 'node20',
        format: 'esm',
        outfile: OUTFILE,
        sourcemap: 'inline',
        jsx: 'automatic',
        loader: {
            '.js': 'jsx',
            '.jsx': 'jsx',
            '.png': 'empty',
            '.jpg': 'empty',
            '.jpeg': 'empty',
            '.gif': 'empty',
            '.svg': 'empty',
            '.scss': 'empty',
            '.css': 'empty',
            '.woff': 'empty',
            '.woff2': 'empty',
        },
        resolveExtensions: ['.jsx', '.js', '.json'],
        define: { 'process.env.NODE_ENV': JSON.stringify(nodeEnv) },
        banner: { js: "import { createRequire as __snapshotRequire } from 'node:module'; const require = __snapshotRequire(import.meta.url);" },
        logLevel: 'warning',
    });
    return OUTFILE;
};
