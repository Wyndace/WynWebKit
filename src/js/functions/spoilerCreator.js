const initSpoilerBody = (spoilersBlock, hideSpoilerBody = true) => {
  const spoilerTitles = spoilersBlock.querySelectorAll("[data-spoiler]");
  if (spoilerTitles.length > 0) {
    spoilerTitles.forEach((spoilerTitle) => {
      if (hideSpoilerBody) {
        spoilerTitle.removeAttribute("tabindex");
        if (!spoilerTitle.classList.contains("_active")) {
          spoilerTitle.nextElementSibling.hidden = true;
        }
      } else {
        spoilerTitle.setAttribute("tabindex", "-1");
        spoilerTitle.nextElementSibling.hidden = false;
      }
    });
  }
};

const setSpoilerAction = (e) => {
  const el = e.target;
  if (el.hasAttribute("data-spoiler") || el.closest("[data-spoiler]")) {
    const spoilerTitle = el.hasAttribute("data-spoiler") ? el : el.closest("[data-spoiler]");
    const spoilersBlock = spoilerTitle.closest("[data-spoilers]");
    const oneSpoiler = spoilersBlock.hasAttribute("data-one-spoiler") ? true : false;
    if (!spoilersBlock.querySelectorAll("._slide").length) {
      if (oneSpoiler && !spoilerTitle.classList.contains("_active")) {
        hideSpoilersBody(spoilersBlock);
      }
      spoilerTitle.classList.toggle("_active");
      _slideToggle(spoilerTitle.nextElementSibling, 500);
    }
    e.preventDefault();
  }
};
const hideSpoilersBody = (spoilersBlock) => {
  const spoilerActiveTitle = spoilersBlock.querySelector("[data-spoiler]._active");
  if (spoilerActiveTitle) {
    spoilerActiveTitle.classList.remove("_active");
    _slideUp(spoilerActiveTitle.nextElementSibling, 500);
  }
};

const initSpoilers = (spoilersArray, matchMedia = false) => {
  spoilersArray.forEach((spoilersBlock) => {
    spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
    if (matchMedia.matches || !matchMedia) {
      spoilersBlock.classList.add("_init");
      initSpoilerBody(spoilersBlock);
      spoilersBlock.addEventListener("click", setSpoilerAction);
    } else {
      spoilersBlock.classList.remove("_init");
      initSpoilerBody(spoilersBlock, false);
      spoilersBlock.removeEventListener("click", setSpoilerAction);
    }
  });
};

const spoilersArray = document.querySelectorAll("[data-spoilers]");
if (spoilersArray.length > 0) {
  const spoilersRegular = Array.from(spoilersArray).filter((item) => {
    return !item.dataset.spoilers;
  });

  if (spoilersRegular.length > 0) {
    initSpoilers(spoilersRegular);
  }

  const spoilersMedia = Array.from(spoilersArray).filter((item) => {
    return item.dataset.spoilers;
  });

  if (spoilersMedia.length > 0) {
    const breakpointsArray = [];
    spoilersMedia.forEach((item) => {
      const params = item.dataset.spoilers;
      const breakpoint = {};
      const paramsArray = params.split(", ");
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });

    let mediaQuaries = breakpointsArray.map((item) => {
      return `(${item.type}-width: ${item.value}px), ${item.value}, ${item.type}`;
    });

    mediaQuaries = mediaQuaries.filter((item, index, self) => {
      return self.indexOf(item) === index;
    });

    mediaQuaries.forEach((breakpoint) => {
      const paramsArray = breakpoint.split(", ");
      const mediaBreakpoint = paramsArray[1];
      const mediaType = paramsArray[2];
      const matchMedia = window.matchMedia(paramsArray[0]);

      const spoilersArray = breakpointsArray.filter((item) => {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true;
        }
      });
      matchMedia.addListener(() => {
        initSpoilers(spoilersArray, matchMedia);
      });
      initSpoilers(spoilersArray, matchMedia);
    });
  }
}
