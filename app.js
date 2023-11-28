require("dotenv").config();

const express = require("express");
const app = express();
const { middleWareConfig, mongoConnect } = require("./config");
const { default: axios } = require("axios");

//for configuration:
middleWareConfig(app)
//connect to mongo db and listen
mongoConnect(app)


//---------------------Routes---------------------
app.get("/", async (req, res)=>{
    try{
        res.send("home")
    }
    catch(err){

    }
})
//User Routes
const userRoutes = require("./routes/userRoutes")
app.use("/user",userRoutes)

//Auth Routes
const authRoutes = require("./routes/authRoutes")
app.use("/auth",authRoutes)