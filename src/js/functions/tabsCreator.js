const tabOpen = (path) => {
  const tabOpener = document.querySelector(`[data-tabpath="${path}"]`);
  const tab = document.querySelector(path);
  tabOpener.parentElement.classList.add("_active");
  // tabOpener.classList.add("_active");
  tab.classList.remove("_hidden");
};

const tabsOpeners = document.querySelectorAll("[data-tabpath]");
if (tabsOpeners.length > 0) {
  for (let index = 0; index < tabsOpeners.length; index++) {
    const tabsOpener = tabsOpeners[index];
    const tabName = tabsOpener.dataset.tabpath;
    console.log(tabName);
    tabsOpener.addEventListener("click", function (e) {
      e.preventDefault();
      tabsOpeners.forEach((el) => {
        el.parentElement.classList.remove("_active") &&
          el.classList.remove("_active");
        document.querySelectorAll(el.dataset.tabpath).forEach((tab) => {
          tab.classList.add("_hidden");
        });
      });
      tabOpen(tabName);
    });
    if (!tabsOpener.parentElement.classList.contains("_active") && !tabsOpener.classList.contains("_active")) {
      document.querySelector(tabName).classList.add("_hidden");
    }
  }
}
