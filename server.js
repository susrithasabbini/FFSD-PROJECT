// Load Node modules
var express = require('express');
const ejs = require('ejs');
// Initialise Express
var app = express();

const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: false }));
// Render static files
app.use(express.static('public'));
// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', 'views')


// Port website will run on
app.listen(8080, () => {
    console.log("Your server is running on port 8080.");
});



//<-----------------------SQLite----------------------------------------->

// don't uncomment the queries in this section if not required as it will create issues in already created database.

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./server.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });

let query = `CREATE TABLE IF NOT EXISTS RESTAURANTS(restaurantid varchar(5) PRIMARY KEY,name varchar(50),image varchar(500),type varchar(200),rating varchar(1),time varchar(3),cost varchar(5),location varchar(250),offer varchar(3),menuid varchar(5))`;



//  query = `CREATE TABLE IF NOT EXISTS USER(MOBILE VARCHAR(10) PRIMARY KEY,PASSWORD VARCHAR(25))`;

// db.run(query, [], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//    console.log("table created");
//   });

// //query = `INSERT INTO  USER VALUES('6304940431','vivek@123')`;

//query = `INSERT INTO RESTAURANTS VALUES('R0001','Hotel Rajadhani','/CUSTOMER/Order_Food/images/chickenbiriyani.jpeg','Biryani Chinese Fast Food','5','15','100','Sricity','30','M0001')`;
//query = `INSERT INTO RESTAURANTS VALUES('R0002',"Quality Bakery","/CUSTOMER/Order_Food/images/cakes.jpeg",'Chinese cakes Fast Food','4.9','25','150','Sricity','20','M0002')`;
//query = `INSERT INTO RESTAURANTS VALUES('R0003',"Hotel Abhiruchi","/CUSTOMER/Order_Food/images/muttoncurry.jpeg",'Chinese Tandoori Items','4','20','190','Sricity','25','M0003')`;
//query = `INSERT INTO RESTAURANTS VALUES('R0004',"Hotel Manasa","/CUSTOMER/Order_Food/images/muttoncurry.jpeg",'Biryani Chinese Fast Food','3.8','19','200','Sricity','22','M0004')`;
//query = `INSERT INTO RESTAURANTS VALUES('R0005',"The Indian Grill","/CUSTOMER/Order_Food/images/fishfry.jpeg",'Biryani Curries','4.4','41','250','Sricity','31','M0005')`;
//query = `INSERT INTO RESTAURANTS VALUES('R0006',"Hotel Paradise","/CUSTOMER/Order_Food/images/chickenbiriyani.jpeg",'Biryani Breads Curries','4.2','20','99','Sricity','15','M0006')`;
//query = `INSERT INTO RESTAURANTS VALUES('R0007',"Continental Bakery","/CUSTOMER/Order_Food/images/samosa.jpeg",'Samosa Fast Food','4','23','199','Sricity','19','M0007')`;
//query = `INSERT INTO RESTAURANTS VALUES('R0008',"Hotel Platform 65","/CUSTOMER/Order_Food/images/muttoncurry.jpeg",'Biryani Tandoori Chinese','5','21','299','Sricity','28','M0008')`;
//query = `INSERT INTO RESTAURANTS VALUES('R0009',"Hotel Sweet Magic","/CUSTOMER/Order_Food/images/chickenmandibiriyani.jpeg",'MandiBiryani Curries','4.8','40','499','Sricity','40','M0009')`;
//query = `INSERT INTO RESTAURANTS VALUES('R0010',"Hotel 7 Hills","/CUSTOMER/Order_Food/images/fishfry.jpeg",'Biryani Seafoods','3','15','199','Sricity','10','M0010')`;
//query = `INSERT INTO RESTAURANTS VALUES('R0011',"Green Bucket Biriyani","/CUSTOMER/Order_Food/images/chickentandoori.jpeg",'Biryani Tandoori FastFood','5','25','200','Sricity','25','M0011')`;
//query = `INSERT INTO RESTAURANTS VALUES('R0012',"Hotel Swarnamukhi","/CUSTOMER/Order_Food/images/muttoncurry.jpeg",'Biryani Chinese  Curries','3.5','15','100','Sricity','30','M0012')`;
//query = `INSERT INTO RESTAURANTS VALUES('R0013',"Hotel Cherries","/CUSTOMER/Order_Food/images/chickendrumsticks.jpeg",'Biryani Fast Food','3.5','24','250','Sricity','33','M0013')`;
//query = `INSERT INTO RESTAURANTS VALUES('R0014',"Ravi plaza","/CUSTOMER/Order_Food/images/fishbiriyani.jpeg",'Biryani Chinese Seafoods','4.2','14','219','Sricity','30','M0014')`;
//query = `INSERT INTO RESTAURANTS VALUES('R0015',"Sunny Cafe","/CUSTOMER/Order_Food/images/panipuri.jpeg",'Panipuri Fast Food','4.0','34','80','Sricity','20','M0015')`;

//query = `UPDATE RESTAURANTS SET NAME = 'Quality Bakery' WHERE RESTAURANTID = 'R0002'`
//query = `update restaurants set image = '/CUSTOMER/Order_Food/images/cakes.jpeg' where restaurantid = 'R0002'`


// db.run(query, [], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//    console.log("row inserted");
//   });

query = `SELECT * FROM RESTAURANTS`;

const Restaurants =[];

db.all(query, [], (err, rows) => {
    if (err) {
      throw err;
    }
   rows.forEach((row)=>{
    
       let restaurant = {
        image:row.image,name:row.name,type:row.type,rating:row.rating,time:row.time,cost:row.cost,location:row.location,offer:row.offer,restaurantID:row.restaurantid,menuID:row.menuid
       }
       console.log(restaurant);
       Restaurants.push(restaurant);
   })
  });




// query = 'SELECT * FROM USER';
// const users=[]

// db.all(query, [], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//    rows.forEach((row)=>{
//     console.log(row.MOBILE,row.PASSWORD);
//         let user={
//             mobileNumber : row.MOBILE,
//             password : row.PASSWORD
//         }
//         users.push(user);
//    })
//   });

//<-----------------------SQLite----------------------------------------->



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
// const restuarants=[
//   {image:"/CUSTOMER/Order_Food/images/chickenbiriyani.jpeg",name:"Hotel Rajadhani",type:"Biryani, Chinese ,Fast Food",rating:"5",time:"15 MIN",cost:"Rs100 for one",location:"Sricity",offer:"30%",restaurantID:'R0001',menuID:'M0001'},
//   {image:"/CUSTOMER/Order_Food/images/chickenshawarma.jpeg",name:"Hotel MG Grand",type:"Biryani, Chinese ,Fast Food",rating:"4.8",time:"21 MIN",cost:"Rs200 for one",location:"Chennai",offer:"20%"},
//   {image:"/CUSTOMER/Order_Food/images/muttoncurry.jpeg",name:"Hotel Abhiruchi",type:"Biryani, Chinese ,Fast Food",rating:"4.6",time:"19 MIN",cost:"Rs300 for one",location:"Tada",offer:"25%"},
//   {image:"/CUSTOMER/Order_Food/images/muttoncurry.jpeg",name:"Hotel Manasa",type:"Biryani, Chinese ,Fast Food",rating:"5",time:"18 MIN",cost:"Rs190 for one",location:"Sullurpeta",offer:"35%"},
//   {image:"/CUSTOMER/Order_Food/images/fishfry.jpeg",name:"The Indian Grill",type:"Biryani, Chinese ,Fast Food",rating:"4",time:"17 MIN",cost:"Rs320 for one",location:"Akkampeta",offer:"10%"},
//   {image:"/CUSTOMER/Order_Food/images/chickenbiriyani.jpeg",name:"Hotel Paradise",type:"Biryani, Chinese ,Fast Food",rating:"3.8",time:"27 MIN",cost:"Rs176 for one",location:"Gummadipundi",offer:"25%"},
//   {image:"/CUSTOMER/Order_Food/images/chickenshawarma.jpeg",name:"Hotel Bawarchi",type:"Biryani, Chinese ,Fast Food",rating:"5",time:"31 MIN",cost:"Rs450 for one",location:"Ponneri",offer:"20%"},
//   {image:"/CUSTOMER/Order_Food/images/muttoncurry.jpeg",name:"Hotel Platform 65",type:"Biryani, Chinese ,Fast Food",rating:"3.9",time:"35 MIN",cost:"Rs210 for one",location:"Arambakam",offer:"29%"},
//   {image:"/CUSTOMER/Order_Food/images/chickenmandibiriyani.jpeg",name:"Hotel Sweet Magic",type:"Biryani, Chinese ,Fast Food",rating:"4.9",time:"16 MIN",cost:"Rs199 for one",location:"Tirupati",offer:"32%"},
//   {image:"/CUSTOMER/Order_Food/images/fishfry.jpeg",name:"Hotel 7 Hills",type:"Biryani, Chinese ,Fast Food",rating:"4.2",time:"41 MIN",cost:"Rs299 for one",location:"Kalahasti",offer:"25%"},
//   {image:"/CUSTOMER/Order_Food/images/chickentandoori.jpeg",name:"Hotel Spice Gardens",type:"Biryani, Chinese ,Fast Food",rating:"4",time:"23 MIN",cost:"Rs399 for one",location:"Gudur",offer:"32%"},
//   {image:"/CUSTOMER/Order_Food/images/muttoncurry.jpeg",name:"Hotel Swarnamukhi",type:"Biryani, Chinese ,Fast Food",rating:"4.2",time:"51 MIN",cost:"Rs1000 for one",location:"Naidupeta",offer:"29%"},
// ]

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
    {name : "Dosa",image: "/CUSTOMER/Order_Food/images/dosa.jpeg",description: "dosa  is crispy and crepe-like and is a very popular street food in India. Dosa is famous for its simple ingredients and savory, slightly bitter flavor. It can be eaten as a snack, breakfast, or anytime you’re in the mood for a delicious, savory meal!"},
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

const banners = [
    {image:"/Food_Donation/images/banner1.jpg"},
    {image:"/Food_Donation/images/banner2.jpg"},
    {image:"/Food_Donation/images/banner3.jpg"},
    {image:"/Food_Donation/images/banner4.jpg"},
    {image:"/Food_Donation/images/banner5.jpg"},
]

// *** GET Routes - display pages ***
// Root Route

app.get('/', function (req, res) {
    const pageTitle = "Hungrezy";
    res.render('pages/Home',{pageTitle : pageTitle});
});

app.get('/Restaurants', function (req, res) {
    const pageTitle = "Restaurants";
    res.render('pages/Explore_Restuarants',{foodItems : foodItems,restuarants : Restaurants,pageTitle : pageTitle});
});

app.get('/login', function (req, res) {
    const pageTitle = "Login";
    res.render('pages/login',{pageTitle : pageTitle});
});

app.get('/helpAndSupport', function(req, res) {
    const pageTitle = "Help & Support";
    res.render('pages/helpAndSupport', {pageTitle: pageTitle});
});
app.get('/About', function (req, res) {
    const pageTitle = "About Us";
    res.render('pages/About',{pageTitle : pageTitle});
});



// app.get('/login_user', function (req, res) {
//     const pageTitle = "Menu";

//     let mobileNumber = req.body.mobileNumber;
//     let password = req.body.password;
//     let status = false;
    
//    users.forEach((user)=>{
//     console.log(user.mobileNumber, mobileNumber,user.password),password;
//     if(user.mobileNumber==mobileNumber && user.password == password)status=true;
//    });
//    if(status) res.render('pages/Explore_Restuarants',{foodItems : foodItems,restuarants : restuarants,pageTitle : pageTitle});
//    else  res.render('pages/login');
// });



app.get('/Menu', function (req, res) {
    const pageTitle = "Menu";
    res.render('pages/Restuarant_Menu',{Restuarant: Restaurants[0],recomended : recomended,Menu : Menu});
});

app.get('/Recipes', function (req, res) {
    const pageTitle = "Recipes";
    res.render('pages/Food_Recipes',{chickenRecipes : chickenRecipes,tiffinRecipes : tiffinRecipes,snacksRecipes : snacksRecipes});
});

app.get('/View_Recipe', function (req, res) {
    const pageTitle = "Recipes";
    res.render('pages/View_Recipe',{foodItem :chickenRecipes[1]});
});

app.get('/Account', function (req, res) {
    const pageTitle = "Account";
    res.render('pages/Account',);
});

app.get('/Donate_Food', function (req, res) {
    const pageTitle = "Donate Food";
    res.render('pages/Donate_Food',{banners : banners});
});

app.get("/magic", function (req, res) {
    res.render("magic");
});