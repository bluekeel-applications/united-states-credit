const flattenString = (string) => {
    // Removes leading and trailing wite spaces...
    let stringCleaned = string.replace(/^\s+|\s+$/g, '');
    // Replaces spaces between words wit an underscore...
    stringCleaned = stringCleaned.replace(/\s/g, '_');
    // Returns te result in lowercase.
    return stringCleaned.toLowerCase();
};

const dressLink = (link, sid, eid, hsid, query) => {
    let linkout = link; // eslint-disable-next-line
    if (linkout === 'N/A') return linkout; // eslint-disable-next-line 
    linkout = linkout.replace('${sid}', sid); // eslint-disable-next-line
    linkout = linkout.replace('${eid}', eid); // eslint-disable-next-line
    let keyword = flattenString(query); // eslint-disable-next-line
    keyword = encodeURIComponent(keyword); // eslint-disable-next-line
    linkout = linkout.replace('${kwd}', keyword); // eslint-disable-next-line
    linkout = linkout.replace('${hsid}', hsid);
    return linkout;
};

const pickButtonColor = (idx) => {
    switch(idx) {
        case 0:
            return 'blue';
        case 1:
            return 'light_blue';
        case 2:
            return 'red';
        case 3:
            return 'dark_blue';
        case 4:
            return 'blue';
        case 5:
            return 'red';
        case 6:
            return 'light_blue';
        case 7:
            return 'dark_blue';
        case 8:
            return 'red';
        case 9:
            return 'blue';
        case 10:
            return 'light_blue';
        default:
            return 'blue'
    }
}

export {
    dressLink,
    pickButtonColor
}