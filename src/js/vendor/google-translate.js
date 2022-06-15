/*!***************************************************
 * google-translate.js v1.0.3
 * https://Get-Web.Site/
 * author: Vitalii P.
 * edited: Alexander Vasilev https://github.com/Wyndace
 *****************************************************/

import {selectLangIniter} from "../functions/selectLangTranslator.js";

const googleTranslateConfig = {
  /* Original language */
  lang: "ru",
  /* The language we translate into on the first visit*/
  /* Язык, на который переводим при первом посещении */
  langFirstVisit: "ru",
  /* Если скрипт не работает на поддомене, 
    раскомментируйте и
    укажите основной домен в свойстве domain */
  domain: "localhost:3000",
};

function TranslateInit() {
  if (googleTranslateConfig.langFirstVisit && !Cookies.get("googtrans")) {
    // Если установлен язык перевода для первого посещения и куки не назначены
    TranslateCookieHandler("/auto/" + googleTranslateConfig.langFirstVisit);
  }

  let code = TranslateGetCode();
  // Находим флаг с выбранным языком для перевода и добавляем к нему активный класс
  if (document.querySelector('[data-google-lang="' + code + '"]') !== null) {
    document.querySelector('[data-google-lang="' + code + '"]').setAttribute("data-lang-active", "true");
    selectLangIniter(document.querySelector('[data-google-lang="' + code + '"]'));
  }

  if (code === googleTranslateConfig.lang) {
    // Если язык по умолчанию, совпадает с языком на который переводим
    // То очищаем куки
    TranslateCookieHandler(null, googleTranslateConfig.domain);
  }

  // Инициализируем виджет с языком по умолчанию
  new google.translate.TranslateElement({
    pageLanguage: googleTranslateConfig.lang,
  });

  // Вешаем событие  клик на флаги
  TranslateEventHandler("click", "[data-google-lang]", function (e) {
    TranslateCookieHandler("/" + googleTranslateConfig.lang + "/" + e.getAttribute("data-google-lang"), googleTranslateConfig.domain);
    // Перезагружаем страницу
    window.location.reload();
  });
}

function TranslateGetCode() {
  // Если куки нет, то передаем дефолтный язык
  let lang = Cookies.get("googtrans") !== undefined && Cookies.get("googtrans") !== "null" ? Cookies.get("googtrans") : googleTranslateConfig.lang;
  return lang.match(/(?!^\/)[^\/]*$/gm)[0];
}

function TranslateCookieHandler(val, domain) {
  // Записываем куки /язык_который_переводим/язык_на_который_переводим
  Cookies.set("googtrans", val);
  Cookies.set("googtrans", val, {
    domain: "." + document.domain,
  });

  if (domain === "undefined") return;
  // записываем куки для домена, если он назначен в конфиге
  Cookies.set("googtrans", val, {
    domain: domain,
  });

  Cookies.set("googtrans", val, {
    domain: "." + domain,
  });
}

function TranslateEventHandler(event, selector, handler) {
  document.addEventListener(event, function (e) {
    let el = e.target.closest(selector);
    if (el) handler(el);
  });
}

// Убираем гугловские всплывашки
document.body.insertAdjacentHTML("afterbegin", "<style>.goog-text-highlight{box-shadow:none!important;background:none!important}.skiptranslate{position:absolute!important;left:0!important;top:0!important;overflow:hidden;border:0!important;padding:0!important;width:1px!important;height:1px!important;opacity:0!important;pointer-events:none!important;clip:rect(1px,1px,1px,1px)!important}</style>");
let interval = setInterval(() => {
  document.querySelector("body").removeAttribute("style");
  if (document.querySelector(".goog-te-banner-frame.skiptranslate")) {
    clearInterval(interval);
  }
}, 100);

