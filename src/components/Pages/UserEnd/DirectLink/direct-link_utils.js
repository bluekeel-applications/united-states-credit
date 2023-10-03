export const buildFullLink = (link, tracking, email, kwd) => {
    let linkout = link;
    if (!linkout || linkout === '' || linkout === 'N/A') return 'N/A'; // eslint-disable-next-line
    linkout = linkout.replace('${sid}', tracking.sid); // eslint-disable-next-line
    linkout = linkout.replace('${eid}', tracking.eid); // eslint-disable-next-line
    linkout = linkout.replace('${uid}', tracking.uid); // eslint-disable-next-line
    linkout = linkout.replace('${hsid}', tracking.hsid); // eslint-disable-next-line
    linkout = linkout.replace('${kwd}', encodeURIComponent(kwd)); // eslint-disable-next-line
    linkout = linkout.replace('${em}', email); // eslint-disable-next-line
    linkout = linkout.replace('${first}', tracking.fname); // eslint-disable-next-line
    linkout = linkout.replace('${last}', tracking.lname); // eslint-disable-next-line
    linkout = linkout.replace('${adrs}', tracking.address); // eslint-disable-next-line
    linkout = linkout.replace('${city}', tracking.city); // eslint-disable-next-line
    linkout = linkout.replace('${state}', tracking.state); // eslint-disable-next-line
    linkout = linkout.replace('${zip}', tracking.zip); // eslint-disable-next-line
    linkout = linkout.replace('${gclid}', tracking.gclid); // eslint-disable-next-line
    return linkout;
};