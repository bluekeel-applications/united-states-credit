import  { useRef, useState, useLayoutEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const useContentHeight = ({ on = true /* no value means on */ } = {}) => {
    const ref = useRef();
    const [height, set] = useState(0);
    const heightRef = useRef(height);
    const [ro] = useState(() =>
        new ResizeObserver((entries, observer) => {
            for (const entry of entries) {
                if (ref.current && heightRef.current !== entry.contentRect.height) {
                    heightRef.current = entry.contentRect.height;
                    set(entry.contentRect.height);
                }
            }
        })
    );
    useLayoutEffect(() => {
        if (on && ref.current) {
            set(ref.current.offsetHeight);
            ro.observe(ref.current, {});
        }

        return () => ro.disconnect();
        // eslint-disable-next-line
    }, [on, ref.current]);

    return [ref, height];
};

export default useContentHeight;