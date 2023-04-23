const container = document.querySelector(".login-container");
const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  setTimeout(() => {
    container.style.display="block";
    preloader.style.display = "none";
  }, 2000);
});