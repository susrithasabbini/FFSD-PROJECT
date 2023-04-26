// Load Node modules
var express = require('express');
const ejs = require('ejs');
const bcrypt = require ('bcrypt');
const {MongoClient} = require('mongodb');
const saltRounds = 10;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { ObjectId } = require('mongodb');

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
app.use(bodyParser.urlencoded({ extended: true }));

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
let currentOrganization = null;


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

async function createOrganization(client, organization){
    const result = await client.db("hungrezy").collection("organizations").insertOne(organization);
    console.log(`New organization registered with the following id: ${result.insertedId}`);
}

async function createDonation(client, donation){
    const result = await client.db("hungrezy").collection("donations").insertOne(donation);
    console.log(`Food Donated to ${result.insertedId}`);
}

async function addFoodItem(client, email,foodItem){
    const result = await client.db("Menu").collection(email).insertOne(foodItem);
    console.log(`New food item  added with the following id: ${result.insertedId}`);
}


async function addFoodRecipe(client,foodRecipe){
    const result = await client.db("hungrezy").collection("FoodRecipes").insertOne(foodRecipe);
    console.log(`New food Recipe added with the following id: ${result.insertedId}`);
}

async function addAnnouncement(client,announcement){
    const result = await client.db("hungrezy").collection("Announcements").insertOne(announcement);
    console.log(`New announcement added with the following id: ${result.insertedId}`);
}

async function addRestaurantOrder(client,email,order){
    const result = await client.db("Orders").collection(email).insertOne(order);
    console.log(`New order placed with the following id: ${result.insertedId}`);
}

async function addCustomerOrder(client,email,order){
    const result = await client.db("Orders").collection(email).insertOne(order);
    console.log(`New order placed with the following id: ${result.insertedId}`);
}

async function addUserFeedback(client,userid,feedback){
    const result = await client.db("hungrezy").collection("Feedbacks").insertOne({customerID:userid,feedback:feedback});
    console.log(`New Feedback Registered with the following id: ${result.insertedId}`);
}


async function deleteUser(client,userid){
    const result = await client.db("hungrezy").collection("users").deleteOne({_id:userid});
}

async function deleteAnnouncement(client,id){
    const result = await client.db("hungrezy").collection("Announcements").deleteOne({AID:id});
    console.log(result);
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

async function getUserOrders(client,cid){

    const cursor = client.db("Orders").collection(cid).find();
    const results = await cursor.toArray();
    return results;

}

async function getAnnouncements(client,cid){

    const cursor = client.db("hungrezy").collection("Announcements").find().sort({ last_review: 1 });
    const results = await cursor.toArray();
    return results;

}

async function getRestaurantsByStatus(client,status){
   const cursor = client.db("hungrezy").collection("restaurants").find({status:status}).limit(20);
    const results = await cursor.toArray();
    return results;
}

async function getOrganizationsByStatus(client,status){
    const cursor = client.db("hungrezy").collection("organizations").find({status:status});
    const results = await cursor.toArray();
    return results;
}

 async function getDonationsByStatusAndOrganization(client,organization, status){
    const cursor = await client.db("hungrezy").collection("donations").find({
        $and: [
            { status: status },
            {organization: organization}
        ]
    });
    const results = await cursor.toArray();
    return results;
}

 async function getDonationsByStatusAndRestaurant(client,restaurant, status){
    const cursor = await client.db("hungrezy").collection("donations").find({
        $and: [
            { status: status },
            {restaurant: restaurant}
        ]
    });
    const results = await cursor.toArray();
    return results;
}

async function getUsers(client){
    const cursor = client.db("hungrezy").collection("users").find();
    const results = await cursor.toArray();
    return results;
}

async function getRestaurants(client) {
    const cursor = client.db("hungrezy").collection("restaurants").find();
    const results = await cursor.toArray();
    return results;
}

async function getOrganizations(client) {
    const cursor = client.db("hungrezy").collection("organizations").find();
    const results = await cursor.toArray();
    return results;
}

async function getRestaurantOrders(client,email){
    const cursor = client.db("Orders").collection(email).find();
    const results = await cursor.toArray();
    return results;
}

async function getFoodRecipes(client){
    const cursor = client.db("hungrezy").collection("FoodRecipes").find();
    const results = await cursor.toArray();
    return results;
}

async function getFoodRecipeByID(client,id){
    const result = client.db("hungrezy").collection("FoodRecipes").findOne({recipeID:id});
    return result;
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

 async function getOrganizationByEmail(client,email){
    const result = client.db("hungrezy").collection("organizations").findOne({email:email});

    return result;
}

async function updateRestaurantStatus(client,email,status) {
    const result = await client.db("hungrezy").collection("restaurants").updateOne({ email:email }, { $set: {status:status} });
}

async function updateOrganizationStatus(client, email, status) {
    const result = await client.db("hungrezy").collection("organizations").updateOne({ email:email }, { $set: {status:status} });
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





let announcements=[];

// *** GET Routes - display pages ***
// Root Route

app.get('/', async function (req, res) {
    const pageTitle = "Hungrezy";
    announcements = await getAnnouncements(client);
    if (req.cookies.mobileNumber == null) {
        currentUser = null;
        res.render('pages/Home', { pageTitle: pageTitle, currentUser: currentUser,announcements });
    }
    else {
        const currentUser = await getUser(client, req.cookies.mobileNumber);
        if (currentUser !== null) { // check if user is logged in
            res.cookie('mobileNumber', currentUser.mobileNumber, {
                expires: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours in milliseconds
                sameSite: true
            });
        }
        res.render('pages/Home', { pageTitle: pageTitle, currentUser: currentUser,announcements });
    }
});



app.get('/Restaurants', async function (req, res) {
    announcements = await getAnnouncements(client);
    if (req.cookies.mobileNumber == null) {
        currentUser = null;
    }
    const pageTitle = "Restaurants";
    const approvedRestaurants = await getRestaurantsByStatus(client, "approved");
    
    const Restaurants = [];
    approvedRestaurants.forEach(async (restaurant) => {
        let FoodImage = mongoose.model(restaurant.email, imageSchema2);
        let foodItemImage = await FoodImage.findOne({ _id: restaurant.email });
        
        Restaurants.push({ restaurant: restaurant, image: foodItemImage });
    })
   
    {
        try {
            const fooditems = await FoodItem.find({});
            console.log(Restaurants.length);
            res.render('pages/Explore_Restuarants', { foodItems: fooditems, restuarants: Restaurants, pageTitle: pageTitle, currentUser: currentUser,announcements });
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
});

app.get('/login', function (req, res) {
    const pageTitle = "Login";
    res.render('pages/login', { pageTitle: pageTitle });
});

app.get('/Restaurant_Login', function (req, res) {
    const pageTitle = "Restaurant Login";
    res.render('pages/Restaurant_Login', { pageTitle: pageTitle });
});

app.get('/Admin_Login', function (req, res) {
    const pageTitle = "Admin-Login";
    res.render('pages/Admin_Login', { pageTitle: pageTitle });
});

app.get('/Organization_Login', function (req, res) {
    const pageTitle = "Organization-Login";
    res.render('pages/Organization_Login', { pageTitle: pageTitle });
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

app.get('/deleteUserAccount', async function (req, res) {
    if (currentUser == null) {
        res.redirect('login');
    } else {
        await deleteUser(client, currentUser._id);
        currentUser = null;
        res.redirect('/');
    }

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
    res.redirect('/');
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
    res.redirect('/login');
});

app.get('/Organization_Logout', function (req, res) {
    // Clear the currentUser variable
    currentOrganization = null;

    // Set the expiration time of the email cookie to 0 to delete it
    res.cookie('organizationEmail', '', {
        expires: new Date(0),
        sameSite: true
    });

    // Redirect to the login page
    res.redirect('/login');
});

app.get('/helpAndSupport', async function (req, res) {
    announcements = await getAnnouncements(client);
    if (req.cookies.mobileNumber == null) {
        currentUser = null;
    }
    const pageTitle = "Help & Support";
    res.render('pages/helpAndSupport', { pageTitle: pageTitle, currentUser: currentUser,announcements });
});

app.get('/About', function (req, res) {
    
    const pageTitle = "About Us";
    if (req.cookies.mobileNumber == null) {
        currentUser = null;
    }
    res.render('pages/About', { pageTitle: pageTitle, currentUser: currentUser,announcements });
});

app.post('/login', async function (req, res) {

    let mobileNumber = req.body.mobileNumber;
    let password = req.body.password;

    const user = await getUser(client, mobileNumber);

    if(user) {

    bcrypt.compare(password, user.password, function (err, result) {

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
    } else {
        res.redirect('/login');
    }
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
                address: req.body.address,
                pincode: req.body.pincode,
                state: req.body.state,
                country: req.body.country
            };

            await createUser(client, user);
            req.session.user = user;
            currentUser = user;
            res.redirect('/');
        }
    });
});

app.post('/updateCustomerAddress', function (req, res) {
    let addressDetails = {
        address: req.body.address,
        pincode: req.body.pincode,
        state: req.body.state,
        country: req.body.country,
    }

    if (currentUser) {
        updateUserAddress(client, currentUser, addressDetails).then(() => {
            res.redirect('/Account');
        })
    } else {
        res.redirect('/Login');
    }
});

app.post('/submitUserFeedback', async function (req, res) {
    let feedback = req.body.feedback

    if (currentUser) {
        await addUserFeedback(client, currentUser._id, feedback);
        res.redirect("/About");
    } else {
        res.redirect('/Login');
    }
});


app.post('/updateUserProfile', async function (req, res) {

    let name = req.body.name
    let email = req.body.email
    let gender = req.body.gender
    let password = req.body.password




    if (currentUser) {
        if (name != '' && name.length > 0 && name != currentUser.name) await updateUserName(client, currentUser.mobileNumber, name);
        if (email != '' && email.length > 0 && email != currentUser.email) await updateUserEmail(client, currentUser.mobileNumber, email);
        if (gender != '' && gender.length > 0 && gender != currentUser.gender) await updateUserGender(client, currentUser.mobileNumber, gender);
        if (name != '' && password.length > 0) {
            bcrypt.hash(password, saltRounds, async function (err, hash) {
                if (err) throw err;
                else {
                    await updateUserPassword(client, currentUser.mobileNumber, hash);
                }
            });
        }
        currentUser = await getUser(client, currentUser.mobileNumber);
        res.redirect('/Account');

    } else {
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

app.post('/Organization_Login', async function (req, res){
    let email = req.body.email;
    let password = req.body.password;

    const organization = await getOrganizationByEmail(client, email);

    if(organization) {

    bcrypt.compare(password, organization.password, function(err, result) {

            if (result) {
                // Set the email cookie with an expires value of 8 hours and sameSite value of true
                const expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + (8 * 60 * 60 * 1000)); // 8 hours in milliseconds
                res.cookie('organizationEmail', organization.email, {
                    expires: expirationDate,
                    sameSite: true
                });
    
                // log in
                currentOrganization = organization;
                res.redirect('/Organizations_Home');
            }
            else {
                // access denied
                res.redirect('/Organization_Login');
            }
        });
    } else {
        res.redirect('/Organization_Login');
    }
    
});

app.post('/Restaurant_Login', async function (req, res) {

    let email = req.body.email;
    let password = req.body.password;

    const restaurant = await getRestaurantByEmail(client, email);

    if (restaurant) {

        bcrypt.compare(password, restaurant.password, function (err, result) {

            if (result) {
                // Set the email cookie with an expires value of 8 hours and sameSite value of true
                const expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + (8 * 60 * 60 * 1000)); // 8 hours in milliseconds
                res.cookie('restaurantEmail', restaurant.email, {
                    expires: expirationDate,
                    sameSite: true
                });

                // log in
                currentRestaurant = restaurant;

                res.redirect('/Restaurants_Home');
            }
            else {
                // access denied
                res.redirect('/Restaurant_Login');
            }
        });
    } else {
        res.redirect('/Restaurant_Login');
    }
});




app.post('/Register_Restaurant', upload.single('image'), function (req, res) {
    function getOffer() {
        let offer = Math.floor(Math.random() * (60 - 10 + 1) + 10);
        while (offer % 5 !== 0) {
            offer = Math.floor(Math.random() * (60 - 10 + 1) + 10);
        }
        return offer;
    }

    const offer = getOffer();



    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
        if (err) throw err;
        else {
            const restaurantObj = {
                _id: req.body.restaurantEmail,
                name: req.body.restaurantName,
                email: req.body.restaurantEmail,
                password: hash,
                type: req.body.restaurantType,
                time: req.body.deliveryTime,
                cost: req.body.cost,
                location: req.body.location,
                rating: Math.round(((Math.random() * (5 - 3) + 3)) * 10) / 10,
                offer: offer,
                status: 'pending',

            }

            await createRestaurant(client, restaurantObj);
            currentRestaurant = restaurantObj;
            const FoodImage = mongoose.model(req.body.restaurantEmail, imageSchema2);
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

app.post('/Add_FoodItem', upload.single('image'), async function (req, res) {
    if(currentRestaurant==null)res.redirect('/Restaurant_Login');
    const email = currentRestaurant.email;
    const FoodImage = mongoose.model(email, imageSchema2);
    const foodimage = new FoodImage({
        _id: req.body.name,
        data: req.file.buffer,
        contentType: req.file.mimetype
    });
    const foodItem = {
        name: req.body.name,
        cost: req.body.cost,
        description: req.body.description,
        type: req.body.type,
        category: req.body.category,
        image: '/CUSTOMER/Order_Food/images/No-Image-Placeholder.svg',
        rating: Math.round(((Math.random() * (5 - 3) + 3)) * 10) / 10
    }

    try {
        await foodimage.save();
        await addFoodItem(client, email, foodItem);
        res.redirect('/Add_Menu');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});



app.post('/addRecipe', upload.single('image'), async function (req, res) {
    if (true) {
        const FoodImage = mongoose.model("foodRecipes", imageSchema2);
        const foodimage = new FoodImage({
            _id: req.body.name,
            data: req.file.buffer,
            contentType: req.file.mimetype
        });
        const foodRecipe = {
            recipeID: req.body.name.trim() + new Date().getTime(),
            name: req.body.name,
            category: req.body.category,
            time: req.body.time,
            description: req.body.description,
            serves: req.body.serves,
            ingredients: req.body.ingredients,
            step1: req.body.para1,
            step2: req.body.para2,
            step3: req.body.para3,
            rating: Math.round(((Math.random() * (5 - 3) + 3)) * 10) / 10
        }

        try {
            await foodimage.save();
            await addFoodRecipe(client, foodRecipe);
            res.redirect('/Add_Recipe');
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    } else {
        res.redirect('/Admin_Login');
    }


});


app.post('/addAnnouncement', async function (req, res) {
  
    const data = {
        AID :""+ new Date().getTime(),
        subject :req.body.Announce
    }
    await addAnnouncement(client,data);
    res.redirect('/Announcements');
});



app.get('/Registration', function (req, res) {
    const pageTitle = "Registration";
    res.render('pages/registration', { pageTitle: pageTitle });
});

app.get('/Restaurant_Registration', function (req, res) {
    const pageTitle = "Restaurant-Registration";
    res.render('pages/Restaurant_Registration', { pageTitle: pageTitle });
});

app.get('/Menu', async function (req, res) {
    announcements = await getAnnouncements(client);
    if (currentUser == null) res.redirect('/login');
    const restaurant = await getRestaurantByEmail(client, req.query.id)
    let MenuItems = await getRestaurantMenu(client, restaurant._id);
    const categoryNames = ["Biryani-Rice", "Curries", "Bakery", "Pizza-Burger", "Soft-Drinks", "Sweets", "Recomended", "Lassi-Shakes", "Tiffins"];
    const Menu = [], recomended = [];
    let FoodImage = mongoose.model(restaurant.email, imageSchema2);
    let foodItemImages = await FoodImage.find({});
    categoryNames.map((name) => {
        let array = [];
        MenuItems.map((item) => {
            if (name == item.category) {
                let foodItemImage
                foodItemImages.map(image => {
                    if (image._id == item.name)
                        foodItemImage = image;
                })
                array.push({ item: item, image: foodItemImage });
                if (name == "Recomended") recomended.push({ item: item, image: foodItemImage });
            }
        })
        if (name != "Recomended" && array.length > 0) Menu.push({ categoryName: name, items: array });
    })

    const pageTitle = "Menu-" + restaurant.name;
    const menuItems = JSON.stringify(MenuItems).replace(/\\/g, '\\\\').replace(/"/g, '\\\"');
    res.render('pages/Restuarant_Menu', { Restuarant: restaurant, recomended: recomended, Menu: Menu, currentUser: currentUser, pageTitle: pageTitle, MenuItems: menuItems,announcements });
});

app.post('/order', async function (req, res) {
    const order = {
        orderID: req.query.rid + req.query.cid + new Date().getTime(),
        restaurantID: req.query.rid,
        customerID: req.query.cid,
        cart: JSON.parse(req.query.cart),
        paymentDetails: { payment: req.query.pay, method: req.query.method },
        orderStatus: "Delivery Pending"
    }

    await addRestaurantOrder(client, order.restaurantID, order)
    await addCustomerOrder(client, order.customerID, order)
    console.log(order);
    res.redirect('/orderPlaced');

});

app.get('/orderPlaced', async function (req, res) {
   pageTitle="OrderPlaced";
    res.render('pages/orderMessage',{pageTitle})
});


app.get('/Recipes', async function (req, res) {
    announcements = await getAnnouncements(client);
    const pageTitle = "Recipes";
    const FoodRecipes = [], Veg = [], nonVeg = [];
    if (req.cookies.mobileNumber == null) {
        currentUser = null;
    }
    getFoodRecipes(client).then(recipes => {
        let FoodImage = mongoose.model("FoodRecipes", imageSchema2);
        FoodImage.find().then(foodimages => {
            recipes.map(recipe => {
                foodimages.map(foodimage => {
                    if (recipe.name == foodimage._id) FoodRecipes.push({ recipe, foodimage });
                })

            })
            FoodRecipes.forEach(recipe => {
                if (recipe.recipe.category == "Vegetarian") Veg.push(recipe);
                else nonVeg.push(recipe);
            })
            res.render('pages/Food_Recipes', { FoodRecipes: FoodRecipes, VegRecipes: Veg, nonVegRecipes: nonVeg, currentUser: currentUser, pageTitle: pageTitle,announcements });
        })

    });
})


app.get('/View_Recipe', async function (req, res) {
    const pageTitle = "Recipe Blog";
    const id = req.query.id;
    announcements = await getAnnouncements(client);
    getFoodRecipeByID(client, id).then(recipe => {
       
        let FoodImage = mongoose.model("FoodRecipes", imageSchema2);
        FoodImage.findOne({ _id: recipe.name }).then(image => {
            res.render('pages/View_Recipe', { foodItem: recipe, image: image, currentUser: currentUser, pageTitle: pageTitle,announcements });
        })
    })

});

app.get('/Account', async function (req, res) {
    announcements = await getAnnouncements(client);
    let showOrders = req.query.showOrders;
    if (req.cookies.mobileNumber == null) {
        currentUser = null;
    }
    const pageTitle = "Account";
    const Orders = [];
    if (currentUser) {
        getRestaurantsByStatus(client, "approved").then(restaurants => {

            getUserOrders(client, currentUser._id).then(userOrders => {
                userOrders.map(order => {
                    restaurants.map(restaurant => {
                        if (order.restaurantID == restaurant._id) Orders.push({ order: order, restaurant: restaurant });
                    })
                })
                res.render('pages/Account', { pageTitle: pageTitle, currentUser: currentUser, orders: Orders,announcements,showOrders });
            })
        })
    } else {
        res.render('pages/Account', { pageTitle: pageTitle, currentUser: currentUser, orders: Orders,announcements,showOrders });
    }



});

app.get('/Admin', async function (req, res) {
    const pageTitle = "Admin";
    const pendingRestaurants = await getRestaurantsByStatus(client, "pending");
    const approvedRestaurants = await getRestaurantsByStatus(client, "approved");
    const suspendedRestaurants = await getRestaurantsByStatus(client, "suspended");
    const pendingOrganizations = await getOrganizationsByStatus(client, "pending");
    const approvedOrganizations = await getOrganizationsByStatus(client, "approved");
    const suspendedOrganizations = await getOrganizationsByStatus(client, "suspended");
    const Users = await getUsers(client);
    const Restaurants = await getRestaurants(client);
    const Organizations = await getOrganizations(client);
    if (req.cookies.email == null) {
        res.redirect('/Admin_Login');
    }
    else {
        const currentAdmin = await getAdmin(client, req.cookies.email);
        res.render('pages/Admin', { currentUser: currentAdmin, pageTitle: pageTitle, pendingRestaurantVerifications: pendingRestaurants, pendingOrganizationVerifications: pendingOrganizations, Organizations: approvedOrganizations, suspendedOrganizations: suspendedOrganizations, Restaurants: approvedRestaurants, suspendedRestaurants: suspendedRestaurants, users: Users, restaurantsCount: Restaurants.length, organizationsCount: Organizations.length });
    }
});

app.get('/Announcements', async function (req, res) {
    let pageTitle="Announcements";
    const announcements = await getAnnouncements(client);
    res.render('pages/Announcements',{pageTitle,announcements,currentUser:currentAdmin});

});

app.get('/removeAnnouncement', async function (req, res) {
    
    await deleteAnnouncement(client,req.query.id);
    console.log(req.query.id);
    res.redirect('/Announcements')

});

app.get("/Remove_User", async function (req, res) {
    let id = req.query.id;
    await deleteUser(client, id);
    res.redirect('/Admin');
});

app.get('/Approve_Restaurant', async function (req, res) {
    let email = req.query.email;
    await updateRestaurantStatus(client, email, "approved");
    res.redirect('/Admin');

});


app.get('/Reject_Restaurant', async function (req, res) {
    let email = req.query.email;
    await updateRestaurantStatus(client, email, "rejected");
    res.redirect('/Admin');
});

app.get('/Suspend_Restaurant', async function (req, res) {
    let email = req.query.email;
    await updateRestaurantStatus(client, email, "suspended");
    res.redirect('/Admin');

});

app.get('/Approve_Organization', async function (req, res) {
    let email = req.query.email;
    await updateOrganizationStatus(client, email, "approved");
    res.redirect('/Admin');
});

app.get('/Reject_Organization', async function (req, res) {
    let email = req.query.email;
    await updateOrganizationStatus(client, email, "rejected");
    res.redirect('/Admin');
});

app.get('/Suspend_Organization', async function (req, res) {
    let email = req.query.email;
    await updateOrganizationStatus(client, email, "suspended");
    res.redirect('/Admin');
});

app.get('/Add_Recipe', async function (req, res) {
    const pageTitle = "Admin";
    if (req.cookies.email != null) {
        currentAdmin = await getAdmin(client, req.cookies.email);
        res.render('pages/Admin_AddRecipe', { currentUser: currentAdmin, pageTitle: pageTitle });
    } else {
        res.redirect('/login');
        res.redirect('/Admin_Login');
    }
});

app.get('/Restaurants_Home', async function (req, res) {
    const pageTitle = "Restaurant Home";
    let restaurantOrders = [], Orders = [];
    if (req.cookies.restaurantEmail != null) {
        currentRestaurant = await getRestaurantByEmail(client, req.cookies.restaurantEmail);
        getUsers(client).then(users => {
            getRestaurantOrders(client, currentRestaurant._id).then(restaurantOrders => {
                restaurantOrders.map(order => {
                    users.map(user => {
                        if (order.customerID == user._id) Orders.push({ order: order, user: user });
                    })
                })
                res.render('pages/Restaurants_Home', { pageTitle: pageTitle, currentUser: currentRestaurant, Orders: Orders });
            })
        })
    } else {
        res.redirect('/Restaurant_Login');;

    }
});

async function updateDonationById(client, id, status) {
    const result = await client.db("hungrezy").collection("donations").updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: status } }
    );
}

app.get('/Reject_Donation', async function (req, res) {
    let id = req.query.donationId;
    await updateDonationById(client, id, "rejected");
    res.redirect('/Organizations_Home');
});

app.get('/Accept_Donation', async function (req, res) {
    let id = req.query.donationId;
    await updateDonationById(client, id, "accepted");
    res.redirect('/Organizations_Home');
});

app.get('/Send_Donation', async function (req, res) {
    let id = req.query.donationId;
    await updateDonationById(client, id, "sending");
    res.redirect('/Donations');
});

app.get('/Reached_Donation', async function (req, res) {
    let id = req.query.donationId;
    await updateDonationById(client, id, "success");
    res.redirect('/Organizations_Home');
});

app.get('NotReached_Donation', async function (req, res) {
    let id = req.query.donationId;
    await updateDonationById(client, id, "not success");
    res.redirect('/Organizations_Home');
});


app.get('/Organizations_Home', async function (req, res) {
    const pageTitle = "Organizations Home";
    if (req.cookies.organizationEmail != null) {
        currentOrganization = await getOrganizationByEmail(client, req.cookies.organizationEmail);
        const pendingDonations = await getDonationsByStatusAndOrganization(client, currentOrganization.name, "pending");
        const rejectedDonations = await getDonationsByStatusAndOrganization(client, currentOrganization.name, "rejected");
        const acceptedDonations = await getDonationsByStatusAndOrganization(client, currentOrganization.name, "accepted");
        const sendingDonations = await getDonationsByStatusAndOrganization(client, currentOrganization.name, "sending");
        const successDonations = await getDonationsByStatusAndOrganization(client, currentOrganization.name, "success");
        const notSuccessDonations = await getDonationsByStatusAndOrganization(client, currentOrganization.name, "not success");
        res.render('pages/Organizations_Home', { pageTitle: pageTitle, currentUser: currentOrganization, donations: pendingDonations, sendingDonations: sendingDonations, successDonations: successDonations, rejectedDonations: rejectedDonations, acceptedDonations: acceptedDonations, notSuccessDonations: notSuccessDonations });
    } else {
        res.redirect('/Organization_Login');;
    }
});

app.get('/Donations', async function (req, res) {
    const pageTitle = "Donations";
    if (req.cookies.restaurantEmail != null) {
        currentRestaurant = await getRestaurantByEmail(client, req.cookies.restaurantEmail);
        const pendingDonations = await getDonationsByStatusAndRestaurant(client, currentRestaurant.name, "pending");
        const rejectedDonations = await getDonationsByStatusAndRestaurant(client, currentRestaurant.name, "rejected");
        const acceptedDonations = await getDonationsByStatusAndRestaurant(client, currentRestaurant.name, "accepted");
        const sendingDonations = await getDonationsByStatusAndRestaurant(client, currentRestaurant.name, "sending");
        const successDonations = await getDonationsByStatusAndRestaurant(client, currentRestaurant.name, "success");
        const notSuccessDonations = await getDonationsByStatusAndRestaurant(client, currentRestaurant.name, "not success")
        res.render('pages/Donations', { pageTitle: pageTitle, currentUser: currentRestaurant, pendingDonations: pendingDonations, rejectedDonations: rejectedDonations, successDonations: successDonations, acceptedDonations: acceptedDonations, sendingDonations: sendingDonations, notSuccessDonations: notSuccessDonations });
    } else {
        res.redirect('/Restaurant_Login');;
    }
});


app.get('/Add_Menu', function (req, res) {
    const pageTitle = "Add Menu";
    if (req.cookies.restaurantEmail != null) {
       
        res.render('pages/Add_Menu', { pageTitle: pageTitle,currentUser:currentRestaurant });
    } else {
        res.redirect('/Restaurant_Login');
    }
});


app.get('/orderStatus', async function (req, res) {
    let orderID = req.query.order;
    let email = req.query.rid;
    await updateOrderStatus(client, email, orderID);
    res.redirect('/Restaurants_Home')
});

app.get('/Donate_Food', function (req, res) {
    const pageTitle = "Donate Food";
    if (req.cookies.restaurantEmail != null) {
        res.render('pages/Donate_Food', { banners: banners, pageTitle: pageTitle });
    } else {
        res.redirect('/Restaurant_Login');
    }
});

app.get("/magic", function (req, res) {
    res.render("magic");
});

app.get('/Organization_Register', function (req, res) {
    const pageTitle = "Organization Register";
    res.render('pages/Organization_Registration', { pageTitle: pageTitle });
});

app.post('/Register_Organization', function (req, res) {

    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
        if (err) throw err;
        else {
            const organizationObj = {
                _id: req.body.organizationEmail,
                name: req.body.organizationName,
                email: req.body.organizationEmail,
                password: hash,
                location: req.body.location,
                status: 'pending',
            }

            await createOrganization(client, organizationObj);
            currentOrganization = organizationObj;
            res.cookie('organizationEmail', currentOrganization.email);
            res.redirect('/Organization_Login');
        }
    });
});

app.get('/Donate', async function (req, res) {
    const approvedOrganizations = await getOrganizationsByStatus(client, "approved");
    const pageTitle = "Donate";
    if (req.cookies.restaurantEmail != null) {
        currentRestaurant = await getRestaurantByEmail(client, req.cookies.restaurantEmail);
        let MenuItems = await getRestaurantMenu(client, currentRestaurant._id);
        res.render('pages/Donate', { pageTitle: pageTitle, currentUser: currentRestaurant, Organization: approvedOrganizations, MenuItems: MenuItems });
    } else {
        res.redirect('/Restaurant_Login');
    }
});



app.post('/Donate', async function (req, res) {

    const donationObj = {
        organization: req.body.organization,
        restaurant: currentRestaurant.name,
        food: req.body.food,
        serves: req.body.serves,
        timeslot: req.body.timeslot,
        status: "pending"
    }

    await createDonation(client, donationObj);
    res.redirect('/Restaurants_Home');

});









