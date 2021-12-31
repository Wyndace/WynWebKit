const smoothScroll = (target, duration) => {
  const topOffset = getComputedStyle(document.querySelector('.header')).position == 'fixed' || getComputedStyle(document.querySelector('.header')).position == 'sticky' ? document.querySelector('.header').offsetHeight : 0;

  console.log(target);

  const targetPosition = target.getBoundingClientRect().top + window.scrollY;

  const startPositon = window.pageYOffset;

  const distance = targetPosition - startPositon - topOffset;

  let startTime = null;

  const SmoothScrollAnim = (currentTime) => smoothScrollAnimation(currentTime, distance, duration, startTime, startPositon);

  requestAnimationFrame(SmoothScrollAnim);
}

const smoothScrollers = document.querySelectorAll('[data-scroll_to]');
if (smoothScrollers.length > 0) {
  smoothScrollers.forEach((smoothScroller) => {
    if (smoothScroller.dataset.scroll_to != '') {
      smoothScroller.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(smoothScroller.dataset.scroll_to);
        smoothScroll(target, 1000);
        console.log(target);
      });
    } else {
      console.log('You must type selector in data-scroll_to');
    }
  });
}