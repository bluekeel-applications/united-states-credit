const flattenString = (string) => {
    // Removes leading and trailing wite spaces...
    let stringCleaned = string.replace(/^\s+|\s+$/g, '');
    // Replaces spaces between words wit an underscore...
    stringCleaned = stringCleaned.replace(/\s/g, '_');
    // Returns te result in lowercase.
    return stringCleaned.toLowerCase();
};

const dressLink = (link, tracking, query) => {
    let linkout = link; // eslint-disable-next-line
    if (linkout === 'N/A') return linkout; // eslint-disable-next-line 
    linkout = linkout.replace('${sid}', tracking.sid); // eslint-disable-next-line
    linkout = linkout.replace('${eid}', tracking.eid); // eslint-disable-next-line
    let keyword = encodeURIComponent(query); // eslint-disable-next-line
    linkout = linkout.replace('${kwd}', keyword); // eslint-disable-next-line
    linkout = linkout.replace('${hsid}', tracking.hsid);
    return linkout;
};

const handleQuickLink = (e, link, processClick, setInterest, trackingState) => {
    e.preventDefault();
    setInterest(link.text);
    const linkout = dressLink(link.url, trackingState, link.text);
    const jump = dressLink(link.jump, trackingState, link.text);
    processClick(linkout, jump, link.text);
};

const handleUserSubmit = (e, link, jump, processClick, query, trackingState) => {
    e.preventDefault();
    const interest = flattenString(query);
    let linkout = dressLink(link, trackingState, interest);
    const jumpBehind = dressLink(jump, trackingState, interest);
    processClick(linkout, jumpBehind, interest);
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
    handleQuickLink,
    handleUserSubmit,
    pickButtonColor
}