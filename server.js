// Load Node modules
var express = require('express');
const ejs = require('ejs');
const bcrypt = require ('bcrypt');
const {MongoClient} = require('mongodb');
const saltRounds = 10;
const cookieParser = require('cookie-parser');
const session = require('express-session');


const mongoose = require("mongoose");
const multer = require("multer");

// Initialise Express
var app = express();

app.use(cookieParser());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // you can set secure to true if you're using HTTPS
}));


const storage = multer.memoryStorage();
const upload = multer({ storage });

const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Render static files
app.use(express.static('public'));
// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', 'views')


// Port website will run on
app.listen(8080, () => {
    console.log("Your server is running on port 8080.");
});


//<---------------------------Mongodb-------------------------------->


const uri = "mongodb+srv://chandu:chandu@cluster0.y9hnpwu.mongodb.net/Images?retryWrites=true&w=majority";
const client = new MongoClient(uri);
 

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
       console.log("Connected to mongodb atlas");
    } catch (e) {
        console.error(e);
    }
    //  finally {
    //     await client.close();
    // }
}

main().catch(console.error);

const mongooseClient = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

if(mongooseClient) {
    console.log("Connected to mongodb atlas");
}
// Define a Mongoose schema for the image data
const imageSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String
  });

  const FoodItem = mongoose.model('FoodItem', imageSchema);

async function createUser(client, user){
    const result = await client.db("hungrezy").collection("users").insertOne(user);
    console.log(`New user created with the following id: ${result.insertedId}`);
}

async function createRestaurant(client, restaurant){
    const result = await client.db("hungrezy").collection("restaurants").insertOne(restaurant);
    console.log(`New restaurant registered with the following id: ${result.insertedId}`);
}


async function getUser(client, id) {
    const result = await client.db("hungrezy").collection("users").findOne({ _id: id });

    if (result) {
        console.log(`Found a user in the collection with the mobile '${id}':`);
        console.log(result);
        return result
    } else {
        console.log(`No user found with the id '${id}'`);
        return null;
    }
}

async function getAdmin(client, id) {
    const result = await client.db("hungrezy").collection("Admins").findOne({ _id: id });

    if (result) {
        console.log(`Found a Admin in the collection with the email '${id}':`);
        console.log(result);
        return result
    } else {
        console.log(`No user found with the id '${id}'`);
        return null;
    }
}


async function getRestaurantsByStatus(client,status){
   const cursor = client.db("hungrezy").collection("restaurants").find({status:status});
   const results = await cursor.toArray();
   return results;
}

async function getRestaurantByEmail(client,email){
    const result = client.db("hungrezy").collection("restaurants").findOne({restaurantEmail:email});
    
    return result;
 }

async function updateRestaurantStatus(client,email,status) {
    const result = await client.db("hungrezy").collection("restaurants").updateOne({ restaurantEmail:email }, { $set: {status:status} });
}





//<---------------------------Mongodb-------------------------------->



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



query = `CREATE TABLE IF NOT EXISTS USERS(MOBILE VARCHAR(10) PRIMARY KEY,NAME VARCHAR(50),GENDER VARCHAR(10),EMAIL VARCHAR(50),PASSWORD VARCHAR(100))`;


// db.run(query, [], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//    console.log("table created");
//   });



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
       //console.log(restaurant);
       Restaurants.push(restaurant);
   })
  });




query = 'SELECT * FROM USERS';
const users=[];
let currentUser=null;

db.all(query, [], (err, rows) => {
    if (err) {
      throw err;
    }
   rows.forEach((row)=>{
   // console.log(row.MOBILE,row.PASSWORD,row.NAME,row.EMAIL,row.GENDER);
        let user={
            mobileNumber : row.MOBILE,
            password : row.PASSWORD,
            name : row.NAME,
            gender : row.GENDER,
            email : row.EMAIL
        }
        users.push(user);
   })
  });

//<-----------------------SQLite----------------------------------------->




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

//recomended is a array of food item objects which are displayed in the recomended section of Menu page.

const recomended = [
    {id:"F0001",image:"/CUSTOMER/Order_Food/images/biryani.jpeg",name:"Biryani",cost:"100",description:"serves 1",type:"nonveg"},
    {id:"F0002",image:"/CUSTOMER/Order_Food/images/pizza.jpeg",name:"Pizza",cost:"50",description:"serves 1",type:"veg"},
    {id:"F0003",image:"/CUSTOMER/Order_Food/images/chicken.jpeg",name:"Chicken",cost:"100",description:"serves 2",type:"nonveg"},
    {id:"F0004",image:"/CUSTOMER/Order_Food/images/biryani.jpeg",name:"Thali",cost:"80",description:"serves 1",type:"veg"},
    {id:"F0005",image:"/CUSTOMER/Order_Food/images/pizza.jpeg",name:"Burger",cost:"40",description:"serves 1",type:"veg"},
    {id:"F0006",image:"/CUSTOMER/Order_Food/images/chicken.jpeg",name:"Ice Cream",cost:"20",description:"serves 1",type:"veg"}
]

// Menu is a array of food category objects where each object consits of category name and array of food item objects.

const MenuItems = [
    {id:"F0001",image:"/CUSTOMER/Order_Food/images/biryani.jpeg",name:"Biryani",cost:"100",description:"serves 1",type:"nonveg",quantity:'0'},
    {id:"F0002",image:"/CUSTOMER/Order_Food/images/pizza.jpeg",name:"Pizza",cost:"50",description:"serves 1",type:"veg",quantity:'0'},
    {id:"F0003",image:"/CUSTOMER/Order_Food/images/chicken.jpeg",name:"Chicken",cost:"100",description:"serves 2",type:"nonveg",quantity:'0'},
    {id:"F0004",image:"/CUSTOMER/Order_Food/images/biryani.jpeg",name:"Thali",cost:"80",description:"serves 1",type:"veg",quantity:'0'},
    {id:"F0005",image:"/CUSTOMER/Order_Food/images/pizza.jpeg",name:"Burger",cost:"40",description:"serves 1",type:"veg",quantity:'0'},
    {id:"F0006",image:"/CUSTOMER/Order_Food/images/chicken.jpeg",name:"Ice Cream",cost:"20",description:"serves 1",type:"veg",quantity:'0'},
    {id:"F0007",image:"/CUSTOMER/Order_Food/images/chicken.jpeg",name:"Fried Rice",cost:"60",description:"serves 1",type:"nonveg",quantity:'0'},
    {id:"F0008",image:"/CUSTOMER/Order_Food/images/pizza.jpeg",name:"Cakes",cost:"120",description:"serves 4",type:"nonveg",quantity:'0'},
    {id:"F0009",image:"/CUSTOMER/Order_Food/images/biryani.jpeg",name:"Rolls",cost:"10",description:"serves 1",type:"veg",quantity:'0'},
]

const Menu = [
    {
        categoryName : "Chicken",
        items : [
            {id:"F0003",image:"/CUSTOMER/Order_Food/images/chicken.jpeg",name:"Chicken",cost:"100",description:"serves 2",type:"nonveg"},
            {id:"F0001",image:"/CUSTOMER/Order_Food/images/biryani.jpeg",name:"Biryani",cost:"100",description:"serves 1",type:"nonveg"},
            {id:"F0007",image:"/CUSTOMER/Order_Food/images/chicken.jpeg",name:"Fried Rice",cost:"60",description:"serves 1",type:"nonveg"},
        ]
    },

    {
        categoryName : "Bakery",
        items : [
            {id:"F0008",image:"/CUSTOMER/Order_Food/images/pizza.jpeg",name:"Cakes",cost:"120",description:"serves 4",type:"nonveg"},
            {id:"F0006",image:"/CUSTOMER/Order_Food/images/chicken.jpeg",name:"Ice Cream",cost:"20",description:"serves 1",type:"veg"},
            {id:"F0009",image:"/CUSTOMER/Order_Food/images/biryani.jpeg",name:"Rolls",cost:"10",description:"serves 1",type:"veg"},
        ]
    },

    {
        categoryName : "Pizza",
        items : [
            {id:"F0002",image:"/CUSTOMER/Order_Food/images/pizza.jpeg",name:"Pizza",cost:"50",description:"serves 1",type:"veg"},
            {id:"F0005",image:"/CUSTOMER/Order_Food/images/pizza.jpeg",name:"Burger",cost:"40",description:"serves 1",type:"veg"},
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
    let currentUser = null;
    if (req.cookies.mobileNumber) {
        const mobileNumber = req.cookies.mobileNumber;
        // Get user information from database using mobileNumber
        getUser(client, mobileNumber).then(user => {
            currentUser = user;
            res.render('pages/Home', { pageTitle: pageTitle, currentUser:currentUser });
        }).catch(err => {
            console.log(err);
            res.render('pages/Home', { pageTitle: pageTitle, currentUser: currentUser });
        });
    } else {
        res.render('pages/Home', { pageTitle: pageTitle, currentUser: currentUser });
    }
});


app.get('/Restaurants', async function (req, res) {
    const pageTitle = "Restaurants";
    try {
        const fooditems = await FoodItem.find({});
        res.render('pages/Explore_Restuarants',{foodItems : fooditems,restuarants : fooditems,pageTitle : pageTitle,currentUser:currentUser});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/login', function (req, res) {
    const pageTitle = "Login";
    res.render('pages/login',{pageTitle : pageTitle});
});

app.get('/Admin_Login', function (req, res) {
    const pageTitle = "Admin-Login";
    res.render('pages/Admin_Login',{pageTitle : pageTitle});
});

app.get('/logout', function (req, res) {
    // Clear the currentUser variable
    currentUser = null;

    // Set the expiration time of the mobileNumber cookie to 0 to delete it
    res.cookie('mobileNumber', '', {
        expires: new Date(0),
        sameSite: true
    });

    // Redirect to the login page
    res.redirect('/');
});

  

app.get('/helpAndSupport', function(req, res) {
    const pageTitle = "Help & Support";
    res.render('pages/helpAndSupport', {pageTitle: pageTitle,currentUser:currentUser});
});

app.get('/About', function (req, res) {
    const pageTitle = "About Us";
    res.render('pages/About',{pageTitle : pageTitle});
});

app.post('/login', async function (req, res){
   
    let mobileNumber = req.body.mobileNumber;
    let password = req.body.password;
    const pageTitle = "Hungrezy";

    const user = await getUser(client, mobileNumber);

    bcrypt.compare(password, user.password, function(err, result) {
        
        if (result) {
            // Set the mobileNumber cookie with an expires value of 0 and sameSite value of true
            // res.cookie('mobileNumber', user.mobileNumber, { 
            //     expires: 0,
            //     sameSite: true
            // });
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + (8 * 60 * 60 * 1000)); // 8 hours in milliseconds
            res.cookie('mobileNumber', user.mobileNumber, { 
                expires: expirationDate,
                sameSite: true
            });
          
            // Set the currentUser variable to the logged in user
            currentUser = user;

            // Redirect to the home page
            res.redirect('/');
        }
        else {
            // If login fails, redirect back to the login page
            res.redirect('/login');
        }
    });
});

  
app.post('/registration', function (req, res) {
    let name = req.body.fname;
    let mobileNumber = req.body.mobileNumber;
    let password = req.body.password;
    let gender = req.body.gender;
    let email = req.body.email;
  
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) throw err;
      else {
        const user = {
          _id: mobileNumber,
          mobileNumber: mobileNumber,
          name: name,
          email: email,
          gender: gender,
          password: hash
        };
  
        await createUser(client, user);
        req.session.user = user;
        currentUser = user;
        res.redirect('/');
      }
    });
});
  

app.post('/Admin_Login', async function (req, res){
   
    let email = req.body.email;
    let password = req.body.password;

    const user = await  getAdmin(client,email);
    if(user){
        if(user.password==password){
            currentUser=user;
            res.redirect("/Admin");
        }
        else{
            console.log("Wrong Credentials");
            res.redirect("/Admin_Login");
        }
    }
    else{
        res.redirect("/Admin_Login");
    }

});

app.post('/Register_Restaurant',function(req,res){
   
    bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
        if(err)throw err;
        else{
            const restaurantObj = {
                _id : req.body.restaurantEmail,
                restaurantName : req.body.restaurantName,
                restaurantEmail : req.body.restaurantEmail,
                password : hash,
                restaurantType : req.body.restaurantType,
                deliveryTime : req.body.deliveryTime,
                cost : req.body.cost,
                location : req.body.location, 
                image : "/CUSTOMER/Order_Food/images/No-Image-Placeholder.svg",
                rating : Math.random() * (5 - 3) + 3 ,
                offer : 50,
                status : 'pending',
                menuId : null
            }

            await createRestaurant(client,restaurantObj);
            res.redirect('/Restaurant_Registration');
        }
       
       
    });
   

});

app.post('/Registration', function (req, res){

    let name = req.body.fname;
    let mobileNumber = req.body.mobileNumber;
    let password = req.body.password;
    let gender = req.body.gender;
    let email = req.body.email;
    
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        if(err)throw err;
        else{
                const user={
                    _id:mobileNumber,
                    mobileNumber:mobileNumber,
                    name:name,
                    email:email,
                    gender:gender,
                    password:hash
                };

                await createUser(client,user);
                currentUser = user;
                res.redirect('/');

                // query = `INSERT INTO USERS VALUES('${mobileNumber}','${name}','${gender}','${email}','${hash}')`;
                // db.run(query, [], (err, rows) => {
                //     if (err) {
                    
                //         res.redirect('Registration')
                //         throw err;
                //     }
                //     else{
                //         console.log("Registration Successful!");
                //         currentUser = user;
                //         res.redirect('/');
                //     }
                // });
        }
       
       
    });
  
});

app.get('/Registration', function (req, res) {
    const pageTitle = "Registration";
    res.render('pages/registration',{pageTitle:pageTitle});
});

app.get('/Restaurant_Registration', function (req, res) {
    const pageTitle = "Restaurant-Registration";
    res.render('pages/Restaurant_Registration',{pageTitle:pageTitle});
});

app.get('/Menu', function (req, res) {
    let Rid = req.query.id;
    let R=Restaurants[0];
    Restaurants.forEach((restaurant)=>{
        if(restaurant.restaurantID==Rid)R=restaurant;
    });
    const pageTitle = "Menu-"+R.name;
    const menuItems = JSON.stringify( MenuItems ).replace(/\\/g, '\\\\').replace(/"/g, '\\\"');
    res.render('pages/Restuarant_Menu',{Restuarant: R,recomended : recomended,Menu : Menu,currentUser:currentUser,pageTitle:pageTitle,MenuItems:menuItems});
});

app.get('/Recipes', function (req, res) {
    const pageTitle = "Recipes";
    res.render('pages/Food_Recipes',{chickenRecipes : chickenRecipes,tiffinRecipes : tiffinRecipes,snacksRecipes : snacksRecipes,currentUser:currentUser,pageTitle:pageTitle});
});

app.get('/View_Recipe', function (req, res) {
    const pageTitle = "Recipe Blog";
    res.render('pages/View_Recipe',{foodItem :chickenRecipes[1],currentUser:currentUser,pageTitle:pageTitle});
});

app.get('/Account', function (req, res) {
    const pageTitle = "Account";
    res.render('pages/Account',{currentUser:currentUser,pageTitle:pageTitle});
});

app.get('/Admin', async function (req, res) {
    const pageTitle = "Admin";
    const pendingRestaurants = await getRestaurantsByStatus(client,"pending");
    const approvedRestaurants = await getRestaurantsByStatus(client,"approved");
    const suspendedRestaurants = await getRestaurantsByStatus(client,"suspended")
    res.render('pages/Admin_Restaurants',{currentUser:currentUser,pageTitle:pageTitle,pendingVerifications:pendingRestaurants,Restaurants:approvedRestaurants,suspendedRestaurants:suspendedRestaurants});
});

app.get('/Approve_Restaurant', async function (req, res) {
    let email = req.query.email;
    await updateRestaurantStatus(client,email,"approved");
    res.redirect('/Admin');
  
});


app.get('/Reject_Restaurant', async function (req, res) {
    let email = req.query.email;
    await updateRestaurantStatus(client,email,"rejected");
    res.redirect('/Admin');
  
});

app.get('/Suspend_Restaurant', async function (req, res) {
    let email = req.query.email;
    await updateRestaurantStatus(client,email,"suspended");
    res.redirect('/Admin');
  
});

app.get('/Add_Recipe', async function (req, res) {
    const pageTitle = "Admin";
    
    res.render('pages/Admin_AddRecipe',{currentUser:currentUser,pageTitle:pageTitle});
});

app.get('/Donate_Food', function (req, res) {
    const pageTitle = "Donate Food";
    res.render('pages/Donate_Food',{banners : banners,pageTitle:pageTitle});
});

app.get("/magic", function (req, res) {
    res.render("magic");
});