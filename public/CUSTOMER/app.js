const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("show");
});


const main = document.querySelector(".main");
const scrollLink = document.querySelectorAll(".navbar a:not(:last-child)");

const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  setTimeout(() => {
    main.style.display="flex";
    preloader.style.display = "none";
  }, 2000);
});