window.__require = function e(n, i, t) {
function o(r, d) {
if (!i[r]) {
if (!n[r]) {
var l = r.split("/");
l = l[l.length - 1];
if (!n[l]) {
var c = "function" == typeof __require && __require;
if (!d && c) return c(l, !0);
if (a) return a(l, !0);
throw new Error("Cannot find module '" + r + "'");
}
r = l;
}
var s = i[r] = {
exports: {}
};
n[r][0].call(s.exports, function(e) {
return o(n[r][1][e] || e);
}, s, s.exports, e, n, i, t);
}
return i[r].exports;
}
for (var a = "function" == typeof __require && __require, r = 0; r < t.length; r++) o(t[r]);
return o;
}({
languageText: [ function(e, n, i) {
"use strict";
cc._RF.push(n, "a5aaeP4ECVGNL25gVXLyvrv", "languageText");
window.i18n || (window.i18n = {});
window.i18n.languages || (window.i18n.languages = {});
window.i18n.languages.languageText = [ {
id: "10000",
cn: "简体中文",
tw: "繁體中文",
en: "English",
de: "Deutsch",
it: "Italiano",
fr: "Français",
ja: "日本語",
ko: "한국어"
}, {
id: "10001",
cn: "语言",
tw: "語言",
en: "language",
de: "Sprache",
it: "Lingua",
fr: "Langue",
ja: "言語",
ko: "언어"
}, {
id: "10002",
cn: "点击屏幕开始游戏",
tw: "點擊螢幕開始遊戲",
en: "Swipe to SHOOT",
de: "Wischen zum SCHIEßEN",
it: "Scorri per SPARARE",
fr: "Balayez pour TIRER",
ja: "スワイプしてシュート",
ko: "슬라이딩 샷"
}, {
id: "10003",
cn: "每小时1钻石",
tw: "每小時1鑽石",
en: "1 Gems /h",
de: "1 Diam. pro Std.",
it: "1 diamante all'ora",
fr: "1 diamant par heure",
ja: "1時間ごとに1ダイヤ",
ko: "1다이아/시간"
}, {
id: "10004",
cn: "剩余时间：",
tw: "剩餘時間：",
en: "Remaining time:",
de: "Restzeit:",
it: "Tempo rimanente:",
fr: "Temps restant:",
ja: "殘り時間:",
ko: "남은시간:"
}, {
id: "10005",
cn: "时",
tw: "時",
en: "h",
de: "Std.",
it: "Ore",
fr: "Heure(s)",
ja: "時",
ko: "시간"
}, {
id: "10006",
cn: "分",
tw: "分",
en: "m",
de: "Min.",
it: "Min",
fr: "Minute(s)",
ja: "分",
ko: "분"
}, {
id: "10007",
cn: "秒",
tw: "秒",
en: "s",
de: "Sek.",
it: "Sec",
fr: "Seconde(s)",
ja: "秒",
ko: "초"
}, {
id: "10008",
cn: "设置",
tw: "設置",
en: "SETTING",
de: "Einstellungen",
it: "Imposta",
fr: "Réglages",
ja: "設定",
ko: "설정"
}, {
id: "10009",
cn: "OK",
tw: "OK",
en: "OK",
de: "OK",
it: "OK",
fr: "Ok",
ja: "OK",
ko: "OK"
}, {
id: "10010",
cn: "观看",
tw: "觀看",
en: "More",
de: "Ansehen",
it: "Guarda",
fr: "Observer",
ja: "見る",
ko: "관전"
}, {
id: "10011",
cn: "解锁: 关卡1",
tw: "解鎖: 關卡1",
en: "Unlock: Level 1",
de: "Freischalten: Level 1",
it: "Sblocca: Livello 1",
fr: "Débloquer: Niveau 1",
ja: "開放: ステージ 1",
ko: "언락: 스테이지1"
}, {
id: "10012",
cn: "解锁: 关卡20",
tw: "解鎖: 關卡20",
en: "Unlock: Level 20",
de: "Freischalten: Level 20",
it: "Sblocca: Livello 20",
fr: "Débloquer: Niveau 20",
ja: "開放: ステージ 20",
ko: "언락: 스테이지20"
}, {
id: "10013",
cn: "解锁: 关卡40",
tw: "解鎖: 關卡40",
en: "Unlock: Level 40",
de: "Freischalten: Level 40",
it: "Sblocca: Livello 40",
fr: "Débloquer: Niveau 40",
ja: "開放: ステージ 40",
ko: "언락: 스테이지40"
}, {
id: "10014",
cn: "解锁: 关卡60",
tw: "解鎖: 關卡60",
en: "Unlock: Level 60",
de: "Freischalten: Level 60",
it: "Sblocca: Livello 60",
fr: "Débloquer: Niveau 60",
ja: "開放: ステージ 60",
ko: "언락: 스테이지60"
}, {
id: "10015",
cn: "解锁: 关卡80",
tw: "解鎖: 關卡80",
en: "Unlock: Level 80",
de: "Freischalten: Level 80",
it: "Sblocca: Livello 80",
fr: "Débloquer: Niveau 80",
ja: "開放: ステージ 80",
ko: "언락: 스테이지80"
}, {
id: "10016",
cn: "解锁: 关卡100",
tw: "解鎖: 關卡100",
en: "Unlock: Level 100",
de: "Freischalten: Level 100",
it: "Sblocca: Livello 100",
fr: "Débloquer: Niveau 100",
ja: "開放: ステージ 100",
ko: "언락: 스테이지100"
}, {
id: "10017",
cn: "解锁: 关卡120",
tw: "解鎖: 關卡120",
en: "Unlock: Level 120",
de: "Freischalten: Level 120",
it: "Sblocca: Livello 120",
fr: "Débloquer: Niveau 120",
ja: "開放: ステージ 120",
ko: "언락: 스테이지120"
}, {
id: "10018",
cn: "解锁: 关卡140",
tw: "解鎖: 關卡140",
en: "Unlock: Level 140",
de: "Freischalten: Level 140",
it: "Sblocca: Livello 140",
fr: "Débloquer: Niveau 140",
ja: "開放: ステージ 140",
ko: "언락: 스테이지140"
}, {
id: "10019",
cn: "解锁: 关卡160",
tw: "解鎖: 關卡160",
en: "Unlock: Level 160",
de: "Freischalten: Level 160",
it: "Sblocca: Livello 160",
fr: "Débloquer: Niveau 160",
ja: "開放: ステージ 160",
ko: "언락: 스테이지160"
}, {
id: "10020",
cn: "解锁: 关卡180",
tw: "解鎖: 關卡180",
en: "Unlock: Level 180",
de: "Freischalten: Level 180",
it: "Sblocca: Livello 180",
fr: "Débloquer: Niveau 180",
ja: "開放: ステージ 180",
ko: "언락: 스테이지180"
}, {
id: "10021",
cn: "解锁: 关卡200",
tw: "解鎖: 關卡200",
en: "Unlock: Level 200",
de: "Freischalten: Level 200",
it: "Sblocca: Livello 200",
fr: "Débloquer: Niveau 200",
ja: "開放: ステージ 200",
ko: "언락: 스테이지200"
}, {
id: "10022",
cn: "解锁: 关卡220",
tw: "解鎖: 關卡220",
en: "Unlock: Level 220",
de: "Freischalten: Level 220",
it: "Sblocca: Livello 220",
fr: "Débloquer: Niveau 220",
ja: "開放: ステージ 220",
ko: "언락: 스테이지220"
}, {
id: "10023",
cn: "解锁: 关卡240",
tw: "解鎖: 關卡240",
en: "Unlock: Level 240",
de: "Freischalten: Level 240",
it: "Sblocca: Livello 240",
fr: "Débloquer: Niveau 240",
ja: "開放: ステージ 240",
ko: "언락: 스테이지240"
}, {
id: "10024",
cn: "解锁: 关卡260",
tw: "解鎖: 關卡260",
en: "Unlock: Level 260",
de: "Freischalten: Level 260",
it: "Sblocca: Livello 260",
fr: "Débloquer: Niveau 260",
ja: "開放: ステージ 260",
ko: "언락: 스테이지260"
}, {
id: "10025",
cn: "解锁: 关卡280",
tw: "解鎖: 關卡280",
en: "Unlock: Level 280",
de: "Freischalten: Level 280",
it: "Sblocca: Livello 280",
fr: "Débloquer: Niveau 280",
ja: "開放: ステージ 280",
ko: "언락: 스테이지280"
}, {
id: "10026",
cn: "解锁: 关卡300",
tw: "解鎖: 關卡300",
en: "Unlock: Level 300",
de: "Freischalten: Level 300",
it: "Sblocca: Livello 300",
fr: "Débloquer: Niveau 300",
ja: "開放: ステージ 300",
ko: "언락: 스테이지300"
}, {
id: "10027",
cn: "解锁: 关卡320",
tw: "解鎖: 關卡320",
en: "Unlock: Level 320",
de: "Freischalten: Level 320",
it: "Sblocca: Livello 320",
fr: "Débloquer: Niveau 320",
ja: "開放: ステージ 320",
ko: "언락: 스테이지320"
}, {
id: "10028",
cn: "解锁: 关卡340",
tw: "解鎖: 關卡340",
en: "Unlock: Level 340",
de: "Freischalten: Level 340",
it: "Sblocca: Livello 340",
fr: "Débloquer: Niveau 340",
ja: "開放: ステージ 340",
ko: "언락: 스테이지340"
}, {
id: "10029",
cn: "解锁: 关卡360",
tw: "解鎖: 關卡360",
en: "Unlock: Level 360",
de: "Freischalten: Level 360",
it: "Sblocca: Livello 360",
fr: "Débloquer: Niveau 360",
ja: "開放: ステージ 360",
ko: "언락: 스테이지360"
}, {
id: "10030",
cn: "解锁: 关卡380",
tw: "解鎖: 關卡380",
en: "Unlock: Level 380",
de: "Freischalten: Level 380",
it: "Sblocca: Livello 380",
fr: "Débloquer: Niveau 380",
ja: "開放: ステージ 380",
ko: "언락: 스테이지380"
}, {
id: "10031",
cn: "解锁: 关卡400",
tw: "解鎖: 關卡400",
en: "Unlock: Level 400",
de: "Freischalten: Level 400",
it: "Sblocca: Livello 400",
fr: "Débloquer: Niveau 400",
ja: "開放: ステージ 400",
ko: "언락: 스테이지400"
}, {
id: "10032",
cn: "解锁: 关卡420",
tw: "解鎖: 關卡420",
en: "Unlock: Level 420",
de: "Freischalten: Level 420",
it: "Sblocca: Livello 420",
fr: "Débloquer: Niveau 420",
ja: "開放: ステージ 420",
ko: "언락: 스테이지420"
}, {
id: "10033",
cn: "解锁: 关卡440",
tw: "解鎖: 關卡440",
en: "Unlock: Level 440",
de: "Freischalten: Level 440",
it: "Sblocca: Livello 440",
fr: "Débloquer: Niveau 440",
ja: "開放: ステージ 440",
ko: "언락: 스테이지440"
}, {
id: "10034",
cn: "解锁: 关卡460",
tw: "解鎖: 關卡460",
en: "Unlock: Level 460",
de: "Freischalten: Level 460",
it: "Sblocca: Livello 460",
fr: "Débloquer: Niveau 460",
ja: "開放: ステージ 460",
ko: "언락: 스테이지460"
}, {
id: "10035",
cn: "解锁: 关卡480",
tw: "解鎖: 關卡480",
en: "Unlock: Level 480",
de: "Freischalten: Level 480",
it: "Sblocca: Livello 480",
fr: "Débloquer: Niveau 480",
ja: "開放: ステージ 480",
ko: "언락: 스테이지480"
}, {
id: "10036",
cn: "解锁: 关卡500",
tw: "解鎖: 關卡500",
en: "Unlock: Level 500",
de: "Freischalten: Level 500",
it: "Sblocca: Livello 500",
fr: "Débloquer: Niveau 500",
ja: "開放: ステージ 500",
ko: "언락: 스테이지500"
}, {
id: "10037",
cn: "解锁: 关卡520",
tw: "解鎖: 關卡520",
en: "Unlock: Level 520",
de: "Freischalten: Level 520",
it: "Sblocca: Livello 520",
fr: "Débloquer: Niveau 520",
ja: "開放: ステージ 520",
ko: "언락: 스테이지520"
}, {
id: "10038",
cn: "解锁: 关卡540",
tw: "解鎖: 關卡540",
en: "Unlock: Level 540",
de: "Freischalten: Level 540",
it: "Sblocca: Livello 540",
fr: "Débloquer: Niveau 540",
ja: "開放: ステージ 540",
ko: "언락: 스테이지540"
}, {
id: "10039",
cn: "解锁: 关卡560",
tw: "解鎖: 關卡560",
en: "Unlock: Level 560",
de: "Freischalten: Level 560",
it: "Sblocca: Livello 560",
fr: "Débloquer: Niveau 560",
ja: "開放: ステージ 560",
ko: "언락: 스테이지560"
}, {
id: "10040",
cn: "解锁: 关卡580",
tw: "解鎖: 關卡580",
en: "Unlock: Level 580",
de: "Freischalten: Level 580",
it: "Sblocca: Livello 580",
fr: "Débloquer: Niveau 580",
ja: "開放: ステージ 580",
ko: "언락: 스테이지580"
}, {
id: "10041",
cn: "通关奖励：",
tw: "通關獎勵：",
en: "Rewards:",
de: "Bonus:",
it: "indennità:",
fr: "Bonus:",
ja: "ボーナス:",
ko: "보너스:"
}, {
id: "10042",
cn: "改装店",
tw: "改裝店",
en: "MODIFIED SHOP",
de: "Rekonstruktionsladen",
it: "Negozio Modifiche",
fr: "Boutique de modif",
ja: "モディファイショップ",
ko: "개장상점"
}, {
id: "10043",
cn: "嘿，伙计！想要换个更大点儿的吗？",
tw: "嘿，夥計！想要換個更大點兒的嗎？",
en: "Hello! Do you want a bigger one?",
de: "Hey, Kumpel! Willst du etwas Größeres?",
it: "Ehi, amico! Vuoi cambiarla con una più grande?",
fr: "Hey, mon pote ! Tu voudrais pas quelque chose d'un peu plus gros ?",
ja: "ヘイ！パワーアップしたい？",
ko: "하, 여보게!"
}, {
id: "10044",
cn: "风暴",
tw: "風暴",
en: "Storm",
de: "Hurrikan",
it: "Temporale",
fr: "Tempête",
ja: "ストーム",
ko: "윈드스톰"
}, {
id: "10045",
cn: "班吉",
tw: "班基",
en: "Benji",
de: "Bangui",
it: "Bangui",
fr: "Bangui",
ja: "ベンジ",
ko: "방기 "
}, {
id: "10046",
cn: "战神",
tw: "戰神",
en: "Ares",
de: "Kriegsgott",
it: "Dio della Guerra",
fr: "Dieu de la guerre",
ja: "アレス",
ko: "워로드"
}, {
id: "10047",
cn: "眼镜蛇",
tw: "眼鏡蛇",
en: "Cobra",
de: "Kobra",
it: "Cobra",
fr: "Cobra",
ja: "コブラ",
ko: "코브라"
}, {
id: "10048",
cn: "先锋",
tw: "先鋒",
en: "Pioneer",
de: "Vorhut",
it: "Pioniere",
fr: "Pionnier",
ja: "パイオニア",
ko: "파이오니어"
}, {
id: "10049",
cn: "暴熊",
tw: "暴熊",
en: "Bear",
de: "Brummbär",
it: "Orso Feroce",
fr: "Ours coléreux",
ja: "クマ",
ko: "그럼피베어"
}, {
id: "10050",
cn: "跃动",
tw: "躍動",
en: "Movement",
de: "Vibration",
it: "Salta",
fr: "Tressaut",
ja: "ムーブメント",
ko: "바운스"
}, {
id: "10051",
cn: "绿魔鬼",
tw: "綠魔鬼",
en: "Green Devils",
de: "Grüner Kobold",
it: "Mostro Verde",
fr: "Bouffon vert",
ja: "グリーンデビル",
ko: "그린 데빌"
}, {
id: "10052",
cn: "战戟",
tw: "戰戟",
en: "Battle Spear",
de: "Hellebarde",
it: "Alabarda",
fr: "Hallebarde de guerre",
ja: "バトルスピアーズ",
ko: "할베르트"
}, {
id: "10053",
cn: "追击者",
tw: "追擊者",
en: "Chaser",
de: "Verfolger",
it: "Cacciatore",
fr: "Chasseur",
ja: "チェイサー",
ko: "체이서"
}, {
id: "10054",
cn: "光耀-Ⅸ",
tw: "光耀-Ⅸ",
en: "Glorious-ⅸ",
de: "Leuchtfeuer IX",
it: "Luce Brillante-Ⅸ",
fr: "Glorieux - IX",
ja: "グロォーリィアス-Ⅸ",
ko: "브릴리언스-Ⅸ"
}, {
id: "10055",
cn: "暗刃",
tw: "暗刃",
en: "Dark Edge",
de: "Dunkelklinge",
it: "Lama Oscura",
fr: "Lame de l'ombre",
ja: "ダークエッジ",
ko: "다크에지"
}, {
id: "10056",
cn: "大黄蜂",
tw: "大黃蜂",
en: "Bumblebee",
de: "Hummel",
it: "Bombo",
fr: "Bumblebee",
ja: "バンブルビー",
ko: "범블비"
}, {
id: "10057",
cn: "鲨齿",
tw: "鯊齒",
en: "Shark tooth",
de: "Haifischzahn",
it: "Dente di Squalo",
fr: "Dents de la mer",
ja: "サメの歯",
ko: "샤크투스"
}, {
id: "10058",
cn: "霸王",
tw: "霸王",
en: "Overlord",
de: "Overlord",
it: "Signore Supremo",
fr: "Despote",
ja: "オーバーロード",
ko: "파이터"
}, {
id: "10059",
cn: "幽灵",
tw: "幽靈",
en: "Shost",
de: "Ghost",
it: "fantasma",
fr: "Fantôme",
ja: "ゴースト",
ko: "고스트"
}, {
id: "10060",
cn: "开拓者",
tw: "開拓者",
en: "Pioneer",
de: "Wegbereiter",
it: "pioniere",
fr: "Pionnier",
ja: "トレイルブレーズ",
ko: "선구자"
}, {
id: "10061",
cn: "音速",
tw: "音速",
en: "Sonic speed",
de: "Schallgeschwindigkeit",
it: "Velocità sonora",
fr: "Vitesse sonique",
ja: "音速",
ko: "음속"
}, {
id: "10062",
cn: "战斧",
tw: "戰斧",
en: "Battle axe",
de: "Kampfaxt",
it: "Ascia da battaglia",
fr: "Hache de combat",
ja: "バトルアックス",
ko: "전투 도끼"
}, {
id: "10063",
cn: "巨魔",
tw: "巨魔",
en: "Troll",
de: "Troll",
it: "Troll",
fr: "Troll",
ja: "トロール",
ko: "트롤"
}, {
id: "10064",
cn: "后续炮21",
tw: "後續炮21",
en: "later21",
de: "later21",
it: "later21",
fr: "later21",
ja: "later21",
ko: "later21"
}, {
id: "10065",
cn: "后续炮22",
tw: "後續炮22",
en: "later22",
de: "later22",
it: "later22",
fr: "later22",
ja: "later22",
ko: "later22"
}, {
id: "10066",
cn: "后续炮23",
tw: "後續炮23",
en: "later23",
de: "later23",
it: "later23",
fr: "later23",
ja: "later23",
ko: "later23"
}, {
id: "10067",
cn: "后续炮24",
tw: "後續炮24",
en: "later24",
de: "later24",
it: "later24",
fr: "later24",
ja: "later24",
ko: "later24"
}, {
id: "10068",
cn: "后续炮25",
tw: "後續炮25",
en: "later25",
de: "later25",
it: "later25",
fr: "later25",
ja: "later25",
ko: "later25"
}, {
id: "10069",
cn: "后续炮26",
tw: "後續炮26",
en: "later26",
de: "later26",
it: "later26",
fr: "later26",
ja: "later26",
ko: "later26"
}, {
id: "10070",
cn: "后续炮27",
tw: "後續炮27",
en: "later27",
de: "later27",
it: "later27",
fr: "later27",
ja: "later27",
ko: "later27"
}, {
id: "10071",
cn: "后续炮28",
tw: "後續炮28",
en: "later28",
de: "later28",
it: "later28",
fr: "later28",
ja: "later28",
ko: "later28"
}, {
id: "10072",
cn: "后续炮29",
tw: "後續炮29",
en: "later29",
de: "later29",
it: "later29",
fr: "later29",
ja: "later29",
ko: "later29"
}, {
id: "10073",
cn: "后续炮30",
tw: "後續炮30",
en: "later30",
de: "later30",
it: "later30",
fr: "later30",
ja: "later30",
ko: "later30"
}, {
id: "10074",
cn: "护甲",
tw: "護甲",
en: "Armor",
de: "Rüstung",
it: "Armatura",
fr: "Armure",
ja: "アーマー",
ko: "아머"
}, {
id: "10075",
cn: "机枪",
tw: "機槍",
en: "Machine Gun",
de: "Maschinengewehr",
it: "Mitraglia",
fr: "Mitrailleuse",
ja: "マシンガン",
ko: "머신건"
}, {
id: "10076",
cn: "额外枪支",
tw: "額外槍支",
en: "Extra Guns",
de: "Weitere Waffen",
it: "Pistola Extra",
fr: "Arme à feu supplémentaire",
ja: "エキストラガン",
ko: "추가 총기"
}, {
id: "10077",
cn: "使用这个炮会给你：",
tw: "使用這個炮會給你：",
en: "This Cannon will give you:",
de: "Mit dieser Kanone erhältst du:",
it: "A te l'uso di questo cannone:",
fr: "Utiliser ce canon vous procurera:",
ja: "このキャノンを使い、以下のものをもらえる:",
ko: "이 포를 사용 시:"
}, {
id: "10078",
cn: "更多的硬币",
tw: "更多的硬幣",
en: "More Coins",
de: "Mehr Münzen",
it: "Più Monete",
fr: "Plus de pièces",
ja: "より多くのコイン",
ko: "더 많은 코인 획득 가능"
}, {
id: "10079",
cn: "更强大的火力",
tw: "更強大的火力",
en: "Stronger Firepower",
de: "noch mehr Feuerkraft",
it: "Potenza di Fuoco più Forte",
fr: "Plus de puissance de feu",
ja: "より強力な火力",
ko: "더 강한 화력 회득 가능"
}, {
id: "10080",
cn: "新的敌人",
tw: "新的敵人",
en: "New Enemies",
de: "Neue Feinde",
it: "Nuovo Nemico",
fr: "Nouvel ennemi",
ja: "新たな敵",
ko: "새로운 적"
}, {
id: "10081",
cn: "飞行器研发",
tw: "飛行器研發",
en: "AIRCRAFT R&D",
de: "Flugkörperentwicklung",
it: "Sviluppo Aeromobile",
fr: "Développement de drone",
ja: "無人機開発",
ko: "무인기 개발"
}, {
id: "10082",
cn: "给我钻石!\n    我给你打造最好的飞行器！",
tw: "給我鑽石!\n    我給你打造最好的飛行器！",
en: "Give me the chips,\n    I'll give you the latest gear!",
de: "Gib mir Chips! Dann baue ich dir den besten Flugkörper!",
it: "Dammi il microchip! Costruirò per te il migliore Aeromobile!",
fr: "Donne-moi la puce ! Je te construirai le meilleur drone qui soit !",
ja: "チップ頂戴！最高のギアを作ってあげる!",
ko: "칩을 줘!"
}, {
id: "10083",
cn: "无人机宝箱",
tw: "無人機寶箱",
en: "Drone Box",
de: "Drohnentruhe",
it: "Scrigno del Drone",
fr: "Coffre de drone",
ja: "無人機の寶箱",
ko: "무인기 상자"
}, {
id: "10084",
cn: "包含下列随机物品，无人机、导弹、激光、火箭等等！",
tw: "包含下列隨機物品，無人機、導彈、鐳射、火箭等等！",
en: "Contains a random selection of Drones, Missiles, lasers, rockets and more.",
de: "Enthält die folgenden zufälligen Gegenstände, Drohnen, Lenkflugkörper, Laser, Raketen etc.",
it: "Contiene i seguenti oggetti, droni, missili, laser, razzi, ecc.",
fr: "Contient aléatoirement les objets suivants : drone, missile, laser, roquette, etc.",
ja: "無人機、ミサイル、レーザー、ロケットなどのランダムアイテムが含まれている.",
ko: "무인기, 미사일, 레이저, 로켓 등 아이템 랜덤 포함."
}, {
id: "10085",
cn: "寻标火箭",
tw: "尋標火箭",
en: "Homing Rocket",
de: "Lenkrakete",
it: "Razzo Inseguitore",
fr: "Roquette à tête chercheuse",
ja: "ホーミングロケット",
ko: "타겟팅 로켓"
}, {
id: "10086",
cn: "机关枪",
tw: "機關槍",
en: "Machine Gun",
de: "Maschinenkanone",
it: "Mitragliatrice",
fr: "Mitrailleuse",
ja: "マシンガン",
ko: "머신건"
}, {
id: "10087",
cn: "导弹发射器",
tw: "導彈發射器",
en: "Missile Launcher",
de: "Flugkörperstartvorrichtung",
it: "Lanciamissili",
fr: "Lance-missiles",
ja: "ミサイルランチャー",
ko: "미사일 발사장치"
}, {
id: "10088",
cn: "电浆炮",
tw: "電漿炮",
en: "Plasma Cannon",
de: "Plasmakanone",
it: "Cannone al Plasma",
fr: "Canon à plasma",
ja: "プラズマキャノン",
ko: "프라즈마캐논"
}, {
id: "10089",
cn: "激光切割机",
tw: "鐳射切割機",
en: "Laser Cutting",
de: "Laserschneider",
it: "Macchina Taglio Laser",
fr: "Découpeur laser",
ja: "レーザー切斷機",
ko: "레이저 커팅기"
}, {
id: "10090",
cn: "强力护盾",
tw: "強力護盾",
en: "Power Shield",
de: "Starkes Schild",
it: "Scudo Potente",
fr: "Bouclier haute résistance",
ja: "パワーシールド",
ko: "강력쉴드"
}, {
id: "10091",
cn: "追踪弱小敌人！",
tw: "追蹤弱小敵人！",
en: "Heat seeking propelled rockets.",
de: "Schwache Feinde verfolgen.",
it: "Insegue i Deboli Nemici.",
fr: "Poursuit les ennemis faibles.",
ja: "弱い敵を追跡する.",
ko: "약한 적 추적."
}, {
id: "10092",
cn: "连续发射穿甲子弹！",
tw: "連續發射穿甲子彈！",
en: "Continuous firing of armour-piercing bullets.",
de: "Schießt rüstungsdurchbohrende Kugeln nacheinander ab.",
it: "Raffica di Proiettili Perforanti.",
fr: "Tire des balles perforantes en continu.",
ja: "徹甲弾を連射する.",
ko: "파갑탄 연속 발사."
}, {
id: "10093",
cn: "发射110mm爆裂弹！",
tw: "發射110mm爆裂彈！",
en: "Launch 110mm bursting bomb.",
de: "Schießt 110mm Explosionsbomben ab.",
it: "Lancio Bomba 110mm.",
fr: "Tire des obus à fragmentation de 110mm.",
ja: "110mバースト爆弾を打つ.",
ko: "110mm폭렬탄 발사."
}, {
id: "10094",
cn: "聚焦电浆融化敌人！",
tw: "聚焦電漿融化敵人！",
en: "Focused plasma melts enemies.",
de: "Sammelt Plasma, um Feinde zu schmelzen.",
it: "Concentrazione Plasma per Sciogliere il Nemico.",
fr: "Concentre le plasma pour faire fondre les ennemis.",
ja: "プラズマを集め、敵を溶かす.",
ko: "프라즈마로 적을 융해."
}, {
id: "10095",
cn: "多个高频率能量激光！",
tw: "多個高頻率能量鐳射！",
en: "Multiple high-frequency energy lasers.",
de: "Verschafft dir einen Hochfrequenzlaser.",
it: "Laser Multipli ad Alta Frequenza.",
fr: "Plusieurs lasers à haute fréquence.",
ja: "複數の高周波エネルギーレーザー.",
ko: "멀티 고주파 에너지 레이저."
}, {
id: "10096",
cn: "能量护罩阻挡一定伤害！",
tw: "能量護罩阻擋一定傷害！",
en: "Energy weave blocks damage.",
de: "Das Energieschild blockiert einen gewissen Schaden.",
it: "Scudo Energetico che Blocca Determinati Danni.",
fr: "Le bouclier énergétique bloque une certaine quantité de dégâts.",
ja: "エネルギーシールドで一部のダメージをブロックする.",
ko: "에너지 보호막으로 일정 데미지 막기 가능."
}, {
id: "10097",
cn: "工作室",
tw: "工作室",
en: "WORK SHOP",
de: "Werkstatt",
it: "Studio",
fr: "Salle de travail",
ja: "ワークショップ",
ko: "작업실"
}, {
id: "10098",
cn: "很高兴见到你！\n     有什么可以帮您的？",
tw: "很高興見到你！\n     有什麼可以幫您的？",
en: "Hello! I am happy to see you.\n      How may I help you?",
de: "Schön, dich kennenzulernen! Wie kann ich dir helfen?",
it: "Che piacere incontrarti! C'è qualcosa che posso fare per te?",
fr: "Ravi de vous voir ! Que puis-je faire pour vous ?",
ja: "お會いできてうれしいです。何かお手伝いすることがありますか？",
ko: "안녕! 무슨 도움이 필요해?"
}, {
id: "10099",
cn: "暴风雨",
tw: "暴風雨",
en: "Tempest",
de: "Hurrikan",
it: "Tempesta",
fr: "Orage",
ja: "ストーム",
ko: "폭풍우"
}, {
id: "10100",
cn: "激光切割",
tw: "鐳射切割",
en: "Laser Cutting",
de: "Laserstrahl",
it: "Taglio Laser",
fr: "Découpe laser",
ja: "レーザー切斷機",
ko: "레이저 커팅"
}, {
id: "10101",
cn: "火力全开",
tw: "火力全開",
en: "Full Fire",
de: "Feuer frei",
it: "Piena Potenza di Fuoco",
fr: "Plein feu",
ja: "火力全開",
ko: "오픈 파이어"
}, {
id: "10102",
cn: "吸铁",
tw: "吸鐵",
en: "Magnetic Field",
de: "Magnet",
it: "Magnete",
fr: "Attraction magnétique",
ja: "マグネット",
ko: "자철"
}, {
id: "10103",
cn: "医疗包",
tw: "醫療包",
en: "Health Pack",
de: "Verbandskasten",
it: "Pacchetto Medico",
fr: "Trousse de soin",
ja: "醫療パック",
ko: "구급상자"
}, {
id: "10104",
cn: "伤害加成",
tw: "傷害加成",
en: "Damage Boost",
de: "Schadensbonus",
it: "Bonus Danni",
fr: "Ajout de dégâts",
ja: "追加ダメージ",
ko: "데미지 보너스"
}, {
id: "10105",
cn: "硬币加成",
tw: "硬幣加成",
en: "Coin Boost",
de: "Münzenbonus",
it: "Bonus Monete",
fr: "Ajout de pièces",
ja: "追加コイン",
ko: "코인 보너스"
}, {
id: "10106",
cn: "每等级可获得10%的额外火力！",
tw: "每等級可獲得10%的額外火力！",
en: "10% extra firepower per grade.",
de: "Auf jedem Lv. ist 10% zzgl. Feuerkraft erhältlich",
it: "A ogni livello si può ottenere il 10% extra della Potenza di Fuoco",
fr: "À chaque niveau obtention possible de 10% de puissance de feu additionnelle",
ja: "グレードごとに10％の追加火力を獲得できる",
ko: "레벨당 10%의 추가 화력 획득 가능"
}, {
id: "10107",
cn: "每等级可获得15%的额外火力！",
tw: "每等級可獲得15%的額外火力！",
en: "15% extra firepower per grade.",
de: "Auf jedem Lv. ist 15% zzgl. Feuerkraft erhältlich",
it: "A ogni livello si può ottenere il 15% extra della Potenza di Fuoco",
fr: "À chaque niveau obtention possible de 15% de puissance de feu additionnelle",
ja: "グレードごとに15％の追加火力を獲得できる",
ko: "레벨당 15%의 추가 화력 획득 가능"
}, {
id: "10108",
cn: "每等级可获得5%的额外火力！",
tw: "每等級可獲得5%的額外火力！",
en: "5% extra firepower per grade.",
de: "Auf jedem Lv. ist 5% zzgl. Feuerkraft erhältlich",
it: "A ogni livello si può ottenere il 5% extra della Potenza di Fuoco",
fr: "À chaque niveau obtention possible de 5% de puissance de feu additionnelle",
ja: "グレードごとに5％の追加火力を獲得できる",
ko: "레벨당 5%의 추가 화력 획득 가능"
}, {
id: "10109",
cn: "磁铁时间更加持久！",
tw: "磁鐵時間更加持久！",
en: "More durable Magnets.",
de: "Verlängert die Magnetzeit.",
it: "Durata del Magnete più lunga.",
fr: "L'aimant est plus durable.",
ja: "吸著時間が長くなる.",
ko: "자석시간이 오래 지속."
}, {
id: "10110",
cn: "提升医疗包恢复效果！",
tw: "提升醫療包恢復效果！",
en: "Improve the effect of repairing your Cannon.",
de: "Erhöht den Heileffekt des Verbandskasten.",
it: "Aggiorna pacchetto medico effetto riabilitazione.",
fr: "Augmente l'effet de récupération de la trousse de soin.",
ja: "回復効果をアップする.",
ko: "구급상자 회복 속도 향상."
}, {
id: "10111",
cn: "提升伤害加成时间！",
tw: "提升傷害加成時間！",
en: "Boost firepower to last longer.",
de: "Erhöht die Schadenszusatz-Dauer.",
it: "Aggiorna tempo bonus danni.",
fr: "Augmente la durée de l'ajout de dégâts.",
ja: "追加ダメージの時間を長くする.",
ko: "데미지 보너스 시간 향상."
}, {
id: "10112",
cn: "每等级可获得10%的额外硬币！",
tw: "每等級可獲得10%的額外硬幣！",
en: "Earn etra 10% coins per grade.",
de: "Auf jedem Lv. sind 10% zzgl. Münzen erhältlich.",
it: "A ogni livello si può ottenere il 10% extra di Monete.",
fr: "À chaque niveau obtention possible de 10% de pièces additionnelles.",
ja: "グレードごとに10％の追加コインを獲得できる.",
ko: "레벨당 10%의 추가 코인 획득 가능."
}, {
id: "10113",
cn: "任务",
tw: "任務",
en: "JOBS",
de: "Mission",
it: "Incarico",
fr: "Mission",
ja: "ミッション",
ko: "퀘스트"
}, {
id: "10114",
cn: "该死的！你有看到我修理时用的螺丝钉吗？",
tw: "該死的！你有看到我修理時用的螺絲釘嗎？",
en: "Oh, shit! Did you see the screw I used to fix it?",
de: "Verdammt! Hast du die Schrauben gesehen, die ich beim Reparieren benutzt habe?",
it: "Dannazione! Hai visto le viti che usavo durante la riparazione?",
fr: "Bordel ! T'as pas vu les vis que j'utilise lors de la réparation ?",
ja: "ったく！修理の時に使われたボルトを見たかい？",
ko: "악! 자네 나의 수리용 나사못을 못 봤어?"
}, {
id: "10115",
cn: "收集%d个螺丝钉",
tw: "收集%d個螺絲釘",
en: "Help me find those screws, I will give you unexpected benefits.",
de: "Hilf mir, die Schrauben zu finden! Ich werde mich dafür erkenntlich erweisen.",
it: "Aiutami a trovare quelle viti, ti darò benefici che non ti aspetti.",
fr: "Aide-moi à retrouver ces vis et je te donnerai des avatanges que tu n'imagines même pas.",
ja: "そのボルトを見つけてもらったら、思い掛けない褒美を與えるよ",
ko: "날 도와 그 나사못들을 찾아주면 수고비를 푸짐하게 마련해 주지."
}, {
id: "10116",
cn: "我希望在阴暗的工作室里有更多的灯光光！",
tw: "我希望在陰暗的工作室裡有更多的燈光光！",
en: "I want more light in the dark Studio.",
de: "Ich wünsche mir mehr Licht in der Werkstatt.",
it: "Spero che ci sia più luce in quello studio scuro.",
fr: "J'aimerai bien qu'il y ait un peu plus de lumière dans cette salle de travail sombre.",
ja: "暗いワークショップの中に燈りがあるように願っている",
ko: "어두운 작업실에 더 많은 불빛이 있어야 해."
}, {
id: "10117",
cn: "收集%d个发光二极管",
tw: "收集%d個發光二極體",
en: "With these lamps, I feel the work more enjoyable.",
de: "Ich brauche Lichter, um meine Arbeit zu genießen.",
it: "Mi piace lavorare con una buona illuminazione.",
fr: "Moi, j'aime travailler avec de la lumière.",
ja: "燈りが輝いている！これこそが最高の仕事ぶりだ！",
ko: "불빛이 환해야 내가 선호하는 작업방식이거든."
}, {
id: "10118",
cn: "你有多守时，就能有多优秀！",
tw: "你有多守時，就能有多優秀！",
en: "Punctual! is a good habit.",
de: "Deine Pünktlichkeit sagt viel über deine Leistung aus.",
it: "Sei proprio puntuale, eccellente.",
fr: "Plus tu es ponctuel, meilleur tu es.",
ja: "どれだけ時間を守るのは、どれだけ優秀であるということだ。",
ko: "너 시간을 얼마나 준수하면 그만큼 우수하다는거야."
}, {
id: "10119",
cn: "收集%d个手表",
tw: "收集%d個手錶",
en: "This is a classic pocket watch, don't break it.",
de: "Das ist eine erlesene Taschenuhr, mach' sie ja nicht kaputt!",
it: "Questo è un classico orologio da taschino, non romperlo.",
fr: "Ça c'est une montre de gousset classique, ne va pas me la casser hein !",
ja: "これはクラシック版の懐中時計だ、壊すなよ",
ko: "이건 클래식 회중시계로 망가뜨리면 안돼."
}, {
id: "10120",
cn: "电池可不能乱扔，会污染环境的！",
tw: "電池可不能亂扔，會污染環境的！",
en: "Batteries can not be thrown, will pollute the environment.",
de: "Schmeiß' Batterien nicht einfach in den Müll. Das geht gegen die Umwelt!",
it: "Non si può gettare la batteria, inquinerà l'ambiente.",
fr: "Il ne faut pas jeter les batteries n'importe comment, ça pollue !",
ja: "バッテリーを舍ててはいけない、環境污染になる",
ko: "배터리는 환경을 오염시키니 함부로 내버리지 말고."
}, {
id: "10121",
cn: "收集%d个电池",
tw: "收集%d個電池",
en: "Together to protect the environment, do not throw the battery pollution environment.",
de: "Wir müssen unsere Umwelt schützen und dürfen unsere Batterien nicht einfach wegschmeißen.",
it: "Proteggiamo l'ambiente insieme, non inquinarlo gettando la batteria.",
fr: "C'est à nous de protéger l'environnement, il ne faut pas le polluer en jetant les batteries n'importe où !",
ja: "共に環境を守ろう、バッテリーを舍て環境を污染してはいけない",
ko: "환경보호를 위해 배터리를 함부로 내버리지 말아."
}, {
id: "10122",
cn: "嘿，伙计！周末我们去喝一杯这么样？",
tw: "嘿，夥計！週末我們去喝一杯這麼樣？",
en: "Hello! Let's go for a drink this weekend.",
de: "Hey, Kumpel! Wollen wir am Wochenende etwas trinken gehen?",
it: "Ehi, amico! Che ne dici di berci un drink il fine settimana?",
fr: "Hey, mon pote ! Ça te dit d'aller boire un coup ce week-end ?",
ja: "ヘイ！週末一杯どうですか？",
ko: "여보게!"
}, {
id: "10123",
cn: "收集%d个啤酒盖",
tw: "收集%d個啤酒蓋",
en: "Beer, Music and fun games, what could be happier than that?",
de: "Bier, Musik und gute Spiele. Was gibt's Besseres als das?",
it: "Birra, musica e giochi divertenti, cosa può esserci di più bello!?",
fr: "De la bibine, de la musique et des jeux marrants, que pourrait-il y avoir de mieux hein ?",
ja: "ビール、ミュージック,面白いゲーム、これ以上楽しいものはない！",
ko: "맥주, 음악과 재미있는 게임, 이보다 더 즐거운게 뭐가 있어."
}, {
id: "10124",
cn: "尝尝我亲手做的饼干吧！别拒绝哟！",
tw: "嘗嘗我親手做的餅乾吧！別拒絕喲！",
en: "Try the biscuits I made myself. Please don't refuse.",
de: "Probier' meine hausgemachten Kekse! Sag ja nicht nein!",
it: "Assaggia i biscotti che ho fatto io! Non rifiutare.",
fr: "Goûte voir les biscuits que j'ai fait ! Et ne me dis pas non.",
ja: "手作りのクッキーを食べてみて、斷らないでね！",
ko: "내가 직접 만든 과자 맛 좀 봐! 거절하지 말고."
}, {
id: "10125",
cn: "收集%d个椒盐脆饼",
tw: "收集%d個椒鹽脆餅",
en: "How do you feel, crispy cakes with salt and pepper flavor.",
de: "Pfefferkekse, hast du bestimmt noch nie gehabt!",
it: "Frollini sale e pepe, di sicuro non li hai mai mangiati.",
fr: "Des sablés salés et poivrés, t'en as jamais mangé, n'est ce pas ?",
ja: "塩と山椒風味のショートブレッド、絶対食べたことないでしょ",
ko: "산초 맛 패스트리, 너 못 먹어봤지?"
}, {
id: "10126",
cn: "1",
tw: "1",
en: "1",
de: "1",
it: "1",
fr: "1",
ja: "1",
ko: "1"
}, {
id: "10127",
cn: "2",
tw: "2",
en: "2",
de: "2",
it: "2",
fr: "2",
ja: "2",
ko: "2"
}, {
id: "10128",
cn: "3",
tw: "3",
en: "3",
de: "3",
it: "3",
fr: "3",
ja: "3",
ko: "3"
}, {
id: "10129",
cn: "4",
tw: "4",
en: "4",
de: "4",
it: "4",
fr: "4",
ja: "4",
ko: "4"
}, {
id: "10130",
cn: "5",
tw: "5",
en: "5",
de: "5",
it: "5",
fr: "5",
ja: "5",
ko: "5"
}, {
id: "10131",
cn: "6",
tw: "6",
en: "6",
de: "6",
it: "6",
fr: "6",
ja: "6",
ko: "6"
}, {
id: "10132",
cn: "7",
tw: "7",
en: "7",
de: "7",
it: "7",
fr: "7",
ja: "7",
ko: "7"
}, {
id: "10133",
cn: "8",
tw: "8",
en: "8",
de: "8",
it: "8",
fr: "8",
ja: "8",
ko: "8"
}, {
id: "10134",
cn: "9",
tw: "9",
en: "9",
de: "9",
it: "9",
fr: "9",
ja: "9",
ko: "9"
}, {
id: "10135",
cn: "10",
tw: "10",
en: "10",
de: "10",
it: "10",
fr: "10",
ja: "10",
ko: "10"
}, {
id: "10136",
cn: "11",
tw: "11",
en: "11",
de: "11",
it: "11",
fr: "11",
ja: "11",
ko: "11"
}, {
id: "10137",
cn: "12",
tw: "12",
en: "12",
de: "12",
it: "12",
fr: "12",
ja: "12",
ko: "12"
}, {
id: "10138",
cn: "13",
tw: "13",
en: "13",
de: "13",
it: "13",
fr: "13",
ja: "13",
ko: "13"
}, {
id: "10139",
cn: "14",
tw: "14",
en: "14",
de: "14",
it: "14",
fr: "14",
ja: "14",
ko: "14"
}, {
id: "10140",
cn: "15",
tw: "15",
en: "15",
de: "15",
it: "15",
fr: "15",
ja: "15",
ko: "15"
}, {
id: "10141",
cn: "16",
tw: "16",
en: "16",
de: "16",
it: "16",
fr: "16",
ja: "16",
ko: "16"
}, {
id: "10142",
cn: "17",
tw: "17",
en: "17",
de: "17",
it: "17",
fr: "17",
ja: "17",
ko: "17"
}, {
id: "10143",
cn: "18",
tw: "18",
en: "18",
de: "18",
it: "18",
fr: "18",
ja: "18",
ko: "18"
}, {
id: "10144",
cn: "19",
tw: "19",
en: "19",
de: "19",
it: "19",
fr: "19",
ja: "19",
ko: "19"
}, {
id: "10145",
cn: "20",
tw: "20",
en: "20",
de: "20",
it: "20",
fr: "20",
ja: "20",
ko: "20"
}, {
id: "10146",
cn: "清除计划Ⅰ",
tw: "清除計畫Ⅰ",
en: "CarnageⅠ",
de: "RäumungsplanⅠ",
it: "Piano di SgomberoⅠ",
fr: "Effacer le planⅠ",
ja: "プランをキャンセルⅠ",
ko: "정리계획Ⅰ"
}, {
id: "10147",
cn: "清除计划Ⅱ",
tw: "清除計畫Ⅱ",
en: "CarnageⅡ",
de: "RäumungsplanⅡ",
it: "Piano di SgomberoⅡ",
fr: "Effacer le planⅡ",
ja: "プランをキャンセルⅡ",
ko: "정리계획Ⅱ"
}, {
id: "10148",
cn: "清除计划Ⅲ",
tw: "清除計畫Ⅲ",
en: "CarnageⅢ",
de: "RäumungsplanⅢ",
it: "Piano di SgomberoⅢ",
fr: "Effacer le planⅢ",
ja: "プランをキャンセルⅢ",
ko: "정리계획Ⅲ"
}, {
id: "10149",
cn: "清除计划Ⅳ",
tw: "清除計畫Ⅳ",
en: "CarnageⅣ",
de: "RäumungsplanⅣ",
it: "Piano di SgomberoⅣ",
fr: "Effacer le planⅣ",
ja: "プランをキャンセルⅣ",
ko: "정리계획Ⅳ"
}, {
id: "10150",
cn: "清除计划Ⅴ",
tw: "清除計畫Ⅴ",
en: "CarnageⅤ",
de: "RäumungsplanⅤ",
it: "Piano di SgomberoⅤ",
fr: "Effacer le planⅤ",
ja: "プランをキャンセルⅤ",
ko: "정리계획Ⅴ"
}, {
id: "10151",
cn: "在一局游戏中打爆%d个球。",
tw: "在一局遊戲中打爆%d個球。",
en: "Destroy 200 balls in one Round.",
de: "In einer Runde %d Kugeln abgeschossen",
it: "Tira %d plline in una partita",
fr: "Faites exploser %d ballons en une partie",
ja: "1ターン內に玉を%d個打ち破る",
ko: "한판 게임 중 볼 %d개 파괴"
}, {
id: "10152",
cn: "射击大师Ⅰ",
tw: "射擊大師Ⅰ",
en: "Shoot MasterⅠ",
de: "SchusskönigⅠ",
it: "Maestro di TiroⅠ",
fr: "Pro du tirⅠ",
ja: "シューティングマスターⅠ",
ko: "슈트 마스터Ⅰ"
}, {
id: "10153",
cn: "射击大师Ⅱ",
tw: "射擊大師Ⅱ",
en: "Shoot MasterⅡ",
de: "SchusskönigⅡ",
it: "Maestro di TiroⅡ",
fr: "Pro du tirⅡ",
ja: "シューティングマスターⅡ",
ko: "슈트 마스터Ⅱ"
}, {
id: "10154",
cn: "射击大师Ⅲ",
tw: "射擊大師Ⅲ",
en: "Shoot MasterⅢ",
de: "SchusskönigⅢ",
it: "Maestro di TiroⅢ",
fr: "Pro du tirⅢ",
ja: "シューティングマスターⅢ",
ko: "슈트 마스터Ⅲ"
}, {
id: "10155",
cn: "射击大师Ⅳ",
tw: "射擊大師Ⅳ",
en: "Shoot MasterⅣ",
de: "SchusskönigⅣ",
it: "Maestro di TiroⅣ",
fr: "Pro du tirⅣ",
ja: "シューティングマスターⅣ",
ko: "슈트 마스터Ⅳ"
}, {
id: "10156",
cn: "射击大师Ⅴ",
tw: "射擊大師Ⅴ",
en: "Shoot MasterⅤ",
de: "SchusskönigⅤ",
it: "Maestro di TiroⅤ",
fr: "Pro du tirⅤ",
ja: "シューティングマスターⅤ",
ko: "슈트 마스터Ⅴ"
}, {
id: "10157",
cn: "在一局内获得%d分。",
tw: "在一局內獲得%d分。",
en: "Get %d points in one Round",
de: "In einer Runde %d Punkte erhalten",
it: "%d punti in una partita",
fr: "Obtenez %d points en une partie",
ja: "1ターン內にポイントを%d點獲得する",
ko: "한판 게임 중 %d점 획득"
}, {
id: "10158",
cn: "胆大妄为Ⅰ",
tw: "膽大妄為Ⅰ",
en: "DaredevilⅠ",
de: "DraufgängerⅠ",
it: "TemerarioⅠ",
fr: "Casse-couⅠ",
ja: "怖いもの知らずⅠ",
ko: "발칙Ⅰ"
}, {
id: "10159",
cn: "胆大妄为Ⅱ",
tw: "膽大妄為Ⅱ",
en: "DaredevilⅡ",
de: "DraufgängerⅡ",
it: "TemerarioⅡ",
fr: "Casse-couⅡ",
ja: "怖いもの知らずⅡ",
ko: "발칙Ⅱ"
}, {
id: "10160",
cn: "生命低于一半时，打爆%d个球。",
tw: "生命低於一半時，打爆%d個球。",
en: "Destroy 30 balls while below half health in one Round.",
de: "Mit weniger als 50% HP %d Kugeln abgeschossen",
it: "Quando l'energia è sotto la metà, tira %d palline",
fr: "Faites exploser %d ballons quand votre vie est sous 50%",
ja: "ライフが半分以下になる時、玉を%d個打ち破る",
ko: "HP가 절반 미만 시 볼 %d개 파괴"
}, {
id: "10161",
cn: "永不言弃Ⅰ",
tw: "永不言棄Ⅰ",
en: "Keep AliveⅠ",
de: "Niemals aufgebenⅠ",
it: "Non mollare maiⅠ",
fr: "N'abandonne jamaisⅠ",
ja: "絶対諦めずⅠ",
ko: "네버 기브 업Ⅰ"
}, {
id: "10162",
cn: "永不言弃Ⅱ",
tw: "永不言棄Ⅱ",
en: "Keep AliveⅡ",
de: "Niemals aufgebenⅡ",
it: "Non mollare maiⅡ",
fr: "N'abandonne jamaisⅡ",
ja: "絶対諦めずⅡ",
ko: "네버 기브 업Ⅱ"
}, {
id: "10163",
cn: "永不言弃Ⅲ",
tw: "永不言棄Ⅲ",
en: "Keep AliveⅢ",
de: "Niemals aufgebenⅢ",
it: "Non mollare maiⅢ",
fr: "N'abandonne jamaisⅢ",
ja: "絶対諦めずⅢ",
ko: "네버 기브 업Ⅲ"
}, {
id: "10164",
cn: "在一局内坚持%d秒。",
tw: "在一局內堅持%d秒。",
en: "%d seconds to live in one Round.",
de: "In einer Runde %d Sek. Durchgehalten",
it: "Dura per %d secondi in una partita",
fr: "Tenez bon %d secondes au cours d'une partie",
ja: "1ターン內に%d秒維持する",
ko: "한판 게임 중 %d초 견지"
}, {
id: "10165",
cn: "浴火重生Ⅰ",
tw: "浴火重生Ⅰ",
en: "PhoenixⅠ",
de: "Von den Toten auferstehenⅠ",
it: "Rinascita dalle CeneriⅠ",
fr: "Renaissance dans un bain de feuⅠ",
ja: "火を浴びて再生するⅠ",
ko: "본 오브 파이어Ⅰ"
}, {
id: "10166",
cn: "浴火重生Ⅱ",
tw: "浴火重生Ⅱ",
en: "PhoenixⅡ",
de: "Von den Toten auferstehenⅡ",
it: "Rinascita dalle CeneriⅡ",
fr: "Renaissance dans un bain de feuⅡ",
ja: "火を浴びて再生するⅡ",
ko: "본 오브 파이어Ⅱ"
}, {
id: "10167",
cn: "浴火重生Ⅲ",
tw: "浴火重生Ⅲ",
en: "PhoenixⅢ",
de: "Von den Toten auferstehenⅢ",
it: "Rinascita dalle CeneriⅢ",
fr: "Renaissance dans un bain de feuⅢ",
ja: "火を浴びて再生するⅢ",
ko: "본 오브 파이어Ⅲ"
}, {
id: "10168",
cn: "复活%d次。",
tw: "復活%d次。",
en: "Continue %d times.",
de: "%dx wiederbelebt",
it: "Rivivi %d volte",
fr: "Ressuscitez %d fois",
ja: "復活%d回",
ko: "%d회 부활"
}, {
id: "10169",
cn: "富豪Ⅰ",
tw: "富豪Ⅰ",
en: "RichⅠ",
de: "MillionärⅠ",
it: "Ricco e PotenteⅠ",
fr: "RichardⅠ",
ja: "富豪Ⅰ",
ko: "부호Ⅰ"
}, {
id: "10170",
cn: "富豪Ⅱ",
tw: "富豪Ⅱ",
en: "RichⅡ",
de: "MillionärⅡ",
it: "Ricco e PotenteⅡ",
fr: "RichardⅡ",
ja: "富豪Ⅱ",
ko: "부호Ⅱ"
}, {
id: "10171",
cn: "富豪Ⅲ",
tw: "富豪Ⅲ",
en: "RichⅢ",
de: "MillionärⅢ",
it: "Ricco e PotenteⅢ",
fr: "RichardⅢ",
ja: "富豪Ⅲ",
ko: "부호Ⅲ"
}, {
id: "10172",
cn: "富豪Ⅳ",
tw: "富豪Ⅳ",
en: "RichⅣ",
de: "MillionärⅣ",
it: "Ricco e PotenteⅣ",
fr: "RichardⅣ",
ja: "富豪Ⅳ",
ko: "부호Ⅳ"
}, {
id: "10173",
cn: "富豪Ⅴ",
tw: "富豪Ⅴ",
en: "RichⅤ",
de: "MillionärⅤ",
it: "Ricco e PotenteⅤ",
fr: "RichardⅤ",
ja: "富豪Ⅴ",
ko: "부호Ⅴ"
}, {
id: "10174",
cn: "累计获得%d硬币。",
tw: "累計獲得%d硬幣。",
en: "Earn %d coins.",
de: "%d Münzen erhalten",
it: "%d Monete accumulate",
fr: "Accumulez %d pièces",
ja: "累計%dコイン獲得する",
ko: "%d코인 누적 획득"
}, {
id: "10175",
cn: "勇往直前Ⅰ",
tw: "勇往直前Ⅰ",
en: "More High LevelⅠ",
de: "Mutig voranⅠ",
it: "Avanza CoraggiosamenteⅠ",
fr: "Toujours en avantⅠ",
ja: "直進Ⅰ",
ko: "용감히 전진Ⅰ"
}, {
id: "10176",
cn: "勇往直前Ⅱ",
tw: "勇往直前Ⅱ",
en: "More High LevelⅡ",
de: "Mutig voranⅡ",
it: "Avanza CoraggiosamenteⅡ",
fr: "Toujours en avantⅡ",
ja: "直進Ⅱ",
ko: "용감히 전진Ⅱ"
}, {
id: "10177",
cn: "勇往直前Ⅲ",
tw: "勇往直前Ⅲ",
en: "More High LevelⅢ",
de: "Mutig voranⅢ",
it: "Avanza CoraggiosamenteⅢ",
fr: "Toujours en avantⅢ",
ja: "直進Ⅲ",
ko: "용감히 전진Ⅲ"
}, {
id: "10178",
cn: "通过%d次关卡。",
tw: "通過%d次關卡。",
en: "Complete %d levels.",
de: "%dx Instanz abgeschlossen",
it: "Supera lo schema %d volta",
fr: "Passez %d niveau",
ja: "レベルを%d回クリアする",
ko: "스테이지 %d회 클리어"
}, {
id: "10179",
cn: "飞行杀手Ⅰ",
tw: "飛行殺手Ⅰ",
en: "AircraftⅠ",
de: "Fliegender MörderⅠ",
it: "Assassino VolanteⅠ",
fr: "Assassin volantⅠ",
ja: "フライングキラーⅠ",
ko: "플라잉킬러Ⅰ"
}, {
id: "10180",
cn: "飞行杀手Ⅱ",
tw: "飛行殺手Ⅱ",
en: "AircraftⅡ",
de: "Fliegender MörderⅡ",
it: "Assassino VolanteⅡ",
fr: "Assassin volantⅡ",
ja: "フライングキラーⅡ",
ko: "플라잉킬러Ⅱ"
}, {
id: "10181",
cn: "飞行杀手Ⅲ",
tw: "飛行殺手Ⅲ",
en: "AircraftⅢ",
de: "Fliegender MörderⅢ",
it: "Assassino VolanteⅢ",
fr: "Assassin volantⅢ",
ja: "フライングキラーⅢ",
ko: "플라잉킬러Ⅲ"
}, {
id: "10182",
cn: "用飞行器打爆%d个球。",
tw: "用飛行器打爆%d個球。",
en: "Shoot %d balls with a aircraft.",
de: "%d Kugeln mit Flugkörpern abgeschossen",
it: "Usa l'Aeromobile per tirare %d palline",
fr: "Utilisez un drone pour faire exploser %d ballons",
ja: "無人機で玉を%d個打ち破る",
ko: "무인기로 볼 %d개 파괴"
}, {
id: "10183",
cn: "复活",
tw: "復活",
en: "Second Chance?",
de: "Zweite Chance?",
it: "Seconda possibilità?",
fr: "Seconde chance?",
ja: "リトライ？",
ko: "다시 오지?"
}, {
id: "10184",
cn: "您获得了！",
tw: "您獲得了！",
en: "Progress…",
de: "Du erhältst",
it: "Hai ricevuto",
fr: "Vous avez obtenu",
ja: "ゲットした",
ko: "획득:"
}, {
id: "10185",
cn: "关卡进度",
tw: "關卡進度",
en: "Level Completed",
de: "Fortschritt",
it: "Progressi Schema",
fr: "Progression du niveau",
ja: "進捗",
ko: "스테이지 플랜"
}, {
id: "10186",
cn: "任务！",
tw: "任務！",
en: "Mission!",
de: "Mission",
it: "Incarico",
fr: "Mission",
ja: "ミッション",
ko: "퀘스트"
}, {
id: "10187",
cn: "收集:",
tw: "收集:",
en: "Collected:",
de: "Gesammelt:",
it: "Raccolta:",
fr: "Collection :",
ja: "コレクション：",
ko: "수집:"
}, {
id: "10188",
cn: "太棒了！",
tw: "太棒了！",
en: "OH YEAH!",
de: "Großartig",
it: "Grandioso",
fr: "Génial !",
ja: "すばらしい",
ko: "앗싸"
}, {
id: "10189",
cn: "剩余时间：",
tw: "剩餘時間：",
en: "Time Left:",
de: "Restzeit",
it: "Tempo Rimanente",
fr: "Temps restant",
ja: "殘り時間",
ko: "남은시간"
}, {
id: "10190",
cn: "奖励",
tw: "獎勵",
en: "REWARDS",
de: "Belohnung",
it: "Premio",
fr: "Récompense",
ja: "ボーナス",
ko: "보상"
}, {
id: "10191",
cn: "观看此简短视频，从而让你变得富有！",
tw: "觀看此簡短視頻，從而讓你變得富有！",
en: "I'll make you rich for watching a short video.",
de: "Nach nur einem kurzen Video wirst du zum Millionär!",
it: "Guarda questo breve video e diventerai ricco",
fr: "Regardez cette courte vidéo et devenez riche.",
ja: "このビデオを視聴して、コインを稼げます",
ko: "동영상을 보고 더 부유해지기"
}, {
id: "10192",
cn: "简单！",
tw: "簡單！",
en: "EASY!",
de: "OK",
it: "OK",
fr: "OK",
ja: "OK",
ko: "OK"
}, {
id: "10193",
cn: "观看此简短视频，即可获得额外的强力道具！",
tw: "觀看此簡短視頻，即可獲得額外的強力道具！",
en: "Watch this short video to earn these extra boosts.",
de: "Nach nur einem kurzen Video bekommst du noch mehr Belohnungen!",
it: "Guarda questo breve video e otterrai un premio extra",
fr: "Regardez cette courte vidéo et gagnez une récompense supplémentaire.",
ja: "このビデオを視聴して、追加報酬をもらえます",
ko: "동영상을 관람 시 추가 보상 획득 가능"
}, {
id: "10194",
cn: "哇！",
tw: "哇！",
en: "WOW!",
de: "OK",
it: "OK",
fr: "OK",
ja: "OK",
ko: "OK"
}, {
id: "10195",
cn: "观看此简短视频，即可获得额外奖励！",
tw: "觀看此簡短視頻，即可獲得額外獎勵！",
en: "Watch this short video to earn these extra rewards.",
de: "Nach nur einem kurzen Video bekommst du noch mehr Belohnungen!",
it: "Guarda questo breve video e otterrai un premio extra",
fr: "Regardez cette courte vidéo et gagnez une récompense supplémentaire.",
ja: "このビデオを視聴して、追加報酬をもらえます",
ko: "동영상을 관람 시 추가 보상 획득 가능"
}, {
id: "10196",
cn: "非常棒！",
tw: "非常棒！",
en: "NICE!",
de: "OK",
it: "OK",
fr: "OK",
ja: "OK",
ko: "OK"
}, {
id: "10197",
cn: "商店",
tw: "商店",
en: "SHOP",
de: "Laden",
it: "Negozio",
fr: "Boutique",
ja: "ショップ",
ko: "상점"
}, {
id: "10198",
cn: "嘿! 士兵，你需要什么？",
tw: "嘿! 士兵，你需要什麼？",
en: "Hey! Soldier, what do you need?",
de: "Hey! Soldat, was begehrt dein Herz?",
it: "Ehi! Soldato, di cosa hai bisogno?",
fr: "Hey ! Soldat, de quoi as-tu besoin ?",
ja: "ヘイ！兵士さん、何か買いますか？",
ko: "허! 자네 뭐가 필요한데?"
}, {
id: "10199",
cn: "特价优惠",
tw: "特價優惠",
en: "PREFERENTIAL",
de: "Sonderrabatt",
it: "Offerta Speciale",
fr: "Offre(s) spéciale(s)",
ja: "特価セール",
ko: "특가 할인"
}, {
id: "10200",
cn: "这是你不能拒绝的优惠！\n足够的钱来购买新的大炮、钻石和升级！",
tw: "這是你不能拒絕的優惠！\n足夠的錢來購買新的大炮、鑽石和升級！",
en: "This is an offer you can't refuse. \nEnough money to buy  new Cannons,\n chips and upgrades.",
de: "Ein nicht abzuschlagender Rabatt! Damit hast du genug für neue Kanonen, Chips und Upgrades!",
it: "Questa è un'offerta che non puoi rifiutare! Denaro sufficiente per acquistare cannoni, microchip e aggiornamenti",
fr: "Voici des offres que vous ne pouvez refuser ! Récoltez assez d'argent pour venir acheter des nouveaux canons, puces et améliorations.",
ja: "これは絶対お買い得です！新しいキャノン、チップ、アップグレードをもらえますよ",
ko: "거절할 수 없는 할인으로 충분한 재화로 새로운 캐논, 칩 구매와 업그레이드 가능."
}, {
id: "10201",
cn: "无人机优惠",
tw: "無人機優惠",
en: "DRONE OFFER",
de: "Drohnenrabatt",
it: "Offerta Drone",
fr: "Drones à prix réduits",
ja: "無人機セール",
ko: "무인기 할인"
}, {
id: "10202",
cn: "足够的钻石开启下一个飞行器，而且还有大量硬币可以用！",
tw: "足夠的鑽石開啟下一個飛行器，而且還有大量硬幣可以用！",
en: "Enough chips to open your next Drone Box and some coins.",
de: "Mit genügend Chips kannst du Flugkörper freischalten und dann bleiben dir noch genügend Münzen!",
it: "Microchip sufficienti per abilitare il prossimo aeromobile, inoltre ci sono ancora molte monete da utilizzare",
fr: "Récoltez assez de puces pour ouvrir le prochain drone et en plus vous aurez encore beaucoup de pièces à utiliser.",
ja: "次の無人機をアンロックするためのチップのほかに、大量のコインももらえます",
ko: "충분한 칩으로 다음단계 무인기를 활성화 가능하며 대량의 코인도 사용 가능"
}, {
id: "10203",
cn: "钻石特惠",
tw: "鑽石特惠",
en: "SPECIAL CHIPS",
de: "Chip-Rabatt",
it: "Offerta Microchip",
fr: "Puces à prix réduits",
ja: "チップセール",
ko: "칩 할인"
}, {
id: "10204",
cn: "钻石用于研发，您将获得更多飞行器！",
tw: "鑽石用於研發，您將獲得更多飛行器！",
en: "Chips for development, to get more technology power.",
de: "Verwende die Chips für die Entwicklung, dann kannst du noch mehr Flugkörper erhalten!",
it: "Sviluppo uso microchip, otterrai ulteriori aeromobili",
fr: "Les puces sont utilisées pour le développement, elles vous permettront d'obtenir plus de drones.",
ja: "開発用のチップのほか、より多くの無人機を獲得できます。",
ko: "칩은 연구개발에 사용되며 더 많은 무인기를 획득 가능"
}, {
id: "10205",
cn: "硬币收入翻倍",
tw: "硬幣收入翻倍",
en: "DOUBLE YOUR COINS",
de: "Doppeltes Münzeneinkommen",
it: "Raddoppio entrata monete",
fr: "Gains en pièce doublés",
ja: "コイン収入倍増",
ko: "코인 수입 더블"
}, {
id: "10206",
cn: "永久提升你从所有来源获得的硬币加倍。\n2倍收入，2倍快乐！",
tw: "永久提升你從所有來源獲得的硬幣加倍。\n2倍收入，2倍快樂！",
en: "Permanently boost to double the Coins you get from all sources.\n2x your Coins, 2x your fun.",
de: "Verdoppelt permanent die erhaltenen Münzen. Doppeltes Einkommen, doppelter Spaß!",
it: "Aumenta per sempre il raddoppio delle monete che ottieni da tutte le fonti. 2 volte le entrate, 2 volte la felicità",
fr: "Les pièces que vous recevrez seront désormais doublées de manières permanente. Gains doublés, bonheur doublé.",
ja: "全てのソースからのコインを2倍増します。この効果は永久です。収入2倍、幸せ2倍！",
ko: "영구적으로 코인 획득 더블! 2배의 수익, 2배의 즐거움"
}, {
id: "10207",
cn: "少数宝石",
tw: "少數寶石",
en: "FEW GEMS",
de: "Wenige Edelsteine",
it: "Poche Gemme",
fr: "Peu de gemmes",
ja: "少數のジェム",
ko: "보석(극소)"
}, {
id: "10208",
cn: "一些宝石",
tw: "一些寶石",
en: "SOME GEMS",
de: "Einige Edelsteine",
it: "Alcune Gemme",
fr: "Quelques gemmes",
ja: "多少のジェム",
ko: "보석(소)"
}, {
id: "10209",
cn: "一箱宝石",
tw: "一箱寶石",
en: "BOX OF GEMS",
de: "Eine Truhe Edelsteine",
it: "Una Scatola di Gemme",
fr: "1 coffre de gemmes",
ja: "一箱のジェム",
ko: "보석(중)"
}, {
id: "10210",
cn: "大箱宝石",
tw: "大箱寶石",
en: "LARGE BOX GEMS",
de: "Große Truhe Edelsteine",
it: "Grande Scatola di Gemme",
fr: "Grand coffre de gemmes",
ja: "大箱のジェム",
ko: "보석(대)"
}, {
id: "10211",
cn: "满箱宝石",
tw: "滿箱寶石",
en: "FULL BOX GEMS",
de: "Volle Turhe Edelsteine",
it: "Scatola Piena di Gemme",
fr: "Coffre plein à craquer de gemmes",
ja: "フルボックスのジェム",
ko: "보석(극대)"
}, {
id: "10212",
cn: "满屋宝石",
tw: "滿屋寶石",
en: "FULL HOUSE GEMS",
de: "Voller Raum Edelsteine",
it: "Casa Piena di Gemme",
fr: "Maison pleine de gemmes",
ja: "フルハウスのジェム",
ko: "보석(대박)"
}, {
id: "10213",
cn: "一些硬币",
tw: "一些硬幣",
en: "SOME COINS",
de: "Einige Münzen",
it: "Alcune Monete",
fr: "Quelques pièces",
ja: "多少のコイン",
ko: "코인(소)"
}, {
id: "10214",
cn: "大箱硬币",
tw: "大箱硬幣",
en: "BOX OF COINS",
de: "Große Truhe Münzen",
it: "Grande Scatola di Monete",
fr: "Grand coffre de pièces",
ja: "大箱のコイン",
ko: "코인(대)"
}, {
id: "10215",
cn: "满箱硬币",
tw: "滿箱硬幣",
en: "FULL BOX COINS",
de: "Volle Truhe Münzen",
it: "Scatola Piena di Monete",
fr: "Coffre plein à craquer de pièces",
ja: "フルボックスのコイン",
ko: "코인(대박)"
}, {
id: "10216",
cn: "改装店可以提升你的武器等级！",
tw: "改裝店可以提升你的武器等級！",
en: "Modified shop will boost your weapon firepower.",
de: "Der Rekonstruktionsladen kann dein Waffen-Lv. Steigern",
it: "Il negozio delle modifiche può aumentare il livello delle tue armi",
fr: "La boutique de modif peut permettre d'améliorer le niveau de vos armes.",
ja: "モディファイショップは武器レベルをアップできます",
ko: "개장상점에서 무기 레벨 향상 가능"
}, {
id: "10217",
cn: "你已经有足够的钻石可以开启下一个无人机宝箱！",
tw: "你已經有足夠的鑽石可以開啟下一個無人機寶箱！",
en: "You already have enough chips to open the next drone box.",
de: "Du hat genügend Chips gesammelt, du kannst die nächste Drohnentruhe freischalten.",
it: "Hai già abbastanza microchip per poter abilitare il prossimo scrigno del drone",
fr: "Vos avez désormais assez de puces pour ouvrir le prochain coffre de drone.",
ja: "次の無人機の寶箱を開くためのチップは十分になりました",
ko: "칩이 충분한 바 다음 무인기 상자 활성화 가능"
}, {
id: "10218",
cn: "完成任务获得高额奖励！",
tw: "完成任務獲得高額獎勵！",
en: "Get high rewards for completing quests.",
de: "Hochwertige Belohnung für den Abschluss einer Mission",
it: "Completa l'incarico e otterrai grandi premi",
fr: "Terminez la mission pour obtenir de grandes récompenses",
ja: "ミッションを完了して、高い報酬を貰います",
ko: "퀘스트 완성 시 고액 보상 획득 가능"
}, {
id: "10219",
cn: "解锁“暴风雨”",
tw: "解鎖“暴風雨”",
en: "Unlock'Tempest'",
de: "Hurrikan' freischalten",
it: "Sblocca la 'Tempesta'",
fr: "Débloquer 'orage'",
ja: "「ストーム」をアンロック",
ko: " '폭풍우' 언락"
}, {
id: "10220",
cn: "解锁“激光切割”",
tw: "解鎖“鐳射切割”",
en: "Unlock'Laser Cutting'",
de: "Laserstrahl' freischalten",
it: "Sblocca il 'Taglio Laser'",
fr: "Débloquer 'découpe laser'",
ja: "「レーザー切斷」をアンロック",
ko: " '레이저 커팅' 언락"
}, {
id: "10221",
cn: "解锁“火力全开”",
tw: "解鎖“火力全開”",
en: "Unlock'Full Fire'",
de: "Feuer frei' freischalten",
it: "Sblocca la 'Piena Potenza di Fuoco'",
fr: "Débloquer 'plein feu'",
ja: "「火力全開」をアンロック",
ko: " '오픈 파이어' 언락"
}, {
id: "10222",
cn: "下次刷新时间",
tw: "下次刷新時間",
en: "Job available in…",
de: "Nächste Arbeitszeit",
it: "Prossimo orario di lavoro",
fr: "Heure du prochain labeur",
ja: "次の作業時間",
ko: "다음 작업시간"
}, {
id: "10223",
cn: "购买商品？",
tw: "購買商品？",
en: "Purchase?",
de: "Waren kaufen",
it: "Acquista prodotti",
fr: "Acheter produit",
ja: "買う",
ko: "상품 구매"
}, {
id: "10224",
cn: "你无法承担此商品。",
tw: "你無法承擔此商品。",
en: "You can't afford this item.",
de: "Du kannst diese Ware nicht tragen",
it: "Non puoi permetterti questo prodotto",
fr: "Vous ne pouvez pas vous permettre ce produit",
ja: "コインは足りないようです。",
ko: "해당 상품 담당 불가"
}, {
id: "10225",
cn: "前往商店",
tw: "前往商店",
en: "Go to shop",
de: "Weiter zum Laden",
it: "Vai al negozio",
fr: "Allez à la boutique",
ja: "ショップへ",
ko: "상점으로 이동"
}, {
id: "10226",
cn: "你真棒！",
tw: "你真棒！",
en: "you're Awesome!",
de: "Du bist grpßartig",
it: "Sei proprio un grande",
fr: "T'es trop fort !",
ja: "よくできました",
ko: "당신 짱!"
}, {
id: "10227",
cn: "谢谢你玩我的游戏！",
tw: "謝謝你玩我的遊戲！",
en: "Thank you for playing my game.",
de: "Vielen Dank, dass du mein Spiel spielst!",
it: "Grazie per giocare al mio gioco",
fr: "Merci de jouer à mon jeu.",
ja: "ゲームをしていただきありがとうございます",
ko: "저의 게임을 놀아줘 감사해요"
}, {
id: "10228",
cn: "你怎么看待它呢？",
tw: "你怎麼看待它呢？",
en: "What do you think about it?",
de: "Wie gefällt es dir?",
it: "Tu cosa ne pensi?",
fr: "Comment le trouves-tu ?",
ja: "どう思いますか？",
ko: "그를 어떻게 보시는가요?"
}, {
id: "10229",
cn: "它很棒，我会证明这一点！",
tw: "它很棒，我會證明這一點！",
en: "It's Great and I'll prove it.",
de: "Es ist super! Ich werde es dir beweisen.",
it: "Che è fantastico, lo dimostrerò",
fr: "Il est génial et je vais le prouver.",
ja: "これは素晴らしいゲームだと必ず證明します",
ko: "멋지구요."
}, {
id: "10230",
cn: "它糟透了，我不在乎....",
tw: "它糟透了，我不在乎....",
en: "I don't care....",
de: "Mir egal.",
it: "Non mi interessa",
fr: "Je m'en fiche.",
ja: "全然平気です",
ko: "관심 없어요."
}, {
id: "10231",
cn: "第%d关",
tw: "第%d關",
en: "LEVEL:%d",
de: "Instanz: %d",
it: "Schema: %d",
fr: "Niveau: %d",
ja: "レベル: %d",
ko: "스테이지: %d"
}, {
id: "10232",
cn: "解锁",
tw: "解鎖",
en: "UNLOCK",
de: "Freischalten",
it: "Sblocca",
fr: "Débloquer",
ja: "アンロック",
ko: "언락"
}, {
id: "10233",
cn: "左右滑动开始射击",
tw: "左右滑動開始射擊",
en: "Hold To Continue",
de: "Gedrückt halten zum Fortfahren",
it: "Tenere premuto per continuare",
fr: "Restez appuyer pour continuer",
ja: "押して続ける",
ko: "눌러서 계속"
}, {
id: "10234",
cn: "吸收更多伤害！",
tw: "吸收更多傷害！",
en: "Absorb more damage",
de: "Noch mehr Schaden absaugen",
it: "Incassa più danni",
fr: "Absorbe plus de dégâts",
ja: "ダメージをもっと吸収する",
ko: "더 많은 데미지 흡수"
}, {
id: "10235",
cn: "升级获得强大的火力！",
tw: "升級獲得強大的火力！",
en: "Upgrade to gain powerful firepower.",
de: "Starke Feuerkraft durch Upgrades",
it: "Aggiorna e ottieni la Forte Potenza di Fuoco",
fr: "Améliorez pour acquérir une plus grande puissance de feu",
ja: "レベルアップして強力な火力を獲得する",
ko: "업그레이드로 더 강한 화력 획득"
}, {
id: "10236",
cn: "拥有额外的机枪！",
tw: "擁有額外的機槍！",
en: "Gain extra machine guns.",
de: "Im Besitz eines weiteren Maschinengewehrs",
it: "Possiedi una Mitraglia Extra",
fr: "Dispose d'une mitrailleuse additionnelle",
ja: "追加のマシンガンを持つ",
ko: "추가 머신건 획득"
}, {
id: "10237",
cn: "无尽模式",
tw: "無盡模式",
en: "ENDLESS",
de: "Endlos-Modus",
it: "Modalità Senza Fine",
fr: "Mode sans fin",
ja: "エンドレスモード",
ko: "무한모드"
}, {
id: "10238",
cn: "低级宝箱",
tw: "低級寶箱",
en: "Basic Chest",
de: "Minderw. Truhe",
it: "Scrigno di Basso Livello",
fr: "Coffre au trésor bas niveau",
ja: "低級寶箱",
ko: "하급 보물상자"
}, {
id: "10239",
cn: "高级宝箱",
tw: "高級寶箱",
en: "Advanced Chest",
de: "Hochw. Truhe",
it: "Scrigno Avanzato",
fr: "Coffre au trésor haut niveau",
ja: "高級寶箱",
ko: "고급 보물상자"
}, {
id: "10240",
cn: "神奇宝箱",
tw: "神奇寶箱",
en: "Magic Chest",
de: "Legendäre Truhe",
it: "Scrigno Magico",
fr: "Coffre au trésor mystérieux",
ja: "不思議な寶箱",
ko: "매지컬 보물상자"
}, {
id: "10241",
cn: "超级宝箱",
tw: "超級寶箱",
en: "Super Chest",
de: "Super-Truhe",
it: "Scrigno Super",
fr: "Coffre au trésor super",
ja: "スーパー寶箱",
ko: "슈퍼 보물상자"
}, {
id: "10242",
cn: "点击解锁",
tw: "點擊解鎖",
en: "Tap To Unlock",
de: "Tippe zum Freischalten",
it: "Clicca per sbloccare",
fr: "Appuyer pour débloquer",
ja: "タップしてアンロックする",
ko: "언락(터치)"
}, {
id: "10243",
cn: "可获得%d金币",
tw: "可獲得%d金幣",
en: "Up to %d coins",
de: "%d Münzen erhältlich",
it: "Ottieni %d Monete",
fr: "Peut obtenir %d pièces d'or",
ja: "%dコインをもらえる",
ko: "%d골드 획득 가능"
}, {
id: "10244",
cn: "可获得%d钻石",
tw: "可獲得%d鑽石",
en: "Up to %d gems",
de: "%d Diam. erhältlich",
it: "Ottieni %d Diamante",
fr: "Peut obtenir %d diamant",
ja: "%dダイヤをもらえる",
ko: "%d개 다이아 획득 가능"
}, {
id: "10245",
cn: "可获得%d钻石",
tw: "可獲得%d鑽石",
en: "Up to %d chips",
de: "%d Chip erhältlich",
it: "Ottieni %d Microchip",
fr: "Peut obtenir %d puce",
ja: "%dチップをもらえる",
ko: "%d개 칩 획득 가능"
}, {
id: "10246",
cn: "打开",
tw: "打開",
en: "Open",
de: "Öffnen",
it: "Apri",
fr: "Ouvrir",
ja: "開ける",
ko: "오픈"
}, {
id: "10247",
cn: "立即打开",
tw: "立即打開",
en: "Open Now",
de: "Sofort öffnen",
it: "Apri Ora",
fr: "Ouvrir immédiatement",
ja: "すぐ開ける",
ko: "즉시 오픈"
}, {
id: "10248",
cn: "正在解锁另一个箱子！",
tw: "正在解鎖另一個箱子！",
en: "Another unlock is in progress…",
de: "Eine andere Truhe wird derzeit geöffnet",
it: "Si sta sbloccando l'altra scatola",
fr: "Déblocage d'un autre coffre en cours",
ja: "別のボックスをアンロックしている",
ko: "다른 상자 언락 중"
}, {
id: "10249",
cn: "减少4小时",
tw: "減少4小時",
en: "Reduce 4 h",
de: "Um 4 Std. verringern",
it: "Riduzione di 4 ore",
fr: "Réduire de 4 heures",
ja: "4時間を減らす",
ko: "4시간 감소"
}, {
id: "10250",
cn: "宝箱卡槽已满！无法继续获得！",
tw: "寶箱卡槽已滿！無法繼續獲得！",
en: "Chest slots full.",
de: "Truhe-Slots sind voll! Keine weiteren erhältlich",
it: "Contenitore schema scrigni pieno! Impossibile ottenere ancora",
fr: "Emplacements de coffres au trésor pleins ! Impossible de continuer à en obtenir.",
ja: "寶箱のゲージはフルです。これ以上獲得できません",
ko: "상자 슬롯이 차서 더 이상 획득 불가"
}, {
id: "10251",
cn: "视频加载失败，请稍后再试！",
tw: "視頻載入失敗，請稍後再試！",
en: "Video failed to load, \nplease try again later.",
de: "Video konnte nicht geladen werden, bitte versuche es später erneut",
it: "Caricamento video fallito, riprovare più tardi",
fr: "Échec de téléchargement de la vidéo, veuillez ressayer ultérieurement.",
ja: "ビデオが再生できないので、後でやり直してください",
ko: "동영상 로딩 실패로 잠시 후 재시도하십시오."
}, {
id: "10252",
cn: "开始游戏",
tw: "開始遊戲",
en: "Start",
de: "Spiel beginnen",
it: "Avvia Gioco",
fr: "Débuter le jeu",
ja: "スタート",
ko: "게임 시작"
}, {
id: "10253",
cn: "点击继续",
tw: "點擊繼續",
en: "Tap to continue",
de: "Tippe zum Fortfahren",
it: "Clicca per continuare",
fr: "Appuyez pour continuer",
ja: "タップして続ける",
ko: "계속(터치)"
}, {
id: "10254",
cn: "对不起！您今天视频观看太多了，现在无法继续观看！明天再来吧！",
tw: "對不起！ 您今天視頻觀看太多了，現在無法繼續觀看！ 明天再來吧！",
en: "I am sorry! You've watched too many videos today.",
de: "Entschuldigung! Es gibt zu viele Videos, die Sie heute angesehen haben!",
it: "Sorry! Ci sono troppi video che hai visto oggi!",
fr: "Désolé! Il y a trop de vidéos que vous avez regardées aujourd'hui!",
ja: "申し訳ありません！ 今日あなたが見た動畫が多すぎます。",
ko: "미안해! 오늘 본 동영상이 너무 많습니다."
}, {
id: "10255",
cn: "圣诞礼物",
tw: "聖誕禮物",
en: "CHRISTMAS GIFTS",
de: "Weihnachtsgeschenke",
it: "Regali di Natale",
fr: "Cadeaux de Noël",
ja: "クリスマスプレゼント",
ko: "크리스마스 선물"
}, {
id: "10256",
cn: "更多硬币，更多宝石，更多钻石，让您度过一个愉快的圣诞节。",
tw: "更多硬幣，更多寶石，更多鑽石，讓您度過一個愉快的耶誕節。",
en: "More coins, more gems, more chips, let you have a happy Christmas.",
de: "Mehr Münzen, mehr Edelsteine, mehr Chips, lassen Sie sich ein frohes Weihnachtsfest.",
it: "Più monete, più gemme, più patatine, ti permettono di avere un buon Natale.",
fr: "Plus de pièces de monnaie, plus de gemmes, plus de jetons, laissez-vous avoir un joyeux Noël.",
ja: "より多くの硬貨、より多くの寶石、より多くの破片は、幸せなクリスマスを過すことを許可した。",
ko: "더 많은 동전, 더 많은 보석, 더 많은 칩, 당신은 행복 한 크리스마스를 보자."
}, {
id: "10257",
cn: "强化机甲",
tw: "強化機甲",
en: "To strengthen the mecha",
de: "Stärken.",
it: "Rafforzare blindati",
fr: "Blindage renforcé",
ja: "裝甲を強化する",
ko: "장갑차를 강화하다."
}, {
id: "10258",
cn: "升级攻击等级可以使您的飞行器更强大",
tw: "升級攻擊等級可以使您的飛行器更強大",
en: "Upgrade your attack level to make your aircraft more powerful",
de: "Du hat genügend Chips gesammelt, du kannst die nächste Drohnentruhe freischalten.",
it: "Hai già abbastanza microchip per poter abilitare il prossimo scrigno del drone",
fr: "Vos avez désormais assez de puces pour ouvrir le prochain coffre de drone.",
ja: "次の無人機の寶箱を開くためのチップは十分になりました",
ko: "칩이 충분한 바 다음 무인기 상자 활성화 가능"
}, {
id: "10259",
cn: "你已经有足够的钻石可以开启下一个飞行器宝箱！",
tw: "你已經有足夠的鑽石可以開啟下一個飛行器寶箱！",
en: "You've got enough diamonds to open the next aircraft chest!",
de: "Du hat genügend Chips gesammelt, du kannst die nächste Drohnentruhe freischalten.",
it: "Hai già abbastanza microchip per poter abilitare il prossimo scrigno del drone",
fr: "Vos avez désormais assez de puces pour ouvrir le prochain coffre de drone.",
ja: "次の無人機の寶箱を開くためのチップは十分になりました",
ko: "칩이 충분한 바 다음 무인기 상자 활성화 가능"
}, {
id: "10260",
cn: "您可以在改装店获得新的机甲",
tw: "您可以在改裝店獲得新的機甲",
en: "You can get a new mecha in the refit shop",
de: "Du hat genügend Chips gesammelt, du kannst die nächste Drohnentruhe freischalten.",
it: "Hai già abbastanza microchip per poter abilitare il prossimo scrigno del drone",
fr: "Vos avez désormais assez de puces pour ouvrir le prochain coffre de drone.",
ja: "次の無人機の寶箱を開くためのチップは十分になりました",
ko: "칩이 충분한 바 다음 무인기 상자 활성화 가능"
}, {
id: "10261",
cn: "观看视频可以获得新的机甲",
tw: "觀看視頻可以獲得新的機甲",
en: "Watch the video to get a new mecha",
de: "Du hat genügend Chips gesammelt, du kannst die nächste Drohnentruhe freischalten.",
it: "Hai già abbastanza microchip per poter abilitare il prossimo scrigno del drone",
fr: "Vos avez désormais assez de puces pour ouvrir le prochain coffre de drone.",
ja: "次の無人機の寶箱を開くためのチップは十分になりました",
ko: "칩이 충분한 바 다음 무인기 상자 활성화 가능"
}, {
id: "10262",
cn: "吸铁",
tw: "吸鐵",
en: "Magnetic Field",
de: "Magnet",
it: "Magnete",
fr: "Attraction magnétique",
ja: "マグネット",
ko: "자철"
}, {
id: "10263",
cn: "伤害提高",
tw: "傷害提高",
en: "Full Fire",
de: "Feuer frei",
it: "Piena Potenza di Fuoco",
fr: "Plein feu",
ja: "火力全開",
ko: "오픈 파이어"
}, {
id: "10264",
cn: "飞行器",
tw: "飛行器",
en: "Aircraft",
de: "Aircraft",
it: "Aircraft",
fr: "Aircraft",
ja: "Aircraft",
ko: "Aircraft"
}, {
id: "10265",
cn: "冰封",
tw: "冰封",
en: "Ice world",
de: "Ice world",
it: "Ice world",
fr: "Ice world",
ja: "Ice world",
ko: "Ice world"
}, {
id: "10266",
cn: "强化机甲",
tw: "強化機甲",
en: "To strengthen the mecha",
de: "Stärken.",
it: "Rafforzare blindati",
fr: "Blindage renforcé",
ja: "裝甲を強化する",
ko: "장갑차를 강화하다."
}, {
id: "10267",
cn: "挑战次数已用尽，继续战斗将无法获得收益",
tw: "挑戰次數已用盡，繼續戰鬥將無法獲得收益",
en: "The number of challenges has been exhausted. You will not be able to gain benefits if you continue to fight",
de: "The number of challenges has been exhausted. You will not be able to gain benefits if you continue to fight",
it: "The number of challenges has been exhausted. You will not be able to gain benefits if you continue to fight",
fr: "The number of challenges has been exhausted. You will not be able to gain benefits if you continue to fight",
ja: "The number of challenges has been exhausted. You will not be able to gain benefits if you continue to fight",
ko: "The number of challenges has been exhausted. You will not be able to gain benefits if you continue to fight"
}, {
id: "10268",
cn: "剩余挑战次数：%d",
tw: "剩餘挑戰次數：%d",
en: "Remaining challenges：%d",
de: "Remaining challenges：%d",
it: "Remaining challenges：%d",
fr: "Remaining challenges：%d",
ja: "Remaining challenges：%d",
ko: "Remaining challenges：%d"
}, {
id: "10269",
cn: "无敌",
tw: "無敵",
en: "Invincible",
de: "Invincible",
it: "Invincible",
fr: "Invincible",
ja: "Invincible",
ko: "Invincible"
}, {
id: "10270",
cn: "点击按钮可以升级僚机",
tw: "點擊按鈕可以升級僚機",
en: "Click the button to upgrade the wingman",
de: "Click the button to upgrade the wingman",
it: "Click the button to upgrade the wingman",
fr: "Click the button to upgrade the wingman",
ja: "Click the button to upgrade the wingman",
ko: "Click the button to upgrade the wingman"
}, {
id: "10271",
cn: "点击进入无尽模式",
tw: "點擊進入無盡模式",
en: "Click to enter endless mode",
de: "Click to enter endless mode",
it: "Click to enter endless mode",
fr: "Click to enter endless mode",
ja: "Click to enter endless mode",
ko: "Click to enter endless mode"
}, {
id: "10272",
cn: "点击开始无尽模式",
tw: "點擊開始無盡模式",
en: "Click to start endless mode",
de: "Click to start endless mode",
it: "Click to start endless mode",
fr: "Click to start endless mode",
ja: "Click to start endless mode",
ko: "Click to start endless mode"
}, {
id: "10273",
cn: "飞行器",
tw: "飛行器",
en: "Aircraft",
de: "Aircraft",
it: "Aircraft",
fr: "Aircraft",
ja: "Aircraft",
ko: "Aircraft"
}, {
id: "10274",
cn: "机甲库",
tw: "機甲庫",
en: "Mecha",
de: "Mecha",
it: "Mecha",
fr: "Mecha",
ja: "Mecha",
ko: "Mecha"
}, {
id: "10275",
cn: "机甲伤害",
tw: "機甲傷害",
en: "Damage LV",
de: "Damage LV",
it: "Damage LV",
fr: "Damage LV",
ja: "Damage LV",
ko: "Damage LV"
}, {
id: "10276",
cn: "离线等级",
tw: "離線等級",
en: "Offline LV",
de: "Offline LV",
it: "Offline LV",
fr: "Offline LV",
ja: "Offline LV",
ko: "Offline LV"
}, {
id: "10277",
cn: "离线收益",
tw: "離線收益",
en: "Offline benefits",
de: "Offline benefits",
it: "Offline benefits",
fr: "Offline benefits",
ja: "Offline benefits",
ko: "Offline benefits"
}, {
id: "10278",
cn: "欢迎回来",
tw: "歡迎回來",
en: "welcome back",
de: "welcome back",
it: "welcome back",
fr: "welcome back",
ja: "welcome back",
ko: "welcome back"
}, {
id: "10279",
cn: "双倍领取",
tw: "雙倍領取",
en: "Double claim",
de: "Double claim",
it: "Double claim",
fr: "Double claim",
ja: "Double claim",
ko: "Double claim"
}, {
id: "10280",
cn: "领取",
tw: "領取",
en: "receive",
de: "receive",
it: "receive",
fr: "receive",
ja: "receive",
ko: "receive"
}, {
id: "10281",
cn: "等级.%d",
tw: "等級.%d",
en: "Level.%d",
de: "Level.%d",
it: "Level.%d",
fr: "Level.%d",
ja: "Level.%d",
ko: "Level.%d"
}, {
id: "10282",
cn: "免费",
tw: "免費",
en: "Free",
de: "Free",
it: "Free",
fr: "Free",
ja: "Free",
ko: "Free"
}, {
id: "10283",
cn: "%d %已完成",
tw: "%d %已完成",
en: "%d %completed",
de: "%d %completed",
it: "%d %completed",
fr: "%d %completed",
ja: "%d %completed",
ko: "%d %completed"
}, {
id: "10284",
cn: "完成",
tw: "完成",
en: "completed",
de: "completed",
it: "completed",
fr: "completed",
ja: "completed",
ko: "completed"
}, {
id: "10285",
cn: "失败",
tw: "失敗",
en: "lose",
de: "lose",
it: "lose",
fr: "lose",
ja: "lose",
ko: "lose"
}, {
id: "10286",
cn: "金币",
tw: "金幣",
en: "Gold coin",
de: "Gold coin",
it: "Gold coin",
fr: "Gold coin",
ja: "Gold coin",
ko: "Gold coin"
}, {
id: "10287",
cn: "%d次",
tw: "%d次",
en: "%d times",
de: "%d times",
it: "%d times",
fr: "%d times",
ja: "%d times",
ko: "%d times"
}, {
id: "10288",
cn: "下一关",
tw: "下一關",
en: "Next",
de: "Next",
it: "Next",
fr: "Next",
ja: "Next",
ko: "Next"
}, {
id: "10289",
cn: "未解锁",
tw: "未解鎖",
en: "LOCK",
de: "LOCK",
it: "LOCK",
fr: "LOCK",
ja: "LOCK",
ko: "LOCK"
}, {
id: "10290",
cn: "出战",
tw: "出戰",
en: "Battle",
de: "Battle",
it: "Battle",
fr: "Battle",
ja: "Battle",
ko: "Battle"
}, {
id: "10291",
cn: "钻石不足，您可以通过完成任务和无尽模式获取更多的钻石",
tw: "鑽石不足，您可以通過完成任務和無盡模式獲取更多的鑽石",
en: "Diamond is not enough, you can get more diamonds by completing tasks and endless mode",
de: "Diamond is not enough, you can get more diamonds by completing tasks and endless mode",
it: "Diamond is not enough, you can get more diamonds by completing tasks and endless mode",
fr: "Diamond is not enough, you can get more diamonds by completing tasks and endless mode",
ja: "Diamond is not enough, you can get more diamonds by completing tasks and endless mode",
ko: "Diamond is not enough, you can get more diamonds by completing tasks and endless mode"
}, {
id: "10292",
cn: "金币不足，您可以通过完成任务和无尽模式获取更多的金币",
tw: "金幣不足，您可以通過完成任務和無盡模式獲取更多的金幣",
en: "Gold is not enough, you can get more gold by completing the task and endless mode",
de: "Gold is not enough, you can get more gold by completing the task and endless mode",
it: "Gold is not enough, you can get more gold by completing the task and endless mode",
fr: "Gold is not enough, you can get more gold by completing the task and endless mode",
ja: "Gold is not enough, you can get more gold by completing the task and endless mode",
ko: "Gold is not enough, you can get more gold by completing the task and endless mode"
}, {
id: "10293",
cn: "还差一点就完成了",
tw: "還差一點就完成了",
en: "It's almost done",
de: "It's almost done",
it: "It's almost done",
fr: "It's almost done",
ja: "It's almost done",
ko: "It's almost done"
}, {
id: "10294",
cn: "获得",
tw: "獲得",
en: "Get",
de: "Get",
it: "Get",
fr: "Get",
ja: "Get",
ko: "Get"
}, {
id: "10295",
cn: "解锁条件",
tw: "解鎖條件",
en: "Unlock condition",
de: "Unlock condition",
it: "Unlock condition",
fr: "Unlock condition",
ja: "Unlock condition",
ko: "Unlock condition"
}, {
id: "10296",
cn: "到达第%d关后可以解锁",
tw: "到達第%d關後可以解鎖",
en: "It can be unlocked after reaching the 10th level",
de: "It can be unlocked after reaching the 11th level",
it: "It can be unlocked after reaching the 12th level",
fr: "It can be unlocked after reaching the 13th level",
ja: "It can be unlocked after reaching the 14th level",
ko: "It can be unlocked after reaching the 15th level"
}, {
id: "10297",
cn: "已满级",
tw: "已滿級",
en: "Max Level",
de: "Max Level",
it: "Max Level",
fr: "Max Level",
ja: "Max Level",
ko: "Max Level"
} ];
window.i18n.languages.languageArr = [ "en", "tw", "cn", "de", "it", "fr", "ja", "ko" ];
cc._RF.pop();
}, {} ]
}, {}, [ "languageText" ]);