export const buildQueryObj = (flow, pid) => ({
    pid,
    vertical: flow.vertical,
    loan_type: flow.loan_type,
    debt_type: flow.debt_type,
    debt_amount: flow.debt_amount
});

// Endpoint selection tools
// const range = (start, end) => {
//     return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
// };

// const selectFromMultiple = (count, endpoints) => {
//     let usageTotal = 0;
//     let activeIndex;
    
//     let usageArray = endpoints.map((endpoint, i) => {
//         let endpointRange;
//         if (i === 0) { 
//           usageTotal += endpoint.usage;
//           endpointRange = range(1, endpoint.usage);
//         } else {
//           let newStart = usageTotal +1;
//           let end = usageTotal + endpoint.usage;
//           endpointRange = range(newStart, end);
//           usageTotal += endpoint.usage;
//         };
//         return endpointRange;
//     })

//     usageArray.forEach((array, i) => {
//       if(array.includes(count)) {
//         activeIndex = i;
//       }
//     })
    
//     return endpoints[activeIndex];
// };

// export const handleOfferChoice = (response, dispatchApp) => {
//   if(response.endpoints && response.endpoints.length > 0) {
//       let clicks = response.click_count;
//       let num = clicks.toString();        
//       let digitLength = num.length;
//       if(digitLength > 2) {
//           clicks = num.substring(digitLength - 2, digitLength);
//       }
//       let amount = response.endpoints.length === 1 ? 'single' : 'multiple';
  
//       switch(amount) {
//           case 'single':
//               const data = {
//                 link: response.endpoints[0].url,
//                 offer_page: response.endpoints[0].offer_page || 'wall',
//                 four_button: response.endpoints[0].four_button || []
//               };
//               dispatchApp({ type: 'SELECTED_OFFER', payload: data });
//               return;
//           case 'multiple':
//               const activeOffer = selectFromMultiple(clicks, response.endpoints);
//               if(!!activeOffer) {
//                 const data = {
//                   link: activeOffer.url,
//                   offer_page: activeOffer.offer_page || 'wall',
//                   four_button: activeOffer.four_button || []
//                 };
//                 dispatchApp({ type: 'SELECTED_OFFER', payload: data});
//               }
//               return;
//           default:
//               throw new Error(`Not supported action ${amount}`);
//       }
      
//   } else {
//       let data = {
//         link: 'https://unitedstatescredit.blog/',
//         offer_page: 'wall',
//         four_button: []
//       };
//       dispatchApp({ type: 'SELECTED_OFFER', payload: data});
//       return;
//   }
// };

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
    return item ? JSON.parse(item) : null
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