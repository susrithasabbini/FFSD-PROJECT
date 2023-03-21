

var swiper = new Swiper(".slide-content", {
    grabCursor: true,
    //mousewheel: true,
    slidesPerView : 1,
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
    },
    loop :true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    });