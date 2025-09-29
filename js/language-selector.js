const locales = ["en-GB","ar-SA","zh-CN","de-DE","es-ES","fr-FR","hi-IN","it-IT","in-ID","ja-JP","ko-KR","nl-NL","no-NO","pl-PL","pt-BR","sv-SE","fi-FI","th-TH","tr-TR","uk-UA","vi-VN","ru-RU","he-IL"];

function getFlagSrc(countryCode) {
  return /^[A-Z]{2}$/.test(countryCode)
       ? `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`
    : "";
}

const dropdownBtn = document.getElementById("dropdown-btn");
const dropdownContent = document.getElementById("dropdown-content");

function setSelectedLocale(locale) {
  const intlLocale = new Intl.Locale(locale);
  const langName = new Intl.DisplayNames([locale], {
    type: "language",
  }).of(intlLocale.language);

  dropdownContent.innerHTML = "";

  const otherLocales = locales.filter((loc) => loc !== locale);
  otherLocales.forEach((otherLocale) => {
    const otherIntlLocale = new Intl.Locale(otherLocale);
    const otherLangName = new Intl.DisplayNames([otherLocale], {
      type: "language",
    }).of(otherIntlLocale.language);

    const listEl = document.createElement("li");
    listEl.innerHTML = `${otherLangName}<img src="${getFlagSrc(
      otherIntlLocale.region
    )}" />`;
    listEl.value = otherLocale;
    listEl.addEventListener("mousedown", function () {
      setSelectedLocale(otherLocale);
    });
    dropdownContent.appendChild(listEl);
  });

  dropdownBtn.innerHTML = `<img src="${getFlagSrc(
    intlLocale.region
  )}" />${langName}<span class="arrow-down"></span>`;
}

setSelectedLocale(locales[0]);
const browserLang = new Intl.Locale(navigator.language).language;
for (const locale of locales) {
  const localeLang = new Intl.Locale(locale).language;
  if (localeLang === browserLang) {
    setSelectedLocale(locale);
  }
}

// Responsive chuyển dropbox chọn ngôn ngữ từ ngoài vào trong Menu-Nav trên màn hình điện thoại
document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector("nav.navbar");
  const langSel = document.querySelector(".language-selector");
  const navNav = document.querySelector("#navbarCollapse .navbar-nav");

  if (!nav || !langSel || !navNav) return;

  // 1) Drop a placeholder at the original location (inside <nav>)
  const placeholder = document.createComment("language-selector-original-spot");
  langSel.parentNode.insertBefore(placeholder, langSel); // before langSel

  // 2) Helpers to move in/out
  function moveIntoNavNav() {
    if (!navNav.contains(langSel)) {
      // Optional: make it look like a nav item when inside the menu
      langSel.classList.add("nav-item");
      navNav.appendChild(langSel);
    }
  }

  function moveBackToNav() {
    if (placeholder.parentNode && langSel.parentNode !== placeholder.parentNode) {
      langSel.classList.remove("nav-item");
      // Insert back to the exact original position in <nav>
      placeholder.parentNode.insertBefore(langSel, placeholder);
    }
  }

  // 3) Apply on load + when viewport crosses 700px
  const mql = window.matchMedia("(max-width: 700px)");

  function apply(e) {
    if (e.matches) {
      // <= 700px → move INTO .navbar-nav
      moveIntoNavNav();
    } else {
      // > 700px → move BACK to <nav> (original position)
      moveBackToNav();
    }
  }

  apply(mql);
  // for older browsers
  if (mql.addEventListener) mql.addEventListener("change", apply);
  else mql.addListener(apply);
});