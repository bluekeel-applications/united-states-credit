import axios from 'axios';

export const convertRegion = (input, to) => {
    const states = [
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['American Samoa', 'AS'],
        ['Arizona', 'AZ'],
        ['Arkansas', 'AR'],
        ['Armed Forces Americas', 'AA'],
        ['Armed Forces Europe', 'AE'],
        ['Armed Forces Pacific', 'AP'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['District Of Columbia', 'DC'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Guam', 'GU'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Marshall Islands', 'MH'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Northern Mariana Islands', 'NP'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Puerto Rico', 'PR'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['US Virgin Islands', 'VI'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];
    const provinces = [
        ['Alberta', 'AB'],
        ['British Columbia', 'BC'],
        ['Manitoba', 'MB'],
        ['New Brunswick', 'NB'],
        ['Newfoundland', 'NF'],
        ['Northwest Territory', 'NT'],
        ['Nova Scotia', 'NS'],
        ['Nunavut', 'NU'],
        ['Ontario', 'ON'],
        ['Prince Edward Island', 'PE'],
        ['Quebec', 'QC'],
        ['Saskatchewan', 'SK'],
        ['Yukon', 'YT'],
    ];

    const regions = states.concat(provinces);

    let i; // Reusable loop variable
    if (to === 'TO_ABBREVIATED') {
        input = input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        for (i = 0; i < regions.length; i++) {
            if (regions[i][0] === input) {
                return (regions[i][1]);
            }
        }
    } else if (to === 'TO_NAME') {
        input = input.toUpperCase();
        for (i = 0; i < regions.length; i++) {
            if (regions[i][1] === input) {
                return (regions[i][0]);
            }
        }
    }
};

export const flattenLongString = (string) => {
    const stringCleaned = string.replace(/\s/g, '_');
    return stringCleaned.toLowerCase();
};

export const capitalizeValue = (value) => {
    let text = value;
    text = text.toLowerCase()
        .split('_')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
    return text;
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
    if(!!tracking.email) {
        setCookie('email', tracking.email, 3);
    };
};
export const setPchCookies = (user) => {
    setCookie('email', user.email, 3);
    setCookie('fname', user.fname, 3);
    setCookie('lname', user.lname, 3);
    setCookie('address', user.address, 3);
    setCookie('city', user.city, 3);
    setCookie('state', user.state, 3);
    setCookie('zip', user.zip, 3);
};
export const isPch = () => {
    const locationParts = window.location.hostname.split('.');
    const subDomain = locationParts.shift();
    if (subDomain === 'pch') {
        return true;
    };
    return false;
};

// Click ID
const buildHitStreetLink = (payload) => {
    const hitStreetLink = 'https://bkoffers.com/hitstreet/hit_count_hsid2.cfm?' +
        'offer_id=' + payload.OID + '&' +
        'program_id=' + payload.PID + '&' +
        'hsid=' + payload.HSID + '&' +
        'eid=' + payload.EID + '&' +
        'oid=' + payload.OID + '&' +
        'pid=' + payload.PID + '&' +
        'sid=' + payload.SID + '&' +
        'uid=' + payload.UID;
    return hitStreetLink;
};

export const sendHitStreetHSID = async(payload) => {
    let fetchLink = buildHitStreetLink(payload);
    if(payload.HSID && payload.HSID !== 0) {
        console.log('ClickID found, skipping lookup:', payload.HSID);
        setCookie('hsid', payload.HSID, 3);
        return payload.HSID;
    };
    try{
        const res = await axios({
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: fetchLink
        });
        if (res.status !== 200) {
            const backup = Date.now();
            console.log('Error occured on HitStreet; Fallback ClickID created:', backup);
            setCookie('hsid', backup, 3);
            return backup;
        };
        if(typeof res.data === 'number') {
            console.log('New ClickID:', res.data);
            setCookie('hsid', res.data, 3);
            return res.data;
        };
        console.log('ClickID lookup failed catches:', payload.HSID);
        setCookie('hsid', payload.HSID, 3);
        return payload.HSID;
    } catch(err) {
        return {status: 'failed', message: err};
    }
};

export const buildKeywordLink = (link, tracking, keyword) => {
    let linkout = link; // eslint-disable-next-line
    if (!linkout || linkout === '' || linkout === 'N/A') return 'N/A'; // eslint-disable-next-line
    linkout = linkout.replace('${sid}', tracking.sid); // eslint-disable-next-line
    linkout = linkout.replace('${eid}', tracking.eid); // eslint-disable-next-line
    linkout = linkout.replace('${uid}', tracking.uid); // eslint-disable-next-line
    linkout = linkout.replace('${kwd}', encodeURIComponent(keyword)); // eslint-disable-next-line
    linkout = linkout.replace('${hsid}', tracking.hsid); // eslint-disable-next-line
    linkout = linkout.replace('${em}', tracking.email); // eslint-disable-next-line
    linkout = linkout.replace('${first}', tracking.fname); // eslint-disable-next-line
    linkout = linkout.replace('${last}', tracking.lname); // eslint-disable-next-line
    linkout = linkout.replace('${adrs}', tracking.address); // eslint-disable-next-line
    linkout = linkout.replace('${city}', tracking.city); // eslint-disable-next-line
    linkout = linkout.replace('${state}', tracking.state); // eslint-disable-next-line
    linkout = linkout.replace('${zip}', tracking.zip); // eslint-disable-next-line
    linkout = linkout.replace('${gclid}', tracking.gclid); // eslint-disable-next-line
    return linkout;
};

export const pickUscButtonColor = (idx) => {
    switch(idx) {
        case 0:
            return 'blue';
        case 1:
            return 'lightBlue';
        case 2:
            return 'red';
        case 3:
            return 'darkBlue';
        case 4:
            return 'blue';
        case 5:
            return 'red';
        case 6:
            return 'lightBlue';
        case 7:
            return 'darkBlue';
        case 8:
            return 'red';
        case 9:
            return 'blue';
        case 10:
            return 'lightBlue';
        default:
            return 'blue'
    }
};
export const pickPcmButtonColor = (idx) => {
    switch(idx) {
        case 0:
            return 'blueish';
        case 1:
            return 'green';
        case 2:
            return 'purple';
        case 3:
            return 'orange';
        case 4:
            return 'lime';
        case 5:
            return 'yellow';
        case 6:
            return 'blueish';
        case 7:
            return 'orange';
        case 8:
            return 'purple';
        case 9:
            return 'yellow';
        case 10:
            return 'green';
        default:
            return 'lime'
    }
};
export const pickWikiButtonColor = (idx) => {
    switch(idx) {
        case 0:
            return 'b2';
        case 1:
            return 'b1';
        case 2:
            return 'b3';
        case 3:
            return 'b4';
        case 4:
            return 'b2';
        case 5:
            return 'b1';
        case 6:
            return 'b3';
        case 7:
            return 'b4';
        case 8:
            return 'b2';
        case 9:
            return 'b1';
        default:
            return 'b2'
    }
};