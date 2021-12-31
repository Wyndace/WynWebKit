const appleIphone = /iPhone/i;
const appleIpod = /iPod/i;
const appleTablet = /iPad/i;
const appleUniversal = /\biOS-universal(?:.+)Mac\b/i;
const androidPhone = /\bAndroid(?:.+)Mobile\b/i; // Match 'Android' AND 'Mobile'
const androidTablet = /Android/i;
const amazonPhone = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i; // Match 'Silk' AND 'Mobile'
const amazonTablet = /Silk/i;
const windowsPhone = /Windows Phone/i;
const windowsTablet = /\bWindows(?:.+)ARM\b/i; // Match 'Windows' AND 'ARM'
const otherBlackBerry = /BlackBerry/i;
const otherBlackBerry10 = /BB10/i;
const otherOpera = /Opera Mini/i;
const otherChrome = /\b(CriOS|Chrome)(?:.+)Mobile/i;
const otherFirefox = /Mobile(?:.+)Firefox\b/i; // Match 'Mobile' AND 'Firefox'

const isAppleTabletOnIos13 = (nav) => {
  return typeof nav !== "undefined" && nav.platform === "MacIntel" && typeof nav.maxTouchPoints === "number" && nav.maxTouchPoints > 1 && typeof MSStream === "undefined";
};

const nav = {
  UserAgent: navigator.userAgent,
  platform: navigator.platform || navigator.vendor,
  maxTouchPoints: navigator.maxTouchPoints,
};

const isMobile = {
  apple: {
    phone: createMatch(nav.UserAgent, appleIphone) && !createMatch(nav.UserAgent, windowsPhone),
    ipod: createMatch(nav.UserAgent, appleIpod),
    tablet: !createMatch(nav.UserAgent, appleIphone) && (createMatch(nav.UserAgent, appleTablet) || isAppleTabletOnIos13(nav)) && !createMatch(nav.UserAgent, windowsPhone),
    universal: createMatch(nav.UserAgent, appleUniversal),
    device: (createMatch(nav.UserAgent, appleIphone) || createMatch(nav.UserAgent, appleIpod) || createMatch(nav.UserAgent, appleTablet) || createMatch(nav.UserAgent, appleUniversal) || isAppleTabletOnIos13(nav)) && !createMatch(nav.UserAgent, windowsPhone),
  },
  amazon: {
    phone: createMatch(nav.UserAgent, amazonPhone),
    tablet: !createMatch(nav.UserAgent, amazonPhone) && createMatch(nav.UserAgent, amazonTablet),
    device: createMatch(nav.UserAgent, amazonPhone) || createMatch(nav.UserAgent, amazonTablet),
  },
  android: {
    phone: (!createMatch(nav.UserAgent, windowsPhone) && createMatch(nav.UserAgent, amazonPhone)) || (!createMatch(nav.UserAgent, windowsPhone) && createMatch(nav.UserAgent, androidPhone)),
    tablet: !createMatch(nav.UserAgent, windowsPhone) && !createMatch(nav.UserAgent, amazonPhone) && !createMatch(nav.UserAgent, androidPhone) && (createMatch(nav.UserAgent, amazonTablet) || createMatch(nav.UserAgent, androidTablet)),
    device: (!createMatch(nav.UserAgent, windowsPhone) && (createMatch(nav.UserAgent, amazonPhone) || createMatch(nav.UserAgent, amazonTablet) || createMatch(nav.UserAgent, androidPhone) || createMatch(nav.UserAgent, androidTablet))) || createMatch(nav.UserAgent, /\bokhttp\b/i),
  },
  windows: {
    phone: createMatch(nav.UserAgent, windowsPhone),
    tablet: createMatch(nav.UserAgent, windowsTablet),
    device: createMatch(nav.UserAgent, windowsPhone) || createMatch(nav.UserAgent, windowsTablet),
  },
  other: {
    blackberry: createMatch(nav.UserAgent, otherBlackBerry),
    blackberry10: createMatch(nav.UserAgent, otherBlackBerry10),
    opera: createMatch(nav.UserAgent, otherOpera),
    firefox: createMatch(nav.UserAgent, otherFirefox),
    chrome: createMatch(nav.UserAgent, otherChrome),
    device: createMatch(nav.UserAgent, otherBlackBerry) || createMatch(nav.UserAgent, otherBlackBerry10) || createMatch(nav.UserAgent, otherOpera) || createMatch(nav.UserAgent, otherFirefox) || createMatch(nav.UserAgent, otherChrome),
  },
  any: false,
  phone: false,
  tablet: false,
};

isMobile.any = isMobile.apple.device || isMobile.android.device || isMobile.windows.device || isMobile.other.device;
isMobile.phone = isMobile.apple.phone || isMobile.android.phone || isMobile.windows.phone;
isMobile.tablet = isMobile.apple.tablet || isMobile.android.tablet || isMobile.windows.tablet;
