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



const announcementContainer = document.querySelector('.announcement-container');
const announcementItems = document.querySelectorAll('.announcement-item');

let animationInterval;

function animateAnnouncements() {
  let currentItemIndex = 0;

  animationInterval = setInterval(() => {
    const currentItem = announcementItems[currentItemIndex];

    if (currentItem) {
      currentItem.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
      currentItem.style.transform = 'translateY(-100%)';
      currentItem.style.opacity = '0';

      setTimeout(() => {
        currentItem.style.transition = 'none';
        currentItem.style.transform = 'translateY(0)';
        currentItem.style.opacity = '1';
        announcementContainer.appendChild(currentItem);
      }, 300); 

      currentItemIndex = (currentItemIndex + 1) % announcementItems.length;
    }
  }, 3000);
}

animateAnnouncements();

const microphoneIcon = document.getElementById('microphone-icon');
let clockwise = true;
let currentRotation = 0;
let isPulsating = false;

function animateMicrophoneIcon() {
  // Pulsating effect
  if (!isPulsating) {
    microphoneIcon.style.transform = 'scale(1.1)';
    isPulsating = true;
  } else {
    microphoneIcon.style.transform = 'scale(1)';
    isPulsating = false;
  }

  // Rotating motion
  if (clockwise) {
    currentRotation += 5;
  } else {
    currentRotation -= 5;
  }

  // Apply the rotation to the icon
  microphoneIcon.style.transform += `rotate(${currentRotation}deg)`;

  // Toggle direction when reaching 5% in either direction
  if (Math.abs(currentRotation) >= 5) {
    clockwise = !clockwise;
  }
}

setInterval(animateMicrophoneIcon, 200); // Adjust the interval for the animation




