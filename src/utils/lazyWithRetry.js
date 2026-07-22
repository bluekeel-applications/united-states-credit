import { lazy } from 'react';

// Wraps React.lazy so a failed dynamic import() — the classic ChunkLoadError
// that happens when a deploy swaps hashed chunk filenames out from under a
// session that loaded the old index.html — triggers a single hard reload to
// fetch the fresh index.html + current chunks, instead of leaving the route
// blank. Guarded per-chunk in sessionStorage so we never reload-loop if the
// chunk is genuinely gone; after one failed retry it rethrows so the
// ErrorBoundary can show a fallback. `name` keys the retry flag.
const lazyWithRetry = (importer, name) =>
    lazy(async () => {
        const storageKey = `chunk-retry-${name}`;
        try {
            const component = await importer();
            window.sessionStorage.removeItem(storageKey); // recovered — reset for next time
            return component;
        } catch (err) {
            if (!window.sessionStorage.getItem(storageKey)) {
                window.sessionStorage.setItem(storageKey, '1');
                window.location.reload();
                // Keep Suspense pending (no flash) until the reload takes over.
                return new Promise(() => {});
            }
            // Already retried once and still failing → let the ErrorBoundary handle it.
            throw err;
        }
    });

export default lazyWithRetry;
