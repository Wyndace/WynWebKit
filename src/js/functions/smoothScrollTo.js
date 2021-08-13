// === Smooth scroll to ===============================================================================================================================================

const smoothScroll = (target, duration) => {
  const topOffset = document.querySelector('.header').offsetHeight;

  const targetPosition = target.getBoundingClientRect().top;

  const startPositon = window.pageYOffset;

  const distance = targetPosition - startPositon;

  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    let timeElapsed = currentTime - startTime;
    let run = ease(timeElapsed, startPositon, distance, duration);
    console.log(run)
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation)
  };

  const ease = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// ====================================================================================================================================================================