import { useEffect, useState, useRef } from "react";

const useResizeObserver = (resizeSubject) => {
    const [contentRect, setContentRect] = useState({});
    const resizeObserver = useRef(null);

    useEffect(() => {
        if ('ResizeObserver' in window) {
            observe(ResizeObserver);
        } else {
            import('resize-observer-polyfill').then(observe);
        }

        function observe(RO) {
            resizeObserver.current = new RO(entries => {
                const { width, height, top, right, bottom, left } = entries[0].contentRect;
                setContentRect({ width, height, top, right, bottom, left });
            });

            if (resizeSubject.current) {
                resizeObserver.current.observe(resizeSubject.current);
            }
        }

        return disconnect;
    }, [resizeSubject]);

    function disconnect() {
        if (resizeObserver.current) {
            resizeObserver.current.disconnect();
        }
    }

    return contentRect;
};

export default useResizeObserver;