

//<------------------------------swiper-------------------------------------------------------------------------------->
var swiper = new Swiper(".slide-content", {
    grabCursor: true,
    //mousewheel: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },

    breakpoints: {
        600: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        900: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
  });
//<--------------------------------swiper-------------------------------------------------------------------------------->



document.addEventListener("DOMContentLoaded", function () {
  const loadMoreButton = document.getElementById("loadMoreButton");
  let page = 1; // Track the current page of recipes
  const displayedRecipes = []; // Keep track of displayed recipes

  loadMoreButton.addEventListener("click", function () {
      page++; // Increment the page number

      const xhr = new XMLHttpRequest();
      xhr.open("GET", `/getMoreRecipes?page=${page}`, true);
      xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                  const newRecipes = JSON.parse(xhr.responseText);
                  appendNewRecipes(newRecipes);
              } else {
                  console.error("Error fetching more recipes.");
              }
          }
      };
      xhr.send();
  });

  function appendNewRecipes(recipes) {
      const recipesWrapper = document.querySelector(".recipes-wrapper");

      recipes.forEach((item) => {
          // Check if the recipe has not been displayed already
          console.log(item.recipe.name.toLowerCase().split(' ').join(''))
          if (!displayedRecipes.includes(item.recipe.recipeID)) {
              const recipeCard = document.createElement("div");
              recipeCard.className = "food-card swiper-slide fc2";
              recipeCard.innerHTML = `
                  <img src=${'/CUSTOMER/Order_Food/images/'+item.recipe.name.toLowerCase().split(' ').join('')+'.jpeg'} alt="">
                  <div class="food-content middle">
                      <h1><strong>${item.recipe.name}</strong></h1>
                      <p>${item.recipe.description}</p>
                      <a href="/View_Recipe?id=${item.recipe.recipeID}"><button>View Recipe</button></a>
                  </div>`;
              recipesWrapper.appendChild(recipeCard);

              // Add the displayed recipe to the list
              displayedRecipes.push(item.recipe.recipeID);
          }
      });
  }
});


