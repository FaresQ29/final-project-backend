const express = require("express");
const router = express.Router()
const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {url} = require("../config.js")
const checkToken = require("../middleware/checkToken")

//Get request to list all users (protected)


//lists all users minues confidential information
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

//shows user profile minus the confidential information
router.get("/:id", checkToken, async (req, res, next)=>{
    const id = req.params.id
    try{
        const user = await User.findById(id, "-password -_id")
        if(!user){
            return res.status(400).json({msg: "User not found"})
        }
        res.status(200).json(user)
    }
    catch(err){
        res.status(402).json({msg: "Error retrieving user"})
    }
})

module.exports = router