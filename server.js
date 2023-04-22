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

let currentUser=null;
let currentRestaurant = null;
let currentAdmin = null;


//<---------------------------Mongodb-------------------------------->


const uri = "mongodb+srv://chandu:chandu@cluster0.y9hnpwu.mongodb.net/Images?retryWrites=true&w=majority";
const uri2 = "mongodb+srv://chandu:chandu@cluster0.y9hnpwu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri2);

 

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

const imageSchema2 = new mongoose.Schema({
    _id: String,
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

async function addFoodItem(client, email,foodItem){
    const result = await client.db("Menu").collection(email).insertOne(foodItem);
    console.log(`New food item  added with the following id: ${result.insertedId}`);
}

async function addOrder(client,email,order){
    const result = await client.db("Orders").collection(email).insertOne(order);
    console.log(`New order placed with the following id: ${result.insertedId}`);
}

async function addUserFeedback(client,userid,feedback){
    const result = await client.db("hungrezy").collection("Feedbacks").insertOne({customerID:userid,feedback:feedback});
    console.log(`New Feedback Registered with the following id: ${result.insertedId}`);
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

async function getUsers(client){
    const cursor = client.db("hungrezy").collection("users").find();
    const results = await cursor.toArray();
    return results;
 }

async function getRestaurantOrders(client,email){
    const cursor = client.db("Orders").collection(email).find();
    const results = await cursor.toArray();
    return results;
}

 async function getRestaurantMenu(client,email){
    const cursor = client.db("Menu").collection(email).find();
    const results = await cursor.toArray();
    return results;
}

async function getRestaurantByEmail(client,email){
    const result = client.db("hungrezy").collection("restaurants").findOne({email:email});
    
    return result;
 }

async function updateRestaurantStatus(client,email,status) {
    const result = await client.db("hungrezy").collection("restaurants").updateOne({ email:email }, { $set: {status:status} });
}

async function updateUserAddress(client,currentUser,address) {
    const result = await client.db("hungrezy").collection("users").updateOne({ mobileNumber:currentUser.mobileNumber }, { $set: {address:address.address,pincode:address.pincode,state:address.state,country:address.country} });
}

async function updateUserName(client,id,value) {
    const result = await client.db("hungrezy").collection("users").updateOne({ mobileNumber:id }, { $set: {name:value} });
}

async function updateUserEmail(client,id,value) {
    const result = await client.db("hungrezy").collection("users").updateOne({ mobileNumber:id }, { $set: {email:value} });
}

async function updateUserGender(client,id,value) {
    const result = await client.db("hungrezy").collection("users").updateOne({ mobileNumber:id }, { $set: {gender:value} });
}

async function updateUserPassword(client,id,value) {
    const result = await client.db("hungrezy").collection("users").updateOne({ mobileNumber:id }, { $set: {password:value} });
}

async function updateOrderStatus(client,email,ID) {
    const result = await client.db("Orders").collection(email).updateOne({ orderID:ID }, { $set: {orderStatus:"Delivery Completed"} });
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

app.get('/', async function (req, res) {
    const pageTitle = "Hungrezy";
    if(req.cookies.mobileNumber==null) {
        currentUser = null;
        res.render('pages/Home',{pageTitle : pageTitle, currentUser: currentUser});
    }
    else {
        const currentUser = await getUser(client, req.cookies.mobileNumber);
        if (currentUser !== null) { // check if user is logged in
            res.cookie('mobileNumber', currentUser.mobileNumber, { 
                expires: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours in milliseconds
                sameSite: true
            });
        }
        res.render('pages/Home',{pageTitle : pageTitle, currentUser: currentUser});
    }
});



app.get('/Restaurants', async function (req, res) {
    if(req.cookies.mobileNumber==null) {
        currentUser = null;
    }
    const pageTitle = "Restaurants";
    const approvedRestaurants = await getRestaurantsByStatus(client,"approved");
    const Restaurants = [];
    approvedRestaurants.forEach(async (restaurant)=>{
        let FoodImage = mongoose.model(restaurant.email,imageSchema2);
        let  foodItemImage = await FoodImage.findOne({_id : restaurant.email});
        Restaurants.push({restaurant:restaurant,image:foodItemImage});
    });
    try {
        const fooditems = await FoodItem.find({});
        res.render('pages/Explore_Restuarants',{foodItems : fooditems,restuarants : Restaurants ,pageTitle : pageTitle,currentUser:currentUser});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/login', function (req, res) {
    const pageTitle = "Login";
    res.render('pages/login',{pageTitle : pageTitle});
});

app.get('/Restaurant_Login', function (req, res) {
    const pageTitle = "Restaurant Login";
    res.render('pages/Restaurant_Login',{pageTitle : pageTitle});
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

app.get('/Admin_Logout', function (req, res) {
    // Clear the currentUser variable
    currentAdmin = null;

    // Set the expiration time of the email cookie to 0 to delete it
    res.cookie('email', '', {
        expires: new Date(0),
        sameSite: true
    });

    // Redirect to the login page
    res.redirect('/Admin_Login');
});

app.get('/Restaurant_Logout', function (req, res) {
    // Clear the currentUser variable
    currentRestaurant = null;

    // Set the expiration time of the email cookie to 0 to delete it
    res.cookie('restaurantEmail', '', {
        expires: new Date(0),
        sameSite: true
    });

    // Redirect to the login page
    res.redirect('/Restaurant_Login');
});

app.get('/helpAndSupport', function(req, res) {
    if(req.cookies.mobileNumber==null) {
        currentUser = null;
    }
    const pageTitle = "Help & Support";
    res.render('pages/helpAndSupport', {pageTitle: pageTitle,currentUser:currentUser});
});

app.get('/About', function (req, res) {
    const pageTitle = "About Us";
    if(req.cookies.mobileNumber==null) {
        currentUser = null;
    }
    res.render('pages/About',{pageTitle : pageTitle,currentUser:currentUser});
});

app.post('/login', async function (req, res){
   
    let mobileNumber = req.body.mobileNumber;
    let password = req.body.password;

    const user = await getUser(client,mobileNumber);

    bcrypt.compare(password, user.password, function(err, result) {
        
        if (result) {
            // Set the mobileNumber cookie with an expires value of 0 and sameSite value of true
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
          password: hash,
          address : req.body.address,
          pincode : req.body.pincode,
          state : req.body.state,
          country : req.body.country
        };
  
        await createUser(client, user);
        req.session.user = user;
        currentUser = user;
        res.redirect('/');
      }
    });
});

app.post('/updateCustomerAddress',  function (req, res) {
let addressDetails = {
     address : req.body.address,
     pincode : req.body.pincode,
     state : req.body.state,
     country : req.body.country,
}
 
  if(currentUser){
    updateUserAddress(client,currentUser,addressDetails).then(()=>{
        res.redirect('/Account');
    })
  }else{
    res.redirect('/Login');
  }
});

app.post('/submitUserFeedback',  async function (req, res) {
    let feedback = req.body.feedback
     
      if(currentUser){
        await addUserFeedback(client,currentUser._id,feedback);
        res.redirect("/About");
      }else{
        res.redirect('/Login');
      }
});
    

app.post('/updateUserProfile',  async function (req, res) {
   
       let  name = req.body.name
        let email = req.body.email
        let gender = req.body.gender
        let password = req.body.password
    

    
     
      if(currentUser){
        if(name!='' && name.length>0 && name!=currentUser.name)await updateUserName(client,currentUser.mobileNumber,name);
        if(email!='' && email.length>0 && email!=currentUser.email)await updateUserEmail(client,currentUser.mobileNumber,email);
        if(gender!='' && gender.length>0 && gender!=currentUser.gender)await updateUserGender(client,currentUser.mobileNumber,gender);
        if(name!='' && password.length>0){
            bcrypt.hash(password, saltRounds, async function (err, hash) {
                if (err) throw err;
                else {
                    await updateUserPassword(client,currentUser.mobileNumber,hash);
                }
              });
        }
        currentUser = await getUser(client,currentUser.mobileNumber);
        res.redirect('/Account');
        
      }else{
        res.redirect('/Login');
      }
    });



  

app.post('/Admin_Login', async function (req, res){
   
    let email = req.body.email;
    let password = req.body.password;

    const user = await  getAdmin(client,email);
    if(user){
        if(user.password==password){
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + (4 * 60 * 60 * 1000)); // 4 hours in milliseconds
            res.cookie('email', user.email, { 
                expires: expirationDate,
                sameSite: true
            });
            currentAdmin=user;
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


app.post('/Restaurant_Login', async function (req, res){
   
    let email = req.body.email;
    let password = req.body.password;

    const restaurant = await getRestaurantByEmail(client,email);

    bcrypt.compare(password, restaurant.password, function(err, result) {
        
        if (result) {
            // Set the email cookie with an expires value of 8 hours and sameSite value of true
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + (8 * 60 * 60 * 1000)); // 8 hours in milliseconds
            res.cookie('restaurantEmail', restaurant.email, { 
                expires: expirationDate,
                sameSite: true
            });

            // log in
            currentRestaurant=restaurant;
     
            res.redirect('/Restaurants_Home');
        }
        else {
            // access denied
            res.redirect('/Restaurant_Login');
        }
    });
});


app.post('/Register_Restaurant', upload.single('image'),function(req,res){
    function getOffer() {
        let offer = Math.floor(Math.random() * (60 - 10 + 1) + 10);
        while(offer % 5 !== 0) {
            offer = Math.floor(Math.random() * (60 - 10 + 1) + 10);
        }
        return offer;
    }

    const offer = getOffer();

    
   
    bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
        if(err)throw err;
        else{
            const restaurantObj = {
                _id : req.body.restaurantEmail,
                name : req.body.restaurantName,
                email : req.body.restaurantEmail,
                password : hash,
                type : req.body.restaurantType,
                time : req.body.deliveryTime,
                cost : req.body.cost,
                location : req.body.location, 
                rating :Math.round(((Math.random() * (5 - 3) + 3)) *10)/10,
                offer : offer,
                status : 'pending',
              
            }

            await createRestaurant(client,restaurantObj);
            currentRestaurant = restaurantObj;
            const FoodImage = mongoose.model(req.body.restaurantEmail,imageSchema2);
            const foodimage = new FoodImage({
                _id: req.body.restaurantEmail,
                data: req.file.buffer,
                contentType: req.file.mimetype
              });
              try {
                await foodimage.save();
                res.redirect('/Restaurants_Home');
              } catch (err) {
                console.error(err);
                res.sendStatus(500);
              }
           
        }
       
       
    });
});

app.post('/Add_FoodItem', upload.single('image'),async function(req,res){
    const email = req.query.email;
    const FoodImage = mongoose.model(email,imageSchema2);
    const foodimage = new FoodImage({
        _id: req.body.name,
        data: req.file.buffer,
        contentType: req.file.mimetype
      });
   const foodItem = {
        name : req.body.name,
        cost : req.body.cost,
        description : req.body.description,
        type : req.body.type,
        category : req.body.category,
        image: '/CUSTOMER/Order_Food/images/No-Image-Placeholder.svg',
        rating : Math.round(((Math.random() * (5 - 3) + 3)) *10)/10
   }

   try {
    await foodimage.save();
    await addFoodItem(client,email,foodItem);
    res.redirect('/Add_Menu');
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }

  
  
});



app.get('/Registration', function (req, res) {
    const pageTitle = "Registration";
    res.render('pages/registration',{pageTitle:pageTitle});
});

app.get('/Restaurant_Registration', function (req, res) {
    const pageTitle = "Restaurant-Registration";
    res.render('pages/Restaurant_Registration',{pageTitle:pageTitle});
});

app.get('/Menu', async function (req, res) {
    const restaurant = await getRestaurantByEmail(client,req.query.id)
    let MenuItems = await getRestaurantMenu(client,restaurant._id);
    const categoryNames = ["Biryani-Rice","Curries","Bakery","Pizza-Burger","Soft-Drinks","Sweets","Recomended","Lassi-Shakes"];
    const Menu = [],recomended=[];
    let FoodImage = mongoose.model(restaurant.email,imageSchema2);
    let  foodItemImages = await FoodImage.find({});
    categoryNames.map((name)=>{
        let array = [];
        MenuItems.map((item)=>{
            if(name==item.category){
                let foodItemImage
                foodItemImages.map(image=>{
                    if(image._id==item.name)
                        foodItemImage=image;
                })
                array.push({item:item,image:foodItemImage});
                if(name=="Recomended")recomended.push({item:item,image:foodItemImage});
            }
        })
        if(name!="Recomended" && array.length>0)Menu.push({categoryName:name,items:array});
    })
   
    const pageTitle = "Menu-"+restaurant.name;
    const menuItems = JSON.stringify( MenuItems ).replace(/\\/g, '\\\\').replace(/"/g, '\\\"');
    res.render('pages/Restuarant_Menu',{Restuarant: restaurant,recomended : recomended,Menu : Menu,currentUser:currentUser,pageTitle:pageTitle,MenuItems:menuItems});
});

app.post('/order', async function (req, res){
        const order = {
            orderID : req.query.rid+req.query.cid+ new Date().getTime(),
            restaurantID : req.query.rid,
            customerID : req.query.cid,
            cart : JSON.parse(req.query.cart),
            paymentDetails : {payment:req.query.pay,method:req.query.method},
            orderStatus : "Delivery Pending"
        }

        await addOrder(client,order.restaurantID,order)
        console.log(order);
        res.redirect('/');

});


app.get('/Recipes', function (req, res) {
    const pageTitle = "Recipes";
    if(req.cookies.mobileNumber==null) {
        currentUser = null;
    }
    res.render('pages/Food_Recipes',{chickenRecipes : chickenRecipes,tiffinRecipes : tiffinRecipes,snacksRecipes : snacksRecipes,currentUser:currentUser,pageTitle:pageTitle});
});

app.get('/View_Recipe', function (req, res) {
    const pageTitle = "Recipe Blog";
    res.render('pages/View_Recipe',{foodItem :chickenRecipes[1],currentUser:currentUser,pageTitle:pageTitle});
});

app.get('/Account', function (req, res) {
    if(req.cookies.mobileNumber==null) {
        currentUser = null;
    }
    const pageTitle = "Account";
    res.render('pages/Account',{currentUser:currentUser,pageTitle:pageTitle});
});

app.get('/Admin', async function (req, res) {
    const pageTitle = "Admin";
    const pendingRestaurants = await getRestaurantsByStatus(client,"pending");
    const approvedRestaurants = await getRestaurantsByStatus(client,"approved");
    const suspendedRestaurants = await getRestaurantsByStatus(client,"suspended");
    if(req.cookies.email==null) {
        res.redirect('/Admin_Login');
    }
    else {
        res.render('pages/Admin_Restaurants',{currentUser:currentAdmin,pageTitle:pageTitle,pendingVerifications:pendingRestaurants,Restaurants:approvedRestaurants,suspendedRestaurants:suspendedRestaurants});
    }
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
    if(req.cookies.restaurantEmail != null){
    res.render('pages/Admin_AddRecipe',{currentUser:currentAdmin,pageTitle:pageTitle});
    } else {
        res.redirect('/Restaurant_Login');
    }
});

app.get('/Restaurants_Home', async function(req,res){
    const pageTitle = "Restaurant Home";
    let restaurantOrders=[], Orders = [];
    if(req.cookies.restaurantEmail != null){
        currentRestaurant = await getRestaurantByEmail(client,req.cookies.restaurantEmail);
       getUsers(client).then(users=>{
            getRestaurantOrders(client,currentRestaurant._id).then(restaurantOrders=>{
                restaurantOrders.map(order=>{
                    users.map(user=>{
                        if(order.customerID==user._id)Orders.push({order:order,user:user});
                    })
                })
                res.render('pages/Restaurants_Home',{pageTitle:pageTitle,currentUser:currentRestaurant,Orders:Orders});
            })
       })  
    }else{
        res.redirect('/Restaurant_Login');; 
       
    }
});


app.get('/Add_Menu',function(req,res){
    const pageTitle = "Add Menu";
    if(req.cookies.restaurantEmail != null){
        res.render('pages/Add_Menu',{pageTitle:pageTitle,currentUser:currentRestaurant});
    } else {
        res.redirect('/Restaurant_Login');
    }
});


app.get('/orderStatus',async function(req,res){
    let orderID = req.query.order;
    let email = req.query.rid;
    await updateOrderStatus(client,email,orderID);
    res.redirect('/Restaurants_Home')
});

app.get('/Donate_Food', function (req, res) {
    const pageTitle = "Donate Food";
    if(req.cookies.restaurantEmail != null){
        res.render('pages/Donate_Food',{banners : banners,pageTitle:pageTitle});
    } else {
        res.redirect('/Restaurant_Login');
    }
});

app.get("/magic", function (req, res) {
    res.render("magic");
});