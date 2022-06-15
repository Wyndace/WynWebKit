// ==== All ease animations are stored here ===============================================================================================================================

export const easeOutQuart = (t, b, c, d) => {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
};

// ========================================================================================================================================================================

// ==== Плавная прокрутка =================================================================================================================================================

export const smoothScrollAnimation = (currentTime, distance, duration, startTime, startPositon) => {
  if (startTime === null) startTime = currentTime;
  let timeElapsed = currentTime - startTime;
  let run = easeOutQuart(timeElapsed, startPositon, distance, duration);
  window.scrollTo(0, run);
  const SmoothScrollAnim = (currentTime) => smoothScrollAnimation(currentTime, distance, duration, startTime, startPositon);
  if (timeElapsed < duration) requestAnimationFrame(SmoothScrollAnim);
};

// ========================================================================================================================================================================

// ==== Скольжение вверх и вниз ===========================================================================================================================================

export const _slideUp = (target, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = target.offsetHeight + "px";
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = true;
      target.style.removeProperty("height");
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
};
export const _slideDown = (target, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    if (target.hidden) {
      target.hidden = false;
    }
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
};
export const _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};

// ==== Анимация нажатия ===================================================================================================================================================

export const tapAnimation = (element, ms = 300, tappedClass = '_tapped',) => {
  element.classList.add(tappedClass);
  setTimeout(() => {element.classList.remove(tappedClass)}, ms);
};

// ========================================================================================================================================================================

// ========================================================================================================================================================================
