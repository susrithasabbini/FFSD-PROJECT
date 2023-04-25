
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
  const cards = document.querySelectorAll('.link');

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
const originalCards = cardsWrapper.querySelectorAll('.link');

let filteredCards = Array.from(originalCards);

const f1 = document.getElementById('f1');
f1.addEventListener('click', () => {
  f1.classList.toggle('selected');
  filteredCards = Array.from(originalCards).filter((card) => {
    const type = card.querySelector('#type').textContent.toLowerCase();
    return f1.classList.contains('selected') ? type.includes('veg') : true;
  });
  displayCards();
  if (f1.classList.contains('selected')) {
    f1.lastChild.style.display = "inline-block";
  } else {
    f1.lastChild.style.display = "none";
  }
});

const f2 = document.getElementById('f2');
f2.addEventListener('click', () => {
  f2.classList.toggle('selected');
  f2.lastChild.style.display = f2.lastChild.style.display === 'none' ? 'inline-block' : 'none';
  filteredCards = Array.from(originalCards).filter((card) => {
    const time = parseInt(card.querySelector('#time').textContent);
    return f2.classList.contains('selected') ? time < 30 : true;
  });
  displayCards();
  if (f2.classList.contains('selected')) {
    f2.lastChild.style.display = "inline-block";
  } else {
    f2.lastChild.style.display = "none";
  }
});

const f3 = document.getElementById('f3');
f3.addEventListener('click', () => {
  f3.classList.toggle('selected');
  filteredCards = Array.from(originalCards).filter((card) => {
    const rating = parseFloat(card.querySelector('#rating').textContent);
    return f3.classList.contains('selected') ? rating > 4 : true;
  });
  displayCards();
  if (f3.classList.contains('selected')) {
    f3.lastChild.style.display = "inline-block";
  } else {
    f3.lastChild.style.display = "none";
  }
});

const sortSelect = document.getElementById('sort');
sortSelect.addEventListener('change', () => {
  if(sortSelect.value === 'Rating') {
    filteredCards.sort((a, b) => {
      const ratingA = parseFloat(a.querySelector('#rating').textContent);
      const ratingB = parseFloat(b.querySelector('#rating').textContent);
      return ratingB - ratingA;
    });
  } else if(sortSelect.value === 'Delivery Time') {
    filteredCards.sort((a, b) => {
      const timeA = parseInt(a.querySelector('#time').textContent);
      const timeB = parseInt(b.querySelector('#time').textContent);
      return timeA - timeB;
    });
  } else if(sortSelect.value === 'Cost') {
    filteredCards.sort((a, b) => {
      const costA = parseInt(a.querySelector('#cost').textContent.replace('Rs ', ''));
      const costB = parseInt(b.querySelector('#cost').textContent.replace('Rs ', ''));
      return costA - costB;
    });
  }
  displayCards();
});

function displayCards() {
  let displayCards = filteredCards.filter((card) => {
    const type = card.querySelector('#type').textContent.toLowerCase();
    const time = parseInt(card.querySelector('#time').textContent);
    const rating = parseFloat(card.querySelector('#rating').textContent);

    let showCard = true;

    // Filter based on selected filters
    if (f1.classList.contains('selected') && !type.includes('veg')) {
      showCard = false;
    }

    if (f2.classList.contains('selected') && time >= 30) {
      showCard = false;
    }

    if (f3.classList.contains('selected') && rating <= 4) {
      showCard = false;
    }

    return showCard;
  });

  // Sort based on selected sort option
  if(sortSelect.value === 'Rating') {
    displayCards.sort((a, b) => {
      const ratingA = parseFloat(a.querySelector('#rating').textContent);
      const ratingB = parseFloat(b.querySelector('#rating').textContent);
      return ratingB - ratingA;
    });
  } else if(sortSelect.value === 'Delivery Time') {
    displayCards.sort((a, b) => {
      const timeA = parseInt(a.querySelector('#time').textContent);
      const timeB = parseInt(b.querySelector('#time').textContent);
      return timeA - timeB;
    });
  } else if(sortSelect.value === 'Cost') {
    displayCards.sort((a, b) => {
      const costA = parseInt(a.querySelector('#cost').textContent.replace('Rs ', ''));
      const costB = parseInt(b.querySelector('#cost').textContent.replace('Rs ', ''));
      return costA - costB;
    });
  }

  cardsWrapper.innerHTML = '';
  displayCards.forEach((card) => {
    cardsWrapper.appendChild(card);
  });
}
