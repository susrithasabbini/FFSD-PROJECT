const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("show");
});

const submenu = document.getElementById("submenu");
const cart = document.getElementById("cart");

function toggleMenu() {
  submenu.classList.add("open-menu");
}

function closeMenu() {
  submenu.classList.remove("open-menu");
}

function openNav() {
  cart.classList.toggle("open-cart");
}

document.addEventListener("DOMContentLoaded", function(){

  let el_autohide = document.querySelector('.autohide');
  
  // add padding-top to bady (if necessary)
  
  if(el_autohide){
    var last_scroll_top = 0;
    window.addEventListener('scroll', function() {
          let scroll_top = window.scrollY;
         if(scroll_top < last_scroll_top) {
              el_autohide.classList.remove('scrolled-down');
              el_autohide.classList.add('scrolled-up');
          }
          else {
              el_autohide.classList.remove('scrolled-up');
              el_autohide.classList.add('scrolled-down');
          }
          last_scroll_top = scroll_top;
    }); 
    // window.addEventListener
  }

});