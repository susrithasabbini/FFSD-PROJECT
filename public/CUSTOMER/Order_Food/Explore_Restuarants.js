

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
        400: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        600: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        800: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1000: {
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

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', filterRestaurants);

function filterRestaurants() {
  // Get the search query
  const query = searchInput.value.trim().toLowerCase();

  // Get all restaurant cards
  const cards = document.querySelectorAll('.restuarants-wrapper .card');

  // Loop through each card and check if it matches the search query
  cards.forEach((card) => {
    const name = card.querySelector('.card-title').textContent.toLowerCase();
    const type = card.querySelector('p').textContent.toLowerCase();
    if (name.includes(query) || type.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

filterRestaurants();