const body = document.getElementsByTagName("body")[0];
const preloader = document.querySelector(".preloader");


window.addEventListener("load", () => {
  setTimeout(() => {
    body.style.display="block";
    preloader.style.display = "none";
  }, 2000);
});