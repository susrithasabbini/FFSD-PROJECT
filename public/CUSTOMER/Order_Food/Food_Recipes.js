

//<------------------------------swiper-------------------------------------------------------------------------------->
var swiper = new Swiper(".slide-content", {
    grabCursor: true,
    //mousewheel: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },

    breakpoints: {
        600: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        900: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
  });
//<--------------------------------swiper-------------------------------------------------------------------------------->
