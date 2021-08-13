// === Smooth scroll to ===============================================================================================================================================

const smoothScroll = (target, duration) => {
  const topOffset = document.querySelector('.header').offsetHeight;

  const targetPosition = target.getBoundingClientRect().top;

  const startPositon = window.pageYOffset;

  const distance = targetPosition - startPositon;

  let startTime = null;

  requestAnimationFrame(smoothScrollAnimation);
}

const smoothScrollers = document.querySelectorAll('[data-scroll_to]');
if (smoothScrollers.length > 0) {
  for (smoothScroller of smoothScrollers) {
    if (smoothScroller.dataset.data-scroll_to != '') {
      smoothScroller.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(smoothScroller.dataset.data-scroll_to);
        smoothScroll(target, 500);
      });
    } else {
      console.log('You must type selector in data-scroll_to');
    }
  }
}

// ====================================================================================================================================================================