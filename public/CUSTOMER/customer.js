const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("show");
});

const submenu = document.getElementById("submenu");
const cart = document.getElementById("cart");

function toggleMenu() {
  submenu.classList.toggle("open-menu");
}

function openNav() {
  cart.classList.toggle("open-cart");
}