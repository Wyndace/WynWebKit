import {scrollDisabling, scrollEnabling} from "./scrollDisabling.js";

const modalClose = (modal, enableScroll = true) => {
  modal.classList.remove("_active");
  if (enableScroll) {
    scrollEnabling(document.querySelector("body"), true);
  }
};

const modalOpen = (modal) => {
  if (modal) {
    const activeModal = document.querySelector("[data-modal-window]");
    if (activeModal && activeModal.classList.contains("_active")) {
      modalClose(activeModal, false);
    } else {
      scrollDisabling(document.querySelector("body"), true);
    }
  }
  modal.classList.add("_active");
  modal.addEventListener("click", function (e) {
    if (!e.target.closest("[data-modal-window_area]")) {
      modalClose(e.target.closest("[data-modal-window]"));
    }
  });
};

export default () => {
  const modalWindows = document.querySelectorAll("[data-modal-window]");
  console.log(modalWindows)
  if (modalWindows.length > 0) {
    for (let index = 0; index < modalWindows.length; index++) {
      const modalWindow = modalWindows[index];
      if (modalWindow.classList.contains("_active")) {
        scrollDisabling(document.querySelector("body"), true);
      }
    }
  }

  const modals = document.querySelectorAll("[data-modal]");
  if (modals.length > 0) {
    for (let index = 0; index < modals.length; index++) {
      const modal = modals[index];
      modal.addEventListener("click", function (e) {
        const modalName = modal.dataset.modal;
        const currentModal = document.querySelector(modalName);
        modalOpen(currentModal);
        e.preventDefault();
      });
    }
  }

  const modalClosingItems = document.querySelectorAll("[data-modal-window_close]");
  if (modalClosingItems.length > 0) {
    for (let index = 0; index < modalClosingItems.length; index++) {
      const modalClosingItem = modalClosingItems[index];
      modalClosingItem.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(modalClosingItem.closest("[data-modal-window]"));
        modalClose(modalClosingItem.closest("[data-modal-window]"));
      });
    }
  }
}