require("dotenv").config();
const express = require("express");
const app = express();


const { middleWareConfig, mongoConnect } = require("./config");


//for configuration:
middleWareConfig(app)
//connect to mongo db and listen
mongoConnect(app)


//---------------------Routes---------------------
app.get("/test", (req, res)=>{
    res.send("verified!")
})


//User Routes
const userRoutes = require("./routes/userRoutes")
app.use("/user",userRoutes)

//Auth Routes
const authRoutes = require("./routes/authRoutes")
app.use("/auth",authRoutes)

//Community Routes
const commRoutes = require("./routes/communityRoutes")
app.use("/community", commRoutes)

//Community Routes
const chatRoutes = require("./routes/chatRoutes")
app.use("/chat", chatRoutes)