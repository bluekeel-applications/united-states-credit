import { useEffect, useRef } from 'react';
// import { AppContext } from '../context';

const useScript = url => {
  const componentIsMounted = useRef(true);
  // const { trackingState, appState } = useContext(AppContext);

  useEffect(() => {
    if(componentIsMounted.current) {
      let sct;
      window._mNHandle = window._mNHandle || {};
      window._mNHandle.queue = window._mNHandle.queue || [];
      (function() {
          sct = document.createElement('script');
          let sctHl = document.getElementsByTagName('script')[0];
          sct.type = 'text/javascript';
          sct.src = url;
          sct.async = 'async';
          sct.async = true;
          sctHl.parentNode.insertBefore(sct, sctHl);
      })();
    }

    return () => {componentIsMounted.current = false};
    // eslint-disable-next-line
  }, [url]);
};

export default useScript;