_buildHitStreetLink: function (tracking) {
    let oid = tracking.oid ? tracking.oid : this.defaultTracking.oid;
    let pid = tracking.pid ? tracking.pid : this.defaultTracking.pid;
    let hsid = tracking.hsid ? tracking.hsid : this.defaultTracking.hsid;
    let eid = tracking.eid ? tracking.eid : this.defaultTracking.eid;
    let sid = tracking.sid ? tracking.sid : this.defaultTracking.sid;
    let uid = tracking.uid ? tracking.uid : this.defaultTracking.uid;

    let hitStreetLink = 'http://bkoffers.com/hitstreet/hit_count_hsid.cfm?' +
        'offer_id=' + oid + '&' +
        'program_id=' + pid + '&' +
        'hsid=' + hsid + '&' +
        'eid=' + eid + '&' +
        'oid=' + oid + '&' +
        'pid=' + pid + '&' +
        'sid=' + sid + '&' +
        'uid=' + uid;
    return hitStreetLink;
},

_fetchHSID_FromHitStreet: function (tracking,forceWait) {//pass forceWait = true in order to force waiting for an HSID before returning, rather than default to '0' after a maximum wait
    let hitStreetLink = this._buildHitStreetLink(tracking);
    return new Promise((resolve, reject) => {
        let maxWait = 1000;
        let returned = false;
        setTimeout(function () {
            if(!returned && !forceWait){
                console.log('HSID took longer than',maxWait,'ms to finish. Defaulting to \'0\'');
                return resolve('0');
            }
        },maxWait);
        console.log('fetch hsid');
        http.get(hitStreetLink, (resp) => {
            let hsid = '';
            resp.on("data", (chunk) => {
                hsid += chunk;
            });
            resp.on("end", () => {
                returned = true;
                resolve(hsid.trim());
            });
            resp.on("error", (error) => {
                reject(error); // needs to send email after as well
            });
        });
    });