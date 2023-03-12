

//<------------------------------function for onclick changes for filter buttons----------------------------------------------------->
function filter(id){
  let element = document.getElementById(id);
  if(element.className=="btn filters"){
    element.className="btn selected";
    element.lastChild.style.display="inline-block";
  }
  else if(element.className=="btn selected"){
    element.className="btn filters";
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
        600: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        900: {
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



//<------------------------------temparory static data for food items----------------------------------------------------->
foodItems=[
  {image:"/CUSTOMER/Order_Food/images/biryani.jpeg",name:"Biryani"},
  {image:"/CUSTOMER/Order_Food/images/pizza.jpeg",name:"Pizza"},
  {image:"/CUSTOMER/Order_Food/images/chicken.jpeg",name:"Chicken"},
  {image:"/CUSTOMER/Order_Food/images/biryani.jpeg",name:"Rolls"},
  {image:"/CUSTOMER/Order_Food/images/pizza.jpeg",name:"Cakes"},
  {image:"/CUSTOMER/Order_Food/images/chicken.jpeg",name:"Fried Rice"},
  {image:"/CUSTOMER/Order_Food/images/biryani.jpeg",name:"Thali"},
  {image:"/CUSTOMER/Order_Food/images/pizza.jpeg",name:"Burger"},
  {image:"/CUSTOMER/Order_Food/images/chicken.jpeg",name:"Ice Cream"}
]
//<------------------------------temparory static data for food items----------------------------------------------------->



//<------------------------------displaying food item cards in swiper----------------------------------------------------->
document.getElementById("sw").innerHTML=foodItems.map(item=>
  `<div class="card swiper-slide">
      <img class="card-img-top" src="${item.image}" alt="Card image" width="100px" height="150px">
      <h5 class="card-title">${item.name}</h5>
  </div>`
).join('');
//<------------------------------displaying food item cards in swiper----------------------------------------------------->



//<------------------------------temporary static data for restuarants----------------------------------------------------->
restuarants=[
  {image:"/Login/images/login_image_2.png",name:"Hotel Hungrezy",type:"Biryani, Chinese ,Fast Food",rating:"5",time:"15 MIN",cost:"Rs100 for one"},
  {image:"/Login/images/login_image_2.png",name:"Hotel Hungrezy",type:"Biryani, Chinese ,Fast Food",rating:"5",time:"15 MIN",cost:"Rs100 for one"},
  {image:"/Login/images/login_image_2.png",name:"Hotel Hungrezy",type:"Biryani, Chinese ,Fast Food",rating:"5",time:"15 MIN",cost:"Rs100 for one"},
  {image:"/Login/images/login_image_2.png",name:"Hotel Hungrezy",type:"Biryani, Chinese ,Fast Food",rating:"5",time:"15 MIN",cost:"Rs100 for one"},
  {image:"/Login/images/login_image_2.png",name:"Hotel Hungrezy",type:"Biryani, Chinese ,Fast Food",rating:"5",time:"15 MIN",cost:"Rs100 for one"},
  {image:"/Login/images/login_image_2.png",name:"Hotel Hungrezy",type:"Biryani, Chinese ,Fast Food",rating:"5",time:"15 MIN",cost:"Rs100 for one"},
  {image:"/Login/images/login_image_2.png",name:"Hotel Hungrezy",type:"Biryani, Chinese ,Fast Food",rating:"5",time:"15 MIN",cost:"Rs100 for one"},
  {image:"/Login/images/login_image_2.png",name:"Hotel Hungrezy",type:"Biryani, Chinese ,Fast Food",rating:"5",time:"15 MIN",cost:"Rs100 for one"},
  {image:"/Login/images/login_image_2.png",name:"Hotel Hungrezy",type:"Biryani, Chinese ,Fast Food",rating:"5",time:"15 MIN",cost:"Rs100 for one"},
  {image:"/Login/images/login_image_2.png",name:"Hotel Hungrezy",type:"Biryani, Chinese ,Fast Food",rating:"5",time:"15 MIN",cost:"Rs100 for one"},
  {image:"/Login/images/login_image_2.png",name:"Hotel Hungrezy",type:"Biryani, Chinese ,Fast Food",rating:"5",time:"15 MIN",cost:"Rs100 for one"},
  {image:"/Login/images/login_image_2.png",name:"Hotel Hungrezy",type:"Biryani, Chinese ,Fast Food",rating:"5",time:"15 MIN",cost:"Rs100 for one"},
]
//<------------------------------displaying food item cards in swiper----------------------------------------------------->




//<------------------------------displaying restuarant cards in grid----------------------------------------------------->
document.querySelector(".restuarants-wrapper").innerHTML=restuarants.map(restuarant=>

  `<div class="card" style="width:300px;">
                <div class="card-body">
                    <img class="card-img-top" src="${restuarant.image}" alt="Card image">
                    <div class="card-img-overlay">
                        <p class="offers">Flat 20% OFF</p>
                    </div>
                    <div class="restuarant-data">
                       <h4 class="card-title mt-1">${restuarant.name}</h4>
                       <p>${restuarant.type}</p>
                       <hr>
                       <div class="data">
                            <p class="badge bg-success">${restuarant.rating}<i class="fa fa-star fa-xs"></i></p>
                            <p class="badge">${restuarant.time}</p>
                            <p class="badge">${restuarant.cost}</p>
                       </div>
                    </div>
                </div>
              </div>`
  
).join('');
//<------------------------------displaying restuarant cards in grid----------------------------------------------------->