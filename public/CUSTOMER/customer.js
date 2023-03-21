const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("show");
});

const header = document.querySelector(".header");
const scrollLink = document.querySelectorAll(".navbar a:not(:last-child)");

const preloader = document.querySelector(".preloader");

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

let submenu = document.getElementById("submenu");
let cart = document.getElementById("cart");

function toggleMenu() {
  submenu.classList.toggle("open-menu");
}

function openNav() {
  cart.classList.toggle("open-cart");
}