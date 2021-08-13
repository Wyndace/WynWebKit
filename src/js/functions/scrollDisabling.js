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

// ====================================================================================================================================================================