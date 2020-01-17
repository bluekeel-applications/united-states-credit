import { useEffect } from 'react';

const useScript = url => {
  useEffect(() => {
    window._mNHandle = window._mNHandle || {};
    window._mNHandle.queue = window._mNHandle.queue || [];
    let sct;

    (function() {
        sct = document.createElement('script');
        let sctHl = document.getElementsByTagName('script')[0];
        sct.type = 'text/javascript';
        sct.src = url;
        sct.async = 'async';
        sct.async = true;
        sctHl.parentNode.insertBefore(sct, sctHl);
    })();    

    return () => {
      document.removeChild(sct);
    }
  }, [url]);
};

export default useScript;