
const main = document.querySelector(".main");


const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  setTimeout(() => {
    main.style.display="flex";
    preloader.style.display = "none";
  }, 2000);
});



const header = document.querySelector(".header");


window.addEventListener("load", () => {
  setTimeout(() => {
    header.style.display="flex";
    preloader.style.display = "none";
  }, 2000);
});

var swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  spaceBetween: 100,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const addcart = document.querySelector(".addcart");

addcart.addEventListener("click", () => {
  alert("hi");
});