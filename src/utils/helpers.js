export const buildQueryObj = (flow, pid) => ({
    pid,
    vertical: flow.vertical,
    loan_type: flow.loan_type,
    debt_type: flow.debt_type,
    debt_amount: flow.debt_amount
});

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
// Local Storage Tools
export const getCachedObject = (key) => {
    const item = localStorage.getItem(key);
    return JSON.parse(item)
};

export const isObjectCached = (key) => {
    return !!localStorage.getItem(key);
};

export const setCachedObject = (key, obj) => {
    localStorage.setItem(key, JSON.stringify(obj));
};

export const flattenString = (string) => {
    let flatString = string.replace(' ', '_');
    return flatString.toLowerCase();
};

export const flattenLongString = (string) => {
    const stringCleaned = string.replace(/\s/g, '_');
    return stringCleaned.toLowerCase();
};

// Build the full like for an offer
export const buildFullLink = (link, sid, eid, hsid, pch) => {
    let linkout = link // eslint-disable-next-line
    linkout = linkout.replace('${sid}', sid); // eslint-disable-next-line
    linkout = linkout.replace('${eid}', eid); // eslint-disable-next-line
    linkout = linkout.replace('${hsid}', hsid); // eslint-disable-next-line
    linkout = linkout.replace('${em}', pch.email); // eslint-disable-next-line
    linkout = linkout.replace('${first}', pch.firstname); // eslint-disable-next-line
    linkout = linkout.replace('${last}', pch.lastname); // eslint-disable-next-line
    linkout = linkout.replace('${adrs}', pch.address); // eslint-disable-next-line
    linkout = linkout.replace('${city}', pch.city); // eslint-disable-next-line
    linkout = linkout.replace('${state}', pch.state); // eslint-disable-next-line
    linkout = linkout.replace('${zip}', pch.zipcode); // eslint-disable-next-line
    return linkout;
};