const range = (start, end) => {
    return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
};

export const selectFromMultiple = (count, endpoints) => {
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