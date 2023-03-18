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
  {image:"/Login/images/login_image_2.png",name:"Hotel Hungrezy",type:"Biryani, Chinese ,Fast Food",rating:"5",time:"15 MIN",cost:"Rs100 for one",location:"Sricity"},
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

const recomended = [
    {image:"/CUSTOMER/Order_Food/images/biryani.jpeg",name:"Biryani",cost:"100",description:"serves 1",type:"nonveg"},
    {image:"/CUSTOMER/Order_Food/images/pizza.jpeg",name:"Pizza",cost:"50",description:"serves 1",type:"veg"},
    {image:"/CUSTOMER/Order_Food/images/chicken.jpeg",name:"Chicken",cost:"100",description:"serves 2",type:"nonveg"},
    {image:"/CUSTOMER/Order_Food/images/biryani.jpeg",name:"Thali",cost:"80",description:"serves 1",type:"veg"},
    {image:"/CUSTOMER/Order_Food/images/pizza.jpeg",name:"Burger",cost:"40",description:"serves 1",type:"veg"},
    {image:"/CUSTOMER/Order_Food/images/chicken.jpeg",name:"Ice Cream",cost:"20",description:"serves 1",type:"veg"}
]

const Menu = [
    {
        categoryName : "Chicken",
        items : [
            {image:"/CUSTOMER/Order_Food/images/chicken.jpeg",name:"Chicken",cost:"100",description:"serves 2",type:"nonveg"},
            {image:"/CUSTOMER/Order_Food/images/biryani.jpeg",name:"Biryani",cost:"100",description:"serves 1",type:"nonveg"},
            {image:"/CUSTOMER/Order_Food/images/chicken.jpeg",name:"Fried Rice",cost:"60",description:"serves 1",type:"nonveg"},
        ]
    },

    {
        categoryName : "Bakery",
        items : [
            {image:"/CUSTOMER/Order_Food/images/pizza.jpeg",name:"Cakes",cost:"120",description:"serves 4",type:"nonveg"},
            {image:"/CUSTOMER/Order_Food/images/chicken.jpeg",name:"Ice Cream",cost:"20",description:"serves 1",type:"veg"},
            {image:"/CUSTOMER/Order_Food/images/biryani.jpeg",name:"Rolls",cost:"10",description:"serves 1",type:"veg"},
        ]
    },

    {
        categoryName : "Pizza",
        items : [
            {image:"/CUSTOMER/Order_Food/images/pizza.jpeg",name:"Pizza",cost:"50",description:"serves 1",type:"veg"},
            {image:"/CUSTOMER/Order_Food/images/pizza.jpeg",name:"Burger",cost:"40",description:"serves 1",type:"veg"},
        ]
    }
]

// *** GET Routes - display pages ***
// Root Route

app.get('/', function (req, res) {
    const pageTitle = "Hungrezy";
    res.render('pages/index',{pageTitle : pageTitle});

});

app.get('/Restuarants', function (req, res) {
    const pageTitle = "Restuarants";
    res.render('pages/Explore_Restuarants',{foodItems : foodItems,restuarants : restuarants,pageTitle : pageTitle});

});


app.get('/Menu', function (req, res) {
    const pageTitle = "Menu";
    res.render('pages/Restuarant_Menu',{Restuarant: restuarants[0],recomended : recomended,Menu : Menu});

});

app.get("/magic", function (req, res) {
    res.render("magic");
  });


