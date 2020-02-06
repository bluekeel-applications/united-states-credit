import { useEffect } from 'react';
// import { AppContext } from '../context';

const useScript = url => {
  // const { trackingState, appState } = useContext(AppContext);

  useEffect(() => {
    let sct;
    window._mNHandle = window._mNHandle || {};
    window._mNHandle.queue = window._mNHandle.queue || [];
    // si_versionId = '3111299';
    // si_chnm = trackingState.sid + '-' + trackingState.eid; // Used to specify the channel name
    // si_chnm2 = ' '; // Used to specify the channel 2 name
    // si_chnm3 = ' '; // Used to specify the channel 3 name
    // si_misc = {};
    // si_misc.query = appState.flowState.vertical;

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