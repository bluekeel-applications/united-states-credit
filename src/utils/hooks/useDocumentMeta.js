import { useEffect } from 'react';

// Sets document.title + <meta name="description"> for self-contained page
// sets; restores the previous values on unmount so the rest of the app keeps
// the public/index.html defaults.
const useDocumentMeta = (title, description) => {
    useEffect(() => {
        const prevTitle = document.title;
        let meta = document.querySelector('meta[name="description"]');
        const created = !meta;
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', 'description');
            document.head.appendChild(meta);
        }
        const prevDescription = meta.getAttribute('content');
        if (title) document.title = title;
        if (description) meta.setAttribute('content', description);
        return () => {
            document.title = prevTitle;
            if (created) meta.remove();
            else meta.setAttribute('content', prevDescription ?? '');
        };
    }, [title, description]);
};

export default useDocumentMeta;
