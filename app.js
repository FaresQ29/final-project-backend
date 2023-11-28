require("dotenv").config();

const express = require("express");
const app = express();
const { middleWareConfig, mongoConnect } = require("./config");
//configures all the 
middleWareConfig(app)
mongoConnect(app)

