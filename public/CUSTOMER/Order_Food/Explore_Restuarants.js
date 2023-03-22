

//<------------------------------function for onclick changes for filter buttons----------------------------------------------------->
function filter(id){
  let element = document.getElementById(id);
  if(element.className==" filters"){
    element.className=" selected";
    element.lastChild.style.display="inline-block";
  }
  else if(element.className==" selected"){
    element.className=" filters";
    element.lastChild.style.display="none";
  }
}
//<------------------------------function for onclick changes for filter buttons----------------------------------------------------->




//<------------------------------swiper-------------------------------------------------------------------------------->
var swiper = new Swiper(".slide-content", {
    grabCursor: true,
    //mousewheel: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        600: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        900: {
          slidesPerView: 5,
          spaceBetween: 40,
        },
        1200: {
          slidesPerView: 6,
          spaceBetween: 40,
        },
      },
  });
//<--------------------------------swiper-------------------------------------------------------------------------------->
