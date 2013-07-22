(function () {
    function a(f) {
        this.url = [];
        this.init(f)
    }
    var d, b, e, g, j, l, p, o, s, v, w = "3.0.2";
    if (typeof t == "undefined") var t = 1;
    a.prototype = {
        init: function (f) {
            f ? g = f : g = {};
            d = document;
            if (!g.statIframe && window != top) try {
                d = top.document
            } catch (a) {}
            b = d.location;
            e = d.body
        },
        run: function () {
            var f, a, b;
            f = (new Date).getTime();
            m.init();
            this.url.push(this.getDomainInfo());
            this.url.unshift("http://pingfore." + p + "/pingd?");
            this.url.push(this.getRefInfo(g));
            try {
                navigator.cookieEnabled ? this.url.push("&pvid=" + m.setCookie("pgv_pvid", !0)) : this.url.push("&pvid=NoCookie")
            } catch (d) {
                this.url.push("&pvid=NoCookie")
            }
            this.url.push(this.getMainEnvInfo());
            this.url.push(this.getExtendEnvInfo());
            this.url.push("&vs=" + w);
            g.userDefineVariable ? this.url.push(r.setv(g.userDefineVariable)) : this.url.push(r.setv());
            m.setCookie("ssid");
            m.save();
            g.originalReferer && this.url.push("&or=" + g.originalReferer);
            a = (new Date).getTime();
            g.extParam ? b = g.extParam + "|" : b = "";
            this.url.push("&ext=" + escape(b + (a - f)));
            this.url.push("&reserved1=" + escape(g.reserved1Param ||
                ""));
            this.url.push("&rand=" + Math.round(Math.random() * 1E5));
            this.sendInfo(this.url.join(""));
            g.hot && (document.attachEvent ? document.attachEvent("onclick", this.watchClick) : document.addEventListener("click", this.watchClick, !1));
            g.repeatApplay && g.repeatApplay == "true" && typeof t != "undefined" && (t = 1)
        },
        getDomainInfo: function (f) {
            var a;
            j = g.virtualDomain || b.host;
            a = j.toLowerCase();
            p || (p = this.getCookieSetDomain());
            f && (f = a.indexOf(":"), f > -1 ? a = a.substr(0, f) + ".hot" + a.substr(f) : a += ".hot");
            f = this.getCurrentUrl();
            return "dm=" +
                a + "&url=" + f
        },
        getCurrentUrl: function () {
            var f = "",
                a = "-";
            if (g.virtualURL) f = g.virtualURL;
            else if (f = l = escape(b.pathname), b.search != "" && (a = escape(b.search.substr(1))), g.senseParam) {
                var e = this.getParameter(g.senseParam, d.URL);
                e && (f += "_" + e)
            }
            return f + "&arg=" + a
        },
        getRefInfo: function (f) {
            var a = "-",
                e = "-",
                r = "-",
                c = d.referrer,
                h, g = f.virtualDomain ? f.virtualDomain : "-",
                x = f.virtualURL ? f.virtualURL : "-";
            o = f.virtualRefDomain ? f.virtualRefDomain : "";
            s = f.virtualRefURL ? f.virtualRefURL : "";
            f.statIframe || f.useCookie == "true" ? (c = m.get("pgvReferrer"),
                h = d.URL, g = h.indexOf("?"), g > -1 && (h = h.substr(0, g)), m.set("pgvReferrer", h)) : f.useCookie == "set" && o != "" && s != "" ? (h = "https:" == b.protocol ? "https://" : "http://", h += o + refUrl, m.set("pgvReferrer", h)) : f.useCookie == "set" && (g != "-" || x != "-") ? (h = "https:" == b.protocol ? "https://" : "http://", h += g == "-" ? j : g, h += x == "-" ? l : x, m.set("pgvReferrer", h)) : (f.useCookie == "get" && (h = m.get("pgvReferrer"), h != "" && (c = h)), m.set("pgvReferrer", ""));
            if (h = this.getParameter(f.tagParamName || "ADTAG", d.URL)) a = "ADTAG", e = h;
            h = c.indexOf("://");
            if (h > -1 &&
                a == "-" && (h = c.match(/(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i))) a = h[2], e = h[4] + h[5];
            c.indexOf("?") != -1 && (h = c.indexOf("?") + 1, r = c.substr(h));
            o != "" && f.useCookie == "false" && (a = o);
            s != "" && f.useCookie == "false" && (e = s);
            o = a;
            s = escape(e);
            return "&rdm=" + o + "&rurl=" + s + "&rarg=" + escape(r)
        },
        getMainEnvInfo: function () {
            var f = "";
            try {
                var a = "-",
                    b = "-",
                    d = "-",
                    c = "-",
                    e = "-",
                    m = "-",
                    r = 0,
                    z = navigator;
                self.screen && (a = screen.width + "x" + screen.height, b = screen.colorDepth + "-bit");
                z.language ? d = z.language.toLowerCase() :
                    z.browserLanguage && (d = z.browserLanguage.toLowerCase());
                r = z.javaEnabled() ? 1 : 0;
                c = z.cpuClass;
                e = z.platform;
                m = (new Date).getTimezoneOffset() / 60;
                f = "&scr=" + a + "&scl=" + b + "&lang=" + d + "&java=" + r + "&cc=" + c + "&pf=" + e + "&tz=" + m
            } catch (y) {} finally {
                return f
            }
        },
        getExtendEnvInfo: function () {
            var f = "";
            try {
                var a = b.href,
                    d = "-";
                f += "&flash=" + this.getFlashInfo();
                e.addBehavior && (e.addBehavior("#default#homePage"), e.isHomePage(a) && (f += "&hp=Y"));
                if (e.addBehavior) e.addBehavior("#default#clientCaps"), d = e.connectionType;
                f += "&ct=" + d
            } catch (m) {} finally {
                return f
            }
        },
        getFlashInfo: function () {
            var f = "-",
                a = navigator;
            try {
                if (a.plugins && a.plugins.length)
                    for (var b = 0; b < a.plugins.length; b++) {
                        if (a.plugins[b].name.indexOf("Shockwave Flash") > -1) {
                            f = a.plugins[b].description.split("Shockwave Flash ")[1];
                            break
                        }
                    } else if (window.ActiveXObject)
                        for (b = 12; b >= 5; b--) try {
                            if (eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + b + "');")) {
                                f = b + ".0";
                                break
                            }
                        } catch (d) {}
            } catch (c) {}
            return f
        },
        getParameter: function (f, a) {
            if (f && a) {
                var b = a.match(RegExp("(\\?|#|&)" + f + "=([^&^#]*)(#|&|$)"));
                return b ?
                    b[2] : ""
            }
            return ""
        },
        getCookieSetDomain: function () {
            var f, a, b = [];
            for (a = f = 0; a < j.length; a++) j.charAt(a) == "." && (b[f] = a, f++);
            f = b.length;
            j.indexOf(".cn") > -1 && f--;
            a = "qq.com";
            f == 1 ? a = j : f > 1 && (a = j.substring(b[f - 2] + 1));
            return a
        },
        watchClick: function (f) {
            try {
                var b = !0,
                    d = "",
                    e;
                e = f.target || window.event.srcElement;
                switch (e.tagName) {
                case "A":
                    d = "<A href=" + e.href + ">" + e.innerHTML + "</a>";
                    break;
                case "IMG":
                    d = "<IMG src=" + e.src + ">";
                    break;
                case "INPUT":
                    d = "<INPUT type=" + e.type + " value=" + e.value + ">";
                    break;
                case "BUTTON":
                    d = "<BUTTON>" +
                        e.innerText + "</BUTTON>";
                    break;
                case "SELECT":
                    d = "SELECT";
                    break;
                default:
                    b = !1
                }
                if (b) {
                    var c = new a(g),
                        h = c.getElementPos(e);
                    if (g.coordinateId) {
                        var m = c.getElementPos(document.getElementById(g.coordinateId));
                        h.x -= m.x
                    }
                    c.url.push(c.getDomainInfo(!0));
                    c.url.push("&hottag=" + escape(d));
                    c.url.push("&hotx=" + h.x);
                    c.url.push("&hoty=" + h.y);
                    c.url.push("&rand=" + Math.round(Math.random() * 1E5));
                    c.url.unshift("http://pinghot." + p + "/pingd?");
                    c.sendInfo(c.url.join(""))
                }
            } catch (r) {}
        },
        getElementPos: function (f) {
            if (f.parentNode ===
                null || f.style.display == "none") return !1;
            var a = navigator.userAgent.toLowerCase(),
                b = null,
                d = [];
            if (f.getBoundingClientRect) return a = f.getBoundingClientRect(), {
                x: a.left + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) - document.body.clientLeft,
                y: a.top + Math.max(document.documentElement.scrollTop, document.body.scrollTop) - document.body.clientTop
            };
            else if (document.getBoxObjectFor) a = document.getBoxObjectFor(f), d = [a.x - (f.style.borderLeftWidth ? Math.floor(f.style.borderLeftWidth) : 0), a.y - (f.style.borderTopWidth ?
                Math.floor(f.style.borderTopWidth) : 0)];
            else {
                d = [f.offsetLeft, f.offsetTop];
                b = f.offsetParent;
                if (b != f)
                    for (; b;) d[0] += b.offsetLeft, d[1] += b.offsetTop, b = b.offsetParent;
                if (a.indexOf("opera") > -1 || a.indexOf("safari") > -1 && f.style.position == "absolute") d[0] -= document.body.offsetLeft, d[1] -= document.body.offsetTop
            }
            for (b = f.parentNode ? f.parentNode : null; b && b.tagName != "BODY" && b.tagName != "HTML";) d[0] -= b.scrollLeft, d[1] -= b.scrollTop, b = b.parentNode ? b.parentNode : null;
            return {
                x: d[0],
                y: d[1]
            }
        },
        sendClick: function () {
            g.hottag &&
                (this.url.push(this.getDomainInfo(!0)), this.url.push("&hottag=" + escape(g.hottag)), this.url.push("&hotx=9999&hoty=9999"), this.url.push("&rand=" + Math.round(Math.random() * 1E5)), this.url.unshift("http://pinghot." + p + "/pingd?"), this.sendInfo(this.url.join("")))
        },
        sendInfo: function (f) {
            v = new Image(1, 1);
            v.src = f
        }
    };
    var r = {
        vscope: {
            page: 3,
            session: 2,
            user: 1
        },
        setv: function (f) {
            var a = "",
                a = "";
            if (!f || !f.name || f.name == "" || !f.value || f.value == "" || !f.scope || f.scope < 1 || f.scope > 3) a = m.get("custvar=") == "-" ? m.get("custvar=", !0) :
                m.get("custvar=");
            else switch (a = f.name + ":" + f.value, f.scope) {
            case this.vscope.session:
                m.setCookie("custvar", !1, a);
                break;
            case this.vscope.user:
                m.setCookie("custvar", !0, a)
            }
            return "&custvar=" + a
        }
    }, m = {
            sck: [],
            sco: {},
            init: function () {
                var f = this.get("pgv_info=", !0);
                if (f != "-")
                    for (var f = f.split("&"), a = 0; a < f.length; a++) {
                        var b = f[a].split("=");
                        this.set(b[0], unescape(b[1]))
                    }
            },
            get: function (f, a) {
                var b = a ? d.cookie : this.get("pgv_info=", !0),
                    e = "-",
                    c;
                c = b.indexOf(f);
                if (c > -1) {
                    c += f.length;
                    e = b.indexOf(";", c);
                    if (e == -1) e = b.length;
                    if (!a) {
                        var h = b.indexOf("&", c);
                        h > -1 && (e = Math.min(e, h))
                    }
                    e = b.substring(c, e)
                }
                return e
            },
            set: function (f, a) {
                this.sco[f] = a;
                for (var b = !1, d = this.sck.length, c = 0; c < d; c++)
                    if (f == this.sck[c]) {
                        b = !0;
                        break
                    }
                b || this.sck.push(f)
            },
            setCookie: function (a, b, d) {
                var e = m.get(a + "=", b);
                e == "-" && !d ? (b ? e = "" : e = "s", d = (new Date).getUTCMilliseconds(), e += Math.round(Math.abs(Math.random() - 1) * 2147483647) * d % 1E10) : e = d ? d : e;
                b ? this.saveCookie(a + "=" + e, "expires=Sun, 18 Jan 2038 00:00:00 GMT;") : this.set(a, e);
                return e
            },
            save: function () {
                if (g.sessionSpan) {
                    var a =
                        new Date;
                    a.setTime(a.getTime() + g.sessionSpan * 6E4)
                }
                for (var b = "", d = this.sck.length, e = 0; e < d; e++) b += this.sck[e] + "=" + this.sco[this.sck[e]] + "&";
                b = "pgv_info=" + b.substr(0, b.length - 1);
                d = "";
                a && (d = "expires=" + a.toGMTString());
                this.saveCookie(b, d)
            },
            saveCookie: function (a, b) {
                d.cookie = a + ";path=/;domain=" + p + ";" + b
            }
        };
    window.pgvMain = function (f, b) {
        var d = "";
        b ? (d = b, w = "o3.0.2") : (d = f, w = "3.0.2");
        try {
            t == 1 && (t = 2, (new a(d)).run())
        } catch (e) {}
    };
    window.pgvSendClick = function (f) {
        (new a(f)).sendClick()
    };
    window.pgvWatchClick = function (f) {
        (new a(f)).watchClick()
    }
})();
Jx().$package("alloy.flashUploadManager", function (a) {
    function d() {
        var a;
        if (typeof ActiveXObject != "undefined") try {
            new ActiveXObject("ShockwaveFlash.ShockwaveFlash.10")
        } catch (f) {
            return !1
        } else if (a = navigator.plugins["Shockwave Flash"]) {
            if (a = a.description.match(/(?:\d+\.)*\d+/), !a || +a[0].split(".")[0] < 10) return !1
        } else return !1;
        return !0
    }

    function b(a, f) {
        a._verifiedBytes = a.fileSize;
        n(A.FINISH_LOCAL_VERIFY, a);
        a.folderId == -2 ? (a.directUpload = 1, alloy.storage.createFile(a, f)) : alloy.desktopFile.createFile(a, f)
    }

    function e(a, f, b) {
        f.status = b;
        delete H[f.fileId];
        n(a, f);
        p()
    }

    function g(a) {
        var f = 0,
            b = H,
            c;
        for (c in b) b[c].status == x.UPLOADING && b[c].via == a && f++;
        return f
    }

    function j(a, c) {
        if (c) {
            a.status = x.UPLOADING;
            H[a.fileId] = a;
            a.startTime = +new Date;
            var d = m.id(a.flashInstanceId);
            d && (d.uploadFile(a._info.flashId, c, {
                mode: "flashupload"
            }), n(A.START_UPLOAD, a))
        } else b(a, function (b) {
            var c = alloy.iconFactory.getIcons(b.id, alloy.fileSystem.FILE_TYPE.FILE);
            i = 0;
            for (len = c.length; i < len; i++) i != 0 && icon.hideUploadBar();
            J[a.fileId] = c[0];
            I[a.fileId] = b;
            f.addObserver(c[0], "cancle", function () {
                var f = m.id(a.flashInstanceId);
                f && f.cancleUpload(a._info.flashId)
            });
            j(a, b.post_url)
        })
    }

    function l() {
        for (var a = Array.prototype.slice.call(arguments), f = 0, b = a.length; f < b; f++) B.push(a[f]), n(A.ADDED_TO_QUEUE, F[a[f]]);
        p()
    }

    function p() {
        var a, f;
        a = B.shift();
        if ((a = F[a]) && !H[a.fileId]) {
            f = g(a.via);
            switch (a.via) {
            case "FLASH":
                if (f >= u.flashConcurrency) {
                    B.unshift(a.fileId);
                    return
                }
                j(a);
                break;
            case "PLUGIN":
                if (f >= u.pluginConcurrency) {
                    B.unshift(a.fileId);
                    return
                }
                _uploadViaPlugin(a)
            }
            p()
        }
    }

    function o() {
        var a = 0,
            f;
        for (f in H) a += H[f].fileSize;
        f = 0;
        for (var b = B.length; f < b; f++) a += F[B[f]].fileSize;
        return a
    }

    function s(a) {
        var f = Math.min(u.singleSizeLimit, a.via == "PLUGIN" ? h : c);
        if (a.fileName.replace(/[^\x00-\xff]/g, "xx").length > D) return a.status = x.FAIL_VERIFY, n(A.FILE_NAME_LENGTH_EXCEED_LIMIT, a, D), 1;
        else if (a.fileSize > f) return a.status = x.FAIL_VERIFY, n(A.FILE_SIZE_EXCEED_SINGLE_LIMIT, a, f), 1;
        else if (a.fileSize === 0) return a.status = x.FAIL_VERIFY, n(A.FILE_SIZE_ZERO, a), 1;
        return 0
    }

    function v(a, f, b) {
        var c,
            d, e, k, h;
        if (!f || !f.length) return 1;
        c = e = 0;
        for (d = f.length; c < d; c++) e += +f[c].size;
        c = f.length;
        d = e;
        e = u.selectionLimit;
        if (k = u.totalUploadLimit) {
            k = 0;
            for (h in H) k++;
            k += B.length;
            k = c + k > u.totalUploadLimit
        }
        k ? (n(A.EXCEED_MAX_UPLOAD, u.totalUploadLimit), c = 1) : c > e ? (n(A.EXCEED_MAX_SELECTION, c, e), c = 1) : u.totalSizeLimit && d + o() > u.totalSizeLimit ? (n(A.FILE_SIZE_EXCEED_TOTAL_LIMIT, d + o(), u.totalSizeLimit), c = 1) : c = 0;
        if (c !== 0) return 1;
        h = [];
        c = 0;
        for (d = f.length; c < d; c++) {
            k = f[c].name;
            fileSize = +f[c].size;
            e = a;
            var m = fileSize;
            e = {
                _uin: u.uin,
                _verifiedBytes: 0,
                _uploadedBytes: 0,
                index: y++,
                type: e ? e : 0,
                via: "FLASH",
                status: x.INIT,
                fileId: +(Math.round(Math.random() * 1E4).toString() + (new Date).getMilliseconds()),
                localPath: k,
                fileName: k.split("\\").pop(),
                fileSize: m,
                startTime: 0,
                _info: {}
            };
            if (F[void 0]) e.fileId = void 0;
            F[e.fileId] = e;
            if (s(e) === 0) h.push(e.fileId), e._info.flashId = f[c].id, e.flashInstanceId = f[c].flashInstanceId, e.folderId = b.folderId, Q[f[c].id] = e.fileId
        }
        l.apply(this, h);
        return 0
    }

    function w() {
        g("FLASH") > 0 ? alloy.system.setCloseHookMessage("\u6b63\u5728\u4e0a\u4f20\u6587\u4ef6\uff0c\u60a8\u786e\u5b9a\u8981\u79bb\u5f00\u201cWebQQ\u201d\u5417\uff1f") :
            alloy.system.setCloseHookMessage("\u60a8\u786e\u5b9a\u8981\u79bb\u5f00\u201cWebQQ\u201d\u5417\uff1f")
    }

    function t(a, f, b) {
        switch (a) {
        case A.UPDATE_UPLOAD:
            (a = J[f.fileId]) && a.uploadProcess(b);
            break;
        case A.FILE_SIZE_EXCEED_SINGLE_LIMIT:
            alloy.layout.alert("\u76ee\u524d\u4ec5\u652f\u6301\u4e0a\u4f20\u5c0f\u4e8e100M\u7684\u6587\u4ef6\uff01");
            break;
        case A.FILE_SIZE_ZERO:
            alloy.layout.alert("\u6587\u4ef6\u5927\u5c0f\u4e0d\u80fd\u4e3a0\uff01");
            break;
        case A.FILE_SIZE_EXCEED_TOTAL_LIMIT:
            alloy.layout.alert("\u6587\u4ef6\u540d\u957f\u5ea6\u8d85\u8fc7\u4e86\u6700\u5927\u9650\u5236\uff01");
            break;
        case A.FAIL_UPLOAD:
            (a = J[f.fileId]) && a.uploadFailed()
        }
    }

    function r() {
        if (document.body.fireEvent) document.body.fireEvent("onclick", a);
        else if (document.createEvent) {
            var a = document.createEvent("MouseEvents");
            a.initEvent("click", !0, !0);
            document.body.dispatchEvent(a)
        }
    }
    var m = a.dom,
        f = a.event,
        k = this,
        q = 0;
    k.FlashUploader = new a.Class({
        isReady: !1,
        init: function (b) {
            b = b || {};
            b.callback = b.callback || function () {};
            b.holder = b.holder || null;
            b.width = a.isUndefined(b.width) ? "1px" : b.width;
            b.height = a.isUndefined(b.height) ?
                "1px" : b.height;
            b.mode = a.isUndefined(b.mode) ? 0 : b.mode;
            b.autoshow = a.isUndefined(b.autoshow) ? !0 : b.autoshow;
            b.text = b.text || "";
            b.extInfo = b.extInfo || "";
            var c = this;
            if (this.flash) return 0;
            var d = ++q;
            if (!b.holder) {
                var e = m.node("div", {
                    id: "Alloy_Flash_Upload_" + d,
                    "class": "Alloy_Flash_Upload"
                });
                document.body.appendChild(e);
                b.holder = m.id("Alloy_Flash_Upload_" + d)
            }
            var e = typeof ActiveXObject != "undefined",
                k = alloy.CONST.MAIN_URL + "swf/FileUploader.swf?preventSwfCache=" + (new Date).getTime(),
                h = "";
            b.extInfo && (h = "&extInfo=" +
                b.extInfo);
            this.flashId = "swfFileUploader_" + d;
            this.wrapperNode = m.node("div", {
                id: "swfFileUploaderWrapper_" + d,
                style: "position:absolute;top:0;left:0;overflow:hidden;width:" + b.width + ";height:" + b.height + ";"
            });
            this.wrapperNode.innerHTML = ['<object id="' + this.flashId + '"' + (e ? "" : ' data="' + k + '"') + ' width="' + b.width + '" height="' + b.height + '" ' + (e ? 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' : 'type="application/x-shockwave-flash"') + ">", e ? '<param name="movie" value="' + k + '"/>' : "", '<param name="allowScriptAccess" value="always" /><param name="allownetworking" value="all" /><param name="wmode" value="transparent" />',
                '<param name="flashVars" value=\'callback=' + b.callback + "&flashInstanceId=" + this.flashId + "&selectionMode=" + (b.mode === 1 ? 1 : 0) + h + "' />", '<param name="menu" value="false" /></object>'
            ].join("");
            b.holder.innerHTML = "";
            b.holder.appendChild(this.wrapperNode);
            this.divNode = m.node("div", {
                id: "swfFileUploaderDiv_" + d,
                style: "_background:url(" + alloy.CONST.CDN_URL_0 + "style/images/transparent.gif);width:" + b.width + ";height:" + b.height + ";"
            });
            this.divNode.innerHTML = b.text;
            b.holder.appendChild(this.divNode);
            this.holder =
                b.holder;
            c = this;
            f.on(this.divNode, "click", function (a) {
                a.preventDefault();
                alloy.flashUploadManager.checkBeforeUpload()
            });
            setTimeout(function () {
                c.flash = document.getElementById(c.flashId)
            }, 0);
            this.option = b;
            b.autoshow || this.hideFileSelector();
            this.isReady = !0;
            return 0
        },
        showFileSelector: function () {
            a.platform.iPad ? (m.setStyle(this.wrapperNode, "width", "1px"), m.setStyle(this.wrapperNode, "height", "1px"), m.setStyle(this.divNode, "color", "#999")) : (m.setStyle(this.wrapperNode, "width", this.option.width), m.setStyle(this.wrapperNode,
                "height", this.option.height));
            this.isFileSelectorShow = !0
        },
        hideFileSelector: function () {
            m.setStyle(this.wrapperNode, "width", "1px");
            m.setStyle(this.wrapperNode, "height", "1px");
            this.isFileSelectorShow = !1
        }
    });
    var D = 260,
        c = 157286399,
        h = 1073741823,
        A = {
            EXCEED_MAX_SELECTION: 1,
            EXCEED_MAX_UPLOAD: 2,
            FILE_POSTFIX_NOT_ALLOWED: 3,
            FILE_NAME_LENGTH_EXCEED_LIMIT: 4,
            FILE_SIZE_EXCEED_SINGLE_LIMIT: 5,
            FILE_SIZE_ZERO: 6,
            FILE_SIZE_EXCEED_TOTAL_LIMIT: 7,
            ADDED_TO_QUEUE: 8,
            START_LOCAL_VERIFY: 9,
            UPDATE_LOCAL_VERIFY: 10,
            FINISH_LOCAL_VERIFY: 11,
            FAIL_LOCAL_VERIFY: 12,
            FAIL_CREATE: 13,
            START_UPLOAD: 14,
            UPDATE_UPLOAD: 15,
            FINISH_UPLOAD: 16,
            FAIL_UPLOAD: 17,
            NOT_LOGIN: 18,
            NO_PRIVILEDGE: 19,
            SPACE_FULL: 20,
            BAD_WORDS: 21,
            CANCEL_UPLOAD: 22,
            REMOVE_FILE: 23,
            STORAGE_FULL: 24,
            NONE: 0
        };
    (function () {
        var a = {}, f;
        for (f in A) a[A[f]] = f;
        return a
    })();
    var x = {
        INIT: 0,
        UPLOADING: 1,
        FINISHED: 2,
        FAIL_VERIFY: 3,
        FAIL_CREATE: 4,
        FAIL_UPLOAD: 5,
        CANCELLED: 6
    }, z, y = 0,
        u = {
            postfixWhiteList: {
                "7z": 1,
                avi: 1,
                bmp: 1,
                doc: 1,
                docx: 1,
                flv: 1,
                swf: 1,
                jpg: 1,
                jpeg: 1,
                mov: 1,
                mp3: 1,
                pdf: 1,
                png: 1,
                ppt: 1,
                pptx: 1,
                rar: 1,
                rm: 1,
                rmvb: 1,
                rtf: 1,
                tif: 1,
                tiff: 1,
                txt: 1,
                wav: 1,
                wave: 1,
                wma: 1,
                wmv: 1,
                wps: 1,
                xls: 1,
                xlsx: 1,
                zip: 1
            }
        }, n = function () {}, B = [],
        F = {}, H = {}, Q = {}, J = {}, I = {};
    k.flashEventListener = function (b, c, d) {
        var h = F[Q[c && c.id]],
            m, b = parseInt(b);
        d && (d = a.json.parse(d));
        switch (b) {
        case 1:
            v(1, c, d);
            r();
            qqweb.util.report2qqweb("add|desktop|adddocument");
            break;
        case 11:
            r();
            break;
        case 3:
            if (h._uploadedBytes == c.processed) return;
            h._uploadedBytes = c.processed;
            n(A.UPDATE_UPLOAD, h, {
                processed: c.processed,
                fileSize: h.fileSize
            });
            break;
        case 4:
            d = !1;
            b = I[h.fileId];
            if ((m =
                c.res.match(/ftn_post_end\((\-?\d+)\)/)) && parseInt(m[1]) === 0) d = !0;
            else if (m = c.res.indexOf('"code":"ok"'), m >= 0) d = !0, c = a.json.parse(c.res), b.ks_fileid = c.fileId, f.notifyObservers(k, "FileUploadComplete", b);
            if (d) {
                var z = J[h.fileId];
                h.directUpload ? z && z.uploadSuccess() : (d = {}, c = {}, b.cur_size = b.size, d.obj = b, c.data = d, c.onSuccess = function (a) {
                        if (a.retcode == 0 && a.result && a.result.code == 0) h.serverPath = h._info.file_path, h._uploadedBytes = h.fileSize, h.status = x.FINISHED, n(A.FINISH_UPLOAD, h), p(), w(), z && z.uploadSuccess()
                    },
                    alloy.fileSystem.sendUpdateProgress(c))
            } else e(A.FAIL_UPLOAD, h, x.FAIL_UPLOAD), alloy.layout.alert("\u4f20\u8f93\u6587\u4ef6\u6570\u636e\u5230\u5b58\u50a8\u786c\u76d8\u5931\u8d25\uff01");
            break;
        case 5:
            e(A.FAIL_UPLOAD, h, x.FAIL_UPLOAD);
            break;
        case 6:
            console.log("cancle")
        }
        w()
    };
    k.showUploadMask = function () {
        z || (z = new a.ui.MaskLayer({
            zIndex: alloy.layout.getTopZIndex(4),
            appendTo: document.body
        }), f.on(z.getElement(), "click", function (a) {
            a.preventDefault();
            a.stopPropagation()
        }));
        z.setOpacity(0.01);
        z.show()
    };
    k.hideUploadMask =
        function () {
            z && z.hide()
    };
    k.checkBeforeUpload = function () {
        if (a.platform.iPad) alloy.layout.alert("\u60a8\u5f53\u524d\u4f7f\u7528\u7684\u5e73\u53f0\u6682\u4e0d\u652f\u6301\u8be5\u529f\u80fd\uff01");
        else if (d()) alloy.system.getLoginLevel() < 2 ? alloy.layout.showLoginWindow("") : alloy.storage.getDefaultDisk() || (b = alloy.layout.confirm('<div class="bindDiskAlert">\u60a8\u8fd8\u672a\u7ed1\u5b9a\u4efb\u4f55\u786c\u76d8\uff0c\u7ed1\u5b9a\u540e\u6700\u591a\u53ef\u83b7\u5f9715GB\u7684Q+ Web\u5b58\u50a8\u7a7a\u95f4\u3002</div>',
            function () {
                alloy.portal.runApp("diskExplorer")
            }, {
                height: "70"
            }), b.getButton("ok").setText("\u7ed1\u5b9a"));
        else {
            var b = alloy.layout.confirm('<div class="flashInstallAlert">\u9700\u8981\u5b89\u88c5<a href="http://get.adobe.com/cn/flashplayer/" target="_blank">Flash Player</a>\u624d\u80fd\u4e0a\u4f20\u6587\u4ef6\u3002</div>', function () {
                window.open("http://get.adobe.com/cn/flashplayer/", "_blank")
            });
            b.getButton("ok").setText("\u4e0b\u8f7d")
        }
    };
    k.upload = j;
    this.init = function () {
        var a = {
            uin: alloy.portal.getCookieUin(),
            listener: t
        }, b;
        for (b in a) u[b] = a[b];
        u.uin = +u.uin;
        u.port = u.port || 80;
        u.selectionLimit = u.selectionLimit || 12;
        u.singleSizeLimit = u.singleSizeLimit || h;
        u.flashConcurrency = u.flashConcurrency || 10;
        n = u.listener || n
    }
});
Jet().$package(function (a) {
    var d = a.dom,
        b = a.event,
        e = 0,
        g = 0,
        j = {}, l = {}, p = function (a) {
            a.preventDefault();
            a.stopPropagation()
        }, o = a.ui.ContextMenu = new a.Class({
            init: function (r) {
                var m = this,
                    f = this.id = "context_menu_" + (r.id || e++),
                    k = r.name || f,
                    q = this._parent = r.container || (r.parentMenu ? r.parentMenu._parent : null) || document.body,
                    g = r.className || "";
                this.parentMenu = r.parentMenu;
                var m = this,
                    c = this._el = d.id(f) || d.node("div", {
                        id: f,
                        "class": "context_menu",
                        style: "display: none;"
                    }),
                    g = '<div class="context_menu_container "' +
                        g + '"><ul id="' + f + '_body" class="context_menu_item_list"></ul></div>';
                a.browser.ie && (g += '<iframe class="context_menu_iframe" src="' + alloy.CONST.MAIN_URL + 'domain.html"></iframe>');
                c.innerHTML = g;
                q.appendChild(c);
                r.width && d.setStyle(c, "width", r.width + "px");
                this._body = d.id(f + "_body");
                b.off(c, "contextmenu");
                b.on(c, "contextmenu", p);
                var h = function () {
                    m.isShow() && m.hide()
                };
                b.addObserver(document, "beforeStart", h);
                b.addObserver(this, "Beforedestroy", function () {
                    b.removeObserver(document, "beforeStart", h)
                });
                this._popupBox =
                    new a.ui.PopupBox({
                        id: f,
                        name: k,
                        noCatchMouseUp: !0,
                        parentPopupBox: this.parentMenu ? this.parentMenu._popupBox : null,
                        container: c
                    });
                b.addObserver(this._popupBox, "hide", function () {
                    m.hideSubmenu();
                    b.notifyObservers(m, "onHide")
                });
                this.setZIndex(9E6);
                this._itemArr = [];
                this._key2Item = {};
                if (r.items) this._items_config = r.items, this.addItems(r.items);
                if (r.triggers) {
                    k = r.triggerEvent || "contextmenu";
                    q = function (a) {
                        a.preventDefault();
                        m.show(a.clientX, a.clientY)
                    };
                    for (c = 0; g = r.triggers[c]; c++) b.on(g, k, q)
                }
                r.beforeShow && b.addObserver(this,
                    "BeforeShow", r.beforeShow);
                j[f] = this;
                r.afterShow && b.addObserver(this, "onShow", r.afterShow)
            },
            getId: function () {
                return this.id
            },
            setClass: function (a) {
                d.setClass(this._el, "context_menu " + a)
            },
            setStyle: function (a, b) {
                d.setStyle(this._el, a, b)
            },
            addItem: function (a) {
                var b = a.type || "item";
                a.parentMenu = this;
                switch (b) {
                case "item":
                    a = new s(a);
                    break;
                case "flash":
                    a = new v(a);
                    break;
                case "separator":
                    a = new w(a);
                    break;
                case "submenu":
                    a.parentMenu = this;
                    a = new t(a);
                    break;
                default:
                    a = null
                }
                a && (this._body.appendChild(a.getElement()),
                    this._itemArr.push(a))
            },
            addItems: function (a) {
                for (var b = 0, f = a.length; b < f; b++) this.addItem(a[b])
            },
            refresh: function () {
                this._items_config && (this.clearItems(), this.addItems(this._items_config))
            },
            clearItems: function () {
                for (var a = this._itemArr.shift(); a;) a.destroy(), a = this._itemArr.shift()
            },
            removeItemAt: function (a) {
                for (var b = 0; b < this._itemArr.length; b++) {
                    var f = this._itemArr[b];
                    a == b && f && (f.destroy(), this._itemArr.splice(b, 1))
                }
            },
            getItemAt: function (a) {
                return a < this._itemArr.length ? (a < 0 && (a = this._itemArr.length +
                    a), this._itemArr[a]) : null
            },
            getElement: function () {
                return this._el
            },
            getBody: function () {
                return this._body
            },
            setZIndex: function (a) {
                this._popupBox.setZIndex(a)
            },
            getZIndex: function () {
                return this._popupBox.getZIndex()
            },
            setArgument: function (a) {
                this._argument = a
            },
            getArgument: function () {
                return this._argument
            },
            show: function (e, m, f, k) {
                b.notifyObservers(this, "BeforeShow", this);
                var e = e || 0,
                    m = m || 0,
                    f = typeof f === "undefined" ? 5 : f,
                    q = this._popupBox,
                    g = e + f,
                    c = m + f,
                    h = 0,
                    A = 0,
                    x = a.browser.ie;
                if (k && (h = d.getOffsetWidth(k), A = d.getOffsetHeight(k),
                    g += h + 5, c -= 1, x == 9 || x == 8)) g += 2;
                q.setX("-10000");
                q.show();
                var k = d.getClientWidth(this._el),
                    z = d.getClientHeight(this._el),
                    y = d.getClientWidth(),
                    u = d.getClientHeight();
                if (g + k > y && e - k - f > 0)
                    if (h) {
                        if (g = e - k - f - 5, x == 9 || x == 8) g += 2
                    } else g = e - k - f;
                c + z > u && m - z - f > 0 && (c = A ? m - z - f + A + 1 : m - z - f);
                q.setXY(g, c);
                b.notifyObservers(this, "onShow", this)
            },
            hide: function () {
                this._popupBox.hide();
                b.notifyObservers(this, "onHide", this)
            },
            hideSubmenu: function () {
                for (var a in this._itemArr) this._itemArr[a].getSubmenu && this._itemArr[a].getSubmenu().hide()
            },
            isShow: function () {
                return this._popupBox.isShow()
            },
            destroy: function () {
                b.notifyObservers(this, "Beforedestroy", this);
                this.clearItems();
                b.off(this._el, "contextmenu");
                this._el.innerHTML = "";
                this._el.parentNode.removeChild(this._el);
                for (var a in this) this.hasOwnProperty(a) && delete this[a]
            }
        });
    o.getMenu = function (a) {
        return j[a]
    };
    var s = a.ui.ContextMenuItem = new a.Class({
        init: function (a) {
            var e = {
                title: a.title || a.text || "",
                text: a.text || "",
                link: a.link || "javascript:void(0);",
                icon: a.icon || null,
                enable: typeof a.enable === "undefined" ? !0 : a.enable,
                onClick: a.onClick || null,
                argument: a.argument
            };
            this.option = e;
            this.parentMenu = a.parentMenu;
            a = this._el = d.node("li", {
                "class": "context_menu_item_container"
            });
            this.render();
            e.enable ? this.enable() : this.disable();
            var f = this;
            b.on(a, "click", e.onClick ? function (a) {
                a.preventDefault();
                f._isEnable && e.onClick.call(this, a, f, f.parentMenu)
            } : function (a) {
                a.preventDefault()
            })
        },
        setText: function (a, b) {
            this.option.text = a;
            this.option.title = b || a;
            this.render()
        },
        setIcon: function (a) {
            this.option.icon = a;
            this.render()
        },
        render: function () {
            var a = this.option,
                b = '<a class="context_menu_item" href="' + a.link + '" title="' + a.title + '">';
            if (a.icon) {
                var f = a.icon;
                b += '<span class="context_menu_item_icon ' + (f.className || "") + '" style="' + ((f.style || "") + (f.url ? "background-image: url(" + f.url + ");" : "")) + '"></span>'
            }
            b += '<span class="context_menu_item_text">' + a.text + "</span>";
            b += "</a>";
            this._el.innerHTML = b
        },
        getElement: function () {
            return this._el
        },
        show: function () {
            d.show(this._el)
        },
        hide: function () {
            d.hide(this._el)
        },
        disable: function () {
            this._isEnable = !1;
            d.addClass(this._el, "context_menu_item_disable")
        },
        enable: function () {
            this._isEnable = !0;
            d.removeClass(this._el, "context_menu_item_disable")
        },
        destroy: function () {
            b.off(this._el, "click");
            this._el.innerHTML = "";
            this._el.parentNode.removeChild(this._el);
            for (var a in this) this.hasOwnProperty(a) && delete this[a]
        }
    }),
        v = a.ui.FlashContextMenuItem = new a.Class({
            init: function (a) {
                var e = {
                    title: a.title || a.text || "",
                    text: a.text || "",
                    link: a.link || "javascript:void(0);",
                    icon: a.icon || null,
                    enable: typeof a.enable === "undefined" ? !0 : a.enable,
                    onClick: a.onClick || null,
                    folderId: a.folderId || -1,
                    argument: a.argument
                };
                this.option = e;
                this.parentMenu = a.parentMenu;
                var a = this._el = d.node("li", {
                    "class": "context_menu_item_container"
                }),
                    f = this._flashLi = d.node("li", {
                        "class": "context_menu_item_container"
                    }),
                    k = this._itemId = "context_menu_flashItem_" + ++g,
                    k = this._flashUl = d.node("ul", {
                        id: k,
                        "class": "context_menu_item_list context_menu_flashitem_item"
                    });
                l[g] = k;
                k.appendChild(f);
                this.render();
                document.body.appendChild(k);
                e.enable ? this.enable() : this.disable();
                var q = this;
                b.on(a, "click", e.onClick ? function (a) {
                    a.preventDefault();
                    q._isEnable && e.onClick.call(this, a, q, q.parentMenu)
                } : function (a) {
                    a.preventDefault()
                });
                q = this;
                a = q.observer = {
                    onShow: function () {
                        var a = d.getClientXY(q._el);
                        d.setXY(q._flashUl, a[0] + 0 + "px", a[1] + 0 + "px");
                        d.setStyle(q._flashUl, "width", d.getClientWidth(q._el) + "px");
                        d.setStyle(q._flashUl, "height", d.getClientHeight(q._el) + "px");
                        d.setStyle(q._flashUl, "zIndex", q.parentMenu.getZIndex() + 1);
                        alloy.portal.getLoginLevel() > 1 && alloy.storage.getDefaultDisk() ?
                            q._flashUploader.showFileSelector() : q._flashUploader.hideFileSelector()
                    },
                    onHide: function () {
                        d.setXY(q._flashUl, 0, 0);
                        d.setStyle(q._flashUl, "width", "1px");
                        d.setStyle(q._flashUl, "height", "1px")
                    }
                };
                b.addObserver(this.parentMenu, "onShow", a.onShow);
                b.addObserver(this.parentMenu, "onHide", a.onHide)
            },
            setText: function () {},
            setIcon: function () {},
            render: function () {
                var a = this.option;
                this._el.innerHTML = '<a class="context_menu_item" href="' + a.link + '"></a>';
                var b = '<a class="context_menu_item" href="' + a.link + '" title="' +
                    a.title + '">';
                if (a.icon) {
                    var f = a.icon;
                    b += '<span class="context_menu_item_icon ' + (f.className || "") + '" style="' + ((f.style || "") + (f.url ? "background-image: url(" + f.url + ");" : "")) + '"></span>'
                }
                b += '<div class="explorer_upload_holder2" style="padding:0 5px"></div>';
                b += "</a>";
                this._flashLi.innerHTML = b;
                a = {
                    callback: "alloy.flashUploadManager.flashEventListener",
                    mode: 0,
                    autoshow: !1,
                    holder: d.mini(".explorer_upload_holder2", this._flashLi)[0],
                    text: '<span class="context_menu_item_text">' + a.text + "</span>",
                    width: "100%",
                    height: "100%",
                    extInfo: '{"folderId":' + this.option.folderId + "}"
                };
                this._flashUploader = new alloy.flashUploadManager.FlashUploader(a);
                d.setXY(this._flashUl, 0, 0);
                d.setStyle(this._flashUl, "width", "1px");
                d.setStyle(this._flashUl, "height", "1px")
            },
            getElement: function () {
                return this._el
            },
            show: function () {
                d.show(this._el)
            },
            hide: function () {
                d.hide(this._el)
            },
            disable: function () {
                this._isEnable = !1;
                d.addClass(this._el, "context_menu_item_disable")
            },
            enable: function () {
                this._isEnable = !0;
                d.removeClass(this._el, "context_menu_item_disable")
            },
            destroy: function () {
                this._el.innerHTML = "";
                this._flashUl.innerHTML = "";
                b.off(this._el, "click");
                b.removeObserver(this.parentMenu, "onShow", this.observer.onShow);
                b.removeObserver(this.parentMenu, "onHide", this.observer.onHide);
                this._el.parentNode.removeChild(this._el);
                this._flashUl.parentNode.removeChild(this._flashUl);
                for (var a in this) this.hasOwnProperty(a) && delete this[a]
            }
        });
    v.getItem = function (a) {
        return l[a]
    };
    var w = a.ui.ContextMenuSeparator = new a.Class({
        init: function () {
            (this._el = d.node("li", {
                "class": "context_menu_separator_container"
            })).innerHTML =
                '<span class="context_menu_separator"></span>'
        },
        getElement: function () {
            return this._el
        },
        show: function () {
            d.show(this._el)
        },
        hide: function () {
            d.hide(this._el)
        },
        destroy: function () {
            this._el.innerHTML = "";
            this._el.parentNode.removeChild(this._el);
            for (var a in this) this.hasOwnProperty(a) && delete this[a]
        }
    }),
        t = a.ui.ContextSubmenuItem = new a.Class({
            extend: s
        }, {
            init: function (e) {
                if (!e.items) throw Error("J.ui.ContextSubmenuItem: option.items is null!");
                e.title = e.title || e.text || "";
                var m = {
                    title: null,
                    text: "",
                    autoHide: !0,
                    link: "javascript:void(0);",
                    icon: null,
                    enable: !0,
                    subWidth: null,
                    parentMenu: e.parentMenu
                };
                delete e.parentMenu;
                e = this.option = a.extend(m, e);
                this.parentMenu = e.parentMenu;
                var f = this._el = d.node("li", {
                    "class": "context_menu_item_container"
                });
                this.render();
                e.enable ? this.enable() : this.disable();
                this._submenu = new o({
                    parentMenu: e.parentMenu,
                    width: e.subWidth,
                    beforeShow: e.beforeShow,
                    items: e.items
                });
                var k = this,
                    q = k.sunmenuTimer = 0,
                    g = function () {
                        k._submenu.isShow() && k._submenu.hide()
                    }, c = {
                        onItemMouseenter: function (a) {
                            a.stopPropagation();
                            k._isEnable && (a = d.getClientXY(this), k._submenu.setZIndex(k.parentMenu.getZIndex()), k._submenu.show(a[0], a[1], 0, this))
                        },
                        onItemMouseleave: function () {
                            q && (window.clearTimeout(q), q = 0);
                            q = window.setTimeout(g, 200)
                        },
                        onSubmenuMouseenter: function () {
                            q && (window.clearTimeout(q), q = 0);
                            d.addClass(f, "context_menu_item_hover")
                        },
                        onSubmenuMouseleave: function (a) {
                            c.onItemMouseleave(a)
                        },
                        onSubmenuShow: function () {
                            d.addClass(f, "context_menu_item_hover")
                        },
                        onSubmenuHide: function () {
                            d.removeClass(f, "context_menu_item_hover")
                        }
                    },
                    m = k._submenu.getElement();
                b.on(f, "mouseenter", c.onItemMouseenter);
                e.autoHide && (b.on(f, "mouseleave", c.onItemMouseleave), b.on(m, "mouseenter", c.onSubmenuMouseenter), b.on(m, "mouseleave", c.onSubmenuMouseleave));
                b.addObserver(k._submenu, "onHide", c.onSubmenuHide);
                b.on(f, "click", e.onClick ? function (a) {
                    a.preventDefault();
                    k._isEnable && (e.onClick.call(this, a, k), c.onItemMouseenter.call(this, a))
                } : function (a) {
                    a.preventDefault();
                    c.onItemMouseenter.call(this, a)
                })
            },
            getSubmenu: function () {
                return this._submenu
            },
            render: function () {
                var a =
                    this.option,
                    b = '<a class="context_menu_item" href="' + a.link + '" title="' + a.title + '">';
                if (a.icon) {
                    var f = a.icon;
                    b += '<span class="context_menu_item_icon ' + (f.className || "") + '" style="' + ((f.style || "") + (f.url ? "background-image: url(" + f.url + ");" : "")) + '"></span>'
                }
                b += '<span class="context_menu_item_text">' + a.text + '</span><span class="context_menu_item_subicon"></span></a>';
                this._el.innerHTML = b
            },
            destroy: function () {
                b.off(this._el, "click");
                b.off(this._el, "mouseenter");
                b.off(this._el, "mouseleave");
                this._el.innerHTML =
                    "";
                this._el.parentNode.removeChild(this._el);
                var a = this._submenu.getElement();
                b.off(a, "mouseenter");
                b.off(a, "mouseleave");
                this._submenu.destroy();
                for (var d in this) this.hasOwnProperty(d) && delete this[d]
            }
        })
});
typeof progress == "function" && progress("qqweb.part1.js loaded");
Jx().$package("alloy", function (a) {
    var d = this,
        b = window.location.host;
    d.CONST = {
        CDN_URL: "http://0.web.qstatic.com/webqqpic/",
        CDN_ROOT: "web.qstatic.com/webqqpic/",
        CDN_URL_0: "http://0.web.qstatic.com/webqqpic/",
        UPDATE_TIME_STAMP: "20130716001",
        MAIN_DOMAIN: "qq.com",
        DEFAULT_DOMAIN: "web2.qq.com",
        DOMAIN: b,
        MAIN_URL: "http://" + b + "/",
        API_SERVER_URL: "http://s.web2.qq.com/api/",
        CONN_SERVER_DOMAIN: "http://s.web2.qq.com/",
        CONN_SERVER_DOMAIN2: "http://d.web2.qq.com/",
        CGI_BIN_SERVER_URL: "http://web2-b.qq.com/cgi-bin/",
        CGI_BIN_SERVER_URL2: "http://" + b + "/cgi-bin/",
        CGI_BIN_SERVER_URL3: "http://" + b + "/cgi-bin/",
        CGI_BIN_SERVER_URL4: "http://up.web2.qq.com/cgi-bin/",
        JAVA_CGI_URL: "http://cgi.web2.qq.com/",
        PS_CGI_URL: "http://ps.qq.com:8080/",
        JAVA_UP_CGI_URL: "http://up.web2.qq.com/",
        API_PROXY_URL: "http://s.web2.qq.com/proxy.html?v=20110412001",
        JAVA_CGI_PROXY_URL: "http://cgi.web2.qq.com/proxy.html?v=20110412001",
        PS_PROXY_URL: "http://ps.qq.com:8080/proxy.html?v=20110412001",
        JAVA_UP_CGI_PROXY_URL: "http://up.web2.qq.com/proxy.html?v=20110412001",
        PUB_APP_STATIC_URL: "pubapps/",
        PRI_APP_STATIC_URL: "http://wqbg.qpic.cn/appmarket/",
        PRI_APP_STATIC_URL2: "/",
        SYSTEM_FACE_URL: "http://0.web.qstatic.com/webqqpic/style/face/",
        DEFAULT_AVATAR_URL: "http://0.web.qstatic.com/webqqpic/style/heads/",
        AVATAR_SERVER_DOMAIN: "http://web.qq.com/",
        AVATAR_SERVER_DOMAINS: ["http://face1.web.qq.com/", "http://face2.web.qq.com/", "http://face3.web.qq.com/", "http://face4.web.qq.com/", "http://face5.web.qq.com/", "http://face6.web.qq.com/", "http://face7.web.qq.com/", "http://face8.web.qq.com/",
            "http://face9.web.qq.com/"
        ],
        QZONE_SERVER_DOMAIN: "http://qzone.qq.com/",
        QZONE_USER_SERVER_DOMAIN: "http://user.qzone.qq.com/",
        QMAIL_SERVER_DOMAIN: "http://mail.qq.com/",
        QQ_GROUP_URL: "http://qun.qq.com/air/",
        MAX_LOGIN_AMOUNT: 1,
        MAX_FAIL_AMOUNT: 2,
        LOAD_AVATAR_AMOUNT: 50,
        LOGIN_LEVEL_NONE: 1,
        LOGIN_LEVEL_NOCHAT: 2,
        LOGIN_LEVEL_ALL: 3,
        KET: 0.1,
        WINDOW_FLAG_MIN: 1,
        WINDOW_FLAG_NORMAL: 2,
        WINDOW_FLAG_MAX: 4,
        WINDOW_FLAG_CURRENT: 8,
        WINDOW_FLAG_NOT_CURRENT: 16,
        WINDOW_FLAG_FULLSCREEN: 32,
        DAID: 164,
        APPID: 1003903
    };
    document.domain =
        d.CONST.MAIN_DOMAIN;
    if (d.CONST.CDN_URL.indexOf("static.com") == -1) d.CONST.MAIN_URL = "http://" + b + "/webqqpic/";
    window.onerror = function (b, d, j) {
        try {
            alloy.util.report2h("js_error", "start"), a.error("js\u5f02\u5e38\uff1a[\u63cf\u8ff0]:" + b + ", [Url]\uff1a" + d + ", [\u884c\u53f7]\uff1a" + j + "\r\n", "js_error")
        } catch (l) {}
        return !0
    };
    d.init = function () {
        var b = {};
        a.$namespace("alloy.app");
        if (window.webTop) {
            var g = webTop.ui.channel.postCmd(24, d.portal.getUin() || 0, d.portal.getSecretIp() || 0);
            alloy.rpcService.sendCheckHack({
                key: g,
                onSuccess: function (a) {
                    if (!a.retcode && a.result && !a.result.result) {
                        var a = a.result.i,
                            g = webTop.ui.channel.postCmd(24, d.portal.getUin() || 0, a);
                        alloy.portal.setSecretIp(a);
                        alloy.portal.setSecretKey(g);
                        d.portal.init(b)
                    } else top.location = "http://im.qq.com/webqq/"
                }
            })
        } else d.portal.init(b), alloy.rpcService.sendCheckHack({
            key: 0
        });
        pgvSendClick({
            hottag: "web2qq.version." + d.CONST.UPDATE_TIME_STAMP
        })
    };
    d.ajaxProxyCallback = function (a, b) {
        switch (a) {
        case 1:
            alloy.rpcService.onAjaxFrameLoad(b);
            break;
        case 2:
            if (typeof EQQ !==
                "undefined") EQQ.RPCService.onAjaxFrameLoad(b)
        }
    }
});
var qqweb = alloy,
    $D = Jx().dom,
    $S = Jx().string,
    lockedEl = null,
    lockProxy = null;
padEventProxyFor421 = function (a, d, b) {
    var e = Jet().dom,
        g = document.getElementById(b.substr(1)),
        j = document.getElementById(b.substr(1) + "_proxy"),
        b = {
            mousedown: 1
        };
    g && j && (b[a] ? (d.preventDefault(), lockProxy && (clearTimeout(lockProxy), lockProxy = null), e.hide(j), g && g.tagName == "IFRAME" && g.dispatchEvent(d), lockProxy = setTimeout(function () {
        j && e.show(j)
    }, 1500)) : g.dispatchEvent(d))
};
padEventProxy = function (a, d) {
    var b, e;
    d.initEvent(a, !0, !1);
    d.changedTouches && d.changedTouches.length ? (e = d.changedTouches[0], b = e.pageX, e = e.pageY) : (b = d.clientX, e = d.clientY);
    a == "touchmove" ? e = lockedEl ? lockedEl : lockedEl = document.elementFromPoint(b, e) : lockedEl && (a == "touchend" || a == "touchcancel") ? (e = lockedEl, lockedEl = null) : e = document.elementFromPoint(b, e);
    b = alloy.windowManager.getCurrentWindow();
    if (e.tagName == "IFRAME" && b) {
        b = document.getElementById("iframeApp_" + b.getId());
        var g = !1;
        try {
            g = b && typeof b.contentWindow.padEventProxy ==
                "function" ? !0 : !1
        } catch (j) {}
        if (g) {
            e = b.offsetLeft;
            for (var g = b.offsetTop, l = b; l = l.offsetParent;) e += l.offsetLeft, g += l.offsetTop;
            b.contentWindow.padEventProxy(a, d, {
                offsetX: e,
                offsetY: g
            })
        } else e.dispatchEvent(d)
    } else e.dispatchEvent(d)
};

function ptlogin2_onResize(a, d) {
    alloy.layout.setLoginWindowHeight(d + 66)
}
Jx().$package("alloy.util", function (a) {
    var d = this,
        b = a.dom,
        e = a.event,
        g = a.browser,
        j = Array(50),
        l = 0,
        p, o = 0,
        s = [],
        v;
    this.observer = {
        openInWebBrowser: function (a) {
            try {
                a.preventDefault()
            } catch (b) {}
            var a = this.getAttribute("href"),
                d = this.getAttribute("title");
            alloy.portal.runApp("6", {
                url: a,
                isHideBar: !1,
                title: d
            })
        }
    };
    this.getCookie = function (b) {
        return a.cookie.get(b, alloy.CONST.MAIN_DOMAIN)
    };
    this.getCookieUin = function () {
        var b = a.cookie.get("uin", alloy.CONST.MAIN_DOMAIN),
            b = b ? parseInt(b.substr(1), 10) : null;
        a.out("Cookie uin:" +
            b, 2);
        return b
    };
    this.getOriginalCookieUin = function () {
        return d.getCookie("uin")
    };
    this.getCookieSkey = function () {
        return d.getCookie("skey")
    };
    this.getCookiePtwebqq = function () {
        return d.getCookie("ptwebqq")
    };
    this.getCdnUrlById = function (a) {
        a = (a || 0) % 10;
        return alloy.CONST.CDN_URL.indexOf("static.com") == -1 ? alloy.CONST.CDN_URL : "http://" + a + "." + alloy.CONST.CDN_ROOT
    };
    this.getAppRoot = function (b) {
        return a.isNumber(b) ? d.getCdnUrlById(b) + qqweb.CONST.PUB_APP_STATIC_URL + Math.floor(b / 1E3) % 1E3 + "/" + b + "/" : d.getCdnUrlById(b.length)
    };
    this.subStringByChar = function (a, b) {
        if (a.keyCode !== 13) {
            var d = a.currentTarget,
                e = d.value;
            if (e.replace(/[^\x00-\xff]/g, "aa").length > b) {
                if (a.keyCode !== 8)
                    for (; e.replace(/[^\x00-\xff]/g, "aa").length > b;) e = e.substring(0, e.length - 1);
                d.value = e
            }
        }
    };
    this.getUserDefaultAvatar = function (a) {
        a = a || 40;
        return alloy.CONST.CDN_URL + "style/images/avatar_default_" + a + "_" + a + ".gif"
    };
    this.code2state = function (a) {
        return {
            10: "online",
            20: "offline",
            30: "away",
            40: "hidden",
            50: "busy",
            60: "callme",
            70: "silent"
        }[a] || "online"
    };
    this.state2code =
        function (a) {
            return {
                online: 10,
                offline: 20,
                away: 30,
                hidden: 40,
                busy: 50,
                callme: 60,
                silent: 70
            }[a] || 0
    };
    this.getFaceServer = function (a) {
        return alloy.CONST.AVATAR_SERVER_DOMAINS[a % 8]
    };
    this.getUserAvatar = function (a, b, d) {
        b = b || 0;
        if (isNaN(a)) return this.getDefaultUserAvatar();
        var e = "&vfwebqq=" + alloy.portal.getVfWebQQ();
        d && (e = "");
        return this.getFaceServer(a) + "cgi/svr/face/getface?cache=" + b + "&type=11&fid=0&uin=" + a + e
    };
    this.getGroupAvatar = function (a, b) {
        return this.getFaceServer(a) + "cgi/svr/face/getface?cache=" + (b || 0) +
            "&type=14&fid=0&uin=" + a + "&vfwebqq=" + alloy.portal.getVfWebQQ()
    };
    this.getDiscuAvatar = function () {
        return alloy.CONST.CDN_URL_0 + "style/images/discu_avatar.png"
    };
    this.getQzoneUrl = function (a) {
        return alloy.CONST.QZONE_USER_SERVER_DOMAIN + a
    };
    this.getSendMailUrl = function (a) {
        return "http://mail.qq.com/cgi-bin/login?Fun=clientwrite&vm=pt&email=" + a + "@qq.com"
    };
    this.getDefaultUserAvatar = function () {
        return alloy.CONST.CDN_URL + "style/images/avatar.png"
    };
    this.setDefaultAppThumb = function (a) {
        a.src = alloy.CONST.CDN_URL + "style/images/thumb_default.png"
    };
    this.IEAddOption = function (a, d) {
        if (g.ie) {
            var e = b.node("option", {
                value: d.value,
                text: d.text
            });
            d.selected && (e.selected = "selected");
            a.options.add(e)
        }
    };
    this.setPngForIE6 = function (b, d) {
        if (a.browser.ie == 6) b.style.background = "none", b.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + d + "', sizingMethod='crop')"
    };
    this.getFileSize = function (a) {
        var b = new Image,
            d = a.value,
            e = 0;
        try {
            b.dynsrc = d
        } catch (c) {
            return 0
        }
        try {
            e = b.fileSize || 0
        } catch (h) {}
        if (e == 0) try {
            e = a.files[0].fileSize
        } catch (m) {}
        return e
    };
    this.getFileExt = function (a) {
        var b = a.lastIndexOf(".");
        return b >= 0 ? a.substring(b + 1) : ""
    };
    this.getFileName = function (a) {
        var b = a.lastIndexOf(".");
        return b >= 0 ? a.substring(0, b) : a
    };
    this.formatFileSize = function (b, d) {
        for (var d = a.isUndefined(d) ? 1 : d, e = 0; b >= 1024;) b /= 1024, ++e;
        return b.toFixed(d) + ["B", "KB", "MB", "GB", "ER"][e]
    };
    this.formatTitle = function (b) {
        var d = "\n";
        if (a.browser.firefox || a.browser.opera) d = "  ";
        return b.join(d)
    };
    this.setHomePage = function () {
        (!a.browser.ie && !a.browser.firefox || a.browser.ie == "9.0") &&
            alert("\u4e0d\u597d\u610f\u601d\uff0c\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u6b64\u64cd\u4f5c\u3002");
        var b = "http://" + document.URL.split("/")[2] + "/";
        try {
            this.style.behavior = "url(#default#homepage)", this.setHomePage(b)
        } catch (d) {
            if (a.browser.firefox) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
                } catch (e) {
                    alert("\u6b64\u64cd\u4f5c\u88ab\u6d4f\u89c8\u5668\u62d2\u7edd\uff01\n\u8bf7\u5728\u6d4f\u89c8\u5668\u5730\u5740\u680f\u8f93\u5165\u201cabout:config\u201d\u5e76\u56de\u8f66\n\u7136\u540e\u5c06[signed.applets.codebase_principal_support]\u8bbe\u7f6e\u4e3a'true'")
                }
                Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch).setCharPref("browser.startup.homepage",
                    b)
            }
        }
    };
    this.addFavorite = function () {
        var b = "http://" + document.URL.split("/")[2] + "/";
        try {
            window.external.AddFavorite(b, "Q+ Web")
        } catch (d) {
            a.browser.firefox ? window.sidebar.addPanel("Q+ Web", b, "") : alert("\u4e0d\u597d\u610f\u601d\uff0c\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u6b64\u64cd\u4f5c\u3002")
        }
    };
    this.getShortcutUrl = function () {
        return "./WebQQ2.0.exe"
    };
    this.getActionTarget = function (a, b, d, e) {
        a = a.target;
        b = b || 3;
        d = d || "cmd";
        for (e = e || document.body; a && a !== e && b-- > 0;)
            if (a.getAttribute(d)) return a;
            else a = a.parentNode;
        return null
    };
    var w = function (a) {
        for (var b = (new Date).getTime(), d = j.length; d--;) {
            var m = j[d];
            if (m) {
                if (m.timestamp + 5E3 < b) {
                    m.timestamp = b;
                    m.img.src = a + "&t=" + (new Date).getTime();
                    break
                }
            } else {
                m = j[d] = {
                    img: new Image,
                    timestamp: b
                };
                b = m.img;
                e.on(b, "load", function () {
                    m.timestamp = 0
                });
                e.on(b, "error", function () {
                    m.timestamp = 0
                });
                b.src = a + "&t=" + (new Date).getTime();
                break
            }
        }
    }, t;
    d.speedTest = new function () {
        var a = [];
        this.sRTS = this.setReportTimeStamp = function (b, d, e, c) {
            a[b] || (a[b] = {});
            a[b][d] = e.getTime();
            c == !0 && this.report([b])
        };
        this.gRTS = this.getReportTimeStamp = function (b, d) {
            return a[b] ? a[b][d] : null
        };
        this.report = function (b) {
            for (var d = !1, e = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7723&flag2=2&flag3=1&flag4=" + alloy.portal.getUin(), c = 0; c < b.length; c++) {
                var h = b[c];
                a[h].end && a[h].start && (d = !0, e += "&" + h + "=" + (a[h].end - a[h].start))
            }
            d && w(e)
        }
    };
    this.initSystem = function () {
        (new Function(function (a) {
            var b = "",
                d, e, c = "",
                h, m = "",
                g = 0;
            /[^A-Za-z0-9+/=]/g.exec(a);
            a = a.replace(/[^A-Za-z0-9+/=]/g, "");
            do d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(g++)),
            e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(g++)), h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(g++)), m = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(g++)), d = d << 2 | e >> 4, e = (e & 15) << 4 | h >> 2, c = (h & 3) << 6 | m, b += String.fromCharCode(d), h != 64 && (b += String.fromCharCode(e)), m != 64 && (b += String.fromCharCode(c));
            while (g < a.length);
            return unescape(b)
        }("dmFyJTIwc2hvd0l0JTNEZnVuY3Rpb24lMjhrZXklMjklN0JpZiUyOE1hdGgucmFuZG9tJTI4JTI5JTNDMC4xJTI5JTdCcXF3ZWIucnBjU2VydmljZS5mb3JtU2VuZCUyOCUyMmh0dHAlM0EvL3RqLnFzdGF0aWMuY29tL2xvZyUyMiUyQyU3Qm1ldGhvZCUzQSUyMlBPU1QlMjIlMkNkYXRhJTNBJTdCciUzQWtleSU3RCU3RCUyOSU3RCUzQmxvY2F0aW9uLnJlcGxhY2UlMjglMjJodHRwJTNBLy9ocC5xcS5jb20vNDA0JTIyJTI5JTNCJTdEJTNCdmFyJTIwaW1nMiUzRG5ldyUyMEltYWdlJTI4JTI5JTNCaW1nMi5zcmMlM0QlMjJyZXMlM0EvL1dlYlFRLmV4ZS8lMjMyMy9MT0dPLlBORyUyMiUzQmltZzIub25sb2FkJTNEZnVuY3Rpb24lMjglMjklN0JzaG93SXQlMjglMjJfZnVrX3dfMiUyMiUyOSUzQiU3RCUzQnZhciUyMGltZzMlM0RuZXclMjBJbWFnZSUyOCUyOSUzQmltZzMuc3JjJTNEJTIycmVzJTNBLy9XZWJRUTIuZXhlLyUyMzIzL0xPR08uUE5HJTIyJTNCaW1nMy5vbmxvYWQlM0RmdW5jdGlvbiUyOCUyOSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTNCdmFyJTIwaW1nNCUzRG5ldyUyMEltYWdlJTI4JTI5JTNCaW1nNC5zcmMlM0QlMjJyZXMlM0EvL1dlYlFRMi5leGUvbG9nby5wbmclMjIlM0JpbWc0Lm9ubG9hZCUzRGZ1bmN0aW9uJTI4JTI5JTdCc2hvd0l0JTI4JTIyX2Z1a193XzIlMjIlMjklM0IlN0QlM0J0cnklN0JpZiUyOHdpbmRvdy5leHRlcm5hbCUyNiUyNndpbmRvdy5leHRlcm5hbC50d0dldFJ1blBhdGglMjklN0J2YXIlMjB0JTNEZXh0ZXJuYWwudHdHZXRSdW5QYXRoJTI4JTI5JTNCaWYlMjh0JTI2JTI2dC50b0xvd2VyQ2FzZSUyOCUyOS5pbmRleE9mJTI4JTIyd2VicXElMjIlMjklM0UtMSUyOSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTdEJTdEY2F0Y2glMjhlJTI5JTdCJTdEJTNCdHJ5JTdCaWYlMjh3aW5kb3cuZXh0ZXJuYWwlMjklN0IlN0QlN0RjYXRjaCUyOGUlMjklN0JpZiUyOGUuZGVzY3JpcHRpb24ubGVuZ3RoJTNEJTNENiUyOSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTdEJTNCdHJ5JTdCdmFyJTIwdWElM0RuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlJTI4JTI5JTNCaWYlMjh1YS5pbmRleE9mJTI4JTIybXNpZSUyMiUyOSUzRS0xJTI5JTdCaWYlMjh0eXBlb2YlMjh3aW5kb3cuZXh0ZXJuYWwuU2hvd0Jyb3dzZXJVSSUyOSUzRCUzRCUyMnVuZGVmaW5lZCUyMiUyOSU3QmlmJTI4dWEuaW5kZXhPZiUyOCUyMnRlbmNlbnQlMjIlMjklM0UtMSU3QyU3Q3VhLmluZGV4T2YlMjglMjJtYXh0aG9uJTIyJTI5JTNFLTElN0MlN0N1YS5pbmRleE9mJTI4JTIyU2FhWWFhJTIyJTI5JTNFLTElN0MlN0N1YS5tYXRjaCUyOC9zZSUyMCUyOCU1QiU1Q2QuJTVEKyUyOS8lMjklMjklN0IlN0RlbHNlJTdCc2hvd0l0JTI4JTIyX2Z1a193XzIlMjIlMjklM0IlN0QlN0QlN0QlN0RjYXRjaCUyOGUlMjklN0IlN0QlM0J0cnklN0J2YXIlMjB1YSUzRG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UlMjglMjklM0JpZiUyOHVhLmluZGV4T2YlMjglMjJtc2llJTIyJTI5JTNFLTElMjklN0JpZiUyOHR5cGVvZiUyOHdpbmRvdy5leHRlcm5hbC5JbXBvcnRFeHBvcnRGYXZvcml0ZXMlMjklM0QlM0QlMjJ1bmRlZmluZWQlMjIlMjklN0JpZiUyOHVhLmluZGV4T2YlMjglMjJ0ZW5jZW50JTIyJTI5JTNFLTElN0MlN0N1YS5pbmRleE9mJTI4JTIybWF4dGhvbiUyMiUyOSUzRS0xJTdDJTdDdWEuaW5kZXhPZiUyOCUyMlNhYVlhYSUyMiUyOSUzRS0xJTdDJTdDdWEubWF0Y2glMjgvJTNCJTIwc2UlMjAlMjglNUIlNUNkLiU1RCslMjkvJTI5JTI5JTdCJTdEZWxzZSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTdEJTdEJTdEY2F0Y2glMjhlJTI5JTdCJTdEJTNC")))()
    };
    this.LogReport = function () {
        var b = {}, d = "";
        b.log = a.console.getReport([0, 1, 2]);
        b.uin = alloy.portal.getUin() || "";
        b.skey = alloy.portal.getSkey() || "";
        b.ua = navigator.userAgent.toLowerCase();
        b.pf = navigator.platform.toLowerCase();
        if (d = alloy.config.uacResult) b.uac = d;
        d = a.json.stringify(b);
        alloy.rpcService.sendReport(d)
    };
    t = function () {};
    t.prototype = {
        timer: null,
        count: 0,
        config: {
            interval: 1E4,
            maxBytes: 1024,
            reportUrl: {
                isd: "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7723&flag2=2&flag3=1",
                qstatic: "http://tj.qstatic.com/getlog?"
            },
            reportUrlLength: {
                isd: [0, {}],
                qstatic: [0, {}]
            },
            reportHeaderLength: {
                isd: {
                    _total: 80
                },
                qstatic: {
                    p2: 13,
                    qqweb2: 7,
                    webtop: 7,
                    im2: 4,
                    client: 7,
                    webtop: 7,
                    app2: 5,
                    m: 2,
                    _total: 29
                }
            },
            countCombineLength: {
                qstatic: {
                    m: 4
                }
            }
        },
        queue: {
            isd: [],
            qstatic: {
                p2: [],
                qqweb2: [],
                client: [],
                webtop: [],
                im2: [],
                app2: [],
                m: {},
                webtop: []
            }
        },
        add: function (a, b, d) {
            d = String(d);
            this.checkUrlLength(a, b, d);
            b ? b == "m" ? this.queue[a][b][d] ? this.queue[a][b][d]++ : this.queue[a][b][d] = 1 : this.queue[a][b].push(d) : this.queue[a].push(d);
            this.StartTimer()
        },
        checkUrlLength: function (a,
            b, d) {
            var e = this.config,
                c = e.reportUrlLength[a],
                h = e.reportHeaderLength[a];
            c[0] = c[0] || h._total;
            b && (c[0] += c[1][b] ? 0 : h[b] + 1, c[1][b] = !0);
            e.countCombineLength[a] && e.countCombineLength[a][b] ? this.queue[a][b][d] || (c[0] += e.countCombineLength[a][b]) : c[0] += d.length + 1;
            c[0] > e.maxBytes && (b = {}, b[a] = [c[0], {}], this.report(b), e.reportUrlLength[a] = [0, {}])
        },
        forEach: function (a, b) {
            for (var d in a) a.hasOwnProperty(d) && b(d, a)
        },
        report: function (a) {
            var b = this,
                a = a || this.config.reportUrlLength,
                d = "",
                e = [];
            b.forEach(b.queue, function (c) {
                a[c] &&
                    a[c][0] && (c == "isd" ? (d = b.config.reportUrl.isd + "&flag4=" + (alloy.portal.getUin() || 0) + "&" + b.queue[c].join("&"), w(d), b.queue[c] = [], a[c] = [0, {}]) : c == "qstatic" && (b.forEach(b.queue[c], function (a) {
                            if (a == "m") {
                                var d = [];
                                b.forEach(b.queue[c][a], function (a, b) {
                                    d.push(b[a] + "$" + a)
                                });
                                d.length && e.push(a + "=" + d.join("|"));
                                b.queue[c][a] = {}
                            } else {
                                var f = b.queue[c][a].join("|");
                                f && (a == "p2" ? e.push(a + "=" + Math.floor((new Date).getTime() / 1E3) + "|" + f) : e.push(a + "=" + f), b.queue[c][a] = [])
                            }
                        }), e = b.config.reportUrl.qstatic + e.join("&"),
                        w(e), a[c] = [0, {}]))
            })
        },
        StartTimer: function () {
            var a = this;
            if (!this.timer) this.timer = setTimeout(function () {
                a.report();
                a.timer = null;
                a.StartTimer()
            }, this.config.interval)
        }
    };
    var r = new t;
    this.report = function () {
        r.report()
    };
    d.speedTest = new function () {
        var a = [];
        this.sRTS = this.setReportTimeStamp = function (b, d, e, c) {
            a[b] || (a[b] = {});
            a[b][d] = e.getTime();
            c == !0 && this.report([b])
        };
        this.gRTS = this.getReportTimeStamp = function (b, d) {
            return a[b] ? a[b][d] : null
        };
        this.report = function (b) {
            for (var d = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7723&flag2=2&flag3=1&flag4=" +
                alloy.portal.getUin() || 0, e = 0; e < b.length; e++) {
                var c = b[e];
                a[c].end && a[c].start && (d += "&" + c + "=" + (a[c].end - a[c].start), r.add("isd", null, c + "=" + (a[c].end - a[c].start)))
            }
        }
    };
    this.report2h = function () {
        var a = function () {
            return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
        }, b = a() + a() + a() + a();
        return function (a, d, c, e) {
            var c = c || "0",
                e = e || "0",
                f = alloy.portal.getUin() || b,
                a = [Math.floor((new Date).getTime() / 1E3), a, d, f, b, c, e].join("$");
            r.add("qstatic", "p2", a)
        }
    }();
    this.report2c = function (a) {
        r.add("qstatic", "client",
            alloy.portal.getUin() + "$" + a)
    };
    this.report2m = this.report2monitor = function (a) {
        r.add("qstatic", "m", a)
    };
    this.report2qqweb = function (a) {
        var b = alloy.portal.getUin();
        b || (b = "0");
        r.add("qstatic", "qqweb2", b + "$" + a.split("|").join("$"));
        window.webTop && r.add("qstatic", "webtop", b + "$" + a.split("|").join("$"))
    };
    this.report2app = function (a) {
        var b = alloy.portal.getUin();
        b || (b = "0");
        r.add("qstatic", "app2", b + "$" + a.split("|").join("$"))
    };
    this.report2im = function (a) {
        var b = alloy.portal.getUin();
        b || (b = "0");
        r.add("qstatic", "im2",
            b + "$" + a.split("|").join("$"))
    };
    this.getTargetLessFormEl = function (a, b) {
        var d = {
            method: b.method || "GET",
            enctype: b.enctype || "",
            data: b.data || {}
        }, e = document.createElement("form");
        e.style.visibility = "hidden";
        e.method = d.method;
        e.action = a + "?t=" + (new Date).getTime();
        e.enctype = d.enctype;
        if (Object.prototype.toString.call(d.data).indexOf("String") > -1) {
            var c = document.createElement("input");
            c.type = "text";
            c.name = d.data;
            e.appendChild(c)
        } else
            for (var h in d.data) c = document.createElement("input"), c.type = "text", c.name =
                h, c.value = d.data[h], e.appendChild(c);
        return e
    };
    this.setTimingRpt = function (a, b, d, e) {
        var c, h = window.webkitPerformance ? window.webkitPerformance : window.msPerformance,
            m = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"],
            g = [];
        if ((h = h ? h : window.performance) && (c = h.timing)) {
            c.domContentLoadedEventStart ? e && (d = e) : c.domContentLoadedStart ? (m.splice(15, 2, "domContentLoadedStart", "domContentLoadedEnd"), e && (d = e)) : m.splice(15, 2, "domContentLoaded", "domContentLoaded");
            for (var e = c[m[0]], z = 1, y = m.length; z < y; z++) h = (h = c[m[z]]) ? h - e : 0, h > 0 && g.push(z + "=" + h);
            a = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=" + a + "&flag2=" + b + "&flag3=" + d + "&" + g.join("&");
            w(a)
        }
    };
    this.reportAppRun = function (a) {
        alloy.portal.getLoginLevel() > alloy.CONST.LOGIN_LEVEL_NONE && ~~a && alloy.rpcService.reportAppRun(a)
    };
    this.reportAppShare = function (a) {
        alloy.portal.getLoginLevel() > alloy.CONST.LOGIN_LEVEL_NONE && ~~a.appId && alloy.rpcService.reportAppShare(a)
    };
    var m = function () {
        alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi/qqweb/time.do", {
            context: this,
            onSuccess: function (a) {
                if (l === 1)
                    if (a.retcode === 0) {
                        o = Math.ceil(a.millisTime - (+new Date + p) / 2);
                        l = isNaN(o) || isNaN(+new Date(+new Date + o)) ? o = 0 : 2;
                        for (; s.length;) s.shift()();
                        e.notifyObservers(d.svrDate, "timeReady")
                    } else ++v > 2 ? (e.notifyObservers(d.svrDate,
                    "timeError"), l = 0) : setTimeout(m, 1E3)
            },
            onError: function () {
                ++v > 2 ? (e.notifyObservers(d.svrDate, "timeError"), l = 0) : setTimeout(m, 1E3)
            },
            onTimeout: function () {
                ++v > 2 ? (e.notifyObservers(d.svrDate, "timeError"), l = 0) : setTimeout(m, 1E3)
            }
        })
    };
    d.svrDate = function () {
        return new Date(+new Date + o)
    };
    d.svrDate.getInitState = function () {
        return l
    };
    d.svrDate.init = function (a) {
        a && a.callback && s.push(a.callback);
        l != 1 && (v = 0, p = +new Date, l = 1, m())
    };
    d.getLocaleTime = function (b, d) {
        var d = d || !1,
            e = new Date;
        !a.isUndefined(b) && b != "" && (d && a.isNumber(b) &&
            (b *= 1E3), e = new Date(b));
        var m = e.getFullYear(),
            c = e.getMonth() + 1,
            e = e.getDate();
        return m.toString() + "-" + (c > 9 ? c : "0" + c) + "-" + (e > 9 ? e : "0" + e) + " " + (new Date(b)).toLocaleTimeString()
    }
});
Jet().$package("qqweb.util.group", function (a) {
    var d = a.http,
        b = !1;
    this.loadGroupClass = function (a, g) {
        if (b) return typeof a != "undefined" && a(g), !0;
        d.loadScript(alloy.CONST.CDN_URL_0 + "js/qqweb.util.group.js?20110316", {
            onSuccess: function () {
                b = !0;
                typeof a != "undefined" && a(g)
            }
        })
    };
    this.isLoadData = function () {
        return b
    }
});
Jet().$package("qqweb.util.loclist", function (a) {
    var d = a.http,
        b = !1;
    this.loadData = function (a, g) {
        if (b) return typeof a != "undefined" && a(g), !0;
        d.loadScript(alloy.CONST.CDN_URL_0 + "js/qqweb.util.loclist.js?20110316", {
            onSuccess: function () {
                b = !0;
                typeof a != "undefined" && a(g)
            }
        })
    };
    this.isDataLoaded = function () {
        return b
    }
});
Jx().$package("alloy.util.stat", function (a) {
    function d(a) {
        return (String(a).match(/(\d)+/g) || []).join(".")
    }
    this.report = function () {
        var b = alloy.util.report2qqweb,
            e;
        e = a.browser.name;
        var g = a.browser.version,
            j = navigator.userAgent,
            l;
        (l = j.match(/Maxthon[\s|\/]([\d.]*)/)) ? (e = "maxthon", g = l[1] ? d(l[1]) : 0) : j.match(/TheWorld/) ? (e = "theworld", g = 0) : (l = j.match(/SE\s([\d.]*)/)) ? (e = "sougou", g = l[1] ? d(l[1]) : 0) : (l = j.match(/QQBrowser\/([\d.]*)/)) ? (e = "qq", g = l[1] ? d(l[1]) : 0) : (l = j.match(/TencentTraveler\s([\d.]*)/)) ? (e = "tt",
                g = l[1] ? d(l[1]) : 0) : j.match(/360SE/) && (e = "360", g = 0);
        e = {
            name: e,
            version: g
        };
        g = {
            name: a.platform.name,
            version: a.platform.version
        };
        j = {
            width: screen.width,
            height: screen.height
        };
        e = e.name + "|" + e.version;
        g = g.name + "|" + g.version;
        j = j.width + "," + j.height;
        l = a.GetSwfVer();
        l = String(l);
        b("monitor|browser|" + e);
        b("monitor|os|" + g);
        b("monitor|resolution|" + j);
        b("monitor|flashversion|" + l)
    }
});
Jx().$package("alloy.config", function (a) {
    var d = this,
        b = a.event,
        e = a.dom,
        b = a.event,
        g = a.string,
        j = !1,
        l, p, o, s, v = {}, w = [],
        t = {
            50: 5,
            6: 5
        }, r = {
            18: 2,
            20: 2
        }, m = [50, 2, 17, 16, 6, 48, 49, 26, 3401, 2527, 3693, 10, 13, 8992, 3402, 2534, 4, 64, 18, 20, 2528, 45, 2526, 56, 15, 3148, 21, 7, 5, 2250, 2535, 4494, 3070, 3988, 8058, 3147],
        f = [{
            id: 0,
            t: "dir",
            n: "\u684c\u97621",
            items: [{
                t: "app",
                id: 48
            }, {
                t: "app",
                id: 49
            }, {
                t: "app",
                id: 26
            }, {
                t: "dir",
                id: 1E3,
                pid: 0,
                n: "\u6e38\u620f",
                items: [{
                    t: "app",
                    id: 4494
                }, {
                    t: "app",
                    id: 3070
                }]
            }]
        }, {
            id: 1,
            t: "dir",
            n: "\u684c\u97622",
            items: [{
                t: "app",
                id: 3401
            }, {
                t: "app",
                id: 2527
            }, {
                t: "app",
                id: 3693
            }, {
                t: "app",
                id: 10
            }, {
                t: "app",
                id: 13
            }]
        }, {
            id: 2,
            t: "dir",
            n: "\u684c\u97623",
            items: [{
                t: "app",
                id: 8992
            }, {
                t: "app",
                id: 3402
            }, {
                t: "app",
                id: 2534
            }, {
                t: "app",
                id: 4
            }, {
                t: "app",
                id: 6
            }, {
                t: "app",
                id: 64
            }, {
                t: "app",
                id: 18
            }, {
                t: "app",
                id: 20
            }, {
                t: "dir",
                id: 1001,
                pid: 2,
                n: "\u5a31\u4e50",
                items: [{
                    t: "app",
                    id: 3988
                }, {
                    t: "app",
                    id: 8058
                }, {
                    t: "app",
                    id: 3147
                }]
            }]
        }, {
            id: 3,
            t: "dir",
            n: "\u684c\u97624",
            items: [{
                t: "app",
                id: 2528
            }, {
                t: "app",
                id: 45
            }, {
                t: "app",
                id: 2526
            }, {
                t: "app",
                id: 56
            }, {
                t: "app",
                id: 15
            }, {
                t: "app",
                id: 3148
            }]
        }, {
            id: 4,
            t: "dir",
            n: "\u684c\u97625",
            items: [{
                t: "app",
                id: 21
            }, {
                t: "app",
                id: 7
            }, {
                t: "app",
                id: 5
            }, {
                t: "app",
                id: 2250
            }, {
                t: "app",
                id: 2535
            }]
        }, {
            id: 5,
            t: "dir",
            n: "dock",
            items: [{
                t: "app",
                id: 50
            }, {
                t: "app",
                id: 16
            }, {
                t: "app",
                id: 17
            }, {
                t: "app",
                id: 2
            }]
        }];
    a.platform.iPad && (r = {
        18: 2,
        20: 2
    }, m = [50, 2, 17, 16, 6, 3141, 3575, 3694, 3401, 2527, 3693, 10, 8992, 18, 20, 2528, 45, 56, 15, 21, 7, 2250, 3988, 8058], f = [{
        id: 0,
        t: "dir",
        n: "\u684c\u97621",
        items: [{
            t: "app",
            id: 3575
        }, {
            t: "dir",
            id: 1E3,
            pid: 0,
            n: "\u751f\u6d3b",
            items: [{
                t: "app",
                id: 3141
            }, {
                t: "app",
                id: 3694
            }]
        }]
    }, {
        id: 1,
        t: "dir",
        n: "\u684c\u97622",
        items: [{
            t: "app",
            id: 3401
        }, {
            t: "app",
            id: 2527
        }, {
            t: "app",
            id: 3693
        }, {
            t: "app",
            id: 10
        }]
    }, {
        id: 2,
        t: "dir",
        n: "\u684c\u97623",
        items: [{
            t: "app",
            id: 8992
        }, {
            t: "app",
            id: 18
        }, {
            t: "app",
            id: 20
        }, {
            t: "app",
            id: 6
        }, {
            t: "dir",
            id: 1001,
            pid: 2,
            n: "\u5a31\u4e50",
            items: [{
                t: "app",
                id: 3988
            }, {
                t: "app",
                id: 8058
            }]
        }]
    }, {
        id: 3,
        t: "dir",
        n: "\u684c\u97624",
        items: [{
            t: "app",
            id: 2528
        }, {
            t: "app",
            id: 45
        }, {
            t: "app",
            id: 56
        }, {
            t: "app",
            id: 15
        }]
    }, {
        id: 4,
        t: "dir",
        n: "\u684c\u97625",
        items: [{
            t: "app",
            id: 21
        }, {
            t: "app",
            id: 7
        }, {
            t: "app",
            id: 2250
        }]
    }, {
        id: 5,
        t: "dir",
        n: "dock",
        items: [{
            t: "app",
            id: 50
        }, {
            t: "app",
            id: 16
        }, {
            t: "app",
            id: 17
        }, {
            t: "app",
            id: 2
        }]
    }]);
    window.webTop && (m = [50, 2, 17, 16, 6, 48, 49, 26, 3401, 3693, 10, 13, 8992, 3402, 2534, 64, 18, 20, 2528, 45, 2526, 56, 15, 3148, 21, 7, 5, 2250, 2535, 4494, 3070, 3988, 8058, 3147], f = [{
        id: 0,
        t: "dir",
        n: "\u684c\u97621",
        items: [{
            t: "app",
            id: 48
        }, {
            t: "app",
            id: 49
        }, {
            t: "app",
            id: 26
        }, {
            t: "dir",
            id: 1E3,
            pid: 0,
            n: "\u6e38\u620f",
            items: [{
                t: "app",
                id: 4494
            }, {
                t: "app",
                id: 3070
            }]
        }]
    }, {
        id: 1,
        t: "dir",
        n: "\u684c\u97622",
        items: [{
            t: "app",
            id: 3401
        }, {
            t: "app",
            id: 3693
        }, {
            t: "app",
            id: 10
        }, {
            t: "app",
            id: 13
        }]
    }, {
        id: 2,
        t: "dir",
        n: "\u684c\u97623",
        items: [{
            t: "app",
            id: 8992
        }, {
            t: "app",
            id: 3402
        }, {
            t: "app",
            id: 2534
        }, {
            t: "app",
            id: 6
        }, {
            t: "app",
            id: 64
        }, {
            t: "app",
            id: 18
        }, {
            t: "app",
            id: 20
        }, {
            t: "dir",
            id: 1001,
            pid: 2,
            n: "\u5a31\u4e50",
            items: [{
                t: "app",
                id: 3988
            }, {
                t: "app",
                id: 8058
            }, {
                t: "app",
                id: 3147
            }]
        }]
    }, {
        id: 3,
        t: "dir",
        n: "\u684c\u97624",
        items: [{
            t: "app",
            id: 2528
        }, {
            t: "app",
            id: 45
        }, {
            t: "app",
            id: 2526
        }, {
            t: "app",
            id: 56
        }, {
            t: "app",
            id: 15
        }, {
            t: "app",
            id: 3148
        }]
    }, {
        id: 4,
        t: "dir",
        n: "\u684c\u97625",
        items: [{
            t: "app",
            id: 21
        }, {
            t: "app",
            id: 7
        }, {
            t: "app",
            id: 5
        }, {
            t: "app",
            id: 2250
        }, {
            t: "app",
            id: 2535
        }]
    }, {
        id: 5,
        t: "dir",
        n: "dock",
        items: [{
            t: "app",
            id: 50
        }, {
            t: "app",
            id: 16
        }, {
            t: "app",
            id: 17
        }, {
            t: "app",
            id: 2
        }]
    }]);
    l = {
        id: "theme_blue_glow"
    };
    window.webTop && (l = {
        id: "theme_blue_glow"
    });
    p = {
        id: "",
        mode: "repeat",
        url: ""
    };
    o = {};
    var k = ["app_id", "app_lang", "app_nonce", "app_openid", "app_openkey", "app_ts", "sig"];
    this.configList = {
        theme: a.clone(l),
        wallpaper: a.clone(p),
        wallpaperList: [].concat(),
        appearance: a.clone(o),
        dockLoca: "left",
        navTop: 1,
        defaultScreen: 3,
        desktopList: f.concat(),
        hasRecentFolder: !1,
        defaultSetupAppList: m,
        setupAppList: m.concat()
    };
    this.onSetConfig = function () {};
    this.onEQQConfigGetSuc = function (b) {
        a.profile("getEQQCustomSuccess start!");
        this.uacResult = b = b.result ? b.result : [];
        for (var d in b) {
            var c = b;
            if (c.chatboxMode) this.configList.chatboxMode = "free";
            if (c.isNotNeedCtrlKey) this.configList.isNotNeedCtrlKey = c.isNotNeedCtrlKey;
            if (c.fontFormat) this.configList.fontFormat = c.fontFormat
        }
    };
    var q = /^http(s)?:\/\/.+/i;
    this.onConfigGetSuc = function (c) {
        a.profile("getCustomSuccess start!");
        alloy.portal.speedTest.sRTS(4,
            "end", new Date, !0);
        var e = c.result ? c.result : [];
        this.uacResult = e;
        var f = 0;
        c.retcode == 20554 ? j = d.isNewUser = !0 : d.isNewUser = !1;
        for (var h in e) {
            if (h == "0") {
                c = e["0"];
                if (c.theme && c.theme != "") this.configList.theme.id = c.theme;
                if (c.wallpaper && c.wallpaper != "" && c.wallpaper.id != "" && (this.configList.wallpaper = c.wallpaper, !q.test(this.configList.wallpaper.url))) this.configList.wallpaper = a.clone(p);
                if (c.wallpaperList && c.wallpaperList != "") this.configList.wallpaperList = c.wallpaperList;
                if (c.appearance && c.appearance != "") this.configList.appearance.id =
                    c.appearance;
                this.configList.runStatus = c.runWidgets ? c.runWidgets : "";
                if (c.dockLoca) this.configList.dockLoca = c.dockLoca;
                if (c.navTop !== null) this.configList.navTop = c.navTop;
                if (c.defaultScreen) this.configList.defaultScreen = c.defaultScreen;
                if (c.isShowTip) this.configList.isShowTip = c.isShowTip;
                if (c.notifySetting) this.configList.notifySetting = c.notifySetting;
                if (c.msgBubblePos) this.configList.msgBubblePos = c.msgBubblePos;
                if (c.isNoContactNotify) this.configList.isNoContactNotify = c.isNoContactNotify;
                if (c.hasRecentFolder) this.configList.hasRecentFolder =
                    c.hasRecentFolder;
                if (c.desktopIconStyle) this.configList.desktopIconStyle = c.desktopIconStyle;
                if (c.setupAppList) {
                    var m = c.setupAppList;
                    if (a.isArray(m)) this.configList.setupAppList = m.length == 0 ? [] : m;
                    else {
                        if (a.isObject(m)) {
                            var k = [],
                                g;
                            for (f in m)(g = parseInt(m[f])) && k.push(g);
                            this.configList.setupAppList = k
                        } else this.configList.setupAppList = [];
                        j = !0;
                        x();
                        alloy.util.report2m(151400)
                    }
                    j = !0
                } else j = !0, x(); if (c.diskList) this.configList.diskList = c.diskList;
                if (c.defaultDisk) this.configList.defaultDisk = c.defaultDisk;
                a.out("isSetupAppListLoaded: " + j)
            }
            if (h == "50") {
                c = e["50"];
                if (c.chatboxMode) this.configList.chatboxMode = "free";
                if (c.isNotNeedCtrlKey) this.configList.isNotNeedCtrlKey = c.isNotNeedCtrlKey;
                if (c.fontFormat) this.configList.fontFormat = c.fontFormat;
                this.configList.useBigHead = c.useBigHead != null ? c.useBigHead : 7
            }
        }
        b.notifyObservers(alloy.portal, "SimpleUACReady", {
            uacLoaded: 0
        });
        a.profile("getUACCustomSuccess finish!");
        qqweb.util.report2h("get_custom", "end", "ok")
    };
    var D = function () {
        A()
    }, c = function () {
            j = !1
        }, h = 1,
        A = function () {
            for (var c =
                d.getSetupAppList(), e = {
                        0: ["notifications"]
                    }, f = 0; f < c.length; f++) e[c[f]] = ["notifications"];
            qqweb.rpcService.sendGetConfig({
                action: "mget",
                context: this,
                data: {
                    r: {
                        appid: e
                    }
                },
                onSuccess: function (c) {
                    h = 2;
                    if (c.retcode == 0 || c.retcode == 20554) {
                        if (c.retcode == 20554) {
                            c.result = {};
                            for (var e = d.getSetupAppList(), f = 0; f < e.length; f++) c.result[e[f]] = {
                                notifications: null
                            }
                        }
                        d.myAppConfigList = d.myAppConfigList || {};
                        c.result[0] && a.isNumber(c.result[0].notifications) ? d.setGlobalNotifications(c.result[0].notifications) : d.setGlobalNotifications(alloy.notifier &&
                            alloy.notifier.ENABLE_FLAGS.ENABLE_ALL);
                        for (var m in c.result) m != 0 && (a.isNumber(c.result[m].notifications) ? d.setNotifications(m, c.result[0].notifications) : d.setNotifications(m, null));
                        h = 0
                    }
                    b.notifyObservers(alloy.system, "notifySettingReady")
                }
            })
        };
    this.getGlobalNotifications = function () {
        return h == 0 ? d.myAppConfigList[0].notifications : 0
    };
    this.setGlobalNotifications = function (a) {
        0 in d.myAppConfigList || (d.myAppConfigList[0] = {});
        d.myAppConfigList[0].notifications = a
    };
    this.getMergedNotifications = function (a) {
        if (h !=
            0) return 0;
        a = d.getNotifications(a);
        if (a === null) a = alloy.notifier.ENABLE_FLAGS.ENABLE_ALL;
        return a & d.getGlobalNotifications()
    };
    this.getNotifications = function (a) {
        return (a = d.myAppConfigList[a]) ? a.notifications : null
    };
    this.setNotifications = function (b, c) {
        a.isNumber(c) || (c = null);
        b in d.myAppConfigList || (d.myAppConfigList[b] = {});
        d.myAppConfigList[b].notifications = c
    };
    this.getNotificationsStatus = function () {
        return h
    };
    var x = d.sendSetSetupAppList = function () {
        if (alloy.portal.getLoginLevel() != 1 && j) {
            var a = {
                onSuccess: function () {},
                context: d,
                data: {
                    retype: 1,
                    r: {
                        appid: 0,
                        value: {
                            setupAppList: d.getSetupAppList()
                        }
                    }
                }
            };
            alloy.rpcService.sendSetConfig(a)
        }
    };
    this.getDesktopList = function () {
        return this.configList.desktopList
    };
    this.setDesktopList = function (a) {
        this.configList.desktopList = a
    };
    this.getDefaultDesktopList = function () {
        return f
    };
    this.getMustInstallAppList = function () {
        return t
    };
    this.setAppListQueue = function (a) {
        var b = [],
            c;
        for (c in a) b.push(parseInt(a[c]));
        this.configList.setupAppList = b;
        x()
    };
    this.isInSetupAppList = function (b) {
        return a.array.indexOf(this.getSetupAppList(),
            b) == -1 ? !1 : !0
    };
    this.sendGetAppInfo = function (b, c) {
        var e = function (a) {
            v[a] || (v[a] = 0);
            return ++v[a] > 1
        };
        b.vfwebqq = alloy.portal.getVfWebQQ();
        alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "keycgi/qqweb/market/getappinfo.do", {
            context: d,
            method: "POST",
            data: {
                appattrib: a.json.stringify(b),
                vfwebqq: alloy.portal.getVfWebQQ()
            },
            arguments: b,
            onSuccess: function (d) {
                d.retcode === 0 ? (d = d.result.resultData, d.folderId = alloy.desktopManager.getCurrentDesktopIndex(), c(d)) : (e("appInfo") || setTimeout(function () {
                        sendGetAppInfo(b)
                    },
                    3E3), a.out("\u5e94\u7528\u4ecb\u7ecd\u62c9\u53d6\u5931\u8d25" + d.errmsg))
            },
            onError: function () {
                e("appInfo") || setTimeout(function () {
                    sendGetAppInfo(b)
                }, 3E3);
                a.out("\u5e94\u7528\u62c9\u53d6\u5931\u8d25")
            }
        })
    };
    this.addSetupApp = function (a) {
        d.sendGetAppInfo({
            appid: a,
            loadMethod: 0
        }, d.add2SetupAppList)
    };
    this.add2SetupAppList = function (c) {
        if (c.flag == 4 && alloy.portal.getPortalSelf("vipInfo") <= 0) return alloy.layout.confirm('                <div style="margin-top:25px;margin-left:50px;">                <img style="float:left;" src="' +
            qqweb.CONST.CDN_URL_0 + 'style/images/yellow_warning.png" alt="\u60a8\u8fd8\u672a\u5f00\u901a\u4f1a\u5458"/>                <div style="width:180px;height:60px; font-size:14px;float:left;margin-left:5px;">\u5bf9\u4e0d\u8d77\uff01\u60a8\u8fd8\u4e0d\u662fQQ\u4f1a\u5458\uff0c\u4e0d\u80fd\u4f18\u5148\u4f53\u9a8c\u4f1a\u5458\u4e13\u5c5e\u5e94\u7528</div >                </div>                ', function () {
                window.open("http://pay.qq.com/qqvip/index.shtml?aid=vip.client.webqq.addapp.kaitong")
            }, {
                okButtonDecorator: {
                    background: "url(" + qqweb.CONST.CDN_URL_0 + "style/images/vip_open_button.png) -1px",
                    width: "83px",
                    textIndent: "-999px"
                },
                height: 180,
                autoClose: !0
            }), !1;
        if (d.getSetupAppList().length >= 200) return qqweb.layout.alert("\u5e94\u7528\u6dfb\u52a0\u91cf\u6700\u591a\u4e3a200\u4e2a,\u8bf7\u5220\u51cf\u90e8\u5206\u5e94\u7528\u540e\u518d\u6dfb\u52a0\u3002"), !1;
        else if (!d.isInSetupAppList(c.id) && !e.id("appAlert_category_select_" + c.id)) return a.profile("add2SetupAppList"), qqweb.appconfig.addAppConfig(c), d.getSetupAppList().unshift(c.id),
        x(), b.notifyObservers(d, "AddSetupAppList", c), c.id < 1E5 && alloy.util.report2app("appbar|menu|addapp|" + c.id), !0
    };
    this.setDeleteAppList = function (a) {
        w.push(a)
    };
    this.getDeleteAppList = function () {
        return w
    };
    this.removeSetupAppList = function (c, e, f) {
        a.profile("removeSetupAppList");
        if (c.cannotUninstall) return alloy.layout.alert("\u62b1\u6b49\uff0c\u6b64\u5e94\u7528\u3010" + c.appName + "\u3011\u4e0d\u80fd\u5220\u9664\uff01"), !1;
        alloy.appconfig.removeAppConfig(c);
        this.removeFromRunStatusList(c.id, !0);
        a.array.remove(this.getSetupAppList(),
            parseInt(c.id));
        e !== !1 && (x(), c.id < 1E5 && alloy.util.report2app("appbar|menu|delapp|" + c.id));
        f || b.notifyObservers(d, "RemoveSetupAppList", c)
    };
    this.getSetupAppList = function () {
        return this.configList.setupAppList
    };
    this.getDefaultSetupAppList = function () {
        return this.configList.defaultSetupAppList
    };
    this.isSetupAppListLoaded = function () {
        return j
    };
    this.offlineSetupAppList = function () {
        j = !1;
        this.configList.setupAppList = m.concat()
    };
    this.removeFromRunStatusList = function (b, c) {
        if (this.configList.runStatus) {
            var e = this.configList.runStatus,
                f = !1;
            a.isArray(b) || (b = [b]);
            for (var h in e) {
                var m = Number(h);
                a.array.indexOf(this.getSetupAppList(), m) == -1 && (e[h] = null, delete e[h], f = !0)
            }
            for (var k in b) h = b[k], e[h] && (e[h] = null, delete e[h], f = !0);
            f && !c && (e = {
                data: {
                    retype: 1,
                    r: {
                        appid: 0,
                        value: {
                            runWidgets: d.getRunStatus()
                        }
                    }
                }
            }, alloy.rpcService.sendSetConfig(e))
        }
    };
    this.restoreConfig = function (a) {
        var c = !1,
            e = {};
        if (a.appConfig) c = !0, e.setupAppList = m, b.notifyObservers(d, "RestoreAppList");
        if (a.theme) c = !0, e.theme = l.id, e.wallpaper = p, e.appearance = o;
        if (a.desktopSetting) c = !0, e.dockLoca = "left", e.navTop = 1, e.defaultScreen = 3;
        c && alloy.rpcService.sendSetConfig({
            data: {
                retype: 1,
                r: {
                    appid: 0,
                    value: e
                }
            }
        })
    };
    this.getTheme = function () {
        return this.configList.theme
    };
    this.setTheme = function (b) {
        a.profile("setTheme");
        if (!(alloy.portal.getLoginLevel() < 2) && b) {
            var c = {};
            c.data = {
                retype: 1,
                r: {
                    appid: 0,
                    value: {
                        theme: b
                    }
                }
            };
            alloy.rpcService.sendSetConfig(c);
            this.configList.theme.id = b
        }
    };
    this.getWallpaper = function () {
        return this.configList.wallpaper
    };
    this.setWallpaper = function (b) {
        a.profile("setWallpaper");
        if (!(alloy.portal.getLoginLevel() < 2) && b) {
            var c = {};
            c.data = {
                retype: 1,
                r: {
                    appid: 0,
                    value: {
                        wallpaper: b
                    }
                }
            };
            alloy.rpcService.sendSetConfig(c);
            this.configList.wallpaper = b
        }
    };
    this.getWallpaperList = function () {
        return this.configList.wallpaperList
    };
    this.getRunStatus = function () {
        return this.configList.runStatus
    };
    this.getDefaultRunWidget = function () {
        return r
    };
    this.addWallpaper = function (b) {
        a.array.indexOf(this.configList.wallpaperList, b.id) == -1 && this.configList.wallpaperList.push(b.fileId)
    };
    this.removeWallpaper = function (b) {
        a.array.remove(this.getWallpaperList(),
            b.fileId)
    };
    this.getAppearance = function () {
        return this.configList.appearance
    };
    this.setAppearance = function (b) {
        a.profile("setAppearance");
        if (!(alloy.portal.getLoginLevel() < 2) && b) {
            var c = {};
            c.data = {
                retype: 1,
                r: {
                    appid: 0,
                    value: {
                        appearance: b
                    }
                }
            };
            alloy.rpcService.sendSetConfig(c);
            this.configList.appearance.id = b
        }
    };
    this.setCustomTheme = function (b) {
        a.profile("setCustomTheme");
        if (!(alloy.portal.getLoginLevel() < 2) && b.wallpaper) {
            var c = b.skin,
                d = b.wallpaper,
                b = {};
            b.data = {
                retype: 1,
                r: {
                    appid: 0,
                    value: {
                        appearance: c,
                        wallpaper: d
                    }
                }
            };
            alloy.rpcService.sendSetConfig(b);
            this.configList.appearance.id = c;
            this.configList.wallpaper = d
        }
    };
    this.isDeveloper = function () {
        return !!qqweb.config.uacResult["0"].isDeveloper
    };
    this.setThemeAndCustomTheme = function (a, b, c) {
        if (!(alloy.portal.getLoginLevel() < 2)) {
            c = c || "";
            this.configList.appearance.id = c;
            this.configList.wallpaper = b;
            this.configList.theme.id = a;
            var d = {};
            if (a) d.theme = a;
            if (b) d.appearance = c, d.wallpaper = b;
            a = {};
            a.data = {
                retype: 1,
                r: {
                    appid: 0,
                    value: d
                }
            };
            alloy.rpcService.sendSetConfig(a)
        }
    };
    this.getDiskList =
        function () {
            return this.configList.diskList
    };
    this.getDefaultDisk = function () {
        return this.configList.defaultDisk
    };
    this.init = function () {
        alloy.util.report2h("get_custom", "start");
        b.addObserver(alloy.system, "UACReady", D);
        b.addObserver(alloy.appconfig, "GetAppConfigError", c);
        var e = {
            appid: {
                0: ["theme", "wallpaper", "wallpaperList", "appearance", "setupAppList", "isShowTip", "runWidgets", "msgBubblePos", "notifySetting", "isDeveloper", "dockLoca", "defaultScreen", "navTop", "hasRecentFolder", "defaultDisk", "diskList", "desktopIconStyle"],
                50: ["chatboxMode", "isNotNeedCtrlKey", "fontFormat", "useBigHead"]
            }
        };
        a.profile("getCustom");
        typeof progress == "function" && progress("get_uac start");
        var f = 0,
            h = function () {
                m.data.r = e;
                qqweb.rpcService.sendGetConfig(m);
                f++
            }, m = {
                onSuccess: qqweb.config.onConfigGetSuc,
                action: "mget",
                context: this,
                onError: function () {
                    typeof progress == "function" && progress("get_uac error", 0);
                    alloy.util.report2qqweb("config|uac|error");
                    f == 0 ? h() : timeoutConfirm("\u81ea\u5b9a\u4e49\u4fe1\u606f\u83b7\u53d6\u51fa\u9519,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f\n\u70b9\u53d6\u6d88\u4f7f\u7528\u9ed8\u8ba4\u914d\u7f6e\u3002") ||
                        b.notifyObservers(alloy.portal, "SimpleUACReady", {
                            uacLoaded: 1
                        })
                },
                onTimeout: function () {
                    alloy.util.report2qqweb("config|uac|timeout");
                    typeof progress == "function" && progress("get_uac timeout", 0);
                    f == 0 ? h() : timeoutConfirm("\u81ea\u5b9a\u4e49\u4fe1\u606f\u83b7\u53d6\u8d85\u65f6,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f\n\u70b9\u53d6\u6d88\u4f7f\u7528\u9ed8\u8ba4\u914d\u7f6e\u3002") || b.notifyObservers(alloy.portal, "SimpleUACReady", {
                        uacLoaded: 2
                    })
                },
                data: {
                    r: e
                }
            };
        b.notifyObservers(d, "BeforeGetUAC");
        qqweb.rpcService.sendGetConfig(m)
    };
    d.__eqqid = 50;
    this.sendsetAppNotify = function (b, c) {
        a.profile("sendsetAppNotify");
        alloy.portal.getLoginLevel() != 1 && j && alloy.rpcService.sendSetConfig({
            onSuccess: function () {},
            context: d,
            data: {
                retype: 1,
                r: {
                    appid: b,
                    value: {
                        notifications: c
                    }
                }
            }
        })
    };
    this.requestGrant = function (c) {
        var e = !0;
        alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi/qqweb/app/loadappnew.do", {
            context: d,
            data: {
                r: a.json.stringify({
                    appid: c.gaid ? 0 : c.appId,
                    id: c.gaid,
                    loginParam: c.loginParam || ""
                })
            },
            method: "POST",
            arguments: c,
            onSuccess: function (d) {
                if (0 !==
                    d.retcode) a.isFunction(c.onSuccess) && c.onSuccess({
                    auth: !1
                });
                else {
                    e = !1;
                    var f = d.result,
                        d = d.arguments,
                        h = alloy.portal.getAllConfig(d.appId);
                    h.exinfo.isAuth = 1;
                    var m = g.parseURL(h.appUrl);
                    if (null !== m) {
                        var r = {};
                        m.query && (r = g.mapQuery("?" + m.query));
                        for (var q = 0, x = k.length; q < x; q++) {
                            var l = k[q];
                            l in f && (r[l] = f[l])
                        }
                        m.query = g.toQueryString(r);
                        h.selfConfig.appUrl = g.buildURL(m)
                    }
                    alloy.portal.cacheOpenkey({
                        appId: d.appId,
                        gaid: f.app_id,
                        openId: f.app_openid,
                        openKey: f.app_openkey
                    });
                    (c.authType || 0) != 1 && alloy.portal.runApp(h.id);
                    var d = ["app_id", "app_nonce", "app_lang", "app_userip", "app_ts", "sig"],
                        j;
                    for (j in d) a.isUndefined(f[d[j]]);
                    a.isFunction(c.onSuccess) && c.onSuccess({
                        auth: !0,
                        param: f
                    });
                    j = alloy.system.getApp(c.appId);
                    b.notifyObservers(j, "openId", {
                        openId: f.app_openid
                    })
                }
            },
            onComplete: function () {
                e && alloy.layout.alert("\u6388\u6743\u4fe1\u606f\u67e5\u8be2\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\uff01");
                e = null
            }
        })
    };
    this.renewalGrant = function (a) {
        var b = alloy.portal.getAllConfig(a.appId);
        alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL +
            "api/system/redoauth", {
                context: d,
                data: {
                    appid: b.gaid,
                    gaid: b.gaid,
                    app_openkey: a.openKey,
                    app_openid: a.openId
                },
                method: "GET",
                arguments: a,
                onSuccess: function (a) {
                    0 === a.retcode && alloy.portal.cacheOpenkey({
                        renewal: !0,
                        appId: a.arguments.appId
                    })
                }
            })
    };
    this.reRequestGrant = function (b) {
        alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi/qqweb/app/loadappnew.do", {
            context: d,
            data: {
                r: a.json.stringify(appid > 2E8 ? {
                    appid: 0,
                    id: b.appId
                } : {
                    appid: b.appId
                })
            },
            method: "POST",
            arguments: b,
            onSuccess: function (b) {
                var c = b.result,
                    d = b.arguments;
                0 === b.retcode && alloy.portal.cacheOpenkey({
                    appId: d.appId,
                    gaid: c.app_id,
                    openId: c.app_openid,
                    openKey: c.app_openkey
                });
                a.isFunction(d.onSuccess) && d.onSuccess(b)
            }
        })
    };
    this.setPortalConfig = function (a, b) {
        alloy.config.configList[a] = b;
        var c = {
            retype: 1,
            r: {
                appid: 0
            }
        };
        c.r.value = {};
        c.r.value[a] = b;
        alloy.rpcService.sendSetConfig({
            onSuccess: function () {},
            context: d,
            data: c
        })
    };
    this.getHttpsSetting = function () {
        a.isUndefined(s) && (s = Number(a.cookie.get("usehttps")));
        return s
    };
    this.setHttpsSetting = function (b) {
        s = Number(b);
        a.cookie.set("usehttps",
            s, alloy.CONST.DOMAIN, "/", 87600)
    }
});
Jx().$package("alloy.fileSystem", function (a) {
    var d = this,
        b = a.event,
        b = a.event,
        e = a.string,
        g = this.FILE_TYPE = {
            FOLDER: "dir",
            FILE: "file",
            APP: "app",
            BUDDY: "uin",
            GROUP: "gid"
        }, j = {}, l = {}, p = this.MAX_FOLDER_AMOUNT = 200,
        o = !1,
        s = !1,
        v, w = !1,
        t = !1,
        r = 0,
        m = function (a) {
            return a === null || typeof a === "undefined"
        }, f = function () {
            return t || alloy.portal.getLoginLevel() == alloy.CONST.LOGIN_LEVEL_NONE
        }, k = function () {
            var a = alloy.config.getDesktopList() || [];
            v = {
                t: g.FOLDER,
                id: -1,
                n: "root",
                items: a
            }
        }, q = this.getRootFolder = function () {
            v || k();
            return v
        },
        D = function (a, b, c) {
            if (a.items)
                for (var d in a.items) {
                    var e = a.items[d];
                    if (b(e, a.items) === !1) break;
                    e.t == g.FOLDER && c && D(e, b, !0)
                }
        }, c = function (a) {
            a = a || q();
            D(a, function (a) {
                j[a.t] || (j[a.t] = {});
                j[a.t][a.id] || l[a.t]++;
                if (a.t == alloy.fileSystem.FILE_TYPE.FOLDER && !a.c) a.c = "folder";
                j[a.t][a.id] = a
            }, !0)
        }, h = function (a, b, c) {
            if (!a.items) return null;
            for (var d in a.items) {
                var e = a.items[d];
                if (e.t == g.FOLDER)
                    if (e.id == b) return e;
                    else if (c && (e = h(e, b, c))) return e
            }
            return null
        }, A = function (a, b, c) {
            if (!a.items) return null;
            for (var d in a.items) {
                var e =
                    a.items[d];
                if (e.id == b.id && e.t == b.t) return a;
                else if (e.t == g.FOLDER && c && (e = A(e, b, c))) return e
            }
            return null
        }, x = function (a, b, c) {
            if (!a.items) return null;
            for (var d = 0, e = a.items.length; d < e; d++) {
                var f = a.items[d];
                if (f.id == b.id && f.t == b.t) return {
                    parent: a,
                    file: f,
                    position: d
                };
                else if (f.t == g.FOLDER && c && (f = x(f, b, c))) return f
            }
            return null
        };
    this.getFolderById = function (a, b) {
        return a == -1 ? q() : j[g.FOLDER][a] ? j[g.FOLDER][a] : (b = b || q(), h(b, a, !0))
    };
    this.getFolderByName = function (a) {
        var b = j[g.FOLDER] || {}, c;
        for (c in b)
            if (b[c].n ===
                a) return b[c];
        return null
    };
    this.getFolderByFile = function (a, b) {
        b = b || q();
        return a.t == g.FOLDER ? this.getFolderById(a.pid, b) : A(b, a, !0)
    };
    this.getFolderIdByFile = function (a, b) {
        var c = this.getFolderByFile(a, b);
        return c ? c.id : null
    };
    this.getFolderInfoByFolder = function (a, b) {
        b = b || q();
        if (m(a.pid)) {
            var c = x(b, a, !0);
            if (c) return {
                file: c.file,
                parent: c.folder,
                position: c.position
            }
        } else {
            for (var c = this.getFolderById(a.pid, b), d = 0, e = c.items.length; d < e; d++) {
                var f = c.items[d];
                if (f.id == a.id && f.t == g.FOLDER) return {
                    file: f,
                    parent: c,
                    position: d
                }
            }
            throw Error("the parent folder id is not correct!");
        }
        return null
    };
    this.getFileInfoByFile = function (a, b, c) {
        b = b || q();
        m(c);
        return x(b, a, !0)
    };
    this.getFileByFile = function (a) {
        return j[a.t] ? j[a.t][a.id] : null
    };
    this.getFilesByType = function (a) {
        return j[a] ? j[a] : null
    };
    this.getFilesByParent = function (a, b) {
        var c = this.getFolderById(a);
        if (c)
            if (b) {
                var d = [],
                    e, f;
                for (f in c.items) e = c.items[f], e.t == b && d.push(e);
                return d
            } else return c.items;
            else throw Error("the parent folder id is not correct!");
    };
    this.getFileAmount =
        function (a) {
            if (a) return l[a];
            else {
                var a = 0,
                    b;
                for (b in l) a += l[b];
                return a
            }
    };
    this.getFileByFileName = function (b, c, d, e) {
        var d = d || q(),
            e = a.isUndefined(e) ? !0 : e,
            c = c || [],
            f = [];
        D(d, function (a) {
            if (c && !(String(c).toLowerCase().indexOf(a.t) > -1)) return !0;
            if (a.n && a.n == b) return f.push(a), !1
        }, e);
        return f
    };
    this.searchFileByFileName = function (b, c, d, e) {
        var d = d || q(),
            e = a.isUndefined(e) ? !0 : e,
            c = c || "",
            f = [];
        D(d, function (a) {
            if (c && !(String(c).toLowerCase().indexOf(a.t) > -1)) return !0;
            a.n && String(a.n).toLowerCase().indexOf(b) > -1 &&
                f.push(a)
        }, e);
        return f
    };
    this.isInFolder = function (a, b, c) {
        return !!x(b, a, c)
    };
    var z = function (a, c, e, f) {
        var h = c.items ? c.items : c.items = [];
        !m(e) && e !== -1 ? h.splice(e, 0, a) : (h.push(a), e = h.length - 1);
        if (a.t == g.FOLDER || a.t == g.FILE) a.pid = c.id;
        j[a.t][a.id] || l[a.t]++;
        j[a.t][a.id] = a;
        a = {
            parent: c,
            file: a,
            position: e
        };
        f || b.notifyObservers(d, "FileAdd", a);
        return a
    };
    this.createFile = function (a, b, c, d, e) {
        var h = !0;
        f() && (h = !1);
        var C = this.getFolderById(b);
        if (C) {
            if (a.t == g.FOLDER) a.pid = b, a.items = a.items || [];
            if (m(c)) c = C.items.length;
            h ? (b = {
                fileList: [a],
                parent: C,
                position: c,
                callback: d
            }, b.noProcessStatus = e, F([a], C.id, c, null, b)) : (a.id = +new Date + r++, z(a, C, c, e))
        }
    };
    this.addFile = function (a, b, c, d, e) {
        f() && (d = !1);
        var b = m(b) ? 2 : Number(b),
            h = this.getFolderById(b);
        if (h) {
            a.id = Number(a.id);
            if (m(c) || c == -1) c = h.items.length;
            if (d) F([a], b, c, null, {
                fileList: [a],
                parent: h,
                position: c
            });
            else return z(a, h, c, e)
        } else throw Error("folder: " + b + " is not exist!");
    };
    this.addFiles = function (a, b, c, d, e) {
        f() && (d = !1);
        var b = m(b) ? 2 : Number(b),
            h = this.getFolderById(b);
        if (h) {
            if (m(c) ||
                c == -1) c = h.items.length;
            if (d) F(a, b, c, null, {
                fileList: a,
                parent: h,
                position: c
            });
            else
                for (var C in a) this.addFile(a[C], b, null, !1, e)
        } else throw Error("folder: " + b + " is not exist!");
    };
    var y = function (a, c, e, f, h) {
        if (m(e)) e = d.getFileInfoByFile(a).position;
        c.items.splice(e, 1);
        if (a.t === g.FOLDER) {
            if (f && a.items && a.items.length)
                for (f = a.items.length - 1; f >= 0; f--) y(a.items[f], a, f, !0, h);
            delete a.pid
        }
        j[a.t][a.id] && l[a.t]--;
        j[a.t][a.id] = null;
        delete j[a.t][a.id];
        a = {
            parent: c,
            file: a,
            position: e
        };
        h || b.notifyObservers(d, "FileDelete",
            a);
        return a
    };
    this.deleteFile = function (a, b, c, d, e, h) {
        f() && (e = !1);
        if (a.t == g.FOLDER && m(b)) b = a.pid;
        var C, n = !1;
        if (m(b)) {
            if (a = this.getFileInfoByFile(a)) n = a.file, C = a.parent, c = a.position
        } else if (C = this.getFolderById(b), m(c)) {
            if (a = this.getFileInfoByFile(a, C, !1)) n = a.file, C = a.parent, c = a.position
        } else n = C.items[c]; if (C && n) {
            if (n.t === g.FOLDER && n.items && n.items.length && !d) throw Error("the folder " + n.id + ' is not empty and isCascade is "' + !! d + '"!');
            if (e) H([n], C.id, null, {
                fileList: [n],
                parent: C,
                position: c,
                isCascade: d
            });
            else return y(n, C, c, d, h)
        } else return !1
    };
    this.deleteFiles = function (a, b, c, d) {
        f() && (c = !1);
        var e = this.getFolderById(b);
        if (e)
            if (c) H(a, e.id, null, {
                fileList: a,
                parent: e
            });
            else
                for (c = a.length - 1; c >= 0; c--) this.deleteFile(a[c], b, null, !0, !1, d);
            else return !1
    };
    var u = function (a, c, e, f, h, m) {
        y(a, f, h, !1, !0);
        z(a, c, e, !0);
        a = {
            file: a,
            targetId: c.id,
            targetPosition: e,
            sourceId: f.id,
            sourcePosition: h
        };
        m || b.notifyObservers(d, "FileMove", a);
        return a
    };
    this.moveFile = function (a, b, c, d, e, h, C) {
        f() && (h = !1);
        var n, k;
        m(d) ? a = this.getFileInfoByFile(a) :
            (k = this.getFolderById(d), a = this.getFileInfoByFile(a, k));
        if (a) k = a.parent, d = a.parent.id, e = a.position;
        else return !1;
        a = a.file;
        n = this.getFolderById(b);
        if (m(c) || c == -1) c = n.items.length;
        if (d == b) {
            if (c > n.items.length) c = n.items.length;
            c > e && c--;
            if (c == e) return !1
        }
        if (h) Q([a], b, c, d, e, null, {
            fileList: [a],
            targetFolder: n,
            targetPosition: c,
            sourceFolder: k,
            sourcePosition: e
        }), (a.t == g.BUDDY || a.t == g.GROUP) && qqweb.util.report2qqweb("deskcontact|use|move");
        else return b == 5 && b != d && V(!1), u(a, n, c, k, e, C)
    };
    this.copyFile = function (a,
        b, c) {
        var d = {}, e = {};
        arguments = {};
        var f = this.getFolderById(b),
            d = {
                objs: [a],
                dest: f
            };
        arguments = {
            fileList: [a],
            parent: f
        };
        e.data = d;
        e.arguments = arguments;
        e.onSuccess = c || G.onCopyFileSuccess;
        I(e)
    };
    this.fileDownload = function (a, b) {
        var c = {}, d = {};
        arguments = {};
        c = {
            objs: [a]
        };
        arguments = {
            fileList: [a]
        };
        d.data = c;
        d.arguments = arguments;
        d.onSuccess = b || function () {};
        d.action = "get_files";
        d.methon = "POST";
        B(d)
    };
    this.getFolderItems = function (a, b) {
        var c = {}, d = {};
        arguments = {};
        c = {
            obj: a,
            providers: alloy.storage.getBoundDisk()
        };
        arguments = {
            obj: a
        };
        d.data = c;
        d.arguments = arguments;
        d.onSuccess = b || G.onGetFolderItemSuccess;
        M(d)
    };
    this.openFile = function (b, c) {
        b.cookie_name && a.cookie.set(b.cookie_name, b.cookie_value, alloy.CONST.MAIN_DOMAIN, "", 0.5);
        var d = alloy.util.getFileExt(b.n).toLowerCase(),
            e = {};
        switch (d) {
        case "jpg":
        case "jpeg":
        case "bmp":
        case "png":
        case "gif":
            e = {
                type: d,
                files: [{
                    url: c,
                    title: b.n
                }]
            };
            break;
        case "txt":
        case "doc":
        case "docx":
        case "ppt":
        case "pptx":
        case "xls":
        case "xlsx":
        case "pdf":
            e = {
                type: d,
                files: [{
                    obj: b,
                    url: c,
                    title: b.n
                }]
            }
        }
        alloy.system.openFile(e)
    };
    this.cleanFiles = function (a, b) {
        var c = {}, d = {};
        arguments = {};
        c = {
            provider: a
        };
        arguments = {
            provider: a
        };
        d.data = c;
        d.arguments = arguments;
        d.onSuccess = b || G.onCleanFilesSuccess;
        d.action = "clean_files_by_provider";
        d.method = "POST";
        B(d)
    };
    var n = function (a, c) {
        var e = d.getFileByFile(a);
        if (!e) return !1;
        if (!m(a.n)) e.n = a.n;
        c || b.notifyObservers(d, "FileUpdate", e);
        return e
    };
    this.isFileNameExist = function (b, c, d) {
        var c = a.isUndefined(d) ? j[c] : this.getFilesByParent(d),
            e;
        for (e in c)
            if (c[e].n == b) return !0;
        return !1
    };
    this.isFileNameAvailable =
        function (a, b, c) {
            var f = "\u6587\u4ef6\u5939";
            b == g.FILE && (f = "\u6587\u4ef6");
            if (a.replace(/[\\/:*?"<>|]/g, "") != a) return f + '\u540d\u79f0\u4e0d\u80fd\u5305\u542b\\/:*?"<>|\u7b49\u7279\u6b8a\u5b57\u7b26';
            if (a.replace(/\s/g, "") == "") return f + "\u540d\u79f0\u4e0d\u80fd\u53ea\u5305\u542b\u7a7a\u5b57\u7b26";
            else if (e.byteLength(a) > 48) return f + "\u540d\u79f0\u8fc7\u957f\uff08\u5b57\u6570\u6700\u591a\u4e3a24\u4e2a\u6c49\u5b57\u621648\u4e2a\u5b57\u7b26\uff09";
            else if (d.isFileNameExist(a, b, c)) return f + "\u540d\u79f0\u6709\u51b2\u7a81\uff0c\u8bf7\u8f93\u5165\u65b0\u7684\u540d\u79f0";
            return 0
    };
    this.getDefaultFolderName = function () {
        for (var a = "\u6587\u4ef6\u5939", b = 2; b < p; ++b) {
            if (!alloy.fileSystem.isFileNameExist(a, g.FOLDER)) break;
            a = "\u6587\u4ef6\u5939" + b + ""
        }
        b == p && (a = +new Date);
        return a
    };
    this.updateFile = function (a, b, c) {
        f() && (b = !1);
        var d = this.getFileInfoByFile(a);
        if (!d) return !1;
        a.on = d.file.n;
        if (b) J([a], d.parent.id, null, {
            fileList: [a],
            parent: d.parent
        });
        else return n(a, c)
    };
    this.updateFiles = function (a, b, c, d) {
        f() && (c = !1);
        var e = this.getFolderById(b);
        if (e)
            if (c) J(a, b, null, {
                fileList: a,
                parent: e
            });
            else
                for (var h in a) this.updateFile(a[h], !1, d);
            else return !1
    };
    var B = function (b) {
        if (alloy.portal.getLoginLevel() != alloy.CONST.LOGIN_LEVEL_NONE) {
            var b = b || {}, c = b.data || {};
            c.vfwebqq = alloy.portal.getVfWebQQ();
            for (var d in c)
                if (a.isObject(c[d]) || a.isArray(c[d])) c[d] = a.json.stringify(c[d]);
            b.data = c;
            b.method = b.method || "GET";
            b.onError = b.onError || G.onRequestError;
            b.onTimeout = b.onTimeout || G.onRequestTimeout;
            alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi/top/" + b.action, b)
        }
    }, F = function (a, c, e, f, h, C) {
            !C &&
                s ? b.notifyObservers(d, "FileProcessing", a) : (s = !0, c = {
                    objs: a,
                    pid: c,
                    ti: e < 0 ? 0 : e
                }, h = h || {}, h.noProcessStatus = m(h.noProcessStatus) ? C : h.noProcessStatus, h = {
                    data: c,
                    arguments: h
                }, h.onSuccess = f || G.onAddFileSuccess, h.onError = G.onAddFileError, h.onTimeout = G.onAddFileTimeout, h.action = "create", h.method = "POST", B(h), K(a, "create"))
        }, H = function (a, c, e, f, h) {
            if (!h && s) b.notifyObservers(d, "FileProcessing", a);
            else {
                s = !0;
                var C = [],
                    n;
                for (n in a) {
                    var k = a[n];
                    if (!h && N(k, !0)) return;
                    C.push({
                        t: k.t,
                        id: k.id
                    })
                }
                c = {
                    did: c,
                    objs: C
                };
                f = f || {};
                f.noProcessStatus =
                    m(f.noProcessStatus) ? h : f.noProcessStatus;
                f = {
                    data: c,
                    arguments: f
                };
                f.onSuccess = e || G.onDeleteFileSuccess;
                f.action = "remove";
                f.method = "POST";
                B(f);
                K(a, "del")
            }
        }, Q = function (a, c, e, f, h, C, n, k) {
            if (!k && s) b.notifyObservers(d, "FileProcessing", a);
            else {
                s = !0;
                var g = [],
                    y;
                for (y in a) {
                    var r = a[y];
                    if (!k && N(r, !0)) return;
                    g.push({
                        t: r.t,
                        id: r.id
                    })
                }
                n = n || {};
                n.noProcessStatus = m(n.noProcessStatus) ? k : n.noProcessStatus;
                n = {
                    arguments: n
                };
                if (c == f) n.action = "order", n.data = {
                    did: f,
                    from: h,
                    to: e,
                    count: g.length
                };
                else if (n.action = "move", n.data = {
                    objs: g,
                    did: f,
                    tid: c,
                    ti: e < 0 ? 0 : e
                }, c === 5) n.data.limit = 5, n.data.ofd = f;
                n.onSuccess = C || G.onMoveFileSuccess;
                n.method = "POST";
                B(n);
                K(a, "move")
            }
        }, J = this.sendUpdateFiles = function (a, c, e, f, h) {
            if (!h && s) b.notifyObservers(d, "FileProcessing", a);
            else {
                s = !0;
                var n = [],
                    C;
                for (C in a) {
                    var k = a[C];
                    if (!h && N(k, !0)) return;
                    var g = {
                        t: k.t,
                        id: k.id,
                        n: k.n
                    };
                    if (!m(k.n)) g.n = k.n, g.on = k.on;
                    n.push(g)
                }
                c = {
                    did: c,
                    objs: n
                };
                f = f || {};
                f.noProcessStatus = m(f.noProcessStatus) ? h : f.noProcessStatus;
                f = {
                    data: c,
                    arguments: f
                };
                f.onSuccess = e || G.onUpdateFileSuccess;
                f.action = "modify";
                f.method = "POST";
                B(f);
                K(a, "modify")
            }
        };
    this.sendUpdateProgress = function (a) {
        a.action = "update_progress";
        a.method = "POST";
        B(a)
    };
    var I = this.sendCopyFile = function (a) {
        a.action = "copy_file";
        a.method = "POST";
        B(a)
    };
    this.sendFileMove = function (a) {
        a.action = "file_move";
        a.method = "POST";
        B(a)
    };
    var M = this.sendGetFolderItem = function (a) {
        a.action = "get_folder";
        a.method = "POST";
        B(a)
    }, K = function (a, b) {
            var c = a[0];
            c.t == g.FOLDER ? alloy.util.report2qqweb("file|" + b + "|folder") : c.t == g.APP ? alloy.util.report2qqweb("file|" +
                b + "|app") : (c.t == g.BUDDY || c.t == g.GROUP) && alloy.util.report2qqweb("file|" + b + "|contact")
        }, U = function () {
            alloy.util.report2h("get_file_system", "start");
            a.profile("getDesktopStart");
            typeof progress == "function" && progress("get_file_system start");
            var b = 0,
                c = "pc";
            a.platform.iPad ? c = "pad" : window.webTop && (c = "air");
            var d = {
                onSuccess: G.onGetFileSystemConfigSuccess,
                context: this,
                data: {
                    from: c
                },
                onError: function () {
                    alloy.util.report2m(151396);
                    alloy.util.report2qqweb("config|file|error");
                    a.error("getDesktopError");
                    typeof progress ==
                        "function" && progress("get_file_system error", 0);
                    b == 0 ? (O(d), b++) : timeoutConfirm("\u8bfb\u53d6\u6587\u4ef6\u4fe1\u606f\u51fa\u9519\uff0c\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f\n\u70b9\u53d6\u6d88\u4f7f\u7528\u9ed8\u8ba4\u6587\u4ef6\u914d\u7f6e\u3002") || (t = !0, alloy.config.offlineSetupAppList(), L())
                },
                onTimeout: function () {
                    alloy.util.report2m(151395);
                    alloy.util.report2qqweb("config|file|timeout");
                    a.error("getDesktopTimeout");
                    typeof progress == "function" && progress("get_file_system timeout", 0);
                    b == 0 ? (O(d),
                        b++) : timeoutConfirm("\u8bfb\u53d6\u6587\u4ef6\u4fe1\u606f\u8d85\u65f6\uff0c\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f\n\u70b9\u53d6\u6d88\u4f7f\u7528\u9ed8\u8ba4\u6587\u4ef6\u914d\u7f6e\u3002") || (t = !0, alloy.config.offlineSetupAppList(), L())
                }
            };
            O(d)
        }, O = function (a) {
            a.action = "get_desk";
            a.method = "GET";
            B(a)
        }, G = {
            onBeforeGetUAC: function () {
                o = !1
            },
            onSimpleUACReady: function (a) {
                a.uacLoaded ? (t = !0, w = !1) : (t = !1, w = !0);
                w && alloy.portal.getLoginLevel() > alloy.CONST.LOGIN_LEVEL_NONE ? alloy.config.isNewUser ? (alloy.config.restoreConfig({
                        appConfig: 1
                    }),
                    L()) : U() : (t = !0, L())
            },
            onGetFileSystemConfigSuccess: function (b) {
                if (b && b.retcode == 0)
                    if (alloy.util.report2h("get_file_system", "end", "ok"), a.profile("getDesktopSuccess"), b = b.result.values, m(b) || alloy.config.setDesktopList(b), b = alloy.config.getDesktopList(), b.length < 5) alloy.util.report2m(151401), a.error("getDesktopFail : desktop data part missing"), timeoutConfirm("\u8bfb\u53d6\u5230\u7684\u684c\u9762\u6570\u636e\u90e8\u5206\u6570\u636e\u4e22\u5931, \u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f\n\u70b9\u53d6\u6d88\u4f7f\u7528\u9ed8\u8ba4\u6587\u4ef6\u914d\u7f6e\u3002") ||
                        (t = !0, alloy.config.offlineSetupAppList(), alloy.config.setDesktopList(alloy.config.getDefaultDesktopList()), L());
                    else {
                        var c = 0,
                            d;
                        for (d in b) b[d].items && b[d].items.length && (c += b[d].items.length);
                        c ? (w && (t = !1), L()) : (alloy.util.report2m(151398), a.error("getDesktopFail : empty desktop"), timeoutConfirm("\u8bfb\u53d6\u5230\u7684\u684c\u9762\u6570\u636e\u4e0d\u6b63\u786e, \u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f\n\u70b9\u53d6\u6d88\u4f7f\u7528\u9ed8\u8ba4\u6587\u4ef6\u914d\u7f6e\u3002") || (t = !0, alloy.config.offlineSetupAppList(),
                            alloy.config.setDesktopList(alloy.config.getDefaultDesktopList()), L()))
                    } else alloy.util.report2m(151397), alloy.util.report2h("get_file_system", "end", "error"), a.error("getDesktopFail : retcode=" + b.retcode), timeoutConfirm("\u8bfb\u53d6\u684c\u9762\u6570\u636e\u51fa\u9519\uff0c\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f\n\u70b9\u53d6\u6d88\u4f7f\u7528\u9ed8\u8ba4\u6587\u4ef6\u914d\u7f6e\u3002") || (t = !0, alloy.config.offlineSetupAppList(), L())
            },
            onAddSetupAppList: function (a) {
                var b = a.folderId;
                d.getFolderById(b);
                d.addFile({
                    t: g.APP,
                    id: a.id
                }, b, -1, !0)
            },
            onRemoveSetupAppList: function (a) {
                d.deleteFile({
                    t: g.APP,
                    id: a.id
                }, null, null, !1, !a.noSave)
            },
            onRestoreAppList: function () {
                var a = alloy.config.getDefaultDesktopList(),
                    b = [g.APP, g.BUDDY, g.GROUP, g.FOLDER, g.FILE],
                    c = [],
                    d;
                for (d in a) c.push(a[d].items);
                B({
                    data: {
                        objects: c,
                        types: b
                    },
                    onSuccess: void 0,
                    action: "reset",
                    method: "POST"
                })
            },
            onRequestError: function (c) {
                s = !1;
                var e = c.arguments.fileList,
                    f;
                for (f in e) N(e[f], !1);
                a.error("FileOperateError");
                c.arguments.noProcessStatus || b.notifyObservers(d,
                    "FileOperateError", c.arguments)
            },
            onRequestTimeout: function (c) {
                s = !1;
                var e = c.arguments.fileList,
                    f;
                for (f in e) N(e[f], !1);
                a.error("FileOperateTimeout");
                c.arguments.noProcessStatus || b.notifyObservers(d, "FileOperateTimeout", c.arguments);
                e = c.arguments;
                delete c.arguments;
                alloy.rpcService.sendFileErrorReport({
                    request: e,
                    response: c
                })
            },
            onAddFileError: function (c) {
                a.error("AddFileError");
                s = !1;
                c.arguments.noProcessStatus || b.notifyObservers(d, "FileOperateError", c.arguments)
            },
            onAddFileTimeout: function (c) {
                a.error("AddFileTimeout");
                s = !1;
                c.arguments.noProcessStatus || b.notifyObservers(d, "FileOperateTimeout", c.arguments);
                var e = c.arguments;
                delete c.arguments;
                alloy.rpcService.sendFileErrorReport({
                    request: e,
                    response: c
                })
            },
            onAddFileSuccess: function (c) {
                s = !1;
                if (c.retcode == 0 && c.result && c.result.code == 0) {
                    var e = c.result.objs || [],
                        c = c.arguments,
                        f = m(c.position) ? c.parent.items.length : c.position,
                        h;
                    for (h in e) {
                        var n = e[h];
                        if (n.t == g.FILE) n.upload = 1;
                        z(n, c.parent, f);
                        f += 1;
                        a.isFunction(c.callback) && c.callback(n)
                    }
                } else a.error("AddFileFail"), c.arguments.noProcessStatus ||
                    b.notifyObservers(d, "AddFileFail", c), c.arguments.fileList && c.arguments.fileList[0] && (n = c.arguments.fileList[0], n.t == g.FOLDER ? alloy.util.report2m(151383) : n.t == g.APP ? alloy.util.report2m(151387) : (n.t == g.BUDDY || n.t == g.GROUP) && alloy.util.report2m(151391)), e = c.arguments, delete c.arguments, alloy.rpcService.sendFileErrorReport({
                        request: e,
                        response: c
                    })
            },
            onDeleteFileSuccess: function (c) {
                s = !1;
                if (c.retcode == 0 && c.result && c.result.code == 0) {
                    var c = c.arguments,
                        e = c.fileList,
                        f;
                    for (f in e) {
                        var h = e[f];
                        N(h, !1);
                        y(h, c.parent,
                            c.position, c.isCascade)
                    }
                } else a.error("DeleteFileFail"), E(c.arguments.fileList, !1), c.arguments.noProcessStatus || b.notifyObservers(d, "DeleteFileFail", c.arguments), c.arguments.fileList && c.arguments.fileList[0] && (h = c.arguments.fileList[0], h.t == g.FOLDER ? alloy.util.report2m(151385) : h.t == g.APP ? alloy.util.report2m(151389) : (h.t == g.BUDDY || h.t == g.GROUP) && alloy.util.report2m(151393)), f = c.arguments, delete c.arguments, alloy.rpcService.sendFileErrorReport({
                    request: f,
                    response: c
                })
            },
            onMoveFileSuccess: function (c) {
                s = !1;
                if (c.retcode == 0 && c.result && c.result.code == 0) {
                    var c = c.arguments,
                        e = c.fileList,
                        f = c.targetFolder.id,
                        h;
                    for (h in e) {
                        var m = e[h];
                        N(m, !1);
                        f == 5 && f != c.sourceFolder.id && V(!1);
                        u(m, c.targetFolder, c.targetPosition, c.sourceFolder, c.sourcePosition)
                    }
                } else a.error("MoveFileFail"), E(c.arguments.fileList, !1), c.arguments.noProcessStatus || b.notifyObservers(d, "MoveFileFail", c.arguments), c.arguments.fileList && c.arguments.fileList[0] && (m = c.arguments.fileList[0], m.t == g.FOLDER ? alloy.util.report2m(151384) : m.t == g.APP ? alloy.util.report2m(151388) :
                    (m.t == g.BUDDY || m.t == g.GROUP) && alloy.util.report2m(151392)), h = c.arguments, delete c.arguments, alloy.rpcService.sendFileErrorReport({
                    request: h,
                    response: c
                })
            },
            onCopyFileSuccess: function (a) {
                if (a.retcode == 0 && a.result && a.result.code == 0) {
                    var c = a.arguments,
                        a = a.result.objs,
                        e;
                    for (e in a) {
                        var f = a[e];
                        N(f, !1);
                        alloy.storage.useSpace(f.s, f.size);
                        z(f, c.parent, null, null)
                    }
                } else E(a.arguments.fileList, !1), a.arguments.noProcessStatus || b.notifyObservers(d, "CopyFileFail", a.arguments), c = a.arguments, delete a.arguments, alloy.rpcService.sendFileErrorReport({
                    request: c,
                    response: a
                })
            },
            onGetFolderItemSuccess: function (a) {
                a.retcode == 0 && a.result && a.result.code == 0 ? b.notifyObservers(d, "GetFolderItemSuccess", a) : b.notifyObservers(d, "GetFolderItemFail", a)
            },
            onCleanFilesSuccess: function (a) {
                if (a.retcode == 0 && a.result && a.result.code == 0) {
                    var c = j[g.FILE],
                        e;
                    for (e in c) {
                        var f = c[e];
                        f.s === a.arguments.provider && d.deleteFile(f, null, null, null, !1, !1)
                    }
                    b.notifyObservers(d, "CleanFilesSuccess", a.arguments.provider)
                } else alloy.layout.alert("\u89e3\u9664\u7ed1\u5b9a\u5931\u8d25\uff01")
            },
            onUpdateFileSuccess: function (c) {
                s = !1;
                if (c.retcode == 0 && c.result && c.result.code == 0) {
                    var c = c.arguments.fileList,
                        e;
                    for (e in c) {
                        var f = c[e];
                        N(f, !1);
                        n(f)
                    }
                } else a.error("UpdateFileFail"), E(c.arguments.fileList, !1), c.arguments.noProcessStatus || b.notifyObservers(d, "UpdateFileFail", c.arguments), c.arguments.fileList && c.arguments.fileList[0] && (f = c.arguments.fileList[0], f.t == g.FOLDER ? alloy.util.report2m(151386) : f.t == g.APP ? alloy.util.report2m(151390) : (f.t == g.BUDDY || f.t == g.GROUP) && alloy.util.report2m(151394)), e = c.arguments, delete c.arguments, alloy.rpcService.sendFileErrorReport({
                    request: e,
                    response: c
                })
            }
        }, V = function (a) {
            var b = alloy.fileSystem.getFolderById(5);
            if (b.items.length >= 5)
                for (var c = alloy.desktopManager.getCurrentDesktopIndex(), b = b.items; b.length >= 5;) {
                    var e = b.length - 1;
                    d.moveFile(b[e], c, null, 5, e, !! a)
                }
        }, N = function (a, c) {
            if (c) {
                if (a.processing) return b.notifyObservers(d, "FileProcessing", a), !0;
                a.processing = !0;
                b.notifyObservers(d, "FileBeforeProcess", a)
            } else delete a.processing, b.notifyObservers(d, "FileProcessed", a)
        }, E = function (b, c) {
            if (a.isArray(b))
                for (var d in b) N(b[d], c);
            else N(b, c)
        },
        L = function () {
            k();
            j = {};
            j[g.FOLDER] = {};
            j[g.FILE] = {};
            j[g.APP] = {};
            j[g.BUDDY] = {};
            j[g.GROUP] = {};
            l = {};
            l[g.FOLDER] = 0;
            l[g.FILE] = 0;
            l[g.APP] = 0;
            l[g.BUDDY] = 0;
            l[g.GROUP] = 0;
            c();
            f() || C();
            o = !0;
            b.notifyObservers(d, "FileSystemReady");
            b.notifyObservers(alloy.portal, "UACReady")
        }, R = [],
        W = function () {}, P = function (b) {
            s = !1;
            if (!(b.retcode == 0 && b.result && b.result.code == 0)) {
                a.error("AddFileFail");
                var c = b.arguments;
                delete b.arguments;
                alloy.rpcService.sendFileErrorReport({
                    request: c,
                    response: b
                })
            }
        }, T = function (a) {
            R.push(a)
        }, $ = function () {
            for (var a; a =
                R.shift();) setTimeout(a, 500)
        }, C = function () {
            var b = alloy.config.getSetupAppList(),
                c = alloy.config.configList.defaultScreen,
                c = m(c) ? 2 : c - 1,
                e = d.getFolderById(c),
                f = d.getFolderById(5),
                h = [],
                n, C = !1,
                k = alloy.config.getMustInstallAppList(),
                y;
            for (y in k) {
                var r = Number(y);
                alloy.config.isInSetupAppList(r) || (C = !0, n = {
                    t: g.APP,
                    id: r
                }, b.push(r), d.getFileByFile(n) || (h.push(n), d.addFile(n, 5, 0, !1, !0)))
            }
            if (C && (a.profile("forceInstallApp"), alloy.config.sendSetSetupAppList(), h.length)) {
                var q = f.items.length,
                    x = h.concat();
                T(function () {
                    F(x,
                        5, q, P, {
                            fileList: x
                        }, !0)
                })
            }
            h = [];
            if (f.items.length > 5)
                for (n = f.items; n.length > 5;) r = n.length - 1, h.push(n[r]), d.moveFile(n[r], c, null, 5, r, !1, !0);
            if (h.length && (a.profile("checkDock"), !C)) {
                var ja = h.concat();
                T(function () {
                    Q(ja, c, 0, 5, null, W, {
                        fileList: ja
                    }, !0)
                })
            }
            h = [];
            C = d.getFilesByType(g.APP);
            for (y in b) C[b[y]] || (n = {
                t: g.APP,
                id: b[y]
            }, h.push(n));
            if (h.length) {
                a.profile("addMissApp");
                d.addFiles(h, c, -1, !1, !0);
                var u = h.concat(),
                    R = e.items.length;
                T(function () {
                    F(u, c, R, P, {
                        fileList: u
                    }, !0)
                })
            }
            var e = {}, h = !1,
                l;
            for (l in C)
                if ((r =
                    Number(C[l].id)) && a.array.indexOf(b, r) == -1) h = !0, n = C[l], y = d.getFileInfoByFile(n), e[y.parent.id] || (e[y.parent.id] = {}), e[y.parent.id][n.id] = n, d.deleteFile(n, null, null, !1, !1, !0);
            if (h) {
                a.profile("removeSurplusApp");
                for (var j in e) {
                    b = [];
                    l = Number(j);
                    for (var s in e[j]) b.push(e[j][s]);
                    T(a.bind(function (a) {
                        H(a.fileList, a.folderId, W, null, !0)
                    }, d, {
                        fileList: b,
                        folderId: l
                    }))
                }
            }
            $()
        };
    this.createRecentContactFolder = function (a) {
        if (!f()) {
            var b = d.getFolderByName("\u5e38\u7528\u8054\u7cfb\u4eba");
            if (b) {
                if (a.length) {
                    var c =
                        16 - b.items.length;
                    a.length > c && a.splice(c);
                    d.addFiles(a, b.id, null, !1);
                    F(a, b.id, 0, P, null, !0)
                }
                alloy.config.setPortalConfig("hasRecentFolder", 1)
            } else b = {
                t: g.FOLDER,
                n: "\u5e38\u7528\u8054\u7cfb\u4eba"
            }, d.createFile(b, alloy.config.configList.defaultScreen - 1, null, function (b) {
                alloy.config.setPortalConfig("hasRecentFolder", 1);
                a.length && (d.addFiles(a, b.id, null, !1), F(a, b.id, 0, P, null, !0))
            }, !0)
        }
    };
    this.isFileSystemReady = function () {
        return o
    };
    this.init = function () {
        b.addObserver(alloy.portal, "SimpleUACReady", G.onSimpleUACReady);
        b.addObserver(alloy.config, "BeforeGetUAC", G.onBeforeGetUAC);
        b.addObserver(alloy.config, "AddSetupAppList", G.onAddSetupAppList);
        b.addObserver(alloy.config, "RemoveSetupAppList", G.onRemoveSetupAppList);
        b.addObserver(alloy.config, "RestoreAppList", G.onRestoreAppList)
    }
});
Jx().$package("alloy.storage.rpcService", function (a) {
    var d = {
        onRequestError: function () {},
        onRequestTimeout: function () {}
    }, b = function (b) {
            if (alloy.portal.getLoginLevel() != alloy.CONST.LOGIN_LEVEL_NONE) {
                var b = b || {}, g = b.data || {};
                g.vfwebqq = alloy.portal.getVfWebQQ();
                for (var j in g)
                    if (a.isObject(g[j]) || a.isArray(g[j])) g[j] = a.json.stringify(g[j]);
                b.data = g;
                b.method = b.method || "GET";
                b.onError = b.onError || d.onRequestError;
                b.onTimeout = b.onTimeout || d.onRequestTimeout;
                alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL +
                    "cloud/cs/" + b.action, b)
            }
        };
    this.copyFile = function (a) {
        a.action = "copy_file";
        a.method = "POST";
        b(a)
    };
    this.fileMove = function (a) {
        a.action = "file_move";
        a.method = "POST";
        b(a)
    };
    this.createUser = function (a) {
        a.action = "create_user";
        a.method = "POST";
        b(a)
    };
    this.fileRename = function (a) {
        a.action = "file_rename";
        a.method = "POST";
        b(a)
    };
    this.createDir = function (a) {
        a.action = "create_dir";
        a.method = "POST";
        b(a)
    };
    this.fileContUpload = function () {};
    this.queryUser = function (a) {
        a.action = "query_user";
        a.method = "POST";
        b(a)
    };
    this.fileRemove =
        function (a) {
            a.action = "file_remove";
            a.method = "POST";
            b(a)
    };
    this.queryFile = function () {};
    this.fileUpload = function (a) {
        a.action = "file_upload";
        a.method = "POST";
        b(a)
    };
    this.fileDownload = function (a) {
        a.action = "file_download";
        b(a)
    };
    this.updateFileLength = function () {};
    this.getHomeKey = function () {};
    this.queryDir = function (a) {
        a.action = "query_dir";
        a.method = "POST";
        b(a)
    };
    this.checkPassword = function (a) {
        a.action = "check_pass";
        a.method = "POST";
        b(a)
    }
});
Jx().$package("alloy.storage", function (a) {
    var d = this,
        b = alloy.storage.rpcService,
        e = a.event,
        g = a.dom,
        e = a.event,
        j = a.string,
        l = null,
        p = [],
        o = [],
        s = this.DISK = {
            QQDISK: "qqdisk",
            KINGSOFT: "kingsoft"
        }, v = d.diskConfig = {
            qqdisk: {
                id: 0,
                key: s.QQDISK,
                icon: "./module/diskexplorer/images/qqdisk.png",
                name: "QQ\u7f51\u76d8",
                userUsedSpace: 0,
                userTotalSpace: 1073741824,
                isPwdOpen: 0,
                isLocked: 0,
                dataReady: !1
            },
            kingsoft: {
                id: 1,
                key: s.KINGSOFT,
                icon: "./module/diskexplorer/images/kingsoft.png",
                name: "\u91d1\u5c71\u5feb\u76d8",
                userUsedSpace: 0,
                userTotalSpace: 5368709120,
                isPwdOpen: 0,
                isLocked: 0,
                dataReady: !1
            }
        }, w = [];
    (function () {
        var a, b = 0;
        for (a in v) v.hasOwnProperty(a) && (w[b++] = v[a])
    })();
    this.getTotalUsedSpace = function () {
        for (var a = 0, b = 0; b < p.length; b++) a += v[p[b]].userUsedSpace;
        return a
    };
    this.getTotalSpace = function () {
        for (var a = 0, b = 0; b < p.length; b++) a += v[p[b]].userTotalSpace;
        return a
    };
    this.getTotalSpaceById = function (a) {
        if (a == s.QQDISK) switch (alloy.portal.getPortalSelf().vip) {
        case 1:
            return 3221225472;
        case 2:
            return 4294967296;
        case 3:
            return 5368709120;
        case 4:
            return 6442450944;
        case 5:
            return 7516192768;
        case 6:
            return 8589934592;
        case 7:
            return 10737418240;
        default:
            return 1073741824
        } else if (a == s.KINGSOFT) return 5368709120
    };
    this.getFreeSpaceById = function (a) {
        return v[a].userTotalSpace - v[a].userUsedSpace
    };
    this.getDiskById = function (a) {
        return v[a]
    };
    this.getBoundDisk = function () {
        return p
    };
    this.addBoundDisk = function (b) {
        a.array.indexOf(p, b) < 0 && p.push(b);
        o = this.getUnBoundDisk()
    };
    this.removeBoundDisk = function (b) {
        a.array.remove(p, b);
        o = this.getUnBoundDisk()
    };
    this.sendSetBoundDisk =
        function (a) {
            alloy.rpcService.sendSetConfig({
                data: {
                    r: {
                        appid: 0,
                        value: {
                            diskList: a
                        }
                    }
                }
            })
    };
    this.getUnBoundDisk = function () {
        o = [];
        for (var a = {}, b = 0; b < p.length; b++) a[p[b]] = 1;
        for (b = 0; b < w.length; b++) a[w[b].key] || o.push(w[b].key);
        return o
    };
    this.setDefaultDisk = function (a) {
        l = a
    };
    this.sendSetBoundAndDefaultDisk = function (a, b) {
        a = a || alloy.storage.getBoundDisk();
        b = b || l;
        alloy.rpcService.sendSetConfig({
            data: {
                r: {
                    appid: 0,
                    value: {
                        defaultDisk: b,
                        diskList: a
                    }
                }
            }
        })
    };
    this.getDefaultDisk = function () {
        l = l || "qqdisk";
        return v[l]
    };
    this.useSpace =
        function (b, f) {
            a.isNumber(f) && (v[b].userUsedSpace += f, e.notifyObservers(d, "StorageSpaceChanged", b))
    };
    this.releaseSpace = function (b, f) {
        if (a.isNumber(f)) v[b].userUsedSpace -= f, v[b].userUsedSpace = v[b].userUsedSpace > 0 ? v[b].userUsedSpace : 0, e.notifyObservers(d, "StorageSpaceChanged", b)
    };
    this.receiveFile = function (b) {
        b.cookie_name && a.cookie.set(b.cookie_name, b.cookie_value, alloy.CONST.MAIN_DOMAIN, "", 0.5);
        var d = g.id("fs_download");
        if (typeof d == "undefined" || d == null) d = document.createElement("IFRAME"), d.id = "fs_download",
        d.name = "fs_download", d.src = alloy.CONST.MAIN_URL + "domain.html", d.style.display = "none", document.body.appendChild(d);
        d.src = b.url
    };
    this.fileDownload = function (a, e) {
        b.fileDownload({
            data: {
                target: e,
                obj: a
            },
            onSuccess: function (a) {
                a.retcode == 0 && a.result && a.result.code == 0 && d.receiveFile(a.result)
            }
        })
    };
    this.fileView = function (d, e) {
        b.fileDownload({
            data: {
                target: e,
                obj: d
            },
            onSuccess: function (b) {
                if (b.retcode == 0 && b.result && b.result.code == 0) {
                    var e = a.extend({}, d, b.result, b.result.obj);
                    alloy.fileSystem.openFile(e, b.result.url)
                }
            }
        })
    };
    this.openFile = function (a, b) {
        var d = alloy.util.getFileExt(a.n).toLowerCase();
        alloy.system.isOpenFile(d) && this.fileView(a, b)
    };
    this.createFile = function (a, f) {
        var k = this.getExplorerInstance(),
            g = k.getCurFolder(),
            r = k.getCurDisk(),
            k = a.fileSize;
        alloy.storage.getFreeSpaceById(r) < k ? alloy.storage.storageFullAlert(r) : (g = {
            target: r,
            file: {
                t: alloy.fileSystem.FILE_TYPE.FILE,
                n: a.fileName,
                size: k,
                md5: "",
                sha: ""
            },
            parent: g
        }, g.parent == "root" && delete g.parent, b.fileUpload({
            data: g,
            onSuccess: function (a) {
                a.retcode == 0 && a.result &&
                    a.result.code == 0 ? (a = a.result.obj, a.upload = 1, d.useSpace(r, a.size), e.notifyObservers(d, "ExplorerFileAdd", a), f && f(a)) : a.retcode == 0 && a.result && a.result.code == 30001 ? alloy.storage.storageFullAlert() : alloy.layout.alert("\u4e0a\u4f20\u6587\u4ef6\u5931\u8d25\uff01")
            }
        }))
    };
    this.createDir = function () {
        var a = {}, b = {}, k = this.getExplorerInstance();
        a.target = k.getCurDisk();
        a.obj = k.getCurFolder();
        a.obj == "root" && delete a.obj;
        b.data = a;
        b.onSuccess = function (a) {
            a.retcode == 0 && a.result && a.result.code == 0 ? e.notifyObservers(d,
                "ExplorerFileAdd", a.result.obj) : alloy.layout.alert("\u521b\u5efa\u6587\u4ef6\u5939\u5931\u8d25\uff01")
        };
        alloy.storage.rpcService.createDir(b)
    };
    var t = function (a) {
        if (a.replace(/[\\/:*?"<>|]/g, "") != a) return '\u540d\u79f0\u4e0d\u80fd\u5305\u542b\\/:*?"<>|\u7b49\u7279\u6b8a\u5b57\u7b26';
        else if (j.byteLength(a) > 48) return "\u6587\u4ef6\u5939\u540d\u79f0\u8fc7\u957f\uff08\u5b57\u6570\u6700\u591a\u4e3a24\u4e2a\u6c49\u5b57\u621648\u4e2a\u5b57\u7b26\uff09";
        return 0
    };
    this.fileRename = function (a, b) {
        var k = t(b);
        if (k ==
            0) {
            var k = {}, g = {}, r = this.getExplorerInstance();
            k.target = r.getCurDisk();
            a.n = b;
            k.obj = a;
            g.data = k;
            g.arguments = {
                obj: a
            };
            g.onSuccess = function (a) {
                a.retcode == 0 && a.result && a.result.code == 0 ? e.notifyObservers(d, "ExplorerFileRename", a.arguments.obj) : a.result.code == 33333 ? alloy.layout.alert("\u7cfb\u7edf\u6587\u4ef6\u5939\u4e0d\u5141\u8bb8\u91cd\u547d\u540d") : alloy.layout.alert("\u91cd\u547d\u540d\u5931\u8d25\uff01")
            };
            alloy.storage.rpcService.fileRename(g)
        } else alloy.layout.alert(k, null, {
            title: "\u91cd\u547d\u540d"
        })
    };
    this.fileRemove = function (a) {
        var b = {}, k = {}, g = this.getExplorerInstance().getCurDisk();
        b.obj = a;
        b.target = g;
        k.data = b;
        k.arguments = {
            obj: a
        };
        k.onSuccess = function (a) {
            a.retcode == 0 && a.result && a.result.code == 0 ? (a = a.arguments.obj, d.releaseSpace(g, a.size), e.notifyObservers(d, "ExplorerFileRemove", a)) : a.result.code == 33333 ? alloy.layout.alert("\u7cfb\u7edf\u6587\u4ef6\u5939\u4e0d\u5141\u8bb8\u5220\u9664") : alloy.layout.alert("\u5220\u9664\u5931\u8d25\uff01")
        };
        alloy.storage.rpcService.fileRemove(k)
    };
    this.fileCopy = function (a,
        b) {
        var k = {}, g = {}, r = this.getExplorerInstance();
        k.target = r.getCurDisk();
        k.obj = a;
        k.dest = r.getCurFolder();
        k.dest == "root" && delete k.dest;
        g.data = k;
        g.onSuccess = function (a) {
            a.retcode == 0 && a.result && a.result.code == 0 ? (a = a.result.obj, d.useSpace(b, a.size), e.notifyObservers(d, "ExplorerFileCopy", a)) : a.retcode == 0 && a.result && a.result.code == 30001 ? alloy.storage.storageFullAlert() : alloy.layout.alert("\u590d\u5236\u5931\u8d25\uff01")
        };
        alloy.storage.rpcService.copyFile(g)
    };
    this.fileMove = function (a) {
        var b = {}, k = {}, g = this.getExplorerInstance();
        b.target = g.getCurDisk();
        b.obj = a;
        b.dest = g.getCurFolder();
        b.dest == "root" && delete b.dest;
        k.data = b;
        k.onSuccess = function (a) {
            a.retcode == 0 && a.result && a.result.code == 0 ? e.notifyObservers(d, "ExplorerFileMove", a.result.obj) : a.result.code == 33333 ? alloy.layout.alert("\u7cfb\u7edf\u6587\u4ef6\u5939\u4e0d\u5141\u8bb8\u79fb\u52a8") : alloy.layout.alert("\u7c98\u8d34\u5931\u8d25\uff01")
        };
        alloy.storage.rpcService.fileMove(k)
    };
    this.isDiskReady = function () {
        return !1
    };
    this.storageFullAlert = function (a) {
        a ? alloy.layout.alert("\u60a8\u7684" +
            v[a].name + "\u5269\u4f59\u7a7a\u95f4\u4e0d\u8db3\uff0c\u8bf7\u4fee\u6539\u9ed8\u8ba4\u786c\u76d8\u540e\u91cd\u65b0\u4e0a\u4f20", function () {
                alloy.system.runApp("diskExplorer")
            }) : alloy.layout.alert("\u78c1\u76d8\u7a7a\u95f4\u5df2\u6ee1\uff0c\u8bf7\u7ed1\u5b9a\u6216\u4f7f\u7528\u65b0\u7684\u786c\u76d8")
    };
    this.checkPassword = function (a, b) {
        var k = {}, g = {};
        this.getExplorerInstance();
        var r = function () {
            d._passwordErrorWin = null
        };
        k.target = a;
        k.pass_md5 = b;
        g.data = k;
        g.onSuccess = function (b) {
            if (b.retcode == 0 && b.result &&
                b.result.code == 0) e.notifyObservers(d, "ExploreCheckPassword", {
                target: a,
                code: 1
            });
            else if (!d._passwordErrorWin) d._passwordErrorWin = alloy.layout.alert("\u5bc6\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5\uff01", r, null, r);
            e.notifyObservers(d, "ExploreCheckPasswordDone")
        };
        alloy.storage.rpcService.checkPassword(g)
    };
    this.getExplorerInstance = function () {
        if (alloy.app.diskExplorer) return alloy.app.diskExplorer.getInstance()
    };
    var r = {
        onPortalReady: function () {
            var b = alloy.config.getDiskList();
            l = alloy.config.getDefaultDisk();
            if (v[l]) v[l].isDefault = !0;
            b && (p = b);
            o = d.getUnBoundDisk();
            for (var f = 0, b = 0; b < p.length; b++) {
                var k = {};
                k.data = {
                    target: p[b]
                };
                k.arguments = {
                    target: p[b]
                };
                k.onSuccess = function (b) {
                    if (b.retcode == 0 && b.result && b.result.code == 0) {
                        var m = b.arguments.target,
                            c = b.result.config || {}, h = parseInt(b.result.userUsedSpaceBytes),
                            b = parseInt(b.result.userTotalSpaceBytes);
                        v[m].userUsedSpace = h > b ? b : h;
                        v[m].userTotalSpace = b;
                        v[m].dataReady = !0;
                        v[m].isPwdOpen = a.isUndefined(c.is_pwd_open) ? 0 : c.is_pwd_open;
                        v[m].isLocked = v[m].isPwdOpen == 0 ? 0 :
                            1;
                        f++;
                        e.notifyObservers(d, "StorageSpaceChanged", m)
                    } else a.out("\u52a0\u8f7d\u4e91\u5b58\u50a8\u4fe1\u606f\u9519\u8bef\uff01"), e.notifyObservers(d, "StorageError")
                };
                alloy.storage.rpcService.queryUser(k)
            }
            p.length == 0 && e.notifyObservers(d, "StorageReady")
        },
        onMessageUpdate: function (b) {
            if ((Number(b.appid) || Number(b.aid)) == 400011741) {
                var b = a.json.parse(a.string.decodeHtmlSimple(b.m)),
                    f = alloy.storage.getDiskById(b.source);
                if (f) {
                    var k = parseInt(b.userUsedSpaceBytes),
                        g = parseInt(b.userTotalSpaceBytes);
                    f.userUsedSpace =
                        k > g ? g : k;
                    f.userTotalSpace = g;
                    e.notifyObservers(d, "StorageSpaceChanged", b.source)
                }
            }
        }
    };
    this.init = function () {
        e.addObserver(alloy.portal, "portalReady", r.onPortalReady);
        e.addObserver(alloy.portal, "message", r.onMessageUpdate)
    }
});
Jx().$package("alloy.desktopContact", function (a) {
    var d = this,
        b = a.event,
        b = a.event,
        e = alloy.fileSystem.FILE_TYPE,
        g = !1,
        j = {
            onBuddySelected: function (a, b) {
                var d = b;
                d == -1 && (d = alloy.desktopManager.getCurrentDesktopIndex());
                var k = [],
                    g;
                for (g in a) {
                    var l = a[g],
                        c;
                    l.gcode ? (c = Number(l.gcode), l = {
                        id: l.gcode,
                        n: l.name,
                        t: alloy.fileSystem.FILE_TYPE.GROUP,
                        gid: l.gid || 0
                    }) : (c = Number(l.uin), l = {
                        id: l.uin,
                        n: l.name,
                        t: alloy.fileSystem.FILE_TYPE.BUDDY
                    });
                    isNaN(c) || alloy.fileSystem.getFileByFile(l) || k.push(l)
                }
                k.length && (g = alloy.fileSystem.getFileAmount(e.BUDDY),
                    c = alloy.fileSystem.getFileAmount(e.GROUP), g + c + k.length >= 200 ? alloy.layout.alert("\u684c\u9762\u8054\u7cfb\u4eba\u5df2\u8d85\u8fc7200\u4eba\u4e0a\u9650\uff0c\u8bf7\u5220\u51cf\u540e\u518d\u521b\u5efa\u3002") : alloy.fileSystem.getFolderById(d) ? alloy.fileSystem.addFiles(k, d, null, !0) : alloy.layout.alert("\u6587\u4ef6\u5939\u5df2\u7ecf\u4e0d\u5b58\u5728\uff0c\u6dfb\u52a0\u5931\u8d25\u3002"));
                qqweb.util.report2qqweb("deskcontact|create|context")
            },
            onBeforeGetRecentList: function () {
                b.addObserver(EQQ.Model.BuddyList,
                    "RecentListChange", j.onRecentListChange)
            },
            onEQQLoginSuccess: function () {
                b.removeObserver(EQQ.Model.BuddyList, "BuddyStateChange", j.onBuddyStateChange);
                b.addObserver(EQQ.Model.BuddyList, "BuddyStateChange", j.onBuddyStateChange);
                g || (alloy.notifier.register("desktopContact", j.onMessageReceive, j.onMessageHandled), g = !0);
                w();
                var a = alloy.fileSystem.getFilesByType(e.BUDDY),
                    d;
                for (d in a) t(a[d].id);
                alloy.system.reportAppState("50", 1)
            },
            onDockLocationChanged: function () {},
            onBuddyStateChange: function (a) {
                t(a)
            },
            onLoginLevelChange: function (a) {
                if (a ==
                    2 && a < alloy.portal.getOldLoginLevel()) {
                    var b = alloy.fileSystem.getFilesByType(e.BUDDY),
                        d;
                    for (d in b) b[d].notifyNumber = 0, alloy.iconFactory.updateNotifyNumber(b[d]);
                    var b = alloy.fileSystem.getFilesByType(e.GROUP),
                        g;
                    for (g in b) b[g].notifyNumber = 0, alloy.iconFactory.updateNotifyNumber(b[g])
                }
                a < 3 && alloy.portal.getOldLoginLevel() == 3 && alloy.system.reportAppState("50", 2)
            },
            onFileAddFail: function () {},
            onMessageReceive: function (a) {
                var b;
                b = alloy.config.configList.isNoContactNotify ? !1 : a.from != 50 ? !1 : a.body.extra.isChatBoxOpen ? !1 : !0;
                if (b) {
                    b = a.body;
                    var d;
                    a.type == "SingleChat" ? (a = b.uin, d = e.BUDDY) : (a = b.code, d = e.GROUP);
                    alloy.iconFactory.updateNotifyNumber({
                        id: a,
                        t: d,
                        notifyNumber: b.count
                    })
                }
            },
            onMessageHandled: function (a) {
                var b = a.body;
                a.type == "SingleChat" ? (a = b.uin, b = e.BUDDY) : (a = b.code, b = e.GROUP);
                alloy.iconFactory.updateNotifyNumber({
                    id: a,
                    t: b,
                    notifyNumber: 0
                })
            },
            onRecentListChange: function () {
                b.removeObserver(EQQ.Model.BuddyList, "RecentListChange", j.onRecentListChange);
                if (alloy.fileSystem.isFileSystemReady()) l();
                else {
                    var a = function () {
                        l();
                        b.removeObserver(alloy.fileSystem, "FileSystemReady", a)
                    };
                    b.addObserver(alloy.fileSystem, "FileSystemReady", a)
                }
            }
        }, l = function () {
            if (!alloy.config.configList.hasRecentFolder) {
                for (var a = EQQ.Model.BuddyList.getRecentList(), b = [], d, g, l = 0; l < a.length; l++) {
                    if (b.length >= 16) break;
                    d = null;
                    if (a[l].type == 0)(g = EQQ.Model.BuddyList.getBuddyByUin(a[l].uin)) && (d = {
                        t: e.BUDDY,
                        id: a[l].uin,
                        n: g.showName
                    });
                    else if (a[l].type == 1)(g = EQQ.Model.BuddyList.getGroupByGid(a[l].uin)) && (d = {
                        t: e.GROUP,
                        id: g.code,
                        n: g.showName,
                        gid: a[l].uin
                    });
                    else continue;
                    d && !alloy.fileSystem.getFileByFile(d) && b.push(d)
                }
                alloy.fileSystem.createRecentContactFolder(b)
            }
        }, p = [],
        o = function () {}, s = function (a) {
            p.push(a)
        }, v = function () {
            for (var a; a = p.shift();) setTimeout(a, 500)
        }, w = function () {
            var b = alloy.fileSystem.getFilesByType(e.BUDDY),
                g, f, k = !1,
                l = {}, j, c, h;
            for (h in b) {
                g = b[h];
                if ((f = EQQ.Model.BuddyList.getUserByUin(g.id)) && g.n !== f.showName) k = !0, g.n = f.showName, f = alloy.fileSystem.getFolderIdByFile(g), l[f] || (l[f] = {}), l[f][g.id] = g;
                c = alloy.iconFactory.getIcons(g.id, e.BUDDY) || [];
                f = 0;
                for (j = c.length; f < j; f++) c[f].refreshIcon(), c[f].setText(g.n)
            }
            var b = alloy.fileSystem.getFilesByType(e.GROUP),
                A;
            for (A in b) {
                g = b[A];
                if ((h = EQQ.Model.BuddyList.getGroupByCode(g.id)) && g.n !== h.showName) k = !0, g.n = h.showName, f = alloy.fileSystem.getFolderIdByFile(g), l[f] || (l[f] = {}), l[f][g.id] = g;
                c = alloy.iconFactory.getIcons(g.id, e.GROUP) || [];
                f = 0;
                for (j = c.length; f < j; f++) c[f].refreshIcon(), c[f].setText(g.n)
            }
            if (k)
                for (var x in l) {
                    g = [];
                    var k = Number(x),
                        t;
                    for (t in l[x]) g.push(l[x][t]);
                    s(a.bind(function (a) {
                        alloy.fileSystem.sendUpdateFiles(a.fileList,
                            a.folderId, o, null, !0)
                    }, d, {
                        fileList: g,
                        folderId: k
                    }))
                }
            v()
        }, t = this.updateContactIconState = function (a, b, d) {
            var b = alloy.iconFactory.getIcons(a, e.BUDDY),
                g;
            if (b)
                if (d = d || EQQ.Model.BuddyList.getState(a)) {
                    a = 0;
                    for (g = b.length; a < g; a++) b[a].showState(d)
                } else {
                    a = 0;
                    for (g = b.length; a < g; a++) b[a].hideState()
                }
        };
    this.init = function () {
        b.addObserver(alloy.portal, "EQQLoginSuccess", j.onEQQLoginSuccess);
        b.addObserver(alloy.portal, "BeforeGetRecentList", j.onBeforeGetRecentList);
        b.addObserver(alloy.portal, "loginLevelChange", j.onLoginLevelChange)
    };
    this.addContactIcon = function (a, b, d) {
        var g = alloy.fileSystem.getFileInfoByFile(a);
        if (g) a = g.parent.id, a == 5 ? b = "\u8be5\u8054\u7cfb\u4eba\u5df2\u6dfb\u52a0\uff0c\u4f4d\u4e8e\u201c\u5e94\u7528\u7801\u5934\u201d\u3002" : a >= 0 && a < 5 ? b = "\u8be5\u8054\u7cfb\u4eba\u5df2\u6dfb\u52a0\uff0c\u4f4d\u4e8e" + ("\u201c\u684c\u9762" + (a + 1) + "\u201d") + "\u3002" : a == b ? b = "\u8be5\u8054\u7cfb\u4eba\u5df2\u4f4d\u4e8e\u8be5\u6587\u4ef6\u5939\u3002" : (b = "\u6587\u4ef6\u5939\u201c" + (g.parent.n || g.parent.id) + "\u201d", b = "\u8be5\u8054\u7cfb\u4eba\u5df2\u6dfb\u52a0\uff0c\u4f4d\u4e8e" +
            b + "\u3002"), alloy.layout.alert(b);
        else {
            var g = alloy.fileSystem.getFileAmount(e.BUDDY),
                l = alloy.fileSystem.getFileAmount(e.GROUP);
            g + l >= 200 ? alloy.layout.alert("\u684c\u9762\u8054\u7cfb\u4eba\u5df2\u8d85\u8fc7200\u4eba\u4e0a\u9650\uff0c\u8bf7\u5220\u51cf\u540e\u518d\u521b\u5efa\u3002") : (b = b || alloy.desktopManager.getCurrentDesktopIndex(), g = a.t == e.BUDDY ? EQQ.Model.BuddyList.getUserByUin(a.id) : EQQ.Model.BuddyList.getGroupByCode(a.id), a.n = g.showName, alloy.fileSystem.addFile(a, b, d, !0))
        }
    };
    this.deleteContactIcon =
        function (a) {
            alloy.fileSystem.deleteFile(a, null, null, !1, !0)
    };
    this.getCurrentContacts = function () {
        var a = {}, b, d = alloy.fileSystem.getFilesByType(e.BUDDY),
            g;
        for (g in d) b = d[g], a[b.id] = {
            type: b.t,
            uin: b.id,
            name: b.n
        };
        d = alloy.fileSystem.getFilesByType(e.GROUP);
        for (g in d) b = d[g], a[b.id] = {
            type: b.t,
            uin: b.gid,
            name: b.n,
            gcode: b.id
        };
        return a
    };
    this.showSelectBuddyBox = function (a) {
        typeof a == "undefined" && (a = -1);
        if (alloy.portal.getLoginLevel() == alloy.CONST.LOGIN_LEVEL_NONE) alloy.layout.showLoginWindow("selectBuddy");
        else {
            var b =
                d.getCurrentContacts();
            alloy.portal.runApp("selectBuddy", {
                id: "desktopContact",
                title: "\u6dfb\u52a0\u684c\u9762\u8054\u7cfb\u4eba",
                isAddSelf: !1,
                maxBuddy: 0,
                initList: b,
                lockInitList: !0,
                onlyNewMember: !0,
                groupDisplayType: "group",
                cbParam: a,
                onSelected: j.onBuddySelected
            })
        }
    }
});
Jx().$package("alloy.desktopFolder", function (a) {
    var d = a.event,
        b = a.dom,
        d = a.event,
        e = a.string,
        g = alloy.fileSystem.MAX_FOLDER_AMOUNT,
        j = alloy.fileSystem.FILE_TYPE,
        l = {
            onFileUpdate: function (a) {
                var b = alloy.iconFactory.getIcons(a.id, a.t);
                if (b)
                    for (var d = 0, e = b.length; d < e; d++) b[d].setText(a.n), b[d].file.n = a.n
            },
            onFileCreateSuccess: function (a) {
                var b = alloy.iconFactory.getIcons(a.id, a.t);
                if (b)
                    for (var d = 0, g = b.length; d < g; d++) b[d].setText(e.encodeHtml(a.n))
            },
            onFileAdd: function (a) {
                if (a = alloy.iconFactory.getIcons(a.parent.id,
                    a.parent.type))
                    for (var b = 0, d = a.length; b < d; b++) a[b].update()
            },
            onFileDelete: function (a) {
                if (a = alloy.iconFactory.getIcons(a.parent.id, a.parent.type))
                    for (var b = 0, d = a.length; b < d; b++) a[b].update()
            },
            onFileMove: function (a) {
                var b = a.targetId,
                    a = a.sourceId,
                    d = alloy.iconFactory.getIcons(b, j.FOLDER);
                if (d)
                    for (var e = 0, g = d.length; e < g; e++) d[e].update();
                if (d = alloy.iconFactory.getIcons(a, j.FOLDER)) {
                    e = 0;
                    for (g = d.length; e < g; e++) d[e].update()
                }
                alloy.iconFactory.updateNotifyNumber(alloy.fileSystem.getFolderById(a));
                alloy.iconFactory.updateNotifyNumber(alloy.fileSystem.getFolderById(b))
            }
        };
    this.init = function () {
        d.addObserver(alloy.fileSystem, "FileUpdate", l.onFileUpdate);
        d.addObserver(alloy.fileSystem, "FileAdd", l.onFileAdd);
        d.addObserver(alloy.fileSystem, "FileDelete", l.onFileDelete);
        d.addObserver(alloy.fileSystem, "FileMove", l.onFileMove)
    };
    this.createFolder = function () {
        alloy.fileSystem.getFileAmount(j.FOLDER) >= g ? alloy.layout.alert("\u6587\u4ef6\u5939\u5df2\u8d85\u8fc7" + g + "\u4e2a\u4e0a\u9650\uff0c\u8bf7\u5220\u51cf\u540e\u518d\u521b\u5efa\u3002") : alloy.system.getLoginLevel() > 1 ? new o({
            callback: function (a) {
                var b =
                    alloy.desktopManager.getCurrentDesktopIndex();
                alloy.fileSystem.createFile({
                    t: alloy.fileSystem.FILE_TYPE.FOLDER,
                    n: a.n,
                    c: a.c
                }, b, null, l.onFileCreateSuccess)
            }
        }) : alloy.layout.showLoginWindow("")
    };
    this.deleteFolder = function (a) {
        var b = alloy.fileSystem.getFolderById(a.id).items,
            d = !1,
            e = !1;
        b.length ? alloy.layout.confirm("\u60a8\u786e\u5b9a\u5220\u9664\u6587\u4ef6\u5939\u7684\u6240\u6709\u5185\u5bb9\u5417\uff1f", function () {
            for (var g = [], l = b.length - 1; l >= 0; l--) {
                var f = b[l];
                if (f.t == j.APP) {
                    var k = alloy.appconfig.getAppConfig(f.id);
                    if (k) k.noSave = !0, alloy.config.removeSetupAppList(k, !1, !0) === !1 ? e = !0 : (g.push(f), d = !0)
                } else g.push(f)
            }
            d && alloy.config.sendSetSetupAppList();
            e ? g.length && alloy.fileSystem.deleteFiles(g, a.id, !0) : alloy.fileSystem.deleteFile(a, null, null, !0, !0)
        }, {
            title: "\u5220\u9664\u6587\u4ef6\u5939"
        }) : alloy.fileSystem.deleteFile(a, null, null, !1, !0)
    };
    var p = function (b) {
        var d = alloy.CONST.CDN_URL + "style/images/filesys/" + b + ".png",
            e = alloy.CONST.CDN_URL + "style/images/transparent.gif";
        return a.browser.ie == 6 ? '<img class="fcDropdown_img" src="' +
            e + '" style="' + ("background:node;filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + d + "', sizingMethod='scale')") + '" idx="' + b + '" />' : '<img class="fcDropdown_img" src="' + d + '" idx="' + b + '" />'
    }, o = new a.Class({
            init: function (e) {
                var g = this,
                    e = e || {};
                e.id = e.id || +new Date;
                e.callback = e.callback || function () {};
                g.option = e;
                var l = g.folderWindow = alloy.windowFactory.createWindow("Window", {
                    title: "\u65b0\u5efa\u6587\u4ef6\u5939",
                    modeSwitch: !0,
                    dragable: !0,
                    width: 380,
                    height: 120,
                    hasCloseButton: !0,
                    hasOkButton: !0,
                    hasCancelButton: !0,
                    doubleClickModeSwitch: !1,
                    isSetCentered: !0
                }),
                    t = '\t\t\t\t<div class="folderCreator" id="folderCreator_' + e.id + '">\t\t\t\t\t<a class="folderSelector" id="folderSelector_' + e.id + '">' + p("folder") + '</a>\t\t\t\t\t<div class="folderNameTxt">\u8bf7\u8f93\u5165\u6587\u4ef6\u5939\u540d\u79f0\uff1a</div>\t\t\t\t\t<div class="folderInput"><input class="folderName" id="folderName_' + e.id + '"></input></div>\t\t\t\t\t<div class="folderNameError" id="folderNameError_' + e.id + '"></div>\t\t\t\t</div>\t\t\t';
                l.setHtml(t);
                g.container = b.id("folderCreator_" + e.id);
                g.selector = b.id("folderSelector_" + e.id);
                g.folderName = b.id("folderName_" + e.id);
                g.folderNameError = b.id("folderNameError_" + e.id);
                t = '\t\t\t\t<div class="fcDropdown_title" id="fcDropdown_title_' + e.id + '">\u56fe\u6807</div>\t\t\t\t<div class="fcDropdown_body" id ="fcDropdown_body_' + e.id + '">\t\t\t\t\t<a class="fcDropdown_item" title="\u9ed8\u8ba4">' + p("folder") + '</a>\t\t\t\t\t<a class="fcDropdown_item" title="\u8054\u7cfb\u4eba">' + p("contact") + '</a>\t\t\t\t\t<a class="fcDropdown_item" title="\u6587\u672c">' +
                    p("doc") + '</a>\t\t\t\t\t<a class="fcDropdown_item" title="\u6e38\u620f">' + p("game") + '</a>\t\t\t\t\t<a class="fcDropdown_item" title="\u751f\u6d3b">' + p("life") + '</a>\t\t\t\t\t<a class="fcDropdown_item" title="\u97f3\u4e50">' + p("music") + '</a>\t\t\t\t\t<a class="fcDropdown_item" title="\u5de5\u5177">' + p("tool") + '</a>\t\t\t\t\t<a class="fcDropdown_item" title="\u89c6\u9891">' + p("video") + "</a>\t\t\t\t</div>\t\t\t";
                g.dropdown = b.node("div", {
                    id: "fcDropdown_" + e.id,
                    "class": "folderCreatorDropdown"
                });
                g.dropdown.innerHTML =
                    t;
                document.body.appendChild(g.dropdown);
                g.dropdownTitle = b.id("fcDropdown_title_" + e.id);
                g.dropdownBody = b.id("fcDropdown_body_" + e.id);
                g.folderType = b.id("folderType_" + e.id);
                g.folderSelector = b.id("folderSelector_" + e.id);
                b.hide(g.dropdown);
                g.dropdownPanel = new a.ui.PopupBox({
                    noCatchMouseUp: !0,
                    container: g.dropdown
                });
                g.folderName.value = alloy.fileSystem.getDefaultFolderName();
                g.folderName.select();
                var r = {
                    onClick: function (a) {
                        a.preventDefault();
                        a.stopPropagation();
                        g.showDropDown()
                    },
                    onKeyDown: function (a) {
                        b.hide(g.folderNameError);
                        a.keyCode == 13 && r.onClickOkButton() && l.close()
                    },
                    onDropdownClick: function (a) {
                        a = a.target.getAttribute("idx");
                        g._selectedCate = a;
                        g.folderSelector.innerHTML = p(a)
                    },
                    onClickOkButton: function () {
                        var a = g.getFolderByName(),
                            d = g.getSelectedCate(),
                            k = alloy.fileSystem.isFileNameAvailable(a, j.FOLDER);
                        if (k != 0) return b.show(g.folderNameError), g.folderNameError.innerHTML = k, !1;
                        e.callback({
                            c: d,
                            n: a
                        });
                        return !0
                    },
                    onDragStart: function () {
                        g.hideDropDown()
                    },
                    onWindowClose: function () {
                        document.body.removeChild(g.dropdown)
                    }
                };
                d.on(g.selector,
                    "click", r.onClick);
                d.on(g.folderName, "keydown", r.onKeyDown);
                d.on(g.dropdownBody, "click", r.onDropdownClick);
                d.addObserver(l, "clickOkButton", r.onClickOkButton);
                d.addObserver(l, "dragStart", r.onDragStart);
                d.addObserver(l, "close", r.onWindowClose);
                this._selectedCate = "folder"
            },
            getSelectedCate: function () {
                return this._selectedCate
            },
            getFolderByName: function () {
                return this.folderName.value
            },
            showDropDown: function () {
                var a = b.getXY(this.selector);
                this.dropdownPanel.show();
                var d = alloy.layout.themeManager.getCurrentSkin().currentWindow.ie6WindowCenterBackground ||
                    "##B6EAFD";
                b.setStyle(this.dropdownTitle, "backgroundColor", d);
                b.setStyle(this.dropdown, "zIndex", alloy.layout.getTopZIndex(1));
                b.setXY(this.dropdown, a[0] + "px", a[1] + 57 + "px")
            },
            hideDropDown: function () {
                this.dropdownPanel.hide()
            },
            destroy: function () {}
        })
});
Jx().$package("alloy.desktopFile", function (a) {
    var d = {
        onFileCreateSuccess: function () {}
    };
    this.init = function () {};
    this.createFile = function (b, e) {
        if (alloy.system.getLoginLevel() > 1) {
            var g = b.folderId,
                j = alloy.storage.getDefaultDisk().key;
            alloy.storage.getFreeSpaceById(j) < b.fileSize ? alloy.storage.storageFullAlert(j) : (g == -1 && (g = alloy.desktopManager.getCurrentDesktopIndex()), alloy.fileSystem.createFile({
                t: alloy.fileSystem.FILE_TYPE.FILE,
                n: b.fileName,
                size: b.fileSize,
                md5: "",
                sha: "",
                s: j
            }, g, null, a.bind(function (a) {
                d.onFileCreateSuccess(a);
                alloy.storage.useSpace(a.s, a.size);
                e && e(a)
            }, this)))
        } else alloy.layout.showLoginWindow("")
    };
    this.deleteFile = function (a) {
        alloy.fileSystem.deleteFile(a, null, null, !1, !0);
        alloy.storage.releaseSpace(a.s, a.size)
    }
});
Jx().$package("alloy.windowFactory", function (a) {
    var d = this,
        b = a.dom,
        e = a.event,
        g, j, l, p, o, s = {
            onDesktopResize: function () {
                var a, b = alloy.windowManager.getWindowList(),
                    d;
                for (d in b) {
                    a = b[d];
                    var e = a.getBoxStatus();
                    if (e == "max" || e == "fullscreen") a: {
                        var g = void 0,
                            l = void 0,
                            j = void 0,
                            c = e = void 0,
                            c = l = g = e = j = void 0,
                            c = a.getBoxStatus(),
                            j = alloy.layout.getAreaWidth("left"),
                            e = alloy.layout.getAreaHeight("top"),
                            g = alloy.layout.getClientWidth(),
                            l = alloy.layout.getClientHeight();
                        if (c == "fullscreen") c = 5, g += c * 2, l += c * 2, j = -j - c, e = -e -
                            c;
                        else if (c == "max") c = 10, g += c * 2, l += c * 2, j = -j - c, e = -e - c;
                        else break a;
                        (a.windowType == "window" || a.windowType == "chatbox" || a.windowType == "messagebox") && a.adjustSize(g, l, j, e)
                    } else a.getY() < 0 && a.setY(0)
                }
            },
            onWindowSetCenter: function () {
                var a = alloy.layout.getClientWidth(),
                    b = alloy.layout.getClientHeight(),
                    a = a > this.getWidth() ? (a - this.getWidth()) / 2 : 0,
                    b = b > this.getHeight() ? (b - this.getHeight()) / 2 : 0;
                this.setXY(a, b)
            },
            onWindowSetCurrent: function () {
                alloy.windowManager.setCurrentWindow(this);
                w(this);
                this.subMode == 1 && this.isSubWinFloat &&
                    this.subWin && w(this.subWin)
            },
            onWindowTitleBarClick: function () {
                g && g.focus()
            },
            onWindowDestroy: function () {
                alloy.app.gravity && alloy.app.gravity.removeBox(this);
                j && b.hide(j);
                a.platform.iPad || g && g.focus()
            },
            onWindowResize: function () {
                alloy.app.gravity && alloy.app.gravity.resizeBox(this);
                if (this.subMode == 1 && this.isSubWinFloat && this.subWin && this.isShow()) {
                    a.info("subWindowResize", "subWindow");
                    var d = b.getRelativeXY(this._subBodyOuter, this.container.parentNode);
                    this.subWin.setXY(d[0], d[1] + (a.browser.ie ? 2 : 0))
                }
            },
            onWindowMax: function () {
                var a = alloy.layout.getClientWidth(),
                    b = alloy.layout.getClientHeight(),
                    d = alloy.layout.getAreaWidth("left"),
                    e = alloy.layout.getAreaHeight("top");
                this.setXY(-d - 10, -e - 10);
                this.setWinWidth(a + 20);
                this.setWinHeight(b + 20)
            },
            onWindowRestore: function () {},
            onWindowFullscreen: function () {
                var d = alloy.layout.getClientWidth(),
                    e = alloy.layout.getClientHeight(),
                    g = alloy.layout.getAreaWidth("left"),
                    f = alloy.layout.getAreaHeight("top");
                this.setXY(-g - 5, -f - 5);
                this.setWinWidth(d + 10);
                this.setWinHeight(e +
                    10);
                this.setZIndexLevel(3);
                w(this);
                a.browser.mobileSafari || (j || (j = b.node("div", {
                    id: "fullscreen_tip",
                    "class": "fullscreen_tip"
                }), document.body.appendChild(j)), b.setStyle(j, "zIndex", alloy.layout.getTopZIndex(3)), b.show(j), this.subMode == 1 && this.isSubWinFloat && this.subWin && this.isShow() && (this.subWin.setZIndexLevel(3), w(this.subWin)), setTimeout(function () {
                    b.hide(j)
                }, 3E3))
            },
            onWindowRestoreFull: function () {
                this.setZIndexLevel(0);
                w(this);
                this.subMode == 1 && this.isSubWinFloat && this.subWin && this.isShow() && (this.subWin.setZIndexLevel(0),
                    w(this.subWin))
            },
            onWindowHide: function () {
                this.subMode == 1 && this.isSubWinFloat && this.subWin && this.subWin.hide(!0)
            },
            onWindowShow: function () {
                if (this.subMode == 1 && this.isSubWinFloat && this.subWin) {
                    var d = b.getRelativeXY(this._subBodyOuter, this.container.parentNode);
                    this.subWin.setXY(d[0], d[1] + (a.browser.ie ? 2 : 0));
                    this.subWin.show()
                }
            },
            onWindowSetRight: function () {
                var a = this.getBodySize()[0];
                this.setX(alloy.layout.getClientWidth() - a)
            },
            onWindowBeforeDragStart: function () {
                var a = -10 - alloy.layout.getAreaHeight("top"),
                    b = -this.getTitleBarHeight() - this.getHeight();
                this.setDragLimite({
                    topMargin: a,
                    bottomMargin: b
                })
            }
        }, v = function (b) {
            if (b) {
                var d = b.option || {};
                d.isSetCurrent ? b.setCurrent({
                    fromInit: !0
                }) : b.setNotCurrent({
                    fromInit: !0
                });
                var e = alloy.layout.getAvailableWidth(),
                    f = alloy.layout.getAvailableHeight(),
                    g = b.getWidth(),
                    l = b.getHeight();
                b.getX();
                b.getY();
                l > f && (l = f);
                g > e && (g = e);
                if (b.windowType == "window" || b.windowType == "chatbox" || b.windowType == "messagebox") b.setWinWidth(g), b.setWinHeight(l);
                a.isUndefined(d.defaultMode) || b.restore();
                switch (d.defaultMode) {
                case "max":
                    b.max();
                    b._restoreWidth = d.defaultWidth;
                    b._restoreHeight = d.defaultHeight;
                    break;
                case "min":
                    b.min();
                    break;
                case "fullscreen":
                    b.fullscreen()
                }
                if (alloy.app.gravity) b.b2Box = alloy.app.gravity.createBox(b);
                d.isSetCentered && b.setWindowCentered()
            }
        }, w = function (a) {
            if (!a.isLockZIndex()) {
                var b = a.getZIndexLevel() || 0,
                    b = alloy.layout.getTopZIndex(b);
                a.setZIndex(b)
            }
        };
    this.init = function () {
        l = {};
        p = 0;
        o = !1;
        g || (g = b.node("input", {
            id: "qqweb_focus_input"
        }), g.setAttribute("type", "text"), document.body.appendChild(g));
        e.addObserver(alloy.layout, "desktopResize", s.onDesktopResize);
        e.addObserver(alloy.dock, "DockLocationChanged", s.onDesktopResize)
    };
    this.createWindow = function (g, j, m) {
        var f = l[g],
            j = a.clone(j);
        j.level = j.level ? parseInt(j.level) : 0;
        j.dragProxy = j.dragProxy || o;
        j.zIndex = j.zIndex || alloy.layout.getTopZIndex();
        j.topMargin = j.bottomMargin = 0;
        if (f) {
            if (!j.appendTo) {
                if (a.isUndefined(j.desktopIndex)) j.desktopIndex = alloy.desktopManager.getCurrentDesktopIndex();
                g = alloy.desktopManager.getDesktop(j.desktopIndex).getElement();
                j.appendTo = g
            }
            j.windowId = j.windowId || p++;
            f = new f(j);
            e.notifyObservers(d, "WindowCreate", f);
            f.setZIndexLevel(j.level);
            f.setLockZIndex(j.lockZIndex || !1);
            e.addObserver(f, "setCenter", s.onWindowSetCenter);
            e.addObserver(f, "setCurrent", s.onWindowSetCurrent);
            e.addObserver(f, "clickTitleBar", s.onWindowTitleBarClick);
            e.addObserver(f, "destroy", s.onWindowDestroy);
            e.addObserver(f, "resize", s.onWindowResize);
            e.addObserver(f, "hide", s.onWindowHide);
            e.addObserver(f, "show", s.onWindowShow);
            e.addObserver(f, "beforeDragStart",
                s.onWindowBeforeDragStart);
            e.addObserver(f, "SetRight", s.onWindowSetRight);
            (f.windowType == "window" || f.windowType == "chatbox" || f.windowType == "messagebox") && e.addObserver(f, "max", s.onWindowMax);
            if (a.isUndefined(j.x) && a.isUndefined(j.y)) {
                var k, q;
                q = k = 0;
                var j = f.option.clientWidth || alloy.layout.getAvailableWidth(),
                    g = f.option.clientHeight || alloy.layout.getAvailableHeight(),
                    w = j - f.getWidth(),
                    c = g - f.getHeight(),
                    h = w > 0 ? w / 2 : 0,
                    A = c > 0 ? c / 2 : 0,
                    x = f.getId(),
                    x = alloy.windowManager.getWindowList().length == 1 ? 0 : x < 0 ? 0 : x;
                k = (h +
                    x * 25) % w + k;
                q = (A + x * 25) % c + q;
                k = k > 0 ? k : 0;
                q = q > 0 ? q : 0;
                k = k + parseInt(f.getWidth()) >= j ? 0 : k;
                q = q + parseInt(f.getHeight()) >= g ? 0 : q;
                f.setXY(k, q)
            } else q = alloy.layout.getAvailableWidth(), j = alloy.layout.getAvailableHeight(), c = f.getX() || 0, g = f.getY() || 0, c + f.getWidth() > q && (q -= f.getWidth(), f.setX(q < 0 ? 0 : q)), g + f.getHeight() > j && (j -= f.getHeight(), f.setY(j < 0 ? 0 : j)), f.subMode == 1 && f.isSubWinFloat && f.subWin && (j = b.getRelativeXY(f._subBodyOuter, f.container.parentNode), f.subWin.setXY(j[0], j[1] + (a.browser.ie ? 2 : 0)), f.subWin.show());
            m ||
                v(f);
            e.notifyObservers(d, "WindowCreated", f);
            return f
        } else throw Error('WindowFactory: class "' + g + '" has not register!');
    };
    this.registerWindow = function (a, b) {
        l[a] = b
    };
    this.initWindow = v
});
Jx().$package("alloy.windowManager", function (a) {
    var d = a.event,
        b, e, g, j, l = {
            onWidnowCreated: function (a) {
                b.push(a);
                e[a.getId()] = a;
                a.windowType == "widget" ? j.push(a) : g.push(a);
                d.addObserver(a, "destroy", l.onWindowDestroy)
            },
            onWindowDestroy: function (d) {
                e[d.getId()] = null;
                d.windowType == "widget" ? a.array.remove(j, d) : a.array.remove(g, d);
                a.array.remove(b, d)
            }
        };
    this.init = function () {
        b = [];
        e = {};
        g = [];
        j = [];
        d.addObserver(alloy.windowFactory, "WindowCreated", l.onWidnowCreated)
    };
    this.getWindow = function (a) {
        return e[a]
    };
    this.getWindowList =
        function () {
            return b
    };
    this.getOnlyWindowList = function () {
        return g
    };
    this.getOnlyWidgetList = function () {
        return j
    };
    this.setCurrentWindow = function (a) {
        var b = alloy.desktopManager.getCurrentDesktop();
        a.desktopIndex !== b.getIndex() && alloy.desktopManager.setCurrentDesktop(a.desktopIndex);
        b = alloy.desktopManager.getCurrentDesktop();
        b.getWindowManager().setCurrentWindow(a)
    };
    this.getCurrentWindow = function () {
        return alloy.desktopManager.getCurrentDesktop().getWindowManager().getCurrentWindow()
    }
});
Jx().$package("alloy.desktopManager", function (a) {
    var d = a.dom,
        b = a.event,
        e = a.fx.transitions,
        g = {
            NORMAL: 1,
            EDIT: 2,
            DRAG: 3,
            MANAGE: 4
        }, j, l, p, o, s, v, w, t, r, m, f = [],
        k = {}, q = [],
        D = [],
        c = {}, h = g.NORMAL,
        A = [],
        x = [],
        z, y, u, n = [0, 0, 0, 0, 0],
        B = alloy.fileSystem.FILE_TYPE,
        F = 142,
        H = 112,
        Q = 0,
        J = 0,
        I = 0,
        M = function (a) {
            return a === null || typeof a === "undefined"
        }, K = function () {
            alloy.navbar && alloy.navbar.setZIndex(11);
            d.setStyle(alloy.layout.getArea("bottom"), "zIndex", 12)
        }, U = function () {
            alloy.navbar && alloy.navbar.setZIndex(10);
            d.setStyle(alloy.layout.getArea("bottom"),
                "zIndex", 10)
        }, O = [{
            text: "\u4e0a\u4f20\u6587\u4ef6",
            type: "flash",
            icon: {
                className: "add_file_icon"
            },
            onClick: function () {}
        }, {
            text: "\u6dfb\u52a0\u5e94\u7528",
            icon: {
                className: "add_app_icon"
            },
            onClick: function () {
                alloy.portal.runApp("appMarket");
                qqweb.util.report2qqweb("screen|" + alloy.desktopManager.getCurrentDesktopIndex() + "|addapp")
            }
        }, {
            text: "\u6dfb\u52a0\u684c\u9762\u8054\u7cfb\u4eba",
            icon: {
                className: "add_contact_icon"
            },
            onClick: function () {
                alloy.desktopContact.showSelectBuddyBox();
                qqweb.util.report2qqweb("add|desktop|adddeskcontanct")
            }
        }, {
            type: "separator"
        }, {
            text: "\u65b0\u5efa\u6587\u4ef6\u5939",
            icon: {
                className: "add_folder_icon"
            },
            onClick: function () {
                alloy.desktopFolder.createFolder();
                qqweb.util.report2qqweb("add|desktop|addfolder")
            }
        }],
        G = {
            onWindowCreated: function (c) {
                if (this.isWindowInDesktop(c)) {
                    this._windowArray.push(c);
                    if (c.windowType != "widget") {
                        var d = this,
                            e = function () {
                                this.getBoxStatus() === "max" && (a.array.contains(d._maxWindowArray, this) || d._maxWindowArray.push(this), d._maxWindowArray.length > 0 && U())
                            }, f = function () {
                                a.array.remove(d._maxWindowArray,
                                    this);
                                d._maxWindowArray.length == 0 && K()
                            };
                        b.addObserver(c, "max", e);
                        b.addObserver(c, "show", e);
                        b.addObserver(c, "restore", f);
                        b.addObserver(c, "min", f);
                        e.apply(c)
                    }
                    b.addObserver(c, "destroy", a.bind(G.onWindowDestroy, this))
                }
            },
            onWindowDestroy: function (b) {
                if (b == this.getCurrentWindow()) {
                    this.setCurrentWindow(null);
                    var c;
                    if (!this._preCurrentWindow && (c = this._windowArray[this._windowArray.length - 1])) this._preCurrentWindow = c == b ? this._windowArray[this._windowArray.length - 2] || null : c;
                    this._preCurrentWindow && this._preCurrentWindow.isShow() &&
                        this._preCurrentWindow.setCurrent()
                } else if (b == this._preCurrentWindow) this._preCurrentWindow = null;
                a.array.remove(this._windowArray, b);
                b.windowType != "widget" && (a.array.remove(this._maxWindowArray, b), this._maxWindowArray.length == 0 && K())
            },
            onDesktopSwitch: function (a) {
                this._desktopIndex == a && (this._maxWindowArray.length == 0 ? K() : U())
            }
        }, V = new a.Class({
            init: function (c) {
                this._desktopIndex = c.desktopIndex;
                this._windowArray = [];
                this._preCurrentWindow = this._currentWindow = null;
                this._maxWindowArray = [];
                b.addObserver(alloy.windowFactory,
                    "WindowCreated", a.bind(G.onWindowCreated, this));
                b.addObserver(alloy.portal, "DesktopSwitch", a.bind(G.onDesktopSwitch, this))
            },
            isWindowInDesktop: function (a) {
                if (M(a.desktopIndex)) return this._desktopIndex == alloy.desktopManager.getCurrentDesktopIndex();
                else if (this._desktopIndex == a.desktopIndex) return !0;
                return !1
            },
            setCurrentWindow: function (a) {
                if (a)
                    if (this._currentWindow) {
                        if (this._currentWindow != a) this._preCurrentWindow = this._currentWindow, this._currentWindow.setNotCurrent()
                    } else this._preCurrentWindow =
                        null;
                this._currentWindow = a
            },
            getCurrentWindow: function () {
                return this._currentWindow
            }
        }),
        N = new a.Class({
            init: function (c) {
                var e = this._index = c.index,
                    f = this._el = d.node("div", {
                        index: e,
                        "class": "desktopContainer"
                    }),
                    h = this._iconContainer = d.node("div", {
                        "class": "appListContainer",
                        customAcceptDrop: 1,
                        index: e
                    });
                b.addObserver(h, "dragmove", E.onDesktopContainerDragMove);
                b.addObserver(h, "drop", E.onDesktopContainerDrop);
                if (a.browser.mobileSafari) b.on(h, "touchstart", E.onTouchStart);
                f.appendChild(h);
                if (a.browser.mobileSafari) d.setStyle(h,
                    "overflow-y", "auto"), d.setStyle(h, "overflow-x", "hidden"), new a.ui.TouchScroller(h);
                else {
                    var g = new a.ui.ScrollArea(h);
                    g.update();
                    A.push(g);
                    d.setStyle(h, "overflow-y", "hidden")
                }
                a.browser.engine.webkit && d.setStyle(this._el, "left", alloy.layout.getDesktopWidth() + "px");
                d.hide(h);
                c.appendTo.appendChild(f);
                this._windowManager = new V({
                    desktopIndex: e
                });
                if (a.browser.engine.webkit) {
                    d.addClass(l, "desktopsContainerEx");
                    var C = this;
                    b.on(this._el, "webkitTransitionEnd", function () {
                        C._isCurrent || d.setClass(this, "desktopContainer");
                        n[C._index]--;
                        a: {
                            for (var a in n)
                                if (n[a] > 0) break a;
                            d.addClass(l, "desktopsContainerEx")
                        }
                    })
                }
            },
            getElement: function () {
                return this._el
            },
            getIconContainer: function () {
                return this._iconContainer
            },
            getIndex: function () {
                return this._index
            },
            getWindowManager: function () {
                return this._windowManager
            },
            setCurrent: function (b, c) {
                this._isCurrent = !0;
                var e = this._el,
                    f = this;
                d.setClass(e, "desktopContainer desktop_current");
                if (c || h === g.DRAG) a.browser.engine.webkit && (d.addClass(l, "desktopsContainerEx"), d.addClass(e, "desktop_current_noanimation"));
                else if (a.browser.engine.webkit && (n[this._index] = 2, d.removeClass(l, "desktopsContainerEx")), a.browser.engine.webkit || a.browser.firefox) this._showAnimationTimer && clearTimeout(this._showAnimationTimer), this._disappearAnimationTimer && clearTimeout(this._disappearAnimationTimer), d.addClass(e, "desktop_show_prepare" + b), this._showAnimationTimer = setTimeout(function () {
                    d.addClass(e, "desktop_show_animation" + b);
                    f._showAnimationTimer = 0
                }, 100)
            },
            setNotCurrent: function (b, c) {
                d.removeClass(l, "desktopsContainerEx");
                this._isCurrent = !1;
                var e = this._el,
                    f = this;
                d.setClass(e, "desktopContainer");
                if (!(c || h === g.DRAG))
                    if (a.browser.engine.webkit) a.browser.engine.webkit && (n[this._index] = 1, d.removeClass(l, "desktopsContainerEx")), d.addClass(e, "desktop_disappear_prepare" + b), d.addClass(e, "desktop_disappear_animation" + b);
                    else if (a.browser.firefox) this._showAnimationTimer && clearTimeout(this._showAnimationTimer), this._disappearAnimationTimer && clearTimeout(this._disappearAnimationTimer), d.addClass(e, "desktop_disappear_prepare" + b), this._disappearAnimationTimer =
                    setTimeout(function () {
                        d.addClass(e, "desktop_disappear_animation" + b);
                        f._disappearAnimationTimer = 0
                    }, 100)
            }
        }),
        E = {
            onTouchStart: function (a) {
                var c = a.target;
                if (d.hasClass(c, "appListContainer")) Q = a.changedTouches[0].pageX, J = (new Date).getTime(), b.on(c, "touchmove", E.onTouchMove), b.on(c, "touchend", E.onTouchEnd)
            },
            onTouchMove: function () {},
            onTouchEnd: function (a) {
                var c = a.target;
                b.off(c, "touchmove", E.onTouchMove);
                b.off(c, "touchend", E.onTouchEnd);
                I = a.changedTouches[0].pageX - Q;
                a = (new Date).getTime() - J;
                a = I / a;
                a > 50 ? W(!0) :
                    a < -50 ? R(!0) : I > 60 ? W(!0) : I < -60 ? R(!0) : I = 0
            },
            onSwipe: function () {},
            onDesktopContainerDragMove: function () {},
            onDesktopContainerDrop: function (a) {
                var b = a.pos,
                    e = b.x,
                    f = b.y;
                f += this.scrollTop;
                var b = a.dragEl,
                    a = this.getAttribute("index") || o,
                    h = d.getClientXY(this);
                e -= h[0];
                f -= h[1];
                e = Math.floor(e / F);
                f = Math.floor(f / H);
                e = f >= w ? f * t + e : e * w + f;
                if (e > k[a].length) e = k[a].length;
                var g, n = b.getAttribute("type"),
                    f = {
                        t: n
                    }, h = alloy.fileSystem.FILE_TYPE;
                g = parseInt(b.getAttribute("fileId"));
                if (!isNaN(g)) {
                    if (n == h.FILE) {
                        var C = alloy.iconFactory.getIcons(g,
                            alloy.fileSystem.FILE_TYPE.FILE);
                        i = 0;
                        for (len = C.length; i < len; i++)
                            if (C[i].isUploading()) return
                    }
                    f.id = g;
                    if (n == h.GROUP) f.gid = parseInt(b.getAttribute("gid"));
                    b = b.getAttribute("from");
                    g = k[a][e];
                    b == "buddy" ? (g && c[g] && c[g].type == h.FOLDER ? alloy.fileSystem.moveFile(f, c[g].fileId, null, null, null, !0) : alloy.desktopContact.addContactIcon(f, a, e), qqweb.util.report2qqweb("deskcontact|create|drag")) : alloy.fileSystem.isInFolder(f, alloy.fileSystem.getRootFolder(), !0) && (g && c[g] && c[g].type == h.FOLDER && f.t != h.FOLDER ? alloy.fileSystem.moveFile(f,
                        c[g].fileId, null, null, null, !0) : alloy.fileSystem.moveFile(f, a, e, null, null, !0))
                }
            },
            onGetAppConfigComplete: function () {
                ia();
                v = {};
                a.array.forEach(D, function (a) {
                    clearTimeout(a)
                });
                a.array.forEach(q, function (a) {
                    a && a.stop()
                });
                q = [];
                D = [];
                var c = alloy.fileSystem.getRootFolder(),
                    d = c.items,
                    c = alloy.fileSystem.getFolderById(o, c);
                Z(c.items, c.id, function () {
                    b.notifyObservers(alloy.portal, "FirstScreenReady");
                    for (var a = 0, c = 1; a < 5; ++a) o != d[a].id && (function (a, b) {
                        D[a] = setTimeout(function () {
                            Z(d[a].items, d[a].id)
                        }, b * 5E3)
                    }(a,
                        c), c++)
                })
            },
            onClearDefaultApp: function () {
                ia()
            },
            onFileMove: function (a) {
                if (a.targetId >= 0 && a.targetId < 5) {
                    if (a.targetId == a.sourceId) var b = X(a.file.id, a.file.t);
                    else a.sourceId >= 0 && a.sourceId < 5 && (b = X(a.file.id, a.file.t)) && aa(b, a.sourceId, a.sourcePosition), b = C(a.file, p[a.targetId].getIconContainer(), a.targetId);
                    b && ca(b, a)
                } else a.sourceId >= 0 && a.sourceId < 5 && (b = X(a.file.id, a.file.t)) && aa(b, a.sourceId, a.sourcePosition)
            },
            onFileAdd: function (a) {
                var b = a.parent.id;
                if (b >= 0 && b < 5) {
                    var c = {
                        targetId: b,
                        targetPosition: a.position,
                        sourceId: -1,
                        sourcePosition: -1
                    };
                    (a = C(a.file, p[b].getIconContainer(), b)) && ca(a, c)
                }
            },
            onFileDelete: function (a) {
                var b = a.parent.id;
                if (b >= 0 && b < 5) {
                    var c = X(a.file.id, a.file.t);
                    c && aa(c, b, a.position)
                }
            },
            onFileOperateTimeout: function () {
                alloy.layout.alert("\u64cd\u4f5c\u8d85\u65f6\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")
            },
            onFileOperateError: function () {
                alloy.layout.alert("\u64cd\u4f5c\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")
            },
            onAddFileFail: function (a) {
                a.retcode == 0 && a.result && a.result.code == 30001 ?
                    alloy.storage.storageFullAlert() : alloy.layout.alert("\u6dfb\u52a0\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")
            },
            onCopyFileFail: function (a) {
                a.retcode == 0 && a.result && a.result.code == 30001 ? alloy.storage.storageFullAlert() : alloy.layout.alert("\u590d\u5236\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")
            },
            onMoveFileFail: function (a) {
                a.retcode == 0 && a.result && a.result.code == 30001 ? alloy.storage.storageFullAlert() : alloy.layout.alert("\u79fb\u52a8\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")
            },
            onUpdateFileFail: function () {
                alloy.layout.alert("\u66f4\u65b0\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")
            },
            onDeleteFileFail: function () {
                alloy.layout.alert("\u5220\u9664\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")
            },
            onDesktopResize: function () {
                var b = alloy.layout.getAvailableWidth(),
                    c = alloy.layout.getAvailableHeight(),
                    b = {
                        width: b,
                        height: c
                    };
                if (b.width) {
                    var c = alloy.layout.getAreaWidth("left"),
                        e = alloy.layout.getAreaWidth("right");
                    z = b.width;
                    y = z + c + e;
                    d.setStyle(l, "width", z + "px");
                    for (var e =
                        0, f = p.length; e < f; ++e) c = p[e], d.setStyle(c.getIconContainer(), "width", b.width - 28 + "px"), d.setStyle(c.getIconContainer(), "marginLeft", "28px"), a.browser.engine.webkit && d.setStyle(c.getElement(), "left", y + "px"), d.setStyle(c.getElement(), "width", b.width + "px")
                }
                if (b.height) {
                    u = b.height - alloy.layout.getAreaHeight("bottom");
                    d.setStyle(l, "height", u + "px");
                    e = 0;
                    for (f = p.length; e < f; ++e) d.setStyle(p[e].getIconContainer(), "height", u - 46 + "px"), d.setStyle(p[e].getIconContainer(), "marginTop", "46px"), d.setStyle(p[e].getElement(),
                        "height", u + "px")
                }
                d.setStyle(j, "left", alloy.layout.getAreaWidth("left") + "px");
                d.setStyle(j, "right", alloy.layout.getAreaWidth("right") + "px");
                b = u - 46;
                t = Math.floor((z - 28) / F);
                w = Math.floor(b / H);
                ea()
            },
            onDockLocationChanged: function () {
                var a = alloy.layout.getAreaHeight("top");
                d.setStyle(l, "top", a + "px");
                E.onDesktopResize()
            },
            onSortControllerDragEnd: function (a) {
                alloy.util.report2qqweb("screen|screendrag");
                h === g.DRAG && P(g.NORMAL);
                var b = a.apperceiveEl,
                    a = b.getAttribute("fileId"),
                    b = b.getAttribute("type");
                if (a && b &&
                    (a = {
                        id: a,
                        t: b
                    }, (a = alloy.fileSystem.getFileByFile(a)) && a.processing))
                    if (a = alloy.iconFactory.getIcons(a.id, a.t))
                        for (var b = 0, c = a.length; b < c; b++) a[b].disable()
            },
            onSortControllerDragStart: function () {
                P(g.DRAG)
            },
            onUACReady: function () {
                L(fa() - 1, !0);
                ha(ga())
            }
        }, L = function (c, e) {
            if (c === o || M(c) || !p[c]) return !1;
            if (v && !v[c]) {
                var f = alloy.fileSystem.getFolderById(c);
                Z(f.items, f.id)
            }
            f = c > o ? 1 : 2;
            M(o) || p[o].setNotCurrent(f, e);
            o = c;
            p[c].setCurrent(f, e);
            a.browser.ie == 6 && d.setStyle(document.body, "height", d.getStyle(document.body,
                "height"));
            x[c] && Y(c);
            b.notifyObservers(alloy.portal, "DesktopSwitch", o);
            return !0
        }, R = function () {
            var a = o + 1;
            a >= p.length || L(a)
        }, W = function () {
            var a = o - 1;
            a < 0 ? alloy.portal.isWebTop() && alloy.portal.switchToDesktop() : L(a)
        }, P = function (a) {
            a = a || g.NORMAL;
            if (a === g.EDIT) {
                if (h === g.DRAG) return;
                d.addClass(j, "appButtonEditState");
                for (var c = 0, e = f.length; c < e; ++c) f[c].setAttribute("title", "\u8fd4\u56de"), f[c].lastChild.firstChild.innerHTML = "\u8fd4\u56de";
                s.lock()
            } else if (a === g.NORMAL) {
                d.removeClass(j, "appButtonEditState");
                c = 0;
                for (e = f.length; c < e; ++c) f[c].setAttribute("title", "\u6dfb\u52a0"), f[c].lastChild.firstChild.innerHTML = "\u6dfb\u52a0"
            }
            a !== g.EDIT && s.isLock() && s.unlock();
            h = a;
            b.notifyObservers(alloy.portal, "DesktopSwitchStatus", {
                status: a
            });
            return a
        }, T = document.createElement("div");
    T.className = "appButton addQuickLinkButton";
    T.setAttribute("title", "\u6dfb\u52a0");
    T.innerHTML = '<div class="addQuickLinkButtonInner"></div>        <div class="appButton_appName"><div class="appButton_appName_inner">\u6dfb\u52a0</div><div class="appButton_appName_inner_right"></div></div>';
    var $ = function (a) {
        a.stopPropagation();
        h === g.EDIT ? (P(g.NORMAL), alloy.util.report2qqweb("screen|ipad|edited")) : (alloy.layout.showContextMenu({
            x: a.clientX,
            y: a.clientY
        }, {
            items: O
        }), alloy.util.report2qqweb("add|add|" + alloy.desktopManager.getCurrentDesktopIndex()))
    }, C = function (b, d) {
            var e = {
                parentNode: d
            }, f;
            if (b.t == B.APP) {
                var h = b.id;
                f = alloy.appconfig.getAppConfig(h);
                if (!f) return a.profile('createFileIcon. id="' + h + '" appConfig is null', "DesktopManager"), alloy.fileSystem.deleteFile(b, null, null, null, !1), null;
                f = alloy.iconFactory.createIcon(b.t, e, f)
            } else if (b.t == B.BUDDY || b.t == B.GROUP) f = alloy.iconFactory.createIcon(b.t, e, b);
            else if (b.t == B.FOLDER || b.t == B.FILE) f = alloy.iconFactory.createIcon(b.t, e, b);
            f && (c[f.getId()] = f, s.addDragClass(f.getElement()));
            return f
        }, ca = function (a, b) {
            var c = b.targetId,
                d = b.targetPosition,
                e = b.sourcePosition,
                f = -1;
            b.sourceId == c ? (k[c].splice(e, 1), k[c].splice(d, 0, a.getId()), e > d ? (f = e, e = d) : f = d) : (e = d, k[c].splice(d, 0, a.getId()));
            Y(c, e, f)
        }, Z = function (b, c, f) {
            typeof progress == "function" && progress("screen:" +
                c);
            if (!v[c]) {
                v[c] = !0;
                var h = p[c].getIconContainer();
                d.hide(h);
                var g = new a.fx.Animation({
                    element: h,
                    property: "opacity",
                    from: 0,
                    to: 1,
                    unit: !1,
                    duration: 2E3,
                    fps: 30,
                    transition: e.sinusoidal.easeOut
                });
                q[c] = new a.Chunk(b, function (a) {
                    a && (a = C(a, h, c)) && k[c].push(a.getId())
                }, this, !1, function () {
                    ea();
                    setTimeout(function () {
                        a.browser.ie == 7 || a.browser.ie == 6 ? d.show(h) : (d.setStyle(h, "opacity", 0), d.show(h), g.start())
                    }, 500);
                    f && f()
                })
            }
        }, aa = function (a, b, d) {
            k[b].splice(d, 1);
            a = c[a.getId()];
            delete c[a.getId()];
            a.destroy();
            Y(b,
                d)
        }, ia = function () {
            for (var a = 0, b = p.length; a < b; ++a) k[a].length = 0;
            for (a in c) b = c[a], c[a] = null, delete c[a], b.destroy && b.destroy()
        }, X = function (a, b) {
            typeof b !== "undefined" && (a = b + "_" + a);
            return c[a]
        }, da = {}, ea = function () {
            for (var a = 0, b = p.length; a < b; ++a) da["" + a] || function (a) {
                da[a] = setTimeout(function () {
                    Y(a);
                    da["" + a] = null
                }, 500)
            }(a)
        }, ba = function (a, b, c) {
            var e = r || (r = d.getWidth(a)),
                f = m || (m = d.getHeight(a)),
                b = (F - e) / 2 + b,
                c = (H - f) / 2 + c;
            d.setStyle(a, "left", b + "px");
            d.setStyle(a, "top", c + "px")
        }, Y = function (a, b, c) {
            var b = 0,
                c = -1,
                d = k[a],
                e = d.length;
            if (e == 0) ba(f[a], 0, 0);
            else {
                b !== void 0 ? b > e - 1 && (b = e - 1) : b = 0;
                if (c == void 0 || c == -1 || c > e - 1) c = e - 1;
                var h = Math.floor(b / w) * F,
                    g = b % w * H,
                    n = w * t <= b + 1;
                n && (h = b % t * F, g = Math.floor(b / t) * H);
                for (; b <= c; b++)
                    if (n = d[b], n != void 0 && (n = X(n))) ba(n.getElement(), h, g), (n = w * t <= b + 1) ? (b + 1) % t == 0 ? (h = 0, g += H) : h += F : (b + 1) % w == 0 ? (g = 0, h += F) : g += H;
                c == e - 1 && ba(f[a], h, g);
                A[a] && A[a].update(a);
                x[a] = 0
            }
        }, fa = function () {
            return alloy.config.configList.defaultScreen || 3
        }, ga = function () {
            return alloy.config.configList.desktopIconStyle || 0
        }, ha =
            function (a, c, e) {
                alloy.config.configList.desktopIconStyle = a;
                a == 0 ? (F = 142, H = 112, d.removeClass(l, "desktopSmallIcon")) : (H = F = 90, d.addClass(l, "desktopSmallIcon"));
                var f = u - 46;
                t = Math.floor((z - 28) / F);
                w = Math.floor(f / H);
                m = r = 0;
                x = [1, 1, 1, 1, 1];
                Y(o);
                c && alloy.portal.getLoginLevel() > alloy.CONST.LOGIN_LEVEL_NONE && (e ? alloy.rpcService.sendMSetConfigDelay({
                    data: {
                        0: {
                            desktopIconStyle: a
                        }
                    },
                    delay: e
                }) : alloy.rpcService.sendSetConfig({
                    data: {
                        r: {
                            appid: 0,
                            value: {
                                desktopIconStyle: a
                            }
                        }
                    }
                }));
                b.notifyObservers(alloy.desktopManager, "DesktopIconStyleChanged",
                    a)
        };
    this.init = function (c) {
        var e = c.initializeLength || 5,
            c = c.currentDesktopIndex || Math.floor(e / 2);
        j = alloy.layout.getArea("main");
        j.innerHTML = '            <div id="desktopsContainer"></div>';
        l = d.id("desktopsContainer");
        d.setClass(l, "desktopsContainer");
        s = new a.ui.Sortables([], "id");
        var h;
        p = [];
        for (var g = 0; g < e; ++g) {
            h = new N({
                index: g,
                appendTo: l
            });
            p.push(h);
            s.addDropTarget({
                el: h.getIconContainer(),
                level: 0
            });
            k[g] = [];
            h = g;
            var n = T.cloneNode(!0);
            n.setAttribute("screen", h);
            p[h].getIconContainer().appendChild(n);
            b.on(n, "click", $);
            f.push(n)
        }
        L(c, !0);
        b.addObserver(s, "start", E.onSortControllerDragStart);
        b.addObserver(s, "end", E.onSortControllerDragEnd);
        b.addObserver(alloy.layout, "desktopResize", E.onDesktopResize);
        b.addObserver(alloy.dock, "DockLocationChanged", E.onDockLocationChanged);
        b.addObserver(alloy.appconfig, "GetAppConfigComplete", E.onGetAppConfigComplete);
        b.addObserver(alloy.appconfig, "GetDefaultAppConfigComplete", E.onGetAppConfigComplete);
        b.addObserver(alloy.appconfig, "ClearDefaultApp", E.onClearDefaultApp);
        b.addObserver(alloy.fileSystem, "FileMove", E.onFileMove);
        b.addObserver(alloy.fileSystem, "FileAdd", E.onFileAdd);
        b.addObserver(alloy.fileSystem, "FileDelete", E.onFileDelete);
        b.addObserver(alloy.fileSystem, "FileOperateTimeout", E.onFileOperateTimeout);
        b.addObserver(alloy.fileSystem, "FileOperateError", E.onFileOperateError);
        b.addObserver(alloy.fileSystem, "AddFileFail", E.onAddFileFail);
        b.addObserver(alloy.fileSystem, "CopyFileFail", E.onCopyFileFail);
        b.addObserver(alloy.fileSystem, "DeleteFileFail", E.onDeleteFileFail);
        b.addObserver(alloy.fileSystem, "MoveFileFail", E.onMoveFileFail);
        b.addObserver(alloy.fileSystem, "UpdateFileFail", E.onUpdateFileFail);
        b.addObserver(alloy.portal, "UACReady", E.onUACReady)
    };
    this.DESK_STATUS = g;
    this.setCurrentDesktop = L;
    this.goNextDesktop = R;
    this.goPrevDesktop = W;
    this.refreshDesktop = function () {
        s.refreshDropTarget()
    };
    this.getDesktop = function (a) {
        return p[a]
    };
    this.getDesktopList = function () {
        return p
    };
    this.getCurrentDesktopIndex = function () {
        return o
    };
    this.getCurrentDesktop = function () {
        return p[o]
    };
    this.setDesktopStatus = P;
    this.getDesktopStatus = function () {
        return h
    };
    this.getDragController = function () {
        return s
    };
    this.getDefaultDesktop = fa;
    this.setDefaultDesktop = function (a, b, c) {
        a = Number(a);
        if (b && alloy.portal.getLoginLevel() > alloy.CONST.LOGIN_LEVEL_NONE) alloy.config.configList.defaultScreen = a, c ? alloy.rpcService.sendMSetConfigDelay({
            data: {
                0: {
                    defaultScreen: a
                }
            },
            delay: c
        }) : alloy.rpcService.sendSetConfig({
            data: {
                r: {
                    appid: 0,
                    value: {
                        defaultScreen: a
                    }
                }
            }
        })
    };
    this.getDesktopIconStyle = ga;
    this.setDesktopIconStyle = ha
});
Jx().$package("alloy.portal", function (a) {
    var d = this,
        b = a.dom,
        e = a.event,
        g = a.http,
        j = a.cookie,
        l, p = !1,
        o, s = alloy.CONST.LOGIN_LEVEL_NONE,
        v = 0,
        w, t = 1,
        r, m, f = !1,
        k = !1,
        q = 0,
        D = 0,
        c, h = !1,
        A = "",
        x, z, y = "",
        u = "",
        n = null,
        B = 0,
        F = !1,
        H, Q, J, I, M = !1,
        K, U, O = [],
        G = [],
        V = "socket",
        N, E = {}, L, R = null,
        W = !0;
    alloy.system = d;
    var P = [],
        T = ["pgv_info", "ptisp", "uin", "skey", "ptwebqq"];
    d.saveAndDelLockCookie = function () {
        for (var a in T) P.push({
            name: T[a],
            value: j.get(T[a])
        }), j.remove(T[a], alloy.CONST.MAIN_DOMAIN)
    };
    d.revertLockCookie = function () {
        for (var a = P.length -
            1; a >= 0; a--) j.set(P[a].name, P[a].value, alloy.CONST.MAIN_DOMAIN, "/");
        P = []
    };
    d.speedTest = alloy.util.speedTest;
    d.isWebTop = function () {
        return window.webTop ? !0 : !1
    };
    d.isWebTopAir = function () {
        return /AIR/.test(webTop.type) ? !0 : !1
    };
    d.isWebTopQT = function () {
        return /QT\//.test(webTop.type) ? !0 : !1
    };
    d.isWebTopWin = function () {
        return /WIN/.test(webTop.type) ? !0 : !1
    };
    this.setPortalSelf = function (b) {
        d.self = d.self || {};
        d.self.uin = b.uin || d.getUin();
        d.self.allow = b.allow;
        d.self.age = b.age;
        d.self.nick = b.nick;
        d.self.vip = b.vip_info;
        d.self.vipRoam =
            null;
        d.self.htmlNick = a.string.encodeHtml(String(b.nick));
        d.self.titleNick = String(b.nick);
        d.self.country = b.country;
        d.self.province = b.province;
        d.self.city = b.city;
        d.self.gender = b.gender;
        d.self.face = b.face;
        d.self.phone = b.phone;
        d.self.mobile = b.mobile;
        d.self.email = b.email;
        d.self.uiuin = b.uiuin || b.uin
    };
    this.setPortalSelfItem = function (a, b) {
        d.self[a] = b
    };
    this.getPortalSelf = function (a) {
        return typeof d.self == "undefined" ? {} : typeof a == "undefined" ? d.self : d.self[a]
    };
    this.isNewUser = function () {
        return h
    };
    this.setIsNewUser =
        function (a) {
            h = a
    };
    var $ = function () {
        a.profile("runCoreApps Start!", "portal!");
        alloy.notifier.init();
        d.runApp("tips", {
            callback: function () {
                a.profile("runCoreApps Finish!", "portal!")
            }
        })
    }, C = function () {
            var a = d.getLoginLevel(),
                b;
            a == 1 ? b = "panel" : a == 2 ? b = "go" : a == 3 && (b = "logined");
            return b
        };
    this.setReRunAppList = function (a) {
        O = a
    };
    this.getReRunAppList = function () {
        return O
    };
    var ca = function () {
        a.profile("reRunBeforeLoginApps Start!", "portal!");
        if (O) {
            for (var b = 0; b < O.length; ++b) {
                var c, e;
                a.isArray(O[b]) ? (c = O[b][0], e = O[b][1],
                    e = d.getUrlOption(c) || e, d.removeUrlOption(c)) : c = O[b];
                var f = d.getApp(c);
                f && !f.isRunning() && (c == alloy.config.__eqqid ? (c = C(), a.debug("run EQQ in [reRunBeforeLoginApps],level:" + d.getLoginLevel() + ": " + c, "_plogin"), d.runApp(alloy.config.__eqqid, {
                    loginMode: c
                })) : e ? d.runApp(c, e) : d.runApp(c))
            }
            d.setReRunAppList([])
        }
        a.profile("reRunBeforeLoginApps Finish!", "portal!")
    };
    this.getDefaultRunApps = function () {
        R = R == null ? [] : R;
        return [].concat([], [], R)
    };
    var Z = function () {
        var b = decodeURIComponent(window.location.search);
        if (b.indexOf("appUrl") == -1 && (b = a.string.mapQuery(b).run || "")) return a.json.parse(b)
    }, aa = function () {
            var b = Z();
            if (a.isObject(b))
                for (var c in b) alloy.portal.runApp(c, d.getUrlOption(c) || {
                    runFrom: "url"
                });
            window.location.search.indexOf("_APPBOX") > -1 && alloy.util.report2qqweb("monitor|signin|fromqqclient");
            window.location.search.indexOf("CLIENT.QQ.PROFILE") > -1 && alloy.util.report2qqweb("monitor|signin|fromqqclientminicard")
        }, ia = function (b) {
            if (a.isObject(b))
                for (var c in b)
                    if (a.isObject(b[c]) || a.isArray(b[c])) {
                        if (!arguments.callee.call(this,
                            b[c])) return !1
                    } else {
                        if (!a.isNumber(b[c]) && /(\'|\")/g.test(b[c])) return a.error("urlApp option\u4e2dvalue\u503c\u7684\u5b57\u7b26\u4e32\u4e0d\u80fd\u5305\u542b\u5355\u53cc\u5f15\u53f7\uff01"), !1
                    } else if (a.isArray(b))
                for (var d = 0; d < b.length; d++)
                    if (a.isObject(b[d]) || a.isArray(b[d])) {
                        if (!arguments.callee.call(this, b[d])) return !1
                    } else {
                        if (!a.isNumber(b[d]) && /(\'|\")/g.test(b[c])) return a.error("urlApp option\u4e2dvalue\u503c\u7684\u5b57\u7b26\u4e32\u4e0d\u80fd\u5305\u542b\u5355\u53cc\u5f15\u53f7\uff01"), !1
                    } else return !1;
            return !0
        }, X = function () {
            var b = Z();
            if (a.isObject(b))
                for (var c in b)
                    if (a.isObject(b[c])) ia(b[c]) ? (b[c].runFrom = "url", m = {}, ~~c != 0 && !d.getAllConfig(c) && (m.appMarket = {
                        page: "introduce",
                        option: {
                            appid: c
                        },
                        runFrom: "url"
                    }), m[c] = b[c]) : b[c].runFrom = "url"
        };
    this.getUrlOption = function (a) {
        return m && m[a] || null
    };
    this.removeUrlOption = function (a) {
        m && delete m[a];
        m && !a && (m = null)
    };
    this.getIsAlloyJsReady = function () {
        return w
    };
    var da = function () {
        a.cookie.remove("ptwebqq", alloy.CONST.MAIN_DOMAIN);
        pt_logout.logout(function (b) {
            switch (b) {
                default: a.out("ptLogout fail!");
                break;
            case 1:
                a.out("SuperKey has been clean...");
                break;
            case 2:
                a.out(":LogoutSuccess...")
            }
        });
        a.cookie.remove("p_skey", alloy.CONST.DEFAULT_DOMAIN);
        a.cookie.remove("p_uin", alloy.CONST.DEFAULT_DOMAIN);
        a.cookie.remove("pt4_token", alloy.CONST.DEFAULT_DOMAIN);
        a.cookie.remove("vfwebqq", alloy.CONST.MAIN_DOMAIN);
        a.cookie.remove("uin", alloy.CONST.MAIN_DOMAIN);
        a.cookie.remove("skey", alloy.CONST.MAIN_DOMAIN)
    }, ea = function () {
            a.profile("reset start!", "portal!");
            if (w) {
                var b = d.getRunningAppStatus();
                if (b) {
                    M = !0;
                    for (var c =
                        0; c < b.appList.length; c++) {
                        var h = b.appList[c].appId;~~
                        h && (h = "app" + h);
                        (h = alloy.app[h]) && h.isRunning() && h.exit()
                    }
                    M = !1
                }
            }
            f = !1;
            e.notifyObservers(alloy.portal, "reset", d.getLoginLevel());
            a.profile("reset finish!", "portal!")
        }, ba = function () {
            K = r = !0;
            a.profile("tryLogin start, tryLoginLevel:" + s, "portal!");
            qqweb.util.report2h("pass_ptlogin", "start");
            typeof progress == "function" && progress("pass_ptlogin");
            if (s > alloy.CONST.LOGIN_LEVEL_NONE)
                if (alloy.util.report2h("get_vfwebqq", "start"), v = d.getCookieUin(), Q) {
                    if (d.setUin(v),
                        fa() ? ea() : K = !1, s == alloy.CONST.LOGIN_LEVEL_ALL) {
                        d.setLoginLevel(alloy.CONST.LOGIN_LEVEL_ALL);
                        a.debug("run EQQ in [tryLogin],tryLoginLevel:" + s, "_plogin");
                        var b = {
                            directLogin: !0
                        };
                        if (d.getTryLoginState()) b.loginState = d.getTryLoginState();
                        d.runApp(alloy.config.__eqqid, b)
                    }
                } else alloy.rpcService.sendGetSeftInfo(v);
                else v = 0, d.setUin(v), Y();
            a.profile("tryLogin finish!", "portal!")
        }, Y = function () {
            e.notifyObservers(d, "SimpleUACReady", {
                uacLoaded: 3
            })
        }, fa = function () {
            return d.getUin() === d.getOldUin() ? (a.debug("uin not change: " +
                d.getUin(), "_plogin"), !1) : (a.debug("uin change: " + d.getOldUin() + " -> " + d.getUin(), "_plogin"), !0)
        }, ga = function () {
            return t === o ? (a.debug("loginLevel not change: " + t, "_plogin"), !1) : (a.debug("loginLevel change: " + o + " -> " + t, "_plogin"), !0)
        }, ha = function () {
            p || alloy.portal.recoverCookie()
        };
    this.longPoll = function (a) {
        if (a) a = a.r, G = a.al
    };
    this.longPollIn = function () {};
    this.longPollLogin = function () {};
    this.initPushService = function () {
        a.browser.plugins.flash ? b.id("socketFlash").innerHTML = '<object style="position:absolute;left:1px;top:1px;" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9.0.45.0" width="1" height="1" id="Socket" align="middle">\t\t\t<param name="allowScriptAccess" value="always" />\t\t\t\t<param name="allowFullScreen" value="false" />\t\t\t\t<param name="movie" value="swf/Socket.swf?t=20111011001" /><param name="quality" value="high" /><param name="wmode" value="opaque" /><param name="bgcolor" value="#ffffff" /><embed src="swf/Socket.swf?t=20111011001" quality="high" wmode="opaque" bgcolor="#ffffff" width="1" height="1" name="Socket" align="middle" allowScriptAccess="sameDomain" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer_cn" />\t\t\t</object>' :
            (d.longPollLogin(), V = "longPoll")
    };
    var ja = function () {
        a.cookie.remove("ptwebqq", alloy.CONST.MAIN_DOMAIN)
    }, la = function () {
            var a = alloy.windowManager.getOnlyWidgetList(),
                b = {}, c, d;
            for (d in a) c = a[d], b[c.getAppId()] = c.desktopIndex;
            return b
        }, S = {
            onPortalReady: function (b) {
                typeof progress == "function" && progress("portalReady", 0);
                f = !0;
                B++;
                a.profile("onPortalReady, portalReadyCount:" + B + ", currentLevel:" + b + ", oldLevel:" + o, "portal!");
                if (fa() || B == 1) {
                    b = 0;
                    if (a.browser.ie == 6 || a.browser.ie == 7) b = 500;
                    setTimeout(function () {
                        var b =
                            Z();
                        if (a.isObject(b)) X(), aa();
                        else {
                            X();
                            a.profile("runAppsInRunStatus Start!", "portal!");
                            d.getLoginLevel() < alloy.CONST.LOGIN_LEVEL_NOCHAT ? b = alloy.config.getDefaultRunWidget() : (alloy.config.removeFromRunStatusList(alloy.config.getDeleteAppList()), b = alloy.config.getRunStatus());
                            if (b) {
                                R = R == null ? [] : R;
                                for (var c in b) R.push(c);
                                var e, f;
                                for (f in b) c = Number(f), e = b[f], d.runApp(c, {
                                    desktopIndex: e
                                });
                                a.profile("runAppsInRunStatus Finish!", "portal!")
                            }
                            if (d.getLoginLevel() < alloy.CONST.LOGIN_LEVEL_NOCHAT) {
                                a.profile("runDefaultApps Start!",
                                    "portal!");
                                f = [];
                                b = d.getLoginLevel();
                                for (c = 0; c < f.length; ++c) f[c] == alloy.config.__eqqid ? b != 3 && (e = C(), a.debug("run EQQ in [runDefaultApps],level:" + b + ": " + e, "_plogin"), d.runApp(alloy.config.__eqqid, {
                                    loginMode: e
                                })) : d.runApp(f[c]);
                                a.profile("runDefaultApps Finish!", "portal!")
                            }
                            ca();
                            aa();
                            a.profile("runPopApps Start!", "portal!");
                            f = [];
                            for (b = 0; b < f.length; ++b) switch (f[b]) {
                                default: d.runApp(f[b])
                            }
                            a.profile("runPopApps Finish!", "portal!")
                        }
                        $()
                    }, b)
                }
                if (B == 1) {
                    window.webTop && webTop.ui.channel.postCmd(19);
                    try {
                        typeof pgvMain ==
                            "function" && (window.webTop ? pgvMain("", {
                                virtualDomain: alloy.CONST.DEFAULT_DOMAIN
                            }) : pgvMain("", {
                                virtualDomain: "web.qq.com"
                            })), qqweb.util.report2h("portal", "end", "ok"), qqweb.portal.speedTest.sRTS(8, "end", new Date, !0)
                    } catch (c) {}
                }
                d.getLoginLevel() > qqweb.CONST.LOGIN_LEVEL_NONE && d.initPushService();
                b = a.string.mapQuery(location.href.toLowerCase());
                b.adtag && b.adtag == "desktop" && alloy.util.report2qqweb("monitor|signin|fromqqclient165desktop");
                alloy.system.runApp("explorer")
            },
            onExitSuccess: function () {
                location.reload()
            },
            onGetVfWebQQError: function () {
                a.profile("onGetVfWebQQError", "portal!");
                qqweb.util.report2h("get_vfwebqq", "end", "error");
                a.cookie.remove("p_skey", alloy.CONST.DEFAULT_DOMAIN);
                a.cookie.remove("p_uin", alloy.CONST.DEFAULT_DOMAIN);
                a.cookie.remove("pt4_token", alloy.CONST.DEFAULT_DOMAIN);
                d.setUin(0);
                d.setLoginLevel(qqweb.CONST.LOGIN_LEVEL_NONE);
                Y()
            },
            onGetVfWebQQSuccess: function (b) {
                d.setLoginLevel(alloy.CONST.LOGIN_LEVEL_NOCHAT);
                d.setUin(v);
                n = b.result ? b.result.vfwebqq : null;
                a.profile("onGetVfWebQQSuccess, vfwebqq:" +
                    n, "portal!");
                qqweb.util.report2h("get_vfwebqq", "end", "ok");
                ea();
                e.notifyObservers(alloy.portal, "GetLoginInfoSuccess", {
                    isSelfInfoLoad: !0
                })
            },
            onGetLoginInfoSuccess: function (a) {
                typeof progress == "function" && progress("get_vfwebqq");
                qqweb.util.report2h("pass_ptlogin", "end", "ok");
                if (!a || !a.isSelfInfoLoad) alloy.util.report2h("get_selfinfo", "start"), alloy.rpcService.sendGetUserInfo(alloy.portal.getUin())
            },
            onGetSelfInfoSuccess: function (b) {
                if (b.retcode == 0) {
                    var c = b.arguments.uin,
                        d = b.result;
                    if (alloy.portal.getUin() ==
                        c) d.uiuin = alloy.portal.getCookiePTUiUin(), alloy.portal.setPortalSelf(d), e.notifyObservers(alloy.portal, "selfInfoReady", alloy.portal.getPortalSelf()), qqweb.util.report2h("get_selfinfo", "end", ["ok"][b.retcode] || b.retcode), alloy.util.stat.report()
                } else a.error("[sendGetUserInfo\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: " + b.retcode + "-" + b.errmsg)
            },
            onSelfInfoReady: function () {
                a.profile("onSelfInfoReady", "portal!");
                r && (r = !1, K ? (K = !1, alloy.config.init()) : ga() && ca())
            },
            onReset: function () {},
            onUACReady: function () {
                w ?
                    e.notifyObservers(alloy.portal, "AlloyReady") : e.notifyObservers(alloy.portal, "FrameWorkReady")
            },
            onFrameWorkReady: function () {
                typeof progress == "function" && progress("FrameWorkReady", 100);
                alloy.layout.hideStartingCover();
                var b;
                b = a.browser.mobileSafari ? 1 : 0;
                var c = alloy.CONST.CDN_URL + "alloy/";
                g.loadCss(alloy.CONST.CDN_URL + "style/qqweb.main.2.css?t=" + alloy.CONST.UPDATE_TIME_STAMP, {
                    onSuccess: function () {}
                });
                g.loadScript(c + b + "/qqweb.part2.js?t=" + alloy.CONST.UPDATE_TIME_STAMP, {
                    onSuccess: function () {
                        w = !0;
                        e.notifyObservers(alloy.portal,
                            "AlloyJsReady");
                        e.notifyObservers(alloy.portal, "AlloyReady")
                    }
                })
            },
            onAlloyJsReady: function () {
                typeof progress == "function" && progress("AlloyJsReady", 0);
                alloy.navbar.init();
                alloy.sound.init();
                alloy.hotkeyManager.init();
                alloy.hotkey.init();
                alloy.messageSystem.init();
                alloy.pushService.init();
                alloy.localStorage.init();
                alloy.windowFactory.registerWindow("Window", alloy.businessClass.Window);
                alloy.windowFactory.registerWindow("EqqWindow", alloy.businessClass.EqqWindow);
                alloy.windowFactory.registerWindow("Widget",
                    alloy.businessClass.Widget)
            },
            onFirstScreenReady: function () {
                typeof progress == "function" && progress("FirstScreenReady", 0);
                var b = d.getLoginLevel();
                a.profile("onGetAppConfigComplete", "portal!");
                try {
                    e.notifyObservers(alloy.portal, "portalReady", b)
                } catch (c) {
                    a.error("portalReady, but [portalReady notify] error, level:" + b)
                }
            },
            onGetAppConfigComplete: function () {},
            onLoginLevelChange: function () {},
            onUpdateAppConfig: function (a) {
                var b = d.getApp(a.id);
                b && b.updateAppConfig(a)
            },
            onRemoveAppConfig: function (a) {
                var b = d.getApp(a.id);
                b && b.removeAppConfig(a);
                delete alloy.app["app" + a.id];
                d.setAppLoading(a.id, !1)
            },
            onAppRun: function (a) {
                if (!(alloy.portal.getLoginLevel() == alloy.CONST.LOGIN_LEVEL_NONE || !alloy.portal.getVfWebQQ() || !Number(a)))
                    if ((a = alloy.portal.getAllConfig(a)) && !(a.preview || a.windowType != "widget")) a = la(), alloy.rpcService.sendMSetConfigDelay({
                        data: {
                            0: {
                                runWidgets: a
                            }
                        },
                        delay: 2E3
                    })
            },
            onAppExit: function (a) {
                if (!(alloy.portal.getLoginLevel() == alloy.CONST.LOGIN_LEVEL_NONE || !alloy.portal.getVfWebQQ() || M || a.preview)) {
                    var b = a.window ||
                        a.widget;
                    if (b && (a = Number(a.option.id)) && /(window)|(widget)/.test(b.windowType)) {
                        var c = alloy.portal.getAllConfig(a);
                        if (c)
                            if (c.selfConfig = c.selfConfig || {}, b.windowType == "widget") {
                                var d = b.getX(),
                                    b = b.getY();
                                c.selfConfig.x = d;
                                c.selfConfig.y = b;
                                c = {};
                                c[a] = {
                                    x: d,
                                    y: b
                                };
                                b = la();
                                b[a] = null;
                                delete b[a];
                                c[0] = {
                                    runWidgets: b
                                };
                                alloy.rpcService.sendMSetConfigDelay({
                                    data: c,
                                    delay: 1E3
                                })
                            } else if (b.option.resize) {
                            var d = b.getBodyWidth(),
                                e = b.getBodyHeight(),
                                b = b.getBoxStatus();
                            c.selfConfig.defaultMode = b;
                            c.selfConfig.width = d;
                            c.selfConfig.height =
                                e;
                            c = {};
                            c.defaultMode = b;
                            if (b != "fullscreen" && b != "max") c.width = d, c.height = e;
                            alloy.rpcService.sendSetConfig({
                                data: {
                                    r: {
                                        appid: a,
                                        value: c
                                    }
                                }
                            })
                        }
                    }
                }
            },
            onThirdPartyAppExit: function (a) {
                alloy.portal.unCacheOpenkey(a.option.id)
            }
        };
    this.init = function () {
        typeof progress == "function" && progress("portal init");
        l = {};
        I = 0;
        qqweb.app.appKeyMap = {};
        e.addObserver(qqweb.portal, "exitSuccess", S.onExitSuccess);
        e.addObserver(alloy.rpcService, "GetVfWebQQError", S.onGetVfWebQQError);
        e.addObserver(alloy.rpcService, "GetVfWebQQSuccess", S.onGetVfWebQQSuccess);
        e.addObserver(alloy.portal, "GetLoginInfoSuccess", S.onGetLoginInfoSuccess);
        e.addObserver(alloy.rpcService, "GetUserInfoSuccess", S.onGetSelfInfoSuccess);
        e.addObserver(alloy.portal, "selfInfoReady", S.onSelfInfoReady);
        e.addObserver(alloy.portal, "reset", S.onReset);
        e.addObserver(alloy.portal, "UACReady", S.onUACReady);
        e.addObserver(alloy.portal, "FrameWorkReady", S.onFrameWorkReady);
        e.addObserver(alloy.portal, "FirstScreenReady", S.onFirstScreenReady);
        e.addObserver(alloy.appconfig, "GetAppConfigComplete", S.onGetAppConfigComplete);
        e.addObserver(alloy.appconfig, "GetDefaultAppConfigComplete", S.onGetAppConfigComplete);
        e.addObserver(alloy.appconfig, "UpdateAppConfig", S.onUpdateAppConfig);
        e.addObserver(alloy.appconfig, "RemoveAppConfig", S.onRemoveAppConfig);
        e.addObserver(alloy.portal, "AlloyJsReady", S.onAlloyJsReady);
        e.addObserver(alloy.portal, "portalReady", S.onPortalReady);
        e.addObserver(alloy.portal, "appRun", S.onAppRun);
        e.addObserver(alloy.portal, "appExit", S.onAppExit);
        e.addObserver(alloy.portal, "appExit", S.onThirdPartyAppExit);
        e.addObserver(alloy.portal,
            "loginLevelChange", S.onLoginLevelChange);
        alloy.fileSystem.init();
        alloy.storage.init();
        alloy.desktopContact.init();
        alloy.desktopFolder.init();
        alloy.desktopFile.init();
        alloy.flashUploadManager.init();
        alloy.layout.init();
        alloy.layout.themeManager.init();
        e.addObserver(alloy.layout, "clickDesktop", ha);
        e.addObserver(alloy.layout, "desktopFocus", ha);
        a.profile("initAccount start!", "portal!");
        A = d.getOriginalCookieUin();
        u = d.getCookieSkey();
        y = d.getCookiePtwebqq();
        x = d.getCookieUin();
        s = d.getUin() && d.getSkey() ? 2 :
            1;
        a.profile("initAccount finish!", "portal!");
        ba();
        e.on(window, "unload", ja);
        qqweb.util.report2h("portal", "end_runCoreApps", "ok")
    };
    var ma = 6E5,
        na = 6E6,
        oa = 42E6;
    this.changeCheckOpenKeyFrequency = function (b) {
        ma = b.check * 1E3;
        na = b.renewal * 1E3;
        oa = b.reload * 1E3;
        a.debug("set check frequency done", "OpenKey")
    };
    var sa = function () {
        var b = +new Date;
        a.debug("check open key: " + b, "OpenKey");
        var c, d, e = !1,
            f;
        for (f in E)
            if (d = Number(f)) e = !0, c = E[f], b - c.createTime >= oa ? (a.debug("\u8fc7\u671f\u91cd\u62c9(appId: " + d + "):" + (b - c.createTime) /
                1E3, "OpenKey"), alloy.config.reRequestGrant({
                appId: d
            })) : b - c.lastUpdateTime >= na && (a.debug("\u7eed\u671f(appId: " + d + "):" + (b - c.lastUpdateTime) / 1E3, "OpenKey"), alloy.config.renewalGrant({
                appId: d,
                openId: c.openId,
                openKey: c.openKey
            }));
        e || (clearInterval(L), L = 0, a.debug("stop check open key", "OpenKey"))
    };
    this.cacheOpenkey = function (b) {
        var c = +new Date;
        b.renewal && E[b.appId] ? E[b.appId].lastUpdateTime = c : E[b.appId] = {
            gaid: b.gaid,
            openKey: b.openKey,
            openId: b.openId,
            createTime: c,
            lastUpdateTime: c
        };
        L || (L = setInterval(sa, ma),
            a.debug("start check open key", "OpenKey"))
    };
    this.unCacheOpenkey = function (a) {
        E[a] && (E[a] = null, delete E[a])
    };
    this.getCacheOpenkey = function (a) {
        return E[a]
    };
    this.getPtwebqq = function () {
        return y
    };
    this.setPtwebqq = function (a) {
        return y = a
    };
    this.getOldUin = function () {
        return z
    };
    this.getUin = function () {
        return x
    };
    this.getTryUin = function () {
        return v
    };
    this.getOriginalUin = function () {
        return A
    };
    this.setSecretKey = function (a) {
        q = a
    };
    this.getSecretKey = function () {
        return q
    };
    this.setSecretIp = function (a) {
        D = a
    };
    this.getSecretIp =
        function () {
            return D
    };
    this.acceptSocket = function (b) {
        var b = decodeURI(b),
            c = a.json.parse(b);
        if (c.e == 0)
            if (a.isUndefined(c.appid)) {
                if (c.sid) G = c.al, alloy.util.report2qqweb("push|loginsuccess")
            } else a.event.notifyObservers(qqweb.portal, "message", c);
            else d.longPollLogin(), V = "longPoll", a.error("PushService error: " + b), alloy.util.report2qqweb("push|loginfail")
    };
    this.reportAppState = function (c, d) {
        if (V == "socket")
            if (N)
                for (var e = 0; e < G.length; ++e) {
                    if (c == G[e]) {
                        N.reportAppState && N.reportAppState(c, d);
                        break
                    }
                } else N =
                    a.browser.ie ? b.id("Socket") || window.Socket : document.Socket;
            else
                for (e = 0; e < G.length; ++e)
                    if (c == G[e]) break
    };
    this.reportOpen = function (b) {
        var c = a.json.parse(b);
        if (c.appid) a.event.notifyObservers(qqweb.portal, "message", c), a.event.notifyObservers(qqweb.portal, "message" + c.appId, b);
        else if (c.sid) G = c.al
    };
    this.getSkey = function () {
        return u
    };
    this.getUinAndSkey = function () {
        return {
            uin: x,
            skey: u
        }
    };
    this.getLoginLevel = function () {
        return t
    };
    this.setLoginLevel = function (a) {
        a != t && (o = t, t = a, ga() && (e.notifyObservers(alloy.portal,
            "loginLevelChange", a), a > 1 && I < 1 && d.addExitConfirm()), a != 1 && (a == 2 ? o == 1 && (alloy.util.report2qqweb("signin|visitortoweakness"), d.getPtwebqq() ? alloy.util.report2qqweb("signin|visitortoweakness|signinwithptwebqq") : alloy.util.report2qqweb("signin|visitortoweakness|signin")) : a == 3 && (o == 1 ? (alloy.util.report2qqweb("signin|visitortostrength"), alloy.util.report2qqweb("signin|visitortostrength|" + d.getTryLoginState())) : o == 2 && (d.isWithPtwebqqLogin() ? (alloy.util.report2qqweb("signin|weaknesstostrength|signinwithptwebqq"),
            alloy.util.report2qqweb("signin|weaknesstostrength|signinwithptwebqq|" + d.getTryLoginState())) : (alloy.util.report2qqweb("signin|weaknesstostrength|signin"), alloy.util.report2qqweb("signin|weaknesstostrength|signin|" + d.getTryLoginState()))))), d.setWithPtwebqqLogin(d.getPtwebqq() || !1))
    };
    this.getOldLoginLevel = function () {
        return o
    };
    this.setWithPtwebqqLogin = function (a) {
        k = a
    };
    this.isWithPtwebqqLogin = function () {
        return k
    };
    this.isPortalReady = function () {
        return f
    };
    this.setUin = function (a) {
        z = x;
        return x = a
    };
    this.recoverCookie =
        function () {};
    this.validatePTLoginSuccess = function (b) {
        b = b || {};
        b = a.string.mapQuery(b.url);
        if (typeof b.login2qq === "undefined" && (alloy.util.report2qqweb("monitor|nologinquery"), Q)) b.login2qq = 1;
        if (Number(b.login2qq) === 1) {
            s = 3;
            if (b = b.webqq_type || 0) b = alloy.util.code2state(b), alloy.portal.setTryLoginState(b);
            alloy.portal.setTryLoginType(!0);
            pgvSendClick({
                hottag: "WEB2QQ.STRONGLOGIN"
            })
        } else s = 2, alloy.portal.setTryLoginType(!1), pgvSendClick({
            hottag: "WEB2QQ.WEAKLOGIN"
        });
        a.profile("validatePTLoginSuccess, tryLoginLevel:" +
            s, "portal!");
        alloy.util.report2h("pass_ptlogin", "start");
        A = d.getOriginalCookieUin();
        u = d.getCookieSkey();
        y = d.getCookiePtwebqq();
        ba();
        alloy.layout.hideLoginWindow()
    };
    this.setTryLoginState = function (a) {
        H = a
    };
    this.getTryLoginState = function () {
        return H
    };
    this.setTryLoginType = function (a) {
        Q = a
    };
    this.getSSOForm = function (b) {
        b = b || window.location.search;
        b = a.string.mapQuery(b).sso;
        if (!b) return {};
        var b = a.json.parse(b),
            c = b.skey,
            e = b.cgi,
            f = b.custom,
            h = {};
        h[b.uin] = d.getUin();
        h[c] = d.getCookieSkey();
        a.extend(h, f);
        return {
            option: {
                method: "POST",
                data: h
            },
            cgi: e
        }
    };
    this.getCookieUin = function () {
        var b = a.cookie.get("p_uin", alloy.CONST.MAIN_DOMAIN),
            b = b ? parseInt(b.substr(1), 10) : null;
        a.out("Cookie uin:" + b);
        return b
    };
    this.getCookiePTUiUin = function () {
        var b = a.cookie.get("ptui_loginuin", alloy.CONST.MAIN_DOMAIN);
        b || (b = void 0);
        a.out("PTUI uin:" + b);
        return b
    };
    this.getOriginalCookieUin = function () {
        return a.cookie.get("p_uin", alloy.CONST.MAIN_DOMAIN)
    };
    this.getCookieSkey = function () {
        return a.cookie.get("p_skey", alloy.CONST.MAIN_DOMAIN)
    };
    this.getUnifiedSkey = function () {
        return a.cookie.get("skey",
            alloy.CONST.MAIN_DOMAIN)
    };
    this.getCookiePtwebqq = function () {
        return a.cookie.get("ptwebqq", alloy.CONST.MAIN_DOMAIN)
    };
    var ta = function (a, b) {
        alloy.rpcService.getAppInfo(a, ["appName", "appType", "appUrl", "iconUrl", "id", "category", "exinfo", "al", "gaid"], function (c) {
            if (c.retcode === 0) c = c.result.resultData, c.preview = !0, alloy.appconfig.addAppConfigTemp(c), alloy.portal.runApp(a, b)
        })
    };
    this.runApp = function (b, c) {
        if (w) {
            var c = c || {}, b = b == "eqq" ? alloy.config.__eqqid : b,
                e = this.getAllConfig(b);
            if (!e) return a.out("id:" + b),
            e = c.runFrom, b = Number(b), c.preview ? ta(b, c) : b != 19 && (f ? alloy.portal.runApp("appMarket", {
                page: "introduce",
                option: {
                    appid: b
                },
                runFrom: e
            }) : alert("\u56e0\u7f51\u7edc\u73af\u5883\u95ee\u9898\u5bfc\u81f4\u52a0\u8f7d\u5f02\u5e38\uff0c\u8bf7\u5c1d\u8bd5\u91cd\u65b0\u767b\u5f55\u3002")), !1;
            if (b == "appMarket" && !f) return alert("\u56e0\u7f51\u7edc\u73af\u5883\u95ee\u9898\u5bfc\u81f4\u52a0\u8f7d\u5f02\u5e38\uff0c\u8bf7\u5c1d\u8bd5\u91cd\u65b0\u767b\u5f55\u3002"), !1;
            var h = this.getApp(b),
                c = d.getUrlOption(b) || c;
            h ? (h.run &&
                (~~b > 0 && !e.preview && !e.selfConfigLoaded && d.getLoginLevel() > alloy.CONST.LOGIN_LEVEL_NONE ? (h = ["width", "height", "defaultMode"], e.windowType == "widget" && (h = ["x", "y"]), alloy.rpcService.sendGetConfig({
                    arguments: {
                        appConfig: e,
                        option: c
                    },
                    data: {
                        r: {
                            appid: e.id,
                            itemlist: h
                        }
                    },
                    action: "get",
                    onSuccess: pa,
                    onError: pa
                })) : (e.selfConfig && a.extend(c, e.selfConfig), h.run(c), d.removeUrlOption(b))), c && a.isFunction(c.callback) && c.callback()) : e && (~~b > 0 ? e.appType == 1 ? alloy.portal.loadApp(e, c) : e.appType == 2 && (qqweb.app["app" + b] = new qqweb.businessClass.App(e),
                alloy.portal.runApp(b, c)) : e.appType == 1 ? alloy.portal.loadApp(e, c) : e.appType == 2 && (alloy.app[b] = new alloy.businessClass.App(e), alloy.portal.runApp(b, c)), d.removeUrlOption(b), d.removeUrlOption(b));
            e && (W = !1);
            b == alloy.config.__eqqid && a.platform.iPad && alloy.sound.createIpadAudioObj();
            return !0
        } else alert("\u7cfb\u7edf\u52a0\u8f7d\u4e2d\uff0c\u8bf7\u7a0d\u540e\u3002\u3002\u3002")
    };
    this.loadApp = function (b, c) {
        b = b || {};
        if (!this.getAppLoading(b.id)) {
            this.setAppLoading(b.id, !0);
            var d = b.id,
                e = alloy.util.getAppRoot(d),
                f = e + (b.css || "style.css");
            e += b.js || "main.js";
            (b.css || a.isNumber(d)) && g.loadCss(f + "?" + alloy.CONST.UPDATE_TIME_STAMP);
            g.loadScript(e + "?" + alloy.CONST.UPDATE_TIME_STAMP, {
                onSuccess: function () {
                    alloy.portal.runApp(b.id, c)
                }
            })
        }
    };
    var pa = function (b) {
        var c = b.arguments.appConfig,
            e = b.arguments.option;
        if (b.retcode == 0 && b.result) {
            if (!a.isObject(b.result)) b.result = a.json.parse(b.result);
            var b = b.result || {}, f = ["width", "height", "defaultMode"];
            c.windowType == "widget" && (f = ["x", "y"]);
            var h = !0,
                g;
            for (g in f) f[g] in b || (h = !1), (b[f[g]] === null || typeof b[f[g]] === "undefined") && delete b[f[g]];
            c.selfConfig = h ? b : {}
        } else c.selfConfig = {};
        c.selfConfigLoaded = !0;
        d.runApp(c.id, e)
    };
    this.getAppConfigList = function () {
        return alloy.appconfig.appConfigList
    };
    this.getAppConfig = function (a) {
        return alloy.appconfig.getAppConfig(a)
    };
    this.getSystemConfig = function (a) {
        return alloy.appconfig.getSystemConfig(a)
    };
    this.getAllConfig = function (a) {
        return alloy.appconfig.getAllConfig(a)
    };
    this.getApp = function (a) {
        return~~ a > 0 ? alloy.app["app" + a] : alloy.app[a]
    };
    this.shutdownApp =
        function (a) {
            var b;
            if (b = d.getApp(a)) b.isRunning() && b.exit(), delete alloy.app["app" + a]
    };
    this.setAppLoading = function (a, b) {
        return l[a] = b
    };
    this.getAppLoading = function (a) {
        return l[a]
    };
    var ka = "\u60a8\u786e\u5b9a\u8981\u79bb\u5f00\u201cQ+ Web\u201d\u5417\uff1f";
    this.setCloseHookMessage = function (a) {
        ka = a
    };
    this.getCloseHookMessage = function () {
        return ka
    };
    this.closeHook = function (b) {
        var c = ka;
        pgvSendClick({
            hottag: "web2qq.qqpanel.status.exitQQ"
        });
        if (a.browser.safari || a.browser.chrome) return c;
        else a.browser.ie > 0 ?
            window.event.returnValue = c : b.returnValue = c
    };
    this.closeHookForHotKey = function () {
        alloy.hotkey.unstall()
    };
    var ua = function () {
        if (alloy.portal.getLoginLevel() == alloy.CONST.LOGIN_LEVEL_ALL) {
            EQQ.logout();
            WebqCore.api.log("browser-close-ok");
            if (EQQ.RPCService._proxy) try {
                EQQ.RPCService._proxy.abort()
            } catch (a) {}
            EQQ.View.ChatBox && EQQ.View.ChatBox.scaptureHotkey && EQQ.View.ChatBox.scaptureHotkey.unstall()
        }
    };
    this.addCloseHook = function () {
        F || (F = !0, e.on(window, "beforeunload", this.closeHook), e.on(window, "unload", ua))
    };
    this.addCloseHookForHotKey = function () {
        e.on(window, "unload", this.closeHookForHotKey)
    };
    this.removeCloseHook = function () {
        e.off(window, "beforeunload");
        F = !1
    };
    this.getCloseHook = function () {
        return F
    };
    this.addExitConfirm = function (a) {
        I += a || 1;
        I > 0 && this.addCloseHook();
        return I
    };
    this.removeExitConfirm = function (a) {
        I -= a || 1;
        I < 1 && this.removeCloseHook();
        return I
    };
    this.getExitConfirm = function () {
        return I
    };
    var qa = function (b) {
        var c = alloy.windowManager.getCurrentWindow();
        c && c.getAppId();
        e.notifyObservers(alloy.portal, "exit");
        p = !0;
        b || (da(), a.out(">>>>> cookie.remove"));
        alloy.layout.hideDesktop();
        setTimeout(function () {
            e.notifyObservers(alloy.portal, "exitSuccess")
        }, 1E3);
        W && pgvSendClick({
            hottag: "WEB2QQ.NOAPP.USER.ALL"
        })
    };
    this.exit = function (a) {
        this.getExitConfirm() > 0 ? J ? (J.setWindowCentered(), J.setCurrent()) : J = alloy.layout.confirm("\u60a8\u786e\u8ba4\u8981\u6ce8\u9500  Q+ Web \u5417\uff1f", function () {
            d.removeCloseHook();
            pgvSendClick({
                hottag: "web2qq.qqpanel.status.exitQQ"
            });
            alloy.util.report2qqweb("taskabr|start|exit|ok");
            qa(a)
        }, {
            modal: !0,
            onClose: function () {
                J = null
            }
        }) : qa(a)
    };
    this.restart = function () {
        this.exit(!0)
    };
    this.close = function () {
        window.webTop && (qqweb.util.report2c(webTop.ui.channel.postCmd(25)), qqweb.util.report(), webTop.ui.channel.postCmd(21));
        alloy.portal.exit();
        e.notifyObservers(alloy.portal, "Exit");
        alloy.util.report2qqweb("taskbar|start|close")
    };
    this.getVfWebQQ = function () {
        return typeof EQQ !== "undefined" && EQQ.getVfWebQQ && EQQ.getVfWebQQ() && EQQ.getIsLogin() ? EQQ.getVfWebQQ() : n ? n : ""
    };
    this.setVfWebQQ = function (a) {
        n = a
    };
    this.getRunningAppStatus = function () {
        var a = alloy.windowManager.getCurrentWindow(),
            b = "",
            c;
        a && (b = a.getAppId());
        for (var a = {
            currentAppId: b,
            appList: []
        }, b = alloy.windowManager.getWindowList(), d = 0; d < b.length; d++) {
            var e = b[d],
                f = e.getAppId();
            if (!(f === "eqq--" || f === "sceneChristmas")) {
                c = e.getX();
                var h = e.getY();
                if (e.windowType === "window") {
                    var g = e.getBoxStatus();
                    if (g !== "min") {
                        var n = e.getWidth(),
                            e = e.getHeight();
                        c = {
                            appId: f,
                            defaultMode: g,
                            x: c,
                            y: h,
                            width: n,
                            height: e
                        };
                        f && a.appList.push(c)
                    }
                } else e.windowType === "widget" && (c = {
                    appId: f,
                    x: c,
                    y: h
                }, a.appList.push(c))
            }
        }
        return a
    };
    d.runSettingCenter = function (a) {
        var b = ["config_page_general", "config_page_msg", "config_page_bkg"];
        switch (a && a.pageID || b[0]) {
        case b[0]:
            return d.runApp("settingCenter");
        case b[1]:
            return d.runApp("notifications");
        case b[2]:
            return d.runApp("themeSetting")
        }
    };
    d.runAppMarket = function (a) {
        return d.runApp("appMarket", a)
    };
    d.runBrowser = function (a) {
        return d.runApp("6", a)
    };
    d.runQQ = function (a) {
        return d.runApp(alloy.config.__eqqid, a)
    };
    d.runIME = function (a) {
        return d.runApp("qqWebIme",
            a)
    };
    d.runHandWrite = function (a) {
        return d.runApp("qqHandWrite", a)
    };
    this.openInWebBrowser = function (b) {
        var b = b || {}, c = this.getApp(6);
        return a.isUndefined(c) || !c.isRunning() ? (b.isOpenNewTab = !0, alloy.portal.runApp("6", b)) : (c.openUrl(b), b.callback && b.callback(), !0)
    };
    this.isOpenFile = function (b) {
        return a.array.indexOf(["jpg", "jpeg", "bmp", "png", "gif", "txt", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "pdf"], b) >= 0 ? 1 : 0
    };
    this.openFile = function (a) {
        if ("type" in a) switch (a.type) {
        case "image":
        case "img":
        case "pic":
        case "photo":
        case "jpg":
        case "jpeg":
        case "bmp":
        case "png":
        case "gif":
            alloy.portal.runApp("imgViewer",
                a);
            break;
        case "sound":
        case "music":
        case "audio":
            alloy.portal.runApp("audioPlayer", a);
            break;
        case "txt":
        case "doc":
        case "docx":
        case "ppt":
        case "pptx":
        case "xls":
        case "xlsx":
        case "pdf":
            alloy.portal.runApp("docViewer", a);
            break;
        default:
            alloy.system.alert("\u672a\u77e5\u6587\u4ef6\u7c7b\u578b")
        }
    };
    d.getLoginState = d.getLoginLevel;
    d.isAppInstalled = function (b) {
        if (a.isArray(b.appId)) {
            for (var c = {}, d = 0; d < b.appId.length; d++) c[b.appId[d]] = alloy.config.isInSetupAppList(b.appId[d]) ? !0 : !1;
            return c
        } else return alloy.config.isInSetupAppList(b.appId) ? !0 : !1
    };
    d.isAppRunning = function (a) {
        return (a = d.getApp(a.appId)) && a.isRunning() ? !0 : !1
    };
    d.getAppInfo = function (b) {
        var c = {};
        c.appList = b.appList;
        c.onSuccess = b.onSuccess;
        c.onError = b.onError;
        if (!a.isArray(b.appList)) c.appList = [], c.appList.push(b.appList);
        alloy.rpcService.getAppInfoMulti(c)
    };
    d.isLocked = function () {
        return qqweb.app.screenLocker && qqweb.app.screenLocker.isLocked() ? !0 : !1
    };
    d.openURL = d.openInWebBrowser;
    d.search = function (a) {
        a = a.keyword;
        if (a == "") return !1;
        a = "http://www.soso.com/q?bid=203&cid=webq.a&ie=utf-8&w=" +
            encodeURIComponent(a);
        d.openURL({
            url: a,
            title: "\u641c\u641csoso"
        })
    };
    d.onAirClientReady = function () {
        U = {};
        var a = document.getElementById("webtopInstallerFlash");
        a.detectAppVersion("alloy.portal.onDetectAppVersion");
        a.setOnClick("alloy.portal.onWebTopInstallClick")
    };
    d.onAirInstallerInitFail = function (b) {
        a.error(b)
    };
    d.onDetectAppVersion = function (a) {
        U.appVersion = a || 0
    };
    d.onWebTopSystemClickCb = function (a) {
        d.onDetectAppVersion(a);
        alloy.navbar.showRunWebTopTip()
    };
    d.onWebTopInstallClick = function () {
        alloy.navbar.closeTip()
    };
    d.getAirRunTime = function () {
        return U
    };
    d.switchToDesktop = function (a, b) {
        typeof a !== "undefined" && webTop.ui.channel.postCmd(17, a, b);
        webTop.ui.channel.postCmd(18, 255)
    };
    d.setWebTopNavBarOnTop = function (a) {
        webTop.ui.channel.postCmd(26, a)
    };
    if (window.webTop) {
        var ra = function () {
            var b = arguments[0];
            a.info("onWebTopCommand:" + b);
            var c = va[b];
            c ? c.apply(null, Array.prototype.slice.call(arguments, 1)) : alert("no such callback! - cmd: " + b)
        }, va = {
                16: function (a) {
                    d.openInWebBrowser({
                        url: a,
                        title: "\u6d4f\u89c8\u7f51\u9875"
                    })
                },
                17: function (a, b) {
                    alloy.navbar.setNavBarPosition(Number(a), Number(b));
                    if (webTop.ui.channel.postCmd(22)) {
                        var c = alloy.layout.createBubble({
                            hasCloseButton: !1
                        });
                        c.setTitle("\u8fd4\u56de\u7cfb\u7edf\u684c\u9762");
                        c.setContent('<div class="webtop-sysbtn-thumb"></div>');
                        c.showButton("ok", "\u77e5\u9053\u5566");
                        c.show({
                            pointerPosition: "top left",
                            target: alloy.navbar.getSystemButton()
                        })
                    }
                },
                18: function (a) {
                    alloy.desktopManager.setCurrentDesktop(a)
                },
                20: function () {
                    if (!c) {
                        var a = "\u60a8\u786e\u5b9a\u8981\u9000\u51fa  Q+ Web \u5417\uff1f";
                        window.webTop && (a = "\u60a8\u786e\u5b9a\u8981\u9000\u51fa\u201c\u5ba2\u6237\u7aef\u201d\u5417\uff1f");
                        c = alloy.layout.confirm(a, function () {
                            alloy.portal.close()
                        }, {
                            modal: !0,
                            onClose: function () {
                                c = null
                            }
                        })
                    }
                },
                26: function (a) {
                    alloy.navbar.setNavBarOnTop(a, !0)
                },
                27: function (a) {
                    alloy.util.report2qqweb(a)
                },
                28: function (a) {
                    alloy.util.report2c(a)
                },
                29: function (b) {
                    a.info(b);
                    eval("(" + b + ")")
                }
            };
        /QT\//.test(webTop.type) ? webTop.ui.channel.onCmd.connect(ra) : webTop.ui.channel.onCmd = ra
    }
});
Jet().$package("alloy.layout", function (a) {
    var d = this,
        b = a.dom,
        e = a.event,
        g = a.fx.transitions,
        j = b.getDocumentElement(),
        l = document.body,
        p = b.id("startingCover"),
        o = document.title,
        s = null,
        v = b.id("desktop"),
        w = !0,
        t, r, m = !1,
        f = {}, k = [10, 1E5, 2E5, 3E5, 4E5],
        q, D, c, h, A, x, z, y, u = [],
        n = null,
        B = alloy.CONST.DAID,
        F = [{
            text: "\u663e\u793a\u684c\u9762",
            onClick: function () {
                qqweb.layout.showDesktop();
                qqweb.rpcService.reportQstatic("contextmenu|desktop|dispdesk")
            }
        }, {
            text: "\u9501\u5b9a",
            onClick: function () {
                qqweb.portal.runApp("screenLocker");
                qqweb.rpcService.reportQstatic("contextmenu|desktop|lock")
            }
        }, {
            type: "separator"
        }, {
            text: "\u6dfb\u52a0",
            type: "submenu",
            items: [{
                text: "\u6dfb\u52a0\u5e94\u7528",
                icon: {
                    className: "add_app_icon"
                },
                onClick: function () {
                    alloy.system.runApp("appMarket");
                    qqweb.util.report2qqweb("add|contextmenu|addapp")
                }
            }, {
                text: "\u6dfb\u52a0\u684c\u9762\u8054\u7cfb\u4eba",
                icon: {
                    className: "add_contact_icon"
                },
                onClick: function () {
                    alloy.desktopContact.showSelectBuddyBox();
                    qqweb.util.report2qqweb("add|contextmenu|adddeskcontanct")
                }
            }]
        }, {
            text: "\u4e0a\u4f20\u6587\u4ef6",
            type: "flash",
            icon: {
                className: "add_file_icon"
            },
            onClick: function () {}
        }, {
            text: "\u65b0\u5efa\u6587\u4ef6\u5939",
            icon: {
                className: "add_folder_icon"
            },
            onClick: function () {
                alloy.desktopFolder.createFolder();
                qqweb.util.report2qqweb("add|contextmenu|createfolder")
            }
        }, {
            text: "\u7c98\u8d34",
            onClick: function () {
                var a = alloy.clipBoard.getData();
                if (a) {
                    var b = a.data,
                        c = alloy.desktopManager.getCurrentDesktopIndex();
                    a.pasteType == alloy.clipBoard.PASTE_TYPE.COPY ? alloy.fileSystem.copyFile(b, c) :
                        alloy.fileSystem.moveFile(b, c, null, null, null, !0)
                }
                alloy.clipBoard.clear()
            }
        }, {
            type: "separator"
        }, {
            text: "QQ\u4e91\u8bcd\u5178",
            onClick: function () {
                qqweb.portal.runApp("qqWebDict");
                qqweb.rpcService.reportQstatic("contextmenu|desktop|clouddic")
            }
        }, {
            type: "separator"
        }, {
            text: "\u4e3b\u9898\u8bbe\u7f6e",
            onClick: function () {
                qqweb.portal.runApp("themeSetting");
                qqweb.rpcService.reportQstatic("contextmenu|desktop|theme")
            }
        }, {
            text: "\u7cfb\u7edf\u8bbe\u7f6e",
            onClick: function () {
                qqweb.portal.runApp("settingCenter");
                qqweb.rpcService.reportQstatic("contextmenu|desktop|config")
            }
        }, {
            text: "\u56fe\u6807\u8bbe\u7f6e",
            type: "submenu",
            beforeShow: function (a) {
                alloy.desktopManager.getDesktopIconStyle() ? (a.getItemAt(0).setIcon({
                    className: "desktop_icon_style_checked"
                }), a.getItemAt(1).setIcon()) : (a.getItemAt(0).setIcon(), a.getItemAt(1).setIcon({
                    className: "desktop_icon_style_checked"
                }))
            },
            items: [{
                text: "\u5c0f\u56fe\u6807",
                onClick: function () {
                    alloy.desktopManager.getDesktopIconStyle() != 1 && (alloy.desktopManager.setDesktopIconStyle(1, !0), qqweb.util.report2qqweb("iconchange|right|icon|small"))
                }
            }, {
                text: "\u5927\u56fe\u6807",
                onClick: function () {
                    alloy.desktopManager.getDesktopIconStyle() != 0 && (alloy.desktopManager.setDesktopIconStyle(0, !0), qqweb.util.report2qqweb("iconchange|right|icon|big"))
                }
            }]
        }, {
            type: "separator"
        }, {
            text: "\u53cd\u9988",
            onClick: function () {
                window.open("http://support.qq.com/discuss/513_1.shtml")
            }
        }, {
            text: "\u6ce8\u9500",
            onClick: function () {
                qqweb.portal.exit();
                e.notifyObservers(qqweb.portal, "Exit");
                qqweb.rpcService.reportQstatic("contextmenu|desktop|quit")
            }
        }],
        H = {
            layout_showdesktop: function () {
                qqweb.layout.showDesktop();
                alloy.util.report2qqweb("hotkey|showdesk")
            },
            layout_lock: function () {
                qqweb.portal.getLoginLevel() > qqweb.CONST.LOGIN_LEVEL_NONE && (qqweb.portal.runApp("screenLocker"), alloy.util.report2qqweb("hotkey|lock"))
            },
            layout_exit: function () {
                qqweb.portal.getLoginLevel() > qqweb.CONST.LOGIN_LEVEL_NONE && (alloy.util.report2qqweb("hotkey|signout"), qqweb.portal.exit(), e.notifyObservers(qqweb.portal, "Exit"))
            },
            layout_window_current_close: function () {
                var a = alloy.windowManager.getCurrentWindow();
                a && a.isShow() && (a.close(), alloy.util.report2qqweb("hotkey|close"))
            },
            layout_window_closeall: function () {
                for (var a = alloy.windowManager.getWindowList(), b, c = a.length - 1; c >= 0; c--) b = a[c], b.windowType == "window" && b.close();
                alloy.util.report2qqweb("hotkey|closeallapp")
            },
            layout_window_goleft: function () {
                U(-1);
                alloy.util.report2qqweb("hotkey|tableft")
            },
            layout_window_goright: function () {
                U(1);
                alloy.util.report2qqweb("hotkey|tabright")
            },
            eqq_chatbox_classall: function () {
                for (var a = alloy.windowManager.getWindowList(), b, c = a.length - 1; c >= 0; c--) b = a[c], b.windowType == "chatbox" && b.close();
                alloy.util.report2qqweb("hotkey|closeallchat")
            },
            eqq_chatbox_read: function () {
                if (qqweb.portal.getLoginLevel() == qqweb.CONST.LOGIN_LEVEL_ALL) {
                    var a = alloy.messageSystem.getLatestMessage();
                    a && (alloy.messageSystem.handleNotification(a.id), alloy.util.report2qqweb("hotkey|getmsg"))
                }
            },
            layout_screencaptrue: function () {
                if (alloy.portal.isWebTop())
                    if (alloy.portal.getLoginLevel() == alloy.CONST.LOGIN_LEVEL_ALL) {
                        var a = alloy.windowManager.getCurrentWindow();
                        a ? alloy.portal.runApp("screenCapture2", {
                            mode: a.mode,
                            uin: a.uin,
                            chatBoxType: a.chatBoxType
                        }) : alloy.portal.runApp("screenCapture2")
                    } else alloy.portal.runApp("screenCapture2");
                    else alloy.portal.runApp("screenCapture")
            },
            layout_desktop_goleft: function () {
                alloy.desktopManager.goPrevDesktop();
                alloy.util.report2qqweb("hotkey|screenleft")
            },
            layout_desktop_goright: function () {
                alloy.desktopManager.goNextDesktop();
                alloy.util.report2qqweb("hotkey|screenright")
            },
            layout_desktop_gospecific: function (a) {
                a = Number(a.keyCode);
                a = a > 96 ? a - 97 : a - 49;
                alloy.desktopManager.setCurrentDesktop(a);
                alloy.util.report2qqweb("hotkey|screen" + a)
            },
            layout_desktop_gosystem: function (a) {
                alloy.portal.switchToDesktop();
                a = Number(a.keyCode);
                a == 48 || a == 96 ? alloy.util.report2qqweb("hotkey|0systemdesk") : a == 113 ? alloy.util.report2qqweb("hotkey|f2systemdesk") : a == 192 ? alloy.util.report2qqweb("hotkey|wavesystemdesk") : alloy.util.report2qqweb("hotkey|othersystemdesk")
            },
            layout_desktop_manage: function () {
                alloy.appManager.tooglePanel()
            },
            open_msg_manager: function () {
                alloy.portal.runApp("messageManager")
            }
        }, Q = {};
    this.Panel = a.ui.Panel;
    this.PopupBox = a.ui.PopupBox;
    var J = {
        stopPropagation: function (a) {
            a.stopPropagation()
        },
        onClickDesktop: function (a) {
            var b;
            a.target.tagName === "A" && (b = a.target.getAttribute("href")) && (b === "###" || b === "#") && a.preventDefault();
            w = !0;
            e.notifyObservers(qqweb.layout, "clickDesktop")
        },
        onFocusDesktop: function () {
            w = !0;
            e.notifyObservers(alloy.layout, "desktopFocus")
        },
        onBlurDesktop: function () {
            w = !1;
            e.notifyObservers(alloy.layout, "desktopBlur")
        },
        onKeydownDesktop: function (a) {
            e.notifyObservers(alloy.layout, "desktopKeydown", a)
        },
        onKeyupDesktop: function (a) {
            e.notifyObservers(alloy.layout, "desktopKeyup", a)
        },
        onWindowResize: function () {
            var d = b.getClientWidth(),
                f = b.getClientHeight();
            a.browser.ie == 6 && (d = d % 2 + d, f = f % 2 + f);
            if (q == d && D == f) a.out("resize nothing");
            else {
                d = b.getClientWidth();
                f = b.getClientHeight();
                a.browser.ie == 6 && (d = d % 2 + d, f = f % 2 + f);
                q = d;
                D = f;
                var g = !1;
                d >= x ? (b.setStyle(j, "overflowX", "hidden"), b.setStyle(v, "width", ""), c = d) : (g = !0, b.setStyle(j, "overflowX", "auto"), b.setStyle(v, "width", x + "px"), c = x);
                f >= z ? (b.setStyle(j, "overflowY", "hidden"), b.setStyle(v, "height", ""), h = f) : (g = !0, b.setStyle(j, "overflowY", "auto"), b.setStyle(v, "height", z + "px"), h = z);
                g ? b.setStyle(v, "position",
                    "absolute") : b.setStyle(v, "position", "static");
                b.setStyle(l, "height", h + "px");
                p && (b.setStyle(p, "width", c + "px"), b.setStyle(p, "height", h + "px"));
                e.notifyObservers(alloy.layout, "desktopResize")
            }
        },
        onDesktopContextmenu: function (a) {
            if (b.hasClass(a.target, "zoomWallpaper") || b.hasClass(a.target, "desktopContainer") || b.hasClass(a.target, "appListContainer")) {
                a.preventDefault();
                var c;
                alloy.portal.getLoginLevel() == alloy.CONST.LOGIN_LEVEL_NONE ? (c = F.concat(), c.splice(5, 2)) : c = F;
                alloy.layout.showContextMenu({
                    x: a.clientX,
                    y: a.clientY
                }, {
                    beforeShow: V,
                    items: c
                });
                qqweb.rpcService.reportQstatic("contextmenu|desktop")
            }
        }
    }, I = function () {
            Q = {};
            if (window.webTop) alloy.hotkeyManager.getHotkeyInfo("layout_desktop_gosystem").disable = !1;
            for (var a in H) {
                var b = H[a],
                    c = alloy.hotkeyManager.getHotkeyInfo(a);
                if (!c.disable)
                    for (var d in c.keys) {
                        var e = c.keys[d];
                        Q["" + (e.ctrlKey ? 1 : 0) + (e.shiftKey ? 1 : 0) + (e.altKey ? 1 : 0) + "_" + e.keyCode] = {
                            keyId: a,
                            action: b
                        }
                    }
            }
        };
    this.removeHotKeyAction = function (a) {
        H[a] = null;
        delete H[a];
        I()
    };
    this.getIsFocusOnDesktop = function () {
        return w
    };
    var M = function () {
        alloy.iconFactory.init()
    }, K = function (a) {
            if (alloy.hotkeyManager.isHotkeyEnable()) {
                var b = "" + (a.ctrlKey ? 1 : 0) + (a.shiftKey ? 1 : 0) + (a.altKey ? 1 : 0) + "_" + a.keyCode;
                if (Q[b]) {
                    var c = alloy.hotkeyManager.getHotkeyInfo(Q[b].keyId);
                    !c.disable && (!alloy.hotkeyManager.isHotkeyLimited() || !c.limit) && Q[b].action(a)
                }
            }
        }, U = function (a) {
            var b = alloy.windowManager.getOnlyWindowList(),
                c = alloy.windowManager.getCurrentWindow(),
                d;
            if (c)
                for (var e = 0, f = b.length; e < f; e++) {
                    if (d = b[e], c == d) {
                        c = e;
                        (d = b[c += a]) ? d.setCurrent() : c <
                            0 ? (d = b[b.length - 1], d.setCurrent()) : c >= b.length && (d = b[0], d.setCurrent());
                        break
                    }
                } else b.length > 0 && b[b.length - 1].setCurrent()
        }, O = new a.fx.Animation({
            element: p,
            property: "opacity",
            from: 1,
            to: 0,
            unit: !1,
            duration: 1E3,
            fps: 30,
            transition: g.sinusoidal.easeOut
        });
    e.addObserver(O, "end", function () {
        b.hide(p)
    });
    var G = new a.fx.Animation({
        element: v,
        property: "opacity",
        from: 1,
        to: 0,
        unit: !1,
        duration: 1E3,
        fps: 30,
        transition: g.sinusoidal.easeOut
    });
    e.addObserver(G, "end", function () {
        b.hide(v)
    });
    var V = function (a) {
        if (alloy.portal.getLoginLevel() !=
            alloy.CONST.LOGIN_LEVEL_NONE) {
            var b = alloy.clipBoard.getData(),
                c = alloy.clipBoard.CLIP_BOARD_TYPE;
            b && (b.type == c.FILE || b.type == c.FOLDER) ? a.getItemAt(6).enable() : a.getItemAt(6).disable()
        }
    }, N = function () {
            a.profile("DesktopCreate");
            var c = b.id("desktopWrapper"),
                h = b.id("topBar"),
                g = b.id("bottomBar"),
                n = b.id("rightBar"),
                k = b.id("leftBar");
            f.topArea = h;
            f.bottomArea = g;
            f.mainArea = c;
            f.leftArea = k;
            f.rightArea = n;
            if (a.browser.mobileSafari) c = b.id("touchpad"), b.show(c), c.src = qqweb.CONST.MAIN_URL + "./touchpad.html?20101021001",
            e.on(l, "touchmove", function (a) {
                a.touches && a.touches.length == 1 && a.preventDefault()
            }, !0);
            c = y.createPanel({
                id: "desktop",
                name: "desktop",
                container: d.getBody(),
                body: v,
                html: ""
            });
            e.on(v, "contextmenu", J.onDesktopContextmenu);
            e.on(window, "resize", J.onWindowResize);
            if (a.browser.mobileSafari) e.on(window, "orientationchange", J.onWindowResize);
            e.on(v, "click", J.onClickDesktop);
            e.on(document, "keydown", J.onKeydownDesktop);
            e.on(document, "keyup", J.onKeyupDesktop);
            "onfocusin" in document ? (e.on(document, "focusin", J.onFocusDesktop),
                e.on(document, "focusout", J.onBlurDesktop)) : (e.on(window, "focus", J.onFocusDesktop), e.on(window, "blur", J.onBlurDesktop));
            a.profile("DesktopCreateFinish");
            return c
        }, E = a.Class({
            init: function () {
                this.panelList = []
            },
            createPanel: function (b) {
                var b = b || {}, c = new a.ui.Panel(b);
                this.panelList[b.id] = c;
                a.out("createPanel:" + b.name, "layout");
                return c
            },
            getPanel: function (a) {
                return this.panelList[a]
            }
        }),
        L = function () {
            var b = function (a) {
                a = a || window.event;
                a = a.data.split("=");
                a[0] == "pt_size" && (a = a[1].split("-"), a = parseInt(a &&
                    a[1]), alloy.layout.setLoginWindowHeight(a + 66))
            };
            a.isUndefined(window.postMessage) || (window.addEventListener ? window.addEventListener("message", b, !1) : window.attachEvent && window.attachEvent("onmessage", b))
        };
    this.init = function () {
        a.browser.mobileSafari ? (x = 680, z = 640) : (x = 320, z = 100);
        y = this.panelManager = new E;
        N();
        alloy.windowFactory.init();
        alloy.windowManager.init();
        alloy.desktopManager.init({
            initializeLength: 5
        });
        if (a.browser.firefox) setTimeout(J.onWindowResize, 100);
        else J.onWindowResize();
        e.addObserver(qqweb.portal,
            "AlloyJsReady", M);
        e.addObserver(alloy.layout, "desktopKeyup", K);
        alloy.dock.init({
            dragController: alloy.desktopManager.getDragController()
        });
        alloy.taskBar.init();
        I();
        L()
    };
    this.getArea = function (a) {
        return f[a + "Area"]
    };
    this.getAreaWidth = function (a) {
        return (a = f[a + "Area"]) ? b.getWidth(a) : 0
    };
    this.getAreaHeight = function (a) {
        return a === "bottom" ? 30 : (a = f[a + "Area"]) ? b.getHeight(a) : 0
    };
    this.getAvailableWidth = function () {
        return this.getDesktopWidth() - this.getAreaWidth("left") - this.getAreaWidth("right")
    };
    this.getAvailableHeight =
        function () {
            return this.getDesktopHeight() - this.getAreaHeight("top") - this.getAreaHeight("bottom")
    };
    this.setDesktopWidth = function (a) {
        return c = a
    };
    this.setDesktopHeight = function (a) {
        return h = a
    };
    this.getDesktopWidth = function () {
        return c
    };
    this.getDesktopHeight = function () {
        return h
    };
    this.getDesktopSize = function () {
        return {
            width: c,
            height: h
        }
    };
    this.getAvailSize = function () {
        return {
            width: this.getAvailableWidth(),
            height: this.getAvailableHeight()
        }
    };
    this.getClientWidth = function () {
        return q = q || b.getClientWidth()
    };
    this.getClientHeight =
        function () {
            return D = D || b.getClientHeight()
    };
    this.getClientSize = function () {
        return {
            width: d.getClientWidth(),
            height: d.getClientHeight()
        }
    };
    this.getDesktop = function () {
        return y.getPanel("desktop")
    };
    this.getBody = function () {
        return l
    };
    this.getMaskLayer = function (b) {
        return b ? (b = new a.ui.MaskLayer({
            appendTo: this.getDesktop().body,
            zIndex: 1,
            opacity: 0.5
        }), b.reset(), b) : (r || (r = new a.ui.MaskLayer({
            appendTo: this.getDesktop().body,
            zIndex: 1,
            opacity: 0.5
        })), r.reset(), r)
    };
    this.getPanel = function (a) {
        return y.getPanel(a)
    };
    this.getTopZIndex = function (b) {
        if (a.isUndefined(b) || !k[b]) b = 0;
        return k[b]++
    };
    this.getThemeManager = function () {};
    this.showDesktop = function () {
        for (var a = [], b, c = alloy.windowManager.getCurrentWindow(), d = alloy.windowManager.getWindowList(), e = 0; e < d.length; e++) b = d[e], b.windowType !== "widget" && b.isShow && b.isShow() && (b.min(), a.push(b));
        if (a.length > 0) u = a, n = c;
        else {
            n && !n.isDestroy && n.setCurrent();
            for (e = 0; e < u.length; e++) u[e].show()
        }
    };
    this.setTitle = function (a, b) {
        b.roll = b.roll || !1;
        b.speed = b.speed || 500;
        if (b.roll) {
            if (!(a.length <
                1)) o = document.title, s && clearInterval(s), s = setInterval(function () {
                document.title = a;
                a = a.substr(1) + a.charAt(0)
            }, b.speed)
        } else o = document.title, document.title = a
    };
    this.resetTitle = function () {
        s && (clearInterval(s), s = null);
        document.title = o
    };
    this.setIe9IconOverLay = function (a) {
        var b = alloy.CONST.DOMAIN,
            c = ["overlay1", "overlay2", "overlay3", "overlay4", "overlay5", "overlay6", "overlay7", "overlay8", "overlay9", "overlay10"];
        if (a == 0) try {
            window.external.msSiteModeClearIconOverlay()
        } catch (d) {} else if (a < 10) try {
            window.external.msSiteModeSetIconOverlay("http://" +
                b + "/" + c[a - 1] + ".ico", "overlay " + a), window.external.msSiteModeActivate()
        } catch (e) {} else if (a >= 10) try {
            window.external.msSiteModeSetIconOverlay("http://" + b + "/" + c[9] + ".ico", "overlay 10"), window.external.msSiteModeActivate()
        } catch (f) {}
    };
    this.messagebox = function (a, b) {
        b = b || {};
        b.innerHtml = a;
        b.appendTo = b.appendTo || alloy.desktopManager.getCurrentDesktop().getElement();
        return (new alloy.businessClass.MessageBox(b)).Window
    };
    this.alert = function (a, b, c, d) {
        c = c || {};
        c.onAccept = b;
        c.onClose = d;
        c.innerHtml = a;
        c.appendTo =
            c.appendTo || alloy.desktopManager.getCurrentDesktop().getElement();
        return (new alloy.businessClass.MessageBox.Alert(c)).Window
    };
    this.confirm = function (a, b, c) {
        c = c || {};
        c.onAccept = b;
        c.innerHtml = a;
        c.appendTo = c.appendTo || alloy.desktopManager.getCurrentDesktop().getElement();
        return (new alloy.businessClass.MessageBox.Confirm(c)).Window
    };
    this.createBubble = function (b) {
        b = b || {};
        b.bubbleParent = b.bubbleParent || qqweb.layout.getDesktop().body;
        b.zIndex = b.zIndex || qqweb.layout.getTopZIndex(4);
        return new a.ui.Bubble(b)
    };
    this.getBubble = function () {
        A || (A = this.createBubble());
        return A
    };
    this.showContextMenu = function (b, c) {
        t || (t = new a.ui.ContextMenu({
            container: alloy.layout.getDesktop().body
        }));
        t.setZIndex(alloy.layout.getTopZIndex(3));
        t.setStyle("width", c.width ? c.width + "px" : "140px");
        t.clearItems();
        t.addItems(c.items);
        t.setArgument(c.argument);
        c.beforeShow && c.beforeShow.call(t, t);
        t.show(b.x, b.y, b.offset);
        c.afterShow && c.afterShow.call(t, t);
        return t
    };
    this.hideLoginWindow = function () {
        var a;
        if (a = b.id("ifram_login")) a.src = alloy.CONST.MAIN_URL +
            "domain.html";
        try {
            m.close(), m = null
        } catch (c) {}
    };
    this.showLoginBox = this.showLoginWindow = function (b, c, e, f) {
        b = {
            width: 380,
            height: 390,
            title: "\u767b\u5f55Q+ Web",
            hasCloseButton: !0,
            isSetCurrent: !0,
            isSetCentered: !0,
            dragable: !0,
            src: "",
            modal: !0,
            zIndex: d.getTopZIndex(3),
            appendTo: d.getDesktop().body,
            onClose: function () {
                m = null
            }
        };
        alloy.portal.setTryLoginType(c);
        e = e || "online";
        alloy.portal.setTryLoginState(e);
        e = alloy.util.state2code(e);
        alloy.portal.setWithPtwebqqLogin( !! alloy.portal.getPtwebqq());
        var h = encodeURIComponent(window.location.protocol +
            "//" + window.location.host + "/loginproxy.html"),
            g = "",
            f = f || "",
            g = "";
        if (f) c ? (d.loginWindowInfoHeight = !1, g = '<div id="login_window_info" class ="login_window_info login_window_info2">' + f + "</div>") : (d.loginWindowInfoHeight = !0, g = '<div id="login_window_info" class ="login_window_info">' + f + "</div>");
        c ? (b.src = "https://ui.ptlogin2.qq.com/cgi-bin/login?daid=" + B + "&target=self&style=5&mibao_css=m_webqq&appid=1003903&enable_qlogin=0&no_verifyimg=1&s_url=" + h + "&f_url=loginerroralert&strong_login=1&login_state=" + e + "&t=" +
            alloy.CONST.UPDATE_TIME_STAMP, g = '            <div id="login_window_content_area" class="login_content_area"><div class="login_logo_qq"></div>' + g + '<div class="login_window_wrap">            <iframe id="ifram_login"  src="' + b.src + '" scrolling="no" frameborder="no" allowtransparency="true" scrolling="hidden" hidefocus ></iframe>                    </div></div>') : (b.src = "https://ui.ptlogin2.qq.com/cgi-bin/login?daid=" + B + "&target=self&style=5&mibao_css=m_webqq&appid=1003903&enable_qlogin=0&no_verifyimg=1&s_url=" +
            h + "&f_url=loginerroralert&strong_login=0&login_state=" + e + "&t=" + alloy.CONST.UPDATE_TIME_STAMP, g = '<div id="login_window_content_area" class="login_content_area"><div class="login_logo_webqq"></div>' + g + '<div class="login_window_wrap">            <iframe id="ifram_login"  src="' + b.src + '" scrolling="no" frameborder="no" allowtransparency="true" scrolling="hidden" hidefocus ></iframe>                    </div></div>');
        m = new a.ui.Boxy(b);
        m.getPanel().setHtml(g);
        return m
    };
    this.setLoginWindowHeight = function (c) {
        d.loginWindowInfoHeight &&
            (c += 18);
        m.getPanel().setHeight(c);
        if (a.browser.ie && a.browser.ie < 7) {
            var e = b.id("login_window_content_area");
            b.setStyle(e, "height", c + "px")
        }
    };
    this.hideStartingCover = function () {
        a.browser.ie == 6 ? setTimeout(function () {
            b.hide(p)
        }, 500) : O.start();
        window.webTop && webTop.ui.channel.postCmd(23)
    };
    this.hideDesktop = function () {
        G.start()
    };
    this.showWebTopInstallBox = function () {
        if (a.platform.win) window.open("http://dl_dir.qq.com/qqfile/web/webqq/WebQQ_1.2.46.400.exe", "_blank");
        else {
            var c = alloy.CONST.CDN_URL + "swf/webtopInstall.swf?t=" +
                alloy.CONST.UPDATE_TIME_STAMP,
                d = alloy.layout.messagebox('<div class="airInstallPopup">        <div class="airInstallPopupContent">            <object id="webtopInstallFlash" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="385" height="164" align="middle">                <param name="movie" value="' + c + '" />                <param name="quality" value="high" />                <param name="bgcolor" value="#ffffff" />                <param name="play" value="true" />                <param name="loop" value="true" />                <param name="wmode" value="window" />                <param name="scale" value="showall" />                <param name="menu" value="true" />                <param name="devicefont" value="false" />                <param name="salign" value="" />                <param name="allowScriptAccess" value="always" />                <param name="flashvars" value="oninstall=alloy.layout.onAirInstallSuccess&onruntimeready=alloy.layout.onRuntimeReady&version=1.1.30&url=http://dl_dir.qq.com/qqfile/web/webqq/WebQQ.air" />                <embed src="' +
                    c + '" FlashVars="oninstall=alloy.layout.onAirInstallSuccess&onruntimeready=alloy.layout.onRuntimeReady&version=1.1.30&url=http://dl_dir.qq.com/qqfile/web/webqq/WebQQ.air"                     quality="high" wmode="transparent" bgcolor="#ffffff" width="385" height="164" name="main" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer_cn" />            </object>        </div>        <div id="airInstallTip">            <span class="mytip">\u201c\u5ba2\u6237\u7aef\u201d\u652f\u6301Windows\u3001Mac\u3001Linux\u7b49\u7cfb\u7edf\u3002</span>            <div class="mytip2">\u5982\u679c\u5728\u7ebf\u5b89\u88c5\u5931\u8d25\uff0c\u60a8\u4e5f\u53ef\u4ee5\u624b\u52a8\u4e0b\u8f7d\u5b89\u88c5\uff0c\u6b65\u9aa4\u5982\u4e0b\uff1a</div>            <ol class="mylinks">                <li id="airDownloadLinkArea" class="link">                <a href="http://dl_dir.qq.com/qqfile/web/webqq/win/AdobeAIRInstaller.exe" target="_blank"  class="webtop_down_link_win">\u4e0b\u8f7dAdobe Air\u73af\u5883</a>                <a href="http://dl_dir.qq.com/qqfile/web/webqq/mac/AdobeAIR.dmg" target="_blank" class="webtop_down_link_mac">\u4e0b\u8f7dAdobe Air\u73af\u5883</a>                <select id="airDownloadSelect" class="webtop_down_link_linux" >                    <option value="">\u4e0b\u8f7dAdobe Air\u73af\u5883</option>                    <option value="http://dl_dir.qq.com/qqfile/web/webqq/lin/AdobeAIRInstaller.bin">Adobe AIR for Linux(.bin)</option>                    <option value="http://dl_dir.qq.com/qqfile/web/webqq/lin/adobeair.i386.rpm">Adobe AIR for Linux(.rpm)</option>                    <option value="http://dl_dir.qq.com/qqfile/web/webqq/lin/adobeair.deb">Adobe AIR for Linux(.deb)</option>                </select>                <span>\uff08\u82e5\u5df2\u5b89\u88c5\u53ef\u8df3\u8fc7\u6b64\u6b65\uff09</span>                </li>                <li id="airDownloadLinkArea2" class="link2">                    <a href="http://dl_dir.qq.com/qqfile/web/webqq/WebQQ.air" target="_blank">\u4e0b\u8f7dQ+ Web\u5ba2\u6237\u7aef</a></li>            </ol>        </div>        <div id="airCloseTip">            <div class="closeText">\u60a8\u73b0\u5728\u53ef\u4ee5\u5173\u95ed\u5f53\u524d\u6d4f\u89c8\u5668\u7a97\u53e3\uff0c\u4f7f\u7528"\u5ba2\u6237\u7aef"\u3002</div>            <a href="###" class="myBtn" id="airInstalledSureBtn">\u786e\u5b9a</a>        </div>    </div>', {
                        title: "\u201c\u5ba2\u6237\u7aef\u201d\u4e0b\u8f7d",
                        width: 385,
                        height: 268
                    }),
                f = b.id("airInstalledSureBtn");
            e.on(f, "click", function (a) {
                a.preventDefault();
                e.off(f, "click");
                d.close()
            });
            c = b.id("airDownloadLinkArea");
            e.on(c, "click", function (a) {
                var b = a.target.href;
                if (b) return a.preventDefault(), window.open(b, "_blank"), !1
            });
            a.platform.linux && (c = b.id("airDownloadSelect"), e.on(c, "change", function () {
                var a = this.options[this.selectedIndex];
                a.value && window.open(a.value, "_blank")
            }))
        }
    };
    this.onAirInstallSuccess = function () {
        var a =
            b.id("airInstallTip"),
            c = b.id("airCloseTip");
        a && c && (b.hide(a), b.show(c))
    };
    this.onRuntimeReady = function () {
        var a = b.id("airDownloadLinkArea");
        a && b.hide(a)
    }
});
Jx().$package("alloy.dock", function (a) {
    var d = this,
        b = a.dom,
        e = a.event,
        g, j, l, p, o, s, v, w, t, r, m = 0,
        f = {}, k = {}, q, D, c, h = function (a, b) {
            y.onDockMenuItemClick(a, b)
        }, A = [{
            text: "\u5411\u5de6\u505c\u9760",
            icon: {
                className: "dock_menu_item_left"
            },
            argument: {
                location: "left"
            },
            onClick: h
        }, {
            text: "\u5411\u4e0a\u505c\u9760",
            icon: {
                className: "dock_menu_item_top"
            },
            argument: {
                location: "top"
            },
            onClick: h
        }, {
            text: "\u5411\u53f3\u505c\u9760",
            icon: {
                className: "dock_menu_item_right"
            },
            argument: {
                location: "right"
            },
            onClick: h
        }],
        x = function () {
            var a =
                alloy.portal.getSystemConfig("appMarket");
            c = alloy.iconFactory.createIcon("app", {
                className: "appMarket",
                longTouchable: !1,
                deleteable: !1,
                icon: {
                    url: alloy.CONST.CDN_URL + "style/images/appmarket.png?20111011001"
                },
                contextMenu: [{
                    text: "\u6253\u5f00\u5e94\u7528\u5e02\u573a",
                    onClick: function () {
                        alloy.portal.runApp("appMarket")
                    }
                }, {
                    type: "separator"
                }, {
                    text: "\u5378\u8f7d",
                    enable: !1
                }],
                onClick: function () {
                    if (c.isNotifyShow()) {
                        alloy.portal.runApp("appMarket", {
                            page: "all",
                            option: {
                                cat: -1,
                                orderBy: 2
                            }
                        });
                        if (alloy.portal.getLoginLevel() >
                            1) {
                            var a = {
                                context: this,
                                action: "reset",
                                data: {
                                    appid: 1E6,
                                    value: {
                                        appReadTime: (new Date).getTime()
                                    }
                                }
                            };
                            alloy.rpcService.sendSetConfigNew(a)
                        }
                        alloy.util.report2qqweb("screen|appmarket|new")
                    } else alloy.portal.runApp("appMarket"), alloy.util.report2qqweb("screen|appmarket");
                    c.hideNotify();
                    return !1
                }
            }, a);
            o.parentNode.insertBefore(c.getElement(), o);
            b.hide(c.getElement())
        }, z = function () {
            var a = alloy.portal.getSystemConfig("diskExplorer");
            D = alloy.iconFactory.createIcon("app", {
                className: "diskExplorer",
                longTouchable: !1,
                deleteable: !1,
                icon: {
                    url: alloy.CONST.CDN_URL + "style/images/diskexplorer.png?20111011001"
                },
                contextMenu: [{
                    text: "\u6253\u5f00\u6211\u7684\u7f51\u76d8",
                    onClick: function () {
                        alloy.system.getLoginLevel() > 1 ? alloy.system.runApp("diskExplorer") : alloy.layout.showLoginWindow("diskExplorer")
                    }
                }, {
                    type: "separator"
                }, {
                    text: "\u5378\u8f7d",
                    enable: !1
                }],
                onClick: function () {
                    alloy.system.getLoginLevel() > 1 ? alloy.system.runApp("diskExplorer") : alloy.layout.showLoginWindow("diskExplorer");
                    return !1
                }
            }, a);
            o.parentNode.insertBefore(D.getElement(),
                o);
            b.hide(D.getElement())
        }, y = {
            onQuickListContainerDragMove: function () {},
            onAlloyJsReady: function () {
                x();
                z();
                e.addObserver(alloy.sound, "SoundMuteChange", y.onSoundSettingChange)
            },
            onPortalReady: function () {
                b.show(c.getElement());
                b.show(D.getElement());
                alloy.portal.getLoginLevel() > alloy.CONST.LOGIN_LEVEL_NONE && alloy.rpcService.sendGetNewAppCount()
            },
            onGetNewAppCountSuccess: function (a) {
                var b = c;
                b && (a.result.allcount == 0 ? b.hideNotify() : b.showNotify(a.result.allcount), a.appReadTime && (q = a.appReadTime || (new Date).getTime()))
            },
            onDockContextMenu: function (a) {
                a.preventDefault();
                a.stopPropagation();
                alloy.layout.showContextMenu({
                    x: a.clientX,
                    y: a.clientY
                }, {
                    items: A,
                    beforeShow: function () {
                        this.setClass("dock_menu_select_" + t)
                    }
                })
            },
            onDockMenuItemClick: function (a, b) {
                var c = b.option.argument.location;
                d.setDockLocation(c, !0);
                alloy.util.report2qqweb("contextmenu|desktop|dock|" + c)
            },
            onQuickListContainerDrop: function (a) {
                var c = a.apperceiveEl,
                    d = c.getAttribute("type"),
                    e = a.pos,
                    f = b.getXY(o),
                    a = parseInt(c.getAttribute("fileId"));
                if (!isNaN(a)) {
                    e = t ==
                        "top" ? Math.ceil((e.x - f[0] - 29) / 58) : Math.ceil((e.y - f[1] - 29) / 58);
                    e < 0 ? e = 0 : e > 5 && (e = 5);
                    d = {
                        t: d,
                        id: a
                    };
                    c.getAttribute("from");
                    var h;
                    (h = alloy.fileSystem.getFileInfoByFile(d)) && alloy.fileSystem.moveFile(h.file, 5, e, h.parent.id, h.position, !0)
                }
            },
            onDesktopSwitchStatus: function (a) {
                a.status === alloy.desktopManager.DESK_STATUS.EDIT ? b.addClass(g.children[0], "appButtonEditState") : b.removeClass(g.children[0], "appButtonEditState")
            },
            onUACReady: function () {
                var a = alloy.config.configList.dockLoca || "left";
                t !== a && d.setDockLocation(a)
            },
            onDockDragStart: function () {
                b.show(l);
                b.show(p);
                b.show(j.top);
                b.show(j.left);
                b.show(j.right);
                u();
                alloy.util.report2qqweb("dockpositon|drag")
            },
            onDockDragEnd: function () {
                b.hide(l);
                b.hide(p);
                b.hide(j.top);
                b.hide(j.left);
                b.hide(j.right);
                w !== t && (setTimeout(function () {
                    d.setDockLocation(w, !0)
                }, 0), alloy.util.report2qqweb("dockpositon|dragto" + w))
            },
            onDockDragMove: function (a) {
                var b = a.orientEvent.pageX,
                    a = a.orientEvent.pageY,
                    c = alloy.layout.getClientWidth(),
                    d = alloy.layout.getClientHeight(),
                    b = a < d * 0.2 ? "top" : b < c / 2 ?
                        "left" : "right";
                b !== w && u(b)
            },
            onFileAdd: function () {},
            onFileMove: function (a) {
                if (a.targetId == 5)
                    if (a.sourceId == 5) {
                        var b = k[alloy.iconFactory.getIconId(a.file.t, a.file.id)],
                            c = a.targetPosition;
                        a.targetPosition > a.sourcePosition && c++;
                        B(b, c)
                    } else n(a.file, a.targetPosition);
                    else a.sourceId == 5 && F(a.file)
            },
            onFileDelete: function (a) {
                a.parent.id == 5 && F(a.file)
            },
            onClearDefaultApp: function () {
                H()
            },
            onGetAppConfigError: function () {
                H();
                alloy.appconfig.getAllConfig(50) && n({
                    id: 50,
                    t: "app"
                })
            },
            onGetAppConfigComplete: function () {
                a.profile("DockButton Create");
                var b = alloy.fileSystem.getFolderById(5).items;
                H();
                for (var c = 0; c < b.length && c < 5; c++) n(b[c]);
                a.profile("DockButton CreateFinish")
            },
            onPinyinClick: function () {
                alloy.portal.runApp("qqWebIme")
            },
            onSettingClick: function () {
                alloy.portal.runApp("settingCenter")
            },
            onThemeClick: function () {
                alloy.portal.runApp("themeSetting")
            },
            onSoundClick: function () {
                alloy.sound.isMute() ? alloy.sound.setMute(!1) : alloy.sound.setMute(!0)
            },
            stopPropagation: function (a) {
                a.stopPropagation()
            },
            onStartClick: function (a) {
                a.preventDefault();
                alloy.startMenu.toggleStartMenu(a.target)
            },
            onSoundSettingChange: function (a) {
                a ? (b.addClass(f.sound, "dock_tool_sound_mute"), f.sound.title = "\u53d6\u6d88\u9759\u97f3") : (b.removeClass(f.sound, "dock_tool_sound_mute"), f.sound.title = "\u9759\u97f3")
            },
            onToolListClick: function (a) {
                var b = qqweb.util.getActionTarget(a);
                if (b) {
                    var c = b.getAttribute("cmd");
                    c && y["on" + c + "Click"] && (a.preventDefault(), y["on" + c + "Click"](b))
                }
            },
            onStorageSpaceChanged: function () {
                var a = alloy.util.formatFileSize(alloy.storage.getTotalUsedSpace()),
                    b = alloy.util.formatFileSize(alloy.storage.getTotalSpace());
                D.setTitle("\u6211\u7684\u7f51\u76d8 " + a + "/" + b)
            }
        }, u = function (a) {
            w = a || t;
            b.setClass(j.top, "dock_drap_effect dock_drap_effect_top");
            b.setClass(j.left, "dock_drap_effect dock_drap_effect_left");
            b.setClass(j.right, "dock_drap_effect dock_drap_effect_right");
            b.setClass(j[w], "dock_drap_effect dock_drap_effect_" + w + " dock_drap_effect_current")
        };
    this.setDockLocation = function (a, c, d) {
        if ("left right top".indexOf(a) != -1) {
            var f = t;
            w = t = a;
            var h = alloy.layout.getArea(a);
            h.appendChild(g);
            v && (b.setStyle(v, "width", "0px"),
                b.setStyle(v, "height", "0px"));
            v = h;
            a == "left" || a == "right" ? (b.setStyle(h, "width", "73px"), b.setStyle(h, "height", "100%")) : (b.setStyle(h, "width", "100%"), b.setStyle(h, "height", "73px"));
            b.setClass(g, "dock_container dock_pos_" + a);
            if (c) {
                if (alloy.portal.getLoginLevel() > alloy.CONST.LOGIN_LEVEL_NONE) alloy.config.configList.dockLoca = a, d ? alloy.rpcService.sendMSetConfigDelay({
                    data: {
                        0: {
                            dockLoca: a
                        }
                    },
                    delay: d
                }) : alloy.rpcService.sendSetConfig({
                    data: {
                        r: {
                            appid: 0,
                            value: {
                                dockLoca: a
                            }
                        }
                    }
                });
                alloy.util.report2qqweb("dockpositon|" +
                    a)
            }
            e.notifyObservers(alloy.dock, "DockLocationChanged", {
                loca: a,
                oldLoca: f
            })
        }
    };
    this.getDockLocation = function () {
        return t
    };
    this.getDockHeight = function () {
        return parseInt(b.getClientHeight(g))
    };
    var n = function (b, c) {
        var d;
        a: {
            d = {
                parentNode: o
            };
            var e = alloy.fileSystem.FILE_TYPE;
            if (b.t == e.APP) {
                e = alloy.appconfig.getAppConfig(b.id);
                if (!e) {
                    a.profile('Dock createFileIcon. id="' + b.id + '" appConfig is null', "Dock");
                    alloy.fileSystem.deleteFile(b, null, null, null, !1);
                    d = null;
                    break a
                }
                d = alloy.iconFactory.createIcon(b.t, d, e)
            } else if (b.t ==
                e.BUDDY || b.t == e.GROUP) d = alloy.iconFactory.createIcon(b.t, d, b);
            else if (b.t == e.FOLDER || b.t == e.FILE) d.file = b, d = alloy.iconFactory.createIcon(b.t, d, b);
            else {
                d = null;
                break a
            }
            d && (k[d.getId()] = d, m++, r.addDragClass(d.getElement()))
        }
        d && B(d, c)
    }, B = function (b, c) {
            var d = b.getElement();
            if (a.isUndefined(c)) o.appendChild(d);
            else {
                var e = o.childNodes;
                e[c] ? o.insertBefore(d, e[c]) : o.appendChild(d)
            }
        }, F = function (a) {
            if (a = k[a.t + "_" + a.id]) k[a.getId()] = null, delete k[a.getId()], m--, a.destroy()
        }, H = function () {
            for (var a in k) {
                var b =
                    k[a];
                k[a] = null;
                delete k[a];
                b.destroy()
            }
            m = 0
        };
    this.isInDock = function (b) {
        return !a.isUndefined(k[b])
    };
    this.getDockItemCount = function () {
        return m
    };
    this.getMaxDockItemCount = function () {
        return 5
    };
    this.getDragController = function () {
        return r
    };
    this.getAppIdList = function () {
        for (var a = [], b = o.children, c = 0, d = b.length; c < d; c++) a.push(parseInt(b[c].getAttribute("appId")));
        return a
    };
    this.setUpdateUacTime = function (a) {
        q = a
    };
    this.getUpdateUacTime = function () {
        return q
    };
    this.init = function (c) {
        k = {};
        m = 0;
        a.profile("Dock Create");
        r = c.dragController;
        g = b.node("div", {
            id: "dockContainer",
            "class": "dock_container"
        });
        g.innerHTML = '            <div class="dock_middle">                <div id="dockItemList" class="dock_item_list"></div>                <div id="dockToolList" class="dock_tool_list">                    <div class="dock_tool_item">                        <a href="###" class="dock_tool_icon dock_tool_pinyin" cmd="Pinyin" title="QQ\u4e91\u8f93\u5165\u6cd5"></a>                        <a href="###" class="dock_tool_icon dock_tool_sound" cmd="Sound" title="\u9759\u97f3"></a>                    </div>                    <div class="dock_tool_item">                        <a href="###" class="dock_tool_icon dock_tool_setting" cmd="Setting" title="\u7cfb\u7edf\u8bbe\u7f6e"></a>                        <a href="###" class="dock_tool_icon dock_tool_theme" cmd="Theme" title="\u4e3b\u9898\u8bbe\u7f6e"></a>                    </div>                    <div class="dock_tool_item2">                        <a href="###" class="dock_tool_icon dock_tool_start" title="\u70b9\u51fb\u8fd9\u91cc\u5f00\u59cb"></a>                    </div>                </div>            </div>        ';
        c = alloy.layout.getDesktop().body;
        c.appendChild(g);
        o = b.id("dockItemList");
        s = b.id("dockToolList");
        f.pinyin = b.mini(".dock_tool_pinyin", s)[0];
        f.sound = b.mini(".dock_tool_sound", s)[0];
        f.setting = b.mini(".dock_tool_setting", s)[0];
        f.theme = b.mini(".dock_tool_theme", s)[0];
        f.start = b.mini(".dock_tool_start", s)[0];
        e.on(s, "click", y.onToolListClick);
        e.on(f.start, "click", y.stopPropagation);
        e.on(f.start, "click", y.onStartClick);
        b.setStyle(g, "zIndex", alloy.layout.getTopZIndex());
        d.setDockLocation("left");
        e.on(g, "contextmenu",
            y.onDockContextMenu);
        o.setAttribute("customAcceptDrop", 1);
        e.addObserver(o, "dragmove", y.onQuickListContainerDragMove);
        e.addObserver(o, "drop", y.onQuickListContainerDrop);
        r.addDropTarget({
            el: o,
            level: 1
        });
        j = {
            top: b.node("div", {
                "class": "dock_drap_effect dock_drap_effect_top"
            }),
            left: b.node("div", {
                "class": "dock_drap_effect dock_drap_effect_left"
            }),
            right: b.node("div", {
                "class": "dock_drap_effect dock_drap_effect_right"
            })
        };
        c.appendChild(j.top);
        c.appendChild(j.left);
        c.appendChild(j.right);
        l = b.node("div", {
            "class": "dock_drap_proxy"
        });
        c.appendChild(l);
        p = b.node("div", {
            "class": "dock_drap_mask"
        });
        p.innerHTML = '<div class="dock_drop_region_top" name="top" cmd="region"></div><div class="dock_drop_region_left" name="left" cmd="region"></div><div class="dock_drop_region_right" name="right" cmd="region"></div>';
        c.appendChild(p);
        c = new a.ui.Drag(g, l);
        e.addObserver(c, "start", y.onDockDragStart);
        e.addObserver(c, "move", y.onDockDragMove);
        e.addObserver(c, "end", y.onDockDragEnd);
        e.addObserver(alloy.rpcService, "SendGetNewAppCountSuccess", y.onGetNewAppCountSuccess);
        e.addObserver(qqweb.portal, "AlloyJsReady", y.onAlloyJsReady);
        e.addObserver(alloy.portal, "portalReady", y.onPortalReady);
        e.addObserver(alloy.storage, "StorageSpaceChanged", y.onStorageSpaceChanged);
        a.profile("Dock CreateFinish");
        e.addObserver(alloy.fileSystem, "FileMove", y.onFileMove);
        e.addObserver(alloy.fileSystem, "FileAdd", y.onFileAdd);
        e.addObserver(alloy.fileSystem, "FileDelete", y.onFileDelete);
        e.addObserver(alloy.appconfig, "ClearDefaultApp", y.onClearDefaultApp);
        e.addObserver(alloy.appconfig, "GetAppConfigComplete",
            y.onGetAppConfigComplete);
        e.addObserver(alloy.appconfig, "GetDefaultAppConfigComplete", y.onGetAppConfigComplete);
        e.addObserver(alloy.appconfig, "GetAppConfigError", y.onGetAppConfigError);
        e.addObserver(alloy.portal, "UACReady", y.onUACReady);
        e.addObserver(alloy.portal, "DesktopSwitchStatus", y.onDesktopSwitchStatus)
    }
});
Jx().$package("alloy.startMenu", function (a) {
    var d = this,
        b = a.dom,
        e = a.event,
        g, j, l, p, o, s, v, w = {
            weibo: {
                url: "http://t.qq.com/Qplus_Web",
                title: "\u5b98\u65b9\u5fae\u535a"
            },
            support: {
                url: "http://support.qq.com/portal/discuss_pdt/513_1.html",
                title: "\u53cd\u9988\u8bba\u575b"
            },
            blog: {
                url: "http://webqq.qzone.qq.com",
                title: "\u5b98\u65b9\u535a\u5ba2"
            },
            question: {
                url: "http://service.qq.com/category/webQQ.html",
                title: "\u5e38\u89c1\u95ee\u9898"
            },
            imqq: {
                url: "http://www.qplus.com/productForWeb.shtml",
                title: "Q+\u5b98\u65b9\u7f51\u7ad9 -\u4ea7\u54c1\u4e2d\u5fc3"
            },
            download: {
                url: "http://www.qplus.com/productForPC.shtml",
                title: "Q+\u5b98\u65b9\u7f51\u7ad9 -\u4ea7\u54c1\u4e2d\u5fc3"
            }
        }, t = {
            stopPropagation: function (a) {
                a.stopPropagation()
            },
            onStartMenuBodyClick: function (a) {
                var b = alloy.util.getActionTarget(a, 2);
                if (b && b != "help") switch (l.hide(), a.preventDefault(), a.stopPropagation(), a = b.getAttribute("cmd"), a) {
                case "home":
                    pgvSendClick({
                        hottag: "WEB2QQ.TASKBAR.HOMEPAGE.LOGIN"
                    });
                    alloy.util.report2qqweb("taskbar|start|homepage");
                    alloy.util.setHomePage();
                    break;
                case "favorite":
                    pgvSendClick({
                        hottag: "WEB2QQ.TASKBAR.FAVORITE.LOGIN"
                    });
                    alloy.util.report2qqweb("taskbar|start|favorite");
                    alloy.util.addFavorite();
                    break;
                case "shortcut":
                    pgvSendClick({
                        hottag: "WEB2QQ.TASKBAR.SHORTCUT.LOGIN"
                    });
                    alloy.util.report2qqweb("taskbar|start|desktop");
                    open("./QPlusWeb.url");
                    break;
                case "lock":
                    alloy.portal.runApp("screenLocker");
                    pgvSendClick({
                        hottag: "WEB2QQ.TASKBAR.SCREENLOCKER.LOGIN"
                    });
                    alloy.util.report2qqweb("taskbar|start|screenlocker");
                    break;
                case "setting":
                    alloy.portal.runApp("settingCenter");
                    pgvSendClick({
                        hottag: "WEB2QQ.TASKBAR.SETTING.LOGIN"
                    });
                    alloy.util.report2qqweb("taskbar|start|setting");
                    break;
                case "logout":
                    alloy.portal.exit();
                    e.notifyObservers(alloy.portal, "Exit");
                    window.webTop && webTop.ui.channel.postCmd(23);
                    pgvSendClick({
                        hottag: "WEB2QQ.TASKBAR.EXIT.LOGIN"
                    });
                    alloy.util.report2qqweb("taskbar|start|exit");
                    break;
                case "exit":
                    f();
                    break;
                case "download":
                    c(w.download);
                    break;
                case "support":
                    window.open(w[a].url);
                    break;
                case "helper":
                    A();
                    break;
                case "about":
                    k()
                }
            },
            onHelpMenuClick: function (a) {
                var b = alloy.util.getActionTarget(a, 2);
                if (b) switch (a.preventDefault(),
                    a = b.getAttribute("cmd"), a) {
                case "hot":
                    alloy.util.report2qqweb("taskbar|help|tips");
                    alloy.app.tips.showNews();
                    break;
                case "weibo":
                    c(w[a]);
                    alloy.util.report2qqweb("taskbar|help|officialmicroblog");
                    break;
                case "support":
                    window.open(w[a].url);
                    alloy.util.report2qqweb("taskbar|help|support");
                    break;
                case "report":
                    h();
                    break;
                case "blog":
                    c(w[a]);
                    alloy.util.report2qqweb("taskbar|help|officialblog");
                    break;
                case "helper":
                    A();
                    break;
                case "question":
                    c(w[a]);
                    alloy.util.report2qqweb("taskbar|help|faq");
                    break;
                case "imqq":
                    c(w[a])
                }
            },
            onHelpMenuMouseenter: function () {
                v && (clearTimeout(v), v = 0)
            },
            onHelpMenuMouseleave: function () {
                D()
            },
            onStartHeplerBtnMouseover: function () {
                k()
            },
            onStartHeplerBtnClick: function (a) {
                a.preventDefault();
                a.stopPropagation();
                k()
            },
            onStartHeplerBtnMouseout: function () {
                D()
            },
            onStartMenuBodyMouseover: function (a) {
                var c;
                ((c = a.target).tagName == "LI" || (c = a.target.parentNode).tagName == "LI") && b.setClass(c, "taskbar_start_menu_hover")
            },
            onStartMenuBodyMouseout: function (a) {
                var c;
                ((c = a.target).tagName == "LI" || (c = a.target.parentNode).tagName ==
                    "LI") && b.setClass(c, "")
            },
            onHelpMenuMouseover: function (a) {
                (a = alloy.util.getActionTarget(a, 2)) && b.setClass(a, "taskbar_help_menu_hover")
            },
            onHelpMenuMouseout: function (a) {
                (a = alloy.util.getActionTarget(a, 2)) && b.setClass(a, "")
            },
            onSelfInfoAreaClick: function (a) {
                a.preventDefault();
                if (alloy.portal.getLoginLevel() == alloy.CONST.LOGIN_LEVEL_NONE) alloy.layout.showLoginWindow(""), alloy.util.report2qqweb("taskbar|start|signin");
                else if (a = parseInt(this.getAttribute("uin"), 10)) alloy.portal.runApp("userDetails", a), alloy.util.report2qqweb("taskbar|start|profile")
            },
            onSelfInfoReady: function (a) {
                s.title = "\u7f16\u8f91\u4e2a\u4eba\u8d44\u6599";
                s.innerHTML = a.htmlNick;
                s.setAttribute("uin", a.uin)
            },
            onUserAvatarChanged: function () {}
        }, r = function () {
            j || d.init();
            l.setZIndex(alloy.layout.getTopZIndex(3));
            var a = alloy.dock.getDockLocation(),
                c = b.getXY(g),
                e, f;
            a == "left" ? (e = c[0] + 60, f = c[1] - 200) : a == "right" ? (e = c[0] - 210, f = c[1] - 200) : a == "top" && (e = c[0] - 120, f = c[1] + 60);
            l.setXY(e, f);
            l.show()
        }, m = function () {
            l.hide()
        };
    this.showStartMenu = r;
    this.hideStartMenu = m;
    this.toggleStartMenu = function (a) {
        g =
            a || g;
        l && l.isShow() ? m() : r();
        pgvSendClick({
            hottag: "WEB2QQ.TASKBAR.START.LOGIN"
        });
        alloy.util.report2qqweb("taskbar|start")
    };
    this.getStartMenuHeight = function () {
        return b.getClientHeight(o)
    };
    this.getStartMenuPos = function () {
        return b.getXY(o)
    };
    var f = function () {
        var a = "\u60a8\u786e\u5b9a\u8981\u9000\u51fa  Q+ Web \u5417\uff1f";
        window.webTop && (a = "\u60a8\u786e\u5b9a\u8981\u9000\u51fa\u201c\u5ba2\u6237\u7aef\u201d\u5417\uff1f");
        alloy.layout.confirm(a, function () {
            alloy.portal.close()
        }, {
            modal: !0
        });
        alloy.util.report2qqweb("taskbar|start|quit")
    },
        k = function () {
            if (!p) {
                var c = '                <div class="taskbar_help_menu_head">                </div>                <div class="taskbar_help_menu_body">                    <div class="taskbar_help_menu_text">\u4f60\u7684\u5728\u7ebf\u5e94\u7528\u6570\u636e\u5e73\u53f0\uff0c\u5b9e\u73b0\u672c\u5730\u4e0e\u4e91\u7aef\u65e0\u7f1d\u5207\u6362</div>                    <a href="###" cmd="imqq" class="taskbar_help_menu_link" title="http://www.qplus.com/productForWeb.shtml">http://www.qplus.com/productForWeb.shtml</a>                    <a href="###" cmd="report" class="taskbar_help_menu_link" title="\u9519\u8bef\u4e0a\u62a5">\u9519\u8bef\u4e0a\u62a5</a>                </div>                <div class="taskbar_help_menu_bottom">                    <span class="taskbar_help_menu_bottom_text">\u53cd\u9988:</span>                    <a href="###" cmd="weibo" class="helpMenuImg taskbar_help_menu_weibo" title="\u5b98\u65b9\u5fae\u535a">&nbsp;</a>\t\t\t\t\t<a href="###" cmd="blog" class="helpMenuImg taskbar_help_menu_blog" title="\u5b98\u65b9\u535a\u5ba2">&nbsp;</a>\t\t\t\t\t<a href="###" cmd="question" class="helpMenuImg taskbar_help_menu_question" title="\u5e38\u89c1\u95ee\u9898">&nbsp;</a>                </div>';
                a.browser.ie && (c += '<iframe width="100%" height="100%" class="fullscreen_bg_iframe"></iframe>');
                var d = b.node("div", {
                    "class": "helpMenuImg taskbar_help_menu_container"
                });
                b.hide(d);
                alloy.layout.getDesktop().body.appendChild(d);
                p = new alloy.layout.PopupBox({
                    container: d,
                    parentPopupBox: l,
                    html: c
                });
                e.on(d, "click", t.onHelpMenuClick)
            }
            v && (clearTimeout(v), v = 0);
            p.setZIndex(alloy.layout.getTopZIndex(3));
            p.show()
        }, q = function () {
            p.hide()
        }, D = function () {
            v && (clearTimeout(v), v = 0);
            v = setTimeout(q, 200)
        }, c = function (a) {
            alloy.portal.openInWebBrowser(a)
        },
        h = function () {
            alloy.layout.confirm("<div style='margin:10px 20px 20px;text-indent:24px;text-align:left;line-height:24px;'>\u5982\u679c\u60a8\u9047\u5230\u9875\u9762\u5f02\u5e38\uff0c\u53ef\u4ee5\u53cd\u9988\u9875\u9762\u9519\u8bef\u65e5\u5fd7\uff0c\u4ee5\u4fbf\u7cfb\u7edf\u5c3d\u5feb\u5b9a\u4f4d\u95ee\u9898\uff0c\u53cd\u9988\u8fc7\u7a0b\u4e2d\u4e0d\u4f1a\u66b4\u9732\u60a8\u7684\u4efb\u4f55\u9690\u79c1\u4fe1\u606f\u3002\u662f\u5426\u53cd\u9988\u672c\u6b21\u9875\u9762\u9519\u8bef\u65e5\u5fd7\uff1f<div>",
                function () {
                    alloy.util.LogReport()
                }, {
                    title: "\u9519\u8bef\u62a5\u544a",
                    width: 365,
                    height: 100,
                    modal: !0
                });
            alloy.util.report2qqweb("taskbar|help|report")
        }, A = function () {
            alloy.portal.runApp("helper");
            pgvSendClick({
                hottag: "WEB2QQ.TASKBAR.HELPER.LOGIN"
            });
            alloy.util.report2qqweb("taskbar|help|helper")
        }, x = ['<li cmd="home"><a href="###" title="\u8bbe\u4e3a\u4e3b\u9875">\u8bbe\u4e3a\u4e3b\u9875</a></li>', '<li cmd="favorite"><a href="###" title="\u6dfb\u52a0\u5230\u6536\u85cf\u5939">\u6dfb\u52a0\u5230\u6536\u85cf\u5939</a></li>',
            '<li cmd="shortcut"><a href="###" target="_blank" title="\u4fdd\u5b58\u684c\u9762\u5feb\u6377\u65b9\u5f0f">\u4fdd\u5b58\u684c\u9762\u5feb\u6377\u65b9\u5f0f</a></li>', '<li cmd="lock"><a href="###" title="\u9501\u5b9a">\u9501\u5b9a</a></li>', '<li cmd="setting"><a href="###" title="\u7cfb\u7edf\u8bbe\u7f6e">\u7cfb\u7edf\u8bbe\u7f6e</a></li>', '<li id="taskbar_helpButton" cmd="about"  title="\u5173\u4e8eQ+ Web"><a href="###">\u5173\u4e8eQ+ Web</a></li>', '<li cmd="logout"><a href="###"  title="\u9000\u51fa" class="logout_botton"></a></li>',
            '<li cmd="exit"><a href="###" title="\u9000\u51fa">\u9000\u51fa</a></li>', '<li cmd="download"><a href="###" title="\u4e0b\u8f7d\u5ba2\u6237\u7aef">\u4e0b\u8f7d\u5ba2\u6237\u7aef</a></li>', '<li cmd="helper"><a href="###" title="\u65b0\u624b\u6307\u5bfc">\u65b0\u624b\u6307\u5bfc</a></li>'
        ],
        z = [1, 2, 8, 5, 9];
    this.init = function () {
        for (var c = [], d = 0; d < z.length; ++d) c.push(x[z[d]]);
        c = '            <div id="taskbar_start_menu_body" class="startMenuImg taskbar_start_menu_body">                <div id="startMenuSelfInfo" class="taskbar_start_menu_selfinfo" uin="0">                    <div id="startMenuSelfNick" class="taskbar_start_menu_nick">\u8bf7&nbsp;<a href="###">\u767b\u5f55</a></div>                    <a cmd="support" class="startMenuImg startMenuTopControl_support" href="###" title="\u53cd\u9988">&nbsp;</a>                    <a cmd="lock" class="startMenuImg startMenuTopControl_lock" href="###" title="\u9501\u5b9a">&nbsp;</a>                </div>                <ul class="taskbar_start_menu">' +
            c.join("") + '</ul>                <a href="###" cmd="logout" title="\u6ce8\u9500\u5f53\u524d\u7528\u6237" class="startMenuImg logout_botton"></a>            </div>            ';
        a.browser.ie && (c += '<iframe width="100%" height="100%" class="fullscreen_bg_iframe"></iframe>');
        o = b.node("div", {
            "class": "taskbar_start_menu_container",
            id: "startMenuContainer"
        });
        o.innerHTML = c;
        alloy.layout.getDesktop().body.appendChild(o);
        c = !1;
        a.browser.mobileSafari && (c = !0);
        l = new alloy.layout.PopupBox({
            container: o,
            noCatchMouseUp: c
        });
        s = b.id("startMenuSelfNick");
        b.id("startMenuSelfInfo");
        if (alloy.portal.getLoginLevel() > alloy.CONST.LOGIN_LEVEL_NONE) t.onSelfInfoReady(alloy.system.getPortalSelf());
        c = b.id("taskbar_start_menu_body");
        e.on(s, "click", t.onSelfInfoAreaClick);
        e.on(c, "click", t.onStartMenuBodyClick);
        a.browser.ie == 6 && (e.on(c, "mouseover", t.onStartMenuBodyMouseover), e.on(c, "mouseout", t.onStartMenuBodyMouseout));
        j = !0;
        e.addObserver(alloy.portal, "selfInfoReady", t.onSelfInfoReady);
        e.addObserver(alloy.portal, "UserAvatarChanged", t.onUserAvatarChanged);
        e.addObserver(alloy.portal, "SelfInfoChanged", t.onSelfInfoReady)
    }
});
Jx().$package("alloy.appManager", function (a) {
    var d = this,
        b = a.dom,
        e = a.event,
        g, j = [],
        l, p, o, s, v, w = {}, t, r = function () {
            g = b.node("div", {
                id: "appManagerPanel",
                "class": "appManagerPanel"
            });
            g.innerHTML = '                <a class="aMg_close" href="###"></a>                <div class="aMg_dock_container" customAcceptDrop=1 index=5></div>                <div class="aMg_line_x"></div>                <div class="aMg_folder_container">                    <div class="folderItem">                        <div class="folder_bg folder_bg1"></div>                        <div class="folderOuter" customAcceptDrop=1 index=0><div class="folderInner" customAcceptDrop=1 index=0></div></div>                    </div>                    <div class="folderItem ">                        <div class="folder_bg folder_bg2"></div>                        <div class="folderOuter" customAcceptDrop=1 index=1><div class="folderInner" customAcceptDrop=1 index=1></div></div>                        <div class="aMg_line_y"></div>                    </div>                    <div class="folderItem ">                        <div class="folder_bg folder_bg3"></div>                        <div class="folderOuter" customAcceptDrop=1 index=2><div class="folderInner" customAcceptDrop=1 index=2></div></div>                        <div class="aMg_line_y"></div>                    </div>                    <div class="folderItem ">                        <div class="folder_bg folder_bg4"></div>                        <div class="folderOuter" customAcceptDrop=1 index=3><div class="folderInner" customAcceptDrop=1 index=3></div></div>                        <div class="aMg_line_y"></div>                    </div>                    <div class="folderItem ">                        <div class="folder_bg folder_bg5"></div>                        <div class="folderOuter" customAcceptDrop=1 index=4><div class="folderInner" customAcceptDrop=1 index=4></div></div>                        <div class="aMg_line_y"></div>                    </div>                </div>';
            document.body.appendChild(g);
            l = b.mini(".aMg_dock_container", g)[0];
            t = b.mini(".aMg_folder_container", g)[0];
            p = b.mini(".folderItem", g);
            o = b.mini(".folderInner", g);
            s = b.mini(".folderOuter", g);
            v = new a.ui.Sortables([], "id");
            a.array.forEach(s, function (b, c) {
                j[c] = new a.ui.ScrollBar(b, {
                    ipadTouchArea: !0
                })
            });
            v.addDropTarget({
                el: l,
                level: 0
            });
            e.addObserver(l, "drop", m.onDockContainerDrop);
            a.array.forEach(s, function (a) {
                v.addDropTarget({
                    el: a,
                    level: 0
                });
                e.addObserver(a, "drop", m.onFolderContainerDrop)
            });
            var c = b.mini(".aMg_close", g)[0];
            e.on(c, "click",
                q);
            e.addObserver(v, "start", m.onDragStart);
            e.addObserver(alloy.layout, "desktopResize", z);
            e.addObserver(alloy.fileSystem, "FileMove", m.onFileMove)
        }, m = {
            onDragStart: function () {
                alloy.util.report2app("navbar|fullview|move")
            },
            onFolderContainerDrop: function (a) {
                var c = a.apperceiveEl,
                    d = c.getAttribute("type"),
                    e = a.pos,
                    f = a.currentDropTarget,
                    a = parseInt(f.getAttribute("index"));
                xy = b.getXY(f);
                f = parseInt(c.getAttribute("fileId"));
                if (!isNaN(f)) {
                    e = Math.floor((e.y + j[a].getScrollTop() - xy[1]) / 35);
                    d = {
                        t: d,
                        id: f
                    };
                    c.getAttribute("from");
                    var h;
                    (h = alloy.fileSystem.getFileInfoByFile(d)) && alloy.fileSystem.moveFile(h.file, a, e, null, null, !0)
                }
            },
            onDockContainerDrop: function (a) {
                var c = a.apperceiveEl,
                    d = c.getAttribute("type"),
                    e = a.pos,
                    f = a.currentDropTarget,
                    a = parseInt(f.getAttribute("index"));
                xy = b.getXY(f);
                f = parseInt(c.getAttribute("fileId"));
                if (!isNaN(f)) {
                    e = Math.floor((e.x - 80) / 70);
                    e > 5 && (e = 5);
                    e < 0 && (e = 0);
                    d = {
                        t: d,
                        id: f
                    };
                    c.getAttribute("from");
                    var h;
                    (h = alloy.fileSystem.getFileInfoByFile(d)) && alloy.fileSystem.moveFile(h.file, a, e, h.parent.id, h.position, !0)
                }
            },
            onFileMove: function (a) {
                if (a.targetId >= 0 && a.targetId < 5) {
                    if (a.targetId == a.sourceId) {
                        var b = k(a.file.id, a.file.t);
                        if (b) {
                            var b = b.getElement(),
                                c = b.parentNode;
                            c.removeChild(b);
                            var d = a.targetPosition;
                            c.childNodes[d] ? c.insertBefore(b, c.childNodes[d]) : c.appendChild(b)
                        }
                    } else if ((b = k(a.file.id, a.file.t)) && f(b, a.sourceId, a.sourcePosition), b = A([a.file], a.targetId)[0]) b = b.getElement(), c = b.parentNode, d = a.targetPosition, c.childNodes[d] && c.insertBefore(b, c.childNodes[d]);
                    j[a.targetId] && j[a.targetId].update();
                    j[a.sourceId] && j[a.sourceId].update()
                } else if ((b = k(a.file.id, a.file.t)) && f(b, a.sourceId, a.sourcePosition), b = h([a.file], a.targetId)[0]) b = b.getElement(), c = b.parentNode, d = a.targetPosition + 1, a.sourceId == 5 && c.removeChild(b), c.childNodes[d] && c.insertBefore(b, c.childNodes[d])
            }
        }, f = function (a) {
            a = w[a.getId()];
            delete w[a.getId()];
            a.destroy()
        }, k = function (a, b) {
            typeof b !== "undefined" && (a = b + "_" + a);
            return w[a]
        }, q = function (a) {
            a && a.preventDefault();
            g && (d.hide(), b.show(alloy.layout.getDesktop().body))
        };
    this.close = q;
    var D = function () {
        l.innerHTML = "";
        a.array.forEach(o, function (a) {
            a.innerHTML = ""
        });
        var b = alloy.fileSystem.getFolderById(5);
        c();
        h(b.items);
        for (var b = [], d = 0; d < 5; d++) {
            var e = alloy.fileSystem.getFolderById(d);
            b.push(e);
            A(e.items, d)
        }
    }, c = function () {
            var a = alloy.portal.getSystemConfig("appMarket");
            appMarketButton = alloy.iconFactory.createIcon(alloy.fileSystem.FILE_TYPE.APP, {
                className: "appMarket",
                longTouchable: !1,
                deleteable: !1,
                isShowNotify: !1,
                parentNode: l,
                icon: {
                    url: alloy.CONST.CDN_URL + "style/images/appmarket.png?20111011001"
                },
                onClick: function () {
                    d.close();
                    alloy.portal.runApp("appMarket");
                    return !1
                }
            }, a)
        }, h = function (b) {
            var c = [],
                f = {
                    parentNode: l,
                    longTouchable: !1,
                    isShowNotify: !1
                }, h = function () {
                    d.close();
                    alloy.util.report2app("navbar|fullview|runapp")
                }, g;
            for (g in b) {
                var k = x(b[g], a.clone(f));
                c.push(k);
                e.addObserver(k, "iconclick", h)
            }
            return c
        }, A = function (b, c) {
            var f = [],
                h = {
                    parentNode: o[c],
                    longTouchable: !1,
                    isShowNotify: !1,
                    className: "amg_folder_appbutton"
                }, g = function () {
                    d.close();
                    alloy.util.report2app("navbar|fullview|runapp")
                }, k;
            for (k in b) {
                var l =
                    x(b[k], a.clone(h));
                l && (f.push(l), e.addObserver(l, "iconclick", g))
            }
            return f
        }, x = function (b, c) {
            var d, e = alloy.fileSystem.FILE_TYPE;
            if (b.t == e.APP) {
                d = alloy.appconfig.getAppConfig(b.id);
                if (!d) return a.profile('appManager createFolderIcon. id="' + b.id + '" appConfig is null', "appManager"), alloy.fileSystem.deleteFile(b, null, null, null, !1), null;
                d = alloy.iconFactory.createIcon(b.t, c, d)
            } else if (b.t == e.BUDDY || b.t == e.GROUP) d = alloy.iconFactory.createIcon(b.t, c, b);
            else if (b.t == e.FOLDER || b.t == e.FILE) c.file = b, d = alloy.iconFactory.createIcon(b.t,
                c, b);
            w[d.getId()] = d;
            a.platform.iPad || v.addDragClass(d.getElement());
            return d
        }, z = function () {
            var c = alloy.layout.getDesktopHeight() - 80;
            b.setStyle(t, "height", c + "px");
            a.browser.ie == 6 && (c = alloy.layout.getClientWidth(), b.setStyle(t, "width", (c / 5 % 1 > 0.5 ? c + 2 : c) + "px"));
            a.array.forEach(j, function (a) {
                a.update()
            })
        };
    this.tooglePanel = function () {
        g && b.isShow(g) ? this.close() : this.show()
    };
    this.show = function () {
        g || r();
        alloy.util.report2app("navbar|fullview");
        alloy.desktopManager.setDesktopStatus(alloy.desktopManager.DESK_STATUS.MANAGE);
        D();
        b.hide(alloy.layout.getDesktop().body);
        b.show(g);
        a.array.forEach(p, function (a) {
            setTimeout(function () {
                b.addClass(a, "folderItem_turn")
            }, 0)
        });
        z()
    };
    this.hide = function () {
        b.hide(g);
        alloy.util.report2app("navbar|fullview|exit");
        alloy.desktopManager.setDesktopStatus(alloy.desktopManager.DESK_STATUS.NORMAL);
        a.array.forEach(p, function (a) {
            b.removeClass(a, "folderItem_turn")
        })
    }
});
Jx().$package("alloy.taskBar", function (a) {
    var d = this,
        b = a.dom,
        e = a.event,
        g = a.string;
    this.init = function () {
        alloy.layout.getArea("bottom").innerHTML = '<div class="taskNextBox" id="taskNextBox"><a href="#" class="taskNext" id="taskNext" hidefocus="true"></a></div>\t\t\t\t\t\t\t\t<div class="taskContainer" id="taskContainer"><div class="taskContainerInner" id="taskContainerInner"></div></div>\t\t\t\t\t\t\t\t<div class="taskPreBox" id="taskPreBox"><a href="#" class="taskPre" id="taskPre" hidefocus="true"></a></div>';
        j = b.id("taskContainer");
        l = b.id("taskContainerInner");
        u.init();
        n.init();
        e.addObserver(this, "NewTaskItem", B.onNewTaskItem);
        e.addObserver(this, "RemoveTaskItem", B.onRemoveTaskItem);
        e.addObserver(this, "NotifyTaskItem", B.onNotifyTaskItem);
        e.addObserver(this, "FlashTaskItem", B.onFlashTaskItem);
        e.addObserver(this, "UpdateTaskName", B.onUpdateTaskName);
        e.addObserver(this, "UpdateTaskTitle", B.onUpdateTaskTitle);
        e.addObserver(alloy.windowFactory, "WindowCreate", F);
        e.addObserver(this, "NotifyBeat_250", N);
        e.addObserver(alloy.layout,
            "desktopResize", J);
        e.addObserver(this, "EQQBuddyStateChange", R);
        e.addObserver(this, "EQQSelfStateChange", W);
        e.addObserver(alloy.dock, "DockLocationChanged", $)
    };
    this.getTask = function (b) {
        return a.isUndefined(b) ? !1 : q(b)
    };
    this.getTaskItem = function (b, c) {
        if (a.isUndefined(b) || a.isUndefined(c)) return !1;
        var d = M({
            appId: b,
            id: c
        });
        if (d = q(d.appId)) return d.getItem(c)
    };
    var j = null,
        l = null,
        p = !1,
        o = !1,
        s = !1,
        v = alloy.CONST.CDN_URL + "style/images/transparent.gif",
        w = alloy.CONST.CDN_URL + "style/images/mid.png",
        t = {
            appId: "5_0",
            appName: "\u6b63\u5728\u804a\u5929...",
            appIcon: alloy.CONST.CDN_URL + "style/images/task/eqq_chatbox.png"
        }, r = {
            appId: "_folder",
            appName: "\u6587\u4ef6\u5939"
        }, m = {
            appId: "_diskAdmin",
            appName: "\u8d44\u6e90\u7ba1\u7406\u5668"
        }, f = 0,
        k = {}, q = function (a) {
            return a == 0 ? !1 : k[a]
        }, D = function (b, c) {
            if (a.isUndefined(b) || a.isUndefined(c)) return !1;
            var d = q(b);
            return d ? d.getItem(c) : !1
        }, c = function (b) {
            return b == "" ? "" : a.browser.ie == 6 ? '<img src="' + v + '" style="' + ("background:node;filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + b + "', sizingMethod='scale')") +
                '" />' : '<img src="' + b + '" />'
        }, h = function (c) {
            if (a.browser.ie == 6) return !1;
            if (c = b.mini(".taskItemIcon img", c)[0]) e.on(c, "error", function () {
                this.src = w
            })
        }, A = 0,
        x = null,
        z = function (f) {
            var n = f.id,
                k = f.icon || "",
                l = f.name.toString() || "\u4efb\u52a1\u680f\u9879",
                j = f.title || l,
                x = f.win,
                m = A++,
                p = f._appId,
                z = g.encodeHtmlSimple(l),
                q = null;
            this.setName = function (a) {
                l = a.toString() || "";
                z = g.encodeHtmlSimple(l);
                j = l;
                q.title = j;
                b.mini(".taskItemTxt", q)[0].innerHTML = z
            };
            this.setTitle = function (b) {
                if (a.isUndefined(b)) return !1;
                j = b;
                q.title =
                    j
            };
            this.getId = function () {
                return n
            };
            this.getDid = function () {
                return m
            };
            this.setAppId = function (a) {
                p = a;
                q.setAttribute("appid", a)
            };
            this.createDom = function () {
                var a = b.node("a", {
                    id: "taskItem_" + m,
                    "class": "taskItem",
                    href: "#",
                    appid: p,
                    tid: n,
                    title: j
                });
                a.innerHTML = '<div class="taskItemIcon">' + c(k) + '<div class="taskItemIconState"></div>\t\t\t\t\t\t\t </div>\t\t\t\t\t\t\t <div class="taskItemTxt">' + z + "</div>";
                q = a;
                e.on(a, "click", this.onClick);
                e.on(a, "contextmenu", this.onRightClick);
                h(a);
                return a
            };
            this.removeDom = function () {
                q.parentNode.removeChild(q);
                e.off(q, "click")
            };
            this.getDom = function () {
                return q
            };
            this.addClass = function (a) {
                b.addClass(q, a)
            };
            this.removeClass = function (a) {
                b.removeClass(q, a)
            };
            this.onClick = function (b) {
                a.isUndefined(b) || b.preventDefault();
                x.desktopIndex === alloy.desktopManager.getCurrentDesktopIndex() ? x.getWindowFlags && x.getWindowFlags() & alloy.CONST.WINDOW_FLAG_CURRENT ? x.min() : x.setCurrent() : x.setCurrent();
                e.notifyObservers(d, "TaskItemClick", n)
            };
            this.onRightClick = function (a) {
                a.preventDefault();
                var b = T(p, n);
                b && alloy.layout.showContextMenu({
                    x: a.clientX,
                    y: a.clientY
                }, {
                    argument: {
                        appId: p,
                        id: n
                    },
                    items: b
                })
            };
            this.setCurrent = function () {
                this.jumpDown()
            };
            this.setNotCurrent = function () {};
            this.jumpUp = function () {
                var a = "",
                    a = b.hasClass(q, "fistTaskItem") ? "firstTaskItemHight" : "taskItemHight";
                b.addClass(q, a);
                u.isShow() && u.getCurAppId() == p && u.jumpUpItem("taskItem_" + m, a)
            };
            this.jumpDown = function () {
                var a = "",
                    a = b.hasClass(q, "fistTaskItem") ? "firstTaskItemHight" : "taskItemHight";
                b.removeClass(q, a)
            };
            this.winMax = function () {
                x.setCurrent();
                x.max()
            };
            this.winMin = function () {
                x.min()
            };
            this.close = function () {
                x.close()
            };
            this.getWinStatus = function () {
                return x.getBoxStatus()
            };
            this.isWinShow = function () {
                return x.isShow()
            };
            this.getWin = function () {
                return x
            }
        }, y = function (d) {
            var f = d.appId || 0,
                j = d.srcAppId || 0,
                x = d.groupId || f,
                m = d.groupType || "single",
                A = d.appIcon || "",
                q = d.preSiblingAppId || null,
                p = d.appName.toString() || "",
                B = d.appType,
                r = this,
                s = g.encodeHtmlSimple(p),
                o = {}, y = [],
                t = null,
                v = null,
                w = null,
                F = null,
                D = 0;
            this.init = function () {
                o = {};
                y = [];
                var c = b.node("div", {
                    id: "taskGroup_" + f,
                    "class": "taskGroup"
                });
                c.innerHTML =
                    '<div class="taskItemBox"></div>';
                t = c;
                v = b.mini(".taskItemBox", c)[0];
                if (l.innerHTML == "") l.appendChild(c);
                else {
                    var d = a.browser.ie && a.browser.ie < 9 ? l.firstChild : l.firstElementChild;
                    if (q) {
                        var e = b.id("taskGroup_" + q);
                        e && (d = e)
                    }
                    l.insertBefore(c, d)
                }
                d = b.getWidth(l);
                b.setStyle(l, "width", d + 114 + "px");
                b.addClass(c, "taskGroupAnaWidth")
            };
            this.getAppId = function () {
                return f
            };
            this.setAppId = function (a) {
                for (var b in y) y[b].setAppId(a);
                f = a
            };
            this.getGroupId = function () {
                return x
            };
            this.getGroupType = function () {
                return m
            };
            this.getSrcAppId =
                function () {
                    return j
            };
            this.getCurrentItemId = function () {
                return D
            };
            this.addItem = function (b) {
                o || (o = {});
                if (!a.isUndefined(o[b.id]) && o[b.id]) return !1;
                D = b.id;
                b.id = b.id;
                b._appId = f;
                b._appType = B;
                if (a.isUndefined(b.icon) || b.icon == "") b.icon = A;
                var c = new z(b),
                    d = c.createDom();
                o[b.id] = c;
                y.push(c);
                v.appendChild(d);
                this.checkTask();
                n.resize();
                G();
                I()
            };
            this.removeItem = function (a) {
                D == a && (D = 0);
                if (this.getItemCount() > 1) {
                    for (var b in y)
                        if (y[b].getId() == a) {
                            y.splice(b, 1);
                            break
                        }
                    o[a].removeDom();
                    o[a] = null;
                    delete o[a];
                    this.checkTask();
                    G();
                    n.resize();
                    I();
                    return this.getItemCount()
                } else return this.removeTask(), I(), 0
            };
            this.getItem = function (a) {
                return o[a]
            };
            this.getItemList = function () {
                return o
            };
            this.getItemArr = function () {
                return y
            };
            this.getItemWinSatus = function (a) {
                if (o[a]) return o[a].getWinStatus()
            };
            this.isItemWinShow = function (a) {
                if (o[a]) return o[a].isWinShow()
            };
            this.setItemName = function (b, c) {
                !a.isUndefined(o[b]) && o[b] && o[b].setName(c)
            };
            this.removeTask = function () {
                w && e.off(w, "click");
                t.parentNode.removeChild(t);
                o = null;
                y = [];
                t = null;
                E();
                var c = b.getWidth(l);
                b.setStyle(l, "width", c - 114 + "px");
                n.resize();
                c = f;
                a.isUndefined(k[c]) || (k[c] = null, delete k[c])
            };
            this.onClick = function (b) {
                if (a.isUndefined(b)) return !1;
                o[b].onClick()
            };
            this.onRightClick = function (a) {
                a.preventDefault();
                var b = T(f);
                b && alloy.layout.showContextMenu({
                    x: a.clientX,
                    y: a.clientY
                }, {
                    argument: {
                        appId: f
                    },
                    items: b
                })
            };
            this.checkTask = function () {
                if (this.getItemCount() > 1) {
                    if (w) b.show(w);
                    else {
                        var a = b.node("div", {
                            id: "taskGroupItem_" + f,
                            "class": "taskItem taskGroupItem",
                            title: p
                        });
                        a.innerHTML =
                            '<div class="taskItemIcon">' + c(A) + '</div>\t\t\t\t\t\t\t  <div class="taskItemCount"></div>\t\t\t\t\t\t\t  <div class="taskItemTxt">' + s + '</div>\t\t\t\t\t\t\t  <div class="taskItemGroupIcon"></div>';
                        w = a;
                        F = b.mini(".taskItemCount", a)[0];
                        t.appendChild(a);
                        e.on(a, "click", H);
                        e.on(a, "contextmenu", r.onRightClick);
                        h(a)
                    }
                    b.hide(v)
                } else w && b.hide(w), b.show(v)
            };
            this.getItemCount = function () {
                var a = 0;
                if (!o) return 0;
                for (var b in o) a++;
                return a
            };
            this.setCurrent = function (a) {
                if (!t) return !1;
                D = a;
                (a = this.getItem(a)) && a.setCurrent();
                b.addClass(t, "taskCurrent")
            };
            this.setNotCurrent = function (a) {
                if (!t) return !1;
                (a = this.getItem(a)) && a.setNotCurrent();
                b.removeClass(t, "taskCurrent")
            };
            this.jumpUp = function (a) {
                b.addClass(t, "taskJumpUp");
                (a = this.getItem(a)) && a.jumpUp()
            };
            this.jumpDown = function () {
                b.removeClass(t, "taskJumpUp")
            };
            this.winMin = function () {
                for (var a in o) o[a].winMin()
            };
            this.close = function () {
                for (var a in o) o[a].close()
            };
            this.resetTaskGroupOpen = function () {
                b.removeClass(w, "taskGroupItemOpen");
                e.off(document.body, "mouseup")
            };
            this.getItemsWidth =
                function () {
                    return this.getItemCount() * 114
            };
            this.getContainer = function () {
                return t
            };
            var H = function () {
                if (u.isShow()) E();
                else {
                    u.setContent(v.innerHTML, f);
                    var a = b.getClientXY(this);
                    u.setPostion(a[0]);
                    u.show();
                    b.addClass(w, "taskGroupItemOpen");
                    e.on(document.body, "mouseup", J)
                }
            }, E = function () {
                    u.hide();
                    w && b.removeClass(w, "taskGroupItemOpen");
                    e.off(document.body, "mouseup")
                }, J = function (a) {
                    if (b.contains(w, a.target)) return !1;
                    E()
                }, G = function () {
                    if (!F) return !1;
                    F.innerHTML = r.getItemCount()
                }, I = function () {
                    if (!o) return !1;
                    var a = 0,
                        b;
                    for (b in o) {
                        a++;
                        var c = o[b];
                        a == 1 ? c.addClass("fistTaskItem") : c.removeClass("fistTaskItem")
                    }
                }
        }, u = {
            _curAppId: 0,
            _mainDom: null,
            _contentDom: null,
            _contentInnerDom: null,
            _maskIframe: null,
            _domPageUp: null,
            _domPageDown: null,
            _turnPageMaxHeight: 120,
            _turnPageHeight: 40,
            _touchStartY: 0,
            _touchEndY: 0,
            _isMove: !1,
            init: function () {
                var a = alloy.layout.getArea("bottom"),
                    c = b.node("iframe", {
                        id: "taskMenuMask",
                        name: "taskMenuMask",
                        "class": "taskMenuMask",
                        frameBorder: "0",
                        allowtransparency: "true",
                        scrolling: "no",
                        style: "display:none",
                        src: "./domain.html"
                    });
                this._maskIframe = c;
                a.parentNode.insertBefore(c, a);
                c = b.node("div", {
                    id: "taskMenuBox",
                    "class": "taskMenuBox ",
                    style: "display:none"
                });
                c.innerHTML = '<div class="taskMenuContentBox"><div class="taskMenuContentInner"></div></div>';
                this._mainDom = c;
                this._contentDom = b.mini(".taskMenuContentBox", c)[0];
                this._contentInnerDom = b.mini(".taskMenuContentInner", c)[0];
                a.parentNode.insertBefore(c, a)
            },
            getCurAppId: function () {
                return this._curAppId
            },
            getMainDom: function () {
                return this._mainDom
            },
            getMenuInnerDom: function () {
                return this._contentInnerDom
            },
            setContent: function (a, b) {
                this._curAppId = b;
                this.unbindDom();
                this._contentInnerDom.innerHTML = a;
                this.bindDom();
                setTimeout(this.resizeMask, 0)
            },
            bindDom: function () {
                var a = b.mini(".taskItem", this._mainDom),
                    c;
                for (c in a) e.on(a[c], "click", this.onClick), e.on(a[c], "mouseup", this.onMouseUp), e.on(a[c], "contextmenu", this.onRightClick)
            },
            unbindDom: function () {
                var a = b.mini(".taskItem", this._mainDom),
                    c;
                for (c in a) e.off(a[c], "click"), e.off(a[c], "mouseup"), e.off(a[c], "contextmenu")
            },
            getItemCount: function () {
                return b.mini(".taskItem",
                    this._mainDom).length
            },
            resizeMask: function () {
                var a = b.getClientHeight(u._mainDom);
                b.setStyle(u._maskIframe, "height", a + "px")
            },
            setPostion: function (a) {
                b.setStyle(this._mainDom, "left", a - 1 + "px");
                b.setStyle(this._maskIframe, "left", a + "px")
            },
            show: function () {
                if (!this._mainDom) return !1;
                b.show(this._mainDom);
                b.show(this._maskIframe);
                this.setPage()
            },
            isShow: function () {
                return b.isShow(this._mainDom)
            },
            hide: function () {
                this._mainDom && (b.hide(this._mainDom), b.hide(this._maskIframe))
            },
            jumpUpItem: function (a, c) {
                var d =
                    b.mini(".taskItem", this._contentInnerDom),
                    e;
                for (e in d) {
                    var f = d[e];
                    if (f.getAttribute("id") == a) {
                        b.addClass(f, c);
                        break
                    }
                }
            },
            jumpDownItem: function (a, c) {
                var d = b.mini(".taskItem", this._contentInnerDom),
                    e;
                for (e in d) {
                    var f = d[e];
                    if (f.getAttribute("id") == a) {
                        b.removeClass(f, c);
                        break
                    }
                }
            },
            onClick: function (a) {
                a.preventDefault();
                var b = this.getAttribute("appid"),
                    a = this.getAttribute("tid"),
                    b = q(b);
                b.onClick(a);
                b.resetTaskGroupOpen();
                u.hide()
            },
            onRightClick: function (a) {
                a.preventDefault();
                var b = this.getAttribute("appid"),
                    c = this.getAttribute("tid"),
                    d = T(b, c);
                d && alloy.layout.showContextMenu({
                    x: a.clientX,
                    y: a.clientY
                }, {
                    argument: {
                        appId: b,
                        id: c
                    },
                    items: d
                })
            },
            onMouseUp: function (a) {
                a.stopPropagation()
            },
            setPageMaxHeight: function () {
                var a = alloy.layout.getAvailableHeight();
                this._turnPageMaxHeight = a - a % 40 - 80
            },
            setPage: function () {
                this.setPageMaxHeight();
                this.resetPage();
                var c = this._turnPageMaxHeight;
                b.getClientHeight(this._mainDom);
                var d = b.getClientHeight(this._contentInnerDom);
                if (d > c) {
                    if (!this._domPageUp) this._domPageUp = d = b.node("a", {
                        "class": "taskMenuUp taskMenuUpDisable",
                        href: "#",
                        hidefocus: "true"
                    }), e.on(d, "click", this.menuUp), e.on(d, "mouseup", function (a) {
                        a.stopPropagation()
                    }), this._mainDom.insertBefore(d, a.browser.ie && a.browser.ie < 9 ? this._mainDom.firstChild : this._mainDom.firstElementChild), d = b.node("a", {
                        "class": "taskMenuDown",
                        href: "#",
                        hidefocus: "true"
                    }), e.on(d, "click", this.menuDown), e.on(d, "mouseup", function (a) {
                        a.stopPropagation()
                    }), this._domPageDown = d, this._mainDom.appendChild(d);
                    b.setStyle(this._contentDom, "height", c + "px");
                    a.platform.iPad && this.setIpad();
                    this.downToBottom()
                } else this._domPageUp && (b.hide(this._domPageUp), b.hide(this._domPageDown), a.platform.iPad && this.removeIpad()), b.setStyle(this._contentDom, "height", d + "px")
            },
            resetPage: function () {
                if (!u._contentInnerDom || !u._domPageUp) return !1;
                b.setStyle(u._contentInnerDom, "marginTop", "0px");
                b.getClientHeight(this._mainDom);
                var a = b.getClientHeight(this._contentInnerDom);
                this._domPageUp && this._turnPageMaxHeight < a ? (b.show(this._domPageUp), b.show(this._domPageDown), b.addClass(u._domPageUp,
                    "taskMenuUpDisable"), b.removeClass(u._domPageDown, "taskMenuDownDisable")) : (b.hide(this._domPageUp), b.hide(this._domPageDown), b.addClass(u._domPageUp, "taskMenuUpDisable"), b.addClass(u._domPageDown, "taskMenuDownDisable"))
            },
            resize: function () {
                this.isShow() && this.hide()
            },
            menuUp: function (a, c) {
                a && (a.preventDefault(), a.stopPropagation());
                c = c || u._turnPageHeight;
                if (b.hasClass(u._domPageUp, "taskMenuUpDisable")) return !1;
                var d = parseInt(b.getStyle(u._contentInnerDom, "marginTop") || 0),
                    e = b.getHeight(u._contentDom),
                    f = b.getClientHeight(u._contentInnerDom);
                if (d >= 0 || e >= f) return !1;
                b.setStyle(u._contentInnerDom, "marginTop", (-d > c ? d + c : 0) + "px"); - d <= c && b.addClass(u._domPageUp, "taskMenuUpDisable");
                b.hasClass(u._domPageDown, "taskMenuDownDisable") && b.removeClass(u._domPageDown, "taskMenuDownDisable")
            },
            menuDown: function (a, c) {
                a && (a.preventDefault(), a.stopPropagation());
                c = c || u._turnPageHeight;
                if (b.hasClass(u._domPageDown, "taskMenuUpDisable")) return !1;
                var d = parseInt(b.getStyle(u._contentInnerDom, "marginTop") || 0),
                    e = b.getHeight(u._contentDom),
                    f = b.getClientHeight(u._contentInnerDom);
                if (f + d <= e || e >= f) return !1;
                var h = f - e + d;
                b.setStyle(u._contentInnerDom, "marginTop", (h > c ? d - c : -(f - e)) + "px");
                h <= c && b.addClass(u._domPageDown, "taskMenuDownDisable");
                b.hasClass(u._domPageUp, "taskMenuUpDisable") && b.removeClass(u._domPageUp, "taskMenuUpDisable")
            },
            downToBottom: function () {
                var a = b.getClientHeight(this._mainDom),
                    c = b.getClientHeight(this._contentInnerDom);
                c > a && (b.removeClass(this._contentInnerDom, "taskMenuContentInnerAnm"), this.menuDown(null, c), b.addClass(this._contentInnerDom,
                    "taskMenuContentInnerAnm"))
            },
            setIpad: function () {
                var a = this._contentInnerDom;
                a.addEventListener("touchstart", function (a) {
                    u._touchStartY = a.targetTouches[0].clientY
                }, !0);
                a.addEventListener("touchmove", function (a) {
                    u._touchEndY = a.targetTouches[0].clientY;
                    a = u._touchEndY - u._touchStartY;
                    if (a < -5) {
                        if (b.isShow(u._domPageUp)) u.menuDown(null, -a), u._isMove = !0
                    } else if (a > 5) {
                        if (b.isShow(n._domPageDown)) u.menuUp(null, a), u._isMove = !0
                    } else return !1;
                    u._touchStartY = u._touchEndY
                }, !0);
                a.addEventListener("touchend", function (a) {
                    u._isMove &&
                        (a.preventDefault(), a.stopPropagation());
                    u._isMove = !1
                }, !0)
            },
            removeIpad: function () {
                var a = this._contentInnerDom;
                a.removeEventListener("touchstart");
                a.removeEventListener("touchmove");
                a.removeEventListener("touchend")
            }
        }, n = {
            _pre: null,
            _preBox: null,
            _next: null,
            _nextBox: null,
            _dockMarginDom: null,
            _dockMarginWidth: -1,
            _touchStartX: 0,
            _touchEndX: 0,
            _isMove: !1,
            init: function () {
                this._pre = b.id("taskPre");
                this._preBox = b.id("taskPreBox");
                this._next = b.id("taskNext");
                this._nextBox = b.id("taskNextBox");
                e.on(this._pre, "click",
                    this.onPre);
                e.on(this._next, "click", this.onNext);
                var c = n.getAvailableWidth();
                a.isNumber(c) && this.setContainerWidth(c - 114);
                this.setDockMargin();
                a.platform.iPad && this.setIpad()
            },
            setInnerRight: function (c) {
                var d = a.browser;
                d.ie > 0 && d.ie < 8 ? b.setStyle(l, "right", c + "px") : b.setStyle(l, "marginRight", c + "px")
            },
            getInnerRight: function () {
                var c = a.browser;
                return c.ie > 0 && c.ie < 8 ? parseInt(b.getStyle(l, "right")) : parseInt(b.getStyle(l, "marginRight"))
            },
            resize: function () {
                if (s) return !1;
                if (!o) {
                    o = !0;
                    var a = n.getAvailableWidth(),
                        c = 0,
                        d;
                    for (d in k) c += k[d].getItemsWidth();
                    if (c > a) {
                        if (!p) {
                            p = !0;
                            var e = [],
                                f;
                            for (f in k) e.push(k[f]);
                            var h = x.getGroupId(),
                                a = x.getCurrentItemId(),
                                c = -1;
                            k = {};
                            for (f in e)
                                if (d = e[f], d.getGroupType() == "group") {
                                    var g = d.getItemList(),
                                        j = d.getAppId(),
                                        m = d.getGroupId(),
                                        A;
                                    for (A in g) {
                                        var z = g[A],
                                            u = z.getWin();
                                        F(u, j);
                                        m == h && z.getId() == a && (x = q(m), c = a);
                                        V(j, z.getId()) && (u = I(u), G(j, z.getId()), O(u))
                                    }
                                    d.removeTask()
                                } else g = d.getSrcAppId(), g = M({
                                    appId: g,
                                    id: g
                                }), d.setAppId(g.appId), k[g.appId] = d;
                            c != -1 && x.setCurrent(a)
                        }
                    } else if (p) {
                        p = !1;
                        f = [];
                        for (e in k) f.push(k[e]);
                        A = x.getGroupId();
                        a = x.getCurrentItemId();
                        c = -1;
                        k = {};
                        for (e in f)
                            if (d = f[e], d.getGroupType() == "group") {
                                d.getItemList();
                                j = d.getItemArr();
                                g = [];
                                if (j.length > 1 && j[0].getDid() > j[1].getDid())
                                    for (h = j.length - 1; h >= 0; h--) g.push(j[h].getId());
                                else
                                    for (h in j) g.push(j[h].getId());
                                m = j = d.getAppId();
                                z = d.getGroupId();
                                for (h in g) {
                                    var u = d.getItem(g[h]),
                                        B = u.getWin();
                                    F(B, m);
                                    var r = I(B),
                                        m = r.appId;
                                    if (z == A && u.getId() == a) x = q(r.appId), c = r.id;
                                    d.removeItem(u.getId());
                                    V(j, u.getId()) && (r = I(B), G(j, u.getId()),
                                        O(r))
                                }
                            } else g = d.getSrcAppId(), g = M({
                                appId: g,
                                id: g
                            }), d.setAppId(g.appId), k[g.appId] = d;
                        c != -1 && x.setCurrent(a)
                    }
                    o = !1
                }
                e = n.getAvailableWidth();
                h = b.getWidth(l);
                h > e ? (n.setContainerWidth(e - 114), n.resizeCurrentTask(), n.showBtn()) : (n.setContainerWidth(h), n.setInnerRight(0), n.hideBtn());
                n.checkShowDockMargin()
            },
            setContainerWidth: function (c) {
                b.setStyle(j, "width", c + "px");
                if (a.browser.ie == 6) {
                    var d = alloy.layout.getArea("bottom");
                    b.setStyle(d, "width", c + 114 + 6 + "px")
                }
            },
            setBottomAreaWidth: function () {
                var a = alloy.layout.getArea("bottom");
                b.setStyle(a, "right", this._dockMarginWidth + "px")
            },
            setDockMargin: function () {
                if (alloy.dock.getDockLocation() == "right") {
                    if (this._dockMarginWidth == -1) {
                        var a = n.getAvailableWidth();
                        this._dockMarginWidth = b.getClientWidth() - a;
                        this.setBottomAreaWidth()
                    }
                } else if (this._dockMarginWidth > 0) this._dockMarginWidth = -1, this.setBottomAreaWidth()
            },
            checkShowDockMargin: function () {
                if (this._dockMarginWidth == -1) return !1;
                var a = alloy.dock.getDockHeight();
                if ((b.getClientHeight() - a) / 2 - 64 < 0) {
                    if (this._dockMarginWidth == 0) a = n.getAvailableWidth(),
                    this._dockMarginWidth = b.getClientWidth() - a, this.setBottomAreaWidth()
                } else this._dockMarginWidth = 0, this.setBottomAreaWidth()
            },
            resizeCurrentTask: function () {
                var a = n.getAvailableWidth(),
                    c = b.getWidth(l);
                if (!x) return !1;
                x.getAppId();
                var d = b.mini(".taskGroup", l);
                n.getInnerRight();
                var e = 0,
                    f;
                for (f in d)
                    if (e++, b.hasClass(d[f], "taskCurrent")) break;
                e = d.length - e + 1;
                a -= 114;
                e = c - e * 114;
                c - e < a && (e = c - a);
                n.setInnerRight(-e)
            },
            hideBtn: function () {
                b.hide(this._preBox);
                b.hide(this._nextBox);
                e.off(j, "mousewheel", this.onMouseWheel)
            },
            showBtn: function () {
                b.show(this._preBox);
                b.show(this._nextBox);
                this.checkPreBtn();
                this.checkNextBtn();
                e.on(j, "mousewheel", this.onMouseWheel)
            },
            onPre: function (a, c) {
                a && a.preventDefault();
                if (b.hasClass(n._pre, "taskPreDisable")) return !1;
                var c = c || 114,
                    d = b.getWidth(l),
                    e = b.getWidth(j),
                    f = n.getInnerRight();
                if (e >= d || e - f >= d) return !1;
                d = d - e + f;
                n.setInnerRight(f - (d > c ? c : d));
                n.checkPreBtn();
                n.checkNextBtn()
            },
            checkPreBtn: function () {
                var a = b.getWidth(l),
                    c = b.getWidth(j),
                    d = n.getInnerRight(),
                    e = this._pre;
                a - c + d > 10 ? b.hasClass(e,
                    "taskPreDisable") && b.removeClass(e, "taskPreDisable") : b.hasClass(e, "taskPreDisable") || b.addClass(e, "taskPreDisable")
            },
            onNext: function (a, c) {
                a && a.preventDefault();
                if (b.hasClass(n._next, "taskNextDisable")) return !1;
                var c = c || 114,
                    d = b.getWidth(l),
                    e = b.getWidth(j),
                    f = n.getInnerRight();
                if (e >= d || f >= 0) return !1;
                d = c;
                n.setInnerRight(f + (-f > c ? c : -f)); - f <= c && n.checkNextBtn();
                n.checkPreBtn()
            },
            checkNextBtn: function () {
                var a = this._next;
                n.getInnerRight() < 0 ? b.hasClass(a, "taskNextDisable") && b.removeClass(a, "taskNextDisable") :
                    b.hasClass(a, "taskNextDisable") || b.addClass(a, "taskNextDisable")
            },
            onMouseWheel: function (a) {
                if (a.wheelDelta > 0) {
                    if (b.isShow(n._preBox)) n.onPre()
                } else if (a.wheelDelta < 0 && b.isShow(n._nextBox)) n.onNext()
            },
            getAvailableWidth: function () {
                var a = alloy.dock.getDockHeight();
                return (b.getClientHeight() - a) / 2 - 64 < 0 ? alloy.layout.getAvailableWidth() : b.getClientWidth()
            },
            setIpad: function () {
                var a = l;
                a.addEventListener("touchstart", function (a) {
                    n._isMove = !1;
                    n.touchStartX = a.targetTouches[0].clientX
                }, !0);
                a.addEventListener("touchmove",
                    function (a) {
                        n.touchEndX = a.targetTouches[0].clientX;
                        a = n.touchEndX - n.touchStartX;
                        if (a > 50) {
                            if (b.isShow(n._preBox)) n.onPre(null, a), n._isMove = !0
                        } else if (a < -50) {
                            if (b.isShow(n._nextBox)) n.onNext(null, -a), n._isMove = !0
                        } else return !1;
                        n.touchStartX = n.touchEndX
                    }, !0);
                a.addEventListener("touchend", function (a) {
                    n._isMove && (a.preventDefault(), a.stopPropagation());
                    n._isMove = !1
                }, !0)
            }
        }, B = {
            onNewTaskItem: function (b) {
                var c = b.appId || "task_" + f++,
                    d = q(c);
                if (a.isUndefined(d) || !d) d = new y(b), d.init(), k[c] = d;
                d.addItem({
                    id: b.id,
                    name: b.name,
                    title: b.title,
                    preSiblingAppId: b.preSiblingAppId,
                    icon: b.icon,
                    win: b.win
                })
            },
            onNotifyTaskItem: function (a) {
                a = M(a);
                O(a)
            },
            onFlashTaskItem: function (a) {
                a = M(a);
                E(a);
                setTimeout(function () {
                    L(a)
                }, 200)
            },
            onRemoveTaskItem: function (b) {
                var c = q(b.appId);
                a.isUndefined(c) || (a.isUndefined(b.id) ? c.removeTask() : c.removeItem(b.id))
            },
            onUpdateTaskName: function (b) {
                var b = M(b),
                    c = q(b.appId);
                a.isUndefined(c) || c.setItemName(b.id, b.name)
            },
            onUpdateTaskTitle: function (b) {
                var c = q(b.appId);
                a.isUndefined(c) || c.getItem(b.id).setTitle(b.title)
            },
            onSetCurrent: function (b) {
                var c = q(b.appId);
                a.isUndefined(c) || (x && c.getAppId() != x.getAppId() && x.setNotCurrent(), c.setCurrent(b.id), x = c, n.resize())
            },
            onSetNotCurrent: function (b) {
                b = q(b.appId);
                a.isUndefined(b) || b.setNotCurrent()
            }
        }, F = function (b, c) {
            var f = b.option.taskType || "";
            if (f == "app") {
                var f = b.option,
                    h = alloy.portal.getAllConfig(f.appId);
                if (!(a.isUndefined(h) || h.appLevel && h.appLevel == "system" && !h.quickPanel)) {
                    var g = g = d.getAppIcon(h),
                        f = {
                            appId: f.appId,
                            srcAppId: f.appId,
                            appName: h.appName,
                            appIcon: g,
                            appType: "app",
                            groupType: "single",
                            id: f.appId,
                            name: h.appName,
                            icon: g,
                            win: b
                        }, f = M(f);
                    B.onNewTaskItem(f)
                }
            } else if (f == "chatBox") {
                h = b.option;
                f = h.chatBoxType;
                h = h.userOrGroup;
                g = {
                    appId: t.appId,
                    srcAppId: t.appId,
                    appName: t.appName,
                    appIcon: t.appIcon,
                    appType: "chatBox",
                    groupType: "group",
                    preSiblingAppId: c,
                    win: b
                };
                if (f == "single") g.id = h.uin, g.name = h.markName || h.nick, g.title = g.name + " - " + EQQ.hash.onlineStatusText[h.state], g.icon = alloy.util.getUserAvatar(h.uin);
                else if (f == "group") g.id = h.gid, g.name = h.markName || h.name, g.icon = alloy.util.getGroupAvatar(h.code);
                else if (f == "discu") g.id = h.did, g.name = h.name, g.icon = alloy.util.getDiscuAvatar(h.did);
                if (!p) g.groupId = g.appId, g.appId = g.appId + "_" + g.id;
                B.onNewTaskItem(g);
                f == "single" && R({
                    id: h.uin,
                    state: h.state
                })
            } else if (f == "folder") {
                f = b.option;
                h = alloy.CONST.CDN_URL + "/style/images/filesys/folder.png?t=20111011001";
                f = {
                    appId: r.appId,
                    srcAppId: r.appId,
                    appName: r.appName,
                    appIcon: h,
                    appType: "folder",
                    groupType: "group",
                    preSiblingAppId: c,
                    id: f.windowId,
                    name: f.title,
                    icon: h,
                    win: b
                };
                if (!p) f.groupId = f.appId, f.appId = f.appId + "_" + f.id;
                B.onNewTaskItem(f)
            } else if (f == "diskAdmin") {
                f = b.option;
                h = alloy.CONST.CDN_URL + "/style/images/diskexplorer.png?t=20111011001";
                f = {
                    appId: m.appId,
                    srcAppId: m.appId,
                    appName: m.appName,
                    appIcon: h,
                    appType: "diskAdmin",
                    groupType: "group",
                    preSiblingAppId: c,
                    id: f.windowId,
                    name: f.title,
                    icon: h,
                    win: b
                };
                if (!p) f.groupId = f.appId, f.appId = f.appId + "_" + f.id;
                B.onNewTaskItem(f)
            }
            e.addObserver(b, "close", H);
            e.addObserver(b, "setCurrent", a.bind(Q, this, b))
        }, H = function (a) {
            if (I(a)) B.onRemoveTaskItem(I(a))
        }, Q = function (a) {
            if (a = I(a)) B.onSetCurrent(a),
            G(a.appId, a.id)
        }, J = function () {
            n.resize();
            u.resize()
        }, I = function (a) {
            var b = a.option,
                c = b.taskType || "",
                d = {};
            if (c == "app") d = {
                appId: b.appId,
                id: b.appId
            };
            else if (c == "chatBox") d = {
                appId: t.appId,
                id: a.uin
            };
            else if (c == "folder") d = {
                appId: r.appId,
                id: b.windowId
            };
            else if (c == "diskAdmin") d = {
                appId: m.appId,
                id: b.windowId
            };
            else return !1;
            return M(d)
        }, M = function (a) {
            if (!p) a.appId = a.appId + "_" + a.id;
            return a
        }, K = [],
        U = 1,
        O = function (b) {
            if (a.isUndefined(b.appId)) return !1;
            if (x && x.getAppId() == b.appId && x.getCurrentItemId() == b.id && x.isItemWinShow(b.id)) return !1;
            var c = q(b.appId);
            if (a.isUndefined(c) || a.isUndefined(c.getItem(b.id))) return !1;
            var c = !1,
                f;
            for (f in K) {
                var h = K[f];
                if (h.appId == b.appId && h.id == b.id) {
                    c = !0;
                    break
                }
            }
            c || K.push(b);
            e.notifyObservers(d, "TaskBarNotifyBeatStart")
        }, G = function (a, b) {
            if (!K || K.length < 1) return !1;
            for (var c in K) {
                var f = K[c];
                if (f.appId == a && f.id == b) {
                    L(f);
                    K.splice(c, 1);
                    break
                }
            }
            K.length < 1 && e.notifyObservers(d, "TaskBarNotifyBeatStop")
        }, V = function (a, b) {
            if (!K || K.length < 1) return !1;
            for (var c in K) {
                var d = K[c];
                if (d.appId == a && d.id == b) return !0
            }
            return !1
        },
        N = function () {
            for (var a in K) {
                var b = K[a],
                    c = q(b.appId);
                c && (U == 1 ? c.jumpUp(b.id) : c.jumpDown(b.id))
            }
            U = -U
        }, E = function (a) {
            var b = q(a.appId);
            b && b.jumpUp(a.id)
        }, L = function (a) {
            var b = q(a.appId);
            b && b.jumpDown(a.id)
        };
    this.getAppIcon = function (a) {
        var b = a.id;
        if (alloy.appconfig.isQplusApp(b) && a.icon) return a.icon;
        var a = a.iconUrl || "",
            c = alloy.util.getAppRoot(b) + "images/",
            d = alloy.CONST.PRI_APP_STATIC_URL;
        if (b == "appMarket") return b = alloy.CONST.CDN_URL_0 + "/style/images/appbar_manage.png";
        else if (b == "docViewer") return b =
            alloy.CONST.CDN_URL_0 + "/style/images/docviewer.png";
        else if (b == "imgViewer") return b = alloy.CONST.CDN_URL_0 + "/style/images/imgviewer.png";
        else if (b == "messageCenter") return b = alloy.CONST.CDN_URL_0 + "/style/images/messagecenter.png";
        if (a && a.smallIcon && a.smallIcon.indexOf("priapps") > -1) d = alloy.CONST.PRI_APP_STATIC_URL2;
        var e = a.type || a;
        return b = (e & 10) > 0 ? b > 99999 ? d + a.midIcon : c + "mid.png" : (e & 1) > 0 ? b > 99999 ? d + a.smallIcon : c + "small.png" : alloy.CONST.CDN_URL + "module/appmarket/images/mid.png"
    };
    var R = function (b) {
        if (a.isUndefined(EQQ) ||
            a.isUndefined(EQQ.hash.onlineStatus[b.state])) return !1;
        var c = M({
            appId: t.appId,
            id: b.id
        }),
            c = q(c.appId);
        a.isUndefined(c) || (c = c.getItem(b.id), a.isUndefined(c) || c.getDom().setAttribute("class", "taskItem taskItem_" + EQQ.hash.onlineStatus[b.state]))
    }, W = function (b) {
            var c = M({
                appId: 50,
                id: 50
            }),
                d = q(c.appId);
            a.isUndefined(d) || (c = d.getItem(c.id), a.isUndefined(c) || c.getDom().setAttribute("class", "taskItem taskItem_" + b.state))
        }, P = {
            _default: [{
                text: "\u6700\u5927\u5316",
                onClick: function (a, b, c) {
                    a = c.getArgument();
                    (a = D(a.appId,
                        a.id)) && a.winMax()
                }
            }, {
                text: "\u6700\u5c0f\u5316",
                onClick: function (a, b, c) {
                    a = c.getArgument();
                    (a = D(a.appId, a.id)) && a.winMin()
                }
            }, {
                type: "separator"
            }, {
                text: "\u5173\u95ed",
                onClick: function (a, b, c) {
                    a = c.getArgument();
                    (a = D(a.appId, a.id)) && a.close()
                }
            }],
            _defaultNoMax: [{
                text: "\u6700\u5c0f\u5316",
                onClick: function (a, b, c) {
                    a = c.getArgument();
                    (a = D(a.appId, a.id)) && a.winMin()
                }
            }, {
                type: "separator"
            }, {
                text: "\u5173\u95ed",
                onClick: function (a, b, c) {
                    a = c.getArgument();
                    (a = D(a.appId, a.id)) && a.close()
                }
            }],
            _defaultGroup: [{
                text: "\u6700\u5c0f\u5316\u7ec4",
                onClick: function (a, b, c) {
                    a = c.getArgument();
                    d.getTask(a.appId).winMin()
                }
            }, {
                type: "separator"
            }, {
                text: "\u5173\u95ed\u7ec4",
                onClick: function (a, b, c) {
                    a = c.getArgument();
                    a = d.getTask(a.appId);
                    s = !0;
                    a.close();
                    s = !1;
                    n.resize()
                }
            }]
        }, T = function (b, c) {
            if (a.isUndefined(b)) return !1;
            var d = b,
                e = [];
            if (a.isUndefined(c)) e = P[d], a.isUndefined(e) && (e = P._defaultGroup);
            else if (d += "_" + c, e = P[d], d.indexOf("50_") > -1 && alloy.portal.getLoginLevel() == alloy.CONST.LOGIN_LEVEL_ALL && (e = !1), a.isUndefined(e)) {
                d = D(b, c);
                e = !0;
                try {
                    e = d.getWin().option.hasMaxButton
                } catch (f) {}
                e =
                    e ? P._default : P._defaultNoMax
            }
            return !e ? !1 : e
        }, $ = function () {
            n.setDockMargin();
            n.resize()
        }
});
Jx().$package("alloy.rpcService", function (a) {
    var d = this,
        b = a.dom,
        e = a.event,
        g, j, l = 0,
        p, o = new a.Class({
            init: function (a) {
                this._ajaxRequestInstant = a
            },
            send: function (b, d) {
                d = d || {};
                d.cacheTime = d.cacheTime || 0;
                d.onSuccess = d.onSuccess || function () {};
                d.onError = d.onError || function () {};
                d.onTimeout = d.onTimeout || function () {};
                d.onComplete = d.onComplete || function () {};
                var e = {
                    iframeName: d.iframeName,
                    method: d.method || "GET",
                    contentType: d.contentType || "",
                    enctype: d.enctype || "",
                    data: d.data || {},
                    param: d.param || {},
                    arguments: d.arguments || {},
                    context: d.context || null,
                    timeout: d.timeout || 3E4,
                    onSuccess: function (b) {
                        var b = b.responseText || "-",
                            c = {};
                        try {
                            c = a.json.parse(b)
                        } catch (e) {
                            a.error("alloy.rpcservice: JSON \u683c\u5f0f\u51fa\u9519", "HttpRequest")
                        }
                        c.arguments = d.arguments || {};
                        d.onSuccess.call(d.context, c)
                    },
                    onError: function (a) {
                        d.onError.call(d.context, a)
                    },
                    onTimeout: function () {
                        var a = {};
                        a.arguments = d.arguments || {};
                        d.onTimeout.call(d.context, a)
                    },
                    onComplete: function () {
                        var a = {};
                        a.arguments = d.arguments || {};
                        d.onComplete.call(d.context, a)
                    }
                };
                alloy.portal.recoverCookie();
                e.data = a.string.toQueryString(e.data);
                if (e.method == "GET") {
                    var f = e.data;
                    d.cacheTime === 0 && (f += f ? "&t=" + (new Date).getTime() : "t=" + (new Date).getTime());
                    f && (b = b + "?" + f);
                    e.data = null
                } else e.contentType = "application/x-www-form-urlencoded", b.indexOf("?");
                this._ajaxRequestInstant(b, e)
            }
        }),
        s = new a.Class({
            init: function (c, e) {
                var f = "qqweb_proxySendIframe_" + c,
                    g = this,
                    k;
                this.iframeName = f;
                this._ajaxCallbacks = [];
                this._proxyAjaxSend = this._proxySend = null;
                e += (/\?/.test(e) ? "&" : "?") + "id=" + c;
                a.out("ProxyRequest >>>>> init: " +
                    e, "ProxyRequest");
                var j = function () {
                    var b = window.frames[f];
                    a.out("ProxyRequest >>>>> load: " + b.location.href, "ProxyRequest");
                    try {
                        if (b.ajax) {
                            g._proxyAjaxSend = b.ajax;
                            for (var c = g._ajaxCallbacks, b = 0, d = c.length; b < d; b++) g.proxySend(c[b].url, c[b].option);
                            g._ajaxCallbacks = []
                        } else a.warn("ProxyRequest >>>>> ajaxProxy error: ajax is undefined!!!!", "ProxyRequest"), alloy.util.report2h("proxyrequest_error", "start")
                    } catch (e) {
                        a.error("ProxyRequest >>>>> ajaxProxy error: " + e.message + " !!!!", "ProxyRequest"), alloy.util.report2h("proxyrequest_error2",
                            "start")
                    }
                };
                k = document.body;
                var l = b.node("div", {
                    "class": "hiddenIframe"
                });
                l.innerHTML = '<iframe id="' + f + '" class="hiddenIframe" name="' + f + '" src="' + e + '" width="1" height="1"></iframe>';
                k.appendChild(l);
                k = b.id(f);
                this.id = c;
                this.onAjaxFrameLoad = j;
                d.onAjaxFrameLoad2 = j;
                a.browser.firefox && k.setAttribute("src", e)
            },
            send: function (a, b) {
                this._proxyAjaxSend ? (this.proxySend(a, b), this.send = this.proxySend) : this._ajaxCallbacks.push({
                    url: a,
                    option: b
                })
            },
            proxySend: function (a, b) {
                if (!this._proxySend) this._proxySend = new o(this._proxyAjaxSend);
                b.iframeName = this.iframeName;
                this._proxySend.send(a, b)
            }
        }),
        v = new a.Class({
            init: function (c, d) {
                var f = "qqweb_proxySendIframe" + c;
                this.iframeName = f;
                var g = this;
                this._ajaxCallbacks = [];
                this._proxyAjaxSend = this._proxySend = null;
                a.out("ProxyRequest >>>>> init: " + d, "ProxyRequest");
                var k = document.body,
                    j = b.node("div", {
                        "class": "hiddenIframe"
                    });
                j.innerHTML = '<iframe id="' + f + '" class="hiddenIframe" name="' + f + '" src="' + d + '" width="1" height="1"></iframe>';
                k.appendChild(j);
                proxyIframe = b.id(f);
                e.on(proxyIframe, "load",
                    function () {
                        g._proxyAjaxSend = g.cfProxySend;
                        for (var a = g._ajaxCallbacks, b = 0, c = a.length; b < c; b++) g.proxySend(a[b].url, a[b].option);
                        g._ajaxCallbacks = []
                    });
                proxyIframe.setAttribute("src", d)
            },
            send: function (a, b) {
                this._proxyAjaxSend ? (this.proxySend(a, b), this.send = this.proxySend) : this._ajaxCallbacks.push({
                    url: a,
                    option: b
                })
            },
            proxySend: function (a, b) {
                if (!this._proxySend) this._proxySend = new o(this._proxyAjaxSend);
                b.iframeName = this.iframeName;
                this._proxySend.send(a, b)
            },
            cfProxySend: function (c, d) {
                var e = r++;
                m[e] = d;
                c =
                    c.replace("http://", "https://");
                e = a.json.stringify({
                    id: e,
                    option: {
                        method: d.method || "GET",
                        data: d.data || null,
                        isAsync: d.isAsync || !0,
                        timeout: d.timeout,
                        contentType: d.contentType || "",
                        type: d.type,
                        uri: c
                    },
                    uri: c,
                    iframeName: d.iframeName,
                    host: alloy.CONST.MAIN_URL,
                    timestamp: +new Date
                });
                RegExp(/(^http(s)?:\/\/[\w\.]+)\//).test(c);
                var f = RegExp.$1;
                if (!a.isUndefined(window.postMessage) && !a.browser.ie) window.frames[d.iframeName].postMessage(e, f);
                else {
                    var g = b.node("div");
                    g.innerHTML = '<iframe class="hiddenCFProxy" name="' +
                        encodeURIComponent(e) + '" src="' + (f + "/app.rpc.proxy.html") + '" onload="alloy.rpcService.removeCF(this)"></iframe>';
                    document.body.appendChild(g)
                }
            }
        });
    this.rpcProxyCallback = function (b) {
        var b = a.json.parse(decodeURIComponent(b)),
            d = b.type,
            e = b.id,
            f = m[e];
        delete m[e];
        if (f) f[d](b.option)
    };
    var w = function (a) {
        d.rpcProxyCallback(encodeURIComponent(a.data))
    };
    if (!a.isUndefined(window.postMessage)) window.addEventListener ? window.addEventListener("message", w, !1) : window.attachEvent ? window.attachEvent("onmessage", w) : window.onmessage =
        w;
    this.removeCF = function (a) {
        a && window.setTimeout(function () {
            var b = a.parentNode;
            b.parentNode.removeChild(b)
        }, 1E3)
    };
    var t = new a.Class({
        init: function () {
            this._proxyArr = {};
            this._cFproxyArr = {};
            this._proxyId = 1
        },
        getProxyId: function () {
            return this._proxyId++
        },
        getProxy: function (a) {
            var b = this._proxyArr[a];
            b || (b = new s(this.getProxyId(), a), this._proxyArr[a] = b);
            return b
        },
        getProxyById: function (a) {
            for (var b in this._proxyArr)
                if (this._proxyArr[b].id == a) return this._proxyArr[b];
            return null
        },
        getCfProxy: function (a) {
            var a =
                a.replace("proxy.html", "cfproxy.html").replace("http://", "https://"),
                b = this._cFproxyArr[a];
            b || (b = new v(this.getProxyId(), a), this._cFproxyArr[a] = b);
            return b
        }
    }),
        r = 0,
        m = {};
    this.selfSend = function (b, d) {
        g || (g = new o(a.http.ajax));
        g.send(b, d)
    };
    this.proxySend = function (a, b, d, e) {
        j || (j = new t);
        d = d || alloy.CONST.API_PROXY_URL;
        d += (/\?/.test(d) ? "&" : "?") + "callback=1";
        (e ? j.getCfProxy(d) : j.getProxy(d)).send(a, b)
    };
    this.sSend = this.send = function (a, b, e) {
        e = e || alloy.CONST.API_PROXY_URL;
        d.proxySend(a, b, e)
    };
    this.cgiSend = function (a,
        b, e) {
        e = e || alloy.CONST.JAVA_CGI_PROXY_URL;
        d.proxySend(a, b, e)
    };
    this.eqqSend = function (a, b, e, f) {
        e = e || alloy.CONST.JAVA_CGI_PROXY_URL;
        d.proxySend(a, b, e, f)
    };
    this.psSend = function (a, b, e) {
        e = e || alloy.CONST.PS_PROXY_URL;
        d.proxySend(a, b, e)
    };
    this.upSend = function (a, b, e) {
        e = e || alloy.CONST.JAVA_UP_CGI_PROXY_URL;
        d.proxySend(a, b, e)
    };
    this.onAjaxFrameLoad = function (b) {
        if (a.isUndefined(b)) this.onAjaxFrameLoad2();
        else(b = j.getProxyById(b)) && b.onAjaxFrameLoad()
    };
    var f = {
        _iframes: [],
        _tick: 0,
        _select: function () {
            this._tick++;
            return this._iframes[(this._tick -
                1) % this._len]
        },
        init: function (a) {
            if (this._isInit != !0) {
                this._len = a;
                for (var d = document.body, e, f = 0; f < a; f++) e = b.node("div", {
                    "class": "RPCService_hDiv"
                }), b.hide(e), e.innerHTML = '<iframe id="RPCService_hIframe_' + f + '" name="RPCService_hIframe_' + f + '" src="' + alloy.CONST.MAIN_URL + 'domain.html"></iframe>', d.appendChild(e), this._iframes[f] = [e, null, "RPCService_hIframe_" + f];
                this._isInit = !0
            }
        },
        take: function (a) {
            var b = this._select();
            b[1] && b[0].removeChild(b[1]);
            a.setAttribute("target", b[2]);
            b[1] = a;
            b[0].appendChild(a)
        }
    };
    this.formSend = function (a, d) {
        f.init(2);
        var e = {
            method: d.method || "GET",
            enctype: d.enctype || "",
            data: d.data || {},
            onSuccess: d.onSuccess || function () {},
            onError: d.onError || function () {},
            onComplete: d.onComplete || function () {},
            onTimeout: d.onTimeout || function () {},
            timeout: d.timeout ? d.timeout : 1E4
        }, g = b.node("form", {
                "class": "RPCService_form",
                method: e.method,
                action: a + "?t=" + (new Date).getTime(),
                enctype: e.enctype
            });
        if (Object.prototype.toString.call(e.data).indexOf("String") > -1) {
            var k = b.node("input");
            k.type = "text";
            k.name =
                e.data;
            g.appendChild(k)
        } else
            for (var j in e.data) k = b.node("input"), k.type = "text", k.name = j, k.setAttribute("value", e.data[j]), g.appendChild(k);
        f.take(g);
        g.submit()
    };
    this.sendGetVfWebQQ = function (b, d, f) {
        alloy.portal.getTryUin() && alloy.portal.getSkey() ? (alloy.portal.speedTest.sRTS(1, "start", new Date), this.send(alloy.CONST.API_SERVER_URL + "get_vfwebqq2", {
            context: this,
            data: {},
            arguments: {
                uin: b
            },
            onSuccess: d || function (b) {
                b.retcode === 0 && b.result && b.result.length === 2 && b.result[0] == "vfwebqq" ? (a.out(":GetVfWebQQSuccess..."),
                    e.notifyObservers(this, "GetVfWebQQSuccess", b)) : (a.out("[sendGetVfWebQQ\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: " + b.retcode + "-" + b.errmsg), e.notifyObservers(this, "GetVfWebQQError", b));
                alloy.portal.speedTest.sRTS(1, "end", new Date, !0);
                alloy.portal.speedTest.sRTS(4, "start", new Date);
                alloy.portal.speedTest.sRTS(5, "start", new Date)
            },
            onError: f || function (b) {
                a.out("\u83b7\u53d6\u4e00\u4e2a\u4eba\u7684\u767b\u5f55\u4fe1\u606f\u5931\u8d25");
                e.notifyObservers(this, "GetVfWebQQError", b);
                alloy.portal.speedTest.sRTS(1,
                    "end", new Date, !0)
            }
        })) : e.notifyObservers(this, "GetVfWebQQError", {})
    };
    this.sendGetSeftInfo = function (b, d, f) {
        alloy.portal.getTryUin() && alloy.portal.getSkey() ? (alloy.portal.speedTest.sRTS(1, "start", new Date), this.send(alloy.CONST.API_SERVER_URL + "get_self_info2", {
            context: this,
            data: {},
            arguments: {
                uin: b
            },
            timeout: 2E4,
            onSuccess: d || function (b) {
                b.retcode === 0 && b.result ? (alloy.util.report2qqweb("config|vfwebqq|success"), a.out(":GetVfWebQQSuccess..."), e.notifyObservers(this, "GetVfWebQQSuccess", b), e.notifyObservers(this,
                    "GetUserInfoSuccess", b)) : (a.out("[sendGetVfWebQQ\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: " + b.retcode + "-" + b.errmsg), e.notifyObservers(this, "GetVfWebQQError", b));
                alloy.portal.speedTest.sRTS(1, "end", new Date, !0);
                alloy.portal.speedTest.sRTS(4, "start", new Date);
                alloy.portal.speedTest.sRTS(5, "start", new Date)
            },
            onError: f || function (b) {
                a.out("\u83b7\u53d6\u4e00\u4e2a\u4eba\u7684\u767b\u5f55\u4fe1\u606f\u5931\u8d25");
                alloy.util.report2qqweb("config|vfwebqq|error");
                timeoutConfirm("\u83b7\u53d6\u4e2a\u4eba\u767b\u5f55\u4fe1\u606f\u5931\u8d25,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f(\u70b9\u51fb\u53d6\u6d88\u5c06\u4ee5\u6e38\u5ba2\u6001\u767b\u5f55)") ||
                    e.notifyObservers(this, "GetVfWebQQError", b);
                alloy.portal.speedTest.sRTS(1, "end", new Date, !0)
            },
            onTimeout: function () {
                alloy.util.report2qqweb("config|vfwebqq|timeout");
                timeoutConfirm("\u83b7\u53d6\u4e2a\u4eba\u767b\u5f55\u4fe1\u606f\u8d85\u65f6,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f(\u70b9\u51fb\u53d6\u6d88\u5c06\u4ee5\u6e38\u5ba2\u6001\u767b\u5f55)") || e.notifyObservers(this, "GetVfWebQQError");
                alloy.util.report2h("get_vfwebqq", "timeout")
            }
        })) : e.notifyObservers(this, "GetVfWebQQError", {})
    };
    var k, q =
            function (c, d) {
                k = alloy.layout.messagebox('<div style="width:100%; height:100%; line-height:30px;">\t\t\t\t\t\t<div style ="text-align: left; padding-left: 10px;">\t\t\t\t\t\t\t<div>\u4e3a\u4e86\u60a8\u7684\u8d26\u53f7\u5b89\u5168\uff0c\u8bf7\u6267\u884c\u8eab\u4efd\u9a8c\u8bc1\uff0c\u5728\u8f93\u5165\u6846\u8f93\u5165\u4e0b\u56fe\u4e2d\u7684\u9a8c\u8bc1\u7801</div>\t\t\t\t\t\t\t<div>\u9a8c\u8bc1\u7801:&nbsp&nbsp<input id="verify_input_code" type="text" style="vertical-align:middle;" />&nbsp;&nbsp;<span id="buddyfinder_code_gf" style="color:red"></span></div>\t\t\t\t\t\t\t<img style="float:left;margin-right:10px" id="verify_img_code" src="" />\t\t\t\t\t\t\t<a style="display:inline;line-height:60px;" id="verify_a_code" alt="\u770b\u4e0d\u6e05\u6362\u4e00\u5f20" href="">\u770b\u4e0d\u6e05\u6362\u4e00\u5f20</a>\t\t\t\t\t\t\t<div id="verify_img_code_wrong" style="display:none;color:red;width:65px;">\u9a8c\u8bc1\u7801\u9519\u8bef</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>', {
                    title: "\u8eab\u4efd\u9a8c\u8bc1",
                    resize: !0,
                    width: 380,
                    height: 123,
                    hasOkButton: !0,
                    windowType: "EqqWindow",
                    isSetCentered: !0
                });
                var f = b.id("verify_img_code"),
                    g = b.id("verify_a_code"),
                    j = b.id("verify_input_code"),
                    l = null;
                e.on(f, "load", function () {
                    l = a.cookie.get("verifysession", alloy.CONST.MAIN_DOMAIN)
                });
                e.on(g, "click", function (a) {
                    a.preventDefault();
                    b.id("verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&" + Math.random()
                });
                e.addObserver(k, "clickOkButton", function () {
                    var a = j.value;
                    if (a && l) return d(c,
                        a, l), !1;
                    j.focus();
                    b.id("verify_input_code").innerHTML = "\u8bf7\u5148\u8f93\u5165\u9a8c\u8bc1\u7801\uff01";
                    return !1
                });
                j.focus();
                e.on(j, "keydown", function (a) {
                    a.keyCode == 13 && e.notifyObservers(k, "clickOkButton") && setTimeout(function () {
                        k.close()
                    }, 0)
                });
                b.id("verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&" + Math.random()
        };
    this.sendGetUserInfo = function (a, f, g, j) {
        this.send(alloy.CONST.API_SERVER_URL + "get_friend_info2", {
            context: this,
            data: {
                tuin: a,
                verifysession: g || "",
                code: f || "",
                vfwebqq: alloy.portal.getVfWebQQ()
            },
            arguments: {
                uin: a
            },
            onSuccess: function (f) {
                f.retcode === 0 ? (setTimeout(function () {
                    try {
                        k && k.close()
                    } catch (a) {}
                }, 0), j ? j.call(this, f) : e.notifyObservers(this, "GetUserInfoSuccess", f)) : f.retcode === 1E3 ? q(a, function (a, b, c) {
                    d.sendGetUserInfo(a, b, c, j)
                }) : f.retcode === 1001 ? (b.id("verify_img_code_wrong").style.display = "inline", b.id("verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&" + Math.random(), b.id("verify_input_code").value = "", b.id("verify_input_code").focus()) : (setTimeout(function () {
                        try {
                            k && k.close()
                        } catch (a) {}
                    },
                    0), e.notifyObservers(this, "GetUserInfoError", f))
            },
            onError: function (a) {
                e.notifyObservers(this, "GetUserInfoError", a)
            }
        })
    };
    this.sendGetSingleInfo = function (a, f, g, j) {
        !f || !g ? q(a, function (a, b, c) {
            d.sendGetSingleInfo(a, b, c, j)
        }) : this.send(alloy.CONST.API_SERVER_URL + "get_single_info2", {
            context: this,
            data: {
                tuin: a,
                verifysession: g || "",
                code: f || "",
                vfwebqq: alloy.portal.getVfWebQQ()
            },
            arguments: {
                uin: a
            },
            onSuccess: function (f) {
                f.retcode === 0 ? (f.result.uin = f.result.tuin, setTimeout(function () {
                        try {
                            k && k.close()
                        } catch (a) {}
                    }, 0),
                    j ? j.call(this, f) : e.notifyObservers(this, "GetUserInfoSuccess", f)) : f.retcode === 1E3 ? q(a, function (a, b, c) {
                    d.sendGetSingleInfo(a, b, c, j)
                }) : f.retcode === 1001 ? (b.id("verify_img_code_wrong").style.display = "inline", b.id("verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&" + Math.random(), b.id("verify_input_code").value = "", b.id("verify_input_code").focus()) : (setTimeout(function () {
                    try {
                        k && k.close()
                    } catch (a) {}
                }, 0), e.notifyObservers(this, "GetUserInfoError", f))
            },
            onError: function (a) {
                e.notifyObservers(this,
                    "GetUserInfoError", a)
            }
        })
    };
    this.sendGetUserInfo_with_code = function (c, f, g, j, l) {
        f = f || "";
        this.send(alloy.CONST.API_SERVER_URL + "get_stranger_info2", {
            context: this,
            data: {
                tuin: c,
                verifysession: g || "",
                gid: 0,
                code: f,
                vfwebqq: alloy.portal.getVfWebQQ()
            },
            arguments: {
                uin: c,
                code: f
            },
            onSuccess: j || function (a) {
                a.retcode === 0 ? (setTimeout(function () {
                    try {
                        k && k.close()
                    } catch (a) {}
                }, 0), j && j.call(this, a), e.notifyObservers(this, "GetUserInfoSuccess", a)) : a.retcode === 1E3 ? q(c, function (a, b, c) {
                    d.sendGetUserInfo_with_code(a, b, c)
                }) : a.retcode ===
                    1001 ? (b.id("verify_img_code_wrong").style.display = "inline", b.id("verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&" + Math.random(), b.id("verify_input_code").value = "", b.id("verify_input_code").focus()) : (setTimeout(function () {
                        try {
                            k && k.close()
                        } catch (a) {}
                    }, 0), e.notifyObservers(this, "GetUserInfoError", a))
            },
            onError: l || function (b) {
                a.out("\u83b7\u53d6\u4e00\u4e2a\u4eba\u7684\u4fe1\u606f\u5931\u8d25");
                e.notifyObservers(this, "GetUserInfoError", b)
            }
        })
    };
    this.sendGetFriendUin2 = function (c, f, g, j,
        l, m) {
        this.send(alloy.CONST.API_SERVER_URL + "get_friend_uin2", {
            context: this,
            data: {
                tuin: c,
                verifysession: l || "",
                type: f,
                code: j || "",
                vfwebqq: alloy.portal.getVfWebQQ()
            },
            arguments: {
                uin: c
            },
            onSuccess: function (a) {
                a.retcode === 0 ? (m || setTimeout(function () {
                    try {
                        k && k.close()
                    } catch (a) {}
                }, 0), g && g(a), e.notifyObservers(this, "GetFriendUinSuccess", a)) : a.retcode === 1E3 ? q(c, function (a, b, c) {
                    d.sendGetFriendUin2(a, f, g, b, c)
                }) : a.retcode === 1001 ? (b.id("verify_img_code_wrong").style.display = "inline", b.id("verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&" +
                    Math.random(), b.id("verify_input_code").value = "", b.id("verify_input_code").focus()) : (setTimeout(function () {
                    try {
                        k && k.close()
                    } catch (a) {}
                }, 0), e.notifyObservers(this, "GetFriendUinError", a))
            },
            onError: function (b) {
                a.out("\u83b7\u53d6\u4e00\u4e2a\u4eba\u7684uin\u5931\u8d25");
                e.notifyObservers(this, "GetFriendUinError", b)
            }
        })
    };
    this.sendModifyMyDetails = function (b) {
        b.vfwebqq = alloy.portal.getVfWebQQ();
        this.send(alloy.CONST.API_SERVER_URL + "modify_my_details2", {
            context: this,
            method: "POST",
            data: {
                r: a.json.stringify(b)
            },
            arguments: {},
            onSuccess: function (b) {
                b.retcode === 0 ? (a.out(":ModifyMyDetailsSuccess..."), e.notifyObservers(this, "ModifyMyDetailsSuccess", b)) : (a.out("[sendModifyMyDetails\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: " + b.retcode + "-" + b.errmsg), e.notifyObservers(this, "ModifyMyDetailsError", b))
            },
            onError: function (b) {
                a.out("\u4fee\u6539\u81ea\u5df1\u7684\u7684\u8be6\u7ec6\u8d44\u6599\u5931\u8d25");
                e.notifyObservers(this, "ModifyMyDetailsError", b)
            }
        })
    };
    this.sendModifyMyAvatar = function (b) {
        b.vfwebqq = alloy.portal.getVfWebQQ();
        this.send(alloy.CONST.API_SERVER_URL + "modify_my_head", {
            context: this,
            method: "POST",
            data: {
                r: a.json.stringify(b)
            },
            arguments: {},
            onSuccess: function (a) {
                a.retcode === 0 ? e.notifyObservers(this, "ModifyMyAvatarSuccess", a) : e.notifyObservers(this, "ModifyMyAvatarError", a)
            },
            onError: function (a) {
                e.notifyObservers(this, "ModifyMyAvatarError", a)
            }
        })
    };
    this.sendGetGroupInfoByGid = function (b) {
        this.send(alloy.CONST.API_SERVER_URL + "get_group_info_ext2", {
            context: this,
            data: {
                gcode: b,
                vfwebqq: alloy.portal.getVfWebQQ()
            },
            arguments: {
                gcode: b
            },
            onSuccess: function (b) {
                b.retcode === 0 ? (a.out(":GetUserInfoSuccess..."), e.notifyObservers(this, "GetGroupInfoByGidSuccess", b)) : (a.out("[sendGetUserInfo\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: " + b.retcode + "-" + b.errmsg), e.notifyObservers(this, "GetGroupInfoByGidError", b))
            },
            onError: function (b) {
                a.out("\u83b7\u53d6\u7fa4\u7684\u4fe1\u606f\u5931\u8d25");
                e.notifyObservers(this, "GetUserInfoError", b)
            }
        })
    };
    this.sendGetGroupPublicInfo = function (b, d, f, g) {
        this.send(alloy.CONST.API_SERVER_URL + "get_group_public_info2", {
            context: this,
            data: {
                gcode: b,
                vfwebqq: alloy.portal.getVfWebQQ()
            },
            arguments: d || {
                gcode: b
            },
            onSuccess: f || function (b) {
                b.retcode === 0 ? (a.out(":GetGroupPublicInfoSuccess..."), e.notifyObservers(this, "GetGroupPublicInfoSuccess", b)) : (a.out("[GetGroupPublicInfoError\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: " + b.retcode + "-" + b.errmsg), e.notifyObservers(this, "GetGroupPublicInfoError", b))
            },
            onError: g || function (b) {
                a.out("\u83b7\u53d6\u7fa4\u7684\u516c\u5171\u4fe1\u606f\u5931\u8d25");
                e.notifyObservers(this, "GetGroupPublicInfoError",
                    b)
            }
        })
    };
    this.sendGetGCardInfo = function (b) {
        this.send(alloy.CONST.API_SERVER_URL + "get_self_business_card2", {
            context: this,
            data: {
                gcode: b,
                vfwebqq: alloy.portal.getVfWebQQ()
            },
            arguments: {
                gcode: b
            },
            onSuccess: function (b) {
                b.retcode === 0 ? (a.out(":GetGCardInfoSuccess..."), e.notifyObservers(this, "GetGCardInfoSuccess", b)) : (a.out("[sendGetUserInfo\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: " + b.retcode + "-" + b.errmsg), e.notifyObservers(this, "GetGCardInfoError", b))
            },
            onError: function (b) {
                a.out("\u83b7\u53d6\u7fa4\u7684\u4fe1\u606f\u5931\u8d25");
                e.notifyObservers(this, "GetGCardInfoError", b)
            }
        })
    };
    this.sendGetBuddyList = function (b, d, f) {
        b = b || {};
        b.vfwebqq = alloy.portal.getVfWebQQ();
        alloy.portal.speedTest.sRTS(3, "start", new Date);
        this.send(alloy.CONST.API_SERVER_URL + "get_user_friends2", {
            context: this,
            arguments: b,
            method: "POST",
            data: {
                r: a.json.stringify(b)
            },
            onSuccess: d || function (b) {
                if (b.retcode === 0) {
                    for (var c = b.result.categories || [], d = !1, f = 0; f < c.length; f++) c[f].index == 0 && (d = !0);
                    d || c.unshift({
                        index: 0,
                        name: "\u6211\u7684\u597d\u53cb"
                    });
                    a.out(":GetBuddyListSuccess...1");
                    e.notifyObservers(this, "GetBuddyListSuccess", b.result);
                    a.out(":GetBuddyListSuccess...2")
                } else a.out("[sendGetBuddyList] error: " + b.retcode + "-" + b.errmsg), e.notifyObservers(this, "GetBuddyListError", b), a.out("[sendGetBuddyList] error: end")
            },
            onError: f || function (b) {
                a.out("\u597d\u53cb\u5217\u8868\u5931\u8d25");
                e.notifyObservers(this, "GetBuddyListError", b)
            }
        })
    };
    this.sendBatchGetVipInfo = function (b, d, f, g) {
        param = {};
        param.ul = a.json.stringify(b);
        param.vfwebqq = alloy.portal.getVfWebQQ();
        this.send(alloy.CONST.API_SERVER_URL +
            "batch_get_vipinfo", {
                context: this,
                arguments: d || param,
                method: "POST",
                data: param,
                onSuccess: f || function (b) {
                    b.retcode === 0 ? e.notifyObservers(this, "BatchGetVipInfoSuccess", b.result) : (a.out("\u6279\u91cf\u62c9\u53d6\u4f1a\u5458\u4fe1\u606f\u5931\u8d25"), e.notifyObservers(this, "BatchGetVipInfoError", b))
                },
                onError: g || function (b) {
                    a.out("\u6279\u91cf\u62c9\u53d6\u4f1a\u5458\u4fe1\u606f\u51fa\u9519");
                    e.notifyObservers(this, "BatchGetVipInfoError", b)
                }
            })
    };
    this.sendGetGroupList = function (b, d, f) {
        b = b || {};
        b.vfwebqq = alloy.portal.getVfWebQQ();
        this.send(alloy.CONST.API_SERVER_URL + "get_group_name_list_mask2", {
            context: this,
            arguments: b,
            method: "POST",
            data: {
                r: a.json.stringify(b)
            },
            onSuccess: d || function (b) {
                b.retcode === 0 ? (e.notifyObservers(this, "GetGroupListSuccess", b.result), a.out(":GetGroupListSuccess...")) : (a.out("[sendGetGroupList] error: " + b.retcode + "-" + b.errmsg), e.notifyObservers(this, "GetGroupListError", b))
            },
            onError: f || function (b) {
                a.out("\u7fa4\u5217\u8868\u5931\u8d25");
                e.notifyObservers(this, "GetGroupListError", b)
            }
        })
    };
    this.sendGetRecentList =
        function (b, d, f) {
            b = b || {};
            b.vfwebqq = alloy.portal.getVfWebQQ();
            this.send(alloy.CONST.API_SERVER_URL + "get_recent_contact2", {
                context: this,
                method: "POST",
                data: {
                    r: a.json.stringify(b)
                },
                onSuccess: d || function (b) {
                    b.retcode === 0 ? (e.notifyObservers(this, "GetRecentListSuccess", b.result), a.out(":GetRecentListSuccess...")) : (a.out("[sendGetRecentList] error: " + b.retcode + "-" + b.errmsg), e.notifyObservers(this, "GetRecentListError", b))
                },
                onError: f || function (b) {
                    a.out("\u6700\u8fd1\u8054\u7cfb\u4eba\u5217\u8868\u5931\u8d25");
                    e.notifyObservers(this, "GetRecentListError", b)
                }
            })
    };
    this.sendChangeGroupMask = function () {};
    this.sendGetGroupInfo = function (b, d, f) {
        b = b || {};
        b.vfwebqq = alloy.portal.getVfWebQQ();
        this.send(alloy.CONST.API_SERVER_URL + "get_group_info_ext2", {
            context: this,
            data: b,
            arguments: b,
            onSuccess: d || function (b) {
                b.retcode === 0 ? (a.out(":GetGroupInfoSuccess 1..."), e.notifyObservers(this, "GetGroupInfoSuccess", b.result), a.out(":GetGroupInfoSuccess 2...")) : (a.out("[sendGetGroupInfo] error: " + b.retcode + "-" + b.errmsg), e.notifyObservers(this,
                    "GetGroupInfoError", b))
            },
            onError: f || function (b) {
                a.out("\u7fa4\u8d44\u6599\u5931\u8d25");
                e.notifyObservers(this, "GetGroupInfoError", b)
            }
        })
    };
    this.sendGetQQAllow = function (a, b) {
        this.send(alloy.CONST.API_SERVER_URL + "get_allow_info2", {
            context: this,
            method: "GET",
            data: {
                tuin: a,
                retainKey: "allow",
                vfwebqq: alloy.portal.getVfWebQQ()
            },
            arguments: {
                uin: a
            },
            onSuccess: b || function () {},
            onError: function () {}
        })
    };
    this.sendGetQQLevel = function (b) {
        this.send(alloy.CONST.API_SERVER_URL + "get_qq_level2", {
            context: this,
            method: "GET",
            data: {
                tuin: b,
                vfwebqq: alloy.portal.getVfWebQQ()
            },
            arguments: {
                uin: b
            },
            onSuccess: function (b) {
                b.retcode === 0 ? (a.out(":GetQQLevelSuccess 1..."), e.notifyObservers(d, "GetQQLevelSuccess", b), a.out(":GetQQLevelSuccess 2...")) : (a.out("[sendGetQQLevel] error: " + b.retcode + "-" + b.errmsg), e.notifyObservers(d, "GetQQLevelError", b))
            },
            onError: function (b) {
                a.out("QQ\u7b49\u7ea7\u62c9\u53bb\u5931\u8d25");
                e.notifyObservers(d, "GetQQLevelError", b)
            }
        })
    };
    this.sendSetSignature = function (b) {
        alloy.rpcService.send(alloy.CONST.API_SERVER_URL + "set_long_nick2", {
            context: d,
            method: "POST",
            data: {
                r: a.json.stringify({
                    nlk: b,
                    vfwebqq: alloy.portal.getVfWebQQ()
                })
            },
            arguments: {
                nlk: b
            },
            onSuccess: function (f) {
                f.retcode === 0 ? e.notifyObservers(d, "SetBuddySignatureSuccess", b) : (e.notifyObservers(d, "SetBuddySignatureError", b), a.error("[sendSetSelfSignature] error: " + f.retcode + "-" + f.errmsg))
            }
        })
    };
    this.sendGetSignature = function (b) {
        this.send(alloy.CONST.API_SERVER_URL + "get_single_long_nick2", {
            context: this,
            method: "GET",
            data: {
                tuin: b,
                vfwebqq: alloy.portal.getVfWebQQ()
            },
            arguments: {
                uin: b
            },
            onSuccess: function (b) {
                b.retcode === 0 ? e.notifyObservers(d, "GetBuddySignatureSuccess", b) : a.out("[sendGetSignature] error: " + b.retcode + "-" + b.errmsg)
            },
            onError: function () {
                a.out(" sendGetSignatureError")
            }
        })
    };
    this.sendGetMultiSignature = function (b) {
        this.send(alloy.CONST.API_SERVER_URL + "get_long_nick", {
            context: this,
            method: "GET",
            data: {
                tuin: b,
                vfwebqq: alloy.portal.getVfWebQQ()
            },
            onSuccess: function (b) {
                b.retcode === 0 ? e.notifyObservers(d, "GetMultiBuddySignatureSuccess", b) : a.out("[sendGetSignature] error: " + b.retcode +
                    "-" + b.errmsg)
            },
            onError: function () {
                a.out(" sendGetSignatureError")
            }
        })
    };
    this.sendGetTipsInfo = function (b) {
        b = b || {};
        alloy.rpcService.selfSend(alloy.CONST.MAIN_URL + "web2/get_msg_tip", {
            context: d,
            method: "GET",
            data: {
                uin: b.uin || "",
                tp: b.tp || 1,
                id: b.id || 0,
                retype: b.retype || 1,
                rc: b.rc || 0,
                lv: alloy.portal.getLoginLevel() || ""
            },
            onSuccess: b.onSuccess ? b.onSuccess : function (b) {
                b.c === 0 ? e.notifyObservers(d, "GetTipsInfoSuccess", b) : b.c !== 1 && a.error("[sendGetTipsInfo] error!")
            }
        })
    };
    this._sendQuitGroup = function (b) {
        alloy.rpcService.send(alloy.CONST.API_SERVER_URL +
            "quit_group2", {
                context: this,
                method: "POST",
                data: {
                    r: a.json.stringify(b)
                },
                arguments: b,
                onSuccess: function (b) {
                    b.retcode === 0 ? (a.out(":sendQuitGroup..."), e.notifyObservers(alloy.rpcService, "sendQuitGroupSuccess", b)) : (a.out("[sendModifyMyDetails\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: " + b.retcode + "-" + b.errmsg), e.notifyObservers(alloy.rpcService, "sendQuitGroupError", b))
                },
                onError: function (b) {
                    a.out("\u9000\u51fa\u5931\u8d25");
                    e.notifyObservers(alloy.rpcService, "sendQuitGroupError", b)
                }
            })
    };
    this.dismissOrQuit =
        function (a, b) {
            var d = this;
            this.sendGetFriendUin2(a, 1, function (a) {
                a.result.account == alloy.portal.getUin() ? d.sendGetFriendUin2(b.gcode, 4, function (a) {
                    alloy.system.openURL({
                        url: "http://id.qq.com/?guin=" + a.result.account + "#qun-dismiss",
                        isOpenNewTab: !0
                    })
                }) : d._sendQuitGroup(b)
            })
    };
    this.sendQuitGroup = function (a) {
        a.vfwebqq = alloy.portal.getVfWebQQ();
        if (EQQ) {
            var b = EQQ.Model.BuddyList.getGroupByCode(a.gcode);
            if (b && b.owner) this.dismissOrQuit(b.owner, a);
            else {
                var d = this;
                EQQ.Model.BuddyList.sendGetGroupInfo({
                        gcode: a.gcode
                    },
                    function (b) {
                        d.dismissOrQuit(b, a)
                    })
            }
        } else console.log(3), this._sendQuitGroup(a)
    };
    this.getAppInfo = function (b, d, e, f) {
        b = {
            appid: parseInt(b),
            loadMethod: 0
        };
        if (d) b.val = d;
        b.vfwebqq = alloy.portal.getVfWebQQ();
        alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "keycgi/qqweb/market/getappinfo.do", {
            context: b.context || this,
            method: "GET",
            data: {
                appattrib: a.json.stringify(b)
            },
            arguments: b,
            onSuccess: e || function () {},
            onError: f || function () {}
        })
    };
    this.setAppVote = function (b, f, g) {
        alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL +
            "cgi/qqweb/market/updateapphot.do", {
                context: b.context || this,
                method: "POST",
                data: {
                    appattrib: a.json.stringify(b),
                    vfwebqq: alloy.portal.getVfWebQQ()
                },
                arguments: b,
                onSuccess: f || function () {},
                onError: g || function (b) {
                    a.out("\u5e94\u7528\u8bc4\u5206\u5931\u8d25");
                    e.notifyObservers(d, "SetAppVoteError", b)
                }
            })
    };
    this.createAppComment = function (a, b, d) {
        a.ni = a.ni || alloy.portal.getPortalSelf("nick") || alloy.portal.getPortalSelf("uin");
        a.vfwebqq = alloy.portal.getVfWebQQ();
        alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL +
            "cgi/qqweb/market/createappcomment.do", {
                context: a.context || this,
                method: "POST",
                data: a,
                arguments: a,
                onSuccess: b || function () {},
                onError: d || function () {}
            })
    };
    this.createAppComplain = function (b, d, e) {
        b.ni = b.ni || alloy.portal.getPortalSelf("nick") || alloy.portal.getPortalSelf("uin");
        b.vfwebqq = alloy.portal.getVfWebQQ();
        alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi/qqweb/market/appusercomplain.do", {
            context: b.context || this,
            method: "POST",
            data: {
                appattrib: a.json.stringify(b)
            },
            arguments: b,
            onSuccess: d || function () {},
            onError: e || function () {}
        })
    };
    this.sendSetConfig = function (b) {
        if (alloy.portal.getTryUin() && alloy.portal.getSkey()) {
            b.data.vfwebqq = alloy.portal.getVfWebQQ();
            var d = b.action || "set";
            b.data && b.data.r && (b.data.r = a.json.stringify(b.data.r));
            this.cgiSend(alloy.CONST.JAVA_CGI_URL + "keycgi/qqweb/newuac/" + d + ".do", {
                method: "POST",
                data: b.data,
                onSuccess: b.onSuccess,
                context: b.context
            })
        }
    };
    this.sendMessageFilterConfig = function (a) {
        a.data.vfwebqq = qqweb.portal.getVfWebQQ();
        this.cgiSend(alloy.CONST.JAVA_CGI_URL + "keycgi/qqweb/uac/messagefilter.do", {
            method: "POST",
            data: a.data,
            onSuccess: a.onSuccess,
            context: a.context
        })
    };
    this.sendSetConfigNew = function (b) {
        this.cgiSend(alloy.CONST.JAVA_CGI_URL + "keycgi/qqweb/newuac/" + (b.action || "set") + ".do", {
            method: "POST",
            data: {
                r: a.json.stringify(b.data),
                vfwebqq: alloy.portal.getVfWebQQ()
            },
            arguments: b.arguments,
            onSuccess: b.onSuccess,
            context: b.context
        })
    };
    this.sendMSetConfig = function (b) {
        this.cgiSend(alloy.CONST.JAVA_CGI_URL + "keycgi/qqweb/newuac/mset.do", {
            method: "POST",
            data: {
                r: a.json.stringify(b.data),
                vfwebqq: alloy.portal.getVfWebQQ()
            },
            onSuccess: b.onSuccess,
            context: b.context
        })
    };
    var D = function () {
        p && (d.sendMSetConfig({
            data: p
        }), p = null)
    };
    this.sendMSetConfigDelay = function (a) {
        l && clearTimeout(l);
        p = p || {};
        var b = a.data,
            d;
        for (d in b) {
            p[d] = p[d] || {};
            for (var e in b[d]) p[d][e] = b[d][e]
        }
        l = setTimeout(D, a.delay || 5E3)
    };
    this.sendGetConfig = function (b) {
        b.data = b.data || {};
        b.data.uin = qqweb.portal.getUin();
        b.data && b.data.r && (b.data.r = a.json.stringify(b.data.r));
        this.cgiSend(alloy.CONST.JAVA_CGI_URL + "keycgi/qqweb/newuac/" + b.action + ".do", {
            data: b.data,
            arguments: b.arguments,
            method: "POST",
            timeout: 2E4,
            onSuccess: b.onSuccess,
            onError: b.onError,
            onComplete: b.onComplete,
            onTimeout: b.onTimeout,
            context: b.context
        })
    };
    this.sendGetAllConfig = function (b) {
        b.data = b.data || {};
        b.data.uin = alloy.portal.getUin();
        b.data && b.data.r && (b.data.r = a.json.stringify(b.data.r));
        this.cgiSend(alloy.CONST.JAVA_CGI_URL + "keycgi/qqweb/newuac/getall.do", {
            data: b.data,
            arguments: b.arguments,
            method: "POST",
            onSuccess: b.onSuccess,
            context: b.context
        })
    };
    this.sendGetNewAppCount = function () {
        var a = {};
        this.cgiSend(alloy.CONST.JAVA_CGI_URL +
            "cgi/qqweb/market/getnewappnumber.do", {
                context: this,
                method: "GET",
                data: {
                    r: '{"appid":1000000,"type":[1,-1]}'
                },
                onSuccess: function (b) {
                    b.retcode === 0 ? e.notifyObservers(alloy.rpcService, "SendGetNewAppCountSuccess", b) : e.notifyObservers(alloy.rpcService, "SendMsgError", {
                        uin: a.to,
                        retcode: b.retcode,
                        errmsg: b.errmsg
                    })
                },
                onError: function () {}
            })
    };
    this.sendGetDefaultAppIntroduce = function (b, f, g) {
        alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "keycgi/qqweb/market/getdefaultappinfo.do", {
            context: d,
            method: "POST",
            data: {
                appattrib: a.json.stringify(b),
                vfwebqq: alloy.portal.getVfWebQQ()
            },
            arguments: b,
            onSuccess: f || function (b) {
                b.retcode === 0 ? onGetAppIntroduceSuccess(b.result.resultData) : a.out("\u5e94\u7528\u4ecb\u7ecd\u62c9\u53d6\u5931\u8d25" + b.errmsg)
            },
            onError: g || function (b) {
                a.out("\u5e94\u7528\u62c9\u53d6\u5931\u8d25");
                e.notifyObservers(d, "GetAppIntroduceError", b)
            }
        })
    };
    this.sendReport = function (b) {
        alloy.rpcService.formSend("http://tj.qstatic.com/log", {
            method: "POST",
            data: {
                r: a.string.trim(b)
            }
        })
    };
    this.reportQstatic = function (a) {
        qqweb.util.report2qqweb(a)
    };
    this.sendSearchGroup = function (a) {
        a.data.vfwebqq = qqweb.portal.getVfWebQQ();
        this.cgiSend(alloy.CONST.JAVA_CGI_URL + "keycgi/qqweb/group/search.do", {
            data: a.data,
            arguments: a.data,
            onSuccess: a.onSuccess,
            onError: a.onError,
            context: a.context
        })
    };
    this.sendGetGroupLog2 = function (b, f, g) {
        var k, j;
        b.mode == 1 ? (k = b.lastbs ? b.lastbs - b.ps : 0, j = b.lastbs ? b.lastbs - 1 : 0) : b.mode == 2 && (k = b.lastes ? b.lastes + 1 : 0, j = b.lastes ? b.lastes + b.ps : 0);
        k = {
            ps: b.ps,
            bs: k,
            es: j,
            gid: b.gcode,
            mode: b.mode,
            vfwebqq: qqweb.portal.getVfWebQQ()
        };
        this.cgiSend(alloy.CONST.JAVA_CGI_URL +
            "keycgi/top/groupchatlog", {
                context: this,
                data: k,
                arguments: {
                    gid: b.gid,
                    gcode: b.gcode
                },
                onSuccess: f || function (a) {
                    e.notifyObservers(d, "SendGetGroupLogSuccess", a)
                },
                onError: g || function () {
                    a.out("[SendGetGroupLog] error")
                }
            })
    };
    this.sendGetGroupLogDates = function (b, d, e) {
        b.vfwebqq = qqweb.portal.getVfWebQQ();
        this.cgiSend(alloy.CONST.JAVA_CGI_URL + "keycgi/top/chatlogdates", {
            context: this,
            data: b,
            onSuccess: d || function () {},
            onError: e || function () {
                a.out("[SendGetGroupLog] error")
            }
        })
    };
    this.sendGetDiscuLog = function (b, d, e) {
        var f = {
            p: b.p,
            gid: b.did.slice(1),
            c: b.c,
            ty: 2,
            vfwebqq: qqweb.portal.getVfWebQQ()
        };
        this.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi/top/get_one_page", {
            context: this,
            data: f,
            arguments: {
                did: b.did,
                p: b.p,
                c: b.c
            },
            onSuccess: d || function () {},
            onError: e || function () {
                a.out("[SendGetGroupLog] error")
            }
        })
    };
    this.sendGetGroupLogByTime = function (b, f, g) {
        arguments = {
            gid: b.gid,
            gcode: b.gcode
        };
        var k = b;
        k.gid = b.gcode;
        k.vfwebqq = qqweb.portal.getVfWebQQ();
        this.cgiSend(alloy.CONST.JAVA_CGI_URL + "keycgi/qqweb/group/uintimechatlog.do", {
            context: this,
            data: k,
            arguments: arguments,
            onSuccess: f || function (a) {
                e.notifyObservers(d, "sendGetGroupLogByTime", a)
            },
            onError: g || function () {
                a.out("[SendGetGroupLog] error")
            }
        })
    };
    this.reportAppRun = function (b) {
        b = {
            appid: 0,
            rappid: parseInt(b)
        };
        alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi/qqweb/market/record.do", {
            context: b.context || this,
            method: "POST",
            data: {
                appattrib: a.json.stringify(b),
                vfwebqq: alloy.portal.getVfWebQQ()
            },
            arguments: b
        })
    };
    this.reportAppShare = function (b) {
        b = {
            type: parseInt(b.type),
            appid: parseInt(b.appId)
        };
        alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi/qqweb/market/appshare.do", {
            context: b.context || this,
            method: "POST",
            data: {
                appattrib: a.json.stringify(b),
                vfwebqq: alloy.portal.getVfWebQQ()
            },
            arguments: b
        })
    };
    this.sendGetAPISkey = function (b) {
        b = b || {};
        alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi/qqweb/app/loadapp.do", {
            context: d,
            method: "GET",
            data: {
                r: a.json.stringify({
                    appid: b.appid
                })
            },
            timeout: 1E4,
            onSuccess: b.onSuccess,
            onError: b.onError,
            onTimeout: b.onTimeout
        })
    };
    this.sendCheckHack = function (a) {
        alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL +
            "cgi/qqweb/check.do", {
                context: d,
                method: "POST",
                data: {
                    k: a.key
                },
                onSuccess: a.onSuccess
            })
    };
    this.sendGetVipConfig = function (a, b, f) {
        if (alloy.portal.getLoginLevel() > alloy.CONST.LOGIN_LEVEL_NONE) {
            var g = {
                level: a.level
            };
            g.vfwebqq = qqweb.portal.getVfWebQQ();
            this.send(alloy.CONST.API_SERVER_URL + "get_vipconfig", {
                context: a.context || this,
                data: g,
                onSuccess: b || function (a) {
                    a.retcode === 0 && a.result ? e.notifyObservers(d, "GetVipConfigSuccess", a) : e.notifyObservers(d, "GetVipConfigError")
                },
                onError: f || function () {
                    e.notifyObservers(d,
                        "GetVipConfigError")
                },
                onTimeout: function () {
                    e.notifyObservers(d, "GetVipConfigError")
                }
            })
        }
    };
    this.sendSetVipConfig = function (b, f, g) {
        if (alloy.portal.getLoginLevel() > alloy.CONST.LOGIN_LEVEL_NONE) {
            var k = {};
            k.vfwebqq = qqweb.portal.getVfWebQQ();
            k.roamall = b.roamall || 0;
            if (b.setuinlist && b.setuinlist.length) k.setuinlist = a.json.stringify(b.setuinlist);
            if (b.unsetuinlist && b.unsetuinlist.length) k.unsetuinlist = a.json.stringify(b.unsetuinlist);
            this.send(alloy.CONST.API_SERVER_URL + "set_vipconfig", {
                context: b.context || this,
                method: "POST",
                arguments: b.arguments,
                data: k,
                onSuccess: f || function (a) {
                    a.retcode === 0 && a.result ? e.notifyObservers(d, "SetVipConfigSuccess", a) : e.notifyObservers(d, "SetVipConfigError", a)
                },
                onError: g || function (a) {
                    e.notifyObservers(d, "SetVipConfigError", a)
                },
                onTimeout: function () {
                    e.notifyObservers(d, "SetVipConfigError", data)
                }
            })
        }
    };
    this.getAppInfoMulti = function (b) {
        var d = {
            appid: b.appList,
            loadMethod: 4
        };
        alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "keycgi/qqweb/market/getappinfo.do", {
            context: d.context || this,
            method: "GET",
            data: {
                appattrib: a.json.stringify(d)
            },
            arguments: d,
            onSuccess: b.onSuccess || function () {},
            onError: b.onError || function () {},
            onTimeout: b.onError || function () {}
        })
    };
    this.sendGetRecentChat = function (a) {
        this.send(alloy.CONST.API_SERVER_URL + "recent_chat", {
            context: this,
            method: "GET",
            timeout: 1E4,
            data: {
                vfwebqq: alloy.portal.getVfWebQQ()
            },
            onSuccess: a.onSuccess,
            onError: a.onError
        })
    };
    this.sendFileErrorReport = function (b) {
        this.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi/top/save_logs", {
            context: d,
            method: "POST",
            data: {
                logdata: a.json.stringify(b),
                vfwebqq: alloy.portal.getVfWebQQ()
            }
        })
    }
});
Jx().$package("alloy.layout.themeManager", function (a) {
    var d = this,
        b = a.dom,
        e = a.event,
        g, j, l, p, o = {
            id: "theme_blue_glow"
        }, s = null,
        v = 0;
    window.webTop && (o = {
        id: "theme_blue_glow"
    });
    var w;
    this.themeConfig = {
        theme_blue: {
            id: "theme_blue",
            name: "\u68a6\u5e7b\u5149\u5f71",
            skin: "blue",
            wallpaper: {
                url: "blue.jpg?t=20111011001",
                mode: "centerRepeat"
            }
        },
        theme_pinky_night: {
            id: "theme_pinky_night",
            name: "\u7c89\u7ea2\u4e4b\u591c",
            skin: "pink",
            wallpaper: {
                url: "pinky_night.jpg?t=20111011001",
                mode: "centerRepeat"
            }
        },
        theme_green: {
            id: "theme_green",
            name: "\u9752\u9752\u4e16\u754c",
            skin: "light_green",
            wallpaper: {
                url: "green.jpg",
                mode: "centerRepeat"
            }
        },
        theme_wood1: {
            id: "theme_wood1",
            name: "\u6e29\u99a8\u6728\u7eb9",
            skin: "dark_brown",
            wallpaper: {
                url: "wood1.jpg",
                mode: "centerRepeat"
            }
        },
        theme_wood2: {
            id: "theme_wood2",
            name: "\u9ed1\u8272\u6728\u7eb9",
            skin: "black",
            wallpaper: {
                url: "wood2.jpg",
                mode: "centerRepeat"
            }
        },
        theme_universe: {
            id: "theme_universe",
            name: "\u795e\u79d8\u661f\u9645",
            skin: "dark_blue",
            wallpaper: {
                url: "universe.jpg?t=20111011001",
                mode: "centerRepeat"
            }
        },
        theme_metal: {
            id: "theme_metal",
            name: "\u9177\u70ab\u91d1\u5c5e",
            skin: "grey",
            wallpaper: {
                url: "metal.jpg?t=20111011001",
                mode: "centerRepeat"
            }
        },
        theme_pinky_light: {
            id: "theme_pinky_light",
            name: "\u5e7b\u5f69\u8367\u5149",
            skin: "light_violet",
            wallpaper: {
                url: "pinky_light.jpg?t=20111011001",
                mode: "fill"
            }
        },
        theme_pinky_flower: {
            id: "theme_pinky_flower",
            name: "\u7eda\u70c2\u7e41\u82b1",
            skin: "dark_voilet",
            wallpaper: {
                url: "pinky_flower.jpg?t=20111011001",
                mode: "fill"
            }
        },
        theme_christmas: {
            id: "theme_christmas",
            name: "\u5723\u8bde\u5feb\u4e50",
            skin: "light_blue",
            wallpaper: {
                url: "christmas.jpg?t=20111011001",
                mode: "fill"
            },
            scene: "sceneChristmas"
        },
        theme_2011: {
            id: "theme_2011",
            name: "\u6b22\u5e86\u5143\u65e6",
            skin: "black",
            wallpaper: {
                url: "2011.jpg",
                mode: "fill"
            }
        },
        theme_blue1: {
            id: "theme_blue1",
            name: "\u5e7b\u5f69\u84dd\u5929",
            skin: "dark_blue",
            wallpaper: {
                url: "blue1.jpg?t=20111011001",
                mode: "fill"
            }
        },
        theme_spring_festival: {
            id: "theme_spring_festival",
            name: "\u559c\u8fce\u65b0\u6625",
            skin: "grey",
            wallpaper: {
                url: "spring_festival.jpg?t=20111011001",
                mode: "centerRepeat"
            }
        },
        theme_valentinesDay: {
            id: "theme_valentinesDay",
            name: "\u751c\u871c\u60c5\u4eba\u8282",
            skin: "valentinesDay",
            wallpaper: {
                url: "valentinesDay.jpg?t=20111011001",
                mode: "fill"
            }
        },
        theme_cloud: {
            id: "theme_cloud",
            name: "\u6674\u7a7a\u884c\u4e91",
            skin: "blue",
            wallpaper: {
                url: "cloud.jpg?t=20111011001",
                mode: "centerRepeat"
            },
            scene: "cloud"
        },
        theme_gravity: {
            id: "theme_gravity",
            name: "\u84b2\u516c\u82f1",
            skin: "blue",
            wallpaper: {
                url: "cloud.jpg?t=20111011001",
                mode: "centerRepeat"
            },
            scene: "gravity"
        },
        theme_blue_glow: {
            id: "theme_blue_glow",
            name: "\u6df1\u6d77\u4ef0\u671b",
            skin: "grey",
            wallpaper: {
                url: "blue_glow.jpg",
                mode: "zoom"
            }
        },
        theme_green_glow: {
            id: "theme_green_glow",
            name: "\u6668\u5149\u5fae\u66e6",
            skin: "grey",
            wallpaper: {
                url: "green_glow.jpg",
                mode: "zoom"
            }
        },
        theme_orange_glow: {
            id: "theme_orange_glow",
            name: "\u68a6\u9192\u65f6\u5206",
            skin: "grey",
            wallpaper: {
                url: "orange_glow.jpg",
                mode: "zoom"
            }
        },
        theme_7_7: {
            id: "theme_7_7",
            name: "\u4e03\u5915",
            skin: "7_7",
            wallpaper: {
                url: "7_7.jpg",
                mode: "fill"
            }
        },
        theme_teachersDay: {
            id: "theme_teachersDay",
            name: "\u6559\u5e08\u8282",
            skin: "teachersDay",
            wallpaper: {
                url: "teachersDay.jpg",
                mode: "zoom"
            }
        },
        theme_midAutumn: {
            id: "theme_midAutumn",
            name: "\u4e2d\u79cb\u8282",
            skin: "pink",
            wallpaper: {
                url: "midAutumn.jpg",
                mode: "fill"
            }
        },
        theme_lookUpSky: {
            id: "theme_lookUpSky",
            name: "\u4ef0\u671b\u82cd\u7a79",
            skin: "blue",
            wallpaper: {
                url: "lookUpSky.jpg",
                mode: "fill"
            }
        },
        theme_grass: {
            id: "theme_grass",
            name: "\u832b\u832b\u91ce\u8349",
            skin: "grey",
            wallpaper: {
                url: "grass.jpg",
                mode: "fill"
            }
        },
        theme_childhood: {
            id: "theme_childhood",
            name: "\u7ae5\u5e74\u8bb0\u5fc6",
            skin: "pink",
            wallpaper: {
                url: "childhood.jpg",
                mode: "fill"
            }
        },
        theme_skyBlue: {
            id: "theme_skyBlue",
            name: "\u7a7a\u7075\u84dd\u8c03",
            skin: "blue",
            wallpaper: {
                url: "skyBlue.jpg",
                mode: "fill"
            }
        },
        theme_dandelionDream: {
            id: "theme_dandelionDream",
            name: "\u84b2\u82f1\u4e4b\u68a6",
            skin: "blue",
            wallpaper: {
                url: "dandelionDream.jpg",
                mode: "fill"
            }
        },
        theme_paintingTime: {
            id: "theme_paintingTime",
            name: "\u6c34\u58a8\u5e74\u534e",
            skin: "dark_brown",
            wallpaper: {
                url: "paintingTime.jpg",
                mode: "fill"
            }
        },
        theme_dreamSky: {
            id: "theme_dreamSky",
            name: "\u68a6\u7fd4\u5929\u9645",
            skin: "blue",
            wallpaper: {
                url: "dreamSky.jpg",
                mode: "fill"
            }
        }
    };
    var t = [];
    (function () {
        var a, b = 0;
        for (a in d.themeConfig) d.themeConfig.hasOwnProperty(a) && (t[b++] = d.themeConfig[a])
    })();
    this.themeArray = t;
    this.getThemeArray = function (b) {
        var c = [],
            e;
        for (e = 0; e < b.length; e++) a.browser.mobileSafari && b[e] == "theme_gravity" || c.push(d.themeConfig[b[e]]);
        return c
    };
    var r = {
        skinRoot: "",
        timeStamp: 20111011001,
        window: {
            titleColor: "#6d6d6d",
            titleHeight: "25px",
            textColor: "#666666",
            titleFontWeight: "bold",
            bodyAreaTop: "0",
            actionButtonWidth: "21px",
            actionButtonHeight: "19px",
            bodyColor: "#fff",
            ie6WindowCenterBackground: "#C2D2C8",
            ipadContainerBackColor: "rgba(168, 218, 127, .8)"
        },
        currentWindow: {
            titleColor: "#393836",
            textColor: "#333333",
            ipadContainerBackColor: "rgba(168, 218, 127, 1)",
            windowCenterBackground: "#A8DA7F",
            ie6WindowCenterBackground: "#A8DA7F"
        },
        appbar: {
            aColor: "white"
        },
        panel: {
            ie6Background: "#fff"
        },
        indicator: {
            bgHeight: "40px",
            ie6BgHeight: "28px",
            wrapperTop: "0",
            wrapperPosition: "static",
            ipadSystemBtn: ".mobileSafari #navbar{width:222px;} .mobileSafari #navbar .system_button{display:none;visibility:visible;}"
        }
    },
        m = this.skinConfig = {
            blue: {
                id: 0,
                key: "blue",
                name: "\u6de1\u84dd",
                timeStamp: 20111011001,
                window: {
                    bodyColor: "#C4DCEA",
                    ipadContainerBackColor: "rgba(182,234,253,.8)",
                    ie6WindowCenterBackground: "#C4DEED"
                },
                currentWindow: {
                    ipadContainerBackColor: "rgba(182,234,253,1)",
                    ie6WindowCenterBackground: "#B6EAFD"
                }
            },
            black: {
                id: 1,
                key: "black",
                name: "\u9ed1\u8272",
                timeStamp: 20111011001,
                window: {
                    bodyColor: "#E9E9E9",
                    ipadContainerBackColor: "rgba(232,232,232,.8)",
                    ie6WindowCenterBackground: "#C4C4C4"
                },
                currentWindow: {
                    ipadContainerBackColor: "rgba(232,232,232,1)",
                    ie6WindowCenterBackground: "#e8e8e8"
                }
            },
            light_green: {
                id: 2,
                key: "light_green",
                name: "\u5ae9\u7eff",
                timeStamp: 20111011001,
                window: {
                    bodyColor: "#AFDD8B",
                    ipadContainerBackColor: "rgba(168,218,127,.8)",
                    ie6WindowCenterBackground: "#C2D2C8"
                },
                currentWindow: {
                    ipadContainerBackColor: "rgba(168,218,127,1)",
                    ie6WindowCenterBackground: "#A8DA7F"
                }
            },
            pink: {
                id: 3,
                key: "pink",
                name: "\u6c34\u7c89",
                timeStamp: 20111011001,
                window: {
                    bodyColor: "#EFDEE5",
                    ipadContainerBackColor: "rgba(255,225,229,.8)",
                    ie6WindowCenterBackground: "#CCCCCC"
                },
                currentWindow: {
                    ipadContainerBackColor: "rgba(255,225,229,1)",
                    ie6WindowCenterBackground: "#FFE1E5"
                }
            },
            light_violet: {
                id: 4,
                key: "light_violet",
                name: "\u6d45\u7d2b",
                timeStamp: 20111011001,
                window: {
                    bodyColor: "#EFDEE5",
                    ipadContainerBackColor: "rgba(255,225,229,.8)",
                    ie6WindowCenterBackground: "#CCCCCC"
                },
                currentWindow: {
                    ipadContainerBackColor: "rgba(255,225,229,1)",
                    ie6WindowCenterBackground: "#FFE1E5"
                }
            },
            dark_voilet: {
                id: 5,
                key: "dark_voilet",
                name: "\u7d20\u7d2b",
                timeStamp: 20111011001,
                window: {
                    bodyColor: "#EFDEE5",
                    ipadContainerBackColor: "rgba(255,225,229,.8)",
                    ie6WindowCenterBackground: "#CCCCCC"
                },
                currentWindow: {
                    ipadContainerBackColor: "rgba(255,225,229,1)",
                    ie6WindowCenterBackground: "#FFE1E5"
                }
            },
            grey: {
                id: 6,
                key: "grey",
                name: "\u94f6\u7070",
                timeStamp: 20111011001,
                window: {
                    bodyColor: "#E9E9E9",
                    ipadContainerBackColor: "rgba(232,232,232,.8)",
                    ie6WindowCenterBackground: "#C4C4C4"
                },
                currentWindow: {
                    ipadContainerBackColor: "rgba(232,232,232,1)",
                    ie6WindowCenterBackground: "#e8e8e8"
                }
            },
            dark_brown: {
                id: 7,
                key: "dark_brown",
                name: "\u6d45\u68d5",
                timeStamp: 20111011001,
                window: {
                    bodyColor: "#E2D3BB",
                    ipadContainerBackColor: "rgba(234,222,197,.8)",
                    ie6WindowCenterBackground: "#C4C4C4"
                },
                currentWindow: {
                    ipadContainerBackColor: "rgba(234,222,197,1)",
                    ie6WindowCenterBackground: "#EADEC5"
                }
            },
            dark_blue: {
                id: 8,
                key: "dark_blue",
                name: "\u6df1\u84dd",
                timeStamp: 20111011001,
                window: {
                    bodyColor: "#E9E9E9",
                    ipadContainerBackColor: "rgba(232,232,232,.8)",
                    ie6WindowCenterBackground: "#C4C4C4"
                },
                currentWindow: {
                    ipadContainerBackColor: "rgba(232,232,232,1)",
                    ie6WindowCenterBackground: "#e8e8e8"
                }
            },
            light_blue: {
                id: 9,
                key: "light_blue",
                name: "\u6d45\u84dd",
                timeStamp: 20111011001,
                window: {
                    bodyColor: "#C4DCEA",
                    ipadContainerBackColor: "rgba(232,232,232,.8)",
                    ie6WindowCenterBackground: "#C4DEED"
                },
                currentWindow: {
                    ipadContainerBackColor: "rgba(232,232,232,1)",
                    ie6WindowCenterBackground: "#B6EAFD"
                }
            },
            valentinesDay: {
                id: 10,
                key: "valentinesDay",
                name: "\u6d45\u84dd",
                timeStamp: 20111011001,
                window: {
                    bodyColor: "#E9E9E9",
                    ipadContainerBackColor: "rgba(232,232,232,.8)",
                    ie6WindowCenterBackground: "#C4C4C4"
                },
                currentWindow: {
                    ipadContainerBackColor: "rgba(232,232,232,1)",
                    ie6WindowCenterBackground: "#e8e8e8"
                }
            },
            red: {
                id: 11,
                key: "red",
                name: "\u4eae\u7ea2",
                timeStamp: 20111011001,
                window: {
                    bodyColor: "#F1B7B7",
                    ipadContainerBackColor: "rgba(245,194,194,.8)",
                    ie6WindowCenterBackground: "#F7CECE"
                },
                currentWindow: {
                    ipadContainerBackColor: "rgba(245,194,194,1)",
                    ie6WindowCenterBackground: "#F5C2C2"
                }
            },
            cyan: {
                id: 12,
                key: "cyan",
                name: "\u78a7\u9752",
                timeStamp: 20111011001,
                window: {
                    bodyColor: "#BAE3D7",
                    ipadContainerBackColor: "rgba(194,245,226,.8)",
                    ie6WindowCenterBackground: "#CEF7E8"
                },
                currentWindow: {
                    ipadContainerBackColor: "rgba(194,245,226,1)",
                    ie6WindowCenterBackground: "#C2F5E2"
                }
            },
            purple: {
                id: 13,
                key: "purple",
                name: "\u7d20\u7d2b",
                timeStamp: 20111011001,
                window: {
                    bodyColor: "#CAB7DE",
                    ipadContainerBackColor: "rgba(224,194,245,.8)",
                    ie6WindowCenterBackground: "#E6CEF7"
                },
                currentWindow: {
                    ipadContainerBackColor: "rgba(224,194,245,1)",
                    ie6WindowCenterBackground: "#E0C2F5"
                }
            },
            "7_7": {
                id: 14,
                key: "7_7",
                name: "\u6c34\u7c89",
                timeStamp: 20111011001,
                window: {
                    bodyColor: "#EFDEE5",
                    ipadContainerBackColor: "rgba(255,225,229,.8)",
                    ie6WindowCenterBackground: "#CCCCCC"
                },
                currentWindow: {
                    ipadContainerBackColor: "rgba(255,225,229,1)",
                    ie6WindowCenterBackground: "#FFE1E5"
                }
            },
            teachersDay: {
                id: 15,
                key: "teachersDay",
                name: "\u6de1\u84dd",
                timeStamp: 20111011001,
                window: {
                    ipadContainerBackColor: "rgba(182,234,253,.8)",
                    ie6WindowCenterBackground: "#C4DEED"
                },
                currentWindow: {
                    ipadContainerBackColor: "rgba(182,234,253,1)",
                    ie6WindowCenterBackground: "#B6EAFD"
                }
            }
        };
    this.getSkinArray = function (a) {
        var b = [],
            c;
        for (c = 0; c < a.length; c++) b[c] = m[a[c]];
        return b
    };
    var f = {}, k = {
            repeat: {
                isHackNeeded: !1,
                hackType: ""
            },
            center: {
                isHackNeeded: !1,
                hackType: ""
            },
            centerRepeat: {
                isHackNeeded: !1,
                hackType: ""
            },
            zoom: {
                isHackNeeded: !0,
                hackType: "img"
            },
            adapt: {
                isHackNeeded: !0,
                hackType: "img"
            },
            fill: {
                isHackNeeded: !0,
                hackType: "img"
            },
            iframe: {
                isHackNeeded: !0,
                hackType: "iframe"
            }
        }, q = function () {
            d.applyTheme(o ? o.id : d.themeArray[Math.floor(Math.random() * 100 % d.themeArray.length)].id, !0)
        }, D = function (a, b) {
            var b = b || function () {}, c = [],
                d = a.length;
            if (a.length)
                for (var e = function () {
                    --d < 1 && (b(c), c = null)
                }, f = function () {
                        this.onerror = this.onload = null;
                        e()
                    }, g = function () {
                        this.onerror = this.onload = null;
                        e()
                    }; a.length > 0;) {
                    var h =
                        new Image;
                    c.push(h);
                    h.onload = f;
                    h.onerror = g;
                    h.src = a.shift()
                } else b(c)
        }, c = new a.Class({
            init: function () {
                this._iframeWallpaperContainter = this._zoomWallpaperContainer = null;
                this._mode = "repeat";
                var a = this;
                this._onWindowResize = function () {
                    a.setWallpaperSize.apply(a)
                }
            },
            getMode: function () {
                return this._mode
            },
            isHackLayerNeeded: function () {
                return !0
            },
            isHackLayerNeed2Change: function () {
                return k[this._mode].hackType != k[this._nMode].hackType
            },
            isModeHackNeeded: function (a) {
                return k[a].isHackNeeded
            },
            initHackLayer: function () {
                if (this.isHackLayerNeeded() &&
                    (!this.isModeHackNeeded(this._mode) || this.isHackLayerNeed2Change())) this.onInitHackLayer(k[this._nMode].hackType)
            },
            onInitHackLayer: function (a) {
                (this._zoomWallpaperContainer = b.id("zoomWallpaperGrid")) && document.body.removeChild(this._zoomWallpaperContainer);
                switch (a) {
                case "img":
                    this._zoomWallpaperContainer = b.node("div", {
                        id: "zoomWallpaperGrid",
                        "class": "zoomWallpaperGrid",
                        style: "position:absolute;z-index:-10;left:0;top:0;overflow:hidden;"
                    });
                    this._zoomWallpaperContext = b.node("img", {
                        id: "zoomWallpaper",
                        "class": "zoomWallpaper",
                        style: "position:absolute;"
                    });
                    this._zoomWallpaperContainer.appendChild(this._zoomWallpaperContext);
                    document.body.appendChild(this._zoomWallpaperContainer);
                    e.on(window, "resize", this._onWindowResize);
                    break;
                case "iframe":
                    this._zoomWallpaperContainer = b.node("div", {
                        id: "zoomWallpaperGrid",
                        "class": "zoomWallpaperGrid",
                        style: "position:absolute;left:0;top:0;overflow:hidden;width:100%;height:100%;z-index:-1;"
                    }), this._zoomWallpaperContext = b.node("div"), this._zoomWallpaperContext.innerHTML =
                        '<iframe id ="iframeWallpaper" frameborder="no" border="0" class ="iframeWallpaper" style ="position:absolute;left:0;top:0;overflow:hidden;width:100%;height:100%;"></iframe>', this._zoomWallpaperContainer.appendChild(this._zoomWallpaperContext), document.body.appendChild(this._zoomWallpaperContainer)
                }
            },
            removeHackLayout: function () {
                if (this.isHackLayerNeeded() && this.isModeHackNeeded(this._mode)) {
                    if (this._zoomWallpaperContainer && (b.setStyle(this._zoomWallpaperContainer, "display", "none"), this._mode == "iframe")) b.id("iframeWallpaper").src =
                        "domain.html";
                    e.off(window, "resize", this._onWindowResize)
                } else this.isModeHackNeeded(this._mode) && b.removeClass(document.body, "wallpaperCss3" + this._mode)
            },
            getCurrentWallpaper: function () {
                return this._wallpaper.src
            },
            getCurrentMode: function () {
                return this._wallpaper.mode
            },
            applyWallpaper: function (a, b) {
                this._wallpaper = {
                    src: a,
                    mode: b
                };
                this._nMode = b;
                b == "iframe" ? this.applyIframeWallpaper(a) : this.applyImageWallpaper(a, b)
            },
            applyImageWallpaper: function (b) {
                D([b], a.bind(this.onWallpaperLoaded, this))
            },
            applyIframeWallpaper: function (a) {
                this.initHackLayer();
                this._mode = this._nMode;
                if (this._zoomWallpaperContext) b.id("iframeWallpaper").src = a
            },
            applyBackColor: function (a) {
                b.setStyle(document.body, "backbroundColor", a)
            },
            onWallpaperLoaded: function (a) {
                this._wallpaper.height = a[0].height;
                this._wallpaper.width = a[0].width;
                a = "url(" + this._wallpaper.src + ")";
                this._nMode = this._nMode || o && o.mode || "repeat";
                switch (this._nMode) {
                case "repeat":
                    this.removeHackLayout();
                    this._mode = "repeat";
                    b.setStyle(document.body, "backgroundImage", a);
                    b.setStyle(document.body, "backgroundRepeat",
                        "repeat");
                    b.setStyle(document.body, "backgroundPosition", "0 0");
                    break;
                case "center":
                    this.removeHackLayout();
                    this._mode = "center";
                    b.setStyle(document.body, "backgroundImage", a);
                    b.setStyle(document.body, "backgroundRepeat", "no-repeat");
                    b.setStyle(document.body, "backgroundPosition", "center center");
                    break;
                case "centerRepeat":
                    this.removeHackLayout();
                    this._mode = "centerRepeat";
                    b.setStyle(document.body, "backgroundImage", a);
                    b.setStyle(document.body, "backgroundRepeat", "repeat");
                    b.setStyle(document.body, "backgroundPosition",
                        "center center");
                    break;
                case "zoom":
                case "adapt":
                case "fill":
                    this.initHackLayer(), this._mode = this._nMode, this.isHackLayerNeeded() ? (b.setStyle(this._zoomWallpaperContainer, "display", "none"), this.zoomWallpaper(), b.setStyle(document.body, "background", "none")) : (b.setStyle(document.body, "backgroundImage", a), b.setStyle(document.body, "backgroundRepeat", "no-repeat"), b.addClass(document.body, "wallpaperCss3" + this._mode))
                }
            },
            setWallpaperSize: function () {
                var a = alloy.layout.getDesktopHeight(),
                    c = alloy.layout.getDesktopWidth(),
                    d = this._wallpaper.height,
                    e = this._wallpaper.width,
                    f = c * d / e,
                    g = a * e / d;
                b.setStyle(this._zoomWallpaperContainer, "height", a + "px");
                b.setStyle(this._zoomWallpaperContainer, "width", c + "px");
                switch (this._mode) {
                case "zoom":
                    b.setStyle(this._zoomWallpaperContext, "height", a + "px");
                    b.setStyle(this._zoomWallpaperContext, "width", c + "px");
                    break;
                case "adapt":
                    e / d > c / a ? (b.setStyle(this._zoomWallpaperContext, "height", Math.round(f) + "px"), b.setStyle(this._zoomWallpaperContext, "width", c + "px"), b.setStyle(this._zoomWallpaperContext,
                        "top", Math.floor((a - f) / 2) + "px"), b.setStyle(this._zoomWallpaperContext, "left", "0")) : (b.setStyle(this._zoomWallpaperContext, "height", a + "px"), b.setStyle(this._zoomWallpaperContext, "width", Math.round(g) + "px"), b.setStyle(this._zoomWallpaperContext, "left", Math.floor((c - g) / 2) + "px"), b.setStyle(this._zoomWallpaperContext, "top", "0"));
                    break;
                case "fill":
                    e / d > c / a ? (b.setStyle(this._zoomWallpaperContext, "height", a + "px"), b.setStyle(this._zoomWallpaperContext, "width", Math.ceil(g) + "px"), b.setStyle(this._zoomWallpaperContext,
                        "left", Math.floor((c - g) / 2) + "px"), b.setStyle(this._zoomWallpaperContext, "top", "0")) : (b.setStyle(this._zoomWallpaperContext, "height", Math.ceil(f) + "px"), b.setStyle(this._zoomWallpaperContext, "width", c + "px"), b.setStyle(this._zoomWallpaperContext, "top", Math.floor((a - f) / 2) + "px"), b.setStyle(this._zoomWallpaperContext, "left", "0"))
                }
            },
            zoomWallpaper: function () {
                this._mode == "zoom" && (b.setStyle(this._zoomWallpaperContext, "top", "0"), b.setStyle(this._zoomWallpaperContext, "left", "0"));
                this.setWallpaperSize();
                b.setStyle(this._zoomWallpaperContainer,
                    "display", "");
                this._zoomWallpaperContext.src = this._wallpaper.src
            },
            reset: function () {
                this.removeHackLayout();
                this._mode = "repeat";
                a.browser.ie ? (document.body.style.removeAttribute("backgroundImage"), document.body.style.removeAttribute("backgroundRepeat"), document.body.style.removeAttribute("backgroundPosition")) : b.setStyle(document.body, "background", "")
            }
        }),
        h = new a.Class({
            init: function () {
                this._oldStyleNode = b.id("skinStyleNode");
                this._cacheStyle = {}
            },
            getCurrentSkin: function () {
                return this._skin
            },
            applySkin: function (b) {
                this._skin =
                    b = this.getConfig(b);
                D(this._getPreloadImages(b.skinRoot, b.timeStamp), a.bind(this._onImagePreloaded, this))
            },
            getConfig: function (b) {
                var c = {
                    name: "",
                    timeStamp: "",
                    window: {
                        ie6WindowCenterBackground: "",
                        ipadContainerBackColor: ""
                    },
                    currentWindow: {
                        ie6WindowCenterBackground: "",
                        ipadContainerBackColor: ""
                    },
                    skinRoot: ""
                };
                if (a.isObject(b)) c.id = (new Date).getTime(), c.name = b.name || "", c.timeStamp = b.timeStamp || "", c.window.ipadContainerBackColor = b.window.ipadContainerBackColor || "", c.window.ie6WindowCenterBackground = b.window.ie6WindowCenterBackground ||
                    "", c.currentWindow.ipadContainerBackColor = b.currentWindow.ipadContainerBackColor || "", c.currentWindow.ie6WindowCenterBackground = b.currentWindow.ie6WindowCenterBackground || "", c.skinRoot = b.skinRoot;
                else if (m[b]) {
                    a.extend(c, m[b]);
                    var d = f[b];
                    d || (d = alloy.util.getCdnUrlById(m[b].id) + "style/skin/" + b, f[b] = d);
                    c.skinRoot = d
                }
                return c
            },
            applySkinStyle: function (a) {
                if (this._newStyleNode) this._oldStyleNode && b.getDocHead().removeChild(this._oldStyleNode), this._oldStyleNode = this._newStyleNode;
                this._newStyleNode = b.createStyleNode(a,
                    "skinStyleNode" + v++)
            },
            _onImagePreloaded: function () {
                var b = this._cacheStyle[this._skin.id];
                if (!b) {
                    var b = this._skin,
                        c;
                    c = w;
                    b = a.extend({}, r, b);
                    b = a.string.template(c, b);
                    this._cacheStyle[this._skin.id] = b
                }
                this.applySkinStyle(b)
            },
            _getPreloadImages: function (b, c) {
                return a.browser.ie == 6 || a.browser.ie == 7 ? [] : [b + "/images/suggess_list_bg.png?t=" + c, b + "/images/sprite_repeat_x_png.png?t=" + c, b + "/images/sprite_main_png.png?t=" + c]
            }
        }),
        A = new a.Class({
            init: function () {
                this.isInit = !0;
                this.curScene = null
            },
            getCurrentScene: function () {
                return this.curScene
            },
            applyScene: function (a) {
                this.curScene && this.closeScene();
                if (this.curScene = a)
                    if (alloy.appconfig.getAllConfig(a)) alloy.portal.runApp(a);
                    else {
                        this._iframeContainer = b.node("div", {
                            id: "sceneGrid",
                            "class": "sceneGrid",
                            style: "position:absolute;left:0;top:0;overflow:hidden;width:100%;height:100%;z-index:-1;"
                        });
                        this._iframeContext = b.node("div");
                        this._iframeContext.innerHTML = '<iframe id ="iframeScene" frameborder="no" border="0" class ="iframeScene" allowtransparency="true" style ="position:absolute;left:0;top:0;overflow:hidden;width:100%;height:100%;background-color:transparent;"></iframe>';
                        this._iframeContainer.appendChild(this._iframeContext);
                        var c = b.id("zoomWallpaperGrid");
                        c ? alloy.layout.getDesktop().body.insertBefore(this._iframeContainer, c) : alloy.layout.getDesktop().body.appendChild(this._iframeContainer);
                        b.id("iframeScene").src = a
                    }
            },
            closeScene: function (a) {
                a = a || this.curScene;
                if (alloy.appconfig.getAllConfig(a))(a = alloy.portal.getApp(a)) && a.isRunning() && a.exit();
                else if (a = b.id("sceneGrid")) b.id("iframeScene").src = "domain.html", a.parentNode.removeChild(a)
            }
        }),
        x = new a.Class({
            init: function () {},
            getCurrentTheme: function () {
                return this._themeId
            },
            applyTheme: function (a, b) {
                this._themeId = a;
                var c = this.getConfig(a),
                    d = c.skin,
                    e = c.scene,
                    c = c.wallpaper;
                l.applyWallpaper(c.url, c.mode);
                j.applySkin(d);
                b || p.applyScene(e)
            },
            getConfig: function (b) {
                if (a.isObject(b)) return b;
                else if (d.themeConfig[b]) {
                    var c = d.themeConfig[b];
                    c.wallpaper.url = c.wallpaper.url.indexOf("http://") >= 0 ? c.wallpaper.url : alloy.util.getCdnUrlById(c.wallpaper.url.length) + "style/wallpaper/" + c.wallpaper.url;
                    return d.themeConfig[b]
                }
                return {}
            }
        });
    this.applyTheme =
        function (b, c) {
            a.browser.mobileSafari && b == "theme_gravity" && (b = "theme_cloud");
            g.applyTheme(b, c)
    };
    this.setTheme = function (b) {
        b.wallpaper.id = "themeSetting_urlWallpaper";
        this.applyTheme(b);
        if (a.isObject(b)) {
            b = {};
            b.skin = j.getCurrentSkin();
            var c = l.getCurrentWallpaper(),
                c = {
                    id: "themeSetting_urlWallpaper",
                    mode: l.getCurrentMode(),
                    url: c
                };
            b.wallpaper = c;
            alloy.config.setCustomTheme(b)
        } else d.themeConfig[b] && alloy.config.setTheme(b)
    };
    this.getCurrentThemeID = function () {
        return g.getCurrentTheme()
    };
    this.applyWallpaper =
        function (a, b) {
            l.applyWallpaper(a, b)
    };
    this.setWallpaper = function (a, b) {
        l.applyWallpaper(a, b);
        /(\.jpg)|(\.jpeg)|(\.bmp)|(\.gif)|(\.png)$/i.test(a) || (b = "iframe");
        var c = {
            id: "themeSetting_urlWallpaper",
            mode: b,
            url: a
        }, c = {
                skin: j.getCurrentSkin(),
                wallpaper: c
            };
        alloy.config.setCustomTheme(c)
    };
    this.getCurrentWallpaper = function () {
        return l.getCurrentWallpaper()
    };
    this.resetWallpaper = function () {
        l.reset()
    };
    this.applySkin = function (a) {
        j.applySkin(a)
    };
    this.setSkin = function (a) {
        j.applySkin(a);
        a = l.getCurrentWallpaper();
        a = {
            id: "themeSetting_urlWallpaper",
            mode: l.getCurrentMode(),
            url: a
        };
        a = {
            skin: j.getCurrentSkin(),
            wallpaper: a
        };
        alloy.config.setCustomTheme(a)
    };
    this.applyScene = function (a) {
        p.applyScene(a)
    };
    this.setScene = function () {};
    this.getCurrentSkin = function () {
        return j.getCurrentSkin()
    };
    this.init = function () {
        var a = b.id("skinTemplate");
        w = a.innerHTML;
        document.body.removeChild(a);
        g = new x;
        j = new h;
        l = new c;
        p = new A;
        e.addObserver(alloy.portal, "UACReady", y);
        e.addObserver(alloy.portal, "portalReady", z);
        typeof progress == "function" &&
            progress("themenanager init")
    };
    var z = function () {
        if (!alloy.config.getWallpaper().id) {
            var b = alloy.config.getTheme().id,
                c = d.themeConfig[b].scene,
                b = 0;
            if (a.browser.ie == 6 || a.browser.ie == 7) b = 500;
            setTimeout(function () {
                p.applyScene(c)
            }, b)
        }
    }, y = function () {
            if (alloy.portal.getUin() && alloy.portal.getSkey()) {
                var a = alloy.config.getTheme().id,
                    b = alloy.config.getWallpaper().id,
                    c = alloy.config.getWallpaper().mode,
                    e = alloy.config.getWallpaper().url,
                    f = alloy.config.getAppearance().id;
                b ? (d.applyWallpaper(e, c), d.applySkin(f),
                    d.applyScene()) : d.applyTheme(a, !0)
            } else s ? u(s) : q();
            s && s.done && d.themeArray.push(s) && (s = null)
        }, u = function (a) {
            o = o || {
                id: "",
                mode: "repeat"
            };
            alloy.rpcService.selfSend(alloy.CONST.MAIN_URL + "web2/get_msg_tip?retype=1&tp=3", {
                method: "get",
                onSuccess: function (b) {
                    if (b.f == 1) a.done = !0, o.id = "theme_" + a.id;
                    q()
                },
                onError: function () {
                    q()
                }
            })
        }
});
Jx().$package("alloy.appconfig", function (a) {
    var d = this,
        b = a.event,
        e = a.localStorage,
        d = this,
        g = !1,
        j = !1,
        l = 0,
        p = 0,
        o = 0,
        s = 0;
    this.appConfigList = {};
    this.appTempList = {};
    this.jumptoAppList = {
        "mail.qq.com": {
            appid: 522005705,
            daid: 4
        },
        "qzone.qq.com": {
            appid: 54900912,
            daid: 5
        },
        "t.qq.com": {
            appid: 46000101,
            daid: 6
        }
    };
    var v = /mail\.qq\.com|qzone\.qq\.com|t\.qq\.com/;
    this.makeUrl = function (b) {
        if (a.isString(b)) {
            var d = b.match(/^(http:\/\/|https:\/\/)([^\/\?#$]*)/);
            if (d && d[2] && (d = d[2].match(v)) && d[0]) {
                var d = this.jumptoAppList[d[0]],
                    e = a.cookie.get("pt4_token", "web2.qq.com");
                if (d && e) return "http://ptlogin2.qq.com/pt4_web_jump?pt4_token=" + e + "&daid=" + d.daid + "&appid=" + d.appid + "&succ_url=" + encodeURIComponent(b)
            }
        }
        return b
    };
    this.systemConfigList = {
        50: {
            id: 50,
            appUrl: "",
            appName: "QQ",
            al: null,
            category: 7,
            iconUrl: "111",
            "New Property": "Value..",
            minWidth: "260",
            width: "280",
            settingCenter: "0",
            windowMode: "none",
            ipadincompatible: 0,
            provider: "Tencent \u817e\u8baf",
            ver: "2.3",
            alterMode: "",
            flashMode: "",
            appDesc: "WebQQ\u662f\u7531Tencent\u63d0\u4f9b\u7684\u7f51\u9875IM\u670d\u52a1\uff0c\u652f\u6301\u5728\u7ebf\u804a\u5929\u3001\u4f20\u8f93\u6587\u4ef6\u3001\u622a\u56fe\u3001\u6d88\u606f\u8bb0\u5f55\u6f2b\u6e38\u7b49\u591a\u79cd\u529f\u80fd\u3002",
            height: "560",
            loginLevel: "1",
            defaultMode: "",
            cannotUninstall: "1",
            powerLevel: "3",
            reportName: "eqq",
            appType: 1
        },
        taskBar: {
            id: "taskBar",
            appName: "\u4efb\u52a1\u680f",
            appType: 1,
            appLevel: "system",
            js: "./js/qqweb.system.module.js",
            windowMode: "none",
            customLoginValidate: !0,
            settingCenter: 0
        },
        dock: {
            id: "dock",
            appName: "dock",
            appType: 1,
            appLevel: "system",
            css: "./module/dock/style.css",
            js: "./module/dock/main.js",
            windowMode: "none"
        },
        tips: {
            id: "tips",
            appName: "tips",
            appType: 1,
            appLevel: "system",
            js: "./js/qqweb.system.module.js",
            windowMode: "none",
            customLoginValidate: !1,
            settingCenter: 0
        },
        shareComponent: {
            id: "shareComponent",
            appName: "shareComponent",
            appType: 1,
            appLevel: "system",
            js: "./module/sharecomponent/main.js",
            css: "./module/sharecomponent/style.css",
            windowMode: "none",
            customLoginValidate: !1,
            settingCenter: 0
        },
        helper: {
            id: "helper",
            appName: "WebQQ\u5c0f\u52a9\u624b",
            appName: "Q+ Web\u5c0f\u52a9\u624b",
            appType: 1,
            appLevel: "system",
            css: "./module/helper/style.css",
            js: "./module/helper/main.js",
            width: 358,
            height: 230,
            right: 5,
            bottom: 5,
            hasCloseButton: !0,
            settingCenter: 0
        },
        bubbleTip: {
            id: "bubbleTip",
            appName: "\u6c14\u6ce1\u63d0\u793a",
            appType: 1,
            appLevel: "system",
            css: "./module/bubbletip/qqweb.app.bubbletip.css",
            js: "./module/bubbletip/qqweb.app.bubbletip.js",
            windowMode: "none"
        },
        qqWebIme: {
            id: "qqWebIme",
            appName: "QQ\u4e91\u8f93\u5165\u6cd5",
            appType: 1,
            appLevel: "system",
            css: "./module/qqwebime/style.css",
            js: "./module/qqwebime/main.js",
            windowMode: "none",
            customLoginValidate: !1,
            click2run: 1,
            quickPanelIcon: "./style/images/pinyin.png",
            settingCenter: 0
        },
        qqHandWrite: {
            id: "qqHandWrite",
            appName: "QQ\u4e91\u624b\u5199\u677f",
            appType: 2,
            appLevel: "system",
            appUrl: qqweb.CONST.MAIN_URL + "module/qqhandwrite/qqhandwrite.html?" + qqweb.CONST.UPDATE_TIME_STAMP,
            hasCloseButton: !0,
            hasMaxButton: !1,
            hasMinButton: !1,
            modeSwitch: !1,
            resize: !1,
            width: 445,
            height: 292,
            right: 1,
            bottom: 1,
            hasToolBar: 0,
            loginLevel: alloy.CONST.LOGIN_LEVEL_NONE
        },
        qqWebDict: {
            id: "qqWebDict",
            appName: "QQ\u4e91\u8bcd\u5178",
            appType: 1,
            appLevel: "system",
            css: "./module/qqwebdict/style.css",
            js: "./module/qqwebdict/main.js",
            windowMode: "none",
            customLoginValidate: !1,
            settingCenter: 0
        },
        appBar: {
            id: "appBar",
            appName: "appBar",
            appType: 1,
            appLevel: "system",
            css: "./module/appbar/qqweb.app.appbar.css",
            js: "./module/appbar/qqweb.app.appbar.js",
            windowMode: "none",
            settingCenter: 0
        },
        appMarket: {
            id: "appMarket",
            appName: "\u5e94\u7528\u5e02\u573a",
            appType: 2,
            appDesc: "\u5e94\u7528\u5e02\u573a\u662fWebQQ\u7ed9\u7f51\u53cb\u6dfb\u52a0\u5e94\u7528\u7684\u5e73\u53f0\uff0c\u63d0\u4f9b\u6700\u70ed\uff0c\u6700\u65b0\u7684\u5e94\u7528\uff0c\u7f51\u53cb\u5206\u4eab\u4e5f\u5c3d\u5728\u5176\u4e2d\u3002",
            appDesc: "\u5e94\u7528\u5e02\u573a\u662fQ+ Web\u7ed9\u7f51\u53cb\u6dfb\u52a0\u5e94\u7528\u7684\u5e73\u53f0\uff0c\u63d0\u4f9b\u6700\u70ed\uff0c\u6700\u65b0\u7684\u5e94\u7528\uff0c\u7f51\u53cb\u5206\u4eab\u4e5f\u5c3d\u5728\u5176\u4e2d\u3002",
            appLevel: "system",
            appUrl: qqweb.CONST.MAIN_URL + "module/appmarket/appmarket.html?" + qqweb.CONST.UPDATE_TIME_STAMP,
            hasCloseButton: !0,
            hasMinButton: !0,
            hasMaxButton: !0,
            modeSwitch: !0,
            resize: !0,
            width: 900,
            height: 570,
            hasToolBar: 0,
            loginLevel: alloy.CONST.LOGIN_LEVEL_NONE,
            quickPanel: 1,
            titleIcon: "http://0.web.qstatic.com/webqqpic/style/images/appmarket_icon.png",
            quickPanelIcon: "./style/images/appmarket.png?20111011001",
            settingCenter: 0
        },
        notifications: {
            id: "notifications",
            appName: "\u901a\u77e5\u8bbe\u7f6e",
            appType: 1,
            appLevel: "system",
            css: "./module/notifications/qqweb.app.notifications.css",
            js: "./module/notifications/qqweb.app.notifications.js",
            hasMinButton: !1,
            hasMaxButton: !1,
            hasOkButton: !0,
            hasCancelButton: !0,
            hasToolBar: 0,
            settingCenter: 0
        },
        themeSetting: {
            id: "themeSetting",
            appName: "\u4e3b\u9898\u8bbe\u7f6e",
            appType: 1,
            appLevel: "system",
            css: "./module/themesetting/qqweb.app.themesetting.css",
            js: "./module/themesetting/qqweb.app.themesetting.js",
            hasMinButton: !1,
            hasMaxButton: !1,
            hasToolBar: 0,
            resize: !1,
            settingCenter: 0
        },
        themeSetting2: {
            id: "themeSetting2",
            appName: "\u4e3b\u98982",
            appType: 1,
            appLevel: "system",
            css: "./module/themesetting2/qqweb.app.themesetting2.css",
            js: "./module/themesetting2/qqweb.app.themesetting2.js",
            hasMinButton: !1,
            hasMaxButton: !1,
            hasToolBar: 0,
            resize: !1,
            windowMode: "none",
            settingCenter: 0
        },
        notifySetting: {
            id: "notifySetting",
            appName: "QQ\u63d0\u9192",
            appType: 1,
            appLevel: "system",
            css: "./module/notifysetting/qqweb.app.notifysetting.css",
            js: "./module/notifysetting/qqweb.app.notifysetting.js",
            hasMinButton: !1,
            hasMaxButton: !1,
            hasOkButton: !0,
            hasCancelButton: !0,
            resize: !1,
            hasToolBar: 0,
            settingCenter: 0
        },
        desktopSetting: {
            id: "desktopSetting",
            appName: "\u684c\u9762\u8bbe\u7f6e",
            appType: 1,
            appLevel: "system",
            css: "./module/desktopsetting/style.css",
            js: "./module/desktopsetting/main.js",
            hasMinButton: !1,
            hasMaxButton: !1,
            hasOkButton: !0,
            hasCancelButton: !0,
            resize: !1,
            minWidth: 600,
            minHeight: 450,
            hasToolBar: 0,
            settingCenter: 0
        },
        hotkeySetting: {
            id: "hotkeySetting",
            appName: "\u70ed\u952e",
            appType: 1,
            appLevel: "system",
            css: "./module/hotkeysetting/qqweb.app.hotkeysetting.css",
            js: "./module/hotkeysetting/qqweb.app.hotkeysetting.js",
            hasMinButton: !1,
            hasMaxButton: !1,
            hasOkButton: !0,
            hasCancelButton: !0,
            resize: !1,
            hasToolBar: 0,
            settingCenter: 0
        },
        ienotification: {
            id: "ienotification",
            appType: 1,
            appLevel: "system",
            appName: "IE\u6d88\u606f\u63d0\u9192",
            css: "./module/ienotification/qqweb.app.ienotification.css",
            js: "./module/ienotification/qqweb.app.ienotification.js",
            windowMode: "none"
        },
        msgBubble: {
            id: "msgBubble",
            appType: 1,
            appLevel: "system",
            appName: "\u6d88\u606f\u8d70\u9a6c\u706f",
            css: "./module/messagebubble/qqweb.app.msgbubble.css",
            js: "./module/messagebubble/qqweb.app.msgbubble.js",
            windowMode: "none",
            settingCenter: 0
        },
        messageManager: {
            id: "messageManager",
            appType: 1,
            appLevel: "system",
            appName: "\u6d88\u606f\u7ba1\u7406\u5668",
            css: "./module/messagemanager/style.css",
            js: "./module/messagemanager/main.js",
            windowMode: "none"
        },
        chatLogViewer: {
            id: "chatLogViewer",
            appName: "\u804a\u5929\u8bb0\u5f55\u7ba1\u7406\u5668",
            appDesc: "WebQQ\u4e3a\u60a8\u63d0\u4f9b\u7684\u7fa4\u804a\u5929\u8bb0\u5f55\u6f2b\u6e38\u670d\u52a1\uff0c\u652f\u6301\u67e5\u770b7\u5929\u5185\u7fa4\u5185\u6d88\u606f\uff0c\u8fd8\u53ef\u4ee5\u76f4\u63a5\u4ece\u804a\u5929\u8bb0\u5f55\u91cc\u548c\u7fa4\u53cb\u53d1\u8d77\u4e34\u65f6\u4f1a\u8bdd\uff0c\u8d76\u5feb\u6765\u4f53\u9a8c\u5427\uff01",
            appDesc: "Q+ Web\u4e3a\u60a8\u63d0\u4f9b\u7684\u7fa4\u804a\u5929\u8bb0\u5f55\u6f2b\u6e38\u670d\u52a1\uff0c\u652f\u6301\u67e5\u770b7\u5929\u5185\u7fa4\u5185\u6d88\u606f\uff0c\u8fd8\u53ef\u4ee5\u76f4\u63a5\u4ece\u804a\u5929\u8bb0\u5f55\u91cc\u548c\u7fa4\u53cb\u53d1\u8d77\u4e34\u65f6\u4f1a\u8bdd\uff0c\u8d76\u5feb\u6765\u4f53\u9a8c\u5427\uff01",
            appType: 1,
            appLevel: "system",
            css: "./module/chatlogviewer/qqweb.app.chatlogviewer.css",
            js: "./module/chatlogviewer/qqweb.app.chatlogviewer.js",
            loginLevel: alloy.CONST.LOGIN_LEVEL_ALL,
            windowMode: "multi",
            needApp: ["eqq"],
            settingCenter: 0
        },
        userDetails: {
            id: "userDetails",
            appName: "\u8be6\u7ec6\u8d44\u6599",
            appType: 1,
            appLevel: "system",
            css: "./module/userdetails/qqweb.app.userdetails.css",
            js: "./module/userdetails/qqweb.app.userdetails.js",
            loginLevel: alloy.CONST.LOGIN_LEVEL_NOCHAT,
            windowMode: "multi",
            hasToolBar: 0,
            needApp: ["eqq"],
            settingCenter: 0
        },
        avatarChanger: {
            id: "avatarChanger",
            appName: "\u66f4\u6362\u5934\u50cf",
            appType: 1,
            appLevel: "system",
            css: "./module/avatarchanger/qqweb.app.avatarchanger.css",
            js: "./module/avatarchanger/qqweb.app.avatarchanger.js",
            loginLevel: alloy.CONST.LOGIN_LEVEL_NOCHAT,
            needApp: ["eqq"],
            width: 550,
            windowType: "EqqWindow",
            height: 395,
            resize: !1,
            hasMinButton: !1,
            hasMaxButton: !1,
            hasOkButton: !0,
            hasCancelButton: !0,
            hasToolBar: 0,
            settingCenter: 0
        },
        groupDetails: {
            id: "groupDetails",
            appName: "\u7fa4\u8be6\u7ec6\u8d44\u6599",
            appType: 1,
            appLevel: "system",
            css: "./module/groupdetails/qqweb.app.groupdetails.css",
            js: "./module/groupdetails/qqweb.app.groupdetails.js",
            loginLevel: alloy.CONST.LOGIN_LEVEL_NOCHAT,
            windowMode: "multi",
            hasToolBar: 0,
            needApp: ["eqq"],
            settingCenter: 0
        },
        groupSystemMsg: {
            id: "groupSystemMsg",
            appName: "\u7fa4\u7cfb\u7edf\u6d88\u606f",
            appType: 1,
            appLevel: "system",
            css: "./module/groupsystemmsg/qqweb.app.groupsystemmsg.css",
            js: "./module/groupsystemmsg/qqweb.app.groupsystemmsg.js",
            loginLevel: alloy.CONST.LOGIN_LEVEL_NOCHAT,
            windowMode: "multi",
            hasToolBar: 0,
            windowType: "EqqWindow",
            needApp: ["eqq"],
            settingCenter: 0
        },
        appIntroduce: {
            id: "appIntroduce",
            appType: 1,
            appName: "\u5e94\u7528\u4ecb\u7ecd",
            appLevel: "system",
            appDesc: "\u5728\u8fd9\u91cc\uff0c\u5e94\u7528\u4ecb\u7ecd",
            provider: "Tencent \u817e\u8baf",
            ver: "1.0",
            css: "./module/appintroduce/qqweb.app.appintroduce.css",
            js: "./module/appintroduce/qqweb.app.appintroduce.js",
            loginLevel: alloy.CONST.LOGIN_LEVEL_NOCHAT,
            width: 620,
            height: 500,
            windowMode: "multi",
            hasToolBar: 0,
            resize: !1,
            hasMinButton: !1,
            hasMaxButton: !1,
            settingCenter: 0
        },
        buddyAdder: {
            id: "buddyAdder",
            appName: "\u6dfb\u52a0\u597d\u53cb",
            appType: 1,
            appLevel: "system",
            css: "./module/buddyadder/qqweb.app.buddyadder.css",
            js: "./module/buddyadder/qqweb.app.buddyadder.js",
            loginLevel: alloy.CONST.LOGIN_LEVEL_ALL,
            windowMode: "multi",
            windowType: "EqqWindow",
            hasToolBar: 0,
            needApp: ["eqq"],
            settingCenter: 0
        },
        buddyFinder: {
            id: "buddyFinder",
            appName: "\u67e5\u627e\u597d\u53cb/\u7fa4",
            appDesc: "WebQQ\u4e3a\u4f60\u63d0\u4f9b\u7684\u67e5\u627eQQ\u7fa4\u670d\u52a1\uff0c\u652f\u6301\u901a\u8fc7\u7fa4\u53f7\u7801\uff0c\u5173\u952e\u5b57\u67e5\u627e\u60a8\u6240\u9700\u8981\u7684\u7fa4\u3002\u8be5\u670d\u52a1\u9700\u8981\u767b\u9646QQ\u624d\u80fd\u4f7f\u7528\u3002",
            appDesc: "Q+ Web\u4e3a\u4f60\u63d0\u4f9b\u7684\u67e5\u627eQQ\u7fa4\u670d\u52a1\uff0c\u652f\u6301\u901a\u8fc7\u7fa4\u53f7\u7801\uff0c\u5173\u952e\u5b57\u67e5\u627e\u60a8\u6240\u9700\u8981\u7684\u7fa4\u3002\u8be5\u670d\u52a1\u9700\u8981\u767b\u9646QQ\u624d\u80fd\u4f7f\u7528\u3002",
            appType: 1,
            appLevel: "system",
            css: "./module/buddyfinder/qqweb.app.buddyfinder.css",
            js: "./module/buddyfinder/qqweb.app.buddyfinder.js",
            loginLevel: alloy.CONST.LOGIN_LEVEL_ALL,
            width: 540,
            height: 362,
            modeSwitch: !1,
            resize: !1,
            hasMinButton: !1,
            hasToolBar: 0,
            hasMaxButton: !1,
            hasNextButton: !0,
            windowType: "EqqWindow",
            hasCancelButton: !0,
            needApp: ["eqq"],
            settingCenter: 0
        },
        screenLocker: {
            id: "screenLocker",
            appName: "\u9501\u5c4f",
            appType: 1,
            appLevel: "system",
            css: "./module/screenlocker/qqweb.app.screenlocker.css",
            js: "./module/screenlocker/qqweb.app.screenlocker.js",
            windowMode: "none",
            hasToolBar: 0,
            settingCenter: 0
        },
        screenCapture: {
            id: "screenCapture",
            appName: "\u622a\u5c4f",
            appType: 1,
            appLevel: "system",
            css: "./module/screencapture/qqweb.app.screencapture.css",
            js: "./module/screencapture/qqweb.app.screencapture.js",
            windowMode: "none",
            settingCenter: 0
        },
        screenCapture2: {
            id: "screenCapture2",
            appName: "webtop\u622a\u5c4f",
            appType: 1,
            appLevel: "system",
            css: "./module/screencapture2/style.css",
            js: "./module/screencapture2/main.js",
            windowMode: "none",
            settingCenter: 0
        },
        settingCenter: {
            id: "settingCenter",
            appName: "\u7cfb\u7edf\u8bbe\u7f6e",
            appType: 1,
            appLevel: "system",
            css: "./module/settingcenter/qqweb.app.settingcenter.css",
            js: "./module/settingcenter/qqweb.app.settingcenter.js",
            hasCloseButton: !0,
            hasMinButton: !1,
            hasMaxButton: !1,
            resize: !1,
            hasToolBar: 0,
            settingCenter: 0
        },
        explorer: {
            id: "explorer",
            appName: "\u8d44\u6e90\u7ba1\u7406\u5668",
            appType: 1,
            appLevel: "system",
            css: "./module/explorer/style.css",
            js: "./module/explorer/main.js",
            hasCloseButton: !0,
            hasMinButton: !0,
            hasMaxButton: !0,
            resize: !0,
            hasToolBar: 0,
            settingCenter: 0,
            windowMode: "multi"
        },
        diskExplorer: {
            id: "diskExplorer",
            appName: "\u6211\u7684\u7f51\u76d8",
            appType: 1,
            appLevel: "system",
            css: "./module/diskexplorer/style.css",
            js: "./module/diskexplorer/main.js",
            hasCloseButton: !0,
            hasMinButton: !0,
            hasMaxButton: !0,
            resize: !0,
            hasToolBar: 0,
            settingCenter: 0,
            windowMode: "multi"
        },
        layoutSaver: {
            id: "layoutSaver",
            appName: "\u8bb0\u5fc6\u684c\u9762\u5e03\u5c40",
            appType: 1,
            appLevel: "system",
            css: "./module/layoutsaver/qqweb.app.layoutsaver.css",
            js: "./module/layoutsaver/qqweb.app.layoutsaver.js",
            windowMode: "none",
            settingCenter: 0
        },
        sceneChristmas: {
            id: "sceneChristmas",
            appName: "\u5723\u8bde\u5feb\u4e50",
            appType: 1,
            appLevel: "system",
            css: "./scene/christmas/style.css",
            js: "./scene/christmas/main.js",
            settingCenter: 0
        },
        gravity: {
            id: "gravity",
            appName: "\u83ca\u82b1",
            appType: 1,
            appLevel: "system",
            css: "./scene/gravity/style.css",
            js: "./scene/gravity/main.js",
            settingCenter: 0
        },
        urlSave: {
            id: "urlSave",
            appType: 1,
            appName: "\u4e00\u952e\u53e6\u5b58\u4e3a\u5e94\u7528",
            appLevel: "system",
            appDesc: "\u5728\u8fd9\u91cc\uff0c\u4e00\u952e\u53e6\u5b58\u4e3a",
            ver: "1.0",
            css: "./module/urlsave/qqweb.app.urlsave.css",
            js: "./module/urlsave/qqweb.app.urlsave.js",
            loginLevel: alloy.CONST.LOGIN_LEVEL_NOCHAT,
            width: 688,
            height: 398,
            hasMinButton: !1,
            hasMaxButton: !1,
            resize: !1,
            hasOkButton: !0,
            hasCancelButton: !0,
            hasToolBar: 0,
            settingCenter: 0
        },
        activityGameCollection: {
            id: "activityGameCollection",
            appName: "WebGame\u5927\u96c6\u5408",
            appDesc: "WebGame\u5927\u96c6\u5408,\u7cbe\u9009WebGame,\u7545\u4eab\u5a31\u4e50",
            appType: 1,
            appLevel: "system",
            css: "./activity/gamecollection/style.css",
            js: "./activity/gamecollection/main.js",
            hasCloseButton: !0,
            hasMinButton: !1,
            hasToolBar: 0,
            width: 740,
            height: 530,
            loginLevel: alloy.CONST.LOGIN_LEVEL_NONE,
            settingCenter: 0
        },
        activityChildsday: {
            id: "activityChildsday",
            appName: "\u513f\u7ae5\u8282\u5927\u96c6\u5408",
            appDesc: "\u513f\u7ae5\u8282\u5927\u96c6\u5408,\u7545\u4eab\u5a31\u4e50",
            appType: 1,
            appLevel: "system",
            css: "./activity/childsday/style.css",
            js: "./activity/childsday/main.js",
            hasCloseButton: !0,
            hasMinButton: !1,
            hasToolBar: 0,
            width: 940,
            height: 550,
            loginLevel: alloy.CONST.LOGIN_LEVEL_NONE,
            settingCenter: 0
        },
        activity3366: {
            id: "activity3366",
            appName: "3366\u6d3b\u52a8",
            appDesc: "3366\u6d3b\u52a8",
            appType: 1,
            appLevel: "system",
            css: "./activity/3366/style.css",
            js: "./activity/3366/main.js",
            hasCloseButton: !0,
            hasMinButton: !1,
            hasToolBar: 0,
            width: 940,
            height: 550,
            loginLevel: alloy.CONST.LOGIN_LEVEL_NONE,
            settingCenter: 0
        },
        restoreSetting: {
            id: "restoreSetting",
            appName: "\u7cfb\u7edf\u8fd8\u539f",
            appType: 1,
            appLevel: "system",
            css: "./module/restoresetting/style.css",
            js: "./module/restoresetting/main.js",
            hasMinButton: !1,
            hasMaxButton: !1,
            hasOkButton: !0,
            hasCancelButton: !0,
            resize: !1,
            hasToolBar: 0,
            settingCenter: 0
        },
        mapLocation: {
            id: "mapLocation",
            appName: "html5\u5730\u56fe\u5b9a\u4f4d",
            appType: 2,
            x: 1,
            y: 420,
            appDesc: "html5\u5730\u56fe\u5b9a\u4f4d",
            appLevel: "system",
            appUrl: qqweb.CONST.MAIN_URL + "module/maplocation/maplocation.html",
            width: 224,
            height: 185,
            windowType: "widget",
            hasToolBar: 0,
            loginLevel: alloy.CONST.LOGIN_LEVEL_NONE,
            settingCenter: 0
        },
        selectBuddy: {
            id: "selectBuddy",
            appName: "\u9009\u62e9\u8054\u7cfb\u4eba",
            appDesc: "\u9009\u62e9\u8054\u7cfb\u4eba",
            appType: 1,
            appLevel: "system",
            css: "./module/selectbuddy/style.css",
            js: "./module/selectbuddy/main.js",
            loginLevel: alloy.CONST.LOGIN_LEVEL_NOCHAT,
            windowMode: "multi",
            settingCenter: 0
        },
        99999: {
            id: "99999",
            appName: "\u89c6\u9891\u804a\u5929",
            appType: 2,
            width: 384,
            height: 320,
            hasMinButton: !1,
            hasMaxButton: !1,
            appLevel: "system",
            appUrl: "http://vcall.hehehi.com",
            hasToolBar: 0,
            powerLevel: 3
        },
        cloud: {
            id: "cloud",
            appName: "\u4e91\u6735",
            appType: 1,
            appLevel: "system",
            css: "./scene/cloud/style.css",
            js: "./scene/cloud/main.js",
            settingCenter: 0
        },
        activitySaturday: {
            id: "activitySaturday",
            appName: "\u793c\u62dc\u516d\u56e2\u961f\u4e13\u8bbf",
            appDesc: "\u793c\u62dc\u516d\u56e2\u961f\u4e13\u8bbf\u3002",
            appType: 1,
            appLevel: "system",
            css: "./activity/saturday/style.css",
            js: "./activity/saturday/main.js",
            hasCloseButton: !0,
            hasMinButton: !1,
            hasMaxButton: !0,
            resize: !0,
            hasToolBar: 0,
            width: 900,
            height: 550,
            loginLevel: alloy.CONST.LOGIN_LEVEL_NONE,
            settingCenter: 0
        },
        activityXindongfang: {
            id: "activityXindongfang",
            appName: "\u6dfb\u52a0\u65b0\u4e1c\u65b9\u5e94\u7528\uff0c\u8d62\u53d6\u8d2d\u8bfe\u4ee3\u91d1\u5238",
            appDesc: "\u6dfb\u52a0\u65b0\u4e1c\u65b9\u5e94\u7528\uff0c\u8d62\u53d6\u8d2d\u8bfe\u4ee3\u91d1\u5238",
            appType: 1,
            appLevel: "system",
            css: "./activity/xindongfang/style.css",
            js: "./activity/xindongfang/main.js",
            hasCloseButton: !0,
            hasMinButton: !1,
            hasMaxButton: !0,
            hasToolBar: 0,
            width: 780,
            height: 530,
            loginLevel: alloy.CONST.LOGIN_LEVEL_NONE,
            settingCenter: 0
        },
        appGrant: {
            id: "appGrant",
            appName: "\u5e94\u7528\u6388\u6743",
            appType: 1,
            appLevel: "system",
            css: "./module/appgrant/qqweb.app.grant.css",
            js: "./module/appgrant/qqweb.app.grant.js",
            windowMode: "none",
            hasToolBar: 0,
            settingCenter: 0
        },
        imgViewer: {
            id: "imgViewer",
            appName: "Q+ Web\u56fe\u7247\u64ad\u653e\u5668",
            appDesc: "Q+ Web\u56fe\u7247\u64ad\u653e\u5668",
            appType: 1,
            css: "./module/imgviewer/qqweb.img.viewer.css",
            js: "./module/imgviewer/qqweb.img.viewer.js",
            hasToolBar: 0,
            width: 760,
            height: 502,
            minWidth: 390,
            minHeight: 155,
            loginLevel: alloy.CONST.LOGIN_LEVEL_NONE,
            quickPanel: 1,
            settingCenter: 0
        },
        docViewer: {
            id: "docViewer",
            appName: "Q+ Web\u6587\u6863\u6d4f\u89c8\u5668",
            appDesc: "Q+ Web\u6587\u6863\u6d4f\u89c8\u5668",
            appType: 2,
            appUrl: qqweb.CONST.MAIN_URL + "module/docviewer/docviewer.html",
            hasToolBar: 0,
            width: 1E3,
            height: 540,
            minWidth: 300,
            minHeight: 320,
            exinfo: {
                powerLevel: 20
            },
            powerLevel: 20,
            quickPanel: 1,
            loginLevel: alloy.CONST.LOGIN_LEVEL_NONE,
            settingCenter: 0
        },
        audioPlayer: {
            id: "audioPlayer",
            appName: "Q+ Web\u97f3\u9891\u64ad\u653e\u5668",
            appDesc: "Q+ Web\u97f3\u9891\u64ad\u653e\u5668",
            appType: 2,
            appUrl: qqweb.CONST.MAIN_URL + "module/audioplayer/audioplayer.html?" + qqweb.CONST.UPDATE_TIME_STAMP,
            windowType: "widget",
            hasToolBar: 0,
            hasMinButton: !0,
            hasMaxButton: !1,
            width: 228,
            height: 84,
            loginLevel: alloy.CONST.LOGIN_LEVEL_NONE,
            quickPanel: 1,
            quickPanelIcon: "./style/images/audioplayer.gif",
            settingCenter: 0,
            powerLevel: 200,
            exinfo: {
                powerLevel: 200
            }
        },
        messageCenter: {
            id: "messageCenter",
            appName: "\u6d88\u606f\u4e2d\u5fc3",
            appDesc: "Q+ Web \u6d88\u606f\u4e2d\u5fc3",
            appType: 2,
            appLevel: "system",
            appUrl: qqweb.CONST.MAIN_URL + "module/messagecenter/messagecenter.html?" + qqweb.CONST.UPDATE_TIME_STAMP,
            hasCloseButton: !0,
            hasMinButton: !0,
            hasMaxButton: !1,
            modeSwitch: !0,
            resize: !1,
            width: 640,
            height: 482,
            hasToolBar: 0,
            loginLevel: alloy.CONST.LOGIN_LEVEL_NOCHAT,
            settingCenter: 0,
            quickPanel: 1
        }
    };
    this.getAppConfigList = function () {
        return this.appConfigList
    };
    this.getAllConfig = function (a) {
        return w(a, this.appConfigList) ||
            w(a, this.systemConfigList)
    };
    this.getAppConfig = function (b) {
        if ((b = w(b, this.appConfigList)) && (a.isUndefined(b.id) || a.isUndefined(b.appName))) b = null, alloy.util.report2m(151399);
        return b
    };
    this.getSystemConfig = function (a) {
        return w(a, this.systemConfigList)
    };
    this.isAppConfigLoad = function () {
        return j
    };
    var w = function (a, b) {
        if (a && a.call) {
            var d = [],
                e;
            for (e in b) {
                var c = b[e];
                a(c) && d.push(c)
            }
            return d
        } else return b[a]
    };
    this.clearConfig = function () {
        this.appConfigList = {}
    };
    this.addAppConfigList = function (e) {
        var g = e.result.resultData;
        a.profile("AddAppConfigList");
        for (var j in g) g[j] ? g[j].isDel ? (alloy.config.setDeleteAppList(g[j].id), delete g[j]) : (g[j].title = g[j].appName, g[j].type = g[j].appType, a.extend(g[j], g[j].exinfo)) : delete g[j];
        a.extend(this.appConfigList, g);
        a.profile("AddAppConfigListEnd");
        b.notifyObservers(d, "AddAppConfigList", e)
    };
    this.addAppConfig = function (e) {
        a.profile("addAppConfig");
        this.appConfigList[e.id] = a.extend(e, e.exinfo);
        var g = {
            appid: e.id,
            value: 1,
            type: 0
        };
        e.id < 1E5 && t(g);
        b.notifyObservers(d, "AddAppConfig", e);
        if ((g =
            alloy.system.getApp("appMarket")) && g._iframe) g._iframe.contentWindow.appMarket.onAddAppConfig(e)
    };
    this.addAppConfigTemp = function (b) {
        a.profile("addAppConfig Temp");
        this.appConfigList[b.id] = a.extend(b, b.exinfo)
    };
    this.updateAppConfig = function (e) {
        a.profile("updateAppConfig");
        this.appConfigList[e.id] = e;
        b.notifyObservers(d, "UpdateAppConfig", e)
    };
    this.removeAppConfig = function (e) {
        a.profile("removeAppConfig");
        delete this.appConfigList[e.id];
        var g = {
            appid: e.id,
            value: -1,
            type: 0
        };
        e.id < 1E5 && t(g);
        b.notifyObservers(d,
            "RemoveAppConfig", e);
        if ((g = alloy.system.getApp("appMarket")) && g._iframe) g._iframe.contentWindow.appMarket.onRemoveAppConfig(e)
    };
    this.setNewSystemAppCount = function (a) {
        p = a
    };
    this.setNewAllAppCount = function (a) {
        o = a
    };
    this.getNewSystemAppCount = function () {
        return p
    };
    this.getNewAllAppCount = function () {
        return o
    };
    this.isQplusApp = function (a) {
        if (isNaN(a)) return !1;
        a = d.getAppConfig(a);
        return !a ? !1 : (a = a.gaid) && a >= 2E8 && a < 3E8 ? !0 : !1
    };
    var t = function (e) {
        alloy.config.isSetupAppListLoaded() && alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL +
            "cgi/qqweb/market/updateapphot.do", {
                context: d,
                method: "POST",
                data: {
                    appattrib: a.json.stringify(e),
                    vfwebqq: alloy.portal.getVfWebQQ()
                },
                arguments: e,
                onSuccess: function (b) {
                    b.retcode !== 0 && a.out("\u5e94\u7528\u6b21\u6570\u6dfb\u52a0\u5931\u8d25" + b.errmsg)
                },
                onError: function (e) {
                    a.out("\u5e94\u7528\u6b21\u6570\u6dfb\u52a0\u5931\u8d25");
                    b.notifyObservers(d, "SetAppCountError", e)
                }
            })
    }, r = function (f, k) {
            alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + k, {
                context: d,
                method: "POST",
                arguments: f.appid,
                timeout: 2E4,
                data: {
                    appattrib: a.json.stringify(f),
                    vfwebqq: alloy.portal.getVfWebQQ()
                },
                onSuccess: function (m) {
                    if (m.retcode === 0)
                        if (typeof progress == "function" && progress("get_appinfo end"), alloy.util.report2qqweb("config|appconfig|success"), g) alloy.util.report2h("get_def_appinfo", "end"), this.addAppConfigList(m), e.setItem("UPDATE_TIME_STAMP", alloy.CONST.UPDATE_TIME_STAMP), e.setItem("defaultAppConfig", a.json.stringify(d.getAppConfigList())), b.notifyObservers(d, "GetDefaultAppConfigComplete", this.getAppConfigList()), a.profile("\u9ed8\u8ba4app config\u5b8c\u6210"),
                    alloy.util.report2h("def_appinfo", "end");
                    else {
                        alloy.util.report2h("get_appinfo", "end");
                        b.notifyObservers(d, "GetAppConfigAsPartSuccess", m.result);
                        l++;
                        var p = alloy.config.getSetupAppList(),
                            c = l * 100,
                            h = (l + 1) * 100;
                        this.addAppConfigList(m);
                        c < p.length ? (p = p.slice(c, h), r({
                            appid: p,
                            loadMethod: 3,
                            val: ["appName", "appType", "appUrl", "iconUrl", "id", "category", "exinfo", "al"]
                        }, "keycgi/qqweb/market/getappinfonew.do")) : (j = !0, a.isUndefined(m.userflag) || alloy.portal.setIsNewUser(m.userflag == 0 ? !0 : !1), b.notifyObservers(d, "GetAppConfigComplete",
                            this.getAppConfigList()), alloy.portal.speedTest.sRTS(5, "end", new Date, !0), a.profile("\u81ea\u5b9a\u4e49app config\u5b8c\u6210"))
                    } else m.retcode == 1E5 ? (timeoutConfirm("\u767b\u5f55\u4fe1\u606f\u8d85\u65f6,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f"), alloy.util.report2qqweb("config|appconfig|logintimeout"), s < 1 ? (++s, r(f, k)) : (timeoutConfirm("\u767b\u5f55\u4fe1\u606f\u8d85\u65f6,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f"), alloy.util.report2qqweb("config|appconfig|logintimeout"))) : (timeoutConfirm("\u83b7\u53d6\u5e94\u7528\u4fe1\u606f\u51fa\u9519,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f"),
                        alloy.util.report2qqweb("config|appconfig|reterror"), b.notifyObservers(d, "GetAppConfigError", m.resutlt), a.error("get app config \u8fd4\u56de\u7ed3\u679c\u4e0d\u6b63\u786e. data: " + m, "AppConfig"), s < 1 ? (++s, r(f, k)) : (timeoutConfirm("\u83b7\u53d6\u5e94\u7528\u4fe1\u606f\u51fa\u9519,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f"), alloy.util.report2qqweb("config|appconfig|reterror"), b.notifyObservers(d, "GetAppConfigError", m.resutlt), a.error("get app config \u8fd4\u56de\u7ed3\u679c\u4e0d\u6b63\u786e. data: " +
                            m, "AppConfig")));
                    qqweb.util.report2h("appinfo", "end", ["ok"][m.retcode] || m.retcode)
                },
                onError: function (e) {
                    a.profile("GetAppConfigError");
                    qqweb.util.report2h(g ? "def_appinfo" : "appinfo", "end", "error");
                    b.notifyObservers(d, "GetAppConfigError", e.resutlt);
                    timeoutConfirm("\u83b7\u53d6\u5e94\u7528\u4fe1\u606f\u51fa\u9519,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f");
                    alloy.util.report2qqweb("config|appconfig|error");
                    s < 1 ? (++s, r(f, k)) : (qqweb.util.report2h(g ? "def_appinfo" : "appinfo", "end", "error"), b.notifyObservers(d,
                        "GetAppConfigError", e.resutlt), timeoutConfirm("\u83b7\u53d6\u5e94\u7528\u4fe1\u606f\u51fa\u9519,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f"), alloy.util.report2qqweb("config|appconfig|error"))
                },
                onTimeout: function (a) {
                    timeoutConfirm("\u83b7\u53d6\u5e94\u7528\u4fe1\u606f\u8d85\u65f6,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f");
                    alloy.util.report2qqweb("config|appconfig|timeout");
                    b.notifyObservers(d, "GetAppConfigError", a.resutlt);
                    qqweb.util.report2h(g ? "def_appinfo" : "appinfo", "end", "timeout");
                    s < 1 ? (++s, r(f,
                        k)) : (timeoutConfirm("\u83b7\u53d6\u5e94\u7528\u4fe1\u606f\u8d85\u65f6,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f"), alloy.util.report2qqweb("config|appconfig|timeout"), b.notifyObservers(d, "GetAppConfigError", a.resutlt), qqweb.util.report2h(g ? "def_appinfo" : "appinfo", "end", "timeout"))
                }
            })
        }, m = {
            onAlloyReady: function () {
                a.profile("UACReady\uff1a" + alloy.config.isSetupAppListLoaded());
                if (alloy.config.isSetupAppListLoaded())
                    if (j) b.notifyObservers(d, "GetAppConfigComplete");
                    else {
                        b.notifyObservers(d, "ClearDefaultApp");
                        var f;
                        f = alloy.config.getSetupAppList();
                        d.clearConfig();
                        g = !1;
                        l = 0;
                        f = f.slice(0, 100);
                        a.profile("\u62c9\u53d6\u81ea\u5b9a\u4e49app config");
                        alloy.util.report2h("appinfo", "start");
                        typeof progress == "function" && progress("get_appinfo start");
                        r({
                            appid: f,
                            loadMethod: 3,
                            val: ["appName", "appType", "appUrl", "iconUrl", "id", "category", "exinfo", "al", "gaid"]
                        }, "keycgi/qqweb/market/getappinfonew.do")
                    } else {
                        g = !0;
                        a.profile("\u62c9\u53d6\u9ed8\u8ba4app config", a.console.TYPE.WARNING);
                        alloy.util.report2h("def_appinfo", "start");
                        typeof progress == "function" && progress("get_def_appinfo start");
                        if (e.getItem("UPDATE_TIME_STAMP") == alloy.CONST.UPDATE_TIME_STAMP && (f = e.getItem("defaultAppConfig"))) {
                            d.appConfigList = a.json.parse(f);
                            b.notifyObservers(d, "GetDefaultAppConfigComplete", d.getAppConfigList());
                            a.profile("\u9ed8\u8ba4app config\u5b8c\u6210");
                            alloy.util.report2h("def_appinfo", "end");
                            return
                        }
                        r({
                                appid: alloy.config.getDefaultSetupAppList(),
                                loadMethod: 3,
                                val: ["appName", "appType", "appUrl", "iconUrl", "id", "category", "exinfo", "al", "gaid"]
                            },
                            "keycgi/qqweb/market/getdefaultappinfonew.do")
                    }
            },
            onReset: function () {
                j = !1
            }
        };
    b.addObserver(alloy.portal, "reset", m.onReset);
    b.addObserver(alloy.portal, "AlloyReady", m.onAlloyReady)
});
Jx().$package("alloy.hotkeyManager", function (a) {
    var d = a.event,
        b = this,
        e = !0,
        g = !1,
        j = {
            eqq_chatbox_read: {
                id: "eqq_chatbox_read",
                name: "\u63d0\u53d6\u6700\u65b0\u6d88\u606f",
                limit: !0,
                keys: [{
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 90,
                    des: "Ctrl + Alt + Z"
                }, {
                    ctrlKey: 0,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 87,
                    des: "Alt + W"
                }]
            },
            eqq_chatbox_sendmsg: {
                id: "eqq_chatbox_sendmsg",
                name: "\u53d1\u9001\u6d88\u606f",
                limit: !0,
                mutexKeys: [{
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 0,
                    keyCode: 13,
                    selected: !0,
                    des: "Ctrl + Enter"
                }, {
                    ctrlKey: 0,
                    shiftKey: 0,
                    altKey: 0,
                    keyCode: 13,
                    des: "Enter"
                }],
                keys: [{
                    ctrlKey: 0,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 83,
                    des: "Alt + S"
                }]
            },
            eqq_chatbox_classall: {
                id: "eqq_chatbox_classall",
                name: "\u5173\u95ed\u6240\u6709\u804a\u5929\u7a97\u53e3",
                limit: !0,
                keys: [{
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 67,
                    des: "Ctrl + Alt + C"
                }]
            },
            open_msg_manager: {
                id: "open_msg_manager",
                name: "\u6253\u5f00\u6d88\u606f\u7ba1\u7406\u5668",
                limit: !0,
                keys: [{
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 83,
                    des: "Ctrl + Alt + S"
                }]
            },
            layout_window_current_close: {
                id: "layout_window_current_close",
                name: "\u5173\u95ed\u5f53\u524d\u7a97\u53e3",
                disable: !1,
                keys: [{
                    ctrlKey: 0,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 67,
                    des: "Alt + C"
                }]
            },
            layout_window_closeall: {
                id: "layout_window_closeall",
                name: "\u5173\u95ed\u6240\u6709\u5e94\u7528\u7a97\u53e3",
                limit: !0,
                keys: [{
                    ctrlKey: 0,
                    shiftKey: 1,
                    altKey: 1,
                    keyCode: 81,
                    des: "Alt + Shift + Q"
                }]
            },
            layout_window_goleft: {
                id: "layout_window_goleft",
                name: "\u5207\u6362\u5230\u4e0a\u4e00\u4e2a\u7a97\u53e3",
                limit: !0,
                keys: [{
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 0,
                    keyCode: 37,
                    des: "Ctrl + \u2190"
                }]
            },
            layout_window_goright: {
                id: "layout_window_goright",
                name: "\u5207\u6362\u5230\u4e0b\u4e00\u4e2a\u7a97\u53e3",
                limit: !0,
                keys: [{
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 0,
                    keyCode: 39,
                    des: "Ctrl + \u2192"
                }]
            },
            layout_showdesktop: {
                id: "layout_showdesktop",
                name: "\u663e\u793a\u684c\u9762",
                limit: !0,
                keys: [{
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 68,
                    des: "Ctrl + Alt + D"
                }]
            },
            layout_screencaptrue: {
                id: "layout_screencaptrue",
                name: "\u622a\u5c4f",
                keys: [{
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 65,
                    des: "Ctrl + Alt + A"
                }, {
                    ctrlKey: 1,
                    shiftKey: 1,
                    altKey: 1,
                    keyCode: 65,
                    des: "Ctrl + Shift + Alt + A"
                }]
            },
            layout_lock: {
                id: "layout_lock",
                name: "\u9501\u5b9a",
                limit: !0,
                keys: [{
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 76,
                    des: "Ctrl + Alt + L"
                }]
            },
            layout_exit: {
                id: "layout_exit",
                name: "\u6ce8\u9500",
                limit: !0,
                keys: [{
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 69,
                    des: "Ctrl + Alt + E"
                }]
            },
            layout_desktop_goleft: {
                id: "layout_desktop_goleft",
                name: "\u5207\u6362\u5230\u4e0a\u4e00\u4e2a\u684c\u9762",
                limit: !0,
                keys: [{
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 37,
                    des: "Ctrl + Alt + \u2190"
                }]
            },
            layout_desktop_goright: {
                id: "layout_desktop_goright",
                name: "\u5207\u6362\u5230\u4e0b\u4e00\u4e2a\u684c\u9762",
                limit: !0,
                keys: [{
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 39,
                    des: "Ctrl + Alt + \u2192"
                }]
            },
            layout_desktop_gospecific: {
                id: "layout_desktop_gospecific",
                name: "\u5207\u6362\u5230\u6307\u5b9a\u684c\u9762",
                limit: !0,
                des: "Ctrl + Alt + (1/2/3/4/5)",
                keys: [{
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 49,
                    des: "Ctrl + Alt + 1"
                }, {
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 50,
                    des: "Ctrl + Alt + 2"
                }, {
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 51,
                    des: "Ctrl + Alt + 3"
                }, {
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 52,
                    des: "Ctrl + Alt + 4"
                }, {
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 53,
                    des: "Ctrl + Alt + 5"
                }, {
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 97,
                    des: "Ctrl + Alt + 1"
                }, {
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 98,
                    des: "Ctrl + Alt + 2"
                }, {
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 99,
                    des: "Ctrl + Alt + 3"
                }, {
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 100,
                    des: "Ctrl + Alt + 4"
                }, {
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 101,
                    des: "Ctrl + Alt + 5"
                }]
            },
            layout_desktop_gosystem: {
                id: "layout_desktop_gosystem",
                name: "\u5feb\u901f\u6536\u8d77Q+ Web\u684c\u9762",
                limit: !0,
                disable: !0,
                des: "F2",
                keys: [{
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 48,
                    des: "Ctrl + Alt + 0"
                }, {
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 96,
                    des: "Ctrl + Alt + 0"
                }, {
                    ctrlKey: 0,
                    shiftKey: 0,
                    altKey: 0,
                    keyCode: 113,
                    des: "F2"
                }, {
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 192,
                    des: "Ctrl + Alt + `"
                }]
            },
            layout_desktop_manage: {
                id: "layout_desktop_manage",
                name: "\u5168\u5c40\u89c6\u56fe",
                limit: !0,
                keys: [{
                    ctrlKey: 1,
                    shiftKey: 0,
                    altKey: 1,
                    keyCode: 38,
                    des: "Ctrl + Alt + \u2191"
                }]
            }
        };
    this.addHotkeyInfo = function (a) {
        j[a.id] = a
    };
    this.getHotkeyInfo =
        function (a) {
            return j[a]
    };
    this.setHotkeyInfo = function (a, b) {
        j[a] = b
    };
    this.removeHotkeyInfo = function (a) {
        return j[a] ? (j[a] = null, delete j[a], !0) : !1
    };
    this.setHotkeyState = function (a) {
        e = a;
        d.notifyObservers(alloy.hotkeyManager, "hotkeyStateChanged", a)
    };
    this.isHotkeyEnable = function () {
        return e
    };
    this.setHotkeyLimitState = function (a) {
        g = a
    };
    this.isHotkeyLimited = function () {
        return g
    };
    this.setSendHotKey = function (a) {
        var d = b.getHotkeyInfo("eqq_chatbox_sendmsg");
        a.toString() == "true" ? (d.mutexKeys[0].selected = !1, d.mutexKeys[1].selected = !0) : (d.mutexKeys[0].selected = !0, d.mutexKeys[1].selected = !1);
        alloy.config.configList.isNotNeedCtrlKey = a
    };
    var l = function () {
        var a = alloy.config.configList.isNotNeedCtrlKey;
        a && b.setSendHotKey(a)
    };
    this.init = function () {
        d.addObserver(alloy.portal, "UACReady", l)
    }
});
Jx().$package("alloy.hotkey", function (a) {
    var d = this,
        b = a.dom,
        e = "\u622a\u5c4f",
        g = !1,
        j = new a.Class({
            hotkeyctrl: null,
            init: function () {
                if (this.detectPlugin())
                    if (a.browser.ie) {
                        var d = document.createElement("div");
                        b.addClass(d, "hidden_div");
                        d.innerHTML = '<object id="hotkeyctrlid" CLASSID="CLSID:E9E96A86-4CEC-4DBF-A5A2-37C8C7E66F1A" ></object>';
                        document.body.appendChild(d);
                        this.hotkeyctrl = document.getElementById("hotkeyctrlid").object
                    } else if (a.browser.firefox) d = document.createElement("div"), b.addClass(d, "hidden_div"),
                d.innerHTML = '<embed id="hotkeyctrlid" type="application/tencent-WebQQ-hotkey" hidden="true"></embed>', document.body.appendChild(d), this.hotkeyctrl = document.getElementById("hotkeyctrlid");
                else if (a.browser.chrome) d = document.createElement("div"), b.addClass(d, "hidden_div"), d.innerHTML = '<embed id="hotkeyctrlid" type="application/tencent-webqq-hotkey" hidden="true"></embed>', document.body.appendChild(d), this.hotkeyctrl = document.getElementById("hotkeyctrlid")
            },
            install: function () {
                if ((a.browser.ie || a.browser.firefox ||
                    a.browser.chrome) && this.detectPlugin()) {
                    var b = this.reghotkey(1, 3, 65);
                    b ? e = "\u622a\u5c4f(Ctrl + Alt + A)" : (b = this.reghotkey(1, 7, 65)) && (e = "\u622a\u5c4f(Ctrl + Alt + Shift + A)");
                    if (b) return this.regCallback(function () {
                        alloy.portal.runApp("screenCapture")
                    }), alloy.layout.removeHotKeyAction("layout_screencaptrue"), !0;
                    else setTimeout(function () {}, 1E3)
                }
                return !1
            },
            hotKeyBusy: function () {
                alloy.windowFactory.createWindow("Window", {
                    title: "\u6e29\u99a8\u63d0\u793a",
                    modeSwitch: !0,
                    dragable: !0,
                    resize: !0,
                    width: 380,
                    height: 120,
                    hasCloseButton: !0,
                    hasOkButton: !0,
                    isSetCentered: !0
                }).setHtml('<div style="width:100%; height:100%; background-color:#FFFFFF; line-height:60px;text-align:center; vertical-align:middle;">\t\t\t\t\t\t\t\u622a\u5c4f\u5feb\u6377\u952e\u5df2\u88ab\u5176\u4ed6\u7a0b\u5e8f\u5360\u7528,\u82e5\u8981\u8fdb\u884c\u622a\u5c4f,\u8bf7\u624b\u52a8\u70b9\u51fb\u622a\u5c4f\u6309\u94ae!\t\t\t\t\t\t   </div>')
            },
            detectPlugin: function () {
                try {
                    if (new ActiveXObject("hotkeyctrl.Hotkey")) return !0
                } catch (a) {
                    var b = navigator.mimeTypes["application/tencent-WebQQ-hotkey"];
                    if (b) {
                        if (b = b.enabledPlugin) return !0
                    } else {
                        if (b = navigator.mimeTypes["application/tencent-webqq-hotkey"])
                            if (b = b.enabledPlugin) return !0;
                        return !1
                    }
                }
            },
            reghotkey: function (a, b, d) {
                if (this.hotkeyctrl) return 0 == this.hotkeyctrl.reg(a, b, d) ? !0 : !1
            },
            regCallback: function (a) {
                if (this.hotkeyctrl) this.hotkeyctrl.onhotkey = a
            },
            unreg: function (a) {
                this.hotkeyctrl && this.hotkeyctrl.unreg(a)
            },
            unstall: function () {
                this.hotkeyctrl && this.hotkeyctrl.unreg(1);
                this.hotkeyctrl = null
            }
        });
    this.init = function () {
        d.scaptureHotkey = new j;
        g = d.scaptureHotkey.install();
        alloy.portal.addCloseHookForHotKey()
    };
    this.unstall = function () {
        d.scaptureHotkey && d.scaptureHotkey.unstall()
    };
    this.getHotKeyTitle = function () {
        return e
    };
    this.isRegisterSuccess = function () {
        return g
    }
});
Jx().$package(function (a) {
    var d = a.event;
    if (top.location.host != location.host) alloy.util.report2h("be_iframed", "start"), top.location = location;
    d.on(window, "load", function () {
        alloy.util.setTimingRpt(7723, 2, 2, 3)
    });
    a.profile("Hello everyone, welcome to Q+ Web, 100% loaded, we're starting... time: " + a.now());
    alloy.util.report2h("portal", "start");
    alloy.portal.speedTest.sRTS(7, "start", window._SPEEDTIME_WINDOWSTART);
    alloy.portal.speedTest.sRTS(7, "end", new Date, !0);
    alloy.portal.speedTest.sRTS(8, "start", new Date);
    d.on(window, "load", function () {
        alloy.init()
    })
});