// fetch with a timeout and a few retries, for the build-time reads (the bkform
// manifest, the partner list, production's index.html) and the live checks.
// Node 20's global fetch; nothing else.
export const fetchWithRetry = async (url, { timeoutMs = 10000, retries = 3, delayMs = 1500, headers = {}, redirect = 'follow' } = {}) => {
    let lastError = null;
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, { headers, redirect, signal: AbortSignal.timeout(timeoutMs) });
            if (response.status >= 500 && attempt < retries) {
                lastError = new Error(`HTTP ${response.status}`);
            } else {
                return response;
            }
        } catch (error) {
            lastError = error;
        }
        await new Promise((r) => setTimeout(r, delayMs * attempt));
    }
    throw lastError || new Error(`could not fetch ${url}`);
};

export const fetchJson = async (url, options) => {
    const response = await fetchWithRetry(url, { ...options, headers: { Accept: 'application/json', ...(options?.headers || {}) } });
    if (!response.ok) throw new Error(`HTTP ${response.status} from ${url}`);
    const text = await response.text();
    return { json: JSON.parse(text), text, response };
};

export const fetchText = async (url, options) => {
    const response = await fetchWithRetry(url, options);
    return { text: await response.text(), response };
};
