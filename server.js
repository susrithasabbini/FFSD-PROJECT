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
    {image:"/CUSTOMER/Order_Food/images/rolls.jpeg",name:"Rolls"},
    {image:"/CUSTOMER/Order_Food/images/cakes.jpeg",name:"Cakes"},
    {image:"/CUSTOMER/Order_Food/images/friedrice.jpeg",name:"Fried Rice"},
    {image:"/CUSTOMER/Order_Food/images/thali.jpeg",name:"Thali"},
    {image:"/CUSTOMER/Order_Food/images/burger.jpeg",name:"Burger"},
    {image:"/CUSTOMER/Order_Food/images/icecream.jpeg",name:"Ice Cream"}
]
//<------------------------------temparory static data for food items----------------------------------------------------->
//<------------------------------temporary static data for restuarants----------------------------------------------------->
const restuarants=[
  {image:"/CUSTOMER/Order_Food/images/chickenbiriyani.jpeg",name:"Hotel Rajadhani",type:"Biryani, Chinese ,Fast Food",rating:"5",time:"15 MIN",cost:"Rs100 for one",location:"Sricity",offer:"30%"},
  {image:"/CUSTOMER/Order_Food/images/chickenshawarma.jpeg",name:"Hotel MG Grand",type:"Biryani, Chinese ,Fast Food",rating:"4.8",time:"21 MIN",cost:"Rs200 for one",location:"Chennai",offer:"20%"},
  {image:"/CUSTOMER/Order_Food/images/muttoncurry.jpeg",name:"Hotel Abhiruchi",type:"Biryani, Chinese ,Fast Food",rating:"4.6",time:"19 MIN",cost:"Rs300 for one",location:"Tada",offer:"25%"},
  {image:"/CUSTOMER/Order_Food/images/muttoncurry.jpeg",name:"Hotel Manasa",type:"Biryani, Chinese ,Fast Food",rating:"5",time:"18 MIN",cost:"Rs190 for one",location:"Sullurpeta",offer:"35%"},
  {image:"/CUSTOMER/Order_Food/images/fishfry.jpeg",name:"The Indian Grill",type:"Biryani, Chinese ,Fast Food",rating:"4",time:"17 MIN",cost:"Rs320 for one",location:"Akkampeta",offer:"10%"},
  {image:"/CUSTOMER/Order_Food/images/chickenbiriyani.jpeg",name:"Hotel Paradise",type:"Biryani, Chinese ,Fast Food",rating:"3.8",time:"27 MIN",cost:"Rs176 for one",location:"Gummadipundi",offer:"25%"},
  {image:"/CUSTOMER/Order_Food/images/chickenshawarma.jpeg",name:"Hotel Bawarchi",type:"Biryani, Chinese ,Fast Food",rating:"5",time:"31 MIN",cost:"Rs450 for one",location:"Ponneri",offer:"20%"},
  {image:"/CUSTOMER/Order_Food/images/muttoncurry.jpeg",name:"Hotel Platform 65",type:"Biryani, Chinese ,Fast Food",rating:"3.9",time:"35 MIN",cost:"Rs210 for one",location:"Arambakam",offer:"29%"},
  {image:"/CUSTOMER/Order_Food/images/chickenmandibiriyani.jpeg",name:"Hotel Sweet Magic",type:"Biryani, Chinese ,Fast Food",rating:"4.9",time:"16 MIN",cost:"Rs199 for one",location:"Tirupati",offer:"32%"},
  {image:"/CUSTOMER/Order_Food/images/fishfry.jpeg",name:"Hotel 7 Hills",type:"Biryani, Chinese ,Fast Food",rating:"4.2",time:"41 MIN",cost:"Rs299 for one",location:"Kalahasti",offer:"25%"},
  {image:"/CUSTOMER/Order_Food/images/chickentandoori.jpeg",name:"Hotel Spice Gardens",type:"Biryani, Chinese ,Fast Food",rating:"4",time:"23 MIN",cost:"Rs399 for one",location:"Gudur",offer:"32%"},
  {image:"/CUSTOMER/Order_Food/images/muttoncurry.jpeg",name:"Hotel Swarnamukhi",type:"Biryani, Chinese ,Fast Food",rating:"4.2",time:"51 MIN",cost:"Rs1000 for one",location:"Naidupeta",offer:"29%"},
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

app.get('/Recipes', function (req, res) {
    const pageTitle = "Recipes";
    res.render('pages/Food_Recipes');
});

app.get("/magic", function (req, res) {
    res.render("magic");
  });


