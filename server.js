// Load Node modules
var express = require('express');
const ejs = require('ejs');
// Initialise Express
var app = express();
// Render static files
app.use(express.static('public'));
// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', 'views')


// Port website will run on
app.listen(8080);


//<------------------------------temparory static data for food items----------------------------------------------------->
const foodItems=[
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
//<------------------------------temporary static data for restuarants----------------------------------------------------->
const restuarants=[
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

// *** GET Routes - display pages ***
// Root Route
app.get('/Restuarants', function (req, res) {
    const pageTitle = "Restuarants";
    res.render('pages/Explore_Restuarants',{foodItems : foodItems,restuarants : restuarants,pageTitle : pageTitle});

});


app.get('/', function (req, res) {
    const pageTitle = "Hungrezy";
    res.render('pages/index',{pageTitle : pageTitle});

});

app.get("/magic", function (req, res) {
    res.render("magic");
  });


