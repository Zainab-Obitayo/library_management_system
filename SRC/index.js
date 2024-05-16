const express =require('express');
const bcryptjs =require('bcryptjs');
const path =require('path');
const collection = require('./config');

const app=express();

const port=3000;

app.use(express.json());

//indicating static file
app.use(express.static("public"));

//url encoding
app.use(express.urlencoded({extented:false}));

//EJS
app.set("view engine", "ejs");

app.get("/",(req, res)=>{
    res.render("home")
});

app.get("/signup",(req,res)=>{
    res.render("signup")
});


app.get("/login",(req,res)=>{
    res.render("login")
});

app.get("/dashboard",(req,res)=>{
    res.render("dashboard")
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        email: req.body.email, 
        usertype: req.body.user_type
    }

    // Check if the username already exists in the database

    const existingUser = await collection.findOne({ name: data.name });
    if (existingUser) {
        res.send('User already exists. Please choose a different username.');
    }else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcryptjs.hash(data.password, saltRounds);
        data.password = hashedPassword; // Replace the original password with the hashed one
        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }

    
    
    res.render("dashboard")
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("User name cannot found")
        }
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            res.send("wrong Password");
        }
        else {
            res.render("home");
        }
    }
    catch {
        res.send("wrong Details");
    }
});





app.listen(port, ()=>{
    console.log(`server is running on port:${port}`);
})

