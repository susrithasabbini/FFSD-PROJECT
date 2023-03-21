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

const chickenRecipes = [
    {name : "Chicken",image: "/CUSTOMER/Order_Food/images/chickencurry.jpeg",description : "Crispy & flavorful Chilli Chicken, made with chicken marinated in chinese sauces, fried till crispy, sautéed with onions, peppers&sauces."},
    {name : "Tandoori",image: "/CUSTOMER/Order_Food/images/chickentandoori.jpeg",description : "Skinless legs and thighs are marinated in a tenderizing mixture of yogurt, lemon juice, and spices and the meat is slashed to the bone in several places helping the marinade penetrate and the chicken cook more quickly."},
    {name : "Kebab",image: "/CUSTOMER/Order_Food/images/chickenkebab.jpeg",description : "a dish consisting of small pieces of meat, tomatoes, onions, etc, threaded onto skewers and grilled, generally over charcoal. Also called: shish kebab, kabob, cabob."},
    {name : "Chicken",image: "/CUSTOMER/Order_Food/images/chickencurry.jpeg",description : "Crispy & flavorful Chilli Chicken, made with chicken marinated in chinese sauces, fried till crispy, sautéed with onions, peppers&sauces."},
    {name : "Tandoori",image: "/CUSTOMER/Order_Food/images/chickentandoori.jpeg",description : "Skinless legs and thighs are marinated in a tenderizing mixture of yogurt, lemon juice, and spices and the meat is slashed to the bone in several places helping the marinade penetrate and the chicken cook more quickly."},
    {name : "Kebab",image: "/CUSTOMER/Order_Food/images/chickenkebab.jpeg",description : "a dish consisting of small pieces of meat, tomatoes, onions, etc, threaded onto skewers and grilled, generally over charcoal. Also called: shish kebab, kabob, cabob."},

]

const tiffinRecipes = [
    {name : "Dosa",image: "/CUSTOMER/Order_Food/images/dosa.jpeg",description: "dosa is crispy and crepe-like and is a very popular street food in India. Dosa is famous for its simple ingredients and savory, slightly bitter flavor. It can be eaten as a snack, breakfast, or anytime you’re in the mood for a delicious, savory meal!"},
    {name : "Idli",image:"/CUSTOMER/Order_Food/images/idli.jpeg",description:"Idli is a soft, pillowy steamed savory cake made from fermented rice and lentil batter.It is naturally vegetarian, vegan, gluten-free and makes for one of the healthiest breakfast options served with Sambar and Coconut Chutney."},
    {name : "Chapathi",image:"/CUSTOMER/Order_Food/images/chapati.jpeg",description:"a round flat unleavened bread of India that is usually made of whole wheat flour and cooked on a griddle."},
    {name : "Dosa",image: "/CUSTOMER/Order_Food/images/dosa.jpeg",description: "dosa is crispy and crepe-like and is a very popular street food in India. Dosa is famous for its simple ingredients and savory, slightly bitter flavor. It can be eaten as a snack, breakfast, or anytime you’re in the mood for a delicious, savory meal!"},
    {name : "Idli",image:"/CUSTOMER/Order_Food/images/idli.jpeg",description:"Idli is a soft, pillowy steamed savory cake made from fermented rice and lentil batter.It is naturally vegetarian, vegan, gluten-free and makes for one of the healthiest breakfast options served with Sambar and Coconut Chutney."},
    {name : "Chapathi",image:"/CUSTOMER/Order_Food/images/chapati.jpeg",description:"a round flat unleavened bread of India that is usually made of whole wheat flour and cooked on a griddle."}
]

const snacksRecipes = [
    {name : "Samosa",image:"/CUSTOMER/Order_Food/images/samosa.jpeg",description:"Flaky and crunchy fried samosa are one of the most popular street food snack in North Indian cuisine. They feature a pastry-like crust but are filled with savory and spiced potato and green peas for a hearty, delicious snack."},
    {name : "Chat",image:"/CUSTOMER/Order_Food/images/chat.jpeg",description:"Aloo Chaat is a popular Indian street food snack made with potatoes, sweet sour spicy chutneys, sev and coriander leaves. Aloo is a Hindi word for potatoes"},
    {name : "Panipuri",image:"/CUSTOMER/Order_Food/images/panipuri.jpeg",description:"Panipuri consists of a round hollow puri (a deep-fried crisp flatbread), filled with a mixture of flavored water (known as imli pani), tamarind chutney, chili powder, chaat masala, potato mash, onion, or chickpeas."},
    {name : "Samosa",image:"/CUSTOMER/Order_Food/images/samosa.jpeg",description:"Flaky and crunchy fried samosa are one of the most popular street food snack in North Indian cuisine. They feature a pastry-like crust but are filled with savory and spiced potato and green peas for a hearty, delicious snack."},
    {name : "Chat",image:"/CUSTOMER/Order_Food/images/chat.jpeg",description:"Aloo Chaat is a popular Indian street food snack made with potatoes, sweet sour spicy chutneys, sev and coriander leaves. Aloo is a Hindi word for potatoes"},
    {name : "Panipuri",image:"/CUSTOMER/Order_Food/images/panipuri.jpeg",description:"Panipuri consists of a round hollow puri (a deep-fried crisp flatbread), filled with a mixture of flavored water (known as imli pani), tamarind chutney, chili powder, chaat masala, potato mash, onion, or chickpeas."},
    
]

// *** GET Routes - display pages ***
// Root Route

app.get('/', function (req, res) {
    const pageTitle = "Hungrezy";
    res.render('pages/index',{pageTitle : pageTitle});
});

app.get('/Restaurants', function (req, res) {
    const pageTitle = "Restaurants";
    res.render('pages/Explore_Restuarants',{foodItems : foodItems,restuarants : restuarants,pageTitle : pageTitle});
});

app.get('/login', function(req, res) {
    res.sendFile(__dirname + "/public/Login/login.html");
});

app.get('/Menu', function (req, res) {
    const pageTitle = "Menu";
    res.render('pages/Restuarant_Menu',{Restuarant: restuarants[0],recomended : recomended,Menu : Menu});
});

app.get('/Recipes', function (req, res) {
    const pageTitle = "Recipes";
    res.render('pages/Food_Recipes',{chickenRecipes : chickenRecipes,tiffinRecipes : tiffinRecipes,snacksRecipes : snacksRecipes});
});

app.get("/magic", function (req, res) {
    res.render("magic");
});