
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
    const type = card.querySelector('#type').textContent.toLowerCase();
    if (name.includes(query) || type.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

filterRestaurants();

//<---------------------------------function for onclick changes for filter buttons----------------------------------------------------->
// Get the Pure Veg filter button element


const cardsWrapper = document.querySelector('.restuarants-wrapper');
const originalCards = cardsWrapper.querySelectorAll('.card');

let vegCards = Array.from(originalCards);
let sortedCards = Array.from(originalCards);
let ratingCards = Array.from(originalCards);

const f1 = document.getElementById('f1');

f1.addEventListener('click', () => {
  if(f1.className==" filters"){
    f1.className=" selected";
    f1.lastChild.style.display="inline-block";
    vegCards = Array.from(originalCards).filter((card) => {
      const type = card.querySelector('#type').textContent.toLowerCase();
      return type.includes("veg");
    });
  }
  else if(f1.className==" selected"){
    f1.className=" filters";
    f1.lastChild.style.display="none";
    vegCards = Array.from(originalCards);
  }
  displayCards();
});

const f2 = document.getElementById('f2');

f2.addEventListener('click', () => {
  if (f2.className === " filters") {
    f2.className = " selected";
    f2.lastChild.style.display = "inline-block";
    sortedCards = Array.from(originalCards).sort((a, b) => {
      const timeA = parseInt(a.querySelector('#time').textContent);
      const timeB = parseInt(b.querySelector('#time').textContent);
      return timeA - timeB;
    });
  } else if (f2.className === " selected") {
    f2.className = " filters";
    f2.lastChild.style.display = "none";
    sortedCards = Array.from(originalCards);
  }
  displayCards();
});

const f3 = document.getElementById('f3');

f3.addEventListener('click', () => {
  if(f3.className==" filters"){
    f3.className=" selected";
    f3.lastChild.style.display="inline-block";
    ratingCards = Array.from(originalCards).filter((card) => {
      const rating = parseFloat(card.querySelector('#rating').textContent);
      return rating > 4;
    });
  }
  else if(f3.className==" selected"){
    f3.className=" filters";
    f3.lastChild.style.display="none";
    ratingCards = Array.from(originalCards);
  }
  displayCards();
});

function displayCards() {
  let displayCards = vegCards.filter((card) => sortedCards.includes(card) && ratingCards.includes(card));
  cardsWrapper.innerHTML = '';
  displayCards.forEach((card) => {
    cardsWrapper.appendChild(card);
  });
}
