// import useApp from '../hooks/useApp';

// Endpoint selection tools
const range = (start, end) => {
    return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
};

const selectFromMultiple = (count, endpoints) => {
    let usageTotal = 0;
    let activeIndex;
    
    let usageArray = endpoints.map((endpoint, i) => {
        let endpointRange;
        if (i === 0) { 
          usageTotal += endpoint.usage;
          endpointRange = range(1, endpoint.usage);
        } else {
          let newStart = usageTotal +1;
          let end = usageTotal + endpoint.usage;
          endpointRange = range(newStart, end);
          usageTotal += endpoint.usage;
        };
        return endpointRange;
    })

    usageArray.forEach((array, i) => {
      if(array.includes(count)) {
        activeIndex = i;
      }
    })
    
    return endpoints[activeIndex];
};

export const handleOfferChoice = (response, dispatchApp) => {
  if(response.endpoints && response.endpoints.length > 0) {
      let clicks = response.click_count;
      let num = clicks.toString();        
      let digitLength = num.length;
      if(digitLength > 2) {
          clicks = num.substring(digitLength - 2, digitLength);
      }
      let amount = response.endpoints.length === 1 ? 'single' : 'multiple';

      if(response)
      switch(amount) {
          case 'single':
              dispatchApp({ type: 'SELECTED_OFFER', payload: response.endpoints[0].url});
              return;
          case 'multiple':
              const activeOffer = selectFromMultiple(clicks, response.endpoints);
              dispatchApp({ type: 'SELECTED_OFFER', payload: activeOffer.url});
              return;
          default:
              throw new Error(`Not supported action ${amount}`);
      }
      
  } else {
      dispatchApp({ type: 'SELECTED_OFFER', payload: 'https://unitedstatescredit.blog/'});
      return;
  }
};

// Cookie Tools
export const setCookie = (cname, cvalue, exdays) => {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = 'expires='+ d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};

export const getCookie = (cname) => {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
};

export const checkCookie = (cname) => {
    let cookie = getCookie(cname);
    if (cookie && cookie !== '') {
        return true
    } 
    return false;
};

export const setCookies = (tracking) => {
    setCookie('oid', tracking.oid, 3);
    setCookie('pid', tracking.pid, 3);
    setCookie('sid', tracking.sid, 3);
    setCookie('uid', tracking.uid, 3);
    setCookie('eid', tracking.eid, 3);
    setCookie('hsid', tracking.hsid, 3);
};