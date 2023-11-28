const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser");

const cors = require("cors");

const mongoServer = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.smk19mf.mongodb.net/Final-Project-Database`;
const PORT = 3000;
const url = `http://localhost:${PORT}`
// Middleware configuration
function middleWareConfig(app){
  app.use(cors());



  // In development environment the app logs
  app.use(logger("dev"));

  // To have access to `body` property in the request
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(cookieParser());

}

//connect to mongoose
async function mongoConnect(app){
  const url = mongoServer;
  try{
      const response = await mongoose.connect(url)
      console.log("Connected to mongoose");
      app.listen(PORT, ()=>{console.log("Listening")})
  }
  catch(err){console.log("could not connect to mongoose"+err);}
}

module.exports = {middleWareConfig, mongoConnect, url}