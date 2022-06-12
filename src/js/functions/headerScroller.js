// ==== Header Scroller ===================================================================================================================================================

const headerElement = document.querySelector('.header');
const detectingScroll = function (entries) {
    console.log(entries)
    if (entries[0].isIntersecting) {
        headerElement.classList.remove('_scroll');
    } else {
        headerElement.classList.add('_scroll');
    }
};

const headerObserver = new IntersectionObserver(detectingScroll)
headerObserver.observe(headerElement)

// ====================================================================================================================================================================
