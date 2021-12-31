
const sliders = document.querySelectorAll("[data-slider]");
const SlidersButtons = document.querySelectorAll("[data-slider_button]");

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
        speed: sliderOptions.speed,
        initialSlide: sliderOptions.initialSlide,
        effect: sliderOptions.effect,
        enabled: sliderOptions.enabled,
        centeredSlides: sliderOptions.centeredSlides,
        direction: sliderOptions.direction,
        loop: sliderOptions.loop,
        slidesPerView: sliderOptions.slidesPerView,

        autoplay: sliderOptions.autoplay == true ? {delay: sliderOptions.apDelay} : sliderOptions.autoplay,

        navigation: slider.querySelector('[data-slider_button]') != null ? {
          nextEl: "[data-slider_button='next']",
          prevEl: "[data-slider_button='prev']",
        } : false,
        
        pagination: slider.querySelector('[data-slider_pagination]') != null ? {
          el: '[data-slider_pagination]',
          type: slider.querySelector('[data-slider_pagination]').dataset.slider_pagination.split(', ')[0],
          clickable: parseBoolean(slider.querySelector('[data-slider_pagination]').dataset.slider_pagination.split(', ')[1]),
          dynamicBullets: parseBoolean(slider.querySelector('[data-slider_pagination]').dataset.slider_pagination.split(', ')[2]),
          dynamicMainBullets: parseInt(slider.querySelector('[data-slider_pagination]').dataset.slider_pagination.split(', ')[3])
        } : false,

        scrollbar: slider.querySelector('[data-slider_scrollbar]') != null ? {
          el: '[data-slider_scrollbar]',
          draggable: parseBoolean(slider.querySelector('[data-slider_scrollbar]').dataset.slider_scrollbar)
        } : false,
      });
    } else new Swiper(slider);
  });
}