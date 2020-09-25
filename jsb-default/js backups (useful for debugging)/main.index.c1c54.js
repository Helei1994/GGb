window.__require = function e(t, n, o) {
function a(r, l) {
if (!n[r]) {
if (!t[r]) {
var s = r.split("/");
s = s[s.length - 1];
if (!t[s]) {
var c = "function" == typeof __require && __require;
if (!l && c) return c(s, !0);
if (i) return i(s, !0);
throw new Error("Cannot find module '" + r + "'");
}
r = s;
}
var u = n[r] = {
exports: {}
};
t[r][0].call(u.exports, function(e) {
return a(t[r][1][e] || e);
}, u, u.exports, e, t, n, o);
}
return n[r].exports;
}
for (var i = "function" == typeof __require && __require, r = 0; r < o.length; r++) a(o[r]);
return a;
}({
AdsGroupController: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "33cefOnepxNGLHJRft0MgWH", "AdsGroupController");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../manager/LoadManager"), r = e("./AdsSetAndScene"), l = e("./AdsGroupPlatformTool"), s = e("./AdsQueue"), c = e("./AdsUnit"), u = e("../manager/SDKManager"), d = e("../Lib/LocalStorage"), p = e("../Lib/Global"), f = e("../manager/PanelManager"), h = cc._decorator, g = h.ccclass, y = (h.property, 
function(e) {
o(t, e);
function t() {
var t = e.call(this) || this;
t.isInShowAds = 0;
t.lastShowAdType = r.AdsType.Null;
t._noPage = !1;
t.adsShowTime = 0;
t.isThirty = !0;
t.dailyAdsMax = 25;
t.isUseAppsflyer = !1;
t.todayAdsNum = 0;
t.waitReadyTimes = 0;
t.isInBackLoad = !1;
t.admobAppid = "ca-app-pub-2588266171743528~3265360778";
t.waitReadyFunc = null;
t.todayAdsNum = Number(d.default.getItem("todayAdsNum", "todayAdsNum"));
return t;
}
n = t;
Object.defineProperty(t, "instance", {
get: function() {
null == this._instance && (this._instance = new n());
return this._instance;
},
enumerable: !1,
configurable: !0
});
t.prototype.init = function() {
this.adsShowTime = Number(d.default.getItem("adsShowTime", "0"));
this.checkDailyAdsFull();
this.initAdsUnit();
this.initAdsQueue();
this.initAdsScene();
this.initAdsPlacementUnits();
l.default.instance.init();
};
t.prototype.dataFromSever = function(e) {
this.severData = {};
var t = e.version.split(",");
if (this.adsSet.version >= Number(t[0]) || this.adsSet.version < Number(t[1])) console.log("versionLower"); else {
this.adsSet._fromServerInfo = !0;
this.adsSet.extraArgs = e.two[this.adsSet.appId];
this.adsSet.versionNeed = t[0];
this.adsSet.version = t[1];
this.adsSet.controlVersion = t[2];
this.getAdmobSet();
if (e.thr) {
this.severData.unit = [];
for (var n = (c = Object.keys(e.thr)).length, o = 0; o < n; o++) {
var a = c[o], i = e.thr[a].split("{");
i[1] = '{"id":' + a + ',"name":"' + i[0].slice(0, i[0].length - 1) + '",' + i[1];
this.severData.unit.push(JSON.parse(i[1]));
GlobalFun.log("severData[unit]:" + JSON.parse(i[1]));
}
}
if (e.one) {
this.severData.scence = [];
for (n = (c = Object.keys(e.one)).length, o = 0; o < n; o++) {
a = c[o];
var r = e.one[a].split(",");
if (r) {
var s = {
id: r[0],
queueID: r[1],
queueID_FB: r[2]
};
this.severData.scence.push(s);
}
}
}
if (e.four) {
this.severData.group = [];
var c;
for (n = (c = Object.keys(e.four)).length, o = 0; o < n; o++) {
a = c[o];
var u = e.four[a];
if (u) {
for (var d = "", p = u.idData.split(","), f = p.length, h = 0; h < f; h++) d += h != f - 1 ? p[h] + "|" : p[h];
var g = u.idName.split(",")[0], y = u.state;
(s = JSON.parse(u.keydata)).id = g;
s.type = y;
s.order = d;
this.severData.group.push(s);
GlobalFun.log("severData[group]:" + JSON.stringify(s));
}
}
}
this.checkDailyAdsFull();
this.reloadStaticInfos();
l.default.instance.init();
}
};
Object.defineProperty(t.prototype, "adsset", {
get: function() {
return this.adsSet;
},
enumerable: !1,
configurable: !0
});
t.prototype.addAdsShowTimes = function() {
this.todayAdsNum++;
this.adsShowTime++;
(1 == this.todayAdsNum || this.todayAdsNum % 5 == 0 && 0 != this.todayAdsNum) && u.default.instance.callJava("trackEventWithType", "(Ljava/lang/String;Ljava/lang/String;I)V", "DailyAdsNumCount", this.todayAdsNum, 1);
this.todayAdsNum >= this.dailyAdsMax && u.default.instance.callJava("trackEvent", "(Ljava/lang/String;)V", "DailyAdsFull");
d.default.saveItem("todayAdsNum", this.todayAdsNum.toString());
d.default.saveItem("adsShowTime", this.adsShowTime.toString());
};
t.prototype.checkDailyAdsFull = function() {
if (p.default.getTime() > Number(d.default.getItem("dailyAdsRefreshTime", "0"))) {
this.todayAdsNum = 0;
d.default.saveItem("todayAdsNum", this.todayAdsNum.toString());
d.default.saveItem("dailyAdsRefreshTime", p.default.getTomorrowTime() + "");
}
return this.todayAdsNum >= this.dailyAdsMax;
};
t.prototype.initAdsSet = function() {
var e = i.default.instance.getRes("/json/ads/ads_setting", cc.JsonAsset).json;
this.adsSet = new r.AdsSetting(e[0]);
};
t.prototype.initAdsScene = function() {
this.adsScene = {};
for (var e = this.adsSet._fromServerInfo ? this.severData.scence : i.default.instance.getRes("/json/ads/ads_scene", cc.JsonAsset).json, t = e.length, n = 0; n < t; n++) {
var o = e[n];
o && (this.adsScene[o.id] = new r.AdsScene(o));
}
};
t.prototype.initAdsQueue = function() {
this.adsQueue = {};
for (var e = this.adsSet._fromServerInfo ? this.severData.group : i.default.instance.getRes("/json/ads/ads_group", cc.JsonAsset).json, t = e.length, n = 0; n < t; n++) {
var o = e[n];
o && (this.adsQueue[o.id] = new s.default(o));
}
};
t.prototype.initAdsUnit = function() {
this.adsUnit = {};
for (var e = this.adsSet._fromServerInfo ? this.severData.unit : i.default.instance.getRes("/json/ads/ads_units", cc.JsonAsset).json, t = e.length, n = 0; n < t; n++) {
var o = e[n];
o && (this.adsUnit[o.id] = new c.default(o));
}
};
t.prototype.initAdsPlacementUnits = function() {
this.adsPlacementUnits = {};
if (!this.adsSet._fromServerInfo) for (var e = Object.keys(this.adsUnit), t = e.length, n = 0; n < t; n++) {
var o = this.adsUnit[e[n]];
o && (this.adsPlacementUnits[o.placementID] = o);
}
};
t.prototype.getAdsScence = function(e) {
return this.adsScene && this.adsScene[e] ? this.adsScene[e] : null;
};
t.prototype.getAdsQueue = function(e) {
return this.adsQueue[e] ? this.adsQueue[e] : null;
};
t.prototype.getAdsUnit = function(e) {
return this.adsUnit[e] ? this.adsUnit[e] : null;
};
t.prototype.getPlacementUnits = function(e) {
for (var t = [], n = Object.keys(this.adsUnit), o = n.length, a = 0; a < o; a++) {
var i = this.adsUnit[n[a]];
i && i.placementID == e && t.push(i);
}
return t;
};
t.prototype.reloadStaticInfos = function() {
this.adsScene = {};
this.adsQueue = {};
this.adsUnit = {};
this.adsPlacementUnits = {};
this.initAdsUnit();
this.initAdsQueue();
this.initAdsScene();
this.initAdsPlacementUnits();
};
t.prototype.loadAllAdsScene = function() {
for (var e = Object.keys(this.adsScene), t = e.length, n = 0; n < t; n++) {
var o = this.adsScene[e[n]];
if (o && o.queueID) {
var a = this.adsQueue[o.queueID];
a && a.load();
}
}
};
t.prototype.showAds = function(e, t) {
GlobalFun.log("showAds11111");
var n = this.getAdsScence(e);
if (n) {
var o = this.getAdsQueue(n.queueID);
o && o.showAds(t);
}
};
t.prototype.loadAds = function(e, t, o) {
void 0 === t && (t = !1);
void 0 === o && (o = !1);
n.instance._currAdsSceneId = e;
var a = this.getAdsScence(e);
GlobalFun.log("加载广告场景:adsScene" + a + "..." + e);
if (a) {
var i = this.getAdsQueue(a.queueID);
GlobalFun.log("加载广告策略adsScene:" + a + "..." + a.queueID);
if (i) {
i._isInPreload = !1;
i.load(o, t);
}
}
};
t.prototype._onPlacementReady = function(e, t, n) {
void 0 === t && (t = !1);
void 0 === n && (n = null);
for (var o = this.getPlacementUnits(e), a = o.length, i = 0; i < a; i++) {
var r = o[i];
if (!t && r.isAutoLoad) return;
r._isPreLoad ? u.default.instance.callJava("trackEventWithType", "(Ljava/lang/String;Ljava/lang/String;I)V", "OnAdsReadyInPreLoad", r.id, 1) : u.default.instance.callJava("trackEventWithType", "(Ljava/lang/String;Ljava/lang/String;I)V", "OnAdsReadyNotInPreLoad", r.id, 1);
r._isLoading = !1;
r._isReady = !0;
r._isFreshReady = !1;
r._isPreLoad = !1;
r._readyTime = p.default.getTime();
r._adObj = n;
}
};
t.prototype._onFreshPlacementReady = function(e) {
for (var t = this.getPlacementUnits(e), n = t.length, o = 0; o < n; o++) {
t[o]._isFreshReady = !0;
}
};
t.prototype._onPlacementLoadError = function(e, t, n) {
u.default.instance.callJava("trackEventWithType", "(Ljava/lang/String;Ljava/lang/String;I)V", "OnPlacementLoadError", e, 1);
for (var o, a = p.default.getTime(), i = this.getPlacementUnits(e), r = i.length, l = 0; l < r; l++) {
o = i[l];
if (!n && o.isAutoLoad) return;
if (t && o.noFillWait) {
o._isInNoFill = !0;
o._noFillStartTime = a;
}
o._isLoading = !1;
o._isReady = !1;
o._readyTime = 0;
}
};
t.prototype._onUnitClosedEvent = function(e, t) {
var n = this.getAdsUnit(e);
n && this._onUnitClosed(n, t);
};
t.prototype.checkAllAdsQueueLoadOnInit = function() {
for (var e = Object.keys(this.adsQueue), t = e.length, n = 0; n < t; n++) {
var o = this.adsQueue[e[n]];
o && o.checkLoadOnInit();
}
};
t.prototype._onUnitClosed = function(e, t) {
this.isInShowAds = p.default.getTime();
var n, o = this.getPlacementUnits(e.placementID), a = o.length;
GlobalFun.log("closeId " + e.placementID);
for (var i = 0; i < a; i++) {
(n = o[i])._isLoading = !1;
n._isReady = !1;
n._isFreshReady = !1;
n._readyTime = 0;
n._isShown = !1;
n._adObj = null;
n.destroyOnClosed && n.destroy();
}
var r = this.getAdsQueue(e._queueID);
GlobalFun.log("onUnitClosed _queueID1: " + e._queueID);
if (r) {
if (r._lastOnClosedCallback) {
if (t) {
this.addAdsShowTimes();
u.default.instance.callJava("adsAskStatistical", "(Ljava/lang/String;Ljava/lang/String;)V", "adsShowSuccessCountPlatform", this.getPlatformName(e.adsPlatform));
}
r._lastOnClosedCallback(e, t);
r._lastOnClosedCallback = null;
}
r._cancelLoading();
if (r.loadOnclose) {
var l = this.getAdsQueue(e._queueID);
if (l) {
l._isInPreload = !0;
l.load(!1, !0);
}
}
}
this.backAdsLoad();
};
t.prototype.isSceneAdsReady = function(e, t) {
var n = this.getAdsScence(e);
if (n) {
var o = this.getAdsQueue(n.queueID);
if (o) {
var a = o.isReady();
if (a) {
var i = o.getAdIndex(a.id);
return a && (i <= t || this.check(i, o.getCurloadAdsIndex(), t, a.price));
}
return !1;
}
}
return !1;
};
t.prototype.check = function(e, t, n, o) {
return -2 == n || (-1 == n && o != r.AdsPrice.Hide || t >= e);
};
t.prototype.isHighAdsReady = function(e) {
var t = this.getAdsScence(e);
if (t) {
var n = this.getAdsQueue(t.queueID);
if (n) {
var o = n.isReady();
return o && o.price <= r.AdsPrice.High;
}
}
return !1;
};
t.prototype.isScenceInLoad = function(e) {
var t = this.getAdsScence(e);
if (t) {
var n = this.getAdsQueue(t.queueID);
if (n) return n._isLoading;
}
return !1;
};
t.prototype.isScenceAdsInNofill = function(e) {
var t = this.getAdsScence(e);
if (t) {
var n = this.getAdsQueue(t.queueID);
if (n) return n.isAllAdsIsNofill();
}
return !0;
};
t.prototype.waitAdsReady = function(e, t, n, o, a, i, r, l, s, c) {
var d = this;
void 0 === i && (i = null);
void 0 === r && (r = null);
void 0 === l && (l = 0);
void 0 === s && (s = -1);
void 0 === c && (c = !1);
if (this.checkDailyAdsFull()) f.default.gameUi.showTishi(GlobalFun.i18n.t("lable.10254")); else {
u.default.instance.callJava("adsAskStatistical", "(Ljava/lang/String;Ljava/lang/String;)V", "adsScenceAskCount", e);
this._currAdsSceneId = e;
this.waitReadyTimes = 0;
var p = this.getAdsQueue(this.getAdsScence(e).queueID);
p && p.nullCurload();
if (this.isSceneAdsReady(e, s)) {
u.default.instance.callJava("adsAskStatistical", "(Ljava/lang/String;Ljava/lang/String;)V", "adsScenceShowCount", e);
this.schedule(t.bind(o), 0, 0, l);
} else {
n && n.bind(o)();
this.unschedule(this.waitReadyFunc);
var h = 0 == a ? cc.macro.REPEAT_FOREVER : a - 1;
this.waitReadyFunc = function() {
if (d.isSceneAdsReady(e, s)) {
GlobalFun.log("isScenceInLoad:  " + d.isScenceInLoad(e));
u.default.instance.callJava("adsAskStatistical", "(Ljava/lang/String;Ljava/lang/String;)V", "adsScenceShowCount", e);
t.bind(o)();
d.unschedule(d.waitReadyFunc);
} else {
if (d.waitReadyTimes >= h || d.isScenceAdsInNofill(e)) {
d.unschedule(d.waitReadyFunc);
if (d.isSceneAdsReady(e, -2) && t) {
u.default.instance.callJava("adsAskStatistical", "(Ljava/lang/String;Ljava/lang/String;)V", "adsScenceShowCount", e);
t.bind(o)();
} else i && i.bind(r)();
}
d.waitReadyTimes++;
c && 5 == d.waitReadyTimes && f.default.gameUi.showCancelLoadBtn();
61 == d.waitReadyTimes && f.default.gameUi.showCancelLoadBtn();
}
};
this.schedule(this.waitReadyFunc, .5, h, 0);
}
}
};
t.prototype.cancelWaitAdsReady = function() {
f.default.gameUi.openMask(!1);
this.unschedule(this.waitReadyFunc);
u.default.instance.callJava("trackEvent", "(Ljava/lang/String;)V", "CancelWaitAdsReady");
};
t.prototype._onUnitChangeLoading = function(e, t) {
for (var o = n.instance.getPlacementUnits(e.placementID), a = o.length, i = 0; i < a; i++) o[i]._isLoading = t;
};
t.prototype._onUnitChangeDestroy = function(e, t) {
for (var n = this.getPlacementUnits(e.placementID), o = n.length, a = 0; a < o; a++) {
n[a]._isDestroy = t;
}
};
t.prototype._onUnitChangeShown = function(e, t) {
for (var n = this.getPlacementUnits(e.placementID), o = n.length, a = 0; a < o; a++) {
n[a]._isShown = t;
}
};
t.prototype._onUnitClearNoFillState = function(e) {
for (var t = this.getPlacementUnits(e.placementID), n = t.length, o = 0; o < n; o++) {
var a = t[o];
a._isInNoFill = !1;
a._noFillStartTime = 0;
}
};
t.prototype.getAdmobSet = function() {
var e = "", t = "a";
if (this.adsSet) for (var n = this.adsSet.extraArgs.split(";"), o = n.length, a = 0; a < o; a++) for (var i = n[a].split(":"), r = i.length, l = 0; l < r; l++) "VungleVideoPlacements" == i[0] ? e = i[1] : "VunglePagePlacements" == i[0] ? t = i[1] : "isThirty" == i[0] ? this.isThirty = "true" == i[1] : "dailyAdsMax" == i[0] ? this.dailyAdsMax = Number(i[1]) : "isUseAppsflyer" == i[0] && (this.isUseAppsflyer = "true" == i[1]);
return this.admobAppid + ";" + e + ";" + t;
};
Object.defineProperty(t.prototype, "noPage", {
get: function() {
return this._noPage;
},
set: function(e) {
this._noPage = e;
},
enumerable: !1,
configurable: !0
});
t.prototype.getPlatformName = function(e) {
switch (e) {
case r.AdsPlatform.Admob:
return "Admob";

case r.AdsPlatform.Facebook:
return "Facebook";

case r.AdsPlatform.Applovin:
return "Applovin";

case r.AdsPlatform.IronSource:
return "IronSource";

case r.AdsPlatform.Mobvista:
return "Mobvista";

case r.AdsPlatform.Unity:
return "Unity";

case r.AdsPlatform.Vungle:
return "Vungle";
}
};
t.prototype.backAdsLoad = function() {
var e = this;
if (!this.isInBackLoad) {
this.isInBackLoad = !0;
this.schedule(function() {
if (!e.isSceneAdsReady("BackAdLoad", -2) && !e.getAdsQueue(e.getAdsScence("BackAdLoad").queueID)._isLoading) {
console.log("BackAdLoad");
e.loadAds("BackAdLoad");
}
}, 120, cc.macro.REPEAT_FOREVER, 0);
}
};
t.prototype.DelayFunc = function(e, t) {
this.scheduleOnce(e, t);
};
var n;
return t = n = a([ g ], t);
}(cc.Component));
n.default = y;
cc._RF.pop();
}, {
"../Lib/Global": "Global",
"../Lib/LocalStorage": "LocalStorage",
"../manager/LoadManager": "LoadManager",
"../manager/PanelManager": "PanelManager",
"../manager/SDKManager": "SDKManager",
"./AdsGroupPlatformTool": "AdsGroupPlatformTool",
"./AdsQueue": "AdsQueue",
"./AdsSetAndScene": "AdsSetAndScene",
"./AdsUnit": "AdsUnit"
} ],
AdsGroupPlatformTool: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0c652WGxtNEw45ylU0FCrYp", "AdsGroupPlatformTool");
var o = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = e("./AdsGroupController"), i = e("../manager/SDKManager"), r = e("./AdsSetAndScene"), l = e("../manager/PanelManager"), s = e("../Config/Config"), c = e("../Lib/Global"), u = cc._decorator, d = u.ccclass, p = (u.property, 
function() {
function e() {}
t = e;
Object.defineProperty(e, "instance", {
get: function() {
if (!this._instance) {
this._instance = new t();
window.AdsGroupPlatformTool = this._instance;
}
return this._instance;
},
enumerable: !1,
configurable: !0
});
e.prototype.init = function() {
if (window.ExternalInterface) {
window.ExternalInterface.addCallback("onAdsReady", this.onAdsReady);
window.ExternalInterface.addCallback("onAdsClosed", this.onAdsClosed);
window.ExternalInterface.addCallback("showAdsScene", this.showAdsScene);
window.ExternalInterface.addCallback("onAdsLoadError", this.onAdsLoadError);
} else GlobalFun.log("window[ 'ExternalInterface' ]为空");
this.m_isPageMode = !0;
this.sendAdmobString();
a.default.instance.checkAllAdsQueueLoadOnInit();
};
e.prototype.isAdsReady = function(e) {
var t = e.placementID, n = e.adsPlatform, o = e.type;
return i.default.instance.callJava("isAdsReady", "(IILjava/lang/String;)Z", Number(n), Number(o), t);
};
e.prototype.loadAds = function(e) {
GlobalFun.log("loadAds " + e.placementID);
var t = e.id, n = e.placementID, o = e.adsPlatform, a = e.type;
i.default.instance.callJava("loadAds", "(IILjava/lang/String;Ljava/lang/String;)V", Number(o), Number(a), n, t);
};
e.prototype.showAds = function(e) {
GlobalFun.log("showAds" + e.placementID);
if (e.adsPlatform != r.AdsPlatform.Self) {
var t = e.id, n = e.placementID, o = e.adsPlatform, a = e.type;
i.default.instance.callJava("showAds", "(IIILjava/lang/String;)V", Number(o), Number(a), Number(t), n);
} else l.default.instance.openPanel(s.PanelName.VideoPanel, l.default.gameUi.node, e.id);
};
e.prototype.sendAdmobString = function() {
GlobalFun.log("sendAdmobString");
i.default.instance.callJava("sendAdmobString", "(Ljava/lang/String;)V", a.default.instance.getAdmobSet());
};
e.prototype.test = function() {
i.default.instance.callJava("jsSend", "(Ljava/lang/String;)V", "jsSend");
};
e.prototype.jsLog = function(e, t) {
GlobalFun.log(e + "  " + t);
};
e.prototype.showFBInstantGameAd = function(e, n) {
null != n && n.showAsync().then(function() {
t.instance.onAdsClosed(e + ":1");
}, function(n) {
t.instance.onAdsClosed(e + ":0");
});
};
e.prototype.showAdsScene = function(e) {
GlobalFun.log("showAdsScene: " + e);
};
e.prototype.onAdsReady = function(e) {
GlobalFun.log("onAdsReady: " + e);
var t = e.split(":");
a.default.instance._onPlacementReady(t[0], "true" == t[1] || "1" == t[1]);
};
e.prototype.onAdsClosed = function(e) {
GlobalFun.log("onAdsClosed: " + e);
var t = e.split(":");
a.default.instance._onUnitClosedEvent(Number(t[0]), "1" == t[1]);
};
e.prototype.onAdsLoadError = function(e) {
GlobalFun.log("onAdsLoadError: " + e);
var t = e.split(":");
a.default.instance._onPlacementLoadError(t[0], "1" == t[1], !0);
};
e.prototype.getAdmobString = function() {
GlobalFun.log("getAdmobString: ");
};
e.prototype.AdLoadTest = function(e) {
e.price == r.AdsPrice.Top ? 1203 == e.id ? this.onAdsReady(e.placementID + ":0") : c.default.Random(0, 99) < 15 ? this.onAdsReady(e.placementID + ":0") : this.onAdsLoadError(e.placementID + ":1") : e.price == r.AdsPrice.High ? c.default.Random(0, 99) < 15 ? this.onAdsReady(e.placementID + ":0") : this.onAdsLoadError(e.placementID + ":1") : e.price == r.AdsPrice.Middle ? c.default.Random(0, 99) < 25 ? this.onAdsReady(e.placementID + ":0") : this.onAdsLoadError(e.placementID + ":1") : e.price == r.AdsPrice.Low ? c.default.Random(0, 99) < 25 ? this.onAdsReady(e.placementID + ":0") : this.onAdsLoadError(e.placementID + ":1") : e.price == r.AdsPrice.Auto && (c.default.Random(0, 99) < 90 ? this.onAdsReady(e.placementID + ":0") : this.onAdsLoadError(e.placementID + ":1"));
};
e.prototype.showAdTest = function(e) {
a.default.instance._onUnitClosedEvent(e.id, !0);
};
var t;
return e = t = o([ d ], e);
}());
n.default = p;
cc._RF.pop();
}, {
"../Config/Config": "Config",
"../Lib/Global": "Global",
"../manager/PanelManager": "PanelManager",
"../manager/SDKManager": "SDKManager",
"./AdsGroupController": "AdsGroupController",
"./AdsSetAndScene": "AdsSetAndScene"
} ],
AdsQueue: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "56a24XzDpxPpJpEyW8XXTG6", "AdsQueue");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = e("./AdsSetAndScene"), i = e("./AdsGroupController"), r = e("./AdsGroupPlatformTool"), l = function(e) {
o(t, e);
function t(t) {
var n = e.call(this) || this;
n.isIgnoreIsReady = !1;
n.id = t.id;
n.subQueueMembersCountInPriority = Number(t.subQueue);
n.loadOnInit = Number(t.initLoad);
n.loadOnclose = Number(t.closeLoad);
n.loadMethod = Number(t.loadMethod);
n.subQueueLoadTimeout = 1e3 * Number(t.subTimeout);
n.type = t.type;
n.adsUnitsIDs = t.order.split("|");
n.loadMethodPrice = Number(t.loadMethodPrice);
n.highestIndex = Number(t.highestIndex);
n.getAdsUnit();
n.init();
return n;
}
t.prototype.init = function() {
this._inLoadingCount = 0;
this._isInPreload = !1;
this._isInTurnLoading = !1;
this._isLoading = !1;
this._timer = 0;
this._showCount = 0;
};
t.prototype.showAds = function(e) {
if (this.type == a.AdsQueueType.INVALID) return null;
var t = this.getReady();
if (t) {
this._lastOnClosedCallback = e;
t._queueID = this.id;
t.show() ? this._showCount++ : t = null;
} else e(null, !1);
return t;
};
t.prototype.getReady = function() {
if (this.type == a.AdsQueueType.INVALID) return null;
for (var e, t, n, o = {
value: 0
}, i = this.adsUnitsInfos.length; ;) {
var r = o.value;
e = r;
if (!this._gainLoadingCount(o)) break;
for (var l = (r = o.value) - e, s = 0; e < r; e++, s++) {
if (this.type == a.AdsQueueType.TURNS) {
t = (e + this._showCount * this.subQueueMembersCountInPriority) % i;
} else t = this.type == a.AdsQueueType.TURNS_PRIORITY ? r - l + (s + this._showCount) % l : e;
if ((n = this.adsUnitsInfos[t]).isReady()) return n;
}
}
return null;
};
t.prototype.load = function(e, t) {
void 0 === e && (e = !1);
void 0 === t && (t = !1);
this.isIgnoreIsReady = t;
if (this.type != a.AdsQueueType.INVALID) {
this.subQueueLoadTimeout || (e = !1);
for (var n = this.adsUnitsInfos.length, o = 0; o < n; o++) {
var i = this.adsUnitsInfos[o];
if (i) {
i.refreshReadyState(!1);
i.prior && i.load(!0);
}
}
if (!(this.isReady() && !this.isIgnoreIsReady || this.isIgnoreIsReady && this.isHighReady())) {
!e && this.subQueueLoadTimeout || !this._isInTurnLoading || this._cancelLoading();
if (!this._isLoading) {
this._cancelLoading();
this._isLoading = !0;
this._isInTurnLoading = !1;
this._inLoadingCount = 0;
this._timer = 0;
this._openLoading(e);
}
}
}
};
t.prototype.isReady = function() {
return this.type != a.AdsQueueType.INVALID && this.getReady();
};
t.prototype.isHighReady = function() {
if (this.type == a.AdsQueueType.INVALID) return !1;
var e = this.getReady();
return e && this.getAdIndex(e.id) <= this.highestIndex || e && this.getCurloadAdsIndex() >= this.getAdIndex(e.id);
};
t.prototype.checkLoadOnInit = function() {
if (this.loadOnInit) {
this._isInPreload = !0;
this.load();
}
};
t.prototype.isAllAdsIsNofill = function() {
for (var e = this.adsUnitsIDs.length, t = 0; t < e; t++) {
var n = this.adsUnitsIDs[t], o = i.default.instance.getAdsUnit(n);
if (o && !o.isInNoFillWithRefreshNoFillState() && !o.isReady()) return !1;
}
return !0;
};
t.prototype.getCurloadAdsPrice = function() {
return this._curLoadAdUnits ? this._curLoadAdUnits.price : a.AdsPrice.Top;
};
t.prototype.nullCurload = function() {
this._curLoadAdUnits = null;
};
t.prototype.getAdIndex = function(e) {
for (var t = this.adsUnitsIDs.length, n = 0; n < t; n++) if (this.adsUnitsIDs[n] == e) return n;
return 0;
};
t.prototype.getCurloadAdsIndex = function() {
if (!this._curLoadAdUnits) return 0;
for (var e = this._curLoadAdUnits.id, t = this.adsUnitsIDs.length, n = 0; n < t; n++) if (this.adsUnitsIDs[n] == e) return n;
return 0;
};
t.prototype.getAdsUnit = function() {
this.adsUnitsInfos = [];
for (var e = this.adsUnitsIDs.length, t = 0; t < e; t++) {
var n = this.adsUnitsIDs[t], o = i.default.instance.getAdsUnit(n);
if (o) {
o._queueID = this.id;
this.adsUnitsInfos.push(o);
}
}
};
t.prototype._gainLoadingCount = function(e) {
var t = this.adsUnitsInfos.length;
if (e.value >= t) return !1;
e.value += this.subQueueMembersCountInPriority;
e.value > t && (e.value = t);
return !0;
};
t.prototype._openLoading = function(e) {
var t, n = this;
this._isInThread = !0;
this._isInTurnLoading = this.checkTurnLoading(this.loadMethod) && !e;
this.lastIndex = 0;
this._inLoadingCount = 0;
var o = this.adsUnitsInfos.length;
this.subFunc = function() {
n.lastIndex = n._inLoadingCount;
var i = {
value: n._inLoadingCount
};
if (!n._gainLoadingCount(i)) {
n._inLoadingCount = i.value;
return !1;
}
n._inLoadingCount = i.value;
for (var l = n._inLoadingCount - n.lastIndex, s = 0; n.lastIndex < n._inLoadingCount; n.lastIndex++, 
s++) {
if (n.type == a.AdsQueueType.TURNS) {
var c = n._showCount * n.subQueueMembersCountInPriority;
t = (n.lastIndex + c) % o;
} else t = n.type == a.AdsQueueType.TURNS_PRIORITY ? n._inLoadingCount - l + (s + n._showCount) % l : n.lastIndex;
var u = n.adsUnitsInfos[t];
if (u.price == a.AdsPrice.Auto && n._isInPreload && u.adsPlatform == a.AdsPlatform.Admob) r.default.instance.onAdsLoadError(u.placementID + ":0"); else {
n._curLoadAdUnits = u;
u.load(n._isInPreload);
n._isInTurnLoading = n.checkTurnLoading(n.loadMethod) && !e;
}
}
return !0;
};
this.schedule(this.loadFun.bind(this), .5, cc.macro.REPEAT_FOREVER);
};
t.prototype._cancelLoading = function() {
this._isLoading = !1;
this._inLoadingCount = 0;
this.unscheduleAllCallbacks();
this._isInThread = !1;
this._isInTurnLoading = !1;
};
t.prototype.loadFun = function() {
if (this.isReady() && !this.isIgnoreIsReady || this.isHighReady() || !this._isLoading) this._cancelLoading(); else {
this.startNewCheck = 0 == this._inLoadingCount;
if (!this.startNewCheck) {
this.startNewCheck = !0;
for (this.lastIndex = 0; this.lastIndex < this._inLoadingCount; this.lastIndex++) if (this.adsUnitsInfos[this.lastIndex]._isLoading) {
this.startNewCheck = !1;
break;
}
}
if (this._isInTurnLoading) {
if (this.startNewCheck && !this.subFunc()) {
this._cancelLoading();
return;
}
} else if (this._timer > 400 && !this.startNewCheck) this._timer -= 500; else {
this._timer = this.subQueueLoadTimeout;
if (!this.subFunc()) {
this._cancelLoading();
return;
}
}
}
};
t.prototype.checkTurnLoading = function(e) {
return 2 == this.loadMethod && this._curLoadAdUnits ? this._curLoadAdUnits.price <= this.loadMethodPrice : this.loadMethod;
};
return t;
}(cc.Component);
n.default = l;
cc._RF.pop();
}, {
"./AdsGroupController": "AdsGroupController",
"./AdsGroupPlatformTool": "AdsGroupPlatformTool",
"./AdsSetAndScene": "AdsSetAndScene"
} ],
AdsSetAndScene: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d2a41ztzlFAQrms9uD1dD8M", "AdsSetAndScene");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.AdsSetting = n.AdsScene = n.AdsQueueType = n.AdsPrice = n.AdsPlatform = n.AdsType = void 0;
(function(e) {
e[e.Video = 1] = "Video";
e[e.Page = 2] = "Page";
e[e.Native = 3] = "Native";
e[e.Other = 4] = "Other";
e[e.Null = 5] = "Null";
})(n.AdsType || (n.AdsType = {}));
(function(e) {
e[e.Facebook = 1] = "Facebook";
e[e.Admob = 2] = "Admob";
e[e.Vungle = 3] = "Vungle";
e[e.Unity = 4] = "Unity";
e[e.Mobvista = 5] = "Mobvista";
e[e.IronSource = 6] = "IronSource";
e[e.Applovin = 7] = "Applovin";
e[e.Self = 8] = "Self";
})(n.AdsPlatform || (n.AdsPlatform = {}));
(function(e) {
e[e.Top = 1] = "Top";
e[e.High = 2] = "High";
e[e.Middle = 3] = "Middle";
e[e.Low = 4] = "Low";
e[e.Auto = 5] = "Auto";
e[e.Hide = 6] = "Hide";
})(n.AdsPrice || (n.AdsPrice = {}));
(function(e) {
e[e.INVALID = 0] = "INVALID";
e[e.ABSOLUTE_PRIORITY = 1] = "ABSOLUTE_PRIORITY";
e[e.TURNS = 2] = "TURNS";
e[e.TURNS_PRIORITY = 3] = "TURNS_PRIORITY";
})(n.AdsQueueType || (n.AdsQueueType = {}));
var o = function() {
return function(e) {
this.id = e.id;
this.queueID = e.queueID;
};
}();
n.AdsScene = o;
var a = function() {
return function(e) {
this._fromServerInfo = !1;
this.id = e.id;
this.appId = e.appID;
this.versionNeed = e.versionNeed;
this.version = e.version;
this.mainServer = e.mainServer;
this.secondServer = e.secondServer;
this.controlVersion = e.controlVersion;
this.extraArgs = e.extraArgs;
};
}();
n.AdsSetting = a;
cc._RF.pop();
}, {} ],
AdsUnit: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "89c9axPrChNBpK5onk/8j0a", "AdsUnit");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("./AdsSetAndScene"), a = e("./AdsGroupController"), i = e("./AdsGroupPlatformTool"), r = e("../manager/MyRoleDataManager"), l = e("../Config/Config"), s = e("../Lib/Global"), c = e("../manager/SDKManager"), u = function() {
function e(e) {
this._isFreshReady = !1;
this.loadTime = 0;
this.id = e.id;
this.name = e.name;
this.appID = e.appID;
this.placementID = e.placementID;
this.limitTime = 1e3 * Number(e.limitMinutes) * 60;
this.type = e.type;
this.adsPlatform = Number(e.platform);
this.destroyOnClosed = Number(e.destroyOnClose);
this.prior = Number(e.prior);
this.isAutoLoad = Number(e.isAutoLoad);
this.noFillWait = 1e3 * e.noFillWait;
this.price = e.price;
this.init();
}
e.prototype.init = function() {
this._isDestroy = !1;
this._queueID = 0;
this._readyTime = 0;
this._isReady = !1;
this._isFreshReady = !1;
this._isLoading = !1;
this._isShown = !1;
this._isInNoFill = !1;
this._noFillStartTime = 0;
this._adObj = null;
this._isPreLoad = !1;
};
e.prototype.isReady = function() {
if (this.adsPlatform == o.AdsPlatform.Self && -1 != c.default.instance.getNetState()) {
this._isReady = !0;
return !0;
}
if (this._isDestroy) return !1;
i.default.instance.isAdsReady(this) && (this._isReady = !0);
return this._isReady && !this._isShown && !this.isTimeout() && r.default.instance.gsChannel == l.default.APKChannel;
};
e.prototype.load = function(e) {
GlobalFun.log(this.id + " : " + this.loadTime);
if (!(this.type == o.AdsType.Page && a.default.instance.noPage || this._isDestroy || this._isShown || this.isInNoFillWithRefreshNoFillState())) {
this.isAutoLoad && this.refreshReadyState(!0);
if (!this._isLoading && !this.isReady()) {
this.isAutoLoad || a.default.instance._onUnitChangeLoading(this, !0);
GlobalFun.log("StartLoad " + this.id + " : " + this.loadTime);
this._isPreLoad = e;
this.loadTime++;
c.default.instance.callJava("trackEventWithType", "(Ljava/lang/String;Ljava/lang/String;I)V", "StartLoadAds", this.placementID, 1);
i.default.instance.loadAds(this);
}
}
};
e.prototype.show = function() {
if (this.type == o.AdsType.Page && a.default.instance.noPage) return !1;
if (this._isDestroy) return !1;
if (this.isReady()) {
a.default.instance.lastShowAdType = this.type;
i.default.instance.showAds(this);
return !0;
}
a.default.instance._onUnitClosed(this, !1);
this.load(!1);
return !1;
};
e.prototype.destroy = function() {
this._isDestroy || a.default.instance._onUnitChangeDestroy(this, !0);
};
e.prototype.isTimeout = function() {
return !this._isDestroy && (!(!this._isReady || !this.limitTime) && s.default.getTime() - this._readyTime > this.limitTime);
};
e.prototype.refreshReadyState = function(e) {
if (this._isDestroy) return !1;
if (!e && this.isAutoLoad) return this.isReady();
if (!this._isReady) {
this._isFreshReady = !0;
a.default.instance._onFreshPlacementReady(this.placementID);
}
return this.isReady();
};
e.prototype.isInNoFillWithRefreshNoFillState = function() {
if (!this._isInNoFill) return !1;
if (s.default.getTime() - this._noFillStartTime > this.noFillWait) {
a.default.instance._onUnitClearNoFillState(this);
return !1;
}
return !0;
};
e.prototype.loadAdsTest = function() {
var e = 0;
e = this.price == o.AdsPrice.Top ? 15 : this.price == o.AdsPrice.High ? 30 : this.price == o.AdsPrice.Middle ? 50 : 98;
s.default.Random(0, 100) < e ? i.default.instance.onAdsReady(this.placementID) : i.default.instance.onAdsLoadError(this.placementID + ":true");
};
return e;
}();
n.default = u;
cc._RF.pop();
}, {
"../Config/Config": "Config",
"../Lib/Global": "Global",
"../manager/MyRoleDataManager": "MyRoleDataManager",
"../manager/SDKManager": "SDKManager",
"./AdsGroupController": "AdsGroupController",
"./AdsGroupPlatformTool": "AdsGroupPlatformTool",
"./AdsSetAndScene": "AdsSetAndScene"
} ],
Advert_Manager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6207ceLf7pIH7ZfxKMJzlsD", "Advert_Manager");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
n.Adver_Type = void 0;
var i, r = e("./SDKManager"), l = e("./PanelManager"), s = e("./Umeng_Manager"), c = cc._decorator, u = c.ccclass, d = (c.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.current_advert_type = i.ReWardVideo_Adv;
t.VideoCallBack = null;
t.isskip = !1;
t.MaskCallBack = null;
t.istaiwan = !1;
return t;
}
n = t;
Object.defineProperty(t, "instance", {
get: function() {
if (!this._instance) {
this._instance = new n();
window.Advert_Manager = this._instance;
}
return this._instance;
},
enumerable: !1,
configurable: !0
});
t.prototype.getCurrentAdvType = function() {
return this.current_advert_type;
};
t.prototype.get_isskip = function() {
switch (this.current_advert_type) {
case i.ReWardVideo_Adv:
return !1;

case i.CanCloseVideo_Adv:
return !0;
}
};
t.prototype.ShowMask = function() {
l.default.gameUi.showTishi(GlobalFun.i18n.t("lable.10251"));
l.default.gameUi.openMask(!1);
this.MaskCallBack && this.MaskCallBack();
};
t.prototype.show_Ad = function(e, t, n, o) {
void 0 === e && (e = i.ReWardVideo_Adv);
void 0 === t && (t = null);
void 0 === n && (n = null);
void 0 === o && (o = 15);
if (cc.sys.os === cc.sys.OS_ANDROID || cc.sys.os === cc.sys.OS_IOS) {
s.default.instance.putPoint(s.Point_EventID.advert_Click_num);
this.MaskCallBack = n;
l.default.gameUi.openMask(!0);
this.schedule(this.ShowMask, 0, 0, o);
e && (this.current_advert_type = e);
t && (this.VideoCallBack = t);
r.default.instance.callJava("showAdvert", "(Ljava/lang/String;)V", this.current_advert_type);
} else t();
};
t.prototype.videocallback = function(e) {
cc.error("视频回调：" + e);
switch (e) {
case "onVideoAdSuccess":
l.default.gameUi.openMask(!1);
this.unschedule(this.ShowMask);
s.default.instance.putPoint(s.Point_EventID.advert_play_num);
break;

case "onVideoAdError":
this.unschedule(this.ShowMask);
l.default.gameUi.showTishi(GlobalFun.i18n.t("lable.10251"));
l.default.gameUi.openMask();
s.default.instance.putPoint(s.Point_EventID.advert_Click_Fail_num);
break;

case "onVideoAdClose":
this.VideoCallBack(e);
s.default.instance.putPoint(s.Point_EventID.advert_Click_Succ_num);
}
};
var n;
return t = n = a([ u ], t);
}(cc.Component));
n.default = d;
(function(e) {
e.ReWardVideo_Adv = "198";
e.CanCloseVideo_Adv = "432";
})(i = n.Adver_Type || (n.Adver_Type = {}));
cc._RF.pop();
}, {
"./PanelManager": "PanelManager",
"./SDKManager": "SDKManager",
"./Umeng_Manager": "Umeng_Manager"
} ],
AircraftItem: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "06ca6GOYD1KXpoGndWQhsy+", "AircraftItem");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../../code/manager/MyRoleDataManager"), r = e("../../../code/manager/PanelManager"), l = e("../../../code/Lib/Global"), s = e("../../../code/manager/TableManager"), c = e("../../../code/Config/Config"), u = e("../../../code/manager/SoundManager"), d = e("../LatticeProgress"), p = e("../../../code/manager/Umeng_Manager"), f = e("../../../code/manager/GuideManager"), h = cc._decorator, g = h.ccclass, y = h.property, m = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.infoBtn = null;
t.levelUpBtn = null;
t.pro = null;
t.icon = null;
t.grayIcon = null;
t.levelIcon = null;
t.nameLable = null;
t.goldLable = null;
t.levelNode = null;
t.lockNode = null;
t.lockLabel = null;
return t;
}
t.prototype.onLoad = function() {
this.levelUpBtn.node.on("click", this.levelUpTap, this);
this.infoBtn.node.on("click", this.infoBtnTap, this);
this.node.getComponent(cc.Button).node.on("click", this.nodeTap, this);
this.levelUpBtn.enableAutoGrayEffect = !0;
};
t.prototype.init = function(e, t, n) {
this.funnelId = e;
this.iconFrame = t;
this.grayIcon.spriteFrame = n;
this.setLable();
};
t.prototype.updateInfo = function() {
var e = i.default.instance.getFunnelInfo(this.funnelId), t = s.default.instance.aircraftTable.getInfo(this.funnelId);
if (e && t) {
this.isUnlock = !0;
this.icon.spriteFrame = this.iconFrame;
var n = e.phase * t.stage;
this.levelIcon.spriteFrame = r.default.instance.getExistPanel(c.PanelName.AircraftPanel).iconAtlas.getSpriteFrame("icon_" + e.phase);
this.setPro(e.level, e.phase);
this.upgradeMoney = s.default.instance.aircraftTable.countMoney(this.funnelId, e.level);
this.goldLable.string = l.default.setNum(this.upgradeMoney);
this.levelNode.active = !0;
this.lockNode.active = !1;
e.level - 1 >= n || e.level - 1 >= t.level_max ? this.levelUpBtn.enabled = !1 : this.levelUpBtn.enabled = !0;
} else {
this.isUnlock = !1;
this.levelNode.active = !1;
this.lockNode.active = !0;
}
this.nameLable.string = GlobalFun.i18n.t("lable." + t.name);
return this.isUnlock;
};
t.prototype.setLable = function() {
this.lockLabel.string = GlobalFun.i18n.t("lable.10232");
this.nameLable.string = GlobalFun.i18n.t("lable." + s.default.instance.aircraftTable.getName(this.funnelId));
};
t.prototype.setPro = function(e, t) {
for (var n = this.pro.children.length, o = Math.floor((e - 1) / 5) + 1, a = 1; a < n; a++) if (e >= 5 * a + 1) this.pro.children[a].getComponent(d.default).pro = 5; else if (e <= 5 * (a - 1) + 1 && a <= t) this.pro.children[a].getComponent(d.default).pro = 0; else if (e <= 5 * a + 1 && e >= 5 * (a - 1) + 1 && a == o && a <= t) {
var i = (e - 2 - 5 * (o - 1)) % 5 + 1;
this.pro.children[a].getComponent(d.default).pro = i;
} else {
this.pro.children[a].getComponent(d.default).pro = 0;
this.pro.children[a].getComponent(d.default).lock();
}
};
t.prototype.levelUpTap = function() {
f.default.instance.get_isInGuide() && p.default.instance.putPoint(p.Point_EventID.ClickButton_propertBtn);
if (i.default.instance.dleCurrency(this.upgradeMoney)) {
u.default.playSoundEffect(u.default.upgradeAircraft);
i.default.instance.funnelLevelUp(this.funnelId, 1);
r.default.gameUi.updataGold();
this.updateInfo();
r.default.instance.getExistPanel(c.PanelName.AircraftPanel).updateInfo();
} else {
var e = this.node.parent.parent.parent.parent.parent.getChildByName("hint");
e.getComponentInChildren(cc.Label).string = GlobalFun.i18n.t("lable.10292");
e.opacity = 255;
this.scheduleOnce(function() {
e.opacity = 0;
}, 2);
}
};
t.prototype.infoBtnTap = function() {
var e = s.default.instance.aircraftTable.getDes(this.funnelId);
r.default.instance.getExistPanel(c.PanelName.AircraftPanel).updateTalkLable(GlobalFun.i18n.t("lable." + e));
};
t.prototype.nodeTap = function() {
r.default.instance.getExistPanel(c.PanelName.AircraftPanel).funnelShow(Number(this.funnelId));
this.infoBtnTap();
};
a([ y({
type: cc.Button,
tooltip: "问号按钮"
}) ], t.prototype, "infoBtn", void 0);
a([ y({
type: cc.Button,
tooltip: "升级按钮"
}) ], t.prototype, "levelUpBtn", void 0);
a([ y({
type: cc.Node,
tooltip: "升级进度"
}) ], t.prototype, "pro", void 0);
a([ y({
type: cc.Sprite,
tooltip: "浮游炮icon"
}) ], t.prototype, "icon", void 0);
a([ y({
type: cc.Sprite,
tooltip: "浮游炮灰色"
}) ], t.prototype, "grayIcon", void 0);
a([ y({
type: cc.Sprite,
tooltip: "等阶icon"
}) ], t.prototype, "levelIcon", void 0);
a([ y({
type: cc.Label,
tooltip: "名字文本"
}) ], t.prototype, "nameLable", void 0);
a([ y({
type: cc.Label,
tooltip: "升级钱文本"
}) ], t.prototype, "goldLable", void 0);
a([ y({
type: cc.Node,
tooltip: "升级节点"
}) ], t.prototype, "levelNode", void 0);
a([ y({
type: cc.Node,
tooltip: "未解锁节点"
}) ], t.prototype, "lockNode", void 0);
a([ y({
type: cc.Label,
tooltip: "未解锁节点"
}) ], t.prototype, "lockLabel", void 0);
return t = a([ g ], t);
}(cc.Component);
n.default = m;
cc._RF.pop();
}, {
"../../../code/Config/Config": "Config",
"../../../code/Lib/Global": "Global",
"../../../code/manager/GuideManager": "GuideManager",
"../../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../../code/manager/PanelManager": "PanelManager",
"../../../code/manager/SoundManager": "SoundManager",
"../../../code/manager/TableManager": "TableManager",
"../../../code/manager/Umeng_Manager": "Umeng_Manager",
"../LatticeProgress": "LatticeProgress"
} ],
AircraftPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5e3a6JIuBNFyYpkY4Qt5CV2", "AircraftPanel");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../../code/basecode/BasePanel"), r = e("../../../code/manager/UiAniManager"), l = e("../../../code/manager/PanelManager"), s = e("../../../code/Config/Config"), c = e("../../../code/manager/TableManager"), u = e("../../../code/manager/MyRoleDataManager"), d = e("../../../code/manager/SoundManager"), p = e("../../../code/manager/NodePoolMananger"), f = e("../../prefab/ShowPrefab"), h = e("../../../code/manager/GuideManager"), g = e("../../../code/Lib/Global"), y = e("../../../code/manager/EffectManager"), m = e("../../../code/manager/SDKManager"), b = e("../../../code/manager/Umeng_Manager"), v = cc._decorator, S = v.ccclass, _ = v.property, P = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.nameLable = null;
t.talkLable = null;
t.boxNameLabel = null;
t.introLabel = null;
t.chiplable = null;
t.openBtn = null;
t.okButton = null;
t.aircraftPrefab = null;
t.effectPrefab = null;
t.itemNode = null;
t.scrollNode = null;
t.widgetNode0 = null;
t.effectNode = null;
t.iconAtlas = null;
t.getAni = null;
t.getIcon = null;
t.maskNode = null;
t.openGiftNode = null;
t.showNode = null;
t.itemArr = [];
t.unlockNum = 50;
t._aniType = r.UiAniType.AircraftPanel;
t.tishiKuang = null;
t.aniStep = 0;
return t;
}
t.prototype.start = function() {
for (var e = c.default.instance.aircraftTable.table, t = e.length, n = 0; n < t; n++) {
var o = e[n];
if (o) {
var a = cc.instantiate(this.aircraftPrefab);
this.itemNode.addChild(a);
var i = a.getComponent("AircraftItem");
i.init(o.id, this.iconAtlas.getSpriteFrame(o.icon), this.iconAtlas.getSpriteFrame("Aircraft_" + o.id));
this.itemArr.push(i);
}
}
};
t.prototype.openPanel = function() {
this.addEvent();
this.playUIAni(r.InOrOut.IN);
this.setLable();
this.scrollNode.scrollToOffset(cc.v2(0, 0));
};
t.prototype.closePanel = function() {
d.default.playSoundEffect(d.default.btnSound);
this.dleEvent();
this.playUIAni(r.InOrOut.OUT);
l.default.gameUi.btnTishi();
};
t.prototype.panelIn = function() {
this.showNode = p.default.instance.pop(l.default.game.showPrefab.name);
this.widgetNode0.addChild(this.showNode);
this.showNode.setPosition(this.showNode.x, this.showNode.y - 20);
this.showNode.getComponent("ShowPrefab").startShow(0);
u.default.instance.gameState;
h.default.instance.checkCanGuide(10001, 1) ? h.default.instance.startGuide(10001) : u.default.instance.gameState;
this.updateInfo();
};
t.prototype.panelOut = function() {
l.default.instance.deleteOpen(s.PanelName.AircraftPanel);
this.node.removeFromParent();
this.showNode.getComponent("ShowPrefab").stopShow();
this.showNode.removeFromParent();
p.default.instance.push(this.showNode);
};
t.prototype.addEvent = function() {
this.okButton.node.on("click", this.okButtonTap, this);
this.openBtn.node.on("click", this.openBox, this);
};
t.prototype.dleEvent = function() {
this.okButton.node.off("click", this.okButtonTap, this);
this.openBtn.node.off("click", this.openBox, this);
};
t.prototype.updateTalkLable = function(e) {
this.talkLable.string = e;
};
t.prototype.setLable = function() {
this.nameLable.string = GlobalFun.i18n.t("lable.10081");
this.talkLable.string = GlobalFun.i18n.t("lable.10082");
this.boxNameLabel.string = GlobalFun.i18n.t("lable.10083");
this.introLabel.string = GlobalFun.i18n.t("lable.10084");
this.chiplable.string = this.unlockNum + "";
for (var e = this.itemArr.length, t = 0; t < e; t++) this.itemArr[t].setLable();
};
t.prototype.funnelShow = function(e) {
this.showNode.getComponent(f.default).playerScript.outFunnel();
this.showNode.getComponent(f.default).playerScript.funnelShow(e);
};
t.prototype.updateInfo = function() {
var e = c.default.instance.aircraftTable.getRondam();
this.openBtn.enabled = !!e;
this.sortItem();
};
t.prototype.openBox = function() {
var e = this;
if (8 != u.default.instance.gameState) {
h.default.instance.get_isInGuide() && b.default.instance.putPoint(b.Point_EventID.ClickButton_openBoxBtn);
var t = c.default.instance.aircraftTable.getRondam();
m.default.instance.callJava("trackEventWithType", "(Ljava/lang/String;Ljava/lang/String;I)V", "UnlockAircraft", t.toString(), 1);
if (t) if (u.default.instance.dleCurrency(this.unlockNum, s.CurrencyType.Diamond)) {
l.default.gameUi.setBtn.enabled = !1;
d.default.playSoundEffect(d.default.getAircraft);
this.effectNode.active = !0;
l.default.gameUi.updataGold();
u.default.instance.addFunnel(t);
this.aniStep = 0;
this.getIcon.node.position = cc.v3(0, 0);
this.getIcon.spriteFrame = null;
this.randomId = t;
this.maskNode.active = !0;
var n = cc.spawn(cc.fadeTo(.5, 255), cc.callFunc(function() {
e.getAni.active = !0;
e.getAni.getComponent(cc.Animation).play("getAirciaft");
e.getAni.getComponent(cc.Animation).once("stop", e.effectComplete, e);
u.default.instance.gameState;
e.scheduleOnce(function() {
e.getAni.getComponent(cc.Animation).stop();
e.scheduleOnce(function() {
h.default.instance.checkCanGuide(10001, 2) ? h.default.instance.startGuide(10001) : u.default.instance.gameState;
}, 4);
}, 4);
}));
this.maskNode.runAction(n);
} else {
this.tishiKuang.getComponentInChildren(cc.Label).string = GlobalFun.i18n.t("lable.10291");
this.tishiKuang.opacity = 255;
this.scheduleOnce(function() {
e.tishiKuang.opacity = 0;
}, 2);
}
}
};
t.prototype.effectComplete = function() {
var e = this;
this.aniStep++;
if (1 == this.aniStep) {
this.getAni.getComponent(cc.Animation).playAdditive("getAirciaft1");
this.getIcon.spriteFrame = this.iconAtlas.getSpriteFrame(c.default.instance.aircraftTable.getSource(this.randomId));
this.getAni.getComponent(cc.Animation).playAdditive("getAirciaft2");
for (var t = this.itemArr.length, n = 0; n < t; n++) if (this.itemArr[n].funnelId == this.randomId) {
this.itemArr[n].init(this.randomId, this.iconAtlas.getSpriteFrame(c.default.instance.aircraftTable.getSource(this.randomId)), this.iconAtlas.getSpriteFrame("Aircraft_" + this.randomId));
break;
}
var o = cc.sequence(cc.moveTo(2, cc.v2(this.maskNode.position)), cc.fadeTo(.5, 0), cc.callFunc(function() {
e.effectComplete();
}));
this.maskNode.runAction(o);
} else if (2 == this.aniStep) {
var a = this.findLockNode(), i = 0;
if (a > 3) {
this.scrollNode.scrollToBottom(.5);
i = .5;
}
var r = this.scrollNode.content.children[a];
this.scheduleOnce(function() {
var t = g.default.convertNodePosToTargetNodePos(r, e.getIcon.node), n = cc.sequence(cc.moveTo(.5, cc.v2(t)), cc.callFunc(function() {
y.default.instance.playEffect(y.EffectName.SubGunUnlockEffect, r, cc.v2(0, 0));
e.updateInfo();
e.effectComplete();
}));
e.getIcon.node.runAction(n);
}, i);
} else if (3 == this.aniStep) {
this.getAni.getComponent(cc.Animation).stop();
this.getAni.off("stop", this.effectComplete, this);
this.getAni.active = !1;
this.effectNode.active = !1;
l.default.gameUi.setBtn.enabled = !0;
}
};
t.prototype.sortItem = function() {
for (var e = this.itemArr.length, t = 0; t < e; t++) this.itemArr[t].updateInfo();
};
t.prototype.findLockNode = function() {
for (var e = this.itemArr.length, t = 0; t < e; t++) if (this.itemArr[t].funnelId == this.randomId) return t + 1;
};
t.prototype.okButtonTap = function() {
l.default.instance.closePanel(s.PanelName.AircraftPanel);
};
a([ _({
type: cc.Label,
tooltip: "名字lable"
}) ], t.prototype, "nameLable", void 0);
a([ _({
type: cc.Label,
tooltip: "名字lable"
}) ], t.prototype, "talkLable", void 0);
a([ _({
type: cc.Label,
tooltip: "箱子名字lable"
}) ], t.prototype, "boxNameLabel", void 0);
a([ _({
type: cc.Label,
tooltip: "箱子介绍lable"
}) ], t.prototype, "introLabel", void 0);
a([ _({
type: cc.Label,
tooltip: "芯片数量lable"
}) ], t.prototype, "chiplable", void 0);
a([ _({
type: cc.Button,
tooltip: "开箱按钮"
}) ], t.prototype, "openBtn", void 0);
a([ _({
type: cc.Button,
tooltip: "ok按钮"
}) ], t.prototype, "okButton", void 0);
a([ _({
type: cc.Prefab,
tooltip: "浮游炮预制体"
}) ], t.prototype, "aircraftPrefab", void 0);
a([ _({
type: cc.Prefab,
tooltip: "打开礼包预制体"
}) ], t.prototype, "effectPrefab", void 0);
a([ _({
type: cc.Node,
tooltip: "item节点"
}) ], t.prototype, "itemNode", void 0);
a([ _({
type: cc.ScrollView,
tooltip: "滑动"
}) ], t.prototype, "scrollNode", void 0);
a([ _({
type: cc.Node,
tooltip: "适配使用"
}) ], t.prototype, "widgetNode0", void 0);
a([ _({
type: cc.Node,
tooltip: "特效节点"
}) ], t.prototype, "effectNode", void 0);
a([ _({
type: cc.SpriteAtlas,
tooltip: "浮游炮资源"
}) ], t.prototype, "iconAtlas", void 0);
a([ _({
type: cc.Node,
tooltip: "得到特效"
}) ], t.prototype, "getAni", void 0);
a([ _({
type: cc.Sprite,
tooltip: "得到的icon"
}) ], t.prototype, "getIcon", void 0);
a([ _({
type: cc.Node,
tooltip: "得到的icon"
}) ], t.prototype, "maskNode", void 0);
a([ _({
type: cc.Node,
tooltip: "打开礼包节点"
}) ], t.prototype, "openGiftNode", void 0);
a([ _({
type: cc.Node,
tooltip: "提示框"
}) ], t.prototype, "tishiKuang", void 0);
return t = a([ S ], t);
}(i.default);
n.default = P;
cc._RF.pop();
}, {
"../../../code/Config/Config": "Config",
"../../../code/Lib/Global": "Global",
"../../../code/basecode/BasePanel": "BasePanel",
"../../../code/manager/EffectManager": "EffectManager",
"../../../code/manager/GuideManager": "GuideManager",
"../../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../../code/manager/NodePoolMananger": "NodePoolMananger",
"../../../code/manager/PanelManager": "PanelManager",
"../../../code/manager/SDKManager": "SDKManager",
"../../../code/manager/SoundManager": "SoundManager",
"../../../code/manager/TableManager": "TableManager",
"../../../code/manager/UiAniManager": "UiAniManager",
"../../../code/manager/Umeng_Manager": "Umeng_Manager",
"../../prefab/ShowPrefab": "ShowPrefab"
} ],
AircraftTable: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "75960gPGEhCSptqQMtrVXCD", "AircraftTable");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../../code/manager/MyRoleDataManager"), a = e("../../code/Lib/Global"), i = function() {
function e(e) {
this.table = e;
}
e.prototype.getInfo = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && Number(n.id) == e) return n;
}
cc.warn("AircraftTable: Do not have id " + e);
return "";
};
e.prototype.getSource = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && Number(n.id) == e) return n.icon;
}
cc.warn("AircraftTable: Do not have id " + e);
return "";
};
e.prototype.getName = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && Number(n.id) == e) return n.name;
}
cc.warn("AircraftTable getName: Do not have id " + e);
return "";
};
e.prototype.getDes = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && Number(n.id) == e) return n.des;
}
cc.warn("AircraftTable getDex: Do not have id " + e);
return {};
};
e.prototype.getTime = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && Number(n.id) == e) return Number(n.time);
}
cc.warn("AircraftTable getTime: Do not have id " + e);
return 0;
};
e.prototype.countMoney = function(e, t) {
for (var n = 0; n < this.table.length; n++) {
var o = this.table[n];
if (o && Number(o.id) == e) return o.basic_number * t;
}
cc.warn("AircraftTable countMoney: Do not have id " + e);
return 0;
};
e.prototype.countAtk = function(e, t) {
for (var n = 0; n < this.table.length; n++) {
var o = this.table[n];
if (o && Number(o.id) == e) return .001 * (o.attack * t + Number(o.attack_basic));
}
cc.warn("AircraftTable countAtk: Do not have id " + e);
return 0;
};
e.prototype.getRondam = function() {
for (var e = [], t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n) {
var i = o.default.instance.getFunnelInfo(Number(n.id));
i && i.phase < n.level_max / n.stage ? e.push(Number(n.id)) : i || e.push(Number(n.id));
}
}
return 0 == Object.keys(o.default.instance.funnelObject).length ? 302003 : a.default.arrRandom(e);
};
e.prototype.getRandomId = function() {
return Number(a.default.arrRandom(this.table).id);
};
return e;
}();
n.default = i;
cc._RF.pop();
}, {
"../../code/Lib/Global": "Global",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager"
} ],
BallManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "154cc0p1QpOnqsPGV/Tv8t7", "BallManager");
var o = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = e("./NodePoolMananger"), i = e("./MyRoleDataManager"), r = e("./PanelManager"), l = e("../Lib/QuadTree"), s = e("../Lib/Global"), c = e("./TableManager"), u = e("../../src/prefab/PropPrefab"), d = e("./MissionManger"), p = cc._decorator, f = p.ccclass, h = (p.property, 
function() {
function e() {
this.ballPreArr = [];
this.physicsNode = null;
this.ballOutPos = [ 500, 610, 780, 1020 ];
this.curBallNum = 0;
this.ballOutTimes = 1;
this.curBallArr = {};
this.quadTree = null;
this.highHpBallPro = 90;
this.nextCreateBallTime = 0;
this.curBallIcon = null;
this.ballOutArr = [];
this.minBallNum = 1;
this.curLevelBallNum = 1;
this.totalSamllBall = 0;
this.clearSamllBall = 0;
this.maxBallOutTime = 0;
this.ballBasisHp = 1;
this.isBoss = 0;
this.propTime = 0;
this.hpPropNum = 0;
this.specialTime = 0;
this.goldNumArr = [];
this.outDiamond = 0;
this.maxDiamond = 2;
this.leftLevel = -1;
this.diamondOutPro = 1;
}
t = e;
Object.defineProperty(e, "instance", {
get: function() {
this._instance || (this._instance = new t());
return this._instance;
},
enumerable: !1,
configurable: !0
});
e.prototype.init = function(e, t, n, o) {
this.icons = o;
this.BuffPrefab = n;
this.ballPreArr = e;
this.physicsNode = t;
for (var i = 0; i < this.ballPreArr.length; i++) a.default.instance.addPool(this.ballPreArr[i], "BallPrefab");
this.preloadBall();
this.quadTree = new l.default({
x: 0,
y: 0,
width: 750,
height: 1624
}, 0);
this.quadTree.splite();
};
e.prototype.startNewGame = function(e) {
0 == i.default.instance.gameType && i.default.instance.curLevel % 5 == 0 && i.default.instance.curLevel >= 20 ? this.isBoss = 1 : this.isBoss = 0;
var t = c.default.instance.mapLevelTable.getDataByLevel(i.default.instance.curLevel);
this.minBallNum = Number(t.ball_low);
this.curLevelBallNum = Number(t.ball_complete);
this.curLevelBallNum = i.default.instance.curLevel >= 1 && i.default.instance.curLevel <= 3 ? 5 + 2 * (i.default.instance.curLevel - 1) : this.curLevelBallNum;
this.ballBasisHp = c.default.instance.mapLevelTable.getBaseHpByLevel(i.default.instance.curLevel);
this.maxBallOutTime = 1e3 * Number(t.ball_time);
this.ballOutArr = [];
this.curBallArr = {};
this.quadTree || new l.default({
x: 0,
y: 0,
width: 750,
height: 1624
}, 0);
this.quadTree.clear();
this.curBallIcon = e;
this.ballOutTimes = 1;
this.nextCreateBallTime = this.maxBallOutTime;
this.highHpBallPro = 60;
this.curBallNum = 0;
this.totalSamllBall = 0;
this.clearSamllBall = 0;
this.hpPropNum = 0;
this.specialTime = s.default.getTime() + 4e4;
this.setDiamondPro();
this.curLevelBallNum += this.isBoss ? 2 + this.isBoss : 0;
for (var n = 1, o = 0; o <= this.curLevelBallNum; o++) {
var a = 0, r = Number((o / this.curLevelBallNum).toFixed(1));
if (this.countIsBossBall(r, n)) {
a = 3;
n++;
} else a = this.getBallPrefab();
this.ballOutTimes++;
this.ballOutArr.push(a);
this.totalSamllBall += Math.pow(2, a);
}
i.default.instance.curLevelTotalBall = this.curLevelBallNum;
this.ballOutTimes = 0;
};
e.prototype.checkBallPos = function() {
this.quadTree.clear();
this.quadTree.insert(this.curBallArr, 0);
};
e.prototype.createBallByTime = function() {
if (!(i.default.instance.checkGameState([ 0, 2, 3, 4 ]) || this.ballOutTimes >= i.default.instance.curLevelTotalBall && 0 == i.default.instance.gameType)) {
var e = s.default.getTime();
if (e >= this.nextCreateBallTime) {
var t = this.createNewBall();
if (t) {
this.ballOutTimes++;
this.nextCreateBallTime = this.countNextBallTime(e, t);
}
}
}
};
e.prototype.createBallImmediately = function() {
if (!(i.default.instance.checkGameState([ 0, 2, 3, 4, 5 ]) || this.ballOutTimes >= i.default.instance.curLevelTotalBall && 0 == i.default.instance.gameType)) {
var e = s.default.getTime(), t = this.createNewBall();
if (t) {
this.ballOutTimes++;
this.nextCreateBallTime = this.countNextBallTime(e, t);
}
}
};
e.prototype.countNextBallTime = function(e, n) {
var o = 0, a = i.default.instance.curCannonID, r = c.default.instance.connonTable.getDataById(a);
if (0 == i.default.instance.gameType) {
var l = c.default.instance.mapLevelTable.getCurLevelIndex(i.default.instance.curLevel) + 1;
l = Number(l >= r.max_level ? r.max_level : l);
var s = (Number(r.c_att_b) + Number(r.m_att_b)) * l, u = 1.4 + .1 * this.ballOutTimes, d = t.instance.ballBasisHp / s;
o = (o = (d = d > 1 ? d : 1) * u) > this.maxBallOutTime / 1e3 ? this.maxBallOutTime / 1e3 : o;
} else if (1 == i.default.instance.gameType) {
var p = i.default.instance.getConnonInfo(a);
(o = n / (Number(r.c_att_b) * p.mainGunLevel + Number(r.m_att_b) * (-1 == p.extraGun ? 0 : p.extraGun)) * 1.2) < .4 ? o = .4 : o > 7 && (o = 7);
}
return 1e3 * o + e;
};
e.prototype.createSmallerBall = function(e, t, n, o, r) {
if (!i.default.instance.checkGameState([ 0, 2, 4, 5 ])) for (var l = 0; l < e; l++) {
this.curBallNum++;
var u = a.default.instance.pop(this.ballPreArr[n].name);
this.physicsNode.addChild(u);
if (0 == i.default.instance.gameType) {
var d = c.default.instance.table.scence, p = d[s.default.Random(0, d.length - 1)].ball_id;
u.ECScript.init(Math.ceil(.5 * t), r.getSpriteFrame(p));
} else u.ECScript.init(Math.ceil(.5 * t), this.curBallIcon);
i.default.instance.isInFrozen && u.ECScript.playFrozen();
this.curBallArr[u.uuid] = u.ECScript;
l % 2 == 0 ? o.x += u.ECScript.radius : o.x -= u.ECScript.radius;
u.setPosition(o);
o.x <= 0 || o.x >= this.physicsNode.width ? this.moveBallToWord(u) : l % 2 == 0 ? u.ECScript.toRightTop() : u.ECScript.toLeftTop();
}
};
e.prototype.createNewBall = function() {
if (!i.default.instance.checkGameState([ 0, 2, 3, 4 ])) {
var e = 0;
if (0 == i.default.instance.gameType) {
if (this.ballOutArr.length <= 0) return;
e = this.ballOutArr.shift();
} else if (1 == i.default.instance.gameType) {
this.ballOutTimes < 15 ? this.minBallNum = 1 : this.ballOutTimes < 30 ? this.minBallNum = 2 : this.ballOutTimes < 45 ? this.minBallNum = 3 : this.minBallNum = 4;
e = s.default.arrRandom([ 0, 1, 2, 3 ]);
}
var t = 1;
t = 3 == e && this.isBoss ? 4 : 1;
var n = this.getBallHp() * t;
n = n <= 0 ? 1 : n;
var o = a.default.instance.pop(this.ballPreArr[e].name);
o.parent || this.physicsNode.addChild(o);
o.active = !0;
o.ECScript.init(n, this.curBallIcon);
this.curBallArr[o.uuid] = o.ECScript;
var r = o.getComponent(cc.PhysicsCircleCollider), l = this.getBallStartPos(r.radius);
o.setPosition(l);
this.moveBallToWord(o);
this.curBallNum++;
return n * (o.ECScript.size + 1);
}
};
e.prototype.clearAllBallBullet = function() {
var e = this.physicsNode.children.length;
this.curBallArr = {};
for (var t = 0; t < e; t++) {
if ((n = this.physicsNode.children[t]) && ("propPrefab" == n.name || "bulletPrefab" == n.name || -1 != n.name.search(/ball.Prefab/) || "bulletPrefab" == n.name || "coinPrefab" == n.name || "coinNumPrefab" == n.name)) {
t--;
if (-1 != n.name.search(/ball.Prefab/)) n.removeFromParent(); else if ("propPrefab" == n.name) {
n.removeFromParent();
a.default.instance.push(n);
} else {
n.active = !1;
a.default.instance.push(n);
}
}
}
for (r.default.game.bulletNode.children.length, t = 0; t < e; t++) {
var n;
if ((n = r.default.game.bulletNode.children[t]) && ("bulletPrefab" == n.name || -1 != n.name.search(/ball.Prefab/))) {
t--;
if (-1 != n.name.search(/ball.Prefab/)) n.removeFromParent(); else {
n.active = !1;
a.default.instance.push(n);
}
}
}
};
e.prototype.smallestBallBoom = function(e, t, n) {
var o = s.default.Random(1, 15);
if (!(o <= 0)) {
var l = c.default.instance.cannonGrowUp.getBestTenUpgradeMoney();
o = i.default.instance.goldDropCount(o);
o += Math.floor(1e-4 * l);
this.goldNumArr = [];
var p = s.default.Random(1, 2);
r.default.game.isGameComplete() && (p = 5);
1 == i.default.instance.gameType && (p = 0);
for (var f = 0; f < p; f++) {
var h = a.default.instance.pop("coinPrefab");
h && !h.parent && this.physicsNode.addChild(h);
h.active = !0;
h.x = t;
h.y = n;
h.ECScript.init(Math.floor(o / p));
h.ECScript.toTop();
}
var g = d.default.instance.curSpecilMission;
if (g && 1 != i.default.instance.gameType && !g.isCompleteAll && s.default.Random(0, 100) <= 10 && g.pro < g.quest) {
var y = a.default.instance.pop("propPrefab"), m = g.collectPropId;
this.physicsNode.addChild(y);
var b = y.getComponent(u.default);
y.x = t;
y.y = n;
b.init(m, this.BuffPrefab, this.icons, !0);
b.toTop();
}
this.anyBallBoom(t, n);
}
};
e.prototype.anyBallBoom = function(e, t) {
var n = s.default.getTime();
if (s.default.Random(0, 100) <= 60 && n - this.propTime > 4e3) {
this.propTime = n;
var o = a.default.instance.pop("propPrefab"), r = void 0;
if (s.default.Random(0, 100) <= 50 && (Object.keys(i.default.instance.funnelObject).length > 0 || 0 == i.default.instance.curLevel)) r = 500004; else {
var l = this.hpPropNum <= 4 ? s.default.Random(0, 100) : s.default.Random(0, 75);
r = 0 == i.default.instance.curLevel ? 500001 : l <= 10 ? 500001 : l <= 35 ? 500003 : l <= 75 ? 500005 : 500002;
}
50002 == r && this.hpPropNum++;
this.physicsNode.addChild(o);
var c = o.getComponent(u.default);
o.x = e;
o.y = t;
c.init(r, this.BuffPrefab, this.icons);
c.toTop();
}
if (this.isDiamond()) {
var d = a.default.instance.pop("coinPrefab");
d && !d.parent && this.physicsNode.addChild(d);
this.outDiamond++;
d.active = !0;
d.x = e;
d.y = t;
d.ECScript.init(-1);
d.ECScript.toTop();
}
};
e.prototype.allBallFrozen = function() {
Object.keys(t.instance.curBallArr).forEach(function(e) {
t.instance.curBallArr[e].playFrozen();
});
};
e.prototype.cancelBallFrozen = function() {
Object.keys(t.instance.curBallArr).forEach(function(e) {
t.instance.curBallArr[e].cancelFrozen();
});
};
e.prototype.countGoldNum = function(e) {
var t = e.toString(), n = t.length, o = Number("1" + new Array(n).join("0")), a = Math.floor(e / o), i = Math.floor(a / 5);
i > 0 && this.goldNumArr.push(5 * o);
var r = Math.floor((a - 5 * i) / 2);
r > 1 ? this.goldNumArr.splice(0, 0, 2 * o, 2 * o) : r > 0 && this.goldNumArr.push(2 * o);
a - 5 * i - 2 * r > 0 && this.goldNumArr.push(1 * o);
return 1 != n ? this.countGoldNum(Number(t.toString().slice(1, t.toString().length))) : void 0;
};
e.prototype.isDiamond = function() {
if (1 == i.default.instance.gameType || 0 == i.default.instance.gameType) return !1;
if (i.default.instance.curDiamond >= this.maxDiamond || t.instance.clearSamllBall / t.instance.totalSamllBall < .4) return !1;
if (s.default.Random(1, 100) <= this.diamondOutPro) {
this.diamondOutPro -= 2;
this.diamondOutPro = this.diamondOutPro < 1 ? 1 : this.diamondOutPro;
return !0;
}
};
e.prototype.setDiamondPro = function() {
if (-1 == this.leftLevel) {
this.leftLevel = s.default.Random(3, 8);
this.maxDiamond = 2;
this.diamondOutPro = 1;
} else {
this.leftLevel--;
if (0 == this.leftLevel) {
this.leftLevel = s.default.Random(3, 8);
this.maxDiamond = 3 + 2 * c.default.instance.mapLevelTable.getCurChapter(i.default.instance.curLevel);
this.diamondOutPro = 6;
} else {
this.maxDiamond = 2;
this.diamondOutPro = 1;
}
}
this.outDiamond = 0;
};
e.prototype.moveBallToWord = function(e) {
e.ECBody.gravityScale = 0;
var t = cc.callFunc(function() {
e.ECBody.gravityScale = 1;
e.ECScript.toRight();
i.default.instance.isInFrozen && e.ECScript.playFrozen();
}, this), n = this.getBallEndPos(e.getPosition(), e.getComponent(cc.PhysicsCircleCollider).radius), o = .01 * Math.abs(e.getPosition().x - n.x) * .5, a = cc.sequence(cc.moveTo(o, n), t);
e.runAction(a);
};
e.prototype.getBallStartPos = function(e) {
var t = s.default.arrRandom([ -e, 750 + e ]), n = s.default.arrRandom(this.ballOutPos) + 350;
return cc.v2(t, n);
};
e.prototype.getBallEndPos = function(e, t) {
return e.x < 0 ? cc.v2(t, e.y) : cc.v2(750 - t, e.y);
};
e.prototype.getBallPrefab = function() {
var e = this.isBoss ? 95 : 100, t = s.default.Random(1, e);
return t <= 25 ? 0 : t <= 70 ? 1 : t <= 95 ? 2 : t <= 100 ? 3 : void 0;
};
e.prototype.getBallHp = function() {
if (0 == i.default.instance.gameType) {
var e = .3 * this.ballOutTimes + 1;
return Math.ceil(.005 * s.default.Random(100 * this.ballOutTimes, 100 * (this.ballOutTimes + e)) * this.ballBasisHp);
}
if (1 == i.default.instance.gameType) {
var t = Math.ceil(10 * Math.pow(1.1, this.ballOutTimes));
return s.default.Random(Math.floor(.9 * t), Math.ceil(1.1 * t));
}
};
e.prototype.getHighLowHp = function() {
return s.default.Random(1, 100) < this.highHpBallPro ? 1 : 0;
};
e.prototype.preloadBall = function() {
for (var e = 0; e < 2; e++) {
var t = a.default.instance.pop(this.ballPreArr[0].name);
a.default.instance.push(t);
var n = a.default.instance.pop(this.ballPreArr[0].name);
a.default.instance.push(n);
var o = a.default.instance.pop(this.ballPreArr[1].name);
a.default.instance.push(o);
var i = a.default.instance.pop(this.ballPreArr[2].name);
a.default.instance.push(i);
var l = a.default.instance.pop(this.ballPreArr[3].name);
a.default.instance.push(l);
}
for (e = 0; e < 50; e++) {
var s = a.default.instance.pop("bulletPrefab");
s.active = !1;
r.default.game.bulletNode.addChild(s);
a.default.instance.push(s);
}
for (e = 0; e < 20; e++) {
var c = a.default.instance.pop("coinPrefab");
a.default.instance.push(c);
var u = a.default.instance.pop("bloodPrefab");
a.default.instance.push(u);
}
for (e = 0; e < 10; e++) {
var d = a.default.instance.pop(r.default.game.boomPrefab.name), p = a.default.instance.pop(r.default.game.smokePrefab.name);
a.default.instance.push(d);
a.default.instance.push(p);
}
};
e.prototype.sortFunLowToBig = function(e) {
return function(t, n) {
return t[e].size - n[e].size;
};
};
e.prototype.countIsBossBall = function(e, t) {
return 1 == this.isBoss && (.3 == e && 1 == t || .6 == e && 2 == t || .9 == e && 3 == t) || 2 == this.isBoss && (.2 == e && 1 == t || .4 == e && 2 == t || .6 == e && 3 == t || .8 == e && 4 == t);
};
var t;
return e = t = o([ f ], e);
}());
n.default = h;
cc._RF.pop();
}, {
"../../src/prefab/PropPrefab": "PropPrefab",
"../Lib/Global": "Global",
"../Lib/QuadTree": "QuadTree",
"./MissionManger": "MissionManger",
"./MyRoleDataManager": "MyRoleDataManager",
"./NodePoolMananger": "NodePoolMananger",
"./PanelManager": "PanelManager",
"./TableManager": "TableManager"
} ],
BallPrefab: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "8c156J6DoVK34dVZA7MoEk7", "BallPrefab");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
}, i = this && this.__awaiter || function(e, t, n, o) {
function a(e) {
return e instanceof n ? e : new n(function(t) {
t(e);
});
}
return new (n || (n = Promise))(function(n, i) {
function r(e) {
try {
s(o.next(e));
} catch (e) {
i(e);
}
}
function l(e) {
try {
s(o.throw(e));
} catch (e) {
i(e);
}
}
function s(e) {
e.done ? n(e.value) : a(e.value).then(r, l);
}
s((o = o.apply(e, t || [])).next());
});
}, r = this && this.__generator || function(e, t) {
var n, o, a, i, r = {
label: 0,
sent: function() {
if (1 & a[0]) throw a[1];
return a[1];
},
trys: [],
ops: []
};
return i = {
next: l(0),
throw: l(1),
return: l(2)
}, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
return this;
}), i;
function l(e) {
return function(t) {
return s([ e, t ]);
};
}
function s(i) {
if (n) throw new TypeError("Generator is already executing.");
for (;r; ) try {
if (n = 1, o && (a = 2 & i[0] ? o.return : i[0] ? o.throw || ((a = o.return) && a.call(o), 
0) : o.next) && !(a = a.call(o, i[1])).done) return a;
(o = 0, a) && (i = [ 2 & i[0], a.value ]);
switch (i[0]) {
case 0:
case 1:
a = i;
break;

case 4:
r.label++;
return {
value: i[1],
done: !1
};

case 5:
r.label++;
o = i[1];
i = [ 0 ];
continue;

case 7:
i = r.ops.pop();
r.trys.pop();
continue;

default:
if (!(a = r.trys, a = a.length > 0 && a[a.length - 1]) && (6 === i[0] || 2 === i[0])) {
r = 0;
continue;
}
if (3 === i[0] && (!a || i[1] > a[0] && i[1] < a[3])) {
r.label = i[1];
break;
}
if (6 === i[0] && r.label < a[1]) {
r.label = a[1];
a = i;
break;
}
if (a && r.label < a[2]) {
r.label = a[2];
r.ops.push(i);
break;
}
a[2] && r.ops.pop();
r.trys.pop();
continue;
}
i = t.call(e, r);
} catch (e) {
i = [ 6, e ];
o = 0;
} finally {
n = a = 0;
}
if (5 & i[0]) throw i[1];
return {
value: i[0] ? i[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var l = e("../../code/basecode/EasyGetCompleteClass"), s = e("../../code/manager/NodePoolMananger"), c = e("../../code/manager/BallManager"), u = e("../../code/manager/MissionManger"), d = e("../../code/manager/PanelManager"), p = e("../../code/manager/MyRoleDataManager"), f = e("../../code/manager/SDKManager"), h = e("../../code/manager/SoundManager"), g = e("../../code/Lib/Global"), y = e("../../code/manager/EffectManager"), m = e("../game/Game"), b = e("../../../Prefab/CircleLifeProgressBar/CircleLifeProgressBar"), v = e("../../code/Config/Config"), S = cc._decorator, _ = S.ccclass, P = S.property, M = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.jumpHeight = 0;
t.size = 0;
t.icon = null;
t.icon_up = null;
t.myLable = null;
t.radius = 0;
t.quan = null;
t.iconProgressBar2 = null;
t.collider = null;
t.curLife = 0;
t.totalLife = 0;
t.isBackToPool = !1;
t.isInit = !1;
t.expression_1 = [ "game_600033", "game_600035", "game_600037" ];
t.expression_2 = [ "game_600034", "game_600036", "game_600038" ];
t.exp_Colors = [ [ 0, 153, 102 ], [ 156, 72, 183 ], [ 224, 54, 78 ], [ 255, 159, 28 ], [ 255, 120, 137 ] ];
t.c_index = 0;
t.ischange = !1;
t.nextindx = 0;
t.playtype = 1;
t.currentindx = 0;
t.delaytm = .08;
t.isattack = !1;
t.xSpeedArr = [ 1e3, 3330, 6250, 12250 ];
t.ySpeedArr = [ 200, 250, 300, 350 ];
t.co = [ [ 200, 0, 0 ], [ 255, 120, 0 ], [ 255, 210, 0 ], [ 100, 255, 0 ], [ 0, 255, 200 ], [ 0, 50, 255 ], [ 200, 0, 255 ] ];
t.colorArr = [ -160, -140, -120, -100, -80, -60, -40, -20, 0, 20, 40, 60 ];
t.isInBiger = !1;
t.bloodTime = 4;
return t;
}
t.prototype.onLoad = function() {
this.iconProgressBar = this.icon.getComponent(cc.ProgressBar);
this.collider = this.getComponent(cc.PhysicsCircleCollider);
this.EasyGetCompleteClassInit();
this.game = cc.director.getScene().getChildByName("Canvas").ECScript;
};
t.prototype.start = function() {};
t.prototype.update = function(e) {
0 != this.ECBody.gravityScale && 0 == this.ECBody.linearVelocity.x && this.toRight();
};
t.prototype.onBeginContact = function(e, t, n) {
if ("bulletPrefab<PhysicsBoxCollider>" != n.name || this.isBackToPool) "wall<PhysicsBoxCollider>" == n.name ? 0 == this.ECBody.gravityScale && (e.disabled = !0) : "floor<PhysicsBoxCollider>" == n.name && 3 == this.size && c.default.instance.isBoss && d.default.game.setSpeedLow(cc.v2(this.node.position.x, this.node.position.y - this.radius - 20)); else {
var o = n.getComponent("BulletPrefab").killNum;
this.killlifeNum(o);
this.game.addScore(o);
n.getComponent("BulletPrefab").remove();
}
};
t.prototype.onPostSolve = function(e, t, n) {
if ("floor<PhysicsBoxCollider>" == n.name) {
this.toTop();
d.default.game.playSmokeEffect(cc.v2(this.node.position.x, this.node.position.y - this.collider.radius), this.size);
d.default.gameUi.backGroudShack(this.size);
}
if (this.isBackToPool) {
this.isInit = !1;
s.default.instance.push(this.node);
}
};
t.prototype.onCollisionEnter = function(e, t) {
if (!this.isBackToPool && "bulletPrefab<BoxCollider>" == e.name) {
var n = e.getComponent("BulletPrefab").killNum;
this.biger();
this.killlifeNum(n);
this.game.addScore(n);
e.getComponent("BulletPrefab").remove();
this.playBlood(this.countPoints(t.node.position, e.node.position, t.world));
}
};
t.prototype.beAttack = function(e, t, n) {
void 0 === n && (n = null);
this.biger();
this.killlifeNum(e, n);
this.playBlood(this.countPoints(cc.v2(this.node.position), t, this.radius));
};
t.prototype.init = function(e, t) {
this.iconProgressBar.progress = 1;
this.iconProgressBar2.setProgress(1);
this.iconProgressBar2.node.opacity = 0;
this.isInit = !0;
this.icon.spriteFrame = t;
this.icon.node.scale = 1;
this.isBackToPool = !1;
this.isInBiger = !1;
this.curLife = this.totalLife = e;
if (0 == p.default.instance.gameType) {
this.myLable.active = !0;
this.myLable.getComponent("MyLable").string = g.default.setNumToKMB(this.curLife);
this.myLable.getComponent("MyLable").isChangeColor = !1;
this.setStartColor2();
0 == d.default.gameUi.exp_type ? this.myLable.active = !0 : this.myLable.active = !1;
if (1 === d.default.gameUi.exp_type || 3 === d.default.gameUi.exp_type) {
this.icon.spriteFrame = d.default.game.ballSpriteAtlas.getSpriteFrame(this.expression_1[0]);
this.icon_up.spriteFrame = d.default.game.ballSpriteAtlas.getSpriteFrame("game_buttom");
this.c_index = Math.floor(Math.random() * this.exp_Colors.length);
var n = this.exp_Colors[this.c_index];
this.icon_up.node.color = cc.color(n[0], n[1], n[2]);
}
if (4 === d.default.gameUi.exp_type) {
this.c_index = g.default.Random(1, 5);
this.icon.spriteFrame = d.default.game.ballSpriteAtlas1.getSpriteFrame("img_" + this.c_index + "_0");
}
} else this.myLable.active = !1;
};
t.prototype.toRight = function() {
this.node.x <= 320 ? this.ECBody.applyLinearImpulse(cc.v2(this.getXSpeedBySize(), 0), this.ECBody.getWorldCenter(), !1) : this.ECBody.applyLinearImpulse(cc.v2(-1 * this.getXSpeedBySize(), 0), this.ECBody.getWorldCenter(), !1);
this.ECBody.angularVelocity = 50;
};
t.prototype.toTop = function() {
this.ECBody.applyLinearImpulse(cc.v2(0, this.jumpHeight), this.ECBody.getWorldCenter(), !1);
};
t.prototype.toRightTop = function() {
this.ECBody.linearVelocity = cc.v2(100, this.getYSpeedBySize());
this.ECBody.angularVelocity = 50;
};
t.prototype.toLeftTop = function() {
this.ECBody.linearVelocity = cc.v2(-100, this.getYSpeedBySize());
this.ECBody.angularVelocity = 50;
};
t.prototype.killlifeNum = function(e, t) {
void 0 === t && (t = null);
if (this.isInit) {
4 == d.default.gameUi.exp_type && (this.iconProgressBar2.node.opacity = 255);
this.curLife -= Number(e);
t && t == v.BulletType.BulletLaser ? this.iconProgressBar.progress = this.curLife / this.totalLife : cc.tween(this.iconProgressBar).to(.3, {
progress: this.curLife / this.totalLife
}).start();
this.iconProgressBar2.setProgress(this.curLife / this.totalLife, t);
if (this.curLife <= 0) {
this.isInit = !1;
delete c.default.instance.curBallArr[this.node.uuid];
c.default.instance.curBallNum--;
this.createTwoSmallCircle();
f.default.instance.phoneShack();
d.default.game.playSmokeEffect(this.node.position, this.size);
d.default.game.playBoomEffect(this.node.position, this.size);
if (d.default.game.isGameComplete()) {
d.default.game.playBoomEffect(this.node.position.sub(cc.v3(50, 50)), this.size);
d.default.game.playBoomEffect(this.node.position.sub(cc.v3(-50, -50)), this.size);
d.default.game.playBoomEffect(this.node.position.sub(cc.v3(-50, 50)), this.size);
d.default.game.playBoomEffect(this.node.position.sub(cc.v3(50, -50)), this.size);
}
this.node.active = !1;
this.node.removeFromParent();
this.isBackToPool = !0;
u.default.instance.collectMissionNum(1, 1);
d.default.game.playerScript.life <= .5 * d.default.game.playerScript.maxLife && u.default.instance.collectMissionNum(3, 1);
this.icon.node.stopAllActions();
this.node.destroy();
} else {
this.myLable.getComponent("MyLable").string = g.default.setNumToKMB(this.curLife);
this.colorChange();
this.changeSpriteFrameOrColor(d.default.gameUi.exp_type);
}
}
};
t.prototype.changeSpriteFrameOrColor = function(e) {
var t = this;
if (1 === e) {
var n = function() {
var n = t.expression_2.indexOf(t.icon.spriteFrame.name);
if (n >= 0 || 2 == e) {
if (1 == e || 3 == e) {
var o = d.default.game.ballSpriteAtlas.getSpriteFrame(t.expression_1[n]);
t.icon.spriteFrame = o;
}
if (2 == e || 3 == e) {
var a = t.exp_Colors[t.c_index];
t.icon_up.node.color = cc.color(a[0], a[1], a[2]);
}
}
}, o = this.expression_1.indexOf(this.icon.spriteFrame.name);
if (o >= 0 || 2 == e) {
this.unschedule(n);
if (1 == e || 3 == e) {
var a = d.default.game.ballSpriteAtlas.getSpriteFrame(this.expression_2[o]);
this.icon.spriteFrame = a;
}
if (2 == e || 3 == e) {
var i = [ 200, 0, 0 ];
this.icon_up.node.color = cc.color(i[0], i[1], i[2]);
}
}
this.scheduleOnce(n, .7);
}
if (4 === e) {
5 === this.currentindx && this.icon.node.pauseAllActions();
n = function() {
this.icon.node.resumeAllActions();
};
this.schedule(n, .5);
if (this.ischange) return;
this.ischange = !0;
this.nextindx = 0;
var r = cc.callFunc(function(e, n) {
var o = d.default.game.ballSpriteAtlas1.getSpriteFrame("img_" + t.c_index + "_" + t.nextindx);
t.icon.spriteFrame = o;
t.currentindx = t.nextindx;
1 === t.playtype && t.nextindx < 5 && t.nextindx++;
0 === t.playtype && t.nextindx > 0 && t.nextindx--;
t.delaytm = .083;
1 === t.playtype && 5 === t.nextindx && (t.delaytm = .5);
}, this, this.nextindx), l = cc.sequence(r, cc.delayTime(this.delaytm), r, cc.delayTime(this.delaytm), r, cc.delayTime(this.delaytm), r, cc.delayTime(this.delaytm), r, cc.delayTime(this.delaytm), r, cc.delayTime(.5), cc.callFunc(function() {
t.nextindx = 5;
t.playtype = 0;
}), r, cc.delayTime(this.delaytm), r, cc.delayTime(this.delaytm), r, cc.delayTime(this.delaytm), r, cc.delayTime(this.delaytm), r, cc.delayTime(this.delaytm), r, cc.callFunc(function() {
t.isattack = !1;
t.ischange = !1;
t.nextindx = 0;
t.currentindx = 0;
t.playtype = 1;
}));
this.icon.node.runAction(l);
}
if (5 === e) {
this.node.getComponent(cc.Animation).play("changeSprite");
}
};
t.prototype.change_sp = function() {
var e = d.default.game.ballSpriteAtlas1.getSpriteFrame("img_" + this.c_index + "_" + this.nextindx);
if (e) {
this.currentindx = this.nextindx;
5 == this.currentindx ? this.nextindx = 0 : this.nextindx++;
this.icon.spriteFrame = e;
}
};
t.prototype.change_sp0 = function() {};
t.prototype.change_sp1 = function() {};
t.prototype.change_sp2 = function() {};
t.prototype.change_sp3 = function() {};
t.prototype.change_sp4 = function() {};
t.prototype.change_sp5 = function() {
this.ischange = !1;
};
t.prototype.killBall = function() {
delete c.default.instance.curBallArr[this.node.uuid];
c.default.instance.clearSamllBall += Math.pow(2, this.size);
d.default.gameUi.pro.progress = c.default.instance.clearSamllBall / c.default.instance.totalSamllBall;
d.default.gameUi.proTxt.string = GlobalFun.i18n.t("lable.10283").replace("%d", Math.floor(100 * d.default.gameUi.pro.progress));
c.default.instance.curBallNum--;
d.default.game.playSmokeEffect(this.node.position, this.size);
d.default.game.playBoomEffect(this.node.position, this.size);
this.node.removeFromParent();
this.isBackToPool = !0;
};
t.prototype.playFrozen = function() {
return i(this, void 0, void 0, function() {
var e;
return r(this, function(t) {
switch (t.label) {
case 0:
if (!cc.isValid(this.node)) return [ 2 ];
if (this.frozenEffect) return [ 3, 2 ];
e = this;
return [ 4, y.default.instance.playLoopEffect(y.EffectName.BallFrozenEffect, this.node, cc.v2(0, 0), "ballFrozenShowEffect") ];

case 1:
e.frozenEffect = t.sent();
return [ 3, 3 ];

case 2:
"ballFrozenShowEffect" != this.frozenEffect.getComponent(cc.Animation).currentClip.name && this.frozenEffect.getComponent(cc.Animation).play("ballFrozenShowEffect");
t.label = 3;

case 3:
this.frozenEffect.off("stop");
null != this.frozenEffect.width && null != this.frozenEffect.height && (this.frozenEffect.width = this.frozenEffect.height = 2 * this.radius / 300 * 320);
return [ 2 ];
}
});
});
};
t.prototype.cancelFrozen = function() {
var e = this;
if (this.frozenEffect && cc.isValid(this.node)) {
this.frozenEffect.off("stop");
this.frozenEffect.getComponent(cc.Animation).play("ballFrozenOutEffect");
this.frozenEffect.getComponent(cc.Animation).on("stop", function() {
if (e.frozenEffect) {
e.frozenEffect.off("stop");
e.frozenEffect.removeFromParent();
cc.isValid(e.frozenEffect) && e.frozenEffect.destroy();
}
e.frozenEffect = null;
});
}
};
t.prototype.createTwoSmallCircle = function() {
if (0 != this.size) {
c.default.instance.anyBallBoom(this.node.position.x, this.node.position.y);
var e = this.size - 1;
h.default.playSoundEffect(h.default.boom1);
var t = cc.find("Canvas").getComponent(m.default);
c.default.instance.createSmallerBall(2, this.totalLife, e, this.node.getPosition(), t.ballSpriteAtlas);
} else {
h.default.playSoundEffect(h.default.boom2);
c.default.instance.clearSamllBall++;
d.default.gameUi.pro.progress = c.default.instance.clearSamllBall / c.default.instance.totalSamllBall;
d.default.gameUi.proTxt.string = GlobalFun.i18n.t("lable.10283").replace("%d", Math.floor(100 * d.default.gameUi.pro.progress));
if (d.default.game.isGameComplete()) {
d.default.gameUi.pro.progress = 1;
d.default.gameUi.proTxt.string = GlobalFun.i18n.t("lable.10283").replace("%d", 100);
d.default.game.levelComplete();
}
c.default.instance.smallestBallBoom(this.totalLife, this.node.position.x, this.node.position.y);
(0 == c.default.instance.curBallNum || c.default.instance.curBallNum < c.default.instance.minBallNum) && c.default.instance.createBallImmediately();
}
};
t.prototype.getXSpeedBySize = function() {
return this.xSpeedArr[this.size];
};
t.prototype.getYSpeedBySize = function() {
return this.ySpeedArr[this.size];
};
t.prototype.setStartColor2 = function() {
1 != p.default.instance.gameType && this.setColor(1);
};
t.prototype.randomNumber = function() {
return Math.floor(Math.random() * this.co.length);
};
t.prototype.setStartColor = function() {
if (1 != p.default.instance.gameType) {
var e = this.countColor();
e = e >= 11 ? 11 : e;
this.startColor = this.colorArr[e];
this.curBloodColor = GlobalFun.bloodColorArr[e];
this.setColor(this.startColor);
this.lastColor = e;
this.colorLife = this.totalLife;
}
};
t.prototype.colorChange = function() {
if (1 != p.default.instance.gameType) {
var e = this.countColor();
if (!(e >= 11 && 11 == this.lastColor || e < 1 && 0 == this.lastColor)) if (e < 1) {
this.setColor(this.colorArr[e]);
this.curBloodColor = GlobalFun.bloodColorArr[e];
this.lastColor = 0;
} else if (this.lastColor != e) {
this.curBloodColor = GlobalFun.bloodColorArr[e];
this.setColor(this.colorArr[e]);
this.lastColor = e;
}
}
};
t.prototype.countColor = function() {
p.default.instance.getConnonInfo(p.default.instance.curCannonID);
var e = d.default.game.playerScript, t = this.curLife / (e.mainGunHit + e.extraGunHit), n = 0;
if (t >= 7) n = 11; else if (t < 1) n = 1; else {
n = Math.round(t / .7);
}
return n;
};
t.prototype.biger = function() {
if (!(this.isInBiger || p.default.instance.isInFrozen > 0)) {
var e = 1.05;
e = 0 == this.size ? 1.16 : 1 == this.size ? 1.12 : 2 == this.size ? 1.1 : 1.08;
this.isInBiger = !0;
this.icon.node.runAction(cc.sequence(cc.scaleTo(.02, e), cc.scaleTo(.02, 1), cc.callFunc(function() {
this.isInBiger = !1;
}, this)));
this.icon_up.node.runAction(cc.sequence(cc.scaleTo(.02, e), cc.scaleTo(.02, 1), cc.callFunc(function() {
this.isInBiger = !1;
}, this)));
}
};
t.prototype.countPoints = function(e, t, n) {
var o = t.sub(e), a = o.mag();
return o.mul(n / a).add(e);
};
t.prototype.playBlood = function(e) {};
t.prototype.setColor = function(e) {
if (cc.sys.isNative) {
if (0 == d.default.gameUi.exp_type || 2 == d.default.gameUi.exp_type) {
var t = this.co[this.randomNumber()];
this.icon.node.color = cc.color(t[0], t[1], t[2]);
}
} else if (0 == d.default.gameUi.exp_type || 2 == d.default.gameUi.exp_type) {
t = this.co[this.randomNumber()];
this.icon.node.color = cc.color(t[0], t[1], t[2]);
}
};
a([ P(cc.Integer) ], t.prototype, "jumpHeight", void 0);
a([ P(cc.Integer) ], t.prototype, "size", void 0);
a([ P(cc.Sprite) ], t.prototype, "icon", void 0);
a([ P(cc.Sprite) ], t.prototype, "icon_up", void 0);
a([ P(cc.Node) ], t.prototype, "myLable", void 0);
a([ P(cc.Float) ], t.prototype, "radius", void 0);
a([ P(cc.Node) ], t.prototype, "quan", void 0);
a([ P(b.default) ], t.prototype, "iconProgressBar2", void 0);
return t = a([ _ ], t);
}(l.default);
n.default = M;
cc._RF.pop();
}, {
"../../../Prefab/CircleLifeProgressBar/CircleLifeProgressBar": "CircleLifeProgressBar",
"../../code/Config/Config": "Config",
"../../code/Lib/Global": "Global",
"../../code/basecode/EasyGetCompleteClass": "EasyGetCompleteClass",
"../../code/manager/BallManager": "BallManager",
"../../code/manager/EffectManager": "EffectManager",
"../../code/manager/MissionManger": "MissionManger",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/NodePoolMananger": "NodePoolMananger",
"../../code/manager/PanelManager": "PanelManager",
"../../code/manager/SDKManager": "SDKManager",
"../../code/manager/SoundManager": "SoundManager",
"../game/Game": "Game"
} ],
BasePanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f85707o7ZhNe6HnaVyn4FVr", "BasePanel");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../manager/UiAniManager"), r = cc._decorator, l = r.ccclass, s = (r.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.panelAni = null;
return t;
}
t.prototype.openPanel = function() {
for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
};
t.prototype.closePanel = function() {
for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
};
t.prototype.panelIn = function() {};
t.prototype.panelOut = function() {};
t.prototype.addEvent = function() {};
t.prototype.dleEvent = function() {};
t.prototype.setLable = function() {
for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
};
t.prototype.playUIAni = function(e) {
if (this.aniType != i.UiAniType.Null) {
this.addUiClip();
this.panelAni.playAdditive(this.aniType + e);
} else e == i.InOrOut.IN ? this.panelIn() : e == i.InOrOut.OUT && this.panelOut();
};
t.prototype.stopUIAni = function() {
this.panelAni.stop();
};
Object.defineProperty(t.prototype, "aniType", {
get: function() {
return this._aniType;
},
set: function(e) {
this.addUiClip();
this._aniType = e;
},
enumerable: !1,
configurable: !0
});
t.prototype.addUiClip = function() {
if (!this.panelAni) {
var e = this.getComponent(cc.Animation);
this.panelAni = e || this.node.addComponent(cc.Animation);
}
if (this.curPanelAniType != this.aniType) {
this.panelAni.addClip(i.default.getUiClip(this.aniType + i.InOrOut.IN));
this.panelAni.addClip(i.default.getUiClip(this.aniType + i.InOrOut.OUT));
this.curPanelAniType = this.aniType;
}
};
return t = a([ l ], t);
}(cc.Component));
n.default = s;
cc._RF.pop();
}, {
"../manager/UiAniManager": "UiAniManager"
} ],
BossLevelBtn: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d05272IigJJ8K1109ZXyKul", "BossLevelBtn");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../../code/manager/MyRoleDataManager"), r = cc._decorator, l = r.ccclass, s = r.property, c = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.sprite = null;
t.resArr = [];
t.isUnlock = !0;
t.level = 0;
return t;
}
t.prototype.init = function(e, t) {
this.isUnlock = e;
this.level = t;
this.setSprite();
};
t.prototype.unlock = function(e) {
void 0 === e && (e = -1);
this.isUnlock = !0;
this.level = -1 == e ? this.level : e;
};
t.prototype.setSprite = function() {
this.isUnlock ? this.isUnlock && i.default.instance.curLevel == this.level ? this.sprite.spriteFrame = this.resArr[1] : this.isUnlock && i.default.instance.curLevel > this.level && (this.sprite.spriteFrame = this.resArr[2]) : this.sprite.spriteFrame = this.resArr[0];
};
a([ s({
type: cc.Sprite,
tooltip: "图片"
}) ], t.prototype, "sprite", void 0);
a([ s({
type: [ cc.SpriteFrame ],
tooltip: "图片资源"
}) ], t.prototype, "resArr", void 0);
return t = a([ l ], t);
}(cc.Component);
n.default = c;
cc._RF.pop();
}, {
"../../../code/manager/MyRoleDataManager": "MyRoleDataManager"
} ],
BoxManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0fddbGMd/FN7Is2x++uiOxE", "BoxManager");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../Lib/LocalStorage"), a = e("../Lib/Global"), i = e("./SDKManager"), r = function() {
function e() {
this.boxDataArr = [];
this.boxDataArr = JSON.parse(o.default.getItem("boxDataArr", "[]"));
}
Object.defineProperty(e, "instance", {
get: function() {
this._instance || (this._instance = new e());
return this._instance;
},
enumerable: !1,
configurable: !0
});
e.prototype.saveBoxData = function() {
o.default.saveItem("boxDataArr", JSON.stringify(this.boxDataArr));
};
e.prototype.getBoxDataByIndex = function(e) {
for (var t = this.boxDataArr.length, n = 0; n < t; n++) if (this.boxDataArr[n] && this.boxDataArr[n].index == e) return this.boxDataArr[n];
return null;
};
e.prototype.addBox = function(e) {
for (var t = -1, n = [ 0, 1, 2, 3 ], o = this.boxDataArr.length, a = 0; a < o; a++) this.boxDataArr[a] && (n[this.boxDataArr[a].index] = -1);
var r = n.length;
for (a = 0; a < r; a++) -1 != n[a] && (t = n[a]);
if (-1 == t) return !1;
var l = this.initBoxData(t, e);
i.default.instance.callJava("trackEventWithType", "(Ljava/lang/String;Ljava/lang/String;I)V", "GetBox", e + "", 1);
this.boxDataArr.push(l);
this.saveBoxData();
return !0;
};
e.prototype.openBox = function(e) {
for (var t = this.boxDataArr.length, n = 0; n < t; n++) if (this.boxDataArr[n] && this.boxDataArr[n].index == e) {
i.default.instance.callJava("trackEventWithType", "(Ljava/lang/String;Ljava/lang/String;I)V", "OpenBox", this.boxDataArr[n].boxLevel + "", 1);
this.boxDataArr.splice(n, 1);
break;
}
this.saveBoxData();
};
e.prototype.boxStartOpen = function(e) {
if (this.checkIsboxOpen()) return !1;
var t = this.getBoxDataByIndex(e);
t.isOpening = 1;
var n = a.default.getTime();
t.openTime = n + 1e4;
this.saveBoxData();
};
e.prototype.checkIsboxOpen = function() {
for (var e = this.boxDataArr.length, t = 0; t < e; t++) {
var n = this.boxDataArr[t];
if (n && 1 == n.isOpening) return n;
}
return !1;
};
e.prototype.checkIsHaveBox = function() {
return this.boxDataArr.length > 0;
};
e.prototype.initBoxData = function(e, t) {
return {
index: e,
boxLevel: t,
isOpening: 0,
openTime: -1
};
};
return e;
}();
n.default = r;
cc._RF.pop();
}, {
"../Lib/Global": "Global",
"../Lib/LocalStorage": "LocalStorage",
"./SDKManager": "SDKManager"
} ],
BoxOpenPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "2a913rGsDxJqofNSU4HoTIr", "BoxOpenPanel");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../code/basecode/BasePanel"), r = e("../../code/manager/UiAniManager"), l = e("../../code/manager/PanelManager"), s = e("../../code/Config/Config"), c = e("../../code/manager/TableManager"), u = e("../../code/Lib/Global"), d = e("../../code/manager/BoxManager"), p = e("../../code/Lib/DateUtils"), f = e("../../code/manager/MyRoleDataManager"), h = e("../../code/ads/AdsGroupController"), g = e("../../code/manager/SDKManager"), y = cc._decorator, m = y.ccclass, b = y.property, v = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.nameLabel = null;
t.boxSprite = null;
t.goldNode = null;
t.diamondNode = null;
t.chipNode = null;
t.goldLabel = null;
t.diamondLabel = null;
t.chipLabel = null;
t.timeLabel = null;
t.diamondBtn = null;
t.adsBtn = null;
t.unlockBtn = null;
t.adsBtnLabel = null;
t.diamondBtnLabel = null;
t.diamondNumLabel = null;
t.unlockBtnLabel = null;
t.backNode = null;
t.closeBtn = null;
t.openingLabel = null;
t.isOpenBox = !1;
t._aniType = r.UiAniType.TopToDown;
return t;
}
t.prototype.update = function() {
if (this.clickBoxData) if (1 == this.clickBoxData.isOpening) {
this.timeLabel.string = GlobalFun.i18n.t("lable.10004") + p.default.instance.getFormatBySecond((this.clickBoxData.openTime - u.default.getTime()) / 1e3, 5);
this.diamondNumLabel.string = this.countUnlockDiamond() + "";
} else if (2 == this.clickBoxData.isOpening) {
this.closePanel();
this.clickBoxData = null;
}
};
t.prototype.openPanel = function(e, t) {
this.box = t;
this.clickBoxData = e;
this.isOpenBox = !1;
this.btnState();
this.playUIAni(r.InOrOut.IN);
this.addEvent();
this.setLable();
};
t.prototype.closePanel = function() {
this.playUIAni(r.InOrOut.OUT);
this.dleEvent();
};
t.prototype.panelIn = function() {
this.backNode.on("click", this.closePanel, this);
};
t.prototype.panelOut = function() {
this.isOpenBox && this.box.click();
this.clickBoxData = null;
this.box = null;
l.default.instance.deleteOpen(s.PanelName.BoxOpenPanel);
this.node.removeFromParent();
};
t.prototype.addEvent = function() {
this.adsBtn.node.on("click", this.adsBtnTap, this);
this.unlockBtn.node.on("click", this.unlockBtnTap, this);
this.diamondBtn.node.on("click", this.diamondBtnTap, this);
this.closeBtn.node.on("click", this.closePanel, this);
};
t.prototype.dleEvent = function() {
this.adsBtn.node.off("click", this.adsBtnTap, this);
this.unlockBtn.node.off("click", this.unlockBtnTap, this);
this.diamondBtn.node.off("click", this.diamondBtnTap, this);
this.closeBtn.node.off("click", this.closePanel, this);
this.backNode.off("click", this.closePanel, this);
};
t.prototype.setLable = function() {
this.adsBtnLabel.string = GlobalFun.i18n.t("lable.10249");
this.nameLabel.string = GlobalFun.i18n.t("lable." + (this.clickBoxData.boxLevel - 7e5 + 10238));
this.openingLabel.string = GlobalFun.i18n.t("lable.10248");
this.diamondBtnLabel.string = GlobalFun.i18n.t("lable.10247");
this.unlockBtnLabel.string = GlobalFun.i18n.t("lable.10232");
this.setShow();
};
t.prototype.setShow = function() {
this.goldNode.active = this.diamondNode.active = this.chipNode.active = !1;
this.boxSprite.spriteFrame = l.default.gameUi.boxAtlas.getSpriteFrame("baoxiang" + (this.clickBoxData.boxLevel - 7e5 + 1));
for (var e = c.default.instance.boxTable.getRewardDis(this.clickBoxData.boxLevel), t = e.length, n = 0; n < t; n++) {
var o = e[n];
if (o[0] == s.CurrencyType.Gold) {
this.goldNode.active = !0;
var a = GlobalFun.i18n.t("lable.10243").split("%d");
this.goldLabel.string = "<b>" + a[0] + "<color=#ffe262>" + u.default.setNum(o[1]) + "</c>-<color=#ffe262>" + u.default.setNum(o[2]) + "</c>" + a[1] + "</b>";
} else if (o[0] == s.CurrencyType.Diamond) {
this.diamondNode.active = !0;
a = GlobalFun.i18n.t("lable.10244").split("%d");
this.diamondLabel.string = "<b>" + a[0] + "<color=#ffe262>" + u.default.setNum(o[1]) + "</c>-<color=#ffe262>" + u.default.setNum(o[2]) + "</c>" + a[1] + "</b>";
} else if (o[0] == s.CurrencyType.Diamond) {
this.chipNode.active = !0;
a = GlobalFun.i18n.t("lable.10245").split("%d");
this.chipLabel.string = "<b>" + a[0] + "<color=#ffe262>" + u.default.setNum(o[1]) + "</c>-<color=#ffe262>" + u.default.setNum(o[2]) + "</c>" + a[1] + "</b>";
}
}
};
t.prototype.btnState = function() {
if (0 == this.clickBoxData.isOpening) if (d.default.instance.checkIsboxOpen()) {
this.timeLabel.node.active = !1;
this.adsBtn.node.active = !1;
this.unlockBtn.node.active = !1;
this.openingLabel.node.active = !0;
this.diamondBtn.node.active = !0;
this.diamondNumLabel.string = this.countUnlockDiamond() + "";
} else {
this.unlockBtn.node.active = !0;
this.timeLabel.node.active = this.openingLabel.node.active = this.adsBtn.node.active = this.diamondBtn.node.active = !1;
} else if (1 == this.clickBoxData.isOpening) {
this.timeLabel.node.active = !0;
this.adsBtn.node.active = !0;
this.unlockBtn.node.active = !1;
this.openingLabel.node.active = !1;
this.diamondBtn.node.active = !0;
this.diamondNumLabel.string = this.countUnlockDiamond() + "";
}
};
t.prototype.countUnlockDiamond = function() {
if (this.clickBoxData) {
var e = c.default.instance.boxTable.getDiamond(this.clickBoxData.boxLevel);
if (0 == this.clickBoxData.isOpening) return e;
var t = c.default.instance.boxTable.getTime(this.clickBoxData.boxLevel), n = u.default.getTime();
return Math.round(e * (this.clickBoxData.openTime - n) / t);
}
return 20;
};
t.prototype.adsBtnTap = function() {
if (f.default.instance.checkIsHaveFreeVedioTimes(!0)) {
this.clickBoxData.openTime -= 144e5;
d.default.instance.saveBoxData();
} else h.default.instance.waitAdsReady("UnlockBox", function() {
l.default.gameUi.openMask();
h.default.instance.showAds("UnlockBox", function(e, t) {
if (t) {
this.clickBoxData.openTime -= 144e5;
d.default.instance.saveBoxData();
}
}.bind(this));
}, function() {
l.default.gameUi.openMask(!0);
h.default.instance.loadAds("UnlockBox", !0);
}, this, 120, function() {
l.default.gameUi.showTishi(GlobalFun.i18n.t("lable.10251"));
l.default.gameUi.openMask(!1);
}, this, 0, 0);
};
t.prototype.unlockBtnTap = function() {
this.clickBoxData.isOpening = 1;
this.clickBoxData.openTime = u.default.getTime() + c.default.instance.boxTable.getTime(this.clickBoxData.boxLevel);
d.default.instance.saveBoxData();
this.closePanel();
};
t.prototype.diamondBtnTap = function() {
var e = this.countUnlockDiamond();
e = e < 0 ? 0 : e;
if (f.default.instance.dleCurrency(e, s.CurrencyType.Diamond)) {
g.default.instance.callJava("trackEventWithType", "(Ljava/lang/String;Ljava/lang/String;I)V", "OpenBoxByDiamond", this.clickBoxData.boxLevel + "", 1);
this.isOpenBox = !0;
this.clickBoxData.openTime = 0;
this.clickBoxData.isOpening = 2;
this.closePanel();
} else l.default.instance.openPanel(s.PanelName.GoShopPanel, l.default.gameUi.middleNode, s.CurrencyType.Diamond);
};
a([ b({
type: cc.Label,
tooltip: "标题label"
}) ], t.prototype, "nameLabel", void 0);
a([ b({
type: cc.Sprite,
tooltip: "宝箱图标"
}) ], t.prototype, "boxSprite", void 0);
a([ b({
type: cc.Node,
tooltip: "金币节点"
}) ], t.prototype, "goldNode", void 0);
a([ b({
type: cc.Node,
tooltip: "钻石节点"
}) ], t.prototype, "diamondNode", void 0);
a([ b({
type: cc.Node,
tooltip: "芯片节点"
}) ], t.prototype, "chipNode", void 0);
a([ b({
type: cc.RichText,
tooltip: "金币label"
}) ], t.prototype, "goldLabel", void 0);
a([ b({
type: cc.RichText,
tooltip: "钻石label"
}) ], t.prototype, "diamondLabel", void 0);
a([ b({
type: cc.RichText,
tooltip: "芯片label"
}) ], t.prototype, "chipLabel", void 0);
a([ b({
type: cc.Label,
tooltip: "剩余时间label"
}) ], t.prototype, "timeLabel", void 0);
a([ b({
type: cc.Button,
tooltip: "钻石按钮"
}) ], t.prototype, "diamondBtn", void 0);
a([ b({
type: cc.Button,
tooltip: "广告按钮"
}) ], t.prototype, "adsBtn", void 0);
a([ b({
type: cc.Button,
tooltip: "解锁按钮"
}) ], t.prototype, "unlockBtn", void 0);
a([ b({
type: cc.Label,
tooltip: "广告按钮label"
}) ], t.prototype, "adsBtnLabel", void 0);
a([ b({
type: cc.Label,
tooltip: "钻石按钮label"
}) ], t.prototype, "diamondBtnLabel", void 0);
a([ b({
type: cc.Label,
tooltip: "钻石按钮数量label"
}) ], t.prototype, "diamondNumLabel", void 0);
a([ b({
type: cc.Label,
tooltip: "解锁按钮label"
}) ], t.prototype, "unlockBtnLabel", void 0);
a([ b({
type: cc.Node,
tooltip: "背景节点"
}) ], t.prototype, "backNode", void 0);
a([ b({
type: cc.Button,
tooltip: "关闭按钮"
}) ], t.prototype, "closeBtn", void 0);
a([ b({
type: cc.Label,
tooltip: "打开文本"
}) ], t.prototype, "openingLabel", void 0);
return t = a([ m ], t);
}(i.default);
n.default = v;
cc._RF.pop();
}, {
"../../code/Config/Config": "Config",
"../../code/Lib/DateUtils": "DateUtils",
"../../code/Lib/Global": "Global",
"../../code/ads/AdsGroupController": "AdsGroupController",
"../../code/basecode/BasePanel": "BasePanel",
"../../code/manager/BoxManager": "BoxManager",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/PanelManager": "PanelManager",
"../../code/manager/SDKManager": "SDKManager",
"../../code/manager/TableManager": "TableManager",
"../../code/manager/UiAniManager": "UiAniManager"
} ],
BoxPrefab: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9868cORqa5NtL37m8GbCfXD", "BoxPrefab");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../code/manager/BoxManager"), r = e("../../code/Lib/Global"), l = e("../../code/Lib/DateUtils"), s = e("../../code/manager/PanelManager"), c = e("../../code/Config/Config"), u = cc._decorator, d = u.ccclass, p = u.property, f = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.timeLabel = null;
t.boxSprite = null;
t.backSprite = null;
t.backSpriteFrame = [];
return t;
}
t.prototype.onLoad = function() {
this.node.on("click", this.click, this);
};
t.prototype.update = function() {
if (this.boxData && 1 == this.boxData.isOpening) {
var e = r.default.getTime();
if (this.boxData.openTime <= e) {
this.boxData.isOpening = 2;
this.stateChange();
return;
}
this.timeLabel.string = l.default.instance.getFormatBySecond((this.boxData.openTime - e) / 1e3, 1);
}
};
t.prototype.init = function(e) {
this.boxData = e;
this.stateChange();
};
t.prototype.click = function() {
if (this.boxData) {
if (2 == this.boxData.isOpening) {
s.default.gameUi.boxOpenAni(this.boxData, this.node);
i.default.instance.openBox(this.boxData.index);
this.boxData = null;
} else s.default.instance.openPanel(c.PanelName.BoxOpenPanel, s.default.gameUi.middleNode, this.boxData, this);
this.stateChange();
}
};
t.prototype.stateChange = function() {
if (this.boxData) {
this.boxSprite.spriteFrame = s.default.gameUi.boxAtlas.getSpriteFrame("baoxiang" + (this.boxData.boxLevel - 7e5 + 1));
this.boxSprite.node.active = !0;
this.timeLabel.node.active = !0;
if (0 == this.boxData.isOpening) {
this.backSprite.spriteFrame = this.backSpriteFrame[0];
this.timeLabel.string = GlobalFun.i18n.t("lable.10242");
} else if (1 == this.boxData.isOpening) this.backSprite.spriteFrame = this.backSpriteFrame[0]; else if (2 == this.boxData.isOpening) {
this.backSprite.spriteFrame = this.backSpriteFrame[1];
this.timeLabel.string = GlobalFun.i18n.t("lable.10246");
}
} else {
this.backSprite.spriteFrame = this.backSpriteFrame[0];
this.timeLabel.node.active = !1;
this.boxSprite.node.active = !1;
}
};
a([ p({
type: cc.Label,
tooltip: "倒计时label"
}) ], t.prototype, "timeLabel", void 0);
a([ p({
type: cc.Sprite,
tooltip: "宝箱图片"
}) ], t.prototype, "boxSprite", void 0);
a([ p({
type: cc.Sprite,
tooltip: "背景"
}) ], t.prototype, "backSprite", void 0);
a([ p({
type: [ cc.SpriteFrame ],
tooltip: "背景资源"
}) ], t.prototype, "backSpriteFrame", void 0);
return t = a([ d ], t);
}(cc.Component);
n.default = f;
cc._RF.pop();
}, {
"../../code/Config/Config": "Config",
"../../code/Lib/DateUtils": "DateUtils",
"../../code/Lib/Global": "Global",
"../../code/manager/BoxManager": "BoxManager",
"../../code/manager/PanelManager": "PanelManager"
} ],
BoxTable: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e85ab9y+m5PX7jcSIhnMXhB", "BoxTable");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../../code/Lib/StringUtils"), a = e("../../code/manager/TableManager"), i = e("../../code/Lib/Global"), r = e("../../code/Config/Config"), l = function() {
function e(e) {
this.table = e;
}
e.prototype.getTime = function(e) {
for (var t = this.table.length, n = 0; n < t; n++) {
var o = this.table[n];
if (o && o.id == e) return 1e3 * o.time;
}
return 144e5;
};
e.prototype.getDiamond = function(e) {
for (var t = this.table.length, n = 0; n < t; n++) {
var o = this.table[n];
if (o && o.id == e) return Number(o.gems);
}
return 20;
};
e.prototype.getReward = function(e) {
for (var t = this.table.length, n = 0; n < t; n++) {
var o = this.table[n];
if (o && o.id == e) return this.reward(o.reward);
}
return new Map();
};
e.prototype.reward = function(e) {
for (var t = new Map(), n = this.rewardDis(e), o = n.length, a = 0; a < o; a++) {
var r = n[a], l = this.rewardType(), s = (r[2] - r[1]) / 4, c = i.default.Random(Math.round(r[1] + l * s), Math.round(r[1] + (l + 1) * s));
c = c < 1 ? 1 : c;
t.set(r[0], c);
}
return t;
};
e.prototype.rewardType = function() {
var e = i.default.Random(0, 99);
return e < 40 ? 0 : e < 70 ? 1 : e < 90 ? 2 : 3;
};
e.prototype.getRewardDis = function(e) {
for (var t = this.table.length, n = 0; n < t; n++) {
var o = this.table[n];
if (o && o.id == e) return this.rewardDis(o.reward);
}
return [];
};
e.prototype.rewardDis = function(e) {
for (var t = [], n = o.default.instance.strToArr4(e), i = n.length, l = 0; l < i; l++) {
var s = n[l], c = s[0] == r.CurrencyType.Gold ? Math.floor(a.default.instance.connonTable.getBestTenUpgradeMoney() * s[1] * .001) : s[1], u = s[0] == r.CurrencyType.Gold ? Math.floor(a.default.instance.connonTable.getBestTenUpgradeMoney() * s[2] * .001) : s[2];
t.push([ s[0], c, u ]);
}
return t;
};
return e;
}();
n.default = l;
cc._RF.pop();
}, {
"../../code/Config/Config": "Config",
"../../code/Lib/Global": "Global",
"../../code/Lib/StringUtils": "StringUtils",
"../../code/manager/TableManager": "TableManager"
} ],
BuffHint: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "916fdfdo+ZJ5a35cPb95QaN", "BuffHint");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("./BuffManager"), r = e("./code/manager/PanelManager"), l = e("./code/manager/MyRoleDataManager"), s = cc._decorator, c = s.ccclass, u = s.property, d = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.ProgressBar = null;
t.Describe = null;
t.frequency = .1;
t.isAircraft = -1;
return t;
}
t.prototype.setPicture = function(e, t, n, o, a, s) {
void 0 === a && (a = !1);
void 0 === s && (s = -1);
this.isAircraft = s;
this.Times = t;
this.timemaximum = a ? 8 : t;
this.buffID = n;
this.ProgressBar.progress = 1;
this.currentTime = 0;
this.ProgressBar.getComponent(cc.Sprite).spriteFrame = e;
this.Describe.string = o;
this.callback = function() {
this.ProgressBar.progress = 1 - this.currentTime / this.Times;
this.currentTime += this.frequency;
if (this.currentTime >= this.Times) {
switch (this.buffID) {
case 5e5:
r.default.game.playerScript.delayed();
delete i.default.instance.gobj[this.buffID];
break;

case 500001:
l.default.instance.InMagnetdelayed();
delete i.default.instance.gobj[this.buffID];
break;

case 500002:
break;

case 500003:
delete i.default.instance.gobj[this.buffID];
l.default.instance.Hitdelayed();
break;

case 500004:
if (0 == this.isAircraft) {
delete i.default.instance.aircraft[0];
if (null != r.default.gameUi.Connon.funnelLeftScript) {
r.default.gameUi.Connon.funnelLeftScript.funnelOut();
r.default.gameUi.Connon.funnelLeftScript = null;
}
} else {
delete i.default.instance.aircraft[1];
if (null != r.default.gameUi.Connon.funnelRightScript) {
r.default.gameUi.Connon.funnelRightScript.funnelOut();
r.default.gameUi.Connon.funnelRightScript = null;
}
}
break;

case 500005:
l.default.instance.frozendelayed();
delete i.default.instance.gobj[this.buffID];
}
this.unschedule(this.callback);
this.node.destroy();
}
};
this.schedule(this.callback, this.frequency);
};
t.prototype.updateTime = function(e, t) {
void 0 === t && (t = !1);
if (t) this.Times = this.Times + e > this.timemaximum ? this.timemaximum : this.Times + e; else {
this.Times = e;
this.currentTime = 0;
}
};
t.prototype.pauseBuff = function() {
this.frequency = 0;
};
t.prototype.resumeBuff = function() {
this.frequency = .1;
};
t.prototype.getTimeRemaining = function() {
return this.Times - this.currentTime;
};
a([ u(cc.ProgressBar) ], t.prototype, "ProgressBar", void 0);
a([ u(cc.Label) ], t.prototype, "Describe", void 0);
return t = a([ c ], t);
}(cc.Component);
n.default = d;
cc._RF.pop();
}, {
"./BuffManager": "BuffManager",
"./code/manager/MyRoleDataManager": "MyRoleDataManager",
"./code/manager/PanelManager": "PanelManager"
} ],
BuffManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e5097phL9lCFo5rnBtCyYAj", "BuffManager");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("./BuffHint"), a = e("./src/game/GameUI"), i = function() {
function e() {
this.gobj = {};
this.aircraft = {};
}
Object.defineProperty(e, "instance", {
get: function() {
this._instance || (this._instance = new e());
this.GameUILiving || (this.GameUILiving = cc.find("Canvas").getComponent(a.default));
return this._instance;
},
enumerable: !1,
configurable: !0
});
e.prototype.addBuffShow = function(t, n, a, i, r, l) {
void 0 === l && (l = !1);
if (this.gobj[t]) this.gobj[t].updateTime(n, l); else {
var s = cc.instantiate(a);
e.GameUILiving.buffShow.addChild(s);
s.setPosition(0, 0);
var c = s.getComponent(o.default);
this.gobj[t] = c;
c.setPicture(i, n, t, r, l);
}
};
e.prototype.addBuffShow2 = function(t, n, a, i, r, l) {
void 0 === l && (l = !1);
if (500004 == t) if (this.aircraft[0]) if (this.aircraft[1]) if (this.aircraft[0].getTimeRemaining() > this.aircraft[1].getTimeRemaining()) {
this.aircraft[1].node.setParent(e.GameUILiving.buffShow);
this.aircraft[1].node.setPosition(0, 0);
this.aircraft[1].updateTime(n, l);
this.aircraft[0].node.setParent(e.GameUILiving.node);
this.aircraft[0].node.setPosition(5e3, 5e3);
} else {
this.aircraft[0].node.setParent(e.GameUILiving.buffShow);
this.aircraft[0].node.setPosition(0, 0);
this.aircraft[0].updateTime(n, l);
this.aircraft[1].node.setParent(e.GameUILiving.node);
this.aircraft[1].node.setPosition(5e3, 5e3);
} else {
if (this.aircraft[0]) {
this.aircraft[0].node.setParent(e.GameUILiving.node);
this.aircraft[0].node.setPosition(5e3, 5e3);
}
s = cc.instantiate(a);
e.GameUILiving.buffShow.addChild(s);
s.setPosition(0, 0);
c = s.getComponent(o.default);
this.aircraft[1] = c;
c.setPicture(i, n, t, r, l, 1);
} else {
if (this.aircraft[1]) {
this.aircraft[1].node.setParent(e.GameUILiving.node);
this.aircraft[1].node.setPosition(5e3, 5e3);
}
var s = cc.instantiate(a);
e.GameUILiving.buffShow.addChild(s);
s.setPosition(0, 0);
var c = s.getComponent(o.default);
this.aircraft[0] = c;
c.setPicture(i, n, t, r, l, 0);
}
};
e.prototype.removeAllBuff = function() {
for (var e in this.gobj) {
this.gobj[e].updateTime(0);
}
for (var t in this.aircraft) this.aircraft[t].updateTime(0);
};
e.prototype.pauseAllBuff = function() {
if (this.gobj) for (var e in this.gobj) {
this.gobj[e].pauseBuff();
}
if (this.aircraft) for (var e in this.aircraft) {
this.aircraft[e].pauseBuff();
}
};
e.prototype.resumeAllBuff = function() {
if (this.gobj) for (var e in this.gobj) {
this.gobj[e].resumeBuff();
}
if (this.aircraft) for (var e in this.aircraft) {
this.aircraft[e].resumeBuff();
}
};
return e;
}();
n.default = i;
cc._RF.pop();
}, {
"./BuffHint": "BuffHint",
"./src/game/GameUI": "GameUI"
} ],
BulletBase: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "59c85Rkw6lMSZlVMxIk3jq2", "BulletBase");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../code/basecode/EasyGetCompleteClass"), r = e("../../code/manager/BallManager"), l = e("../../code/manager/NodePoolMananger"), s = cc._decorator, c = s.ccclass, u = s.property, d = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.iconImg = null;
t.killNum = 1;
t.maxHeight = 0;
t.isInit = !1;
return t;
}
t.prototype.init = function(e, t) {};
t.prototype.isCollided = function() {
if (!(this.node.x < 0 || this.node.x > 750) && this.isInit) {
for (var e = r.default.instance.quadTree.findObjects([], this), t = e.length, n = 0; n < t; n++) for (var o = e[n], a = e[n].length, i = 0; i < a; i++) {
var l = o[i];
if (l && l.isInit && l.node.position.sub(this.node.position).mag() <= l.radius) return l;
}
return !1;
}
};
t.prototype.remove = function() {
this.isInit = !1;
this.node.removeFromParent();
this.node.isInPool || l.default.instance.push(this.node);
};
t.prototype.setIcon = function(e) {
this.iconImg.spriteFrame = e;
};
a([ u(cc.Sprite) ], t.prototype, "iconImg", void 0);
return t = a([ c ], t);
}(i.default);
n.default = d;
cc._RF.pop();
}, {
"../../code/basecode/EasyGetCompleteClass": "EasyGetCompleteClass",
"../../code/manager/BallManager": "BallManager",
"../../code/manager/NodePoolMananger": "NodePoolMananger"
} ],
BulletBoom: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "a72c7aQaPhHsoIlgoT4CnmC", "BulletBoom");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("./BulletBase"), r = e("../../code/manager/PanelManager"), l = e("../../code/manager/BallManager"), s = e("../../code/manager/MyRoleDataManager"), c = e("../../code/manager/EffectManager"), u = cc._decorator, d = u.ccclass, p = (u.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.boomCircle = 50;
return t;
}
t.prototype.onLoad = function() {
this.EasyGetCompleteClassInit();
this.speed = 15;
};
t.prototype.update = function() {
if (this.isCollided()) {
this.isBoomCollided();
c.default.instance.playEffect(c.EffectName.BoomBulletBoom, r.default.game.ballNode, cc.v2(this.node.position));
this.remove();
} else if (!s.default.instance.checkGameState([ 4, 7 ])) {
this.node.y += this.ySpeed * s.default.instance.getTimeScale();
this.node.y >= this.maxHeight && this.remove();
}
};
t.prototype.init = function(e) {
this.isInit = !0;
this.node.angle = 0;
this.ySpeed = this.speed;
this.xSpeed = 0;
this.maxHeight = .5 * (cc.Canvas.instance.designResolution.height - cc.winSize.height) + cc.winSize.height;
this.killNum = e;
};
t.prototype.isBoomCollided = function() {
if (!(this.node.x < 0 || this.node.x > 750) && this.isInit) {
for (var e = !1, t = l.default.instance.quadTree.findObjects([], {
node: {
x: this.node.x,
y: this.node.y,
width: this.boomCircle,
height: this.boomCircle,
anchorX: .5,
anchorY: .5
}
}), n = t.length, o = 0; o < n; o++) for (var a = t[o], i = t[o].length, s = 0; s < i; s++) {
var c = a[s];
if (c && c.isInit && c.node.position.sub(this.node.position).mag() <= c.radius + this.boomCircle) {
r.default.game.addScore(this.killNum);
c.beAttack(this.killNum, this.node.position);
e = !0;
}
}
return e;
}
};
t.prototype.setIcon = function(e) {};
return t = a([ d ], t);
}(i.default));
n.default = p;
cc._RF.pop();
}, {
"../../code/manager/BallManager": "BallManager",
"../../code/manager/EffectManager": "EffectManager",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/PanelManager": "PanelManager",
"./BulletBase": "BulletBase"
} ],
BulletFollow: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "50b0dCmCzhK+psWWLwhl2d0", "BulletFollow");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("./BulletBase"), r = e("../../code/manager/BallManager"), l = e("./BallPrefab"), s = e("../../code/manager/PanelManager"), c = e("../../code/manager/MyRoleDataManager"), u = e("../../code/manager/EffectManager"), d = cc._decorator, p = d.ccclass, f = d.property, h = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.fire = null;
t.maxChangeRotation = 4;
return t;
}
t.prototype.onLoad = function() {
this.EasyGetCompleteClassInit();
this.speed = 15;
};
t.prototype.update = function() {
if (!c.default.instance.checkGameState([ 4, 7 ])) {
if (!this.target || !this.target.active) {
this.target = null;
var e = this.findTarget();
e && (this.target = e);
}
if (this.target && c.default.instance.checkGameState([ 1 ])) {
var t = this.target.position.sub(this.node.position).mag(), n = this.target.getComponent(l.default);
if (t <= n.radius) {
this.remove();
u.default.instance.playEffect(u.EffectName.BulletFollowBoom, s.default.game.ballNode, cc.v2(this.node.position));
s.default.game.addScore(this.killNum);
n.beAttack(this.killNum, this.node.position);
return;
}
var o = this.target.x - this.node.x, a = this.target.y - this.node.y, i = GlobalFun.huToJiao * Math.acos(o / t);
i = this.changeRotation(i, o, a);
i = this.getTempRotation(i, -this.node.angle);
this.xSpeed = this.speed * Math.sin(i / GlobalFun.huToJiao);
this.ySpeed = this.speed * Math.cos(i / GlobalFun.huToJiao);
this.node.angle = -i;
} else (this.node.y >= this.maxHeight || this.node.x <= 0 || this.node.x >= 750) && this.remove();
this.node.x += this.xSpeed * c.default.instance.getTimeScale();
this.node.y += this.ySpeed * c.default.instance.getTimeScale();
}
};
t.prototype.init = function(e) {
this.isInit = !0;
this.node.angle = 0;
this.ySpeed = this.speed;
this.xSpeed = 0;
this.fire.resetSystem();
this.maxHeight = .5 * (cc.Canvas.instance.designResolution.height - cc.winSize.height) + cc.winSize.height;
this.killNum = e;
};
t.prototype.findTarget = function() {
var e = null, t = 0;
for (var n in r.default.instance.curBallArr) {
var o = r.default.instance.curBallArr[n];
if (0 == t || o.curLife < t) {
t = o.curLife;
e = o;
}
}
return e ? e.node : null;
};
t.prototype.changeRotation = function(e, t, n) {
t <= 0 && n >= 0 ? e = 90 - e : t <= 0 && n < 0 ? e = -(270 - e) : t > 0 && n >= 0 ? e = 90 - e : t > 0 && n < 0 && (e = 90 + e);
return e;
};
t.prototype.setRotationZheng = function(e) {
if (e > 360) {
e -= 360;
return this.setRotationZheng(e);
}
if (e < 0) {
e += 360;
return this.setRotationZheng(e);
}
return e;
};
t.prototype.getTempRotation = function(e, t) {
(e = this.setRotationZheng(e)) - (t = this.setRotationZheng(t)) >= 180 ? e = (t += 360) - this.maxChangeRotation : e - t <= -180 ? e = (t -= 360) + this.maxChangeRotation : e - t >= this.maxChangeRotation ? e = t + this.maxChangeRotation : e - t <= -this.maxChangeRotation && (e = t - this.maxChangeRotation);
return e;
};
t.prototype.remove = function() {
this.isInit = !1;
this.fire.stopSystem();
this.node.removeFromParent();
};
t.prototype.setIcon = function(e) {};
a([ f(cc.ParticleSystem) ], t.prototype, "fire", void 0);
return t = a([ p ], t);
}(i.default);
n.default = h;
cc._RF.pop();
}, {
"../../code/manager/BallManager": "BallManager",
"../../code/manager/EffectManager": "EffectManager",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/PanelManager": "PanelManager",
"./BallPrefab": "BallPrefab",
"./BulletBase": "BulletBase"
} ],
BulletJiGuangQieGe: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "18190D2CbdFHrOxAFkLVvsB", "BulletJiGuangQieGe");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("./BulletBase"), r = e("../../code/manager/BallManager"), l = e("../../code/manager/MyRoleDataManager"), s = e("../../code/manager/PanelManager"), c = e("../../code/Config/Config"), u = cc._decorator, d = u.ccclass, p = u.property, f = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.attackImg = null;
return t;
}
t.prototype.onLoad = function() {
this.EasyGetCompleteClassInit();
this.speed = 0;
};
t.prototype.init = function(e, t) {
this.connon = t;
this.isInit = !0;
this.node.angle = 0;
this.ySpeed = this.speed;
this.xSpeed = 0;
this.maxHeight = .5 * (cc.Canvas.instance.designResolution.height - cc.winSize.height) + cc.winSize.height;
this.killNum = Math.ceil(.3 * e);
};
t.prototype.isCollided = function() {
if (this.isInit) {
var e = !1, t = r.default.instance.curBallArr, n = null, o = 2e3;
for (var a in t) {
var i = r.default.instance.curBallArr[a];
if (i && i.isInit && Math.abs(i.node.x - this.node.x) <= i.radius) {
var l = i.radius - Math.sqrt(Math.pow(i.radius, 2) - Math.pow(i.node.x - this.node.x, 2)), u = i.node.y - this.node.y - .5 * i.node.height + l;
u = u <= 0 ? 0 : u;
if (Math.min(u, o) == u) {
o = u;
n = i;
}
e = !0;
}
}
if (e) {
s.default.game.addScore(this.killNum);
n.beAttack(this.killNum, this.node.position, c.BulletType.LaserCut);
this.iconImg.node.height = o;
this.node.height = o;
this.attackImg.node.y = o;
} else {
this.iconImg.node.height = 1300;
this.node.height = 1300;
this.attackImg.node.y = 1300;
}
}
};
t.prototype.update = function() {
this.node.x = this.connon.parent.parent.x + this.connon.parent.x;
};
t.prototype.lateUpdate = function() {
l.default.instance.checkGameState([ 4, 7 ]) || this.isCollided();
};
t.prototype.setIcon = function(e) {};
a([ p(cc.Sprite) ], t.prototype, "attackImg", void 0);
return t = a([ d ], t);
}(i.default);
n.default = f;
cc._RF.pop();
}, {
"../../code/Config/Config": "Config",
"../../code/manager/BallManager": "BallManager",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/PanelManager": "PanelManager",
"./BulletBase": "BulletBase"
} ],
BulletLaserCut: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5491eHFmI1BfrLMUrO0nkqz", "BulletLaserCut");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("./BulletBase"), r = e("../../code/manager/MyRoleDataManager"), l = e("../../code/manager/NodePoolMananger"), s = e("../../code/manager/BallManager"), c = cc._decorator, u = c.ccclass, d = c.property, p = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.laserImg = null;
t.laserAni = null;
t.inAttack = !1;
return t;
}
t.prototype.onLoad = function() {
this.EasyGetCompleteClassInit();
this.speed = 10;
};
t.prototype.update = function() {
if (!r.default.instance.checkGameState([ 3, 4, 7 ])) if (this.target) this.inAttack && this.target.killlifeNum(this.killNum); else {
this.node.y += this.ySpeed * r.default.instance.getTimeScale();
this.node.y >= this.maxHeight && this.remove();
}
};
t.prototype.lateUpdate = function() {
r.default.instance.checkGameState([ 4, 7 ]) || this.isCollided();
};
t.prototype.onDisable = function() {
this.addBullet();
};
t.prototype.init = function(e, t) {
this.connonParent = t;
this.isInit = !0;
this.inAttack = !1;
this.node.angle = 0;
this.laserImg.node.active = !1;
this.ySpeed = this.speed;
this.xSpeed = 0;
this.maxHeight = .5 * (cc.Canvas.instance.designResolution.height - cc.winSize.height) + cc.winSize.height;
this.killNum = Math.ceil(.3 * e);
};
t.prototype.remove = function() {
this.laserAni.stop();
this.target = null;
this.isInit = !1;
this.node.removeFromParent();
this.node.isInPool || l.default.instance.push(this.node);
};
t.prototype.isCollided = function() {
if (!(this.node.x < 0 || this.node.x > 750) && this.isInit) for (var e = s.default.instance.quadTree.findObjects([], this), t = e.length, n = 0; n < t; n++) for (var o = e[n], a = e[n].length, i = 0; i < a; i++) {
var r = o[i];
if (r && r.isInit && r.node.position.sub(this.node.position).mag() <= r.radius) {
this.connectBall(r);
return;
}
}
};
t.prototype.connectBall = function(e) {
var t = this;
this.target = e;
var n = e.node.angle;
this.node.parent = e.node;
var o = this.node.x - e.node.x, a = this.node.y - e.node.y, i = -e.node.angle / GlobalFun.huToJiao, r = cc.v2(o * Math.cos(i) + a * Math.sin(i), a * Math.cos(i) - o * Math.sin(i));
this.node.setPosition(r);
var l = cc.v2(o, a).angle(cc.v2(1, 0)) * GlobalFun.huToJiao + 270 - n, s = (e.radius + 70) / r.mag(), c = cc.sequence(cc.rotateTo(.2, l), cc.moveTo(.5, r.mulSelf(s)), cc.callFunc(function() {
t.inAttack = !0;
t.laserImg.node.active = !0;
t.laserAni.play();
}));
this.node.runAction(c);
};
t.prototype.addBullet = function() {
this.connonParent && this.connonParent.addLaserCurNum();
this.connonParent = null;
};
a([ d({
type: cc.Sprite,
tooltip: "激光图片"
}) ], t.prototype, "laserImg", void 0);
a([ d({
type: cc.Animation,
tooltip: "激光"
}) ], t.prototype, "laserAni", void 0);
return t = a([ u ], t);
}(i.default);
n.default = p;
cc._RF.pop();
}, {
"../../code/manager/BallManager": "BallManager",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/NodePoolMananger": "NodePoolMananger",
"./BulletBase": "BulletBase"
} ],
BulletLaser: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "27168fgAkVFDJqXRf6Zn4LQ", "BulletLaser");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("./BulletBase"), r = e("../../code/manager/PanelManager"), l = e("../../code/manager/BallManager"), s = e("../../code/manager/MyRoleDataManager"), c = e("../../code/Config/Config"), u = cc._decorator, d = u.ccclass, p = u.property, f = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.attackImg = null;
t.disappearTime = 1;
return t;
}
t.prototype.onLoad = function() {
this.EasyGetCompleteClassInit();
this.speed = 0;
};
t.prototype.init = function(e, t) {
this.connon = t;
this.isInit = !0;
this.node.angle = 0;
this.ySpeed = this.speed;
this.xSpeed = 0;
this.maxHeight = .5 * (cc.Canvas.instance.designResolution.height - cc.winSize.height) + cc.winSize.height;
this.killNum = Math.ceil(.3 * e);
};
t.prototype.isCollided = function() {
if (this.isInit) {
var e = !1, t = l.default.instance.curBallArr, n = null, o = 2e3;
for (var a in t) {
var i = l.default.instance.curBallArr[a];
if (i && i.isInit && Math.abs(i.node.x - this.node.x) <= i.radius) {
var s = i.radius - Math.sqrt(Math.pow(i.radius, 2) - Math.pow(i.node.x - this.node.x, 2)), u = i.node.y - this.node.y - .5 * i.node.height + s;
u = u <= 0 ? 0 : u;
if (Math.min(u, o) == u) {
o = u;
n = i;
}
e = !0;
}
}
if (e) {
r.default.game.addScore(this.killNum);
n.beAttack(this.killNum, this.node.position, c.BulletType.BulletLaser);
this.iconImg.node.height = o;
this.node.height = o;
this.attackImg.node.y = o;
} else {
this.iconImg.node.height = 1300;
this.node.height = 1300;
this.attackImg.node.y = 1300;
}
}
};
t.prototype.update = function() {
this.node.x = this.connon.parent.parent.x + this.connon.parent.x;
};
t.prototype.lateUpdate = function() {
s.default.instance.checkGameState([ 4, 7 ]) || this.isCollided();
};
t.prototype.setIcon = function(e) {};
a([ p(cc.Sprite) ], t.prototype, "attackImg", void 0);
return t = a([ d ], t);
}(i.default);
n.default = f;
cc._RF.pop();
}, {
"../../code/Config/Config": "Config",
"../../code/manager/BallManager": "BallManager",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/PanelManager": "PanelManager",
"./BulletBase": "BulletBase"
} ],
BulletPrefab: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3c618IZ5VBBmKhXJvBRZJ0F", "BulletPrefab");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../code/manager/PanelManager"), r = e("./BulletBase"), l = e("../../code/manager/MyRoleDataManager"), s = cc._decorator, c = s.ccclass, u = (s.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.moveX = 5;
t.moveTimes = 0;
t.moveTemp = 2;
t.addXtime = 0;
return t;
}
t.prototype.onLoad = function() {
this.EasyGetCompleteClassInit();
};
t.prototype.update = function() {
if (!l.default.instance.checkGameState([ 4, 7 ])) {
this.addXtime++;
if (this.moveTimes > 0 && 2 == this.moveTemp) {
this.moveTemp = 0;
this.addXtime = 0;
this.moveTimes--;
this.node.x += this.moveX;
} else this.node.x += this.xSpeed * l.default.instance.getTimeScale();
this.moveTemp++;
this.node.y += this.ySpeed * l.default.instance.getTimeScale();
(this.node.y >= this.maxHeight || this.node.x < 0 || this.node.x > 750) && this.remove();
}
};
t.prototype.lateUpdate = function() {
if (!l.default.instance.checkGameState([ 4, 7 ])) {
var e = this.isCollided();
if (e) {
i.default.game.addScore(this.killNum);
e.beAttack(this.killNum, this.node.position);
this.remove();
}
}
};
t.prototype.init = function(e, t) {
this.isInit = !0;
this.node.parent ? this.maxHeight = this.node.parent.height : this.maxHeight = .5 * (cc.Canvas.instance.designResolution.height - cc.winSize.height) + cc.winSize.height;
this.addXtime = 0;
this.moveTimes = 3;
this.moveTemp = 1;
this.moveX = t / this.moveTimes;
0 == t && (this.moveTimes = 0);
this.killNum = Math.floor(e);
this.node.angle = 0;
this.ySpeed = 20;
this.xSpeed = 0;
};
t.prototype.setSpeed = function(e, t) {
this.speed = e;
this.xSpeed = this.speed * Math.sin(t / GlobalFun.huToJiao);
this.ySpeed = this.speed * Math.cos(t / GlobalFun.huToJiao);
this.node.angle = -t;
};
return t = a([ c ], t);
}(r.default));
n.default = u;
cc._RF.pop();
}, {
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/PanelManager": "PanelManager",
"./BulletBase": "BulletBase"
} ],
BulletTable: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "833aa6xWhtAy5ClF4igRypw", "BulletTable");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e(e, t) {
this.bullettable = e;
this.cointable = t;
}
e.prototype.getSourceById = function(e) {
for (var t = this.bullettable.length, n = 0; n < t; n++) {
var o = this.bullettable[n];
if (o && o.bullet_id == e) return o.icon_id;
}
return "icon1_94000";
};
e.prototype.getBulletSourceNum = function(e) {
for (var t = this.bullettable.length, n = 0; n < t; n++) {
var o = this.bullettable[n];
if (o && o.bullet_id == e) return Number(o.sourceNum);
}
return 0;
};
e.prototype.getCoinSourceByPrice = function(e) {
for (var t = this.cointable.length, n = 0; n < t; n++) {
var o = this.cointable[n];
if (o && o.coins == e) return o.id;
}
return "40000";
};
return e;
}();
n.default = o;
cc._RF.pop();
}, {} ],
BulletThrough: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e5b94bXZvZK3KG5v53kza7h", "BulletThrough");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("./BulletBase"), r = e("../../code/manager/MyRoleDataManager"), l = e("../../code/manager/PanelManager"), s = cc._decorator, c = s.ccclass, u = (s.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
this.EasyGetCompleteClassInit();
this.speed = 20;
};
t.prototype.update = function() {
if (!r.default.instance.checkGameState([ 4, 7 ])) {
var e = this.isCollided();
if (e && e.uuid != this.lastCollidedBallId) {
this.lastCollidedBallId = e.uuid;
l.default.game.addScore(this.killNum);
e.beAttack(this.killNum, this.node.position);
}
this.node.y += this.ySpeed * r.default.instance.getTimeScale();
this.node.y >= this.maxHeight && this.remove();
}
};
t.prototype.init = function(e) {
this.isInit = !0;
this.node.angle = 0;
this.ySpeed = this.speed;
this.lastCollidedBallId = "";
this.xSpeed = 0;
this.maxHeight = .5 * (cc.Canvas.instance.designResolution.height - cc.winSize.height) + cc.winSize.height;
this.killNum = e;
};
t.prototype.setIcon = function() {};
return t = a([ c ], t);
}(i.default));
n.default = u;
cc._RF.pop();
}, {
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/PanelManager": "PanelManager",
"./BulletBase": "BulletBase"
} ],
CannonGrowUp: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "af5f1/u83lLMp/NQ29kyv9+", "CannonGrowUp");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("./code/Lib/LocalStorage"), a = function() {
function e(e) {
this.table = e;
}
e.prototype.getlength = function() {
return this.table.length;
};
e.prototype.getLine = function(e) {
var t = Math.floor(e / 10 - .005) + 1;
return t > 10 * this.table.length ? 10 * this.table.length : t;
};
e.prototype.getDataById = function(e) {
e > 10 * this.table.length && (e = 10 * this.table.length);
for (var t = Math.floor(e / 10 - .005) + 901e3, n = 0; n < this.table.length; n++) {
var o = this.table[n];
if (o && Number(o.id) == t) return o;
}
cc.warn("CannonUnlock: 没有id: " + t);
return null;
};
e.prototype.getRewardPrice = function(e) {
e > 10 * this.table.length && (e = 10 * this.table.length);
var t = this.getDataById(e);
return t ? Number(t.c_price) : null;
};
e.prototype.getRewardPrice_up = function(e) {
e > 10 * this.table.length && (e = 10 * this.table.length);
var t = this.getDataById(e);
return t ? Number(t.c_price_b) : null;
};
e.prototype.getArmor_basis = function(e) {
e > 10 * this.table.length && (e = 10 * this.table.length);
var t = this.getDataById(e);
return t ? Number(t.armor_basis) : null;
};
e.prototype.getArmor_up_b = function(e) {
e > 10 * this.table.length && (e = 10 * this.table.length);
var t = this.getDataById(e);
return t ? Number(t.armor_up_b) : null;
};
e.prototype.getC_att = function(e) {
e > 10 * this.table.length && (e = 10 * this.table.length);
var t = this.getDataById(e);
return t ? Number(t.c_att) : null;
};
e.prototype.getC_att_b = function(e) {
e > 10 * this.table.length && (e = 10 * this.table.length);
var t = this.getDataById(e);
return t ? Number(t.c_att_b) : null;
};
e.prototype.getM_att = function(e) {
e > 10 * this.table.length && (e = 10 * this.table.length);
var t = this.getDataById(e);
return t ? Number(t.m_att) : null;
};
e.prototype.getM_att_b = function(e) {
e > 10 * this.table.length && (e = 10 * this.table.length);
var t = this.getDataById(e);
return t ? Number(t.m_att_b) : null;
};
e.prototype.getBestTenUpgradeMoney = function() {
for (var e = 0, t = Number(o.default.getItem("skillIntensifyLevel")), n = t; n < t + 10; n++) {
n > 10 * this.table.length && this.table.length;
e += this.getRewardPrice(Number(n)) + this.getRewardPrice_up(Number(n)) * (n - 10 * Math.floor(n / 10 - .005));
}
return e;
};
return e;
}();
n.default = a;
cc._RF.pop();
}, {
"./code/Lib/LocalStorage": "LocalStorage"
} ],
CannonUnlock: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9225biJ+UpPwaukgIU2o5K9", "CannonUnlock");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e(e) {
this.table = e;
}
e.prototype.getCannonIdS = function() {
for (var e = [], t = 0; t < this.table.length; t++) e[t] = Number(this.table[t].cannons_id);
return e;
};
e.prototype.getDataById = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && Number(n.id) == e) return n;
}
cc.warn("CannonUnlock: 没有id: " + e);
return null;
};
e.prototype.getDataById2 = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && Number(n.cannons_id) == e) return n;
}
cc.warn("CannonUnlock: 没有模型ID: " + e);
return null;
};
e.prototype.getCannons_id = function(e) {
var t = this.getDataById(e);
return t ? t.cannons_id : null;
};
e.prototype.getMap = function(e, t) {
void 0 === t && (t = !1);
var n;
return (n = t ? this.getDataById2(e) : this.getDataById(e)) ? n.map : null;
};
e.prototype.getType = function(e, t) {
void 0 === t && (t = !1);
var n;
return (n = t ? this.getDataById2(e) : this.getDataById(e)) ? n.type : null;
};
e.prototype.getConsume = function(e, t) {
void 0 === t && (t = !1);
var n;
return (n = t ? this.getDataById2(e) : this.getDataById(e)) ? n.num : null;
};
return e;
}();
n.default = o;
cc._RF.pop();
}, {} ],
CheckBox: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e8f89gmXsBO4J8QRbImVpsz", "CheckBox");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = cc._decorator, r = i.ccclass, l = i.property, s = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.toggle = null;
t.checkedSprite = null;
t.uncheckSprite = null;
return t;
}
t.prototype.onLoad = function() {
this.toggle.node.on("toggle", this.click, this);
};
t.prototype.setCheck = function(e) {
this.toggle.isChecked = e;
this.click();
};
t.prototype.click = function() {
if (this.toggle.isChecked) {
this.uncheckSprite.node.active = !1;
this.checkedSprite.node.active = !0;
} else {
this.uncheckSprite.node.active = !0;
this.checkedSprite.node.active = !1;
}
};
a([ l(cc.Toggle) ], t.prototype, "toggle", void 0);
a([ l(cc.Sprite) ], t.prototype, "checkedSprite", void 0);
a([ l(cc.Sprite) ], t.prototype, "uncheckSprite", void 0);
return t = a([ r ], t);
}(cc.Component);
n.default = s;
cc._RF.pop();
}, {} ],
CircleLifeProgressBar: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "efae9y2MPZAnI2/e4zgfE0W", "CircleLifeProgressBar");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../Script/code/Config/Config"), r = cc._decorator, l = r.ccclass, s = r.property, c = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.progressBar = null;
t.mask = null;
t.life_bar = null;
return t;
}
t.prototype.start = function() {};
t.prototype.setProgress = function(e, t) {
void 0 === t && (t = null);
if (t && t == i.BulletType.BulletLaser) {
this.progressBar.progress = e;
this.life_bar.node.angle = 360 * e - 90;
} else {
cc.tween(this.progressBar).to(.3, {
progress: e
}).start();
cc.tween(this.life_bar.node).to(.3, {
angle: 360 * e - 90
}).start();
}
if (e < .3) {
this.mask.enabled = !0;
e <= 0 && this.resest();
} else this.mask.enabled = !1;
};
t.prototype.getProgress = function() {
return this.progressBar.progress;
};
t.prototype.resest = function() {
this.life_bar.node.angle = -90;
this.progressBar.progress = 0;
};
a([ s(cc.ProgressBar) ], t.prototype, "progressBar", void 0);
a([ s(cc.Mask) ], t.prototype, "mask", void 0);
a([ s(cc.Sprite) ], t.prototype, "life_bar", void 0);
return t = a([ l ], t);
}(cc.Component);
n.default = c;
cc._RF.pop();
}, {
"../../Script/code/Config/Config": "Config"
} ],
CoinPrefab: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b892bMW+c5DyZn3TukwTddo", "CoinPrefab");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../code/basecode/EasyGetCompleteClass"), r = e("../../code/manager/NodePoolMananger"), l = e("../../code/manager/MyRoleDataManager"), s = e("../../code/manager/PanelManager"), c = e("../../code/manager/SoundManager"), u = e("../../code/Lib/Global"), d = e("../../code/manager/MissionManger"), p = cc._decorator, f = p.ccclass, h = p.property, g = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.disappeatAni = null;
t.iconArr = [];
t.coinIcon = null;
t.price = 1;
t.disappearTime = 0;
t.isInDisappear = !1;
t.notUpdata = !1;
t.moveToPlayer = !1;
t.isBackToPool = !1;
return t;
}
t.prototype.onLoad = function() {
this.EasyGetCompleteClassInit();
};
t.prototype.update = function() {
if (!l.default.instance.checkGameState([ 4, 7 ]) && !this.notUpdata) {
this.disappearTime--;
if (this.disappearTime <= 0) {
this.remove();
this.disappeatAni.stop();
} else if (this.disappearTime <= 300 && !this.isInDisappear) {
this.disappeatAni.play("coinDisappear");
this.isInDisappear = !0;
}
this.curSpeed && this.aSpeed && (this.curSpeed = this.curSpeed.subSelf(this.aSpeed.mul(l.default.instance.getTimeScale())));
if (0 != this.curSpeed.x) {
this.node.position = this.node.position.subSelf(cc.v3(this.curSpeed.mul(l.default.instance.getTimeScale())));
this.node.angle += 2 * l.default.instance.getTimeScale();
}
this.speedChange();
}
};
t.prototype.speedChange = function() {
if (this.isBackToPool) {
if (this.moveToPlayer) {
t = this.node.position, n = s.default.game.Player;
var e = t.sub(n.position);
this.node.position = this.node.position.sub(e.normalizeSelf().mul(30 * l.default.instance.getTimeScale()));
if (Math.abs(n.x - t.x) <= .5 * n.width && Math.abs(n.y - t.y) <= .4 * n.height) {
this.moveToPlayer = !1;
this.contactEffect();
}
}
} else {
var t = this.node.position, n = s.default.game.Player;
if (Math.abs(n.x - t.x) <= .5 * n.width && Math.abs(n.y - t.y) <= .4 * n.height) {
this.aSpeed = cc.v2(0, 0);
this.curSpeed = cc.v2(0, 0);
this.isBackToPool = !0;
this.disappeatAni.stop();
this.contactEffect();
} else if (l.default.instance.isInMagnet > 0 && Math.abs(n.x - t.x) <= 300 && Math.abs(n.y - t.y) <= 300) {
this.aSpeed = cc.v2(0, 0);
this.curSpeed = cc.v2(0, 0);
this.isBackToPool = !0;
this.moveToPlayer = !0;
this.disappeatAni.stop();
} else if (t.x <= .5 * this.node.width && this.curSpeed.x > 0) {
this.curSpeed.x = -1 * this.curSpeed.x;
this.aSpeed.x = -1 * this.aSpeed.x;
} else if (t.x >= 750 - .5 * this.node.width && this.curSpeed.x < 0) {
this.curSpeed.x = -1 * this.curSpeed.x;
this.aSpeed.x = -1 * this.aSpeed.x;
} else if (this.node.y <= 441 + .5 * this.node.width && this.curSpeed.y > 0) {
this.curSpeed.y = -.5 * this.curSpeed.y;
this.curSpeed.x = .5 * this.curSpeed.x;
if (this.curSpeed.x > 0 && this.aSpeed.x < 0 || this.curSpeed.x < 0 && this.aSpeed.x > 0 || Math.abs(this.curSpeed.y) <= 1) {
this.aSpeed = cc.v2(0, 0);
this.curSpeed = cc.v2(0, 0);
}
}
}
};
t.prototype.init = function(e) {
this.notUpdata = !1;
this.node.active = !0;
this.isBackToPool = !1;
this.isInDisappear = !1;
this.node.angle = 0;
this.disappeatAni.stop();
this.node.scale = 1;
this.disappearTime = 780;
this.price = Math.floor(e);
this.setIcon();
this.node.opacity = 255;
};
t.prototype.remove = function() {
this.node.active = !1;
r.default.instance.push(this.node);
};
t.prototype.toTop = function() {
var e = u.default.random();
this.curSpeed = cc.v2((1.5 * Math.random() + 1) * e, u.default.Random(-5, -10));
this.aSpeed = cc.v2(0, -.3);
};
t.prototype.setIcon = function() {
-1 == this.price ? this.coinIcon.spriteFrame = this.iconArr[1] : this.coinIcon.spriteFrame = this.iconArr[0];
};
t.prototype.setIconById = function(e) {
this.coinIcon.spriteFrame = this.iconArr[1];
};
t.prototype.contactEffect = function() {
if (-1 != this.price) {
c.default.playSoundEffect(c.default.getCoin);
s.default.game.playCoinNumEffect(this.node.position, "+" + this.price);
s.default.gameUi.moveGoldToLable(this.node);
l.default.instance.curGold += this.price;
d.default.instance.collectMissionNum(6, this.price);
} else {
c.default.playSoundEffect(c.default.getDiamod);
l.default.instance.curDiamond += 1;
this.remove();
}
};
a([ h(cc.Animation) ], t.prototype, "disappeatAni", void 0);
a([ h([ cc.SpriteFrame ]) ], t.prototype, "iconArr", void 0);
a([ h(cc.Sprite) ], t.prototype, "coinIcon", void 0);
return t = a([ f ], t);
}(i.default);
n.default = g;
cc._RF.pop();
}, {
"../../code/Lib/Global": "Global",
"../../code/basecode/EasyGetCompleteClass": "EasyGetCompleteClass",
"../../code/manager/MissionManger": "MissionManger",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/NodePoolMananger": "NodePoolMananger",
"../../code/manager/PanelManager": "PanelManager",
"../../code/manager/SoundManager": "SoundManager"
} ],
ColorMaterial: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "2c2f2MI2XpCgb8Ij3JIvPT/", "ColorMaterial");
cc._RF.pop();
}, {} ],
CompletePanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d148eJRJt9NKpTr9pOEk3DT", "CompletePanel");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../../code/basecode/BasePanel"), r = e("../../../code/manager/UiAniManager"), l = e("../../../code/manager/PanelManager"), s = e("../../../code/Config/Config"), c = e("../../../code/manager/MissionManger"), u = e("../../../code/manager/MyRoleDataManager"), d = e("../../../code/manager/SoundManager"), p = e("../MissionPanel/RewardItem"), f = e("../../../code/manager/TableManager"), h = e("../../../code/manager/GuideManager"), g = e("../../../code/ads/AdsGroupController"), y = e("../../../code/manager/SDKManager"), m = e("../../../code/Lib/TimeCount"), b = e("../../../code/manager/Advert_Manager"), v = e("../../../code/manager/Umeng_Manager"), S = e("../../../code/Lib/LocalStorage"), _ = cc._decorator, P = _.ccclass, M = _.property, L = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.rewardPrefab = null;
t.completeLabel = null;
t.levelPro = null;
t.proSprite = null;
t.curLevel = null;
t.curLevelWanChengDu = null;
t.nextLevel = null;
t.missionPro = null;
t.missionProLabel = null;
t.missIonNumLabel = null;
t.missionIcon = null;
t.panelNode = null;
t.backGround = null;
t.nameLable = null;
t.levelNode = null;
t.adsBtn = null;
t.xiaYiGuan = null;
t.gold = null;
t.masonry = null;
t.chenggongOVshibai = null;
t.chenggongshibaiSpriteFrame = [];
t.moreRewardMap = new Map();
t.actionStep = 0;
t.isInBlack = !1;
t.nuber = 2.5;
t._aniType = r.UiAniType.TopToDown;
t.adsScenceId = "GameComplete";
return t;
}
t.prototype.openPanel = function() {
this.adsBtn.node.getChildByName("okshadowLable").getComponent(cc.Label).string = GlobalFun.i18n.t("lable.10286");
this.adsBtn.node.active = !0;
this.playUIAni(r.InOrOut.IN);
this.unscheduleAllCallbacks();
this.gold.string = l.default.gameUi.goldLable.string;
this.masonry.string = l.default.gameUi.diamondLable.string;
this.xiayiGuanLabel = this.xiaYiGuan.node.getComponentInChildren(cc.Label);
this.adsBtn.interactable = !0;
this.xiaYiGuan.interactable = !1;
this.adsBtn.node.on("click", this.adsBtnTap, this);
this.xiaYiGuan.node.on("click", this.goGame, this);
this.moreRewardMap = new Map();
this.setState();
this.levelNode.x = 0;
this.isInBlack = !1;
this.levelPro.progress = 0;
this.missionPro.progress = (c.default.instance.curSpecilMission.pro - c.default.instance.itemCollectNum) / c.default.instance.curSpecilMission.quest;
this.actionStep = 0;
this.setLable();
c.default.instance.maxMissionNum(2, u.default.instance.curScore);
c.default.instance.maxMissionNum(4, Math.round(.001 * m.default.instance.getTimeCount("inGameTime")));
c.default.instance.saveMission();
d.default.stopBackGroudMusic();
};
t.prototype.closePanel = function() {
this.unscheduleAllCallbacks();
this.playUIAni(r.InOrOut.OUT);
this.dleEvent();
};
t.prototype.panelIn = function() {
this.addEvent();
l.default.game.playerScript.outFunnel();
l.default.game.playerScript.clearEfect();
};
t.prototype.panelOut = function() {
this.dleEvent();
l.default.instance.deleteOpen(s.PanelName.CompletePanel);
this.node.removeFromParent();
};
t.prototype.setLable = function() {
this.completeLabel.string = GlobalFun.i18n.t("lable.10185");
this.nameLable.string = GlobalFun.i18n.t("lable.10184");
};
t.prototype.addEvent = function() {
this.panelNode.on(cc.Node.EventType.TOUCH_START, this.closeBtnTap, this);
};
t.prototype.dleEvent = function() {
this.panelNode.off(cc.Node.EventType.TOUCH_START, this.closeBtnTap, this);
this.adsBtn.node.off("click", this.adsBtnTap, this);
};
t.prototype.cut = function(e) {
if (e) {
this.chenggongOVshibai.spriteFrame != this.chenggongshibaiSpriteFrame[0] && (this.chenggongOVshibai.spriteFrame = this.chenggongshibaiSpriteFrame[0]);
this.xiayiGuanLabel.string = GlobalFun.i18n.t("lable.10288");
this.curLevelWanChengDu.string = GlobalFun.i18n.t("lable.10284");
this.curLevelWanChengDu.getComponent(cc.LabelOutline).color.fromHEX("#EC7E26");
} else {
this.chenggongOVshibai.spriteFrame != this.chenggongshibaiSpriteFrame[1] && (this.chenggongOVshibai.spriteFrame = this.chenggongshibaiSpriteFrame[1]);
this.xiayiGuanLabel.string = GlobalFun.i18n.t("lable.10280");
this.curLevelWanChengDu.string = GlobalFun.i18n.t("lable.10285");
this.curLevelWanChengDu.getComponent(cc.LabelOutline).color.fromHEX("#166AA4");
}
};
t.prototype.setState = function() {
var e = this;
this.missionProLabel.string = c.default.instance.curSpecilMission.pro + "/" + c.default.instance.curSpecilMission.quest;
this.missIonNumLabel.string = "+" + c.default.instance.itemCollectNum;
this.missionIcon.spriteFrame = l.default.gameUi.iconAtlas.getSpriteFrame(f.default.instance.propTable.getIcon(c.default.instance.curSpecilMission.collectPropId));
if (u.default.instance.checkGameState([ 5 ])) {
this.cut(!0);
this.curLevel.string = GlobalFun.i18n.t("lable.10231").replace("%d", u.default.instance.curLevel - 1);
this.curLevel.getComponent(cc.LabelOutline).color.fromHEX("#EC7E26");
this.nextLevel.string = u.default.instance.curLevel + "";
u.default.instance.isFromComplete = !0;
v.default.instance.putPoint_finishLevel(String(u.default.instance.curLevel));
v.default.instance.putPoint2("event_LevelInfor", u.default.instance.curLevel.toString() + "," + S.default.getItem("skillIntensifyLevel", "1"));
if ("1" != S.default.getItem("IsOpenOfflineAndSkills", "0") && u.default.instance.curLevel >= 5) {
l.default.gameUi.offlineAndSkillsParent.opacity = 255;
l.default.gameUi.offlineAndSkillsS[0].active = !0;
l.default.gameUi.offlineAndSkillsS[1].active = !0;
S.default.saveItem("IsOpenOfflineAndSkills", "1");
}
} else {
this.cut(!1);
u.default.instance.isFromComplete = !1;
this.curLevel.string = GlobalFun.i18n.t("lable.10231").replace("%d", u.default.instance.curLevel);
this.curLevel.getComponent(cc.LabelOutline).color.fromHEX("#166AA4");
this.nextLevel.string = u.default.instance.curLevel + 1 + "";
v.default.instance.putPoint_failLevel(String(u.default.instance.curLevel));
if ("1" != S.default.getItem("IsOpenOfflineAndSkills", "0") && u.default.instance.curLevel >= 3) {
l.default.gameUi.offlineAndSkillsS[0].active = !0;
l.default.gameUi.offlineAndSkillsS[1].active = !0;
l.default.gameUi.offlineAndSkillsParent.opacity = 255;
S.default.saveItem("IsOpenOfflineAndSkills", "1");
}
}
this.xiaYiGuan.node.opacity = 0;
this.nameLable.node.opacity = 255;
var t = 0;
t = Number(this.curLevel.string) >= 5 ? 5 : 3;
if (u.default.instance.curGold <= 0) {
this.missionProLabel.node.parent.opacity = 0;
this.xiaYiGuan.interactable = !0;
this.xiayiGuanLabel.string = GlobalFun.i18n.t("lable.10298");
this.nameLable.node.opacity = 0;
this.xiaYiGuan.node.opacity = 255;
this.adsBtn.node.active = !1;
} else this.scheduleOnce(function() {
e.missionProLabel.node.parent.opacity = 255;
e.xiaYiGuan.interactable = !0;
e.xiaYiGuan.node.opacity = 255;
}, t);
var n = new Map();
n.set(s.CurrencyType.Gold, u.default.instance.curGold);
6 == u.default.instance.curLevel && u.default.instance.isFromComplete && n.set(s.CurrencyType.Diamond, 50);
u.default.instance.curGold = 0;
this.rewardPrefab.getComponent(p.default).init(n);
if (u.default.instance.curDiamond < 2 || h.default.instance.checkCanGuide(10001, 0)) {
y.default.instance.callJava("trackEvent", "(Ljava/lang/String;)V", "GameCompleteRewardShow");
this.adsScenceId = "GameComplete";
this.moreRewardMap = n;
this.guideReward(n);
this.rewardPrefab.getComponent(p.default).init(n);
} else {
this.moreRewardMap = n;
this.adsScenceId = "DoubleDiamond";
y.default.instance.callJava("trackEvent", "(Ljava/lang/String;)V", "DoubleDiamondRewardShow");
}
};
t.prototype.beBlack = function() {
this.adsBtn.interactable = !0;
this.xiaYiGuan.interactable = !0;
this.dleEvent();
this.panelNode.y = 1691;
u.default.instance.curDiamond = 0;
this.backGround.opacity = 0;
this.panelOut();
l.default.gameUi.playUiInAni();
};
t.prototype.completeAction = function() {
var e = this;
if (0 == this.actionStep) {
var t = l.default.gameUi.pro.progress, n = t / 50, o = (this.levelPro.totalLength, 
c.default.instance.curSpecilMission.pro / c.default.instance.curSpecilMission.quest), a = o / 50;
this.missionProLabel.string = c.default.instance.curSpecilMission.pro + "/" + c.default.instance.curSpecilMission.quest;
this.missIonNumLabel.string = "+" + c.default.instance.itemCollectNum;
this.missionIcon.spriteFrame = l.default.gameUi.iconAtlas.getSpriteFrame(f.default.instance.propTable.getIcon(c.default.instance.curSpecilMission.collectPropId));
var i = 0;
this.schedule(function() {
i++;
e.levelPro.progress += n;
t <= e.levelPro.progress && (e.levelPro.progress = t);
e.proSprite.x = e.levelPro.totalLength * e.levelPro.progress;
e.missionPro.progress += a;
o <= e.missionPro.progress && (e.missionPro.progress = o);
if (i >= 51) if (!(e.levelPro.progress > .3 || u.default.instance.curDiamond >= 2) && g.default.instance.isThirty || g.default.instance.checkDailyAdsFull()) {
e.actionStep = 4;
e.adsCanTap();
} else e.actionStep++;
}, .01, 50);
} else if (1 == this.actionStep) {
this.actionStep++;
this.panelAni.off("stop");
this.panelAni.play("completeAni");
this.panelAni.once("stop", function() {
e.actionStep++;
0 == e.moreRewardMap.size ? e.adsCanTap() : e.rewardPrefab.getComponent(p.default).moreRewardIn(e.moreRewardMap, function() {
e.panelAni.off("stop");
e.panelAni.play("completeBtnAni");
e.panelAni.once("stop", function() {
e.adsCanTap();
});
});
});
}
};
t.prototype.completeQuick = function() {
var e = this;
if (0 == this.actionStep) {
this.unscheduleAllCallbacks();
this.levelPro.progress = l.default.gameUi.pro.progress;
this.proSprite.x = this.levelPro.totalLength * this.levelPro.progress;
this.missionPro.progress = c.default.instance.curSpecilMission.pro / c.default.instance.curSpecilMission.quest;
if (!(this.levelPro.progress > .2 || u.default.instance.curDiamond >= 2) && g.default.instance.isThirty || g.default.instance.checkDailyAdsFull()) {
this.actionStep = 4;
this.adsCanTap();
} else this.actionStep++;
} else if (2 == this.actionStep) {
this.panelAni.play("completeAni", .9);
this.panelAni.off("stop");
this.panelAni.once("stop", function() {
e.actionStep++;
0 == e.moreRewardMap.size ? e.adsCanTap() : e.rewardPrefab.getComponent(p.default).moreRewardIn(e.moreRewardMap, function() {
e.panelAni.off("stop");
e.panelAni.play("completeBtnAni");
e.panelAni.once("stop", function() {
e.adsCanTap();
});
});
});
}
};
t.prototype.closeBtnTap = function() {
if (0 == this.actionStep || 2 == this.actionStep) ; else if (1 == this.actionStep) ; else if (this.actionStep >= 4) {
if (this.isInBlack) return;
this.isInBlack = !0;
}
};
t.prototype.Times = function() {
switch (Number(this.curLevel.string)) {
case 1:
return 0;

case 2:
return 1;

case 3:
return 2;

case 4:
return 3;

case 5:
return 4;

default:
return 5;
}
};
t.prototype.adsCanTap = function() {
var e = this;
this.scheduleOnce(function() {
e.showTapContinue();
}, this.Times());
this.scheduleOnce(function() {
e.actionStep++;
}, .8);
!u.default.instance.checkGameState([ 5 ]) || 6 != u.default.instance.curLevel && 11 != u.default.instance.curLevel || u.default.instance.isRate || l.default.instance.openPanel(s.PanelName.FiveStarPanel, l.default.gameUi.middleNode);
this.adsBtn.node.on("click", this.adsBtnTap, this);
};
t.prototype.adsBtnTap = function(e) {
void 0 === e && (e = !1);
if (!this.isInBlack) if (cc.sys.os === cc.sys.OS_ANDROID || cc.sys.os === cc.sys.OS_IOS) {
v.default.instance.putPoint(v.Point_EventID.fightingReward_Click_num);
b.default.instance.show_Ad(b.Adver_Type.ReWardVideo_Adv, function(e) {
this.isInBlack = !0;
this.adsBtn.interactable = !1;
this.xiaYiGuan.interactable = !1;
this.moreRewardMap.forEach(function(e, t) {
u.default.instance.addCurrency(e * (t == s.CurrencyType.Gold ? 5 : 1), t);
});
this.rewardPrefab.getComponent(p.default).init(this.moreRewardMap);
this.rewardPrefab.getComponent(p.default).rewardFly([ this.gold.node, this.masonry.node ], 5);
this.scheduleOnce(this.beBlack, this.nuber);
}.bind(this), function() {
this.isInBlack = !1;
this.adsBtn.interactable = !0;
this.xiaYiGuan.interactable = !0;
}.bind(this));
} else {
this.isInBlack = !0;
this.adsBtn.interactable = !1;
this.xiaYiGuan.interactable = !1;
this.moreRewardMap.forEach(function(e, t) {
u.default.instance.addCurrency(e * (t == s.CurrencyType.Gold ? 5 : 1), t);
});
this.rewardPrefab.getComponent(p.default).init(this.moreRewardMap);
this.rewardPrefab.getComponent(p.default).rewardFly([ this.gold.node, this.masonry.node ], 5);
this.scheduleOnce(this.beBlack, this.nuber);
}
};
t.prototype.guideReward = function(e) {};
t.prototype.showTapContinue = function() {};
t.prototype.goGame = function() {
var e = this;
if (!this.isInBlack) {
this.isInBlack = !0;
this.xiaYiGuan.interactable = !1;
this.adsBtn.interactable = !1;
this.moreRewardMap.forEach(function(t, n) {
u.default.instance.addCurrency(t, n);
n == s.CurrencyType.Gold && t <= 0 && e.scheduleOnce(e.beBlack, 0);
});
u.default.instance.checkGameState([ 5 ]) && v.default.instance.putPoint2(v.Point_EventID.levelComplate_num, "完成关卡(领取了奖励):" + u.default.instance.curLevel.toString());
this.scheduleOnce(this.beBlack, this.nuber);
this.rewardPrefab.getComponent(p.default).init(this.moreRewardMap);
this.rewardPrefab.getComponent(p.default).rewardFly([ this.gold.node, this.masonry.node ]);
}
};
a([ M({
type: cc.Node,
tooltip: "奖励节点"
}) ], t.prototype, "rewardPrefab", void 0);
a([ M({
type: cc.Label,
tooltip: "完成lable"
}) ], t.prototype, "completeLabel", void 0);
a([ M({
type: cc.ProgressBar,
tooltip: "完成pro"
}) ], t.prototype, "levelPro", void 0);
a([ M({
type: cc.Node,
tooltip: "关卡进度标志"
}) ], t.prototype, "proSprite", void 0);
a([ M({
type: cc.Label,
tooltip: "当前关"
}) ], t.prototype, "curLevel", void 0);
a([ M({
type: cc.Label,
tooltip: "当前关完成度"
}) ], t.prototype, "curLevelWanChengDu", void 0);
a([ M({
type: cc.Label,
tooltip: "下一关"
}) ], t.prototype, "nextLevel", void 0);
a([ M({
type: cc.ProgressBar,
tooltip: "任务pro"
}) ], t.prototype, "missionPro", void 0);
a([ M({
type: cc.Label,
tooltip: "任务proLabel"
}) ], t.prototype, "missionProLabel", void 0);
a([ M({
type: cc.Label,
tooltip: "任务数量label"
}) ], t.prototype, "missIonNumLabel", void 0);
a([ M({
type: cc.Sprite,
tooltip: "任务icon"
}) ], t.prototype, "missionIcon", void 0);
a([ M({
type: cc.Node,
tooltip: "界面节点"
}) ], t.prototype, "panelNode", void 0);
a([ M({
type: cc.Node,
tooltip: "背景节点"
}) ], t.prototype, "backGround", void 0);
a([ M({
type: cc.Label,
tooltip: ""
}) ], t.prototype, "nameLable", void 0);
a([ M({
type: cc.Node,
tooltip: "进度节点"
}) ], t.prototype, "levelNode", void 0);
a([ M({
type: cc.Button,
tooltip: "广告按钮"
}) ], t.prototype, "adsBtn", void 0);
a([ M({
type: cc.Button,
tooltip: "进入下一关，或继续游戏"
}) ], t.prototype, "xiaYiGuan", void 0);
a([ M({
type: cc.Label,
tooltip: "金币"
}) ], t.prototype, "gold", void 0);
a([ M({
type: cc.Label,
tooltip: "砖石"
}) ], t.prototype, "masonry", void 0);
a([ M({
type: cc.Sprite,
tooltip: "成功或者失败的Sprite"
}) ], t.prototype, "chenggongOVshibai", void 0);
a([ M({
type: [ cc.SpriteFrame ],
tooltip: "成功或者失败的Sprite"
}) ], t.prototype, "chenggongshibaiSpriteFrame", void 0);
return t = a([ P ], t);
}(i.default);
n.default = L;
cc._RF.pop();
}, {
"../../../code/Config/Config": "Config",
"../../../code/Lib/LocalStorage": "LocalStorage",
"../../../code/Lib/TimeCount": "TimeCount",
"../../../code/ads/AdsGroupController": "AdsGroupController",
"../../../code/basecode/BasePanel": "BasePanel",
"../../../code/manager/Advert_Manager": "Advert_Manager",
"../../../code/manager/GuideManager": "GuideManager",
"../../../code/manager/MissionManger": "MissionManger",
"../../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../../code/manager/PanelManager": "PanelManager",
"../../../code/manager/SDKManager": "SDKManager",
"../../../code/manager/SoundManager": "SoundManager",
"../../../code/manager/TableManager": "TableManager",
"../../../code/manager/UiAniManager": "UiAniManager",
"../../../code/manager/Umeng_Manager": "Umeng_Manager",
"../MissionPanel/RewardItem": "RewardItem"
} ],
CompleteRewardPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "cfd3fLfvp5AQoerwTogDxuB", "CompleteRewardPanel");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../code/basecode/BasePanel"), r = e("../../code/manager/UiAniManager"), l = e("../../code/manager/PanelManager"), s = e("../../code/Config/Config"), c = e("../../code/manager/MyRoleDataManager"), u = e("./MissionPanel/RewardItem"), d = cc._decorator, p = d.ccclass, f = d.property, h = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.nameLabel = null;
t.completeLabel = null;
t.prizesLabel = null;
t.rewardPrefab = null;
t.closeBtn = null;
t.connonNode = null;
t._aniType = r.UiAniType.TopToDown;
return t;
}
t.prototype.openPanel = function(e) {
this.playUIAni(r.InOrOut.IN);
this.setLable();
this.rewardPrefab.getComponent(u.default).init(e);
};
t.prototype.closePanel = function() {
this.playUIAni(r.InOrOut.OUT);
this.dleEvent();
};
t.prototype.panelIn = function() {
this.addEvent();
};
t.prototype.panelOut = function() {
l.default.instance.deleteOpen(s.PanelName.CompleteRewardPanel);
this.node.removeFromParent();
};
t.prototype.addEvent = function() {
this.closeBtn.node.on("click", this.closeBtnTap, this);
this.node.on(cc.Node.EventType.TOUCH_END, this.closeBtnTap, this);
};
t.prototype.dleEvent = function() {
this.closeBtn.node.off("click", this.closeBtnTap, this);
this.node.off(cc.Node.EventType.TOUCH_END, this.closeBtnTap, this);
};
t.prototype.setLable = function() {
this.nameLabel.string = GlobalFun.i18n.t("lable.10231").replace("%d", c.default.instance.curLevel - 1);
this.completeLabel.string = GlobalFun.i18n.t("lable.10185");
this.prizesLabel.string = GlobalFun.i18n.t("lable.10190");
};
t.prototype.closeBtnTap = function() {
l.default.instance.closePanel(s.PanelName.CompleteRewardPanel);
this.rewardPrefab.getComponent(u.default).rewardFly();
};
a([ f({
type: cc.Label,
tooltip: "标题label"
}) ], t.prototype, "nameLabel", void 0);
a([ f({
type: cc.Label,
tooltip: "完成label"
}) ], t.prototype, "completeLabel", void 0);
a([ f({
type: cc.Label,
tooltip: "奖励label"
}) ], t.prototype, "prizesLabel", void 0);
a([ f({
type: cc.Node,
tooltip: "奖励label"
}) ], t.prototype, "rewardPrefab", void 0);
a([ f({
type: cc.Button,
tooltip: "关闭按钮"
}) ], t.prototype, "closeBtn", void 0);
a([ f({
type: cc.Node,
tooltip: "炮节点"
}) ], t.prototype, "connonNode", void 0);
return t = a([ p ], t);
}(i.default);
n.default = h;
cc._RF.pop();
}, {
"../../code/Config/Config": "Config",
"../../code/basecode/BasePanel": "BasePanel",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/PanelManager": "PanelManager",
"../../code/manager/UiAniManager": "UiAniManager",
"./MissionPanel/RewardItem": "RewardItem"
} ],
Config: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "be318l8aC5HfYe0prsRe2iY", "Config");
var o = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
n.PropType = n.BoxLevel = n.CurrencyType = n.RoleAttribute = n.FunnelType = n.BulletType = n.FunnelConnonDirection = n.PanelName = n.SelfEvent = n.IosClassName = n.JavaClassName = void 0;
var a = cc._decorator, i = a.ccclass, r = (a.property, function() {
function e() {}
e.APKChannel = "Apk";
return e = o([ i ], e);
}());
n.default = r;
(function(e) {
e.AdsGroupController = "org/cocos2dx/AdsGroupController";
e.Um_Fb_SDKManger = "org/cocos2dx/statistics/Um_Fb_SDKManger";
e.AppActivity = "org/cocos2dx/javascript/AppActivity";
e.ToolManager = "org/cocos2dx/statistics/ToolManager";
e.GoogleSDKManger = "org/cocos2dx/statistics/GoogleSDKManger";
e.AdvertSDKManager = "org/cocos2dx/javascript/advert/AdvertSDK";
e.UmengSDKManager = "org/cocos2dx/javascript/umengStatistics/Umengsdk_Manager";
})(n.JavaClassName || (n.JavaClassName = {}));
(function(e) {
e.AdsGroupController = "AdsClass";
e.SDKManager = "NativeOcClass";
e.Um_SDKManger = "UmSDKManager";
e.InAppPurchass = "InAppPurchase";
e.AdvertSDKManager = "Facebook_Adv_Manager";
})(n.IosClassName || (n.IosClassName = {}));
(function(e) {
e.openMall = "openMall";
})(n.SelfEvent || (n.SelfEvent = {}));
(function(e) {
e.ResurgenceUi = "ResurgenceUi";
e.FiveStarPanel = "FiveStarPanel";
e.CompletePanel = "CompletePanel";
e.MapPanel = "MapPanel";
e.RefitShopPanel = "RefitShopPanel";
e.SetPanel = "SetPanel";
e.AircraftPanel = "AircraftPanel";
e.WorkShopPanel = "WorkShopPanel";
e.MissionPanel = "MissionPanel";
e.PausePanel = "PausePanel";
e.ShopPanel = "ShopPanel";
e.GuidePanel = "GuidePanel";
e.GoShopPanel = "GoShopPanel";
e.CompleteRewardPanel = "CompleteRewardPanel";
e.SkinPanel = "SkinPanel";
e.EndlessCompletePanel = "EndlessCompletePanel";
e.BoxOpenPanel = "BoxOpenPanel";
e.VideoPanel = "VideoPanel";
})(n.PanelName || (n.PanelName = {}));
(function(e) {
e[e.LEFT = 0] = "LEFT";
e[e.Right = 1] = "Right";
})(n.FunnelConnonDirection || (n.FunnelConnonDirection = {}));
(function(e) {
e.BulletPrefab = "bulletPrefab";
e.BulletFollow = "bulletFollowPrefab";
e.BulletThrough = "bulletThroughPrefab";
e.BulletLaser = "bulletLaserPrefab";
e.BulletBoom = "bulletBoomPrefab";
e.LifeShield = "LifeShield";
e.LaserCut = "bulletJiGuangQieGe";
})(n.BulletType || (n.BulletType = {}));
(function(e) {
e.FunnelConnon = "FunnelConnon";
})(n.FunnelType || (n.FunnelType = {}));
(function(e) {
e[e.MainGunLevel = 0] = "MainGunLevel";
e[e.ExtraGun = 1] = "ExtraGun";
e[e.LifeLevel = 2] = "LifeLevel";
})(n.RoleAttribute || (n.RoleAttribute = {}));
(function(e) {
e[e.Gold = 51e4] = "Gold";
e[e.Diamond = 510001] = "Diamond";
e[e.Chip = 510002] = "Chip";
})(n.CurrencyType || (n.CurrencyType = {}));
(function(e) {
e[e.ArgentumBox = 7e5] = "ArgentumBox";
e[e.GoldBox = 700001] = "GoldBox";
e[e.DiamondBox = 700002] = "DiamondBox";
e[e.LegendBox = 700003] = "LegendBox";
})(n.BoxLevel || (n.BoxLevel = {}));
(function(e) {
e[e.Tempest = 303e3] = "Tempest";
e[e.LaserCutting = 303001] = "LaserCutting";
e[e.FullFire = 303002] = "FullFire";
e[e.MagneticField = 303003] = "MagneticField";
e[e.HealthPack = 303004] = "HealthPack";
e[e.DamageBoost = 303005] = "DamageBoost";
e[e.CoinBoost = 303006] = "CoinBoost";
})(n.PropType || (n.PropType = {}));
cc._RF.pop();
}, {} ],
ConnonBase: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "50fddl3fdlO247do89dlcG6", "ConnonBase");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = cc._decorator, r = i.ccclass, l = i.property, s = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.bulletNode = null;
t.connonSprite = null;
t.connonId = 0;
t.shootSpeed = 1;
t.bulletHit = 1;
t.isInShoot = !1;
t.minShootTemp = .1;
t.bulletNum = 1;
t.shootTemp = 1;
return t;
}
t.prototype.init = function(e) {
this.connonId = e;
};
a([ l(cc.Node) ], t.prototype, "bulletNode", void 0);
a([ l(cc.Sprite) ], t.prototype, "connonSprite", void 0);
return t = a([ r ], t);
}(cc.Component);
n.default = s;
cc._RF.pop();
}, {} ],
ConnonTable: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5f4c7fpORJN16NUO4G4S18X", "ConnonTable");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../../code/manager/MyRoleDataManager"), a = e("../../code/Config/Config"), i = e("../../code/manager/TableManager"), r = e("../../code/Lib/LocalStorage"), l = function() {
function e(e) {
this.table = e;
}
e.prototype.getScourceId = function(e, t) {
void 0 === t && (t = 0);
for (var n = 0; n < this.table.length; n++) {
var o = this.table[n];
if (o && Number(o.id) == e) {
if (0 == t) return o.image_cannon;
if (1 == t) return o.image_machine;
if (2 == t) return o.image_basis;
if (4 == t) return [ o.image_cannon, o.image_machine, o.image_basis ];
}
}
cc.warn("connonTable getScourceId: Do not have id " + e);
return "";
};
e.prototype.getDataById = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && Number(n.id) == e) return n;
}
cc.warn("connonTable: Do not have id " + e);
return {};
};
e.prototype.getRewardPrice = function(e) {
e > 10 * this.table.length && (e = 10 * this.table.length);
var t = Math.floor(e / 10 - .05) + 301e3, n = this.getDataById(t);
return n ? Number(n.c_price) : null;
};
e.prototype.getRewardPrice_up = function(e) {
e > 10 * this.table.length && (e = 10 * this.table.length);
var t = Math.floor(e / 10 - .05) + 301e3, n = this.getDataById(t);
return n ? Number(n.c_price_b) : null;
};
e.prototype.getBulletSource = function(e, t) {
for (var n = 0; n < this.table.length; n++) {
var o = this.table[n];
if (o && Number(o.id) == e) return 0 == t ? o.image_bullet_c : 1 == t ? o.image_bullet_m : [ o.image_bullet_c, o.image_bullet_m ];
}
return [ "94000", "Bullet_G_301000_" ];
};
e.prototype.getGoldMore = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && Number(n.id) == e) return .01 * Number(n.coins);
}
cc.warn("ConnonTable getGoldMore do not have" + e);
return 1;
};
e.prototype.getLife = function(e, t) {
for (var n = 0; n < this.table.length; n++) {
var o = this.table[n];
if (o && Number(o.id) == e) return Number(o.armor_basis) + t * o.armor_up_b;
}
cc.warn("ConnonTable getLife do not have" + e);
return 0;
};
e.prototype.getConnonName = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && Number(n.id) == e) return n.name;
}
return "";
};
e.prototype.getBestConnon = function() {
for (var e = this.table.length - 1; e >= 0; e--) {
var t = this.table[e];
if (t && o.default.instance.checkConnonUnlocked(t.id)) return t;
}
};
e.prototype.countUpgradeMoney = function(e, t, n) {
var o = 0;
n == a.RoleAttribute.MainGunLevel ? o = Math.pow(e.c_price_b, t) * e.c_price : n == a.RoleAttribute.ExtraGun ? o = Math.pow(e.m_price_b, t) * e.m_price : n == a.RoleAttribute.LifeLevel && (o = Math.pow(e.armor_price_b, t) * e.armor_price);
return Math.floor(o);
};
e.prototype.getBestTenUpgradeMoney = function() {
for (var e = 0, t = Number(r.default.getItem("skillIntensifyLevel")), n = t; n < t + 10; n++) {
n > 10 * this.table.length && this.table.length;
e += i.default.instance.connonTable.getRewardPrice(Number(n)) + i.default.instance.connonTable.getRewardPrice_up(Number(n)) * (n - 10 * Math.floor(n / 10 - .005));
}
return e;
};
e.prototype.getConnonType = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && Number(n.id) == e) return Number(n.type);
}
};
e.prototype.getConnonAttribute = function(e, t) {
for (var n = 0; n < this.table.length; n++) {
var o = this.table[n];
if (o && Number(Number(o.id)) == e) return this.attribute(o.attribute, t);
}
return 0;
};
e.prototype.attribute = function(e, t) {
if ("" == e) return 0;
for (var n = e.split(";"), o = n.length, a = 0; a < o; a++) {
var i = n[a];
if (i) for (var r = i.split(":"), l = r.length, s = 0; s < l; s++) if (Number(r[0]) == t) return Number(r[1]);
}
return 0;
};
return e;
}();
n.default = l;
cc._RF.pop();
}, {
"../../code/Config/Config": "Config",
"../../code/Lib/LocalStorage": "LocalStorage",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/TableManager": "TableManager"
} ],
Connon: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "787f2nl5z5GwrbamdjnghA1", "Connon");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
}, i = this && this.__awaiter || function(e, t, n, o) {
function a(e) {
return e instanceof n ? e : new n(function(t) {
t(e);
});
}
return new (n || (n = Promise))(function(n, i) {
function r(e) {
try {
s(o.next(e));
} catch (e) {
i(e);
}
}
function l(e) {
try {
s(o.throw(e));
} catch (e) {
i(e);
}
}
function s(e) {
e.done ? n(e.value) : a(e.value).then(r, l);
}
s((o = o.apply(e, t || [])).next());
});
}, r = this && this.__generator || function(e, t) {
var n, o, a, i, r = {
label: 0,
sent: function() {
if (1 & a[0]) throw a[1];
return a[1];
},
trys: [],
ops: []
};
return i = {
next: l(0),
throw: l(1),
return: l(2)
}, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
return this;
}), i;
function l(e) {
return function(t) {
return s([ e, t ]);
};
}
function s(i) {
if (n) throw new TypeError("Generator is already executing.");
for (;r; ) try {
if (n = 1, o && (a = 2 & i[0] ? o.return : i[0] ? o.throw || ((a = o.return) && a.call(o), 
0) : o.next) && !(a = a.call(o, i[1])).done) return a;
(o = 0, a) && (i = [ 2 & i[0], a.value ]);
switch (i[0]) {
case 0:
case 1:
a = i;
break;

case 4:
r.label++;
return {
value: i[1],
done: !1
};

case 5:
r.label++;
o = i[1];
i = [ 0 ];
continue;

case 7:
i = r.ops.pop();
r.trys.pop();
continue;

default:
if (!(a = r.trys, a = a.length > 0 && a[a.length - 1]) && (6 === i[0] || 2 === i[0])) {
r = 0;
continue;
}
if (3 === i[0] && (!a || i[1] > a[0] && i[1] < a[3])) {
r.label = i[1];
break;
}
if (6 === i[0] && r.label < a[1]) {
r.label = a[1];
a = i;
break;
}
if (a && r.label < a[2]) {
r.label = a[2];
r.ops.push(i);
break;
}
a[2] && r.ops.pop();
r.trys.pop();
continue;
}
i = t.call(e, r);
} catch (e) {
i = [ 6, e ];
o = 0;
} finally {
n = a = 0;
}
if (5 & i[0]) throw i[1];
return {
value: i[0] ? i[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var l = e("../../code/manager/NodePoolMananger"), s = e("../../code/manager/MyRoleDataManager"), c = e("../../code/manager/TableManager"), u = e("../../code/Lib/LocalStorage"), d = e("../../code/manager/SoundManager"), p = e("./ConnonBase"), f = e("../../code/Lib/Global"), h = e("../../code/Config/Config"), g = e("../../code/manager/PanelManager"), y = e("../../code/manager/EffectManager"), m = e("../../code/manager/SDKManager"), b = e("../../BuffManager"), v = cc._decorator, S = v.ccclass, _ = v.property, P = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.bulletPrefab = [];
t.wheelSprite = null;
t.connonAtlas = null;
t.fire = null;
t.subConnon = null;
t.funnelLeftNode = null;
t.funnelRightNode = null;
t.invincibleAin = null;
t.invincibleTime = 5e3;
t.maxSpeed = 0;
t.aSpeed = 0;
t.funnelPrefabArr = [];
t.invincibleAins = null;
t.mainGunHit = 0;
t.extraGunHit = 0;
t.goldMore = 1;
t.maxLife = 0;
t.life = 0;
t.curASpeed = 0;
t.curSpeed = 0;
t._showType = !1;
t.invincibleEndTime = 0;
t.bulletSourceNum = 0;
t.maxBulletNum = 5;
t.ballKill = [ 200, 400, 600, 1e3 ];
t.speedTemp = 1;
t.speedLowCount = 0;
t.effectMap = new Map();
return t;
}
t.prototype.onLoad = function() {
this.subConnonScript = this.subConnon.getComponent("SubConnon");
};
t.prototype.onBeginContact = function(e, t, n) {
if (!(f.default.getTime() < this.invincibleEndTime)) {
-1 != n.name.search("Prefab<PhysicsCircleCollider>") && 1 == s.default.instance.gameState && -1 == s.default.instance.isInSpecial && this.dleLife(this.ballKill[n.node.ECScript.size]);
if ("speedLowPrefab" == n.node.name) {
this.speedLowCount++;
this.speedTemp = .5;
}
}
};
t.prototype.onEndContact = function(e, t, n) {
if ("speedLowPrefab" == n.node.name) {
this.speedLowCount--;
this.speedLowCount = this.speedLowCount <= 0 ? 0 : this.speedLowCount;
this.speedLowCount <= 0 && (this.speedTemp = 1);
}
};
t.prototype.init = function(e) {
this.connonId = e;
};
t.prototype.reLife = function(e) {
void 0 === e && (e = -1);
var t = Number(u.default.getItem("skillIntensifyLevel")), n = c.default.instance.cannonGrowUp.getDataById(t), o = c.default.instance.connonTable.getDataById(this.connonId), a = c.default.instance.cannonGrowUp.getLine(t);
if (-1 == e) this.maxLife = this.life = Number(o.armor_basis) + Number(n.armor_basis) + Number(n.armor_up_b) * (t - 10 * (a - 1)); else if (0 == e) this.life = this.maxLife; else {
var i = Math.floor(this.maxLife * e);
this.life = this.life + i <= this.maxLife ? this.life + i : this.maxLife;
}
g.default.gameUi.updateLife(this.life, this.maxLife);
};
t.prototype.shoot = function() {
if (!s.default.instance.checkGameState([ 0, 2, 3, 4 ]) || this.showType) {
this.showType || d.default.playSoundEffect(d.default.shoot);
var e = this.bulletNum;
if (e % 2 == 1) {
var t = 17 * -Math.floor((e - 1) / 2);
this.setBulletPos(t);
for (var n = 1; n < e; n++) this.setBulletPos(t + 17 * n);
} else for (t = 17 * -(Math.floor((e - 1) / 2) + 1) + 5, n = 0; n < e; n++) this.setBulletPos(t + 17 * n + 5);
}
};
t.prototype.setBulletPos = function(e) {
var t = l.default.instance.pop("bulletPrefab");
t && !t.parent && this.bulletNode.addChild(t);
t.active = !0;
t.ECScript.init(this.bulletHit, e);
t.ECScript.setIcon(this.mainConnonBulletIcon);
t.setPosition(this.node.position.x, this.node.position.y + 50);
};
t.prototype.startShoot = function() {
if (!this.isInShoot && (!s.default.instance.checkGameState([ 4 ]) || this.showType)) {
this.isInShoot = !0;
this.connonShack();
this.node.opacity = 255;
this.invincibleAin.play("connonFire");
this.setShoot();
this.shoot();
this.subConnonScript.startShoot(this.subConnonBulletIcon);
this.funnelLeftScript && this.funnelLeftScript.startShoot(this.mainConnonBulletIcon);
this.funnelRightScript && this.funnelRightScript.startShoot(this.mainConnonBulletIcon);
}
};
t.prototype.setShoot = function() {
var e = Number(u.default.getItem("skillIntensifyLevel")), t = c.default.instance.connonTable.getDataById(this.connonId), n = c.default.instance.cannonGrowUp.getDataById(e), o = c.default.instance.cannonGrowUp.getLine(e);
this.goldMore = f.default.accMul(t.coins, .01);
this.mainGunHit = Number(t.c_att) + Number(n.c_att) + Number(n.c_att_b) * (e - 10 * (o - 1));
this.bulletHit = this.mainGunHit + s.default.instance.addTempBulletHit(0);
this.bulletNum = e < 10 ? 1 : Math.floor((e - 10) / 20) + 2;
this.bulletNum = this.bulletNum > this.maxBulletNum ? this.maxBulletNum : this.bulletNum;
this.bulletNum = s.default.instance.isInHit > 0 ? this.bulletNum + 1 : this.bulletNum;
if (s.default.instance.isInSpecial == h.PropType.Tempest) {
this.bulletNum += 3;
var a = c.default.instance.workShopTable.getCount(h.PropType.Tempest, s.default.instance.getPropLevel(h.PropType.Tempest));
this.bulletHit = Math.floor(this.bulletHit * (1 + a));
}
this.subConnonScript.init(this.connonId);
this.shootTemp = 1 / this.minShootTemp;
this.schedule(this.shoot, this.minShootTemp, cc.macro.REPEAT_FOREVER);
};
t.prototype.addBulletHit = function(e, t, n) {
var o = this;
void 0 === e && (e = 0);
void 0 === t && (t = 0);
void 0 === n && (n = -1);
var a = 0 == t ? e : Math.ceil(this.mainGunHit * e);
this.bulletHit = this.mainGunHit + s.default.instance.addTempBulletHit(a);
-1 != n && this.scheduleOnce(function() {
s.default.instance.checkGameState([ 0, 3, 4, 5 ]) || (o.bulletHit = o.mainGunHit + s.default.instance.addTempBulletHit(-a));
}, n);
};
t.prototype.cancelShoot = function() {
this.isInShoot = !1;
this.invincibleAin.stop("connonFire");
this.fire.spriteFrame = null;
this.unschedule(this.shoot);
this.stopShack();
this.subConnonScript.cancelShoot();
this.funnelLeftScript && this.funnelLeftScript.cancelShoot();
this.funnelRightScript && this.funnelRightScript.cancelShoot();
};
t.prototype.delayed = function() {
this.invincibleEndTime = f.default.getTime();
this.invincibleAins.stop("invincible");
this.invincibleAins.node.opacity = 0;
};
t.prototype.propInvincible = function() {
this.invincibleAins.node.opacity = 255;
this.invincibleAins.play("invincible");
this.invincibleEndTime = f.default.getTime() + 1e3 * Number.MAX_VALUE;
};
t.prototype.stopPropInvincible = function() {
this.invincibleAins.stop("invincible");
this.invincibleAin.stop("invincible2");
this.invincibleAins.node.opacity = 0;
this.invincibleEndTime = 0;
this.node.stopActionByTag(1001);
this.node.runAction(cc.fadeIn(.1));
};
t.prototype.resurgenceInvincible = function() {
this.invincibleAins.node.opacity = 255;
this.invincibleAins.play("invincible");
this.invincibleAin.play("invincible2");
this.invincibleEndTime = f.default.getTime() + 1e3 * Number.MAX_VALUE;
b.default.instance.addBuffShow(5e5, 5, g.default.game.BuffPrefab, g.default.gameUi.buffIconAtlas[0], GlobalFun.i18n.t("lable.10269"), !0);
};
t.prototype.setConnonSkin = function(e) {
this.connonId = e;
var t = c.default.instance.connonTable.getScourceId(e, 4), n = t[0], o = (t[1], 
t[2]), a = s.default.instance.getConnonInfo(this.connonId);
this.connonSprite.spriteFrame = this.connonAtlas.getSpriteFrame(n + s.default.instance.getSourceNum(a.mainGunLevel - 1));
this.wheelSprite.spriteFrame = this.connonAtlas.getSpriteFrame(o + "0");
this.subConnonScript.setConnonIcon(this.connonAtlas.getSpriteFrame("Gun_301000_" + (e - 301e3) % 5));
};
t.prototype.setBullet = function() {
var e = s.default.instance.getConnonInfo(this.connonId), t = c.default.instance.connonTable.getBulletSource(this.connonId, 2), n = t[0], o = t[1];
this.mainConnonBulletIcon = this.connonAtlas.getSpriteFrame(n + s.default.instance.getSourceNum(e.mainGunLevel - 1));
this.mainConnonBulletIcon = this.mainConnonBulletIcon ? this.mainConnonBulletIcon : this.connonAtlas.getSpriteFrame("Bullet_C_301000_" + s.default.instance.getSourceNum(e.mainGunLevel - 1));
this.subConnonBulletIcon = this.connonAtlas.getSpriteFrame(o + s.default.instance.getSourceNum(e.extraGun - 1));
this.subConnonBulletIcon = this.subConnonBulletIcon ? this.subConnonBulletIcon : this.connonAtlas.getSpriteFrame("Bullet_G_301000_" + s.default.instance.getSourceNum(e.extraGun - 1));
};
t.prototype.getFunnel = function(e) {
if (!s.default.instance.checkGameState([ 2, 3, 4, 5, 6 ]) || this.showType) {
var t = h.FunnelType.FunnelConnon;
if (this.funnelLeftScript) if (this.funnelRightScript) this.funnelLeftScript.endTime < this.funnelRightScript.endTime ? this.funnelLeftScript.setEndTime() : this.funnelRightScript.setEndTime(); else {
this.funnelRight = cc.instantiate(g.default.game.funnelPrefabArr[0]);
this.funnelRightNode.addChild(this.funnelRight);
this.funnelRightScript = this.funnelRight.getComponent(t);
this.funnelRightScript.funnelInit(e, this, this.bulletNode, h.FunnelConnonDirection.Right, this.showType);
} else {
this.funnelLeft = cc.instantiate(g.default.game.funnelPrefabArr[0]);
this.funnelLeftNode.addChild(this.funnelLeft);
this.funnelLeftScript = this.funnelLeft.getComponent(t);
this.funnelLeftScript.funnelInit(e, this, this.bulletNode, h.FunnelConnonDirection.LEFT, this.showType);
}
if (this.isInShoot) {
this.funnelLeftScript && this.funnelLeftScript.startShoot(this.mainConnonBulletIcon);
this.funnelRightScript && this.funnelRightScript.startShoot(this.mainConnonBulletIcon);
}
}
};
t.prototype.funnelShow = function(e) {
if (e && !isNaN(e)) {
this.getFunnel(e);
this.getFunnel(e);
}
};
t.prototype.outFunnel = function() {
this.funnelLeftScript && this.funnelLeftScript.funnelOut();
this.funnelRightScript && this.funnelRightScript.funnelOut();
this.funnelLeftScript = null;
this.funnelRightScript = null;
};
t.prototype.addEffect = function(e) {
return i(this, void 0, void 0, function() {
var t;
return r(this, function(n) {
switch (n.label) {
case 0:
return this.effectMap.has(e) ? [ 2 ] : [ 4, y.default.instance.playLoopEffect(e, this.node, cc.v2(0, 0)) ];

case 1:
t = n.sent();
this.effectMap.set(e, t);
return [ 2 ];
}
});
});
};
t.prototype.delEffect = function(e) {
if (this.effectMap.has(e)) {
var t = this.effectMap.get(e);
t.removeFromParent();
l.default.instance.push(t);
this.effectMap.delete(e);
}
};
t.prototype.clearEfect = function() {
this.effectMap.forEach(function(e, t) {
e.removeFromParent();
l.default.instance.push(e);
});
this.effectMap.clear();
};
t.prototype.dleLife = function(e) {
e = Number(e);
if (!isNaN(e)) {
this.funnelLeftScript && this.funnelLeftScript.bulletType == h.BulletType.LifeShield && this.funnelLeftScript.leftLife > 0 ? this.funnelLeftScript.dleLife(e) : this.funnelRightScript && this.funnelRightScript.bulletType == h.BulletType.LifeShield && this.funnelRightScript.leftLife > 0 ? this.funnelRightScript.dleLife(e) : this.life -= e;
if (this.life <= 0) {
d.default.playSoundEffect(d.default.death);
s.default.instance.gameState = 2;
this.cancelShoot();
} else m.default.instance.phoneShack();
g.default.gameUi.redBlink();
g.default.gameUi.updateLife(this.life, this.maxLife);
}
};
t.prototype.connonShack = function() {
this.shackAction && this.connonSprite.node.stopAction(this.shackAction);
this.shackAction1 && this.subConnon.node.stopAction(this.shackAction1);
var e = this.minShootTemp;
this.shackAction = cc.repeatForever(cc.sequence(cc.moveBy(.03, cc.v2(0, -8)), cc.moveBy(.03, cc.v2(0, 8)), cc.moveTo(e - .06, cc.v2(0, 0))));
this.connonSprite.node.runAction(this.shackAction);
this.shackAction1 = cc.repeatForever(cc.sequence(cc.moveBy(.03, cc.v2(0, -8)), cc.moveBy(.03, cc.v2(0, 8)), cc.moveTo(e - .06, cc.v2(0, 0))));
this.subConnon.node.runAction(this.shackAction1);
};
t.prototype.stopShack = function() {
this.connonSprite.node.stopAction(this.shackAction);
this.subConnon.node.stopAction(this.shackAction1);
var e = 1 / this.shootSpeed, t = cc.moveTo(.5 * e, cc.v2(0, 0));
this.connonSprite.node.runAction(t);
};
Object.defineProperty(t.prototype, "showType", {
get: function() {
return this._showType;
},
set: function(e) {
this._showType = e;
this.subConnonScript.showType = e;
},
enumerable: !1,
configurable: !0
});
a([ _([ cc.Prefab ]) ], t.prototype, "bulletPrefab", void 0);
a([ _(cc.Sprite) ], t.prototype, "wheelSprite", void 0);
a([ _(cc.SpriteAtlas) ], t.prototype, "connonAtlas", void 0);
a([ _(cc.Sprite) ], t.prototype, "fire", void 0);
a([ _(cc.Sprite) ], t.prototype, "subConnon", void 0);
a([ _(cc.Node) ], t.prototype, "funnelLeftNode", void 0);
a([ _(cc.Node) ], t.prototype, "funnelRightNode", void 0);
a([ _(cc.Animation) ], t.prototype, "invincibleAin", void 0);
a([ _(cc.Integer) ], t.prototype, "invincibleTime", void 0);
a([ _(cc.Integer) ], t.prototype, "maxSpeed", void 0);
a([ _(cc.Integer) ], t.prototype, "aSpeed", void 0);
a([ _({
type: [ cc.Prefab ],
tooltip: "副炮预制体"
}) ], t.prototype, "funnelPrefabArr", void 0);
a([ _(cc.Animation) ], t.prototype, "invincibleAins", void 0);
return t = a([ S ], t);
}(p.default);
n.default = P;
cc._RF.pop();
}, {
"../../BuffManager": "BuffManager",
"../../code/Config/Config": "Config",
"../../code/Lib/Global": "Global",
"../../code/Lib/LocalStorage": "LocalStorage",
"../../code/manager/EffectManager": "EffectManager",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/NodePoolMananger": "NodePoolMananger",
"../../code/manager/PanelManager": "PanelManager",
"../../code/manager/SDKManager": "SDKManager",
"../../code/manager/SoundManager": "SoundManager",
"../../code/manager/TableManager": "TableManager",
"./ConnonBase": "ConnonBase"
} ],
DateUtils: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "952f667vY9Bgq0Uf8vy8Ftd", "DateUtils");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e() {}
Object.defineProperty(e, "instance", {
get: function() {
this._instance || (this._instance = new e());
return this._instance;
},
enumerable: !1,
configurable: !0
});
e.prototype.getFormatBySecond = function(e, t) {
void 0 === t && (t = 1);
var n = "";
switch (t) {
case 1:
n = this.getFormatBySecond1(e);
break;

case 2:
n = this.getFormatBySecond2(e);
break;

case 3:
n = this.getFormatBySecond3(e);
break;

case 4:
n = this.getFormatBySecond4(e);
break;

case 5:
n = this.getFormatBySecond5(e);
break;

case 6:
n = this.getFormatBySecond6(e);
}
return n;
};
e.prototype.getFormatBySecond1 = function(e) {
void 0 === e && (e = 0);
var t, n = Math.floor(e / 3600);
t = 0 == n ? "00" : n < 10 ? "0" + n : "" + n;
var o, a, i = Math.floor((e - 3600 * n) / 60), r = Math.floor((e - 3600 * n) % 60);
o = 0 == i ? "00" : i < 10 ? "0" + i : "" + i;
a = 0 == r ? "00" : r < 10 ? "0" + r : "" + r;
return 0 == n ? o + ":" + a : t + ":" + o + ":" + a;
};
e.prototype.getFormatBySecond3 = function(e) {
void 0 === e && (e = 0);
var t = Math.floor(e / 3600), n = Math.floor((e - 3600 * t) / 60), o = Math.floor((e - 3600 * t) % 60);
return (0 == n ? "00" : n < 10 ? "0" + n : "" + n) + ":" + (0 == o ? "00" : o < 10 ? "0" + o : "" + o);
};
e.prototype.getFormatBySecond2 = function(e) {
var t = new Date(e);
return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
};
e.prototype.getFormatBySecond6 = function(e) {
var t = Math.floor(e / 3600), n = Math.floor((e - 3600 * t) / 60), o = Math.floor((e - 3600 * t) % 60);
return t > 0 ? t + "h" + n + "m" : o > 0 ? n + "m" + o + "s" : n + "m";
};
e.prototype.getFormatBySecond4 = function(e) {
var t = Math.floor(e / 36e5);
return t > 0 ? t > 24 ? Math.floor(t / 24) + "天前" : t + "小时前" : Math.floor(e / 60) + "分钟前";
};
e.prototype.getFormatBySecond5 = function(e) {
var t = Math.floor(e / 86400), n = Math.floor(e % 86400 / 3600), o = Math.floor((e - 3600 * n - 86400 * t) / 60), a = Math.floor((e - 3600 * n - 86400 * t - 60 * o) % 60), i = "";
if (e > 0) {
if (0 == t) {
"";
if (0 == n) {
i = "";
if (0 == o) {
"";
return 0 == a ? "" : a + "S";
}
return o + "M" + " " + (0 == a ? "" : a + "S");
}
i = n + "H";
if (0 == o) {
"";
return 0 == a ? "" : a + "S";
}
return i + " " + (o + "M") + " " + (a + "S");
}
return t + "D" + " " + (i = 0 == n ? "" : n + "H") + " " + (0 == o ? "" : o + "M");
}
return "";
};
e._instance = null;
return e;
}();
n.default = o;
cc._RF.pop();
}, {} ],
EasyGetCompleteClass: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f09bbsEyZxLdoSz/QOeQuvs", "EasyGetCompleteClass");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = cc._decorator, r = i.ccclass, l = (i.property, function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
this.EasyGetCompleteClassInit();
};
Object.defineProperty(t.prototype, "ECScript", {
get: function() {
return this.getComponent(cc.js.getClassName(this));
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(t.prototype, "ECBody", {
get: function() {
return this.getComponent(cc.RigidBody);
},
enumerable: !1,
configurable: !0
});
t.prototype.EasyGetCompleteClassInit = function() {
this.node.ECScript = this.ECScript;
this.node.ECBody = this.ECBody;
};
return t = a([ r ], t);
}(cc.Component));
n.default = l;
cc._RF.pop();
}, {} ],
EffectManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "de6bau1X1xO7pyM/1hMvhnP", "EffectManager");
var o = this && this.__awaiter || function(e, t, n, o) {
function a(e) {
return e instanceof n ? e : new n(function(t) {
t(e);
});
}
return new (n || (n = Promise))(function(n, i) {
function r(e) {
try {
s(o.next(e));
} catch (e) {
i(e);
}
}
function l(e) {
try {
s(o.throw(e));
} catch (e) {
i(e);
}
}
function s(e) {
e.done ? n(e.value) : a(e.value).then(r, l);
}
s((o = o.apply(e, t || [])).next());
});
}, a = this && this.__generator || function(e, t) {
var n, o, a, i, r = {
label: 0,
sent: function() {
if (1 & a[0]) throw a[1];
return a[1];
},
trys: [],
ops: []
};
return i = {
next: l(0),
throw: l(1),
return: l(2)
}, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
return this;
}), i;
function l(e) {
return function(t) {
return s([ e, t ]);
};
}
function s(i) {
if (n) throw new TypeError("Generator is already executing.");
for (;r; ) try {
if (n = 1, o && (a = 2 & i[0] ? o.return : i[0] ? o.throw || ((a = o.return) && a.call(o), 
0) : o.next) && !(a = a.call(o, i[1])).done) return a;
(o = 0, a) && (i = [ 2 & i[0], a.value ]);
switch (i[0]) {
case 0:
case 1:
a = i;
break;

case 4:
r.label++;
return {
value: i[1],
done: !1
};

case 5:
r.label++;
o = i[1];
i = [ 0 ];
continue;

case 7:
i = r.ops.pop();
r.trys.pop();
continue;

default:
if (!(a = r.trys, a = a.length > 0 && a[a.length - 1]) && (6 === i[0] || 2 === i[0])) {
r = 0;
continue;
}
if (3 === i[0] && (!a || i[1] > a[0] && i[1] < a[3])) {
r.label = i[1];
break;
}
if (6 === i[0] && r.label < a[1]) {
r.label = a[1];
a = i;
break;
}
if (a && r.label < a[2]) {
r.label = a[2];
r.ops.push(i);
break;
}
a[2] && r.ops.pop();
r.trys.pop();
continue;
}
i = t.call(e, r);
} catch (e) {
i = [ 6, e ];
o = 0;
} finally {
n = a = 0;
}
if (5 & i[0]) throw i[1];
return {
value: i[0] ? i[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
n.EffectName = void 0;
var i = e("./LoadManager"), r = e("./NodePoolMananger"), l = e("../../src/prefab/FlyRewardPrefab"), s = e("../Lib/Global"), c = function() {
function e() {
this.url = "/effectPrefab/";
this.speedChanged = {};
}
Object.defineProperty(e, "instance", {
get: function() {
this._instance || (this._instance = new e());
return this._instance;
},
enumerable: !1,
configurable: !0
});
e.prototype.playEffect = function(e, t, n, i, l, s) {
void 0 === l && (l = "");
void 0 === s && (s = 1);
return o(this, void 0, void 0, function() {
var o, c, u = this;
return a(this, function(a) {
switch (a.label) {
case 0:
return (o = r.default.instance.popWithCheckExist(e)) ? [ 3, 2 ] : [ 4, this.loadEffectPreFab(e) ];

case 1:
o = a.sent();
a.label = 2;

case 2:
t.addChild(o);
o.setPosition(n);
o.active = !0;
if (c = o.getComponent(cc.Animation).play(l)) {
c.speed = s;
1 != s && (this.speedChanged[o.uuid] = c);
}
o.getComponent(cc.Animation).once("stop", function() {
u.speedChanged.hasOwnProperty(o.uuid) && delete u.speedChanged[o.uuid];
o.removeFromParent();
r.default.instance.push(o);
i && i();
});
return [ 2, o ];
}
});
});
};
e.prototype.playLoopEffect = function(e, t, n, i) {
void 0 === i && (i = "");
return o(this, void 0, void 0, function() {
var o;
return a(this, function(a) {
switch (a.label) {
case 0:
return (o = r.default.instance.popWithCheckExist(e)) ? [ 3, 2 ] : [ 4, this.loadEffectPreFab(e) ];

case 1:
o = a.sent();
a.label = 2;

case 2:
t.addChild(o);
o.setPosition(n);
o.getComponent(cc.Animation).play(i);
return [ 2, o ];
}
});
});
};
e.prototype.resetSpeed = function() {
for (var e in this.speedChanged) if (this.speedChanged.hasOwnProperty(e)) {
this.speedChanged[e].speed = 1;
delete this.speedChanged[e];
}
};
e.prototype.loadEffectPreFab = function(e) {
return o(this, void 0, void 0, function() {
var t;
return a(this, function(n) {
switch (n.label) {
case 0:
return (t = i.default.instance.getRes(this.url + e, cc.Prefab)) ? [ 3, 2 ] : [ 4, i.default.instance.loadRes(this.url + e, cc.Prefab) ];

case 1:
t = n.sent();
n.label = 2;

case 2:
r.default.instance.addPool(t);
return [ 2, cc.instantiate(t) ];
}
});
});
};
e.prototype.rewardFly = function(e, t, n, o) {
void 0 === o && (o = null);
if (e instanceof Array) for (var a = 0; a < e.length; a++) {
(u = r.default.instance.pop("flyRewardPrefab")).getComponent(l.default).init(e[a], t[a], n[a], o);
} else {
var i = void 0;
if (0 == n) return;
i = n <= 10 ? Number(n) : n <= 100 ? Math.floor(Number(n) / 10) + 10 : n <= 1e3 ? Math.floor(Number(n) / 100) + 15 : n <= 1e4 ? Math.floor(Number(n) / 1e3) + 20 : 30;
e.position;
for (var c = 0; c < i; c++) {
var u = r.default.instance.pop("flyRewardPrefab"), d = cc.v3(e.position.x + 50 * s.default.randomFix(-3, 3), e.position.y + 50 * s.default.randomFix(-3, 3), 0);
0;
u.getComponent(l.default).init(e, t, n, o, d, c % 5 == 0);
}
}
};
return e;
}();
n.default = c;
(function(e) {
e.FunnelConnonBoom = "funnelConnonBoom";
e.Armor = "302005";
e.BoomBulletBoom = "302002";
e.BulletFollowBoom = "302000";
e.SubGunUnlockEffect = "subGunUnlockEffect";
e.BlickEffect = "blickEffect";
e.RewardFlyBoom = "rewardFlyBoom";
e.AddHpEffect = "addHpEffect";
e.AddAtkEffect = "addAtkEffect";
e.BoxOpenEffect = "boxOpenEffect";
e.BoxOpenBlinkEffect = "boxOpenBlinkEffect";
e.BallFrozenEffect = "ballFrozenEffect";
})(n.EffectName || (n.EffectName = {}));
cc._RF.pop();
}, {
"../../src/prefab/FlyRewardPrefab": "FlyRewardPrefab",
"../Lib/Global": "Global",
"./LoadManager": "LoadManager",
"./NodePoolMananger": "NodePoolMananger"
} ],
EndlessCompletePanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "06d45jvN19Hx72mQMV2RIW9", "EndlessCompletePanel");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../../code/basecode/BasePanel"), r = e("../../../code/manager/UiAniManager"), l = e("../../../code/manager/PanelManager"), s = e("../../../code/Config/Config"), c = e("../../../code/manager/MyRoleDataManager"), u = e("../../../code/manager/BallManager"), d = e("../../../code/manager/TableManager"), p = e("../../../code/manager/MissionManger"), f = e("../../../code/manager/SoundManager"), h = e("../../../code/Lib/LocalStorage"), g = e("../../../code/manager/Advert_Manager"), y = e("../MissionPanel/RewardItem"), m = e("../../../code/manager/Umeng_Manager"), b = cc._decorator, v = b.ccclass, S = b.property, _ = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t._aniType = r.UiAniType.TopToDown;
t.isInBlack = !1;
t.rewardPrefab = null;
t.panelNode = null;
t.backGround = null;
t.adsBtn = null;
t.xiaYiGuan = null;
t.gold = null;
t.masonry = null;
t.goldTarget = null;
t.masonryTarget = null;
t.goldOvMasonryP = null;
t.setLabelString = [];
t.moreRewardMap = new Map();
t.nuber = 2.5;
return t;
}
t.prototype.onLoad = function() {};
t.prototype.openPanel = function() {
var e = this;
this.setLable();
this.goldTarget.getComponent(cc.Label).string = l.default.gameUi.goldLable.string;
this.masonryTarget.getComponent(cc.Label).string = l.default.gameUi.diamondLable.string;
this.isInBlack = !1;
this.playUIAni(r.InOrOut.IN);
this.addEvent();
p.default.instance.maxMissionNum(2, c.default.instance.curScore);
p.default.instance.saveMission();
f.default.stopBackGroudMusic();
this.rewardCount();
this.goldOvMasonryP.opacity = 255;
this.xiaYiGuan.node.opacity = 0;
if (this.moreRewardMap.get(s.CurrencyType.Gold) <= 0) {
this.xiaYiGuan.interactable = !0;
this.xiaYiGuan.node.getComponentInChildren(cc.Label).string = GlobalFun.i18n.t("lable.10284");
this.goldOvMasonryP.opacity = 0;
this.xiaYiGuan.node.opacity = 255;
this.adsBtn.node.active = !1;
} else this.scheduleOnce(function() {
e.xiaYiGuan.interactable = !0;
e.xiaYiGuan.node.opacity = 255;
}, 3);
};
t.prototype.setLable = function() {
this.adsBtn.node.getChildByName("okshadowLable").getComponent(cc.Label).string = GlobalFun.i18n.t("lable.10286");
this.xiaYiGuan.getComponentInChildren(cc.Label).string = GlobalFun.i18n.t("lable.10280");
this.setLabelString[0].string = GlobalFun.i18n.t("lable.10284");
this.setLabelString[1].string = GlobalFun.i18n.t("lable.10184");
};
t.prototype.closePanel = function() {
this.playUIAni(r.InOrOut.OUT);
this.dleEvent();
};
t.prototype.panelIn = function() {
l.default.game.playerScript.outFunnel();
l.default.game.playerScript.clearEfect();
};
t.prototype.panelOut = function() {
l.default.instance.deleteOpen(s.PanelName.EndlessCompletePanel);
this.node.removeFromParent();
};
t.prototype.addEvent = function() {
this.adsBtn.node.on("click", this.adsBtnTap, this);
this.xiaYiGuan.node.on("click", this.DirectlyToReceive, this);
};
t.prototype.dleEvent = function() {
this.adsBtn.node.off("click", this.adsBtnTap, this);
this.xiaYiGuan.node.off("click", this.DirectlyToReceive, this);
};
t.prototype.adsBtnTap = function() {
if (!this.isInBlack) if (cc.sys.os === cc.sys.OS_ANDROID || cc.sys.os === cc.sys.OS_IOS) {
m.default.instance.putPoint(m.Point_EventID.endlessReward_Click_num);
g.default.instance.show_Ad(g.Adver_Type.ReWardVideo_Adv, function(e) {
this.isInBlack = !0;
this.adsBtn.interactable = !1;
this.xiaYiGuan.interactable = !1;
this.moreRewardMap.forEach(function(e, t) {
c.default.instance.addCurrency(e * (t == s.CurrencyType.Gold ? 5 : 1), t);
});
this.rewardPrefab.getComponent(y.default).init(this.moreRewardMap);
this.rewardPrefab.getComponent(y.default).rewardFly([ this.goldTarget, this.masonryTarget ], 5);
this.scheduleOnce(this.beBlack, this.nuber);
}.bind(this), function() {
this.isInBlack = !1;
this.adsBtn.interactable = !0;
this.xiaYiGuan.interactable = !0;
}.bind(this));
} else {
this.isInBlack = !0;
this.adsBtn.interactable = !1;
this.xiaYiGuan.interactable = !1;
this.moreRewardMap.forEach(function(e, t) {
c.default.instance.addCurrency(e * (t == s.CurrencyType.Gold ? 5 : 1), t);
});
this.rewardPrefab.getComponent(y.default).init(this.moreRewardMap);
this.rewardPrefab.getComponent(y.default).rewardFly([ this.goldTarget, this.masonryTarget ], 5);
this.scheduleOnce(this.beBlack, this.nuber);
}
};
t.prototype.DirectlyToReceive = function() {
if (!this.isInBlack) {
this.isInBlack = !0;
this.xiaYiGuan.interactable = !1;
this.adsBtn.interactable = !1;
this.moreRewardMap.forEach(function(e, t) {
c.default.instance.addCurrency(e, t);
});
this.rewardPrefab.getComponent(y.default).init(this.moreRewardMap);
this.rewardPrefab.getComponent(y.default).rewardFly([ this.goldTarget, this.masonryTarget ]);
this.scheduleOnce(this.beBlack, this.nuber);
}
};
t.prototype.beBlack = function() {
this.adsBtn.interactable = !0;
this.xiaYiGuan.interactable = !0;
this.dleEvent();
this.panelNode.y = 1691;
this.backGround.opacity = 0;
this.panelOut();
l.default.gameUi.playUiInAni();
};
t.prototype.closeBtnTap = function() {
if (!this.isInBlack) {
this.isInBlack = !0;
l.default.gameUi.beBlack();
this.schedule(this.beBlack.bind(this), .37, 0);
}
};
t.prototype.rewardCount = function() {
var e, t = Number(c.default.instance.curScore), n = Number(h.default.getItem("endlessMaxScore")), o = d.default.instance.cannonGrowUp.getBestTenUpgradeMoney();
n <= 0 || t >= n ? e = Math.floor(.12 * o) : t < .5 * n ? e = Math.floor(.03 * o) : t >= .5 * n && t < n && (e = Math.floor(o * t / n * .1));
if (Number(h.default.getItem("EndlessIsRunOutOf")) > 0) {
this.moreRewardMap.set(s.CurrencyType.Gold, e);
this.gold.string = e.toString();
} else {
this.moreRewardMap.set(s.CurrencyType.Gold, 0);
this.gold.string = "0";
}
var a = u.default.instance.ballOutTimes, i = 0;
i = a < 5 ? 1 : a >= 5 && a < 10 ? 5 : a >= 10 && a < 20 ? Math.floor(a / 2) : 20;
if (Number(h.default.getItem("EndlessIsRunOutOf")) > 0) {
this.moreRewardMap.set(s.CurrencyType.Diamond, i);
this.masonry.string = i.toString();
} else {
this.moreRewardMap.set(s.CurrencyType.Diamond, 0);
this.masonry.string = "0";
}
if (c.default.instance.maxScore < c.default.instance.curScore) {
c.default.instance.maxScore = c.default.instance.curScore;
h.default.saveItem("endlessMaxScore", c.default.instance.maxScore + "");
}
};
a([ S({
type: cc.Node,
tooltip: "奖励节点"
}) ], t.prototype, "rewardPrefab", void 0);
a([ S({
type: cc.Node,
tooltip: "界面节点"
}) ], t.prototype, "panelNode", void 0);
a([ S({
type: cc.Node,
tooltip: "背景节点"
}) ], t.prototype, "backGround", void 0);
a([ S({
type: cc.Button,
tooltip: "广告按钮"
}) ], t.prototype, "adsBtn", void 0);
a([ S({
type: cc.Button,
tooltip: "进入下一关，或继续游戏"
}) ], t.prototype, "xiaYiGuan", void 0);
a([ S({
type: cc.Label,
tooltip: "金币"
}) ], t.prototype, "gold", void 0);
a([ S({
type: cc.Label,
tooltip: "钻石"
}) ], t.prototype, "masonry", void 0);
a([ S({
type: cc.Node,
tooltip: "飞金币位置"
}) ], t.prototype, "goldTarget", void 0);
a([ S({
type: cc.Node,
tooltip: "飞砖石位置"
}) ], t.prototype, "masonryTarget", void 0);
a([ S({
type: cc.Node,
tooltip: "获得金币砖石根节点"
}) ], t.prototype, "goldOvMasonryP", void 0);
a([ S([ cc.Label ]) ], t.prototype, "setLabelString", void 0);
return t = a([ v ], t);
}(i.default);
n.default = _;
cc._RF.pop();
}, {
"../../../code/Config/Config": "Config",
"../../../code/Lib/LocalStorage": "LocalStorage",
"../../../code/basecode/BasePanel": "BasePanel",
"../../../code/manager/Advert_Manager": "Advert_Manager",
"../../../code/manager/BallManager": "BallManager",
"../../../code/manager/MissionManger": "MissionManger",
"../../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../../code/manager/PanelManager": "PanelManager",
"../../../code/manager/SoundManager": "SoundManager",
"../../../code/manager/TableManager": "TableManager",
"../../../code/manager/UiAniManager": "UiAniManager",
"../../../code/manager/Umeng_Manager": "Umeng_Manager",
"../MissionPanel/RewardItem": "RewardItem"
} ],
EndlessManagement: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6287cJ39JNIA78T1F7g109h", "EndlessManagement");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("./code/Lib/LocalStorage"), r = cc._decorator, l = r.ccclass, s = r.property, c = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.video = null;
t.cishu = null;
t.nowEndlessNumber = 0;
t.EndlessIsRunOutOf = 0;
return t;
}
t.prototype.onLoad = function() {
this.video.active = !1;
var e = i.default.getItem("Endless");
if (!e) {
e = "3";
i.default.saveItem("Endless", e);
}
this.EndlessIsRunOutOf = Number(i.default.getItem("EndlessIsRunOutOf", "7"));
this.nowEndlessNumber = Number(e);
this.cishu.string = GlobalFun.i18n.t("lable.10287").replace("%d", this.nowEndlessNumber.toString());
var t = new Date(), n = i.default.getItem("DateTime");
if (!n || "0" == n) {
n = t.toLocaleDateString();
i.default.saveItem("DateTime", n);
}
var o = n.split("/"), a = t.toLocaleDateString(), r = a.split("/");
if (this.compareDate(r, o)) {
i.default.saveItem("EndlessIsRunOutOf", "7");
this.EndlessIsRunOutOf = 7;
i.default.saveItem("Endless", "3");
this.nowEndlessNumber = 3;
i.default.saveItem("DateTime", a);
}
this.updateVideo();
};
t.prototype.useOnceEndless = function(e) {
void 0 === e && (e = -1);
this.nowEndlessNumber += e;
i.default.saveItem("Endless", this.nowEndlessNumber.toString());
if (-1 == e) {
this.EndlessIsRunOutOf--;
i.default.saveItem("EndlessIsRunOutOf", this.EndlessIsRunOutOf.toString());
}
this.updateVideo();
};
t.prototype.updateVideo = function() {
if (0 == this.nowEndlessNumber) {
this.video.active = !0;
this.cishu.node.active = !1;
} else {
this.video.active = !1;
this.cishu.node.active = !0;
this.cishu.string = GlobalFun.i18n.t("lable.10287").replace("%d", this.nowEndlessNumber.toString());
}
};
t.prototype.compareDate = function(e, t) {
return !(Number(e[0]) < Number(t[0])) && (Number(e[0]) > Number(t[0]) || !(Number(e[1]) < Number(t[1])) && (Number(e[1]) > Number(t[1]) || !(Number(e[2]) <= Number(t[2])) && (Number(e[2]) > Number(t[2]) || void 0)));
};
a([ s(cc.Node) ], t.prototype, "video", void 0);
a([ s(cc.Label) ], t.prototype, "cishu", void 0);
return t = a([ l ], t);
}(cc.Component);
n.default = c;
cc._RF.pop();
}, {
"./code/Lib/LocalStorage": "LocalStorage"
} ],
FiveStarPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "a0176DKbPZKcprngHE0I3mM", "FiveStarPanel");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../code/manager/SDKManager"), r = e("../../code/manager/MyRoleDataManager"), l = e("../../code/Lib/LocalStorage"), s = e("../../code/manager/SoundManager"), c = e("../../code/basecode/BasePanel"), u = e("../../code/manager/PanelManager"), d = e("../../code/manager/UiAniManager"), p = e("../../code/Config/Config"), f = cc._decorator, h = f.ccclass, g = f.property, y = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.nameLable = null;
t.infoLable = null;
t.questionLable = null;
t.rateLabelShadow = null;
t.rateLabel = null;
t.endLabelShadow = null;
t.endLabel = null;
t.rateBtn = null;
t.endBtn = null;
t.closeBtn = null;
t._aniType = d.UiAniType.TopToDown;
return t;
}
t.prototype.openPanel = function() {
this.playUIAni(d.InOrOut.IN);
this.setLable();
this.addEvent();
};
t.prototype.closePanel = function() {
this.playUIAni(d.InOrOut.OUT);
};
t.prototype.addEvent = function() {
this.rateBtn.node.on("click", this.rateBtnTap, this);
this.closeBtn.node.on("click", this.closeBtnTap, this);
this.endBtn.node.on("click", this.closeBtnTap, this);
};
t.prototype.dleEvent = function() {
this.rateBtn.node.off("click", this.rateBtnTap, this);
this.closeBtn.node.off("click", this.closeBtnTap, this);
this.endBtn.node.off("click", this.closeBtnTap, this);
};
t.prototype.setLable = function() {
this.nameLable.string = GlobalFun.i18n.t("lable.10226");
this.infoLable.string = GlobalFun.i18n.t("lable.10227");
this.questionLable.string = GlobalFun.i18n.t("lable.10228");
this.rateLabel.string = GlobalFun.i18n.t("lable.10229");
this.rateLabelShadow.string = GlobalFun.i18n.t("lable.10229");
this.endLabel.string = GlobalFun.i18n.t("lable.10230");
this.endLabelShadow.string = GlobalFun.i18n.t("lable.10230");
};
t.prototype.closeBtnTap = function() {
s.default.playSoundEffect(s.default.btnSound);
u.default.instance.closePanel(p.PanelName.FiveStarPanel);
};
t.prototype.rateBtnTap = function() {
this.closeBtnTap();
r.default.instance.isRate = !0;
l.default.saveItem("isRate", r.default.instance.isRate.toString());
i.default.instance.rate();
};
t.prototype.panelOut = function() {
this.node.removeFromParent();
};
a([ g(cc.Label) ], t.prototype, "nameLable", void 0);
a([ g(cc.Label) ], t.prototype, "infoLable", void 0);
a([ g(cc.Label) ], t.prototype, "questionLable", void 0);
a([ g(cc.Label) ], t.prototype, "rateLabelShadow", void 0);
a([ g(cc.Label) ], t.prototype, "rateLabel", void 0);
a([ g(cc.Label) ], t.prototype, "endLabelShadow", void 0);
a([ g(cc.Label) ], t.prototype, "endLabel", void 0);
a([ g({
type: cc.Button,
tooltip: "评价按钮"
}) ], t.prototype, "rateBtn", void 0);
a([ g({
type: cc.Button,
tooltip: "拒绝按钮"
}) ], t.prototype, "endBtn", void 0);
a([ g({
type: cc.Button,
tooltip: "关闭按钮"
}) ], t.prototype, "closeBtn", void 0);
return t = a([ h ], t);
}(c.default);
n.default = y;
cc._RF.pop();
}, {
"../../code/Config/Config": "Config",
"../../code/Lib/LocalStorage": "LocalStorage",
"../../code/basecode/BasePanel": "BasePanel",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/PanelManager": "PanelManager",
"../../code/manager/SDKManager": "SDKManager",
"../../code/manager/SoundManager": "SoundManager",
"../../code/manager/UiAniManager": "UiAniManager"
} ],
FlyRewardPrefab: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "a3d07da4TdEQ7IuKkzL2n5e", "FlyRewardPrefab");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../code/Config/Config"), r = e("../../code/manager/PanelManager"), l = e("../../code/manager/NodePoolMananger"), s = e("../../code/manager/EffectManager"), c = e("../../code/manager/SoundManager"), u = e("../../code/manager/TableManager"), d = e("../../code/manager/MyRoleDataManager"), p = e("../../code/Lib/Global"), f = cc._decorator, h = f.ccclass, g = f.property, y = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.icon = null;
t.particle = null;
t.iconArr = [];
t.connonNode = null;
t.connon = null;
t.wheel = null;
t.sub = null;
t.arr = [ -45, 190, 109.1 ];
return t;
}
t.prototype.init = function(e, t, n, o, a, i) {
void 0 === o && (o = null);
void 0 === a && (a = null);
void 0 === i && (i = !0);
this.rewadrType = t;
this.num = n;
this.fly(e, o, a, i);
};
t.prototype.fly = function(e, t, n, o) {
var a = this;
void 0 === t && (t = null);
void 0 === n && (n = null);
void 0 === o && (o = !0);
if (d.default.instance.isConnon(this.rewadrType)) {
this.connonNode.active = !0;
this.icon.node.active = !1;
var f = u.default.instance.connonTable.getScourceId(this.rewadrType, 4), h = f[0], g = f[1], y = f[2];
this.connon.spriteFrame = r.default.game.playerScript.connonAtlas.getSpriteFrame(h + "0");
this.wheel.spriteFrame = r.default.game.playerScript.connonAtlas.getSpriteFrame(y + "0");
this.sub.spriteFrame = r.default.game.playerScript.connonAtlas.getSpriteFrame(g + "0");
var m = r.default.gameUi.downNode.y - 759;
r.default.gameUi.node.addChild(this.node);
var b = p.default.convertNodePosToTargetNodePos(e, this.node), v = this.rewadrType - 51e4;
this.icon.spriteFrame = this.iconArr[v];
this.node.setPosition(b);
var S = cc.sequence(cc.moveTo(.5, cc.v2(-270, m)), cc.callFunc(function() {
s.default.instance.playEffect(s.EffectName.RewardFlyBoom, a.node, cc.v2(0, 0), function() {
a.node.stopAction(S);
a.node.removeFromParent();
l.default.instance.push(a.node);
r.default.instance.openPanel(i.PanelName.RefitShopPanel, r.default.gameUi.middleNode, a.rewadrType);
});
}));
this.node.runAction(S);
} else {
this.connonNode.active = !1;
this.icon.node.active = !0;
m = r.default.gameUi.highTopUiNode.y - 32;
t ? t.parent.addChild(this.node) : r.default.gameUi.node.addChild(this.node);
var _ = e.parent.convertToWorldSpaceAR(n || e.position);
b = this.node.parent.convertToNodeSpaceAR(_), v = this.rewadrType - 51e4;
this.icon.spriteFrame = this.iconArr[v];
var P = t ? cc.size(57.85, 51.35) : cc.size(48, 48);
this.icon.node.setContentSize(P);
this.node.setPosition(b);
var M = t ? cc.v2(t.position.x - 105, t.y) : cc.v2(this.arr[v], m), L = cc.sequence(cc.delayTime(.2), cc.moveTo(.5, M), cc.callFunc(function() {
r.default.gameUi.updataGold();
if (a.rewadrType == i.CurrencyType.Gold) {
var e = "";
d.default.instance.allGoldMore > 1 && (e = "(x" + d.default.instance.allGoldMore + ")");
r.default.gameUi.showToast(a.num + "", e, null == t ? cc.v2(-235.1, -32.7) : cc.v2(0, -32.7), null == t ? r.default.gameUi.highTopUiNode : t);
o && c.default.playSoundEffect(c.default.getCoinEnd);
r.default.gameUi.getTextTween(null == t ? r.default.gameUi.goldLable : t.getComponent(cc.Label), d.default.instance.Gold, d.default.instance.Gold - a.num, .01);
} else if (a.rewadrType == i.CurrencyType.Diamond) {
r.default.gameUi.showToast(a.num + "", "", null == t ? cc.v2(-11.3, -32.7) : cc.v2(0, -32.7), null == t ? r.default.gameUi.highTopUiNode : t);
o && c.default.playSoundEffect(c.default.getDiamod);
r.default.gameUi.getTextTween(null == t ? r.default.gameUi.goldLable : t.getComponent(cc.Label), d.default.instance.Diamond, d.default.instance.Diamond - a.num, .01);
}
a.node.stopAction(L);
a.node.removeFromParent();
l.default.instance.push(a.node);
}));
this.node.runAction(L);
}
};
a([ g({
type: cc.Sprite,
tooltip: "奖励icon"
}) ], t.prototype, "icon", void 0);
a([ g({
type: [ cc.SpriteFrame ],
tooltip: "奖励资源icon"
}) ], t.prototype, "iconArr", void 0);
a([ g({
type: cc.Node,
tooltip: "炮"
}) ], t.prototype, "connonNode", void 0);
a([ g({
type: cc.Sprite,
tooltip: "炮"
}) ], t.prototype, "connon", void 0);
a([ g({
type: cc.Sprite,
tooltip: "车轮"
}) ], t.prototype, "wheel", void 0);
a([ g({
type: cc.Sprite,
tooltip: "副炮"
}) ], t.prototype, "sub", void 0);
return t = a([ h ], t);
}(cc.Component);
n.default = y;
cc._RF.pop();
}, {
"../../code/Config/Config": "Config",
"../../code/Lib/Global": "Global",
"../../code/manager/EffectManager": "EffectManager",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/NodePoolMananger": "NodePoolMananger",
"../../code/manager/PanelManager": "PanelManager",
"../../code/manager/SoundManager": "SoundManager",
"../../code/manager/TableManager": "TableManager"
} ],
FreeConnonItem: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "c21e3Wfr8pCLLwSmVTxPaU7", "FreeConnonItem");
cc._RF.pop();
}, {} ],
FunnelConnon: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5344dpZxfhMf48rFEL1VaE5", "FunnelConnon");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
}, i = this && this.__awaiter || function(e, t, n, o) {
function a(e) {
return e instanceof n ? e : new n(function(t) {
t(e);
});
}
return new (n || (n = Promise))(function(n, i) {
function r(e) {
try {
s(o.next(e));
} catch (e) {
i(e);
}
}
function l(e) {
try {
s(o.throw(e));
} catch (e) {
i(e);
}
}
function s(e) {
e.done ? n(e.value) : a(e.value).then(r, l);
}
s((o = o.apply(e, t || [])).next());
});
}, r = this && this.__generator || function(e, t) {
var n, o, a, i, r = {
label: 0,
sent: function() {
if (1 & a[0]) throw a[1];
return a[1];
},
trys: [],
ops: []
};
return i = {
next: l(0),
throw: l(1),
return: l(2)
}, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
return this;
}), i;
function l(e) {
return function(t) {
return s([ e, t ]);
};
}
function s(i) {
if (n) throw new TypeError("Generator is already executing.");
for (;r; ) try {
if (n = 1, o && (a = 2 & i[0] ? o.return : i[0] ? o.throw || ((a = o.return) && a.call(o), 
0) : o.next) && !(a = a.call(o, i[1])).done) return a;
(o = 0, a) && (i = [ 2 & i[0], a.value ]);
switch (i[0]) {
case 0:
case 1:
a = i;
break;

case 4:
r.label++;
return {
value: i[1],
done: !1
};

case 5:
r.label++;
o = i[1];
i = [ 0 ];
continue;

case 7:
i = r.ops.pop();
r.trys.pop();
continue;

default:
if (!(a = r.trys, a = a.length > 0 && a[a.length - 1]) && (6 === i[0] || 2 === i[0])) {
r = 0;
continue;
}
if (3 === i[0] && (!a || i[1] > a[0] && i[1] < a[3])) {
r.label = i[1];
break;
}
if (6 === i[0] && r.label < a[1]) {
r.label = a[1];
a = i;
break;
}
if (a && r.label < a[2]) {
r.label = a[2];
r.ops.push(i);
break;
}
a[2] && r.ops.pop();
r.trys.pop();
continue;
}
i = t.call(e, r);
} catch (e) {
i = [ 6, e ];
o = 0;
} finally {
n = a = 0;
}
if (5 & i[0]) throw i[1];
return {
value: i[0] ? i[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var l = e("./ConnonBase"), s = e("../../code/manager/NodePoolMananger"), c = e("../../code/manager/PanelManager"), u = e("../../code/Lib/Global"), d = e("../../code/Config/Config"), p = e("../../code/manager/TableManager"), f = e("../../code/manager/MyRoleDataManager"), h = e("../../code/manager/EffectManager"), g = cc._decorator, y = g.ccclass, m = g.property, b = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.connonAtlas = null;
t.leftLife = 0;
t.bulletType = d.BulletType.BulletLaser;
t.isAni = !1;
t.showType = !1;
t.effect = null;
t.laserCutBulletNum = 30;
t.endTime = -1;
return t;
}
t.prototype.funnelInit = function(e, t, n, o, a) {
void 0 === a && (a = !1);
this.node.y = -500;
this.showType = a;
this.isAni = !0;
this.direction = o;
this.funnelId = e;
this.bulletNode = n;
this.setBulletType();
this.parent = t;
this.connonSprite.spriteFrame = this.connonAtlas.getSpriteFrame(p.default.instance.aircraftTable.getSource(e));
this.inAni();
this.funnelData = p.default.instance.aircraftTable.getInfo(this.funnelId);
var i = f.default.instance.getFunnelInfo(this.funnelId);
this.showType ? this.bulletHit = 1 : this.bulletType == d.BulletType.LifeShield && i ? this.leftLife = p.default.instance.aircraftTable.countAtk(this.funnelId, i.level) : i && (this.bulletHit = Math.ceil(c.default.game.playerScript.mainGunHit * p.default.instance.aircraftTable.countAtk(this.funnelId, i.level)));
};
t.prototype.startShoot = function(e) {
void 0 === e && (e = null);
if (!this.isInShoot) {
e && (this.bulletIcon = e);
this.isInShoot = !0;
if (this.bulletType != d.BulletType.LifeShield && !this.isAni) {
this.node.opacity = 255;
this.setShoot();
}
}
};
t.prototype.setShoot = function() {
if (this.bulletType == d.BulletType.BulletLaser) this.laserShoot(); else if (this.bulletType == d.BulletType.LaserCut) this.laserShoot(); else if (this.bulletType == d.BulletType.LifeShield) ; else {
if (this.bulletType == d.BulletType.BulletFollow) this.shootTemp = .5; else if (this.bulletType == d.BulletType.BulletThrough) {
this.shootTemp = .2;
this.bulletNum = 2;
} else this.bulletType == d.BulletType.BulletBoom && (this.shootTemp = .05);
this.shoot();
this.schedule(this.shoot, this.shootTemp, cc.macro.REPEAT_FOREVER);
}
};
t.prototype.shoot = function() {
var e = this.bulletNum, t = this.node.parent.parent.position;
t.x += this.node.parent.x;
if (e % 2 == 1) {
var n = 17 * -Math.floor((e - 1) / 2);
this.setBulletPos(n + t.x, t.y);
for (var o = 1; o < e; o++) this.setBulletPos(n + 17 * o + t.x, t.y + 10);
} else for (n = 17 * -(Math.floor((e - 1) / 2) + 1) + 5, o = 0; o < e; o++) this.setBulletPos(n + 17 * o + 5 + t.x - 3, t.y + 10);
};
t.prototype.laserShoot = function() {
this.lasetBullet && this.lasetBullet.parent && this.lasetBullet.removeFromParent();
var e = this.node.parent.parent.position;
e.x += this.node.parent.x;
var t = s.default.instance.pop(this.bulletType);
this.showType ? this.node.parent.parent.parent.addChild(t) : c.default.game.ballNode.addChild(t);
t.active = !0;
u.default.exactSub(this.bulletHit, Math.floor(this.bulletHit));
t.ECScript.init(this.bulletHit, this.node);
t.ECScript.setIcon(this.bulletIcon);
t.setPosition(e.x, e.y);
this.lasetBullet = t;
};
t.prototype.laserCutShoot = function() {
if (!(this.laserCutBulletNum <= 0)) {
this.laserCutBulletNum--;
var e = this.node.parent.parent.position;
e.x += this.node.parent.x;
var t = s.default.instance.pop(this.bulletType);
t && !t.parent && this.bulletNode.addChild(t);
t.setPosition(e.x, e.y);
t.ECScript.init(this.bulletHit, this);
}
};
t.prototype.addLaserCurNum = function() {
this.laserCutBulletNum++;
};
t.prototype.cancelShoot = function() {
this.isInShoot = !1;
if (this.lasetBullet) {
this.lasetBullet.removeFromParent();
s.default.instance.push(this.lasetBullet);
this.lasetBullet = null;
}
this.bulletType == d.BulletType.LaserCut ? this.unschedule(this.laserCutShoot) : this.unschedule(this.shoot);
};
t.prototype.funnelOut = function() {
this.endTime = u.default.getTime();
this.parent && (this.direction == d.FunnelConnonDirection.LEFT && this.parent.funnelLeftScript && this.uuid == this.parent.funnelLeftScript.uuid ? this.parent.funnelLeftScript = null : this.parent.funnelRightScript && this.uuid == this.parent.funnelRightScript.uuid && (this.parent.funnelRightScript = null));
this.unscheduleAllCallbacks();
this.cancelShoot();
this.outAni();
};
t.prototype.setEndTime = function() {
p.default.instance.aircraftTable.getTime(this.funnelId);
var e = u.default.getTime();
this.endTime = e + 1e3 * Number.MAX_VALUE;
};
t.prototype.dleLife = function(e) {
this.leftLife -= e;
this.leftLife <= 0 && this.funnelOut();
};
t.prototype.setBulletPos = function(e, t) {
var n = s.default.instance.pop(this.bulletType);
n && !n.parent && this.bulletNode.addChild(n);
n.active = !0;
u.default.exactSub(this.bulletHit, Math.floor(this.bulletHit));
n.ECScript.init(this.bulletHit, e);
n.ECScript.setIcon(this.bulletIcon);
n.setPosition(e, t + .5 * this.node.width);
};
t.prototype.setBulletType = function() {
switch (this.funnelId) {
case 302e3:
this.bulletType = d.BulletType.BulletFollow;
break;

case 302001:
this.bulletType = d.BulletType.BulletThrough;
break;

case 302002:
this.bulletType = d.BulletType.BulletBoom;
break;

case 302003:
this.bulletType = d.BulletType.BulletLaser;
break;

case 302004:
this.bulletType = d.BulletType.LaserCut;
break;

case 302005:
this.bulletType = d.BulletType.LifeShield;
break;

default:
this.bulletType = u.default.arrRandom([ d.BulletType.BulletFollow, d.BulletType.BulletLaser, d.BulletType.BulletBoom ]);
}
};
t.prototype.inAni = function() {
var e = this;
this.node.stopAllActions();
var t = cc.sequence(cc.moveTo(.3, cc.v2(0, 0)), cc.callFunc(function() {
return i(e, void 0, void 0, function() {
var e;
return r(this, function(t) {
switch (t.label) {
case 0:
this.isAni = !1;
if (this.bulletType != d.BulletType.LifeShield) return [ 3, 2 ];
e = this;
return [ 4, h.default.instance.playLoopEffect(h.EffectName.Armor, this.node, cc.v2(0, -1.2)) ];

case 1:
e.effect = t.sent();
t.label = 2;

case 2:
if (this.isInShoot) {
this.isInShoot = !1;
this.setEndTime();
this.startShoot();
}
return [ 2 ];
}
});
});
}));
this.node.runAction(t);
};
t.prototype.outAni = function() {
this.isAni = !0;
this.getComponent(cc.Animation).play();
};
a([ m({
type: cc.SpriteAtlas,
tooltip: "炮资源集"
}) ], t.prototype, "connonAtlas", void 0);
return t = a([ y ], t);
}(l.default);
n.default = b;
cc._RF.pop();
}, {
"../../code/Config/Config": "Config",
"../../code/Lib/Global": "Global",
"../../code/manager/EffectManager": "EffectManager",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/NodePoolMananger": "NodePoolMananger",
"../../code/manager/PanelManager": "PanelManager",
"../../code/manager/TableManager": "TableManager",
"./ConnonBase": "ConnonBase"
} ],
GameUI: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "a806cTywOlLcJcuDWy7Qlc7", "GameUI");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
}, i = this && this.__awaiter || function(e, t, n, o) {
function a(e) {
return e instanceof n ? e : new n(function(t) {
t(e);
});
}
return new (n || (n = Promise))(function(n, i) {
function r(e) {
try {
s(o.next(e));
} catch (e) {
i(e);
}
}
function l(e) {
try {
s(o.throw(e));
} catch (e) {
i(e);
}
}
function s(e) {
e.done ? n(e.value) : a(e.value).then(r, l);
}
s((o = o.apply(e, t || [])).next());
});
}, r = this && this.__generator || function(e, t) {
var n, o, a, i, r = {
label: 0,
sent: function() {
if (1 & a[0]) throw a[1];
return a[1];
},
trys: [],
ops: []
};
return i = {
next: l(0),
throw: l(1),
return: l(2)
}, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
return this;
}), i;
function l(e) {
return function(t) {
return s([ e, t ]);
};
}
function s(i) {
if (n) throw new TypeError("Generator is already executing.");
for (;r; ) try {
if (n = 1, o && (a = 2 & i[0] ? o.return : i[0] ? o.throw || ((a = o.return) && a.call(o), 
0) : o.next) && !(a = a.call(o, i[1])).done) return a;
(o = 0, a) && (i = [ 2 & i[0], a.value ]);
switch (i[0]) {
case 0:
case 1:
a = i;
break;

case 4:
r.label++;
return {
value: i[1],
done: !1
};

case 5:
r.label++;
o = i[1];
i = [ 0 ];
continue;

case 7:
i = r.ops.pop();
r.trys.pop();
continue;

default:
if (!(a = r.trys, a = a.length > 0 && a[a.length - 1]) && (6 === i[0] || 2 === i[0])) {
r = 0;
continue;
}
if (3 === i[0] && (!a || i[1] > a[0] && i[1] < a[3])) {
r.label = i[1];
break;
}
if (6 === i[0] && r.label < a[1]) {
r.label = a[1];
a = i;
break;
}
if (a && r.label < a[2]) {
r.label = a[2];
r.ops.push(i);
break;
}
a[2] && r.ops.pop();
r.trys.pop();
continue;
}
i = t.call(e, r);
} catch (e) {
i = [ 6, e ];
o = 0;
} finally {
n = a = 0;
}
if (5 & i[0]) throw i[1];
return {
value: i[0] ? i[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var l = e("../../code/manager/PanelManager"), s = e("../../code/manager/MyRoleDataManager"), c = e("../../code/manager/MissionManger"), u = e("../../code/manager/LoadManager"), d = e("../../code/Lib/LocalStorage"), p = e("../../code/manager/SDKManager"), f = e("../../code/manager/SoundManager"), h = e("../../code/Config/Config"), g = e("../../code/Lib/Global"), y = e("../../code/manager/GuideManager"), m = e("../../code/manager/EffectManager"), b = e("../../code/manager/NodePoolMananger"), v = e("../../code/manager/TableManager"), S = e("../../code/manager/BallManager"), _ = e("../../code/manager/BoxManager"), P = e("../prefab/BoxPrefab"), M = e("../../code/Lib/DateUtils"), L = e("../../code/ads/AdsGroupController"), C = e("../../OffLineSkill"), T = e("../../code/manager/Advert_Manager"), N = e("../../OfflineEarnings"), B = e("../../IsHaveUnlock"), A = e("../../EndlessManagement"), I = e("../../code/manager/Umeng_Manager"), k = e("./Connon"), w = e("../../BuffManager"), O = cc._decorator, R = O.ccclass, x = O.property, G = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.uiInAni = [];
t.uiOutAni = [];
t.handMoveAni = null;
t.scoreLable = null;
t.startLab = null;
t.handSprite = null;
t.levelCompleteNode = null;
t.backGroud = null;
t.maxScoreLable = null;
t.goldLable = null;
t.diamondLable = null;
t.chipLable = null;
t.goldLableAni = null;
t.goldImg = null;
t.backgroundShackAni = null;
t.blackAni = null;
t.middleNode = null;
t.effectPrefabArr = [];
t.effectNode = null;
t.goldLayout = null;
t.goldLayoutLable = null;
t.lifeNode = null;
t.Newincrease = null;
t.lowTopUiNode = null;
t.highTopUiNode = null;
t.downNode = null;
t.singleColor = null;
t.maskNode = null;
t.curLevel = null;
t.nextLevel = null;
t.pro = null;
t.proNode = null;
t.maxscoreLayout = null;
t.levelLable = null;
t.setBtn = null;
t.aircraftBtn = null;
t.refitBtn = null;
t.shopBtn = null;
t.workBtn = null;
t.missionBtn = null;
t.goldBtn = null;
t.diamondBtn = null;
t.chipBtn = null;
t.blueLife = null;
t.redLife = null;
t.currencyIcon = [];
t.flyRewardPrefab = null;
t.iconAtlas = null;
t.boxAtlas = null;
t.redNode = null;
t.missionNode = null;
t.missionIcon = null;
t.missionLabel = null;
t.endlessBtn = null;
t.endlessLabel = null;
t.endlessAdver = null;
t.endlessTimesLabel = null;
t.boxNode = null;
t.boxPrefab = null;
t.boxOpenNode = null;
t.boxSprite = null;
t.boxRewardShowNode = null;
t.rewardNode = null;
t.toastPrefab = null;
t.toastNode = null;
t.toastLabel = null;
t.endlessUnlockLable = null;
t.disCountNode = null;
t.disCountLabel = null;
t.disCountBack = null;
t.closeLoadBtn = null;
t.Bg_Btn = null;
t.Exp_Btn = null;
t.Money_Btn = null;
t.show_type = 9e3;
t.exp_type = 0;
t.buffShow = null;
t.OffLineSkill = null;
t.intensifySkill = null;
t.uiInNodes = [];
t.openLeftSideHurdle = null;
t.HurdleIsOpen = !1;
t.EndlessManager = null;
t.skillBT = null;
t.offLine = null;
t.proTxt = null;
t.OfflineEarnings = null;
t.buffIconAtlas = [];
t.HaveUnlock = null;
t.Connon = null;
t.offlineAndSkillsParent = null;
t.offlineAndSkillsS = [];
t.shou = null;
t.isguide = !1;
t.curEffect = null;
t.isInShack = !1;
t.isInTishi = !1;
return t;
}
t.prototype.onLoad = function() {
return i(this, void 0, void 0, function() {
return r(this, function(e) {
s.default.instance.curLevel >= 3 && (this.shou.active = !1);
if (s.default.instance.curLevel >= 5 || "1" == d.default.getItem("IsOpenOfflineAndSkills", "0")) {
this.offlineAndSkillsParent.opacity = 255;
this.offlineAndSkillsS[0].active = !0;
this.offlineAndSkillsS[1].active = !0;
d.default.saveItem("IsOpenOfflineAndSkills", "1");
} else {
this.offlineAndSkillsParent.opacity = 0;
this.offlineAndSkillsS[0].active = !1;
this.offlineAndSkillsS[1].active = !1;
}
if (s.default.instance.curLevel < 6) {
this.aircraftBtn.interactable = !1;
this.aircraftBtn.node.opacity = 0;
} else {
this.aircraftBtn.interactable = !0;
this.aircraftBtn.node.opacity = 255;
}
if (s.default.instance.curLevel < 11) {
this.refitBtn.interactable = !1;
this.refitBtn.node.opacity = 0;
} else {
this.refitBtn.interactable = !0;
this.refitBtn.node.opacity = 255;
}
if (s.default.instance.curLevel < 16) {
this.endlessBtn.interactable = !1;
this.endlessBtn.node.opacity = 0;
} else {
this.endlessBtn.interactable = !0;
this.endlessBtn.node.opacity = 255;
}
this.OfflineEarnings.UpdateOfflineRevenueInformation();
b.default.instance.addPool(this.flyRewardPrefab);
b.default.instance.addPool(this.toastPrefab);
l.default.initPanel(l.default.PanelStr.gameui, this);
this.setLable();
this.addEvent();
c.default.instance;
return [ 2 ];
});
});
};
t.prototype.start = function() {
if (s.default.instance.isFullScreen) {
this.lowTopUiNode.getComponent(cc.Widget).top = s.default.instance.fringeNum;
this.middleNode.getComponent(cc.Widget).top = s.default.instance.fringeNum;
this.highTopUiNode.getComponent(cc.Widget).top = -120;
}
p.default.instance.onResume();
this.handMoveAni.playAdditive("handMove");
this.handMoveAni.playAdditive("levelScoreChange");
this.setBackGroud();
this.randomBlink();
this.btnTishi();
this.updateEndLessBtnShow();
if (this.discountShow(0)) c.default.instance.init(); else if (y.default.instance.checkCanGuide(10005, 0)) {
this.downNode.getComponent(cc.Widget).updateAlignment();
y.default.instance.startGuide(10005);
} else if (c.default.instance.init() && s.default.instance.curLevel > 1) {
this.downNode.getComponent(cc.Widget).updateAlignment();
y.default.instance.startGuide(10004);
}
};
t.prototype.update = function() {
1 == s.default.instance.gameState && this.setScore(g.default.setNum(s.default.instance.curScore));
if (this.disCountNode.active) {
var e = g.default.getTime(), t = s.default.instance.discountEndTime - e;
t > 0 ? this.disCountLabel.string = M.default.instance.getFormatBySecond(t / 1e3, 1) : this.discountShow();
}
};
t.prototype.addEvent = function() {
var e = this;
this.setBtn.node.on("click", this.setBtnTap, this);
this.aircraftBtn.node.on("click", this.aircraftBtnTap, this);
this.refitBtn.node.on("click", this.refitShopBtnTap, this);
this.workBtn.node.on("click", this.workBtnTap, this);
this.missionBtn.node.on("click", this.missionBtnTap, this);
this.shopBtn.node.on("click", this.shopBtnTAp, this);
this.goldBtn.node.on("click", function() {
e.HurdleIsOpen && e.OpenCloseHurdle();
}, this);
this.diamondBtn.node.on("click", function() {
e.HurdleIsOpen && e.OpenCloseHurdle();
}, this);
this.endlessBtn.node.on("click", this.endlessBtnTap, this);
this.closeLoadBtn.node.on("click", this.closeLoadBtnTap, this);
this.disCountNode.getComponent(cc.Button).node.on("click", this.shopBtnTAp, this);
this.openLeftSideHurdle.node.on("click", this.OpenCloseHurdle, this);
this.Bg_Btn.node.on("click", this.bg_Btn, this);
this.Exp_Btn.node.on("click", this.exp_Btn, this);
this.Money_Btn.node.on("click", this.money_Btn, this);
this.skillBT.node.on("click", function() {
e.HurdleIsOpen && e.OpenCloseHurdle();
}, this);
this.offLine.node.on("click", function() {
e.HurdleIsOpen && e.OpenCloseHurdle();
}, this);
};
t.prototype.OpenCloseHurdle = function() {
if (this.HurdleIsOpen) {
this.HurdleIsOpen = !this.HurdleIsOpen;
cc.tween(this.openLeftSideHurdle.node.parent).to(.3, {
position: cc.v3(0, 0)
}).start();
} else {
this.HurdleIsOpen = !this.HurdleIsOpen;
cc.tween(this.openLeftSideHurdle.node.parent).to(.3, {
position: cc.v3(125, 0)
}).start();
}
};
t.prototype.bg_Btn = function() {
var e = this;
this.show_type++;
var t = u.default.instance.getRes("/mapRes/" + e.show_type, cc.SpriteFrame);
t || (this.show_type = 9e4);
this.backGroud.spriteFrame = t;
this.Bg_Btn.getComponentInChildren(cc.Label).string = "背景" + this.show_type;
};
t.prototype.exp_Btn = function() {
this.exp_type++;
this.exp_type > 3 && (this.exp_type = 0);
this.Exp_Btn.getComponentInChildren(cc.Label).string = [ "原始图", "换图", "换色", "换图色" ][this.exp_type];
};
t.prototype.money_Btn = function() {
s.default.instance.Gold += 1e7;
s.default.instance.Diamond += 1e7;
s.default.instance.Chip += 1e7;
this.goldLable.string = g.default.setNum(s.default.instance.Gold);
this.diamondLable.string = g.default.setNum(s.default.instance.Diamond);
this.chipLable.string = g.default.setNum(s.default.instance.Chip);
};
t.prototype.gameStart = function() {
this.exp_type = 0;
if (0 == s.default.instance.gameType) {
this.exp_type = 4;
if (1 == s.default.instance.curLevel) {
l.default.game.playerScript.propInvincible();
w.default.instance.addBuffShow(5e5, 10, l.default.game.BuffPrefab, this.buffIconAtlas[0], GlobalFun.i18n.t("lable.10269"));
}
}
this.playStartAni();
this.scoreLable.getComponent("MyLable").string = "0";
c.default.instance.itemCollectNum = 0;
this.updateCurGold();
if (c.default.instance.curSpecilMission.pro >= c.default.instance.curSpecilMission.quest || 1 == s.default.instance.gameType) this.missionNode.active = !1; else {
this.missionNode.scale = 1;
this.missionNode.active = !1;
console.log(v.default.instance.propTable.getIcon(c.default.instance.curSpecilMission.collectPropId));
this.missionIcon.spriteFrame = this.iconAtlas.getSpriteFrame(v.default.instance.propTable.getIcon(c.default.instance.curSpecilMission.collectPropId));
this.missionLabel.string = c.default.instance.curSpecilMission.pro + "/" + c.default.instance.curSpecilMission.quest;
}
this.HurdleIsOpen && this.OpenCloseHurdle();
l.default.gameUi.uiOutAni[5].play("uiOut5");
cc.tween(this.uiInNodes[0]).to(.5, {
position: cc.v3(this.uiInNodes[0].x + 300, this.uiInNodes[0].y)
}).start();
cc.tween(this.uiInNodes[1]).to(.5, {
position: cc.v3(this.uiInNodes[1].x - 300, this.uiInNodes[1].y)
}).start();
cc.tween(this.uiInNodes[2]).to(.5, {
position: cc.v3(this.uiInNodes[2].x, this.uiInNodes[2].y - 500)
}).start();
this.playGoldLabAni(0);
var e = cc.moveBy(.1, 0, -99);
l.default.game.Player.runAction(e);
var t = cc.moveBy(.1, 0, -99);
this.backGroud.node.runAction(t);
var n = cc.moveBy(.1, 0, -99);
this.effectNode.runAction(n);
if (0 == s.default.instance.gameType) {
this.proNode.active = !0;
this.curLevel.string = s.default.instance.curLevel.toString();
this.nextLevel.string = (s.default.instance.curLevel + 1).toString();
this.pro.progress = 0;
this.proTxt.string = GlobalFun.i18n.t("lable.10283").replace("%d", 0);
} else 1 == s.default.instance.gameType && (this.proNode.active = !1);
};
t.prototype.handShow = function() {
if (1 != s.default.instance.gameState) {
this.maxscoreLayout.active = !1;
this.levelLable.node.active = !1;
this.handMoveAni.playAdditive("uiIn3");
this.handMoveAni.once("stop", function() {
this.handMoveAni.playAdditive("handMove");
}.bind(this));
}
};
t.prototype.concelHandShow = function() {
if (this.maxscoreLayout.active) this.unschedule(this.handShow); else {
this.handMoveAni.stop("handMove");
this.handMoveAni.play("uiOut3");
}
};
t.prototype.skipResurgence = function() {
l.default.game.endGame(!0);
};
t.prototype.setScore = function(e) {
this.scoreLable.getComponent("MyLable").string = e.toString();
};
t.prototype.setLable = function() {
this.OffLineSkill.setLabel();
this.intensifySkill.setLabel();
this.missionBtn.getComponentInChildren(cc.Label).string = GlobalFun.i18n.t("lable.10113");
this.aircraftBtn.getComponentInChildren(cc.Label).string = GlobalFun.i18n.t("lable.10273");
this.refitBtn.getComponentInChildren(cc.Label).string = GlobalFun.i18n.t("lable.10274");
this.endlessBtn.node.getChildByName("numberLabel").getComponent(cc.Label).string = GlobalFun.i18n.t("lable.10287").replace("%d", d.default.getItem("Endless"));
this.endlessUnlockLable.string = GlobalFun.i18n.t("lable.10232") + " " + GlobalFun.i18n.t("lable.10231").replace("%d", 10);
this.endlessLabel.string = GlobalFun.i18n.t("lable.10237");
this.startLab.string = GlobalFun.i18n.t("lable.10233");
this.maxScoreLable.string = g.default.setNum(s.default.instance.maxScore);
this.levelLable.string = GlobalFun.i18n.t("lable.10231").replace("%d", s.default.instance.curLevel);
this.updataGold();
};
t.prototype.playStartAni = function() {
this.handMoveAni.stop("handMove");
this.playGoldLabAni(0);
for (var e = 0; e < this.uiOutAni.length; e++) {
var t = this.uiOutAni[e];
t && t.play("uiOut" + e);
}
};
t.prototype.playUiInAni = function() {
this.isguide = !1;
l.default.gameUi.HaveUnlock.isHaveUnlock();
this.setLable();
l.default.game.playerScript.setConnonSkin(s.default.instance.curCannonID);
l.default.game.Player.position = cc.v3(376, 605);
this.setBackGroud();
S.default.instance.clearAllBallBullet();
this.backGroud.node.y = 140;
this.handSprite.node.x = -141;
this.goldLayout.node.stopAllActions();
this.maxscoreLayout.active = !1;
this.handMoveAni.setCurrentTime(1, "levelScoreChange");
this.maxscoreLayout.getChildByName("New Sprite").opacity = 0;
this.maxscoreLayout.getChildByName("maxScoreLable").opacity = 0;
this.unscheduleAllCallbacks();
this.randomBlink();
this.goldLableAni.stop("goldLableBig");
this.playGoldLabAni(1);
this.updataGold();
this.updateEndLessBtnShow();
this.discountShow();
for (var e = 0; e < this.uiInAni.length; e++) {
var t = this.uiInAni[e];
t && t.play("uiIn" + e);
}
cc.tween(this.uiInNodes[0]).to(.5, {
position: cc.v3(this.uiInNodes[0].x - 300, this.uiInNodes[0].y)
}).start();
cc.tween(this.uiInNodes[1]).to(.5, {
position: cc.v3(this.uiInNodes[1].x + 300, this.uiInNodes[1].y)
}).start();
cc.tween(this.uiInNodes[2]).to(.5, {
position: cc.v3(this.uiInNodes[2].x, this.uiInNodes[2].y + 500)
}).start();
this.btnTishi();
s.default.instance.gameState = 8;
this.schedule(function() {
s.default.instance.curLevel >= 3 && (this.shou.active = !1);
if (s.default.instance.curLevel >= 16 && (y.default.instance.checkCanGuide(10003, 0) || y.default.instance.checkCanGuide(10003, 1) || !y.default.instance.getEndlessState(10003))) {
this.isguide = !0;
this.endlessBtn.interactable = !0;
this.endlessBtn.node.opacity = 255;
y.default.instance.startGuide(10003);
}
if (s.default.instance.isFromComplete) {
s.default.instance.isFromComplete = !1;
if (6 == s.default.instance.curLevel && (y.default.instance.checkCanGuide(10001, 0) || y.default.instance.checkCanGuide(10001, 1) || y.default.instance.checkCanGuide(10001, 2) || !y.default.instance.getEndlessState(10001))) {
this.isguide = !0;
l.default.gameUi.aircraftBtn.interactable = !0;
l.default.gameUi.aircraftBtn.node.opacity = 255;
this.scheduleOnce(function() {
y.default.instance.startGuide(10001);
}, 1);
}
if (11 == s.default.instance.curLevel && (y.default.instance.checkCanGuide(10002, 0) || !y.default.instance.getEndlessState(10002))) {
this.isguide = !0;
l.default.gameUi.refitBtn.interactable = !0;
l.default.gameUi.refitBtn.node.opacity = 255;
this.scheduleOnce(function() {
y.default.instance.startGuide(10002);
}, 1);
}
this.isguide || (s.default.instance.gameState = 0);
} else s.default.instance.gameState = 0;
this.handMoveAni.playAdditive("handMove");
this.handMoveAni.playAdditive("levelScoreChange");
}, .5, 0);
};
t.prototype.btnTishi = function() {
this.missionBtn.node.getChildByName("tishi").active = !!c.default.instance.getCompleteMission(2);
this.workBtn.node.getChildByName("tishi").active = s.default.instance.workCanUp();
this.aircraftBtn.node.getChildByName("tishi").active = s.default.instance.aircraftCanUp();
};
t.prototype.setBackGroud = function() {
return i(this, void 0, void 0, function() {
var e, t, n, o;
return r(this, function(a) {
switch (a.label) {
case 0:
e = [ "90000", "90001", "90002", "90003", "90004" ];
t = g.default.arrRandom(e);
s.default.instance.curScenceID = Number(t) - 7e4;
return (n = u.default.instance.getRes("/mapRes/" + t, cc.SpriteFrame)) ? [ 3, 2 ] : [ 4, u.default.instance.loadRes(t, cc.SpriteFrame) ];

case 1:
a.sent();
n = u.default.instance.getRes(t, cc.SpriteFrame);
a.label = 2;

case 2:
if (n) {
this.backGroud.spriteFrame = n;
d.default.saveItem("curScenceID", s.default.instance.curScenceID.toString());
}
if (this.curEffect) {
o = this.curEffect;
this.curEffect = null;
o.removeFromParent(!1);
o.destroy();
}
return [ 2 ];
}
});
});
};
t.prototype.updataGold = function(e) {
void 0 === e && (e = null);
if (e == h.CurrencyType.Gold) this.goldLable.string = g.default.setNum(s.default.instance.Gold); else if (e == h.CurrencyType.Diamond) this.diamondLable.string = g.default.setNum(s.default.instance.Diamond); else {
this.goldLable.string = g.default.setNum(s.default.instance.Gold);
this.diamondLable.string = g.default.setNum(s.default.instance.Diamond);
this.chipLable.string = g.default.setNum(s.default.instance.Chip);
}
};
t.prototype.updateCurGold = function() {
this.goldLayoutLable.string = g.default.setNum(s.default.instance.curGold);
};
t.prototype.playGoldLabAni = function(e) {
switch (e) {
case 0:
this.goldLayout.node.stopAllActions();
this.lifeNode.stopAllActions();
this.Newincrease.stopAllActions();
var t = cc.moveTo(.25, 375, -25), n = cc.moveTo(.25, -375, 0), o = cc.moveTo(.25, 120, -1100);
this.goldLayout.node.runAction(t);
this.lifeNode.runAction(n);
this.Newincrease.runAction(o);
break;

case 1:
this.goldLayout.node.stopAllActions();
this.lifeNode.stopAllActions();
this.Newincrease.stopAllActions();
var a = cc.moveTo(.25, cc.v2(375, 200)), i = cc.moveTo(.25, cc.v2(-375, 200)), r = cc.moveTo(.25, cc.v2(600, -1100));
this.goldLayout.node.runAction(a);
this.lifeNode.runAction(i);
this.Newincrease.runAction(r);
}
};
t.prototype.playBigComplete = function() {
this.unschedule(this.playGoldLabAni.bind(this, 1));
this.schedule(this.playGoldLabAni.bind(this, 1), 5, 0);
};
t.prototype.moveGoldToLable = function(e) {
var t = this.goldImg.node.parent.convertToWorldSpaceAR(this.goldImg.node.position), n = cc.sequence(cc.spawn(cc.moveTo(.5, t.x, t.y + 100), cc.scaleTo(.5, .3)), cc.callFunc(function() {
e.ECScript.remove.bind(e.ECScript)();
this.updateCurGold();
}, this));
e.runAction(n);
};
t.prototype.movePropToLable = function(e) {
var t = this, n = g.default.convertNodePosToTargetNodePos(this.missionIcon.node, l.default.game.ballNode), o = cc.sequence(cc.spawn(cc.moveTo(.5, n.x, n.y), cc.scaleTo(.5, .3)), cc.callFunc(function() {
e.removeFromParent();
b.default.instance.push(e);
t.missionLabel.string = c.default.instance.curSpecilMission.pro + "/" + c.default.instance.curSpecilMission.quest;
if (c.default.instance.curSpecilMission.pro >= c.default.instance.curSpecilMission.quest) {
var n = cc.sequence(cc.scaleTo(.5, 1.3).easing(cc.easeQuarticActionOut()), cc.scaleTo(.3, 0), cc.callFunc(function() {
t.missionNode.active = !1;
}));
t.missionNode.runAction(n);
}
}));
e.runAction(o);
};
t.prototype.openMask = function(e) {
void 0 === e && (e = !1);
this.maskNode.active = e;
e || (this.closeLoadBtn.node.active = !1);
};
t.prototype.showCancelLoadBtn = function() {
this.closeLoadBtn.node.active = !0;
};
t.prototype.closeLoadBtnTap = function() {
L.default.instance.cancelWaitAdsReady();
};
t.prototype.backGroudShack = function(e) {
var t = this;
if (!this.isInShack) {
this.backgroundShackAni.once("stop", function() {
t.isInShack = !1;
}, this);
this.isInShack = !0;
this.backgroundShackAni.play("backGroudShack" + e);
}
};
t.prototype.beBlack = function() {
this.blackAni.play("black");
};
t.prototype.updateLife = function(e, t) {
var n = this;
if (e == t) {
this.redLife.unscheduleAllCallbacks();
this.blueLife.node.width = 136;
this.redLife.node.width = 136;
} else {
var o = e / t * 136;
o = o < 0 ? 0 : o;
this.blueLife.node.width = o;
this.redLife.unscheduleAllCallbacks();
var a = this.redLife.node.width, i = (o - a) / 20;
this.redLife.schedule(function() {
if (i >= 0 && n.redLife.node.width >= n.blueLife.node.width || i < 0 && n.redLife.node.width <= n.blueLife.node.width) {
n.redLife.node.width = o;
n.redLife.unscheduleAllCallbacks();
} else {
var e = n.redLife.node.width + i;
n.redLife.node.width = e < 0 ? 0 : e;
}
}, .001, cc.macro.REPEAT_FOREVER);
}
};
t.prototype.redBlink = function() {
var e = this;
this.redNode.active = !0;
this.redNode.opacity = 255;
this.redNode.getComponent(cc.Animation).playAdditive("redBlink", 0);
this.redNode.getComponent(cc.Animation).once("stop", function() {
e.redNode.active = !1;
});
};
t.prototype.boxRefresh = function() {
for (var e = this.boxNode.children.length, t = 0; t < e; t++) {
var n = this.boxNode.children[t], o = _.default.instance.getBoxDataByIndex(t);
n.getComponent(P.default).init(o);
}
};
t.prototype.randomBlink = function() {
var e = g.default.arrRandom([ 0, 1, 2 ]);
m.default.instance.playEffect(m.EffectName.BlickEffect, this.currencyIcon[e], cc.v2(0, 0), null, [ "blinkChip", "blinkDiamond", "blinkGold" ][e]);
var t = 4 * Math.random() + 1;
this.scheduleOnce(this.randomBlink.bind(this), t);
};
t.prototype.endlessBtnTap = function() {
if (8 != s.default.instance.gameState) {
this.HurdleIsOpen && this.OpenCloseHurdle();
y.default.instance.get_isInGuide() && I.default.instance.putPoint(I.Point_EventID.ClickButton_endlessBtn);
if (Number(d.default.getItem("Endless")) <= 0) {
I.default.instance.putPoint(I.Point_EventID.endless_Click_num);
T.default.instance.show_Ad(T.Adver_Type.ReWardVideo_Adv, function(e) {
f.default.playSoundEffect(f.default.btnSound);
l.default.instance.openPanel(h.PanelName.SkinPanel, this.middleNode);
l.default.gameUi.EndlessManager.useOnceEndless(1);
}.bind(this));
} else {
f.default.playSoundEffect(f.default.btnSound);
l.default.instance.openPanel(h.PanelName.SkinPanel, this.middleNode);
}
}
};
t.prototype.setBtnTap = function() {
f.default.playSoundEffect(f.default.btnSound);
l.default.instance.openPanel(h.PanelName.SetPanel, this.middleNode);
};
t.prototype.aircraftBtnTap = function() {
if (8 != s.default.instance.gameState) {
y.default.instance.get_isInGuide() && I.default.instance.putPoint(I.Point_EventID.ClickButton_aircraftBtn);
l.default.instance.openPanel(h.PanelName.AircraftPanel, this.middleNode);
this.HurdleIsOpen && this.OpenCloseHurdle();
f.default.playSoundEffect(f.default.clickAircraft);
}
};
t.prototype.refitShopBtnTap = function() {
if (8 != s.default.instance.gameState) {
this.HurdleIsOpen && this.OpenCloseHurdle();
f.default.playSoundEffect(f.default.clickModifiedshop);
l.default.instance.openPanel(h.PanelName.RefitShopPanel, this.middleNode, 0);
}
};
t.prototype.shopBtnTAp = function(e) {
void 0 === e && (e = h.CurrencyType.Diamond);
f.default.playSoundEffect(f.default.btnSound);
l.default.instance.openPanel(h.PanelName.ShopPanel, this.middleNode, e);
};
t.prototype.workBtnTap = function() {
f.default.playSoundEffect(f.default.clickWorkShop);
l.default.instance.openPanel(h.PanelName.WorkShopPanel, this.middleNode);
};
t.prototype.missionBtnTap = function() {
f.default.playSoundEffect(f.default.btnSound);
l.default.instance.openPanel(h.PanelName.MissionPanel, this.middleNode);
};
t.prototype.noAdsBtnTap = function() {
return i(this, void 0, void 0, function() {
return r(this, function(e) {
f.default.playSoundEffect(f.default.btnSound);
this.backGroud.spriteFrame = this.singleColor;
this.curEffect.removeFromParent();
return [ 2 ];
});
});
};
t.prototype.orderBtnTap = function() {
if (cc.sys.platform == cc.sys.IPHONE || cc.sys.platform == cc.sys.IPAD) {
l.default.gameUi.openMask(!0);
p.default.instance.startRestore();
}
};
t.prototype.showToast = function(e, t, n, o) {
var a = b.default.instance.pop(this.toastPrefab.name);
if (a) {
a.getChildByName("firstLabel").getComponent(cc.Label).string = "+" + e;
a.getChildByName("secLabel").getComponent(cc.Label).string = t;
o.addChild(a);
a.position = n;
a.opacity = 255;
var i = cc.sequence(cc.moveBy(.5, cc.v2(0, -50)), cc.fadeOut(.5), cc.callFunc(function() {
a.removeFromParent();
a.stopAllActions();
b.default.instance.push(a);
}));
a.runAction(i);
}
};
t.prototype.showTishi = function(e) {
var t = this;
if (!this.isInTishi) {
this.isInTishi = !0;
this.toastNode.active = !0;
this.toastLabel.string = e;
this.toastNode.getComponent(cc.Animation).playAdditive("toastShow");
this.toastNode.getComponent(cc.Animation).once("stop", function() {
t.isInTishi = !1;
t.toastNode.active = !1;
});
}
};
t.prototype.getTextTween = function(e, t, n, o, a) {
void 0 === n && (n = 0);
void 0 === o && (o = .02);
void 0 === a && (a = .3);
var i = 0, r = this.getScrollingTimes(t.toString());
o = a / r;
var l = Math.round((t - n) / r);
0 == l && (l = 1);
l = 0 == l ? 1 : l;
var s = 0;
this.schedule(function() {
if ((i += l) >= t - n) {
i = t - n;
this.node.stopAllActions();
}
s++;
e.string = g.default.setNum(n + i);
s != r + 1 && s != r || (e.string = g.default.setNum(t) + "");
}, o, r);
};
t.prototype.getScrollingTimes = function(e) {
var t = 1, n = e.length;
n <= 2 ? t = 1 : n > 2 && n <= 5 ? t = 30 : n > 5 && n <= 9 && (t = 20);
return t;
};
t.prototype.updateEndLessBtnShow = function() {
var e = Number(d.default.getItem("Endless"));
if (e <= 0) {
this.endlessAdver.node.active = !0;
this.endlessTimesLabel.node.active = !1;
} else {
this.endlessAdver.node.active = !1;
this.endlessTimesLabel.node.active = !0;
}
this.endlessTimesLabel.string = e.toString() + "次";
};
t.prototype.discountShow = function(e) {
var t = this;
void 0 === e && (e = 1);
var n = s.default.instance.isHaveDiscount();
if (0 == e && 2 == n) {
this.disCountBack.active = !0;
this.disCountNode.active = !0;
this.disCountNode.scale = 0;
this.disCountBack.opacity = 0;
this.disCountNode.setPosition(cc.v2(0, 0));
this.disCountNode.scale = 0;
this.disCountNode.getComponent(cc.Button).enabled = !1;
this.disCountLabel.node.scale = 0;
var o = cc.sequence(cc.scaleTo(1, 2, 2), cc.callFunc(function() {
t.disCountBack.once("touchstart", function() {
var e = s.default.instance.isFullScreen ? .5 * t.middleNode.height - 177 - s.default.instance.fringeNum : .5 * t.middleNode.height - 177, n = cc.sequence(cc.spawn(cc.moveTo(.5, 302, e), cc.scaleTo(.5, 1)), cc.callFunc(function() {
t.disCountNode.getComponent(cc.Button).enabled = !0;
var e = cc.scaleTo(.5, 1);
t.disCountLabel.node.runAction(e);
t.disCountBack.active = !1;
}));
t.disCountNode.runAction(n);
var o = cc.fadeOut(.4);
t.disCountBack.runAction(o);
});
}), cc.delayTime(2), cc.callFunc(function() {
t.disCountBack.emit("touchstart");
}));
this.disCountNode.runAction(o);
var a = cc.fadeIn(.4);
this.disCountBack.runAction(a);
return !0;
}
this.disCountNode.active = !!n;
this.middleNode.getComponent(cc.Widget).updateAlignment();
this.disCountNode.setPosition(302, .5 * this.middleNode.height - 177);
return !1;
};
a([ x([ cc.Animation ]) ], t.prototype, "uiInAni", void 0);
a([ x([ cc.Animation ]) ], t.prototype, "uiOutAni", void 0);
a([ x(cc.Animation) ], t.prototype, "handMoveAni", void 0);
a([ x(cc.Node) ], t.prototype, "scoreLable", void 0);
a([ x(cc.Label) ], t.prototype, "startLab", void 0);
a([ x(cc.Sprite) ], t.prototype, "handSprite", void 0);
a([ x(cc.Node) ], t.prototype, "levelCompleteNode", void 0);
a([ x(cc.Sprite) ], t.prototype, "backGroud", void 0);
a([ x(cc.Label) ], t.prototype, "maxScoreLable", void 0);
a([ x({
type: cc.Label,
tooltip: "游戏币lable"
}) ], t.prototype, "goldLable", void 0);
a([ x({
type: cc.Label,
tooltip: "钻石lable"
}) ], t.prototype, "diamondLable", void 0);
a([ x({
type: cc.Label,
tooltip: "芯片lable"
}) ], t.prototype, "chipLable", void 0);
a([ x(cc.Animation) ], t.prototype, "goldLableAni", void 0);
a([ x(cc.Sprite) ], t.prototype, "goldImg", void 0);
a([ x(cc.Animation) ], t.prototype, "backgroundShackAni", void 0);
a([ x(cc.Animation) ], t.prototype, "blackAni", void 0);
a([ x(cc.Node) ], t.prototype, "middleNode", void 0);
a([ x([ cc.Prefab ]) ], t.prototype, "effectPrefabArr", void 0);
a([ x(cc.Node) ], t.prototype, "effectNode", void 0);
a([ x(cc.Layout) ], t.prototype, "goldLayout", void 0);
a([ x({
type: cc.Label,
tooltip: "游戏币lable"
}) ], t.prototype, "goldLayoutLable", void 0);
a([ x({
type: cc.Node,
tooltip: "生命值node"
}) ], t.prototype, "lifeNode", void 0);
a([ x({
type: cc.Node,
tooltip: "终极技能"
}) ], t.prototype, "Newincrease", void 0);
a([ x({
type: cc.Node,
tooltip: "低层级靠上节点"
}) ], t.prototype, "lowTopUiNode", void 0);
a([ x({
type: cc.Node,
tooltip: "高层级靠上节点"
}) ], t.prototype, "highTopUiNode", void 0);
a([ x({
type: cc.Node,
tooltip: "靠下节点"
}) ], t.prototype, "downNode", void 0);
a([ x(cc.SpriteFrame) ], t.prototype, "singleColor", void 0);
a([ x(cc.Node) ], t.prototype, "maskNode", void 0);
a([ x(cc.Label) ], t.prototype, "curLevel", void 0);
a([ x(cc.Label) ], t.prototype, "nextLevel", void 0);
a([ x(cc.ProgressBar) ], t.prototype, "pro", void 0);
a([ x({
type: cc.Node,
tooltip: "进度条节点"
}) ], t.prototype, "proNode", void 0);
a([ x(cc.Node) ], t.prototype, "maxscoreLayout", void 0);
a([ x(cc.Label) ], t.prototype, "levelLable", void 0);
a([ x({
type: cc.Button,
tooltip: "设置按钮"
}) ], t.prototype, "setBtn", void 0);
a([ x({
type: cc.Button,
tooltip: "飞行器按钮"
}) ], t.prototype, "aircraftBtn", void 0);
a([ x({
type: cc.Button,
tooltip: "改装按钮"
}) ], t.prototype, "refitBtn", void 0);
a([ x({
type: cc.Button,
tooltip: "商店按钮"
}) ], t.prototype, "shopBtn", void 0);
a([ x({
type: cc.Button,
tooltip: "技能升级按钮"
}) ], t.prototype, "workBtn", void 0);
a([ x({
type: cc.Button,
tooltip: "任务按钮"
}) ], t.prototype, "missionBtn", void 0);
a([ x({
type: cc.Button,
tooltip: "金币按钮"
}) ], t.prototype, "goldBtn", void 0);
a([ x({
type: cc.Button,
tooltip: "钻石按钮"
}) ], t.prototype, "diamondBtn", void 0);
a([ x({
type: cc.Button,
tooltip: "芯片按钮"
}) ], t.prototype, "chipBtn", void 0);
a([ x({
type: cc.Sprite,
tooltip: "绿色生命值"
}) ], t.prototype, "blueLife", void 0);
a([ x({
type: cc.Mask,
tooltip: "红色生命值"
}) ], t.prototype, "redLife", void 0);
a([ x({
type: [ cc.Node ],
tooltip: "钱icon"
}) ], t.prototype, "currencyIcon", void 0);
a([ x({
type: cc.Prefab,
tooltip: "奖励飞预制体"
}) ], t.prototype, "flyRewardPrefab", void 0);
a([ x({
type: cc.SpriteAtlas,
tooltip: "icon资源"
}) ], t.prototype, "iconAtlas", void 0);
a([ x({
type: cc.SpriteAtlas,
tooltip: "icon资源"
}) ], t.prototype, "boxAtlas", void 0);
a([ x({
type: cc.Node,
tooltip: "红色闪烁节点"
}) ], t.prototype, "redNode", void 0);
a([ x({
type: cc.Node,
tooltip: "任务节点"
}) ], t.prototype, "missionNode", void 0);
a([ x({
type: cc.Sprite,
tooltip: "任务icon节点"
}) ], t.prototype, "missionIcon", void 0);
a([ x({
type: cc.Label,
tooltip: "任务进度label"
}) ], t.prototype, "missionLabel", void 0);
a([ x({
type: cc.Button,
tooltip: "无尽按钮"
}) ], t.prototype, "endlessBtn", void 0);
a([ x({
type: cc.Label,
tooltip: "无尽按钮label"
}) ], t.prototype, "endlessLabel", void 0);
a([ x({
type: cc.Sprite,
tooltip: "无尽按钮广告图"
}) ], t.prototype, "endlessAdver", void 0);
a([ x({
type: cc.Label,
tooltip: "无尽挑战次数"
}) ], t.prototype, "endlessTimesLabel", void 0);
a([ x({
type: cc.Node,
tooltip: "宝箱节点"
}) ], t.prototype, "boxNode", void 0);
a([ x({
type: cc.Prefab,
tooltip: "宝箱预制体"
}) ], t.prototype, "boxPrefab", void 0);
a([ x({
type: cc.Node,
tooltip: "宝箱打开节点"
}) ], t.prototype, "boxOpenNode", void 0);
a([ x({
type: cc.Sprite,
tooltip: "宝箱图片"
}) ], t.prototype, "boxSprite", void 0);
a([ x({
type: cc.Node,
tooltip: "宝箱奖励出现节点"
}) ], t.prototype, "boxRewardShowNode", void 0);
a([ x({
type: cc.Node,
tooltip: "奖励节点"
}) ], t.prototype, "rewardNode", void 0);
a([ x({
type: cc.Prefab,
tooltip: "飘字预制体"
}) ], t.prototype, "toastPrefab", void 0);
a([ x({
type: cc.Node,
tooltip: "提示节点"
}) ], t.prototype, "toastNode", void 0);
a([ x({
type: cc.Label,
tooltip: "提示文本"
}) ], t.prototype, "toastLabel", void 0);
a([ x({
type: cc.Label,
tooltip: "无尽解锁文本"
}) ], t.prototype, "endlessUnlockLable", void 0);
a([ x({
type: cc.Node,
tooltip: "打折节点"
}) ], t.prototype, "disCountNode", void 0);
a([ x({
type: cc.Label,
tooltip: "打折倒计时"
}) ], t.prototype, "disCountLabel", void 0);
a([ x({
type: cc.Node,
tooltip: "打折背景"
}) ], t.prototype, "disCountBack", void 0);
a([ x({
type: cc.Button,
tooltip: "取消加载广告按钮"
}) ], t.prototype, "closeLoadBtn", void 0);
a([ x({
type: cc.Button,
tooltip: "更换背景类型 测试"
}) ], t.prototype, "Bg_Btn", void 0);
a([ x({
type: cc.Button,
tooltip: "更换表情类型 测试"
}) ], t.prototype, "Exp_Btn", void 0);
a([ x({
type: cc.Button,
tooltip: "加钱 测试"
}) ], t.prototype, "Money_Btn", void 0);
a([ x({
type: cc.Integer,
tooltip: "更换背景类型 测试"
}) ], t.prototype, "show_type", void 0);
a([ x({
type: cc.Integer,
tooltip: "表情类型 测试"
}) ], t.prototype, "exp_type", void 0);
a([ x({
type: cc.Node,
tooltip: "球类型"
}) ], t.prototype, "buffShow", void 0);
a([ x({
type: C.default,
tooltip: "离线技能"
}) ], t.prototype, "OffLineSkill", void 0);
a([ x({
type: C.default,
tooltip: "强化技能"
}) ], t.prototype, "intensifySkill", void 0);
a([ x([ cc.Node ]) ], t.prototype, "uiInNodes", void 0);
a([ x(cc.Button) ], t.prototype, "openLeftSideHurdle", void 0);
a([ x(A.default) ], t.prototype, "EndlessManager", void 0);
a([ x({
type: cc.Button,
tooltip: "强化技能按钮"
}) ], t.prototype, "skillBT", void 0);
a([ x({
type: cc.Button,
tooltip: "离线技能按钮"
}) ], t.prototype, "offLine", void 0);
a([ x(cc.Label) ], t.prototype, "proTxt", void 0);
a([ x(N.default) ], t.prototype, "OfflineEarnings", void 0);
a([ x({
type: [ cc.SpriteFrame ],
tooltip: "buff icon资源"
}) ], t.prototype, "buffIconAtlas", void 0);
a([ x({
type: B.default,
tooltip: "判断是否有可解锁的炮，并更新提示图标显示的类"
}) ], t.prototype, "HaveUnlock", void 0);
a([ x({
type: k.default,
tooltip: "炮"
}) ], t.prototype, "Connon", void 0);
a([ x({
type: cc.Node,
tooltip: "离线技能强化和的攻击强化父节点"
}) ], t.prototype, "offlineAndSkillsParent", void 0);
a([ x({
type: [ cc.Node ],
tooltip: "离线技能强化和的攻击强化"
}) ], t.prototype, "offlineAndSkillsS", void 0);
a([ x({
type: cc.Node,
tooltip: "手"
}) ], t.prototype, "shou", void 0);
return t = a([ R ], t);
}(cc.Component);
n.default = G;
cc._RF.pop();
}, {
"../../BuffManager": "BuffManager",
"../../EndlessManagement": "EndlessManagement",
"../../IsHaveUnlock": "IsHaveUnlock",
"../../OffLineSkill": "OffLineSkill",
"../../OfflineEarnings": "OfflineEarnings",
"../../code/Config/Config": "Config",
"../../code/Lib/DateUtils": "DateUtils",
"../../code/Lib/Global": "Global",
"../../code/Lib/LocalStorage": "LocalStorage",
"../../code/ads/AdsGroupController": "AdsGroupController",
"../../code/manager/Advert_Manager": "Advert_Manager",
"../../code/manager/BallManager": "BallManager",
"../../code/manager/BoxManager": "BoxManager",
"../../code/manager/EffectManager": "EffectManager",
"../../code/manager/GuideManager": "GuideManager",
"../../code/manager/LoadManager": "LoadManager",
"../../code/manager/MissionManger": "MissionManger",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/NodePoolMananger": "NodePoolMananger",
"../../code/manager/PanelManager": "PanelManager",
"../../code/manager/SDKManager": "SDKManager",
"../../code/manager/SoundManager": "SoundManager",
"../../code/manager/TableManager": "TableManager",
"../../code/manager/Umeng_Manager": "Umeng_Manager",
"../prefab/BoxPrefab": "BoxPrefab",
"./Connon": "Connon"
} ],
Game: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ffe53b0itZK+oNT6j9xUSbg", "Game");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
}, i = this && this.__awaiter || function(e, t, n, o) {
function a(e) {
return e instanceof n ? e : new n(function(t) {
t(e);
});
}
return new (n || (n = Promise))(function(n, i) {
function r(e) {
try {
s(o.next(e));
} catch (e) {
i(e);
}
}
function l(e) {
try {
s(o.throw(e));
} catch (e) {
i(e);
}
}
function s(e) {
e.done ? n(e.value) : a(e.value).then(r, l);
}
s((o = o.apply(e, t || [])).next());
});
}, r = this && this.__generator || function(e, t) {
var n, o, a, i, r = {
label: 0,
sent: function() {
if (1 & a[0]) throw a[1];
return a[1];
},
trys: [],
ops: []
};
return i = {
next: l(0),
throw: l(1),
return: l(2)
}, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
return this;
}), i;
function l(e) {
return function(t) {
return s([ e, t ]);
};
}
function s(i) {
if (n) throw new TypeError("Generator is already executing.");
for (;r; ) try {
if (n = 1, o && (a = 2 & i[0] ? o.return : i[0] ? o.throw || ((a = o.return) && a.call(o), 
0) : o.next) && !(a = a.call(o, i[1])).done) return a;
(o = 0, a) && (i = [ 2 & i[0], a.value ]);
switch (i[0]) {
case 0:
case 1:
a = i;
break;

case 4:
r.label++;
return {
value: i[1],
done: !1
};

case 5:
r.label++;
o = i[1];
i = [ 0 ];
continue;

case 7:
i = r.ops.pop();
r.trys.pop();
continue;

default:
if (!(a = r.trys, a = a.length > 0 && a[a.length - 1]) && (6 === i[0] || 2 === i[0])) {
r = 0;
continue;
}
if (3 === i[0] && (!a || i[1] > a[0] && i[1] < a[3])) {
r.label = i[1];
break;
}
if (6 === i[0] && r.label < a[1]) {
r.label = a[1];
a = i;
break;
}
if (a && r.label < a[2]) {
r.label = a[2];
r.ops.push(i);
break;
}
a[2] && r.ops.pop();
r.trys.pop();
continue;
}
i = t.call(e, r);
} catch (e) {
i = [ 6, e ];
o = 0;
} finally {
n = a = 0;
}
if (5 & i[0]) throw i[1];
return {
value: i[0] ? i[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var l = e("../../code/basecode/EasyGetCompleteClass"), s = e("../../code/manager/BallManager"), c = e("../../code/manager/NodePoolMananger"), u = e("../../code/manager/MyRoleDataManager"), d = e("../../code/manager/PanelManager"), p = e("../../code/manager/MissionManger"), f = e("../../code/manager/TableManager"), h = e("../../code/manager/SDKManager"), g = e("../../code/Config/Config"), y = e("../../code/manager/SoundManager"), m = e("./Connon"), b = e("../../code/Lib/Global"), v = e("../../code/Lib/TimeCount"), S = e("../../code/Lib/LocalStorage"), _ = e("../../code/manager/EffectManager"), P = e("../prefab/SpeciaLaser"), M = e("../prefab/SpeedLowPrefab"), L = e("../../BuffManager"), C = e("../../code/manager/Umeng_Manager"), T = cc._decorator, N = T.ccclass, B = T.property, A = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.bulletPrefabArr = [];
t.funnelPrefabArr = [];
t.ballNode = null;
t.bulletNode = null;
t.Player = null;
t.wall = null;
t.frozen = null;
t.ballPreArr = [];
t.coinPre = null;
t.connonPrefab = null;
t.boomPrefab = null;
t.funnulBommPrefab = null;
t.smokePrefab = null;
t.bloodPrefab = null;
t.coinNumPrefab = null;
t.completeEffect = null;
t.propPrefab = null;
t.showPrefab = null;
t.ballSpriteAtlas = null;
t.ballSpriteAtlas1 = null;
t.specialLaser = null;
t.speedLow = null;
t.BuffPrefab = null;
t.iconAtlas = null;
t.playerScript = null;
t.resurgenceTimes = 0;
t.failedTimes = 0;
t.lastTime = 0;
t.isInPaused = !1;
t.boll = !0;
t.maxNum = 20;
t.curNum = 0;
t.connonArr = [];
t.laserSpecialFun = null;
t.speedLowMap = new Map();
return t;
}
t.prototype.onLoad = function() {
return i(this, void 0, void 0, function() {
var e, t;
return r(this, function(n) {
this.EasyGetCompleteClassInit();
this.changePhysicsEnabled(!0, !0);
cc.director.getPhysicsManager().gravity = cc.v2(0, -640);
this.playerScript = this.Player.getComponent("Connon");
d.default.initPanel(d.default.PanelStr.game, this);
c.default.instance.addPool(this.coinPre);
c.default.instance.addPool(this.boomPrefab);
c.default.instance.addPool(this.smokePrefab);
c.default.instance.addPool(this.bloodPrefab);
c.default.instance.addPool(this.coinNumPrefab);
c.default.instance.addPool(this.completeEffect);
c.default.instance.addPool(this.propPrefab);
c.default.instance.addPool(this.showPrefab);
c.default.instance.addPool(this.funnulBommPrefab);
c.default.instance.addPool(this.connonPrefab);
c.default.instance.addPool(this.specialLaser);
c.default.instance.addPool(this.speedLow);
for (e = 0, t = this.bulletPrefabArr.length; e < t; e++) c.default.instance.addPool(this.bulletPrefabArr[e]);
for (e = 0, t = this.funnelPrefabArr.length; e < t; e++) c.default.instance.addPool(this.funnelPrefabArr[e]);
this.node.on("touchstart", this.onTouchBegin, this);
this.node.on("touchmove", this.onTouchMove, this);
this.node.on("touchend", this.onTouchEnd, this);
return [ 2 ];
});
});
};
t.prototype.start = function() {
this.schedule(function() {
S.default.saveItem("offLine", b.default.getTime().toString());
}, 1);
this.playerScript.setConnonSkin(u.default.instance.curCannonID);
s.default.instance.init(this.ballPreArr, this.ballNode, this.BuffPrefab, this.iconAtlas);
s.default.instance.checkBallPos();
};
t.prototype.update = function() {
if (2 == u.default.instance.gameState) {
h.default.instance.phoneLongShack();
this.endGame(!1);
}
s.default.instance.checkBallPos();
if (this.Player.x >= this.endX - .5 * this.playerScript.maxSpeed && this.Player.x <= this.endX + .5 * this.playerScript.maxSpeed || !u.default.instance.checkGameState([ 1 ])) this.playerScript.curSpeed = 0; else {
this.playerScript.curSpeed += this.playerScript.curASpeed;
this.playerScript.curSpeed = 1 != this.playerScript.speedTemp ? this.playerScript.curSpeed / Math.abs(this.playerScript.curSpeed) * 5 : this.playerScript.curSpeed;
this.playerScript.curSpeed;
var e = this.playerScript.curSpeed;
if (e) {
var t = e / Math.abs(e);
this.playerScript.curSpeed = Math.abs(e) >= this.playerScript.maxSpeed ? this.playerScript.maxSpeed * t : e;
if (Math.abs(this.endX - this.Player.x) < 5) {
this.Player.x += Math.abs(this.endX - this.Player.x) * t;
this.playerScript.curSpeed = Math.abs(this.endX - this.Player.x) * t;
} else if (Math.abs(this.endX - this.Player.x) < 20) {
this.Player.x += 5 * t;
this.playerScript.curSpeed = 5 * t;
} else if (Math.abs(this.endX - this.Player.x) < 50) {
this.Player.x += 10 * t;
this.playerScript.curSpeed = 10 * t;
} else this.Player.x += this.playerScript.curSpeed;
}
}
};
t.prototype.addScore = function(e) {
e && (u.default.instance.curScore += parseInt(e));
};
t.prototype.startNewGame = function() {
L.default.instance.removeAllBuff();
v.default.instance.startCount("inGameTime");
var e = b.default.arrRandom(y.default.bgmArr);
y.default.playBackGroudMusic(e);
this.playerScript.speedTemp = 1;
this.playerScript.speedLowCount = 0;
this.playerScript.setBullet();
this.changePhysicsEnabled(!0, !0);
d.default.gameUi.gameStart();
this.resurgenceTimes = 0;
u.default.instance.startGame();
this.playerScript.init(u.default.instance.curCannonID);
this.playerScript.reLife();
var t = 0 == u.default.instance.gameType ? f.default.instance.scenceTable.getBallIcon(u.default.instance.curScenceID) : f.default.instance.skinTable.getSkinId(u.default.instance.curSkinID);
s.default.instance.startNewGame(this.ballSpriteAtlas.getSpriteFrame(t));
this.schedule(s.default.instance.createBallByTime.bind(s.default.instance), .25, cc.macro.REPEAT_FOREVER);
C.default.instance.putPoint_startLevel(String(u.default.instance.curLevel));
};
t.prototype.pauseGame = function() {
u.default.instance.gameState = 4;
this.changePhysicsEnabled(!1, !0);
};
t.prototype.gameContinue = function() {
u.default.instance.gameState = 1;
this.changePhysicsEnabled(!0, !1);
};
t.prototype.endGame = function(e) {
L.default.instance.removeAllBuff();
this.changePhysicsEnabled(!1, !0);
u.default.instance.gameState = 3;
if (e) {
this.playerScript.stopPropInvincible();
this.canclFrozen();
v.default.instance.endCount("inGameTime");
this.consoleSpecial();
this.unscheduleAllCallbacks();
if (0 == u.default.instance.gameType) {
u.default.instance.hpLess = d.default.gameUi.pro.progress >= .4 ? .2 : 0;
this.failedTimes++;
h.default.instance.callJava("trackLevel", "(Ljava/lang/String;Ljava/lang/String;)V", "EndGame", u.default.instance.curLevel.toString());
d.default.instance.openPanel(g.PanelName.CompletePanel, d.default.gameUi.middleNode);
} else 1 == u.default.instance.gameType && d.default.instance.openPanel(g.PanelName.EndlessCompletePanel, d.default.gameUi.middleNode);
} else {
v.default.instance.pauseCount("inGameTime");
d.default.instance.openPanel(g.PanelName.ResurgenceUi, d.default.gameUi.middleNode);
}
};
t.prototype.isGameComplete = function() {
return 0 == u.default.instance.gameType && 0 == s.default.instance.curBallNum && u.default.instance.curLevelTotalBall <= s.default.instance.ballOutTimes;
};
t.prototype.levelComplete = function() {
return i(this, void 0, void 0, function() {
var e, t;
return r(this, function(n) {
if (4 == u.default.instance.gameState) {
u.default.instance.gameState = 7;
return [ 2 ];
}
for (e in L.default.instance.gobj) L.default.instance.gobj[e].updateTime(0);
u.default.instance.gameState = 5;
u.default.instance.magnetProp(5);
this.playerScript.stopPropInvincible();
this.canclFrozen();
v.default.instance.endCount("inGameTime");
this.playerScript.cancelShoot();
this.failedTimes = 0;
p.default.instance.collectMissionNum(7, 1);
this.consoleSpecial();
h.default.instance.callJava("trackLevel", "(Ljava/lang/String;Ljava/lang/String;)V", "CompleteGame", u.default.instance.curLevel.toString());
t = function() {
return i(this, void 0, void 0, function() {
return r(this, function(e) {
u.default.instance.curLevel++;
S.default.saveItem("curLevel", u.default.instance.curLevel.toString());
this.unscheduleAllCallbacks();
d.default.gameUi.updataGold();
d.default.instance.openPanel(g.PanelName.CompletePanel, d.default.gameUi.middleNode);
d.default.gameUi.unscheduleAllCallbacks();
return [ 2 ];
});
});
}.bind(this);
y.default.stopBackGroudMusic();
y.default.playSoundEffect(y.default.win);
this.scheduleOnce(this.playCompete.bind(this, t), 1);
return [ 2 ];
});
});
};
t.prototype.onResurgenceTap = function(e) {
void 0 === e && (e = !1);
y.default.setvolumeNum(1);
e || this.resurgenceTimes++;
this.playerScript.reLife();
v.default.instance.resumeCount("inGameTime");
p.default.instance.collectMissionNum(5, 1);
this.playerScript.resurgenceInvincible();
u.default.instance.gameState = 1;
this.changePhysicsEnabled(!0, !1);
};
t.prototype.onTouchBegin = function(e) {
if (d.default.gameUi.HurdleIsOpen) d.default.gameUi.OpenCloseHurdle(); else if (8 != u.default.instance.gameState) {
if (7 == u.default.instance.gameState) this.levelComplete(); else if (0 == u.default.instance.gameState) {
u.default.instance.gameType = 0;
this.startNewGame();
} else if (4 == u.default.instance.gameState) {
if (b.default.getTime() < this.lastTime + 300) return;
cc.director.getScheduler().resumeTarget(this);
var t = d.default.instance.getExistPanel(g.PanelName.PausePanel);
t && t.touchStart();
this.lastTime = b.default.getTime();
u.default.instance.gameState = 1;
this.changePhysicsEnabled(!0, !1);
L.default.instance.resumeAllBuff();
}
if (1 == u.default.instance.gameState && !this.playerScript.isInShoot) {
this.playerScript.startShoot();
this.resumeSpecial();
this.endX = e.getLocation().x;
this.playerScript.curASpeed = 0;
this.playerScript.curSpeed = this.playerScript.maxSpeed * ((this.endX - this.Player.x) / Math.abs(this.Player.x - this.endX));
this.lastMoveX = -1;
this.touchId = e.getID();
}
}
};
t.prototype.onTouchMove = function(e) {
if (d.default.gameUi.HurdleIsOpen) d.default.gameUi.OpenCloseHurdle(); else if (8 != u.default.instance.gameState && this.touchId == e.getID()) if (-1 != this.lastMoveX) {
var t = e.getLocation().x, n = t - this.lastMoveX;
n > 0 && this.Player.x < t ? this.playerScript.curASpeed = n < this.playerScript.aSpeed ? n : this.playerScript.aSpeed : n < 0 && this.Player.x > t && (this.playerScript.curASpeed = n > -this.playerScript.aSpeed ? n : -this.playerScript.aSpeed);
this.lastMoveX = t;
this.endX = t;
} else this.lastMoveX = e.getLocation().x;
};
t.prototype.suspend = function() {
if (this.boll) {
s.default.instance.allBallFrozen();
this.boll = !1;
} else {
s.default.instance.cancelBallFrozen();
this.boll = !0;
}
};
t.prototype.onTouchEnd = function(e) {
if (this.touchId == e.getID()) {
if (1 == u.default.instance.gameState) {
this.lastTime = b.default.getTime();
u.default.instance.gameState = 4;
this.changePhysicsEnabled(!1, !0);
this.pauseSpecial();
this.isInPaused ? d.default.instance.getExistPanel(g.PanelName.PausePanel).touchEnd() : d.default.instance.openPanel(g.PanelName.PausePanel, d.default.gameUi.middleNode);
this.isInPaused = !0;
L.default.instance.pauseAllBuff();
}
this.playerScript.cancelShoot();
this.playerScript.curSpeed = 0;
this.playerScript.curASpeed = 0;
}
};
t.prototype.setWallPos = function() {
for (var e = this.wall._components.length, t = 0; t < e; t++) {
var n = this.wall._components[t];
n && n instanceof cc.PhysicsBoxCollider && (0 == n.tag ? n.offset.x = 100 : 1 == n.tag && (n.offset.x = this.node.width + 100));
}
};
t.prototype.playBoomEffect = function(e, t) {
return i(this, void 0, void 0, function() {
var n, o, a, i, l;
return r(this, function(r) {
switch (r.label) {
case 0:
n = 1;
0 == t ? n = 1.2 : 1 == t ? n = 1.4 : 2 == t ? n = 1.8 : 3 == t && (n = 2.2);
o = u.default.instance.getTimeScale();
a = f.default.instance.scenceTable.getEffectId(u.default.instance.curScenceID);
return [ 4, _.default.instance.playEffect(this.boomPrefab.name, this.bulletNode, e, function() {
i.active = !1;
}, a, o) ];

case 1:
(i = r.sent()).scale = n;
l = f.default.instance.scenceTable.getColor(u.default.instance.curScenceID);
i.color = new cc.Color(Number(l[0]), Number(l[1]), Number(l[2]));
return [ 2 ];
}
});
});
};
t.prototype.playSmokeEffect = function(e, t) {
return i(this, void 0, void 0, function() {
var n, o;
return r(this, function(a) {
switch (a.label) {
case 0:
n = u.default.instance.getTimeScale();
f.default.instance.scenceTable.getEffectId(u.default.instance.curScenceID);
return [ 4, _.default.instance.playEffect(this.smokePrefab.name, this.bulletNode, e, function() {
o.active = !1;
}, "smoke" + t, n) ];

case 1:
o = a.sent();
return [ 2 ];
}
});
});
};
t.prototype.playCoinNumEffect = function(e, t) {};
t.prototype.playGoldOut = function(e) {
e = e >= 100 ? 100 : e;
for (var t = function(e) {
var t = c.default.instance.pop("coinPrefab");
n.node.parent.addChild(t);
t.scale = 1;
t.getComponent("CoinPrefab").setIconById(b.default.Random(4e4, 40015).toString());
t.setPosition(cc.v2(375, 812));
t.getComponent("CoinPrefab").notUpdata = !0;
var o = cc.v2(b.default.Random(0, n.node.width), b.default.Random(0, n.node.height)), a = cc.sequence(cc.moveTo(.6 * Math.random(), o), cc.moveTo(.6 * Math.random() + .3, o), cc.scaleTo(.2, 0), cc.callFunc(function() {
t.removeFromParent();
c.default.instance.push(t);
}, n));
t.runAction(a);
}, n = this, o = 0; o < e; o++) t();
};
t.prototype.playCompete = function(e) {
void 0 === e && (e = null);
e();
};
t.prototype.playFrozen = function() {
return i(this, void 0, void 0, function() {
return r(this, function(e) {
if (this.frozen && this.frozen.active && u.default.instance.isInFrozen > 0 || !u.default.instance.checkGameState([ 1 ])) return [ 2 ];
this.frozen.active = !0;
this.frozen.getComponent(cc.Animation).play("frozenShowEffect");
return [ 2 ];
});
});
};
t.prototype.canclFrozen = function() {
var e = this;
if (0 != this.frozen.opacity) {
this.frozen.getComponent(cc.Animation).play("frozenOutEffect");
this.frozen.getComponent(cc.Animation).once("stop", function() {
e.frozen.opacity = 0;
});
}
};
t.prototype.fiveConnon = function() {
if (!u.default.instance.checkGameState([ 2, 3, 4, 5, 6 ]) && -1 == u.default.instance.isInSpecial) {
u.default.instance.isInSpecial = g.PropType.FullFire;
for (var e = function(e) {
var n = c.default.instance.pop(t.connonPrefab.name);
t.Player.parent.addChild(n);
n.position = t.Player.position;
var o = n.getComponent(m.default);
o.bulletNode = t.playerScript.bulletNode;
o.subConnonScript.bulletNode = t.playerScript.subConnonScript.bulletNode;
t.connonArr.push(o);
o.init(u.default.instance.curCannonID);
o.setConnonSkin(u.default.instance.curCannonID);
o.setBullet();
var a = cc.sequence(cc.moveTo(.3, cc.v2(150 * (e + 1), t.Player.y)), cc.callFunc(function() {
o.startShoot();
}));
n.runAction(a);
}, t = this, n = 0; n < 4; n++) e(n);
var o = f.default.instance.workShopTable.getCount(g.PropType.FullFire, u.default.instance.getPropLevel(g.PropType.FullFire));
cc.director.getScheduler().schedule(this.consoleSpecial, this, 5 * (1 + o), 1, 0, !1);
}
};
t.prototype.fiveShootSpeed = function() {
if (!u.default.instance.checkGameState([ 2, 3, 4, 5, 6 ]) && -1 == u.default.instance.isInSpecial) {
u.default.instance.isInSpecial = g.PropType.Tempest;
this.playerScript.setShoot();
cc.director.getScheduler().schedule(this.consoleSpecial, this, 5, 1, 0, !1);
}
};
t.prototype.laserSpecial = function() {
var e = this;
if (!u.default.instance.checkGameState([ 2, 3, 4, 5, 6 ]) && -1 == u.default.instance.isInSpecial) {
u.default.instance.isInSpecial = g.PropType.LaserCutting;
var t = 15, n = 0;
this.laserSpecialFun = function() {
t++;
var o = 23 - Math.pow(n, 1.02);
if (t >= (o = o < 0 ? 1 : o)) {
n++;
t = 0;
var a = c.default.instance.pop(e.specialLaser.name);
e.bulletNode.addChild(a);
var i = Object.keys(s.default.instance.curBallArr), r = i.length > 0 && 1 != o ? s.default.instance.curBallArr[b.default.arrRandom(i)].node.y : b.default.Random(600, 1200);
a.setPosition(cc.v2(750, r));
var l = f.default.instance.workShopTable.getCount(g.PropType.LaserCutting, u.default.instance.getPropLevel(g.PropType.LaserCutting));
a.getComponent(P.default).init(5 * (l + 1) * e.playerScript.mainGunHit);
a.getComponent(cc.Animation).play();
a.getComponent(cc.Animation).once("stop", function() {
a.removeFromParent();
c.default.instance.push(a);
});
if (n >= 25) {
cc.director.getScheduler().unschedule(e.laserSpecialFun, e);
u.default.instance.isInSpecial = -1;
}
}
};
cc.director.getScheduler().schedule(this.laserSpecialFun, this, 0, cc.macro.REPEAT_FOREVER, 0, !1);
}
};
t.prototype.setSpeedLow = function(e) {
var t = c.default.instance.pop(this.speedLow.name);
t.active = !0;
this.Player.parent.addChild(t, -1);
t.setPosition(e);
t.getComponent(M.default).show();
this.speedLowMap.set(t.uuid, t);
};
t.prototype.clearAllSpeedLow = function() {
this.speedLowMap.forEach(function(e, t) {
e.getComponent(M.default).disappearNow();
});
this.speedLowMap.clear();
};
t.prototype.changePhysicsEnabled = function(e, t) {
if (t) cc.director.getPhysicsManager().enabled = e; else {
cc.director.getPhysicsManager().enabled;
u.default.instance.checkGameState([ 1 ]) && (e ? e && u.default.instance.isInFrozen <= 0 && (cc.director.getPhysicsManager().enabled = e) : cc.director.getPhysicsManager().enabled = e);
}
};
t.prototype.consoleSpecial = function() {
if (-1 != u.default.instance.isInSpecial) {
if (u.default.instance.isInSpecial == g.PropType.FullFire) {
cc.director.getScheduler().unschedule(this.consoleSpecial, this);
for (var e = this.connonArr.length, t = 0; t < e; t++) {
var n = this.connonArr[t];
n.cancelShoot();
n.node.removeFromParent();
c.default.instance.push(n.node);
}
this.connonArr = [];
} else if (u.default.instance.isInSpecial == g.PropType.Tempest) {
cc.director.getScheduler().unschedule(this.consoleSpecial, this);
u.default.instance.isInSpecial = -1;
this.playerScript.setShoot();
} else u.default.instance.isInSpecial == g.PropType.LaserCutting && this.laserSpecialFun && cc.director.getScheduler().unschedule(this.laserSpecialFun, this);
u.default.instance.isInSpecial = -1;
}
};
t.prototype.pauseSpecial = function() {
if (-1 != u.default.instance.isInSpecial) {
cc.director.getScheduler().pauseTarget(this);
if (u.default.instance.isInSpecial == g.PropType.FullFire) for (var e = this.connonArr.length, t = 0; t < e; t++) {
this.connonArr[t].cancelShoot();
}
}
};
t.prototype.resumeSpecial = function() {
if (-1 != u.default.instance.isInSpecial && u.default.instance.isInSpecial == g.PropType.FullFire) for (var e = this.connonArr.length, t = 0; t < e; t++) {
this.connonArr[t].startShoot();
}
};
a([ B({
type: [ cc.Prefab ],
tooltip: "子弹预制体"
}) ], t.prototype, "bulletPrefabArr", void 0);
a([ B({
type: [ cc.Prefab ],
tooltip: "副炮预制体"
}) ], t.prototype, "funnelPrefabArr", void 0);
a([ B(cc.Node) ], t.prototype, "ballNode", void 0);
a([ B(cc.Node) ], t.prototype, "bulletNode", void 0);
a([ B(cc.Node) ], t.prototype, "Player", void 0);
a([ B(cc.Node) ], t.prototype, "wall", void 0);
a([ B(cc.Node) ], t.prototype, "frozen", void 0);
a([ B([ cc.Prefab ]) ], t.prototype, "ballPreArr", void 0);
a([ B(cc.Prefab) ], t.prototype, "coinPre", void 0);
a([ B(cc.Prefab) ], t.prototype, "connonPrefab", void 0);
a([ B(cc.Prefab) ], t.prototype, "boomPrefab", void 0);
a([ B(cc.Prefab) ], t.prototype, "funnulBommPrefab", void 0);
a([ B(cc.Prefab) ], t.prototype, "smokePrefab", void 0);
a([ B(cc.Prefab) ], t.prototype, "bloodPrefab", void 0);
a([ B(cc.Prefab) ], t.prototype, "coinNumPrefab", void 0);
a([ B(cc.Prefab) ], t.prototype, "completeEffect", void 0);
a([ B(cc.Prefab) ], t.prototype, "propPrefab", void 0);
a([ B({
type: cc.Prefab,
tooltip: "炮展示预制体"
}) ], t.prototype, "showPrefab", void 0);
a([ B({
type: cc.SpriteAtlas,
tooltip: "球资源"
}) ], t.prototype, "ballSpriteAtlas", void 0);
a([ B({
type: cc.SpriteAtlas,
tooltip: "球资源1"
}) ], t.prototype, "ballSpriteAtlas1", void 0);
a([ B({
type: cc.Prefab,
tooltip: "特殊激光"
}) ], t.prototype, "specialLaser", void 0);
a([ B({
type: cc.Prefab,
tooltip: "减速区域"
}) ], t.prototype, "speedLow", void 0);
a([ B({
type: cc.Prefab,
tooltip: "Buff显示预制件"
}) ], t.prototype, "BuffPrefab", void 0);
a([ B({
type: cc.SpriteAtlas,
tooltip: "icon资源"
}) ], t.prototype, "iconAtlas", void 0);
return t = a([ N ], t);
}(l.default);
n.default = A;
cc._RF.pop();
}, {
"../../BuffManager": "BuffManager",
"../../code/Config/Config": "Config",
"../../code/Lib/Global": "Global",
"../../code/Lib/LocalStorage": "LocalStorage",
"../../code/Lib/TimeCount": "TimeCount",
"../../code/basecode/EasyGetCompleteClass": "EasyGetCompleteClass",
"../../code/manager/BallManager": "BallManager",
"../../code/manager/EffectManager": "EffectManager",
"../../code/manager/MissionManger": "MissionManger",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/NodePoolMananger": "NodePoolMananger",
"../../code/manager/PanelManager": "PanelManager",
"../../code/manager/SDKManager": "SDKManager",
"../../code/manager/SoundManager": "SoundManager",
"../../code/manager/TableManager": "TableManager",
"../../code/manager/Umeng_Manager": "Umeng_Manager",
"../prefab/SpeciaLaser": "SpeciaLaser",
"../prefab/SpeedLowPrefab": "SpeedLowPrefab",
"./Connon": "Connon"
} ],
GiftItem: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "2148bbbMUdD4qq5tE4+G++B", "GiftItem");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../../code/Lib/Global"), r = e("../../../code/manager/TableManager"), l = e("../../../code/manager/SDKManager"), s = e("../../../code/Config/Config"), c = e("../../../code/Lib/Secret"), u = e("../../../code/manager/PanelManager"), d = e("../../../code/manager/EffectManager"), p = e("../../../code/Lib/DateUtils"), f = e("../../../code/manager/MyRoleDataManager"), h = cc._decorator, g = h.ccclass, y = h.property, m = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.nameLabel = null;
t.infoLabel = null;
t.rewardNode = [];
t.iconSource = [];
t.buyBtn = null;
t.buyBtnLable = null;
t.shadowBuyBtnLable = null;
t.icon = null;
t.bellNode = null;
return t;
}
t.prototype.onLoad = function() {
this.buyBtn.node.on("click", this.buyBtnTap, this);
};
t.prototype.update = function() {
if (4 == this.commodityType) {
var e = i.default.getTime(), t = f.default.instance.discountEndTime - e;
t > 0 ? this.nameLabel.string = this.nameString + ":" + p.default.instance.getFormatBySecond(t / 1e3, 5) : f.default.instance.isHaveDiscount() || (this.node.active = !1);
}
};
t.prototype.init = function(e) {
this.payId = e;
};
t.prototype.setLable = function() {
var e = r.default.instance.shopTable.getData(this.payId);
this.commodityType = Number(e.type);
this.bellNode.active = 4 == this.commodityType;
this.icon.spriteFrame = u.default.gameUi.iconAtlas.getSpriteFrame(e.icon);
this.buyBtnLable.string = this.shadowBuyBtnLable.string = "$" + e.cost;
this.nameString = this.nameLabel.string = GlobalFun.i18n.t("lable." + e.name);
this.infoLabel.string = GlobalFun.i18n.t("lable." + e.des);
var t = r.default.instance.shopTable.getreward(this.payId);
if (0 != t.length) {
var n = t.length - 1, o = this.rewardNode[n];
o.active = !0;
if (2 == n) {
for (var a = t.length, l = 0; l < 2; l++) {
o.children[0].children[l].getChildByName("icon").getComponent(cc.Sprite).spriteFrame = this.iconSource[t[l][0] - 51e4];
o.children[0].children[l].getChildByName("num").getComponent(cc.Label).string = i.default.setNum(t[l][1]) + "";
}
o.children[1].getChildByName("icon").getComponent(cc.Sprite).spriteFrame = this.iconSource[t[2][0] - 51e4];
o.children[1].getChildByName("num").getComponent(cc.Label).string = i.default.setNum(t[2][1]) + "";
} else for (a = t.length, l = 0; l < a; l++) {
o.children[l].getChildByName("icon").getComponent(cc.Sprite).spriteFrame = this.iconSource[t[l][0] - 51e4];
o.children[l].getChildByName("num").getComponent(cc.Label).string = i.default.setNum(t[l][1]) + "";
}
}
};
t.prototype.successFly = function() {
var e = r.default.instance.shopTable.getreward(this.payId);
if (0 != e.length) {
var t = this.rewardNode[e.length - 1];
t.active = !0;
if (e.length - 1 == 2) {
for (var n = e.length, o = 0; o < 2; o++) {
t.children[0].children[o].getChildByName("icon").getComponent(cc.Sprite).spriteFrame = this.iconSource[e[o][0] - 51e4];
t.children[0].children[o].getChildByName("num").getComponent(cc.Label).string = i.default.setNum(e[o][1]) + "";
d.default.instance.rewardFly(t.children[0].children[o].children[0], e[o][0], e[o][1]);
}
d.default.instance.rewardFly(t.children[1].children[0], e[2][0], e[2][1]);
} else for (n = e.length, o = 0; o < n; o++) d.default.instance.rewardFly(t.children[o].children[0], e[o][0], e[o][1]);
}
};
t.prototype.buyBtnTap = function() {
if (-1 != l.default.instance.getNetState()) if (l.default.instance.checkUnConsumedGoods()) l.default.instance.reConsumeGood(); else {
c.default.setKeyValue("Buy");
u.default.instance.getExistPanel(s.PanelName.ShopPanel).curItem = this;
l.default.instance.callJava("trackPay", "(Ljava/lang/String;Ljava/lang/String;)V", "startPay", this.payId.toString());
l.default.instance.startPay(this.payId);
}
};
a([ y({
type: cc.Label,
tooltip: "名字lable"
}) ], t.prototype, "nameLabel", void 0);
a([ y({
type: cc.Label,
tooltip: "信息lable"
}) ], t.prototype, "infoLabel", void 0);
a([ y({
type: [ cc.Node ],
tooltip: "商品显示节点"
}) ], t.prototype, "rewardNode", void 0);
a([ y({
type: [ cc.SpriteFrame ],
tooltip: "icon资源"
}) ], t.prototype, "iconSource", void 0);
a([ y({
type: cc.Button,
tooltip: "购买按钮"
}) ], t.prototype, "buyBtn", void 0);
a([ y({
type: cc.Label,
tooltip: "购买按钮lable"
}) ], t.prototype, "buyBtnLable", void 0);
a([ y({
type: cc.Label,
tooltip: "购买按钮lable shadow"
}) ], t.prototype, "shadowBuyBtnLable", void 0);
a([ y({
type: cc.Sprite,
tooltip: "购买按钮lable shadow"
}) ], t.prototype, "icon", void 0);
a([ y({
type: cc.Node,
tooltip: "铃铛"
}) ], t.prototype, "bellNode", void 0);
return t = a([ g ], t);
}(cc.Component);
n.default = m;
cc._RF.pop();
}, {
"../../../code/Config/Config": "Config",
"../../../code/Lib/DateUtils": "DateUtils",
"../../../code/Lib/Global": "Global",
"../../../code/Lib/Secret": "Secret",
"../../../code/manager/EffectManager": "EffectManager",
"../../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../../code/manager/PanelManager": "PanelManager",
"../../../code/manager/SDKManager": "SDKManager",
"../../../code/manager/TableManager": "TableManager"
} ],
GlobalFun: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d9fddqUJ5FDerzzAspWvenh", "GlobalFun");
var o = e("LanguageData"), a = e("ShaderUtils1");
e("QuadTree");
window.GlobalFun = {
i18n: null,
shaderUtils: null,
bloodColorArr: [],
whiteColor1: null,
whiteColor2: null,
blackColor1: null,
blackColor2: null,
huToJiao: null,
init: function() {
this.i18n = o;
this.shaderUtils = a;
this.bloodColorArr = [];
for (var e = [ [ 239, 31, 31 ], [ 239, 31, 31 ], [ 239, 31, 137 ], [ 239, 31, 237 ], [ 191, 31, 239 ], [ 127, 60, 226 ], [ 19, 155, 251 ], [ 19, 194, 251 ], [ 19, 251, 161 ], [ 19, 251, 107 ], [ 19, 251, 42 ], [ 19, 251, 42 ] ], t = e.length, n = 0; n < t; n++) {
var i = e[n];
this.bloodColorArr[11 - n] = cc.color(i[0], i[1], i[2]);
}
this.blackColor1 = cc.color(24, 106, 105);
this.blackColor2 = cc.color(93, 96, 96);
this.whiteColor1 = cc.color(196, 215, 218);
this.whiteColor2 = cc.color(208, 225, 225);
this.huToJiao = 180 / Math.PI;
},
log: function() {
var e;
(e = console).log.apply(e, arguments);
}
};
cc._RF.pop();
}, {
LanguageData: "LanguageData",
QuadTree: "QuadTree",
ShaderUtils1: "ShaderUtils1"
} ],
Global: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6efbc37k7pHPYcG/WhzGeBK", "Global");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e() {}
e.ScreenAdaptation = function(e) {
var t = cc.view.getFrameSize();
(t.width / t.height > 2.16 || t.height / t.width > 2.16) && (e.position = cc.v3(e.position.x, e.position.y - 100));
};
e.convertNodePosToTargetNodePos = function(e, t) {
var n = e.parent.convertToWorldSpaceAR(e.position);
return t.parent.convertToNodeSpaceAR(n);
};
e.randomFix = function(e, t, n) {
void 0 === n && (n = 1);
return Number((Math.random() * Number(t - e) + e).toFixed(n));
};
e.Random = function(e, t) {
void 0 === e && (e = 0);
void 0 === t && (t = 1);
return Math.floor(Math.random() * (t - e + 1)) + e;
};
e.arrRandom = function(t, n, o) {
void 0 === n && (n = !1);
void 0 === o && (o = 0);
if (!t) return 0;
var a = t.length, i = e.Random(0, a - 1);
return n ? t[i] != o ? t[i] : e.arrRandom(t, n, o) : t[i];
};
e.Length1 = function(e, t, n, o) {
return Math.sqrt((e - n) * (e - n) + (t - o) * (t - o));
};
e.getAngle = function(t, n) {
var o = e.Length1(t[0], t[1], n[0], n[1]);
return 180 * Math.asin((n[0] - t[0]) / o) / Math.PI;
};
e.getAngle2 = function(t, n, o, a) {
var i = e.Length1(t, n, o, a);
return 180 * Math.asin((o - t) / i) / Math.PI;
};
e.random = function() {
return 0 == e.Random() ? -1 : 1;
};
e.disorderArr = function(t) {
for (var n, o, a = t.length, i = 0; i < a; i++) {
o = e.Random(0, a - 1);
n = t[i];
t[i] = t[o];
t[o] = n;
}
for (;--i >= 0; ) {
o = e.Random(0, a - 1);
n = t[i];
t[i] = t[o];
t[o] = n;
}
return t;
};
e.getTime = function() {
return new Date().getTime();
};
e.getTomorrowTime = function() {
var t = new Date();
t.setTime(this.getTime());
var n = t.setHours(0, 0, 0, 0) + 864e5;
n < e.getTime() && (n += 864e5);
return n;
};
e.getTodayTime = function() {
var e = new Date();
e.setTime(this.getTime());
var t = e.setHours(0, 0, 0, 0);
t > this.getTime() && (t -= 864e5);
return t;
};
e.getNextWeek = function() {
var t = this.getServerWeek(), n = 7 - (t = 0 == t ? 6 : t - 1);
return e.getTodayTime() + 864e5 * n;
};
e.getServerWeek = function() {
var e = new Date(this.getTime()).getDay();
return Number(e);
};
e.numToHundred = function(e) {
return this.accMul(e, 100) + "%";
};
e.setNumToKMB = function(e) {
var t = this.getNumUnit(e, 3), n = t[0], o = (e / t[1]).toFixed(2) + n;
-1 != o.search(/.00/) && (o = o.replace(/\.00/, ""));
return o;
};
e.setNum = function(e) {
e instanceof String && (e = Number(e));
for (var t = this.getNumUnit(e, 6), n = t[0], o = t[1], a = Math.floor(e / o) + "", i = ""; a.length > 3; ) {
i = "," + a.slice(-3) + i;
a = a.slice(0, a.length - 3);
}
a && (i = a + i);
return i + n;
};
e.getNumUnit = function(e, t) {
var n = 0;
if (-1 != e.toString().search(/e/)) {
n = Number(e.toString().match(/e\+(.*)/)[1]) + 1;
} else n = e.toString().length;
if (n <= t) return [ "", 1 ];
var o = [ "K", "M", "B", "T", "Q" ], a = Math.floor((n - t - 1) / 3);
return [ o[a = a > o.length - 1 ? o.length - 1 : a], Number("1" + new Array(3 * (a + 1) + 1).join("0")) ];
};
e.exactSub = function(e, t) {
var n = e.toString().split("."), o = n[1] ? n[1].length : 0, a = t.toString().split("."), i = a[1] ? a[1].length : 0, r = Math.max(o, i), l = Number("1" + new Array(r + 1).join("0"));
return (e * l - t * l) / l;
};
e.exactAdd = function(e) {
for (var t = 0, n = 0; n < e.length; n++) {
var o = e[n].toString().split("."), a = o[1] ? o[1].length : 0;
t = Math.max(t, a);
}
var i = "1";
for (n = 0; n < t; n++) i += "0";
var r = 0;
for (n = 0; n < e.length; n++) {
r += e[n] * Number(i);
}
return r / Number(i);
};
e.accDiv = function(e, t) {
var n = 0, o = 0;
try {
n = e.toString().split(".")[1].length;
} catch (e) {}
try {
o = t.toString().split(".")[1].length;
} catch (e) {}
return Number(e.toString().replace(".", "")) / Number(t.toString().replace(".", "")) * Math.pow(10, o - n);
};
e.accMul = function(e, t) {
var n = 0, o = e.toString(), a = t.toString();
try {
n += o.split(".")[1].length;
} catch (e) {}
try {
n += a.split(".")[1].length;
} catch (e) {}
return Number(o.replace(".", "")) * Number(a.replace(".", "")) / Math.pow(10, n);
};
e.mapToJsonString = function(e) {
new Object();
var t = "{";
e.forEach(function(e, n) {
t += '"' + n + '":"' + e + '",';
});
t = t.slice(0, t.length - 1);
return t += "}";
};
e.jsonStringToMap = function(e) {
var t = new Map(), n = JSON.parse(e);
for (var o in n) t.set(o, n[o]);
return t;
};
e.getRandomNumInt = function(e, t) {
var n = t - e, o = Math.random();
return e + Math.floor(o * n);
};
return e;
}();
n.default = o;
cc._RF.pop();
}, {} ],
GoShopPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "47b852fbB5Czq+QcSbNMxZr", "GoShopPanel");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../code/basecode/BasePanel"), r = e("../../code/manager/UiAniManager"), l = e("../../code/manager/PanelManager"), s = e("../../code/Config/Config"), c = cc._decorator, u = c.ccclass, d = c.property, p = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.nameLabel = null;
t.docLabel = null;
t.okBtn = null;
t.okLabel = null;
t.okLabelShadow = null;
t.closeBtn = null;
t.backNode = null;
t._aniType = r.UiAniType.TopToDown;
return t;
}
t.prototype.openPanel = function(e) {
void 0 === e && (e = s.CurrencyType.Diamond);
this.openType = e;
this.playUIAni(r.InOrOut.IN);
this.setLable();
this.addEvent();
};
t.prototype.closePanel = function() {
this.playUIAni(r.InOrOut.OUT);
this.dleEvent();
};
t.prototype.addEvent = function() {
this.closeBtn.node.on("click", this.closeBtnTap, this);
this.okBtn.node.on("click", this.okBtnTap, this);
};
t.prototype.dleEvent = function() {
this.closeBtn.node.off("click", this.closeBtnTap, this);
this.okBtn.node.off("click", this.okBtnTap, this);
this.backNode.node.off("click", this.closeBtnTap, this);
};
t.prototype.setLable = function() {
this.nameLabel.string = GlobalFun.i18n.t("lable.10223");
this.docLabel.string = GlobalFun.i18n.t("lable.10224");
this.okLabel.string = GlobalFun.i18n.t("lable.10225");
this.okLabelShadow.string = GlobalFun.i18n.t("lable.10225");
};
t.prototype.panelIn = function() {
this.backNode.node.on("click", this.closeBtnTap, this);
};
t.prototype.panelOut = function() {
l.default.instance.deleteOpen(s.PanelName.GoShopPanel);
this.node.removeFromParent();
};
t.prototype.closeBtnTap = function() {
l.default.instance.closePanel(s.PanelName.GoShopPanel);
l.default.instance.checkPanelIsOpen(s.PanelName.ResurgenceUi) && l.default.instance.getExistPanel(s.PanelName.ResurgenceUi).resumeTime();
};
t.prototype.okBtnTap = function() {
l.default.instance.closePanel(s.PanelName.GoShopPanel);
l.default.instance.openPanel(s.PanelName.ShopPanel, l.default.gameUi.middleNode, this.openType);
};
a([ d({
type: cc.Label,
tooltip: "nameLabel"
}) ], t.prototype, "nameLabel", void 0);
a([ d({
type: cc.Label,
tooltip: "docLabel"
}) ], t.prototype, "docLabel", void 0);
a([ d({
type: cc.Button,
tooltip: "ok按钮"
}) ], t.prototype, "okBtn", void 0);
a([ d({
type: cc.Label,
tooltip: "okLabel"
}) ], t.prototype, "okLabel", void 0);
a([ d({
type: cc.Label,
tooltip: "okLabelShadow"
}) ], t.prototype, "okLabelShadow", void 0);
a([ d({
type: cc.Button,
tooltip: "close按钮"
}) ], t.prototype, "closeBtn", void 0);
a([ d({
type: cc.Button,
tooltip: "close按钮"
}) ], t.prototype, "backNode", void 0);
return t = a([ u ], t);
}(i.default);
n.default = p;
cc._RF.pop();
}, {
"../../code/Config/Config": "Config",
"../../code/basecode/BasePanel": "BasePanel",
"../../code/manager/PanelManager": "PanelManager",
"../../code/manager/UiAniManager": "UiAniManager"
} ],
GuideManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ee3214c2P5MTao/Wk0TzKmW", "GuideManager");
var o = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
n.GuideType = void 0;
var a, i = e("./PanelManager"), r = e("../Config/Config"), l = e("./MyRoleDataManager"), s = e("./TableManager"), c = e("../../src/ui/RefitShopPanel/RefitItem"), u = e("../Lib/LocalStorage"), d = e("../../src/ui/AircraftPanel/AircraftItem"), p = e("./MissionManger"), f = e("../../src/ui/MissionPanel/MissionItem"), h = cc._decorator, g = h.ccclass, y = (h.property, 
function() {
function e() {
this.guideStep = 0;
this.isInGuide = 0;
this.maxStep = 0;
this.curGuideId = 0;
this.guideHistory = {};
this.time = .5;
this.guideHistory = JSON.parse(u.default.getItem("guideHistory", "{}"));
}
t = e;
Object.defineProperty(e, "instance", {
get: function() {
this._instance || (this._instance = new t());
return this._instance;
},
enumerable: !1,
configurable: !0
});
e.prototype.startGuide = function(e) {
if (!this.isInGuide) {
this.curGuideId = e;
this.maxStep = s.default.instance.guideTable.getStep(e);
this.guideStep = 0;
}
switch (e) {
case 10001:
this.aircraftGuide();
break;

case 10002:
this.videoUnlock();
break;

case 10003:
this.endlessGuide();
}
};
e.prototype.completeGuide = function() {
this.guideStep >= this.maxStep && this.endGuide();
};
e.prototype.endGuide = function() {
switch (this.curGuideId) {
case 10001:
u.default.saveItem("isaircraftGuide", "0");
break;

case 10002:
u.default.saveItem("isvideoUnlock", "0");
break;

case 10003:
u.default.saveItem("isNowGuidAccomplish", "0");
}
10003 != this.curGuideId && (l.default.instance.gameState = 0);
this.isInGuide = 0;
this.guideStep = 0;
this.maxStep = 0;
this.curGuideId = 0;
};
e.prototype.checkCanGuide = function(e, t) {
switch (e) {
case 10001:
if ((!this.guideHistory[e] && 6 == l.default.instance.curLevel || this.isInGuide == e) && this.guideStep == t) return !0;
break;

case 10002:
if ((!this.guideHistory[e] && 11 == l.default.instance.curLevel || this.isInGuide == e) && this.guideStep == t) return !0;
break;

case 10003:
if ((!this.guideHistory[e] && l.default.instance.curLevel > 15 || this.isInGuide == e) && this.guideStep == t) return !0;
}
return !1;
};
e.prototype.setGuideState = function(e, t) {
this.guideHistory[e] = t;
u.default.saveItem("guideHistory", JSON.stringify(this.guideHistory));
};
e.prototype.refitShopGuide = function() {
this.guideHistory[10001] = !0;
this.isInGuide = 10001;
if (0 == this.guideStep) {
u.default.saveItem("guideHistory", JSON.stringify(this.guideHistory));
this.guideStep++;
var e = i.default.gameUi.refitBtn.node.parent.convertToWorldSpaceAR(i.default.gameUi.refitBtn.node.position);
i.default.instance.openPanel(r.PanelName.GuidePanel, i.default.gameUi.node, i.default.gameUi.refitBtn.node, e, "click", a.ClickTarget, s.default.instance.guideTable.getWord(10001, 0));
} else if (1 == this.guideStep) {
this.guideStep++;
var t = i.default.instance.getExistPanel(r.PanelName.RefitShopPanel).itemNodeArr[1], n = (e = t.parent.convertToWorldSpaceAR(t.position), 
t.getComponent(c.default).levelUpBtn.node);
i.default.instance.openPanel(r.PanelName.GuidePanel, i.default.gameUi.node, n, e, "click", a.ClickTarget, -1, {
width: t.width,
height: t.height
});
}
};
e.prototype.aircraftGuide = function() {
u.default.getItem("isaircraftGuide", "1");
this.guideHistory[10001] = !0;
this.isInGuide = 10001;
if (0 == this.guideStep) {
u.default.saveItem("guideHistory", JSON.stringify(this.guideHistory));
this.guideStep++;
var e = i.default.gameUi.aircraftBtn.node.parent.convertToWorldSpaceAR(i.default.gameUi.aircraftBtn.node.position);
i.default.instance.openPanel(r.PanelName.GuidePanel, i.default.gameUi.node, i.default.gameUi.aircraftBtn.node, e, "click", a.ClickTarget, s.default.instance.guideTable.getWord(10001, 1));
} else if (1 == this.guideStep) {
this.guideStep++;
var t = i.default.instance.getExistPanel(r.PanelName.AircraftPanel).openGiftNode, n = (e = t.parent.convertToWorldSpaceAR(t.position), 
i.default.instance.getExistPanel(r.PanelName.AircraftPanel).openBtn.node);
i.default.instance.openPanel(r.PanelName.GuidePanel, i.default.gameUi.node, n, e, "click", a.ClickTarget, -1, {
width: t.width,
height: t.height
});
} else if (2 == this.guideStep) {
this.guideStep++;
var o = i.default.instance.getExistPanel(r.PanelName.AircraftPanel).openGiftNode.parent.children[4];
e = o.parent.convertToWorldSpaceAR(o.position), n = o.getComponent(d.default).levelUpBtn.node;
i.default.instance.openPanel(r.PanelName.GuidePanel, i.default.gameUi.node, n, e, "click", a.ClickTarget, s.default.instance.guideTable.getWord(10001, 3), {
width: o.width,
height: o.height
});
}
};
e.prototype.videoUnlock = function() {
u.default.saveItem("isvideoUnlock", "1");
this.guideHistory[10002] = !0;
this.isInGuide = 10002;
if (0 == this.guideStep) {
u.default.saveItem("guideHistory", JSON.stringify(this.guideHistory));
this.guideStep++;
var e = i.default.gameUi.refitBtn.node.parent.convertToWorldSpaceAR(i.default.gameUi.refitBtn.node.position);
i.default.instance.openPanel(r.PanelName.GuidePanel, i.default.gameUi.node, i.default.gameUi.refitBtn.node, e, "click", a.ClickTarget, s.default.instance.guideTable.getWord(10002, 1));
} else if (1 == this.guideStep) {
this.guideStep++;
i.default.instance.getExistPanel(r.PanelName.RefitShopPanel).setCurrentPage(1);
this.endGuide();
}
};
e.prototype.missionGuide = function() {
this.guideHistory[10003] = !0;
this.isInGuide = 10003;
if (0 == this.guideStep) {
u.default.saveItem("guideHistory", JSON.stringify(this.guideHistory));
this.guideStep++;
var e = i.default.gameUi.missionBtn.node.parent.convertToWorldSpaceAR(i.default.gameUi.missionBtn.node.position);
i.default.instance.openPanel(r.PanelName.GuidePanel, i.default.gameUi.node, i.default.gameUi.missionBtn.node, e, "click", a.ClickTarget, s.default.instance.guideTable.getWord(10003, 0));
} else if (1 == this.guideStep) {
this.guideStep++;
var t = i.default.instance.getExistPanel(r.PanelName.MissionPanel).getCompleteNode(), n = (e = t.parent.convertToWorldSpaceAR(t.position), 
t.getComponent(f.default).completeBtn.node);
i.default.instance.openPanel(r.PanelName.GuidePanel, i.default.gameUi.node, n, e, "click", a.ClickTarget, -1, {
width: t.width,
height: t.height
});
}
};
e.prototype.specialGuide = function() {
this.isInGuide = 10004;
if (0 == this.guideStep) {
u.default.saveItem("guideHistory", JSON.stringify(this.guideHistory));
this.guideStep++;
var e = i.default.gameUi.missionBtn.node.parent.convertToWorldSpaceAR(i.default.gameUi.missionBtn.node.position);
i.default.instance.openPanel(r.PanelName.GuidePanel, i.default.gameUi.node, i.default.gameUi.missionBtn.node, e, "click", a.ClickTarget, p.default.instance.curSpecilMission.missionStartDes);
} else if (1 == this.guideStep) {
this.guideStep++;
var t = i.default.instance.getExistPanel(r.PanelName.MissionPanel).completeBtn.node, n = (e = t.parent.convertToWorldSpaceAR(t.position), 
i.default.instance.getExistPanel(r.PanelName.MissionPanel).completeBtn.node);
i.default.instance.openPanel(r.PanelName.GuidePanel, i.default.gameUi.node, n, e, "click", a.ClickAny, -1, {
width: t.width + 10,
height: t.height + 10
}, function() {
var e = cc.repeat(cc.sequence(cc.rotateTo(.1, 2), cc.rotateTo(.2, -2), cc.rotateTo(.1, 0)), 2);
t.runAction(e);
});
}
};
e.prototype.getEndlessState = function(e) {
var t;
switch (e) {
case 10001:
t = Number(u.default.getItem("isaircraftGuide", "1"));
break;

case 10002:
t = Number(u.default.getItem("isvideoUnlock", "1"));
break;

case 10003:
t = Number(u.default.getItem("isNowGuidAccomplish", "1"));
}
return 0 == t;
};
e.prototype.endlessGuide = function() {
u.default.saveItem("isNowGuidAccomplish", "1");
this.guideHistory[10003] = !0;
this.isInGuide = 10003;
if (0 == this.guideStep) {
i.default.gameUi.endlessBtn.interactable = !1;
u.default.saveItem("guideHistory", JSON.stringify(this.guideHistory));
this.guideStep++;
var e = i.default.gameUi.endlessBtn.node.parent.convertToWorldSpaceAR(i.default.gameUi.endlessBtn.node.position);
i.default.instance.openPanel(r.PanelName.GuidePanel, i.default.gameUi.node, i.default.gameUi.endlessBtn.node, e, "click", a.ClickTarget, s.default.instance.guideTable.getWord(10003, 1));
} else if (1 == this.guideStep) {
this.guideStep++;
var t = i.default.instance.getExistPanel(r.PanelName.SkinPanel).startBtn.node;
e = t.parent.convertToWorldSpaceAR(t.position);
i.default.instance.openPanel(r.PanelName.GuidePanel, i.default.gameUi.node, t, e, "click", a.ClickTarget, s.default.instance.guideTable.getWord(10003, 2), {
width: t.width,
height: t.height
});
}
};
e.prototype.get_isInGuide = function() {
return 0 != this.isInGuide;
};
var t;
return e = t = o([ g ], e);
}());
n.default = y;
(function(e) {
e[e.ClickTarget = 0] = "ClickTarget";
e[e.ClickAny = 1] = "ClickAny";
e[e.JustShow = 2] = "JustShow";
})(a = n.GuideType || (n.GuideType = {}));
cc._RF.pop();
}, {
"../../src/ui/AircraftPanel/AircraftItem": "AircraftItem",
"../../src/ui/MissionPanel/MissionItem": "MissionItem",
"../../src/ui/RefitShopPanel/RefitItem": "RefitItem",
"../Config/Config": "Config",
"../Lib/LocalStorage": "LocalStorage",
"./MissionManger": "MissionManger",
"./MyRoleDataManager": "MyRoleDataManager",
"./PanelManager": "PanelManager",
"./TableManager": "TableManager"
} ],
GuidePanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d1039iwb6BG/pweCNGC3X4U", "GuidePanel");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../code/basecode/BasePanel"), r = e("../../code/manager/UiAniManager"), l = e("../../code/manager/PanelManager"), s = e("../../code/Config/Config"), c = e("../../code/manager/GuideManager"), u = e("../../code/manager/MyRoleDataManager"), d = cc._decorator, p = d.ccclass, f = d.property, h = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.showNode = null;
t.maskNode = null;
t.wordNode = null;
t.wordLabel = null;
t.jiantouNode = null;
t.showEventNode = null;
t.completeFun = null;
t.targetNode = null;
t.event = null;
t.guideType = null;
t._aniType = r.UiAniType.Null;
return t;
}
t.prototype.openPanel = function(e, t, n, o, a, i, l) {
void 0 === a && (a = -1);
void 0 === l && (l = null);
this.playUIAni(r.InOrOut.IN);
this.jiantouNode.active = !1;
this.init(e, t, n, o, a, i, l);
};
t.prototype.closePanel = function() {
this.playUIAni(r.InOrOut.OUT);
this.clear();
this.dleEvent();
};
t.prototype.panelIn = function() {};
t.prototype.panelOut = function() {
l.default.instance.deleteOpen(s.PanelName.GuidePanel);
this.node.removeFromParent();
};
t.prototype.addEvent = function() {
this.node.on(cc.Node.EventType.TOUCH_START, this.onNodeTouchStart, this);
this.showEventNode.on(cc.Node.EventType.TOUCH_START, this.onShowTouchStart, this);
l.default.gameUi.endlessBtn.interactable = !0;
};
t.prototype.dleEvent = function() {
this.node.off(cc.Node.EventType.TOUCH_START, this.onNodeTouchStart, this);
this.showEventNode.off(cc.Node.EventType.TOUCH_START, this.onShowTouchStart, this);
};
t.prototype.init = function(e, t, n, o, a, i, r) {
var l = this;
void 0 === a && (a = -1);
void 0 === r && (r = null);
var s = this.node.parent.convertToNodeSpaceAR(t);
this.targetNode = e;
this.event = n;
this.guideType = o;
this.showNode.width = 750;
this.showNode.height = 1624;
this.showEventNode.width = 750;
this.showEventNode.height = 1624;
this.wordNode.active = !(-1 == a);
this.wordLabel.string = GlobalFun.i18n.t("lable." + a);
this.showNode.x = s.x;
this.showNode.y = s.y;
this.showEventNode.x = s.x;
this.showEventNode.y = s.y;
this.completeFun = r;
this.maskNode.getComponent(cc.Widget).updateAlignment();
this.guideAni(i && i.width ? i.width : this.targetNode.width, i && i.height ? i.height : this.targetNode.height, function() {
l.jiantouNode.x = s.x;
l.jiantouNode.y = s.y + -.1 * (i && i.height ? i.height : l.targetNode.height);
l.jiantouNode.active = !0;
l.jiantouNode.getComponent(cc.Animation).playAdditive("jiantouShow");
l.jiantouNode.getComponent(cc.Animation).playAdditive("jiantou");
l.completeFun && l.completeFun();
});
};
t.prototype.clear = function() {
this.targetNode = null;
this.event = null;
this.guideType = null;
};
t.prototype.onNodeTouchStart = function() {
this.guideType == c.GuideType.ClickAny && this.touchSuccess();
};
t.prototype.onShowTouchStart = function() {
this.guideType != c.GuideType.ClickAny && this.guideType != c.GuideType.ClickTarget || this.touchSuccess();
};
t.prototype.touchSuccess = function() {
u.default.instance.gameState = 0;
this.targetNode && this.event && this.targetNode.emit(this.event);
l.default.instance.closePanel(s.PanelName.GuidePanel);
c.default.instance.completeGuide();
};
t.prototype.guideAni = function(e, t, n) {
var o = this, a = (e - this.showNode.width) / 25, i = (t - this.showNode.height) / 25, r = 0;
this.schedule(function() {
r++;
o.showNode.width += a;
o.showNode.height += i;
o.showEventNode.width += a;
o.showEventNode.height += i;
if (r >= 25) {
o.showNode.width = e;
o.showNode.height = t;
o.showEventNode.width = e;
o.showEventNode.height = t;
o.addEvent();
n();
}
}, .01, 25);
};
a([ f({
type: cc.Node,
tooltip: "显示节点"
}) ], t.prototype, "showNode", void 0);
a([ f({
type: cc.Node,
tooltip: "遮罩节点"
}) ], t.prototype, "maskNode", void 0);
a([ f({
type: cc.Node,
tooltip: "语言节点"
}) ], t.prototype, "wordNode", void 0);
a([ f({
type: cc.Label,
tooltip: "文字脚本"
}) ], t.prototype, "wordLabel", void 0);
a([ f({
type: cc.Node,
tooltip: "箭头"
}) ], t.prototype, "jiantouNode", void 0);
a([ f({
type: cc.Node,
tooltip: "显示节点事件"
}) ], t.prototype, "showEventNode", void 0);
return t = a([ p ], t);
}(i.default);
n.default = h;
cc._RF.pop();
}, {
"../../code/Config/Config": "Config",
"../../code/basecode/BasePanel": "BasePanel",
"../../code/manager/GuideManager": "GuideManager",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/PanelManager": "PanelManager",
"../../code/manager/UiAniManager": "UiAniManager"
} ],
GuideTable: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4a527vv/K1LXYxZtnDfLRbb", "GuideTable");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e(e) {
this.table = e;
}
e.prototype.getData = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && Number(n.id) == e) return n;
}
cc.warn("GuideTable: Do not have id " + e);
return "";
};
e.prototype.getStep = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && Number(n.id) == e) return Number(n.step);
}
cc.warn("GuideTable: Do not have id " + e);
return 0;
};
e.prototype.getWord = function(e, t) {
for (var n = 0; n < this.table.length; n++) {
var o = this.table[n];
if (o && Number(o.id) == e) {
var a = o["word" + t];
if (a) return a;
}
}
cc.warn("GuideTable: Do not have id " + e);
return -1;
};
return e;
}();
n.default = o;
cc._RF.pop();
}, {} ],
HttpManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "1353czL1z9FVYyFrsby61YO", "HttpManager");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../ads/AdsGroupController"), r = e("./PanelManager"), l = cc._decorator, s = l.ccclass, c = (l.property, 
function(e) {
o(t, e);
function t() {
var t = e.call(this) || this;
t.outTimeFun = null;
t.gameServerIP = "";
t.postName = "";
t.adsRequest = new XMLHttpRequest();
t.gameServerIP = "";
t.isSend = !1;
t.outTimeFun = function() {
r.default.gameUi && r.default.gameUi.openMask(!1);
};
return t;
}
n = t;
Object.defineProperty(t, "instance", {
get: function() {
this._instance || (this._instance = new n());
return this._instance;
},
enumerable: !1,
configurable: !0
});
t.prototype.post = function(e, t, n, o) {
void 0 === t && (t = "");
void 0 === n && (n = null);
void 0 === o && (o = !0);
var a = this.adsRequest;
o && r.default.gameUi && r.default.gameUi.openMask(!0);
a.responseType = "text";
a.open("POST", e);
a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
a.send(t);
a.onload = n || this.onPostComplete;
a.onerror = this.onPostIOError;
a.onprogress = this.onPostProgress;
a.ontimeout = this.onTimeOut;
a.abort = this.onAbort;
this.scheduleOnce(this.outTimeFun, 1);
};
t.prototype.get = function(e, t, n, o) {
void 0 === t && (t = "");
void 0 === n && (n = null);
void 0 === o && (o = !1);
o && r.default.gameUi && r.default.gameUi.openMask(!0);
var a = new XMLHttpRequest();
a.responseType = "text";
a.open("GET", e);
a.send();
};
t.prototype.onPostComplete = function(e) {
n.instance.unschedule(n.instance.outTimeFun);
n.instance.isSend = !1;
r.default.gameUi && r.default.gameUi.openMask(!1);
var t = JSON.parse(this.response);
if (1 == t.resultCode) switch (t.data.interfaceName) {
case "advertis":
n.instance.getAdsDataFromSeverComplete(t.data);
}
};
t.prototype.onPostIOError = function(e) {
n.instance.unschedule(n.instance.outTimeFun);
r.default.gameUi && r.default.gameUi.openMask(!1);
n.instance.isSend = !1;
this == n.instance.adsRequest && n.instance.getAdsDataFromSever(1);
};
t.prototype.onPostProgress = function(e) {};
t.prototype.onTimeOut = function(e) {
"advertisA" == n.instance.postName && n.instance.getAdsDataFromSever(1);
};
t.prototype.onAbort = function() {
"advertisA" == n.instance.postName && n.instance.getAdsDataFromSever(1);
};
t.prototype.getAdsDataFromSeverComplete = function(e) {
GlobalFun.log("getAdsDataFromSeverComplete");
i.default.instance.dataFromSever(e);
};
t.prototype.getAdsDataFromSever = function(e, t) {
void 0 === e && (e = 0);
void 0 === t && (t = 5);
console.log("adsRequest " + this.adsRequest.type);
if (1 != this.adsRequest.type) {
i.default.instance.adsset || i.default.instance.initAdsSet();
this.postName = "advertisA";
this.adsRequest.type = e;
var n = "gameId=" + i.default.instance.adsset.appId + "&table=" + t, o = 0 == e ? i.default.instance.adsset.mainServer : i.default.instance.adsset.secondServer;
this.post(o + "/advertisA.json", n, null, !1);
} else i.default.instance.init();
};
var n;
t._instance = null;
return t = n = a([ s ], t);
}(cc.Component));
n.default = c;
cc._RF.pop();
}, {
"../ads/AdsGroupController": "AdsGroupController",
"./PanelManager": "PanelManager"
} ],
IsHaveUnlock: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "467fft7DEFCir5YPen3hmyM", "IsHaveUnlock");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("./code/manager/MyRoleDataManager"), r = e("./code/manager/TableManager"), l = cc._decorator, s = l.ccclass, c = l.property, u = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.tishi = null;
return t;
}
t.prototype.start = function() {
this.isHaveUnlock();
};
t.prototype.isHaveUnlock = function() {
for (var e = r.default.instance.cannonUnlock.getCannonIdS(), t = 0; t < e.length; t++) if (!i.default.instance.checkConnonUnlocked(e[t])) {
var n = r.default.instance.cannonUnlock.getType(e[t], !0), o = r.default.instance.cannonUnlock.getConsume(e[t], !0), a = r.default.instance.cannonUnlock.getMap(e[t], !0);
switch (n) {
case "1":
if (i.default.instance.Gold >= Number(o) && i.default.instance.curLevel >= a) {
this.tishi.active = !0;
return;
}
break;

case "2":
if (i.default.instance.Diamond >= Number(o) && i.default.instance.curLevel >= a) {
this.tishi.active = !0;
return;
}
break;

case "3":
if (i.default.instance.curLevel >= a) {
this.tishi.active = !0;
return;
}
}
}
this.tishi.active = !1;
};
a([ c(cc.Node) ], t.prototype, "tishi", void 0);
return t = a([ s ], t);
}(cc.Component);
n.default = u;
cc._RF.pop();
}, {
"./code/manager/MyRoleDataManager": "MyRoleDataManager",
"./code/manager/TableManager": "TableManager"
} ],
Lancher: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3a1d6UJxG9HWaDLuwuWXs2G", "Lancher");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
}, i = this && this.__awaiter || function(e, t, n, o) {
function a(e) {
return e instanceof n ? e : new n(function(t) {
t(e);
});
}
return new (n || (n = Promise))(function(n, i) {
function r(e) {
try {
s(o.next(e));
} catch (e) {
i(e);
}
}
function l(e) {
try {
s(o.throw(e));
} catch (e) {
i(e);
}
}
function s(e) {
e.done ? n(e.value) : a(e.value).then(r, l);
}
s((o = o.apply(e, t || [])).next());
});
}, r = this && this.__generator || function(e, t) {
var n, o, a, i, r = {
label: 0,
sent: function() {
if (1 & a[0]) throw a[1];
return a[1];
},
trys: [],
ops: []
};
return i = {
next: l(0),
throw: l(1),
return: l(2)
}, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
return this;
}), i;
function l(e) {
return function(t) {
return s([ e, t ]);
};
}
function s(i) {
if (n) throw new TypeError("Generator is already executing.");
for (;r; ) try {
if (n = 1, o && (a = 2 & i[0] ? o.return : i[0] ? o.throw || ((a = o.return) && a.call(o), 
0) : o.next) && !(a = a.call(o, i[1])).done) return a;
(o = 0, a) && (i = [ 2 & i[0], a.value ]);
switch (i[0]) {
case 0:
case 1:
a = i;
break;

case 4:
r.label++;
return {
value: i[1],
done: !1
};

case 5:
r.label++;
o = i[1];
i = [ 0 ];
continue;

case 7:
i = r.ops.pop();
r.trys.pop();
continue;

default:
if (!(a = r.trys, a = a.length > 0 && a[a.length - 1]) && (6 === i[0] || 2 === i[0])) {
r = 0;
continue;
}
if (3 === i[0] && (!a || i[1] > a[0] && i[1] < a[3])) {
r.label = i[1];
break;
}
if (6 === i[0] && r.label < a[1]) {
r.label = a[1];
a = i;
break;
}
if (a && r.label < a[2]) {
r.label = a[2];
r.ops.push(i);
break;
}
a[2] && r.ops.pop();
r.trys.pop();
continue;
}
i = t.call(e, r);
} catch (e) {
i = [ 6, e ];
o = 0;
} finally {
n = a = 0;
}
if (5 & i[0]) throw i[1];
return {
value: i[0] ? i[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var l = e("../code/manager/LoadManager"), s = e("../code/Lib/LocalStorage"), c = e("../code/manager/TableManager"), u = e("../code/manager/MyRoleDataManager"), d = e("../code/Config/Config"), p = e("../code/manager/SDKManager"), f = e("../code/ads/AdsGroupController"), h = e("../code/manager/UiAniManager"), g = e("../code/manager/Advert_Manager"), y = cc._decorator, m = y.ccclass, b = y.property, v = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.loadLable = null;
t.loadAni = null;
t.loadTimes = 1;
t.openState = 0;
return t;
}
t.prototype.onLoad = function() {
GlobalFun.init();
if (cc.sys.isNative && cc.sys.platform == cc.sys.IPHONE) {
var e = cc.view.getDesignResolutionSize(), t = cc.view.getCanvasSize();
t.height / t.width <= 1.35 ? cc.view.setDesignResolutionSize(e.width, e.height, cc.ResolutionPolicy.SHOW_ALL) : cc.view.setDesignResolutionSize(e.width, e.height, cc.ResolutionPolicy.FIXED_WIDTH);
t.height / t.width > 2 && (u.default.instance.isFullScreen = !0);
}
};
t.prototype.update = function() {};
t.prototype.start = function() {
this.gameConfig();
this.loadAni.play();
};
t.prototype.gameConfig = function() {
return i(this, void 0, void 0, function() {
return r(this, function(e) {
switch (e.label) {
case 0:
g.default.instance.istaiwan = !0;
"true" == s.default.getItem("isNewPalyer", "true") && u.default.instance.startNewGame();
s.default.saveItem("isNewPalyer", "false");
u.default.instance.gsChannel = d.default.APKChannel;
cc.game.on(cc.game.EVENT_HIDE, p.default.instance.onPause);
cc.game.on(cc.game.EVENT_SHOW, p.default.instance.onResume);
return cc.sys.os != cc.sys.OS_IOS ? [ 3, 2 ] : [ 4, this.loadRes() ];

case 1:
e.sent();
return [ 3, 3 ];

case 2:
this.loadRes();
e.label = 3;

case 3:
this.openGame();
return [ 2 ];
}
});
});
};
t.prototype.openGame = function() {
var e = this;
l.default.instance.preloadScene("gameScence", this, function(t, n) {
e.openState += 1;
e.openState >= 2 && cc.director.loadScene("gameScence");
}, function(e, t) {});
};
t.prototype.loadRes = function() {
return i(this, void 0, void 0, function() {
var e, t;
return r(this, function(n) {
switch (n.label) {
case 0:
return [ 4, l.default.instance.loadResByUrl("json") ];

case 1:
n.sent();
return [ 4, h.default.init() ];

case 2:
n.sent();
({
uid: "1",
levelid: "11",
usetimes: "3",
watchad: "1",
coin: "12",
result: "1",
usediamond: "3"
});
c.default.instance.init();
u.default.instance.loadData();
e = p.default.instance.callJava("getSysLanguage", "()Ljava/lang/String;");
t = p.default.instance.callJava("getSysCountry", "()Ljava/lang/String;");
e = (e = "tw") ? this.getLanguage(e, t) : "tw";
u.default.instance.curLangue = s.default.getItem("language", e);
GlobalFun.i18n.init(u.default.instance.curLangue);
return u.default.instance.gsChannel != d.default.APKChannel ? [ 3, 7 ] : [ 4, l.default.instance.loadResByUrl("/soundSource") ];

case 3:
n.sent();
return [ 4, l.default.instance.loadResByUrl("/prefab") ];

case 4:
n.sent();
return [ 4, l.default.instance.loadResByUrl("/mapRes") ];

case 5:
n.sent();
return [ 4, l.default.instance.loadResByUrl("/effectPrefab") ];

case 6:
n.sent();
return [ 3, 9 ];

case 7:
return [ 4, l.default.instance.loadRes(c.default.instance.scenceTable.getSourceID(u.default.instance.curScenceID), cc.SpriteFrame) ];

case 8:
n.sent();
n.label = 9;

case 9:
f.default.instance.initAdsSet();
f.default.instance.init();
this.openState += 1;
this.openState >= 2 && cc.director.loadScene("gameScence");
return [ 2 ];
}
});
});
};
t.prototype.getLanguage = function(e, t) {
return cc.sys.platform == cc.sys.ANDROID ? "zh" == e ? "CN" == t ? "cn" : "tw" : e : cc.sys.platform == cc.sys.IPHONE || cc.sys.IPAD ? -1 != e.search(/en/) ? "en" : -1 != e.search(/zh_Hans/) ? "cn" : -1 != e.search(/zh_Hant/) ? "tw" : e : void 0;
};
a([ b(cc.Label) ], t.prototype, "loadLable", void 0);
a([ b(cc.Animation) ], t.prototype, "loadAni", void 0);
return t = a([ m ], t);
}(cc.Component);
n.default = v;
cc._RF.pop();
}, {
"../code/Config/Config": "Config",
"../code/Lib/LocalStorage": "LocalStorage",
"../code/ads/AdsGroupController": "AdsGroupController",
"../code/manager/Advert_Manager": "Advert_Manager",
"../code/manager/LoadManager": "LoadManager",
"../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../code/manager/SDKManager": "SDKManager",
"../code/manager/TableManager": "TableManager",
"../code/manager/UiAniManager": "UiAniManager"
} ],
LanguageData: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "61de062n4dJ7ZM9/Xdumozn", "LanguageData");
var o = e("polyglot.min"), a = [], i = null;
window.i18n || (window.i18n = {
languages: {},
curLang: ""
});
0;
function r(e) {
if (!e) return "en";
for (var t = 0; t < a.length; t++) if (-1 != e.search(a[t])) return a[t];
return "en";
}
function l(e) {
var t = window.i18n.languages.languageText;
a = window.i18n.languages.languageArr;
var n = {
lable: {}
};
t[0][e] || (e = r(e));
for (var o = 0; o < t.length; o++) {
var i = t[o];
i && (n.lable[i.id] = i[e]);
}
return n;
}
function s(e) {
e && (i ? i.replace(e) : i = new o({
phrases: e,
allowMissing: !0
}));
}
t.exports = {
init: function(e) {
if (e !== window.i18n.curLang) {
var t = l(e) || {};
window.i18n.curLang = e;
s(t);
this.inst = i;
}
},
t: function(e, t) {
if (i) return i.t(e, t);
},
inst: i,
updateSceneRenderers: function() {
for (var e = cc.director.getScene().children, t = [], n = 0; n < e.length; ++n) {
var o = e[n].getComponentsInChildren("LocalizedLabel");
Array.prototype.push.apply(t, o);
}
for (var a = 0; a < t.length; ++a) {
var i = t[a];
i.node.active && i.updateLabel();
}
for (var r = [], l = 0; l < e.length; ++l) {
var s = e[l].getComponentsInChildren("LocalizedSprite");
Array.prototype.push.apply(r, s);
}
for (var c = 0; c < r.length; ++c) {
var u = r[c];
u.node.active && u.updateSprite(window.i18n.curLang);
}
}
};
cc._RF.pop();
}, {
"polyglot.min": "polyglot.min"
} ],
LatticeProgress: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5cc79fFoMJKmYTs8iBaKexI", "LatticeProgress");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../code/manager/NodePoolMananger"), r = cc._decorator, l = r.ccclass, s = r.property, c = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.proNode = null;
t.latticeNode = null;
t.maxLatticeNum = 0;
t.lockNode = null;
t._pro = 0;
return t;
}
t.prototype.clear = function() {
for (var e = this.proNode.children, t = e.length, n = 0; n < t; n++) {
e[n].removeFromParent();
}
};
t.prototype.lock = function() {
this.lockNode && (this.lockNode.active = !0);
this.proNode.active = !1;
this.clear();
};
t.prototype.setPro = function() {
if (this.lockNode && this.lockNode.active) {
this.lockNode.active = !1;
this.proNode.active = !0;
}
var e = this.proNode.children;
if (this.pro != e.length) if (this.pro > e.length) for (var t = this.pro - e.length, n = 0; n < t; n++) {
if (!(o = i.default.instance.popWithCheckExist(this.latticeNode.name))) {
i.default.instance.addPool(this.latticeNode);
this.latticeNode.setPosition(cc.v3(this.latticeNode.x, 0));
o = i.default.instance.pop(this.latticeNode.name);
}
o.active = !0;
this.proNode.addChild(o);
} else for (t = e.length - this.pro, n = 0; n < t; n++) {
var o;
if (o = e.pop()) {
o.removeFromParent();
o.active = !1;
}
}
};
Object.defineProperty(t.prototype, "pro", {
get: function() {
return this._pro;
},
set: function(e) {
this._pro = e >= this.maxLatticeNum ? this.maxLatticeNum : e;
this.setPro();
},
enumerable: !1,
configurable: !0
});
a([ s({
type: cc.Node,
tooltip: "进度节点"
}) ], t.prototype, "proNode", void 0);
a([ s({
type: cc.Node,
tooltip: "格子节点"
}) ], t.prototype, "latticeNode", void 0);
a([ s({
type: cc.Integer,
tooltip: "最大格子数量"
}) ], t.prototype, "maxLatticeNum", void 0);
a([ s({
type: cc.Node,
tooltip: "锁定节点"
}) ], t.prototype, "lockNode", void 0);
return t = a([ l ], t);
}(cc.Component);
n.default = c;
cc._RF.pop();
}, {
"../../code/manager/NodePoolMananger": "NodePoolMananger"
} ],
ListView: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "dda00QAWttNgYRt2l9DQQYI", "ListView");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../code/basecode/EasyGetCompleteClass"), r = e("../../code/Lib/Global"), l = cc._decorator, s = l.ccclass, c = l.property, u = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.scroll = null;
t.itemPreFab = null;
t.spriteAtlas = null;
t.content = null;
t.selectItem = null;
t.itemArr = [];
t.listLen = 0;
t.isLowSpeedStop = !1;
t.itemPool = [];
t.startTouch = !1;
return t;
}
t.prototype.onLoad = function() {
this.listLen = 6;
this.scroll.node.on("touchstart", this.touchBegin, this);
this.scroll.node.on("scroll-ended", this.scrollEnd, this);
this.scroll.node.on("touchend", this.touchEnd, this);
this.scroll.node.on("scrolling", this.scrolling, this);
this.scroll.elastic = !1;
};
t.prototype.start = function() {};
t.prototype.init = function(e) {
this.clearList();
for (var t = 0, n = 0; n < e.length; n++) {
var o = e[n];
if (o) {
t++;
var a = this.itemPool.shift();
a || (a = cc.instantiate(this.itemPreFab));
this.scroll.content.addChild(a);
var i = o.icon ? this.spriteAtlas.getSpriteFrame(o.icon) : null;
a.ECScript.init({
icon: i,
data: o
});
this.itemArr.push(a);
}
}
this.listLen = t;
this.content.updateLayout();
};
t.prototype.getItemByIndex = function(e) {
return this.itemArr[e];
};
t.prototype.setSelectItem = function(e, t) {
for (var n = this.itemArr.length, o = 0; o < n; o++) {
var a = this.itemArr[o];
if (a && a.ECScript[e] == t) {
this.selectItem = a;
return !0;
}
}
this.selectItem = this.itemArr[0];
return !1;
};
t.prototype.getSelectItem = function() {
return this.selectItem;
};
t.prototype.getIcon = function(e) {
return this.spriteAtlas.getSpriteFrame(e);
};
t.prototype.getSelectItemSrcipt = function() {
return this.selectItem.ECScript;
};
t.prototype.moveItemToSelect = function(e) {
void 0 === e && (e = .05);
if (this.selectItem) {
this.isLowSpeedStop = !1;
var t = this.selectItem, n = [], o = cc.v2(0, 0), a = cc.v2(0, 0), i = this.scroll.getMaxScrollOffset();
if (this.scroll.horizontal) {
n = this.chooseSelectItemW(this.scroll, this.listLen, this.content.paddingLeft, this.content.paddingLeft, this.content.spacingX);
o.x = n[1] * t.ECScript.index + t.ECScript.index * this.content.spacingX;
a.x = i.x <= o.x ? i.x : o.x;
} else {
if (!this.scroll.vertical) return;
n = this.chooseSelectItemH(this.scroll, this.listLen, this.content.paddingTop, this.content.paddingBottom, this.content.spacingY);
o.y = n[1] * t.ECScript.index + t.ECScript.index * this.content.spacingY;
a.y = i.y <= o.y ? i.y : o.y;
}
this.scroll.scrollToOffset(a, e);
}
};
t.prototype.clearList = function() {
for (var e = 0; e < this.itemArr.length; e++) {
var t = this.itemArr[e];
if (t) {
t.removeFromParent();
this.itemPool.push(t);
}
}
this.itemArr = [];
};
t.prototype.touchBegin = function() {
this.startTouch = !0;
};
t.prototype.touchEnd = function() {
this.isLowSpeedStop = !0;
};
t.prototype.scrollEnd = function(e) {
if (this.startTouch) {
this.startTouch = !1;
var t = [], n = this.scroll.getMaxScrollOffset(), o = cc.v2(0, 0);
if (this.scroll.horizontal) {
t = this.chooseSelectItemW(this.scroll, this.listLen, this.content.paddingLeft, this.content.paddingLeft, this.content.spacingX);
o.x = t[0] == this.listLen - 1 ? n.x : t[0] * t[1] + t[0] * this.content.spacingX;
} else {
if (!this.scroll.vertical) return;
t = this.chooseSelectItemH(this.scroll, this.listLen, this.content.paddingTop, this.content.paddingBottom, this.content.spacingY);
o.y = t[0] == this.listLen - 1 ? n.y : t[0] * t[1] + t[0] * this.content.spacingY;
}
this.scroll.scrollToOffset(o, .5);
this.isLowSpeedStop = !1;
this.selectItem = this.itemArr[t[0]];
}
};
t.prototype.scrolling = function(e) {
if (this.scroll.isAutoScrolling() && this.isLowSpeedStop) {
var t = r.default.getTime(), n = this.scroll.getScrollOffset();
if (this.lastPos && Math.abs(n.x - this.lastPos.x) / (t - this.lastTime) <= .1) {
this.startTouch = !0;
this.isLowSpeedStop = !1;
this.scroll.stopAutoScroll();
}
this.lastPos = n;
this.lastTime = t;
}
};
t.prototype.chooseSelectItemW = function(e, t, n, o, a) {
void 0 === n && (n = 0);
void 0 === o && (o = 0);
void 0 === a && (a = 0);
if (!e) return [ 0, 0 ];
var i = e.content.width, r = Math.abs(e.getScrollOffset().x), l = (i - n - o) / t, s = Math.round(r / l);
return [ s = (s = s > t ? t : s) < 0 ? 0 : s, (i - n - o - (t - 1) * a) / t ];
};
t.prototype.chooseSelectItemH = function(e, t, n, o, a) {
void 0 === n && (n = 0);
void 0 === o && (o = 0);
void 0 === a && (a = 0);
if (!e) return [ 0, 0 ];
var i = e.content.height, r = Math.abs(e.getScrollOffset().y), l = (i - n - o) / t, s = Math.round(r / l);
return [ s = (s = s > t ? t : s) < 0 ? 0 : s, (i - n - o - (t - 1) * a) / t ];
};
a([ c(cc.ScrollView) ], t.prototype, "scroll", void 0);
a([ c(cc.Prefab) ], t.prototype, "itemPreFab", void 0);
a([ c(cc.SpriteAtlas) ], t.prototype, "spriteAtlas", void 0);
a([ c(cc.Layout) ], t.prototype, "content", void 0);
return t = a([ s ], t);
}(i.default);
n.default = u;
cc._RF.pop();
}, {
"../../code/Lib/Global": "Global",
"../../code/basecode/EasyGetCompleteClass": "EasyGetCompleteClass"
} ],
LoadManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "16d6bOY4hJBgYO/54Hvsq1Z", "LoadManager");
var o = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
}, a = this && this.__awaiter || function(e, t, n, o) {
function a(e) {
return e instanceof n ? e : new n(function(t) {
t(e);
});
}
return new (n || (n = Promise))(function(n, i) {
function r(e) {
try {
s(o.next(e));
} catch (e) {
i(e);
}
}
function l(e) {
try {
s(o.throw(e));
} catch (e) {
i(e);
}
}
function s(e) {
e.done ? n(e.value) : a(e.value).then(r, l);
}
s((o = o.apply(e, t || [])).next());
});
}, i = this && this.__generator || function(e, t) {
var n, o, a, i, r = {
label: 0,
sent: function() {
if (1 & a[0]) throw a[1];
return a[1];
},
trys: [],
ops: []
};
return i = {
next: l(0),
throw: l(1),
return: l(2)
}, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
return this;
}), i;
function l(e) {
return function(t) {
return s([ e, t ]);
};
}
function s(i) {
if (n) throw new TypeError("Generator is already executing.");
for (;r; ) try {
if (n = 1, o && (a = 2 & i[0] ? o.return : i[0] ? o.throw || ((a = o.return) && a.call(o), 
0) : o.next) && !(a = a.call(o, i[1])).done) return a;
(o = 0, a) && (i = [ 2 & i[0], a.value ]);
switch (i[0]) {
case 0:
case 1:
a = i;
break;

case 4:
r.label++;
return {
value: i[1],
done: !1
};

case 5:
r.label++;
o = i[1];
i = [ 0 ];
continue;

case 7:
i = r.ops.pop();
r.trys.pop();
continue;

default:
if (!(a = r.trys, a = a.length > 0 && a[a.length - 1]) && (6 === i[0] || 2 === i[0])) {
r = 0;
continue;
}
if (3 === i[0] && (!a || i[1] > a[0] && i[1] < a[3])) {
r.label = i[1];
break;
}
if (6 === i[0] && r.label < a[1]) {
r.label = a[1];
a = i;
break;
}
if (a && r.label < a[2]) {
r.label = a[2];
r.ops.push(i);
break;
}
a[2] && r.ops.pop();
r.trys.pop();
continue;
}
i = t.call(e, r);
} catch (e) {
i = [ 6, e ];
o = 0;
} finally {
n = a = 0;
}
if (5 & i[0]) throw i[1];
return {
value: i[0] ? i[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = cc._decorator, l = r.ccclass, s = (r.property, function() {
function e() {
this.loadCount = 0;
this.completeCount = 0;
}
t = e;
Object.defineProperty(e, "instance", {
get: function() {
this._instance || (this._instance = new t());
return this._instance;
},
enumerable: !1,
configurable: !0
});
e.prototype.preloadScene = function(e, t, n, o) {
var a = cc.director, i = a._getSceneUuid(e);
if (i) {
a.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING, e);
cc.assetManager.loadAny({
uuid: i.uuid,
type: "uuid"
}, null == o ? null : function(e, n) {
o && o.call(t, e, n);
}, function(t, o) {
t && cc.errorID(1215, e, t.message);
n && n(t, o);
});
} else {
var r = 'Can not preload the scene "' + e + '" because it is not in the build settings.';
n && n(new Error(r));
cc.error("preloadScene: " + r);
}
};
e.prototype.loadRes = function(e, t) {
return a(this, void 0, Promise, function() {
var n = this;
return i(this, function(o) {
this.loadCount++;
return [ 2, new Promise(function(o, a) {
cc.assetManager.loadAny(e, t, function(e, t) {
n.completeCount++;
o(t);
});
}) ];
});
});
};
e.prototype.loadResByUrl = function(e, t) {
void 0 === t && (t = !1);
return a(this, void 0, Promise, function() {
var n = this;
return i(this, function(o) {
this.loadCount++;
return [ 2, new Promise(function(o, a) {
cc.resources.loadDir(e, function(e, a) {
n.completeCount++;
o(t ? a : 1);
});
}) ];
});
});
};
e.prototype.getRes = function(e, t) {
return cc.resources.get(e, t);
};
e.prototype.checkLoadComplete = function() {
return a(this, void 0, void 0, function() {
var e = this;
return i(this, function(t) {
return [ 2, new Promise(function(t, n) {
var o = setInterval(function() {
if (e.completeCount >= e.loadCount) {
clearInterval(o);
t(1);
}
}, 50);
}) ];
});
});
};
var t;
return e = t = o([ l ], e);
}());
n.default = s;
cc._RF.pop();
}, {} ],
LocalStorage: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "381445ec9xNYJ/FKVpy9TwP", "LocalStorage");
var o = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = cc._decorator, i = a.ccclass, r = (a.property, function() {
function e() {}
e.saveItem = function(e, t) {
cc.sys.localStorage.setItem(e, t);
};
e.getItem = function(e, t) {
void 0 === t && (t = "");
var n = cc.sys.localStorage.getItem(e);
return n || t;
};
e.removeItem = function(e) {
cc.sys.localStorage.removeItem(e);
};
e.clear = function() {
cc.sys.localStorage.clear();
};
return e = o([ i ], e);
}());
n.default = r;
cc._RF.pop();
}, {} ],
LocalizedLabel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "744dcs4DCdNprNhG0xwq6FK", "LocalizedLabel");
var o = e("LanguageData");
cc.Class({
extends: cc.Component,
editor: {
executeInEditMode: !0,
menu: "i18n/LocalizedLabel"
},
properties: {
dataID: {
get: function() {
return this._dataID;
},
set: function(e) {
if (this._dataID !== e) {
this._dataID = e;
this.updateLabel();
}
}
},
_dataID: ""
},
onLoad: function() {
0;
o.inst || o.init();
this.fetchRender();
},
fetchRender: function() {
var e = this.getComponent(cc.Label);
if (e) {
this.label = e;
this.updateLabel();
} else ;
},
updateLabel: function() {
if (this.label) {
o.t(this.dataID) && (this.label.string = o.t(this.dataID));
} else cc.error("Failed to update localized label, label component is invalid!");
}
});
cc._RF.pop();
}, {
LanguageData: "LanguageData"
} ],
LocalizedSprite: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f34ac2GGiVOBbG6XlfvgYP4", "LocalizedSprite");
var o = e("SpriteFrameSet");
cc.Class({
extends: cc.Component,
editor: {
executeInEditMode: !0,
inspector: "packages://i18n/inspector/localized-sprite.js",
menu: "i18n/LocalizedSprite"
},
properties: {
spriteFrameSet: {
default: [],
type: o
}
},
onLoad: function() {
this.fetchRender();
},
fetchRender: function() {
var e = this.getComponent(cc.Sprite);
if (e) {
this.sprite = e;
this.updateSprite(window.i18n.curLang);
} else ;
},
getSpriteFrameByLang: function(e) {
for (var t = 0; t < this.spriteFrameSet.length; ++t) if (this.spriteFrameSet[t].language === e) return this.spriteFrameSet[t].spriteFrame;
},
updateSprite: function(e) {
if (this.sprite) {
var t = this.getSpriteFrameByLang(e);
!t && this.spriteFrameSet[0] && (t = this.spriteFrameSet[0].spriteFrame);
this.sprite.spriteFrame = t;
} else cc.error("Failed to update localized sprite, sprite component is invalid!");
}
});
cc._RF.pop();
}, {
SpriteFrameSet: "SpriteFrameSet"
} ],
LookAdvertising: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5313evof+BNqK+ZRXLVkeOu", "LookAdvertising");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e() {}
e.LookVideo = function(e) {
void 0 === e && (e = null);
return !0;
};
return e;
}();
n.default = o;
cc._RF.pop();
}, {} ],
MapItemPrefab: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "23cddYpXodOEIOqctB42xD6", "MapItemPrefab");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../../code/manager/NodePoolMananger"), r = e("./NormalLevelBtn"), l = e("../../../code/manager/MyRoleDataManager"), s = e("./BossLevelBtn"), c = e("../../../code/Lib/Global"), u = cc._decorator, d = u.ccclass, p = u.property, f = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.levelNode = null;
t.mapResourceArr = [];
t.backSprite = null;
t.stoneNodeArr = [];
t.stoneNode = null;
t.levelArr1 = [ [ -26, 67 ], [ -225, 173 ], [ 22, 258 ], [ 227, 326 ], [ -23, 443 ], [ -225, 535 ], [ 21, 644 ], [ 226, 743 ], [ -22, 844 ], [ -235, 956 ] ];
t.levelArr2 = [ [ 3, 61 ], [ 238, 168 ], [ -25, 268 ], [ -254, 384 ], [ 28, 475 ], [ 241, 553 ], [ -12, 668 ], [ -240, 769 ], [ -12, 865 ], [ 192, 939 ] ];
t.curIndex = 0;
t.btnArr = [];
t.bossBtn = null;
t.first = !0;
return t;
}
t.prototype.init = function(e) {
this.curIndex = e;
this.getBtn();
this.backSprite.spriteFrame = this.mapResourceArr[Math.abs(this.curIndex) % 2];
var t = Math.abs(this.curIndex) % 2 == 0 ? this.levelArr1 : this.levelArr2;
if (!(this.curIndex < 0)) {
for (var n = 0, o = 10 * e; o < 10 * (e + 1); o++) {
var a = o + 1, u = l.default.instance.curLevel >= a, d = void 0;
if (a % 20 == 0) {
this.bossBtn = d = i.default.instance.pop("bossLevelBtn");
this.levelNode.addChild(d);
d.getComponent(s.default).init(u, a);
if (this.btnArr[n]) {
var p = this.btnArr[n];
p.removeFromParent();
i.default.instance.push(p);
this.btnArr[n] = null;
}
} else {
if (this.btnArr[n]) d = this.btnArr[n]; else {
d = i.default.instance.pop("normalLevelBtn");
this.levelNode.addChild(d);
this.btnArr[n] = d;
}
d.getComponent(r.default).init(u, a);
}
d.setPosition(cc.v2(t[n][0], t[n][1]));
n++;
}
if (this.first) {
this.scheduleOnce(this.randomStone, c.default.Random(0, 10));
this.first = !1;
}
this.schedule(this.randomStone, c.default.Random(20, 30), cc.macro.REPEAT_FOREVER);
}
};
t.prototype.getBtn = function() {
if (this.curIndex < 0) {
for (var e = 0; e < this.levelNode.children.length; e++) {
var t = this.levelNode.children[e];
e--;
t.removeFromParent();
i.default.instance.push(t);
}
this.btnArr = [];
}
if (this.bossBtn) {
this.bossBtn.removeFromParent();
i.default.instance.push(this.bossBtn);
this.bossBtn = null;
}
};
t.prototype.randomStone = function() {
var e = c.default.arrRandom(this.stoneNodeArr), t = cc.instantiate(e);
t.active = !0;
this.stoneNode.addChild(t, 1);
var n = c.default.Random(650, 1024);
t.setPosition(cc.v2(420, n));
var o = cc.sequence(cc.moveTo(c.default.Random(20, 30), cc.v2(-420, n - 650)), cc.callFunc(function() {
t.removeFromParent();
}));
t.runAction(o);
};
a([ p({
type: cc.Node,
tooltip: "按钮节点"
}) ], t.prototype, "levelNode", void 0);
a([ p({
type: [ cc.SpriteFrame ],
tooltip: "背景资源数组"
}) ], t.prototype, "mapResourceArr", void 0);
a([ p({
type: cc.Sprite,
tooltip: "背景"
}) ], t.prototype, "backSprite", void 0);
a([ p({
type: [ cc.Node ],
tooltip: "陨石"
}) ], t.prototype, "stoneNodeArr", void 0);
a([ p({
type: cc.Node,
tooltip: "陨石节点"
}) ], t.prototype, "stoneNode", void 0);
return t = a([ d ], t);
}(cc.Component);
n.default = f;
cc._RF.pop();
}, {
"../../../code/Lib/Global": "Global",
"../../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../../code/manager/NodePoolMananger": "NodePoolMananger",
"./BossLevelBtn": "BossLevelBtn",
"./NormalLevelBtn": "NormalLevelBtn"
} ],
MapLevelTable: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f1227UXjd5N/7G2y5sB1LeS", "MapLevelTable");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../../code/Lib/Global"), a = e("../../code/Lib/StringUtils"), i = e("../../code/manager/TableManager"), r = e("../../code/manager/MyRoleDataManager"), l = function() {
function e(e) {
this.levelNumInOneChap = 20;
this.table = e;
}
e.prototype.getDataByLevel = function(e) {
if (0 == e) return {
id: "202000",
ball_complete: "15",
ball_low: "1",
basis_hp: "50",
hp_rate_low: "0",
hp_rate_high: "0",
hp_rate_max: "0",
ball_time: "6",
reward_level: "510000:100:0;510002:10:0",
reward_passage: "301001"
};
var t = Math.floor((e - 1) / this.levelNumInOneChap);
t = t >= this.table.length ? this.table.length - 1 : t;
return this.table[t];
};
e.prototype.getBaseHpByLevel = function(e) {
if (0 == e) return 50;
var t = Math.floor((e - 1) / this.levelNumInOneChap), n = (t = t >= this.table.length ? this.table.length - 1 : t) + 1;
n = n >= this.table.length ? this.table.length - 1 : n;
var o = Number(this.table[t].basis_hp), a = Number(this.table[n].basis_hp), i = .1 * (e - this.getMaxLevel()) + 1;
i = (i = i < 1 ? 1 : i) > 8 ? 8 : i;
return ((a - o) * ((e - 1) % this.levelNumInOneChap / this.levelNumInOneChap) + o) * i;
};
e.prototype.getCurChapter = function(e) {
return Math.floor((e - 1) / this.levelNumInOneChap) + 1;
};
e.prototype.getCurLevelIndex = function(e) {
return (e - 1) % this.levelNumInOneChap;
};
e.prototype.getCurChapterId = function(e) {
var t = this.getDataByLevel(e);
return Number(t.id);
};
e.prototype.getLevelCompleteReward = function(e) {
e = e <= 1 ? 1 : e;
var t = this.getCurLevelIndex(e), n = this.getDataByLevel(e), r = a.default.instance.strToArr4(n.reward_level), l = t % 2, s = i.default.instance.connonTable.getBestTenUpgradeMoney(), c = new Map();
if (t == this.levelNumInOneChap - 1) {
for (var u = r.length, d = 0; d < u; d++) 51e4 == r[d][0] ? c.set(51e4, Math.floor(s * (.001 * r[d][1]))) : 510001 == r[d][0] ? c.set(510001, Math.floor(r[d][2] * (.001 * r[d][1]))) : 510002 == r[d][0] && c.set(510002, Math.floor(r[d][1]));
c.set(Number(n.reward_passage), 1);
} else {
c.set(51e4, Math.floor(s * (.03 + .001 * t)));
0 == l ? c.set(510001, o.default.Random(1, 3)) : 1 == l && c.set(510002, o.default.Random(1, 3));
}
return c;
};
e.prototype.getGameEndReward = function(e) {
e = e <= 1 ? 1 : e;
var t = this.getDataByLevel(e), n = i.default.instance.connonTable.getBestTenUpgradeMoney(), o = new Map();
202e3 == t.id || 301e3 == r.default.instance.curCannonID ? o.set(51e4, Math.floor(.3 * n)) : o.set(51e4, Math.floor(.05 * n));
o.set(510001, 2);
return o;
};
e.prototype.getMaxLevel = function() {
return 20 * this.table.length;
};
return e;
}();
n.default = l;
cc._RF.pop();
}, {
"../../code/Lib/Global": "Global",
"../../code/Lib/StringUtils": "StringUtils",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/TableManager": "TableManager"
} ],
MapPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5d699rjYk1DbrT+cU5CgYiH", "MapPanel");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../../code/manager/UiAniManager"), r = e("../../../code/manager/PanelManager"), l = e("../../../code/Config/Config"), s = e("../../../code/manager/NodePoolMananger"), c = e("./MapItemPrefab"), u = e("../../../code/manager/MyRoleDataManager"), d = e("../../../code/manager/SoundManager"), p = e("../../../code/basecode/BasePanel"), f = cc._decorator, h = f.ccclass, g = f.property, y = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.nodeArr = [];
t.scenceParent = null;
t.closeButton = null;
t.mapResourceArr = [];
t.normalLevelBtn = null;
t.bossLevelBtn = null;
t.okBtnLable = null;
t.okBtnLableShadow = null;
t._aniType = i.UiAniType.AlphaChange;
t.curIndex = 0;
t.touchId = -1;
return t;
}
t.prototype.onLoad = function() {
s.default.instance.addPool(this.normalLevelBtn);
s.default.instance.addPool(this.bossLevelBtn);
};
t.prototype.openPanel = function() {
this.playUIAni(i.InOrOut.IN);
this.addEvent();
this.setPos(u.default.instance.curLevel - 1);
};
t.prototype.closePanel = function() {
this.playUIAni(i.InOrOut.OUT);
this.dleEvent();
};
t.prototype.panelIn = function() {};
t.prototype.panelOut = function() {
r.default.instance.deleteOpen(l.PanelName.MapPanel);
this.node.removeFromParent();
};
t.prototype.addEvent = function() {
this.scenceParent.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
this.scenceParent.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
this.scenceParent.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
this.closeButton.node.on("click", this.closeBtTap, this);
};
t.prototype.dleEvent = function() {
this.scenceParent.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
this.scenceParent.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
this.scenceParent.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
this.closeButton.node.off("click", this.closeBtTap, this);
};
t.prototype.setLable = function() {
this.okBtnLable.string = this.okBtnLableShadow.string = GlobalFun.i18n.t("lable.10009");
};
t.prototype.setPos = function(e) {
var t = Math.floor(e / 10);
this.curIndex = t;
this.nodeArr[2].y = -824;
this.nodeArr[1].y = 200;
this.nodeArr[0].y = 1224;
this.nodeArr[2].getComponent(c.default).init(this.curIndex - 1);
this.nodeArr[1].getComponent(c.default).init(this.curIndex);
this.nodeArr[0].getComponent(c.default).init(this.curIndex + 1);
};
t.prototype.touchStart = function(e) {
-1 == this.touchId && (this.touchId = e.getID());
};
t.prototype.touchMove = function(e) {
if (this.touchId == e.getID()) {
for (var t = Math.floor(e.getDelta().y), n = this.nodeArr.length, o = 0; o < n; o++) this.nodeArr[o].y += t;
this.checkNodeChange(t);
}
};
t.prototype.touchEnd = function(e) {
this.touchId == e.getID() && (this.touchId = -1);
};
t.prototype.checkNodeChange = function(e) {
if (e > 0) {
if (0 == this.curIndex && this.nodeArr[2].y >= -824) {
this.nodeArr[2].y = -824;
this.nodeArr[1].y = 200;
this.nodeArr[0].y = 1224;
return;
}
if (this.nodeArr[2].y > 0) {
this.nodeArr[2].y = 0;
this.nodeArr[1].y = 1024;
this.nodeArr[0].y = -1024;
this.curIndex--;
(n = this.nodeArr.shift()).getComponent(c.default).init(this.curIndex - 1);
this.nodeArr.push(n);
}
} else if (e < 0) {
var t = this.scenceParent.height - this.nodeArr[0].height;
if (this.nodeArr[0].y <= t) {
this.curIndex++;
this.nodeArr[0].y = t;
this.nodeArr[1].y = -(1024 - t);
this.nodeArr[2].y = this.scenceParent.height;
var n;
(n = this.nodeArr.pop()).getComponent(c.default).init(this.curIndex + 1);
this.nodeArr.unshift(n);
}
}
};
t.prototype.closeBtTap = function() {
d.default.playSoundEffect(d.default.btnSound);
r.default.instance.closePanel(l.PanelName.MapPanel);
};
a([ g([ cc.Node ]) ], t.prototype, "nodeArr", void 0);
a([ g(cc.Node) ], t.prototype, "scenceParent", void 0);
a([ g(cc.Button) ], t.prototype, "closeButton", void 0);
a([ g({
type: [ cc.SpriteFrame ],
tooltip: "地图背景"
}) ], t.prototype, "mapResourceArr", void 0);
a([ g({
type: cc.Prefab,
tooltip: "普通关卡按钮"
}) ], t.prototype, "normalLevelBtn", void 0);
a([ g({
type: cc.Prefab,
tooltip: "boss关卡按钮"
}) ], t.prototype, "bossLevelBtn", void 0);
a([ g({
type: cc.Label,
tooltip: "ok按钮Lable"
}) ], t.prototype, "okBtnLable", void 0);
a([ g({
type: cc.Label,
tooltip: "ok按钮Lable阴影"
}) ], t.prototype, "okBtnLableShadow", void 0);
return t = a([ h ], t);
}(p.default);
n.default = y;
cc._RF.pop();
}, {
"../../../code/Config/Config": "Config",
"../../../code/basecode/BasePanel": "BasePanel",
"../../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../../code/manager/NodePoolMananger": "NodePoolMananger",
"../../../code/manager/PanelManager": "PanelManager",
"../../../code/manager/SoundManager": "SoundManager",
"../../../code/manager/UiAniManager": "UiAniManager",
"./MapItemPrefab": "MapItemPrefab"
} ],
MissionItem: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "91adfNDjrNItqUdhlv902W3", "MissionItem");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../../code/manager/MissionManger"), r = e("../../../code/manager/TableManager"), l = e("../../../code/Lib/DateUtils"), s = e("../../../code/Lib/Global"), c = e("./RewardItem"), u = e("../../../code/manager/SoundManager"), d = e("../../../code/manager/PanelManager"), p = e("../../../code/manager/MyRoleDataManager"), f = e("../../../code/manager/SDKManager"), h = cc._decorator, g = h.ccclass, y = h.property, m = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.missionNode = null;
t.waitNode = null;
t.missionIcon = null;
t.infoLable = null;
t.rewardNode = null;
t.proLable = null;
t.completeBtn = null;
t.refreshLable = null;
t.waitLable = null;
t.missionAni = null;
t.completeNode = null;
return t;
}
t.prototype.onLoad = function() {
this.completeBtn && this.completeBtn.node.on("click", this.completeMission, this);
};
t.prototype.update = function() {
if (this.isInWait) {
var e = this.missionData.refreshTime - s.default.getTime();
e > 0 ? this.refreshLable.string = l.default.instance.getFormatBySecond(.001 * e, 1) : this.refreshMission();
}
};
t.prototype.init = function(e) {
this.missionData = e;
this.missionId = e.id;
var t = s.default.getTime();
0 != e.type && (this.missionIcon.spriteFrame = d.default.gameUi.iconAtlas.getSpriteFrame(r.default.instance.propTable.getIcon(e.collectPropId)));
if (e.isComplete && e.refreshTime - t > 0) {
this.waitLable.string = GlobalFun.i18n.t("lable.10222");
this.waitNode.active = !0;
this.missionNode.active = !1;
this.isInWait = !0;
this.refreshLable.string = l.default.instance.getFormatBySecond(.001 * (e.refreshTime - s.default.getTime()), 1);
} else {
if (e.isComplete && e.refreshTime - t < 0) {
this.missionData = e = i.default.instance.refreshMission(this.missionId);
this.missionId = e.id;
}
this.waitNode.active = !1;
this.missionNode.active = !0;
this.isInWait = !1;
this.refreshLable.string = GlobalFun.i18n.t("lable." + e.nameId);
var n = GlobalFun.i18n.t("lable." + e.decId);
this.infoLable.string = n.replace("%d", e.quest + "");
this.proLable.string = e.pro + "/" + e.quest;
var o = r.default.instance.missionTable.getReward(e.id);
this.rewardNode.getComponent(c.default).init(o);
if (e.pro >= e.quest) {
this.completeNode.active = !0;
this.proLable.node.active = !1;
} else {
this.completeNode.active = !1;
this.proLable.node.active = !0;
}
}
};
t.prototype.refreshMission = function() {
this.state = 1;
this.isInWait = !1;
this.missionData = i.default.instance.refreshMission(this.missionId);
this.missionId = this.missionData.id;
this.missionAni.play("missionItemMove");
};
t.prototype.completeMission = function() {
if (i.default.instance.checkMissionComplete(this.missionId)) {
f.default.instance.callJava("trackEvent", "(Ljava/lang/String;)V", "NormalMissionComplete");
this.state = 0;
u.default.playSoundEffect(u.default.btnSound);
this.rewardNode.getComponent(c.default).rewardFly([ d.default.gameUi.goldLable.node, d.default.gameUi.diamondLable.node ]);
this.missionData = i.default.instance.completeMission(this.missionId);
r.default.instance.missionTable.getReward(this.missionId).forEach(function(e, t) {
p.default.instance.addCurrency(e, t);
});
this.missionAni.play("missionItemMove");
}
};
t.prototype.refreshShow = function() {
this.node.zIndex = 3;
this.init(this.missionData);
};
a([ y({
type: cc.Node,
tooltip: "显示任务详情节点"
}) ], t.prototype, "missionNode", void 0);
a([ y({
type: cc.Node,
tooltip: "冷却显示节点"
}) ], t.prototype, "waitNode", void 0);
a([ y({
type: cc.Sprite,
tooltip: "任务图标"
}) ], t.prototype, "missionIcon", void 0);
a([ y({
type: cc.Label,
tooltip: "任务信息"
}) ], t.prototype, "infoLable", void 0);
a([ y({
type: cc.Node,
tooltip: "奖励节点"
}) ], t.prototype, "rewardNode", void 0);
a([ y({
type: cc.Label,
tooltip: "任务进度"
}) ], t.prototype, "proLable", void 0);
a([ y({
type: cc.Button,
tooltip: "完成按钮"
}) ], t.prototype, "completeBtn", void 0);
a([ y({
type: cc.Label,
tooltip: "冷却时间"
}) ], t.prototype, "refreshLable", void 0);
a([ y({
type: cc.Label,
tooltip: "冷却lable"
}) ], t.prototype, "waitLable", void 0);
a([ y({
type: cc.Animation,
tooltip: "动画"
}) ], t.prototype, "missionAni", void 0);
a([ y({
type: cc.Node,
tooltip: "完成节点"
}) ], t.prototype, "completeNode", void 0);
return t = a([ g ], t);
}(cc.Component);
n.default = m;
cc._RF.pop();
}, {
"../../../code/Lib/DateUtils": "DateUtils",
"../../../code/Lib/Global": "Global",
"../../../code/manager/MissionManger": "MissionManger",
"../../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../../code/manager/PanelManager": "PanelManager",
"../../../code/manager/SDKManager": "SDKManager",
"../../../code/manager/SoundManager": "SoundManager",
"../../../code/manager/TableManager": "TableManager",
"./RewardItem": "RewardItem"
} ],
MissionManger: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "88124MJH6lNM4zVhlytfqdB", "MissionManger");
var o = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = e("../Lib/LocalStorage"), i = e("./TableManager"), r = e("../Lib/Global"), l = cc._decorator, s = l.ccclass, c = (l.property, 
function() {
function e() {
this.curMission = [];
this.itemCollectNum = 0;
var e = a.default.getItem("curMission", "[]");
this.curSpecilMission = JSON.parse(a.default.getItem("specialMission", "{}"));
this.curMission = JSON.parse(e);
}
t = e;
Object.defineProperty(e, "instance", {
get: function() {
this._instance || (this._instance = new t());
return this._instance;
},
enumerable: !1,
configurable: !0
});
e.prototype.init = function() {
if (this.curMission.length < 3) for (var e = 0, t = 3 - this.curMission.length; e < t; e++) this.addMission(0);
r.default.getServerWeek();
var n = r.default.getTime();
if (this.curSpecilMission.id && n > this.curSpecilMission.refreshTime || !this.curSpecilMission.id) {
this.addMission(1);
return !0;
}
return !1;
};
e.prototype.addMission = function(e) {
if (0 == e) {
if (this.curMission.length >= 3) return;
if (!(n = i.default.instance.missionTable.getRandomMission())) return;
var t = this.normalMission(n);
this.curMission.push(t);
} else {
var n;
if (!(n = i.default.instance.missionTable.getRandomSpecialMission())) return;
this.curSpecilMission = this.specialMission(n);
}
this.saveMission();
};
e.prototype.completeMission = function(e) {
for (var t, n = this.curMission.length, o = 0; o < n; o++) if (this.curMission[o].id == e) {
(t = this.curMission[o]).isComplete = !0;
t.refreshTime = r.default.getTime() + 1e3 * t.refreshTime;
this.curMission.splice(o, 1);
break;
}
this.curMission.push(t);
this.saveMission();
return t;
};
e.prototype.refreshMission = function(e) {
for (var t = this.curMission.length, n = 0; n < t; n++) if (this.curMission[n].id == e) {
this.curMission[n] = null;
this.curMission[n] = this.normalMission(i.default.instance.missionTable.getRandomMission());
this.saveMission();
return this.curMission[n];
}
};
e.prototype.collectMissionNum = function(e, t) {
for (var n = this.curMission.length, o = 0; o < n; o++) this.curMission[o].questType == e && (this.curMission[o].pro += t);
};
e.prototype.collectSpecialProp = function(e, t) {
if (this.curSpecilMission.collectPropId == e) {
this.itemCollectNum++;
this.curSpecilMission.pro += t;
}
};
e.prototype.maxMissionNum = function(e, t) {
for (var n = this.curMission.length, o = 0; o < n; o++) this.curMission[o].questType == e && t >= this.curMission[o].quest && (this.curMission[o].pro = t);
};
e.prototype.saveMission = function() {
for (var e = "[", t = this.curMission.length, n = 0; n < t; n++) {
var o = this.curMission[n];
e += JSON.stringify(o);
n != t - 1 && (e += ",");
}
e += "]";
a.default.saveItem("curMission", e);
a.default.saveItem("specialMission", JSON.stringify(this.curSpecilMission));
};
e.prototype.normalMission = function(e) {
var t = e.complete.split(":");
return {
id: e.id,
nameId: e.name,
decId: e.des1,
type: e.type,
questType: Number(t[0]),
pro: 0,
quest: Number(t[1]),
refreshTime: e.refresh_time,
isComplete: !1
};
};
e.prototype.specialMission = function(e) {
var t = e.complete.split(":");
return {
id: e.id,
nameId: e.name,
decId: e.des2,
missionStartDes: e.des1,
type: e.type,
questType: Number(t[0]),
collectPropId: Number(t[1]),
pro: 0,
quest: Number(t[2]),
refreshTime: this.specialMissionRefreshTime(Number(e.refresh_time)),
isComplete: !1,
nextId: e.next_job,
totalPro: 1,
totalNumber: i.default.instance.missionTable.getSpecialTotal(e.type),
isCompleteAll: !1
};
};
e.prototype.specialMissionRefreshTime = function(e) {
var t = r.default.getServerWeek(), n = 0;
1 == e || 3 == e ? n = r.default.getTodayTime() + 24 * (e - t + 2) * 60 * 60 * 1e3 : 5 == e && 0 == t ? n = r.default.getTomorrowTime() : 5 != e || 5 != t && 6 != t || (n = r.default.getTodayTime() + 24 * (e - t + 3) * 60 * 60 * 1e3);
return n;
};
e.prototype.completeSpecial = function() {
var e = this.curSpecilMission.id, t = 0 != this.curSpecilMission.nextId ? this.curSpecilMission.nextId : this.curSpecilMission.id, n = this.curSpecilMission.totalPro;
this.curSpecilMission = this.specialMission(i.default.instance.missionTable.getData(t));
this.curSpecilMission.totalPro = n + 1 <= this.curSpecilMission.totalNumber ? n + 1 : this.curSpecilMission.totalNumber;
a.default.saveItem("specialMission", JSON.stringify(this.curSpecilMission));
return e;
};
e.prototype.getCompleteMission = function(e) {
for (var t = this.curMission.length, n = 0; n < t; n++) {
var o = this.curMission[n];
if (o.pro >= o.quest && !o.isComplete && 1 != e) return o.id;
}
return this.curSpecilMission.pro >= this.curSpecilMission.quest && !this.curSpecilMission.isCompleteAll && 0 != e && this.curSpecilMission.id;
};
e.prototype.checkMissionComplete = function(e) {
if (this.curSpecilMission.id == e && this.curSpecilMission.pro >= this.curSpecilMission.quest && !this.curSpecilMission.isComplete) return !0;
for (var t = this.curMission.length, n = 0; n < t; n++) {
var o = this.curMission[n];
if (o.id == e && o.pro >= o.quest && !o.isComplete) return !0;
}
return !1;
};
var t;
return e = t = o([ s ], e);
}());
n.default = c;
cc._RF.pop();
}, {
"../Lib/Global": "Global",
"../Lib/LocalStorage": "LocalStorage",
"./TableManager": "TableManager"
} ],
MissionPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5ba4deKJzZKhIkkVd/jZeW4", "MissionPanel");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../../code/manager/UiAniManager"), r = e("../../../code/basecode/BasePanel"), l = e("../../../code/manager/TableManager"), s = e("../../../code/manager/MissionManger"), c = e("../../../code/manager/PanelManager"), u = e("../../../code/Config/Config"), d = e("../../../code/manager/MyRoleDataManager"), p = e("./RewardItem"), f = e("../../../code/manager/SoundManager"), h = e("../../../code/manager/GuideManager"), g = e("../../../code/manager/SDKManager"), y = e("../../../code/Lib/Global"), m = e("../../../code/Lib/DateUtils"), b = cc._decorator, v = b.ccclass, S = b.property, _ = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.nameLabel = null;
t.okBtn = null;
t.specialNameLabel = null;
t.specialInfoLabel = null;
t.leftTimeLabel = null;
t.proLabel = null;
t.pro = null;
t.rewardNode = null;
t.specialAni = null;
t.completeBtn = null;
t.missionNode = null;
t.missionItemPrefab = null;
t.missionShowNode = null;
t.missionCompleteNode = null;
t.icon = null;
t.missioncompleteNode = null;
t.downNode = null;
t.viewNode = null;
t.specialid = null;
t.missionScriptArr = [];
t._aniType = i.UiAniType.TopToDown;
t.isHaveSpecialMission = !0;
return t;
}
t.prototype.onLoad = function() {
this.node.getComponent(cc.Widget).updateAlignment();
if (this.node.height <= 1320) {
this.node.getChildByName("panel").getComponent(cc.Widget).updateAlignment();
this.downNode.getComponent(cc.Widget).isAlignTop = !0;
this.downNode.getComponent(cc.Widget).isAlignBottom = !0;
this.downNode.getComponent(cc.Widget).top = 200;
this.downNode.getComponent(cc.Widget).bottom = 90;
this.downNode.getComponent(cc.Widget).updateAlignment();
}
};
t.prototype.update = function() {
if (this.isHaveSpecialMission) {
var e = y.default.getTime();
this.leftTimeLabel.string = GlobalFun.i18n.t("lable.10004") + m.default.instance.getFormatBySecond((s.default.instance.curSpecilMission.refreshTime - e) / 1e3, 1);
}
};
t.prototype.openPanel = function() {
this.updateInfo();
this.playUIAni(i.InOrOut.IN);
this.setLable();
this.addEvent();
};
t.prototype.closePanel = function() {
c.default.gameUi.btnTishi();
this.playUIAni(i.InOrOut.OUT);
this.dleEvent();
};
t.prototype.panelIn = function() {
h.default.instance.checkCanGuide(10003, 1) ? h.default.instance.startGuide(10003) : h.default.instance.checkCanGuide(10004, 1) && h.default.instance.startGuide(10004);
};
t.prototype.panelOut = function() {
this.node.removeFromParent();
};
t.prototype.addEvent = function() {
this.okBtn.node.on("click", this.okBtnTap, this);
this.completeBtn.node.on("click", this.completeSpecialMission, this);
};
t.prototype.dleEvent = function() {
this.okBtn.node.off("click", this.okBtnTap, this);
this.completeBtn.node.off("click", this.completeSpecialMission, this);
};
t.prototype.setLable = function() {
this.nameLabel.string = GlobalFun.i18n.t("lable.10113");
this.specialMissionShow();
for (var e = this.missionScriptArr.length, t = 0; t < e; t++) {
var n = s.default.instance.curMission[t], o = this.missionScriptArr[t];
n && o.init(n);
}
};
t.prototype.getCompleteNode = function() {
for (var e = s.default.instance.curMission, t = e.length, n = 0; n < t; n++) if (e[n].pro >= e[n].quest && !e[n].isComplete) return this.missionNode.children[n + 1];
};
t.prototype.updateInfo = function() {
this.missionScriptArr = [];
for (var e = 0, t = this.missionNode.childrenCount; e < t; e++) if ("MissionItem" == this.missionNode.children[e].name) {
var n = this.missionNode.children[e].getComponent("MissionItem");
n && this.missionScriptArr.push(n);
}
var o = this.missionScriptArr.length;
for (e = 0; e < o; e++) {
var a = s.default.instance.curMission[e], i = this.missionScriptArr[e];
a ? i.init(a) : i.node.active = !1;
}
};
t.prototype.specialMissionShow = function() {
var e = s.default.instance.curSpecilMission;
this.specialNameLabel.string = e.totalPro + "/" + e.totalNumber;
this.specialid.string = GlobalFun.i18n.t("lable." + e.nameId);
this.specialInfoLabel.string = GlobalFun.i18n.t("lable." + e.decId).replace("%d", e.quest);
this.specialStr = GlobalFun.i18n.t("lable.10004");
this.proLabel.string = e.pro + "/" + e.quest;
this.pro.progress = e.pro / e.quest;
var t = l.default.instance.missionTable.getReward(e.id);
this.icon.spriteFrame = c.default.gameUi.iconAtlas.getSpriteFrame(l.default.instance.propTable.getIcon(e.collectPropId));
this.rewardNode.getComponent(p.default).init(t);
this.missionCompleteNode.active = !1;
this.missionShowNode.active = !0;
e.pro >= e.quest && !e.isCompleteAll ? this.missioncompleteNode.active = !0 : e.pro < e.quest && !e.isCompleteAll ? this.missioncompleteNode.active = !1 : e.isCompleteAll && (this.missionShowNode.active = !1);
};
t.prototype.completeSpecialMission = function() {
if (s.default.instance.checkMissionComplete(s.default.instance.curSpecilMission.id)) {
g.default.instance.callJava("trackEvent", "(Ljava/lang/String;)V", "SpecialMissionComplete");
f.default.playSoundEffect(f.default.btnSound);
var e = s.default.instance.completeSpecial();
l.default.instance.missionTable.getReward(e).forEach(function(e, t) {
d.default.instance.addCurrency(e, t);
});
this.rewardNode.getComponent(p.default).rewardFly([ c.default.gameUi.goldLable.node, c.default.gameUi.diamondLable.node ]);
this.specialAni.play("specialMissionItemMove");
}
};
t.prototype.okBtnTap = function() {
f.default.playSoundEffect(f.default.btnSound);
c.default.instance.closePanel(u.PanelName.MissionPanel);
};
t.prototype.refreshShow = function() {
this.specialMissionShow();
};
a([ S({
type: cc.Label,
tooltip: "界面名"
}) ], t.prototype, "nameLabel", void 0);
a([ S({
type: cc.Button,
tooltip: "关闭按钮"
}) ], t.prototype, "okBtn", void 0);
a([ S({
type: cc.Label,
tooltip: "特殊任务名字"
}) ], t.prototype, "specialNameLabel", void 0);
a([ S({
type: cc.Label,
tooltip: "特殊任务信息"
}) ], t.prototype, "specialInfoLabel", void 0);
a([ S({
type: cc.Label,
tooltip: "特殊任务剩余时间"
}) ], t.prototype, "leftTimeLabel", void 0);
a([ S({
type: cc.Label,
tooltip: "特殊任务进度"
}) ], t.prototype, "proLabel", void 0);
a([ S({
type: cc.ProgressBar,
tooltip: "特殊任务进度"
}) ], t.prototype, "pro", void 0);
a([ S({
type: cc.Node,
tooltip: "特殊任务奖励"
}) ], t.prototype, "rewardNode", void 0);
a([ S({
type: cc.Animation,
tooltip: "特殊任务进度"
}) ], t.prototype, "specialAni", void 0);
a([ S({
type: cc.Button,
tooltip: "特殊任务完成Btn"
}) ], t.prototype, "completeBtn", void 0);
a([ S({
type: cc.Node,
tooltip: "任务item节点"
}) ], t.prototype, "missionNode", void 0);
a([ S({
type: cc.Prefab,
tooltip: "普通任务item节点预制体"
}) ], t.prototype, "missionItemPrefab", void 0);
a([ S({
type: cc.Node,
tooltip: "任务显示节点"
}) ], t.prototype, "missionShowNode", void 0);
a([ S({
type: cc.Node,
tooltip: "舍弃的任务完成节点"
}) ], t.prototype, "missionCompleteNode", void 0);
a([ S({
type: cc.Sprite,
tooltip: "特殊任务icon"
}) ], t.prototype, "icon", void 0);
a([ S({
type: cc.Node,
tooltip: "特殊任务完成节点"
}) ], t.prototype, "missioncompleteNode", void 0);
a([ S({
type: cc.Node,
tooltip: "下方节点"
}) ], t.prototype, "downNode", void 0);
a([ S({
type: cc.Node,
tooltip: "显示节点"
}) ], t.prototype, "viewNode", void 0);
a([ S({
type: cc.Label,
tooltip: "特殊任务ID"
}) ], t.prototype, "specialid", void 0);
return t = a([ v ], t);
}(r.default);
n.default = _;
cc._RF.pop();
}, {
"../../../code/Config/Config": "Config",
"../../../code/Lib/DateUtils": "DateUtils",
"../../../code/Lib/Global": "Global",
"../../../code/basecode/BasePanel": "BasePanel",
"../../../code/manager/GuideManager": "GuideManager",
"../../../code/manager/MissionManger": "MissionManger",
"../../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../../code/manager/PanelManager": "PanelManager",
"../../../code/manager/SDKManager": "SDKManager",
"../../../code/manager/SoundManager": "SoundManager",
"../../../code/manager/TableManager": "TableManager",
"../../../code/manager/UiAniManager": "UiAniManager",
"./RewardItem": "RewardItem"
} ],
MissionTable: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "83847y9EuZFha/VvHTgbvW4", "MissionTable");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../../code/manager/MyRoleDataManager"), a = e("../../code/Lib/Global"), i = e("../../code/Lib/StringUtils"), r = e("../../code/manager/MissionManger"), l = e("../../code/manager/TableManager"), s = function() {
function e(e) {
this.table = e;
}
e.prototype.getData = function(e) {
for (var t = this.table.length, n = 0; n < t; n++) {
var o = this.table[n];
if (o && o.id == e) return o;
}
};
e.prototype.getRandomMission = function() {
for (var e = 0 == o.default.instance.curLevel ? 1 : o.default.instance.curLevel, t = [], n = this.table.length, i = 0; i < n; i++) {
var l = this.table[i];
if (l && 0 == Number(l.type) && e >= Number(l.level)) {
for (var s = !1, c = r.default.instance.curMission, u = 0, d = c.length; u < d; u++) if (c[u] && c[u].id == l.id) {
s = !0;
break;
}
s || t.push(l);
}
}
return a.default.arrRandom(t);
};
e.prototype.getRandomSpecialMission = function() {
var e = a.default.getServerWeek();
switch (e) {
case 1:
case 2:
e = 1;
break;

case 3:
case 4:
e = 3;
break;

case 5:
case 6:
case 0:
e = 5;
break;

default:
e = 1;
}
for (var t = this.table.length, n = -1, o = [], i = 0; i < t; i++) {
var r = this.table[i];
if (r && Number(r.refresh_time) == e && r.type != n) {
o.push(r);
n = r.type;
}
}
return a.default.arrRandom(o);
};
e.prototype.getReward = function(e) {
for (var t = new Map(), n = this.table.length, o = 0; o < n; o++) {
var a = this.table[o];
if (a && a.id == e) for (var r = i.default.instance.strToArr3(a.reward), s = r.length, c = 0; c < s; c++) {
var u = r[c];
if (u) if (51e4 == u[0]) {
var d = l.default.instance.cannonGrowUp.getBestTenUpgradeMoney();
t.set(51e4, Math.floor(.001 * d * u[1]));
} else t.set(u[0], u[1]);
}
}
return t;
};
e.prototype.getNextId = function(e) {
for (var t = this.table.length, n = 0; n < t; n++) {
var o = this.table[n];
if (o && o.id == e) return o.next_job;
}
};
e.prototype.getSpecialTotal = function(e) {
for (var t = 0, n = this.table.length, o = 0; o < n; o++) {
var a = this.table[o];
a && a.type == e && t++;
}
return t;
};
return e;
}();
n.default = s;
cc._RF.pop();
}, {
"../../code/Lib/Global": "Global",
"../../code/Lib/StringUtils": "StringUtils",
"../../code/manager/MissionManger": "MissionManger",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/TableManager": "TableManager"
} ],
MyLable: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ac8c2+o7XdFSaNqrSnLoCv4", "MyLable");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = cc._decorator, r = i.ccclass, l = i.property, s = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.atlas = null;
t.startWidth = 0;
t.spriteFrameObj = {};
t.spriteArr = [];
t._string = "";
t.isChangeColor = !1;
return t;
}
t.prototype.update = function() {
if (this.isChangeColor) for (var e = this.spriteArr.length, t = 0; t < e; t++) this.spriteArr[t].node.color = this.node.color;
};
t.prototype.onLoad = function() {
this.startScale = this.node.scale;
};
Object.defineProperty(t.prototype, "string", {
get: function() {
return this._string;
},
set: function(e) {
this._string = e;
this.setSprite();
},
enumerable: !1,
configurable: !0
});
t.prototype.setSprite = function() {
for (var e = this.string.length, t = 0; t < e; t++) {
var n = this.string[t];
if (this.spriteArr[t]) {
this.spriteArr[t].spriteFrame = this.atlas.getSpriteFrame(n);
this.spriteArr[t].node.parent || this.node.addChild(this.spriteArr[t].node);
} else {
!0;
var o = new cc.Node().addComponent(cc.Sprite);
o.spriteFrame = this.atlas.getSpriteFrame(n);
this.spriteArr[t] = o;
o.trim = !1;
o.sizeMode = cc.Sprite.SizeMode.RAW;
this.node.addChild(o.node);
}
}
if (e < this.spriteArr.length) {
var a = this.spriteArr.length;
for (t = e; t < a; t++) if (this.spriteArr[t].node.parent) {
!0;
this.spriteArr[t].node.removeFromParent();
}
}
if (this.node.width && -1 != this.startWidth) {
this.node.getComponent(cc.Layout).updateLayout();
this.node.width > this.startWidth ? this.node.scale = this.startWidth / this.node.width * this.startScale : this.node.scale = this.startScale;
}
};
a([ l(cc.SpriteAtlas) ], t.prototype, "atlas", void 0);
a([ l(cc.Float) ], t.prototype, "startWidth", void 0);
return t = a([ r ], t);
}(cc.Component);
n.default = s;
cc._RF.pop();
}, {} ],
MyRoleDataManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e1165PMLJZN5YleNUzkSVcI", "MyRoleDataManager");
var o = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = e("../Lib/LocalStorage"), i = e("./SDKManager"), r = e("../Config/Config"), l = e("./SoundManager"), s = e("../Lib/Secret"), c = e("../Lib/Global"), u = e("./TableManager"), d = e("./PanelManager"), p = e("./BallManager"), f = e("./EffectManager"), h = cc._decorator, g = h.ccclass, y = (h.property, 
function() {
function e() {
this.isFullScreen = !1;
this.fringeNum = 80;
this.isShack = !0;
this.connonObject = {};
this.funnelObject = {};
this.propObject = {};
this.skinObject = {};
this.maxScore = 0;
this._Gold = "0";
this._Diamond = "0";
this._Chip = "0";
this.loginDays = 0;
this.lastLoginTime = 0;
this.nextFreeUpgrade = 0;
this.isUseFreeUpgrade = !1;
this.chooseFreeUpgrade = -1;
this.curLevel = 0;
this.isRate = !1;
this.buyId = "";
this.specialConnon = "";
this.allGoldMore = 1;
this.isSlowAction = !1;
this.timeScale = .2;
this.endlessLeftTimes = 3;
this.curScore = 0;
this.gameState = 0;
this.gameType = 0;
this.curCannonID = 0;
this.curScenceID = 0;
this.curSkinID = 6e5;
this.curGold = 0;
this.curDiamond = 0;
this.curLevelTotalBall = 0;
this.hpLess = 0;
this.tempTimeBulletHit = 0;
this.isFromComplete = !1;
this.isInMagnet = 0;
this.isInHit = 0;
this.isInFrozen = 0;
this.isInSpecial = -1;
this.isFreeVedio = !1;
this.freeVedioTimes = 0;
this.doubleTime = 9e5;
this.sourceNum = 5;
this.funnulConnonId = -1;
this.discounEndDate = 15467904e5;
this.discountEndTime = 0;
this.discountRefreshTime = 0;
this.discountExitTime = 36e5;
}
t = e;
e.prototype.getHitSpeed = function(e) {
void 0 === e && (e = null);
e || (e = this.curCannonID);
var t = u.default.instance.mapLevelTable.getCurLevelIndex(this.curLevel) + 1, n = u.default.instance.connonTable.getDataById(e), o = (Number(n.c_att_b) + Number(n.m_att_b)) * t;
return p.default.instance.ballBasisHp / o * 2;
};
e.prototype.addTempBulletHit = function(e) {
this.tempTimeBulletHit += e;
this.tempTimeBulletHit = this.tempTimeBulletHit <= 0 ? 0 : this.tempTimeBulletHit;
return this.tempTimeBulletHit;
};
e.prototype.getConnonInfo = function(e) {
void 0 === e && (e = null);
e = e || this.curCannonID;
var t = a.default.getItem("skillIntensifyLevel", "1");
return {
extraGun: Number(t),
lifeLevel: Number(t),
mainGunLevel: Number(t)
};
};
e.prototype.getConnonLevel = function(e, t) {
void 0 === t && (t = null);
t = t || this.curCannonID;
var n = this.connonObject[t];
if (n) {
var o = a.default.getItem("skillIntensifyLevel");
return Number(o);
}
return 1;
};
e.prototype.isConnon = function(e) {
var t = u.default.instance.connonTable.table[0].id, n = u.default.instance.connonTable.table[u.default.instance.connonTable.table.length - 1].id;
return e >= Number(t) && e <= Number(n);
};
e.prototype.getNewConnonInfo = function(e) {
return {
mainGunLevel: 1,
extraGun: -1,
lifeLevel: 1
};
};
e.prototype.startGame = function() {
this.curGold = 0;
this.curDiamond = 0;
this.curScore = 0;
this.gameState = 1;
i.default.instance.callJava("trackLevel", "(Ljava/lang/String;Ljava/lang/String;)V", "StartGame", t.instance.curLevel.toString());
i.default.instance.callJava("trackEvent", "(Ljava/lang/String;)V", "StartGame");
this.tempTimeBulletHit = 0;
};
e.prototype.addFunnel = function(e) {
this.funnelObject[e] ? this.funnelObject[e].phase += 1 : this.funnelObject[e] = {
level: 1,
phase: 1
};
a.default.saveItem("funnelObject", JSON.stringify(this.funnelObject));
};
e.prototype.funnelLevelUp = function(e, t) {
void 0 === t && (t = 1);
if (this.funnelObject[e]) {
this.funnelObject[e].level += t;
a.default.saveItem("funnelObject", JSON.stringify(this.funnelObject));
}
};
e.prototype.getFunnelInfo = function(e) {
return 0 == t.instance.curLevel ? {
level: 10,
phase: 2
} : !!this.funnelObject[e] && this.funnelObject[e];
};
e.prototype.getRandomFunnel = function() {
if (0 == t.instance.curLevel) return u.default.instance.aircraftTable.getRandomId();
var e = Object.keys(this.funnelObject);
return Number(c.default.arrRandom(e));
};
e.prototype.getPropLevel = function(e) {
this.propObject[e] || (this.propObject[e] = {
level: 1
});
return this.propObject[e].level;
};
e.prototype.propLevelUp = function(e, t) {
void 0 === t && (t = 1);
for (var n in e) {
var o = e[n].id;
this.propObject[o] || (this.propObject[o] = {
level: 1
});
this.propObject[o].level += t;
a.default.saveItem("propObject", JSON.stringify(this.propObject));
}
};
e.prototype.getRandomProp = function() {
var e = Object.keys(this.propObject);
return Number(c.default.arrRandom(e));
};
e.prototype.magnetProp = function(e) {
t.instance.isInMagnet++;
};
e.prototype.InMagnetdelayed = function() {
t.instance.isInMagnet = 0;
};
e.prototype.Hitdelayed = function() {
t.instance.isInHit = 0;
if (t.instance.isInHit <= 0) {
t.instance.isInHit = 0;
if (t.instance.checkGameState([ 1 ])) {
d.default.game.playerScript.delEffect(f.EffectName.AddAtkEffect);
d.default.game.playerScript.setShoot();
}
}
};
e.prototype.hitProp = function(e) {
t.instance.isInHit++;
};
e.prototype.frozendelayed = function() {
t.instance.isInFrozen = 0;
if (t.instance.isInFrozen <= 0) {
t.instance.isInFrozen = 0;
d.default.game.canclFrozen();
d.default.game.changePhysicsEnabled(!0, !1);
p.default.instance.cancelBallFrozen();
}
};
e.prototype.frozen = function(e) {
d.default.game.playFrozen();
t.instance.isInFrozen++;
};
e.prototype.getSkin = function(e) {
return this.skinObject[e] && this.skinObject[e].unlock;
};
e.prototype.addSkin = function(e) {
this.skinObject[e] = {
unlock: !0
};
a.default.saveItem("skinObject", JSON.stringify(this.skinObject));
};
e.prototype.addAdsTime = function(e, t) {
this.skinObject[e] || (this.skinObject[e] = {
unlock: !1,
times: 0
});
this.skinObject[e].times += t;
a.default.saveItem("skinObject", JSON.stringify(this.skinObject));
return this.skinObject[e].times;
};
e.prototype.getTimeScale = function() {
return this.isSlowAction ? this.timeScale : 1;
};
e.prototype.checkIsHaveFreeVedioTimes = function(e) {
return !1;
};
e.prototype.resetFreeVedioTimes = function() {
var e = Number(a.default.getItem("lastResetFreeVedioTimes", "0"));
if (this.isFreeVedio) {
if (c.default.getTime() > e) {
this.freeVedioTimes = 20;
a.default.saveItem("lastResetFreeVedioTimes", c.default.getTomorrowTime() + "");
a.default.saveItem("freeVedioTimes", this.freeVedioTimes + "");
}
}
};
e.prototype.isJumpCompleteReward = function() {
return this.isFreeVedio && this.freeVedioTimes <= 0;
};
e.prototype.getSourceNum = function(e) {
return 0 == (e = Number(e)) ? 0 : (e - 1) % this.sourceNum + 1;
};
Object.defineProperty(e, "instance", {
get: function() {
this._instance || (this._instance = new t());
return this._instance;
},
enumerable: !1,
configurable: !0
});
e.prototype.saveData = function() {
a.default.saveItem("IsOpenOfflineAndSkills", "0");
a.default.saveItem("Endless", "3");
a.default.saveItem("skillIntensifyLevel", "1");
a.default.saveItem("endlessMaxScore", "0");
a.default.saveItem("propObject", JSON.stringify(this.propObject));
a.default.saveItem("ConnonInfo", JSON.stringify(this.connonObject));
a.default.saveItem("funnelObject", JSON.stringify(this.funnelObject));
a.default.saveItem("skinObject", JSON.stringify(this.skinObject));
a.default.saveItem("Gold", this.Gold.toString());
a.default.saveItem("Diamond", this.Diamond.toString());
a.default.saveItem("Chip", this.Chip.toString());
a.default.saveItem("maxScore", this.maxScore.toString());
a.default.saveItem("curScenceID", this.curScenceID.toString());
a.default.saveItem("curCannonID", this.curCannonID.toString());
a.default.saveItem("curSkinID", this.curSkinID.toString());
a.default.saveItem("nextFreeUpgrade", this.nextFreeUpgrade.toString());
a.default.saveItem("isUseFreeUpgrade", this.isUseFreeUpgrade.toString());
a.default.saveItem("chooseFreeUpgrade", this.chooseFreeUpgrade.toString());
a.default.saveItem("curLevel", this.curLevel.toString());
a.default.saveItem("isRate", this.isRate.toString());
a.default.saveItem("soundState", l.default.soundState.toString());
a.default.saveItem("backSoundState", l.default.backSoundState.toString());
a.default.saveItem("effectSoundState", l.default.effectSoundState.toString());
a.default.saveItem("buyId", this.buyId.toString());
a.default.saveItem("specialConnon", this.specialConnon.toString());
a.default.saveItem("allGoldMore", this.allGoldMore.toString());
a.default.saveItem("isShack", this.isShack.toString());
a.default.saveItem("freeVedioTimes", this.freeVedioTimes.toString());
a.default.saveItem("isFreeVedio", this.isFreeVedio.toString());
a.default.saveItem("endlessLeftTimes", this.endlessLeftTimes.toString());
};
e.prototype.loadData = function() {
this.propObject = JSON.parse(a.default.getItem("propObject", "{}"));
this.connonObject = JSON.parse(a.default.getItem("ConnonInfo", "{}"));
this.funnelObject = JSON.parse(a.default.getItem("funnelObject", "{}"));
this.skinObject = JSON.parse(a.default.getItem("skinObject", "{}"));
this.Gold = a.default.getItem("Gold", "0");
this.Diamond = a.default.getItem("Diamond", "0");
this.Chip = a.default.getItem("Chip", "0");
this.maxScore = Number(a.default.getItem("maxScore", "0"));
this.curScenceID = Number(a.default.getItem("curScenceID", "20000"));
this.curCannonID = Number(a.default.getItem("curCannonID", "30000"));
this.curSkinID = Number(a.default.getItem("curSkinID", "600000"));
this.nextFreeUpgrade = Number(a.default.getItem("nextFreeUpgrade", "0"));
this.isUseFreeUpgrade = "true" == a.default.getItem("isUseFreeUpgrade", "false");
this.chooseFreeUpgrade = Number(a.default.getItem("chooseFreeUpgrade", "0"));
this.curLevel = Number(a.default.getItem("curLevel", "0"));
this.isRate = "true" == a.default.getItem("isRate", "false");
l.default.soundState = Number(a.default.getItem("soundState", "1"));
l.default.backSoundState = Number(a.default.getItem("backSoundState", "1"));
l.default.effectSoundState = Number(a.default.getItem("effectSoundState", "1"));
this.buyId = a.default.getItem("buyId", "");
this.specialConnon = a.default.getItem("specialConnon", "");
this.allGoldMore = Number(a.default.getItem("allGoldMore", "1"));
this.isShack = "true" == a.default.getItem("isShack", "true");
this.isFreeVedio = "true" == a.default.getItem("isFreeVedio", "false");
this.freeVedioTimes = Number(a.default.getItem("freeVedioTimes", "0"));
this.endlessLeftTimes = Number(a.default.getItem("endlessLeftTimes", "3"));
};
e.prototype.startNewGame = function() {
this.maxScore = 0;
this.curScenceID = 2e4;
this.curCannonID = 301e3;
this.curLevel = 1;
this.addConnon(301e3);
this.addSkin(6e5);
this.Gold = 10;
this.saveData();
};
e.prototype.loginCheck = function() {
var e = c.default.getTime();
this.lastLoginTime = Number(a.default.getItem("lastLoginTime", "0"));
this.loginDays = Number(a.default.getItem("loginDays", "0"));
if (e > this.lastLoginTime) {
this.loginDays += 1;
this.lastLoginTime = c.default.getTomorrowTime();
a.default.saveItem("lastLoginTime", this.lastLoginTime.toString());
a.default.saveItem("loginDays", this.loginDays.toString());
}
return !1;
};
e.prototype.addConnon = function(e) {
if (!this.connonObject[e]) {
this.connonObject[e] = this.getNewConnonInfo(e);
a.default.saveItem("ConnonInfo", JSON.stringify(this.connonObject));
}
};
e.prototype.checkConnonUnlocked = function(e) {
return !!this.connonObject[e];
};
e.prototype.getConnonNum = function() {
return Object.keys(this.connonObject).length;
};
e.prototype.attributeLevelUp = function(e, t, n) {
void 0 === t && (t = null);
void 0 === n && (n = 1);
var o = this.getConnonInfo(t);
if (o) {
switch (e) {
case r.RoleAttribute.MainGunLevel:
o.mainGunLevel = c.default.exactAdd([ o.mainGunLevel, n ]);
break;

case r.RoleAttribute.ExtraGun:
o.extraGun = c.default.exactAdd([ o.extraGun, n ]);
break;

case r.RoleAttribute.LifeLevel:
o.lifeLevel = c.default.exactAdd([ o.lifeLevel, n ]);
}
a.default.saveItem("ConnonInfo", JSON.stringify(this.connonObject));
}
};
e.prototype.getattributeLevel = function(e) {
var t = this.getConnonInfo(e);
return c.default.accDiv(t.lifeLevel + t.mainGunLevel, 2);
};
e.prototype.checkMallBuy = function(e) {
for (var t = this.buyId.split(";"), n = t.length, o = 0; o < n; o++) if (Number(t[o]) == Number(e)) return !0;
return !1;
};
e.prototype.goldDropCount = function(e) {
var t = this.getPropLevel(r.PropType.CoinBoost);
e *= u.default.instance.workShopTable.getCount(r.PropType.CoinBoost, t) + d.default.game.playerScript.goldMore;
return Math.ceil(e);
};
e.prototype.allGoldCount = function(e) {
return e * this.allGoldMore;
};
e.prototype.checkGameState = function(e) {
for (var t = e.length, n = 0; n < t; n++) if (this.gameState == e[n]) return !0;
return !1;
};
e.prototype.isHaveDiscount = function() {
var e = c.default.getTime();
if (e > this.discounEndDate) return 0;
var t = c.default.getServerWeek();
this.discountEndTime = Number(a.default.getItem("discountEndTime", "0"));
var n = this.discountEndTime - e;
if (n > this.discountExitTime) return 0;
if (n > 0) return 1;
if (3 != t && 6 != t && 0 != this.discountEndTime) return 0;
this.discountRefreshTime = Number(a.default.getItem("discountRefreshTime", "0"));
if (e < this.discountRefreshTime) return 0;
this.discountEndTime = e + this.discountExitTime;
a.default.saveItem("discountEndTime", this.discountEndTime + "");
a.default.saveItem("discountRefreshTime", c.default.getTomorrowTime() + "");
return 2;
};
e.prototype.currencuIsEnough = function(e, t) {
void 0 === t && (t = r.CurrencyType.Gold);
var n = Number(e);
if (isNaN(n)) {
cc.warn(t + "currencuIsEnough " + e + " is not number");
return !1;
}
switch (t) {
case r.CurrencyType.Gold:
return this.Gold >= n;

case r.CurrencyType.Diamond:
return this.Diamond >= n;

case r.CurrencyType.Diamond:
return this.Chip >= n;
}
};
e.prototype.dleCurrency = function(e, t) {
void 0 === t && (t = r.CurrencyType.Gold);
var n = Number(e);
if (isNaN(n)) {
cc.warn(t + "dleCurrency " + e + " is not number");
return !1;
}
if (!this.currencuIsEnough(n, t)) return !1;
switch (t) {
case r.CurrencyType.Gold:
this.Gold -= n;
break;

case r.CurrencyType.Diamond:
this.Diamond -= n;
break;

case r.CurrencyType.Diamond:
this.Chip -= n;
}
d.default.gameUi.OffLineSkill.switchCalculate();
d.default.gameUi.intensifySkill.switchCalculate();
d.default.gameUi.HaveUnlock.isHaveUnlock();
d.default.gameUi.btnTishi();
return !0;
};
e.prototype.addCurrency = function(e, t) {
void 0 === t && (t = r.CurrencyType.Gold);
var n = Number(e);
if (isNaN(n)) {
cc.warn(t + "addCurrency " + e + " is not number");
return !1;
}
switch (t) {
case r.CurrencyType.Gold:
n = this.allGoldCount(n);
this.Gold = this.Gold + n;
i.default.instance.callJava("trackEventWithType", "(Ljava/lang/String;Ljava/lang/String;I)V", "GetGold", "gold", n);
break;

case r.CurrencyType.Diamond:
this.Diamond = this.Diamond + n;
n < 100 && i.default.instance.callJava("trackEventWithType", "(Ljava/lang/String;Ljava/lang/String;I)V", "GetDiamond", "diamond", n);
break;

case r.CurrencyType.Diamond:
this.Chip = this.Chip + n;
}
d.default.gameUi.updataGold();
d.default.gameUi.OffLineSkill.switchCalculate();
d.default.gameUi.intensifySkill.switchCalculate();
d.default.gameUi.HaveUnlock.isHaveUnlock();
d.default.gameUi.btnTishi();
return !0;
};
Object.defineProperty(e.prototype, "Gold", {
get: function() {
var e = Number(s.default.uncompile(this._Gold));
if (isNaN(e)) {
e = this.Gold = Number(a.default.getItem("Gold", "10"));
isNaN(e) && (e = this.Gold = 10);
}
return e;
},
set: function(e) {
if (e || 0 == e) {
this._Gold = s.default.compile(Number(e));
a.default.saveItem("Gold", this.Gold.toString());
}
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "Diamond", {
get: function() {
var e = Number(s.default.uncompile(this._Diamond));
if (isNaN(e)) {
e = this.Diamond = Number(a.default.getItem("Diamond", "0"));
isNaN(e) && (e = this.Diamond = 0);
}
return e;
},
set: function(e) {
if (e || 0 == e) {
this._Diamond = s.default.compile(Number(e));
a.default.saveItem("Diamond", this.Diamond.toString());
}
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "Chip", {
get: function() {
var e = Number(s.default.uncompile(this._Chip));
if (isNaN(e)) {
e = this.Chip = Number(a.default.getItem("Chip", "0"));
isNaN(e) && (e = this.Chip = 0);
}
return e;
},
set: function(e) {
if (e || 0 == e) {
this._Chip = s.default.compile(Number(e));
a.default.saveItem("Chip", this.Chip.toString());
}
},
enumerable: !1,
configurable: !0
});
e.prototype.refitCanUp = function() {};
e.prototype.workCanUp = function() {
var e = u.default.instance.workShopTable.tableObj;
for (var t in e) {
var n = e[t];
if (n) {
var o = this.getPropLevel(n.id);
if (this.currencuIsEnough(u.default.instance.workShopTable.getCountMoney(n.id, o), r.CurrencyType.Gold) && this.curLevel >= n.unlock && o < n.max_level) return !0;
}
}
return !1;
};
e.prototype.aircraftCanUp = function() {
if (this.currencuIsEnough(50, r.CurrencyType.Diamond) && u.default.instance.aircraftTable.getRondam()) return !0;
for (var e = u.default.instance.aircraftTable.table, n = e.length, o = 0; o < n; o++) {
var a = e[o];
if (a) {
var i = t.instance.getFunnelInfo(a.id);
if (!i) continue;
var l = i.phase * a.stage, s = u.default.instance.aircraftTable.countMoney(a.id, i.level);
if (!t.instance.currencuIsEnough(s) || i.level - 1 >= l || i.level - 1 >= a.level_max) continue;
return !0;
}
}
};
var t;
return e = t = o([ g ], e);
}());
n.default = y;
cc._RF.pop();
}, {
"../Config/Config": "Config",
"../Lib/Global": "Global",
"../Lib/LocalStorage": "LocalStorage",
"../Lib/Secret": "Secret",
"./BallManager": "BallManager",
"./EffectManager": "EffectManager",
"./PanelManager": "PanelManager",
"./SDKManager": "SDKManager",
"./SoundManager": "SoundManager",
"./TableManager": "TableManager"
} ],
NodePoolMananger: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "829daYKPU5M5aN/kFFA6/+s", "NodePoolMananger");
var o = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = cc._decorator, i = a.ccclass, r = (a.property, function() {
function e() {
this.poolArr = {};
this.nodeArr = {};
}
t = e;
Object.defineProperty(e, "instance", {
get: function() {
this._instance || (this._instance = new t());
return this._instance;
},
enumerable: !1,
configurable: !0
});
e.prototype.addPool = function(e, t) {
void 0 === t && (t = "");
if (!this.poolArr[e.name]) {
var n = new cc.NodePool(t);
this.poolArr[e.name] = n;
this.nodeArr[e.name] = e;
}
};
e.prototype.popWithCheckExist = function(e) {
var t = this.poolArr[e];
if (!t) return null;
var n = t.get();
if (!n) {
var o = this.nodeArr[e];
n = cc.instantiate(o);
}
n.isInPool = !1;
return n;
};
e.prototype.pop = function(e) {
var t = this.poolArr[e];
if (t) {
var n = t.get();
if (!n) {
var o = this.nodeArr[e];
n = cc.instantiate(o);
}
n.isInPool = !1;
return n;
}
cc.warn(e + " 没有此节点的对象池，可能未调用addpool");
};
e.prototype.push = function(e) {
var t = e.name, n = this.poolArr[t];
if (n && !e.isInPool) {
e.isInPool = !0;
n.put(e);
} else n ? cc.warn(t + "对象已在池中，不要重复回收") : cc.warn(t + "没有此节点的对象池");
};
e.prototype.clear = function(e) {
for (var t in this.poolArr) if (e == t) {
var n = this.poolArr[t];
n && n.clear();
}
};
e.prototype.clearAll = function() {
for (var e in this.poolArr) {
var t = this.poolArr[e];
t && t.clear();
}
this.nodeArr = {};
};
var t;
return e = t = o([ i ], e);
}());
n.default = r;
cc._RF.pop();
}, {} ],
NormalLevelBtn: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "1db09z/R2JCdpW+JpY/OZnB", "NormalLevelBtn");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = cc._decorator, r = i.ccclass, l = i.property, s = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.unlockNode = null;
t.levelLable = null;
t.lockNode = null;
t.isUnlock = !0;
t.level = 0;
return t;
}
t.prototype.init = function(e, t) {
this.isUnlock = e;
this.unlockNode.active = this.isUnlock;
this.level = t;
this.levelLable.string = this.level + "";
this.lockNode.active = !this.isUnlock;
};
t.prototype.unlock = function(e) {
void 0 === e && (e = -1);
this.isUnlock = !0;
this.unlockNode.active = this.isUnlock;
this.lockNode.active = !this.isUnlock;
this.levelLable.string = -1 == e ? this.level + "" : e + "";
};
a([ l({
type: cc.Node,
tooltip: "已解锁节点"
}) ], t.prototype, "unlockNode", void 0);
a([ l({
type: cc.Label,
tooltip: "关卡lable"
}) ], t.prototype, "levelLable", void 0);
a([ l({
type: cc.Node,
tooltip: "未解锁解锁节点"
}) ], t.prototype, "lockNode", void 0);
return t = a([ r ], t);
}(cc.Component);
n.default = s;
cc._RF.pop();
}, {} ],
OffLineSkill: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ceddaGwULFGxoqcNrKE90CI", "OffLineSkill");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("./code/Lib/LocalStorage"), r = e("./code/manager/MyRoleDataManager"), l = e("./code/manager/PanelManager"), s = e("./code/manager/TableManager"), c = e(".//code/Lib/Global"), u = e("./code/manager/Advert_Manager"), d = e("./code/manager/SoundManager"), p = e("./code/manager/Umeng_Manager"), f = cc._decorator, h = f.ccclass, g = f.property, y = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.LevelValue = null;
t.videoUpgrade = null;
t.goldUpgrade = null;
t.upgradeGold = null;
t.tishi = null;
t.effect = null;
t.upgradeBasicsGold = 100;
t.nowUpgradeGold = 100;
t.isOffLineSkill = !0;
t.offOvBuffName = "";
t.LineSkil = null;
t.setLabelString = [];
t.fullLevel = [];
t.y = -800;
return t;
}
n = t;
t.prototype.setLabel = function() {
if (this.isOffLineSkill) {
this.setLabelString[0].string = GlobalFun.i18n.t("lable.10276");
this.setLabelString[1].string = GlobalFun.i18n.t("lable.10281").replace("%d", i.default.getItem("offLineLevel"));
} else {
this.setLabelString[0].string = GlobalFun.i18n.t("lable.10275");
this.setLabelString[1].string = GlobalFun.i18n.t("lable.10281").replace("%d", i.default.getItem("skillIntensifyLevel"));
}
this.setLabelString[2].string = GlobalFun.i18n.t("lable.10282");
this.setLabelString[3].string = GlobalFun.i18n.t("lable.10292");
};
t.prototype.start = function() {
this.node.on("click", function() {
l.default.gameUi.HurdleIsOpen && l.default.gameUi.OpenCloseHurdle();
}, this);
this.isOffLineSkill ? this.offOvBuffName = "offLineLevel" : this.offOvBuffName = "skillIntensifyLevel";
this.offLineLevelFC();
};
t.prototype.offLineLevelFC = function() {
this.offLineLevel = i.default.getItem(this.offOvBuffName);
if (!this.offLineLevel) {
this.offLineLevel = "1";
i.default.saveItem(this.offOvBuffName, this.offLineLevel);
}
this.LevelValue.string = GlobalFun.i18n.t("lable.10281").replace("%d", this.offLineLevel);
this.switchCalculate();
};
t.prototype.switchCalculate = function() {
var e, t, n = Number(this.offLineLevel);
if (this.isOffLineSkill) {
e = s.default.instance.OffLineTable.getRewardPrice(Number(n));
t = s.default.instance.OffLineTable.getRewardPrice_up(Number(n));
var o = s.default.instance.OffLineTable.getlength();
(a = Math.floor(n / 10 - .005)) > o && (a = o);
this.nowUpgradeGold = e + t * (n - 10 * a);
} else {
e = s.default.instance.cannonGrowUp.getRewardPrice(Number(n));
t = s.default.instance.cannonGrowUp.getRewardPrice_up(Number(n));
var a;
o = s.default.instance.cannonGrowUp.getlength();
(a = Math.floor(n / 10 - .005)) > o && (a = o);
this.nowUpgradeGold = e + t * (n - 10 * a);
}
if (r.default.instance.Gold > this.nowUpgradeGold) {
this.tishi.active = !0;
this.goldUpgrade.node.active = !0;
this.videoUpgrade.node.active = !1;
this.upgradeGold.string = c.default.setNum(this.nowUpgradeGold);
this.upgradeGold.node.color = cc.color(255, 255, 255);
this.upgradeGold.node.getComponent(cc.LabelOutline).width = 2;
} else {
this.tishi.active = !1;
if (n < 6) {
this.goldUpgrade.node.active = !0;
this.videoUpgrade.node.active = !1;
this.upgradeGold.string = c.default.setNum(this.nowUpgradeGold);
this.upgradeGold.node.color = cc.color(226, 51, 43);
this.upgradeGold.node.getComponent(cc.LabelOutline).width = 0;
} else {
this.goldUpgrade.node.active = !1;
this.videoUpgrade.node.active = !0;
}
}
};
t.prototype.videoUpgradeButt = function() {
d.default.playSoundEffect(d.default.upintensify);
p.default.instance.putPoint("offLineLevel" == this.offOvBuffName ? p.Point_EventID.offlineReward_Click_num : p.Point_EventID.skill_Click_num);
u.default.instance.show_Ad(u.Adver_Type.ReWardVideo_Adv, function(e) {
this.effect.stop();
this.effect.play();
this.offLineLevel = (Number(this.offLineLevel) + 1).toString();
i.default.saveItem(this.offOvBuffName, this.offLineLevel);
this.LevelValue.string = GlobalFun.i18n.t("lable.10281").replace("%d", this.offLineLevel);
this.switchCalculate();
}.bind(this));
};
t.prototype.goldUpgradeButt = function() {
if (r.default.instance.Gold >= this.nowUpgradeGold) {
d.default.playSoundEffect(d.default.upintensify);
p.default.instance.putPoint("event_skillup");
this.effect.stop();
this.effect.play();
r.default.instance.dleCurrency(this.nowUpgradeGold);
l.default.gameUi.updataGold();
this.offLineLevel = (Number(this.offLineLevel) + 1).toString();
i.default.saveItem(this.offOvBuffName, this.offLineLevel);
this.LevelValue.string = GlobalFun.i18n.t("lable.10281").replace("%d", this.offLineLevel);
this.switchCalculate();
this.LineSkil.switchCalculate();
} else {
cc.Tween.stopAllByTarget(this.setLabelString[3].node.parent);
this.setLabelString[3].node.parent.opacity = 255;
cc.tween(this.setLabelString[3].node.parent).delay(2).to(1, {
opacity: 0
}).start();
}
};
var n;
a([ g(cc.Label) ], t.prototype, "LevelValue", void 0);
a([ g(cc.Button) ], t.prototype, "videoUpgrade", void 0);
a([ g(cc.Button) ], t.prototype, "goldUpgrade", void 0);
a([ g(cc.Label) ], t.prototype, "upgradeGold", void 0);
a([ g(cc.Node) ], t.prototype, "tishi", void 0);
a([ g(cc.Animation) ], t.prototype, "effect", void 0);
a([ g(cc.Boolean) ], t.prototype, "isOffLineSkill", void 0);
a([ g(n) ], t.prototype, "LineSkil", void 0);
a([ g([ cc.Label ]) ], t.prototype, "setLabelString", void 0);
a([ g([ cc.Node ]) ], t.prototype, "fullLevel", void 0);
return t = n = a([ h ], t);
}(cc.Component);
n.default = y;
cc._RF.pop();
}, {
".//code/Lib/Global": "Global",
"./code/Lib/LocalStorage": "LocalStorage",
"./code/manager/Advert_Manager": "Advert_Manager",
"./code/manager/MyRoleDataManager": "MyRoleDataManager",
"./code/manager/PanelManager": "PanelManager",
"./code/manager/SoundManager": "SoundManager",
"./code/manager/TableManager": "TableManager",
"./code/manager/Umeng_Manager": "Umeng_Manager"
} ],
OffLineTable: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3eae2IU0vBKSK8zmSK7Qbym", "OffLineTable");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e(e) {
this.table = e;
}
e.prototype.getlength = function() {
return this.table.length;
};
e.prototype.getDataById = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && Number(n.id) == e) return n;
}
cc.warn("OffLineTable: 没有id：" + e);
return {};
};
e.prototype.getRewardData = function(e) {
e > 10 * this.table.length && (e = 10 * this.table.length);
var t = Math.floor(e / 10 - .05) + 1 + 1e6, n = this.getDataById(t);
return n ? [ Number(n.reward_b), Number(n.reward_a), Number(n.price), Number(n.price_up) ] : null;
};
e.prototype.getRewardCardinalNumber = function(e) {
e > 10 * this.table.length && (e = 10 * this.table.length);
var t = Math.floor(e / 10 - .05) + 1 + 1e6, n = this.getDataById(t);
return n ? Number(n.reward_b) : null;
};
e.prototype.getRewardMultiple = function(e) {
e > 10 * this.table.length && (e = 10 * this.table.length);
var t = Math.floor(e / 10 - .05) + 1 + 1e6, n = this.getDataById(t);
return n ? Number(n.reward_a) : null;
};
e.prototype.getRewardPrice = function(e) {
e > 10 * this.table.length && (e = 10 * this.table.length);
var t = Math.floor(e / 10 - .05) + 1 + 1e6, n = this.getDataById(t);
return n ? Number(n.price) : null;
};
e.prototype.getRewardPrice_up = function(e) {
e > 10 * this.table.length && (e = 10 * this.table.length);
var t = Math.floor(e / 10 - .05) + 1 + 1e6, n = this.getDataById(t);
return n ? Number(n.price_up) : null;
};
e.prototype.getVideoRewardMultiple = function(e) {
e > 10 * this.table.length && (e = 10 * this.table.length);
var t = Math.floor(e / 10 - .05) + 1 + 1e6, n = this.getDataById(t);
return n ? Number(n.reward2_a) : null;
};
return e;
}();
n.default = o;
cc._RF.pop();
}, {} ],
OfflineEarnings: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b421fVcsNRBQrYbyg7BhMIK", "OfflineEarnings");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("./code/Lib/LocalStorage"), r = e("./code/Lib/Global"), l = e("./code/manager/MyRoleDataManager"), s = e("./src/game/GameUI"), c = e("./src/ui/MissionPanel/RewardItem"), u = e("./code/Config/Config"), d = e("./code/manager/TableManager"), p = e("./code/manager/Advert_Manager"), f = e("./code/manager/Umeng_Manager"), h = e("./code/manager/GuideManager"), g = cc._decorator, y = g.ccclass, m = g.property, b = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.label = null;
t.receiveAward = null;
t.videoReceiveAward = null;
t.GameUISp = null;
t.rewardPrefab = null;
t.targetGold = null;
t.offLineBasics = 500;
t.earnings = 1e4;
t.timeMinute = 0;
t.offLineLevel = "";
t.isguide = !1;
return t;
}
t.prototype.UpdateOfflineRevenueInformation = function() {
this.isguide = !1;
this.ear = i.default.getItem("earnings");
if (this.ear && "0" != this.ear) this.earnings = Number(this.ear); else {
var e = i.default.getItem("offLine");
if (!e) {
cc.log("还未离线过");
this.node.active = !1;
return;
}
var t = r.default.getTime() - Number(e);
this.timeMinute = 167e-7 * t;
this.offLineLevel = i.default.getItem("offLineLevel");
if ("" == this.offLineLevel) {
this.offLineLevel = "1";
i.default.saveItem("offLineLevel", this.offLineLevel);
}
cc.log("当前离线时间总计：" + this.timeMinute + "分钟");
if (this.timeMinute < 5) {
this.node.active = !1;
l.default.instance.gameState = 8;
if (l.default.instance.curLevel >= 16 && (h.default.instance.checkCanGuide(10003, 0) || h.default.instance.checkCanGuide(10003, 1) || !h.default.instance.getEndlessState(10003))) {
this.isguide = !0;
this.scheduleOnce(function() {
h.default.instance.startGuide(10003);
}, 1);
}
if (6 == l.default.instance.curLevel && (h.default.instance.checkCanGuide(10001, 0) || h.default.instance.checkCanGuide(10001, 1) || h.default.instance.checkCanGuide(10001, 2) || !h.default.instance.getEndlessState(10001))) {
this.isguide = !0;
this.scheduleOnce(function() {
h.default.instance.startGuide(10001);
}, 1);
}
if (11 == l.default.instance.curLevel && (h.default.instance.checkCanGuide(10002, 0) || !h.default.instance.getEndlessState(10002))) {
this.isguide = !0;
this.scheduleOnce(function() {
h.default.instance.startGuide(10002);
}, 1);
}
this.isguide || (l.default.instance.gameState = 0);
return;
}
this.earnings = this.offLineEarnings(Number(this.offLineLevel), this.timeMinute);
i.default.saveItem("earnings", this.earnings.toString());
}
this.label.string = r.default.setNum(this.earnings);
};
t.prototype.receiveAwardFC = function() {
var e = this.rewardPrefab.getComponent(c.default), t = new Map();
t.set(u.CurrencyType.Gold, this.earnings);
e.init(t);
e.rewardFly([ this.targetGold ]);
l.default.instance.addCurrency(this.earnings);
i.default.saveItem("earnings", "0");
this.node.active = !1;
l.default.instance.gameState = 8;
if (l.default.instance.curLevel >= 16 && (h.default.instance.checkCanGuide(10003, 0) || h.default.instance.checkCanGuide(10003, 1) || !h.default.instance.getEndlessState(10003))) {
this.isguide = !0;
this.scheduleOnce(function() {
h.default.instance.startGuide(10003);
}, 1);
}
if (6 == l.default.instance.curLevel && (h.default.instance.checkCanGuide(10001, 0) || h.default.instance.checkCanGuide(10001, 1) || h.default.instance.checkCanGuide(10001, 2) || !h.default.instance.getEndlessState(10001))) {
this.isguide = !0;
this.scheduleOnce(function() {
h.default.instance.startGuide(10001);
}, 1);
}
if (11 == l.default.instance.curLevel && (h.default.instance.checkCanGuide(10002, 0) || !h.default.instance.getEndlessState(10002))) {
this.isguide = !0;
this.scheduleOnce(function() {
h.default.instance.startGuide(10002);
}, 1);
}
this.isguide || (l.default.instance.gameState = 0);
};
t.prototype.videoReceiveAwardFC = function() {
f.default.instance.putPoint(f.Point_EventID.offlineReward_num);
p.default.instance.show_Ad(p.Adver_Type.ReWardVideo_Adv, function(e) {
var t = this.rewardPrefab.getComponent(c.default), n = new Map(), o = d.default.instance.OffLineTable.getVideoRewardMultiple(Number(this.offLineLevel));
n.set(u.CurrencyType.Gold, this.earnings * o);
t.init(n);
t.rewardFly([ this.targetGold ]);
l.default.instance.addCurrency(this.earnings * o);
i.default.saveItem("earnings", "0");
this.node.active = !1;
l.default.instance.gameState = 8;
if (l.default.instance.curLevel >= 16 && (h.default.instance.checkCanGuide(10003, 0) || h.default.instance.checkCanGuide(10003, 1) || !h.default.instance.getEndlessState(10003))) {
this.isguide = !0;
this.scheduleOnce(function() {
h.default.instance.startGuide(10003);
}, 1);
}
if (6 == l.default.instance.curLevel && (h.default.instance.checkCanGuide(10001, 0) || h.default.instance.checkCanGuide(10001, 1) || h.default.instance.checkCanGuide(10001, 2) || !h.default.instance.getEndlessState(10001))) {
this.isguide = !0;
this.scheduleOnce(function() {
h.default.instance.startGuide(10001);
}, 1);
}
if (11 == l.default.instance.curLevel && (h.default.instance.checkCanGuide(10002, 0) || !h.default.instance.getEndlessState(10002))) {
this.isguide = !0;
this.scheduleOnce(function() {
h.default.instance.startGuide(10002);
}, 1);
}
this.isguide || (l.default.instance.gameState = 0);
}.bind(this));
};
t.prototype.offLineEarnings = function(e, t) {
for (var n = 0, o = (d.default.instance.OffLineTable.getlength(), e); o < e + 10; o++) {
var a = d.default.instance.OffLineTable.getlength(), i = d.default.instance.OffLineTable.getRewardPrice(Number(o >= 10 * a ? 10 * a : o)), r = d.default.instance.OffLineTable.getRewardPrice_up(Number(o >= 10 * a ? 10 * a : o)), l = Math.floor(o / 10 - .005);
l > a && (l = a);
n += i + r * (o - 10 * l);
}
var s = d.default.instance.OffLineTable.getRewardCardinalNumber(Number(e)), c = d.default.instance.OffLineTable.getRewardMultiple(Number(e));
t / 60 > 8 && (t = 480);
return Math.floor((n * c / 1e3 + s * e) * t / 60);
};
a([ m({
type: cc.Label,
tooltip: "金币显示Label"
}) ], t.prototype, "label", void 0);
a([ m({
type: cc.Button,
tooltip: "直接领取离线收益按钮"
}) ], t.prototype, "receiveAward", void 0);
a([ m({
type: cc.Button,
tooltip: "看视频领取离线收益按钮"
}) ], t.prototype, "videoReceiveAward", void 0);
a([ m({
type: s.default,
tooltip: "GameUI"
}) ], t.prototype, "GameUISp", void 0);
a([ m({
type: cc.Node,
tooltip: "RewardItem"
}) ], t.prototype, "rewardPrefab", void 0);
a([ m({
type: cc.Node,
tooltip: "目标金币"
}) ], t.prototype, "targetGold", void 0);
return t = a([ y ], t);
}(cc.Component);
n.default = b;
cc._RF.pop();
}, {
"./code/Config/Config": "Config",
"./code/Lib/Global": "Global",
"./code/Lib/LocalStorage": "LocalStorage",
"./code/manager/Advert_Manager": "Advert_Manager",
"./code/manager/GuideManager": "GuideManager",
"./code/manager/MyRoleDataManager": "MyRoleDataManager",
"./code/manager/TableManager": "TableManager",
"./code/manager/Umeng_Manager": "Umeng_Manager",
"./src/game/GameUI": "GameUI",
"./src/ui/MissionPanel/RewardItem": "RewardItem"
} ],
PanelManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9954au2AzdK8L+u6KzOaPTP", "PanelManager");
var o = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
}, a = this && this.__awaiter || function(e, t, n, o) {
function a(e) {
return e instanceof n ? e : new n(function(t) {
t(e);
});
}
return new (n || (n = Promise))(function(n, i) {
function r(e) {
try {
s(o.next(e));
} catch (e) {
i(e);
}
}
function l(e) {
try {
s(o.throw(e));
} catch (e) {
i(e);
}
}
function s(e) {
e.done ? n(e.value) : a(e.value).then(r, l);
}
s((o = o.apply(e, t || [])).next());
});
}, i = this && this.__generator || function(e, t) {
var n, o, a, i, r = {
label: 0,
sent: function() {
if (1 & a[0]) throw a[1];
return a[1];
},
trys: [],
ops: []
};
return i = {
next: l(0),
throw: l(1),
return: l(2)
}, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
return this;
}), i;
function l(e) {
return function(t) {
return s([ e, t ]);
};
}
function s(i) {
if (n) throw new TypeError("Generator is already executing.");
for (;r; ) try {
if (n = 1, o && (a = 2 & i[0] ? o.return : i[0] ? o.throw || ((a = o.return) && a.call(o), 
0) : o.next) && !(a = a.call(o, i[1])).done) return a;
(o = 0, a) && (i = [ 2 & i[0], a.value ]);
switch (i[0]) {
case 0:
case 1:
a = i;
break;

case 4:
r.label++;
return {
value: i[1],
done: !1
};

case 5:
r.label++;
o = i[1];
i = [ 0 ];
continue;

case 7:
i = r.ops.pop();
r.trys.pop();
continue;

default:
if (!(a = r.trys, a = a.length > 0 && a[a.length - 1]) && (6 === i[0] || 2 === i[0])) {
r = 0;
continue;
}
if (3 === i[0] && (!a || i[1] > a[0] && i[1] < a[3])) {
r.label = i[1];
break;
}
if (6 === i[0] && r.label < a[1]) {
r.label = a[1];
a = i;
break;
}
if (a && r.label < a[2]) {
r.label = a[2];
r.ops.push(i);
break;
}
a[2] && r.ops.pop();
r.trys.pop();
continue;
}
i = t.call(e, r);
} catch (e) {
i = [ 6, e ];
o = 0;
} finally {
n = a = 0;
}
if (5 & i[0]) throw i[1];
return {
value: i[0] ? i[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("./LoadManager"), l = e("./SoundManager"), s = cc._decorator, c = s.ccclass, u = (s.property, 
function() {
function e() {
this.panelMap = new Map();
this.openMap = new Map();
}
t = e;
Object.defineProperty(e, "instance", {
get: function() {
this._instance || (this._instance = new t());
return this._instance;
},
enumerable: !1,
configurable: !0
});
e.initPanel = function(e, t) {
switch (e) {
case this.PanelStr.gameui:
this.gameUi = t;
break;

case this.PanelStr.game:
this.game = t;
}
};
e.prototype.openPanel = function(e, t) {
void 0 === t && (t = null);
for (var n = [], o = 2; o < arguments.length; o++) n[o - 2] = arguments[o];
return a(this, void 0, void 0, function() {
var o, a;
return i(this, function(i) {
switch (i.label) {
case 0:
return this.openMap.get(e) ? [ 2 ] : (o = this.panelMap.get(e)) ? [ 3, 2 ] : [ 4, this.loadPanel(e) ];

case 1:
if (!(o = i.sent())) {
cc.warn(e + " is not exist!");
return [ 2 ];
}
this.panelMap.set(e, o);
i.label = 2;

case 2:
t && !o.parent && t.addChild(o);
(a = o.getComponent(e)).openPanel.apply(a, n);
l.default.playSoundEffect(l.default.uiOpen);
this.openMap.set(e, a);
return [ 2, a ];
}
});
});
};
e.prototype.closePanel = function(e, t) {
void 0 === t && (t = !1);
for (var n = [], o = 2; o < arguments.length; o++) n[o - 2] = arguments[o];
var a = this.openMap.get(e);
if (a) {
a.closePanel.apply(a, n);
l.default.playSoundEffect(l.default.uiClose);
this.openMap.delete(e);
t && this.panelMap.delete(e);
return a;
}
cc.warn(e + " not opened!");
};
e.prototype.deleteOpen = function(e) {
this.openMap.delete(e);
};
e.prototype.closeAllPanel = function() {
this.openMap.forEach(function(e) {
e.closePanel();
});
this.openMap.clear();
};
e.prototype.checkPanelIsOpen = function(e) {
return this.openMap.has(e);
};
e.prototype.getExistPanel = function(e) {
var t = this.panelMap.get(e);
t || cc.warn(e + " not opened yet!");
return t.getComponent(e);
};
e.prototype.runCurOpenPanelFun = function(e) {
for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
this.openMap.forEach(function(n) {
n[e] && n[e].apply(n, t);
});
};
e.prototype.getPanel = function(e) {
return a(this, void 0, void 0, function() {
var t;
return i(this, function(n) {
switch (n.label) {
case 0:
return (t = this.panelMap.get(e)) ? [ 3, 2 ] : [ 4, this.loadPanel(e) ];

case 1:
if (!(t = n.sent())) {
cc.warn(e + " is not exist!");
return [ 2 ];
}
n.label = 2;

case 2:
return [ 2, t ];
}
});
});
};
e.prototype.loadPanel = function(e) {
return a(this, void 0, Promise, function() {
var t;
return i(this, function(n) {
switch (n.label) {
case 0:
return (t = r.default.instance.getRes("/prefab/" + e + "/" + e, cc.Prefab)) ? [ 3, 2 ] : [ 4, r.default.instance.loadRes("/prefab/" + e + "/" + e, cc.Prefab) ];

case 1:
t = n.sent();
n.label = 2;

case 2:
return [ 2, cc.instantiate(t) ];
}
});
});
};
var t;
e.PanelStr = {
gameui: 0,
game: 1,
newscence: 2,
levelup: 3
};
return e = t = o([ c ], e);
}());
n.default = u;
cc._RF.pop();
}, {
"./LoadManager": "LoadManager",
"./SoundManager": "SoundManager"
} ],
PausePanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "c77bf8EEIFGjocm/nJ0sVpd", "PausePanel");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../../code/manager/UiAniManager"), r = e("../../../code/manager/PanelManager"), l = e("../../../code/Config/Config"), s = e("../../../code/manager/MyRoleDataManager"), c = e("../MissionPanel/MissionItem"), u = e("../../../code/manager/MissionManger"), d = e("../../../code/manager/SoundManager"), p = e("../../../code/basecode/BasePanel"), f = cc._decorator, h = f.ccclass, g = f.property, y = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.backNode = null;
t.holdLabel = null;
t.missionArr = [];
t.shou = null;
t._aniType = i.UiAniType.AlphaChange;
t.bools = !1;
return t;
}
t.prototype.shouYiDong = function() {
if (this.bools) {
this.bools = !1;
cc.tween(this.shou).to(.8, {
position: cc.v3(-150, -95)
}).start();
} else {
this.bools = !0;
cc.tween(this.shou).to(.8, {
position: cc.v3(260, -95)
}).start();
}
};
t.prototype.openPanel = function() {
this.shou.position = cc.v3(-150, -95);
this.bools = !1;
this.schedule(this.shouYiDong, .8);
this.playUIAni(i.InOrOut.IN);
d.default.setvolumeNum(.5);
u.default.instance.curSpecilMission.isCompleteAll ? this.missionArr[0].active = !1 : this.missionArr[0].getComponent(c.default).init(u.default.instance.curSpecilMission);
for (var e = 1, t = this.missionArr.length; e < t; e++) this.missionArr[e].getComponent(c.default).init(u.default.instance.curMission[e - 1]);
this.holdLabel.string = GlobalFun.i18n.t("lable.10233");
this.addEvent();
};
t.prototype.closePanel = function() {
this.shou.position = cc.v3(-150, -95);
this.bools = !1;
this.unschedule(this.shouYiDong);
this.playUIAni(i.InOrOut.OUT);
};
t.prototype.panelIn = function() {};
t.prototype.panelOut = function() {
if (this.panelAni.currentClip.name == this.aniType + "Out") {
d.default.setvolumeNum(1);
r.default.game.isInPaused = !1;
this.dleEvent();
r.default.instance.deleteOpen(l.PanelName.PausePanel);
this.node.removeFromParent();
}
};
t.prototype.addEvent = function() {};
t.prototype.dleEvent = function() {
this.panelAni.off("stop", this.panelOut, this);
};
t.prototype.touchStart = function() {
this.panelAni.stop();
this.panelAni.play(this.aniType + "Out");
this.panelAni.on("stop", this.panelOut, this);
};
t.prototype.touchEnd = function() {
s.default.instance.gameState = 4;
this.panelAni.off("stop", this.panelOut, this);
this.panelAni.stop();
var e = this.node.opacity;
this.panelAni.play(this.aniType + "In", e / 255 * .15);
};
a([ g({
type: cc.Node,
tooltip: "背景遮罩节点"
}) ], t.prototype, "backNode", void 0);
a([ g({
type: cc.Label,
tooltip: "继续文本"
}) ], t.prototype, "holdLabel", void 0);
a([ g({
type: [ cc.Node ],
tooltip: "背景遮罩节点"
}) ], t.prototype, "missionArr", void 0);
a([ g({
type: cc.Node,
tooltip: "手"
}) ], t.prototype, "shou", void 0);
return t = a([ h ], t);
}(p.default);
n.default = y;
cc._RF.pop();
}, {
"../../../code/Config/Config": "Config",
"../../../code/basecode/BasePanel": "BasePanel",
"../../../code/manager/MissionManger": "MissionManger",
"../../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../../code/manager/PanelManager": "PanelManager",
"../../../code/manager/SoundManager": "SoundManager",
"../../../code/manager/UiAniManager": "UiAniManager",
"../MissionPanel/MissionItem": "MissionItem"
} ],
PropPrefab: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "97460chOsRFT7w2Gi3FiQiU", "PropPrefab");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../code/Lib/Global"), r = e("../../code/manager/NodePoolMananger"), l = e("../../code/manager/TableManager"), s = e("../../code/manager/MyRoleDataManager"), c = e("../../code/manager/PanelManager"), u = e("../../code/manager/SoundManager"), d = e("../../code/manager/MissionManger"), p = e("../../code/manager/EffectManager"), f = e("../../code/Config/Config"), h = e("../../code/manager/BallManager"), g = e("../../BuffManager"), y = cc._decorator, m = y.ccclass, b = y.property, v = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.propIcon = null;
t.propId = 1;
t.notUpdata = !1;
t.isBackToPool = !1;
t.ySpeed = 14;
t.moveToPlayer = !1;
t.wallTimes = 1;
return t;
}
t.prototype.onLoad = function() {};
t.prototype.update = function() {
if (!s.default.instance.checkGameState([ 2, 3, 4, 6, 7 ]) && !this.notUpdata && (!this.isBackToPool || this.moveToPlayer)) {
this.curSpeed && this.aSpeed && (this.curSpeed = this.curSpeed.subSelf(this.aSpeed));
this.curSpeed && (this.node.position = this.node.position.subSelf(cc.v3(this.curSpeed.mul(s.default.instance.getTimeScale()))));
this.speedChange();
}
};
t.prototype.speedChange = function() {
if (this.isBackToPool) {
if (this.moveToPlayer) {
t = this.node.position, n = c.default.game.Player;
var e = t.sub(n.position);
this.node.position = t.sub(e.normalizeSelf().mul(30 * s.default.instance.getTimeScale()));
if (Math.abs(n.x - t.x) <= .5 * n.width && Math.abs(n.y - t.y) <= .4 * n.height) {
this.moveToPlayer = !1;
this.contactEffect();
}
}
} else {
var t = this.node.position, n = c.default.game.Player;
if (Math.abs(n.x - t.x) <= .5 * n.width && Math.abs(n.y - t.y) <= .4 * n.height) {
this.aSpeed = cc.v2(0, 0);
this.curSpeed = cc.v2(0, 0);
this.isBackToPool = !0;
this.contactEffect();
} else if (s.default.instance.isInMagnet > 0 && Math.abs(n.x - t.x) <= 300 && Math.abs(n.y - t.y) <= 300) {
this.aSpeed = cc.v2(0, 0);
this.curSpeed = cc.v2(0, 0);
this.isBackToPool = !0;
this.moveToPlayer = !0;
} else if (t.x <= .5 * this.node.width && this.curSpeed.x > 0 && this.wallTimes > 0) {
this.wallTimes--;
this.curSpeed.x = -1 * this.curSpeed.x;
this.aSpeed.x = -1 * this.aSpeed.x;
} else if (t.x >= 750 - .5 * this.node.width && this.curSpeed.x < 0 && this.wallTimes > 0) {
this.wallTimes--;
this.curSpeed.x = -1 * this.curSpeed.x;
this.aSpeed.x = -1 * this.aSpeed.x;
} else if ((t.x <= 0 - this.node.width || t.x >= 750 + this.node.width) && this.wallTimes <= 0) {
this.curSpeed.x = 0;
this.aSpeed.x = 0;
this.remove();
} else if (this.node.y <= 441 + .5 * this.node.width && this.curSpeed.y > 0) {
this.curSpeed.y = -1 * this.ySpeed;
this.curSpeed.x = 1 * this.curSpeed.x;
if (this.curSpeed.x > 0 && this.aSpeed.x < 0 || this.curSpeed.x < 0 && this.aSpeed.x > 0 || Math.abs(this.curSpeed.y) <= 1) {
this.aSpeed = cc.v2(0, 0);
this.curSpeed = cc.v2(0, 0);
}
}
}
};
t.prototype.init = function(e, t, n, o) {
void 0 === o && (o = !1);
this.isMission = o;
this.BuffPrefab = t;
this.propId = e;
this.notUpdata = !1;
this.isBackToPool = !1;
this.wallTimes = 1;
this.node.scale = 1;
this.setIcon();
this.propId >= 5e5 && this.propId <= 500005 ? this.propIcon.node.scale = 1 : this.propIcon.node.scale = .6;
};
t.prototype.remove = function() {
this.node.removeFromParent();
r.default.instance.push(this.node);
};
t.prototype.toTop = function() {
var e = i.default.random();
e = this.node.x < 375 ? -1 : 1;
this.curSpeed = cc.v2((1.5 * Math.random() + 2) * e, i.default.Random(-5, -10));
this.aSpeed = cc.v2(0, -.3);
};
t.prototype.setIcon = function() {
0 == this.isMission ? this.propIcon.spriteFrame = 500005 != this.propId ? c.default.gameUi.buffIconAtlas[this.propId - 5e5] : c.default.gameUi.buffIconAtlas[this.dd()] : this.propIcon.spriteFrame = c.default.gameUi.iconAtlas.getSpriteFrame(l.default.instance.propTable.getIcon(this.propId));
};
t.prototype.dd = function() {
-1 == i.default.random() ? this.xiabiao = 5 : this.xiabiao = 0;
return this.xiabiao;
};
t.prototype.contactEffect = function() {
switch (this.propId) {
case 5e5:
this.remove();
this.randomSpecialProp();
break;

case 500001:
this.remove();
u.default.playSoundEffect(u.default.getMagnet);
var e = s.default.instance.getPropLevel(f.PropType.MagneticField), t = l.default.instance.workShopTable.getCount(f.PropType.MagneticField, e);
g.default.instance.addBuffShow(500001, 5 + 5 * t, this.BuffPrefab, c.default.gameUi.buffIconAtlas[this.propId - 5e5], GlobalFun.i18n.t("lable.10262"));
s.default.instance.magnetProp(5 + 5 * t);
break;

case 500002:
this.remove();
u.default.playSoundEffect(u.default.getHp);
e = s.default.instance.getPropLevel(f.PropType.HealthPack), t = l.default.instance.workShopTable.getCount(f.PropType.HealthPack, e);
t = 100;
c.default.game.playerScript.reLife(t);
p.default.instance.playEffect(p.EffectName.AddHpEffect, c.default.game.Player, cc.v2(0, 0));
break;

case 500003:
this.remove();
u.default.playSoundEffect(u.default.getAttack);
e = s.default.instance.getPropLevel(f.PropType.DamageBoost), t = l.default.instance.workShopTable.getCount(f.PropType.DamageBoost, e);
g.default.instance.addBuffShow(500003, 5 + 5 * t, this.BuffPrefab, c.default.gameUi.buffIconAtlas[this.propId - 5e5], GlobalFun.i18n.t("lable.10263"));
s.default.instance.hitProp(5 + 5 * t);
c.default.game.playerScript.addEffect(p.EffectName.AddAtkEffect);
s.default.instance.checkGameState([ 1 ]) && c.default.game.playerScript.setShoot();
break;

case 500004:
this.remove();
u.default.playSoundEffect(u.default.getRD);
d.default.instance.collectMissionNum(8, 1);
var n = s.default.instance.getRandomFunnel();
g.default.instance.addBuffShow2(500004, 8, this.BuffPrefab, c.default.gameUi.buffIconAtlas[this.propId - 5e5], GlobalFun.i18n.t("lable.10264"));
c.default.game.playerScript.getFunnel(n);
break;

case 500005:
this.remove();
u.default.playSoundEffect(u.default.getHp);
if (s.default.instance.checkGameState([ 2, 3, 4, 5, 6 ])) break;
if (5 == this.xiabiao) {
c.default.game.changePhysicsEnabled(!1, !1);
s.default.instance.frozen(6);
g.default.instance.addBuffShow(500005, 6, this.BuffPrefab, c.default.gameUi.buffIconAtlas[this.xiabiao], GlobalFun.i18n.t("lable.10265"));
h.default.instance.allBallFrozen();
} else {
c.default.game.playerScript.propInvincible();
g.default.instance.addBuffShow(5e5, 8, this.BuffPrefab, c.default.gameUi.buffIconAtlas[this.xiabiao], GlobalFun.i18n.t("lable.10269"));
}
break;

case 501e3:
case 501001:
case 501002:
case 501003:
case 501004:
case 501005:
u.default.playSoundEffect(u.default.getMissionItem);
d.default.instance.collectSpecialProp(this.propId, 1);
c.default.gameUi.movePropToLable(this.node);
}
};
t.prototype.randomSpecialProp = function() {
var e = l.default.instance.workShopTable.getRandomSpecial();
e == f.PropType.Tempest ? c.default.game.fiveShootSpeed() : e == f.PropType.FullFire ? c.default.game.fiveConnon() : c.default.game.laserSpecial();
};
a([ b(cc.Sprite) ], t.prototype, "propIcon", void 0);
return t = a([ m ], t);
}(cc.Component);
n.default = v;
cc._RF.pop();
}, {
"../../BuffManager": "BuffManager",
"../../code/Config/Config": "Config",
"../../code/Lib/Global": "Global",
"../../code/manager/BallManager": "BallManager",
"../../code/manager/EffectManager": "EffectManager",
"../../code/manager/MissionManger": "MissionManger",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/NodePoolMananger": "NodePoolMananger",
"../../code/manager/PanelManager": "PanelManager",
"../../code/manager/SoundManager": "SoundManager",
"../../code/manager/TableManager": "TableManager"
} ],
PropTable: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9b06bOlYctInozs88vmOEax", "PropTable");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../../code/manager/MyRoleDataManager"), a = e("../../code/Lib/Global"), i = function() {
function e(e) {
this.table = e;
}
e.prototype.getRondamProp = function(e) {
for (var t = [], n = this.table.length, i = 0; i < n; i++) {
var r = this.table[i];
r && r.type == e && (4 != r.small_type && 0 != r.small_type ? t.push(Number(r.id)) : 4 == r.small_type && Object.keys(o.default.instance.funnelObject).length > 0 ? t.push(Number(r.id)) : 0 == r.small_type && o.default.instance.curLevel > 10 && t.push(Number(r.id)));
}
return Number(a.default.arrRandom(t));
};
e.prototype.getInfo = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && Number(n.id) == e) return n;
}
cc.warn("PropTable getInfo: Do not have id " + e);
return "";
};
e.prototype.getName = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && Number(n.id) == e) return n.name;
}
cc.warn("PropTable getName: Do not have id " + e);
return "";
};
e.prototype.getDes = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && Number(n.id) == e) return n.des;
}
cc.warn("PropTable getDex: Do not have id " + e);
return {};
};
e.prototype.getIcon = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && Number(n.id) == e) return n.icon;
}
cc.warn("PropTable getIcon: Do not have id " + e);
return "item_500000";
};
return e;
}();
n.default = i;
cc._RF.pop();
}, {
"../../code/Lib/Global": "Global",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager"
} ],
QuadTree: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b0aa3L9qLVPFZpuq4fnqE2f", "QuadTree");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e(e, t) {
this.maxObjects = 4;
this.bounds = {
x: 0,
y: 0,
width: 0,
height: 0
};
this.objects = [];
this.nodes = [];
this.level = 0;
this.maxLevels = 7;
this.bounds = e;
this.level = t;
}
e.prototype.findObjects = function(e, t) {
if (!t || !t.node) return e;
var n = this.getMoreIndex(t);
this.nodes;
if (1 != n && 2 != n && 3 != n && 0 != n || !this.nodes.length) {
if (this.nodes.length) {
var o = this.carve(t.node, n);
this.getMoreIndex(t);
for (var a = o.length - 1; a >= 0; a--) this.findObjects(e, {
node: o[a]
});
}
} else this.nodes[n].findObjects(e, t);
e.push(this.objects);
return e;
};
e.prototype.updateObjects = function(e) {
var t, n, o, a = this.objects;
e = e || this;
for (n = a.length - 1; n >= 0; n--) a[n].destroy ? a.splice(n, 1) : -1 === (t = this.getIndex(a[n])) ? this !== e && e.insert(a.splice(n, 1)[0]) : this.nodes.length && this.nodes[t].insert(a.splice(n, 1)[0]);
for (n = 0, o = this.nodes.length; n < o; n++) this.nodes[n].refresh(e);
};
e.prototype.getAllObjects = function(e) {
for (var t = 0; t < this.nodes.length; t++) e = this.nodes[t].getAllObjects(e);
t = 0;
for (var n = this.objects.length; t < n; t++) e.push(this.objects[t]);
return e;
};
e.prototype.clear = function() {
this.objects = [];
for (var e = 0; e < this.nodes.length; e++) this.nodes[e].clear();
this.nodes = [];
0 == this.level && this.splite();
};
e.prototype.insert = function(e, t) {
void 0 === t && (t = 1);
if (e) if (e instanceof Array) for (var n = 0, o = e.length; n < o; n++) this.insert(e[n]); else if (e instanceof Object && 0 == t) for (var a in e) this.insert(e[a]); else {
if (this.nodes.length) {
if (-2 == (r = this.getIndex(e))) return;
if (-1 != r) {
this.nodes[r].insert(e);
return;
}
}
var i = this.objects;
this.objects.push(e);
if (i.length > this.maxObjects && this.level < this.maxLevels) {
null == this.nodes[0] && this.splite();
for (n = 0; n < i.length; ) {
var r;
if (-2 == (r = this.getIndex(i[n]))) return;
-1 != r && -2 != r ? this.nodes[r].insert(i.splice(n, 1)[0]) : n++;
}
}
}
};
e.prototype.getIndex = function(e) {
if (!e || !e.node) return -2;
var t = e.node, n = -1, o = this.bounds.x + this.bounds.width / 2, a = this.bounds.y + this.bounds.height / 2, i = t.y < a && t.y + t.height * (1 - t.anchorY) < a, r = t.y > a && t.y - t.height * (1 + t.anchorY) > a;
t.x < o && t.x + .5 * t.width < o ? i ? n = 1 : r && (n = 2) : t.x > o && t.x - .5 * t.width > o && (i ? n = 0 : r && (n = 3));
return n;
};
e.prototype.getMoreIndex = function(e) {
if (!e || !e.node) return -2;
var t = e.node, n = -1, o = this.bounds.x + this.bounds.width / 2, a = this.bounds.y + this.bounds.height / 2, i = t.y <= a && t.y + t.height * t.anchorY <= a, r = t.y >= a && t.y - t.height * t.anchorY >= a;
if (t.x <= o && t.x + .5 * t.width <= o) {
n = 5;
i ? n = 1 : r && (n = 2);
} else if (t.x >= o && t.x - .5 * t.width >= o) {
n = 7;
i ? n = 0 : r && (n = 3);
}
-1 == n && (i ? n = 4 : r && (n = 6));
return n;
};
e.prototype.splite = function() {
var t = this.bounds.width / 2 | 0, n = this.bounds.height / 2 | 0;
this.nodes[0] = new e({
x: this.bounds.x + t,
y: this.bounds.y,
width: t,
height: n
}, this.level + 1);
this.nodes[1] = new e({
x: this.bounds.x,
y: this.bounds.y,
width: t,
height: n
}, this.level + 1);
this.nodes[2] = new e({
x: this.bounds.x,
y: this.bounds.y + n,
width: t,
height: n
}, this.level + 1);
this.nodes[3] = new e({
x: this.bounds.x + t,
y: this.bounds.y + n,
width: t,
height: n
}, this.level + 1);
};
e.prototype.carve = function(e, t) {
var n = this.bounds.x + this.bounds.width / 2, o = this.bounds.y + this.bounds.height / 2, a = [], i = e.y - o + .5 * e.height, r = o - e.y + .5 * e.height, l = e.x - n + .5 * e.width, s = n - e.x + .5 * e.width;
if (5 == t || 7 == t) {
var c = {
name: e.name,
height: i,
width: e.width,
x: e.x,
y: o + .5 * i,
anchorY: .5,
anchorX: .5
}, u = {
name: e.name,
height: r,
width: e.width,
x: e.x,
y: o - .5 * r,
anchorY: .5,
anchorX: .5
};
a.push(c);
a.push(u);
} else if (4 == t || 6 == t) {
var d = {
name: e.name,
height: e.height,
width: l,
x: n + .5 * l,
y: e.y,
anchorY: .5,
anchorX: .5
}, p = {
name: e.name,
height: e.height,
width: s,
x: n - .5 * s,
y: e.y,
anchorY: .5,
anchorX: .5
};
a.push(d);
a.push(p);
} else if (-1 == t) {
var f = {
name: e.name,
height: i,
width: s,
x: n - .5 * s,
y: o + .5 * i,
anchorY: .5,
anchorX: .5
}, h = {
name: e.name,
height: i,
width: l,
x: n + .5 * l,
y: o + .5 * i,
anchorY: .5,
anchorX: .5
}, g = {
name: e.name,
height: r,
width: s,
x: n - .5 * s,
y: o - .5 * r,
anchorY: .5,
anchorX: .5
}, y = {
name: e.name,
height: r,
width: l,
x: n + .5 * l,
y: o - .5 * r,
anchorY: .5,
anchorX: .5
};
a.push(f);
a.push(h);
a.push(g);
a.push(y);
}
return a;
};
return e;
}();
n.default = o;
cc._RF.pop();
}, {} ],
RefitItem: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "43711dHWzNFBZ9avnhsl/YA", "RefitItem");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../../code/manager/MyRoleDataManager"), r = e("../../../code/manager/PanelManager"), l = e("../../../code/Config/Config"), s = e("../../../code/Lib/Global"), c = e("../../../code/manager/TableManager"), u = e("../../../code/manager/SoundManager"), d = e("../../../code/manager/EffectManager"), p = e("../LatticeProgress"), f = e("../../../code/manager/SDKManager"), h = cc._decorator, g = h.ccclass, y = h.property, m = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.infoBtn = null;
t.levelUpBtn = null;
t.pro = null;
t.nameLable = null;
t.goldLable = null;
t.lockBtn = null;
t.lockBtnLable = null;
t.levelNode = null;
t.lockNode = null;
return t;
}
t.prototype.onLoad = function() {
this.levelUpBtn.node.on("click", this.levelUpTap, this);
this.infoBtn.node.on("click", this.infoBtnTap, this);
this.lockBtn.node.on("click", this.lockBtnTap, this);
this.node.on("click", this.levelUpTap, this);
};
t.prototype.init = function(e, t) {
this.type = t;
this.connonId = e;
this.setLable();
this.updateInfo();
};
t.prototype.updateInfo = function() {
var e = c.default.instance.connonTable.getDataById(this.connonId), t = i.default.instance.getConnonLevel(this.type, this.connonId);
this.isUnlock = !(-1 == t);
this.lockNode.active = !this.isUnlock;
this.levelNode.active = this.isUnlock;
if (this.isUnlock) {
this.pro.getComponent(p.default).pro = t - 1;
this.upgradeMoney = c.default.instance.connonTable.countUpgradeMoney(e, t, this.type);
this.goldLable.string = s.default.setNum(this.upgradeMoney);
if (t - 1 >= e.max_level) {
this.levelUpBtn.enabled = !1;
this.node.getComponent(cc.Button).enabled = !1;
} else {
this.levelUpBtn.enabled = !0;
this.node.getComponent(cc.Button).enabled = !0;
}
} else this.unlockMoney = this.lockBtnLable.string = e.gem_m;
};
t.prototype.levelUpTap = function() {
if (this.isUnlock) if (i.default.instance.dleCurrency(this.upgradeMoney)) {
this.playSound();
f.default.instance.callJava("trackEventWithType", "(Ljava/lang/String;Ljava/lang/String;I)V", "ConnonUpgrade", this.type.toString(), 1);
r.default.gameUi.updataGold();
i.default.instance.attributeLevelUp(this.type, this.connonId);
r.default.instance.getExistPanel(l.PanelName.RefitShopPanel).updateLevelItem();
} else r.default.instance.openPanel(l.PanelName.GoShopPanel, r.default.gameUi.middleNode, l.CurrencyType.Gold); else this.lockBtnTap();
};
t.prototype.setLable = function() {
var e = "";
this.type == l.RoleAttribute.MainGunLevel ? e = "10075" : this.type == l.RoleAttribute.ExtraGun ? e = "10076" : this.type == l.RoleAttribute.LifeLevel && (e = "10074");
this.nameLable.string = GlobalFun.i18n.t("lable." + e);
};
t.prototype.infoBtnTap = function() {
var e = r.default.instance.getExistPanel(l.PanelName.RefitShopPanel).talkLable;
e && (this.type == l.RoleAttribute.MainGunLevel ? e.string = GlobalFun.i18n.t("lable.10235") : this.type == l.RoleAttribute.ExtraGun ? e.string = GlobalFun.i18n.t("lable.10236") : this.type == l.RoleAttribute.LifeLevel && (e.string = GlobalFun.i18n.t("lable.10234")));
};
t.prototype.lockBtnTap = function() {
var e = this;
if (i.default.instance.dleCurrency(this.unlockMoney, l.CurrencyType.Diamond)) {
f.default.instance.callJava("trackEventWithType", "(Ljava/lang/String;Ljava/lang/String;I)V", "UnlockSubConnon", this.connonId.toString(), 1);
u.default.playSoundEffect(s.default.arrRandom(u.default.upgradeWorkShop));
i.default.instance.attributeLevelUp(this.type, this.connonId, 2);
d.default.instance.playEffect(d.EffectName.SubGunUnlockEffect, this.node, cc.v2(0, 0));
this.scheduleOnce(function() {
e.updateInfo();
r.default.instance.getExistPanel(l.PanelName.RefitShopPanel).updateConnonShow();
}, .1);
} else r.default.instance.openPanel(l.PanelName.GoShopPanel, r.default.gameUi.middleNode, l.CurrencyType.Diamond);
};
t.prototype.playSound = function() {
this.type == l.RoleAttribute.MainGunLevel ? u.default.playSoundEffect(u.default.upgradeMGun) : this.type == l.RoleAttribute.ExtraGun ? u.default.playSoundEffect(u.default.upgradeSGun) : this.type == l.RoleAttribute.LifeLevel && u.default.playSoundEffect(u.default.upgradeHp);
};
a([ y({
type: cc.Button,
tooltip: "问号按钮"
}) ], t.prototype, "infoBtn", void 0);
a([ y({
type: cc.Button,
tooltip: "升级按钮"
}) ], t.prototype, "levelUpBtn", void 0);
a([ y({
type: cc.Node,
tooltip: "升级进度"
}) ], t.prototype, "pro", void 0);
a([ y({
type: cc.Label,
tooltip: "名字文本"
}) ], t.prototype, "nameLable", void 0);
a([ y({
type: cc.Label,
tooltip: "升级钱文本"
}) ], t.prototype, "goldLable", void 0);
a([ y({
type: cc.Button,
tooltip: "解锁按钮"
}) ], t.prototype, "lockBtn", void 0);
a([ y({
type: cc.Label,
tooltip: "解锁按钮Lable"
}) ], t.prototype, "lockBtnLable", void 0);
a([ y({
type: cc.Node,
tooltip: "升级部分"
}) ], t.prototype, "levelNode", void 0);
a([ y({
type: cc.Node,
tooltip: "解锁部分"
}) ], t.prototype, "lockNode", void 0);
return t = a([ g ], t);
}(cc.Component);
n.default = m;
cc._RF.pop();
}, {
"../../../code/Config/Config": "Config",
"../../../code/Lib/Global": "Global",
"../../../code/manager/EffectManager": "EffectManager",
"../../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../../code/manager/PanelManager": "PanelManager",
"../../../code/manager/SDKManager": "SDKManager",
"../../../code/manager/SoundManager": "SoundManager",
"../../../code/manager/TableManager": "TableManager",
"../LatticeProgress": "LatticeProgress"
} ],
RefitShopPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "16427bI/DNGt5pIDDeLodlO", "RefitShopPanel");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../../code/manager/UiAniManager"), r = e("../../../code/manager/MyRoleDataManager"), l = e("./RefitItem"), s = e("../../../code/manager/TableManager"), c = e("../../../code/manager/SoundManager"), u = e("../../../code/Config/Config"), d = e("../../../code/manager/PanelManager"), p = e("../../../code/basecode/BasePanel"), f = e("../../../code/manager/GuideManager"), h = e("../../../code/Lib/Global"), g = e("../../../code/manager/SDKManager"), y = e("../../../code/Lib/LocalStorage"), m = e("../../../code/manager/Advert_Manager"), b = e("../../../code/manager/Umeng_Manager"), v = cc._decorator, S = v.ccclass, _ = v.property, P = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.nameNode = null;
t.nameLable = null;
t.connonName = null;
t.talkLable = null;
t.okLable = null;
t.okshadowLable = null;
t.infoLableArr = [];
t.mapNameLable = null;
t.diamondLable = null;
t.okBtn = null;
t.levelupGroup = null;
t.unlockGroup = null;
t.itemNodeArr = [];
t.leftBtn = null;
t.rightBtn = null;
t.connonPage = null;
t.spriteAtlas = null;
t.connonShowPrefab = null;
t.unlockBtn = null;
t.unlockInfoNode = null;
t.unlockLable = null;
t.infoNode = null;
t.combatUnlock = null;
t.ButtonS = [];
t.goldUnlockgoldTXT = null;
t.NotUnlockHint = null;
t.condition = null;
t.consume = null;
t.goldMasonry = [];
t.setLabelString = [];
t._aniType = i.UiAniType.RefitShopPanelPanel;
t.unlockDiamond = 0;
t.isInit = !1;
t.connonGroup = {};
return t;
}
t.prototype.init = function() {
if (!this.isInit) {
this.isInit = !0;
for (var e = s.default.instance.connonTable.table, t = 0; t < e.length; t++) {
var n = e[t];
if (n) {
var o = r.default.instance.getConnonInfo(n.id), a = this.spriteAtlas.getSpriteFrame(n.image_cannon + (o ? r.default.instance.getSourceNum(o.mainGunLevel - 1) : "0")), i = this.spriteAtlas.getSpriteFrame(n.image_basis + "0"), l = this.spriteAtlas.getSpriteFrame("Gun_301000_" + (Number(n.id) - 301e3) % 5), c = cc.instantiate(this.connonShowPrefab);
this.connonGroup[Number(n.id)] = c;
c.getChildByName("connon").getComponent(cc.Sprite).spriteFrame = a;
c.getChildByName("wheel").getComponent(cc.Sprite).spriteFrame = i;
c.getChildByName("sub").getComponent(cc.Sprite).spriteFrame = l;
if (r.default.instance.checkConnonUnlocked(Number(n.id))) {
c.getChildByName("connon").color = cc.color(255, 255, 255);
c.getChildByName("wheel").color = cc.color(255, 255, 255);
c.getChildByName("sub").color = cc.color(255, 255, 255);
} else {
c.getChildByName("connon").color = cc.color(108, 108, 108);
c.getChildByName("wheel").color = cc.color(108, 108, 108);
c.getChildByName("sub").color = cc.color(108, 108, 108);
}
this.connonPage.addPage(c);
}
}
}
};
t.prototype.openPanel = function(e) {
void 0 === e && (e = 0);
f.default.instance.checkCanGuide(10002, 1) && f.default.instance.startGuide(10002);
for (var t = 0; t < this.ButtonS.length; t++) this.ButtonS[t].node.active = !1;
this.addEvent();
this.playUIAni(i.InOrOut.IN);
this.getComponent(cc.Widget).updateAlignment();
this.inAction();
this.chooseConnonID = 0 == e ? r.default.instance.curCannonID : e;
};
t.prototype.closePanel = function() {
r.default.instance.gameState = 0;
c.default.playSoundEffect(c.default.btnSound);
d.default.gameUi.btnTishi();
d.default.game.playerScript.setConnonSkin(r.default.instance.curCannonID);
y.default.saveItem("curCannonID", r.default.instance.curCannonID.toString());
this.outAction();
this.dleEvent();
this.playUIAni(i.InOrOut.OUT);
};
t.prototype.panelIn = function() {
this.connonPage.node.active = !0;
this.infoNode.active = !0;
this.init();
var e = this.chooseConnonID - 301e3;
this.connonPage.setCurrentPageIndex(e);
this.setLable();
};
t.prototype.panelOut = function() {
this.NotUnlockHint.opacity = 0;
this.infoNode.active = !1;
this.connonPage.node.active = !1;
this.node.removeFromParent();
d.default.instance.deleteOpen(u.PanelName.RefitShopPanel);
};
t.prototype.addEvent = function() {
this.okBtn.node.on("click", this.okBtnTap, this);
this.leftBtn.node.on("click", this.leftTap, this);
this.rightBtn.node.on("click", this.rightTap, this);
this.unlockBtn.node.on("click", this.unlockBtnTap, this);
this.connonPage.node.on("scroll-ended", this.moveEnd, this);
this.ButtonS[0].node.on("click", this.combatBT, this);
this.ButtonS[1].node.on("click", this.goldUnlock, this);
this.ButtonS[2].node.on("click", this.NotUnlock, this);
this.ButtonS[3].node.on("click", this.VideoObtainGold, this);
this.ButtonS[4].node.on("click", this.watchVideo, this);
this.ButtonS[5].node.on("click", this.MasonryUnlock, this);
};
t.prototype.dleEvent = function() {
this.okBtn.node.off("click", this.okBtnTap, this);
this.leftBtn.node.off("click", this.leftTap, this);
this.rightBtn.node.off("click", this.rightTap, this);
this.unlockBtn.node.off("click", this.unlockBtnTap, this);
this.connonPage.node.off("scroll-ended", this.moveEnd, this);
this.ButtonS[0].node.off("click", this.combatBT, this);
this.ButtonS[1].node.off("click", this.goldUnlock, this);
this.ButtonS[2].node.off("click", this.NotUnlock, this);
this.ButtonS[3].node.off("click", this.VideoObtainGold, this);
this.ButtonS[4].node.off("click", this.watchVideo, this);
this.ButtonS[5].node.off("click", this.MasonryUnlock, this);
};
t.prototype.setLable = function() {
this.unlockCheck();
this.nameLable.string = GlobalFun.i18n.t("lable.10042");
this.okLable.string = GlobalFun.i18n.t("lable.10009");
this.okshadowLable.string = GlobalFun.i18n.t("lable.10009");
this.infoLableArr[0].string = GlobalFun.i18n.t("lable.10077");
this.infoLableArr[1].string = GlobalFun.i18n.t("lable.10078");
this.infoLableArr[2].string = GlobalFun.i18n.t("lable.10079");
this.infoLableArr[3].string = GlobalFun.i18n.t("lable.10078");
this.talkLable.string = GlobalFun.i18n.t("lable.10043");
this.setLabelString[0].string = GlobalFun.i18n.t("lable.10290");
this.setLabelString[1].string = GlobalFun.i18n.t("lable.10232");
this.setLabelString[2].string = GlobalFun.i18n.t("lable.10289");
this.setLabelString[3].string = GlobalFun.i18n.t("lable.10294");
this.setLabelString[4].string = GlobalFun.i18n.t("lable.10282") + GlobalFun.i18n.t("lable.10294");
this.setLabelString[5].string = GlobalFun.i18n.t("lable.10232");
this.setLabelString[6].string = GlobalFun.i18n.t("lable.10295");
for (var e = this.itemNodeArr.length, t = 0; t < e; t++) this.itemNodeArr[t].getComponent(l.default).setLable();
};
t.prototype.unlockCheck = function() {
var e = s.default.instance.connonTable.getDataById(this.chooseConnonID), t = GlobalFun.i18n.t("lable." + e.name);
this.connonName.string = t;
if (r.default.instance.checkConnonUnlocked(this.chooseConnonID)) {
r.default.instance.curCannonID = this.chooseConnonID;
this.connonGroup[this.chooseConnonID].getChildByName("connon").color = cc.color(255, 255, 255);
this.connonGroup[this.chooseConnonID].getChildByName("wheel").color = cc.color(255, 255, 255);
this.connonGroup[this.chooseConnonID].getChildByName("sub").color = cc.color(255, 255, 255);
this.showButton(this.ButtonS[0]);
this.condition.active = !1;
this.consume.active = !1;
this.levelupGroup.active = !0;
this.unlockGroup.active = !1;
this.updateLevelItem();
} else {
this.connonGroup[this.chooseConnonID].getChildByName("connon").color = cc.color(108, 108, 108);
this.connonGroup[this.chooseConnonID].getChildByName("wheel").color = cc.color(108, 108, 108);
this.connonGroup[this.chooseConnonID].getChildByName("sub").color = cc.color(108, 108, 108);
this.condition.active = !1;
this.consume.active = !1;
var n = s.default.instance.cannonUnlock.getType(this.chooseConnonID, !0), o = s.default.instance.cannonUnlock.getConsume(this.chooseConnonID, !0), a = s.default.instance.cannonUnlock.getMap(this.chooseConnonID, !0);
switch (n) {
case "1":
this.goldUnlockgoldTXT.string = h.default.setNum(o);
if (r.default.instance.curLevel >= Number(a)) {
this.condition.active = !1;
r.default.instance.Gold < Number(o) ? this.showButton(this.ButtonS[1]) : this.showButton([ this.ButtonS[1], this.ButtonS[3] ]);
} else {
this.condition.getChildByName("con").getComponent(cc.Label).string = "LV" + a;
this.condition.active = !0;
this.consume.active = !0;
this.showButton(this.ButtonS[2]);
this.consume.getComponentInChildren(cc.Sprite).spriteFrame = this.goldMasonry[0];
this.consume.getComponentInChildren(cc.Label).string = h.default.setNum(o);
}
break;

case "2":
cc.find("Background/gold", this.ButtonS[5].node).getComponent(cc.Label).string = h.default.setNum(o);
if (r.default.instance.curLevel >= Number(a)) {
this.condition.active = !1;
this.showButton(this.ButtonS[5]);
} else {
this.condition.getChildByName("con").getComponent(cc.Label).string = "LV" + a;
this.condition.active = !0;
this.consume.active = !0;
this.showButton(this.ButtonS[2]);
this.consume.getComponentInChildren(cc.Sprite).spriteFrame = this.goldMasonry[1];
this.consume.getComponentInChildren(cc.Label).string = h.default.setNum(o);
}
break;

case "3":
if (r.default.instance.curLevel >= Number(a)) {
this.condition.active = !1;
this.showButton(this.ButtonS[4]);
} else {
this.condition.getChildByName("con").getComponent(cc.Label).string = "LV" + a;
this.condition.active = !0;
this.showButton(this.ButtonS[2]);
}
}
this.levelupGroup.active = !1;
this.unlockGroup.active = !0;
this.unlockDiamond = Number(e.gem_c);
if (this.canUnlock(e)) {
this.unlockLable.string = e.gem_c;
this.unlockBtn.node.active = !0;
this.unlockInfoNode.active = !1;
} else {
this.unlockBtn.node.active = !1;
this.unlockInfoNode.active = !0;
this.mapNameLable.string = GlobalFun.i18n.t("lable." + (this.chooseConnonID - 301e3 + 10011));
this.diamondLable.string = e.gem_c;
}
}
};
t.prototype.canUnlock = function(e) {
return s.default.instance.mapLevelTable.getCurChapterId(r.default.instance.curLevel) >= Number(e.map);
};
t.prototype.updateTalkLable = function(e) {
this.talkLable.string = e;
};
t.prototype.updateLevelItem = function() {
this.itemNodeArr[0].getComponent(l.default).init(this.chooseConnonID, u.RoleAttribute.LifeLevel);
this.itemNodeArr[1].getComponent(l.default).init(this.chooseConnonID, u.RoleAttribute.MainGunLevel);
this.itemNodeArr[2].getComponent(l.default).init(this.chooseConnonID, u.RoleAttribute.ExtraGun);
this.updateConnonShow();
};
t.prototype.leftTap = function() {
c.default.playSoundEffect(c.default.connonToLeft);
var e = this.connonPage.getCurrentPageIndex();
0 != e && this.connonPage.setCurrentPageIndex(e - 1);
};
t.prototype.rightTap = function() {
c.default.playSoundEffect(c.default.connonToRight);
var e = this.connonPage.content.children.length, t = this.connonPage.getCurrentPageIndex();
t != e - 1 && this.connonPage.setCurrentPageIndex(t + 1);
};
t.prototype.setCurrentPage = function(e) {
var t = this;
this.scheduleOnce(function() {
t.connonPage.setCurrentPageIndex(e);
}, 1);
this.NotUnlockHint.getComponentInChildren(cc.Label).string = GlobalFun.i18n.t("lable." + s.default.instance.guideTable.getWord(10002, 2));
this.scheduleOnce(function() {
cc.tween(t.NotUnlockHint).to(1, {
opacity: 255
}).to(4, {}).to(1, {
opacity: 0
}).start();
}, 1);
};
t.prototype.unlockBtnTap = function() {
if (r.default.instance.dleCurrency(this.unlockDiamond, u.CurrencyType.Diamond)) {
g.default.instance.callJava("trackEventWithType", "(Ljava/lang/String;Ljava/lang/String;I)V", "UnlockConnon", this.chooseConnonID.toString(), 1);
c.default.playSoundEffect(h.default.arrRandom(c.default.upgradeWorkShop));
d.default.gameUi.updataGold();
r.default.instance.addConnon(this.chooseConnonID);
this.unlockCheck();
} else d.default.instance.openPanel(u.PanelName.GoShopPanel, d.default.gameUi.middleNode, u.CurrencyType.Diamond);
};
t.prototype.updateConnonShow = function() {
var e = s.default.instance.connonTable.getDataById(this.chooseConnonID), t = this.connonPage.getCurrentPageIndex(), n = this.connonPage.getPages(), o = r.default.instance.getConnonInfo(e.id), a = this.spriteAtlas.getSpriteFrame(e.image_cannon + (o ? r.default.instance.getSourceNum(o.mainGunLevel - 1) : "0")), i = this.spriteAtlas.getSpriteFrame(e.image_basis + "0"), l = (o && -1 != o.extraGun && r.default.instance.getSourceNum(o.extraGun - 1), 
this.spriteAtlas.getSpriteFrame("Gun_301000_" + (Number(e.id) - 301e3) % 5)), c = n[t];
c.getChildByName("connon").getComponent(cc.Sprite).spriteFrame = a;
c.getChildByName("wheel").getComponent(cc.Sprite).spriteFrame = i;
c.getChildByName("sub").getComponent(cc.Sprite).spriteFrame = l;
};
t.prototype.moveEnd = function() {
this.chooseConnonID = this.connonPage.getCurrentPageIndex() + 301e3;
this.unlockCheck();
};
t.prototype.okBtnTap = function() {
d.default.instance.closePanel(u.PanelName.RefitShopPanel);
};
t.prototype.inAction = function() {
this.combatUnlock.runAction(cc.moveTo(.15, cc.v2(0, .25 * (cc.Canvas.instance.designResolution.height - this.node.height) - 100)));
this.nameNode.runAction(cc.moveTo(.15, cc.v2(0, 566 - .25 * (cc.Canvas.instance.designResolution.height - this.node.height))));
};
t.prototype.outAction = function() {
this.combatUnlock.runAction(cc.moveTo(.15, cc.v2(0, -935)));
this.nameNode.runAction(cc.moveTo(.15, cc.v2(0, 1005)));
};
t.prototype.showButton = function(e) {
if (e instanceof Array) {
for (var t = 0; t < this.ButtonS.length; t++) this.ButtonS[t].node.active = !1;
for (t = 0; t < e.length; t++) e[t].node.active = !0;
} else for (t = 0; t < this.ButtonS.length; t++) this.ButtonS[t] != e ? this.ButtonS[t].node.active = !1 : this.ButtonS[t].node.active = !0;
};
t.prototype.combatBT = function() {
r.default.instance.curCannonID = this.chooseConnonID;
this.okBtnTap();
};
t.prototype.goldUnlock = function() {
var e = s.default.instance.cannonUnlock.getMap(this.chooseConnonID, !0);
if (r.default.instance.curLevel >= Number(e)) {
var t = s.default.instance.cannonUnlock.getConsume(this.chooseConnonID, !0);
if (r.default.instance.dleCurrency(Number(t))) {
d.default.gameUi.updataGold();
r.default.instance.addConnon(this.chooseConnonID);
this.showButton(this.ButtonS[0]);
d.default.gameUi.HaveUnlock.isHaveUnlock();
this.connonGroup[this.chooseConnonID].getChildByName("connon").color = cc.color(255, 255, 255);
this.connonGroup[this.chooseConnonID].getChildByName("wheel").color = cc.color(255, 255, 255);
this.connonGroup[this.chooseConnonID].getChildByName("sub").color = cc.color(255, 255, 255);
} else {
this.NotUnlockHint.getComponentInChildren(cc.Label).string = GlobalFun.i18n.t("lable.10292");
cc.tween(this.NotUnlockHint).to(1, {
opacity: 255
}).to(1, {
opacity: 0
}).start();
}
} else {
this.NotUnlockHint.getComponentInChildren(cc.Label).string = GlobalFun.i18n.t("lable.10296").replace("%d", e);
cc.tween(this.NotUnlockHint).to(1, {
opacity: 255
}).to(1, {
opacity: 0
}).start();
}
};
t.prototype.watchVideo = function() {
var e = s.default.instance.cannonUnlock.getMap(this.chooseConnonID, !0);
b.default.instance.putPoint(b.Point_EventID.workshop_Click_num);
if (r.default.instance.curLevel >= Number(e)) m.default.instance.show_Ad(m.Adver_Type.ReWardVideo_Adv, function(e) {
r.default.instance.addConnon(this.chooseConnonID);
this.showButton(this.ButtonS[0]);
d.default.gameUi.HaveUnlock.isHaveUnlock();
this.connonGroup[this.chooseConnonID].getChildByName("connon").color = cc.color(255, 255, 255);
this.connonGroup[this.chooseConnonID].getChildByName("wheel").color = cc.color(255, 255, 255);
this.connonGroup[this.chooseConnonID].getChildByName("sub").color = cc.color(255, 255, 255);
}.bind(this)); else {
this.NotUnlockHint.getComponentInChildren(cc.Label).string = GlobalFun.i18n.t("lable.10296").replace("%d", e);
cc.tween(this.NotUnlockHint).to(1, {
opacity: 255
}).to(1, {
opacity: 0
}).start();
}
};
t.prototype.NotUnlock = function() {
var e = s.default.instance.cannonUnlock.getMap(this.chooseConnonID, !0);
this.NotUnlockHint.getComponentInChildren(cc.Label).string = GlobalFun.i18n.t("lable.10296").replace("%d", e);
cc.tween(this.NotUnlockHint).to(1, {
opacity: 255
}).to(1, {
opacity: 0
}).start();
};
t.prototype.VideoObtainGold = function() {
b.default.instance.putPoint(b.Point_EventID.workshop_Click_num);
m.default.instance.show_Ad(m.Adver_Type.ReWardVideo_Adv, function(e) {
b.default.instance.putPoint(b.Point_EventID.workshop_Click_num);
r.default.instance.addCurrency(1e3);
d.default.gameUi.HaveUnlock.isHaveUnlock();
}.bind(this));
};
t.prototype.MasonryUnlock = function() {
var e = s.default.instance.cannonUnlock.getMap(this.chooseConnonID, !0);
if (r.default.instance.curLevel >= Number(e)) {
cc.find("Background/gold", this.ButtonS[5].node).getComponent(cc.Label);
var t = s.default.instance.cannonUnlock.getConsume(this.chooseConnonID, !0);
if (r.default.instance.dleCurrency(Number(t), u.CurrencyType.Diamond)) {
d.default.gameUi.updataGold();
r.default.instance.addConnon(this.chooseConnonID);
this.showButton(this.ButtonS[0]);
d.default.gameUi.HaveUnlock.isHaveUnlock();
this.connonGroup[this.chooseConnonID].getChildByName("connon").color = cc.color(255, 255, 255);
this.connonGroup[this.chooseConnonID].getChildByName("wheel").color = cc.color(255, 255, 255);
this.connonGroup[this.chooseConnonID].getChildByName("sub").color = cc.color(255, 255, 255);
} else {
this.NotUnlockHint.getComponentInChildren(cc.Label).string = GlobalFun.i18n.t("lable.10291");
cc.tween(this.NotUnlockHint).to(1, {
opacity: 255
}).to(1, {
opacity: 0
}).start();
}
} else {
this.NotUnlockHint.getComponentInChildren(cc.Label).string = GlobalFun.i18n.t("lable.10296").replace("%d", e);
cc.tween(this.NotUnlockHint).to(1, {
opacity: 255
}).to(1, {
opacity: 0
}).start();
}
};
a([ _({
type: cc.Node,
tooltip: "牌子"
}) ], t.prototype, "nameNode", void 0);
a([ _({
type: cc.Label,
tooltip: "面板名字"
}) ], t.prototype, "nameLable", void 0);
a([ _({
type: cc.Label,
tooltip: "炮名字"
}) ], t.prototype, "connonName", void 0);
a([ _({
type: cc.Label,
tooltip: "聊天文本"
}) ], t.prototype, "talkLable", void 0);
a([ _({
type: cc.Label,
tooltip: "ok按钮文本"
}) ], t.prototype, "okLable", void 0);
a([ _({
type: cc.Label,
tooltip: "ok按钮文本阴影"
}) ], t.prototype, "okshadowLable", void 0);
a([ _({
type: [ cc.Label ],
tooltip: "解锁信息文本"
}) ], t.prototype, "infoLableArr", void 0);
a([ _({
type: cc.Label,
tooltip: "地图名字文本"
}) ], t.prototype, "mapNameLable", void 0);
a([ _({
type: cc.Label,
tooltip: "钻石数量文本"
}) ], t.prototype, "diamondLable", void 0);
a([ _({
type: cc.Button,
tooltip: "OK按钮"
}) ], t.prototype, "okBtn", void 0);
a([ _({
type: cc.Node,
tooltip: "升级部分"
}) ], t.prototype, "levelupGroup", void 0);
a([ _({
type: cc.Node,
tooltip: "解锁部分"
}) ], t.prototype, "unlockGroup", void 0);
a([ _({
type: [ cc.Node ],
tooltip: "升级数组"
}) ], t.prototype, "itemNodeArr", void 0);
a([ _({
type: cc.Button,
tooltip: "左移按钮"
}) ], t.prototype, "leftBtn", void 0);
a([ _({
type: cc.Button,
tooltip: "右移按钮"
}) ], t.prototype, "rightBtn", void 0);
a([ _({
type: cc.PageView,
tooltip: "炮机显示"
}) ], t.prototype, "connonPage", void 0);
a([ _({
type: cc.SpriteAtlas,
tooltip: "炮图片"
}) ], t.prototype, "spriteAtlas", void 0);
a([ _({
type: cc.Prefab,
tooltip: "炮显示预制体"
}) ], t.prototype, "connonShowPrefab", void 0);
a([ _({
type: cc.Button,
tooltip: "解锁按钮"
}) ], t.prototype, "unlockBtn", void 0);
a([ _({
type: cc.Node,
tooltip: "解锁条件节点"
}) ], t.prototype, "unlockInfoNode", void 0);
a([ _({
type: cc.Label,
tooltip: "解锁文本"
}) ], t.prototype, "unlockLable", void 0);
a([ _({
type: cc.Node,
tooltip: ""
}) ], t.prototype, "infoNode", void 0);
a([ _({
type: cc.Node,
tooltip: "解锁出战按钮父节点"
}) ], t.prototype, "combatUnlock", void 0);
a([ _({
type: [ cc.Button ],
tooltip: "解锁出战按钮组"
}) ], t.prototype, "ButtonS", void 0);
a([ _({
type: cc.Label,
tooltip: "金币解锁按钮金币文字"
}) ], t.prototype, "goldUnlockgoldTXT", void 0);
a([ _({
type: cc.Node,
tooltip: "条件不足按钮提示"
}) ], t.prototype, "NotUnlockHint", void 0);
a([ _({
type: cc.Node,
tooltip: "金币解锁按钮金币不够的提示框"
}) ], t.prototype, "condition", void 0);
a([ _({
type: cc.Node,
tooltip: "消耗"
}) ], t.prototype, "consume", void 0);
a([ _({
type: [ cc.SpriteFrame ],
tooltip: "金币砖石图片组"
}) ], t.prototype, "goldMasonry", void 0);
a([ _([ cc.Label ]) ], t.prototype, "setLabelString", void 0);
return t = a([ S ], t);
}(p.default);
n.default = P;
cc._RF.pop();
}, {
"../../../code/Config/Config": "Config",
"../../../code/Lib/Global": "Global",
"../../../code/Lib/LocalStorage": "LocalStorage",
"../../../code/basecode/BasePanel": "BasePanel",
"../../../code/manager/Advert_Manager": "Advert_Manager",
"../../../code/manager/GuideManager": "GuideManager",
"../../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../../code/manager/PanelManager": "PanelManager",
"../../../code/manager/SDKManager": "SDKManager",
"../../../code/manager/SoundManager": "SoundManager",
"../../../code/manager/TableManager": "TableManager",
"../../../code/manager/UiAniManager": "UiAniManager",
"../../../code/manager/Umeng_Manager": "Umeng_Manager",
"./RefitItem": "RefitItem"
} ],
ResurgenceUi: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "36fadlv+QxGF7rLsA8H4HX5", "ResurgenceUi");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
}, i = this && this.__awaiter || function(e, t, n, o) {
function a(e) {
return e instanceof n ? e : new n(function(t) {
t(e);
});
}
return new (n || (n = Promise))(function(n, i) {
function r(e) {
try {
s(o.next(e));
} catch (e) {
i(e);
}
}
function l(e) {
try {
s(o.throw(e));
} catch (e) {
i(e);
}
}
function s(e) {
e.done ? n(e.value) : a(e.value).then(r, l);
}
s((o = o.apply(e, t || [])).next());
});
}, r = this && this.__generator || function(e, t) {
var n, o, a, i, r = {
label: 0,
sent: function() {
if (1 & a[0]) throw a[1];
return a[1];
},
trys: [],
ops: []
};
return i = {
next: l(0),
throw: l(1),
return: l(2)
}, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
return this;
}), i;
function l(e) {
return function(t) {
return s([ e, t ]);
};
}
function s(i) {
if (n) throw new TypeError("Generator is already executing.");
for (;r; ) try {
if (n = 1, o && (a = 2 & i[0] ? o.return : i[0] ? o.throw || ((a = o.return) && a.call(o), 
0) : o.next) && !(a = a.call(o, i[1])).done) return a;
(o = 0, a) && (i = [ 2 & i[0], a.value ]);
switch (i[0]) {
case 0:
case 1:
a = i;
break;

case 4:
r.label++;
return {
value: i[1],
done: !1
};

case 5:
r.label++;
o = i[1];
i = [ 0 ];
continue;

case 7:
i = r.ops.pop();
r.trys.pop();
continue;

default:
if (!(a = r.trys, a = a.length > 0 && a[a.length - 1]) && (6 === i[0] || 2 === i[0])) {
r = 0;
continue;
}
if (3 === i[0] && (!a || i[1] > a[0] && i[1] < a[3])) {
r.label = i[1];
break;
}
if (6 === i[0] && r.label < a[1]) {
r.label = a[1];
a = i;
break;
}
if (a && r.label < a[2]) {
r.label = a[2];
r.ops.push(i);
break;
}
a[2] && r.ops.pop();
r.trys.pop();
continue;
}
i = t.call(e, r);
} catch (e) {
i = [ 6, e ];
o = 0;
} finally {
n = a = 0;
}
if (5 & i[0]) throw i[1];
return {
value: i[0] ? i[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var l = e("../../code/manager/PanelManager"), s = e("../../code/manager/MyRoleDataManager"), c = (e("../../code/ads/AdsGroupController"), 
e("../../code/Config/Config")), u = e("../../code/manager/SoundManager"), d = e("../../code/basecode/BasePanel"), p = e("../../code/manager/UiAniManager"), f = e("../../code/manager/Advert_Manager"), h = e("../../code/manager/Umeng_Manager"), g = cc._decorator, y = g.ccclass, m = g.property, b = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.timePro = null;
t.resurgenceLable = null;
t.diamondLable = null;
t.diamondLableShadow = null;
t.resurgenceBtn = null;
t.videoResurgenceBtn = null;
t.countAni = null;
t.shade = null;
t.masonry = null;
t.masonryGroup = [];
t.scheduleStrip = null;
t.nowGuanQia = null;
t.nextGuanQia = null;
t.reminder = null;
t.scheduletxt = null;
t.scheduleNode = null;
t.setLabelString = [];
t.isEndGame = !1;
t.needDiamod = 0;
t._aniType = p.UiAniType.TopToDown;
return t;
}
t.prototype.openPanel = function() {
var e = this;
1 == s.default.instance.gameType ? this.scheduleNode.opacity = 0 : this.scheduleNode.opacity = 255;
this.setLable();
this.addEvent();
this.playUIAni(p.InOrOut.IN);
this.isEndGame = !1;
u.default.setvolumeNum(.5);
this.needDiamod = 0 == l.default.game.resurgenceTimes ? 1 : 3 * l.default.game.resurgenceTimes;
this.diamondLable.string = this.diamondLableShadow.string = this.needDiamod + "";
this.resurgenceLable.opacity = 0;
if (s.default.instance.Diamond >= this.needDiamod) {
this.masonry.spriteFrame = this.masonryGroup[0];
this.shade.active = !1;
} else {
this.masonry.spriteFrame = this.masonryGroup[1];
this.shade.active = !0;
}
this.nowGuanQia.string = s.default.instance.curLevel + "";
this.nextGuanQia.string = s.default.instance.curLevel + 1 + "";
this.scheduleStrip.progress = 0;
this.reminder.active = !1;
var t = l.default.gameUi.pro.progress;
this.scheduletxt.string = GlobalFun.i18n.t("lable.10283").replace("%d", Math.floor(100 * t));
cc.tween(this.scheduleStrip).to(1, {
progress: t
}).call(function() {
e.reminder.active = t >= .5 && t < 1;
}).start();
};
t.prototype.closePanel = function() {
this.dleEvent();
this.playUIAni(p.InOrOut.OUT);
this.timePro.unscheduleAllCallbacks();
};
t.prototype.addEvent = function() {
this.resurgenceBtn.node.on("click", this.onResurgenceBtnTap, this);
this.videoResurgenceBtn.node.on("click", this.videoResurgence, this);
};
t.prototype.dleEvent = function() {
this.resurgenceBtn.node.off("click", this.onResurgenceBtnTap, this);
this.videoResurgenceBtn.node.off("click", this.videoResurgence, this);
this.node.off("touchstart", this.skipResurgence, this);
};
t.prototype.panelIn = function() {
this.timePro.progress = 1;
this.countAni.play("ResurgenceCount");
this.scheduleOnce(this.canSkip, 2);
};
t.prototype.panelOut = function() {
this.node.removeFromParent(!1);
this.isEndGame && l.default.game.endGame(!0);
};
t.prototype.timeEnd = function() {
this.skipResurgence();
};
t.prototype.resumeTime = function() {
var e = this.countAni.getAnimationState("ResurgenceCount");
this.countAni.play("ResurgenceCount", e.time);
};
t.prototype.videoResurgence = function() {
return i(this, void 0, void 0, function() {
return r(this, function(e) {
this.countAni.stop();
h.default.instance.putPoint(0 == s.default.instance.gameType ? h.Point_EventID.endless_fuhuo_Click_num : h.Point_EventID.fighting_fuhuo_Click_num);
f.default.instance.show_Ad(f.Adver_Type.ReWardVideo_Adv, function(e) {
l.default.game.onResurgenceTap(!0);
l.default.instance.closePanel(c.PanelName.ResurgenceUi);
l.default.gameUi.updataGold();
}.bind(this), function() {
this.countAni.resume();
}.bind(this));
return [ 2 ];
});
});
};
t.prototype.onResurgenceBtnTap = function() {
return i(this, void 0, void 0, function() {
var e = this;
return r(this, function(t) {
this.countAni.stop();
u.default.playSoundEffect(u.default.btnSound);
this.timePro.unscheduleAllCallbacks();
if (s.default.instance.dleCurrency(this.needDiamod, c.CurrencyType.Diamond)) {
l.default.game.onResurgenceTap();
l.default.instance.closePanel(c.PanelName.ResurgenceUi);
l.default.gameUi.updataGold();
} else {
this.resumeTime();
this.resurgenceLable.opacity = 255;
this.scheduleOnce(function() {
e.resurgenceLable.opacity = 0;
}, 2);
}
return [ 2 ];
});
});
};
t.prototype.canSkip = function() {
this.node.on("touchstart", this.skipResurgence, this);
};
t.prototype.skipResurgence = function() {
if (!this.isEndGame) {
this.isEndGame = !0;
l.default.instance.closePanel(c.PanelName.ResurgenceUi);
}
};
t.prototype.setLable = function() {
this.resurgenceLable.getComponentInChildren(cc.Label).string = GlobalFun.i18n.t("lable.10291");
this.reminder.getComponent(cc.Label).string = GlobalFun.i18n.t("lable.10293") + "!";
this.scheduletxt.string = GlobalFun.i18n.t("lable.10283").replace("%d", Math.floor(100 * l.default.gameUi.pro.progress));
this.setLabelString[0].string = GlobalFun.i18n.t("lable.10282") + GlobalFun.i18n.t("lable.10183");
this.setLabelString[1].string, GlobalFun.i18n.t("lable.10183");
};
a([ m(cc.ProgressBar) ], t.prototype, "timePro", void 0);
a([ m(cc.Node) ], t.prototype, "resurgenceLable", void 0);
a([ m({
type: cc.Label,
tooltip: "复活钻石数量"
}) ], t.prototype, "diamondLable", void 0);
a([ m({
type: cc.Label,
tooltip: "复活钻石数量阴影"
}) ], t.prototype, "diamondLableShadow", void 0);
a([ m({
type: cc.Button,
tooltip: "复活按钮"
}) ], t.prototype, "resurgenceBtn", void 0);
a([ m({
type: cc.Button,
tooltip: "看视频复活按钮"
}) ], t.prototype, "videoResurgenceBtn", void 0);
a([ m({
type: cc.Animation,
tooltip: "倒计时"
}) ], t.prototype, "countAni", void 0);
a([ m({
type: cc.Node,
tooltip: "灰色遮罩"
}) ], t.prototype, "shade", void 0);
a([ m({
type: cc.Sprite,
tooltip: "砖石要显示的对象"
}) ], t.prototype, "masonry", void 0);
a([ m({
type: [ cc.SpriteFrame ],
tooltip: "砖石图片组"
}) ], t.prototype, "masonryGroup", void 0);
a([ m({
type: cc.ProgressBar,
tooltip: "进度条"
}) ], t.prototype, "scheduleStrip", void 0);
a([ m({
type: cc.Label,
tooltip: "当前关卡"
}) ], t.prototype, "nowGuanQia", void 0);
a([ m({
type: cc.Label,
tooltip: "下一关卡"
}) ], t.prototype, "nextGuanQia", void 0);
a([ m({
type: cc.Node,
tooltip: "关卡快完成提示"
}) ], t.prototype, "reminder", void 0);
a([ m({
type: cc.Label,
tooltip: "进度文字描述"
}) ], t.prototype, "scheduletxt", void 0);
a([ m({
type: cc.Node,
tooltip: "关卡进度根节点"
}) ], t.prototype, "scheduleNode", void 0);
a([ m([ cc.Label ]) ], t.prototype, "setLabelString", void 0);
return t = a([ y ], t);
}(d.default);
n.default = b;
cc._RF.pop();
}, {
"../../code/Config/Config": "Config",
"../../code/ads/AdsGroupController": "AdsGroupController",
"../../code/basecode/BasePanel": "BasePanel",
"../../code/manager/Advert_Manager": "Advert_Manager",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/PanelManager": "PanelManager",
"../../code/manager/SoundManager": "SoundManager",
"../../code/manager/UiAniManager": "UiAniManager",
"../../code/manager/Umeng_Manager": "Umeng_Manager"
} ],
RewardItem: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f51228ajDxF1pL+dcIBetxY", "RewardItem");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../../code/Lib/Global"), r = e("../../../code/manager/EffectManager"), l = e("../../../code/manager/PanelManager"), s = e("../../../code/Config/Config"), c = e("../../../code/manager/SoundManager"), u = e("../../../code/manager/MyRoleDataManager"), d = e("../../../code/manager/TableManager"), p = cc._decorator, f = p.ccclass, h = p.property, g = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.goldLabel = null;
t.goldIcon = null;
t.goldNode = null;
t.diamondLabel = null;
t.diamondIcon = null;
t.diamondNode = null;
t.chipLabel = null;
t.chipIcon = null;
t.chipNode = null;
t.connonNode = null;
t.connon = null;
t.wheel = null;
t.sub = null;
t.reward = new Map();
t.complete = null;
return t;
}
t.prototype.init = function(e) {
var t = this;
this.reward = e;
this.reward.has(510002) && this.reward.delete(510002);
for (var n = [ this.goldLabel, this.diamondLabel, this.chipLabel ], o = [ this.goldNode, this.diamondNode, this.chipNode ], a = 0, r = 0; r < 3; r++) {
var s = n[r], c = o[r];
if (e.has(51e4 + r)) {
a++;
s.string = i.default.setNum(e.get(51e4 + r)) + "";
"0" == s.string ? c.active = !1 : c.active = !0;
} else c.active = !1;
}
if (this.connonNode) {
this.connonNode.active = !1;
a < this.reward.size && this.reward.forEach(function(e, n) {
if (u.default.instance.isConnon(n) && t.connonNode) {
t.connonNode.active = !0;
var o = d.default.instance.connonTable.getScourceId(n, 4), a = o[0], i = o[1], r = o[2];
t.connon.spriteFrame = l.default.game.playerScript.connonAtlas.getSpriteFrame(a + "0");
t.wheel.spriteFrame = l.default.game.playerScript.connonAtlas.getSpriteFrame(r + "0");
t.sub.spriteFrame = l.default.game.playerScript.connonAtlas.getSpriteFrame(i + "0");
}
});
}
};
t.prototype.rewardFly = function(e, t) {
var n = this;
void 0 === e && (e = null);
void 0 === t && (t = 1);
var o = 0, a = [ this.goldIcon, this.diamondIcon, this.chipIcon ];
this.reward.forEach(function(i, l) {
if (u.default.instance.isConnon(l)) {
if (!n.connonNode) return;
r.default.instance.rewardFly(n.connonNode, l, i * (l == s.CurrencyType.Gold ? t : 1));
} else {
var c = l - 51e4;
a[c] && a[c].node && r.default.instance.rewardFly(a[c].node, l, i * (l == s.CurrencyType.Gold ? t : 1), null == e ? null : e[o]);
}
o++;
});
};
t.prototype.moreRewardIn = function(e, t) {
var n = this;
this.complete = t;
for (var o = [ this.goldLabel, this.diamondLabel, this.chipLabel ], a = [ this.goldNode, this.diamondNode, this.chipNode ], i = 0; i < 3; i++) {
var r = o[i];
1 == a[i].active && e.has(51e4 + i) && this.getTextTween(r, Number(this.reward.get(51e4 + i)) + Number(e.get(51e4 + i)), Number(this.reward.get(51e4 + i)), .01);
}
this.complete && this.scheduleOnce(function() {
n.complete();
}, .5);
};
t.prototype.inEffect = function(e, t, n, o) {
var a = this;
e.setPosition(cc.v2(0, 80));
var r = cc.sequence(cc.fadeTo(.2, 0), cc.callFunc(function() {
t.string = i.default.setNum(n);
if (a.complete) {
a.complete();
a.complete = null;
}
}), cc.fadeTo(.2, 255)), l = cc.sequence(cc.fadeTo(.2, 255), cc.fadeTo(.7, 255), cc.spawn(cc.moveTo(.4, cc.v2(0, 0)), cc.fadeTo(.4, 0)), cc.callFunc(function() {
s.CurrencyType.Gold ? c.default.playSoundEffect(c.default.getCoinEnd) : s.CurrencyType.Diamond && c.default.playSoundEffect(c.default.getDiamod);
e.removeFromParent();
t.node.runAction(r);
}));
e.runAction(l);
};
t.prototype.getTextTween = function(e, t, n, o, a) {
var r = this;
void 0 === n && (n = 0);
void 0 === o && (o = .02);
void 0 === a && (a = .3);
var l = e.string;
l.indexOf(",") && (l = l.replace(/,/g, ""));
n = Number(l);
var s = 0, u = this.getScrollingTimes(t.toString());
o = a / u;
var d = Math.round((t - n) / u), p = 0, f = function() {
if ((s += d) >= t - n) {
s = t - n;
r.node.stopAllActions();
}
if (p % 4 == 0) {
c.default.playSoundEffect(c.default.fightReward);
p = 0;
}
p++;
e.string = i.default.setNum(n + s);
};
this.unschedule(f);
this.schedule(f, o, u);
};
t.prototype.getScrollingTimes = function(e) {
var t = 1, n = e.length;
n <= 2 ? t = 1 : n > 2 && n <= 5 ? t = 30 : n > 5 && n <= 9 && (t = 20);
return t;
};
a([ h({
type: cc.Label,
tooltip: "游戏币Lable"
}) ], t.prototype, "goldLabel", void 0);
a([ h({
type: cc.Sprite,
tooltip: "游戏币icon"
}) ], t.prototype, "goldIcon", void 0);
a([ h({
type: cc.Node,
tooltip: "游戏币节点"
}) ], t.prototype, "goldNode", void 0);
a([ h({
type: cc.Label,
tooltip: "钻石Lable"
}) ], t.prototype, "diamondLabel", void 0);
a([ h({
type: cc.Sprite,
tooltip: "钻石icon"
}) ], t.prototype, "diamondIcon", void 0);
a([ h({
type: cc.Node,
tooltip: "钻石节点"
}) ], t.prototype, "diamondNode", void 0);
a([ h({
type: cc.Label,
tooltip: "芯片Lable"
}) ], t.prototype, "chipLabel", void 0);
a([ h({
type: cc.Sprite,
tooltip: "芯片icon"
}) ], t.prototype, "chipIcon", void 0);
a([ h({
type: cc.Node,
tooltip: "芯片节点"
}) ], t.prototype, "chipNode", void 0);
a([ h({
type: cc.Node,
tooltip: "炮节点"
}) ], t.prototype, "connonNode", void 0);
a([ h({
type: cc.Sprite,
tooltip: "炮"
}) ], t.prototype, "connon", void 0);
a([ h({
type: cc.Sprite,
tooltip: "轮子"
}) ], t.prototype, "wheel", void 0);
a([ h({
type: cc.Sprite,
tooltip: "副炮"
}) ], t.prototype, "sub", void 0);
return t = a([ f ], t);
}(cc.Component);
n.default = g;
cc._RF.pop();
}, {
"../../../code/Config/Config": "Config",
"../../../code/Lib/Global": "Global",
"../../../code/manager/EffectManager": "EffectManager",
"../../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../../code/manager/PanelManager": "PanelManager",
"../../../code/manager/SoundManager": "SoundManager",
"../../../code/manager/TableManager": "TableManager"
} ],
SDKManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ec63eQg5m1HpaUTNydHrhyI", "SDKManager");
var o = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
}, a = this && this.__spreadArrays || function() {
for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
var o = Array(e), a = 0;
for (t = 0; t < n; t++) for (var i = arguments[t], r = 0, l = i.length; r < l; r++, 
a++) o[a] = i[r];
return o;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("./MyRoleDataManager"), r = (e("../Lib/LocalStorage"), e("./PanelManager")), l = e("../Config/Config"), s = cc._decorator, c = s.ccclass, u = (s.property, 
function() {
function e() {}
t = e;
Object.defineProperty(e, "instance", {
get: function() {
if (!this._instance) {
this._instance = new t();
window.SDKManager = this._instance;
}
return this._instance;
},
enumerable: !1,
configurable: !0
});
e.prototype.onPause = function() {
if (1 == i.default.instance.gameState) {
i.default.instance.gameState = 4;
cc.director.getPhysicsManager().enabled = !1;
}
};
e.prototype.onResume = function() {};
e.prototype.phoneShack = function() {
i.default.instance.isShack && this.callJava("phoneShack", "()V");
};
e.prototype.phoneLongShack = function() {
i.default.instance.isShack && this.callJava("longPhoneShack", "()V");
};
e.prototype.getNetState = function() {
return cc.sys.isNative ? this.callJava("getNetype", "()I") : 1;
};
e.prototype.rate = function() {
if (cc.sys.isNative) return this.callJava("launchAppDetail", "()V");
};
e.prototype.startPay = function(e) {
this.payId = e;
if (cc.sys.os === cc.sys.OS_ANDROID) this.callJava("jsCallStartGooglePay", "(Ljava/lang/String;)V", e); else if (cc.sys.os === cc.sys.OS_IOS) {
r.default.gameUi.openMask(!0);
this.callJava("startPay", "(Ljava/lang/String;)V", e);
}
};
e.prototype.googlePayPurchaseToken = function(e) {
GlobalFun.log("js googlePayPurchaseToken  " + e);
var t = JSON.parse(e), n = t[0].purchaseToken, o = t[0].orderId;
n.length > 0 && this.callJava("jsCallGooglePayPurchaseToken", "(Ljava/lang/String;)V", n + ";" + o);
};
e.prototype.googlePayResult = function(e) {
r.default.gameUi.openMask(!1);
if (e) {
var t = e.split(";");
if (1 == Number(t[0])) {
GlobalFun.log("pay success");
r.default.instance.getExistPanel(l.PanelName.ShopPanel).topUpSuccess(this.payId);
} else GlobalFun.log("pay failed");
} else GlobalFun.log("pay failed");
};
e.prototype.failedConsumeGood = function() {
r.default.gameUi.openMask(!1);
r.default.instance.getExistPanel(l.PanelName.ShopPanel).stateCheck();
};
e.prototype.reConsumeGood = function() {
this.callJava("jsCallReConsumeGood", "()V");
};
e.prototype.reConsumeComplete = function(e) {
r.default.gameUi.openMask(!1);
if (e) {
var t = e.split(";");
if (1 == Number(t[0])) {
GlobalFun.log("reConsumeComplete success");
r.default.instance.getExistPanel(l.PanelName.ShopPanel).topUpSuccess(t[1]);
} else GlobalFun.log("reConsumeComplete failed1");
} else GlobalFun.log("reConsumeComplete failed2");
r.default.instance.getExistPanel(l.PanelName.ShopPanel).stateCheck();
};
e.prototype.checkUnConsumedGoods = function() {
return !!cc.sys.isNative && this.callJava("jsCallCheckUnConsumedGoods", "()Z");
};
e.prototype.getSubsGoodsData = function() {
return this.callJava("jsCallGetSubsGoodsData", "()Ljava/lang/String;");
};
e.prototype.startRestore = function() {
this.callJava("restorePurchasesReal", "");
};
e.prototype.restoreCompleted = function(e) {};
e.prototype.callJava = function(e, t) {
for (var n, o, i = [], r = 2; r < arguments.length; r++) i[r - 2] = arguments[r];
var l = this.getClassName(e);
e = this.getmethodName(e);
if ("" === l) return "";
if (cc.sys.isNative) {
if (jsb) {
if (cc.sys.os === cc.sys.OS_ANDROID) return (n = jsb.reflection).callStaticMethod.apply(n, a([ l, e, t ], i));
cc.sys.os === cc.sys.OS_IOS && cc.error.apply(cc, a([ l, e ], i));
return (o = jsb.reflection).callStaticMethod.apply(o, a([ l, e ], i));
}
GlobalFun.log("no jsb");
}
return "";
};
e.prototype.getClassName = function(e) {
if (cc.sys.os === cc.sys.OS_ANDROID) switch (e) {
case "loadAd":
case "showAdvert":
return l.JavaClassName.AdvertSDKManager;

case "onEvent":
case "onEventObject":
case "onEventValue":
return l.JavaClassName.UmengSDKManager;

case "phoneShack":
case "longPhoneShack":
case "getNetype":
case "getSysLanguage":
case "getSysCountry":
case "launchAppDetail":
case "launchAppDetailByPackageName":
return l.JavaClassName.ToolManager;

default:
return "";
} else if (cc.sys.os === cc.sys.OS_IOS) switch (e) {
case "loadAd":
case "showAdvert:":
return l.IosClassName.AdvertSDKManager;

default:
return "";
}
};
e.prototype.getClassName1 = function(e) {
if (cc.sys.os === cc.sys.OS_ANDROID) switch (e) {
case "adsAskStatistical":
case "trackEventWithType":
case "trackEvent":
case "trackLevel":
case "trackPay":
case "initAppsflyer":
return l.JavaClassName.Um_Fb_SDKManger;

case "loadAds":
case "showAds":
case "isAdsReady":
case "sendAdmobString":
case "jsSend":
return l.JavaClassName.AdsGroupController;

case "phoneShack":
case "longPhoneShack":
case "getNetype":
case "getSysLanguage":
case "getSysCountry":
case "launchAppDetail":
case "launchAppDetailByPackageName":
return l.JavaClassName.ToolManager;

case "jsCallStartGooglePay":
case "jsCallGooglePayPurchaseToken":
case "jsCallReConsumeGood":
case "jsCallCheckUnConsumedGoods":
case "jsCallGetSubsGoodsData":
return l.JavaClassName.GoogleSDKManger;

case "loadAd":
case "showAdvert":
return l.JavaClassName.AdvertSDKManager;

case "onEvent":
return l.JavaClassName.UmengSDKManager;
} else if (cc.sys.os === cc.sys.OS_IOS) switch (e) {
case "phoneShack":
case "longPhoneShack":
case "getNetype":
case "getSysLanguage":
case "getSysCountry":
case "jsSend":
case "launchAppDetail":
return l.IosClassName.SDKManager;

case "adsAskStatistical":
case "trackEventWithType":
case "trackEvent":
case "trackLevel":
case "trackPay":
return l.IosClassName.Um_SDKManger;

case "loadAds":
case "showAds":
case "isAdsReady":
case "sendAdmobString":
return l.IosClassName.AdsGroupController;

case "startPay":
case "restorePurchasesReal":
return l.IosClassName.InAppPurchass;

case "loadAd":
case "showAdvert":
return l.JavaClassName.AdvertSDKManager;
}
};
e.prototype.getmethodName = function(e) {
if (cc.sys.os === cc.sys.OS_ANDROID) return e;
if (cc.sys.os === cc.sys.OS_IOS) switch (e) {
case "phoneShack":
case "longPhoneShack":
case "getNetype":
case "getSysLanguage":
case "getSysCountry":
case "jsSend":
case "launchAppDetail":
case "restorePurchasesReal":
return e;

case "adsAskStatistical":
return "adsAskStatistical:andmsg:";

case "loadAds":
return "loadAds:andAdsType:andPlacementID:andUnitID:";

case "showAds":
return "showAds:andAdsType:andUnitID:andPlacementID:";

case "sendAdmobString":
return "sendAdmobString:";

case "startPay":
return "startPay:";

case "isAdsReady":
return "isAdsReady:andAdsType:andPlacementID:";

case "trackEventWithType":
return "trackEventWithType:andmsg:andnum:";

case "trackEvent":
return "trackEvent:";

case "trackLevel":
return "trackLevel:andnum:";

case "trackPay":
return "trackPay:andnum:";

case "showAdvert":
return "showAdvert:";
}
};
e.prototype.closeMask = function() {
r.default.gameUi.openMask(!1);
};
var t;
return e = t = o([ c ], e);
}());
n.default = u;
cc._RF.pop();
}, {
"../Config/Config": "Config",
"../Lib/LocalStorage": "LocalStorage",
"./MyRoleDataManager": "MyRoleDataManager",
"./PanelManager": "PanelManager"
} ],
ScenceTable: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "1e83dS7PG9B67r/0PHluXy0", "ScenceTable");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../../code/Lib/Global"), a = function() {
function e(e) {
this.table = e;
}
e.prototype.getSourceID = function(e) {
return this.getDataById(e).map_id;
};
e.prototype.getMissinDoc = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && n.id == e) return n.des;
}
};
e.prototype.getMissinNum = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && n.id == e) return n.number;
}
};
e.prototype.getConnonId = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && n.id == e) return n.cannons_id;
}
};
e.prototype.isRightConnon = function(e, t) {
for (var n = 0; n < this.table.length; n++) {
var o = this.table[n];
if (o && o.cannons_id && o.id == e) for (var a = o.cannons_id.split(";"), i = a.length, r = 0; r < i; r++) {
var l = a[r];
if (Number(l) == t) return 1;
}
}
return 0;
};
e.prototype.getBallIcon = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && n.id == e) return n.ball_id;
}
};
e.prototype.getEffectId = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && n.id == e) return n.effect_id;
}
};
e.prototype.getColor = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && n.id == e) return this.color(n.effects);
}
};
e.prototype.getDataById = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && n.id == e) return n;
}
cc.warn("scenceTable: Do not have id " + e);
return {};
};
e.prototype.getScenceColor = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && n.id == e) return Number(n.wordColor);
}
};
e.prototype.color = function(e) {
var t = e.split(";");
return o.default.arrRandom(t).split(":");
};
return e;
}();
n.default = a;
cc._RF.pop();
}, {
"../../code/Lib/Global": "Global"
} ],
Secret: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "aad4bEB+5xHbJTpZCBRCnNp", "Secret");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e() {}
e.compile = function(e) {
e = e.toString();
for (var t = String.fromCharCode(e.charCodeAt(0) + e.length), n = 1; n < e.length; n++) t += String.fromCharCode(e.charCodeAt(n) + e.charCodeAt(n - 1));
encodeURIComponent(t);
return t;
};
e.uncompile = function(e) {
e = e.toString();
e = decodeURIComponent(e);
for (var t = String.fromCharCode(e.charCodeAt(0) - e.length), n = 1; n < e.length; n++) t += String.fromCharCode(e.charCodeAt(n) - t.charCodeAt(n - 1));
return t;
};
e.setKeyValue = function(e) {
this.keyObj[e] = !0;
};
e.getKeyValue = function(e) {
var t = this.keyObj[e];
this.keyObj[e] = !1;
return t;
};
e.keyObj = {};
return e;
}();
n.default = o;
cc._RF.pop();
}, {} ],
SetPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "82e52Zd+nRLy7Gtj2Gs/lfQ", "SetPanel");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../code/basecode/BasePanel"), r = e("../../code/manager/UiAniManager"), l = e("../../code/manager/SoundManager"), s = e("../../code/basecode/CheckBox"), c = e("../../code/Lib/LocalStorage"), u = e("../../code/manager/MyRoleDataManager"), d = e("../../code/manager/PanelManager"), p = e("../../code/Config/Config"), f = cc._decorator, h = f.ccclass, g = f.property, y = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.backSoundToggle = null;
t.effectSoundToggle = null;
t.shackToggle = null;
t.leftButon = null;
t.rightButon = null;
t.closeBtn = null;
t.languesPage = null;
t.languesLabel = null;
t.nameLabel = null;
t._aniType = r.UiAniType.TopToDown;
t.languesArr = [ "cn", "简体中文", "tw", "繁体中文", "en", "English", "de", "Deutsch", "it", "Italiano", "fr", "Français", "ja", "日本語", "ko", "한국어" ];
t.curIndex = -1;
return t;
}
t.prototype.onLoad = function() {
this.curIndex = 0;
for (var e = this.languesArr.length, t = 0; t <= e / 2 - 1; t++) {
u.default.instance.curLangue == this.languesArr[2 * t] && (this.curIndex = t);
var n = this.languesArr[2 * t + 1], o = cc.instantiate(this.languesLabel);
this.languesPage.addPage(o);
o.active = !0;
o.y = 0;
o.getComponent(cc.Label).string = n;
}
this.languesPage.content.getComponent(cc.Layout).updateLayout();
};
t.prototype.openPanel = function() {
if (-1 != this.curIndex) {
this.languesPage.scrollToOffset(cc.v2(339 * this.curIndex, 0), 0);
this.languesPage.scrollToPage(this.curIndex, 0);
this.languesPage.setCurrentPageIndex(this.curIndex);
}
this.curIndex = -1;
this.playUIAni(r.InOrOut.IN);
this.backSoundToggle.getComponent(s.default).setCheck(!!l.default.backSoundState);
this.effectSoundToggle.getComponent(s.default).setCheck(!!l.default.effectSoundState);
this.shackToggle.getComponent(s.default).setCheck(u.default.instance.isShack);
this.setLable();
this.addEvent();
this.isEndLeftRight();
};
t.prototype.closePanel = function() {
l.default.playSoundEffect(l.default.btnSound);
this.playUIAni(r.InOrOut.OUT);
this.dleEvent();
};
t.prototype.panelIn = function() {};
t.prototype.panelOut = function() {
d.default.instance.deleteOpen(p.PanelName.SetPanel);
this.node.removeFromParent();
};
t.prototype.addEvent = function() {
this.backSoundToggle.node.on("click", this.backSoundToggleTap, this);
this.effectSoundToggle.node.on("click", this.effectSoundToggleTap, this);
this.leftButon.node.on("click", this.toLeft, this);
this.rightButon.node.on("click", this.toRight, this);
this.languesPage.node.on("scroll-ended", this.moveEnd, this);
this.closeBtn.node.on("click", this.closeBtnTap, this);
this.shackToggle.node.on("click", this.shackToggleTap, this);
};
t.prototype.dleEvent = function() {
this.backSoundToggle.node.off("click", this.backSoundToggleTap, this);
this.effectSoundToggle.node.off("click", this.effectSoundToggleTap, this);
this.leftButon.node.off("click", this.toLeft, this);
this.rightButon.node.off("click", this.toRight, this);
this.languesPage.node.off("scroll-ended", this.moveEnd, this);
this.closeBtn.node.off("click", this.closeBtnTap, this);
this.shackToggle.node.off("click", this.shackToggleTap, this);
};
t.prototype.setLable = function() {
this.nameLabel.string = GlobalFun.i18n.t("lable.10008");
};
t.prototype.backSoundToggleTap = function() {
l.default.setBackSoundState(0 == l.default.backSoundState ? 1 : 0);
l.default.playSoundEffect(l.default.btnSound);
};
t.prototype.effectSoundToggleTap = function() {
l.default.setEffectSoundState(0 == l.default.effectSoundState ? 1 : 0);
l.default.playSoundEffect(l.default.btnSound);
};
t.prototype.shackToggleTap = function() {
u.default.instance.isShack = !u.default.instance.isShack;
c.default.saveItem("isShack", u.default.instance.isShack.toString());
l.default.playSoundEffect(l.default.btnSound);
};
t.prototype.toLeft = function() {
l.default.playSoundEffect(l.default.btnSound);
var e = this.languesPage.getCurrentPageIndex();
0 != e && this.languesPage.setCurrentPageIndex(e - 1);
};
t.prototype.toRight = function() {
l.default.playSoundEffect(l.default.btnSound);
var e = this.languesPage.getCurrentPageIndex();
e != this.languesPage.content.children.length - 1 && this.languesPage.setCurrentPageIndex(e + 1);
};
t.prototype.moveEnd = function() {
var e = this.languesPage.getCurrentPageIndex();
GlobalFun.i18n.init(this.languesArr[2 * e]);
c.default.saveItem("language", this.languesArr[2 * e]);
d.default.gameUi.setLable();
d.default.instance.runCurOpenPanelFun("setLable");
this.setLable();
this.isEndLeftRight();
};
t.prototype.isEndLeftRight = function() {};
t.prototype.closeBtnTap = function() {
d.default.instance.closePanel(p.PanelName.SetPanel);
};
a([ g(cc.Toggle) ], t.prototype, "backSoundToggle", void 0);
a([ g(cc.Toggle) ], t.prototype, "effectSoundToggle", void 0);
a([ g(cc.Toggle) ], t.prototype, "shackToggle", void 0);
a([ g(cc.Button) ], t.prototype, "leftButon", void 0);
a([ g(cc.Button) ], t.prototype, "rightButon", void 0);
a([ g(cc.Button) ], t.prototype, "closeBtn", void 0);
a([ g(cc.PageView) ], t.prototype, "languesPage", void 0);
a([ g(cc.Node) ], t.prototype, "languesLabel", void 0);
a([ g(cc.Label) ], t.prototype, "nameLabel", void 0);
return t = a([ h ], t);
}(i.default);
n.default = y;
cc._RF.pop();
}, {
"../../code/Config/Config": "Config",
"../../code/Lib/LocalStorage": "LocalStorage",
"../../code/basecode/BasePanel": "BasePanel",
"../../code/basecode/CheckBox": "CheckBox",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/PanelManager": "PanelManager",
"../../code/manager/SoundManager": "SoundManager",
"../../code/manager/UiAniManager": "UiAniManager"
} ],
ShaderUtils1: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "25770JvQd5JirnIln6oRs5U", "ShaderUtils1");
cc._RF.pop();
}, {} ],
ShaderUtils: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "78ed5vj2PlAlq4FG543K+/5", "ShaderUtils");
cc._RF.pop();
}, {} ],
ShopItem: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "a56509yckRGWL5nwhbD9YLK", "ShopItem");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../../code/manager/SDKManager"), r = e("../../../code/Lib/Secret"), l = e("../../../code/Config/Config"), s = e("../../../code/manager/PanelManager"), c = e("../../../code/manager/TableManager"), u = e("../../../code/manager/MyRoleDataManager"), d = e("../../../code/Lib/LocalStorage"), p = e("../../../code/manager/EffectManager"), f = e("../../../code/Lib/Global"), h = cc._decorator, g = h.ccclass, y = h.property, m = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.buyBtn = null;
t.nameLable = null;
t.priceLable = null;
t.priceLableShadow = null;
t.currencyIcon = null;
t.icon = null;
t.numLable = null;
t.iconArr = [];
return t;
}
t.prototype.onLoad = function() {
this.buyBtn.node.on("click", this.buyBtnTap, this);
};
t.prototype.init = function(e) {
this.payId = e;
var t = c.default.instance.shopTable.getData(e);
this.icon.spriteFrame = s.default.gameUi.iconAtlas.getSpriteFrame(t.icon);
if (2 == Number(t.cost_type)) {
this.currencyIcon.spriteFrame = this.iconArr[0];
this.currencyIcon.node.active = !0;
this.priceLableShadow.string = this.priceLable.string = t.cost;
var n = c.default.instance.shopTable.getreward(Number(this.payId));
this.numLable.string = f.default.setNum(n[0][1]);
} else {
this.currencyIcon.spriteFrame = null;
this.currencyIcon.node.active = !1;
this.priceLableShadow.string = this.priceLable.string = "$" + t.cost;
this.numLable.string = "+" + t.gems;
}
};
t.prototype.setLable = function() {
this.nameLable.string = GlobalFun.i18n.t("lable." + c.default.instance.shopTable.getName(this.payId));
};
t.prototype.successFly = function() {
for (var e = c.default.instance.shopTable.getreward(Number(this.payId)), t = e.length, n = 0; n < t; n++) p.default.instance.rewardFly(this.icon.node, e[n][0], e[n][1]);
};
t.prototype.buyBtnTap = function() {
var e = c.default.instance.shopTable.getPriceType(this.payId);
if (2 == e) this.diamondToGold(); else if (1 == e) {
if (-1 == i.default.instance.getNetState()) return;
if (i.default.instance.checkUnConsumedGoods()) {
i.default.instance.reConsumeGood();
return;
}
s.default.instance.getExistPanel(l.PanelName.ShopPanel).curItem = this;
i.default.instance.callJava("trackPay", "(Ljava/lang/String;Ljava/lang/String;)V", "startPay", this.payId.toString());
r.default.setKeyValue("Buy");
i.default.instance.startPay(this.payId);
}
};
t.prototype.diamondToGold = function() {
if (u.default.instance.dleCurrency(c.default.instance.shopTable.getPrice(this.payId), l.CurrencyType.Diamond)) {
for (var e = c.default.instance.shopTable.getreward(Number(this.payId)), t = e.length, n = 0; n < t; n++) u.default.instance.addCurrency(e[n][1], e[n][0]);
s.default.gameUi.updataGold(l.CurrencyType.Diamond);
var o = c.default.instance.shopTable.getIncome(Number(this.payId));
0 != o && (u.default.instance.allGoldMore = (1 == u.default.instance.allGoldMore ? 0 : u.default.instance.allGoldMore) + o);
d.default.saveItem("allGoldMore", u.default.instance.allGoldMore + "");
s.default.instance.getExistPanel(l.PanelName.ShopPanel).setLable();
this.successFly();
}
};
a([ y({
type: cc.Button,
tooltip: "关闭按钮"
}) ], t.prototype, "buyBtn", void 0);
a([ y({
type: cc.Label,
tooltip: "名字文本"
}) ], t.prototype, "nameLable", void 0);
a([ y({
type: cc.Label,
tooltip: "购买钱文本"
}) ], t.prototype, "priceLable", void 0);
a([ y({
type: cc.Label,
tooltip: "购买钱文本阴影"
}) ], t.prototype, "priceLableShadow", void 0);
a([ y({
type: cc.Sprite,
tooltip: "货币icon"
}) ], t.prototype, "currencyIcon", void 0);
a([ y({
type: cc.Sprite,
tooltip: "icon"
}) ], t.prototype, "icon", void 0);
a([ y({
type: cc.Label,
tooltip: "数量"
}) ], t.prototype, "numLable", void 0);
a([ y({
type: [ cc.SpriteFrame ],
tooltip: "货币资源"
}) ], t.prototype, "iconArr", void 0);
return t = a([ g ], t);
}(cc.Component);
n.default = m;
cc._RF.pop();
}, {
"../../../code/Config/Config": "Config",
"../../../code/Lib/Global": "Global",
"../../../code/Lib/LocalStorage": "LocalStorage",
"../../../code/Lib/Secret": "Secret",
"../../../code/manager/EffectManager": "EffectManager",
"../../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../../code/manager/PanelManager": "PanelManager",
"../../../code/manager/SDKManager": "SDKManager",
"../../../code/manager/TableManager": "TableManager"
} ],
ShopPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "05c0ftoIvxPKb/9n1U3dS8Y", "ShopPanel");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../../code/manager/UiAniManager"), r = e("../../../code/manager/PanelManager"), l = e("../../../code/Config/Config"), s = e("../../../code/manager/TableManager"), c = e("../../../code/manager/SoundManager"), u = e("../../../code/Lib/Secret"), d = e("../../../code/manager/SDKManager"), p = e("../../../code/manager/MyRoleDataManager"), f = e("../../../code/basecode/BasePanel"), h = e("../../../code/Lib/LocalStorage"), g = e("./ShopItem"), y = e("./GiftItem"), m = e("../../../code/manager/NodePoolMananger"), b = cc._decorator, v = b.ccclass, S = b.property, _ = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.giftPrefab = null;
t.shopPrefab = null;
t.scroll = null;
t.closeBtn = null;
t.nameLable = null;
t.talkLable = null;
t.widgetNode0 = null;
t.widgetNode1 = null;
t.itemScriptArr = [];
t._aniType = i.UiAniType.ShopPanel;
t.isInit = !1;
return t;
}
t.prototype.start = function() {
m.default.instance.addPool(this.giftPrefab);
m.default.instance.addPool(this.shopPrefab);
};
t.prototype.initLoad = function() {
var e = this;
if (!this.isInit) {
this.isInit = !0;
for (var t = s.default.instance.shopTable.table, n = function(n, a) {
var i = t[n];
if (i) {
var r;
0 == i.type || 1 == i.type ? o.scheduleOnce(function() {
r = m.default.instance.pop(e.giftPrefab.name);
e.scroll.content.addChild(r);
r.getComponent(y.default).init(i.id);
r.getComponent(y.default).setLable();
e.itemScriptArr.push(r.getComponent(y.default));
}, .1 * n) : 2 == i.type || 3 == i.type ? o.scheduleOnce(function() {
r = m.default.instance.pop(e.shopPrefab.name);
e.scroll.content.addChild(r);
r.getComponent(g.default).init(i.id);
r.getComponent(g.default).setLable();
e.itemScriptArr.push(r.getComponent(g.default));
}, .1 * n) : 4 == i.type && p.default.instance.isHaveDiscount() && o.scheduleOnce(function() {
r = m.default.instance.pop(e.giftPrefab.name);
e.scroll.content.addChild(r, -1);
r.getComponent(y.default).init(i.id);
r.getComponent(y.default).setLable();
e.itemScriptArr.push(r.getComponent(y.default));
}, .1 * n);
}
}, o = this, a = 0, i = t.length; a < i; a++) n(a);
}
};
t.prototype.openPanel = function(e) {
void 0 === e && (e = l.CurrencyType.Diamond);
this.playUIAni(i.InOrOut.IN);
this.addEvent();
this.setLable();
d.default.instance.callJava("trackEvent", "(Ljava/lang/String;)V", "OpenShop");
this.openType = e;
this.moveToAim();
};
t.prototype.closePanel = function() {
this.playUIAni(i.InOrOut.OUT);
this.dleEvent();
};
t.prototype.addEvent = function() {
this.closeBtn.node.on("click", this.closeBtnTap, this);
};
t.prototype.dleEvent = function() {
this.closeBtn.node.off("click", this.closeBtnTap, this);
};
t.prototype.panelIn = function() {
this.isInit || this.initLoad();
};
t.prototype.panelOut = function() {
this.scroll.scrollToOffset(cc.v2(0, 0));
r.default.instance.deleteOpen(l.PanelName.ShopPanel);
this.node.removeFromParent();
r.default.instance.checkPanelIsOpen(l.PanelName.ResurgenceUi) && r.default.instance.getExistPanel(l.PanelName.ResurgenceUi).resumeTime();
};
t.prototype.setLable = function() {
this.nameLable.string = GlobalFun.i18n.t("lable.10197");
this.talkLable.string = GlobalFun.i18n.t("lable.10198");
for (var e = this.itemScriptArr.length, t = 0; t < e; t++) this.itemScriptArr[t].setLable();
};
t.prototype.closeBtnTap = function() {
c.default.playSoundEffect(c.default.btnSound);
r.default.instance.closePanel(l.PanelName.ShopPanel);
};
t.prototype.topUpSuccess = function(e) {
if (u.default.getKeyValue("Buy")) {
var t = s.default.instance.shopTable.getPrice(Number(e));
d.default.instance.callJava("trackPay", "(Ljava/lang/String;Ljava/lang/String;)V", "endPay", e + ":" + t);
for (var n = s.default.instance.shopTable.getreward(Number(e)), o = n.length, a = 0; a < o; a++) p.default.instance.addCurrency(n[a][1], n[a][0]);
var i = s.default.instance.shopTable.getIncome(Number(e));
0 != i && (p.default.instance.allGoldMore = (1 == p.default.instance.allGoldMore ? 0 : p.default.instance.allGoldMore) + i);
h.default.saveItem("allGoldMore", p.default.instance.allGoldMore + "");
this.setLable();
if (this.curItem) {
this.curItem.successFly();
this.curItem = null;
}
}
};
t.prototype.moveToAim = function() {
this.openType == l.CurrencyType.Gold ? this.scroll.scrollToBottom(.4) : this.openType == l.CurrencyType.Diamond ? this.scroll.scrollToOffset(cc.v2(0, this.scroll.getMaxScrollOffset().y - 200), .4) : this.scroll.scrollToTop();
};
a([ S({
type: cc.Prefab,
tooltip: "礼包预制体"
}) ], t.prototype, "giftPrefab", void 0);
a([ S({
type: cc.Prefab,
tooltip: "商品预制体"
}) ], t.prototype, "shopPrefab", void 0);
a([ S({
type: cc.ScrollView,
tooltip: ""
}) ], t.prototype, "scroll", void 0);
a([ S({
type: cc.Button,
tooltip: "关闭按钮"
}) ], t.prototype, "closeBtn", void 0);
a([ S({
type: cc.Label,
tooltip: "名字leble"
}) ], t.prototype, "nameLable", void 0);
a([ S({
type: cc.Label,
tooltip: "描述leble"
}) ], t.prototype, "talkLable", void 0);
a([ S({
type: cc.Node,
tooltip: "适配使用"
}) ], t.prototype, "widgetNode0", void 0);
a([ S({
type: cc.Node,
tooltip: "适配使用"
}) ], t.prototype, "widgetNode1", void 0);
return t = a([ v ], t);
}(f.default);
n.default = _;
cc._RF.pop();
}, {
"../../../code/Config/Config": "Config",
"../../../code/Lib/LocalStorage": "LocalStorage",
"../../../code/Lib/Secret": "Secret",
"../../../code/basecode/BasePanel": "BasePanel",
"../../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../../code/manager/NodePoolMananger": "NodePoolMananger",
"../../../code/manager/PanelManager": "PanelManager",
"../../../code/manager/SDKManager": "SDKManager",
"../../../code/manager/SoundManager": "SoundManager",
"../../../code/manager/TableManager": "TableManager",
"../../../code/manager/UiAniManager": "UiAniManager",
"./GiftItem": "GiftItem",
"./ShopItem": "ShopItem"
} ],
ShopTable: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "32a42kWq/NDsKmqu4Bp7MhY", "ShopTable");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../../code/manager/TableManager"), a = function() {
function e(e) {
this.table = e;
}
e.prototype.getData = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && e == Number(n.id)) return n;
}
};
e.prototype.getPrice = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && e == Number(n.id)) return Number(n.cost);
}
return 0;
};
e.prototype.getIncome = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && e == Number(n.id)) return Number(n.income);
}
return 0;
};
e.prototype.getDoc = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && e == Number(n.id)) return n.des;
}
return "";
};
e.prototype.getName = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && e == Number(n.id)) return n.name;
}
return "";
};
e.prototype.getPriceType = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && e == Number(n.id)) return Number(n.cost_type);
}
return 0;
};
e.prototype.getreward = function(e) {
for (var t = [], n = 0; n < this.table.length; n++) {
var a = this.table[n];
if (a && e == a.id) {
0 != Number(a.coins) && t.push([ 51e4, Math.ceil(.001 * Number(a.coins) * o.default.instance.connonTable.getBestTenUpgradeMoney()) ]);
0 != Number(a.gems) && t.push([ 510001, Number(a.gems) ]);
0 != Number(a.chips) && t.push([ 510002, Number(a.chips) ]);
break;
}
}
return t;
};
e.prototype.getType = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && e == Number(n.id)) return Number(n.type);
}
return 0;
};
return e;
}();
n.default = a;
cc._RF.pop();
}, {
"../../code/manager/TableManager": "TableManager"
} ],
ShowPrefab: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "456dblGxoFMLoZkhYSwUjmB", "ShowPrefab");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../code/manager/MyRoleDataManager"), r = cc._decorator, l = r.ccclass, s = r.property, c = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.connonNode = null;
return t;
}
t.prototype.onLoad = function() {
this.playerScript = this.connonNode.getComponent("Connon");
};
t.prototype.startShow = function(e) {
this.playerScript.init(i.default.instance.curCannonID);
this.playerScript.setConnonSkin(i.default.instance.curCannonID);
this.playerScript.setBullet();
this.playerScript.showType = !0;
this.playerScript.startShoot();
0 == e && this.playerScript.funnelShow(i.default.instance.getRandomFunnel());
};
t.prototype.stopShow = function() {
this.playerScript.showType = !1;
this.playerScript.cancelShoot();
this.playerScript.outFunnel();
this.playerScript.funnelLeft && this.playerScript.funnelLeft.removeFromParent();
this.playerScript.funnelLeft && this.playerScript.funnelRight.removeFromParent();
};
a([ s(cc.Node) ], t.prototype, "connonNode", void 0);
return t = a([ l ], t);
}(cc.Component);
n.default = c;
cc._RF.pop();
}, {
"../../code/manager/MyRoleDataManager": "MyRoleDataManager"
} ],
SkinItem: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6f9f0Bb7OhGYb8bKJt6jfcf", "SkinItem");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../../code/manager/MyRoleDataManager"), r = e("../../../code/manager/TableManager"), l = e("../../../code/Lib/LocalStorage"), s = e("../../../code/manager/PanelManager"), c = e("../../../code/Config/Config"), u = e("../../../code/manager/SDKManager"), d = e("../../../code/manager/Advert_Manager"), p = e("../../../code/manager/Umeng_Manager"), f = cc._decorator, h = f.ccclass, g = f.property, y = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.normalSpriteFrame = null;
t.chooseSpriteFrame = null;
t.backSprite = null;
t.iconSprite = null;
t.conditionNode = null;
t.unlockLabel = null;
t.adSprite = null;
t.diamondSprite = null;
t.skinId = -1;
t.isUnlock = !1;
t.unlockType = -1;
t.index = 0;
return t;
}
t.prototype.onLoad = function() {
this.node.on("click", this.click, this);
};
t.prototype.init = function(e, t) {
void 0 === t && (t = -1);
-1 != t && (this.index = t);
this.skinId = e.id;
this.iconSprite.spriteFrame = s.default.game.ballSpriteAtlas.getSpriteFrame(e.sourceId);
if (i.default.instance.getSkin(this.skinId)) {
this.conditionNode.active = !1;
this.isUnlock = !0;
if (this.skinId == i.default.instance.curSkinID) {
this.click();
return this.index;
}
} else {
this.unlockType = e.unlockCondition;
this.conditionNode.active = !0;
this.isUnlock = !1;
this.setConditionShow(e.unlockCondition, e.quantity);
}
};
t.prototype.unChoose = function() {
this.backSprite.spriteFrame = this.normalSpriteFrame;
};
t.prototype.unlock = function() {
u.default.instance.callJava("trackEventWithType", "(Ljava/lang/String;Ljava/lang/String;I)V", "SkinUnlock", this.skinId.toString(), 1);
i.default.instance.addSkin(this.skinId);
this.isUnlock = !0;
this.conditionNode.active = !1;
this.click();
};
t.prototype.click = function() {
if (this.isUnlock) {
i.default.instance.curSkinID = this.skinId;
s.default.instance.getExistPanel(c.PanelName.SkinPanel).resetChooseItem(this);
this.backSprite.spriteFrame = this.chooseSpriteFrame;
l.default.saveItem("curSkinID", this.skinId + "");
} else this.unlockClick();
};
t.prototype.unlockClick = function() {
if (1 == this.unlockType) {
p.default.instance.putPoint(p.Point_EventID.endless_open_Click_num);
d.default.instance.show_Ad(d.Adver_Type.ReWardVideo_Adv, function(e) {
var t = r.default.instance.skinTable.getQuantity(this.skinId);
i.default.instance.addAdsTime(this.skinId, 1) >= t ? this.unlock() : this.setConditionShow(1, t);
}.bind(this), function() {}.bind(this));
} else if (2 == this.unlockType) {
var e = r.default.instance.skinTable.getQuantity(this.skinId);
if (i.default.instance.dleCurrency(Number(e), c.CurrencyType.Diamond)) {
s.default.gameUi.updataGold(c.CurrencyType.Diamond);
this.unlock();
} else {
var t = this.node.parent.parent.parent.getChildByName("tishikuang");
t.opacity = 255;
this.scheduleOnce(function() {
t.opacity = 0;
}, 2);
}
}
};
t.prototype.setConditionShow = function(e, t) {
var n = this;
this.unlockLabel.node.active = !0;
this.adSprite.node.active = !1;
if (0 == e) {
i.default.instance.addSkin(this.skinId);
this.isUnlock = !0;
this.conditionNode.active = !1;
} else if (1 == e) {
this.adSprite.node.active = !0;
this.diamondSprite.node.active = !1;
var o = i.default.instance.addAdsTime(this.skinId, 0);
this.scheduleOnce(function() {
n.unlockLabel.string = "x" + (t - o);
}, .1);
} else if (2 == e) {
this.adSprite.node.active = !1;
this.diamondSprite.node.active = !0;
this.unlockLabel.string = t;
} else if (3 == e) if (i.default.instance.curLevel >= t) {
i.default.instance.addSkin(this.skinId);
this.isUnlock = !0;
this.conditionNode.active = !1;
} else {
this.adSprite.node.active = !1;
this.diamondSprite.node.active = !1;
this.unlockLabel.string = GlobalFun.i18n.t("lable.10231").replace("%d", t.toString());
}
};
a([ g({
type: cc.SpriteFrame,
tooltip: "普通状态资源"
}) ], t.prototype, "normalSpriteFrame", void 0);
a([ g({
type: cc.SpriteFrame,
tooltip: "选中状态资源"
}) ], t.prototype, "chooseSpriteFrame", void 0);
a([ g({
type: cc.Sprite,
tooltip: "背景"
}) ], t.prototype, "backSprite", void 0);
a([ g({
type: cc.Sprite,
tooltip: "图标"
}) ], t.prototype, "iconSprite", void 0);
a([ g({
type: cc.Node,
tooltip: "条件节点"
}) ], t.prototype, "conditionNode", void 0);
a([ g({
type: cc.Label,
tooltip: "解锁条件"
}) ], t.prototype, "unlockLabel", void 0);
a([ g({
type: cc.Sprite,
tooltip: "广告标志"
}) ], t.prototype, "adSprite", void 0);
a([ g({
type: cc.Sprite,
tooltip: "广告标志"
}) ], t.prototype, "diamondSprite", void 0);
return t = a([ h ], t);
}(cc.Component);
n.default = y;
cc._RF.pop();
}, {
"../../../code/Config/Config": "Config",
"../../../code/Lib/LocalStorage": "LocalStorage",
"../../../code/manager/Advert_Manager": "Advert_Manager",
"../../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../../code/manager/PanelManager": "PanelManager",
"../../../code/manager/SDKManager": "SDKManager",
"../../../code/manager/TableManager": "TableManager",
"../../../code/manager/Umeng_Manager": "Umeng_Manager"
} ],
SkinPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4af3caypL1HUoLcwc80E+eR", "SkinPanel");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../../code/basecode/BasePanel"), r = e("../../../code/manager/UiAniManager"), l = e("../../../code/manager/PanelManager"), s = e("../../../code/Config/Config"), c = e("../../../code/manager/MyRoleDataManager"), u = e("./SkinItem"), d = e("../../../code/manager/TableManager"), p = e("../../../code/manager/SDKManager"), f = e("../../../code/Lib/LocalStorage"), h = e("../../../code/manager/GuideManager"), g = e("../../../code/manager/Umeng_Manager"), y = cc._decorator, m = y.ccclass, b = y.property, v = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.closeButton = null;
t.startBtn = null;
t.startLabel = null;
t.startLabelShadow = null;
t.itemPrefab = null;
t.threeLayout = null;
t.twoLayout = null;
t.scroll = null;
t.challengeDescribe = null;
t.chooseItem = null;
t._aniType = r.UiAniType.TopToDown;
t.itemArr = [];
t.listLen = -1;
return t;
}
t.prototype.onLoad = function() {
for (var e = this, t = null, n = d.default.instance.skinTable.table.length, o = function(n) {
a.scheduleOnce(function() {
if (n % 5 == 0) {
e.listLen++;
t = cc.instantiate(e.threeLayout);
} else if (n % 5 == 3) {
e.listLen++;
t = cc.instantiate(e.twoLayout);
}
var o = cc.instantiate(e.itemPrefab);
t.addChild(o);
o.getComponent(u.default).init(d.default.instance.skinTable.table[n], e.listLen);
e.itemArr.push(o);
n % 5 != 2 && n % 5 != 4 || e.scroll.content.addChild(t);
}, .05 * n);
}, a = this, i = 0; i < n; i++) o(i);
};
t.prototype.openPanel = function() {
var e = Number(f.default.getItem("Endless"));
this.challengeDescribe.string = 0 == e ? GlobalFun.i18n.t("lable.10268").replace("%d", "1") : GlobalFun.i18n.t("lable.10268").replace("%d", e);
c.default.instance.gameState = 8;
this.scheduleOnce(function() {
h.default.instance.checkCanGuide(10003, 1) ? h.default.instance.startGuide(10003) : c.default.instance.gameState = 0;
}, 1);
this.playUIAni(r.InOrOut.IN);
this.setLable();
this.addEvent();
for (var t = this.itemArr.length, n = 0, o = 0; o < t; o++) {
var a = this.itemArr[o].getComponent(u.default).init(d.default.instance.skinTable.table[o]);
a && (n = a);
}
0 == n ? this.scroll.scrollToTop() : this.scroll.scrollTo(cc.v2(0, (this.listLen - 1 - n) / (this.listLen - 1)), 0);
};
t.prototype.closePanel = function() {
this.playUIAni(r.InOrOut.OUT);
this.dleEvent();
};
t.prototype.panelOut = function() {
l.default.instance.deleteOpen(s.PanelName.SkinPanel);
this.node.removeFromParent();
};
t.prototype.addEvent = function() {
this.closeButton.node.on("click", this.closeButtonTap, this);
this.startBtn.node.on("click", this.startBtnTap, this);
};
t.prototype.dleEvent = function() {
this.startBtn.node.off("click", this.startBtnTap, this);
};
t.prototype.setLable = function() {
this.startLabel.string = this.startLabelShadow.string = GlobalFun.i18n.t("lable.10252");
};
t.prototype.resetChooseItem = function(e) {
this.chooseItem && this.chooseItem.unChoose();
this.chooseItem = e;
};
t.prototype.topUpSuccess = function(e) {
for (var t = d.default.instance.skinTable.getId(e), n = this.itemArr.length, o = 0; o < n; o++) {
var a = this.itemArr[o].getComponent(u.default);
if (a.skinId == Number(t)) {
a.unlock();
return;
}
}
};
t.prototype.closeButtonTap = function() {
this.closePanel();
};
t.prototype.startBtnTap = function() {
if (8 != c.default.instance.gameState) {
h.default.instance.get_isInGuide() && g.default.instance.putPoint(g.Point_EventID.ClickButton_gameStartBtn);
this.closePanel();
p.default.instance.callJava("trackEventWithType", "(Ljava/lang/String;Ljava/lang/String;I)V", "EndlessStart", c.default.instance.curSkinID.toString(), 1);
c.default.instance.gameType = 1;
l.default.game.startNewGame();
l.default.gameUi.EndlessManager.useOnceEndless();
}
};
a([ b({
type: cc.Button,
tooltip: "关闭按钮"
}) ], t.prototype, "closeButton", void 0);
a([ b({
type: cc.Button,
tooltip: "开始按钮"
}) ], t.prototype, "startBtn", void 0);
a([ b({
type: cc.Label,
tooltip: "开始按钮"
}) ], t.prototype, "startLabel", void 0);
a([ b({
type: cc.Label,
tooltip: "开始按钮"
}) ], t.prototype, "startLabelShadow", void 0);
a([ b({
type: cc.Prefab,
tooltip: "皮肤item"
}) ], t.prototype, "itemPrefab", void 0);
a([ b({
type: cc.Prefab,
tooltip: "布局节点"
}) ], t.prototype, "threeLayout", void 0);
a([ b({
type: cc.Prefab,
tooltip: "布局节点"
}) ], t.prototype, "twoLayout", void 0);
a([ b({
type: cc.ScrollView,
tooltip: "滚动节点"
}) ], t.prototype, "scroll", void 0);
a([ b({
type: cc.Label,
tooltip: "剩余挑战次数描述"
}) ], t.prototype, "challengeDescribe", void 0);
return t = a([ m ], t);
}(i.default);
n.default = v;
cc._RF.pop();
}, {
"../../../code/Config/Config": "Config",
"../../../code/Lib/LocalStorage": "LocalStorage",
"../../../code/basecode/BasePanel": "BasePanel",
"../../../code/manager/GuideManager": "GuideManager",
"../../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../../code/manager/PanelManager": "PanelManager",
"../../../code/manager/SDKManager": "SDKManager",
"../../../code/manager/TableManager": "TableManager",
"../../../code/manager/UiAniManager": "UiAniManager",
"../../../code/manager/Umeng_Manager": "Umeng_Manager",
"./SkinItem": "SkinItem"
} ],
SkinTable: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "1eed5ObUbBCcLNf2+mOL1RG", "SkinTable");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e(e) {
this.table = e;
}
e.prototype.getQuantity = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && Number(n.id) == e) return n.quantity;
}
cc.warn("SkinTable: Do not have id " + e);
return "";
};
e.prototype.getId = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && Number(n.quantity) == e) return Number(n.id);
}
cc.warn("SkinTable: Do not have payId " + e);
return "";
};
e.prototype.getSkinId = function(e) {
for (var t = 0; t < this.table.length; t++) {
var n = this.table[t];
if (n && Number(n.id) == e) return n.sourceId;
}
cc.warn("SkinTable: Do not have id " + e);
return "";
};
return e;
}();
n.default = o;
cc._RF.pop();
}, {} ],
SoundManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3bdd8YTXNpNXKiaLz9rYam2", "SoundManager");
var o = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
}, a = this && this.__awaiter || function(e, t, n, o) {
function a(e) {
return e instanceof n ? e : new n(function(t) {
t(e);
});
}
return new (n || (n = Promise))(function(n, i) {
function r(e) {
try {
s(o.next(e));
} catch (e) {
i(e);
}
}
function l(e) {
try {
s(o.throw(e));
} catch (e) {
i(e);
}
}
function s(e) {
e.done ? n(e.value) : a(e.value).then(r, l);
}
s((o = o.apply(e, t || [])).next());
});
}, i = this && this.__generator || function(e, t) {
var n, o, a, i, r = {
label: 0,
sent: function() {
if (1 & a[0]) throw a[1];
return a[1];
},
trys: [],
ops: []
};
return i = {
next: l(0),
throw: l(1),
return: l(2)
}, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
return this;
}), i;
function l(e) {
return function(t) {
return s([ e, t ]);
};
}
function s(i) {
if (n) throw new TypeError("Generator is already executing.");
for (;r; ) try {
if (n = 1, o && (a = 2 & i[0] ? o.return : i[0] ? o.throw || ((a = o.return) && a.call(o), 
0) : o.next) && !(a = a.call(o, i[1])).done) return a;
(o = 0, a) && (i = [ 2 & i[0], a.value ]);
switch (i[0]) {
case 0:
case 1:
a = i;
break;

case 4:
r.label++;
return {
value: i[1],
done: !1
};

case 5:
r.label++;
o = i[1];
i = [ 0 ];
continue;

case 7:
i = r.ops.pop();
r.trys.pop();
continue;

default:
if (!(a = r.trys, a = a.length > 0 && a[a.length - 1]) && (6 === i[0] || 2 === i[0])) {
r = 0;
continue;
}
if (3 === i[0] && (!a || i[1] > a[0] && i[1] < a[3])) {
r.label = i[1];
break;
}
if (6 === i[0] && r.label < a[1]) {
r.label = a[1];
a = i;
break;
}
if (a && r.label < a[2]) {
r.label = a[2];
r.ops.push(i);
break;
}
a[2] && r.ops.pop();
r.trys.pop();
continue;
}
i = t.call(e, r);
} catch (e) {
i = [ 6, e ];
o = 0;
} finally {
n = a = 0;
}
if (5 & i[0]) throw i[1];
return {
value: i[0] ? i[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("./LoadManager"), l = e("../Lib/LocalStorage"), s = e("../Lib/Global"), c = cc._decorator, u = c.ccclass, d = (c.property, 
function() {
function e() {}
t = e;
e.playBackGroudMusic = function(e, n) {
void 0 === e && (e = null);
void 0 === n && (n = !1);
return a(this, void 0, void 0, function() {
var o, a;
return i(this, function(i) {
switch (i.label) {
case 0:
if (0 == this.soundState || 0 == this.backSoundState) return [ 2 ];
e || (e = this.lastBackGroud);
return this.audioPool[e] ? [ 3, 3 ] : (o = r.default.instance.getRes(this.sourceUrl + e, cc.AudioClip)) ? [ 3, 2 ] : [ 4, r.default.instance.loadRes(this.sourceUrl + e, cc.AudioClip) ];

case 1:
o = i.sent();
i.label = 2;

case 2:
if (!o) return [ 2 ];
this.audioPool[e] = o;
i.label = 3;

case 3:
this.lastBackGroud = e;
a = cc.audioEngine.playMusic(this.audioPool[e], n);
cc.audioEngine.setFinishCallback(a, function() {
var e = s.default.arrRandom(t.bgmArr);
t.playBackGroudMusic(e);
});
this.audioPool[e].soundAudioId = a;
return [ 2 ];
}
});
});
};
e.pauseBackGroudMusic = function() {
cc.audioEngine.pauseMusic();
};
e.resumeBackGround = function() {
0 != this.soundState && 0 != this.backSoundState && cc.audioEngine.resumeMusic();
};
e.stopBackGroudMusic = function() {
cc.audioEngine.stopMusic();
};
e.playSoundEffect = function(e, t) {
void 0 === t && (t = !1);
return a(this, void 0, void 0, function() {
var n, o;
return i(this, function(a) {
switch (a.label) {
case 0:
return 0 == this.soundState || 0 == this.effectSoundState ? [ 2 ] : this.audioPool[e] ? [ 3, 3 ] : (n = r.default.instance.getRes(this.sourceUrl + e, cc.AudioClip)) ? [ 3, 2 ] : [ 4, r.default.instance.loadRes(this.sourceUrl + e, cc.AudioClip) ];

case 1:
n = a.sent();
a.label = 2;

case 2:
if (!n) return [ 2 ];
this.audioPool[e] = n;
a.label = 3;

case 3:
o = cc.audioEngine.playEffect(this.audioPool[e], t);
this.audioPool[e].soundAudioId = o;
return [ 2 ];
}
});
});
};
e.stopSoundEffect = function() {
cc.audioEngine.stopAllEffects();
};
e.setSoundState = function(e) {
1 == this.soundState && 0 == e && cc.audioEngine.stopAll();
this.soundState = e;
l.default.saveItem("soundState", this.soundState.toString());
};
e.setBackSoundState = function(e) {
1 == this.backSoundState && 0 == e && cc.audioEngine.stopMusic();
this.backSoundState = e;
l.default.saveItem("backSoundState", this.backSoundState.toString());
};
e.setEffectSoundState = function(e) {
this.effectSoundState = e;
l.default.saveItem("effectSoundState", this.effectSoundState.toString());
};
e.setvolumeNum = function(e, t) {
void 0 === t && (t = "");
if (t && this.audioPool[t]) cc.audioEngine.setVolume(e, this.audioPool[t].soundAudioId); else {
cc.audioEngine.setMusicVolume(e);
cc.audioEngine.setEffectsVolume(e);
}
};
var t;
e.audioPool = {};
e.soundState = 1;
e.backSoundState = 1;
e.effectSoundState = 1;
e.sourceUrl = "/soundSource/";
e.sourceEnd = ".mp3";
e.bgmArr = [ "BGM_1", "BGM_2", "BGM_3", "BGM_4", "BGM_5", "BGM_6", "BGM_7" ];
e.btnSound = "Button_click";
e.clickModifiedshop = "Click_modifiedshop";
e.clickAircraft = "Click_R&D";
e.clickWorkShop = "Click_workshop";
e.connonToLeft = "Cannon_switch_L";
e.connonToRight = "Cannon_switch_R";
e.upgradeHp = "Cannon_hp_upgrade";
e.upgradeMGun = "Cannon_mgun_upgrade";
e.upgradeSGun = "Cannon_egun_upgrade";
e.upintensify = "qianghuashengji";
e.uiOpen = "UI_open";
e.uiClose = "UI_close";
e.getAircraft = "RD_reward";
e.unlokcAircraft = "RD_unlock";
e.upgradeAircraft = "RD_upgrade1";
e.upgradeWorkShop = [ "RD_upgrade1", "RD_upgrade2", "RD_upgrade3" ];
e.fightReward = "Fight_reward";
e.boom1 = "Explosion_1";
e.boom2 = "Explosion_1";
e.shoot = "Fight_bullet";
e.win = "Fight_win";
e.death = "Death";
e.getCoinEnd = "Get_coins";
e.getCoin = "Fight_get_coins";
e.getDiamod = "Get_gems";
e.getWork = "Fight_get_work";
e.getMagnet = "Fight_get_magnet";
e.getHp = "Fight_get_hp";
e.getAttack = "Fight_get_attack";
e.getRD = "Fight_get_RD";
e.getMissionItem = "Fight_get_item";
e.Fight_again = "Fight_again";
e.Fight_again_1 = "Fight_again_1";
e.lastBackGroud = "";
return e = t = o([ u ], e);
}());
n.default = d;
cc._RF.pop();
}, {
"../Lib/Global": "Global",
"../Lib/LocalStorage": "LocalStorage",
"./LoadManager": "LoadManager"
} ],
SpeciaLaser: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5725cj878xJzLGKxDTVQVOm", "SpeciaLaser");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../code/manager/BallManager"), r = cc._decorator, l = r.ccclass, s = (r.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.atk = 10;
return t;
}
t.prototype.init = function(e) {
this.atk = Math.ceil(e);
};
t.prototype.show = function() {
this.isCollided();
};
t.prototype.isCollided = function() {
var e = i.default.instance.curBallArr;
for (var t in e) {
var n = i.default.instance.curBallArr[t];
n && n.isInit && Math.abs(n.node.y - this.node.y) <= n.radius && n.killlifeNum(this.atk);
}
};
return t = a([ l ], t);
}(cc.Component));
n.default = s;
cc._RF.pop();
}, {
"../../code/manager/BallManager": "BallManager"
} ],
SpeedLowPrefab: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ed11dADFQJMRbN00C+1O9vo", "SpeedLowPrefab");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../code/manager/NodePoolMananger"), r = e("../../code/manager/PanelManager"), l = cc._decorator, s = l.ccclass, c = l.property, u = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.ani = null;
return t;
}
t.prototype.show = function() {
this.scheduleOnce(this.disappear, 3);
};
t.prototype.disappear = function() {
this.disappearNow();
};
t.prototype.disappearNow = function() {
this.unscheduleAllCallbacks();
r.default.game.speedLowMap.delete(this.node.uuid);
this.node.active = !1;
this.node.removeFromParent();
i.default.instance.push(this.node);
};
a([ c(cc.Animation) ], t.prototype, "ani", void 0);
return t = a([ s ], t);
}(cc.Component);
n.default = u;
cc._RF.pop();
}, {
"../../code/manager/NodePoolMananger": "NodePoolMananger",
"../../code/manager/PanelManager": "PanelManager"
} ],
SpriteFrameSet: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "97019Q80jpE2Yfz4zbuCZBq", "SpriteFrameSet");
var o = cc.Class({
name: "SpriteFrameSet",
properties: {
language: "",
spriteFrame: cc.SpriteFrame
}
});
t.exports = o;
cc._RF.pop();
}, {} ],
StringUtils: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0eb20hykQFC+ZOv8IpT44gX", "StringUtils");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e() {}
Object.defineProperty(e, "instance", {
get: function() {
this._instance || (this._instance = new e());
return this._instance;
},
enumerable: !1,
configurable: !0
});
e.prototype.trimSpace = function(e) {
return e.replace(/^\s*(.*?)[\s\n]*$/g, "$1");
};
e.prototype.replace = function(e, t, n) {
void 0 === n && (n = /%d/);
return e.replace(n, t);
};
e.prototype.getStringLength = function(e) {
for (var t = e.split(""), n = 0, o = 0; o < t.length; o++) {
var a = t[o];
this.isChinese(a) ? n += 2 : n += 1;
}
return n;
};
e.prototype.isChinese = function(e) {
return /^.*[\u4E00-\u9FA5]+.*$/.test(e);
};
e.prototype.strToArr = function(e, t) {
void 0 === t && (t = !1);
if (!e) return [];
if (e.length < 1) return [];
var n = (e = ";" == e.charAt(e.length - 1) ? e.substr(0, e.length - 1) : e).split(";");
if (t) return n;
for (var o = n.length, a = 0; a < o; a++) if (n[a].length < 1) {
n.splice(a, 1);
a--;
o = n.length;
} else if (Number(n[a]) < 1) {
n.splice(a, 1);
a--;
o = n.length;
}
return n;
};
e.prototype.strToArr22 = function(e) {
if (!e) return "";
if (e.length < 1) return "";
for (var t = (e = ";" == e.charAt(e.length - 1) ? e.substr(0, e.length - 1) : e).split(";"), n = {}, o = [], a = 0; a < t.length; a++) {
var i = t[a];
n[i] || (n[i] = 0);
n[i]++;
}
for (var r in n) o.push([ r, n[r] ]);
return o;
};
e.prototype.strToArr33 = function(t) {
if (!t) return "";
if (t.length < 1) return "";
t = ";" == t.charAt(t.length - 1) ? t.substr(0, t.length - 1) : t;
for (var n = e.instance.strToArr2(t), o = {}, a = [], i = 0; i < n.length; i++) {
var r = n[i].id;
o[r] ? o[r] += n[i].num : o[r] = n[i].num;
}
for (var l in o) a.push([ l, o[l] ]);
return a;
};
e.prototype.strToArr2 = function(e, t) {
void 0 === t && (t = !1);
if (!e) return [];
for (var n = (e = ";" == e.charAt(e.length - 1) ? e.substr(0, e.length - 1) : e).split(";"), o = [], a = n.length, i = 0; i < a; i++) if (n[i].length > 2) {
var r = n[i].split(":");
if (t) {
l = new Object({
id: Number(r[0]),
num: Number(r[1])
});
o.push(l);
} else if (Number(r[0]) > 0 && Number(r[1]) > 0) {
var l = new Object({
id: Number(r[0]),
num: Number(r[1])
});
o.push(l);
}
}
return o;
};
e.prototype.strToArr3 = function(e) {
if (!e) return [];
for (var t = (e = ";" == e.charAt(e.length - 1) ? e.substr(0, e.length - 1) : e).split(";"), n = [], o = t.length, a = 0; a < o; a++) if (t[a].length > 2) {
var i = t[a].split(":"), r = [ Number(i[0]), Number(i[1]) ];
n.push(r);
}
return n;
};
e.prototype.strToArr4 = function(e) {
if (!e) return [];
for (var t = (e = ";" == e.charAt(e.length - 1) ? e.substr(0, e.length - 1) : e).split(";"), n = [], o = t.length, a = 0; a < o; a++) if (t[a].length > 2) {
var i = t[a].split(":"), r = [ Number(i[0]), Number(i[1]), Number(i[2]) ];
n.push(r);
}
return n;
};
e.prototype.strToArrspecial = function(e) {
if (!e) return [];
for (var t = (e = ";" == e.charAt(e.length - 1) ? e.substr(0, e.length - 1) : e).split(";"), n = [], o = t.length, a = 0; a < o; a++) if (t[a].length > 2) {
for (var i = t[a].split(":"), r = i.length, l = [], s = 0; s < r; s++) l.push(Number(i[s]));
n.push(l);
}
return n;
};
e.prototype.strToArr5 = function(e) {
if (!e) return [];
for (var t = (e = "&" == e.charAt(e.length - 1) ? e.substr(0, e.length - 1) : e).split("&"), n = [], o = t.length, a = 0; a < o; a++) if (t[a].length > 2) {
var i = t[a].split(":"), r = [ Number(i[0]), Number(i[1]) ];
n.push(r);
}
return n;
};
e.prototype.strToArr6 = function(e) {
if (!e) return [];
for (var t = (e = ";" == e.charAt(e.length - 1) ? e.substr(0, e.length - 1) : e).split(";"), n = [], o = t.length, a = 0; a < o; a++) if (t[a].length > 2) {
var i = t[a].split(":"), r = new Object({
rid: Number(i[0]),
num: Number(i[1]),
time: i[2]
});
n.push(r);
}
return n;
};
e.prototype.strToArrWithSymbol = function(e, t, n) {
void 0 === n && (n = ";");
if (!e) return [];
for (var o = (e = e.charAt(e.length - 1) == n ? e.substr(0, e.length - 1) : e).split(n), a = [], i = o.length, r = 0; r < i; r++) if (o[r].length > 2) {
var l = o[r].split(t), s = [ l[0], l[1], l[2] ];
a.push(s);
}
return a;
};
e.prototype.addStr = function(e, t) {
e.length > 0 && (e += ";");
return e += t;
};
e.prototype.arrToString = function(e) {
for (var t = "", n = e.length, o = 0; o < n; o++) {
t += e[o];
o != n - 1 && (t += ";");
}
return t;
};
e.prototype.arrToString2 = function(e) {
for (var t = "", n = e.length, o = 0; o < n; o++) {
t += e[o].id + ":" + e[o].num;
o != n - 1 && (t += ";");
}
return t;
};
e.prototype.arrToString3 = function(e) {
for (var t = "", n = e.length, o = 0; o < n; o++) {
t += e[o][0] + ":" + e[o][1];
o != n - 1 && (t += ";");
}
return t;
};
e.prototype.encodeUTF8 = function(e) {
for (var t = "", n = "", o = 0, a = e.length; o < a; o++) {
t = e.charCodeAt(o).toString(16);
n += "\\u" + new Array(5 - t.length).join("0") + t;
}
return n;
};
e.prototype.decodeUTF8 = function(e) {
return e.replace(/(\\u)(\w{4}|\w{2})/gi, function(e, t, n) {
return String.fromCharCode(parseInt(n, 16));
});
};
e.prototype.idToPassword = function(e) {
return e.substr(0, 4) + e.substr(-4, 4);
};
e.prototype.sortFun = function(e) {
return function(t, n) {
return t[e] - n[e];
};
};
e.prototype.sortFun2 = function(e) {
return function(t, n) {
var o = t[e];
return n[e] - o;
};
};
e._instance = null;
return e;
}();
n.default = o;
cc._RF.pop();
}, {} ],
SubConnon: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "77bf6tHuaZOnaFedCV+rgY3", "SubConnon");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("./ConnonBase"), r = e("../../code/manager/MyRoleDataManager"), l = e("../../code/manager/SoundManager"), s = e("../../code/manager/NodePoolMananger"), c = e("../../code/Lib/Global"), u = e("../../code/manager/TableManager"), d = e("../../code/manager/PanelManager"), p = e("../../code/Lib/LocalStorage"), f = cc._decorator, h = f.ccclass, g = (f.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lessHit = 0;
t.showType = !1;
return t;
}
t.prototype.onLoad = function() {};
t.prototype.setShoot = function() {
var e = Number(p.default.getItem("skillIntensifyLevel")), t = u.default.instance.connonTable.getDataById(this.connonId), n = u.default.instance.cannonGrowUp.getDataById(e), o = u.default.instance.cannonGrowUp.getLine(e);
d.default.game.playerScript.extraGunHit = this.bulletHit = Number(t.m_att) + Number(n.m_att) + Number(n.m_att_b) * (e - 10 * (o - 1));
this.bulletNum = Math.floor(e / 20);
this.bulletNum > 4 && (this.bulletNum = 4);
this.shootTemp = 1 / this.minShootTemp;
this.schedule(this.shoot, this.minShootTemp, cc.macro.REPEAT_FOREVER);
};
t.prototype.shoot = function() {
if (!r.default.instance.checkGameState([ 0, 2, 3, 4 ]) || this.showType) {
this.showType || l.default.playSoundEffect(l.default.shoot);
var e = this.bulletNum;
if (e % 2 == 1) {
var t = 5, n = -5, o = 10 * -Math.floor((e - 1) / 2) + t;
this.setBulletPos(o, 10 * Math.floor((e - 1) / 2) + n, 1);
this.setBulletPos(o, 10 * Math.floor((e - 1) / 2) + n, -1);
for (var a = 1; a < e; a++) {
this.setBulletPos(o + 10 * a, 10 * (Math.floor((e - 1) / 2) - a), 1);
this.setBulletPos(o + 10 * a, 10 * (Math.floor((e - 1) / 2) - a), -1);
}
} else for (t = 13, n = -5, o = 10 * -(Math.floor((e - 1) / 2) + 1) + t, a = 0; a < e; a++) {
this.setBulletPos(o + 10 * a + 5, 10 * (Math.floor((e - 1) / 2) + 1 - a) + n, 1);
this.setBulletPos(o + 10 * a + 5, 10 * (Math.floor((e - 1) / 2) + 1 - a) + n, -1);
}
}
};
t.prototype.setBulletPos = function(e, t, n) {
var o = s.default.instance.pop("bulletPrefab");
o && !o.parent && this.bulletNode.addChild(o);
o.active = !0;
var a = c.default.exactSub(this.bulletHit, Math.floor(this.bulletHit));
this.lessHit = c.default.exactAdd([ this.lessHit, a ]);
if (this.lessHit >= 1) {
o.ECScript.init(this.bulletHit + 1, 0);
this.lessHit = c.default.exactSub(this.lessHit, 1);
} else o.ECScript.init(this.bulletHit, 0);
o.ECScript.setIcon(this.bulletIcon);
o.setPosition(this.node.parent.position.x + e * n + 49 * n, this.node.parent.position.y + 35 + t);
o.ECScript.setSpeed(20, 30 * n);
};
t.prototype.cancelShoot = function() {
this.isInShoot = !1;
this.unschedule(this.shoot);
};
t.prototype.startShoot = function(e) {
if (!this.isInShoot) {
this.isInShoot = !0;
this.bulletIcon = e;
this.setShoot();
this.shoot();
}
};
t.prototype.setConnonIcon = function(e) {
this.connonSprite.spriteFrame = e;
};
return t = a([ h ], t);
}(i.default));
n.default = g;
cc._RF.pop();
}, {
"../../code/Lib/Global": "Global",
"../../code/Lib/LocalStorage": "LocalStorage",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../code/manager/NodePoolMananger": "NodePoolMananger",
"../../code/manager/PanelManager": "PanelManager",
"../../code/manager/SoundManager": "SoundManager",
"../../code/manager/TableManager": "TableManager",
"./ConnonBase": "ConnonBase"
} ],
TableManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "8934fvnGjVC958MZ52uPlbJ", "TableManager");
var o = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = e("../../src/table/ScenceTable"), i = e("../../src/table/ConnonTable"), r = e("../../src/table/BulletTable"), l = e("./LoadManager"), s = e("../../src/table/ShopTable"), c = e("../../src/table/AircraftTable"), u = e("../../src/table/PropTable"), d = e("../../src/table/WorkShopTable"), p = e("../../src/table/MapLevelTable"), f = e("../../src/table/MissionTable"), h = e("../../src/table/GuideTable"), g = e("../../src/table/SkinTable"), y = e("../../src/table/BoxTable"), m = e("../../OffLineTable"), b = e("../../CannonUnlock"), v = e("../../CannonGrowUp"), S = cc._decorator, _ = S.ccclass, P = (S.property, 
function() {
function e() {}
t = e;
Object.defineProperty(e, "instance", {
get: function() {
this._instance || (this._instance = new t());
return this._instance;
},
enumerable: !1,
configurable: !0
});
e.prototype.init = function() {
this.table = l.default.instance.getRes("/json/gamedata", cc.JsonAsset).json;
this.scenceTable = new a.default(this.table.scence);
this.connonTable = new i.default(this.table.connon);
this.bulletTable = new r.default(this.table.bullet, this.table.coin);
this.shopTable = new s.default(this.table.shop);
this.aircraftTable = new c.default(this.table.aircraft);
this.propTable = new u.default(this.table.prop);
this.workShopTable = new d.default(this.table.workshop);
this.mapLevelTable = new p.default(this.table.mapLevel);
this.missionTable = new f.default(this.table.mission);
this.guideTable = new h.default(this.table.guide);
this.skinTable = new g.default(this.table.skin);
this.boxTable = new y.default(this.table.box);
this.OffLineTable = new m.default(this.table.offLine);
this.cannonUnlock = new b.default(this.table.cannonUnlock);
this.cannonGrowUp = new v.default(this.table.cannonGrowUp);
};
var t;
return e = t = o([ _ ], e);
}());
n.default = P;
cc._RF.pop();
}, {
"../../CannonGrowUp": "CannonGrowUp",
"../../CannonUnlock": "CannonUnlock",
"../../OffLineTable": "OffLineTable",
"../../src/table/AircraftTable": "AircraftTable",
"../../src/table/BoxTable": "BoxTable",
"../../src/table/BulletTable": "BulletTable",
"../../src/table/ConnonTable": "ConnonTable",
"../../src/table/GuideTable": "GuideTable",
"../../src/table/MapLevelTable": "MapLevelTable",
"../../src/table/MissionTable": "MissionTable",
"../../src/table/PropTable": "PropTable",
"../../src/table/ScenceTable": "ScenceTable",
"../../src/table/ShopTable": "ShopTable",
"../../src/table/SkinTable": "SkinTable",
"../../src/table/WorkShopTable": "WorkShopTable",
"./LoadManager": "LoadManager"
} ],
TestCicleLiefBar: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "29be2tY+6ROcbirr4sNs1xX", "TestCicleLiefBar");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("./CircleLifeProgressBar"), r = cc._decorator, l = r.ccclass, s = r.property, c = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.progressBar = null;
return t;
}
t.prototype.start = function() {
this.progressBar.setProgress(1);
};
t.prototype.onEnable = function() {};
t.prototype.update = function(e) {
var t = this.progressBar.getProgress();
(t -= .01) <= 0 && (t = 1);
this.progressBar.setProgress(t);
};
a([ s(i.default) ], t.prototype, "progressBar", void 0);
return t = a([ l ], t);
}(cc.Component);
n.default = c;
cc._RF.pop();
}, {
"./CircleLifeProgressBar": "CircleLifeProgressBar"
} ],
Test: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "62e81zaWxpBcaLeknUfAU5e", "Test");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("./code/Lib/LocalStorage"), r = cc._decorator, l = r.ccclass, s = (r.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.start = function() {
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
this.node.on("click", this.addMoney);
};
t.prototype.addMoney = function() {
cc.log("加钱了");
};
t.prototype.onKeyDown = function(e) {
switch (e.keyCode) {
case cc.macro.KEY.a:
i.default.clear();
}
};
return t = a([ l ], t);
}(cc.Component));
n.default = s;
cc._RF.pop();
}, {
"./code/Lib/LocalStorage": "LocalStorage"
} ],
TimeCount: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "7a0dcaROyxKCqw5Ckg0G7W1", "TimeCount");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("./Global"), a = function() {
function e() {
this.pool = {};
}
Object.defineProperty(e, "instance", {
get: function() {
this._instance || (this._instance = new e());
return this._instance;
},
enumerable: !1,
configurable: !0
});
e.prototype.startCount = function(e) {
var t = o.default.getTime();
this.pool[e] = [];
this.pool[e].push([ t ]);
};
e.prototype.pauseCount = function(e) {
if (this.pool[e]) {
var t = o.default.getTime(), n = this.pool[e].pop();
n[1] = t;
this.pool[e].push(n);
} else cc.warn(" TimeCount " + e + "do not start count");
};
e.prototype.resumeCount = function(e) {
this.pool[e] || (this.pool[e] = []);
var t = o.default.getTime();
this.pool[e].push([ t ]);
};
e.prototype.endCount = function(e) {
if (this.pool[e]) {
var t = o.default.getTime(), n = this.pool[e].pop();
n[1] = t;
this.pool[e].push(n);
} else cc.warn(" TimeCount " + e + "do not start count");
};
e.prototype.getTimeCount = function(e, t) {
void 0 === t && (t = !1);
if (!this.pool[e]) {
cc.warn(" TimeCount " + e + "do not start count");
return 0;
}
for (var n = 0, o = this.pool[e], a = o.length, i = 0; i < a; i++) {
var r = o[i];
n += r[1] - r[0];
}
t && delete this.pool[e];
return n;
};
return e;
}();
n.default = a;
cc._RF.pop();
}, {
"./Global": "Global"
} ],
UiAniManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0da39o/K5hHVqOddHeaFep4", "UiAniManager");
var o = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
}, a = this && this.__awaiter || function(e, t, n, o) {
function a(e) {
return e instanceof n ? e : new n(function(t) {
t(e);
});
}
return new (n || (n = Promise))(function(n, i) {
function r(e) {
try {
s(o.next(e));
} catch (e) {
i(e);
}
}
function l(e) {
try {
s(o.throw(e));
} catch (e) {
i(e);
}
}
function s(e) {
e.done ? n(e.value) : a(e.value).then(r, l);
}
s((o = o.apply(e, t || [])).next());
});
}, i = this && this.__generator || function(e, t) {
var n, o, a, i, r = {
label: 0,
sent: function() {
if (1 & a[0]) throw a[1];
return a[1];
},
trys: [],
ops: []
};
return i = {
next: l(0),
throw: l(1),
return: l(2)
}, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
return this;
}), i;
function l(e) {
return function(t) {
return s([ e, t ]);
};
}
function s(i) {
if (n) throw new TypeError("Generator is already executing.");
for (;r; ) try {
if (n = 1, o && (a = 2 & i[0] ? o.return : i[0] ? o.throw || ((a = o.return) && a.call(o), 
0) : o.next) && !(a = a.call(o, i[1])).done) return a;
(o = 0, a) && (i = [ 2 & i[0], a.value ]);
switch (i[0]) {
case 0:
case 1:
a = i;
break;

case 4:
r.label++;
return {
value: i[1],
done: !1
};

case 5:
r.label++;
o = i[1];
i = [ 0 ];
continue;

case 7:
i = r.ops.pop();
r.trys.pop();
continue;

default:
if (!(a = r.trys, a = a.length > 0 && a[a.length - 1]) && (6 === i[0] || 2 === i[0])) {
r = 0;
continue;
}
if (3 === i[0] && (!a || i[1] > a[0] && i[1] < a[3])) {
r.label = i[1];
break;
}
if (6 === i[0] && r.label < a[1]) {
r.label = a[1];
a = i;
break;
}
if (a && r.label < a[2]) {
r.label = a[2];
r.ops.push(i);
break;
}
a[2] && r.ops.pop();
r.trys.pop();
continue;
}
i = t.call(e, r);
} catch (e) {
i = [ 6, e ];
o = 0;
} finally {
n = a = 0;
}
if (5 & i[0]) throw i[1];
return {
value: i[0] ? i[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
n.InOrOut = n.UiAniType = void 0;
var r = e("./LoadManager"), l = cc._decorator, s = l.ccclass, c = (l.property, function() {
function e() {}
e.init = function() {
return a(this, void 0, void 0, function() {
var e, t, n;
return i(this, function(o) {
switch (o.label) {
case 0:
return [ 4, r.default.instance.loadResByUrl(this.sourceUrl, !0) ];

case 1:
e = o.sent();
for (t in e) {
n = e[t];
this.clipPool.set(n.name, n);
}
return [ 2 ];
}
});
});
};
e.getUiClip = function(e) {
var t = this.clipPool.get(e);
t || cc.warn("没有 " + e + " AnimationClip资源");
return t;
};
e.clipPool = new Map();
e.sourceUrl = "UIAniClip/";
return e = o([ s ], e);
}());
n.default = c;
(function(e) {
e.Null = "null";
e.TopToDown = "topToDown";
e.BigToSmall = "bigToSmall";
e.AlphaChange = "alphaChange";
e.AircraftPanel = "aircraftPanel";
e.ShopPanel = "shopPanel";
e.MissionPanel = "missionPanel";
e.RefitShopPanelPanel = "refitShopPanelPanel";
})(n.UiAniType || (n.UiAniType = {}));
(function(e) {
e.OUT = "Out";
e.IN = "In";
})(n.InOrOut || (n.InOrOut = {}));
cc._RF.pop();
}, {
"./LoadManager": "LoadManager"
} ],
Umeng_Manager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d2727vDNvVO24YtjsP3P/bB", "Umeng_Manager");
var o = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
n.Point_EventID = void 0;
var a = e("./SDKManager"), i = cc._decorator, r = i.ccclass, l = (i.property, function() {
function e() {}
t = e;
Object.defineProperty(e, "instance", {
get: function() {
if (!this._instance) {
this._instance = new t();
window.Umeng_Manager = this._instance;
}
return this._instance;
},
enumerable: !1,
configurable: !0
});
e.prototype.putPoint = function(e) {
a.default.instance.callJava("onEvent", "(Ljava/lang/String;)V", e);
};
e.prototype.putPointlevel = function(e, t, n, o, i) {
a.default.instance.callJava("onEventObject", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", e, t.toString(), n.toString(), o.toString(), i.toString());
};
e.prototype.putPoint2 = function(e, t) {
a.default.instance.callJava("onEventValue", "(Ljava/lang/String;Ljava/lang/String;)V", e, t);
};
e.prototype.putPoint_startLevel = function(e) {
a.default.instance.callJava("startLevel", "(Ljava/lang/String;)V", "level_" + e);
};
e.prototype.putPoint_finishLevel = function(e) {
a.default.instance.callJava("finishLevel", "(Ljava/lang/String;)V", "level_" + e);
};
e.prototype.putPoint_failLevel = function(e) {
a.default.instance.callJava("failLevel", "(Ljava/lang/String;)V", "level_" + e);
};
var t;
return e = t = o([ r ], e);
}());
n.default = l;
(function(e) {
e.advert_Click_num = "advert_Click_num";
e.advert_play_num = "advert_play_num";
e.advert_Click_Succ_num = "advert_Click_Succ_num";
e.advert_Click_Fail_num = "advert_Click_Fail_num";
e.skill_Click_num = "skill_Click_num";
e.offlineReward_num = "offlineReward_num";
e.offlineReward_Click_num = "offlineReward_Click_num";
e.workshop_Click_num = "workshop_Click_num";
e.endless_Click_num = "endless_Click_num";
e.endless_fuhuo_Click_num = "endless_fuhuo_Click_num";
e.endless_open_Click_num = "endless_open_Click_num";
e.endlessReward_Click_num = "endlessReward_Click_num";
e.fighting_fuhuo_Click_num = "fighting_fuhuo_Click_num";
e.fightingReward_Click_num = "fightingReward_Click_num";
e.levelComplate_num = "levelComplate_num";
e.ClickButton_aircraftBtn = "ClickButton_aircraftBtn";
e.ClickButton_openBoxBtn = "ClickButton_openBoxBtn";
e.ClickButton_propertBtn = "ClickButton_propertBtn";
e.ClickButton_endlessBtn = "ClickButton_endlessBtn";
e.ClickButton_gameStartBtn = "ClickButton_endlessBtn";
})(n.Point_EventID || (n.Point_EventID = {}));
cc._RF.pop();
}, {
"./SDKManager": "SDKManager"
} ],
VideoPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "dc83cpxNKlE8K+Dpfv7yJfj", "VideoPanel");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../../code/basecode/BasePanel"), r = e("../../../code/manager/UiAniManager"), l = e("../../../code/manager/PanelManager"), s = e("../../../code/Config/Config"), c = e("../../../code/ads/AdsGroupPlatformTool"), u = e("../../../code/manager/SDKManager"), d = cc._decorator, p = d.ccclass, f = d.property, h = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.videoPlayer = null;
t.videoClip = null;
t.closeBtn = null;
t.readyMap = new Map();
t.videoShowComplete = 0;
t._aniType = r.UiAniType.Null;
return t;
}
t.prototype.openPanel = function(e) {
this.adsId = e;
this.node.opacity = 0;
this.videoShowComplete = 0;
this.videoPlayer.node.active = !0;
this.videoPlayer.clip = this.videoClip;
this.readyMap.get(this.videoClip.name) && this.playVideo();
this.playUIAni(r.InOrOut.IN);
this.addEvent();
};
t.prototype.closePanel = function() {
c.default.instance.onAdsClosed(this.adsId + ":" + this.videoShowComplete);
this.node.opacity = 0;
this.playUIAni(r.InOrOut.OUT);
this.dleEvent();
};
t.prototype.panelIn = function() {};
t.prototype.panelOut = function() {
l.default.instance.deleteOpen(s.PanelName.VideoPanel);
this.node.removeFromParent();
};
t.prototype.addEvent = function() {
this.videoPlayer.node.on("ready-to-play", this.playVideo, this);
this.videoPlayer.node.on("completed", this.videoComplete, this);
this.videoPlayer.node.on("clicked", this.videoClick, this);
this.closeBtn.node.on("click", this.closeBtnTap, this);
};
t.prototype.dleEvent = function() {
this.videoPlayer.node.off("ready-to-play", this.playVideo, this);
this.videoPlayer.node.off("completed", this.videoComplete, this);
this.videoPlayer.node.off("clicked", this.videoClick, this);
this.closeBtn.node.off("click", this.closeBtnTap, this);
};
t.prototype.playVideo = function() {
this.node.opacity = 255;
this.readyMap.set(this.videoPlayer.clip.name, !0);
this.videoPlayer.play();
};
t.prototype.videoComplete = function() {
this.videoPlayer.node.active = !1;
this.videoShowComplete = 1;
};
t.prototype.videoClick = function() {
u.default.instance.callJava("launchAppDetailByPackageName", "(Ljava/lang/String;)V", "com.xchange.JumpBallX");
};
t.prototype.closeBtnTap = function() {
l.default.instance.closePanel(s.PanelName.VideoPanel);
};
a([ f({
type: cc.VideoPlayer,
tooltip: "视频组件"
}) ], t.prototype, "videoPlayer", void 0);
a([ f({
type: cc.Asset,
tooltip: "视频资源"
}) ], t.prototype, "videoClip", void 0);
a([ f({
type: cc.Button,
tooltip: "视频资源"
}) ], t.prototype, "closeBtn", void 0);
return t = a([ p ], t);
}(i.default);
n.default = h;
cc._RF.pop();
}, {
"../../../code/Config/Config": "Config",
"../../../code/ads/AdsGroupPlatformTool": "AdsGroupPlatformTool",
"../../../code/basecode/BasePanel": "BasePanel",
"../../../code/manager/PanelManager": "PanelManager",
"../../../code/manager/SDKManager": "SDKManager",
"../../../code/manager/UiAniManager": "UiAniManager"
} ],
WorkItem: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "682aaYFfQpDLJxaQjvpWrfM", "WorkItem");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../../code/manager/MyRoleDataManager"), r = e("../../../code/manager/PanelManager"), l = e("../../../code/Lib/Global"), s = e("../../../code/manager/TableManager"), c = e("../../../code/Config/Config"), u = e("../../../code/manager/SoundManager"), d = e("../LatticeProgress"), p = e("../../../code/manager/SDKManager"), f = e("../../../code/manager/Advert_Manager"), h = cc._decorator, g = h.ccclass, y = h.property, m = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.infoBtn = null;
t.levelUpBtn = null;
t.pro = null;
t.proLable = null;
t.nameLable = null;
t.goldLable = null;
t.unlockLable = null;
t.levelNode = null;
t.unlockNode = null;
t.icon = null;
t.videoUpButton = null;
return t;
}
t.prototype.onLoad = function() {
this.levelUpBtn.node.on("click", this.levelUpTap, this);
this.videoUpButton.node.on("click", this.videoLevelUpTap, this);
this.infoBtn.node.on("click", this.infoBtnTap, this);
this.node.getComponent(cc.Button).node.on("click", this.infoBtnTap, this);
this.levelUpBtn.enableAutoGrayEffect = !0;
};
t.prototype.init = function(e, t, n) {
this.icon.spriteFrame = t;
this.propId = e;
this.obj = n;
this.setLable();
};
t.prototype.setLable = function() {
this.nameLable.string = GlobalFun.i18n.t("lable.10266");
};
t.prototype.updateInfo = function() {
var e = s.default.instance.workShopTable.getInfo(this.propId);
this.level = i.default.instance.getPropLevel(this.propId);
if (i.default.instance.curLevel >= e.unlock) {
this.isUnlock = !0;
this.levelNode.active = !0;
this.unlockNode.active = !1;
} else {
this.isUnlock = !1;
this.levelNode.active = !1;
this.unlockNode.active = !0;
this.unlockLable.string = "Reach level " + e.unlock;
}
this.upgradeMoney = s.default.instance.workShopTable.getCountMoney(this.propId, this.level);
this.goldLable.string = l.default.setNum(this.upgradeMoney);
this.levelUpBtn.enabled = this.level - 1 < e.max_level;
this.proLable.string = this.level - 1 + "/" + e.max_level;
this.pro.getComponent(d.default).pro = this.level - 1;
return this.isUnlock;
};
t.prototype.levelUpTap = function() {
if (i.default.instance.dleCurrency(this.upgradeMoney)) {
p.default.instance.callJava("trackEventWithType", "(Ljava/lang/String;Ljava/lang/String;I)V", "LevelUpProp", this.propId.toString(), 1);
u.default.playSoundEffect(l.default.arrRandom(u.default.upgradeWorkShop));
i.default.instance.propLevelUp(this.obj);
r.default.gameUi.updataGold();
this.updateInfo();
r.default.instance.getExistPanel(c.PanelName.WorkShopPanel).sortItem();
} else r.default.instance.openPanel(c.PanelName.GoShopPanel, r.default.gameUi.middleNode, c.CurrencyType.Gold);
};
t.prototype.videoLevelUpTap = function() {
f.default.instance.show_Ad(f.Adver_Type.ReWardVideo_Adv, function(e) {
u.default.playSoundEffect(l.default.arrRandom(u.default.upgradeWorkShop));
i.default.instance.propLevelUp(this.obj);
r.default.gameUi.updataGold();
this.updateInfo();
r.default.instance.getExistPanel(c.PanelName.WorkShopPanel).sortItem();
}.bind(this));
};
t.prototype.infoBtnTap = function() {
var e = s.default.instance.workShopTable.getDes(this.propId);
r.default.instance.getExistPanel(c.PanelName.WorkShopPanel).updateTalkLable(GlobalFun.i18n.t("lable." + e));
};
a([ y({
type: cc.Button,
tooltip: "问号按钮"
}) ], t.prototype, "infoBtn", void 0);
a([ y({
type: cc.Button,
tooltip: "升级按钮"
}) ], t.prototype, "levelUpBtn", void 0);
a([ y({
type: cc.Node,
tooltip: "升级进度"
}) ], t.prototype, "pro", void 0);
a([ y({
type: cc.Label,
tooltip: "升级进度文本"
}) ], t.prototype, "proLable", void 0);
a([ y({
type: cc.Label,
tooltip: "名字文本"
}) ], t.prototype, "nameLable", void 0);
a([ y({
type: cc.Label,
tooltip: "升级钱文本"
}) ], t.prototype, "goldLable", void 0);
a([ y({
type: cc.Label,
tooltip: "解锁文本"
}) ], t.prototype, "unlockLable", void 0);
a([ y({
type: cc.Node,
tooltip: "升级节点"
}) ], t.prototype, "levelNode", void 0);
a([ y({
type: cc.Node,
tooltip: "未解锁节点"
}) ], t.prototype, "unlockNode", void 0);
a([ y({
type: cc.Sprite,
tooltip: "icon"
}) ], t.prototype, "icon", void 0);
a([ y({
type: cc.Button,
tooltip: "看视频升级按钮"
}) ], t.prototype, "videoUpButton", void 0);
return t = a([ g ], t);
}(cc.Component);
n.default = m;
cc._RF.pop();
}, {
"../../../code/Config/Config": "Config",
"../../../code/Lib/Global": "Global",
"../../../code/manager/Advert_Manager": "Advert_Manager",
"../../../code/manager/MyRoleDataManager": "MyRoleDataManager",
"../../../code/manager/PanelManager": "PanelManager",
"../../../code/manager/SDKManager": "SDKManager",
"../../../code/manager/SoundManager": "SoundManager",
"../../../code/manager/TableManager": "TableManager",
"../LatticeProgress": "LatticeProgress"
} ],
WorkShopPanel: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "1eb15Yby69Mq7eiyc1xXooV", "WorkShopPanel");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../../code/manager/UiAniManager"), r = e("../../../code/manager/PanelManager"), l = e("../../../code/Config/Config"), s = e("../../../code/manager/TableManager"), c = e("../../../code/manager/SoundManager"), u = e("./WorkItem"), d = e("../../../code/manager/NodePoolMananger"), p = e("../../../code/basecode/BasePanel"), f = cc._decorator, h = f.ccclass, g = f.property, y = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.nameLable = null;
t.talkLable = null;
t.okButton = null;
t.workPrefab = null;
t.itemNode = null;
t.scrollNode = null;
t.widgetNode0 = null;
t.widgetNode1 = null;
t.iconAtlas = null;
t.showNode = null;
t.itemArr = [];
t._aniType = i.UiAniType.AircraftPanel;
return t;
}
t.prototype.onLoad = function() {
var e = s.default.instance.workShopTable.tableObj, t = 0;
for (var n in e) if (1 == ++t) {
var o = e[n];
if (o) {
var a = cc.instantiate(this.workPrefab);
a.setScale(1.5, 1.5);
this.itemNode.addChild(a);
a.setPosition(0, -300, 0);
var i = a.getComponent(u.default);
i.init(o.id, this.iconAtlas.getSpriteFrame(o.icon), e);
this.itemArr.push(i);
}
}
};
t.prototype.stepShow = function(e) {
var t = this;
if (e) for (var n = this.itemNode.children.length, o = function(e) {
a.scheduleOnce(function() {
t.itemNode.children[e].active = !0;
e == n - 1 && t.sortItem();
}, .05 * e);
}, a = this, i = 0; i < n; i++) o(i); else {
var r = this.itemNode.children.length;
for (i = 0; i < r; i++) this.itemNode.children[i].active = !1;
}
};
t.prototype.openPanel = function() {
this.addEvent();
this.playUIAni(i.InOrOut.IN);
this.setLable();
this.scrollNode.scrollToOffset(cc.v2(0, 0));
this.sortItem();
};
t.prototype.closePanel = function() {
r.default.gameUi.btnTishi();
this.dleEvent();
this.playUIAni(i.InOrOut.OUT);
c.default.playSoundEffect(c.default.btnSound);
};
t.prototype.panelIn = function() {
this.showNode = d.default.instance.pop(r.default.game.showPrefab.name);
this.widgetNode0.addChild(this.showNode);
this.showNode.getComponent("ShowPrefab").startShow();
};
t.prototype.panelOut = function() {
r.default.instance.deleteOpen(l.PanelName.WorkShopPanel);
this.node.removeFromParent();
this.showNode.getComponent("ShowPrefab").stopShow(1);
this.showNode.removeFromParent();
d.default.instance.push(this.showNode);
};
t.prototype.addEvent = function() {
this.okButton.node.on("click", this.okButtonTap, this);
};
t.prototype.dleEvent = function() {
this.okButton.node.off("click", this.okButtonTap, this);
};
t.prototype.updateTalkLable = function(e) {
this.talkLable.string = e;
};
t.prototype.setLable = function() {
this.nameLable.string = GlobalFun.i18n.t("lable.10097");
this.talkLable.string = GlobalFun.i18n.t("lable.10098");
for (var e = this.itemArr.length, t = 0; t < e; t++) this.itemArr[t].setLable();
};
t.prototype.sortItem = function() {
for (var e = this.itemArr.length, t = 0; t < e; t++) {
var n = this.itemArr[t].updateInfo();
this.itemArr[t].node.zIndex = n ? t : e + 1;
}
};
t.prototype.okButtonTap = function() {
r.default.instance.closePanel(l.PanelName.WorkShopPanel);
};
a([ g({
type: cc.Label,
tooltip: "名字lable"
}) ], t.prototype, "nameLable", void 0);
a([ g({
type: cc.Label,
tooltip: "名字lable"
}) ], t.prototype, "talkLable", void 0);
a([ g({
type: cc.Button,
tooltip: "ok按钮"
}) ], t.prototype, "okButton", void 0);
a([ g({
type: cc.Prefab,
tooltip: "道具预制体"
}) ], t.prototype, "workPrefab", void 0);
a([ g({
type: cc.Node,
tooltip: "item节点"
}) ], t.prototype, "itemNode", void 0);
a([ g({
type: cc.ScrollView,
tooltip: "滑动"
}) ], t.prototype, "scrollNode", void 0);
a([ g({
type: cc.Node,
tooltip: "适配使用"
}) ], t.prototype, "widgetNode0", void 0);
a([ g({
type: cc.Node,
tooltip: "适配使用"
}) ], t.prototype, "widgetNode1", void 0);
a([ g({
type: cc.SpriteAtlas,
tooltip: "icon资源"
}) ], t.prototype, "iconAtlas", void 0);
return t = a([ h ], t);
}(p.default);
n.default = y;
cc._RF.pop();
}, {
"../../../code/Config/Config": "Config",
"../../../code/basecode/BasePanel": "BasePanel",
"../../../code/manager/NodePoolMananger": "NodePoolMananger",
"../../../code/manager/PanelManager": "PanelManager",
"../../../code/manager/SoundManager": "SoundManager",
"../../../code/manager/TableManager": "TableManager",
"../../../code/manager/UiAniManager": "UiAniManager",
"./WorkItem": "WorkItem"
} ],
WorkShopTable: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "c6f41GidOlBuYKbjw6P9p0Z", "WorkShopTable");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../../code/manager/MyRoleDataManager"), a = e("../../code/Lib/Global"), i = function() {
function e(e) {
this.tableObj = {};
for (var t = 0; t < e.length; t++) {
var n = e[t];
n && (this.tableObj[n.id] = n);
}
}
e.prototype.getRandomSpecial = function() {
var e = [];
for (var t in this.tableObj) {
var n = this.tableObj[t];
n && Number(n.unlock) <= o.default.instance.curLevel && 1 == Number(n.type) && e.push(n.id);
}
return a.default.arrRandom(e);
};
e.prototype.getInfo = function(e) {
if (this.tableObj[e]) return this.tableObj[e];
cc.warn("WorkShopTable getInfo: Do not have id " + e);
return "";
};
e.prototype.getName = function(e) {
if (this.tableObj[e]) return this.tableObj[e].name;
cc.warn("WorkShopTable getName: Do not have id " + e);
return "";
};
e.prototype.getDes = function(e) {
if (this.tableObj[e]) return this.tableObj[e].des;
cc.warn("WorkShopTable getDex: Do not have id " + e);
return {};
};
e.prototype.getCountMoney = function(e, t) {
var n = this.tableObj[e];
if (n) return Math.floor(Math.pow(n.money_c, t) * n.money);
cc.warn("WorkShopTable getCountMoney: Do not have id " + e);
return 0;
};
e.prototype.getCount = function(e, t) {
var n = this.tableObj[e];
if (n) return n.basic_number * t / 1e3;
cc.warn("WorkShopTable getCount: Do not have id " + e);
return 0;
};
return e;
}();
n.default = i;
cc._RF.pop();
}, {
"../../code/Lib/Global": "Global",
"../../code/manager/MyRoleDataManager": "MyRoleDataManager"
} ],
colorChange: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "17b21QC6t5Lu6hUBLsGtrqT", "colorChange");
n.__esModule = !0;
n.default = void 0;
var o = function() {};
n.default = o;
o.default_vert = "\n    attribute vec4 a_position;\n    attribute vec2 a_texCoord;\n    attribute vec4 a_color;\n    varying vec2 v_texCoord;\n    varying vec4 v_fragmentColor;\n    void main()\n    {\n        gl_Position = CC_PMatrix * a_position;\n        v_fragmentColor = a_color;\n        v_texCoord = a_texCoord;\n    }\n    ";
o.gray_frag = "\n    #ifdef GL_ES  \nprecision mediump float;  \n#endif  \n  \nvarying vec2 v_texCoord;  \nuniform float u_dH;  \nuniform float u_dS;  \nuniform float u_dL;  \n  \nvoid main() {  \n  \n    vec4 texColor=texture2D(CC_Texture0, v_texCoord);  \n    float r=texColor.r;  \n    float g=texColor.g;  \n    float b=texColor.b;  \n    float a=texColor.a;  \n    //convert rgb to hsl  \n    float h;  \n    float s;  \n    float l;  \n    {  \n        float max=max(max(r,g),b);  \n        float min=min(min(r,g),b);  \n        //----h  \n        if(max==min){  \n  \n            h=0.0;  \n        }else if(max==r&&g>=b){  \n            h=60.0*(g-b)/(max-min)+0.0;  \n        }else if(max==r&&g<b){  \n            h=60.0*(g-b)/(max-min)+360.0;  \n        }else if(max==g){  \n            h=60.0*(b-r)/(max-min)+120.0;  \n        }else if(max==b){  \n            h=60.0*(r-g)/(max-min)+240.0;  \n        }  \n        //----l  \n        l=0.5*(max+min);  \n        //----s  \n        if(l==0.0||max==min){  \n            s=0.0;  \n        }else if(0.0<=l&&l<=0.5){  \n            s=(max-min)/(2.0*l);  \n        }else if(l>0.5){  \n            s=(max-min)/(2.0-2.0*l);  \n        }  \n    }  \n    //(h,s,l)+(dH,dS,dL) -> (h,s,l)  \n    h=h+u_dH;  \n    s=min(1.0,max(0.0,s+u_dS));  \n    l=l+u_dL;  \n    //convert (h,s,l) to rgb and got final color  \n    vec4 finalColor;  \n    {  \n        float q;  \n        if(l<0.5){  \n            q=l*(1.0+s);  \n        }else if(l>=0.5){  \n            q=l+s-l*s;  \n        }  \n        float p=2.0*l-q;  \n        float hk=h/360.0;  \n        float t[3];  \n        t[0]=hk+1.0/3.0;t[1]=hk;t[2]=hk-1.0/3.0;  \n        for(int i=0;i<3;i++){  \n            if(t[i]<0.0)t[i]+=1.0;  \n            if(t[i]>1.0)t[i]-=1.0;  \n        }//got t[i]  \n        float c[3];  \n        for(int i=0;i<3;i++){  \n            if(t[i]<1.0/6.0){  \n                c[i]=p+((q-p)*6.0*t[i]);  \n            }else if(1.0/6.0<=t[i]&&t[i]<0.5){  \n                c[i]=q;  \n            }else if(0.5<=t[i]&&t[i]<2.0/3.0){  \n                c[i]=p+((q-p)*6.0*(2.0/3.0-t[i]));  \n            }else{  \n                c[i]=p;  \n            }  \n        }  \n        finalColor=vec4(c[0],c[1],c[2],a);  \n    }  \n  \n    finalColor+=vec4(u_dL,u_dL,u_dL,0.0);  \n  \n    gl_FragColor=finalColor;  \n  \n}  \n    ";
t.exports = n.default;
cc._RF.pop();
}, {} ],
"polyglot.min": [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e26fd9yy65A4q3/JkpVnFYg", "polyglot.min");
(function(e, o) {
"function" == typeof define && define.amd ? define([], function() {
return o(e);
}) : "object" == typeof n ? t.exports = o(e) : e.Polyglot = o(e);
})(void 0, function(e) {
function t(e) {
e = e || {}, this.phrases = {}, this.extend(e.phrases || {}), this.currentLocale = e.locale || "en", 
this.allowMissing = !!e.allowMissing, this.warn = e.warn || s;
}
function n(e) {
var t, n, o, a = {};
for (t in e) if (e.hasOwnProperty(t)) {
n = e[t];
for (o in n) a[n[o]] = t;
}
return a;
}
function o(e) {
return e.replace(/^\s+|\s+$/g, "");
}
function a(e, t, n) {
var a, i;
return null != n && e ? a = o((i = e.split(u))[r(t, n)] || i[0]) : a = e, a;
}
function i(e) {
var t = n(p);
return t[e] || t.en;
}
function r(e, t) {
return d[i(e)](t);
}
function l(e, t) {
for (var n in t) "_" !== n && t.hasOwnProperty(n) && (e = e.replace(new RegExp("%\\{" + n + "\\}", "g"), t[n]));
return e;
}
function s(t) {
e.console && e.console.warn && e.console.warn("WARNING: " + t);
}
function c(e) {
var t = {};
for (var n in e) t[n] = e[n];
return t;
}
t.VERSION = "0.4.3", t.prototype.locale = function(e) {
return e && (this.currentLocale = e), this.currentLocale;
}, t.prototype.extend = function(e, t) {
var n;
for (var o in e) e.hasOwnProperty(o) && (n = e[o], t && (o = t + "." + o), "object" == typeof n ? this.extend(n, o) : this.phrases[o] = n);
}, t.prototype.clear = function() {
this.phrases = {};
}, t.prototype.replace = function(e) {
this.clear(), this.extend(e);
}, t.prototype.t = function(e, t) {
var n, o;
return "number" == typeof (t = null == t ? {} : t) && (t = {
smart_count: t
}), "string" == typeof this.phrases[e] ? n = this.phrases[e] : "string" == typeof t._ ? n = t._ : this.allowMissing ? n = e : (this.warn('Missing translation for key: "' + e + '"'), 
o = e), "string" == typeof n && (t = c(t), o = l(o = a(n, this.currentLocale, t.smart_count), t)), 
o;
}, t.prototype.has = function(e) {
return e in this.phrases;
};
var u = "||||", d = {
chinese: function(e) {
return 0;
},
german: function(e) {
return 1 !== e ? 1 : 0;
},
french: function(e) {
return e > 1 ? 1 : 0;
},
russian: function(e) {
return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
},
czech: function(e) {
return 1 === e ? 0 : e >= 2 && e <= 4 ? 1 : 2;
},
polish: function(e) {
return 1 === e ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
},
icelandic: function(e) {
return e % 10 != 1 || e % 100 == 11 ? 1 : 0;
}
}, p = {
chinese: [ "fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh" ],
german: [ "da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv" ],
french: [ "fr", "tl", "pt-br" ],
russian: [ "hr", "ru" ],
czech: [ "cs" ],
polish: [ "pl" ],
icelandic: [ "is" ]
};
return t;
});
cc._RF.pop();
}, {} ],
prefab90014: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0e47eIAYtxN55luQEDpjoGH", "prefab90014");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = cc._decorator, r = i.ccclass, l = i.property, s = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.ani = null;
return t;
}
t.prototype.start = function() {
this.ani.playAdditive("90014_1clip");
this.ani.playAdditive("90014clip");
};
a([ l(cc.Animation) ], t.prototype, "ani", void 0);
return t = a([ r ], t);
}(cc.Component);
n.default = s;
cc._RF.pop();
}, {} ],
tishi: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "8f3d3qodl9LR4u9U5rLZBm6", "tishi");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), a = this && this.__decorate || function(e, t, n, o) {
var a, i = arguments.length, r = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (a = e[l]) && (r = (i < 3 ? a(r) : i > 3 ? a(t, n, r) : a(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = cc._decorator, r = i.ccclass, l = i.property, s = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.bool = !1;
t.tishi = null;
return t;
}
t.prototype.onEnable = function() {
null != this.tishi && (this.tishi.active = !0);
this.schedule(this.callBack, .8);
};
t.prototype.onDisable = function() {
null != this.tishi && (this.tishi.active = !1);
this.unschedule(this.callBack);
};
t.prototype.callBack = function() {
this.bool ? cc.tween(this.node).to(.8, {
scale: 1
}).start() : cc.tween(this.node).to(.8, {
scale: 1.2
}).start();
this.bool = !this.bool;
};
a([ l(cc.Node) ], t.prototype, "tishi", void 0);
return t = a([ r ], t);
}(cc.Component);
n.default = s;
cc._RF.pop();
}, {} ],
"use_v2.0.x_cc.Toggle_event": [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e5cb37H2NpLlK+PfvCBrKfG", "use_v2.0.x_cc.Toggle_event");
cc.Toggle && (cc.Toggle._triggerEventInScript_check = !0);
cc._RF.pop();
}, {} ]
}, {}, [ "CircleLifeProgressBar", "TestCicleLiefBar", "BuffHint", "BuffManager", "CannonGrowUp", "CannonUnlock", "EndlessManagement", "IsHaveUnlock", "LookAdvertising", "OffLineSkill", "OffLineTable", "OfflineEarnings", "Test", "Config", "ColorMaterial", "DateUtils", "Global", "GlobalFun", "LocalStorage", "QuadTree", "Secret", "ShaderUtils", "ShaderUtils1", "StringUtils", "TimeCount", "colorChange", "AdsGroupController", "AdsGroupPlatformTool", "AdsQueue", "AdsSetAndScene", "AdsUnit", "BasePanel", "CheckBox", "EasyGetCompleteClass", "MyLable", "Advert_Manager", "BallManager", "BoxManager", "EffectManager", "GuideManager", "HttpManager", "LoadManager", "MissionManger", "MyRoleDataManager", "NodePoolMananger", "PanelManager", "SDKManager", "SoundManager", "TableManager", "UiAniManager", "Umeng_Manager", "Lancher", "Connon", "ConnonBase", "FunnelConnon", "Game", "GameUI", "SubConnon", "BallPrefab", "BoxPrefab", "BulletBase", "BulletBoom", "BulletFollow", "BulletJiGuangQieGe", "BulletLaser", "BulletLaserCut", "BulletPrefab", "BulletThrough", "CoinPrefab", "FlyRewardPrefab", "PropPrefab", "ShowPrefab", "SpeciaLaser", "SpeedLowPrefab", "prefab90014", "AircraftTable", "BoxTable", "BulletTable", "ConnonTable", "GuideTable", "MapLevelTable", "MissionTable", "PropTable", "ScenceTable", "ShopTable", "SkinTable", "WorkShopTable", "AircraftItem", "AircraftPanel", "BoxOpenPanel", "CompletePanel", "EndlessCompletePanel", "CompleteRewardPanel", "FiveStarPanel", "FreeConnonItem", "GoShopPanel", "GuidePanel", "LatticeProgress", "ListView", "BossLevelBtn", "MapItemPrefab", "MapPanel", "NormalLevelBtn", "MissionItem", "MissionPanel", "RewardItem", "PausePanel", "RefitItem", "RefitShopPanel", "ResurgenceUi", "SetPanel", "GiftItem", "ShopItem", "ShopPanel", "SkinItem", "SkinPanel", "VideoPanel", "WorkItem", "WorkShopPanel", "tishi", "use_v2.0.x_cc.Toggle_event", "LanguageData", "LocalizedLabel", "LocalizedSprite", "SpriteFrameSet", "polyglot.min" ]);