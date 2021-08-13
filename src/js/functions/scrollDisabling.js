// === Scroll disabling ===============================================================================================================================================

const scrollDisabling = (element, positon) => {
  if (!element.classList.contains('_scroll-disabled') && !element.classList.contains('_scroll-disabled_horizontal') && !element.classList.contains('_scroll-disabled_vertical')) {
    if (positon == "verical") {
      element.classList.add('_scroll-disabled_vertical');
    } else if (positon == "horizontal") {
      element.classList.add('_scroll-disabled_horizontal');
    } else {
      element.classList.add('_scroll-disabled');
    }
  }
};

const scrollDisablers = document.querySelectorAll('[data-scroll_disable]');
if (scrollDisablers.length > 0) {
  for (scrollDisabler of scrollDisablers) {
    positon = scrollDisabler.dataset.scroll_disable;
    scrollDisabling(scrollDisabler, positon);
  }
}

// ====================================================================================================================================================================