// import Swiper from 'swiper/bundle';

// Swiper.use([Navigation, Pagination]);

const sliders = document.querySelectorAll("[data-slider]");
const SlidersButtons = document.querySelectorAll("[data-sliderButton]");

// const initSliderButton = (btn) => {
//   type = btn.dataset.sliderbutton;
//   console.log(type);

//   if (type === 'next') btn.addEventListener('click', () => btn.closest('[data-slider]').swiper.slideNext())
//   else if (type === 'prev') btn.addEventListener('click', () => btn.closest('[data-slider]').swiper.slidePrev())
// }

if (sliders.length > 0) {   
  sliders.forEach((slider) => {
    if (slider.dataset.slider != "") {
      let optionsArray = slider.dataset.slider.split(", ");
      let sliderOptions = {
        direction: optionsArray[0],
        initialSlide: parseInt(optionsArray[1]),
        slidesPerView: parseInt(optionsArray[2]),
        effect: optionsArray[3],
        speed: parseInt(optionsArray[4]),
        enabled: parseBoolean(optionsArray[5]),
        centeredSlides: parseBoolean(optionsArray[6]),
        loop: parseBoolean(optionsArray[7]),
        autoplay: parseBoolean(optionsArray[8]),
        apDelay: parseInt(optionsArray[9]),
      };

      const swiper = new Swiper(slider, {
        // modules: [Navigation, Pagination],
        speed: sliderOptions.speed,
        initialSlide: sliderOptions.initialSlide,
        effect: sliderOptions.effect,
        enabled: sliderOptions.enabled,
        centeredSlides: sliderOptions.centeredSlides,
        direction: sliderOptions.direction,
        loop: sliderOptions.loop,
        slidesPerView: sliderOptions.slidesPerView,

        autoplay: sliderOptions.autoplay == true ? {delay: sliderOptions.apDelay} : sliderOptions.autoplay,

        navigation: slider.querySelector('[data-sliderButton]') != null ? {
          nextEl: "[data-sliderButton='next']",
          prevEl: "[data-sliderButton='prev']",
        } : false,
        
        pagination: slider.querySelector('[data-sliderPagination]') != null ? {
          el: '[data-sliderPagination]',
          type: slider.querySelector('[data-sliderPagination]').dataset.sliderpagination.split(', ')[0],
          clickable: parseBoolean(slider.querySelector('[data-sliderPagination]').dataset.sliderpagination.split(', ')[1]),
          dynamicBullets: parseBoolean(slider.querySelector('[data-sliderPagination]').dataset.sliderpagination.split(', ')[2]),
          dynamicMainBullets: parseInt(slider.querySelector('[data-sliderPagination]').dataset.sliderpagination.split(', ')[3])
        } : false,

        scrollbar: slider.querySelector('[data-sliderScrollbar]') != null ? {
          el: '[data-sliderScrollbar]',
          draggable: parseBoolean(slider.querySelector('[data-sliderScrollbar]').dataset.sliderscrollbar)
        } : false,
      });
    } else new Swiper(slider);
  });
}

// SlidersButtons.forEach((btn) => {
//   if (btn.dataset.sliderbutton != "") {
//     initSliderButton(btn);
//   }
// });
