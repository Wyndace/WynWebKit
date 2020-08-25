$(document).ready(function () {
    $(".menu-btn").on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass("menu-btn__active");
        $(".burger").toggleClass("active");
    });

    $(".big-slider").slick({
        infinite: true,
        speed: 1000,
        slidesToScroll: 1,
        initialSlide: 1,
        centerMode: true,
        autoplay: true,
        autoplaySpeed: 3000,
        variableWidth: true,
    });

    $("#popularProducts_slider").slick({
        infinite: true,
        speed: 2000,
        slidesToScroll: 5,
        slidesToShow: 5,
        autoplay: true,
        autoplaySpeed: 4000,
        appendArrows: $("#popular"),
    });

    $("#featuredProducts_slider").slick({
        infinite: true,
        speed: 2000,
        slidesToScroll: 5,
        slidesToShow: 5,
        autoplay: true,
        autoplaySpeed: 4000,
        appendArrows: $("#featured"),
    });

    $("#DOTD_slider").slick({
        infinite: true,
        speed: 2000,
        slidesToScroll: 4,
        slidesToShow: 4,
        autoplay: true,
        autoplaySpeed: 4000,

        variableWidth: true,
    });
});