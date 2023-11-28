const express = require("express");
const router = express.Router()
const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {url} = require("../config.js")
//Get request to list all users (protected)



router.get("/all", async (req, res, next)=>{
    try{
        const response = await User.find({})
        console.log(response);
        res.status(200).json(response)
    }
    catch(err){
        res.status(404)
    }
})



module.exports = router