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

    _mNL2 = {
        "cid": "8CU7INKUC",
        "cpcd": "hnPpl661q9qHkUmtgR1Uzw==",
        "crid": "857097420",
        "pid": "8PO27GX71",
        "prid": "8PR634MLX",
        "size": "600x250",
        "https": 1,
        "cpnet": "yVb1sHm-0KKoFeunLBVJxWbJw8auo2U7xNia5s_xkPE=",
        "cme": "KkKUG6JLaWptcd7ygVoZgW_gowIx32vSl5tlbUoHIlTQml3_Dh-qiqs_OdzHx0U0K_KLe3O8CQcdzVPGT9LH0UYR57_yeQPf8DcZv9lp0uYQDDA6aXnjVbkTmQtMMwfl||NDHRnZ9Gz3KXlI-i9OnZqQ==|uwVTQWlYWoWUA-qRagL5TxN9KAHBolCS|YYTj4ExD3rNb_h2BcX6K4Q==|s65HNM7gTgy4iFXWeSkCag==|N7fu2vKt8_s=|YdjFvixrVaFB8egAO0DYQtac8Sv9LXceZFim51JBrV3UcS_LVWgiGhxJVfT8sPnya56NndQdUQh25GRxtfwQJuHzKnf3JmW76ii_5eDNpwCWAWEk0bXRJA==|sRBSg3CPSiQ=|",
        "refterm": "Debt+Relief",
        "cc": "US",
        "bf": 0,
        "ib": "0",
        "staticIframe": 1,
        "chnm": "9179-yourEID",
        "ugd": "4",
        "requrl": "https:\/\/unitedstatescredit.com\/?&query=Debt%20Relief#mnetcrid=857097420##mnetset9#",
        "nrUrl": "https:\/\/csearchclub-a.akamaihd.net\/nrrV66452.js",
        "lw": "1",
        "lhst": "https:\/\/lgsearchclub-a.akamaihd.net",
        "vsid": "2221953258514640000V10",
        "vi": "1579193423171500191",
        "_ip2allsc": "CO",
        "_mNVisitIdData": "50.236.225.250",
        "viComp": "1579193423674051750",
        "l2wsip": "2886781335",
        "htFlUrl": "https:\/\/lgsearchclub-a.akamaihd.net\/flping.php?reason=34&action=15&cme=fh-pEqr5VsbnMxZSnIyICBvnejO0ufw1nqATXpQSmJsOSPCNOzgYEjubyeM4uq3utZBLXkCy939lWbKxT2peMJMi7No6IReOp4EtuEx2wIdxC76G9wa866QekaFi0oVu4DmWwI_xrqJCqnSACkbkdx7LHAxQq9gdkrW-7epAyy_Gb5Qvtkb_yUi0IrA4mtfFOBPxoKELZRok-PSxgPXq6oCMJsAkTsc_5aGB1iXEgMO6w9VZ89bSIXNvrhJ629BL4aeTKnOAw2l5omEcHh-VPBXuPOre2DQJq02ajZlc2WiSY348kELxT8L90Ij-aYoQM08EuLGjefRdMsPUN3WwHtoYvRCQ4scOqawxrgayioFbdOwjwYLE90uU2OgJ58-huzNdmErrWw_coZHDBGla5RwK6cWKm6WhRDdMT1lq8WJQvzshpRJy0t4JWoRLQL72hRV43uKQP_YYQyPx_koq2L96T_QxsrekvG_9QyExJQlePliAcnRfHPDHq_EeCB5Y8m3YUTfpmuXzBz1-NwuSPmHWcORwHcgqJdo5oQ71MbnopsSKDBS2qjxMJemwak2TsuwZoObeQ6ezB5N2Nz3TMUccg9j925iyNz_T5BNpXsJr3CKZ7268Pg%3D%3D%7C%7C&gdpr=0",
        "logUrl": "https:\/\/lgsearchclub-a.akamaihd.net\/bqi.php?",
        "_L2host": "csearchclub-a.akamaihd.net",
        "_natTpid": 803538445,
        "_priv": {
            "gdpr": 0
        },
        "_privCnf": {
            "kbbat": true,
            "csyncl2": true
        },
        "custHt": "100%",
        "nb": "1",
        "vImp": "1",
        "setL3100": true,
        "ifrURL": "https:\/\/csearchclub-a.akamaihd.net\/mediamain.html?"
    };
    var _mNEntities = {
        prid: "8PR634MLX",
        crid: "857097420",
        pid: "8PO27GX71",
        cid: "8CU7INKUC",
        dn: "unitedstatescredit.com",
        requrl: "https%3A%2F%2Funitedstatescredit.com%2F%3F%26query%3DDebt%2520Relief%23mnetcrid%3D857097420%23%23mnetset9%23",
        chid: "",
        ugd: "4",
        cc: "US",
        sc: "##__STATE_CODE__##",
        cme: "KkKUG6JLaWptcd7ygVoZgW_gowIx32vSl5tlbUoHIlTQml3_Dh-qiqs_OdzHx0U0K_KLe3O8CQcdzVPGT9LH0UYR57_yeQPf8DcZv9lp0uYQDDA6aXnjVbkTmQtMMwfl%7C%7CNDHRnZ9Gz3KXlI-i9OnZqQ%3D%3D%7CuwVTQWlYWoWUA-qRagL5TxN9KAHBolCS%7CYYTj4ExD3rNb_h2BcX6K4Q%3D%3D%7Cs65HNM7gTgy4iFXWeSkCag%3D%3D%7CN7fu2vKt8_s%3D%7CYdjFvixrVaFB8egAO0DYQtac8Sv9LXceZFim51JBrV3UcS_LVWgiGhxJVfT8sPnya56NndQdUQh25GRxtfwQJuHzKnf3JmW76ii_5eDNpwCWAWEk0bXRJA%3D%3D%7CsRBSg3CPSiQ%3D%7C"
    };
    var hN = "https://lgsearchclub-a.akamaihd.net"
      , crid = "857097420";
    var fN = "bqi.php";
    _mNL2.mNFail = {};
    _mNL2.mNFail.failover = '0';
    _mNL2._mNRP = {};
    _mNL2._mNRP.config = {
        "logLevel": 3,
        "logURL": "https:\/\/lgsearchclub-a.akamaihd.net\/nerrping.php"
    };
    try {
        _mNDetails = _mNL2.nb ? parent._mNDetails : (window._mNDetails ? window._mNDetails : {});
    } catch (e) {
        _mNDetails = {};
    }
    _mNDetails.L2 = _mNDetails.L2 || {};
    _mNDetails.L2.depCtr = 3;
    _mNDetails.L2.modArr = ["NEW_VIMPL2", "CUSTOM-EVENTS"];
    try {
        !function(e, t, r, n) {
            "use strict";
            function o(t, r, n) {
                return n = n || e,
                function() {
                    arguments.length > 0 && Array.prototype.push.apply(r, Array.prototype.slice.call(arguments)),
                    t.apply(n, r)
                }
            }
            var i = r._mNRP || {}
              , l = 1e3;
            if ("function" != typeof i.pushError) {
                var s;
                e.onerror;
                for (i.noOfLogLevels = 3,
                i.useragent = encodeURIComponent(navigator.userAgent),
                i.errQ = [],
                s = 0; s < i.noOfLogLevels; s++)
                    i.errQ[s] = [];
                i.pushError = function(e) {
                    "undefined" == typeof e.logLevel && (e = {
                        logLevel: 3,
                        errorVal: e
                    }),
                    e.logLevel >= i.config.logLevel && i.errQ[e.logLevel - 1].push(e)
                }
                ,
                i.printErrors = function() {
                    var t, r = 0;
                    for (t = 0; t < i.noOfLogLevels; t++)
                        r += i.errQ[t].length;
                    if (0 !== r) {
                        var n, o, s, a, f = new Image, c = i.config.logURL, u = "", g = 0;
                        for (t = i.noOfLogLevels - 1; t >= 0; t--) {
                            for (r = i.errQ[t].length,
                            n = 0; n < r; ) {
                                if (1 === t)
                                    a = i.errQ[t][n];
                                else {
                                    var h = i.errQ[t][n].errorVal.stack;
                                    "string" == typeof h && (h = h.substr(0, l)),
                                    a = {
                                        logLevel: i.errQ[t][n].logLevel,
                                        errorVal: {
                                            name: i.errQ[t][n].errorVal.name,
                                            message: i.errQ[t][n].errorVal.message,
                                            line: i.errQ[t][n].errorVal.lineNumber,
                                            description: i.errQ[t][n].errorVal.description,
                                            stack: h
                                        }
                                    }
                                }
                                if (s = i.stringify(a),
                                !(s.length + u.length <= 1200) && u.length) {
                                    g = 1;
                                    break
                                }
                                0 !== u.length && (u += ","),
                                u += s,
                                i.errQ[t].shift(),
                                r--
                            }
                            if (g)
                                break
                        }
                        u = encodeURIComponent("[" + u + "]"),
                        o = c + "?d=" + u + "&userAgent=" + i.useragent + "&requrl=" + encodeURIComponent(e.location.href) + "&img=logo.gif",
                        f.src = o
                    }
                }
                ,
                i.tostring = function(e) {
                    return null === e ? "null" : e.toString()
                }
                ,
                i.quote = function(e) {
                    var t = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g
                      , r = {
                        "\b": "\\b",
                        "\t": "\\t",
                        "\n": "\\n",
                        "\f": "\\f",
                        "\r": "\\r",
                        '"': '\\"',
                        "\\": "\\\\"
                    };
                    return t.lastIndex = 0,
                    t.test(e) ? '"' + e.replace(t, function(e) {
                        var t = r[e];
                        return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                    }) + '"' : '"' + e + '"'
                }
                ,
                i.stringify = function(e) {
                    return "object" == typeof JSON && "undefined" != typeof JSON.stringify ? JSON.stringify(e) : i.altStringify(e)
                }
                ,
                i.altStringify = function(e) {
                    var t, r, n = typeof e, o = e && e.constructor === Array, l = [];
                    switch (n) {
                    case "string":
                        return i.quote(e);
                    case "number":
                        return isFinite(e) ? i.tostring(e) : "null";
                    case "boolean":
                    case "null":
                        return i.tostring(e);
                    case "object":
                        for (t in e)
                            "undefined" != typeof e[t] && (r = e[t],
                            "string" == typeof r ? r = i.quote(r) : "object" == typeof r && null !== r && (r = i.altStringify(r)),
                            l.push((o ? "" : '"' + t + '":') + i.tostring(r)));
                        return (o ? "[" : "{") + i.tostring(l) + (o ? "]" : "}")
                    }
                }
                ,
                i.errorObject = function(e, t, r) {
                    this.name = e,
                    this.message = t,
                    this.logLevel = r
                }
                ,
                i.execSafe = function() {
                    var e, t, r = Array.prototype.slice.call(arguments), n = [], o = r.length, l = null, s = null;
                    "object" == typeof r[o - 1] && r[o - 1].constructor === i.errorObject && (e = r[o - 1],
                    o--),
                    "function" == typeof r[0] ? (t = r.shift(),
                    o--) : (l = r.shift(),
                    t = r.shift(),
                    o -= 2),
                    n = r.slice(0, o);
                    try {
                        return t.apply(l, n)
                    } catch (a) {
                        return e && (a.name = e.name + " (" + a.name + ")",
                        a.message = e.message + " (" + a.message + ")",
                        s = e.logLevel),
                        i.pushError({
                            logLevel: s || 3,
                            errorVal: a
                        }),
                        new i.errorObject
                    }
                }
                ,
                i.execSafeHandler = function() {
                    var t, r, n = Array.prototype.slice.call(arguments), o = e, l = n.length - 1, s = null;
                    "object" == typeof n[l] && n[l].constructor === i.errorObject && (t = n[l]),
                    "function" == typeof n[0] ? r = n.shift() : (o = n.shift(),
                    r = n.shift());
                    try {
                        return r.apply(o)
                    } catch (a) {
                        t && (a.name = t.name + " (" + a.name + ")",
                        a.message = t.message + " (" + a.message + ")",
                        s = t.logLevel),
                        i.pushError({
                            logLevel: s || 3,
                            errorVal: a
                        })
                    }
                }
                ,
                i.setInterval = function() {
                    var e, t = Array.prototype.slice.call(arguments);
                    e = 4 === t.length ? i.execSafeHandler(t[0], t[1], t[3]) : i.execSafeHandler(t[0], t[1]),
                    e !== !1 && setTimeout(o(i.setInterval, t), t[2])
                }
                ,
                i.setTimeout = function() {
                    var t, r = Array.prototype.slice.call(arguments);
                    t = 4 === r.length ? function() {
                        i.execSafeHandler(r[0], r[1], r[3])
                    }
                    : function() {
                        i.execSafeHandler(r[0], r[1])
                    }
                    ,
                    e.setTimeout(t, r[2])
                }
                ,
                i.eventObject = function() {
                    var e = Array.prototype.slice.call(arguments);
                    this.elem = e[0],
                    this.type = e[1],
                    4 === e.length ? this.listener = function() {
                        i.execSafe(e[0], e[2], e[3])
                    }
                    : this.listener = function() {
                        i.execSafe(e[0], e[2])
                    }
                }
                ,
                i.eventObject.prototype.addEvent = function() {
                    var e = function() {
                        this.elem.addEventListener ? this.elem.addEventListener(this.type, this.listener, !1) : this.elem.attachEvent && this.elem.attachEvent("on" + this.type, this.listener)
                    };
                    i.execSafe(this, e)
                }
                ,
                i.eventObject.prototype.removeEvent = function() {
                    var e = function() {
                        this.elem.removeEventListener ? this.elem.removeEventListener(this.type, this.listener) : this.elem.detachEvent && this.elem.detachEvent("on" + this.type, this.listener)
                    };
                    i.execSafe(this, e)
                }
                ;
                var a = function() {
                    i.setInterval(e, i.printErrors, 2500)
                }
                  , f = new i.eventObject(e,"load",a);
                f.addEvent(),
                r._mNRP = i
            }
        }(window, document, _mNL2)
    } catch (e) {}
    var _mNL2 = window._mNL2 || {}, _mNDetails = window._mNDetails, _mN_dy = window._mN_dy || {}, _mN_Idf = _mNL2.crid || "dtag", _mN_ctr, winScope = window;
    window._mN_mc_cnt = window._mN_mc_cnt || 0,
    _mNL2._mN_mc_frameID = "_mN_main_" + _mNL2.crid + "_" + _mN_mc_cnt++,
    _mN_mc_frameID = _mNL2._mN_mc_frameID,
    _mNDetails.L2 = _mNDetails.L2 || {},
    _mNDetails.L2.Ctr = _mNDetails.L2.Ctr || {},
    _mNDetails.L2.Ctr[_mN_Idf] = _mN_ctr = _mNDetails.L2.Ctr[_mN_Idf] ? parseInt(_mNDetails.L2.Ctr[_mN_Idf], 10) + 1 : 1,
    _mN_Idf = _mN_ctr > 1 ? _mN_Idf + "_" + _mN_ctr : _mN_Idf,
    _mNDetails.L2[_mN_Idf] = _mNDetails.L2[_mN_Idf] || {},
    _mNDetails.L2[_mN_Idf].depCtr = _mNDetails.L2.depCtr || 0,
    _mNDetails.L2[_mN_Idf].modArr = _mNDetails.L2.modArr || [],
    function(t, e, n, r, i) {
        "use strict";
        function a(t) {
            return "function" == typeof t
        }
        function c(t) {
            try {
                return "[object Array]" === Object.prototype.toString.call(t)
            } catch (e) {}
            return !1
        }
        function o(t, e) {
            for (var n in e)
                t[n] = e[n];
            return t
        }
        function s(t, e, n) {
            return n = n || null,
            function() {
                arguments.length > 0 && Array.prototype.push.apply(e, Array.prototype.slice.call(arguments)),
                t.apply(n, e)
            }
        }
        function u(t, e) {
            return r.locHash[e] || r.locHash[t] || ""
        }
        function l(t, e, n) {
            r.locHash = r.locHash || {},
            L(e) && (r.locHash[e] = n),
            L(t) && (r.locHash[t] = n)
        }
        function d(t, e, c, o) {
            o = o || ("object" == typeof c ? c : {});
            var s = "evt_" + (t || "gbl")
              , u = r.L2.EntityCache.get(t);
            if (r.L2 !== i && r.L2[s] !== i) {
                var l, d, m = r.L2[s][e] || [], f = {
                    _mNL2: n,
                    adScope: u.adScope,
                    entities: u.entities,
                    type: e,
                    uid: t
                };
                for (d = 0,
                l = m.length; d < l; d++)
                    a(m[d]) && K.execSafe(m[d], f, o);
                !c && m.length > 0 && (r.L2[s][e] = [])
            }
        }
        function m(t, e) {
            var n = t.call();
            n && setTimeout(s(m, [t, e]), e)
        }
        function f(t, e, n) {
            var i = "evt_" + (e || "gbl");
            r.L2[i] = r.L2[i] || {},
            r.L2[i][t] = r.L2[i][t] || [],
            r.L2[i][t].push(n)
        }
        function g(t, e) {
            var n = "evt_" + (e || "gbl");
            r.L2[n] = r.L2[n] || {},
            r.L2[n][t] = [],
            r[n] = r[n] || {},
            r[n][t] = []
        }
        function p(t) {
            --r.L2[t].depCtr || d(t, "dependencyResolved")
        }
        function h(t) {
            return t ? void (this.frame = t.document.createElement("iframe")) : void (this.frame = e.createElement("iframe"))
        }
        function v() {
            return J
        }
        function _(t, e, n) {
            return "object" == typeof t && b(t) && b(e) ? t[e] || n : n
        }
        function y(t) {
            switch (typeof t) {
            case "string":
                return L(t) && ("1" === t || "true" === t);
            case "number":
                return 0 !== t;
            case "boolean":
                return t;
            case "object":
                return null !== t;
            default:
                return !1
            }
        }
        function b(t) {
            switch (typeof t) {
            case "string":
                return L(t);
            case "object":
                return null !== t;
            case "number":
            case "boolean":
                return !0;
            default:
                return !1
            }
        }
        function N(t) {
            return L(t) ? encodeURIComponent(t) : ""
        }
        function I(t) {
            if (!L(t))
                return "";
            try {
                return decodeURIComponent(t)
            } catch (e) {
                return t
            }
        }
        function L(t) {
            return t !== i && "" !== t && null !== t
        }
        function E(t, e) {
            if (!L(e) || !L(t))
                return "";
            if (c(e)) {
                var n, r, i = "";
                for (n = 0,
                r = e.length; n < r; n++)
                    i += "&" + t + "[]=" + e[n];
                return i
            }
            return "&" + t + "=" + e
        }
        function w(t, e) {
            return Math.floor(Math.random() * (e - t + 1) + t)
        }
        function D(t, e) {
            var n, r = "", i = !!e, a = i ? e : t;
            for (n in a)
                a.hasOwnProperty(n) && (i && (n = e[n]),
                L(t[n]) && (r += E(n, t[n])));
            return r
        }
        function A(e) {
            try {
                t._mN && _mN._util && _mN._util.logNBBeacons ? _mN._util.logNBBeacons(e) : t._mN && _mN.util && _mN.util.logBeacons ? _mN.util.logBeacons(e) : (new Image).src = e
            } catch (n) {}
        }
        function C(t) {
            var e = n.crid
              , r = u(e, n.vi)
              , i = t + "&r=" + (new Date).getTime() + "&" + r.replace(/#/g, "&");
            A(i)
        }
        function T(t, n, r) {
            if (a(e.getElementsByClassName))
                return t.getElementsByClassName(n);
            r = r || "*";
            var i, c, o = new RegExp("(^|\\s)" + n + "(\\s|$)"), s = t || e, u = "*" === r && s.all ? s.all : s.getElementsByTagName(r), l = [], d = u.length;
            for (c = 0; c < d; c++)
                i = u[c],
                o.test(i.className) && l.push(i);
            return l
        }
        function k(t) {
            try {
                var n, r = t.charAt(0), i = t.substr(1).split(":"), a = i[0], c = L(i[1]) && parseInt(i[1], 10);
                switch (r) {
                case "@":
                    n = e.getElementsByTagName(a);
                    break;
                case "#":
                    n = e.getElementById(a);
                    break;
                case ".":
                    n = T(e, a);
                    break;
                default:
                    n = e.getElementById(t)
                }
                return c === !1 ? n : n[c]
            } catch (o) {
                return null
            }
        }
        function B(t) {
            try {
                var e = t.contentWindow || t.contentDocument
                  , n = e && (e.document || e) || !1;
                return [n, e, null]
            } catch (r) {
                return [!1, null, "Access Denied"]
            }
        }
        function P(t, n) {
            var r, i, a = B(t);
            try {
                if (null !== a[2])
                    throw a[2];
                r = a[0],
                i = a[1];
                try {
                    if (/msie/.test(navigator.userAgent.toLowerCase()))
                        throw 10;
                    r && (r.open(),
                    r.write(n),
                    r.close())
                } catch (c) {
                    i.data = n,
                    r.location.replace('javascript:window["data"];')
                }
            } catch (o) {
                var s = "javascript:var d=document.open();d.domain='" + e.domain + "';";
                t.src = s + "void(0);";
                try {
                    var u = t.contentWindow.document;
                    u.write(n),
                    u.close()
                } catch (l) {
                    t.src = s + 'd.write("' + n.replace(/"/g, '\\"') + '");d.close();',
                    K.pushError(l)
                }
            }
        }
        function S(t, e, n) {
            var r;
            return (n = n || k("@body:0")) ? (r = (new h).set("marginWidth", 0).set("marginHeight", 0).set("scrolling", "no").set("frameBorder", 0).set("height", 0).set("width", 0).set("id", t).overrideStyle("display:none !important;").done(),
            n.firstChild ? n.insertBefore(r, n.firstChild) : n.appendChild(r),
            P(r, e),
            r) : (F("@body:0", 100, s(S, [t, e]), !1),
            null)
        }
        function H(t, e) {
            var n = r.getLocHash(t, e);
            return x(n, "#")
        }
        function U(t) {
            return x(t, "?")
        }
        function x(t, e) {
            if (e = e || "?",
            !L(t))
                return {};
            var n, r, i, a, c = {};
            if (n = t.indexOf(e),
            n === -1)
                return c;
            for (r = t.substring(n + 1).split("&"),
            i = r.length; i--; )
                a = r[i].split("="),
                L(a[0]) && (c[a[0]] = a[1]);
            return c
        }
        function O(t) {
            this.url = t,
            this.map = U(this.url)
        }
        function F(t, n, i, a) {
            try {
                var c = k(t)
                  , o = r.DOMLoadObserver ? r.DOMLoadObserver.getInstance().hasDOMLoaded() : /complete|loaded/.test(e.readyState);
                if (c || !a && o)
                    return void i.call(null, c || !1);
                setTimeout(s(F, [t, n, i, a]), n)
            } catch (u) {
                setTimeout(s(F, [t, n, i, a]), n)
            }
        }
        function j() {
            var t = n.vsid;
            if (L(t) && t.indexOf("VID") === -1 && t.length > 10) {
                var e = t.indexOf("V") === -1 ? 3 : 6;
                t = t.substr(0, t.length - e)
            } else
                t = "";
            return t
        }
        function z(t, e, n) {
            var i = "_mN_dy_" + t;
            r[i] = r[i] || {},
            r[i][e] = n
        }
        function R(t, e) {
            if (!c(t))
                return !1;
            e = e.toUpperCase();
            for (var n = 0; n < t.length; n++)
                if (t[n].toUpperCase() == e)
                    return !0;
            return !1
        }
        function V(t, n, r) {
            if (L(t)) {
                var i = e.createElement("script")
                  , a = !1;
                if (i.type = "text/javascript",
                i.async = !0,
                n && "function" == typeof n && (i.onload = i.onreadystatechange = function() {
                    a || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (a = !0,
                    K.execSafe(n))
                }
                ),
                i.src = t,
                r)
                    r.appendChild(i);
                else {
                    var c = e.getElementsByTagName("script")[0];
                    c.parentNode.insertBefore(i, c)
                }
            }
        }
        function M(t, e) {
            var r = t.getEntity("bucketId")
              , i = "";
            try {
                i = n.abtst.bucketDetails[r][e]
            } catch (a) {}
            return i
        }
        function Q(t) {
            for (var e in t)
                if (t.hasOwnProperty(e))
                    return !1;
            return !0
        }
        function W(t, e) {
            if (b(t)) {
                var n = 0
                  , r = t.length;
                if (c(t))
                    for (; n < r; n++)
                        e.call(t[n], t[n], n, r);
                else
                    for (n in t)
                        t.hasOwnProperty(n) && e.call(t[n], t[n], n, 0)
            }
        }
        function q(t, e) {
            var n = 10;
            for (e = e || 4e3,
            t = t.substring(0, e); n-- > 0; )
                try {
                    decodeURIComponent(t);
                    break
                } catch (r) {
                    t = t.substring(0, t.length - 1)
                }
            return t
        }
        function G() {
            function a() {
                return J
            }
            function o(t, e) {
                if (!L(e))
                    return "";
                for (var n = t.length, r = ":", i = "", a = e.split(r), c = a.length - 2, o = c; o >= 0; o--)
                    for (var s = 0; s < n; s++)
                        if (i = "" + t[s].bucket_id,
                        a[o] === i)
                            return i;
                return ""
            }
            function s(t) {
                t && n.abtst.bucketDetails && n.abtst.bucketDetails[t] && n.abtst.bucketDetails[t].fmteid && z(ft.getEntity("crid"), "abTestTpid", n.abtst.bucketDetails[t].fmteid)
            }
            function m() {
                if (!y(n.abtst) || !y(n.abtst.bucks))
                    return "";
                var t = ""
                  , e = H(W("crid"), W("vi")).buid;
                if (L(e))
                    t = e;
                else {
                    var r = n.abtst.bucks
                      , i = !!y(n.abtst.abtstSync) && n.abtst.abtstSync
                      , c = L(n.abtst.abtestTrackedList) ? n.abtst.abtestTrackedList : ""
                      , u = r.length
                      , l = w(1, 100)
                      , m = 0
                      , p = "";
                    if (!(r && u > 0))
                        return "";
                    for (var h = 0; h < u; h++)
                        if (m = parseInt(m, 10) + parseInt(r[h].percentage, 10),
                        l <= m && r[h].bucket_id) {
                            t = r[h].bucket_id;
                            break
                        }
                    y(i) && (p = o(r, c),
                    L(p) ? t = p : f("beforeLoad", a(), function() {
                        d(a(), "submitSyncRequest", !0, "abtstSync")
                    })),
                    t = g(t, r)
                }
                return s(t),
                M("bucketId", t),
                t
            }
            function g(e, r) {
                try {
                    var i, a = t._mN || t.parent._mN;
                    if (a && a._util && a._util.mngc) {
                        var c = a._util.mngc("session_abts");
                        if (c)
                            for (var o = c.split("|"), s = 0, u = o.length; s < u; s++)
                                o[s].split("=")[0] == n.cid && (i = o[s].split("=")[1]);
                        for (var l = 0; l < r.length; l++)
                            if (r[l].bucket_id == i)
                                return i
                    }
                } catch (d) {}
                return e
            }
            function p() {
                var t = D(pt.getAllUrlParams());
                return t
            }
            function v() {
                return u(W("crid"), W("vi"))
            }
            function b() {
                r.L2.EntityCache.store(a(), pt, ft)
            }
            function I(e) {
                var n = W("vi");
                r[n] = r[n] || {},
                r[n].locHash = e;
                var i = W("crid");
                r[i] = r[i] || {},
                r[i].locHash = e,
                l(i, n, e),
                t.locHash = e
            }
            function E(e) {
                var n = W("vi")
                  , r = W("crid")
                  , i = u(r, n) || "#";
                i += e,
                l(r, n, i),
                t.locHash = i
            }
            function A() {
                var t = e.createElement("link")
                  , n = t.relList;
                return !(!n || "function" != typeof n.supports) && n.supports("preload")
            }
            function T() {
                if (!(r && r.plnr || !L(n.nrUrl)) && A()) {
                    var t = e.getElementsByTagName("head");
                    if (t && t[0]) {
                        var i = e.createElement("link");
                        i.rel = "preload",
                        i.href = n.nrUrl,
                        i.as = "script",
                        t[0].appendChild(i),
                        r.plnr = 1
                    }
                }
            }
            function k() {
                var t = p()
                  , e = v()
                  , n = S()
                  , r = {
                    host: n,
                    srcUrlParams: t,
                    hash: e
                };
                d(a(), "loadTag", !1, r)
            }
            function S() {
                var t = ft.getEntity("bucketId")
                  , e = n.ifrURL;
                if ((L(n._l3v6) || L(t) && n.abtst && n.abtst.bucketDetails && n.abtst.bucketDetails[t] && n.abtst.bucketDetails[t].fmpaiptose) && e.indexOf("://") > -1) {
                    var r = e.split("/")[3];
                    return n.v6D + "/" + r
                }
                return n.ifrURL
            }
            function U(t, e) {
                var n = t.id;
                t.attachEvent ? t.attachEvent("onload", function(t, e) {
                    return function() {
                        try {
                            r.triggerAdTagEvent(e.getEntity("vi"), "VIMP::Detect", !0, {
                                targetElement: t
                            })
                        } catch (n) {}
                    }
                }(n, e)) : t.onload = function(t, e) {
                    return function() {
                        var n = this.contentWindow.document;
                        if (n && n.body && n.body.firstChild)
                            try {
                                r.triggerAdTagEvent(e.getEntity("vi"), "VIMP::Detect", !0, {
                                    targetElement: t
                                })
                            } catch (i) {}
                    }
                }(n, e),
                t = null,
                e = null
            }
            function x(e, n) {
                t._mNtriggerVI = function(e) {
                    return function() {
                        try {
                            r.triggerAdTagEvent(e.getEntity("vi"), "VIMP::Detect", !0, {
                                targetElement: t.frameID,
                                observerScope: t
                            })
                        } catch (n) {}
                    }
                }(n),
                e = null,
                n = null
            }
            function O(t, e, n) {
                var i = r.L2.EntityCache.get(e);
                return 1 === n ? U(t, i.adScope) : 2 === n ? x(t, i.adScope) : void 0
            }
            function F(t, e) {
                return e ? {
                    id: t[4],
                    data: t[0],
                    width: t[2],
                    height: t[3],
                    url: t[1],
                    isInsl: t[5]
                } : {
                    id: t[0],
                    data: t[1],
                    width: t[2],
                    height: t[3],
                    url: t[4],
                    isInsl: t[5]
                }
            }
            function j(t, n) {
                "object" != typeof t && (t = F(arguments, !0));
                var r, i = t.data, a = t.id, c = e.getElementById(a), o = c.contentWindow || c.contentDocument;
                try {
                    r = o && (o.document || o) || !1,
                    r && (r.open(),
                    o.frameID = a,
                    r.write(i),
                    r.close(),
                    o.frameID = a)
                } catch (s) {
                    t.data = "",
                    R(t, n)
                }
            }
            function R(i, a) {
                "object" != typeof i && (i = F(arguments));
                var c, o, s = i.data, u = i.url, l = i.width, d = i.height, m = i.id, f = i.isInsl, g = a.ifrmVifFlag, p = e.getElementById(m), v = m + "_n", _ = (new h).set("marginWidth", 0).set("marginHeight", 0).set("scrolling", "no").set("frameBorder", 0).set("height", d).set("width", l).set("id", v).set("allowTransparency", "true");
                L(n._ifrT) && _.set("title", n._ifrT);
                var y = _.done();
                g ? O(y, a.adtagUID, g) : 0 == g && (t._mNtriggerIOLC = function(e) {
                    return function() {
                        try {
                            r.triggerAdTagEvent(e.getEntity("vi"), "VIMP::Detect", !0, {
                                targetElement: t.frameID,
                                observerScope: t,
                                type: "ifr"
                            })
                        } catch (n) {}
                    }
                }(ft));
                try {
                    p.parentNode.insertBefore(y, p)
                } catch (b) {
                    return
                }
                if (L(u) && !L(s))
                    return y.src = u,
                    y.parentNode.removeChild(p),
                    v;
                c = B(y),
                o = c[1];
                try {
                    o && (o.frameID = v),
                    P(y, s),
                    f && "12" == f && _mN_dy.exInttAd && _mN_dy.exInttAd.init ? _mN_dy.exInttAd.init(y) : f && ("1" == f || "6" == f) && _mN_dy.inttAd && _mN_dy.inttAd.init && _mN_dy.inttAd.init(y),
                    r.triggerAdTagEvent(n.vi, "l3Placed", !0, {
                        mnFrame: y
                    }),
                    y.parentNode.removeChild(p)
                } catch (N) {}
                return v
            }
            function V() {
                _mN_dy.eventLib = X,
                _mN_dy.getContent = j,
                _mN_dy.putContent = R
            }
            function M(t, e, n) {
                n = n || {},
                pt.setParam(t, e, n)
            }
            function Q(t, e, n) {
                n = n || {},
                n.needsEncode = n.needsEncode === i || n.needsEncode,
                n.isUrlParam = !0,
                M(t, e, n)
            }
            function W(t) {
                return pt.getParam(t)
            }
            function q(t) {
                if (!W("rtbs"))
                    return null;
                var e = W("crid")
                  , n = "_mN_dy_" + e
                  , a = _(r, n);
                return a ? _(a, t) : i
            }
            function G() {
                return !y(n.vImp) && y(n.staticIframe) ? 0 : y(n.staticIframe) || y(n.nb) ? y(n.nb) ? 2 : void 0 : 1
            }
            function $() {
                n.tbbe && Q("r", (new Date).getTime())
            }
            function K() {
                Q("cid", n.cid),
                Q("cpcd", n.cpcd),
                Q("crid", n.crid),
                Q("pid", n.pid),
                Q("tpid", n.tpid),
                Q("ppf", n.ppf),
                L(n.ecsz) ? (Q("ecsz", n.ecsz),
                M("size", n.size)) : Q("size", n.size),
                Q("orgsize", n.orgsize),
                Q("cpnet", n.cpnet),
                Q("cme", n.cme),
                Q("https", n.https),
                Q("mfct", n.mfct),
                Q("refterm", n.refterm, {
                    needsEncode: !1
                }),
                Q("cc", n.cc),
                Q("bf", n.bf),
                Q("staticIframe", n.staticIframe),
                Q("vif", n.vImp),
                Q("bct", n.bct),
                Q("acid", n.acid),
                Q("chid", n.chid),
                Q("ctxid", n.ctxid),
                Q("ctxcat", n.ctxcat),
                Q("rcf", n.rcf),
                Q("q", n.q),
                Q("kurl", n.kurl),
                Q("mct", n.mct),
                Q("bkw", n.bkw),
                Q("mps", n.mps),
                Q("ms", n.ms),
                Q("mis", n.mis),
                Q("ah", n.ah),
                Q("bf", n.bf),
                Q("cstrerm", n.csterm),
                Q("mcid", n.mcid),
                Q("tl", n.tl),
                Q("ctsp", n.ctsp),
                Q("gen", n.gen),
                Q("nse", n.nse),
                Q("kwp", n.kwp),
                Q("inframe", n.inframe),
                Q("cs", n.cs),
                Q("oa", n.oa),
                Q("dn", n.dn),
                Q("nds", n.nds),
                Q("mrt", n.mrt),
                Q("vi", n.vi),
                Q("lw", n.lw),
                Q("ugd", n.ugd),
                Q("inamp", n.inamp),
                M("prid", n.prid),
                M("ntIfrAndVif", G()),
                M("rndrSize", L(n.size) ? n.size : "x"),
                M("rtbs", n.rtbs),
                M("dfp", n.dfp),
                M("nb", n.nb),
                M("custHt", n.custHt),
                M("requrl", n.requrl),
                M("disableL3", gt.isOptionSet(n.disL3) ? 1 : 0),
                M("chnm", n.chnm),
                M("chnm2", n.chnm2),
                M("chnm3", n.chnm3),
                Q("bdrId", n.bdrId),
                Q("ib", n.ib),
                Q("jtag", n.jtag),
                Q("bcat", n.bcat),
                Q("matchstring", n.matchstring),
                $(),
                L(n.osrc) && (Q("ourl", n.ourl),
                Q("osrc", n.osrc))
            }
            function Y() {
                V()
            }
            function Z() {
                var e = ""
                  , n = W("crid")
                  , r = W("vi");
                if (!y(W("staticIframe")) || y(W("nb")) || y(W("ms")))
                    try {
                        e = u(n, r),
                        e = L(e) ? "#" + e : ""
                    } catch (i) {}
                else
                    e = t.location.hash ? t.location.hash : "";
                e = e && e + "&dytm=" + (new Date).getTime(),
                I(e)
            }
            function tt() {
                Q("bid", m())
            }
            function et() {
                M("ifrUrl", n.ifrURL),
                r[W("vi")] = r[W("vi")] || {},
                z(ft.getEntity("crid"), "natTpid", n._natTpid),
                rt(),
                nt(),
                L(n.kttle) && Q("kttle", n.kttle)
            }
            function nt() {
                L(n.oHst) && E("&l2ac=" + n.oHst),
                n.l2wsip && E("&l2wsip=" + n.l2wsip),
                y(W("staticIframe")) && !y(W("nb")) && E("&l2src=1")
            }
            function rt() {
                var t = 3;
                W("vi") && (t = 2,
                n && n.viComp && (t = W("vi") == n.viComp ? 0 : 1)),
                E("&l2ch=" + t)
            }
            function it() {
                var t;
                y(n.setL3100) && (t = W("rndrSize").split("x"),
                t[0] = "100%",
                ht("rndrSize", t.join("x"))),
                L(W("custHt")) && (t = W("rndrSize").split("x"),
                t[1] = W("custHt"),
                ht("rndrSize", t.join("x")))
            }
            function at() {
                if (y(W("nb")))
                    try {
                        t.parent.document.getElementById(t.frameID).style.display = "none"
                    } catch (e) {}
            }
            function ct(t) {
                _mN_dy["ha_" + W("crid")] = function() {
                    var i = n._mN_mc_frameID + "_n";
                    return function() {
                        at(),
                        e.getElementById(i) && (e.getElementById(i).style.display = "none"),
                        r.triggerAdTagEvent(t, "hideAdFrames", !0, {
                            viewId: t,
                            type: "L3",
                            L2: "1"
                        })
                    }
                }()
            }
            function ot() {
                try {
                    var e = t._mN || t.parent._mN;
                    if (e && e._util && e._util.mngc) {
                        var n = e._util.mngc("mnet_hide");
                        if (n)
                            return !0
                    }
                } catch (r) {}
                return !1
            }
            function st() {
                return n.mNFail && y(n.mNFail.failover) || ot() ? (at(),
                d(n.vi, "hideAdFrames", !0, {
                    viewId: n.vi,
                    type: "L2",
                    L2: "1"
                }),
                !0) : (ct(n.vi),
                !1)
            }
            function ut() {
                if (d(a(), "customFl"),
                r[n.vi] && r[n.vi].custFl) {
                    var t = r[n.vi].custFlLog;
                    return L(t) && C(t),
                    !0
                }
                return st()
            }
            function lt(e) {
                if (c(e) || (e = [e]),
                t._mN && _mN._util && _mN._util.logNBBeacons)
                    _mN._util.logNBBeacons(e);
                else if (t._mN && _mN.util && _mN.util.logBeacons)
                    _mN.util.logBeacons(e);
                else
                    for (var n = 0, r = e.length; n < r; n++)
                        (new Image).src = e[n]
            }
            function dt() {
                n.rtbBeacons && lt(n.rtbBeacons)
            }
            function mt() {
                for (var t = a(), e = r.L2[t].modArr, n = 0, i = e.length; n < i; )
                    d(t, "load::" + e[n++]);
                r.L2[t].modArr = [],
                d(t, "load::Renderer"),
                d(t, "modulesLoaded")
            }
            var ft, gt = n.util, pt = function() {
                var t = {};
                return {
                    setParam: function(e, n, r) {
                        r = r || {};
                        var a = r.needsEncode
                          , c = r.isUrlParam !== i && r.isUrlParam;
                        t[e] = t[e] || {},
                        t[e].value = a && N(n) || n,
                        t[e].isUrlParam = c
                    },
                    getParam: function(e) {
                        return t[e] === i ? "" : t[e].value
                    },
                    getAllUrlParams: function() {
                        return this.getAllParams(!0)
                    },
                    getAllParams: function(e) {
                        var n, r = {}, i = !0;
                        for (n in t)
                            i = !y(e) || t[n].isUrlParam,
                            t.hasOwnProperty(n) && i && (r[n] = t[n].value);
                        return r
                    }
                }
            }(), ht = M;
            ft = {
                uid: a(),
                addUrlEntity: Q,
                addEntity: M,
                updateEntity: ht,
                cacheLocHash: I,
                getFinalSourceParams: p,
                getFinalHashLogParams: v,
                getEntity: W,
                getRTBSDetails: q
            },
            this.bootstrap = function() {
                Y(),
                K(),
                Z(),
                tt(),
                et(),
                ut() || (it(),
                dt(),
                b(),
                mt(),
                T(),
                k())
            }
        }
        function $() {
            (new G).bootstrap()
        }
        var J = _mN_Idf
          , K = n._mNRP
          , X = {
            addEvent: function(t, e, n) {
                t.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent && t.attachEvent("on" + e, n),
                t = null
            },
            removeEvent: function(t, e, n) {
                t.removeEventListener ? t.removeEventListener(e, n) : t.detachEvent && t.detachEvent("on" + e, n),
                t = null
            }
        };
        h.prototype.set = function(t, e) {
            return this.frame[t] = e,
            this
        }
        ,
        h.prototype.setStyle = function(t) {
            var e;
            for (e in t)
                t.hasOwnProperty(e) && (this.frame.style[e] = t[e]);
            return this
        }
        ,
        h.prototype.overrideStyle = function(t) {
            return this.frame.style.cssText = t,
            this
        }
        ,
        h.prototype.done = function() {
            return this.frame
        }
        ,
        O.prototype.getParam = function(t) {
            return this.map[t] || ""
        }
        ,
        O.prototype.getParamAsQuery = function(t, e) {
            return e || (e = t),
            this.map[t] && "" !== this.map[t] ? ["&", e, "=", this.map[t]].join("") : ""
        }
        ,
        O.prototype.getDecodedParam = function(t) {
            var e = this.map[t];
            return e && I(e) || ""
        }
        ,
        n.util = n.util || {
            extend: o,
            decodeParam: I,
            encodeParam: N,
            isOptionSet: y,
            isSet: b,
            isStringSet: L,
            getAdTagUID: v,
            getQueryParamString: E,
            buildUrlParameters: D,
            triggerAdTagEvent: d,
            addToEventQueue: f,
            getProxy: s,
            setInterval: m,
            resolveModuleLoad: p,
            logFailover: C,
            CreateFrame: h,
            getParamValueFromUrlAsArray: U,
            GetParamValueFromUrl: O,
            callWhenAvailable: F,
            writeContentInIframe: P,
            getIframeDoc: B,
            eventLib: X,
            getVisitorId: j,
            logBeacons: A,
            queryDOM: k,
            createNonBlockingFrame: S,
            getRandomFromTo: w,
            checkItemExistsInArray: R,
            setRTBSDetails: z,
            loadScript: V,
            getABTestValueForFeature: M,
            getLocHashAsArray: H,
            each: W,
            isObjectEmpty: Q,
            truncateUrl: q
        },
        r.addToEventQueue = r.addToEventQueue || f,
        r.triggerAdTagEvent = r.triggerAdTagEvent || d,
        r.getLocHash = r.getLocHash || u,
        r.updateLocHash = r.updateLocHash || l,
        r.getLocHashAsArray = r.getLocHashAsArray || H,
        r.removeAllEventsInQueue = r.removeAllEventsInQueue || g,
        r.L2.EntityCache = r.L2.EntityCache || function() {
            var t = {};
            return {
                store: function(e, n, r) {
                    t["entCac_" + e] = {
                        entities: n,
                        adScope: r
                    }
                },
                get: function(e) {
                    return "entCac_" + e in t ? t["entCac_" + e] : {}
                }
            }
        }(),
        f("dependencyResolved", v(), $)
    }(window, document, _mNL2, _mNDetails);
    !function(i, t, n) {
        "use strict";
        function e() {
            function i() {
                return null === n && (n = !1,
                r.each(t.getMainFlag(), function(i, t) {
                    r.isSet(i) && (n = n || i > 0)
                })),
                n
            }
            var t = this
              , n = null;
            this.isApplicable = function(t) {
                return r.isStringSet(t) ? u[t] || !1 : i()
            }
            ,
            this.isActionPermitted = function(i) {
                return !t.isApplicable() || !r.isSet(c[i]) || !c[i]
            }
            ,
            this.getMainFlag = function() {
                return r.isSet(u) && "object" == typeof u ? u : {}
            }
        }
        var r = n.util
          , u = n._priv || {}
          , c = n._privCnf || {};
        _mNDetails.privacyL2 = new e
    }(window, document, _mNL2);
    !function(t, i, e, n) {
        "use strict";
        function r() {
            function t() {
                var t = i.getElementById(e._mN_mc_frameID + "_n");
                if (t) {
                    var n = t.contentWindow;
                    if (n && n.mUtil && "function" == typeof n.mUtil.getABPFlag)
                        return n.mUtil.getABPFlag("val")
                }
                return ""
            }
            function r(i) {
                var r = d.getLocHashAsArray(i.getEntity("crid"), i.getEntity("vi"))
                  , c = n.privacyL2.getMainFlag() || {};
                return c.prid = i.getEntity("prid") || "",
                c.vi = i.getEntity("vi") || "",
                c.cid = i.getEntity("cid") || "",
                c.crid = i.getEntity("crid") || "",
                c.chid = i.getEntity("chid") || "",
                c.ugd = i.getEntity("ugd") || "",
                c.cc = i.getEntity("cc") || "",
                c.sc = e._ip2allsc || "",
                c.requrl = d.encodeParam(i.getEntity("requrl") || ""),
                c.pid = i.getEntity("pid"),
                c.hvsid = r.hvsid || "",
                c.bdrid = i.getRTBSDetails("winProv") || i.getEntity("bdrId") || "",
                c.subBdr = i.getRTBSDetails("subBdr") || r.sbdrId || "",
                c.cme = i.getEntity("cme"),
                c.abpl = t(),
                d.isObjectEmpty(r) || d.each(r, function(t, i) {
                    c[i] = d.isStringSet(c[i]) ? c[i] : t
                }),
                c.sbdrId = "",
                c
            }
            function c(t) {
                var i = r(t);
                return i.vgd_ifimp = 1,
                i
            }
            function u(t, i) {
                var e = i.type;
                "function" == typeof i.shouldOverrideLogFunction ? i.shouldOverrideLogFunction = function() {
                    return i.shouldOverrideLogFunction(g)
                }
                : "ifr" == e ? i.shouldOverrideLogFunction = function() {
                    return c(g)
                }
                : "dfp" != e && "rtbs" != e && (i.shouldOverrideLogFunction = function() {
                    return r(g)
                }
                ),
                n.triggerAdTagEvent(g.getEntity("vi"), "VIMP::Detect_L1", !0, i)
            }
            function o() {
                n.removeAllEventsInQueue("VIMP::Detect", g.getEntity("vi")),
                n.addToEventQueue("VIMP::Detect", g.getEntity("vi"), u)
            }
            var g;
            this.initVimp = function(t) {
                g = t.adScope,
                o()
            }
        }
        var d = e.util
          , c = d.getAdTagUID();
        d.addToEventQueue("load::NEW_VIMPL2", c, (new r).initVimp),
        d.resolveModuleLoad(c)
    }(window, document, _mNL2, _mNDetails);
    !function(e, t, i, n) {
        "use strict";
        function a(t, a, r, d) {
            if (p.isOptionSet(i.staticIframe))
                if (p.isOptionSet(i.nb))
                    n.triggerAdTagEvent(a, t, r, d);
                else {
                    var o = {
                        type: t,
                        mnEvnId: a,
                        preventDelete: r,
                        params: d
                    };
                    e.parent.postMessage(JSON.stringify(o), "*")
                }
        }
        function r(e) {
            try {
                if (0 == l.getEntity("ifrUrl").indexOf(e.origin)) {
                    var t = JSON.parse(e.data);
                    if (!t || !t.mnEvnId || !t.type)
                        return;
                    t.params || (t.params = {}),
                    t.params.originalEvent = e,
                    n.triggerAdTagEvent(t.mnEvnId, t.type, t.preventDelete, t.params)
                }
            } catch (i) {}
        }
        function d(e) {
            var t = "";
            try {
                if (e && e.viewId) {
                    var i = e.type;
                    t = n[e.viewId][i + "frameId"]
                } else
                    t = e.id;
                return t
            } catch (a) {}
        }
        function o(e) {
            a("hideAdFrames", e, !0, {
                viewId: e,
                type: "L2"
            })
        }
        function v(e) {
            e.type = "L2",
            e.L2 = "0",
            a("alterAdFrameDimension", e.viewId, !0, e)
        }
        function s(e, i) {
            var n = d(i);
            i && i.viewId && "1" == i.L2 && o(i.viewId);
            try {
                p.isStringSet(n) && (t.getElementById(n).style.display = "none")
            } catch (a) {}
        }
        function u(e, i) {
            var n = d(i);
            i && i.viewId && "1" == i.L2 && v(i);
            try {
                i && p.isStringSet(n) && (p.isStringSet(i.width) && (t.getElementById(n).width = i.width),
                p.isStringSet(i.height) && (t.getElementById(n).height = i.height))
            } catch (a) {}
        }
        function g(e, t) {
            t && t.viewId && "1" == t.L2 && (t.type = "L2",
            t.L2 = "0",
            a("pushNotificationDetails", t.viewId, !0, t))
        }
        function f() {
            function e(e, t) {
                a(i, t.vi, !0, t)
            }
            function t(e, t) {
                a(r, t.vi, !0, t)
            }
            var i = "measurePerf_l1"
              , r = "logPerf_l1"
              , d = "measurePerf_l2"
              , o = "logPerf_l2";
            n.addToEventQueue(d, l.getEntity("vi"), e),
            n.addToEventQueue(o, l.getEntity("vi"), t),
            p.triggerAdTagEvent(E, "setupPerformance", !1, {
                measure: e,
                log: t
            })
        }
        function c() {
            p.isOptionSet(i.staticIframe) && p.eventLib.addEvent(e, "message", r),
            n.addToEventQueue("hideAdFrames", l.getEntity("vi"), s),
            n.addToEventQueue("alterAdFrameDimension", l.getEntity("vi"), u),
            n.addToEventQueue("pushNotificationDetails", l.getEntity("vi"), g),
            f()
        }
        function m(e) {
            l = e.adScope,
            c()
        }
        var l, p = i.util, E = p.getAdTagUID();
        p.addToEventQueue("load::CUSTOM-EVENTS", E, m),
        p.resolveModuleLoad(E)
    }(window, document, _mNL2, _mNDetails);
    !function(e, t, i, a, n) {
        "use strict";
        function r(t, n) {
            var r = n.getParam("crid");
            Q = i._mN_mc_frameID,
            a = "undefined" != typeof a ? a : {},
            a[r] = a[r] || {},
            a[r].iframeURL = t.host + t.srcUrlParams + t.hash,
            e.iframeURL = a[r].iframeURL,
            a[r].iframeID = Q,
            j = i.ifrmCss,
            _mN_dy = _mN_dy || {}
        }
        function d(e) {
            var t = 1 == e.getEntity("jtag") || !1
              , n = H.isOptionSet(e.getEntity("nb")) || x();
            R = H.isOptionSet(i.insl);
            var r = H.isOptionSet(i.bl)
              , d = !1;
            if (!n && a.awif_placeholders)
                for (var o in a.awif_placeholders)
                    if (a.awif_placeholders[o] == e.getEntity("crid")) {
                        d = !0,
                        e.addEntity("placeholderID", o),
                        delete a.awif_placeholders[o];
                        break
                    }
            return t && d ? "JTAG" : R ? "INSL" : d ? "AWIF" : n && r ? "BLASYNC" : r ? "BL" : n ? "NB" : "SN"
        }
        function o() {
            if (H.isStringSet(j)) {
                var e;
                e = t.createElement("style"),
                e.type = "text/css",
                e.styleSheet ? e.styleSheet.cssText = j : e.appendChild(t.createTextNode(j)),
                t.body.appendChild(e)
            }
        }
        function l() {
            H.isOptionSet(i.insl.inslPerDay) || _mN && _mN._util && _mN._util.mnsc && _mN._util.mnsc("_mNInsl", "1", 1, "/", "", "", i.insl.inslCkTime)
        }
        function s() {
            return H.isOptionSet(i.insl.inslManTrig)
        }
        function m(e, t) {
            return e.indexOf("|" + t + "|") !== -1
        }
        function c(e) {
            return i.rtbs && i.rtbs.BIDWAIT === "" + e
        }
        function g(a) {
            if (i.showAdsManually) {
                e.showAdsManually = e.showAdsManually || {};
                var n = a.getParam("crid")
                  , r = a.getParam("rndrSize");
                a.setParam("rndrSize", "0x0"),
                e.showAdsManually[n] = {},
                e.showAdsManually[n].mNWait = !0,
                e.showAdsManually[n].mNIframeid = Q,
                e.showAdsManually[n].mNSize = r,
                "function" != typeof e.mnetDisplayAds && (e.mnetDisplayAds = function(i) {
                    if (e.showAdsManually && e.showAdsManually[i]) {
                        var a, n, r, d = e.showAdsManually[i].mNSize.split("x"), o = e.showAdsManually[i].mNIframeid;
                        e.showAdsManually[i].mNWait && (e.showAdsManually[i].mNWait = !1,
                        a = t.getElementById(o + "_n"),
                        a ? (a.width = d[0],
                        a.height = d[1],
                        n = H.getIframeDoc(a),
                        r = n[1],
                        r && r.mUtil.renderAdUnit()) : H.callWhenAvailable("#" + o + "_n", 100, function(e) {
                            e.width = d[0],
                            e.height = d[1],
                            n = H.getIframeDoc(e),
                            r = n[1],
                            r && r.mUtil.renderAdUnit()
                        }, !0))
                    }
                }
                )
            }
        }
        function u(e, t) {
            return H.isSet(e) ? e.replace("##VIEW_ID##", t) : ""
        }
        function f(e, t) {
            g(e);
            var n = e.getParam("rndrSize").split("x")
              , r = e.getParam("crid")
              , d = u(i._perfCode, e.getParam("vi")) || "";
            V = '<!DOCTYPE html><html><head><script type="text/javascript">var  publisherScope = window.parent.winScope;' + d + ' var iframeID = typeof(frameID) !== "undefined" ? frameID : window.parent._mNDetails["' + e.getParam("crid") + '"]["iframeID"], callback = false, dyncId = iframeID.replace("main", "dy").replace(/_[0-9]*$/g, ""),  mFrame = window.parent._mNDetails["' + e.getParam("crid") + '"]["iframeURL"].replace(/#.*/,"");  function makeParentAccessible() { try {\twindow.parent.winScope; } catch(domainException) { document.domain = document.domain.replace(/^www./,""); }}function processL3() {makeParentAccessible();window.parent._mNDetails[dyncId] = window.parent._mNDetails[dyncId] || {};window.parent._mNDetails[dyncId].l3Code = adContent.content; if (window.parent._mNDetails.triggerAdTagEvent && window.parent._mNDetails.addToEventQueue) { window.parent._mNDetails.addToEventQueue("loadL3", "' + t + '", loadL3); window.parent._mNDetails.triggerAdTagEvent("' + t + '","adContentLoaded");  } else{loadL3();}} window.parent.loadL3 = loadL3; function loadL3(){ makeParentAccessible(); parent._mN_dy.putContent({data: adContent.content, url: "", width: "' + n[0] + '", height: "' + n[1] + '", id: iframeID, isInsl: ' + R + "}, {ifrmVifFlag: " + e.getParam("ntIfrAndVif") + ', adtagUID: "' + t + '"});};function getL3URL(urlFromL2) {var isSecureSrc = urlFromL2.indexOf("https") === 0,isWindowSecure = "https:" == document.location.protocol, _mNL2;if (!isWindowSecure || isSecureSrc) {return urlFromL2 + "&nb=1";}try { _mNL2 = window.parent._mNL2; if (_mNL2 && _mNL2.util && _mNL2.util.logFailover && _mNL2.htFlUrl) {_mNL2.util.logFailover(_mNL2.htFlUrl);}} catch (e) {}return "";};function createTag() {var l3src = getL3URL(mFrame);if (!l3src) {return;}var scr = document.createElement("script");scr.onload = scr.onreadystatechange = function () {if (typeof adContent != "undefined" && !callback) {callback = true;processL3();}};scr.type = "text/javascript";scr.src = l3src;scr.async = "async";document.getElementsByTagName("head")[0].appendChild(scr);};<\/script></head><body onload="createTag()"></body></html>',
            H.callWhenAvailable(Q, 50, function() {
                _mN_dy.getContent({
                    data: V,
                    url: a[r].iframeURL,
                    width: n[0],
                    height: n[1],
                    id: Q,
                    isInsl: R
                }, {
                    ifrmVifFlag: e.getParam("ntIfrAndVif"),
                    adtagUID: t
                })
            })
        }
        function p(e) {
            return m(i.rtbs.YBNCABID, a[e].winProv) || y(e)
        }
        function y(e) {
            return a[e] && a[e].isNatWin
        }
        function h(e) {
            var t = "object" == typeof e ? e.uid : e
              , i = "_mN_dy_" + t;
            p(i) && (a[i].logFunc && a[i].logFunc.call(),
            v(e))
        }
        function _(e) {
            var t = "object" == typeof e ? e.uid : e
              , i = "_mN_dy_" + t;
            a[t].adContentLoaded && (c(a[i].winProv) || a[i].displayCalled || (p(i) && (a[i].adCode = a[i].l3Code),
            a[i].displayCalled = !0,
            a[i].display(!1, t)))
        }
        function v(e) {
            var t = "object" == typeof e ? e.uid : e
              , i = "_mN_dy_" + t;
            a[t].adContentLoaded && p(i) && !a[i].l3Loaded && (a[i].l3Loaded = !0,
            a.triggerAdTagEvent(t, "loadL3"))
        }
        function w(e) {
            var t = "_mN_dy_" + e;
            a.addToEventQueue("adContentLoaded", e, v),
            c(a[t].winProv) ? a.addToEventQueue("bidDone", e, h) : h(e)
        }
        function N(e) {
            a.addToEventQueue("adContentLoaded", e, function(t) {
                a.triggerAdTagEvent(e, "loadL3")
            })
        }
        function L(e) {
            var t = "object" == typeof e ? e.uid : e
              , i = "_mN_dy_" + t;
            a[i].callShow ? a.show(t, null) : a.triggerAdTagEvent(t, "dfpDisplayInit", !1, a[i]),
            _(e)
        }
        function S(e) {
            var t = "_mN_dy_" + e;
            c(a[t].winProv) ? a.addToEventQueue("bidDone", e, L) : L(e),
            a.addToEventQueue("adContentLoaded", e, _)
        }
        function I(e, t) {
            var i = e.getParam("dfp")
              , n = e.getParam("rtbs")
              , r = e.getParam("crid")
              , d = e.getParam("rndrSize").split("x")
              , o = "_mN_dy_" + r
              , l = H.isOptionSet(i)
              , s = H.isOptionSet(n);
            a[r] = a[r] || {},
            a[o] = a[o] || {},
            a[o].l3Loaded = !1,
            a.addToEventQueue("adContentLoaded", r, function() {
                a[r].adContentLoaded = !0
            }),
            s ? l ? (a[o] = H.extend({
                dyncId: o,
                displayCalled: !1,
                elemId: i.divId,
                slot: i.adSlotId,
                width: i.width || d[0],
                height: i.height || d[1],
                sizeList: i.sizeList || "",
                callShow: i.callShow || !1
            }, a[o]),
            a.triggerAdTagEvent(r, "dfpInit", !1, a[o]),
            S(r)) : w(r) : N(t)
        }
        function E() {
            var e = parseInt(i.insl.percTraf, 10) || 0
              , t = Math.floor(100 * Math.random() + 1) <= e;
            return t
        }
        function T() {
            if (H.isOptionSet(i.insl.inslL1ImpTrigL2))
                return e._mNDetails && e._mNDetails.logPing && e._mNDetails.logPing()
        }
        function D(a, n, r) {
            var d = n.getParam("rndrSize").split("x")
              , o = 15;
            d[0] = "0",
            d[1] = "0";
            var m = Q;
            _mN_dy._mNCreateFrame = function() {
                if (t && t.getElementsByTagName && t.getElementById && t.body) {
                    l();
                    var e = (new H.CreateFrame).set("marginWidth", 0).set("marginHeight", 0).set("scrolling", "no").set("frameBorder", 0).set("height", d[1]).set("width", d[0]).set("id", m).overrideStyle("display:none !important;").done();
                    t.body.appendChild(e),
                    f(n, a.uid),
                    T()
                } else
                    setTimeout(_mN_dy._mNCreateFrame, o)
            }
            ,
            E() ? (e._mNInslDisplay = !1,
            e._mNTriggerInterstitial = function() {}
            ,
            _mN_dy._mNCreateFrame = function() {}
            ,
            H.logFailover(i.insl.cmInslFailLogUrl)) : s() ? (e._mNInslDisplay = !0,
            e._mNTriggerInterstitial = function() {
                var t = _mN_dy._mNCreateFrame;
                return function() {
                    e._mNInslDisplay === !0 && t()
                }
            }()) : _mN_dy._mNCreateFrame()
        }
        function A(e, i, a) {
            var n, r = i.getParam("rndrSize").split("x");
            o(),
            n = (new H.CreateFrame).set("marginWidth", 0).set("marginHeight", 0).set("scrolling", "no").set("frameBorder", 0).set("height", r[1]).set("width", r[0]).set("id", Q).overrideStyle("display:none !important;").done(),
            t.getElementsByTagName("body")[0].appendChild(n),
            f(i, e.uid),
            k(e, Q + "_n")
        }
        function b(e, i, a) {
            var n = i.getParam("rndrSize").split("x")
              , r = "marginwidth='0' marginheight='0' scrolling='NO' frameborder='0' height='" + n[1] + "' width='" + n[0] + "' id='" + Q + "' style='display:none;'";
            H.isStringSet(j) && t.write("<style>" + j + "</style>"),
            t.write("<iframe " + r + "></iframe>"),
            f(i, e.uid),
            k(e, Q + "_n")
        }
        function C(e, n, r) {
            var d = n.getParam("rndrSize").split("x")
              , o = n.getParam("crid")
              , l = a[o].iframeURL
              , s = "marginwidth='0' marginheight='0' scrolling='NO' frameborder='0' height='" + d[1] + "' width='" + d[0] + "' src='" + l + "' id='" + Q + "'";
            if (H.isStringSet(i._ifrT) && (s += " title = '" + i._ifrT + "'"),
            P(d[1]),
            H.isStringSet(j) && t.write("<style>" + j + "</style>"),
            t.write("<iframe " + s + "></iframe>"),
            k(e, Q),
            H.queryDOM("#" + Q))
                try {
                    a.triggerAdTagEvent(e.getEntity("vi"), "VIMP::Detect", !0, {
                        targetElement: Q
                    })
                } catch (m) {}
        }
        function P(t) {
            if (H.isOptionSet(i.staticIframe))
                try {
                    e.frameElement.setAttribute("height", t)
                } catch (a) {}
        }
        function F(n, r, d) {
            var l, s = r.getParam("rndrSize").split("x"), m = r.getParam("crid"), c = a[m].iframeURL;
            o(),
            P(s[1]);
            var g = (new H.CreateFrame).set("marginWidth", 0).set("marginHeight", 0).set("scrolling", "no").set("frameBorder", 0).set("height", s[1]).set("width", s[0]).set("id", Q).set("src", c);
            if (H.isStringSet(i._ifrT) && g.set("title", i._ifrT),
            l = g.done(),
            t.getElementsByTagName("body")[0].appendChild(l),
            k(n, Q),
            H.queryDOM("#" + Q))
                try {
                    a.triggerAdTagEvent(n.getEntity("vi"), "VIMP::Detect", !0, {
                        targetElement: e.frameID,
                        observerScope: e
                    })
                } catch (u) {}
        }
        function M(e, t, i) {
            var a, n, r = t.getParam("rndrSize").split("x"), d = e.getEntity("placeholderID");
            o(),
            a = (new H.CreateFrame).set("marginWidth", 0).set("marginHeight", 0).set("scrolling", "no").set("frameBorder", 0).set("height", r[1]).set("width", r[0]).set("id", Q).overrideStyle("display:none !important;").done(),
            n = H.queryDOM("#" + d),
            n && (n.appendChild(a),
            f(t, e.uid),
            k(e, Q + "_n"))
        }
        function U(e, t, i) {
            H.triggerAdTagEvent(e.uid, "loadL3JTag", !1)
        }
        function x() {
            return i.ntv && 1 == i.ntv
        }
        function B(e) {
            a.triggerAdTagEvent(e, "hideAdFrames", !0, {
                viewId: e,
                type: "L2",
                L2: "1"
            })
        }
        function O(e, t, i) {
            var a, n = e.entities, o = e.adScope, l = e.adScope.uid;
            switch (y("_mN_dy_" + l) && (t.srcUrlParams += "&ntv=1"),
            r(t, n),
            d(o)) {
            case "JTAG":
                a = U;
                break;
            case "INSL":
                a = D;
                break;
            case "AWIF":
                a = M;
                break;
            case "NB":
                a = A;
                break;
            case "SN":
                a = b;
                break;
            case "BL":
                a = C;
                break;
            case "BLASYNC":
                a = F;
                break;
            default:
                a = function() {}
            }
            return H.triggerAdTagEvent(l, "beforeLoad", !1),
            o.getEntity("disableL3") ? void B(o.getEntity("vi")) : (a.call(null, o, n, t),
            void H.triggerAdTagEvent(l, "afterLoad", !1))
        }
        function W(e, t) {
            var i = e.adScope.uid;
            return I(e.entities, i),
            e.adScope.getEntity("disableL3") ? void B(e.adScope.getEntity("vi")) : void (x() && c(a["_mN_dy_" + i].winProv) ? a.addToEventQueue("bidDone", i, H.getProxy(O, [e, t])) : O(e, t))
        }
        function k(e, t) {
            var i = e.getEntity("vi");
            a[i].L3frameId = t
        }
        function z(e) {
            H.addToEventQueue("loadTag", e.adScope.uid, W)
        }
        var Q, R, j, V, H = i.util, Y = H.getAdTagUID();
        H.addToEventQueue("load::Renderer", Y, z),
        H.resolveModuleLoad(Y)
    }(window, document, _mNL2, _mNDetails);